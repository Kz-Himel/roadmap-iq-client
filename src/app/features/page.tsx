"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiMap,
  FiMessageCircle,
  FiFileText,
  FiTarget,
  FiBarChart2,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";

const features = [
  {
    icon: FiMap,
    title: "AI Roadmap Generator",
    description:
      "Get a personalized 3-6 month learning roadmap based on your current skills, target role, and available study time. Adjustable, regenerable, and always tailored to you.",
    iconColor: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/40",
  },
  {
    icon: FiMessageCircle,
    title: "AI Career Coach Chat",
    description:
      "Chat with an AI coach that remembers your conversation history. Ask about skills, job readiness, resumes, or interviews — with suggested follow-up prompts.",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/40",
  },
  {
    icon: FiTarget,
    title: "Career Goal Tracking",
    description:
      "Set goals with target roles, due dates, and priorities. Track your progress visually and stay accountable to your career growth.",
    iconColor: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/60 border border-purple-100 dark:border-purple-900/40",
  },
  {
    icon: FiBarChart2,
    title: "Progress Dashboard",
    description:
      "Visualize your journey with charts showing goals completed, skills learned, and roadmap progress over time.",
    iconColor: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/60 border border-amber-100 dark:border-amber-900/40",
  },
  {
    icon: FiFileText,
    title: "Career Path Explorer",
    description:
      "Browse and filter career paths by category, difficulty, and salary range. Find detailed breakdowns of skills and responsibilities for every role.",
    iconColor: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-950/60 border border-pink-100 dark:border-pink-900/40",
  },
  {
    icon: FiUsers,
    title: "Community Driven Insights",
    description:
      "See what career goals others are working toward, browse popular career paths, and get inspired by real learner progress.",
    iconColor: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-900/40",
  },
];

export default function FeaturesPage() {
  return (
    <main className="bg-slate-50/50 dark:bg-slate-900">
      {/* Hero */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-block rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40"
            >
              Everything You Need
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
            >
              Powerful Features to Guide Your Career
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base"
            >
              CareerPilot AI combines smart automation with real career guidance to help you go from
              &quot;where am I now&quot; to &quot;where I want to be.&quot;
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6"
                >
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${feature.bg} sm:h-12 sm:w-12`}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-2xl bg-blue-600 px-6 py-10 text-center dark:bg-blue-700 sm:py-12 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to Start Your Journey?
            </h2>
            <p className="max-w-md text-sm text-blue-100 sm:text-base">
              Join thousands of learners already using CareerPilot AI to reach their dream careers.
            </p>
            <Link
              href="/register"
              className="mt-2 flex min-h-[46px] items-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              Get Started Free
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}