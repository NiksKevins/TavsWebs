import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { site } from "@/lib/data";
import { isLandingHost, landingUrl } from "@/lib/landing";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host");

  if (isLandingHost(host)) {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: `${landingUrl}/sitemap.xml`,
      host: landingUrl,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
