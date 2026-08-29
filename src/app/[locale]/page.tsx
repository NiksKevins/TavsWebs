import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Work } from "@/components/sections/Work";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ProcessInline } from "@/components/sections/ProcessInline";
import { Testimonials } from "@/components/sections/Testimonials";
import { GuidesPreview } from "@/components/sections/GuidesPreview";
import { FAQ } from "@/components/sections/FAQ";
import { ContactBlock } from "@/components/sections/ContactBlock";
import { CtaBand } from "@/components/seo/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createPageMetadata,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale as Locale, "home");
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main">
      <JsonLd
        data={[
          await organizationJsonLd(locale as Locale),
          await websiteJsonLd(locale as Locale),
        ]}
      />
      <Hero />
      <ServicesGrid />
      <Work preview />
      <AboutPreview />
      <ProcessInline />
      <Testimonials />
      <GuidesPreview />
      <FAQ showHeader />
      <ContactBlock />
      <CtaBand />
    </main>
  );
}
