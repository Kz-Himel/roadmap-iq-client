"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  FiCpu,
  FiUser,
  FiSend,
  FiAward,
  FiArrowLeft,
  FiCheckCircle,
  FiRotateCcw,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { TOTAL_INTERVIEW_QUESTIONS } from "@/types/interview";
import type { InterviewQA, InterviewType, InterviewDifficulty, MockInterviewSession } from "@/types/interview";

type Phase = "asking" | "waiting-answer" | "evaluating" | "complete";

interface SessionResponse {
  success: boolean;
  data: MockInterviewSession;
}

async function fetchSession(id: string): Promise<MockInterviewSession> {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/interview/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data: SessionResponse & { message?: string } = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load session");
  return data.data;
}

// Shared SSE line parser
async function consumeStream(
  res: Response,
  onEvent: (payload: any) => void
) {
  if (!res.ok || !res.body) throw new Error("Stream request failed");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      onEvent(JSON.parse(line.replace("data: ", "")));
    }
  }
}

export default function MockInterviewSessionPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const routeId = params?.id as string;
  const isNew = routeId === "new";

  const [sessionId, setSessionId] = useState<string | null>(isNew ? null : routeId);
  const [role, setRole] = useState(searchParams.get("role") ?? "");
  const [difficulty, setDifficulty] = useState((searchParams.get("difficulty") as InterviewDifficulty) ?? "Medium");
  const [type, setType] = useState((searchParams.get("type") as InterviewType) ?? "Technical");

  const [history, setHistory] = useState<InterviewQA[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(TOTAL_INTERVIEW_QUESTIONS);
  const [phase, setPhase] = useState<Phase>("asking");
  const [streamingText, setStreamingText] = useState<string | null>(null);
  const [answerInput, setAnswerInput] = useState("");
  const [overallScore, setOverallScore] = useState<number | null>(null);
  const [overallFeedback, setOverallFeedback] = useState<string | null>(null);
  const startedRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load an existing session (resume in-progress or view completed)
  const { data: existingSession, isLoading: isLoadingExisting } = useQuery({
    queryKey: ["interview-session", routeId],
    queryFn: () => fetchSession(routeId),
    enabled: !isNew,
  });

  useEffect(() => {
    if (!existingSession) return;

    setRole(existingSession.role);
    setDifficulty(existingSession.difficulty);
    setType(existingSession.type);

    if (existingSession.status === "completed") {
      setHistory(existingSession.questions);
      setOverallScore(existingSession.overallScore ?? null);
      setOverallFeedback(existingSession.overallFeedback ?? null);
      setPhase("complete");
    } else {
      const answered = existingSession.questions.filter((q) => q.answer);
      const pending = existingSession.questions[existingSession.questions.length - 1];
      setHistory(answered);
      if (pending && !pending.answer) {
        setCurrentQuestion(pending.question);
        setQuestionNumber(existingSession.questions.length);
      }
      setPhase("waiting-answer");
    }
  }, [existingSession]);

  // Start a brand-new interview
  useEffect(() => {
    if (!isNew || startedRef.current) return;
    if (!role.trim()) {
      toast.error("Missing role — please set up a new interview.");
      router.replace("/dashboard/mock-interview");
      return;
    }
    startedRef.current = true;
    startInterview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history, streamingText, currentQuestion]);

  async function startInterview() {
    setPhase("asking");
    setStreamingText("");

    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/interview/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role: role.trim(), difficulty, type }),
      });

      await consumeStream(res, (payload) => {
        if (payload.type === "session") {
          setSessionId(payload.sessionId);
          window.history.replaceState(null, "", `/dashboard/mock-interview/${payload.sessionId}`);
        } else if (payload.type === "chunk") {
          setStreamingText((prev) => (prev ?? "") + payload.text);
        } else if (payload.type === "done") {
          setCurrentQuestion(payload.question);
          setQuestionNumber(payload.questionNumber);
          setTotalQuestions(payload.totalQuestions);
          setStreamingText(null);
          setPhase("waiting-answer");
        } else if (payload.type === "error") {
          throw new Error(payload.message);
        }
      });
    } catch (err) {
      toast.error((err as Error).message || "Failed to start interview.");
    }
  }

  async function submitAnswer() {
    const answer = answerInput.trim();
    if (!answer || !sessionId || phase !== "waiting-answer" || !currentQuestion) return;

    const answeredQuestion = currentQuestion;
    setAnswerInput("");
    setPhase("evaluating");
    setStreamingText("");

    try {
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/interview/${sessionId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ answer }),
      });

      await consumeStream(res, (payload) => {
        if (payload.type === "evaluation") {
          setHistory((prev) => [
            ...prev,
            { question: answeredQuestion, answer, score: payload.score, feedback: payload.feedback },
          ]);
          setCurrentQuestion(null);
        } else if (payload.type === "chunk") {
          setStreamingText((prev) => (prev ?? "") + payload.text);
        } else if (payload.type === "done") {
          if (payload.isComplete) {
            setOverallScore(payload.overallScore);
            setOverallFeedback(payload.overallFeedback);
            setPhase("complete");
          } else {
            setCurrentQuestion(payload.nextQuestion);
            setQuestionNumber(payload.questionNumber);
            setPhase("waiting-answer");
          }
          setStreamingText(null);
        } else if (payload.type === "error") {
          throw new Error(payload.message);
        }
      });
    } catch (err) {
      toast.error((err as Error).message || "Failed to submit answer.");
      setPhase("waiting-answer");
    }
  }

  if (!isNew && isLoadingExisting) {
    return (
      <div className="mx-auto flex h-[calc(100dvh-8rem)] max-w-3xl items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600 dark:border-blue-900 dark:border-t-blue-400" />
      </div>
    );
  }

  const progressPct = Math.min(100, (Math.min(questionNumber, totalQuestions) / totalQuestions) * 100);

  return (
    <div className="mx-auto flex h-[calc(100dvh-8rem)] max-w-3xl flex-col sm:h-[calc(100dvh-9rem)]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          onClick={() => router.push("/dashboard/mock-interview")}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="flex flex-wrap items-center justify-end gap-1.5 text-right">
          <span className="rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/50 dark:text-blue-300">
            {role}
          </span>
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {type} · {difficulty}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      {phase !== "complete" && (
        <div className="mb-4">
          <div className="mb-1.5 flex justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <span>Question {Math.min(questionNumber, totalQuestions)} of {totalQuestions}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-600 transition-all duration-500 dark:from-blue-500 dark:to-blue-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      )}

      {/* Transcript */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-5"
      >
        {history.map((qa, i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-blue-50 text-blue-600 border border-blue-100/80 dark:from-blue-950/60 dark:to-blue-950/60 dark:text-blue-400 dark:border-blue-900/50">
                <FiCpu className="h-4 w-4" />
              </div>
              <div className="max-w-[75%] rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-800 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 sm:max-w-[70%]">
                {qa.question}
              </div>
            </div>
            <div className="flex flex-row-reverse items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <FiUser className="h-4 w-4" />
              </div>
              <div className="max-w-[75%] rounded-2xl bg-gradient-to-r from-blue-600 to-blue-600 px-4 py-3 text-sm leading-relaxed text-white shadow-xs dark:from-blue-500 dark:to-blue-500 sm:max-w-[70%]">
                {qa.answer}
              </div>
            </div>
            {typeof qa.score === "number" && (
              <div className="ml-11 flex items-start gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3.5 py-2.5 text-xs text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300">
                <FiCheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <div>
                  <span className="font-bold">{qa.score}/10</span> — {qa.feedback}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Current pending question */}
        {currentQuestion && phase === "waiting-answer" && (
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-blue-50 text-blue-600 border border-blue-100/80 dark:from-blue-950/60 dark:to-blue-950/60 dark:text-blue-400 dark:border-blue-900/50">
              <FiCpu className="h-4 w-4" />
            </div>
            <div className="max-w-[75%] rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-800 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 sm:max-w-[70%]">
              {currentQuestion}
            </div>
          </div>
        )}

        {/* Live streaming (question / evaluation-wait / summary) */}
        {(phase === "asking" || phase === "evaluating") && (
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-blue-50 text-blue-600 border border-blue-100/80 dark:from-blue-950/60 dark:to-blue-950/60 dark:text-blue-400 dark:border-blue-900/50">
              <FiCpu className="h-4 w-4" />
            </div>
            <div className="max-w-[75%] rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-800 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 sm:max-w-[70%]">
              {streamingText ? (
                streamingText
              ) : (
                <div className="flex items-center gap-1.5 py-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 dark:bg-blue-400 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 dark:bg-blue-400 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 dark:bg-blue-400" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Final summary */}
        {phase === "complete" && (
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-50 p-5 dark:border-blue-900/40 dark:from-blue-950/30 dark:to-blue-950/30">
            <div className="mb-3 flex items-center gap-2">
              <FiAward className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Interview Complete</h3>
              {overallScore !== null && (
                <span className="ml-auto rounded-lg bg-white px-2.5 py-1 text-sm font-bold text-blue-700 shadow-xs dark:bg-slate-900 dark:text-blue-300">
                  {overallScore}/10
                </span>
              )}
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {overallFeedback ?? streamingText}
            </p>
          </div>
        )}
      </div>

      {/* Input / actions */}
      {phase === "complete" ? (
        <button
          onClick={() => router.push("/dashboard/mock-interview")}
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <FiRotateCcw className="h-4 w-4" />
          Start a New Interview
        </button>
      ) : (
        <div className="mt-3 flex w-full items-center gap-1.5 sm:gap-2">
          <input
            type="text"
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitAnswer()}
            disabled={phase !== "waiting-answer"}
            placeholder={phase === "waiting-answer" ? "Type your answer..." : "Please wait..."}
            className="h-10 sm:h-11 flex-1 rounded-xl border border-slate-200/80 bg-white px-3 sm:px-4 text-xs sm:text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-400"
          />
          <button
            onClick={submitAnswer}
            disabled={phase !== "waiting-answer" || !answerInput.trim()}
            className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition-all hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <FiSend className="h-[18px] w-[18px] sm:h-5 sm:w-5 shrink-0" />
          </button>
        </div>
      )}
    </div>
  );
}