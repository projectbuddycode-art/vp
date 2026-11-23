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
      <section className="bg-ivory py-16 sm:py-24">
        <Container className="grid gap-6 md:grid-cols-2 md:gap-8">
          {copy.home.journeySteps.map((step) => (
            <article key={step.number} className="border border-deep/10 bg-white/40 p-6 sm:p-8">
              <p className="text-[0.68rem] tracking-[0.18em] text-gold uppercase">{step.number}</p>
              <h2 className="mt-3 font-serif text-[clamp(1.8rem,3vw,2.4rem)] leading-tight">{step.title}</h2>
              <p className="mt-4 text-sm leading-[1.7] text-deep/75 sm:text-base">{step.text}</p>
            </article>
          ))}
        </Container>
      </section>
      <EightDirections />
      <Methodology />
      <section className="bg-white py-16 sm:py-24">
        <Container>
          <h2 className="max-w-3xl font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.02em]">{a.studyTitle}</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
            {a.studyItems.map((item, index) => (
              <li key={item.title} className="border border-deep/10 p-6">
                <p className="font-serif text-2xl text-gold">0{index + 1}</p>
                <h3 className="mt-3 font-serif text-[clamp(1.6rem,2.4vw,2.1rem)] leading-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-[1.7] text-deep/75 sm:text-base">{item.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="bg-ivory py-16 sm:py-24">
        <Container className="max-w-3xl space-y-5 text-base leading-[1.75] text-deep/80">
          <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] tracking-[-0.02em] text-deep">{a.purposeTitle}</h2>
          <p>{a.purposeText}</p>
          <p>{copy.home.disclaimer}</p>
          <div className="pt-2">
            <Button href="/contact">{a.requestCta}</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
