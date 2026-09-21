"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import Sidebar from "@/components/dashboard/Sidebar";
import { authClient } from "@/lib/auth-client";
import Providers from "../providers";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl items-start bg-slate-50/50 px-4 dark:bg-slate-900 sm:px-6 lg:px-8">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onLogout={handleLogout}
      />

      <div className="w-full min-w-0 flex-1">
        {/* Mobile top header bar */}
        <div className="sticky top-16 z-30 -mx-4 flex items-center gap-3 border-b border-slate-200/80 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 sm:-mx-6 sm:px-6 lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Open dashboard menu"
          >
            <FiMenu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Dashboard Menu</span>
        </div>

        <main className="py-6 sm:py-8 lg:py-10">
          <Providers>
            {children}
          </Providers>
        </main>
      </div>
    </div>
  );
}