"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Testimonial } from "@/lib/data/public";
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
  const [index, setIndex] = useState(0);
  if (items.length === 0) {
    return (
      <section className="bg-ivory py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Testimonials"
            title="Client words, only with permission."
            text="A name, a place, and a photograph appear here only when the client has agreed. No review on this website is made up."
          />
          <div className="mt-10 border border-dashed border-deep/20 px-6 py-12">
            <p className="max-w-xl font-serif text-3xl leading-tight">Approved client words will be placed here.</p>
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
        <SectionHeading eyebrow="Testimonials" title="Client accounts, published with consent." />
        <div className="mt-10 border border-deep/10 bg-[#efe8da] p-6 sm:p-12">
          <AnimatePresence mode="wait">
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              {item.kind === "video" && embed ? (
                <div className="mb-6 aspect-video">
                  <iframe
                    className="h-full w-full"
                    src={embed}
                    title={item.clientName || "Video testimonial"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : null}
              <blockquote className="font-serif text-3xl leading-snug sm:text-4xl">{item.content}</blockquote>
              <figcaption className="mt-6 text-sm text-deep/70">
                {item.clientName || "Client name withheld"}
                {item.sourceUrl ? (
                  <>
                    {" · "}
                    <a href={item.sourceUrl} className="underline" rel="noreferrer">
                      Source
                    </a>
                  </>
                ) : null}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          {items.length > 1 ? (
            <div className="mt-8 flex gap-3">
              <button type="button" className="border border-deep/20 px-4 py-2 text-[0.68rem] tracking-[0.16em] uppercase" onClick={previous}>
                Previous
              </button>
              <button type="button" className="border border-deep/20 px-4 py-2 text-[0.68rem] tracking-[0.16em] uppercase" onClick={next}>
                Next
              </button>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
