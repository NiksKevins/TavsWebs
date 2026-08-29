import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "ghost" | "outline" | "whatsapp";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_4px_16px_-4px_rgba(10,95,168,0.42)] hover:bg-accent-bright hover:shadow-[0_6px_22px_-4px_rgba(10,95,168,0.48)] hover:-translate-y-0.5 active:translate-y-0 active:bg-accent-deep",
  ghost:
    "text-muted hover:text-text hover:bg-surface active:bg-surface-muted",
  outline:
    "border border-border bg-bg-elevated text-text hover:border-border-strong hover:bg-surface hover:-translate-y-0.5 active:translate-y-0",
  whatsapp:
    "border border-emerald-200/80 bg-emerald-50/80 text-emerald-800 hover:border-emerald-300 hover:bg-emerald-50 hover:-translate-y-0.5 active:translate-y-0",
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
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-wide transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50",
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
