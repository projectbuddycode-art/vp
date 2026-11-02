"use client";

import { useState } from "react";
import { Compass } from "@/components/compass/Compass";
import { GoldLine } from "@/components/animations/GoldLine";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/site";

const directionMark = { N: "उत्तर", E: "पूर्व", S: "दक्षिण", W: "पश्चिम" } as const;
import { cn } from "@/lib/utils";

export function Methodology() {
  const [active, setActive] = useState(0);
  const step = processSteps[active];

  return (
    <section className="dark-panel py-20 text-ivory sm:py-28">
      <Container>
        <SectionHeading
          light
          eyebrow="Methodology"
          title="No Two Properties Are the Same."
          text="Four stages, carried out by the consultant. The diagram explains the sequence. It does not assess a property."
        />
        <GoldLine className="mt-8 h-3 w-full max-w-xl" />
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            {processSteps.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.number}
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "w-full border px-5 py-5 text-left transition",
                    selected ? "border-gold bg-white/5" : "border-white/10 hover:border-sand/50",
                  )}
                  aria-pressed={selected}
                >
                  <p className="text-[0.68rem] tracking-[0.2em] text-sand uppercase">
                    {item.number} — {item.title}
                  </p>
                  <p className="mt-2 font-serif text-3xl">{item.title}</p>
                  {selected ? <p className="devanagari akshara-breath mt-2 text-2xl text-ivory">{directionMark[item.direction]}</p> : null}
                  {selected ? <p className="mt-3 max-w-xl text-sm leading-relaxed text-sand">{item.text}</p> : null}
                </button>
              );
            })}
          </div>
          <div>
            <Compass active={step.direction} />
            <p className="mt-4 text-center text-[0.68rem] tracking-[0.18em] text-sand uppercase">
              Stage marker · {step.direction} · {step.title}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
