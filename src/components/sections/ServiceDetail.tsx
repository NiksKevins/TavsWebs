import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  serviceBadges,
  serviceExternalUrls,
  serviceHref,
  serviceIds,
  serviceImages,
  site,
  type ServiceId,
} from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export async function ServiceDetail({ id }: { id: ServiceId }) {
  const t = await getTranslations("services");
  const badge = serviceBadges[id];
  const externalUrl = serviceExternalUrls[id];
  const benefits = t.raw(`items.${id}.benefits`) as string[];
  const includes = t.raw(`items.${id}.includes`) as string[];
  const related = serviceIds.filter((s) => s !== id).slice(0, 3);

  return (
    <>
      <section className="section-pad pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[1.5rem] border border-border bg-surface md:rounded-[2rem]">
              <Image
                src={serviceImages[id]}
                alt={t(`items.${id}.title`)}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              {badge && (
                <span
                  className={cn(
                    "absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide",
                    badge === "popular"
                      ? "bg-accent text-white"
                      : "bg-highlight text-white",
                  )}
                >
                  {t(`badges.${badge}`)}
                </span>
              )}
            </div>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="text-xs uppercase tracking-[0.2em] text-dim">
                {t(`items.${id}.detail`)}
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                {t(`items.${id}.longDescription`)}
              </p>

              <h2 className="display mt-12 text-2xl md:text-3xl">
                {t("benefitsTitle")}
              </h2>
              <ul className="mt-6 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check size={14} strokeWidth={2.5} />
                    </span>
                    <span className="leading-relaxed text-muted">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.08}>
              <div className="card p-6 md:p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-dim">
                  {t("includesTitle")}
                </p>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3">
                  <Link href="/contact">
                    <Button className="w-full">{t("ctaButton")}</Button>
                  </Link>
                  {externalUrl && (
                    <a
                      href={externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-text transition hover:border-border-strong hover:bg-surface"
                    >
                      {t("tryDemo")}
                      <ExternalLink size={16} />
                    </a>
                  )}
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-sm text-muted transition hover:text-accent"
                  >
                    WhatsApp →
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 border-t border-border pt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
            >
              <ArrowLeft size={16} />
              {t("backToAll")}
            </Link>
          </div>

          <div className="mt-16">
            <h2 className="display text-2xl md:text-3xl">{t("relatedTitle")}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedId) => (
                <Link
                  key={relatedId}
                  href={serviceHref(relatedId)}
                  className="group card-hover overflow-hidden"
                >
                  <div className="relative aspect-[16/10] bg-surface">
                    <Image
                      src={serviceImages[relatedId]}
                      alt={t(`items.${relatedId}.title`)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="display text-lg group-hover:text-accent">
                      {t(`items.${relatedId}.title`)}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm text-accent">
                      {t("learnMore")} <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
