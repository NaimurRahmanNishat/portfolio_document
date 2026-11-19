// src/app/admin/about/page.tsx 
'use client';
import { motion } from 'framer-motion';
import { User, Save } from 'lucide-react';

const AdminAboutpage = () => {
  return (
<div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Manage About Page</h1>
          <p className="text-sm text-slate-400 mt-1">Update your professional bio, skills, and experience markdown content.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-cyan-500 font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] transition-all text-sm">
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/5 p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400">
            <User className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold text-white">About Content Editor</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Markdown Content / Bio</label>
            <textarea 
              rows={10} 
              defaultValue="# Hello, I am Naimur Rahman Nishat..."
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700/80 p-4 text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 font-mono text-sm"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminAboutpage;
