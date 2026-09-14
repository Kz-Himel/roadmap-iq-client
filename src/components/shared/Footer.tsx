"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { HiChartBar } from "react-icons/hi2";

const productLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Career Paths", href: "/explore" },
  { label: "AI Roadmap Generator", href: "/dashboard/ai-roadmap" },
  { label: "AI Career Coach", href: "/dashboard/ai-chat" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "FAQ", href: "/#faq" },
  { label: "Get Started", href: "/auth/register" },
];

// NOTE: swap these for your real profile URLs.
const socialLinks = [
  { icon: FiGithub, href: "https://github.com/Kz-Himel", label: "GitHub" },
  { icon: FiLinkedin, href: "https://linkedin.com/in/your-profile", label: "LinkedIn" },
  { icon: FiTwitter, href: "https://twitter.com/your-handle", label: "Twitter" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    // NOTE: front-end only — wire this up to your real newsletter endpoint
    // (e.g. Mailchimp/Resend) when one exists.
    setTimeout(() => {
      setStatus("success");
      toast.success("Thanks for subscribing! 🎉");
      setEmail("");
      setTimeout(() => setStatus("idle"), 2500);
    }, 700);
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter */}
        <div className="border-b border-border py-10 sm:py-12">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:p-8">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 sm:text-xl">
                Stay ahead in your career
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Monthly tips, new roadmap templates, and product updates. No spam.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading"
                  ? "Subscribing..."
                  : status === "success"
                  ? "Subscribed!"
                  : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center text-blue-600 dark:text-blue-500">
                <HiChartBar className="h-6 w-6" />
              </div>
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                RoadmapIQ
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              AI-powered career roadmaps, coaching, and progress tracking —
              built to help you get to your next role faster.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-blue-900/60 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Product
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Company
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 sm:flex-row">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()} RoadmapIQ. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Built by{" "}
            <a
              href="https://github.com/Kz-Himel"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              Khayruzzaman Himel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}