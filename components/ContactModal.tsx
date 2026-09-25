"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { FaWhatsapp, FaRegPaperPlane } from "react-icons/fa";
import Logo from "./Logo";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// ============================================================
// Contexto: permite abrir el modal desde Navbar, Pricing y
// Contact sin prop-drilling. El modal se monta una sola vez
// en layout.tsx (dentro del provider).
// ============================================================

export type ContactTarget = {
  group: "web" | "software";
  plan?: { name: string; price: number };
};

type ContactModalContextValue = {
  isOpen: boolean;
  open: (target?: ContactTarget) => void;
  close: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return ctx;
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<ContactTarget | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((next?: ContactTarget) => {
    setTarget(next ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ isOpen, open, close }}>
      {children}
      <ContactModal isOpen={isOpen} target={target} onClose={close} />
    </ContactModalContext.Provider>
  );
}

// ============================================================
// Modal
// ============================================================

type ContactModalProps = {
  isOpen: boolean;
  target: ContactTarget | null;
  onClose: () => void;
};

function ContactModal({ isOpen, target, onClose }: ContactModalProps) {
  return (
    <AnimatePresence>
      {/* Al cerrarse se desmonta, lo que reinicia formulario y elección */}
      {isOpen ? (
        <ContactModalBody key="contact-modal" target={target} onClose={onClose} />
      ) : null}
    </AnimatePresence>
  );
}

function ContactModalBody({
  target,
  onClose,
}: {
  target: ContactTarget | null;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const [group, setGroup] = useState<"web" | "software">(target?.group ?? "web");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  // Cerrar con Escape + bloquear scroll del fondo
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // El plan solo aplica si la elección actual es la del grupo de origen
  const activePlan = target?.plan && target.group === group ? target.plan : null;

  // Mensaje de WhatsApp según la elección
  const waTemplate = activePlan
    ? group === "web"
      ? t.modal.waWebPlan
      : t.modal.waSoftwarePlan
    : group === "web"
      ? t.modal.waWeb
      : t.modal.waSoftware;
  const waMessage = activePlan
    ? waTemplate
        .replace("{plan}", activePlan.name)
        .replace("{price}", `$${activePlan.price}`)
    : waTemplate;
  const waHref = `https://wa.me/${t.site.whatsapp}?text=${encodeURIComponent(
    waMessage
  )}`;

  const interestLabel =
    group === "web" ? t.modal.interestWeb : t.modal.interestSoftware;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nombre,
          correo,
          mensaje,
          interes: activePlan
            ? `${interestLabel} — ${t.modal.planLabel}: ${activePlan.name} ($${activePlan.price})`
            : interestLabel,
        }),
      });
      if (!res.ok) throw new Error("Formspree error");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-carbon/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={t.modal.title}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-silver bg-floral p-8 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.modal.close}
          className="absolute right-5 top-5 rounded-full border border-silver bg-white p-2 text-charcoal/70 transition hover:border-carbon hover:text-carbon"
        >
          <FiX size={16} />
        </button>

        <Logo className="h-14 w-14 rounded-2xl shadow-lg shadow-carbon/15" alt="" />

        <h2 className="mt-5 font-display text-2xl font-bold">{t.modal.title}</h2>
        <p className="mt-2 text-sm text-charcoal/75">{t.modal.subtitle}</p>

        {/* Elección */}
        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-paprika-deep">
          {t.modal.interestLabel}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setGroup("web")}
            aria-pressed={group === "web"}
            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
              group === "web"
                ? "border-paprika bg-paprika/10 text-carbon"
                : "border-silver bg-white text-charcoal/70 hover:border-carbon/40"
            }`}
          >
            {t.modal.interestWeb}
          </button>
          <button
            type="button"
            onClick={() => setGroup("software")}
            aria-pressed={group === "software"}
            className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
              group === "software"
                ? "border-paprika bg-paprika/10 text-carbon"
                : "border-silver bg-white text-charcoal/70 hover:border-carbon/40"
            }`}
          >
            {t.modal.interestSoftware}
          </button>
        </div>

        {activePlan ? (
          <p className="mt-3 inline-flex rounded-full bg-carbon px-4 py-1.5 text-xs font-semibold text-floral">
            {t.modal.planLabel}: {activePlan.name} (${activePlan.price})
          </p>
        ) : null}

        {/* Vía 1 — WhatsApp */}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-paprika px-6 py-3.5 text-sm font-semibold text-carbon shadow-lg shadow-paprika/25 transition hover:bg-paprika-light"
        >
          <FaWhatsapp size={18} />
          {t.modal.whatsappLabel}
        </a>

        <div className="my-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-silver" />
          <span className="text-xs font-medium uppercase tracking-widest text-charcoal/55">
            {t.modal.orLabel}
          </span>
          <span className="h-px flex-1 bg-silver" />
        </div>

        {/* Vía 2 — Formulario (Formspree → Gmail) */}
        {status === "success" ? (
          <div className="rounded-2xl border border-paprika/50 bg-paprika/10 p-6 text-center">
            <p className="font-semibold text-carbon">{t.modal.form.success}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3">
            <input
              required
              type="text"
              autoComplete="name"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              aria-label={t.modal.form.name}
              placeholder={t.modal.form.namePlaceholder}
              className="w-full rounded-xl border border-silver bg-white px-4 py-3 text-sm text-carbon placeholder:text-charcoal/45 focus:border-paprika focus:outline-none"
            />
            <input
              required
              type="email"
              autoComplete="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              aria-label={t.modal.form.email}
              placeholder={t.modal.form.emailPlaceholder}
              className="w-full rounded-xl border border-silver bg-white px-4 py-3 text-sm text-carbon placeholder:text-charcoal/45 focus:border-paprika focus:outline-none"
            />
            <textarea
              required
              rows={4}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              aria-label={t.modal.form.message}
              placeholder={t.modal.form.messagePlaceholder}
              className="w-full resize-none rounded-xl border border-silver bg-white px-4 py-3 text-sm text-carbon placeholder:text-charcoal/45 focus:border-paprika focus:outline-none"
            />

            {status === "error" ? (
              <p className="text-sm font-medium text-paprika-deep">
                {t.modal.form.error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-carbon px-6 py-3.5 text-sm font-semibold text-floral transition hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaRegPaperPlane size={15} />
              {status === "sending" ? t.modal.form.sending : t.modal.form.submit}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
