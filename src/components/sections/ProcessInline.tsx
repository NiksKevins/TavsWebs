"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { processStepIds } from "@/lib/data";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { WordReveal } from "@/components/ui/TextReveal";
import { springSnappy } from "@/lib/motion";

export function ProcessInline() {
  const t = useTranslations("process");

  return (
    <section className="section-pad py-20 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal mode="blur">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="display max-w-[16ch] text-4xl md:text-5xl">
              {t("titleLead")}{" "}
              <span className="text-gradient">
                <WordReveal text={t("titleAccent")} delay={0.12} />
              </span>
            </h2>
            <p className="max-w-sm text-sm text-muted">{t("subtitle")}</p>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.08}>
          {processStepIds.map((id, i) => (
            <StaggerItem key={id}>
              <motion.div
                className="card-accent-top card h-full p-5 md:p-6"
                whileHover={{ y: -6 }}
                transition={springSnappy}
              >
                <p className="font-mono text-xs text-accent">{`0${i + 1}`}</p>
                <h3 className="display mt-3 text-xl">{t(`steps.${id}.title`)}</h3>
                <p className="mt-2 text-xs text-dim">{t(`steps.${id}.subtitle`)}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {t(`steps.${id}.description`)}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-8 flex justify-center md:justify-end" delay={0.1}>
          <Link href="/process">
            <AnimatedLink>{t("learnMore")}</AnimatedLink>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
