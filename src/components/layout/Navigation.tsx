"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/ui/BrandMark";
import { navHrefs, site } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/useMotion";

export function Navigation() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { scrolled } = useScrollDirection();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    setCompact(scrolled);
  }, [scrolled]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.toggleAttribute("data-nav-open", open);
    return () => {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-nav-open");
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-all duration-500",
          compact ? "py-2" : "py-5",
        )}
      >
        <div
          className={cn(
            "section-pad mx-auto flex max-w-[1400px] items-center justify-between rounded-2xl transition-all duration-500",
            compact
              ? "glass py-2.5 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.8)]"
              : "bg-transparent py-1",
          )}
        >
          <Link
            href="/"
            className="display inline-flex items-center gap-2 text-lg tracking-tight text-white md:text-xl"
            aria-label={t("homeAria", { name: site.name })}
          >
            <BrandMark className="h-6 w-6 shrink-0 md:h-7 md:w-7" />
            {site.name}
            <span
              aria-hidden
              className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-accent-bright md:h-2 md:w-2"
            />
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label={t("primary")}
          >
            {navHrefs.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors hover:text-white",
                    active ? "text-white" : "text-muted",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <Link href="/contact">
              <Button size={compact ? "sm" : "md"}>{t("getQuote")}</Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="glass flex h-11 w-11 items-center justify-center rounded-full"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-[#05070c]/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="section-pad flex min-h-0 flex-1 flex-col justify-center gap-[clamp(0.5rem,2.2vh,1.25rem)] overflow-y-auto pt-[max(5rem,12vh)] pb-[max(1.5rem,4vh)]">
              {navHrefs.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="display block text-[clamp(1.75rem,6.5vh,2.75rem)] leading-tight text-white"
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-[clamp(0.5rem,2vh,1.25rem)]"
              >
                <Link href="/contact" onClick={() => setOpen(false)}>
                  <Button size="md">{t("getQuote")}</Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
