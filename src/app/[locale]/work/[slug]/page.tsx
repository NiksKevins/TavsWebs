import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/seo/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/seo/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { getProject, projects, projectHref, type ProjectId } from "@/lib/data";
import { Link as LocaleLink } from "@/i18n/navigation";
import {
  breadcrumbJsonLd,
  createProjectMetadata,
  projectJsonLd,
} from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return projects.flatMap((project) =>
    (["lv", "en"] as const).map((locale) => ({
      locale,
      slug: project.id,
    })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return createProjectMetadata(locale as Locale, project.id);
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("projects");
  const tWork = await getTranslations("work");
  const tCrumb = await getTranslations("breadcrumbs");
  const tNav = await getTranslations("nav");
  const metrics = t.raw(`${project.id}.metrics`) as string[];
  const services = t.raw(`${project.id}.services`) as string[];
  const galleryLabels = (t.raw(`${project.id}.galleryLabels`) as string[]) ?? [];
  const related = projects.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <main id="main">
      <JsonLd
        data={[
          breadcrumbJsonLd(
            [
              { name: tCrumb("home"), path: "/" },
              { name: tNav("work"), path: "/work" },
              {
                name: t(`${project.id}.title`),
                path: `/work/${project.id}`,
              },
            ],
            locale as Locale,
          ),
          await projectJsonLd(locale as Locale, project.id as ProjectId),
        ]}
      />

      <PageHero
        eyebrow={`${t(`${project.id}.category`)} · ${project.year}`}
        title={t(`${project.id}.title`)}
        description={t(`${project.id}.description`)}
        crumbs={[
          { label: tCrumb("home"), href: "/" },
          { label: tNav("work"), href: "/work" },
          { label: t(`${project.id}.title`) },
        ]}
      />

      <section className="section-pad pb-20">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-white/10 bg-black">
              <Image
                src={project.image}
                alt={t(`${project.id}.title`)}
                fill
                sizes="100vw"
                className="max-w-none object-cover object-top"
                priority
              />
            </div>
            {galleryLabels[0] && (
              <p className="mt-3 text-sm text-muted">{galleryLabels[0]}</p>
            )}
          </Reveal>

          {project.gallery.filter((src) => src !== project.image).length > 0 && (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {project.gallery
                .map((src, i) => ({ src, label: galleryLabels[i], i }))
                .filter(({ src }) => src !== project.image)
                .map(({ src, label }, i) => (
                <Reveal key={src} delay={i * 0.05}>
                  <figure className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={src}
                        alt={label ?? t(`${project.id}.title`)}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="max-w-none object-cover object-top"
                      />
                    </div>
                    {label && (
                      <figcaption className="border-t border-white/8 px-5 py-3 text-sm text-muted">
                        {label}
                      </figcaption>
                    )}
                  </figure>
                </Reveal>
              ))}
            </div>
          )}

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <h2 className="display text-3xl md:text-4xl">
                {tWork("overview")}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {t(`${project.id}.longDescription`)}
              </p>
            </Reveal>
            <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
              <div className="glass rounded-[1.5rem] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-dim">
                  {tWork("outcomes")}
                </p>
                <ul className="mt-4 space-y-3 text-accent-bright">
                  {metrics.map((metric) => (
                    <li key={metric}>{metric}</li>
                  ))}
                </ul>
                <p className="mt-8 text-xs uppercase tracking-[0.2em] text-dim">
                  {tWork("servicesLabel")}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {services.map((service) => (
                    <li key={service}>
                      <LocaleLink href="/services" className="hover:text-white">
                        {service}
                      </LocaleLink>
                    </li>
                  ))}
                </ul>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 text-sm text-accent-bright hover:text-white"
                  >
                    {tWork("viewLive")}
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </Reveal>
          </div>

          <div className="mt-20 border-t border-white/8 pt-10">
            <LocaleLink
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-white"
            >
              <ArrowLeft size={16} />
              {tWork("backToAll")}
            </LocaleLink>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="display text-3xl">{tWork("moreWork")}</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {related.map((item) => (
                  <LocaleLink
                    key={item.id}
                    href={projectHref(item.id)}
                    className="glass group overflow-hidden rounded-[1.5rem] transition-colors hover:border-accent/30"
                  >
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={item.image}
                        alt={t(`${item.id}.title`)}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs uppercase tracking-[0.2em] text-dim">
                        {t(`${item.id}.category`)}
                      </p>
                      <p className="display mt-3 text-2xl group-hover:text-accent-bright">
                        {t(`${item.id}.title`)}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent-bright">
                        {tWork("viewCase")} <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </LocaleLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title={tWork("ctaProject", { title: t(`${project.id}.title`) })}
      />
    </main>
  );
}
