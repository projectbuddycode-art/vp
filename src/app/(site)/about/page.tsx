import Image from "next/image";
import { SanskritLabel } from "@/components/content/SanskritLabel";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images, resolvePortrait } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/data/public";

export const metadata = pageMetadata({
  title: "About Sanjeev Jain",
  description:
    "Mr. Sanjeev Jain is a Vastu Shastra consultant. He worked in the diamond industry and practises from knowledge passed to him, refined by visiting each property himself.",
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
            <SanskritLabel term="परंपरा" reading="Knowledge through tradition" meaning="What was passed on, then checked against real properties." />
            <h1 className="mt-4 font-serif text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.98] font-medium tracking-[-0.03em]">
              Who is Mr. Sanjeev Jain?
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-deep/80 sm:text-lg">
              He is a Vastu Shastra consultant. He visits the property himself and explains what he finds in simple words. He does not use one chart for every building.
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
          <p className="font-serif text-3xl leading-snug italic">Practical guidance, explained in plain language.</p>
          <div className="space-y-5 text-base leading-relaxed text-deep/80">
            {settings.founderSummary ? (
              settings.founderSummary.split("\n").filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            ) : (
              <>
                <p>
                  Mr. Sanjeev Jain has a background in the diamond industry. He practises Vastu from knowledge he inherited, and he has refined that knowledge by studying properties in person.
                </p>
                <p>
                  This page does not add qualifications, awards, or a number of years. Those details will appear only if he chooses to publish them.
                </p>
                <p>
                  People ask him about homes, workplaces, money and work concerns, and the feeling of a living space. A personal visit is ₹10,000. Travel, where it applies, is discussed separately. Remedies are priced on their own after the visit.
                </p>
                <p>
                  He looks for changes a person can actually carry out. Some are small. Building work, when it is really needed, can cost more and should be checked by an engineer or architect.
                </p>
              </>
            )}
            <Button href="/contact">Book a Visit</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
