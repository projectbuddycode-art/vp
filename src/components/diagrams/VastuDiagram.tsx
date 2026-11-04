"use client";

import { useEffect, useState } from "react";
import { useOnceInView } from "@/components/animations/useOnceInView";
import { cn } from "@/lib/utils";

const directions = [
  { label: "North", x: 180, y: 28 },
  { label: "NE", x: 332, y: 48 },
  { label: "East", x: 348, y: 184 },
  { label: "SE", x: 332, y: 332 },
  { label: "South", x: 180, y: 348 },
  { label: "SW", x: 28, y: 332 },
  { label: "West", x: 12, y: 184 },
  { label: "NW", x: 28, y: 48 },
];

export function VastuDiagram({ className }: { className?: string }) {
  const { ref, seen } = useOnceInView<HTMLDivElement>(0.35);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setComplete(true);
      return;
    }
    const timer = window.setTimeout(() => setComplete(true), 2800);
    return () => window.clearTimeout(timer);
  }, [seen]);

  useEffect(() => {
    if (!complete || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % directions.length), 2400);
    return () => window.clearInterval(timer);
  }, [complete, paused]);

  const cells = Array.from({ length: 81 }, (_, index) => index);

  return (
    <div
      ref={ref}
      className={cn("vastu-diagram relative", seen && "is-drawn", complete && "is-complete", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <svg viewBox="-36 -8 432 384" className="h-auto w-full" role="img" aria-labelledby="vastu-diagram-title vastu-diagram-desc">
        <title id="vastu-diagram-title">Educational Vastu diagram</title>
        <desc id="vastu-diagram-desc">
          A square planning diagram with a marked centre and the four main directions. It explains an idea. It is not an assessment of a property.
        </desc>
        <rect x="40" y="40" width="280" height="280" pathLength={1} className="diagram-line diagram-trace" />
        {cells.map((cell) => {
          const column = cell % 9;
          const row = Math.floor(cell / 9);
          return (
            <rect
              key={cell}
              x={40 + column * (280 / 9)}
              y={40 + row * (280 / 9)}
              width={280 / 9}
              height={280 / 9}
              pathLength={1}
              className="diagram-line diagram-cell"
              style={{ animationDelay: `${(row + column) * 40}ms` }}
            />
          );
        })}
        <rect x="133.3" y="133.3" width="93.4" height="93.4" pathLength={1} className="diagram-line diagram-centre diagram-trace" />
        <circle cx="180" cy="180" r="18" pathLength={1} className="diagram-line diagram-trace" />
        <path d="M180 168v24M168 180h24" pathLength={1} className="diagram-line" />
        <path d="M70 70 L290 290 M290 70 L70 290" pathLength={1} className="diagram-line diagram-trace" />
        {directions.map((direction, index) => (
          <text
            key={direction.label}
            x={direction.x}
            y={direction.y}
            textAnchor={direction.label === "East" ? "end" : direction.label === "West" ? "start" : "middle"}
            className={index === active ? "fill-deep" : "fill-bark/40"}
            style={{ fontSize: 11, letterSpacing: "0.14em" }}
          >
            {direction.label.toUpperCase()}
          </text>
        ))}
      </svg>
      <p className="mt-4 text-center text-xs leading-relaxed text-bark">
        Centre of the plan. An educational drawing, not a reading of your home.
      </p>
    </div>
  );
}
