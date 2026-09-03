"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { LineReveal } from "@/components/ui/TextReveal";
import { HeroAtmosphere } from "@/components/hero/HeroAtmosphere";
import { EASE_OUT_EXPO, staggerContainer } from "@/lib/motion";
import { site } from "@/lib/data";

export function Hero() {
  const t = useTranslations("hero");
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100vh] flex-col justify-end overflow-hidden pb-24 pt-28 md:justify-center md:pb-16 md:pt-32"
    >
      <HeroAtmosphere />

      <div className="section-pad relative z-10 mx-auto w-full max-w-[1400px]">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <motion.p
              className="hero-eyebrow mb-5"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
            >
              {t("eyebrow")}
            </motion.p>

            <h1 className="display max-w-[18ch] text-[clamp(2.1rem,5.5vw,4.25rem)] leading-[1.05] md:max-w-[20ch]">
              <LineReveal delay={0.18} className="text-text">
                {t("titleBefore")}
              </LineReveal>
              <LineReveal delay={0.32} className="text-muted">
                {t("titleAccent")}
              </LineReveal>
            </h1>

            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
              initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, delay: 0.48, ease: EASE_OUT_EXPO }}
            >
              {t("body")}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4"
              initial="hidden"
              animate="visible"
              variants={staggerContainer(0.12, 0.62)}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
                  },
                }}
              >
                <Link href="/contact">
                  <Button size="lg">{t("ctaPrimary")}</Button>
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
                  },
                }}
              >
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="whatsapp">
                    <WhatsAppIcon size={18} brand />
                    {t("ctaWhatsapp")}
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="relative lg:col-span-6"
            initial={reduced ? false : { opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT_EXPO }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-md sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/4]">
              <Image
                src="/about/founder.jpg"
                alt={t("photoAlt")}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover object-[center_18%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-elevated/80 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
                <div className="glass rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-dim">
                    {t("photoLabel")}
                  </p>
                  <p className="mt-1 text-sm font-medium text-text sm:text-base">
                    {t("photoCaption")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease: EASE_OUT_EXPO }}
      >
        <a
          href="#services"
          className="group flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-dim transition-colors hover:text-muted"
        >
          <span>{t("explore")}</span>
          <motion.span
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="transition-transform group-hover:scale-110"
          >
            <ArrowDown size={16} />
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}
