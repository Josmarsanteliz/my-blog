"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SITE, STATS } from "@/lib/data";

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
      className="font-display text-4xl font-bold text-stone-900 sm:text-5xl"
    >
      0{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="sobre-mi" className="py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            Sobre mí
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Construyo software que ayuda a tu negocio a crecer.
          </h2>
          <p className="mt-6 leading-relaxed text-stone-600">
            Soy {SITE.name}, desarrollador freelance especializado en
            aplicaciones web modernas. Trabajo con clientes de forma remota, de
            principio a fin: entiendo tu idea, diseño la experiencia y
            desarrollo el producto con Next.js, TypeScript y Supabase.
          </p>
          <p className="mt-4 leading-relaxed text-stone-600">
            Mi prioridad es la comunicación clara, las entregas puntuales y un
            software que se sienta rápido y profesional.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contacto"
              className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Trabajemos juntos
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 transition hover:border-stone-900"
            >
              Ver LinkedIn
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 self-center">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl border border-stone-200 bg-white p-8 text-center"
            >
              <Counter to={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm font-medium text-stone-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}