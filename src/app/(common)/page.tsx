// src/app/page.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";
import SpaceBackground from "@/components/ui/SpaceBackground";

const Homepage = () => {
  return (
    <main className="relative min-h-screen w-full bg-[#050508] text-slate-100 flex items-center justify-center overflow-hidden px-4 selection:bg-indigo-500 selection:text-white">
      <SpaceBackground />
      <div className="relative z-30 max-w-4xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/70 border border-indigo-500/30 backdrop-blur-xl text-indigo-300 text-xs sm:text-sm font-medium shadow-[0_0_25px_rgba(99,102,241,0.25)]"
        >
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span>Database-Free Portfolio CMS • Next.js 16</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight font-poppins"
        >
          Hi, I am{" "}
          <span className="bg-linear-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Naimur Rahman
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300/90 leading-relaxed font-poppins"
        >
          Senior Software Engineer & Lead Developer. Building high-performance
          web applications with seamless GitHub API markdown storage
          architectures.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Link
            href="/admin/login"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-linear-to-r from-indigo-600 via-blue-600 to-cyan-500 font-semibold text-white shadow-[0_0_25px_rgba(79,70,229,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] transition-all text-sm cursor-pointer"
          >
            <Terminal className="h-4 w-4" />
            <span>Admin Portal</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="https://github.com/NaimurRahmanNishat/portfolio_document"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-sm transition-all border border-slate-700/60 backdrop-blur-xl"
          >
            Explore Repository
          </a>
        </motion.div>
      </div> 
    </main>
  );
};

export default Homepage;
