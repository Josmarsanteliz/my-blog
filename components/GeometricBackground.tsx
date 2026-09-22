"use client";

import { motion } from "framer-motion";

type ShapeType =
  | "triangle"
  | "hexagon"
  | "circle"
  | "double-circle"
  | "diamond"
  | "plus"
  | "square";

function ShapeIcon({ type }: { type: ShapeType }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "triangle":
      return (
        <svg {...common}>
          <path d="M24 6 44 41H4Z" />
        </svg>
      );
    case "hexagon":
      return (
        <svg {...common}>
          <path d="M24 3 42 13.5v21L24 45 6 34.5v-21Z" />
        </svg>
      );
    case "circle":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="19" />
        </svg>
      );
    case "double-circle":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="19" />
          <circle cx="24" cy="24" r="8" />
        </svg>
      );
    case "diamond":
      return (
        <svg {...common}>
          <path d="M24 4 44 24 24 44 4 24Z" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M24 8v32M8 24h32" />
        </svg>
      );
    case "square":
      return (
        <svg {...common}>
          <rect x="9" y="9" width="30" height="30" rx="3" />
        </svg>
      );
  }
}

type Shape = {
  type: ShapeType;
  left: string;
  top: string;
  size: number;
  color: string;
  float: number;
  spin: number;
  delay: number;
};

// Figuras distribuidas por el viewport. Flotan y rotan en bucle infinito.
const SHAPES: Shape[] = [
  { type: "hexagon", left: "6%", top: "16%", size: 52, color: "text-indigo-400/30", float: 18, spin: 60, delay: 0 },
  { type: "triangle", left: "88%", top: "12%", size: 40, color: "text-violet-400/30", float: 22, spin: 70, delay: 1.2 },
  { type: "square", left: "12%", top: "78%", size: 36, color: "text-teal-400/30", float: 20, spin: 50, delay: 0.6 },
  { type: "circle", left: "80%", top: "82%", size: 60, color: "text-amber-400/25", float: 24, spin: 80, delay: 2 },
  { type: "plus", left: "65%", top: "6%", size: 26, color: "text-indigo-500/25", float: 16, spin: 60, delay: 0.3 },
  { type: "diamond", left: "24%", top: "42%", size: 22, color: "text-fuchsia-400/25", float: 26, spin: 55, delay: 1.5 },
  { type: "double-circle", left: "92%", top: "46%", size: 30, color: "text-sky-400/25", float: 19, spin: 65, delay: 0.9 },
];

export default function GeometricBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {SHAPES.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: shape.left,
            top: shape.top,
            width: shape.size,
            height: shape.size,
          }}
          animate={{ y: [0, -16, 0] }}
          transition={{
            duration: shape.float,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: shape.spin,
              repeat: Infinity,
              ease: "linear",
            }}
            className={shape.color}
          >
            <ShapeIcon type={shape.type} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}