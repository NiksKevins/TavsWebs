import { getTranslations, setRequestLocale } from "next-intl/server";
import { Services } from "@/components/sections/Services";
import { CtaBand } from "@/components/seo/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { pagePaths, serviceIds } from "@/lib/data";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  localizedPath,
} from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale as Locale, "services");
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const tCrumb = await getTranslations("breadcrumbs");
  const tNav = await getTranslations("nav");

  const serviceListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: serviceIds.map((id, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: t(`items.${id}.title`),
      url: absoluteUrl(
        `${localizedPath(locale as Locale, "/services")}#${id}`,
      ),
      description: t(`items.${id}.longDescription`),
    })),
  };

  return (
    <main id="main">
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: tCrumb("home"), path: "/" },
              { name: tNav("services"), path: pagePaths.services },
            ],
            locale as Locale,
          ),
          serviceListJsonLd,
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("pageDescription")}
        crumbs={[
          { label: tCrumb("home"), href: "/" },
          { label: tNav("services") },
        ]}
      />
      <Services showHeader={false} />
      <CtaBand title={t("ctaTitle")} />
    </main>
  );
}
