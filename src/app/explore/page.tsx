"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiTarget,
  FiChevronLeft,
  FiChevronRight,
  FiAlertCircle,
  FiSliders,
} from "react-icons/fi";
import type { Goal } from "@/types/goal";
import GoalCard, { GoalCardSkeleton } from "@/components/explore/GoalCard";

interface GoalsResponse {
  success: boolean;
  total: number;
  page: number;
  totalPages: number;
  data: Goal[];
}

async function fetchExploreGoals(params: {
  search: string;
  requiredSkills: string;
  sort: string;
  page: number;
}): Promise<GoalsResponse> {
  const query = new URLSearchParams({
    search: params.search,
    requiredSkills: params.requiredSkills,
    sort: params.sort,
    page: String(params.page),
    limit: "8",
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals?${query}`);
  const data = await res.json();

  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load goals");
  return data;
}

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["explore-goals", search, requiredSkills, sort, page],
    queryFn: () => fetchExploreGoals({ search, requiredSkills, sort, page }),
  });

  const resetPage = () => setPage(1);

  return (
    <main className="min-h-screen bg-slate-50/50 px-8 py-12 dark:bg-slate-950 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40"
          >
            Discover
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl"
          >
            Explore Career Goals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base"
          >
            See what career goals other learners are working toward and build your own momentum.
          </motion.p>
        </div>

        {/* Search + Filters Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:flex-nowrap">
            {/* Search Input Container */}
            <div className="relative flex-1 lg:min-w-[280px]">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  resetPage();
                }}
                placeholder="Search by title or role..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-11 pr-4 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-blue-500/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-500/50 dark:focus:bg-slate-950 dark:focus:ring-blue-500/10"
              />
            </div>

            {/* Divider Line (Desktop only) */}
            <div className="hidden h-8 w-px bg-slate-200 dark:bg-slate-800 lg:block" />

            {/* Mobile Filters Label */}
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 lg:hidden">
              <FiSliders className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Filters</span>
            </div>

            {/* Interactive Selectors Dropdowns */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-1 lg:flex-nowrap lg:gap-4">
              
              {/* 1: Skills Input */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={requiredSkills}
                  onChange={(e) => {
                    setRequiredSkills(e.target.value);
                    resetPage();
                  }}
                  placeholder="Filter by skill (e.g. React)..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-700 transition-all placeholder:text-slate-400 focus:border-blue-500/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-blue-500/50 dark:focus:bg-slate-950 dark:focus:ring-blue-500/10"
                />
              </div>

              {/* Sort Select */}
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  resetPage();
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-700 transition-all focus:border-blue-500/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-200 dark:focus:border-blue-500/50 dark:focus:bg-slate-950 dark:focus:ring-blue-500/10 lg:w-44"
              >
                <option value="newest" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Newest First</option>
                <option value="oldest" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">Oldest First</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Error Handling State */}
        {isError && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400"
          >
            <FiAlertCircle className="h-5 w-5 shrink-0" />
            <span>{(error as Error).message}</span>
          </motion.div>
        )}

        {/* Loading Skeleton States Grid */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <GoalCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Main Content Layout Block */}
        <AnimatePresence mode="wait">
          {!isLoading && data?.data.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 px-4 text-center dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 dark:bg-slate-800/60 dark:text-slate-500">
                <FiTarget className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">No goals found</h3>
              <p className="mt-1 max-w-xs text-sm text-slate-500 dark:text-slate-400">
                We couldn't find matches. Try modifying your key search terms or filters.
              </p>
            </motion.div>
          )}

          {!isLoading && data && data.data.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Goal Cards Responsive Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.data.map((goal, i) => (
                  <motion.div
                    key={goal._id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    whileHover={{ y: -4 }}
                    className="h-full transition-shadow duration-300"
                  >
                    <GoalCard goal={goal} />
                  </motion.div>
                ))}
              </div>

              {/* Navigation Dynamic Pagination Controls */}
              <div className="mt-12 flex items-center justify-center gap-5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-xs transition-all hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-slate-900"
                >
                  <FiChevronLeft className="h-5 w-5" />
                </button>

                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Page {data.page} of {data.totalPages || 1}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                  disabled={page >= data.totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-xs transition-all hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-slate-900"
                >
                  <FiChevronRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}