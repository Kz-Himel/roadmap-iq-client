"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  FiSparkles,
  FiPlay,
  FiCheckCircle2,
  FiBell,
  FiSearch,
  FiChevronRight,
  FiLayout,
  FiMap,
  FiTarget,
  FiMessageSquare,
  FiFolder,
  FiBookmark,
} from "react-icons/fi";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Banner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F8FAFC] py-12 lg:py-20 min-h-[680px] flex items-center">
      {/* Background Soft Glow Radial Effect (Pixel Perfect with Image Background) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-200/40 via-sky-100/50 to-transparent blur-3xl pointer-events-none rounded-full -z-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Left Content Block */}
          <div className="lg:col-span-5 max-w-xl">
            {/* Pill Tag */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-blue-600 border border-blue-100/60"
            >
              <FiSparkles className="h-3.5 w-3.5 text-blue-500" />
              AI-Powered Career Guidance
            </motion.div>

            {/* Title */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]"
            >
              Your Future. <br />
              With <span className="text-blue-600">Clarity.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className="mt-6 text-base text-slate-600 leading-relaxed font-normal"
            >
              RoadmapIQ helps students, fresh graduates and aspiring developers plan, track and achieve their career goals with personalized AI roadmaps.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-lg"
              >
                Get Started Free <span className="text-lg">→</span>
              </Link>
              
              <Link
                href="/demo"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-blue-600"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <FiPlay className="h-3 w-3 fill-current ml-0.5" />
                </div>
                Watch Demo
              </Link>
            </motion.div>

            {/* Feature Checklist */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-slate-600"
            >
              <div className="flex items-center gap-1.5">
                <FiCheckCircle2 className="h-4 w-4 text-blue-600" />
                <span>Personalized Roadmaps</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiCheckCircle2 className="h-4 w-4 text-blue-600" />
                <span>Track Progress</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiCheckCircle2 className="h-4 w-4 text-blue-600" />
                <span>AI Career Chat</span>
              </div>
            </motion.div>
          </div>

          {/* Right Graphics Dashboard Card (Pixel-Perfect Dashboard Mockup) */}
          <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-[560px] rounded-2xl bg-white p-4 sm:p-5 shadow-2xl shadow-blue-950/10 border border-slate-100"
            >
              {/* Dashboard Layout Container */}
              <div className="flex gap-4">
                
                {/* Mini Sidebar */}
                <div className="w-36 shrink-0 border-r border-slate-100 pr-3 hidden sm:block">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-5 w-5 rounded bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                      IQ
                    </div>
                    <span className="text-xs font-bold text-slate-900">RoadmapIQ</span>
                  </div>

                  <nav className="flex flex-col gap-1 text-[11px] font-medium text-slate-500">
                    <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-2.5 py-1.5 text-blue-600 font-semibold">
                      <FiLayout className="h-3.5 w-3.5" /> Dashboard
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 hover:text-slate-900">
                      <FiMap className="h-3.5 w-3.5" /> Roadmaps
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 hover:text-slate-900">
                      <FiTarget className="h-3.5 w-3.5" /> Goals
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 hover:text-slate-900">
                      <FiMessageSquare className="h-3.5 w-3.5" /> Chat
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 hover:text-slate-900">
                      <FiFolder className="h-3.5 w-3.5" /> Resources
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 hover:text-slate-900">
                      <FiBookmark className="h-3.5 w-3.5" /> Saved
                    </div>
                  </nav>
                </div>

                {/* Dashboard Main Content Area */}
                <div className="flex-1 min-w-0">
                  
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between gap-2 pb-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Good morning, Himel 👋</h4>
                      <p className="text-[10px] text-slate-400">Your journey to a better future starts here.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiBell className="h-3.5 w-3.5 text-slate-400" />
                      <div className="h-6 w-6 rounded-full bg-slate-200 border border-slate-300 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Avatar" className="h-full w-full object-cover" />
                      </div>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative mb-4">
                    <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      readOnly
                      placeholder="What do you want to achieve?"
                      className="w-full rounded-lg bg-slate-50 py-1.5 pl-8 pr-3 text-[11px] text-slate-600 placeholder:text-slate-400 border border-slate-100 outline-none"
                    />
                  </div>

                  {/* Progress Cards Split */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {/* Active Roadmap Card */}
                    <div className="col-span-2 rounded-xl bg-slate-50 p-3 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white text-xs">
                          ⚙️
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-slate-900 leading-tight">Your Career Roadmap</p>
                          <p className="text-[9px] text-slate-400">Full Stack Developer</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[9px] text-slate-500 font-medium">
                        <span>3/8 steps completed</span>
                        <span>3/8</span>
                      </div>
                      <div className="mt-1 h-1 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full w-[37.5%] bg-blue-600 rounded-full" />
                      </div>
                    </div>

                    {/* Next Step Card */}
                    <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 flex flex-col justify-between">
                      <div>
                        <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-tight">Next Step</p>
                        <p className="text-[10px] font-bold text-slate-800 leading-tight mt-0.5">React Fundamentals</p>
                        <p className="text-[9px] text-slate-400 mt-1">2-3 hours • Beginner</p>
                      </div>
                      <div className="flex justify-end">
                        <FiChevronRight className="h-3.5 w-3.5 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions Grid */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-900 mb-2">Quick Actions</p>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { title: "Explore Roadmaps", desc: "Find your perfect path", icon: "🗺️" },
                        { title: "Track Progress", desc: "See your growth", icon: "📈" },
                        { title: "AI Career Chat", desc: "Ask anything", icon: "💬" },
                        { title: "Browse Resources", desc: "Learn & grow", icon: "📚" },
                      ].map((action, i) => (
                        <div key={i} className="rounded-xl border border-slate-100 bg-white p-2 text-center shadow-2xl shadow-slate-100">
                          <div className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-xs">
                            {action.icon}
                          </div>
                          <p className="text-[9px] font-bold text-slate-800 leading-tight">{action.title}</p>
                          <p className="text-[8px] text-slate-400 leading-tight mt-0.5 hidden sm:block">{action.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}