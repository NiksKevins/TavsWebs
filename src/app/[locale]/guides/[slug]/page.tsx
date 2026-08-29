import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GuideArticle } from "@/components/sections/GuideArticle";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing, type Locale } from "@/i18n/routing";
import {
  guideIds,
  getGuide,
  pagePaths,
  type GuideId,
} from "@/lib/data";
import {
  breadcrumbJsonLd,
  createGuideMetadata,
  guideArticleJsonLd,
} from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    guideIds.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return createGuideMetadata(locale as Locale, guide);
}

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("guides");
  const tNav = await getTranslations("nav");
  const tCrumb = await getTranslations("breadcrumbs");

  return (
    <main id="main">
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: tCrumb("home"), path: "/" },
              { name: tNav("guides"), path: pagePaths.guides },
              { name: t(`items.${guide}.title`), path: `/guides/${guide}` },
            ],
            locale as Locale,
          ),
          await guideArticleJsonLd(locale as Locale, guide as GuideId),
        ]}
      />
      <GuideArticle id={guide as GuideId} />
    </main>
  );
}
