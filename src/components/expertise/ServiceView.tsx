import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceVideoFeature } from "@/components/video/ServiceVideoFeature";
import { serviceGuides } from "@/lib/content/service-guides";
import { images } from "@/lib/images";
import { serviceFilms } from "@/lib/videos";
import type { Service } from "@/lib/site";
import { siteUrl } from "@/lib/utils";

export function ServiceView({ service }: { service: Service }) {
  const guide = serviceGuides[service.slug];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.lead,
    provider: { "@type": "Person", name: "Sanjeev Jain" },
    url: `${siteUrl()}/expertise/${service.slug}`,
    offers: {
      "@type": "Offer",
      price: "10000",
      priceCurrency: "INR",
      description: "Personal on-site visit. Travel and remedies are separate.",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow={
          guide ? (
            <span className="text-bark">
              <span className="devanagari text-xl">{guide.sanskrit}</span>
              <span className="mx-2 text-gold">·</span>
              <span className="font-serif text-xl italic">{guide.reading}</span>
            </span>
          ) : (
            <span className="font-serif text-xl italic text-bark">Vastu consultation</span>
          )
        }
        title={guide?.headline ?? service.title}
        text={service.lead}
        image={service.image}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/expertise", label: "Services" },
          { href: `/expertise/${service.slug}`, label: service.title },
        ]}
      />
      {service.slug in serviceFilms ? (
        <section className="bg-white py-12 sm:py-16">
          <Container>
            <ServiceVideoFeature
              variant="panel"
              category={service.title}
              title={service.title}
              description={service.lead}
              video={serviceFilms[service.slug as keyof typeof serviceFilms]}
            />
          </Container>
        </section>
      ) : null}
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
      {guide ? (
        <section className="bg-white py-16 sm:py-20">
          <Container className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-4xl">Concerns people bring</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-deep/80">
                {guide.concerns.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h2 className="mt-10 font-serif text-4xl">What to prepare</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-deep/80">
                {guide.prepare.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-4xl">What is studied</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-deep/80">
                {guide.studied.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h2 className="mt-10 font-serif text-4xl">Forms of guidance</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-deep/80">
                {guide.guidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Container>
          <Container className="mt-14">
            <h2 className="font-serif text-4xl">Questions about this consultation</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {guide.faqs.map((faq) => (
                <article key={faq.question} className="border border-deep/10 p-5">
                  <h3 className="font-serif text-2xl">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-deep/75">{faq.answer}</p>
                </article>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/contact">Not sure where to start? Tell us about your property.</Button>
            </div>
          </Container>
        </section>
      ) : null}
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
