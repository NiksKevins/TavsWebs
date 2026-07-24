import { defineRouting } from "next-intl/routing";

export const locales = ["lv", "en"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "lv",
  localePrefix: "as-needed",
  localeDetection: true,
  pathnames: {
    "/": "/",
    "/work": "/work",
    "/work/[slug]": "/work/[slug]",
    "/services": "/services",
    "/process": "/process",
    "/about": "/about",
    "/contact": "/contact",
    "/faq": "/faq",
  },
});
