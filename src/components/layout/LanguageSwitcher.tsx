"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("language");
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 text-xs",
        className,
      )}
      role="group"
      aria-label={tNav("language")}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            aria-label={t("switchTo", { locale: t(code) })}
            aria-pressed={active}
            className={cn(
              "rounded-full px-2.5 py-1.5 font-medium tracking-wide transition-all duration-200",
              active
                ? "bg-accent/20 text-white"
                : "text-muted hover:bg-white/[0.08] hover:text-white active:scale-95",
            )}
            onClick={() => {
              if (code === locale) return;
              // Preserve dynamic segments (e.g. /work/[slug]) when switching locale
              router.replace(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                { pathname, params } as any,
                { locale: code },
              );
            }}
          >
            {t(code)}
          </button>
        );
      })}
    </div>
  );
}
