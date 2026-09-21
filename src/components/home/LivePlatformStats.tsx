"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FiUsers, FiMap, FiBookOpen, FiMic } from "react-icons/fi";
import type { IconType } from "react-icons";

interface PlatformStats {
  totalUsers: number;
  totalRoadmaps: number;
  totalQuestions: number;
  totalInterviews: number;
}

async function fetchPlatformStats(): Promise<PlatformStats> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/platform/stats`);
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load stats");
  return data.data;
}

function AnimatedNumber({ value, shouldAnimate }: { value: number; shouldAnimate: boolean }) {
  const [display, setDisplay] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!shouldAnimate || hasRun.current || value === 0) return;
    hasRun.current = true;

    const duration = 1400;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [shouldAnimate, value]);

  return <>{display.toLocaleString()}</>;
}

interface StatItem {
  label: string;
  key: keyof PlatformStats;
  icon: IconType;
  suffix?: string;
  color: string;
  bg: string;
}

const statItems: StatItem[] = [
  {
    label: "Registered Users",
    key: "totalUsers",
    icon: FiUsers,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 border-blue-100 dark:bg-blue-950/50 dark:border-blue-900/40",
  },
  {
    label: "Roadmaps Generated",
    key: "totalRoadmaps",
    icon: FiMap,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/50 dark:border-emerald-900/40",
  },
  {
    label: "Questions in Bank",
    key: "totalQuestions",
    icon: FiBookOpen,
    suffix: "+",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 border-amber-100 dark:bg-amber-950/50 dark:border-amber-900/40",
  },
  {
    label: "Interviews Completed",
    key: "totalInterviews",
    icon: FiMic,
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 border-rose-100 dark:bg-rose-950/50 dark:border-rose-900/40",
  },
];

export default function LivePlatformStats() {
  const [inView, setInView] = useState(false);
  const { data } = useQuery({
    queryKey: ["platform-stats"],
    queryFn: fetchPlatformStats,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="border-t border-border/60 bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => setInView(true)}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {statItems.map((item, i) => {
            const Icon = item.icon;
            const value = data?.[item.key] ?? 0;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 rounded-3xl border border-slate-200/80 bg-white px-4 py-6 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:py-8"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${item.bg}`}>
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <p className="text-2xl font-extrabold tabular-nums text-slate-900 dark:text-white sm:text-3xl">
                  <AnimatedNumber value={value} shouldAnimate={inView} />
                  {item.suffix ?? ""}
                </p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}