import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createPageMetadata,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

const Work = dynamic(() =>
  import("@/components/sections/Work").then((m) => m.Work),
);
const AboutPreview = dynamic(() =>
  import("@/components/sections/AboutPreview").then((m) => m.AboutPreview),
);
const ProcessInline = dynamic(() =>
  import("@/components/sections/ProcessInline").then((m) => m.ProcessInline),
);
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((m) => m.Testimonials),
);
const GuidesPreview = dynamic(() =>
  import("@/components/sections/GuidesPreview").then((m) => m.GuidesPreview),
);
const FAQ = dynamic(() =>
  import("@/components/sections/FAQ").then((m) => m.FAQ),
);
const ContactBlock = dynamic(() =>
  import("@/components/sections/ContactBlock").then((m) => m.ContactBlock),
);
const CtaBand = dynamic(() =>
  import("@/components/seo/CtaBand").then((m) => m.CtaBand),
);

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
