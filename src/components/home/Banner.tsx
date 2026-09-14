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
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 opacity-30 blur-3xl">
        <div className="h-[450px] w-[800px] bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-600/40 dark:via-indigo-600/40 dark:to-purple-600/40" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-6 xl:col-span-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary backdrop-blur-md"
            >
              <HiSparkles className="h-3.5 w-3.5 text-primary" />
              <span>AI-Powered Career Guidance</span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Build Your <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
                Dream Career Path
              </span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="mt-6 text-lg text-muted-foreground leading-relaxed"
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
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground shadow-lg shadow-blue-500/20 transition-all hover:opacity-90 active:scale-95"
              >
                <span>Explore Careers</span>
                <FiChevronRight className="h-4 w-4" />
              </Link>

              <Link
                href="/demo"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-surface px-6 font-semibold text-foreground backdrop-blur-md transition-all hover:bg-surface-hover"
              >
                <FiPlay className="h-4 w-4 text-primary" />
                <span>Watch Demo</span>
              </Link>
            </motion.div>

            {/* Checklist */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-muted-foreground"
            >
              <div className="flex items-center gap-1.5">
                <FiCheckCircle className="h-4 w-4 text-primary" />
                <span>Personalized Roadmaps</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiCheckCircle className="h-4 w-4 text-primary" />
                <span>Track Progress</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiCheckCircle className="h-4 w-4 text-primary" />
                <span>AI Career Chat</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Mockup Card) */}
          <div className="lg:col-span-6 xl:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              {/* Card using CSS Surface Token */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-2xl backdrop-blur-xl">
                
                {/* Header */}
                <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 text-xs font-semibold text-muted-foreground">
                      RoadmapIQ Workspace
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FiSearch className="h-3.5 w-3.5" />
                    <FiBell className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-3 hidden flex-col gap-2 sm:flex">
                    <div className="flex items-center gap-2 rounded-lg bg-primary/15 px-2.5 py-2 text-xs font-semibold text-primary">
                      <FiLayout className="h-3.5 w-3.5" />
                      <span>Overview</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground hover:bg-surface-hover hover:text-foreground">
                      <FiMap className="h-3.5 w-3.5" />
                      <span>Roadmaps</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground hover:bg-surface-hover hover:text-foreground">
                      <FiTarget className="h-3.5 w-3.5" />
                      <span>Goals</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground hover:bg-surface-hover hover:text-foreground">
                      <FiMessageSquare className="h-3.5 w-3.5" />
                      <span>AI Advisor</span>
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-9">
                    <div className="rounded-xl border border-border bg-background/50 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-foreground">
                            Full-Stack Engineer Path
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Progress: 68% Completed
                          </p>
                        </div>
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                          Active
                        </span>
                      </div>

                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                        <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-blue-600 to-indigo-500" />
                      </div>

                      <div className="mt-4 flex flex-col gap-2.5">
                        <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-2.5 shadow-xs">
                          <div className="flex items-center gap-2">
                            <FiCheckCircle className="h-4 w-4 text-emerald-500" />
                            <span className="text-xs font-semibold text-foreground">
                              Frontend Fundamentals
                            </span>
                          </div>
                          <span className="text-[10px] font-medium text-muted-foreground">Done</span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/10 p-2.5 shadow-xs">
                          <div className="flex items-center gap-2">
                            <HiSparkles className="h-4 w-4 text-primary" />
                            <span className="text-xs font-semibold text-primary">
                              React & Next.js Ecosystem
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-primary">In Progress</span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-2.5 shadow-xs">
                          <div className="flex items-center gap-2">
                            <FiFolder className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs font-semibold text-foreground">
                              Backend Architecture & DB
                            </span>
                          </div>
                          <span className="text-[10px] font-medium text-muted-foreground">Next</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute -bottom-5 -left-5 hidden items-center gap-2.5 rounded-xl border border-border bg-surface p-3 shadow-xl backdrop-blur-md sm:flex"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FiBookmark className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-foreground">Next Recommendation</p>
                  <p className="text-[10px] text-muted-foreground">Learn TypeScript Generics</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -top-4 -right-4 hidden items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 shadow-lg backdrop-blur-md sm:flex"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-foreground">
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