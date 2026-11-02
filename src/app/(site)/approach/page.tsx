import { EightDirections } from "@/components/compass/EightDirections";
import { Methodology } from "@/components/home/Methodology";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { disclaimer, processSteps } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Our Approach",
  description: "How a personal Vastu consultation proceeds, from the first conversation to practical implementation guidance.",
  path: "/approach",
  image: images.geometry.src,
});

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Vastu approach"
        title="Every property is looked at on its own."
        text="Mr. Sanjeev Jain listens, visits the property, and then suggests practical guidance. A chart on a screen is not a consultation."
        image={images.geometry}
      />
      <section className="bg-ivory py-16 sm:py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          {processSteps.map((step) => (
            <article key={step.number} className="border border-deep/10 p-6">
              <p className="text-[0.68rem] tracking-[0.18em] text-gold uppercase">{step.number}</p>
              <h2 className="mt-2 font-serif text-4xl">{step.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-deep/75">{step.text}</p>
            </article>
          ))}
        </Container>
      </section>
      <EightDirections />
      <Methodology />
      <section className="bg-ivory py-16">
        <Container className="max-w-3xl space-y-4 text-base leading-relaxed text-deep/80">
          <h2 className="font-serif text-4xl text-deep">What the consultation is for</h2>
          <p>
            You leave with an account of the areas that asked for attention and with suggestions for that property. Implementation guidance explains how those suggestions can be carried out. Building work remains the responsibility of the people qualified to design and construct it.
          </p>
          <p>{disclaimer}</p>
          <Button href="/contact">Request your consultation</Button>
        </Container>
      </section>
    </>
  );
}
