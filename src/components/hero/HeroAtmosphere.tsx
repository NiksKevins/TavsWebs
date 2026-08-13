"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, useMediaQuery } from "@/hooks/useMotion";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  maxLife: number;
  hue: number;
};

function spawnBurst(
  particles: Particle[],
  x: number,
  y: number,
  count: number,
  speed = 1,
) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const mag = (0.2 + Math.random() * 1.4) * speed;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * mag,
      vy: Math.sin(angle) * mag - 0.15,
      r: 18 + Math.random() * 42,
      life: 1,
      maxLife: 0.55 + Math.random() * 0.7,
      hue: Math.random() > 0.45 ? 168 : 199,
    });
  }
}

export function HeroAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas || reduced) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const list: Particle[] = [];
    let raf = 0;
    let running = true;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let mx = -9999;
    let my = -9999;
    let pmx = -9999;
    let pmy = -9999;
    let lastSpawn = 0;
    let ambientTimer = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = root.clientWidth;
      h = root.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };

    const onLeave = () => {
      mx = -9999;
      my = -9999;
      pmx = -9999;
      pmy = -9999;
    };

    const tick = (time: number) => {
      if (!running) return;

      ctx.clearRect(0, 0, w, h);

      ambientTimer += 1;
      if (ambientTimer % 28 === 0 && list.length < 70) {
        spawnBurst(
          list,
          w * (0.15 + Math.random() * 0.7),
          h * (0.2 + Math.random() * 0.55),
          1 + Math.floor(Math.random() * 2),
          0.35,
        );
      }

      if (finePointer && mx > -1000) {
        const dx = mx - pmx;
        const dy = my - pmy;
        const dist = Math.hypot(dx, dy);
        if (pmx < -1000) {
          pmx = mx;
          pmy = my;
        } else if (dist > 4 || time - lastSpawn > 40) {
          const count = Math.min(6, 2 + Math.floor(dist / 16));
          spawnBurst(list, mx, my, count, 0.65 + Math.min(dist / 36, 1.8));
          lastSpawn = time;
          pmx = mx;
          pmy = my;
        }
      }

      ctx.globalCompositeOperation = "lighter";
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.975;
        p.vy *= 0.975;
        p.vy -= 0.014;
        p.life -= 0.01 / p.maxLife;
        p.r *= 1.014;

        if (p.life <= 0) {
          list.splice(i, 1);
          continue;
        }

        const alpha = Math.max(0, p.life) * 0.28;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, `hsla(${p.hue}, 90%, 68%, ${alpha})`);
        grad.addColorStop(0.4, `hsla(${p.hue}, 75%, 48%, ${alpha * 0.4})`);
        grad.addColorStop(1, `hsla(${p.hue}, 70%, 40%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (list.length > 130) list.splice(0, list.length - 130);

      raf = requestAnimationFrame(tick);
    };

    resize();
    for (let i = 0; i < 8; i++) {
      spawnBurst(list, w * Math.random(), h * Math.random(), 2, 0.25);
    }

    window.addEventListener("resize", resize);
    if (finePointer) {
      root.addEventListener("pointermove", onMove, { passive: true });
      root.addEventListener("pointerleave", onLeave);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, finePointer]);

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 -z-0 overflow-hidden bg-[#05070c]"
      aria-hidden
    >
      <div className="hero-orb hero-orb-a" />
      <div className="hero-orb hero-orb-b" />
      <div className="hero-orb hero-orb-c" />
      <div className="hero-grid" />
      <div className="hero-sparkles">
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} style={{ ["--i" as string]: String(i) }} />
        ))}
      </div>

      {!reduced && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(5,7,12,0.82)_0%,rgba(5,7,12,0.35)_45%,rgba(5,7,12,0.15)_65%,rgba(5,7,12,0.7)_100%)]" />
    </div>
  );
}
