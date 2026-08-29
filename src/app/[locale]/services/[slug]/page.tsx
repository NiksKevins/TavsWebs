import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { CtaBand } from "@/components/seo/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { routing, type Locale } from "@/i18n/routing";
import {
  getService,
  pagePaths,
  serviceIds,
  type ServiceId,
} from "@/lib/data";
import {
  breadcrumbJsonLd,
  createServiceMetadata,
  serviceJsonLd,
} from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    serviceIds.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return createServiceMetadata(locale as Locale, service);
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("services");
  const tNav = await getTranslations("nav");
  const tCrumb = await getTranslations("breadcrumbs");

  return (
    <main id="main">
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: tCrumb("home"), path: "/" },
              { name: tNav("services"), path: pagePaths.services },
              {
                name: t(`items.${service}.title`),
                path: `/services/${service}`,
              },
            ],
            locale as Locale,
          ),
          await serviceJsonLd(locale as Locale, service as ServiceId),
        ]}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t(`items.${service}.title`)}
        description={t(`items.${service}.description`)}
        crumbs={[
          { label: tCrumb("home"), href: "/" },
          { label: tNav("services"), href: "/services" },
          { label: t(`items.${service}.title`) },
        ]}
      />
      <ServiceDetail id={service as ServiceId} />
      <CtaBand
        title={t("detailCtaTitle", { service: t(`items.${service}.title`) })}
        description={t("detailCtaBody")}
      />
    </main>
  );
}
