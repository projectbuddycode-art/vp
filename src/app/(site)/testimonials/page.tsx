import { TestimonialCarousel } from "@/components/home/Testimonials";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { getTestimonials } from "@/lib/data/public";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Client words",
  description: "Client words appear only with permission. They are personal accounts, not guaranteed results.",
  path: "/testimonials",
  image: images.courtyard.src,
});

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="What have clients said?"
        text="Words, a name and a photograph appear here only with permission. Until then, this page stays empty on purpose. A comment is not proof for another property."
        crumbs={[{ href: "/", label: "Home" }, { href: "/testimonials", label: "Testimonials" }]}
        image={images.courtyard}
      />
      <TestimonialCarousel items={testimonials} />
      <Container className="pb-16">
        <p className="max-w-2xl text-sm leading-relaxed text-deep/70">
          A testimonial is a personal account. It is not evidence that another property will have the same experience.
        </p>
      </Container>
    </>
  );
}
