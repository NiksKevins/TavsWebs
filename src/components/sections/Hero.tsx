"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { HeroAtmosphere } from "@/components/hero/HeroAtmosphere";

export function Hero() {
  const t = useTranslations("hero");
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100vh] flex-col justify-end overflow-hidden pb-24 pt-32 md:justify-center md:pb-20"
    >
      <HeroAtmosphere />

      <div className="section-pad relative z-10 mx-auto w-full max-w-[1400px]">
        <motion.p
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium tracking-[0.18em] text-white/70 uppercase"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          className="display max-w-[11ch] text-[clamp(2.75rem,8.5vw,6.25rem)] leading-[0.95] text-white md:max-w-[14ch]"
          initial={reduced ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block">{t("titleBefore")}</span>
          <span className="text-gradient block">{t("titleAccent")}</span>
        </motion.h1>

        <motion.p
          className="mt-7 max-w-lg text-base leading-relaxed text-muted md:text-lg"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {t("body")}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <Link href="/contact">
            <Button size="lg">{t("ctaPrimary")}</Button>
          </Link>
          <Link href="/work">
            <Button size="lg" variant="outline">
              {t("ctaSecondary")}
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Link
          href="/work"
          className="flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-dim transition-colors hover:text-white"
          aria-label={t("ctaSecondary")}
        >
          <span>{t("explore")}</span>
          <motion.span
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown size={16} />
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
}
