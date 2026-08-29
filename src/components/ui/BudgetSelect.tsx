"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface BudgetSelectProps {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  onChange?: (value: string) => void;
}

export function BudgetSelect({
  name,
  label,
  placeholder,
  options,
  onChange,
}: BudgetSelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative block">
      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-dim">
        {label}
      </span>

      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-2xl border bg-bg-elevated px-4 py-3.5 text-left text-sm transition-all duration-300",
          open
            ? "border-accent/50 shadow-[0_0_0_3px_rgba(37,99,235,0.12)]"
            : "border-border hover:border-accent/30",
          value ? "text-text" : "text-dim",
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          size={16}
          className={cn(
            "shrink-0 text-muted transition-transform duration-300",
            open && "rotate-180 text-accent",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-border bg-bg-elevated p-1.5 shadow-lg"
          >
            {options.map((option) => {
              const selected = value === option;
              return (
                <li key={option} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors",
                      selected
                        ? "bg-accent/10 text-accent"
                        : "text-muted hover:bg-slate-50 hover:text-text",
                    )}
                    onClick={() => {
                      setValue(option);
                      onChange?.(option);
                      setOpen(false);
                    }}
                  >
                    <span>{option}</span>
                    {selected && (
                      <Check size={14} className="shrink-0 text-accent" />
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
