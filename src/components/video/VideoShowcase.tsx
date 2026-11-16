import { GoldLine } from "@/components/animations/GoldLine";
import { SanskritLabel } from "@/components/content/SanskritLabel";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CinematicVideo } from "@/components/video/CinematicVideo";
import { studyCaption } from "@/lib/images";
import { videos } from "@/lib/videos";

const panels = [
  {
    video: videos.residential,
    label: "गृह वास्तु",
    title: "A home in warm light",
    text: "Residential consultation looks at one house: its rooms, entrance and the way it is lived in.",
  },
  {
    video: videos.floorplan,
    label: "वास्तु विद्या",
    title: "Courtyard and direction",
    text: "Lines over a courtyard are a way of talking about space. They do not assess a plan.",
  },
  {
    video: videos.entrance,
    label: "प्रवेश",
    title: "The approach to a house",
    text: "A visit starts with the entrance, the path and what surrounds the building.",
  },
];

export function VideoShowcase() {
  return (
    <section className="bg-deep py-20 text-ivory sm:py-28">
      <Container>
        <SanskritLabel
          light
          term="दिशा एवं संतुलन"
          reading="Directions and balance"
          meaning="Four architectural films. None of them is a client property or a result."
        />
        <h2 className="mt-4 max-w-4xl font-serif text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.98] font-medium tracking-[-0.03em]">
          Spaces. Directions. Perspectives.
        </h2>
        <GoldLine className="mt-6 h-3 w-full max-w-xs text-gold" />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-sand sm:text-lg">
          Traditional principles. A contemporary perspective. These films show how light, entrance and arrangement can be looked at. They are not case studies.
        </p>
        <div className="mt-12 grid items-end gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <CinematicVideo video={videos.villa} playInView className="aspect-[16/9]" sizes="(min-width: 1024px) 62vw, 100vw" />
            <p className="mt-3 text-xs text-sand">{studyCaption} Night architectural study. Not a client villa.</p>
          </div>
          <div>
            <p className="devanagari text-xl text-sand">दिशा एवं संतुलन</p>
            <h3 className="mt-3 font-serif text-4xl leading-tight">Traditional Principles. A Contemporary Perspective.</h3>
            <p className="mt-4 text-sm leading-relaxed text-sand">
              Discover a thoughtful approach to understanding spaces through the traditional principles of Vastu Shastra.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {panels.map((panel) => (
            <figure key={panel.video.id}>
              <CinematicVideo video={panel.video} playInView className="aspect-[4/5] md:aspect-[3/4]" sizes="(min-width: 768px) 30vw, 100vw" />
              <figcaption className="mt-3">
                <p className="devanagari text-lg text-sand">{panel.label}</p>
                <p className="mt-1 font-serif text-2xl">{panel.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-sand">{panel.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12">
          <Button href="/approach" variant="light">
            Explore Our Approach
          </Button>
        </div>
      </Container>
    </section>
  );
}
