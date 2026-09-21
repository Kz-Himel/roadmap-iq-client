"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiCode,
  FiServer,
  FiPieChart,
  FiShield,
  FiSmartphone,
  FiCloud,
} from "react-icons/fi";

const categories = [
  {
    title: "Frontend",
    count: "45+ Roles",
    icon: FiCode,
    iconColor: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Backend",
    count: "38+ Roles",
    icon: FiServer,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Data & Analytics",
    count: "29+ Roles",
    icon: FiPieChart,
    iconColor: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Cybersecurity",
    count: "22+ Roles",
    icon: FiShield,
    iconColor: "text-rose-500 dark:text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    title: "Mobile Development",
    count: "18+ Roles",
    icon: FiSmartphone,
    iconColor: "text-amber-500 dark:text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    title: "Cloud & DevOps",
    count: "25+ Roles",
    icon: FiCloud,
    iconColor: "text-sky-500 dark:text-sky-400",
    bg: "bg-sky-500/10",
  },
];

export default function PopularCategories() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center sm:mb-10"
        >
          <span className="mb-3 inline-block rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:border-blue-900/40 dark:bg-blue-950/60 dark:text-blue-400">
            Categories
          </span>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Browse by Category
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
            Find your ideal career path across every domain.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  href={`/explore?category=${encodeURIComponent(cat.title)}`}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-xs transition-all duration-300 hover:border-border-strong hover:bg-surface-hover hover:shadow-md"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${cat.bg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`h-5 w-5 ${cat.iconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary sm:text-base">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {cat.count}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}