import { TestimonialCarousel } from "@/components/home/Testimonials";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getPublicReviews } from "@/lib/data/public";
import { getCopy } from "@/lib/i18n/get-locale";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Client reviews",
  description:
    "Client reviews appear only after approval and with explicit permission to publish. They are personal accounts, not guaranteed results.",
  path: "/testimonials",
  image: images.courtyard.src,
});

export default async function TestimonialsPage() {
  const [testimonials, copy] = await Promise.all([getPublicReviews(), getCopy()]);
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
      <section className="bg-white pb-20">
        <Container className="max-w-2xl space-y-6">
          <p className="text-sm leading-relaxed text-deep/70">{copy.pages.testimonials.note}</p>
          <div className="border border-deep/10 bg-ivory px-6 py-8">
            <p className="text-[0.72rem] tracking-[0.18em] text-gold uppercase">For previous clients</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight">Share a review privately.</h2>
            <p className="mt-3 text-sm leading-relaxed text-deep/75">
              If you have already consulted with Mr. Sanjeev Jain, you may submit a review for moderation. It appears on
              the website only after approval and with your consent to publish.
            </p>
            <div className="mt-6">
              <Button href="/review">Submit a review</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
