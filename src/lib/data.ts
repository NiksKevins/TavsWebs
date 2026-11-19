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

export const footerHrefs = [
  { key: "work", href: "/work" },
  { key: "services", href: "/services" },
  { key: "guides", href: "/guides" },
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
  guides: "/guides",
  privacy: "/privacy",
  terms: "/terms",
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
    role: "Stūrīši VIB · groundworks",
    roleLv: "Stūrīši VIB · zemes darbi",
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
    id: "trailers-lv",
    year: "2025",
    accent: "#0c1a33",
    glow: "rgba(200, 30, 40, 0.35)",
    offset: "left" as const,
    image: "/portfolio/trailers-lv-site.jpg",
    url: "https://www.trailers.lv/",
    gallery: [
      "/portfolio/trailers-lv-site.jpg",
      "/portfolio/trailers-lv-catalog.jpg",
      "/portfolio/trailers-lv-admin.jpg",
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

export const featuredProjectIds = [
  "audi-klubs",
  "sturisi-vib",
  "trailers-lv",
] as const;

export const realProjects = projects.filter(
  (p) => !("mock" in p && p.mock),
);

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

export const serviceNavItems = serviceIds.map((id) => ({ id }));

export function serviceHref(slug: string) {
  return {
    pathname: "/services/[slug]" as const,
    params: { slug },
  };
}

export function getService(id: string) {
  return serviceIds.find((s) => s === id);
}

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
  "ai-chatbots": "/services/ai-chatbots.jpg",
};

export const processStepIds = [
  "discovery",
  "strategy",
  "design",
  "development",
  "launch",
] as const;

export type ProcessStepId = (typeof processStepIds)[number];

export const processImages: Record<ProcessStepId, string> = {
  discovery: "/process/discovery.jpg",
  strategy: "/process/strategy.jpg",
  design: "/process/design.jpg",
  development: "/process/development.jpg",
  launch: "/process/launch.jpg",
};

export const timelineYears = ["2019", "2021", "2023", "2026"] as const;

export const testimonialIndexes = ["0", "1", "2"] as const;
export const faqIndexes = ["0", "1", "2", "3", "4", "5", "6", "7"] as const;
export const budgetIndexes = ["0", "1", "2", "3", "4", "5"] as const;

export const guideIds = [
  "website-cost-latvia",
  "choose-web-developer",
  "ai-chatbot-business",
  "wordpress-website-latvia",
  "ecommerce-cost-latvia",
  "website-development-riga",
  "seo-audit-cost-latvia",
  "website-redesign-latvia",
] as const;

export type GuideId = (typeof guideIds)[number];

/** Shown on the homepage preview (long-tail SEO focus). */
export const featuredGuideIds: GuideId[] = [
  "website-cost-latvia",
  "wordpress-website-latvia",
  "website-development-riga",
];

export const relatedGuides: Record<GuideId, GuideId[]> = {
  "website-cost-latvia": [
    "wordpress-website-latvia",
    "website-development-riga",
    "choose-web-developer",
  ],
  "choose-web-developer": [
    "website-cost-latvia",
    "website-development-riga",
    "website-redesign-latvia",
  ],
  "ai-chatbot-business": [
    "website-cost-latvia",
    "seo-audit-cost-latvia",
    "choose-web-developer",
  ],
  "wordpress-website-latvia": [
    "website-cost-latvia",
    "ecommerce-cost-latvia",
    "website-development-riga",
  ],
  "ecommerce-cost-latvia": [
    "wordpress-website-latvia",
    "website-cost-latvia",
    "seo-audit-cost-latvia",
  ],
  "website-development-riga": [
    "website-cost-latvia",
    "wordpress-website-latvia",
    "choose-web-developer",
  ],
  "seo-audit-cost-latvia": [
    "website-redesign-latvia",
    "website-cost-latvia",
    "website-development-riga",
  ],
  "website-redesign-latvia": [
    "seo-audit-cost-latvia",
    "website-cost-latvia",
    "wordpress-website-latvia",
  ],
};

export const serviceRelatedGuides: Partial<Record<ServiceId, GuideId[]>> = {
  "website-dev": [
    "website-cost-latvia",
    "wordpress-website-latvia",
    "website-development-riga",
  ],
  ecommerce: ["ecommerce-cost-latvia", "wordpress-website-latvia"],
  "seo-audit": ["seo-audit-cost-latvia", "website-redesign-latvia"],
  redesign: ["website-redesign-latvia", "seo-audit-cost-latvia"],
  "ai-chatbots": ["ai-chatbot-business"],
};

export const guideRelatedService: Partial<Record<GuideId, ServiceId>> = {
  "website-cost-latvia": "website-dev",
  "choose-web-developer": "website-dev",
  "wordpress-website-latvia": "website-dev",
  "website-development-riga": "website-dev",
  "ecommerce-cost-latvia": "ecommerce",
  "seo-audit-cost-latvia": "seo-audit",
  "website-redesign-latvia": "redesign",
  "ai-chatbot-business": "ai-chatbots",
};

export function guideHref(slug: string) {
  return {
    pathname: "/guides/[slug]" as const,
    params: { slug },
  };
}

export function getGuide(id: string) {
  return guideIds.find((g) => g === id);
}

export const localeOgMap = {
  lv: "lv_LV",
  en: "en_US",
} as const;
