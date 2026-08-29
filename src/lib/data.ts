export const site = {
  name: "TavsWebs",
  email: "tavswebs@gmail.com",
  phone: "+371 25 547 113",
  phoneHref: "tel:+37125547113",
  whatsapp: "https://wa.me/37125547113",
  url: "https://tavswebs.com",
  twitter: "@tavswebs",
  botUrl: "https://bot.tavswebs.com",
} as const;

export const GOOGLE_REVIEWS_URL =
  "https://share.google/SfRHlWtMviu8CpwQ5";

export const navHrefs = [
  { key: "work", href: "/work" },
  { key: "about", href: "/about" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

export const serviceNavItems = [
  { id: "website-dev", hash: "website-dev" },
  { id: "ecommerce", hash: "ecommerce" },
  { id: "seo-audit", hash: "seo-audit" },
  { id: "crm", hash: "crm" },
  { id: "mobile-apps", hash: "mobile-apps" },
  { id: "programming", hash: "programming" },
  { id: "ai-chatbots", hash: "ai-chatbots" },
  { id: "redesign", hash: "redesign" },
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

export const stats = [
  { key: "websites", value: "35+" },
  { key: "years", value: "7+" },
  { key: "rating", value: "4.9★" },
  { key: "response", value: "24h" },
] as const;

export const googleReviews = [
  {
    name: "Megija Megana",
    text: "Very good experience. Everything was done quickly and with quality. Thanks for the great work! Definitely recommend.",
    textLv:
      "Ļoti laba pieredze. Viss tika izdarīts ātri un kvalitatīvi. Paldies par lielisko darbu! Noteikti iesaku.",
  },
  {
    name: "Inguss Boldāns",
    text: "Fast service and precision in website creation!",
    textLv: "Ātrs serviss un precizitāte mājaslapas izveidē!",
  },
] as const;

export const projects = [
  {
    id: "audi-klubs",
    year: "2026",
    accent: "#1a0508",
    glow: "rgba(220, 38, 38, 0.35)",
    offset: "left" as const,
    image: "/portfolio/audi-klubs-site.jpg",
    url: null,
    gallery: [
      "/portfolio/audi-klubs-site.jpg",
      "/portfolio/audi-klubs-cms-home.jpg",
      "/portfolio/audi-klubs-cms-rich.jpg",
      "/portfolio/audi-klubs-cms.jpg",
    ] as const,
  },
  {
    id: "sturisi-vib",
    year: "2025",
    accent: "#1c1910",
    glow: "rgba(212, 179, 75, 0.35)",
    offset: "right" as const,
    image: "/portfolio/sturisi-vib-site.jpg",
    url: "https://sturisivib.lv/",
    gallery: [
      "/portfolio/sturisi-vib-site.jpg",
      "/portfolio/sturisi-vib-services.jpg",
    ] as const,
  },
  {
    id: "kozy-eats",
    year: "2025",
    accent: "#2a1810",
    glow: "rgba(194, 120, 80, 0.3)",
    offset: "left" as const,
    image: "/portfolio/mock-kozy-eats.jpg",
    url: null,
    gallery: ["/portfolio/mock-kozy-eats.jpg"] as const,
    mock: true,
  },
  {
    id: "favela-nightclub",
    year: "2024",
    accent: "#12081a",
    glow: "rgba(168, 85, 247, 0.3)",
    offset: "right" as const,
    image: "/portfolio/mock-favela.jpg",
    url: null,
    gallery: ["/portfolio/mock-favela.jpg"] as const,
    mock: true,
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

export const featuredProjectIds = ["audi-klubs", "sturisi-vib"] as const;

export const serviceIds = [
  "website-dev",
  "ecommerce",
  "seo-audit",
  "crm",
  "mobile-apps",
  "programming",
  "ai-chatbots",
  "redesign",
] as const;

export type ServiceId = (typeof serviceIds)[number];

export const serviceBadges: Partial<Record<ServiceId, "popular" | "new">> = {
  "website-dev": "popular",
  "ai-chatbots": "new",
};

export const serviceExternalUrls: Partial<Record<ServiceId, string>> = {
  "ai-chatbots": site.botUrl,
};

export const serviceImages: Record<ServiceId, string> = {
  "website-dev": "/services/website-dev.jpg",
  ecommerce: "/services/ecommerce.jpg",
  "mobile-apps": "/services/mobile-apps.jpg",
  redesign: "/services/redesign.jpg",
  "seo-audit": "/services/seo-audit.jpg",
  programming: "/services/programming.jpg",
  crm: "/services/crm.jpg",
  "ai-chatbots": "/services/programming.jpg",
};

export const processStepIds = [
  "discovery",
  "strategy",
  "design",
  "development",
  "launch",
] as const;

export const timelineYears = ["2019", "2021", "2023", "2026"] as const;

export const testimonialIndexes = ["0", "1", "2"] as const;
export const faqIndexes = ["0", "1", "2", "3", "4", "5"] as const;
export const budgetIndexes = ["0", "1", "2", "3", "4", "5"] as const;

export const localeOgMap = {
  lv: "lv_LV",
  en: "en_US",
} as const;
