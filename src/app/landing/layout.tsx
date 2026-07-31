import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { site } from "@/lib/data";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-landing",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://landing.tavswebs.com"),
  title: "Bezmaksas mājaslapas audits | TavsWebs",
  description:
    "Vai jūsu mājaslapa zaudē klientus? Saņemiet bezmaksas auditu — ātrdarbība, mobilā versija, SEO, dizains un konversijas. Atbildam 24h laikā.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Bezmaksas mājaslapas audits | TavsWebs",
    description:
      "Aizpildiet formu un saņemiet bezmaksas mājaslapas auditu 24 stundu laikā.",
    url: "https://landing.tavswebs.com",
    siteName: site.name,
    locale: "lv_LV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bezmaksas mājaslapas audits | TavsWebs",
    description:
      "Aizpildiet formu un saņemiet bezmaksas mājaslapas auditu 24 stundu laikā.",
  },
  alternates: {
    canonical: "https://landing.tavswebs.com",
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lv" className={`${manrope.variable} h-full antialiased`}>
      <body
        className="min-h-full bg-black font-[family-name:var(--font-landing)] text-white"
        style={{ fontFamily: "var(--font-landing), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
