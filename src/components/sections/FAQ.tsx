"use client";

import { useTranslations } from "next-intl";
import { faqIndexes } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { FaqAccordion } from "@/components/sections/FaqAccordion";

export function FAQ({ showHeader = true }: { showHeader?: boolean }) {
  const t = useTranslations("faq");
  const items = faqIndexes.map((key) => ({
    q: t(`items.${key}.q`),
    a: t(`items.${key}.a`),
  }));

  return (
    <section className="section-alt section-pad py-20 md:py-28">
      <div
        className={
          showHeader
            ? "mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12"
            : "mx-auto max-w-[1400px]"
        }
      >
        {showHeader && (
          <Reveal className="lg:col-span-4">
            <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
            <h2 className="display mt-4 text-4xl md:text-5xl">{t("title")}</h2>
            <p className="mt-4 text-muted">{t("subtitle")}</p>
          </Reveal>
        )}

        <FaqAccordion
          items={items}
          className={showHeader ? "lg:col-span-7 lg:col-start-6" : "max-w-3xl"}
        />
      </div>
    </section>
  );
}
