import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  crumbs?: { label: string; href?: "/" | "/work" | "/services" | "/process" | "/about" | "/contact" | "/faq" }[];
}

export function PageHero({ eyebrow, title, description, crumbs }: PageHeroProps) {
  return (
    <header className="section-pad relative overflow-hidden border-b border-border bg-bg-elevated pb-12 pt-36 md:pb-16 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-accent/14 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-highlight/10 blur-[90px]"
      />
      <div className="relative mx-auto max-w-[1400px]">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-dim">
              {crumbs.map((crumb, i) => (
                <li key={`${crumb.label}-${i}`} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-accent">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-muted">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal>
          <SectionEyebrow className="mt-0">{eyebrow}</SectionEyebrow>
          <h1 className="display mt-4 max-w-[16ch] text-5xl md:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {description}
          </p>
        </Reveal>
      </div>
    </header>
  );
}
