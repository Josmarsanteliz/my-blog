"use client";

import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import Logo from "./Logo";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const copyright = t.footer.copyright
    .replace("{year}", String(new Date().getFullYear()))
    .replace("{name}", t.site.name);

  return (
    <footer className="border-t border-silver/70 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <Logo className="h-9 w-9" alt="" />
          <p className="text-sm text-charcoal/70">{copyright}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={t.site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-charcoal/60 transition hover:text-paprika"
          >
            <FaLinkedinIn size={18} />
          </a>
          <a
            href={t.site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-charcoal/60 transition hover:text-paprika"
          >
            <FaGithub size={18} />
          </a>
          <a
            href={`mailto:${t.site.email}`}
            className="text-sm font-medium text-charcoal/70 transition hover:text-paprika"
          >
            {t.site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
