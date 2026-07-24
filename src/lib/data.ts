export const site = {
  name: "TavsWebs",
  email: "tavswebs@gmail.com",
  phone: "+371 25 547 113",
  phoneHref: "tel:+37125547113",
  whatsapp: "https://wa.me/37125547113",
  url: "https://tavswebs.com",
  twitter: "@tavswebs",
} as const;

export const navHrefs = [
  { key: "work", href: "/work" },
  { key: "services", href: "/services" },
  { key: "process", href: "/process" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export const footerHrefs = [
  { key: "work", href: "/work" },
  { key: "services", href: "/services" },
  { key: "process", href: "/process" },
  { key: "about", href: "/about" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

export const pagePaths = {
  home: "/",
  work: "/work",
  services: "/services",
  process: "/process",
  about: "/about",
  contact: "/contact",
  faq: "/faq",
} as const;

export type PageKey = keyof typeof pagePaths;

export const projects = [
  {
    id: "nordic-atelier",
    year: "2025",
    accent: "#1a3a5c",
    glow: "rgba(56, 189, 248, 0.25)",
    offset: "left" as const,
  },
  {
    id: "pulse-finance",
    year: "2025",
    accent: "#0c1f33",
    glow: "rgba(59, 130, 246, 0.3)",
    offset: "right" as const,
  },
  {
    id: "lumen-studio",
    year: "2024",
    accent: "#111827",
    glow: "rgba(34, 211, 238, 0.22)",
    offset: "left" as const,
  },
  {
    id: "orbit-labs",
    year: "2024",
    accent: "#0a1628",
    glow: "rgba(96, 165, 250, 0.28)",
    offset: "right" as const,
  },
] as const;

export type ProjectId = (typeof projects)[number]["id"];
export type ProjectMeta = (typeof projects)[number];

export function projectHref(slug: string) {
  return {
    pathname: "/work/[slug]" as const,
    params: { slug },
  };
}

export function getProject(id: string) {
  return projects.find((p) => p.id === id);
}

export const serviceIds = [
  "brand-web-design",
  "product-engineering",
  "3d-immersive",
  "growth-launch",
] as const;

export type ServiceId = (typeof serviceIds)[number];

export const processStepIds = [
  "discovery",
  "strategy",
  "design",
  "development",
  "launch",
] as const;

export const timelineYears = ["2019", "2021", "2023", "2026"] as const;

export const testimonialIndexes = ["0", "1", "2"] as const;
export const faqIndexes = ["0", "1", "2", "3", "4"] as const;
export const budgetIndexes = ["0", "1", "2", "3", "4", "5"] as const;

export const localeOgMap = {
  lv: "lv_LV",
  en: "en_US",
} as const;
