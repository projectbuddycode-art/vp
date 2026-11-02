import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { images } from "@/lib/images";
import type { Service } from "@/lib/site";

export function ServiceView({ service }: { service: Service }) {
  return (
    <>
      <PageHero eyebrow="Expertise" title={service.title} text={service.lead} image={service.image} />
      <section className="bg-ivory py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 text-base leading-relaxed text-deep/80">
            {service.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="border-l-2 border-gold pl-5 text-sm leading-relaxed text-deep">{service.boundary}</div>
            <Button href="/contact">Book a Visit</Button>
          </div>
          <div className="space-y-4">
            {service.points.map((point) => (
              <article key={point.title} className="border border-deep/10 bg-white p-6 transition-colors hover:border-gold">
                <h2 className="font-serif text-3xl">{point.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-deep/75">{point.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-[#efe8da] py-16">
        <Container className="grid items-center gap-8 md:grid-cols-2">
          <div className="relative aspect-[4/3]">
            <Image src={images.geometry.src} alt={images.geometry.alt} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
          <div>
            <h2 className="font-serif text-4xl leading-tight">The assessment remains personal.</h2>
            <p className="mt-4 text-sm leading-relaxed text-deep/75">
              This page describes the kind of work. It does not read a property. The consultation fee covers a one-time personal visit, and any remedy is costed separately.
            </p>
            <div className="mt-6">
              <Button href="/approach" variant="line">
                See the four stages
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
