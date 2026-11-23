"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Testimonial } from "@/lib/data/public";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

function embedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const copy = useCopy();
  const [index, setIndex] = useState(0);
  if (items.length === 0) {
    return (
      <section className="bg-ivory py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={copy.pages.testimonials.eyebrow}
            title={copy.pages.testimonials.emptyTitle}
            text={copy.pages.testimonials.emptyText}
          />
          <div className="mt-10 border border-deep/10 bg-[#efe8da] px-6 py-14 sm:px-10">
            <p className="max-w-xl font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.15] text-deep">
              {copy.pages.testimonials.sectionEmpty}
            </p>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-deep/65">
              No fabricated reviews are shown here. Approved words will appear after a client has consented to
              publication.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  const item = items[index];
  const embed = item.videoUrl ? embedUrl(item.videoUrl) : null;
  const previous = () => setIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  const next = () => setIndex((current) => (current + 1) % items.length);

  return (
    <section className="bg-ivory py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={copy.pages.testimonials.eyebrow} title={copy.pages.testimonials.sectionTitle} />
        <div className="mt-10 border border-deep/10 bg-[#efe8da] p-6 sm:p-12">
          <AnimatePresence mode="wait">
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {item.kind === "video" && embed ? (
                <div className="mb-6 aspect-video overflow-hidden">
                  <iframe
                    className="h-full w-full"
                    src={embed}
                    title={item.clientName || "Video review"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : null}
              {item.rating ? (
                <p
                  className="mb-5 text-[0.78rem] tracking-[0.2em] text-gold"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  {"★".repeat(Math.max(0, Math.min(5, item.rating)))}
                  <span className="text-deep/25">{"☆".repeat(Math.max(0, 5 - Math.min(5, item.rating)))}</span>
                </p>
              ) : null}
              <blockquote className="font-serif text-[clamp(1.7rem,3.2vw,2.75rem)] leading-[1.2] tracking-[-0.02em]">
                {item.content}
              </blockquote>
              {item.experienceText ? (
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-deep/70 sm:text-base">{item.experienceText}</p>
              ) : null}
              <figcaption className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-deep/70">
                <span className="font-medium text-deep">{item.clientName || "Client name withheld"}</span>
                {item.sourceUrl ? (
                  <a href={item.sourceUrl} className="underline underline-offset-4" rel="noreferrer">
                    Source
                  </a>
                ) : null}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          {items.length > 1 ? (
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="border border-deep/20 px-4 py-2.5 text-[0.68rem] tracking-[0.16em] uppercase transition-colors hover:border-deep/40"
                onClick={previous}
              >
                Previous
              </button>
              <button
                type="button"
                className="border border-deep/20 px-4 py-2.5 text-[0.68rem] tracking-[0.16em] uppercase transition-colors hover:border-deep/40"
                onClick={next}
              >
                Next
              </button>
              <p className="ml-auto text-[0.68rem] tracking-[0.16em] text-deep/50 uppercase">
                {index + 1} / {items.length}
              </p>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
