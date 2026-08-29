"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function parseValue(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return null;
  return {
    target: parseFloat(match[1]),
    suffix: match[2],
    decimals: match[1].includes(".") ? match[1].split(".")[1].length : 0,
  };
}

export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const parsed = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const p = parseValue(value);
    if (!p || !inView || reduced) return;

    const controls = animate(0, p.target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        setDisplay(`${v.toFixed(p.decimals)}${p.suffix}`);
      },
    });

    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </span>
  );
}
