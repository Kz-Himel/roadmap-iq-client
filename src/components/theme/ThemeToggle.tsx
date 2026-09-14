"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-9 w-9 shrink-0 rounded-xl border border-[var(--border)] bg-[var(--surface)]"
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] active:scale-90 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400"
    >
      <FiSun
        className={`absolute h-4 w-4 text-amber-400 transition-all duration-300 ease-out ${
          isDark
            ? "translate-y-0 rotate-0 scale-100 opacity-100"
            : "translate-y-3 -rotate-90 scale-50 opacity-0"
        }`}
      />
      <FiMoon
        className={`absolute h-4 w-4 text-slate-600 transition-all duration-300 ease-out dark:text-slate-300 ${
          isDark
            ? "-translate-y-3 rotate-90 scale-50 opacity-0"
            : "translate-y-0 rotate-0 scale-100 opacity-100"
        }`}
      />
    </button>
  );
}