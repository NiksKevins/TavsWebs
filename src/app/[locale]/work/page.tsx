import { getTranslations, setRequestLocale } from "next-intl/server";
import { Work } from "@/components/sections/Work";
import { CtaBand } from "@/components/seo/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { pagePaths } from "@/lib/data";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale as Locale, "work");
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("work");
  const tCrumb = await getTranslations("breadcrumbs");
  const tNav = await getTranslations("nav");

  return (
    <main id="main">
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: tCrumb("home"), path: "/" },
            { name: tNav("work"), path: pagePaths.work },
          ],
          locale as Locale,
        )}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("pageDescription")}
        crumbs={[
          { label: tCrumb("home"), href: "/" },
          { label: tNav("work") },
        ]}
      />
      <Work showHeader={false} />
      <CtaBand title={t("ctaTitle")} />
    </main>
  );
}
