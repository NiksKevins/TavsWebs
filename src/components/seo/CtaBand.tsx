"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

interface CtaBandProps {
  title?: string;
  description?: string;
}

export function CtaBand({ title, description }: CtaBandProps) {
  const t = useTranslations("cta");

  return (
    <section className="section-pad py-20 md:py-28">
      <Reveal>
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-navy to-bg-elevated p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="display text-3xl md:text-5xl">
              {title ?? t("title")}
            </h2>
            <p className="mt-3 max-w-md text-muted">
              {description ?? t("description")}
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg">
              {t("button")}
              <ArrowUpRight size={18} />
            </Button>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
