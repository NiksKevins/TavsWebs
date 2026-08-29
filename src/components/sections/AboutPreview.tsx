"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { stats } from "@/lib/data";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { WordReveal } from "@/components/ui/TextReveal";
import { springSnappy } from "@/lib/motion";

export function AboutPreview() {
  const t = useTranslations("aboutPreview");

  return (
    <section className="section-alt section-pad py-20 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal mode="blur">
            <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
            <h2 className="display mt-4 text-4xl md:text-5xl">
              <WordReveal text={t("title")} delay={0.08} />
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-muted">{t("body")}</p>
            <p className="mt-4 max-w-lg leading-relaxed text-muted">{t("body2")}</p>
            <Link href="/about" className="mt-8 inline-block">
              <AnimatedLink>{t("cta")}</AnimatedLink>
            </Link>
          </Reveal>

          <Stagger className="grid grid-cols-2 gap-4" stagger={0.1}>
            {stats.map((stat, index) => (
              <StaggerItem key={stat.key}>
                <motion.div
                  className="stat-card card flex flex-col justify-center p-6 md:p-8"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={springSnappy}
                >
                  <p className="display text-4xl text-accent md:text-5xl">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {t(`stats.${stat.key}`)}
                  </p>
                  <motion.div
                    className="mt-4 h-0.5 w-8 bg-highlight/60"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    style={{ originX: 0 }}
                  />
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
