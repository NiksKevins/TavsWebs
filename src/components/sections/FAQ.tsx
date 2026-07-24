"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqIndexes } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function FAQ({ showHeader = true }: { showHeader?: boolean }) {
  const t = useTranslations("faq");
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-pad py-24 md:py-32">
      <div
        className={
          showHeader
            ? "mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12"
            : "mx-auto max-w-[1400px]"
        }
      >
        {showHeader && (
          <Reveal className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.28em] text-dim">
              {t("eyebrow")}
            </p>
            <h2 className="display mt-4 text-5xl md:text-6xl">{t("title")}</h2>
            <p className="mt-4 text-muted">{t("subtitle")}</p>
          </Reveal>
        )}

        <div className={showHeader ? "lg:col-span-7 lg:col-start-6" : "max-w-3xl"}>
          {faqIndexes.map((key, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={key} delay={i * 0.04}>
                <div className="border-b border-white/8">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="text-lg font-medium md:text-xl">
                      {t(`items.${key}.q`)}
                    </span>
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 transition-transform duration-300",
                        isOpen && "rotate-45 border-accent/40 bg-accent/10",
                      )}
                    >
                      <Plus size={16} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-12 leading-relaxed text-muted">
                          {t(`items.${key}.a`)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
