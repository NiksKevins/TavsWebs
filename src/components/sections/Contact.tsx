"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { budgetIndexes, site } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-dim focus:border-accent/50 focus:bg-white/[0.05]";

export function Contact({ showHeader = true }: { showHeader?: boolean }) {
  const t = useTranslations("contact");
  const tSite = useTranslations("site");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Company: ${data.get("company")}`,
      `Budget: ${data.get("budget")}`,
      ``,
      `${data.get("description")}`,
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Project inquiry — ${data.get("company") || data.get("name")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-pad relative py-16 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.12),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-[1400px]">
        {showHeader && (
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-dim">
              {t("eyebrow")}
            </p>
            <h2 className="display mt-4 max-w-[12ch] text-5xl md:text-7xl lg:text-8xl">
              {t("titleAltLead")}{" "}
              <span className="text-gradient">{t("titleAltAccent")}</span>{" "}
              {t("titleAltEnd")}
            </h2>
            <p className="mt-6 max-w-lg text-muted">{t("subtitle")}</p>
          </Reveal>
        )}

        <div className={cn("grid gap-12 lg:grid-cols-12", showHeader && "mt-16")}>
          <Reveal className="lg:col-span-4" delay={0.05}>
            <div className="space-y-5">
              <a
                href={`mailto:${site.email}`}
                className="glass flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-accent/30"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent-bright">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-xs text-dim">{t("email")}</p>
                  <p className="text-sm">{site.email}</p>
                </div>
              </a>
              <a
                href={site.phoneHref}
                className="glass flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-accent/30"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent-bright">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-xs text-dim">{t("phone")}</p>
                  <p className="text-sm">{site.phone}</p>
                </div>
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-emerald-400/30"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <MessageCircle size={18} />
                </span>
                <div>
                  <p className="text-xs text-dim">{t("whatsapp")}</p>
                  <p className="text-sm">{t("whatsappHint")}</p>
                </div>
              </a>
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-xs text-accent-bright">
                <Clock size={14} />
                {tSite("responseTime")}
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="glass rounded-[1.75rem] p-6 md:p-10"
              noValidate
            >
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-dim">
                    {t("name")}
                  </span>
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    className={fieldClass}
                    placeholder={t("namePlaceholder")}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-dim">
                    {t("emailField")}
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    className={fieldClass}
                    placeholder={t("emailPlaceholder")}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-dim">
                    {t("company")}
                  </span>
                  <input
                    name="company"
                    autoComplete="organization"
                    className={fieldClass}
                    placeholder={t("companyPlaceholder")}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-dim">
                    {t("budget")}
                  </span>
                  <select
                    name="budget"
                    className={cn(fieldClass, "appearance-none")}
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      {t("budgetPlaceholder")}
                    </option>
                    {budgetIndexes.map((key) => (
                      <option key={key} value={t(`budgets.${key}`)} className="bg-bg">
                        {t(`budgets.${key}`)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-dim">
                  {t("description")}
                </span>
                <textarea
                  required
                  name="description"
                  rows={5}
                  className={cn(fieldClass, "resize-y")}
                  placeholder={t("descriptionPlaceholder")}
                />
              </label>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" size="lg">
                  {t("submit")}
                </Button>
                {submitted && (
                  <p className="text-sm text-accent-bright" role="status">
                    {t("submitted")}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
