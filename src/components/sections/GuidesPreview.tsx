"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { guideHref, guideIds } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function GuidesPreview() {
  const t = useTranslations("guides");

  return (
    <section className="section-pad py-20 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
              <h2 className="display mt-4 text-4xl md:text-5xl">{t("title")}</h2>
            </div>
            <p className="max-w-sm text-sm text-muted">{t("subtitle")}</p>
          </div>
        </Reveal>

        <div className="mt-12 -mx-[clamp(1.25rem,4vw,4.5rem)] overflow-x-auto px-[clamp(1.25rem,4vw,4.5rem)] pb-2 lg:overflow-visible">
          <div className="flex gap-5 lg:grid lg:grid-cols-3 lg:gap-6">
            {guideIds.map((id, index) => (
              <Reveal key={id} delay={index * 0.06} className="h-full shrink-0 lg:shrink">
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
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-dim lg:hidden">{t("scrollHint")}</p>

        <Reveal className="mt-10 flex justify-center md:justify-end">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-all duration-200 hover:gap-3"
          >
            {t("viewAll")}
            <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
