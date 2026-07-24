import { getTranslations, setRequestLocale } from "next-intl/server";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/seo/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { pagePaths } from "@/lib/data";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale as Locale, "about");
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tCrumb = await getTranslations("breadcrumbs");
  const tNav = await getTranslations("nav");

  return (
    <main id="main">
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: tCrumb("home"), path: "/" },
            { name: tNav("about"), path: pagePaths.about },
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
          { label: tNav("about") },
        ]}
      />
      <About showHeader={false} />
      <Testimonials />
      <CtaBand title={t("ctaTitle")} />
    </main>
  );
}
