"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
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
import { cn } from "@/lib/utils";

export function ServiceOverviewGrid() {
  const t = useTranslations("services");

  return (
    <section className="section-pad py-16 md:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {serviceIds.map((id, index) => {
          const badge = serviceBadges[id];

          return (
            <Reveal key={id} delay={index * 0.04}>
              <Link
                href={serviceHref(id)}
                className="group card-hover flex h-full flex-col overflow-hidden"
              >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                <Image
                  src={serviceImages[id]}
                  alt={t(`items.${id}.title`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {badge && (
                  <span
                    className={cn(
                      "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
                      badge === "popular"
                        ? "bg-accent text-white"
                        : "bg-highlight text-white",
                    )}
                  >
                    {t(`badges.${badge}`)}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <h2 className="display text-xl leading-tight transition-colors group-hover:text-accent">
                  {t(`items.${id}.title`)}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {t(`items.${id}.description`)}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-dim">
                  {t(`items.${id}.detail`)}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  {t("learnMore")}
                  <ArrowUpRight size={14} />
                </span>
              </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
