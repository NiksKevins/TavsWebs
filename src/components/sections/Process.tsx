"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { processImages, processStepIds } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function Process({ showHeader = true }: { showHeader?: boolean }) {
  const t = useTranslations("process");
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Use vw (not %) — % is relative to the track's layout width (often 100vw when
  // w-full is set), which only advances ~one panel across the whole scroll.
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(processStepIds.length - 1) * 100}vw`],
  );

  return (
    <section id="process" className="relative section-alt">
      {showHeader && (
        <div className="section-pad mx-auto max-w-[1400px] pt-24 md:pt-32">
          <Reveal>
            <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
            <h2 className="display mt-4 text-5xl md:text-7xl">
              {t("titleLead")}{" "}
              <span className="text-gradient">{t("titleAccent")}</span>
            </h2>
            <p className="mt-4 max-w-md text-muted">{t("subtitle")}</p>
          </Reveal>
        </div>
      )}

      {reduced ? (
        <div className="section-pad mx-auto max-w-[1400px] space-y-10 py-16">
          {processStepIds.map((id, i) => (
            <div
              key={id}
              className="overflow-hidden rounded-3xl border border-border bg-bg-elevated shadow-sm"
            >
              <div className="relative aspect-[16/10] bg-surface">
                <Image
                  src={processImages[id]}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <p className="font-mono text-sm text-accent-bright">0{i + 1}</p>
                <h3 className="display mt-3 text-3xl">{t(`steps.${id}.title`)}</h3>
                <p className="mt-2 text-sm text-dim">{t(`steps.${id}.subtitle`)}</p>
                <p className="mt-4 text-muted">{t(`steps.${id}.description`)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div ref={containerRef} className="relative h-[400vh] md:h-[500vh]">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <motion.div style={{ x }} className="flex h-[70vh] will-change-transform">
              {processStepIds.map((id, i) => (
                <div
                  key={id}
                  className="relative flex w-screen shrink-0 items-center px-[clamp(1.25rem,4vw,4.5rem)]"
                >
                  <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-10 md:grid-cols-12">
                    <div className="md:col-span-5">
                      <p className="font-mono text-sm text-accent-bright">
                        0{i + 1} / 0{processStepIds.length}
                      </p>
                      <h3 className="display mt-4 text-5xl md:text-7xl">
                        {t(`steps.${id}.title`)}
                      </h3>
                      <p className="mt-3 text-lg text-dim">
                        {t(`steps.${id}.subtitle`)}
                      </p>
                      <p className="mt-6 max-w-md leading-relaxed text-muted">
                        {t(`steps.${id}.description`)}
                      </p>
                    </div>
                    <div className="relative md:col-span-7">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-border bg-surface shadow-sm">
                        <Image
                          src={processImages[id]}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 90vw, 55vw"
                          className="object-cover"
                          priority={i === 0}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-elevated/55 via-transparent to-transparent" />
                        <div className="pointer-events-none absolute inset-0 flex items-end p-8 md:p-12">
                          <span className="display text-[clamp(3rem,8vw,6rem)] leading-none text-text/20">
                            {t(`steps.${id}.title`)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}
