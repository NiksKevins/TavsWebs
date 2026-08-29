"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { springSnappy } from "@/lib/motion";

type Variant = "primary" | "ghost" | "outline" | "whatsapp";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_4px_16px_-4px_rgba(10,95,168,0.42)] hover:bg-accent-bright hover:shadow-[0_6px_22px_-4px_rgba(10,95,168,0.48)] active:bg-accent-deep",
  ghost: "text-muted hover:text-text hover:bg-surface active:bg-surface-muted",
  outline:
    "border border-border bg-bg-elevated text-text hover:border-border-strong hover:bg-surface",
  whatsapp:
    "border border-emerald-200/80 bg-emerald-50/80 text-emerald-800 hover:border-emerald-300 hover:bg-emerald-50",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const reduced = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-wide transition-colors duration-200 ease-out disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        whileHover={reduced ? undefined : { y: -2, scale: 1.02 }}
        whileTap={reduced ? undefined : { y: 0, scale: 0.98 }}
        transition={springSnappy}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
