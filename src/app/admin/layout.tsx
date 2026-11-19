// src/app/admin/layout.tsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  FolderKanban, 
  Home, 
  LogOut, 
  ExternalLink,  
  Sparkles,
  User,
  Menu,
  X
} from 'lucide-react';
import { logoutAction } from './logout/actions';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Home Sections', href: '/admin/home', icon: Home },
    { name: 'About', href: '/admin/about', icon: User },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
  ];

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row selection:bg-indigo-500 selection:text-white">
      <div className="md:hidden flex items-center justify-between bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 p-4 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-linear-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold tracking-tight text-white">Portfolio CMS</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-xl bg-slate-800 text-slate-200"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/80 p-6 flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out md:translate-x-0 md:static
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-linear-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg tracking-tight bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Portfolio CMS
                </h2>
                <p className="text-xs text-slate-400">by Naimur Rahman Nishat</p>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive 
                      ? 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-300' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800/80 space-y-3">
          <Link 
            href="/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-slate-300 text-sm transition-all"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-cyan-400" />
              <span>View Live Site</span>
            </span>
          </Link>
          <form action={logoutAction}>
            <button 
              type="submit"
              className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm transition-all cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout Admin</span>
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default Layout;
