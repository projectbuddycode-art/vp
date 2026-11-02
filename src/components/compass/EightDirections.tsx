"use client";

import { useState } from "react";
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
  const [active, setActive] = useState<DirectionKey>("ne");
  const note = directions.find((item) => item.key === active) ?? directions[0];

  return (
    <section className="bg-charcoal py-20 text-ivory sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-[0.72rem] tracking-[0.24em] text-gold uppercase">Directions</p>
          <h2 className="mt-4 font-serif text-4xl leading-none sm:text-6xl">Eight ways of reading a plan.</h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-sand">
            These are the traditional directions a consultant names while standing in a property. Choosing one explains the idea. It does not assess your building.
          </p>
          <div className="relative mx-auto mt-10 hidden aspect-square w-full max-w-[440px] sm:block">
            <div className="absolute inset-[18%] rounded-full border border-gold/40" />
            <div className="absolute inset-[32%] rounded-full border border-sand/30" />
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
