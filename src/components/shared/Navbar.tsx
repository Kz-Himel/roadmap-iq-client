"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  FiLogOut,
  FiMenu,
  FiX,
  FiUser,
  FiArrowRight,
} from "react-icons/fi";
import { HiChartBar } from "react-icons/hi2";
import ThemeToggle from "../theme/ThemeToggle";

const publicRoutes = [
  { label: "Home", href: "/" },
  { label: "Roadmaps", href: "/roadmaps" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  const isActive = (href: string) => pathname === href;

  if (!mounted || isPending) {
    return (
      <nav className="sticky top-0 z-50 h-16 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-colors dark:border-slate-800/80 dark:bg-[#0b1329]/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-36 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl transition-colors dark:border-slate-800/80 dark:bg-[#0b1329]/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <div className="flex items-center justify-center text-blue-600 transition-transform duration-200 group-hover:scale-105 dark:text-blue-500">
            <HiChartBar className="h-7 w-7" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            RoadmapIQ
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {publicRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                isActive(route.href)
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions (Theme Switcher + Auth Buttons) */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Desktop Theme Toggle Component */}
          <ThemeToggle />

          {!isLoggedIn ? (
            <>
              <Link
                href="/auth/login"
                className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-150 hover:bg-blue-700 active:scale-95"
              >
                Get Started <FiArrowRight className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-semibold transition-all ${
                  isActive("/dashboard")
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white"
                }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/60 dark:text-blue-300">
                  <FiUser className="h-4 w-4" />
                </div>
                <span>Dashboard</span>
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <FiLogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Theme Toggle Component */}
          <ThemeToggle />

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-200/80 bg-white/95 px-4 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-[#0b1329]/95 lg:hidden">
          <div className="flex flex-col gap-1">
            {publicRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive(route.href)
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
                    : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
                >
                  Get Started <FiArrowRight className="h-4 w-4" />
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive("/dashboard")
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
                      : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/60 dark:text-blue-300">
                    <FiUser className="h-4 w-4" />
                  </div>
                  <span>Dashboard</span>
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 dark:border-red-950/50 dark:bg-red-950/30 dark:text-red-400"
                >
                  <FiLogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}