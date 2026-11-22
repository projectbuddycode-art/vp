import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/site";
import { getCopy, getLocale } from "@/lib/i18n/get-locale";
import { getServiceBody } from "@/lib/i18n/service-bodies";

export const metadata = pageMetadata({
  title: "Vastu consultation services",
  description:
    "Vastu consultations for homes, offices, workspaces and living environments. Each visit is personal. Results are not guaranteed.",
  path: "/expertise",
  image: images.residence.src,
});

export default async function ExpertisePage() {
  const [copy, locale] = await Promise.all([getCopy(), getLocale()]);
  return (
    <>
      <PageHero
        eyebrow={copy.pages.expertise.eyebrow}
        title={copy.pages.expertise.title}
        text={copy.pages.expertise.text}
        crumbs={[
          { href: "/", label: copy.common.home },
          { href: "/expertise", label: copy.nav.services },
        ]}
        image={images.residence}
      />
      <section className="bg-white py-16 sm:py-24">
        <Container className="space-y-16">
          {services.map((service, index) => (
            <Link key={service.slug} href={`/expertise/${service.slug}`} className="group grid items-center gap-6 lg:grid-cols-2 lg:gap-14">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[16/10] bg-parchment">
                  <Image src={service.image.src} alt={service.image.alt} fill className="object-cover" sizes="(min-width: 1024px) 46vw, 100vw" />
                </div>
                <p className="mt-2 text-xs text-bark">{copy.home.filmNote}</p>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className="font-serif text-4xl leading-tight group-hover:text-bark sm:text-5xl">
                  {copy.pages.expertise.cardTitles[index] ?? copy.form.serviceTitles[service.slug] ?? service.title}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-deep/75">
                  {getServiceBody(locale, service.slug)?.summary ?? service.summary}
                </p>
              </div>
            </Link>
          ))}
          <div className="max-w-xl space-y-4">
            <p className="text-base leading-relaxed text-deep/80">{copy.pages.expertise.unsure}</p>
            <Button href="/contact">{copy.pages.expertise.unsureCta}</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
