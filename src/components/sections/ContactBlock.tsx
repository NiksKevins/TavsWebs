"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ContactBlock() {
  const t = useTranslations("contactBlock");

  const items = [
    {
      icon: Phone,
      label: t("phone"),
      value: site.phone,
      href: site.phoneHref,
    },
    {
      icon: Mail,
      label: t("email"),
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: MessageCircle,
      label: t("whatsapp"),
      value: t("whatsappHint"),
      href: site.whatsapp,
      external: true,
    },
    {
      icon: MapPin,
      label: t("location"),
      value: t("locationValue"),
      href: undefined,
    },
    {
      icon: Clock,
      label: t("hours"),
      value: t("hoursValue"),
      href: undefined,
    },
  ] as const;

  return (
    <section className="section-alt section-pad py-20 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-dim">
              {t("eyebrow")}
            </p>
            <h2 className="display mt-4 text-4xl md:text-5xl">{t("title")}</h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact">
                <Button size="lg">
                  {t("cta")}
                  <ArrowUpRight size={18} />
                </Button>
              </Link>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="whatsapp">
                  <MessageCircle size={18} />
                  WhatsApp
                </Button>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card divide-y divide-border overflow-hidden">
              {items.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-4 p-5 md:p-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-dim">
                        {item.label}
                      </p>
                      <p className="mt-1 font-medium text-text">{item.value}</p>
                    </div>
                  </div>
                );

                if (item.href) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={"external" in item && item.external ? "_blank" : undefined}
                      rel={
                        "external" in item && item.external
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="block transition-colors hover:bg-slate-50"
                    >
                      {content}
                    </a>
                  );
                }

                return <div key={item.label}>{content}</div>;
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
