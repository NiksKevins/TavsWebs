import { getTranslations, setRequestLocale } from "next-intl/server";
import { FAQ } from "@/components/sections/FAQ";
import { CtaBand } from "@/components/seo/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { pagePaths } from "@/lib/data";
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale as Locale, "faq");
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");
  const tCrumb = await getTranslations("breadcrumbs");
  const tNav = await getTranslations("nav");

  return (
    <main id="main">
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: tCrumb("home"), path: "/" },
              { name: tNav("faq"), path: pagePaths.faq },
            ],
            locale as Locale,
          ),
          await faqJsonLd(locale as Locale),
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("pageDescription")}
        crumbs={[
          { label: tCrumb("home"), href: "/" },
          { label: tNav("faq") },
        ]}
      />
      <FAQ showHeader={false} />
      <CtaBand title={t("ctaTitle")} />
    </main>
  );
}
