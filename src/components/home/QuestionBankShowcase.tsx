"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiBookOpen,
  FiArrowRight,
  FiLayers,
  FiCpu,
  FiSearch,
  FiTag,
} from "react-icons/fi";

const categories = [
  { label: "Frontend", color: "bg-indigo-500" },
  { label: "Backend", color: "bg-emerald-500" },
  { label: "DSA", color: "bg-amber-500" },
  { label: "System Design", color: "bg-rose-500" },
  { label: "Behavioral", color: "bg-violet-500" },
];

export default function QuestionBankShowcase() {
  return (
    <section className="border-t border-border/60 bg-background-alt py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
        >
          <span className="mb-3 inline-block rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:border-emerald-900/40 dark:bg-emerald-950/60 dark:text-emerald-400">
            New · Question Bank
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            A Growing Library of Real Questions
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Browse curated interview questions with clear, AI-written model answers — organized by category and difficulty.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:grid-rows-2">
          {/* Small tile 1 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 dark:bg-emerald-950/50 dark:border-emerald-900/40">
              <FiLayers className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h4 className="mb-1.5 text-sm font-bold text-slate-900 dark:text-white">
                5 Core Categories
              </h4>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Frontend, Backend, DSA, System Design &amp; Behavioral.
              </p>
            </div>
          </motion.div>

          {/* Large mockup tile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:col-span-2 sm:row-span-2 sm:p-8"
          >
            <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-gradient-to-tr from-emerald-100/60 to-indigo-100/40 blur-3xl dark:from-emerald-500/10 dark:to-indigo-500/5" />

            <div className="relative">
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 shadow-lg shadow-emerald-600/20 dark:shadow-emerald-500/10">
                <FiBookOpen className="h-5 w-5 text-white" />
              </div>

              <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                Question Bank
              </h3>
              <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Search, filter by category or difficulty, and reveal a
                model answer whenever you&apos;re ready.
              </p>

              {/* Mock question card preview */}
              <div className="mb-6 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="mb-3 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center rounded-lg border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:border-indigo-900/40 dark:bg-indigo-950/50 dark:text-indigo-300">
                    Frontend
                  </span>
                  <span className="inline-flex items-center rounded-lg border border-amber-100 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/50 dark:text-amber-400">
                    Medium
                  </span>
                </div>
                <p className="mb-3 text-xs font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
                  What is the difference between debouncing and throttling?
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                  <FiTag className="h-3 w-3" />
                  performance, events
                </div>
              </div>

              <Link
                href="/register"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400"
              >
                Explore Question Bank
                <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Small tile 2 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 dark:bg-indigo-950/50 dark:border-indigo-900/40">
              <FiCpu className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h4 className="mb-1.5 text-sm font-bold text-slate-900 dark:text-white">
                AI-Written Answers
              </h4>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Every question comes with a clear model answer, generated on demand.
              </p>
            </div>
          </motion.div>

          {/* Wide bottom tile: category pills + search */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:col-span-1 sm:p-6"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 border border-rose-100 dark:bg-rose-950/50 dark:border-rose-900/40">
              <FiSearch className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <h4 className="mb-1.5 text-sm font-bold text-slate-900 dark:text-white">
                Search &amp; Filter
              </h4>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Find exactly what you need to practice, fast.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Category strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          {categories.map((cat) => (
            <span
              key={cat.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${cat.color}`} />
              {cat.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}