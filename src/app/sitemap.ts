import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { pagePaths, projects } from "@/lib/data";
import { routing } from "@/i18n/routing";
import { absoluteUrl, localizedPath } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { isLandingHost, landingUrl } from "@/lib/landing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host");
  const now = new Date();

  if (isLandingHost(host)) {
    return [
      {
        url: landingUrl,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 1,
      },
    ];
  }

  const entries: MetadataRoute.Sitemap = [
    {
      url: landingUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  for (const locale of routing.locales) {
    for (const path of Object.values(pagePaths)) {
      entries.push({
        url: absoluteUrl(localizedPath(locale as Locale, path)),
        lastModified: now,
        changeFrequency:
          path === "/" || path === "/work" ? "weekly" : "monthly",
        priority:
          path === "/"
            ? 1
            : path === "/contact" || path === "/work"
              ? 0.9
              : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              absoluteUrl(localizedPath(l, path)),
            ]),
          ),
        },
      });
    }

    for (const project of projects) {
      const path = `/work/${project.id}`;
      entries.push({
        url: absoluteUrl(localizedPath(locale as Locale, path)),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              absoluteUrl(localizedPath(l, path)),
            ]),
          ),
        },
      });
    }
  }

  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
