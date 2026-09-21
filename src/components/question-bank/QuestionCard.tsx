// components/question-bank/QuestionCard.tsx
import Link from "next/link";
import { FiArrowRight, FiTag } from "react-icons/fi";
import type { QuestionBankItem, QuestionDifficulty } from "@/types/questionBank";

interface QuestionCardProps {
  item: QuestionBankItem;
}

const difficultyStyles: Record<QuestionDifficulty, string> = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900/40",
  Medium: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900/40",
  Hard: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-900/40",
};

export function QuestionCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex gap-2">
        <div className="h-5 w-16 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
        <div className="h-5 w-14 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
      </div>
      <div className="mb-2 h-4 w-full animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
      <div className="mb-4 h-4 w-3/4 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
      <div className="mt-auto h-9 w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
    </div>
  );
}

export default function QuestionCard({ item }: QuestionCardProps) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span className="inline-flex items-center rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 dark:border-blue-900/40 dark:bg-blue-950/50 dark:text-blue-300">
          {item.category}
        </span>
        <span
          className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[11px] font-semibold ${difficultyStyles[item.difficulty]}`}
        >
          {item.difficulty}
        </span>
      </div>

      <h3 className="mb-3 line-clamp-3 flex-1 text-sm font-semibold leading-relaxed text-slate-900 dark:text-slate-100">
        {item.question}
      </h3>

      {item.tags?.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400"
            >
              <FiTag className="h-2.5 w-2.5" />
              {tag}
            </span>
          ))}
        </div>
      )}

      <Link
        href={`/dashboard/question-bank/${item._id}`}
        className="group/btn mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:bg-blue-500"
      >
        View Answer
        <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
      </Link>
    </div>
  );
}