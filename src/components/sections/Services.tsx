"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { serviceIds, serviceImages } from "@/lib/data";
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
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[120px]"
      />

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
            return (
              <Reveal key={id} delay={i * 0.05}>
                <article
                  id={id}
                  className={cn(
                    "group grid items-center gap-8 border-t border-white/8 py-14 md:grid-cols-12 md:gap-6 md:py-20",
                    flip && "md:text-right",
                  )}
                >
                  <div
                    className={cn(
                      "md:col-span-2",
                      flip && "md:order-3 md:col-start-11",
                    )}
                  >
                    <span className="font-mono text-sm text-accent-bright/80">
                      {number}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "md:col-span-5",
                      flip ? "md:order-2 md:col-start-6" : "md:col-start-3",
                    )}
                  >
                    <h3 className="display text-3xl transition-colors group-hover:text-accent-bright md:text-5xl">
                      {preview ? (
                        <Link href={{ pathname: "/services", hash: id }}>
                          {t(`items.${id}.title`)}
                        </Link>
                      ) : (
                        t(`items.${id}.title`)
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
                  </div>

                  <div
                    className={cn(
                      "relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-white/8 bg-[#071018] md:col-span-4 md:block",
                      flip ? "md:order-1 md:col-start-1" : "md:col-start-9",
                    )}
                  >
                    <Image
                      src={serviceImages[id]}
                      alt={t(`items.${id}.title`)}
                      fill
                      sizes="(max-width: 768px) 0vw, 33vw"
                      className="max-w-none object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
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
              className="inline-flex items-center gap-2 text-sm text-accent-bright transition-all duration-200 hover:gap-3 hover:text-white"
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
