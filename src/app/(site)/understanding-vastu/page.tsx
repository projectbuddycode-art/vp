import { EightDirections } from "@/components/compass/EightDirections";
import { SanskritLabel } from "@/components/content/SanskritLabel";
import { FiveElements } from "@/components/diagrams/FiveElements";
import { VastuDiagram } from "@/components/diagrams/VastuDiagram";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { disclaimer } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Understanding Vastu Shastra",
  description:
    "A plain introduction to Vastu Shastra: directions, layout, the five elements, and the Vastu diagram. Traditional ideas are kept separate from engineering and medicine.",
  path: "/understanding-vastu",
  image: images.geometry.src,
});

const sections = [
  {
    title: "What Vastu Shastra means",
    text: "Vastu Shastra is a traditional Indian body of knowledge about buildings. It looks at the site, the direction, the rooms, and the way people use them. STHAPATYA uses it as a personal consultation, not as a product that scores every house the same way.",
  },
  {
    title: "Architecture and the space we live in",
    text: "A plan is not only a drawing. It is the path from the door to the kitchen, the place where people sit, and the rooms that have become offices or stores. Traditional Vastu pays attention to that arrangement. Modern bylaws, structure, and the lease still decide what can actually be built.",
  },
  {
    title: "Entrance and layout",
    text: "The door people use every day often matters more than a door that exists only on paper. The visit also looks at the sequence of rooms and at what sits in the middle of the plan. There is no published rule on this website that says one entrance is lucky for every plot.",
  },
  {
    title: "Room placement",
    text: "Kitchen, bedrooms, bathrooms, and work rooms are discussed in relation to the concern you bring. A traditional preference is an interpretation. It is explained as tradition. It is not presented as a laboratory result.",
  },
  {
    title: "Surroundings",
    text: "A road, a neighbour’s wall, a courtyard, or a drop in the land can change how a building is read. The consultant notes what can be seen on the visit. He does not claim to know a site he has not studied.",
  },
  {
    title: "Tradition and modern building requirements",
    text: "An old planning idea can inform a conversation. It does not replace a structural drawing, a fire rule, or a municipal approval. If guidance would move a wall, a stair, or a service, an architect or engineer should review it before anyone builds.",
  },
];

export default function UnderstandingVastuPage() {
  return (
    <>
      <PageHero
        eyebrow={
          <SanskritLabel
            term="वास्तु विद्या"
            reading="Knowledge of Vastu"
            meaning="A traditional way of studying buildings. The English on this page explains the ideas. It is not a quotation from a scripture."
          />
        }
        title="Understanding the space around us."
        text="Vastu Shastra looks at layout, direction, and surroundings. This page explains the words in simple English. It does not read your property."
        image={images.geometry}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/understanding-vastu", label: "Understanding Vastu" },
        ]}
      />
      <section className="bg-white py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          {sections.map((section) => (
            <article key={section.title}>
              <h2 className="font-serif text-4xl leading-tight">{section.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-deep/80">{section.text}</p>
            </article>
          ))}
        </Container>
      </section>
      <section className="bg-ivory py-16 sm:py-20">
        <Container>
          <SanskritLabel term="दिशा" reading="Direction" meaning="Which way the plot and the rooms face. The compass below teaches the eight names. It does not point at your house." />
          <h2 className="mt-4 font-serif text-4xl">The eight directions</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-deep/80">
            North, east, south, west, and the four corners between them give a shared language. Different teachers describe the corners differently. STHAPATYA does not treat one corner chart as a diagnosis.
          </p>
        </Container>
        <EightDirections />
      </section>
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SanskritLabel term="पंचमहाभूत" reading="The five elements" meaning="Earth, water, fire, air, and space. A traditional language, not a medical test." />
          <h2 className="mt-4 mb-8 font-serif text-4xl">Five traditional elements</h2>
          <FiveElements />
        </Container>
      </section>
      <section className="bg-ivory py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl">The Vastu diagram</h2>
            <p className="mt-4 text-base leading-relaxed text-deep/80">
              The square is a traditional way to talk about the centre and the edges of a plan. The centre is often called the brahmasthan. The drawing on this page is original teaching artwork. It does not assess a floor plan, and it does not assign a remedy to each cell.
            </p>
            <p className="mt-4 text-base leading-relaxed text-deep/80">{disclaimer}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/approach">See the consultation approach</Button>
              <Button href="/contact" variant="line">Book a consultation</Button>
            </div>
          </div>
          <VastuDiagram />
        </Container>
      </section>
    </>
  );
}
