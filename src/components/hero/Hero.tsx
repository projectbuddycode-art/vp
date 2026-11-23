"use client";

import { useEffect, useRef } from "react";
import { HeroAtmosphere } from "@/components/hero/HeroAtmosphere";
import { HeroBackgroundVideo } from "@/components/hero/HeroBackgroundVideo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useCopy } from "@/components/i18n/LocaleProvider";

export function Hero() {
  const copyRef = useRef<HTMLDivElement>(null);
  const copy = useCopy();

  useEffect(() => {
    const copyBlock = copyRef.current;
    if (!copyBlock) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lines = copyBlock.querySelectorAll("[data-line]");
    const isPhone = window.matchMedia("(max-width: 767px)").matches;
    let cancelled = false;
    let revert: (() => void) | undefined;

    void (async () => {
      const gsap = (await import("gsap")).default;
      if (cancelled) return;
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (isPhone) {
        // Video first, then copy — phone only.
        timeline.fromTo(
          lines,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.55, delay: 0.4 },
        );
      } else {
        // Desktop / laptop entrance unchanged.
        timeline.fromTo(lines, { y: 22 }, { y: 0, stagger: 0.1, duration: 0.7 });
      }

      revert = () => timeline.kill();
    })().catch(() => undefined);

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-charcoal text-ivory">
      <div className="absolute inset-0">
        <HeroBackgroundVideo className="absolute inset-0 h-full w-full" />
        {/* Phone: lighter side wash. md+: exact previous desktop overlays. */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/55 via-charcoal/30 to-transparent md:from-charcoal/82 md:via-charcoal/55 md:to-charcoal/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/88 via-charcoal/35 to-transparent md:from-charcoal/70 md:via-transparent md:to-charcoal/25" />
        <HeroAtmosphere />
      </div>
      <Container className="relative z-10 mt-auto pt-24 pb-10 md:pt-28 md:pb-16 lg:pb-20">
        <div ref={copyRef} className="max-w-3xl">
          <p data-line className="text-sand">
            <span className="font-serif text-[0.78rem] tracking-[0.16em] md:text-[1em]">STHAPATYA</span>
            <span className="mx-2 text-gold">·</span>
            <span className="devanagari text-base md:text-xl">वास्तु · दिशा · संतुलन</span>
          </p>
          <h1
            data-line
            className="mt-3 max-w-4xl font-serif text-[clamp(1.9rem,6.5vw,2.35rem)] leading-[1.08] font-medium tracking-[-0.03em] md:mt-4 md:text-[clamp(2.7rem,5.2vw,5.4rem)] md:leading-[0.96]"
          >
            {copy.hero.title}
          </h1>
          <p data-line className="mt-3 max-w-xl text-sm leading-relaxed text-ivory/88 md:mt-5 md:text-lg">
            {copy.hero.text}
          </p>
          <div data-line className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-8">
            <Button href="/contact" variant="light">
              {copy.bookPersonal}
            </Button>
            <Button href="/approach" variant="lineLight">
              {copy.hero.approach}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
