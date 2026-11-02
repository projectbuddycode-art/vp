"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Mandala({ className }: { className?: string }) {
  const rings = [78, 62, 46, 30, 14];
  return (
    <svg viewBox="0 0 200 200" className={cn("text-gold", className)} aria-hidden>
      <motion.g
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        {rings.map((radius) => (
          <motion.circle
            key={radius}
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            variants={{
              hidden: { pathLength: 0, opacity: 0.2 },
              show: { pathLength: 1, opacity: 0.8 },
            }}
            transition={{ duration: 1.7, ease }}
          />
        ))}
        <motion.rect
          x="28"
          y="28"
          width="144"
          height="144"
          fill="none"
          stroke="#D9C6A0"
          strokeWidth="0.55"
          variants={{
            hidden: { pathLength: 0, opacity: 0.2 },
            show: { pathLength: 1, opacity: 0.75 },
          }}
          transition={{ duration: 1.8, ease }}
        />
        <motion.polygon
          points="100,22 178,100 100,178 22,100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.55"
          variants={{
            hidden: { pathLength: 0, opacity: 0.15 },
            show: { pathLength: 1, opacity: 0.7 },
          }}
          transition={{ duration: 1.9, ease, delay: 0.15 }}
        />
        <motion.path
          d="M100 18 V182 M18 100 H182 M42 42 L158 158 M158 42 L42 158"
          fill="none"
          stroke="#D9C6A0"
          strokeWidth="0.4"
          variants={{
            hidden: { pathLength: 0, opacity: 0.1 },
            show: { pathLength: 1, opacity: 0.55 },
          }}
          transition={{ duration: 2, ease, delay: 0.2 }}
        />
        <circle cx="100" cy="100" r="2.2" fill="#F5F0E6" />
        <text x="100" y="106" textAnchor="middle" fill="#F5F0E6" fontSize="13" className="devanagari akshara-breath">
          ॐ
        </text>
      </motion.g>
    </svg>
  );
}
