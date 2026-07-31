"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
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
          className="group relative block overflow-hidden rounded-[1.5rem] border border-white/10"
          aria-label={`${tWork("viewCase")}: ${t(`${project.id}.title`)}`}
          data-cursor="hover"
        >
          <div
            className="relative aspect-[16/11] overflow-hidden"
            style={{
              background: `radial-gradient(120% 90% at ${isLeft ? "20%" : "80%"} 10%, ${project.glow}, transparent 55%), linear-gradient(145deg, ${project.accent}, #05070c 70%)`,
            }}
          >
            <img
              src={project.image}
              alt={t(`${project.id}.title`)}
              width={1600}
              height={1100}
              className="absolute inset-0 object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ width: "100%", height: "100%", maxWidth: "none" }}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
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
