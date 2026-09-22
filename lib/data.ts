// ============================================================
// Contenido centralizado de la landing.
// Edita aquí: nombre, email, redes, precios, stack, proyectos…
// ============================================================

export const SITE = {
  name: "Josmar Santeliz",
  role: "Desarrollador de Software Freelance",
  email: "josmarsanteliz@gmail.com",
  linkedin: "https://www.linkedin.com/in/josmar-antonio-santeliz-gonzalez-126365246/",
  github: "https://github.com/Josmarsanteliz",
};

export const HERO_WORDS = [
  "Landings rápidas",
  "Webs corporativas",
  "Apps full-stack",
  "E-commerce",
];

export const HERO_PITCH =
  "Desarrollo landings, webs corporativas y aplicaciones full-stack con Next.js, TypeScript y Supabase. Enfocado en entregar rápido, con diseño cuidado y resultados reales.";

export const STACK = [
  { name: "Next.js", description: "React con SSR y máximo rendimiento", icon: "next" },
  { name: "React", description: "Interfaces modernas y reactivas", icon: "react" },
  { name: "TypeScript", description: "Código seguro y escalable", icon: "typescript" },
  { name: "Supabase", description: "Backend y base de datos en la nube", icon: "supabase" },
  { name: "PostgreSQL", description: "Base de datos relacional", icon: "postgres" },
  { name: "Prisma", description: "ORM tipado y productivo", icon: "prisma" },
  { name: "Tailwind CSS", description: "Diseño rápido y consistente", icon: "tailwind" },
  { name: "Node.js", description: "APIs y servicios backend", icon: "node" },
];

export const PLANS = [
  {
    name: "Básico",
    price: 100,
    description: "Ideal para lanzar rápido tu presencia online.",
    features: [
      "Landing page de 1 página",
      "Diseño responsive",
      "Formulario de contacto",
      "Animaciones suaves",
      "Entrega en 3-5 días",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: 170,
    description: "La mejor opción para negocios en crecimiento.",
    features: [
      "Web de 3-5 secciones",
      "Todo lo del plan Básico",
      "SEO básico optimizado",
      "Google Analytics",
      "2 rondas de revisiones",
      "Entrega en 1-2 semanas",
    ],
    featured: true,
  },
  {
    name: "Full-stack",
    price: 250,
    description: "Aplicaciones completas con backend y datos reales.",
    features: [
      "App con backend y base de datos",
      "Autenticación de usuarios",
      "Panel de administración",
      "API e integraciones",
      "3 rondas de revisiones",
      "Soporte 15 días post-entrega",
    ],
    featured: false,
  },
];

export const PROJECTS = [
  {
    title: "Proyecto 01",
    description:
      "Reserva este espacio para mostrar tu próximo proyecto destacado. Reemplázalo por el trabajo que quieras exhibir.",
    tags: ["Next.js", "TypeScript", "Supabase"],
    link: SITE.github,
    gradient: "from-indigo-500 to-violet-600",
    emoji: "💻",
  },
  {
    title: "Proyecto 02",
    description:
      "Agrega una captura, una descripción corta y el enlace al proyecto real cuando lo tengas listo.",
    tags: ["React", "Tailwind CSS"],
    link: SITE.github,
    gradient: "from-emerald-500 to-teal-600",
    emoji: "🚀",
  },
  {
    title: "Proyecto 03",
    description:
      "Cuenta qué problema resolviste y qué tecnologías usaste para llegar al resultado.",
    tags: ["Node.js", "PostgreSQL"],
    link: SITE.github,
    gradient: "from-amber-500 to-orange-600",
    emoji: "⚙️",
  },
];

export const STATS = [
  { value: 15, suffix: "+", label: "Proyectos entregados" },
  { value: 2, suffix: "+", label: "Años de experiencia" },
  { value: 10, suffix: "+", label: "Clientes satisfechos" },
  { value: 8, suffix: "+", label: "Tecnologías dominadas" },
];

export const FAQS = [
  {
    question: "¿Cuánto tiempo tarda la entrega?",
    answer:
      "Depende del paquete: una landing básica se entrega en 3-5 días, mientras que un proyecto full-stack puede tomar 2-4 semanas. Siempre acordamos fechas claras antes de empezar.",
  },
  {
    question: "¿Cómo funciona el pago?",
    answer:
      "Solicito el 50% por adelantado para reservar tu lugar y el 50% restante al entregar el proyecto. Acepto transferencia, PayPal o Zinli, según tu ubicación.",
  },
  {
    question: "¿Ofreces soporte después de la entrega?",
    answer:
      "Sí. Cada paquete incluye un período de soporte y correcciones menores. Para cambios mayores podemos acordar una tarifa de mantenimiento mensual.",
  },
  {
    question: "¿Qué necesito para empezar mi proyecto?",
    answer:
      "Solo descríbeme tu idea: objetivos, ejemplos de webs que te gusten y el contenido básico. Yo me encargo del diseño, el desarrollo y el despliegue.",
  },
  {
    question: "¿Trabajas de forma remota?",
    answer:
      "Sí, 100% remoto. Ya he trabajado con clientes de varios países y coordino por correo, WhatsApp o videollamada.",
  },
  {
    question: "¿Puedo pedir cambios al plan elegido?",
    answer:
      "Claro. Conversamos tu caso y armamos un paquete a medida. Los precios son de referencia: el presupuesto final depende del alcance.",
  },
];