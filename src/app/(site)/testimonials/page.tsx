import { TestimonialCarousel } from "@/components/home/Testimonials";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { getTestimonials } from "@/lib/data/public";
import { getCopy } from "@/lib/i18n/get-locale";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Client words",
  description: "Client words appear only with permission. They are personal accounts, not guaranteed results.",
  path: "/testimonials",
  image: images.courtyard.src,
});

export default async function TestimonialsPage() {
  const [testimonials, copy] = await Promise.all([getTestimonials(), getCopy()]);
  return (
    <>
      <PageHero
        eyebrow={copy.pages.testimonials.eyebrow}
        title={copy.pages.testimonials.title}
        text={copy.pages.testimonials.text}
        crumbs={[
          { href: "/", label: copy.common.home },
          { href: "/testimonials", label: copy.nav.testimonials },
        ]}
        image={images.courtyard}
      />
      <TestimonialCarousel items={testimonials} />
      <Container className="pb-16">
        <p className="max-w-2xl text-sm leading-relaxed text-deep/70">{copy.pages.testimonials.note}</p>
      </Container>
    </>
  );
}
