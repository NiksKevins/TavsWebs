"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AnimatedLink({
  children,
  className,
  showArrow = true,
}: {
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
}) {
  return (
    <motion.span
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium text-accent",
        className,
      )}
      whileHover="hover"
      initial="rest"
    >
      {children}
      {showArrow && (
        <motion.span
          variants={{
            rest: { x: 0, y: 0 },
            hover: { x: 3, y: -3 },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          <ArrowUpRight size={16} />
        </motion.span>
      )}
    </motion.span>
  );
}
