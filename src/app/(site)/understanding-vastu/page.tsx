import { EightDirections } from "@/components/compass/EightDirections";
import { SanskritMantra } from "@/components/content/SanskritMantra";
import { CinematicVideo } from "@/components/video/CinematicVideo";
import { verses } from "@/lib/verses";
import { videos } from "@/lib/videos";
import { SanskritLabel } from "@/components/content/SanskritLabel";
import { FiveElements } from "@/components/diagrams/FiveElements";
import { VastuDiagram } from "@/components/diagrams/VastuDiagram";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { getCopy, getLocale } from "@/lib/i18n/get-locale";
import { getPageBodies } from "@/lib/i18n/page-bodies";

export const metadata = pageMetadata({
  title: "Understanding Vastu Shastra",
  description:
    "A plain introduction to Vastu Shastra: directions, layout, the five elements, and the Vastu diagram. Traditional ideas are kept separate from engineering and medicine.",
  path: "/understanding-vastu",
  image: images.geometry.src,
});

export default async function UnderstandingVastuPage() {
  const [copy, locale] = await Promise.all([getCopy(), getLocale()]);
  const bodies = getPageBodies(locale);
  const u = bodies.understanding;

  return (
    <>
      <PageHero
        eyebrow={
          <SanskritLabel
            term="वास्तु विद्या"
            reading={copy.pages.understanding.eyebrow}
            meaning={copy.pages.understanding.text}
          />
        }
        title={copy.pages.understanding.title}
        text={copy.pages.understanding.text}
        image={images.geometry}
        crumbs={[
          { href: "/", label: copy.common.home },
          { href: "/understanding-vastu", label: copy.nav.understanding },
        ]}
      />
      <section className="bg-ivory py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <CinematicVideo video={videos.floorplan} playInView className="aspect-[16/9]" sizes="(min-width: 1024px) 60vw, 100vw" />
            <p className="mt-3 text-xs leading-relaxed text-bark">{u.filmNote}</p>
          </div>
          <SanskritMantra verse={verses[2]} />
        </Container>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          {u.sections.map((section) => (
            <article key={section.title}>
              <h2 className="font-serif text-4xl leading-tight">{section.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-deep/80">{section.text}</p>
            </article>
          ))}
        </Container>
      </section>
      <section className="bg-ivory py-16 sm:py-20">
        <Container>
          <SanskritLabel term="दिशा" reading={u.directionReading} meaning={u.directionMeaning} />
          <h2 className="mt-4 font-serif text-4xl">{u.directionTitle}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-deep/80">{u.directionText}</p>
        </Container>
        <EightDirections />
      </section>
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SanskritLabel term="पंचमहाभूत" reading={u.elementsReading} meaning={u.elementsMeaning} />
          <h2 className="mt-4 mb-8 font-serif text-4xl">{u.elementsTitle}</h2>
          <FiveElements />
        </Container>
      </section>
      <section className="bg-ivory py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl">{u.diagramTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-deep/80">{u.diagramText}</p>
            <p className="mt-4 text-base leading-relaxed text-deep/80">{copy.home.disclaimer}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/approach">{u.seeApproach}</Button>
              <Button href="/contact" variant="line">
                {u.bookCta}
              </Button>
            </div>
          </div>
          <VastuDiagram />
        </Container>
      </section>
    </>
  );
}
