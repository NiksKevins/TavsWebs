"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { EASE_OUT_EXPO, EASE_OUT_QUART, fadeUp, fadeUpLite } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealMode = "default" | "blur" | "scale" | "lite";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  mode?: RevealMode;
}

const modes: Record<RevealMode, Variants> = {
  default: fadeUp,
  blur: fadeUpLite,
  scale: {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.85, ease: EASE_OUT_EXPO },
    },
  },
  lite: fadeUpLite,
};

export function Reveal({
  children,
  className,
  delay = 0,
  y,
  once = true,
  mode = "default",
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const base = modes[mode];
  const variants: Variants = y
    ? {
        hidden: { ...base.hidden, y },
        visible: {
          ...(typeof base.visible === "object" ? base.visible : {}),
          transition: {
            duration: 0.85,
            ease: EASE_OUT_QUART,
            delay,
          },
        },
      }
    : {
        hidden: base.hidden,
        visible: {
          ...(typeof base.visible === "object" ? base.visible : {}),
          transition: {
            duration: 0.85,
            ease: EASE_OUT_QUART,
            delay,
          },
        },
      };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10% 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("relative", className)}
      whileHover="hover"
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translate(0px, 0px)";
      }}
      style={{ transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {children}
    </motion.div>
  );
}
