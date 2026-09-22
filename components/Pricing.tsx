"use client";

import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { PLANS, SITE } from "@/lib/data";
import SectionHeader from "./SectionHeader";

export default function Pricing() {
  return (
    <section id="precios" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Precios"
          title="Paquetes por proyecto"
          subtitle="Precios claros y sin sorpresas. Elige el paquete que se ajuste a tu idea y empecemos hoy."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-3xl border p-8 transition-all hover:-translate-y-1.5 ${
                plan.featured
                  ? "border-indigo-600 bg-stone-900 text-white shadow-2xl shadow-indigo-900/20"
                  : "border-stone-200 bg-white hover:shadow-xl hover:shadow-stone-900/5"
              }`}
            >
              {plan.featured ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                  Más popular
                </span>
              ) : null}

              <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
              <p
                className={`mt-1 text-sm ${
                  plan.featured ? "text-stone-300" : "text-stone-500"
                }`}
              >
                {plan.description}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold">
                  ${plan.price}
                </span>
                <span
                  className={`text-sm ${
                    plan.featured ? "text-stone-300" : "text-stone-500"
                  }`}
                >
                  / proyecto
                </span>
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <FiCheck
                      className={`mt-0.5 shrink-0 ${
                        plan.featured ? "text-indigo-400" : "text-indigo-600"
                      }`}
                    />
                    <span
                      className={
                        plan.featured ? "text-stone-200" : "text-stone-700"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(
                  `Proyecto ${plan.name} ($${plan.price})`
                )}`}
                className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold transition ${
                  plan.featured
                    ? "bg-indigo-600 text-white hover:bg-indigo-500"
                    : "border border-stone-300 text-stone-800 hover:border-stone-900"
                }`}
              >
                Empezar proyecto
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-stone-500">
          ¿Necesitas algo a medida?{" "}
          <a
            href="#contacto"
            className="font-semibold text-indigo-600 underline-offset-4 hover:underline"
          >
            Cuéntanos tu idea
          </a>
          .
        </p>
      </div>
    </section>
  );
}