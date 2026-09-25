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
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/lib/i18n/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <section id="stack" className="bg-silver/25 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow={t.stack.eyebrow}
          title={t.stack.title}
          subtitle={t.stack.subtitle}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.08 }}
          className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {t.stack.items.map((item) => {
            const Icon = TECH_ICONS[item.icon];
            return (
              <motion.div
                key={item.name}
                variants={cardVariants}
                className="group rounded-2xl border border-silver bg-white p-6 transition-all hover:-translate-y-1 hover:border-paprika/50 hover:shadow-lg hover:shadow-paprika/10"
              >
                <Icon className="h-8 w-8 text-charcoal/70 transition-colors group-hover:text-paprika" />
                <h3 className="mt-4 font-display font-semibold">{item.name}</h3>
                <p className="mt-1 text-sm text-charcoal/70">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
