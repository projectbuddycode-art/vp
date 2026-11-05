import { EightDirections } from "@/components/compass/EightDirections";
import { Methodology } from "@/components/home/Methodology";
import { PageHero } from "@/components/layout/PageHero";
import { SanskritLabel } from "@/components/content/SanskritLabel";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { disclaimer, processSteps } from "@/lib/site";

export const metadata = pageMetadata({
  title: "How a Vastu consultation works",
  description:
    "Mr. Sanjeev Jain listens, visits the property, and then explains practical Vastu guidance. The same solution is not used for every home or office.",
  path: "/approach",
  image: images.geometry.src,
});

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow={<SanskritLabel term="दिशा एवं संतुलन" reading="Directions and balance" meaning="The visit looks at direction, rooms and surroundings. A screen diagram is not the consultation." />}
        title="Every Property Is Different. So Is Its Approach."
        text="Mr. Sanjeev Jain studies the concern, the plan, the directions, and the surroundings before he suggests anything. Two properties do not get the same answer just because the worry sounds similar."
        crumbs={[{ href: "/", label: "Home" }, { href: "/approach", label: "Vastu approach" }]}
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
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <h2 className="max-w-3xl font-serif text-4xl">How the property is studied</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              ["The concern", "The visit starts from the question you actually have, not from a fixed menu."],
              ["The property details", "City, property type, and any drawings are reviewed so the visit is prepared."],
              ["The layout", "Rooms, the centre of the plan, and the path through the building are looked at on site."],
              ["The directions", "North is established as reliably as the plan and the site allow."],
              ["Entrances and rooms", "The door people use, and the rooms tied to the concern, are discussed in plain words."],
              ["The surroundings", "What can be seen around the property is noted. A place he has not visited is not described."],
              ["Possible guidance", "Suggestions are specific to that property. They are not copied from the last visit."],
              ["What a change would mean", "A change of use is distinguished from building work."],
              ["Effort and cost", "The visit is ₹10,000. Travel and remedies are separate. A remedy price is not fixed before the assessment."],
            ].map(([title, text], index) => (
              <li key={title} className="border border-deep/10 p-5">
                <p className="font-serif text-2xl text-gold">0{index + 1}</p>
                <h3 className="mt-2 font-serif text-3xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-deep/75">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
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
