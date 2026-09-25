"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { es } from "./es";
import { en } from "./en";
import type { Dictionary, Language } from "./types";

type LanguageContextValue = {
  lang: Language;
  t: Dictionary;
  setLang: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const DICTIONARIES: Record<Language, Dictionary> = { es, en };

function isLanguage(value: string | null): value is Language {
  return value === "es" || value === "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // El servidor siempre renderiza en "es"; la detección real
  // (localStorage → idioma del navegador → es) ocurre tras
  // la hidratación para no provocar errores de React.
  const [lang, setLangState] = useState<Language>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang");
    const initial: Language = isLanguage(stored)
      ? stored
      : window.navigator.language.toLowerCase().startsWith("en")
        ? "en"
        : "es";
    // setTimeout: la detección ocurre tras la hidratación
    // (evita el lint react-hooks/set-state-in-effect)
    const timer = setTimeout(() => setLangState(initial), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Language) => {
    setLangState(next);
    window.localStorage.setItem("lang", next);
  };

  return (
    <LanguageContext.Provider value={{ lang, t: DICTIONARIES[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
