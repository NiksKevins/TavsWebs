"use client";

import { FormEvent, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { budgetIndexes, site } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BudgetSelect } from "@/components/ui/BudgetSelect";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-dim focus:border-accent/50 focus:bg-white/[0.05]";

export function Contact({ showHeader = true }: { showHeader?: boolean }) {
  const t = useTranslations("contact");
  const tSite = useTranslations("site");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [budgetError, setBudgetError] = useState(false);
  const [budgetKey, setBudgetKey] = useState(0);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const budget = String(data.get("budget") || "");
    if (!budget) {
      setBudgetError(true);
      return;
    }
    setBudgetError(false);
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          budget,
          description: data.get("description"),
          locale,
        }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
      setBudgetKey((k) => k + 1);
    } catch {
      setStatus("error");
    }
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
                className="glass card-hover flex items-center gap-4 rounded-2xl p-4"
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
                className="glass card-hover flex items-center gap-4 rounded-2xl p-4"
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
                className="glass card-hover flex items-center gap-4 rounded-2xl p-4 hover:border-emerald-400/35"
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
                    disabled={status === "loading"}
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
                    disabled={status === "loading"}
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
                    disabled={status === "loading"}
                  />
                </label>
                <div>
                  <BudgetSelect
                    key={budgetKey}
                    name="budget"
                    label={t("budget")}
                    placeholder={t("budgetPlaceholder")}
                    options={budgetIndexes.map((key) => t(`budgets.${key}`))}
                    onChange={() => setBudgetError(false)}
                  />
                  {budgetError && (
                    <p className="mt-2 text-xs text-red-400" role="alert">
                      {t("budgetPlaceholder")}
                    </p>
                  )}
                </div>
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
                  disabled={status === "loading"}
                />
              </label>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? t("submitting") : t("submit")}
                </Button>
                {status === "success" && (
                  <p className="text-sm text-accent-bright" role="status">
                    {t("success")}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-400" role="alert">
                    {t("error")}
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
