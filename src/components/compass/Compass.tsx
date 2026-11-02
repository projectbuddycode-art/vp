"use client";

import { motion } from "framer-motion";

const rotation: Record<"N" | "E" | "S" | "W", number> = {
  N: 0,
  E: 90,
  S: 180,
  W: 270,
};

export function Compass({
  active,
}: {
  active: "N" | "E" | "S" | "W";
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px]">
      <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label="Directional diagram for the consultation sequence">
        <circle cx="100" cy="100" r="78" fill="none" stroke="#B68B50" strokeWidth="0.7" />
        <circle cx="100" cy="100" r="54" fill="none" stroke="#D9C6A0" strokeWidth="0.5" />
        <path d="M100 22 V178 M22 100 H178" stroke="#D9C6A0" strokeWidth="0.45" />
        <text x="100" y="38" textAnchor="middle" fill="#F5F0E6" fontSize="8" className="devanagari">
          उत्तर
        </text>
        <text x="158" y="104" textAnchor="middle" fill="#F5F0E6" fontSize="8" className="devanagari">
          पूर्व
        </text>
        <text x="100" y="170" textAnchor="middle" fill="#F5F0E6" fontSize="8" className="devanagari">
          दक्षिण
        </text>
        <text x="42" y="104" textAnchor="middle" fill="#F5F0E6" fontSize="7" className="devanagari">
          पश्चिम
        </text>
      </svg>
      <motion.div
        className="absolute left-1/2 top-1/2 h-[42%] w-px origin-bottom bg-gold"
        style={{ translateX: "-50%", translateY: "-100%" }}
        animate={{ rotate: rotation[active] }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="absolute -left-[3px] -top-1 h-2 w-2 rounded-full bg-ivory" />
      </motion.div>
    </div>
  );
}
