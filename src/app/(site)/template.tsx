"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ y: 18 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      <motion.span
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-px origin-left bg-gold"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      {children}
    </motion.div>
  );
}
