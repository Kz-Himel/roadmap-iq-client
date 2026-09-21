"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiMic,
  FiArrowRight,
  FiCpu,
  FiZap,
  FiUsers,
  FiTarget,
} from "react-icons/fi";

export default function AIInterviewShowcase() {
  return (
    <section className="border-t border-border/60 bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
        >
          <span className="mb-3 inline-block rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:border-indigo-900/40 dark:bg-indigo-950/60 dark:text-indigo-400">
            New · AI Mock Interview
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Practice Like It&apos;s the Real Thing
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Face a live AI interviewer, get scored on every answer, and walk in confident.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:grid-rows-2">
          {/* Large mockup tile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:col-span-2 sm:row-span-2 sm:p-8"
          >
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-indigo-100/60 to-violet-100/40 blur-3xl dark:from-indigo-500/10 dark:to-violet-500/5" />

            <div className="relative">
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-600/20 dark:shadow-indigo-500/10">
                <FiMic className="h-5 w-5 text-white" />
              </div>

              <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                Live AI Interview Sessions
              </h3>
              <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Pick a role, difficulty, and interview type — the AI asks real
                questions and evaluates every answer in real time.
              </p>

              {/* Mock chat preview */}
              <div className="mb-6 space-y-2.5 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-600 dark:from-indigo-950/60 dark:to-violet-950/60 dark:text-indigo-400">
                    <FiCpu className="h-3 w-3" />
                  </div>
                  <div className="max-w-[80%] rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-xs leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    Tell me about a time you optimized a slow API endpoint.
                  </div>
                </div>
                <div className="flex flex-row-reverse items-start gap-2.5">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <FiUsers className="h-3 w-3" />
                  </div>
                  <div className="max-w-[80%] rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-2 text-xs leading-relaxed text-white">
                    I profiled the query, added an index, and introduced caching...
                  </div>
                </div>
                <div className="ml-8 inline-flex items-center gap-1.5 rounded-lg border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-400">
                  8/10 · Strong technical depth
                </div>
              </div>

              <Link
                href="/register"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400"
              >
                Try a Mock Interview
                <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Small tile 1 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:col-span-2 sm:p-6"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-100 dark:bg-amber-950/50 dark:border-amber-900/40">
              <FiZap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="mb-1.5 text-base font-bold text-slate-900 dark:text-white">
                Instant, Honest Feedback
              </h4>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Every answer gets a score out of 10 and specific tips to improve — no waiting, no guesswork.
              </p>
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
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 border border-violet-100 dark:bg-violet-950/50 dark:border-violet-900/40">
              <FiTarget className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h4 className="mb-1.5 text-sm font-bold text-slate-900 dark:text-white">
                3 Interview Types
              </h4>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Technical, Behavioral &amp; HR — matched to your target role.
              </p>
            </div>
          </motion.div>

          {/* Small tile 3 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 dark:bg-indigo-950/50 dark:border-indigo-900/40">
              <FiCpu className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h4 className="mb-1.5 text-sm font-bold text-slate-900 dark:text-white">
                Adaptive Questions
              </h4>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Each question builds naturally on your last answer.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}