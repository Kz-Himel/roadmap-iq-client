"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  FiPlay,
  FiCheckCircle,
  FiBell,
  FiSearch,
  FiChevronRight,
  FiLayout,
  FiMap,
  FiTarget,
  FiMessageSquare,
  FiFolder,
  FiBookmark,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export default function Banner() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Glow Overlay */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 opacity-30 blur-3xl dark:opacity-20">
        <div className="h-[400px] w-[700px] bg-gradient-to-tr from-blue-600 to-indigo-500 opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Side Column */}
          <div className="lg:col-span-6 xl:col-span-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100/80 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-400"
            >
              <HiSparkles className="h-3.5 w-3.5 text-blue-500" />
              <span>AI-Powered Career Guidance</span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
            >
              Build Your <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
                Dream Career Path
              </span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="mt-6 text-lg text-slate-600 dark:text-slate-300"
            >
              Discover step-by-step career roadmaps, AI recommendations, and interactive visual paths tailored to your goals.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/explore"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-6 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-700 active:scale-95"
              >
                <span>Explore Careers</span>
                <FiChevronRight className="h-4 w-4" />
              </Link>

              <Link
                href="/demo"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <FiPlay className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Watch Demo</span>
              </Link>
            </motion.div>

            {/* Feature Checklist */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-slate-600 dark:text-slate-400"
            >
              <div className="flex items-center gap-1.5">
                <FiCheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Personalized Roadmaps</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiCheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Track Progress</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiCheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>AI Career Chat</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side Column (Original Mockup Layout with Matched Theme Colors) */}
          <div className="lg:col-span-6 xl:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              {/* Main Dashboard Preview Card */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-2xl backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#0b1329]/90">
                
                {/* Mock Card Header */}
                <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <div className="flex h-3 w-3 items-center justify-center rounded-full bg-red-400/80" />
                    <div className="flex h-3 w-3 items-center justify-center rounded-full bg-amber-400/80" />
                    <div className="flex h-3 w-3 items-center justify-center rounded-full bg-emerald-400/80" />
                    <span className="ml-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
                      RoadmapIQ Workspace
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <FiSearch className="h-3.5 w-3.5" />
                    <FiBell className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Grid Content Mockup */}
                <div className="grid grid-cols-12 gap-3">
                  
                  {/* Left Small Sidebar Mock */}
                  <div className="col-span-3 hidden flex-col gap-2 sm:flex">
                    <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-2.5 py-2 text-xs font-semibold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                      <FiLayout className="h-3.5 w-3.5" />
                      <span>Overview</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50">
                      <FiMap className="h-3.5 w-3.5" />
                      <span>Roadmaps</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50">
                      <FiTarget className="h-3.5 w-3.5" />
                      <span>Goals</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50">
                      <FiMessageSquare className="h-3.5 w-3.5" />
                      <span>AI Advisor</span>
                    </div>
                  </div>

                  {/* Main Roadmap Tree Area */}
                  <div className="col-span-12 sm:col-span-9">
                    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800/60 dark:bg-slate-900/40">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            Full-Stack Engineer Path
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            Progress: 68% Completed
                          </p>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                          Active
                        </span>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-blue-600 to-indigo-500" />
                      </div>

                      {/* Mock Nodes */}
                      <div className="mt-4 flex flex-col gap-2.5">
                        <div className="flex items-center justify-between rounded-lg border border-slate-200/60 bg-white p-2.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                          <div className="flex items-center gap-2">
                            <FiCheckCircle className="h-4 w-4 text-emerald-500" />
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                              Frontend Fundamentals
                            </span>
                          </div>
                          <span className="text-[10px] font-medium text-slate-400">Done</span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50/50 p-2.5 shadow-xs dark:border-blue-900/60 dark:bg-blue-950/30">
                          <div className="flex items-center gap-2">
                            <HiSparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                              React & Next.js Ecosystem
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">In Progress</span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-slate-200/60 bg-white p-2.5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                          <div className="flex items-center gap-2">
                            <FiFolder className="h-4 w-4 text-slate-400" />
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                              Backend Architecture & DB
                            </span>
                          </div>
                          <span className="text-[10px] font-medium text-slate-400">Next</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: AI Prompt Chip */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -bottom-5 -left-5 hidden items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white p-3 shadow-xl backdrop-blur-md sm:flex dark:border-slate-800 dark:bg-[#0b1329]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <FiBookmark className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-900 dark:text-white">Next Recommendation</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Learn TypeScript Generics</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: User Stat */}
              <motion.div
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -top-4 -right-4 hidden items-center gap-2 rounded-xl border border-slate-200/80 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-md sm:flex dark:border-slate-800 dark:bg-[#0b1329]/95"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  1,240+ Active Learners
                </span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}