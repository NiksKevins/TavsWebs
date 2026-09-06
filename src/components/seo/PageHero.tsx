"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { WordReveal } from "@/components/ui/TextReveal";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  size?: "default" | "compact";
  crumbs?: {
    label: string;
    href?: "/" | "/work" | "/services" | "/process" | "/about" | "/contact" | "/faq";
  }[];
}

export function PageHero({
  eyebrow,
  title,
  description,
  size = "default",
  crumbs,
}: PageHeroProps) {
  const compact = size === "compact";

  return (
    <header
      className={
        compact
          ? "section-pad relative overflow-hidden border-b border-border bg-bg-elevated pb-10 pt-32 md:pb-14 md:pt-40"
          : "section-pad relative overflow-hidden border-b border-border bg-bg-elevated pb-12 pt-36 md:pb-16 md:pt-44"
      }
    >
      {!compact && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-10 hidden h-80 w-80 rounded-full bg-accent/14 blur-[110px] md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-16 bottom-0 hidden h-56 w-56 rounded-full bg-highlight/10 blur-[90px] md:block"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_OUT_EXPO }}
          />
        </>
      )}

      <div className="relative mx-auto max-w-[1400px]">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className={compact ? "mb-6" : "mb-8"}>
            <ol className="flex flex-wrap items-center gap-2 text-xs text-dim">
              {crumbs.map((crumb, i) => (
                <motion.li
                  key={`${crumb.label}-${i}`}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: EASE_OUT_EXPO }}
                >
                  {i > 0 && <span aria-hidden>/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-accent">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-muted">{crumb.label}</span>
                  )}
                </motion.li>
              ))}
            </ol>
          </nav>
        )}

        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <SectionEyebrow className="mt-0">{eyebrow}</SectionEyebrow>
          </motion.div>

          <h1
            className={
              compact
                ? "display mt-5 max-w-[20ch] text-3xl leading-[1.12] md:text-4xl lg:text-5xl"
                : "display mt-4 max-w-[16ch] text-5xl md:text-7xl lg:text-8xl"
            }
          >
            <WordReveal text={title} delay={0.15} />
          </h1>

          <Reveal delay={0.25} mode="lite">
            <p
              className={
                compact
                  ? "mt-5 max-w-2xl text-base leading-relaxed text-muted"
                  : "mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
              }
            >
              {description}
            </p>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
