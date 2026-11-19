'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FileText, 
  FolderKanban, 
  Home, 
  PlusCircle, 
  Layers
} from 'lucide-react';

const GithubIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function DashboardPage() {
  const stats = [
    { title: 'Total Projects', count: '04', icon: FolderKanban, color: 'from-blue-500 to-indigo-600', link: '/admin/projects' },
    { title: 'Blog Posts', count: '06', icon: FileText, color: 'from-purple-500 to-pink-600', link: '/admin/blogs' },
    { title: 'Home Sections', count: '03', icon: Home, color: 'from-cyan-500 to-blue-600', link: '/admin/home' },
    { title: 'GitHub Sync', count: 'Connected', icon: GithubIcon, color: 'from-emerald-500 to-teal-600', link: 'https://github.com/NaimurRahmanNishat/portfolio_document' },
  ];

  const managementCards = [
    {
      title: 'Home Page Sections',
      description: 'Update your home page with latest content.',
      icon: Home,
      badge: 'Static Content',
      link: '/admin/home',
      gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    },
    {
      title: 'Projects Manager',
      description: 'Add or update your projects with latest content.',
      icon: FolderKanban,
      badge: 'Markdown CMS',
      link: '/admin/projects',
      gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
    },
    {
      title: 'Blog Posts Manager',
      description: 'Add or update your blog posts with latest content.',
      icon: FileText,
      badge: 'Markdown CMS',
      link: '/admin/blogs',
      gradient: 'from-purple-500/20 via-pink-500/10 to-transparent',
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold tracking-tight text-white"
          >
            Welcome back, Naimur 👋
          </motion.h1>
          <p className="text-sm text-slate-400 mt-1">
            Your portfolio is managed from (<span className="text-cyan-400">portfolio_document</span>)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            href="/admin/projects/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-cyan-500 font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all text-sm"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add New Project</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative rounded-2xl p-px bg-linear-to-b from-slate-700/50 to-slate-800/20"
            >
              <div className="rounded-2xl bg-slate-900/80 backdrop-blur-xl p-6 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-white mt-2">
                    {stat.count}
                  </h3>
                </div>
                <div className={`h-12 w-12 rounded-xl bg-linear-to-tr ${stat.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Layers className="h-5 w-5 text-indigo-400" />
          <span>Content Management Modules</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {managementCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="relative rounded-3xl p-px bg-linear-to-br from-indigo-500/40 via-slate-800 to-cyan-500/20"
              >
                <div className={`h-full rounded-[23px] bg-slate-900/90 backdrop-blur-2xl p-6 flex flex-col justify-between border border-white/5 bg-linear-to-b ${card.gradient}`}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {card.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <Link 
                    href={card.link}
                    className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-indigo-600 hover:text-white text-slate-300 font-medium text-sm transition-all border border-slate-700/50"
                  >
                    Manage Content →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-linear-to-r from-indigo-950/40 via-slate-900 to-cyan-950/40 border border-indigo-500/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 shrink-0">
            <GithubIcon className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white">GitHub API Storage Connected</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              You are currently connected with GitHub API.
            </p>
          </div>
        </div>
        <Link 
          href="https://github.com/NaimurRahmanNishat/portfolio_document" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all shrink-0 border border-slate-700"
        >
          Repository Status
        </Link>
      </div>
    </div>
  );
}