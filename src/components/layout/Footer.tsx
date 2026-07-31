"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BrandMark } from "@/components/ui/BrandMark";
import { footerHrefs, site } from "@/lib/data";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tSite = useTranslations("site");

  return (
    <footer className="section-pad border-t border-white/5 pb-[calc(6rem+var(--safe-bottom))] pt-16 md:pb-16">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link href="/" className="display inline-flex items-center gap-3 text-3xl md:text-4xl">
            <BrandMark className="h-8 w-8 shrink-0 md:h-9 md:w-9" />
            {site.name}
            <span
              aria-hidden
              className="ml-1 inline-block h-2 w-2 rounded-full bg-accent-bright md:h-2.5 md:w-2.5"
            />
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted">{tSite("tagline")}</p>
        </div>

        <nav
          aria-label={t("nav")}
          className="grid grid-cols-2 gap-3 text-sm text-muted sm:grid-cols-3 md:col-span-4"
        >
          {footerHrefs.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white"
            >
              {tNav(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm text-muted md:col-span-3 md:items-end">
          <a href={`mailto:${site.email}`} className="hover:text-white">
            {site.email}
          </a>
          <a href={site.phoneHref} className="hover:text-white">
            {site.phone}
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1400px] flex-col gap-2 border-t border-white/5 pt-6 text-xs text-dim sm:flex-row sm:justify-between">
        <p>{t("rights", { year: new Date().getFullYear(), name: site.name })}</p>
        <p>{t("note")}</p>
      </div>
    </footer>
  );
}
