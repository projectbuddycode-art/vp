"use client";

import { useOnceInView } from "@/components/animations/useOnceInView";
import { Container } from "@/components/ui/Container";
import { processSteps } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Journey() {
  const { ref, seen } = useOnceInView<HTMLElement>(0.3);

  return (
    <section ref={ref} className={cn("journey bg-ivory py-20 sm:py-28", seen && "is-in")}>
      <Container>
        <p className="font-serif text-xl italic text-bark">How a visit works</p>
        <h2 className="mt-3 max-w-3xl font-serif text-[clamp(2.4rem,4.5vw,4.4rem)] leading-[0.98] font-medium tracking-[-0.03em]">
          A personal visit, in four clear steps.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-deep/75 sm:text-lg">
          Mr. Sanjeev Jain listens first. He then looks at the property himself before suggesting anything.
        </p>
        <div className="relative mt-14">
          <div className="journey-line absolute top-5 right-0 left-0 hidden h-px bg-gold lg:block" />
          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step) => (
              <li key={step.number} className="journey-step">
                <p className="font-serif text-3xl text-gold">{step.number}</p>
                <h3 className="mt-4 font-serif text-3xl leading-tight">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-deep/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
