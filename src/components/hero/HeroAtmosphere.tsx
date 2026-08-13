"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, useMediaQuery } from "@/hooks/useMotion";

type Dot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
};

/**
 * Visible brand-blue hero backdrop: soft orbs + living particle field.
 */
export function HeroAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas || reduced) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let dots: Dot[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = root.clientWidth;
      h = root.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = isDesktop ? 42 : 22;
      dots = Array.from({ length: count }, (_, i) => {
        // Bias particles to the right so they don't fight the headline
        const xBias = 0.35 + Math.random() * 0.65;
        return {
          x: w * xBias,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: 1.2 + Math.random() * 2.2,
          pulse: Math.random() * Math.PI * 2,
        };
      });
    };

    const tick = (time: number) => {
      if (!running) return;
      const t = time * 0.001;

      ctx.clearRect(0, 0, w, h);

      // Soft connection lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          const max = isDesktop ? 140 : 100;
          if (dist > max) continue;
          const alpha = (1 - dist / max) * 0.28;
          ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        d.pulse += 0.02;

        if (d.x < w * 0.28 || d.x > w + 20) d.vx *= -1;
        if (d.y < -20 || d.y > h + 20) d.vy *= -1;

        const glow = 0.45 + Math.sin(d.pulse + t) * 0.2;
        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 6);
        grad.addColorStop(0, `rgba(147, 197, 253, ${0.55 * glow})`);
        grad.addColorStop(0.4, `rgba(59, 130, 246, ${0.22 * glow})`);
        grad.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(191, 219, 254, ${0.7 * glow})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced, isDesktop]);

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 -z-0 overflow-hidden bg-[#05070c]"
      aria-hidden
    >
      <div className="hero-orb hero-orb-a" />
      <div className="hero-orb hero-orb-b" />
      <div className="hero-orb hero-orb-c" />

      <div className="hero-panel" />
      <div className="hero-grid" />

      {!reduced && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      )}

      {/* Keep text side readable; leave right side open for motion */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,12,0.78)_0%,rgba(5,7,12,0.35)_42%,rgba(5,7,12,0.08)_68%,rgba(5,7,12,0.35)_100%)]" />
    </div>
  );
}
