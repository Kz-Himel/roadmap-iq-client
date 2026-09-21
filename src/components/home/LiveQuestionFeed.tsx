"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { FiArrowRight, FiHelpCircle } from "react-icons/fi";
import type { QuestionBankItem, QuestionDifficulty } from "@/types/questionBank";

interface QuestionsResponse {
  success: boolean;
  data: QuestionBankItem[];
}

async function fetchLatestQuestions(): Promise<QuestionBankItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions?limit=4&page=1`);
  const data: QuestionsResponse & { message?: string } = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load questions");
  return data.data;
}

const difficultyStyles: Record<QuestionDifficulty, string> = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900/40",
  Medium: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900/40",
  Hard: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-900/40",
};

function FeedSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-3 flex gap-2">
            <div className="h-5 w-16 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
            <div className="h-5 w-14 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
          </div>
          <div className="mb-2 h-3.5 w-full animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
          <div className="h-3.5 w-2/3 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
        </div>
      ))}
    </div>
  );
}

export default function LiveQuestionFeed() {
  const { data: questions, isLoading, isError } = useQuery({
    queryKey: ["home-question-feed"],
    queryFn: fetchLatestQuestions,
    refetchInterval: 60_000,
    refetchOnWindowFocus: false,
  });

  if (isError) return null;

  return (
    <section className="border-t border-border/60 bg-background-alt py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col items-center gap-3 text-center sm:mb-14"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/60 dark:text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Live from the Question Bank
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Fresh Questions, Right Now
          </h2>
          <p className="max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Pulled straight from our live question bank — updates automatically as new ones are generated.
          </p>
        </motion.div>

        {isLoading && <FeedSkeleton />}

        {!isLoading && questions && questions.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {questions.map((q, i) => (
              <motion.div
                key={q._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  href={`/dashboard/question-bank/${q._id}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center rounded-lg border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/50 dark:text-blue-300">
                      {q.category}
                    </span>
                    <span className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[10px] font-semibold ${difficultyStyles[q.difficulty]}`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <div className="mb-3 flex items-start gap-2">
                    <FiHelpCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500" />
                    <p className="line-clamp-3 text-sm font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
                      {q.question}
                    </p>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                    View Answer
                    <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-md dark:bg-blue-500 dark:shadow-blue-500/10 dark:hover:bg-blue-600"
          >
            Browse Full Question Bank
            <FiArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}