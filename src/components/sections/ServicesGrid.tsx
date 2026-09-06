"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  serviceBadges,
  serviceHref,
  serviceIds,
  serviceImages,
  type ServiceId,
} from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { WordReveal } from "@/components/ui/TextReveal";
import { springSnappy } from "@/lib/motion";
import { cn } from "@/lib/utils";

function ServiceCard({ id, index }: { id: ServiceId; index: number }) {
  const t = useTranslations("services");
  const badge = serviceBadges[id];
  const reduced = useReducedMotion();

  return (
    <Reveal delay={index * 0.06} mode="scale" className="h-full shrink-0 lg:shrink">
      <motion.div
        whileHover={reduced ? undefined : { y: -8 }}
        transition={springSnappy}
        className="h-full"
      >
        <Link
          href={serviceHref(id)}
          className="group card-hover flex h-full w-[min(85vw,320px)] shrink-0 flex-col overflow-hidden sm:w-[300px] lg:w-auto"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-surface">
            <motion.div
              className="relative h-full w-full"
              whileHover={reduced ? undefined : { scale: 1.06 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={serviceImages[id]}
                alt=""
                fill
                sizes="(max-width: 768px) 80vw, 320px"
                className="object-cover"
                quality={70}
                loading={index < 2 ? "eager" : "lazy"}
              />
            </motion.div>
            {badge && (
              <motion.span
                className={cn(
                  "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
                  badge === "popular"
                    ? "bg-accent text-white"
                    : "bg-highlight text-white",
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.05, ...springSnappy }}
              >
                {t(`badges.${badge}`)}
              </motion.span>
            )}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="display text-xl leading-tight transition-colors group-hover:text-accent">
              {t(`items.${id}.title`)}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {t(`items.${id}.description`)}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-dim">
              {t(`items.${id}.detail`)}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              {t("learnMore")}
              <motion.span
                className="inline-flex"
                initial={false}
                whileHover={{ x: 3, y: -3 }}
                transition={springSnappy}
              >
                <ArrowUpRight size={14} />
              </motion.span>
            </span>
          </div>
        </Link>
      </motion.div>
    </Reveal>
  );
}

export function ServicesGrid() {
  const t = useTranslations("services");

  return (
    <section
      id="services"
      className="section-pad relative py-20 md:py-28"
      aria-labelledby="services-grid-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal mode="blur">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2
              id="services-grid-heading"
              className="display max-w-[18ch] text-4xl md:text-5xl lg:text-6xl"
            >
              <WordReveal text={t("homeTitle")} delay={0.1} />
            </h2>
            <p className="max-w-sm text-sm text-muted">{t("homeSubtitle")}</p>
          </div>
        </Reveal>

        <div className="mt-12 -mx-[clamp(1.25rem,4vw,4.5rem)] overflow-x-auto px-[clamp(1.25rem,4vw,4.5rem)] pb-2 lg:overflow-visible">
          <div className="flex gap-5 lg:grid lg:grid-cols-4 lg:gap-5">
            {serviceIds.map((id, i) => (
              <ServiceCard key={id} id={id} index={i} />
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-dim lg:hidden">
          {t("scrollHint")}
        </p>

        <Reveal className="mt-10 flex justify-center md:justify-end" delay={0.1}>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-medium text-accent"
          >
            {t("exploreAll")}
            <motion.span whileHover={{ x: 4, y: -4 }} transition={springSnappy}>
              <ArrowUpRight size={16} />
            </motion.span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
