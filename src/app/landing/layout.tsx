import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { ChatWidget } from "@/components/ChatWidget";
import { site } from "@/lib/data";
import { landingJsonLd, landingSeo, landingUrl } from "@/lib/landing";
import { ogImageUrl } from "@/lib/seo";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-manrope",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-syne",
});

const ogImage = ogImageUrl(
  "Jauna mājaslapa biznesam",
  "Bezmaksas piedāvājums 24h · no €200",
);

export const metadata: Metadata = {
  metadataBase: new URL(landingUrl),
  title: landingSeo.title,
  description: landingSeo.description,
  keywords: [...landingSeo.keywords],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: landingSeo.title,
    description: landingSeo.description,
    url: landingUrl,
    siteName: site.name,
    locale: "lv_LV",
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: landingSeo.title,
    description: landingSeo.description,
    images: [ogImage],
  },
  alternates: {
    canonical: landingUrl,
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = landingJsonLd();

  return (
    <html
      lang="lv"
      className={`${manrope.variable} ${syne.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-bg font-[family-name:var(--font-manrope)] text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
