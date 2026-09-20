"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  FiMic,
  FiPlay,
  FiAlertCircle,
  FiClock,
  FiAward,
  FiChevronRight,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { INTERVIEW_TYPES, INTERVIEW_DIFFICULTIES } from "@/types/interview";
import type { MockInterviewSession, InterviewType, InterviewDifficulty } from "@/types/interview";

interface SessionsResponse {
  success: boolean;
  data: MockInterviewSession[];
}

async function fetchSessions(): Promise<MockInterviewSession[]> {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/interview`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data: SessionsResponse & { message?: string } = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load interview history");
  return data.data;
}

export default function MockInterviewPage() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>("Medium");
  const [type, setType] = useState<InterviewType>("Technical");
  const [starting, setStarting] = useState(false);

  const { data: sessions, isLoading, isError, error } = useQuery({
    queryKey: ["interview-history"],
    queryFn: fetchSessions,
  });

  const handleStart = () => {
    if (!role.trim()) {
      toast.error("Please enter a target role first.");
      return;
    }
    setStarting(true);
    const query = new URLSearchParams({ role: role.trim(), difficulty, type });
    router.push(`/dashboard/mock-interview/new?${query.toString()}`);
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          AI Mock Interview
        </h1>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
          Practice live with an AI interviewer and get instant, honest feedback.
        </p>
      </div>

      {/* Setup card */}
      <div className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/80 dark:from-indigo-950/50 dark:to-violet-950/50 dark:border-indigo-900/40">
            <FiMic className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Start a new session</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">
              Target Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Frontend Developer"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-950"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as InterviewDifficulty)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200"
            >
              {INTERVIEW_DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">
              Interview Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as InterviewType)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200"
            >
              {INTERVIEW_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={starting}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60 dark:from-indigo-500 dark:to-violet-500"
        >
          <FiPlay className="h-4 w-4" />
          {starting ? "Starting..." : "Start Interview"}
        </button>
      </div>

      {/* History */}
      <h2 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Past Sessions</h2>

      {isError && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
          <FiAlertCircle className="h-5 w-5 shrink-0" />
          <span>{(error as Error).message}</span>
        </div>
      )}

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
          ))}
        </div>
      )}

      {!isLoading && sessions?.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          No interviews yet — start your first session above.
        </div>
      )}

      {!isLoading && sessions && sessions.length > 0 && (
        <div className="space-y-3">
          {sessions.map((session) => (
            <button
              key={session._id}
              onClick={() => router.push(`/dashboard/mock-interview/${session._id}`)}
              className="flex w-full items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 text-left shadow-xs transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {session.role}
                  </p>
                  <span className="inline-flex items-center rounded-lg border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-950/50 dark:text-indigo-300">
                    {session.type}
                  </span>
                  <span className="inline-flex items-center rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {session.difficulty}
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <FiClock className="h-3 w-3" />
                  {new Date(session.createdAt).toLocaleDateString()}
                  {session.status === "in-progress" && (
                    <span className="ml-2 font-medium text-amber-600 dark:text-amber-400">In progress</span>
                  )}
                </p>
              </div>

              {session.status === "completed" && typeof session.overallScore === "number" && (
                <div className="flex shrink-0 items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <FiAward className="h-4 w-4" />
                  {session.overallScore}/10
                </div>
              )}
              <FiChevronRight className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}