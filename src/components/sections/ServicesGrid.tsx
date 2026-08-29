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

function ServiceCard({ id, index }: { id: ServiceId; index: number }) {
  const t = useTranslations("services");
  const badge = serviceBadges[id];
  const externalUrl = serviceExternalUrls[id];

  const inner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={serviceImages[id]}
          alt=""
          fill
          sizes="(max-width: 768px) 80vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
              badge === "popular"
                ? "bg-accent text-white"
                : "bg-cyan/90 text-white",
            )}
          >
            {t(`badges.${badge}`)}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="display text-xl leading-tight">{t(`items.${id}.title`)}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {t(`items.${id}.description`)}
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.16em] text-dim">
          {t(`items.${id}.detail`)}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          {externalUrl ? t("tryDemo") : t("learnMore")}
          {externalUrl ? <ExternalLink size={14} /> : <ArrowUpRight size={14} />}
        </span>
      </div>
    </>
  );

  const className =
    "group card-hover flex h-full w-[min(85vw,320px)] shrink-0 flex-col overflow-hidden sm:w-[300px] lg:w-auto";

  return (
    <Reveal delay={index * 0.04} className="h-full shrink-0 lg:shrink">
      {externalUrl ? (
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {inner}
        </a>
      ) : (
        <Link href={{ pathname: "/services", hash: id }} className={className}>
          {inner}
        </Link>
      )}
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
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-dim">
            {t("eyebrow")}
          </p>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2
              id="services-grid-heading"
              className="display max-w-[18ch] text-4xl md:text-5xl lg:text-6xl"
            >
              {t("homeTitle")}
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

        <Reveal className="mt-10 flex justify-center md:justify-end">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-all duration-200 hover:gap-3"
          >
            {t("exploreAll")}
            <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
