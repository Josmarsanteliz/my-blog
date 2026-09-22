import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { SITE } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <p className="text-sm text-stone-500">
          © {new Date().getFullYear()} {SITE.name}. Hecho con Next.js.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-stone-400 transition hover:text-indigo-600"
          >
            <FaLinkedinIn size={18} />
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-stone-400 transition hover:text-indigo-600"
          >
            <FaGithub size={18} />
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="text-sm font-medium text-stone-500 transition hover:text-indigo-600"
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}