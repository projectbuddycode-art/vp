"use client";

import { useEffect, useRef } from "react";

export function GoldLine({ className = "" }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = "0";
      return;
    }

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    let cancelled = false;
    let revert: (() => void) | undefined;

    void (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const tween = gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: path,
          start: "top 80%",
          once: true,
        },
      });
      revert = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <svg className={className} viewBox="0 0 640 12" fill="none" aria-hidden>
      <path
        ref={pathRef}
        d="M1 6 H639"
        stroke="#B68B50"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
