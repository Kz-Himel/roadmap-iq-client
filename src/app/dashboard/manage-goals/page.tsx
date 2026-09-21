"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  FiPlus,
  FiEye,
  FiEdit2,
  FiBriefcase,
  FiDollarSign,
  FiClock,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import type { Goal } from "@/types/goal";
import EditGoalForm from "@/components/goals/EditGoalForm";
import DeleteGoalDialog from "@/components/goals/DeleteGoalDialog";

async function fetchGoals(): Promise<Goal[]> {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load career guides");
  return data.data;
}

function GoalCardSkeleton() {
  return (
    <div className="card card-body rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="skeleton mb-4 h-9 w-9 rounded-xl bg-slate-200 dark:bg-slate-800" />
      <div className="skeleton mb-2 h-4 w-2/3 rounded-lg bg-slate-200 dark:bg-slate-800" />
      <div className="skeleton mb-4 h-3 w-full rounded-lg bg-slate-200 dark:bg-slate-800" />
      <div className="skeleton h-9 w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}

export default function ManageGoalsPage() {
  const [editTarget, setEditTarget] = useState<Goal | null>(null);

  const { data: goals, isLoading, isError, error } = useQuery({
    queryKey: ["goals"],
    queryFn: fetchGoals,
  });

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            My Career Guides
          </h1>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            Manage the career guides you&apos;ve posted.
          </p>
        </div>
        <Link
          href="/dashboard/add-goal"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 active:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <FiPlus className="h-4 w-4" />
          Add Guide
        </Link>
      </div>

      {isError && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{(error as Error).message}</span>
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <GoalCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && goals?.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300/80 bg-white/50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/50 sm:p-12">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
            <FiBriefcase className="h-7 w-7 text-slate-400 dark:text-slate-500" />
          </div>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No career guides yet</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Post your first career guide to get started.
          </p>
          <Link
            href="/dashboard/add-goal"
            className="mt-5 inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Add Guide
          </Link>
        </div>
      )}

      {!isLoading && goals && goals.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {goals.map((goal) => (
            <div
              key={goal._id}
              className="card card-hover flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 dark:bg-blue-950/50 dark:border-blue-900/40">
                <FiBriefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>

              <h3 className="mb-1 line-clamp-1 text-base font-semibold text-slate-900 dark:text-white">
                {goal.title}
              </h3>

              <p className="mb-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                {goal.description}
              </p>

              {goal.requiredSkills?.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {goal.requiredSkills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 border border-blue-100/80 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900/50"
                    >
                      {skill}
                    </span>
                  ))}
                  {goal.requiredSkills.length > 3 && (
                    <span className="inline-flex items-center rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      +{goal.requiredSkills.length - 3}
                    </span>
                  )}
                </div>
              )}

              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <FiDollarSign className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  {goal.salaryRange}
                </span>
                <span className="flex items-center gap-1">
                  <FiClock className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  {goal.estimatedTime}
                </span>
              </div>

              <div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                <Link
                  href={`/explore/${goal._id}`}
                  className="flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 active:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <FiEye className="h-3.5 w-3.5" />
                  View
                </Link>
                <button
                  onClick={() => setEditTarget(goal)}
                  className="flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-blue-200/80 bg-blue-50 px-3 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100/80 dark:border-blue-900/50 dark:bg-blue-950/60 dark:text-blue-300 dark:hover:bg-blue-900/60"
                >
                  <FiEdit2 className="h-3.5 w-3.5" />
                  Edit
                </button>
                <DeleteGoalDialog goalId={goal._id} goalTitle={goal.title} />
              </div>
            </div>
          ))}
        </div>
      )}

      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg">
            <div className="mb-3 flex items-center justify-between px-1">
              <h3 className="text-base font-bold text-white sm:text-lg">Edit Career Guide</h3>
              <button
                onClick={() => setEditTarget(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white/80 transition-colors hover:bg-white/10"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
            <EditGoalForm
              goal={editTarget}
              onSuccess={() => setEditTarget(null)}
              onCancel={() => setEditTarget(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}