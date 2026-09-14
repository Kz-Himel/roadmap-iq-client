"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { FiArrowRight, FiAlertCircle } from "react-icons/fi";
import GoalCard, { GoalCardSkeleton } from "@/components/explore/GoalCard";
import type { Goal } from "@/types/goal";

async function fetchPopularGoals(): Promise<Goal[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals/popular`);
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to load popular goals");
  }
  return data.data;
}

export default function PopularRoadmaps() {
  const { data: goals, isLoading, isError } = useQuery({
    queryKey: ["popular-goals"],
    queryFn: fetchPopularGoals,
  });

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col items-center justify-between gap-4 text-center sm:mb-10 sm:flex-row sm:text-left"
        >
          <div className="flex flex-col items-center sm:items-start">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Trending
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Explore Popular Career Goals
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 sm:text-base max-w-md">
              See what career goals other learners are working toward.
            </p>
          </div>

          <Link
            href="/explore"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 transition-colors hover:text-blue-700 dark:hover:text-blue-300"
          >
            View All
            <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Error Alert Box */}
        {isError && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200/80 bg-red-50 p-4 text-xs font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
            <FiAlertCircle className="h-4 w-4 shrink-0" />
            <span>Failed to load career goals. Please try again later.</span>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => <GoalCardSkeleton key={i} />)}

          {!isLoading &&
            goals?.map((goal, i) => (
              <motion.div
                key={goal._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <GoalCard goal={goal} />
              </motion.div>
            ))}
        </div>

        {/* Empty State */}
        {!isLoading && goals?.length === 0 && (
          <div className="flex min-h-[160px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-8 text-center">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              No career goals yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}