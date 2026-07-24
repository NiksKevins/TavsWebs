import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  crumbs?: { label: string; href?: "/" | "/work" | "/services" | "/process" | "/about" | "/contact" | "/faq" }[];
}

export function PageHero({ eyebrow, title, description, crumbs }: PageHeroProps) {
  return (
    <header className="section-pad relative overflow-hidden pb-12 pt-36 md:pb-16 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-accent/15 blur-[110px]"
      />
      <div className="relative mx-auto max-w-[1400px]">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-dim">
              {crumbs.map((crumb, i) => (
                <li key={`${crumb.label}-${i}`} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-white">
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
          <p className="text-xs uppercase tracking-[0.28em] text-dim">{eyebrow}</p>
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
