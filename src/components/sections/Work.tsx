"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import { projects, projectHref, type ProjectMeta } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

function ProjectShowcase({
  project,
  index,
}: {
  project: ProjectMeta;
  index: number;
}) {
  const t = useTranslations("projects");
  const tWork = useTranslations("work");
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const isLeft = project.offset === "left";
  const metrics = t.raw(`${project.id}.metrics`) as string[];

  return (
    <article
      ref={ref}
      className={cn(
        "relative grid items-center gap-8 py-16 md:grid-cols-12 md:gap-6 md:py-28",
        index % 2 === 1 && "md:[&>*:first-child]:order-2",
      )}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <div
        className={cn(
          "relative md:col-span-7",
          isLeft ? "md:-ml-8 lg:-ml-16" : "md:-mr-8 lg:-mr-16",
        )}
      >
        <Link
          href={projectHref(project.id)}
          className="relative block overflow-hidden rounded-[1.5rem] border border-white/10"
          aria-label={`${tWork("viewCase")}: ${t(`${project.id}.title`)}`}
        >
          <motion.div
            className="relative aspect-[16/11] overflow-hidden"
            style={{
              background: `radial-gradient(120% 90% at ${isLeft ? "20%" : "80%"} 10%, ${project.glow}, transparent 55%), linear-gradient(145deg, ${project.accent}, #05070c 70%)`,
              x: sx,
              y: sy,
              scale: 1.04,
            }}
            data-cursor="hover"
          >
            <div className="absolute inset-6 rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm md:inset-10 md:p-8">
              <div className="mb-6 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="ml-3 h-2 flex-1 rounded-full bg-white/8" />
              </div>
              <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-3">
                  <div className="h-3 w-2/3 rounded-full bg-white/15" />
                  <div className="h-3 w-full rounded-full bg-white/8" />
                  <div className="h-3 w-5/6 rounded-full bg-white/8" />
                  <div className="mt-8 aspect-[4/3] rounded-lg bg-gradient-to-br from-white/15 via-accent/20 to-transparent" />
                </div>
                <div className="hidden space-y-3 md:block">
                  <div className="aspect-square rounded-lg bg-white/[0.06]" />
                  <div className="h-24 rounded-lg bg-white/[0.04]" />
                </div>
              </div>
            </div>
            <div
              className={cn(
                "absolute -bottom-8 h-[55%] w-[42%] rounded-2xl border border-white/15 bg-[#0a1220]/80 shadow-2xl backdrop-blur-md",
                isLeft ? "-right-6 rotate-[-6deg]" : "-left-6 rotate-[6deg]",
              )}
            >
              <div className="h-full p-4">
                <div className="mb-3 h-2 w-16 rounded-full bg-accent/50" />
                <div className="space-y-2">
                  <div className="h-2 w-full rounded-full bg-white/10" />
                  <div className="h-2 w-4/5 rounded-full bg-white/10" />
                  <div className="mt-4 aspect-video rounded-md bg-gradient-to-tr from-cyan/20 to-accent/10" />
                </div>
              </div>
            </div>
          </motion.div>
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
              className="transition-colors hover:text-accent-bright"
            >
              {t(`${project.id}.title`)}
            </Link>
          </h3>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            {t(`${project.id}.description`)}
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-accent-bright">
            {metrics.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <Link
            href={projectHref(project.id)}
            className="mt-8 inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-accent-bright"
          >
            {tWork("viewCase")}
            <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </article>
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
  const list = preview ? projects.slice(0, 2) : projects;

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

        <div className="divide-y divide-white/5">
          {list.map((project, index) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {preview && (
          <Reveal className="mt-12 flex justify-center md:justify-end">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-accent-bright hover:text-white"
            >
              {t("viewAll")}
              <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
