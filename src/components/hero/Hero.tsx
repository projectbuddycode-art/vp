"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Mandala } from "@/components/mandala/Mandala";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images } from "@/lib/images";
import { formatInr } from "@/lib/utils";

export function Hero({
  sanskrit,
  translation,
  fee,
}: {
  sanskrit: string;
  translation: string;
  fee: number;
}) {
  const maskRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    if (maskRef.current) maskRef.current.style.clipPath = "inset(0 0 100% 0)";
    copyRef.current?.querySelectorAll<HTMLElement>("[data-line]").forEach((line) => {
      line.style.opacity = "0";
    });
  }, []);

  useEffect(() => {
    const mask = maskRef.current;
    const copy = copyRef.current;
    if (!mask || !copy) return;
    const lines = copy.querySelectorAll("[data-line]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    void (async () => {
      const gsap = (await import("gsap")).default;
      if (cancelled) return;
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo(mask, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.4 })
        .fromTo(lines, { y: 28, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.75 }, "-=0.65");
      revert = () => timeline.kill();
    })().catch(() => {
      if (maskRef.current) maskRef.current.style.clipPath = "";
      copyRef.current?.querySelectorAll<HTMLElement>("[data-line]").forEach((line) => {
        line.style.opacity = "1";
      });
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <section className="section-stage relative min-h-[100svh] overflow-hidden bg-charcoal text-ivory" data-active="true">
      <div ref={maskRef} className="absolute inset-0">
        <Image src={images.hero.src} alt={images.hero.alt} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/88 via-charcoal/62 to-charcoal/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-charcoal/30" />
      </div>
      <Mandala className="yantra-live pointer-events-none absolute top-24 right-0 hidden w-[min(42vw,560px)] opacity-80 lg:block" />
      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-32 lg:pb-20">
        <div ref={copyRef} className="max-w-4xl">
          <p data-line className="text-[0.72rem] font-semibold tracking-[0.32em] text-sand uppercase">
            Vedic Vastu Consultancy
          </p>
          <h1 data-line className="mt-5 font-serif text-[clamp(2.8rem,6.4vw,6.6rem)] leading-[0.92] font-medium tracking-[-0.035em]">
            Your Space Has a Story.
            <span className="mt-2 block text-sand">Discover What It Is Telling You.</span>
          </h1>
          <p data-line className="mt-6 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg">
            A personalised approach to Vastu Shastra, rooted in inherited knowledge and refined through practical experience.
          </p>
          <div data-line className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="light">
              Book a personal consultation
            </Button>
            <Button href="/approach" variant="lineLight">
              Discover his approach
            </Button>
          </div>
          <p data-line className="mt-10 text-[0.68rem] tracking-[0.18em] text-sand uppercase">
            Personal property visit · {formatInr(fee)}
          </p>
        </div>
      </Container>
      <div className="pointer-events-none absolute bottom-6 left-6 z-10 hidden items-center gap-3 text-[0.62rem] tracking-[0.22em] text-sand uppercase lg:flex">
        <span className="scroll-mark block h-12 w-px bg-sand/70" />
        Scroll
      </div>
      <aside className="relative z-10 border-t border-white/10 bg-charcoal px-6 py-6 text-ivory sm:px-10">
        {sanskrit ? (
          <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-8">
            <p className="devanagari akshara-live text-2xl leading-snug text-sand">{sanskrit}</p>
            {translation ? <p className="max-w-2xl text-sm leading-relaxed text-ivory/75">{translation}</p> : null}
          </div>
        ) : (
          <div className="mx-auto flex max-w-6xl items-end justify-between gap-8">
            <div>
              <p className="text-[0.65rem] tracking-[0.22em] text-sand uppercase">Verse placeholder</p>
              <p className="mt-2 max-w-2xl font-serif text-xl italic text-ivory/90">
                A verified Sanskrit verse, with its English translation, will be placed here by the consultancy.
              </p>
            </div>
            <p className="devanagari akshara-live hidden text-3xl text-sand sm:block" aria-hidden>
              ॐ
            </p>
          </div>
        )}
      </aside>
    </section>
  );
}
