"use client";

import { useTranslations } from "next-intl";
import { testimonialIndexes } from "@/lib/data";
import { Magnetic, Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="section-pad relative overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-cyan/5 blur-[100px]"
      />

      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-dim">
            {t("eyebrow")}
          </p>
          <h2 className="display mt-4 text-5xl md:text-6xl">{t("title")}</h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonialIndexes.map((i, index) => (
            <Reveal key={i} delay={index * 0.08}>
              <Magnetic strength={0.12}>
                <blockquote
                  className="glass relative flex h-full flex-col justify-between rounded-[1.5rem] p-7 md:p-8"
                  style={{
                    transform: `translateY(${index === 1 ? "1.5rem" : index === 2 ? "0.5rem" : "0"})`,
                  }}
                >
                  <p className="text-lg leading-relaxed text-white/90">
                    “{t(`items.${i}.quote`)}”
                  </p>
                  <footer className="mt-10">
                    <p className="font-medium">{t(`items.${i}.name`)}</p>
                    <p className="mt-1 text-sm text-dim">
                      {t(`items.${i}.role`)}
                    </p>
                  </footer>
                </blockquote>
              </Magnetic>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
