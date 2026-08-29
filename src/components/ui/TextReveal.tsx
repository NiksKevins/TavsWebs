"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { EASE_OUT_EXPO, lineReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function LineReveal({
  children,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={cn("block overflow-hidden", className)}>
      <motion.span
        className="block"
        initial="hidden"
        animate="visible"
        custom={delay}
        variants={lineReveal}
      >
        {children}
      </motion.span>
    </Tag>
  );
}

export function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.045,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.65, ease: EASE_OUT_EXPO },
              },
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
