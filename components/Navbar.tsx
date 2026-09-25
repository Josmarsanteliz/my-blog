"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useContactModal } from "./ContactModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useLanguage();
  const { open: openContact } = useContactModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-silver/70 bg-floral/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#inicio"
          className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight"
        >
          <Logo className="h-8 w-8" alt="" />
          Josmar<span className="text-paprika">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {t.nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-charcoal/80 transition-colors hover:text-carbon"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Selector de idioma ES | EN */}
          <button
            type="button"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            aria-label={t.nav.langSwitch}
            className="flex items-center rounded-full border border-silver p-0.5 text-xs font-semibold transition-colors hover:border-carbon"
          >
            <span
              className={`rounded-full px-2.5 py-1 transition-colors ${
                lang === "es" ? "bg-carbon text-floral" : "text-charcoal/60"
              }`}
            >
              ES
            </span>
            <span
              className={`rounded-full px-2.5 py-1 transition-colors ${
                lang === "en" ? "bg-carbon text-floral" : "text-charcoal/60"
              }`}
            >
              EN
            </span>
          </button>

          <button
            type="button"
            onClick={() => openContact()}
            className="hidden rounded-full bg-carbon px-5 py-2.5 text-sm font-semibold text-floral transition-colors hover:bg-paprika hover:text-carbon md:inline-flex"
          >
            {t.nav.cta}
          </button>

          <button
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-silver/60 bg-floral md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {t.nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal hover:bg-silver/30"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openContact();
                  }}
                  className="block w-full rounded-full bg-carbon px-5 py-2.5 text-center text-sm font-semibold text-floral transition-colors hover:bg-paprika hover:text-carbon"
                >
                  {t.nav.cta}
                </button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
