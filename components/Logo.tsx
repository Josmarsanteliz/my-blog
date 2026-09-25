/* eslint-disable @next/next/no-img-element */
type LogoProps = {
  /** "dark" para fondos claros, "light" para fondos oscuros (secciones carbon) */
  variant?: "dark" | "light";
  className?: string;
  alt?: string;
};

/**
 * Marca personal: cuadrado carbón con la "J" en plata,
 * acento paprika y chevron floral. Generada desde el SVG original.
 */
export default function Logo({
  variant = "dark",
  className = "h-8 w-8",
  alt = "Logo de Josmar Santeliz",
}: LogoProps) {
  return (
    <img
      src={variant === "dark" ? "/logo/logo-dark.svg" : "/logo/logo-light.svg"}
      alt={alt}
      width={504}
      height={502}
      className={className}
    />
  );
}
