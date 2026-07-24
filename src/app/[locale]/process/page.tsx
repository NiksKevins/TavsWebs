import { getTranslations, setRequestLocale } from "next-intl/server";
import { Process } from "@/components/sections/Process";
import { CtaBand } from "@/components/seo/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { pagePaths, processStepIds } from "@/lib/data";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale as Locale, "process");
}

export default async function ProcessPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("process");
  const tCrumb = await getTranslations("breadcrumbs");
  const tNav = await getTranslations("nav");

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t("title"),
    description: t("pageDescription"),
    step: processStepIds.map((id, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: t(`steps.${id}.title`),
      text: t(`steps.${id}.description`),
    })),
  };

  return (
    <main id="main">
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: tCrumb("home"), path: "/" },
              { name: tNav("process"), path: pagePaths.process },
            ],
            locale as Locale,
          ),
          howToJsonLd,
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("pageDescription")}
        crumbs={[
          { label: tCrumb("home"), href: "/" },
          { label: tNav("process") },
        ]}
      />
      <Process showHeader={false} />
      <CtaBand title={t("ctaTitle")} />
    </main>
  );
}
