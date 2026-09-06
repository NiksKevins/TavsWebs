"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { featuredProjectIds, projects, projectHref, type ProjectMeta } from "@/lib/data";
import { AnimatedLink } from "@/components/ui/AnimatedLink";
import { Reveal } from "@/components/ui/Reveal";
import { WordReveal } from "@/components/ui/TextReveal";
import { springSnappy } from "@/lib/motion";
import { cn } from "@/lib/utils";

function ProjectCard({
  project,
  index,
}: {
  project: ProjectMeta;
  index: number;
}) {
  const t = useTranslations("projects");
  const tWork = useTranslations("work");
  const metrics = t.raw(`${project.id}.metrics`) as string[];
  const reduced = useReducedMotion();

  return (
    <Reveal delay={index * 0.08} mode="scale" className="h-full shrink-0 sm:shrink lg:shrink">
      <motion.article
        className="group card-hover flex h-full w-[min(85vw,360px)] flex-col overflow-hidden sm:w-[340px] lg:w-auto"
        whileHover={reduced ? undefined : { y: -8 }}
        transition={springSnappy}
      >
        <Link
          href={projectHref(project.id)}
          className="relative block aspect-[16/11] overflow-hidden bg-surface"
          aria-label={`${tWork("viewCase")}: ${t(`${project.id}.title`)}`}
        >
          <motion.div
            className="relative h-full w-full"
            whileHover={reduced ? undefined : { scale: 1.05 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={project.image}
              alt={t(`${project.id}.title`)}
              fill
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 340px, 50vw"
              className="object-cover object-top"
              priority={index === 0}
              quality={75}
            />
          </motion.div>
        </Link>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-dim">
            {t(`${project.id}.category`)} · {project.year}
          </p>
          <h3 className="display mt-3 text-2xl leading-tight">
            <Link
              href={projectHref(project.id)}
              className="transition-colors hover:text-accent"
            >
              {t(`${project.id}.title`)}
            </Link>
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
            {t(`${project.id}.homeOutcome`)}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {metrics.slice(0, 2).map((m) => (
              <li
                key={m}
                className="rounded-full bg-highlight-muted px-2.5 py-1 text-xs font-medium text-accent"
              >
                {m}
              </li>
            ))}
          </ul>
          <Link href={projectHref(project.id)} className="mt-5 inline-block">
            <AnimatedLink showArrow>
              <span className="text-sm">{tWork("viewCase")}</span>
            </AnimatedLink>
          </Link>
        </div>
      </motion.article>
    </Reveal>
  );
}

export function Work({
  preview = false,
  showHeader = true,
}: {
  preview?: boolean;
  showHeader?: boolean;
}) {
  const t = useTranslations("work");

  const list = preview
    ? featuredProjectIds
        .map((id) => projects.find((p) => p.id === id))
        .filter((p): p is ProjectMeta => p !== undefined)
    : projects.filter((p) => !("mock" in p && p.mock));

  if (preview) {
    return (
      <section
        className="section-alt section-pad py-20 md:py-28"
        aria-labelledby="work-heading"
      >
        <div className="mx-auto max-w-[1400px]">
          {showHeader && (
            <Reveal mode="blur">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <h2
                  id="work-heading"
                  className="display max-w-[14ch] text-4xl md:text-5xl lg:text-6xl"
                >
                  <WordReveal text={t("homeTitle")} delay={0.08} />
                </h2>
                <p className="max-w-xs text-sm text-muted">{t("subtitle")}</p>
              </div>
            </Reveal>
          )}

          <div
            className={cn(
              "mt-12 -mx-[clamp(1.25rem,4vw,4.5rem)] overflow-x-auto px-[clamp(1.25rem,4vw,4.5rem)] pb-2 lg:overflow-visible",
              showHeader && "mt-12",
            )}
          >
            <div className="flex gap-5 lg:grid lg:grid-cols-2 lg:gap-6">
              {list.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-dim lg:hidden">
            {t("scrollHint")}
          </p>

          <Reveal className="mt-10 flex justify-center md:justify-end">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-all duration-200 hover:gap-3"
            >
              {t("viewAll")}
              <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section
      className="section-pad relative py-24 md:py-32"
      aria-labelledby={showHeader ? "work-heading" : undefined}
    >
      <div className="mx-auto max-w-[1400px]">
        {showHeader && (
          <Reveal>
            <div className="mb-8 flex flex-col gap-4 md:mb-4 md:flex-row md:items-end md:justify-between">
              <h2
                id="work-heading"
                className="display max-w-[10ch] text-5xl md:text-7xl"
              >
                {t("titleLead")}{" "}
                <span className="text-gradient">{t("titleAccent")}</span>
              </h2>
              <p className="max-w-xs text-sm text-muted md:text-right">
                {t("subtitle")}
              </p>
            </div>
          </Reveal>
        )}

        <div className="divide-y divide-border">
          {list.map((project, index) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectShowcase({
  project,
  index,
}: {
  project: ProjectMeta;
  index: number;
}) {
  const t = useTranslations("projects");
  const tWork = useTranslations("work");
  const isLeft = project.offset === "left";
  const metrics = t.raw(`${project.id}.metrics`) as string[];

  return (
    <article
      className={cn(
        "relative grid items-center gap-8 py-16 md:grid-cols-12 md:gap-6 md:py-28",
        index % 2 === 1 && "md:[&>*:first-child]:order-2",
      )}
    >
      <div
        className={cn(
          "relative md:col-span-7",
          isLeft ? "md:-ml-8 lg:-ml-16" : "md:-mr-8 lg:-mr-16",
        )}
      >
        <Link
          href={projectHref(project.id)}
          className="group relative block overflow-hidden rounded-[1.5rem] border border-border bg-bg-elevated shadow-sm transition-all duration-300 hover:border-accent/30 hover:shadow-md"
          aria-label={`${tWork("viewCase")}: ${t(`${project.id}.title`)}`}
        >
          <div
            className="relative aspect-[16/11] overflow-hidden"
            style={{
              background: `radial-gradient(120% 90% at ${isLeft ? "20%" : "80%"} 10%, ${project.glow}, transparent 55%), linear-gradient(145deg, ${project.accent}, #f3efe8 70%)`,
            }}
          >
            <Image
              src={project.image}
              alt={t(`${project.id}.title`)}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              priority={index === 0}
              quality={75}
            />
          </div>
        </Link>
      </div>

      <div
        className={cn(
          "md:col-span-5",
          isLeft ? "md:pl-4 lg:pl-10" : "md:pr-4 lg:pr-10",
        )}
      >
        <Reveal>
          <p className="text-xs uppercase tracking-[0.24em] text-dim">
            {t(`${project.id}.category`)} · {project.year}
          </p>
          <h3 className="display mt-4 text-4xl md:text-5xl lg:text-6xl">
            <Link
              href={projectHref(project.id)}
              className="transition-colors hover:text-accent"
            >
              {t(`${project.id}.title`)}
            </Link>
          </h3>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            {t(`${project.id}.description`)}
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-accent">
            {metrics.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <Link
            href={projectHref(project.id)}
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-text transition-all duration-200 hover:gap-3 hover:text-accent"
          >
            {tWork("viewCase")}
            <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
