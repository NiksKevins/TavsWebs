"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { processStepIds } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function ProcessInline() {
  const t = useTranslations("process");

  return (
    <section className="section-pad py-20 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="display max-w-[16ch] text-4xl md:text-5xl">
              {t("titleLead")}{" "}
              <span className="text-gradient">{t("titleAccent")}</span>
            </h2>
            <p className="max-w-sm text-sm text-muted">{t("subtitle")}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {processStepIds.map((id, i) => (
            <Reveal key={id} delay={i * 0.05}>
              <div className="card-accent-top card h-full p-5 md:p-6">
                <p className="font-mono text-xs text-accent">{`0${i + 1}`}</p>
                <h3 className="display mt-3 text-xl">{t(`steps.${id}.title`)}</h3>
                <p className="mt-2 text-xs text-dim">{t(`steps.${id}.subtitle`)}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {t(`steps.${id}.description`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex justify-center md:justify-end">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-all duration-200 hover:gap-3"
          >
            {t("learnMore")}
            <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
