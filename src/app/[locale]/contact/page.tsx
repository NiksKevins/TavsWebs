import { getTranslations, setRequestLocale } from "next-intl/server";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { pagePaths, site } from "@/lib/data";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale as Locale, "contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tCrumb = await getTranslations("breadcrumbs");
  const tNav = await getTranslations("nav");

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: t("title"),
    description: t("pageDescription"),
    url: `${site.url}/contact`,
    mainEntity: {
      "@type": "ProfessionalService",
      name: site.name,
      email: site.email,
      telephone: site.phone,
      url: site.url,
    },
  };

  return (
    <main id="main">
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: tCrumb("home"), path: "/" },
              { name: tNav("contact"), path: pagePaths.contact },
            ],
            locale as Locale,
          ),
          contactJsonLd,
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("pageDescription")}
        crumbs={[
          { label: tCrumb("home"), href: "/" },
          { label: tNav("contact") },
        ]}
      />
      <Contact showHeader={false} />
    </main>
  );
}
