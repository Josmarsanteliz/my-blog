"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { PROJECTS, SITE } from "@/lib/data";
import SectionHeader from "./SectionHeader";

export default function Portfolio() {
  return (
    <section id="proyectos" className="bg-stone-50/80 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Portafolio"
          title="Proyectos destacados"
          subtitle="Una muestra del trabajo que he construido. Los espacios en blanco son tuyos: rellénalos con tus proyectos reales."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group overflow-hidden rounded-3xl border border-stone-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5"
            >
              <div
                className={`flex h-44 items-center justify-center bg-gradient-to-br ${project.gradient}`}
              >
                <span className="text-5xl drop-shadow-md transition-transform duration-300 group-hover:scale-110">
                  {project.emoji}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold">
                    {project.title}
                  </h3>
                  <FiArrowUpRight className="text-stone-400 transition-colors group-hover:text-indigo-600" />
                </div>
                <p className="mt-2 text-sm text-stone-500">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 underline-offset-4 hover:underline"
          >
            Ver más en GitHub <FiArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}