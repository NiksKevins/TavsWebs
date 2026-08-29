"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  serviceBadges,
  serviceExternalUrls,
  serviceIds,
  serviceImages,
  type ServiceId,
} from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Services({
  preview = false,
  showHeader = true,
}: {
  preview?: boolean;
  showHeader?: boolean;
}) {
  const t = useTranslations("services");
  const list = preview ? serviceIds.slice(0, 3) : [...serviceIds];

  return (
    <section
      className="section-pad relative overflow-hidden py-24 md:py-36"
      aria-labelledby={showHeader ? "services-heading" : undefined}
    >
      <div className="mx-auto max-w-[1400px]">
        {showHeader && (
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-dim">
              {t("eyebrow")}
            </p>
            <h2
              id="services-heading"
              className="display mt-4 max-w-[16ch] text-5xl md:text-7xl"
            >
              {t("title")}
            </h2>
          </Reveal>
        )}

        <div className={cn("space-y-0", showHeader && "mt-20")}>
          {list.map((id, i) => {
            const flip = i % 2 === 1;
            const number = String(i + 1).padStart(2, "0");
            const externalUrl = serviceExternalUrls[id as ServiceId];
            const badge = serviceBadges[id as ServiceId];

            const titleEl = (
              <span className="inline-flex flex-wrap items-center gap-3">
                {t(`items.${id}.title`)}
                {badge && (
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide align-middle",
                      badge === "popular"
                        ? "bg-accent text-white"
                        : "bg-highlight text-white",
                    )}
                  >
                    {t(`badges.${badge}`)}
                  </span>
                )}
              </span>
            );

            return (
              <Reveal key={id} delay={i * 0.05}>
                <article
                  id={id}
                  className={cn(
                    "group grid items-center gap-8 border-t border-border py-14 md:grid-cols-12 md:gap-6 md:py-20",
                    flip && "md:text-right",
                  )}
                >
                  <div
                    className={cn(
                      "md:col-span-2",
                      flip && "md:order-3 md:col-start-11",
                    )}
                  >
                    <span className="font-mono text-sm text-accent">{number}</span>
                  </div>

                  <div
                    className={cn(
                      "md:col-span-5",
                      flip ? "md:order-2 md:col-start-6" : "md:col-start-3",
                    )}
                  >
                    <h3 className="display text-3xl transition-colors group-hover:text-accent md:text-5xl">
                      {externalUrl ? (
                        <a
                          href={externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 hover:text-accent"
                        >
                          {titleEl}
                          <ExternalLink size={20} className="opacity-60" />
                        </a>
                      ) : (
                        titleEl
                      )}
                    </h3>
                    <p className="mt-4 leading-relaxed text-muted">
                      {preview
                        ? t(`items.${id}.description`)
                        : t(`items.${id}.longDescription`)}
                    </p>
                    <p className="mt-3 text-xs uppercase tracking-[0.2em] text-dim">
                      {t(`items.${id}.detail`)}
                    </p>
                    {externalUrl && (
                      <a
                        href={externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2"
                      >
                        {t("tryDemo")}
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>

                  <div
                    className={cn(
                      "relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface md:col-span-4 md:block",
                      flip ? "md:order-1 md:col-start-1" : "md:col-start-9",
                    )}
                  >
                    <Image
                      src={serviceImages[id as ServiceId]}
                      alt={t(`items.${id}.title`)}
                      fill
                      sizes="(max-width: 768px) 0vw, 33vw"
                      className="max-w-none object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {preview && (
          <Reveal className="mt-12 flex justify-center md:justify-end">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-all duration-200 hover:gap-3"
            >
              {t("exploreAll")}
              <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
