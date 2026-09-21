"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiUser, FiTrendingUp, FiAward, FiArrowRight } from "react-icons/fi";

const paths = [
  {
    level: "Beginner",
    title: "New to Tech",
    description: "Just starting out? Get a step-by-step roadmap built for absolute beginners.",
    icon: FiUser,
    iconColor: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/40",
    href: "/register",
  },
  {
    level: "Intermediate",
    title: "Some Experience",
    description: "Already know the basics? Sharpen your skills and target your next role.",
    icon: FiTrendingUp,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/40",
    href: "/register",
  },
  {
    level: "Advanced",
    title: "Ready to Level Up",
    description: "Experienced professional? Get advanced roadmaps and interview prep.",
    icon: FiAward,
    iconColor: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/40",
    href: "/register",
  },
];

export default function WhereToStart() {
  return (
    <section className="border-t border-border/60 bg-background-alt py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center mb-12 sm:mb-16"
        >
          <span className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
            Getting Started
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Not Sure Where to Start?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 mx-auto max-w-md">
            Tell us where you are, and we&apos;ll guide you from there.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {paths.map((path, i) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.level}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  href={path.href}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${path.bg} transition-transform duration-200 group-hover:scale-105`}
                  >
                    <Icon className={`h-6 w-6 ${path.iconColor}`} />
                  </div>
                  <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {path.level}
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                    {path.title}
                  </h3>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {path.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Get Started
                    <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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