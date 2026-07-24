"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/data";

const HeroScene = dynamic(
  () =>
    import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-bg" /> },
);

export function Hero() {
  const t = useTranslations("hero");
  const tSite = useTranslations("site");
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[110vh] flex-col justify-end overflow-hidden pb-24 pt-32 md:justify-center md:pb-16"
    >
      <HeroScene />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,12,0.35)_0%,transparent_30%,rgba(5,7,12,0.55)_75%,var(--bg)_100%)]"
      />

      <div className="section-pad relative z-10 mx-auto w-full max-w-[1400px]">
        <motion.p
          className="mb-6 max-w-md text-sm uppercase tracking-[0.28em] text-dim"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          className="display max-w-[14ch] text-[clamp(3.4rem,11vw,8.5rem)] text-white"
          initial={reduced ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-gradient">{site.name}</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
        >
          {t("body", { tagline: tSite("tagline") })}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
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
        transition={{ delay: 1.1 }}
      >
        <Link
          href="/work"
          className="flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-dim"
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
