"use client";

import Link from "next/link";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import { HiChartBar } from "react-icons/hi2";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Roadmaps", href: "/roadmaps" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

const socialLinks = [
  { icon: FiGithub, href: "https://github.com", label: "GitHub" },
  { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FiYoutube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white py-8 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center text-blue-600">
              <HiChartBar className="w-6 h-6" />
            </div>
            <span className="text-base font-bold text-slate-900 tracking-tight">
              RoadmapIQ
            </span>
          </Link>

          {/* Center Navigation Links */}
          <nav className="flex items-center gap-6 sm:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-slate-800 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-4 h-4 fill-current stroke-[1.5]" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright Text */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-slate-400 font-normal">
            © {new Date().getFullYear()} RoadmapIQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}