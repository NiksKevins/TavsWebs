"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery, useReducedMotion } from "@/hooks/useMotion";

/**
 * Soft brand-blue cursor wash — site-wide.
 * Normal OS cursor stays; glow is deliberately dim (no hot white core).
 */
export function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced || !finePointer) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let dpr = 1;

    let tx = window.innerWidth * 0.5;
    let ty = window.innerHeight * 0.4;
    let x = tx;
    let y = ty;
    let visible = false;

    const trail: { x: number; y: number; a: number }[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      visible = true;
    };

    const onLeave = () => {
      visible = false;
    };

    const drawGlow = (gx: number, gy: number, radius: number, alpha: number) => {
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius);
      g.addColorStop(0, `rgba(96, 165, 250, ${0.18 * alpha})`);
      g.addColorStop(0.35, `rgba(59, 130, 246, ${0.1 * alpha})`);
      g.addColorStop(0.7, `rgba(37, 99, 235, ${0.04 * alpha})`);
      g.addColorStop(1, `rgba(30, 64, 175, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(gx, gy, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = () => {
      if (!running) return;

      x += (tx - x) * 0.15;
      y += (ty - y) * 0.15;

      if (visible) {
        trail.push({ x, y, a: 1 });
        if (trail.length > 12) trail.shift();
      } else if (trail.length) {
        for (const p of trail) p.a *= 0.88;
        if (trail[0] && trail[0].a < 0.02) trail.shift();
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        const t = (i + 1) / trail.length;
        drawGlow(p.x, p.y, 80 + t * 55, p.a * t * 0.5);
      }

      if (visible || trail.length) {
        const alpha = visible ? 1 : (trail.at(-1)?.a ?? 0);
        drawGlow(x, y, 200, alpha * 0.9);
        drawGlow(x, y, 105, alpha);
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, finePointer]);

  if (reduced || !finePointer) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[25] mix-blend-screen"
    />
  );
}
