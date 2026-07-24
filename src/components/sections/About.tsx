"use client";

import { useTranslations } from "next-intl";
import { site, timelineYears } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function About({ showHeader = true }: { showHeader?: boolean }) {
  const t = useTranslations("about");

  return (
    <section id="about" className="section-pad relative py-24 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            {showHeader ? (
              <Reveal>
                <p className="text-xs uppercase tracking-[0.28em] text-dim">
                  {t("eyebrow")}
                </p>
                <h2 className="display mt-4 text-5xl md:text-6xl lg:text-7xl">
                  {t("titleLead")}{" "}
                  <span className="text-gradient">{t("titleAccent")}</span>
                </h2>
              </Reveal>
            ) : null}
            <Reveal delay={0.1}>
              <p className="mt-8 text-lg leading-relaxed text-muted">
                {t("p1", { name: site.name })}
              </p>
              <p className="mt-5 leading-relaxed text-muted">{t("p2")}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="relative mb-14 aspect-[5/4] overflow-hidden rounded-[2rem] border border-white/10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(96,165,250,0.25),transparent_50%),linear-gradient(145deg,#0c1a2e,#05070c)]" />
              <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />
              <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-5">
                <p className="text-sm text-muted">{t("philosophyLabel")}</p>
                <p className="display mt-2 text-2xl">{t("philosophy")}</p>
              </div>
            </div>

            <ol className="relative space-y-10 border-l border-white/10 pl-8">
              {timelineYears.map((year, i) => (
                <Reveal key={year} delay={i * 0.06}>
                  <li className="relative">
                    <span className="absolute -left-[2.4rem] top-1.5 h-3 w-3 rounded-full border border-accent-bright bg-bg" />
                    <p className="font-mono text-xs text-accent-bright">
                      {year}
                    </p>
                    <h3 className="mt-2 text-xl font-medium">
                      {t(`timeline.${year}.title`)}
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      {t(`timeline.${year}.text`)}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
