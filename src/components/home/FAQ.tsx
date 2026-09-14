"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiMessageCircle,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const faqs = [
  {
    question: "How does CareerPilot AI generate my roadmap?",
    answer:
      "Our AI analyzes your current skills, target role, experience level, and available study time to build a personalized 3-6 month roadmap with weekly milestones, recommended projects, and certifications.",
  },
  {
    question: "Is CareerPilot AI free to use?",
    answer:
      "Yes! You can create an account, generate roadmaps, and chat with the AI career coach completely free. A demo login is also available so you can try it instantly without signing up.",
  },
  {
    question: "Can I talk to the AI coach anytime?",
    answer:
      "Absolutely. The AI Career Coach remembers your conversation context, so you can ask follow-up questions, get resume feedback, or check if you're ready for a job — anytime you like.",
  },
  {
    question: "Do I need coding experience to get started?",
    answer:
      "Not at all. Whether you're a complete beginner or an experienced professional, CareerPilot AI adjusts recommendations based on your selected experience level.",
  },
  {
    question: "Can I track multiple career goals at once?",
    answer:
      "Yes, you can create and manage multiple career goals from your dashboard, each with its own progress tracker, due date, and priority.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="pb-12 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center sm:mb-10"
          >
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              FAQ
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
              Everything you need to know before you start.
            </p>
          </motion.div>

          {/* Two-column layout: Bento highlights (left) + Accordion (right) */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Bento Grid */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } },
              }}
              className="grid grid-cols-2 gap-4 auto-rows-[minmax(150px,auto)]"
            >
              {/* Big card — AI Roadmaps */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -4 }}
                className="group relative col-span-2 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900/60"
              >
                {/* Decorative breathing gradient orb */}
                <motion.div
                  aria-hidden="true"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 blur-3xl"
                />
                <div className="relative flex items-start gap-4">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/80 dark:text-blue-400"
                  >
                    <HiSparkles className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 sm:text-lg">
                      AI-Powered Roadmaps
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      A personalized 3–6 month plan built around your goals,
                      skills, and available study time — regenerate anytime.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Small card — 24/7 AI Coach */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                whileHover={{ y: -4 }}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-900/60"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-transform duration-200 group-hover:scale-105 dark:bg-emerald-950/80 dark:text-emerald-400">
                  <FiMessageCircle className="h-5 w-5" />
                </div>
                <div className="mt-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    24/7 AI Coach
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    Ask anything, anytime.
                  </p>
                </div>
              </motion.div>

              {/* Small card — Any Skill Level */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                whileHover={{ y: -4 }}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-violet-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-900/60"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition-transform duration-200 group-hover:scale-105 dark:bg-violet-950/80 dark:text-violet-400">
                  <FiTrendingUp className="h-5 w-5" />
                </div>
                <div className="mt-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Any Skill Level
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    Beginner to advanced.
                  </p>
                </div>
              </motion.div>

              {/* Wide card — CTA */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                whileHover={{ y: -4 }}
                className="col-span-2"
              >
                <Link
                  href="/auth/register"
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900/60"
                >
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 sm:text-base">
                      Free to Start
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
                      No credit card needed — try the demo login instantly.
                    </p>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/80 dark:text-blue-400">
                    <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Accordion Wrapper */}
            <div className="flex flex-col gap-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md"
                  >
                    <button
                      onClick={() => toggle(index)}
                      className="flex min-h-[46px] w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/50 sm:p-6"
                    >
                      <span className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                          isOpen
                            ? "bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        <FiChevronDown className="h-4 w-4" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <p className="border-t border-slate-100 dark:border-slate-800 px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:px-6 sm:pb-6">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}