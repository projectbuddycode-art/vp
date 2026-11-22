import { EightDirections } from "@/components/compass/EightDirections";
import { CinematicVideo } from "@/components/video/CinematicVideo";
import { videos } from "@/lib/videos";
import { Methodology } from "@/components/home/Methodology";
import { PageHero } from "@/components/layout/PageHero";
import { SanskritLabel } from "@/components/content/SanskritLabel";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { getCopy, getLocale } from "@/lib/i18n/get-locale";
import { getPageBodies } from "@/lib/i18n/page-bodies";

export const metadata = pageMetadata({
  title: "How a Vastu consultation works",
  description:
    "Mr. Sanjeev Jain listens, visits the property, and then explains practical Vastu guidance. The same solution is not used for every home or office.",
  path: "/approach",
  image: images.geometry.src,
});

export default async function ApproachPage() {
  const [copy, locale] = await Promise.all([getCopy(), getLocale()]);
  const bodies = getPageBodies(locale);
  const a = bodies.approach;

  return (
    <>
      <PageHero
        eyebrow={<SanskritLabel term="दिशा एवं संतुलन" reading={copy.pages.approach.eyebrow} meaning={copy.pages.approach.text} />}
        title={copy.pages.approach.title}
        text={copy.pages.approach.text}
        crumbs={[
          { href: "/", label: copy.common.home },
          { href: "/approach", label: copy.nav.approach },
        ]}
        image={images.geometry}
      />
      <section className="bg-white py-12 sm:py-16">
        <Container>
          <CinematicVideo video={videos.entrance} playInView className="aspect-[16/9]" sizes="(min-width: 1024px) 80vw, 100vw" />
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-bark">{a.filmNote}</p>
        </Container>
      </section>
      <section className="bg-ivory py-16 sm:py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          {copy.home.journeySteps.map((step) => (
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
          <h2 className="max-w-3xl font-serif text-4xl">{a.studyTitle}</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-2">
            {a.studyItems.map((item, index) => (
              <li key={item.title} className="border border-deep/10 p-5">
                <p className="font-serif text-2xl text-gold">0{index + 1}</p>
                <h3 className="mt-2 font-serif text-3xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-deep/75">{item.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="bg-ivory py-16">
        <Container className="max-w-3xl space-y-4 text-base leading-relaxed text-deep/80">
          <h2 className="font-serif text-4xl text-deep">{a.purposeTitle}</h2>
          <p>{a.purposeText}</p>
          <p>{copy.home.disclaimer}</p>
          <Button href="/contact">{a.requestCta}</Button>
        </Container>
      </section>
    </>
  );
}
