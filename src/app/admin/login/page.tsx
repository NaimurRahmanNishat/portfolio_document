// src/app/admin/login/page.tsx
'use client';
import React, { useActionState, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Lock, Sparkles, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { adminLogin } from './actions';

// Sparkle backround
const sparkles = [
  { id: 1, top: '12%', left: '18%', size: 4, delay: 0 },
  { id: 2, top: '25%', left: '82%', size: 6, delay: 1.2 },
  { id: 3, top: '70%', left: '15%', size: 5, delay: 0.6 },
  { id: 4, top: '80%', left: '85%', size: 4, delay: 1.8 },
  { id: 5, top: '45%', left: '90%', size: 3, delay: 2.1 },
  { id: 6, top: '18%', left: '55%', size: 5, delay: 0.9 },
  { id: 7, top: '85%', left: '42%', size: 6, delay: 1.5 },
  { id: 8, top: '35%', left: '10%', size: 4, delay: 2.4 },
];


const AdminLoginPage = () => {
  const [state, formAction, isPending] = useActionState(adminLogin, null);
  const [showPassword, setShowPassword] = useState(false);

  // 3d animation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-600/30 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.25, 0.45, 0.25],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyan-500/25 blur-[120px]"
      />

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          style={{
            top: sparkle.top,
            left: sparkle.left,
            width: sparkle.size,
            height: sparkle.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.4, 0.5],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: 'easeInOut',
          }}
          className="pointer-events-none absolute rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]"
        />
      ))}

      {/* 3D Perspective Container */}
      <div style={{ perspective: 1200 }} className="w-full max-w-md z-10">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative group rounded-3xl p-[1.5px] bg-linear-to-br from-indigo-500/60 via-cyan-400/40 to-purple-600/60 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
        >
          <div className="relative rounded-[23px] bg-slate-900/85 backdrop-blur-2xl p-8 sm:p-10 border border-white/10">
            <motion.div
              style={{ transform: 'translateZ(40px)' }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-tr from-indigo-600 to-cyan-500 shadow-[0_0_30px_rgba(99,102,241,0.5)] relative"
            >
              <ShieldCheck className="h-8 w-8 text-white" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-1.5 -right-1.5 text-cyan-300"
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>
            </motion.div>

            <div style={{ transform: 'translateZ(25px)' }} className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-linear-to-r from-white via-cyan-100 to-indigo-300 bg-clip-text text-transparent">
                Admin Portal
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Log in to your account to continue (Please do not share your password with anyone)
              </p>
            </div>

            {/* Login Form */}
            <form action={formAction} style={{ transform: 'translateZ(30px)' }} className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
                >
                  Secret Passkey
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Lock className="h-5 w-5 text-indigo-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    className="w-full rounded-xl bg-slate-950/70 border border-slate-700/80 pl-11 pr-12 py-3.5 text-slate-100 placeholder-slate-500 outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-cyan-300 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* warning */}
              {state?.error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-center text-sm text-red-400"
                >
                  {state.error}
                </motion.div>
              )}

              {/* submit button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isPending}
                className="relative w-full overflow-hidden rounded-xl bg-linear-to-r from-indigo-600 via-blue-600 to-cyan-500 py-3.5 px-6 font-semibold text-white shadow-[0_0_25px_rgba(79,70,229,0.45)] transition-all hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] disabled:opacity-60 flex items-center justify-center gap-2 group/btn cursor-pointer"
              >
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                  className="absolute inset-0 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/30 to-transparent"
                />

                <span className="relative z-10">
                  {isPending ? 'Verifying Access...' : 'Unlock Dashboard'}
                </span>
                {!isPending && (
                  <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminLoginPage;
