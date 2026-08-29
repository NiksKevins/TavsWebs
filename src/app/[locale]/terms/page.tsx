import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { pagePaths } from "@/lib/data";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale as Locale, "terms");
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal.terms");
  const tCrumb = await getTranslations("breadcrumbs");
  const tNav = await getTranslations("nav");
  const sectionKeys = t.raw("sectionKeys") as string[];

  return (
    <main id="main">
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: tCrumb("home"), path: "/" },
              { name: tNav("terms"), path: pagePaths.terms },
            ],
            locale as Locale,
          ),
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        crumbs={[
          { label: tCrumb("home"), href: "/" },
          { label: tNav("terms") },
        ]}
      />
      <div className="section-pad pb-20 md:pb-28">
        <div className="prose-legal mx-auto max-w-3xl space-y-8">
          <p className="text-sm text-dim">{t("updated")}</p>
          {sectionKeys.map((key) => (
            <section key={key}>
              <h2 className="display text-xl md:text-2xl">{t(`sections.${key}.heading`)}</h2>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-muted">
                {(t.raw(`sections.${key}.paragraphs`) as string[]).map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
