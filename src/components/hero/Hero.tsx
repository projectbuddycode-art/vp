"use client";

import { useEffect, useRef } from "react";
import { HeroAtmosphere } from "@/components/hero/HeroAtmosphere";
import { CinematicVideo } from "@/components/video/CinematicVideo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { videos } from "@/lib/videos";

export function Hero() {
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const copy = copyRef.current;
    if (!copy) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lines = copy.querySelectorAll("[data-line]");
    let cancelled = false;
    let revert: (() => void) | undefined;

    void (async () => {
      const gsap = (await import("gsap")).default;
      if (cancelled) return;
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline.fromTo(lines, { y: 22 }, { y: 0, stagger: 0.1, duration: 0.7 });
      revert = () => timeline.kill();
    })().catch(() => undefined);

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-charcoal text-ivory">
      <div className="absolute inset-0">
        <CinematicVideo video={videos.hero} autoPlay priority className="absolute inset-0 h-full w-full" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/82 via-charcoal/55 to-charcoal/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/25" />
        <HeroAtmosphere />
      </div>
      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-end pt-28 pb-14 lg:pb-20">
        <div ref={copyRef} className="max-w-3xl">
          <p data-line className="text-sand">
            <span className="devanagari text-xl">वास्तु परिचय</span>
            <span className="mx-2 text-gold">·</span>
            <span className="font-serif text-xl italic">Understanding Vastu</span>
          </p>
          <h1 data-line className="mt-4 max-w-4xl font-serif text-[clamp(2.8rem,5.6vw,5.8rem)] leading-[0.96] font-medium tracking-[-0.03em]">
            Your Space. Your Life. A More Thoughtful Balance.
          </h1>
          <p data-line className="mt-5 max-w-xl text-base leading-relaxed text-ivory/88 sm:text-lg">
            Vastu Shastra is an Indian tradition that looks at the layout, directions and arrangement of a building. Mr. Sanjeev Jain personally studies each property and shares practical guidance based on its unique layout.
          </p>
          <div data-line className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/approach" variant="light">
              Explore Our Approach
            </Button>
            <Button href="/contact" variant="lineLight">
              Book a Personal Visit
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
