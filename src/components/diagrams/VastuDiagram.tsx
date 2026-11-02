"use client";

import { useEffect, useState } from "react";
import { useOnceInView } from "@/components/animations/useOnceInView";
import { cn } from "@/lib/utils";

const directions = [
  { label: "North", x: 180, y: 28 },
  { label: "East", x: 348, y: 184 },
  { label: "South", x: 180, y: 348 },
  { label: "West", x: 12, y: 184 },
];

export function VastuDiagram({ className }: { className?: string }) {
  const { ref, seen } = useOnceInView<HTMLDivElement>(0.4);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % directions.length), 2800);
    return () => window.clearInterval(timer);
  }, [paused]);

  const cells = Array.from({ length: 81 }, (_, index) => index);

  return (
    <div
      ref={ref}
      className={cn("vastu-diagram relative", seen && "is-drawn", className)}
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
        <rect x="40" y="40" width="280" height="280" className="diagram-line" />
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
              className="diagram-line diagram-cell"
              style={{ animationDelay: `${(row + column) * 40}ms` }}
            />
          );
        })}
        <rect x="133.3" y="133.3" width="93.4" height="93.4" className="diagram-line diagram-centre" />
        <circle cx="180" cy="180" r="18" className="diagram-line" />
        <path d="M180 168v24M168 180h24" className="diagram-line" />
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
