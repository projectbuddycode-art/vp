"use client";

import type { Faq } from "@/lib/site";
import { useCopy, useLocale } from "@/components/i18n/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { localizeFaqs } from "@/lib/i18n/faq-bodies";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  const copy = useCopy();
  const locale = useLocale();
  const items = localizeFaqs(faqs, locale);
  return (
    <section className="bg-[#efe8da] py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow={copy.home.questionsEyebrow} title={copy.home.questionsTitle} text={copy.home.questionsText} />
        <div>
          {items.map((faq) => (
            <details key={faq.id} className="border-b border-deep/15 py-4" {...(faq.sortOrder === 1 ? { open: true } : {})}>
              <summary className="cursor-pointer font-serif text-2xl leading-tight marker:text-gold sm:text-3xl">{faq.question}</summary>
              <p className="pt-3 pr-4 text-sm leading-relaxed text-deep/75 sm:text-base">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
