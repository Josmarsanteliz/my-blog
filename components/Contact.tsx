"use client";

import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { SITE } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contacto" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-stone-900 px-8 py-16 text-center sm:px-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-600/30 blur-3xl"
          />

          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-balance text-white sm:text-5xl">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-stone-300">
              Escríbeme y conversamos tu idea sin compromiso. Te respondo en
              menos de 24 horas con un presupuesto claro.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500"
              >
                <FiMail />
                {SITE.email}
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-700 text-stone-300 transition hover:border-white hover:text-white"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-700 text-stone-300 transition hover:border-white hover:text-white"
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