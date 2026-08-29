"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { HeroAtmosphere } from "@/components/hero/HeroAtmosphere";
import { site } from "@/lib/data";

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
          className="hero-eyebrow mb-5"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          className="display max-w-[18ch] text-[clamp(2.25rem,6.5vw,5rem)] leading-[1.02] text-text md:max-w-[22ch]"
          initial={reduced ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block">{t("titleBefore")}</span>
          <span className="text-gradient block">{t("titleAccent")}</span>
        </motion.h1>

        <motion.p
          className="mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
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
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="whatsapp">
              <MessageCircle size={18} />
              {t("ctaWhatsapp")}
            </Button>
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <a
          href="#services"
          className="flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-accent transition-colors hover:text-accent-bright"
        >
          <span>{t("explore")}</span>
          <motion.span
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown size={16} />
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}
