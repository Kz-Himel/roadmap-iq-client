"use client";

import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiTarget, FiMap, FiMessageCircle, FiAward, FiAlertCircle } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

interface DashboardStats {
  totalGuides: number;
  roadmapsGenerated: number;
  aiConversations: number;
  skillsLearned: number;
}

interface ProgressPoint {
  month: string;
  progress: number;
}

async function fetchStats(): Promise<DashboardStats> {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load stats");
  return data.data;
}

async function fetchProgressOverview(): Promise<ProgressPoint[]> {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/progress-overview`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load progress");
  return data.data;
}

const statCards = [
  {
    key: "totalGuides" as const,
    label: "Total Goals",
    icon: FiTarget,
    bg: "bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/40",
    color: "text-indigo-600 dark:text-indigo-400",
  },
  {
    key: "roadmapsGenerated" as const,
    label: "Roadmaps Generated",
    icon: FiMap,
    bg: "bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/40",
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "aiConversations" as const,
    label: "AI Conversations",
    icon: FiMessageCircle,
    bg: "bg-violet-50 dark:bg-violet-950/50 border border-violet-100 dark:border-violet-900/40",
    color: "text-violet-600 dark:text-violet-400",
  },
  {
    key: "skillsLearned" as const,
    label: "Skills Learned",
    icon: FiAward,
    bg: "bg-amber-50 dark:bg-amber-950/50 border border-amber-100 dark:border-amber-900/40",
    color: "text-amber-600 dark:text-amber-400",
  },
];

function StatCardSkeleton() {
  return (
    <div className="card card-body bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
      <div className="skeleton mb-4 h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
      <div className="skeleton mb-2 h-3 w-1/2 rounded-lg bg-slate-200 dark:bg-slate-800" />
      <div className="skeleton h-6 w-1/3 rounded-lg bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}

export default function DashboardPage() {
  // User profile / session data fetch
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name || "there";

  const { data: stats, isLoading: statsLoading, isError: statsError, error: statsErrorObj } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchStats,
  });

  const { data: progressData, isLoading: progressLoading } = useQuery({
    queryKey: ["dashboard-progress"],
    queryFn: fetchProgressOverview,
  });

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Welcome back, {userName}! 👋
        </h1>
        <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
          Let&apos;s continue your journey toward your dream career.
        </p>
      </div>

      {statsError && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
          <FiAlertCircle className="h-4 w-4 shrink-0" />
          <span>{(statsErrorObj as Error).message}</span>
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statsLoading &&
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}

        {!statsLoading &&
          stats &&
          statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.key}
                className="card card-hover card-body rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6"
              >
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${card.bg}`}>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {stats[card.key]}
                </p>
              </div>
            );
          })}
      </div>

      <div className="card card-body rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <h2 className="mb-5 text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
          Your Progress Overview
        </h2>

        {progressLoading && (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600 dark:border-indigo-900 dark:border-t-indigo-400" />
              <p className="text-sm text-slate-500 dark:text-slate-400">Loading chart...</p>
            </div>
          </div>
        )}

        {!progressLoading && (!progressData || progressData.length === 0) && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No progress data yet</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Add goals and track progress to see your chart.
            </p>
          </div>
        )}

        {!progressLoading && progressData && progressData.length > 0 && (
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, className: "fill-slate-500 dark:fill-slate-400" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, className: "fill-slate-500 dark:fill-slate-400" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    fontSize: "13px",
                  }}
                  wrapperClassName="![&>.recharts-default-tooltip]:!border-slate-200 ![&>.recharts-default-tooltip]:!bg-white ![&>.recharts-default-tooltip]:!shadow-md dark:![&>.recharts-default-tooltip]:!border-slate-800 dark:![&>.recharts-default-tooltip]:!bg-slate-900 dark:![&>.recharts-default-tooltip]:!text-slate-200"
                  formatter={(value) => [`${Number(value ?? 0)}%`, "Progress"]}
                />
                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#6366f1", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#6366f1" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}