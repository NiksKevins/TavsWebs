"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { stats } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function AboutPreview() {
  const t = useTranslations("aboutPreview");

  return (
    <section className="section-alt section-pad py-20 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
            <h2 className="display mt-4 text-4xl md:text-5xl">{t("title")}</h2>
            <p className="mt-6 max-w-lg leading-relaxed text-muted">{t("body")}</p>
            <p className="mt-4 max-w-lg leading-relaxed text-muted">{t("body2")}</p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent transition-all duration-200 hover:gap-3"
            >
              {t("cta")}
              <ArrowUpRight size={16} />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.key}
                  className="stat-card card flex flex-col justify-center p-6 md:p-8"
                >
                  <p className="display text-4xl text-accent md:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {t(`stats.${stat.key}`)}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
