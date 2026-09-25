"use client";

import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useContactModal } from "./ContactModal";

export default function Contact() {
  const { t } = useLanguage();
  const { open: openContact } = useContactModal();

  return (
    <section id="contacto" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-carbon px-8 py-16 text-center sm:px-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-paprika/30 blur-3xl"
          />

          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-balance text-floral sm:text-5xl">
              {t.contact.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-silver">{t.contact.text}</p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openContact()}
                className="inline-flex items-center gap-2 rounded-full bg-paprika px-7 py-3.5 text-sm font-semibold text-carbon shadow-lg shadow-paprika/30 transition hover:bg-paprika-light"
              >
                <FiMail />
                {t.site.email}
              </button>
              <button
                type="button"
                onClick={() => openContact()}
                aria-label={t.modal.title}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-silver/40 text-silver transition hover:border-floral hover:text-floral"
              >
                <FaLinkedinIn size={18} />
              </button>
              <a
                href={t.site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-silver/40 text-silver transition hover:border-floral hover:text-floral"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
