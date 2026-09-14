"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { LineReveal } from "@/components/ui/TextReveal";
import { HeroAtmosphere } from "@/components/hero/HeroAtmosphere";
import { EASE_OUT_EXPO, staggerContainer } from "@/lib/motion";
import { GOOGLE_REVIEWS_URL, site } from "@/lib/data";

function Stars() {
  return (
    <span className="mb-1.5 inline-flex gap-0.5 text-[#F4B400]" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const reduced = useReducedMotion();

  const proofs = [
    { quote: t("proofQuote"), name: t("proofName") },
    { quote: t("proofQuote2"), name: t("proofName2") },
    { quote: t("proofQuote3"), name: t("proofName3") },
  ] as const;

  return (
    <section
      id="top"
      className="relative flex min-h-[100vh] flex-col justify-end overflow-hidden pb-20 pt-28 md:justify-center md:pb-14 md:pt-32"
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

            <h1 className="display max-w-[15ch] text-[clamp(2.2rem,5.4vw,4.2rem)] leading-[1.04] md:max-w-[17ch]">
              <LineReveal delay={0.18} className="text-text">
                {t("titleBefore")}
              </LineReveal>
              <LineReveal delay={0.32} className="text-accent">
                {t("titleAccent")}
              </LineReveal>
            </h1>

            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.48, ease: EASE_OUT_EXPO }}
            >
              {t("body")}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
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
                <Link href="/work">
                  <Button size="lg" variant="outline">
                    {t("ctaSecondary")}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9, ease: EASE_OUT_EXPO }}
            >
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated px-3 py-1.5 text-sm font-semibold text-text transition hover:border-accent/40"
              >
                <Stars />
                <span>4.9 Google</span>
              </a>
              <p className="text-sm font-medium text-dim">{t("trustLine")}</p>
            </motion.div>

            <motion.p
              className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1, ease: EASE_OUT_EXPO }}
            >
              {t("clientsLabel")}:{" "}
              <span className="font-medium normal-case tracking-normal text-muted">
                {t("clients")}
              </span>
            </motion.p>

            <motion.div
              id="testimonials-preview"
              className="mt-6 grid gap-3 sm:grid-cols-3"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05, ease: EASE_OUT_EXPO }}
            >
              {proofs.map((item) => (
                <blockquote
                  key={item.name}
                  className="rounded-xl border border-border bg-bg-elevated px-3.5 py-3 shadow-sm"
                >
                  <Stars />
                  <p className="text-[13px] leading-snug text-text">
                    “{item.quote}”
                  </p>
                  <footer className="mt-2 text-[11px] font-semibold text-dim">
                    {item.name}
                  </footer>
                </blockquote>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative lg:col-span-6"
            initial={reduced ? false : { opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT_EXPO }}
          >
            <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[0_28px_70px_-30px_rgba(8,74,130,0.4)]">
              <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/4]">
                <Image
                  src="/about/founder.jpg"
                  alt={t("photoAlt")}
                  fill
                  priority
                  quality={75}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 48vw"
                  className="object-cover object-[center_22%]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a5fa8]/35 via-transparent to-transparent"
                />
              </div>
              <div className="border-t border-border bg-bg-elevated px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  {t("photoLabel")}
                </p>
                <p className="mt-1 text-sm font-medium text-text sm:text-base">
                  {t("photoCaption")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.6, ease: EASE_OUT_EXPO }}
      >
        <a
          href="#services"
          className="group flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-dim transition-colors hover:text-muted"
        >
          <span>{t("explore")}</span>
          <span className="motion-safe:animate-bounce transition-transform group-hover:scale-110">
            <ArrowDown size={16} />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
