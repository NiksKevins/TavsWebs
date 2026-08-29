import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { GuideId } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

type SectionKey = "0" | "1" | "2" | "3" | "4";

export async function GuideArticle({ id }: { id: GuideId }) {
  const t = await getTranslations("guides");
  const sectionKeys = t.raw(`items.${id}.sectionKeys`) as SectionKey[];

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
