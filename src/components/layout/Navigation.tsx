"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, MessageCircle, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/ui/BrandMark";
import { navHrefs, serviceHref, serviceNavItems, site } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/useMotion";

export function Navigation() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { scrolled } = useScrollDirection();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCompact(scrolled);
  }, [scrolled]);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.toggleAttribute("data-nav-open", open);
    return () => {
      document.body.style.overflow = "";
      document.body.removeAttribute("data-nav-open");
    };
  }, [open]);

  useEffect(() => {
    if (!servicesOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [servicesOpen]);

  const isServicesActive =
    pathname === "/services" || pathname.startsWith("/services");

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-all duration-500",
          compact ? "py-2" : "py-4",
        )}
      >
        <div
          className={cn(
            "section-pad mx-auto flex max-w-[1400px] items-center justify-between rounded-2xl transition-all duration-500",
            compact ? "glass py-2.5" : "bg-bg/80 py-1 backdrop-blur-sm",
          )}
        >
          <Link
            href="/"
            className="display inline-flex items-center gap-2 text-lg tracking-tight text-text transition hover:text-accent md:text-xl"
            aria-label={t("homeAria", { name: site.name })}
          >
            <BrandMark className="h-6 w-6 shrink-0 md:h-7 md:w-7" />
            {site.name}
            <span
              aria-hidden
              className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-highlight md:h-2 md:w-2"
            />
          </Link>

          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label={t("primary")}
          >
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className={cn(
                  "nav-link inline-flex items-center gap-1 text-sm",
                  isServicesActive ? "text-accent font-medium" : "text-muted hover:text-text",
                )}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen((v) => !v)}
              >
                {t("services")}
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform duration-200",
                    servicesOpen && "rotate-180",
                  )}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-xl border border-border bg-bg-elevated py-2 shadow-lg"
                  >
                    {serviceNavItems.map((item) => (
                      <Link
                        key={item.id}
                        href={serviceHref(item.id)}
                        className="block px-4 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-text"
                        onClick={() => setServicesOpen(false)}
                      >
                        {t(`serviceItems.${item.id}`)}
                      </Link>
                    ))}
                    <div className="mx-3 my-2 border-t border-border" />
                    <Link
                      href="/services"
                      className="block px-4 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-surface"
                      onClick={() => setServicesOpen(false)}
                    >
                      {t("allServices")} →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navHrefs.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "nav-link text-sm",
                    active ? "text-accent font-medium" : "text-muted hover:text-text",
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
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
            >
              <MessageCircle size={18} />
            </a>
            <Link href="/contact">
              <Button size={compact ? "sm" : "md"}>{t("getQuote")}</Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="glass flex h-11 w-11 items-center justify-center rounded-full transition hover:border-accent/30 active:scale-95"
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
            className="fixed inset-0 z-[60] flex flex-col bg-bg/98 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="section-pad flex min-h-0 flex-1 flex-col justify-center gap-4 overflow-y-auto pt-[max(5rem,12vh)] pb-[max(1.5rem,4vh)]">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <button
                  type="button"
                  className="display flex w-full items-center justify-between text-[clamp(1.75rem,6.5vh,2.5rem)] leading-tight text-text"
                  aria-expanded={mobileServicesOpen}
                  onClick={() => setMobileServicesOpen((v) => !v)}
                >
                  {t("services")}
                  <ChevronDown
                    size={24}
                    className={cn(
                      "transition-transform",
                      mobileServicesOpen && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-4"
                    >
                      {serviceNavItems.map((item) => (
                        <Link
                          key={item.id}
                          href={serviceHref(item.id)}
                          onClick={() => setOpen(false)}
                          className="block py-2.5 text-lg text-muted transition hover:text-text"
                        >
                          {t(`serviceItems.${item.id}`)}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {navHrefs.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * (i + 1) }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="display block text-[clamp(1.75rem,6.5vh,2.5rem)] leading-tight text-text/90 transition hover:translate-x-1 hover:text-text"
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3 pt-4"
              >
                <Link href="/contact" onClick={() => setOpen(false)}>
                  <Button size="md">{t("getQuote")}</Button>
                </Link>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <Button size="md" variant="whatsapp">
                    <MessageCircle size={18} />
                    WhatsApp
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
