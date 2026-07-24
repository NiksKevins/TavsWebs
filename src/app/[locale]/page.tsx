import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/seo/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { pagePaths } from "@/lib/data";
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
  const t = await getTranslations("home");

  const cards = [
    {
      href: pagePaths.process,
      label: t("processCard.label"),
      text: t("processCard.text"),
      cta: t("processCard.cta"),
    },
    {
      href: pagePaths.about,
      label: t("aboutCard.label"),
      text: t("aboutCard.text"),
      cta: t("aboutCard.cta"),
    },
    {
      href: pagePaths.faq,
      label: t("faqCard.label"),
      text: t("faqCard.text"),
      cta: t("faqCard.cta"),
    },
  ] as const;

  return (
    <main id="main">
      <JsonLd
        data={[
          await organizationJsonLd(locale as Locale),
          await websiteJsonLd(locale as Locale),
        ]}
      />
      <Hero />
      <Work preview />
      <Services preview />

      <section className="section-pad py-20 md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-3">
          {cards.map((item) => (
            <Reveal key={item.href}>
              <Link
                href={item.href}
                className="glass block rounded-[1.5rem] p-7 transition-colors hover:border-accent/30"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-dim">
                  {item.label}
                </p>
                <p className="display mt-4 text-2xl">{item.text}</p>
                <span className="mt-6 inline-block text-sm text-accent-bright">
                  {item.cta}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Testimonials />
      <CtaBand />
    </main>
  );
}
