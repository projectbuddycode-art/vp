import Image from "next/image";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images, resolvePortrait } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/data/public";

export const metadata = pageMetadata({
  title: "About Sanjeev Jain",
  description:
    "Mr. Sanjeev Jain brings a diamond-industry background of precision and an inherited understanding of Vastu Shastra to each property he visits through STHAPATYA.",
  path: "/about",
  image: images.palace.src,
});

export default async function AboutPage() {
  const settings = await getSettings();
  return (
    <>
      <section className="bg-ivory pt-[4.5rem] lg:pt-20">
        <Container className="grid items-end gap-10 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/about", label: "About Sanjeev Jain" }]} />
            <p className="text-[0.72rem] tracking-[0.22em] text-gold uppercase">The person behind STHAPATYA</p>
            <h1 className="mt-4 font-serif text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.98] font-medium tracking-[-0.03em]">
              A Journey Shaped by Precision. Guided by Tradition.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-deep/80 sm:text-lg">
              Mr. Sanjeev Jain is the consultant behind STHAPATYA. He visits each property himself and explains what he finds in plain language.
            </p>
          </div>
          <figure>
            <div className="relative aspect-[3/2] bg-parchment">
              <Image
                src={resolvePortrait(settings.founderPortraitUrl)}
                alt={images.founder.alt}
                fill
                priority
                className="object-cover object-center"
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
            </div>
            <figcaption className="mt-2 text-sm text-bark">Mr. Sanjeev Jain</figcaption>
          </figure>
        </Container>
      </section>
      <section className="bg-white py-16 sm:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <p className="font-serif text-3xl leading-snug italic">Precision in every detail. Respect for every tradition. A thoughtful understanding of every space.</p>
          <div className="space-y-5 text-base leading-relaxed text-deep/80">
            {settings.founderSummary ? (
              settings.founderSummary.split("\n").filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            ) : (
              <>
                <h2 className="font-serif text-3xl text-deep">A professional life in diamonds</h2>
                <p>
                  Mr. Sanjeev Jain comes to this work from a successful professional background in the diamond industry. That work asks for close attention, patience, and a clear judgement of quality. Those habits stay with him when he looks at a building.
                </p>
                <h2 className="font-serif text-3xl text-deep">Tradition, refined in practice</h2>
                <p>
                  Alongside that career, he has a personal connection with traditional Vedic knowledge. His understanding of Vastu Shastra was inherited, and he has continued to refine it by visiting properties himself. The diamond practice and the Vastu practice are two distinct parts of one journey.
                </p>
                <h2 className="font-serif text-3xl text-deep">How a property is approached</h2>
                <p>
                  He does not apply one chart to every building. The entrance, the rooms, the directions, and the way people use the place decide what is discussed. Traditional principles give the language. The property decides the guidance.
                </p>
                <p>
                  A personal visit is ₹10,000. Travel, where it applies, is confirmed separately. Remedies and building work are discussed after the visit, and only when they belong to that property. His philosophy is simple: understand the space before recommending a change.
                </p>
              </>
            )}
            <Button href="/contact">Book a Personal Consultation</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
