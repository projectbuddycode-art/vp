"use client";

import { useState } from "react";
import type { Faq } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section className="bg-[#efe8da] py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Questions"
          title="Common questions."
          text="Short answers about the visit, the fee, and what Vastu guidance can and cannot do."
        />
        <div>
          {faqs.map((faq) => {
            const expanded = open === faq.id;
            return (
              <div key={faq.id} className="border-b border-deep/15">
                <h3>
                  <button
                    type="button"
                    className="vedic-link flex w-full items-center justify-between gap-6 py-5 text-left"
                    aria-expanded={expanded}
                    aria-controls={`faq-${faq.id}`}
                    onClick={() => setOpen(expanded ? null : faq.id)}
                  >
                    <span className="font-serif text-2xl leading-tight sm:text-3xl">{faq.question}</span>
                    <span className="text-gold" aria-hidden>
                      {expanded ? "–" : "+"}
                    </span>
                  </button>
                </h3>
                <div id={`faq-${faq.id}`} className={cn(expanded ? "block" : "hidden", "pb-5 pr-8")}>
                  <p className="text-sm leading-relaxed text-deep/75 sm:text-base">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
