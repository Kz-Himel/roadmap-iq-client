import Link from "next/link";
import { FiBriefcase, FiDollarSign, FiClock, FiArrowRight } from "react-icons/fi";
import type { Goal } from "@/types/goal";

interface GoalCardProps {
  goal: Goal;
}

export function GoalCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="mb-4 h-11 w-11 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
      <div className="mb-2 h-4 w-2/3 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
      <div className="mb-2 h-3 w-full animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
      <div className="mb-2 h-3 w-4/5 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
      <div className="mb-5 h-3 w-1/3 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
      <div className="mt-auto h-10 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
    </div>
  );
}

export default function GoalCard({ goal }: GoalCardProps) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 dark:hover:border-slate-700 hover:shadow-lg">
      {/* Icon */}
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg shadow-blue-600/20 dark:shadow-blue-500/10 transition-transform duration-200 group-hover:scale-105">
        <FiBriefcase className="h-5 w-5 text-white" />
      </div>

      {/* Title */}
      <h3 className="mb-1.5 line-clamp-1 text-base font-bold text-slate-900 dark:text-slate-100 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
        {goal.title}
      </h3>

      {/* Description */}
      <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        {goal.description}
      </p>

      {/* Badges / Skills */}
      {goal.requiredSkills?.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {goal.requiredSkills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-lg bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40"
            >
              {skill}
            </span>
          ))}
          {goal.requiredSkills.length > 3 && (
            <span className="inline-flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 px-2 py-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              +{goal.requiredSkills.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Info / Metadata */}
      <div className="mb-5 flex flex-col gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <FiDollarSign className="h-3.5 w-3.5 shrink-0 text-emerald-500 dark:text-emerald-400" />
          {goal.salaryRange}
        </span>
        <span className="flex items-center gap-1.5">
          <FiClock className="h-3.5 w-3.5 shrink-0 text-blue-500 dark:text-blue-400" />
          {goal.estimatedTime}
        </span>
      </div>

      {/* Action Button */}
      <Link
        href={`/explore/${goal._id}`}
        className="group/btn mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 dark:bg-blue-500 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-600/20 dark:shadow-blue-500/10 transition-all hover:bg-blue-700 dark:hover:bg-blue-600 hover:shadow-md active:scale-[0.98]"
      >
        View Details
        <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
      </Link>
    </div>
  );
}