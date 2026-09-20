"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiAlertCircle,
  FiZap,
  FiBookOpen,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { QUESTION_CATEGORIES, QUESTION_DIFFICULTIES } from "@/types/questionBank";
import type { QuestionBankItem, QuestionCategory, QuestionDifficulty } from "@/types/questionBank";
import QuestionCard, { QuestionCardSkeleton } from "@/components/question-bank/QuestionCard";

interface QuestionsResponse {
  success: boolean;
  total: number;
  page: number;
  totalPages: number;
  data: QuestionBankItem[];
}

async function fetchQuestions(params: {
  search: string;
  category: string;
  difficulty: string;
  page: number;
}): Promise<QuestionsResponse> {
  const query = new URLSearchParams({
    search: params.search,
    category: params.category,
    difficulty: params.difficulty,
    page: String(params.page),
    limit: "9",
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions?${query}`);
  const data = await res.json();

  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load questions");
  return data;
}

async function generateQuestions(payload: {
  category: QuestionCategory;
  difficulty: QuestionDifficulty;
  count: number;
}) {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to generate questions");
  return data;
}

export default function QuestionBankPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [page, setPage] = useState(1);
  const [showGenerate, setShowGenerate] = useState(false);
  const [genCategory, setGenCategory] = useState<QuestionCategory>("Frontend");
  const [genDifficulty, setGenDifficulty] = useState<QuestionDifficulty>("Easy");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["question-bank", search, category, difficulty, page],
    queryFn: () => fetchQuestions({ search, category, difficulty, page }),
  });

  const generateMutation = useMutation({
    mutationFn: generateQuestions,
    onSuccess: (data) => {
      toast.success(data.message || "New questions generated!");
      queryClient.invalidateQueries({ queryKey: ["question-bank"] });
      setShowGenerate(false);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const resetPage = () => setPage(1);

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Question Bank
          </h1>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Practice real interview questions with AI-written model answers.
          </p>
        </div>
        <button
          onClick={() => setShowGenerate((s) => !s)}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          <FiZap className="h-4 w-4" />
          Generate Questions
        </button>
      </div>

      {/* Generate Panel */}
      {showGenerate && (
        <div className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-900/40 dark:bg-indigo-950/20 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                Category
              </label>
              <select
                value={genCategory}
                onChange={(e) => setGenCategory(e.target.value as QuestionCategory)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                {QUESTION_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                Difficulty
              </label>
              <select
                value={genDifficulty}
                onChange={(e) => setGenDifficulty(e.target.value as QuestionDifficulty)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                {QUESTION_DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => generateMutation.mutate({ category: genCategory, difficulty: genDifficulty, count: 5 })}
              disabled={generateMutation.isPending}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              {generateMutation.isPending ? "Generating..." : "Generate 5"}
            </button>
          </div>
        </div>
      )}

      {/* Filter bar */}
      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); resetPage(); }}
            placeholder="Search questions or tags..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-950"
          />
        </div>
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); resetPage(); }}
          className="rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 sm:w-44"
        >
          <option value="">All Categories</option>
          {QUESTION_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={difficulty}
          onChange={(e) => { setDifficulty(e.target.value); resetPage(); }}
          className="rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 sm:w-40"
        >
          <option value="">All Levels</option>
          {QUESTION_DIFFICULTIES.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {isError && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
          <FiAlertCircle className="h-5 w-5 shrink-0" />
          <span>{(error as Error).message}</span>
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <QuestionCardSkeleton key={i} />)}
        </div>
      )}

      {!isLoading && data?.data.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 px-4 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 dark:bg-slate-800/60 dark:text-slate-500">
            <FiBookOpen className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No questions found</h3>
          <p className="mt-1 max-w-xs text-sm text-slate-500 dark:text-slate-400">
            Try a different filter, or generate new questions with AI.
          </p>
        </div>
      )}

      {!isLoading && data && data.data.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.data.map((item) => <QuestionCard key={item._id} item={item} />)}
          </div>

          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-xs transition-all hover:bg-slate-50 disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Page {data.page} of {data.totalPages || 1}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
              disabled={page >= data.totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-xs transition-all hover:bg-slate-50 disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}