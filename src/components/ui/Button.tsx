import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "ghost" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-accent to-accent-bright text-white shadow-[0_0_40px_-12px_rgba(59,130,246,0.8)] hover:shadow-[0_0_52px_-8px_rgba(96,165,250,0.95)] hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 active:brightness-100",
  ghost:
    "text-muted hover:text-white hover:bg-white/[0.06] active:bg-white/[0.08]",
  outline:
    "border border-white/15 text-white hover:border-accent-bright/55 hover:bg-white/[0.05] hover:-translate-y-0.5 active:translate-y-0 active:bg-white/[0.03]",
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
