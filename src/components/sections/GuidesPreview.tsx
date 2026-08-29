"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { guideHref, guideIds } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { WordReveal } from "@/components/ui/TextReveal";
import { springSnappy } from "@/lib/motion";

export function GuidesPreview() {
  const t = useTranslations("guides");

  return (
    <section className="section-pad py-20 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal mode="blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
              <h2 className="display mt-4 text-4xl md:text-5xl">
                <WordReveal text={t("title")} delay={0.08} />
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted">{t("subtitle")}</p>
          </div>
        </Reveal>

        <div className="mt-12 -mx-[clamp(1.25rem,4vw,4.5rem)] overflow-x-auto px-[clamp(1.25rem,4vw,4.5rem)] pb-2 lg:overflow-visible">
          <Stagger className="flex gap-5 lg:grid lg:grid-cols-3 lg:gap-6" stagger={0.08}>
            {guideIds.map((id) => (
              <StaggerItem key={id} className="h-full shrink-0 lg:shrink">
                <motion.div whileHover={{ y: -8 }} transition={springSnappy} className="h-full">
                  <Link
                    href={guideHref(id)}
                    className="group card-hover flex h-full w-[min(85vw,340px)] flex-col p-6 lg:w-auto"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                      {t(`items.${id}.category`)}
                    </p>
                    <h3 className="display mt-3 text-xl leading-tight transition-colors group-hover:text-accent">
                      {t(`items.${id}.title`)}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {t(`items.${id}.excerpt`)}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      {t("readMore")}
                      <motion.span whileHover={{ x: 3, y: -3 }} transition={springSnappy}>
                        <ArrowUpRight size={14} />
                      </motion.span>
                    </span>
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <p className="mt-6 text-center text-xs text-dim lg:hidden">{t("scrollHint")}</p>

        <Reveal className="mt-10 flex justify-center md:justify-end" delay={0.1}>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent"
          >
            {t("viewAll")}
            <motion.span whileHover={{ x: 4, y: -4 }} transition={springSnappy}>
              <ArrowUpRight size={16} />
            </motion.span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
