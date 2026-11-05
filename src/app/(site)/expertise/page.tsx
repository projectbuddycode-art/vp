import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { images, studyCaption } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/site";

const titles = [
  "Home and Living Spaces",
  "Business and Workplace",
  "Health and Wellbeing Concerns",
  "Financial and Professional Concerns",
];

export const metadata = pageMetadata({
  title: "Vastu consultation services",
  description:
    "Vastu consultations for homes, offices, workspaces and living environments. Each visit is personal. Results are not guaranteed.",
  path: "/expertise",
  image: images.residence.src,
});

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What Vastu consultations are offered?"
        text="Homes, offices, workspaces, and questions about a calmer living environment. These are areas of consultation. They are not promised results."
        crumbs={[{ href: "/", label: "Home" }, { href: "/expertise", label: "Services" }]}
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
                <p className="mt-2 text-xs text-bark">{studyCaption}</p>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className="font-serif text-4xl leading-tight group-hover:text-bark sm:text-5xl">{titles[index] ?? service.title}</h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-deep/75">{service.summary}</p>
              </div>
            </Link>
          ))}
          <div className="max-w-xl space-y-4">
            <p className="text-base leading-relaxed text-deep/80">
              If you are not sure which consultation fits, describe the property. Mr. Sanjeev Jain can tell you, after he has heard the concern, whether a visit is the right next step.
            </p>
            <Button href="/contact">Not Sure Where to Start? Tell Us About Your Property.</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
