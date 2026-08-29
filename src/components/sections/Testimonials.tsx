"use client";

import { useLocale, useTranslations } from "next-intl";
import { Star } from "lucide-react";
import {
  GOOGLE_REVIEWS_URL,
  googleReviews,
  testimonialIndexes,
} from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="inline-flex gap-0.5 text-[#F4B400]" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const isLv = locale === "lv";

  return (
    <section className="section-pad py-20 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-dim">
                {t("eyebrow")}
              </p>
              <h2 className="display mt-4 text-4xl md:text-5xl">{t("title")}</h2>
            </div>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="card inline-flex items-center gap-3 self-start px-5 py-3 transition-shadow hover:shadow-md"
            >
              <GoogleMark className="h-6 w-6" />
              <div>
                <p className="text-2xl font-bold leading-none">{t("googleRating")}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                  <Stars />
                  {t("googleLabel")}
                </p>
              </div>
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {googleReviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 0.06}>
              <blockquote className="card flex h-full flex-col p-6 md:p-7">
                <Stars />
                <p className="mt-4 flex-1 leading-relaxed text-text">
                  &ldquo;{isLv ? review.textLv : review.text}&rdquo;
                </p>
                <footer className="mt-6 border-t border-border pt-4">
                  <p className="font-medium">{review.name}</p>
                  <p className="mt-0.5 text-xs text-dim">{t("googleSource")}</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}

          {testimonialIndexes.slice(0, 1).map((i, index) => (
            <Reveal key={i} delay={(googleReviews.length + index) * 0.06}>
              <blockquote className="card flex h-full flex-col p-6 md:p-7">
                <p className="flex-1 leading-relaxed text-text">
                  &ldquo;{t(`items.${i}.quote`)}&rdquo;
                </p>
                <footer className="mt-6 border-t border-border pt-4">
                  <p className="font-medium">{t(`items.${i}.name`)}</p>
                  <p className="mt-0.5 text-sm text-dim">{t(`items.${i}.role`)}</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent transition-colors hover:text-accent-bright"
          >
            {t("viewAllGoogle")} →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
