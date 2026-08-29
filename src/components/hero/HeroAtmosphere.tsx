"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMotion";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function HeroAtmosphere() {
  const { x, y } = useMousePosition();
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 -z-0 overflow-hidden bg-bg" aria-hidden>
      <div className="absolute inset-0 opacity-[0.4] [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black,transparent)]" />

      <motion.div
        className="pointer-events-none absolute -right-[10%] top-[5%] h-[min(70vh,640px)] w-[min(70vh,640px)] rounded-full bg-accent/[0.07] blur-[120px]"
        animate={reduced ? undefined : { x: x * 48, y: y * 36 }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
      />
      <motion.div
        className="pointer-events-none absolute -left-[8%] bottom-[10%] h-[min(50vh,480px)] w-[min(50vh,480px)] rounded-full bg-highlight/[0.06] blur-[100px]"
        animate={reduced ? undefined : { x: x * -36, y: y * -28 }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
      />

      <motion.div
        className="absolute left-[clamp(1.25rem,4vw,4.5rem)] top-[38%] h-px origin-left bg-border-strong"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.5, ease: EASE_OUT_EXPO }}
        style={{ width: "min(42vw, 460px)" }}
      />

      <motion.div
        className="absolute right-[clamp(1.25rem,4vw,4.5rem)] top-[22%] hidden h-[min(38vh,320px)] w-px origin-top bg-border md:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.7, ease: EASE_OUT_EXPO }}
      />
    </div>
  );
}
