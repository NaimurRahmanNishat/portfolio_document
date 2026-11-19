// src/components/ui/SpaceBackground.tsx
'use client';
import { useEffect, useRef } from 'react';

type RGB = [number, number, number];

interface Particle {
  r: number; 
  theta: number;
  omega: number; 
  y: number; 
  size: number;
  alpha: number;
  color: string;
  phase: number;
  twinkle: number;
}

interface Glow {
  r: number;
  theta: number;
  omega: number;
  size: number;
  alpha: number;
  sprite: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
  cyan: boolean;
}

const gauss = () => {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const COLOR_STOPS: { t: number; c: RGB }[] = [
  { t: 0.0, c: [255, 244, 190] },
  { t: 0.25, c: [218, 226, 152] },
  { t: 0.5, c: [190, 212, 205] },
  { t: 0.75, c: [150, 172, 255] },
  { t: 1.0, c: [125, 112, 232] },
];

const colorAt = (t: number): RGB => {
  const x = Math.min(1, Math.max(0, t));
  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    const a = COLOR_STOPS[i];
    const b = COLOR_STOPS[i + 1];
    if (x <= b.t) {
      const k = (x - a.t) / (b.t - a.t);
      return [lerp(a.c[0], b.c[0], k), lerp(a.c[1], b.c[1], k), lerp(a.c[2], b.c[2], k)];
    }
  }
  return COLOR_STOPS[COLOR_STOPS.length - 1].c;
};

const rgb = (c: RGB) => `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;

const PINK: RGB = [255, 120, 175];

const makeSprite = (c: RGB) => {
  const el = document.createElement('canvas');
  el.width = el.height = 64;
  const g = el.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},1)`);
  grad.addColorStop(0.4, `rgba(${c[0]},${c[1]},${c[2]},0.35)`);
  grad.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return el;
};

const ARM_COUNT = 2;
const ARM_START = 0.1;
const ARM_PITCH = 0.35;

const armTheta = (r: number, arm: number) =>
  Math.log(r / ARM_START) / ARM_PITCH + (arm * Math.PI * 2) / ARM_COUNT;
const omegaFor = (r: number) => 0.05 + 0.006 * (1 - r);

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    const mouse = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const sprites = [makeSprite([210, 224, 150]), makeSprite([140, 160, 255]), makeSprite(PINK)];
    const particles: Particle[] = [];
    const glows: Glow[] = [];
    const stars: Star[] = [];

    const TOTAL = isMobile ? 3800 : 7000;

    for (let i = 0; i < TOTAL; i++) {
      const roll = Math.random();
      let r: number;
      let theta: number;
      let y: number;
      let color: string;
      let size: number;
      let alpha: number;

      if (roll < 0.14) {
        r = Math.abs(gauss()) * 0.11;
        theta = Math.random() * Math.PI * 2;
        y = gauss() * 0.07;
        color = rgb(colorAt(Math.random() * 0.15));
        size = 0.7 + Math.random() * 1.1;
        alpha = 0.55 + Math.random() * 0.4;
      } else if (roll < 0.74) {
        r = ARM_START + Math.pow(Math.random(), 0.85) * (1 - ARM_START);
        const arm = Math.floor(Math.random() * ARM_COUNT);
        theta = armTheta(r, arm) + gauss() * (0.1 + 0.2 * r);
        y = gauss() * 0.018 * (1.2 - r * 0.6);
        const knot = Math.random() < 0.07 && r > 0.25;
        color = knot ? rgb(PINK) : rgb(colorAt(r + gauss() * 0.04));
        size = knot ? 1.4 + Math.random() * 1.5 : 0.6 + Math.random() * 1.3;
        alpha = knot ? 0.75 + Math.random() * 0.25 : 0.4 + Math.random() * 0.5;
      } else {
        r = Math.pow(Math.random(), 0.75);
        theta = Math.random() * Math.PI * 2;
        y = gauss() * 0.02;
        color = rgb(colorAt(r));
        size = 0.5 + Math.random() * 0.9;
        alpha = 0.15 + Math.random() * 0.3;
      }

      particles.push({
        r,
        theta,
        omega: omegaFor(r),
        y,
        size,
        alpha,
        color,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.4 + Math.random() * 1.6,
      });
    }

    const GLOW_COUNT = isMobile ? 260 : 520;
    for (let i = 0; i < GLOW_COUNT; i++) {
      const r = ARM_START + Math.pow(Math.random(), 0.9) * (1 - ARM_START);
      const arm = Math.floor(Math.random() * ARM_COUNT);
      const theta = armTheta(r, arm) + gauss() * (0.14 + 0.18 * r);
      const spriteIdx = r < 0.45 ? 0 : Math.random() < 0.18 ? 2 : 1;
      glows.push({
        r,
        theta,
        omega: omegaFor(r),
        size: 0.05 + Math.random() * 0.12,
        alpha: 0.04 + Math.random() * 0.08,
        sprite: spriteIdx,
      });
    }

    for (let i = 0; i < 160; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: 0.6 + Math.random() * 1.6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.8,
        cyan: Math.random() < 0.25,
      });
    }
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    resize();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    const onLeave = () => {
      mouse.x = 0;
      mouse.y = 0;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    const BASE_TILT = 0.58; 
    const ROLL = -0.42; 
    const FOV = 0.32;

    const start = performance.now();

    const render = (now: number) => {
      const time = reduceMotion ? 0 : (now - start) / 1000;
      cur.x += (mouse.x - cur.x) * 0.04;
      cur.y += (mouse.y - cur.y) * 0.04;

      const tilt = BASE_TILT + cur.y * 0.45;
      const yaw = cur.x * 0.6;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosR = Math.cos(ROLL);
      const sinR = Math.sin(ROLL);

      const R = Math.max(w * 0.5, h * 0.6);
      const cx = w / 2;
      const cy = h / 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#020204';
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const tw = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(time * s.speed + s.phase));
        ctx.globalAlpha = tw;
        ctx.fillStyle = s.cyan ? '#a5f3fc' : '#e0e7ff';
        const px = s.x * w - cur.x * 18 * s.size;
        const py = s.y * h - cur.y * 18 * s.size;
        ctx.fillRect(px, py, s.size, s.size);
      }
      const project = (r: number, a: number, yy: number) => {
        const x0 = r * Math.cos(a);
        const z0 = r * Math.sin(a);
        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;
        const y2 = yy * cosT - z1 * sinT;
        const z2 = yy * sinT + z1 * cosT;
        const x3 = x1 * cosR - y2 * sinR;
        const y3 = x1 * sinR + y2 * cosR;
        const s = 1 / (1 + z2 * FOV);
        return { sx: cx + x3 * s * R, sy: cy + y3 * s * R, s };
      };

      for (let i = 0; i < glows.length; i++) {
        const g = glows[i];
        const a = g.theta + time * g.omega;
        const p = project(g.r, a, 0);
        const sz = g.size * R * p.s;
        ctx.globalAlpha = g.alpha;
        ctx.drawImage(sprites[g.sprite], p.sx - sz / 2, p.sy - sz / 2, sz, sz);
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const a = p.theta + time * p.omega;
        const q = project(p.r, a, p.y);
        const tw = 0.75 + 0.25 * Math.sin(time * p.twinkle + p.phase);
        const sz = p.size * q.s;
        ctx.globalAlpha = Math.min(1, p.alpha * tw * (0.6 + 0.6 * q.s));
        ctx.fillStyle = p.color;
        ctx.fillRect(q.sx - sz / 2, q.sy - sz / 2, sz, sz);
      }

      const core = project(0, 0, 0);
      const outer = R * 0.55;
      ctx.globalAlpha = 0.5;
      ctx.drawImage(sprites[0], core.sx - outer / 2, core.sy - outer / 2, outer, outer);
      const mid = R * 0.24;
      ctx.globalAlpha = 0.75;
      ctx.drawImage(sprites[0], core.sx - mid / 2, core.sy - mid / 2, mid, mid);
      const hot = R * 0.08;
      ctx.globalAlpha = 0.95;
      ctx.fillStyle = '#fffbe6';
      ctx.drawImage(sprites[0], core.sx - hot / 2, core.sy - hot / 2, hot, hot);
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#020204]">
      <canvas ref={canvasRef} className="absolute inset-0 block" aria-hidden="true" />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(2,2,4,0.85) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at center, rgba(2,2,4,0.6) 0%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default SpaceBackground;
