import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getCopy } from "@/lib/i18n/get-locale";
import type { SiteImage } from "@/lib/images";

export async function PageHero({
  eyebrow,
  title,
  text,
  image,
  crumbs,
}: {
  eyebrow: ReactNode;
  title: string;
  text: string;
  image: SiteImage;
  crumbs?: { href: string; label: string }[];
}) {
  const copy = await getCopy();
  return (
    <section className="bg-ivory pt-[4.5rem] text-deep lg:pt-20">
      <Container className="grid items-end gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-20">
        <div>
          {crumbs ? <Breadcrumbs items={crumbs} /> : null}
          {typeof eyebrow === "string" ? <p className="mt-6 font-serif text-xl italic text-bark">{eyebrow}</p> : <div className="mt-6">{eyebrow}</div>}
          <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.98] font-medium tracking-[-0.03em]">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-[1.75] text-deep/80 sm:text-lg">{text}</p>
        </div>
        <figure>
          <div className="relative aspect-[3/2] overflow-hidden bg-parchment">
            <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" priority />
          </div>
          <figcaption className="mt-3 text-xs leading-relaxed text-bark">{copy.home.filmNote}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
