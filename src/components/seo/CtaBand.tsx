"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface CtaBandProps {
  title?: string;
  description?: string;
}

export function CtaBand({ title, description }: CtaBandProps) {
  const t = useTranslations("cta");
  const reduced = useReducedMotion();

  return (
    <section className="section-pad py-16 md:py-24">
      <Reveal mode="scale">
        <motion.div
          className="cta-panel mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 rounded-2xl p-8 md:flex-row md:items-center md:p-12"
          whileHover={reduced ? undefined : { scale: 1.005 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        >
          <div>
            <motion.h2
              className="display text-3xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            >
              {title ?? t("title")}
            </motion.h2>
            <p className="mt-3 max-w-md text-muted">
              {description ?? t("description")}
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg">
              {t("button")}
              <ArrowUpRight size={18} />
            </Button>
          </Link>
        </motion.div>
      </Reveal>
    </section>
  );
}
