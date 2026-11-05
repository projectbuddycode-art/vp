"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { HeroAtmosphere } from "@/components/hero/HeroAtmosphere";
import { CinematicVideo } from "@/components/video/CinematicVideo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images, resolvePortrait } from "@/lib/images";
import { videos } from "@/lib/videos";

export function Hero({ portraitUrl }: { portraitUrl?: string }) {
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
      <Container className="relative z-10 grid min-h-[100svh] items-end gap-8 pt-28 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-20">
        <div ref={copyRef} className="max-w-3xl">
          <p data-line className="text-sand">
            <span className="font-serif tracking-[0.16em]">STHAPATYA</span>
            <span className="mx-2 text-gold">·</span>
            <span className="devanagari text-xl">वास्तु · दिशा · संतुलन</span>
          </p>
          <h1 data-line className="mt-4 max-w-4xl font-serif text-[clamp(2.7rem,5.2vw,5.4rem)] leading-[0.96] font-medium tracking-[-0.03em]">
            Your Space. Your Life. A More Thoughtful Balance.
          </h1>
          <p data-line className="mt-5 max-w-xl text-base leading-relaxed text-ivory/88 sm:text-lg">
            Every property has its own layout, directions and surroundings. Through STHAPATYA, Mr. Sanjeev Jain offers personal Vastu consultation based on the traditional principles of Vastu Shastra and an individual understanding of each property.
          </p>
          <div data-line className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="light">
              Book a Personal Consultation
            </Button>
            <Button href="/approach" variant="lineLight">
              Discover the STHAPATYA Approach
            </Button>
          </div>
        </div>
        <figure data-line className="w-full max-w-xl justify-self-end border border-ivory/30 bg-parchment p-2">
          <div className="relative aspect-[3/2] bg-parchment">
            <Image
              src={resolvePortrait(portraitUrl)}
              alt={images.founder.alt}
              fill
              priority
              className="object-cover object-center"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
          <figcaption className="px-2 py-2 text-xs text-deep">Mr. Sanjeev Jain. The photograph is shown in full, without a filter over his face.</figcaption>
        </figure>
      </Container>
    </section>
  );
}
