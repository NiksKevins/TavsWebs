import { Link } from "@/i18n/navigation";
import { site } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { cn } from "@/lib/utils";

export type LegalSection = {
  key: string;
  heading: string;
  paragraphs: string[];
};

interface LegalDocumentProps {
  updated: string;
  tocLabel: string;
  contactLabel: string;
  contactBody: string;
  contactCta: string;
  relatedLabel: string;
  relatedHref: "/privacy" | "/terms";
  relatedTitle: string;
  sections: LegalSection[];
}

export function LegalDocument({
  updated,
  tocLabel,
  contactLabel,
  contactBody,
  contactCta,
  relatedLabel,
  relatedHref,
  relatedTitle,
  sections,
}: LegalDocumentProps) {
  return (
    <div className="section-pad pb-20 md:pb-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-dim">
              {tocLabel}
            </p>
            <nav aria-label={tocLabel} className="mt-4 space-y-1">
              {sections.map((section, index) => (
                <a
                  key={section.key}
                  href={`#section-${section.key}`}
                  className="group flex items-baseline gap-3 rounded-lg px-2 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-text"
                >
                  <span className="font-mono text-[11px] text-accent/70 transition-colors group-hover:text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-snug">{section.heading}</span>
                </a>
              ))}
            </nav>

            <div className="mt-8 hidden border-t border-border pt-6 lg:block">
              <p className="text-xs text-dim">{updated}</p>
              <Link
                href={relatedHref}
                className="mt-3 inline-flex text-sm font-medium text-accent transition-colors hover:text-accent-bright"
              >
                {relatedLabel}: {relatedTitle} →
              </Link>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8 lg:col-start-5">
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-xl border border-border bg-bg-elevated px-4 py-2.5 text-sm text-muted shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-highlight" aria-hidden />
              {updated}
            </div>
          </Reveal>

          <div className="mt-10 space-y-4">
            {sections.map((section, index) => (
              <Reveal key={section.key} delay={index * 0.03}>
                <section
                  id={`section-${section.key}`}
                  className={cn(
                    "scroll-mt-32 rounded-2xl border border-border bg-bg-elevated p-6 shadow-sm md:p-8",
                  )}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-sm text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="display text-2xl md:text-3xl">
                        {section.heading}
                      </h2>
                      <div className="mt-4 space-y-3 text-base leading-relaxed text-muted">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10" delay={0.1}>
            <div className="cta-panel rounded-2xl p-6 md:p-8">
              <SectionEyebrow>{contactLabel}</SectionEyebrow>
              <p className="mt-4 max-w-xl text-muted">{contactBody}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white transition hover:bg-accent-bright"
                >
                  {contactCta}
                </a>
                <Link
                  href={relatedHref}
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-bg-elevated px-5 py-3 text-sm font-medium text-text transition hover:bg-surface"
                >
                  {relatedTitle}
                </Link>
              </div>
            </div>
          </Reveal>

          <p className="mt-8 text-sm text-dim lg:hidden">
            <Link href={relatedHref} className="font-medium text-accent">
              {relatedLabel}: {relatedTitle} →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
