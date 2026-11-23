import Image from "next/image";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images, resolvePortrait } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/data/public";
import { getCopy } from "@/lib/i18n/get-locale";

export const metadata = pageMetadata({
  title: "About Sanjeev Jain",
  description:
    "Mr. Sanjeev Jain brings a diamond-industry background of precision and an inherited understanding of Vastu Shastra to each property he visits through STHAPATYA.",
  path: "/about",
  image: images.founder.src,
});

export default async function AboutPage() {
  const [settings, copy] = await Promise.all([getSettings(), getCopy()]);
  return (
    <>
      <section className="bg-ivory pt-[4.5rem] lg:pt-20">
        <Container className="grid items-end gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <Breadcrumbs items={[{ href: "/", label: copy.common.home }, { href: "/about", label: copy.nav.about }]} />
            <p className="mt-6 text-[0.72rem] tracking-[0.22em] text-gold uppercase">{copy.pages.about.eyebrow}</p>
            <h1 className="mt-4 max-w-xl font-serif text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.98] font-medium tracking-[-0.03em]">
              {copy.pages.about.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-deep/80 sm:text-lg">{copy.pages.about.text}</p>
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
            <figcaption className="mt-2 text-sm text-bark">{copy.pages.about.caption}</figcaption>
          </figure>
        </Container>
      </section>
      <section className="bg-white py-16 sm:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <p className="font-serif text-[clamp(1.7rem,2.6vw,2.35rem)] leading-snug text-deep italic">{copy.pages.about.quote}</p>
          <div className="space-y-8 text-base leading-[1.75] text-deep/80">
            {settings.founderSummary ? (
              settings.founderSummary.split("\n").filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            ) : (
              <>
                <div>
                  <h2 className="font-serif text-[clamp(1.7rem,2.4vw,2.2rem)] leading-tight text-deep">{copy.pages.about.diamondTitle}</h2>
                  <p className="mt-3">{copy.pages.about.diamondText}</p>
                </div>
                <div>
                  <h2 className="font-serif text-[clamp(1.7rem,2.4vw,2.2rem)] leading-tight text-deep">{copy.pages.about.traditionTitle}</h2>
                  <p className="mt-3">{copy.pages.about.traditionText}</p>
                </div>
                <div>
                  <h2 className="font-serif text-[clamp(1.7rem,2.4vw,2.2rem)] leading-tight text-deep">{copy.pages.about.approachTitle}</h2>
                  <p className="mt-3">{copy.pages.about.approachText}</p>
                  <p className="mt-4">{copy.pages.about.visitNote}</p>
                </div>
              </>
            )}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button href="/contact">{copy.bookPersonal}</Button>
              <Button href="/approach" variant="line">
                {copy.nav.approach}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
