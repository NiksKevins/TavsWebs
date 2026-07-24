"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMotion";

export function CustomCursor() {
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!finePointer || reduced) return;

    document.body.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, input, textarea, select, [data-cursor='hover']",
      );
      setHovering(Boolean(interactive));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [finePointer, reduced]);

  if (!finePointer || reduced) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
        animate={{
          x: pos.x - (hovering ? 22 : 4),
          y: pos.y - (hovering ? 22 : 4),
          width: hovering ? 44 : 8,
          height: hovering ? 44 : 8,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.4 }}
        style={{
          borderRadius: 999,
          background: hovering ? "transparent" : "#fff",
          border: hovering ? "1px solid rgba(255,255,255,0.85)" : "none",
        }}
      />
    </>
  );
}
