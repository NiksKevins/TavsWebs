import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "ghost" | "outline" | "whatsapp";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-accent to-accent-bright text-white shadow-[0_4px_20px_-6px_rgba(37,99,235,0.5)] hover:shadow-[0_8px_28px_-6px_rgba(37,99,235,0.55)] hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 active:brightness-100",
  ghost:
    "text-muted hover:text-text hover:bg-slate-100 active:bg-slate-200/80",
  outline:
    "border border-border bg-bg-elevated text-text hover:border-accent/40 hover:bg-slate-50 hover:-translate-y-0.5 active:translate-y-0",
  whatsapp:
    "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100 hover:-translate-y-0.5 active:translate-y-0",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
