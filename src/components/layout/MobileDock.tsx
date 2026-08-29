"use client";

import { useEffect, useState } from "react";
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
  const [navOpen, setNavOpen] = useState(false);
  const hidden = navOpen || (scrolled && direction === "down");

  useEffect(() => {
    const sync = () =>
      setNavOpen(document.body.hasAttribute("data-nav-open"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-nav-open"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      aria-label={t("quickActions")}
      aria-hidden={hidden}
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(0.75rem+var(--safe-bottom))] md:hidden"
      animate={{
        y: hidden ? 120 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ type: "spring", stiffness: 380, damping: 34 }}
    >
      <div className="glass mx-auto grid max-w-md grid-cols-3 gap-1 rounded-xl p-1.5 shadow-[0_12px_40px_-16px_rgba(28,25,23,0.35)]">
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex flex-col items-center justify-center gap-1 rounded-2xl py-3 text-[11px] font-medium text-muted transition-all duration-200",
            "hover:bg-emerald-50 hover:text-emerald-700 hover:-translate-y-0.5 active:translate-y-0 active:bg-emerald-100 active:text-emerald-800",
          )}
        >
          <MessageCircle
            size={20}
            className="transition-colors group-hover:text-emerald-700"
          />
          {t("whatsapp")}
        </a>
        <a
          href={`mailto:${site.email}`}
          className="group flex flex-col items-center justify-center gap-1 rounded-2xl py-3 text-[11px] font-medium text-muted transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/10 hover:text-accent-bright active:translate-y-0 active:bg-accent/15"
        >
          <Mail
            size={20}
            className="transition-colors group-hover:text-accent-bright"
          />
          {t("email")}
        </a>
        <Link
          href="/contact"
          className="flex flex-col items-center justify-center gap-1 rounded-xl bg-accent py-3 text-[11px] font-semibold text-white shadow-[0_4px_16px_-4px_rgba(10,95,168,0.45)] transition-all duration-200 hover:bg-accent-bright hover:-translate-y-0.5 active:translate-y-0"
        >
          {t("quote")}
        </Link>
      </div>
    </motion.nav>
  );
}
