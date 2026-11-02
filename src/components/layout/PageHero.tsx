import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { studyCaption, type SiteImage } from "@/lib/images";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: SiteImage;
}) {
  return (
    <section className="bg-ivory pt-[4.5rem] text-deep lg:pt-20">
      <Container className="grid items-end gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
        <div>
          <p className="font-serif text-xl italic text-bark">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.98] font-medium tracking-[-0.03em]">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-deep/80 sm:text-lg">{text}</p>
        </div>
        <figure>
          <div className="relative aspect-[3/2] bg-parchment">
            <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" priority />
          </div>
          <figcaption className="mt-2 text-xs leading-relaxed text-bark">{studyCaption}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
