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
  title: "Jauna mājaslapa biznesam | Bezmaksas piedāvājums — TavsWebs",
  description:
    "Vajag jaunu mājaslapu, veikalu, CRM vai aplikāciju? Bezmaksas piedāvājums 24h laikā. No €200. Mājaslapu izstrāde Latvijā — TavsWebs.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Jauna mājaslapa biznesam | TavsWebs",
    description:
      "Izvēlieties pakalpojumu un saņemiet bezmaksas piedāvājumu 24 stundu laikā.",
    url: "https://landing.tavswebs.com",
    siteName: site.name,
    locale: "lv_LV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jauna mājaslapa biznesam | TavsWebs",
    description:
      "Izvēlieties pakalpojumu un saņemiet bezmaksas piedāvājumu 24 stundu laikā.",
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
    <html
      lang="lv"
      className={`${manrope.variable} h-full scroll-smooth antialiased`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body
        className="min-h-full bg-black font-[family-name:var(--font-landing)] text-white"
        style={{ fontFamily: "var(--font-landing), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
