import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  guideHref,
  guideRelatedService,
  relatedGuides,
  serviceHref,
  type GuideId,
} from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

type SectionKey = "0" | "1" | "2" | "3" | "4";

export async function GuideArticle({ id }: { id: GuideId }) {
  const t = await getTranslations("guides");
  const tServices = await getTranslations("services");
  const sectionKeys = t.raw(`items.${id}.sectionKeys`) as SectionKey[];
  const related = relatedGuides[id] ?? [];
  const relatedService = guideRelatedService[id];

  return (
    <article className="section-pad py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {t(`items.${id}.category`)}
          </p>
          <h1 className="display mt-4 text-4xl md:text-5xl">{t(`items.${id}.title`)}</h1>
          <p className="mt-4 text-sm text-dim">
            {t(`items.${id}.readTime`)} · {t("updated")}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {t(`items.${id}.intro`)}
          </p>
        </Reveal>

        <div className="mt-12 space-y-10">
          {sectionKeys.map((key, index) => (
            <Reveal key={key} delay={index * 0.04}>
              <section>
                <h2 className="display text-2xl md:text-3xl">
                  {t(`items.${id}.sections.${key}.heading`)}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
                  {(t.raw(`items.${id}.sections.${key}.paragraphs`) as string[]).map(
                    (paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ),
                  )}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {relatedService && (
          <Reveal className="mt-12 rounded-2xl border border-border bg-surface/60 p-6 md:p-7">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {t("relatedServiceLabel")}
            </p>
            <Link
              href={serviceHref(relatedService)}
              className="mt-3 block display text-2xl transition-colors hover:text-accent"
            >
              {tServices(`items.${relatedService}.title`)}
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {tServices(`items.${relatedService}.description`)}
            </p>
          </Reveal>
        )}

        {related.length > 0 && (
          <Reveal className="mt-14">
            <h2 className="display text-2xl md:text-3xl">{t("relatedTitle")}</h2>
            <ul className="mt-6 space-y-3">
              {related.map((relatedId) => (
                <li key={relatedId}>
                  <Link
                    href={guideHref(relatedId)}
                    className="group flex flex-col gap-1 rounded-xl border border-border px-4 py-3 transition hover:border-border-strong hover:bg-surface"
                  >
                    <span className="text-sm font-medium text-text group-hover:text-accent">
                      {t(`items.${relatedId}.title`)}
                    </span>
                    <span className="text-xs text-dim">
                      {t(`items.${relatedId}.readTime`)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal className="surface-panel mt-14 rounded-2xl p-6 md:p-8">
          <p className="text-sm font-medium text-text">{t("ctaTitle")}</p>
          <p className="mt-2 text-sm text-muted">{t("ctaBody")}</p>
          <Link href="/contact" className="mt-5 inline-block">
            <Button>{t("ctaButton")}</Button>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
