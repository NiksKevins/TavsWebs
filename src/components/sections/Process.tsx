"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { processStepIds } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

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
    <section id="process" className="relative bg-navy/40">
      {showHeader && (
        <div className="section-pad mx-auto max-w-[1400px] pt-24 md:pt-32">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-dim">
              {t("eyebrow")}
            </p>
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
              className="rounded-3xl border border-white/8 bg-bg-elevated/60 p-8"
            >
              <p className="font-mono text-sm text-accent-bright">
                0{i + 1}
              </p>
              <h3 className="display mt-3 text-3xl">
                {t(`steps.${id}.title`)}
              </h3>
              <p className="mt-2 text-sm text-dim">
                {t(`steps.${id}.subtitle`)}
              </p>
              <p className="mt-4 text-muted">
                {t(`steps.${id}.description`)}
              </p>
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
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 bg-bg-elevated">
                        <div
                          className="h-full w-full"
                          style={{
                            background: `
                              radial-gradient(circle at ${20 + i * 15}% ${30 + i * 8}%, rgba(96,165,250,0.35), transparent 45%),
                              radial-gradient(circle at ${70 - i * 10}% ${60}% , rgba(103,232,249,0.18), transparent 40%),
                              linear-gradient(160deg, #0a1220, #05070c)
                            `,
                          }}
                        />
                        <div className="pointer-events-none absolute inset-0 flex items-end p-8 md:p-12">
                          <span className="display text-[clamp(4rem,12vw,9rem)] leading-none text-white/[0.06]">
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
