import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  localeOgMap,
  pagePaths,
  site,
  type PageKey,
  type ProjectId,
} from "@/lib/data";
import { routing, type Locale } from "@/i18n/routing";

const OG_SIZE = { width: 1200, height: 630 } as const;

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, site.url).toString();
}

export function ogImageUrl(title: string, subtitle?: string) {
  const params = new URLSearchParams({ title });
  if (subtitle) params.set("subtitle", subtitle);
  return absoluteUrl(`/og?${params.toString()}`);
}

/** Build locale-aware pathname with `as-needed` prefix strategy. */
export function localizedPath(locale: Locale, href: string) {
  const path = href.startsWith("/") ? href : `/${href}`;
  if (locale === routing.defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

export function alternateLanguages(href: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(localizedPath(locale, href));
  }
  languages["x-default"] = absoluteUrl(
    localizedPath(routing.defaultLocale, href),
  );
  return languages;
}

export async function createPageMetadata(
  locale: Locale,
  key: PageKey,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const tSite = await getTranslations({ locale, namespace: "site" });
  const path = pagePaths[key];
  const localized = localizedPath(locale, path);
  const url = absoluteUrl(localized);
  const title = t(`${key}.title`);
  const description = t(`${key}.description`);
  const ogTitle = t(`${key}.ogTitle`);
  const image = ogImageUrl(ogTitle, tSite("tagline"));

  return {
    title: key === "home" ? { absolute: ogTitle } : title,
    description,
    alternates: {
      canonical: url,
      languages: alternateLanguages(path),
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: site.name,
      locale: localeOgMap[locale],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => localeOgMap[l]),
      type: "website",
      images: [{ url: image, ...OG_SIZE, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      site: site.twitter,
      images: [image],
    },
  };
}

export async function createProjectMetadata(
  locale: Locale,
  projectId: ProjectId,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "projects" });
  const tWork = await getTranslations({ locale, namespace: "work" });
  const title = t(`${projectId}.title`);
  const description = t(`${projectId}.description`);
  const category = t(`${projectId}.category`);
  const path = `/work/${projectId}`;
  const localized = localizedPath(locale, path);
  const url = absoluteUrl(localized);
  const ogTitle = `${title} — TavsWebs`;
  const image = ogImageUrl(ogTitle, category);

  return {
    title: tWork("caseStudyTitle", { title }),
    description,
    alternates: {
      canonical: url,
      languages: alternateLanguages(path),
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: site.name,
      locale: localeOgMap[locale],
      type: "article",
      images: [{ url: image, ...OG_SIZE, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      site: site.twitter,
      images: [image],
    },
  };
}

export async function organizationJsonLd(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    description: t("description"),
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: ogImageUrl(site.name, t("tagline")),
    areaServed: "Worldwide",
    priceRange: "€€€",
    sameAs: [site.whatsapp],
  };
}

export async function websiteJsonLd(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: t("description"),
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: locale,
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localizedPath(locale, item.path)),
    })),
  };
}

export async function faqJsonLd(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "faq" });
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ["0", "1", "2", "3", "4"].map((i) => ({
      "@type": "Question",
      name: t(`items.${i}.q`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`items.${i}.a`),
      },
    })),
  };
}

export async function projectJsonLd(locale: Locale, projectId: ProjectId) {
  const t = await getTranslations({ locale, namespace: "projects" });
  const project = (await import("@/lib/data")).getProject(projectId);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: t(`${projectId}.title`),
    description: t(`${projectId}.longDescription`),
    datePublished: `${project?.year ?? "2024"}-01-01`,
    creator: { "@id": `${site.url}/#organization` },
    url: absoluteUrl(localizedPath(locale, `/work/${projectId}`)),
    about: t(`${projectId}.category`),
    inLanguage: locale,
  };
}
