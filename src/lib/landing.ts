import { site } from "@/lib/data";

export const landingUrl = "https://landing.tavswebs.com";

export function isLandingHost(host: string | null | undefined) {
  const h = (host ?? "").toLowerCase().split(":")[0];
  return (
    h === "landing.tavswebs.com" ||
    h === "landing.localhost" ||
    h.startsWith("landing.")
  );
}

export const landingSeo = {
  title: "Mājaslapu izstrāde Latvijā | Jauna mājaslapa no €200 — TavsWebs",
  description:
    "Mājaslapu izstrāde Latvijā — jauna mājaslapa, interneta veikals, CRM un aplikācijas. Bezmaksas piedāvājums 24h laikā. No €200. TavsWebs.",
  keywords: [
    "mājaslapu izstrāde",
    "mājas lapas izveide",
    "mājaslapu izstrāde Latvijā",
    "interneta veikals",
    "CRM sistēma",
    "mobilā aplikācija",
    "TavsWebs",
  ],
} as const;

export function landingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${landingUrl}/#webpage`,
        url: landingUrl,
        name: landingSeo.title,
        description: landingSeo.description,
        inLanguage: "lv-LV",
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${landingUrl}/#business` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${landingUrl}/#business`,
        name: site.name,
        url: landingUrl,
        image: `${site.url}/og?title=${encodeURIComponent("TavsWebs")}&subtitle=${encodeURIComponent("Mājaslapu izstrāde")}`,
        email: site.email,
        telephone: site.phone,
        areaServed: {
          "@type": "Country",
          name: "Latvia",
        },
        priceRange: "€€",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          bestRating: "5",
          ratingCount: "2",
        },
        makesOffer: [
          {
            "@type": "Offer",
            name: "Mājaslapu izstrāde",
            priceCurrency: "EUR",
            price: "200",
            description: "Jauna mājaslapa biznesam no €200",
          },
        ],
      },
    ],
  };
}
