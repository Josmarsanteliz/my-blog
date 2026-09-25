"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const duration = 1200;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (ref.current) {
        ref.current.textContent = `${Math.round(eased * to)}${suffix}`;
      }
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, suffix]);

  return (
    <span
      ref={ref}
      className="font-display text-4xl font-bold text-carbon sm:text-5xl"
    >
      0{suffix}
    </span>
  );
}

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="sobre-mi" className="py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-paprika-deep">
            {t.about.eyebrow}
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {t.about.heading}
          </h2>
          <p className="mt-6 leading-relaxed text-charcoal/80">
            {t.about.p1.replace("{name}", t.site.name)}
          </p>
          <p className="mt-4 leading-relaxed text-charcoal/80">{t.about.p2}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contacto"
              className="rounded-full bg-paprika px-6 py-3 text-sm font-semibold text-carbon transition hover:bg-paprika-light"
            >
              {t.about.ctaPrimary}
            </a>
            <a
              href={t.site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-silver px-6 py-3 text-sm font-semibold text-carbon transition hover:border-carbon"
            >
              {t.about.ctaSecondary}
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 self-center">
          {t.about.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl border border-silver bg-white p-8 text-center"
            >
              <Counter to={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm font-medium text-charcoal/70">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
