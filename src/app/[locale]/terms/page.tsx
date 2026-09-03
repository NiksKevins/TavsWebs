import { getTranslations, setRequestLocale } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { LegalDocument } from "@/components/sections/LegalDocument";
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
  const tLegal = await getTranslations("legal");
  const tCrumb = await getTranslations("breadcrumbs");
  const tNav = await getTranslations("nav");
  const sectionKeys = t.raw("sectionKeys") as string[];

  const sections = sectionKeys.map((key) => ({
    key,
    heading: t(`sections.${key}.heading`),
    paragraphs: t.raw(`sections.${key}.paragraphs`) as string[],
  }));

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
      <LegalDocument
        updated={t("updated")}
        tocLabel={tLegal("tocLabel")}
        contactLabel={tLegal("contactLabel")}
        contactBody={tLegal("contactBody")}
        contactCta={tLegal("contactCta")}
        relatedLabel={tLegal("relatedLabel")}
        relatedHref="/privacy"
        relatedTitle={tNav("privacy")}
        sections={sections}
      />
    </main>
  );
}
