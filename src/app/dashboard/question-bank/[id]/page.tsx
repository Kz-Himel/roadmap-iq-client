"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  FiArrowLeft,
  FiAlertCircle,
  FiEye,
  FiEyeOff,
  FiTag,
  FiHelpCircle,
} from "react-icons/fi";
import type { QuestionBankItem, QuestionDifficulty } from "@/types/questionBank";

interface QuestionResponse {
  success: boolean;
  data: QuestionBankItem;
}

const difficultyStyles: Record<QuestionDifficulty, string> = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900/40",
  Medium: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900/40",
  Hard: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-900/40",
};

async function fetchQuestionById(id: string): Promise<QuestionBankItem> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/${id}`);
  const data: QuestionResponse & { message?: string } = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to load question");
  }
  return data.data;
}

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse">
      <div className="mb-6 h-4 w-28 rounded-lg bg-slate-200 dark:bg-slate-800" />
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex gap-2">
          <div className="h-5 w-16 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-5 w-14 rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="mb-3 h-6 w-full rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="h-6 w-2/3 rounded-lg bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}

export default function QuestionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [showAnswer, setShowAnswer] = useState(false);

  const { data: question, isLoading, isError, error } = useQuery({
    queryKey: ["question-details", id],
    queryFn: () => fetchQuestionById(id),
    enabled: !!id,
  });

  if (isLoading) return <DetailSkeleton />;

  if (isError || !question) {
    return (
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to Question Bank
        </button>
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
          <FiAlertCircle className="h-5 w-5 shrink-0" />
          <span>{(error as Error)?.message || "Question not found."}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/dashboard/question-bank"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
      >
        <FiArrowLeft className="h-4 w-4" />
        Back to Question Bank
      </Link>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center rounded-lg border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-950/50 dark:text-indigo-300">
            {question.category}
          </span>
          <span
            className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[11px] font-semibold ${difficultyStyles[question.difficulty]}`}
          >
            {question.difficulty}
          </span>
        </div>

        <div className="mb-6 flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/30">
            <FiHelpCircle className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-lg font-bold leading-relaxed text-slate-900 dark:text-white sm:text-xl">
            {question.question}
          </h1>
        </div>

        <button
          onClick={() => setShowAnswer((s) => !s)}
          className="mb-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          {showAnswer ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
          {showAnswer ? "Hide Answer" : "Reveal Answer"}
        </button>

        {showAnswer && (
          <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/60">
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {question.answer}
            </p>
          </div>
        )}

        {question.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5 border-t border-slate-100 pt-5 dark:border-slate-800/80">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400"
              >
                <FiTag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}