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
  image: images.palace.src,
});

export default async function AboutPage() {
  const [settings, copy] = await Promise.all([getSettings(), getCopy()]);
  return (
    <>
      <section className="bg-ivory pt-[4.5rem] lg:pt-20">
        <Container className="grid items-end gap-10 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <Breadcrumbs items={[{ href: "/", label: copy.common.home }, { href: "/about", label: copy.nav.about }]} />
            <p className="text-[0.72rem] tracking-[0.22em] text-gold uppercase">{copy.pages.about.eyebrow}</p>
            <h1 className="mt-4 font-serif text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.98] font-medium tracking-[-0.03em]">
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
        <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <p className="font-serif text-3xl leading-snug italic">{copy.pages.about.quote}</p>
          <div className="space-y-5 text-base leading-relaxed text-deep/80">
            {settings.founderSummary ? (
              settings.founderSummary.split("\n").filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            ) : (
              <>
                <h2 className="font-serif text-3xl text-deep">{copy.pages.about.diamondTitle}</h2>
                <p>{copy.pages.about.diamondText}</p>
                <h2 className="font-serif text-3xl text-deep">{copy.pages.about.traditionTitle}</h2>
                <p>{copy.pages.about.traditionText}</p>
                <h2 className="font-serif text-3xl text-deep">{copy.pages.about.approachTitle}</h2>
                <p>{copy.pages.about.approachText}</p>
                <p>{copy.pages.about.visitNote}</p>
              </>
            )}
            <Button href="/contact">{copy.bookPersonal}</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
