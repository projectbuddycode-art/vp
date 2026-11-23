import { SanskritLabel } from "@/components/content/SanskritLabel";
import { SanskritMantra } from "@/components/content/SanskritMantra";
import { FiveElements } from "@/components/diagrams/FiveElements";
import { VastuDiagram } from "@/components/diagrams/VastuDiagram";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CinematicVideo } from "@/components/video/CinematicVideo";
import { pageMetadata } from "@/lib/seo";
import { processSteps } from "@/lib/site";
import { verses } from "@/lib/verses";
import { videos } from "@/lib/videos";

export const metadata = pageMetadata({
  title: "Understanding a modern residence",
  description:
    "An illustrative educational case study of how a home may be discussed through Vastu. It is not a real client project and it does not report a result.",
  path: "/case-studies/understanding-a-modern-residence",
  image: "/images/modern-home.jpg",
  noIndex: true,
});

const objectives = [
  "Understand the property layout.",
  "Review the entrance and orientation.",
  "Understand room placement.",
  "Examine how one space meets the next.",
  "Consider natural light and ventilation.",
  "Notice the surroundings that can be seen.",
  "Note questions that still need a visit.",
];

const propertyPoints = [
  "A floor plan, if one exists",
  "North, and which way the building faces",
  "The main entrance",
  "Living areas",
  "Bedrooms",
  "Kitchen",
  "Bathrooms",
  "Windows and other openings",
  "A staircase, where the house has one",
  "Outdoor space, where it belongs to the property",
];

const steps = [
  ["Initial discussion", "The concern and the kind of property are heard first. No suggestion is made from a headline."],
  ["Information collection", "A floor plan, photographs, and whatever is known about north are reviewed before the visit."],
  ["Property assessment", "The layout, directions, entrances, and the way rooms meet are studied on the property."],
  ["Observations", "What is noticed is explained in the consultant’s own Vastu approach. It is an observation, not a laboratory finding."],
  ["Recommendations", "Possible changes are explained with their purpose and practical cost. Some are small. Building work is named separately."],
  ["Follow-up", "Questions about how to carry a suggestion out are clarified. The next step is agreed, not assumed."],
];

const prepare = [
  "Property floor plan",
  "Property address or location",
  "Photographs you are willing to share",
  "North or orientation, if you already know it",
  "The questions you want answered",
  "A preferred date for the visit",
];

export default function IllustrativeResidencePage() {
  return (
    <article className="bg-ivory pb-20">
      <section className="relative min-h-[70svh] bg-charcoal text-ivory">
        <div className="absolute inset-0">
          <CinematicVideo video={videos.villa} playInView className="h-full w-full" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/25" />
        <Container className="relative z-10 flex min-h-[70svh] flex-col justify-start pt-24 pb-28 sm:justify-end sm:py-16">
          <Breadcrumbs
            light
            items={[
              { href: "/", label: "Home" },
              { href: "/case-studies", label: "Case studies" },
              { href: "/case-studies/understanding-a-modern-residence", label: "Illustrative residence" },
            ]}
          />
          <p className="mt-4 max-w-xl border border-gold/70 px-3 py-2 text-sm text-sand">
            An illustrative study. This is not a client project, and it does not report a result.
          </p>
          <SanskritLabel
            light
            term="गृह वास्तु अध्ययन"
            reading="A study of Vastu for the home"
            meaning="An editorial example of how a home may be discussed. It is not a reading of a real house."
          />
          <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.98] font-medium tracking-[-0.03em]">
            Understanding a Modern Residence Through Traditional Vastu Principles
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ivory/85 sm:text-lg">
            A structured approach to understanding residential spaces, directions and architectural arrangement.
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-serif text-xl italic text-bark">Understanding the Space We Call Home</p>
            <div className="mt-4 h-px w-24 bg-gold" />
            <p className="mt-6 text-base leading-relaxed text-deep/80">
              Every home has its own layout, entrance, directions and surroundings. Traditional Vastu Shastra offers a framework for understanding these elements as part of the built environment.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-4xl">The objective</h2>
            <ul className="mt-5 space-y-2 text-base leading-relaxed text-deep/80">
              {objectives.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <Container className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl">Understanding the property</h2>
            <p className="mt-4 text-base leading-relaxed text-deep/80">
              A real visit uses the information that belongs to that house. The list below is what may be looked at. It is not a report on a named property.
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {propertyPoints.map((item) => (
                <li key={item} className="border border-deep/10 bg-white px-4 py-3 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <figure>
            <VastuDiagram />
            <figcaption className="mt-3 text-sm leading-relaxed text-bark">
              Illustrative Layout — Not an Actual Property Assessment. The square is a teaching diagram, not a client floor plan.
            </figcaption>
          </figure>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <h2 className="font-serif text-4xl">Traditional principles</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-deep/80">
            Direction, the five elements, the arrangement of rooms, and the Vastu diagram are traditional ways of talking about a building. They are not presented here as scientific measurements. An engineer’s drawing and a doctor’s advice remain separate.
          </p>
          <div className="mt-8">
            <FiveElements />
          </div>
          <div className="mt-10">
            <SanskritMantra verse={verses[3]} />
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <Container>
          <h2 className="font-serif text-4xl">Consultation methodology</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-deep/80">
            These are the stages of a personal visit. They do not mean every house needs building work.
          </p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {steps.map(([title, text], index) => (
              <li key={title} className="border border-deep/10 bg-white p-5">
                <p className="font-serif text-2xl text-gold">0{index + 1}</p>
                <h3 className="mt-2 font-serif text-3xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-deep/75">{text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-bark">The public four-step summary remains: {processSteps.map((step) => step.title).join(", ")}.</p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl">Practical recommendations</h2>
            <p className="mt-4 text-base leading-relaxed text-deep/80">
              A recommendation is made only after a real property is seen. This page does not prescribe a remedy for an imaginary house.
            </p>
            <ul className="mt-4 space-y-2 text-base leading-relaxed text-deep/80">
              <li>Some suggestions change how a room is used.</li>
              <li>Some concern furniture or the daily path through the house.</li>
              <li>Building work is suggested only when the visit shows it is relevant, and an architect or engineer should check it.</li>
            </ul>
            <p className="mt-4 text-base leading-relaxed text-deep/80">
              Nothing here promises health, wealth, professional success, or family harmony.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-4xl">Cost transparency</h2>
            <p className="mt-4 font-serif text-5xl text-deep">₹10,000</p>
            <p className="mt-2 text-base text-deep/80">Personal on-site consultation by Mr. Sanjeev Jain.</p>
            <p className="mt-4 text-base leading-relaxed text-deep/80">Travel, if a visit needs it, is confirmed separately.</p>
            <p className="mt-4 text-base leading-relaxed text-deep/80">
              Remedies and building work are priced after the assessment. Many simpler remedies may cost around ₹5,000–₹6,000 or less. That is not a maximum. Structural work can cost more.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-parchment py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <h2 className="font-serif text-4xl">What to prepare</h2>
            <ul className="mt-5 space-y-2 text-base leading-relaxed text-deep/80">
              {prepare.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-4xl">Begin with Understanding Your Space</h2>
            <p className="mt-4 text-base leading-relaxed text-deep/80">
              Send a note about your own property. A visit is confirmed only after the consultancy replies.
            </p>
            <div className="mt-6">
              <Button href="/contact">Book a Personal Consultation</Button>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
