"use client";

import { useEffect, useState } from "react";
import { directions, type DirectionKey } from "@/lib/directions";
import { cn } from "@/lib/utils";

const positions: Record<DirectionKey, string> = {
  n: "left-1/2 top-0 -translate-x-1/2",
  ne: "top-[8%] right-[8%]",
  e: "top-1/2 right-0 -translate-y-1/2",
  se: "right-[8%] bottom-[8%]",
  s: "bottom-0 left-1/2 -translate-x-1/2",
  sw: "bottom-[8%] left-[8%]",
  w: "top-1/2 left-0 -translate-y-1/2",
  nw: "top-[8%] left-[8%]",
};

export function EightDirections() {
  const [active, setActive] = useState<DirectionKey>("n");
  const [paused, setPaused] = useState(false);
  const [drawn, setDrawn] = useState(false);
  const [complete, setComplete] = useState(false);
  const note = directions.find((item) => item.key === active) ?? directions[0];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      setComplete(true);
      return;
    }
    const frame = window.requestAnimationFrame(() => setDrawn(true));
    const done = window.setTimeout(() => setComplete(true), 2400);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(done);
    };
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActive((current) => {
        const index = directions.findIndex((item) => item.key === current);
        return directions[(index + 1) % directions.length]?.key ?? "n";
      });
    }, 2600);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section className="bg-charcoal py-20 text-ivory sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-[0.72rem] tracking-[0.24em] text-gold uppercase">Directions</p>
          <h2 className="mt-4 font-serif text-4xl leading-none sm:text-6xl">Eight ways of reading a plan.</h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-sand">
            These are the traditional directions a consultant names while standing in a property. Choosing one explains the idea. It does not assess your building.
          </p>
          <div
            className="relative mx-auto mt-10 hidden aspect-square w-full max-w-[440px] sm:block"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <svg viewBox="0 0 200 200" className={cn("absolute inset-[12%] h-auto w-[76%] text-sand", drawn && "is-drawn", complete && "is-complete")} aria-hidden>
              <circle cx="100" cy="100" r="78" pathLength={1} className="direction-line direction-trace" />
              <circle cx="100" cy="100" r="52" pathLength={1} className="direction-line" />
              <path d="M100 22 V178 M22 100 H178 M45 45 L155 155 M155 45 L45 155" pathLength={1} className="direction-line direction-trace" />
            </svg>
            <p className="devanagari akshara-breath absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-sand">ॐ</p>
            {directions.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActive(item.key)}
                aria-pressed={active === item.key}
                className={cn(
                  "absolute px-2 py-1 text-center transition",
                  positions[item.key],
                  active === item.key ? "text-ivory" : "text-sand/70 hover:text-sand",
                )}
              >
                <span className="devanagari block text-lg leading-none">{item.sanskrit}</span>
                <span className="mt-1 block text-[0.58rem] tracking-[0.16em] uppercase">{item.name}</span>
              </button>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2 sm:hidden">
            {directions.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActive(item.key)}
                aria-pressed={active === item.key}
                className={cn(
                  "border px-3 py-2 text-[0.68rem] tracking-[0.14em] uppercase",
                  active === item.key ? "border-gold text-ivory" : "border-white/15 text-sand",
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <article className="border border-white/10 bg-deep p-8 sm:p-12">
          <p className="devanagari text-4xl text-sand">{note.sanskrit}</p>
          <h3 className="mt-4 font-serif text-4xl">{note.name}</h3>
          <p className="mt-5 text-base leading-relaxed text-sand">{note.text}</p>
        </article>
      </div>
    </section>
  );
}
