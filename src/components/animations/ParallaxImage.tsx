"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { SiteImage } from "@/lib/images";

export function ParallaxImage({ image, className = "" }: { image: SiteImage; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setEnabled(!motionQuery.matches && !mobileQuery.matches);
    update();
    motionQuery.addEventListener("change", update);
    mobileQuery.addEventListener("change", update);
    return () => {
      motionQuery.removeEventListener("change", update);
      mobileQuery.removeEventListener("change", update);
    };
  }, []);

  return (
    <div ref={ref} className={`relative aspect-[4/5] overflow-hidden bg-deep ${className}`}>
      <motion.div className="absolute inset-x-0 -top-[8%] h-[116%]" style={enabled ? { y } : undefined}>
        <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(min-width: 1024px) 42vw, 100vw" />
      </motion.div>
    </div>
  );
}
