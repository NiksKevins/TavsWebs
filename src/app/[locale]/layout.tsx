import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Geist_Mono, Manrope, Syne } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navigation } from "@/components/layout/Navigation";
import { MobileDock } from "@/components/layout/MobileDock";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/data";
import "../globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const tSite = await getTranslations({ locale, namespace: "site" });

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t("home.ogTitle"),
      template: `%s · ${site.name}`,
    },
    description: tSite("description"),
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    keywords: [
      "mājaslapu izstrāde",
      "mājas lapas izveide",
      "CRM sistēmas",
      "programmēšana Latvijā",
      "website development Latvia",
      "TavsWebs",
    ],
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "en" ? "en_US" : "lv_LV",
      url: site.url,
      title: t("home.ogTitle"),
      description: tSite("description"),
    },
    twitter: {
      card: "summary_large_image",
      site: site.twitter,
      creator: site.twitter,
      title: t("home.ogTitle"),
      description: tSite("description"),
    },
    alternates: {
      canonical: site.url,
      languages: {
        lv: site.url,
        en: `${site.url}/en`,
        "x-default": site.url,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("site");

  return (
    <html
      lang={locale}
      className={`${syne.variable} ${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-text">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
          >
            {t("skipToContent")}
          </a>
          <div className="grain" aria-hidden />
          <SmoothScroll>
            <Navigation />
            {children}
            <Footer />
            <MobileDock />
          </SmoothScroll>
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
