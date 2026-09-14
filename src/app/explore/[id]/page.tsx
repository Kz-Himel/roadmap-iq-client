"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiBriefcase,
  FiDollarSign,
  FiClock,
  FiAlertCircle,
  FiFileText,
  FiCheckCircle,
} from "react-icons/fi";
import type { Goal } from "@/types/goal";
import SaveGuideButton from "@/components/goals/SavedGuideButton";

interface GoalResponse {
  success: boolean;
  message: string;
  data: Goal;
}

async function fetchGoalById(id: string): Promise<Goal> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals/${id}`);
  const data: GoalResponse & { message?: string } = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to load career guide");
  }
  return data.data;
}

function DetailsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-6 h-4 w-28 rounded-lg bg-slate-200 dark:bg-slate-800" />
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 h-7 w-2/3 rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="mb-2 h-3 w-full rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-2/3 rounded-lg bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}

export default function GoalDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data: goal, isLoading, isError, error } = useQuery({
    queryKey: ["goal-details", id],
    queryFn: () => fetchGoalById(id),
    enabled: !!id,
  });

  if (isLoading) return <DetailsSkeleton />;

  if (isError || !goal) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-1.5 rounded-xl text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to Explore
        </button>
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
          <FiAlertCircle className="h-5 w-5 shrink-0" />
          <span>{(error as Error)?.message || "Career guide not found."}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Link
        href="/explore"
        className="mb-6 inline-flex items-center gap-1.5 rounded-xl text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
      >
        <FiArrowLeft className="h-4 w-4" />
        Back to Explore
      </Link>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/30">
            <FiDollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Approx. Salary Range</p>
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{goal.salaryRange}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950/50 border border-violet-100 dark:border-violet-900/30">
            <FiClock className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Estimated Time to Learn</p>
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{goal.estimatedTime}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_280px]">
        {/* Overview */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/30">
                <FiBriefcase className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">{goal.title}</h1>
            </div>
            <SaveGuideButton goalId={goal._id} />
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800/80 pt-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <FiFileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              Overview
            </h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-[15px]">
              {goal.description}
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-10 h-fit rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <FiCheckCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            Required Skills
          </p>

          {goal.requiredSkills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {goal.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 border border-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-900/40"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 dark:text-slate-500">No specific skills listed.</p>
          )}
        </div>
      </div>
    </div>
  );
}