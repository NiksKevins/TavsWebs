"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/data";
import { useScrollDirection } from "@/hooks/useMotion";
import { cn } from "@/lib/utils";

export function MobileDock() {
  const t = useTranslations("dock");
  const { direction, scrolled } = useScrollDirection(12);
  const hidden = scrolled && direction === "down";

  return (
    <motion.nav
      aria-label={t("quickActions")}
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(0.75rem+var(--safe-bottom))] md:hidden"
      animate={{
        y: hidden ? 120 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ type: "spring", stiffness: 380, damping: 34 }}
    >
      <div className="glass mx-auto grid max-w-md grid-cols-3 gap-1 rounded-[1.35rem] p-1.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.85)]">
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex flex-col items-center justify-center gap-1 rounded-2xl py-3 text-[11px] font-medium text-muted transition-colors",
            "hover:bg-emerald-500/10 hover:text-emerald-400 active:bg-emerald-500/15 active:text-emerald-400",
          )}
        >
          <MessageCircle
            size={20}
            className="transition-colors group-hover:text-emerald-400"
          />
          {t("whatsapp")}
        </a>
        <a
          href={`mailto:${site.email}`}
          className="group flex flex-col items-center justify-center gap-1 rounded-2xl py-3 text-[11px] font-medium text-muted transition-colors hover:bg-accent/10 hover:text-accent-bright active:bg-accent/15"
        >
          <Mail
            size={20}
            className="transition-colors group-hover:text-accent-bright"
          />
          {t("email")}
        </a>
        <Link
          href="/contact"
          className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-r from-accent to-accent-bright py-3 text-[11px] font-semibold text-white shadow-[0_0_28px_-10px_rgba(59,130,246,0.9)]"
        >
          {t("quote")}
        </Link>
      </div>
    </motion.nav>
  );
}
