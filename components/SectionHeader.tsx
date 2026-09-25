"use client";

import { motion } from "framer-motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-paprika-deep">
        {eyebrow}
      </span>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base text-charcoal/75 sm:text-lg">{subtitle}</p>
      ) : null}
    </motion.div>
  );
}