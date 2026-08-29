import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { guideIds, guideHref } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";

export async function GuideList() {
  const t = await getTranslations("guides");

  return (
    <section className="section-pad py-16 md:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guideIds.map((id, index) => (
          <Reveal key={id} delay={index * 0.05}>
            <Link
              href={guideHref(id)}
              className="group card-hover flex h-full flex-col p-6 md:p-7"
            >
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                {t(`items.${id}.category`)}
              </p>
              <h2 className="display mt-3 text-2xl leading-tight transition-colors group-hover:text-accent">
                {t(`items.${id}.title`)}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {t(`items.${id}.excerpt`)}
              </p>
              <p className="mt-4 text-xs text-dim">{t(`items.${id}.readTime`)}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                {t("readMore")}
                <ArrowUpRight size={14} />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
