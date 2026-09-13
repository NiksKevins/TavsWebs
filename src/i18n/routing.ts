import { defineRouting } from "next-intl/routing";

export const locales = ["lv", "en"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "lv",
  localePrefix: "as-needed",
  // Keep LV for bare tavswebs.com links (ads, email). Browser Accept-Language
  // was sending EN visitors to /en. Users can still switch via the language UI.
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/work": "/work",
    "/work/[slug]": "/work/[slug]",
    "/services": "/services",
    "/services/[slug]": "/services/[slug]",
    "/process": "/process",
    "/about": "/about",
    "/contact": "/contact",
    "/faq": "/faq",
    "/guides": "/guides",
    "/guides/[slug]": "/guides/[slug]",
    "/privacy": "/privacy",
    "/terms": "/terms",
  },
});
