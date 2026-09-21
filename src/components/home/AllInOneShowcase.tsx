"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiMap,
  FiMessageCircle,
  FiBookOpen,
  FiMic,
  FiArrowRight,
} from "react-icons/fi";

const features = [
  {
    title: "AI Roadmap",
    description: "Personalized 3-6 month learning paths.",
    icon: FiMap,
    href: "/register",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-100 dark:border-indigo-900/40",
  },
  {
    title: "AI Career Chat",
    description: "Ask anything, get context-aware guidance.",
    icon: FiMessageCircle,
    href: "/register",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/50 border-violet-100 dark:border-violet-900/40",
  },
  {
    title: "Question Bank",
    description: "Curated questions with model answers.",
    icon: FiBookOpen,
    href: "/register",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900/40",
  },
  {
    title: "Mock Interview",
    description: "Live AI interviews with instant scoring.",
    icon: FiMic,
    href: "/register",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/50 border-amber-100 dark:border-amber-900/40",
  },
];

export default function AllInOneShowcase() {
  return (
    <section className="border-t border-border/60 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {/* Top wide gradient CTA tile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-8 shadow-lg shadow-indigo-600/20 dark:shadow-indigo-500/10 sm:col-span-4 sm:p-12"
          >
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-16 left-1/3 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

            <div className="relative mx-auto max-w-2xl text-center">
              <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                One Platform, Every Step
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
                Everything You Need to Land the Job
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-indigo-100 sm:text-base">
                From your first roadmap to your final interview — CareerPilot AI
                guides you with one connected toolkit, not four different apps.
              </p>
              <Link
                href="/register"
                className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-700 shadow-md transition-transform hover:scale-[1.03]"
              >
                Get Started Free
                <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* 4 feature tiles */}
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  href={feature.href}
                  className="group flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                >
                  <div
                    className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:scale-105 ${feature.bg}`}
                  >
                    <Icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <h3 className="mb-1.5 text-base font-bold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mb-4 flex-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {feature.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Explore
                    <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}