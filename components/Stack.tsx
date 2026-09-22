"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiSupabase,
  SiPostgresql,
  SiPrisma,
  SiTailwindcss,
  SiNodedotjs,
} from "react-icons/si";
import { STACK } from "@/lib/data";
import SectionHeader from "./SectionHeader";

const TECH_ICONS: Record<string, IconType> = {
  next: SiNextdotjs,
  react: SiReact,
  typescript: SiTypescript,
  supabase: SiSupabase,
  postgres: SiPostgresql,
  prisma: SiPrisma,
  tailwind: SiTailwindcss,
  node: SiNodedotjs,
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Stack() {
  return (
    <section id="stack" className="bg-stone-50/80 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Tecnologías"
          title="Stack que domino"
          subtitle="Herramientas modernas para construir productos rápidos, seguros y escalables."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.08 }}
          className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {STACK.map((item) => {
            const Icon = TECH_ICONS[item.icon];
            return (
              <motion.div
                key={item.name}
                variants={cardVariants}
                className="group rounded-2xl border border-stone-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-600/5"
              >
                <Icon className="h-8 w-8 text-stone-500 transition-colors group-hover:text-indigo-600" />
                <h3 className="mt-4 font-display font-semibold">{item.name}</h3>
                <p className="mt-1 text-sm text-stone-500">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}