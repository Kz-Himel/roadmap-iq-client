"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FiMap, FiBookOpen, FiMic, FiActivity } from "react-icons/fi";
import type { IconType } from "react-icons";

type ActivityType = "roadmap" | "question" | "interview";

interface ActivityItem {
  text: string;
  type: ActivityType;
  timestamp: string;
}

async function fetchActivity(): Promise<ActivityItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/platform/activity`);
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load activity");
  return data.data;
}

const typeConfig: Record<ActivityType, { icon: IconType; color: string; dot: string }> = {
  roadmap: { icon: FiMap, color: "text-blue-500 dark:text-blue-400", dot: "bg-blue-500" },
  question: { icon: FiBookOpen, color: "text-amber-500 dark:text-amber-400", dot: "bg-amber-500" },
  interview: { icon: FiMic, color: "text-rose-500 dark:text-rose-400", dot: "bg-rose-500" },
};

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function LiveActivityFeed() {
  const { data: activity, isLoading, isError } = useQuery({
    queryKey: ["platform-activity"],
    queryFn: fetchActivity,
    refetchInterval: 30_000,
    refetchOnWindowFocus: false,
  });

  if (isError) return null;

  return (
    <section className="border-t border-border/60 bg-background-alt py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:items-center">
          {/* Left: intro */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/60 dark:text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              System Status: Live
            </span>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Real Activity, Not a Demo
            </h2>
            <p className="max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
              Every roadmap, question, and mock interview below is a real
              event happening on CareerPilot AI right now — pulled live
              from our database, refreshing every 30 seconds.
            </p>
          </motion.div>

          {/* Right: console-style feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900 lg:col-span-3"
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 flex items-center gap-1.5 font-mono text-[11px] text-slate-400 dark:text-slate-500">
                <FiActivity className="h-3 w-3" />
                activity-feed.log
              </span>
            </div>

            {/* Log lines */}
            <div className="h-[340px] space-y-1 overflow-y-auto px-4 py-4 font-mono text-xs sm:text-[13px]">
              {isLoading && (
                <div className="space-y-2.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-4 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                  ))}
                </div>
              )}

              {!isLoading && (!activity || activity.length === 0) && (
                <p className="text-slate-400 dark:text-slate-500">No activity yet — be the first to generate a roadmap!</p>
              )}

              <AnimatePresence initial={false}>
                {activity?.map((item) => {
                  const config = typeConfig[item.type];
                  const Icon = config.icon;
                  return (
                    <motion.div
                      key={`${item.type}-${item.timestamp}`}
                      layout
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-2.5 rounded-lg px-2 py-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${config.dot}`} />
                      <Icon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${config.color}`} />
                      <span className="flex-1 leading-relaxed text-slate-700 dark:text-slate-300">
                        {item.text}
                      </span>
                      <span className="shrink-0 whitespace-nowrap text-slate-400 dark:text-slate-500">
                        {timeAgo(item.timestamp)}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}