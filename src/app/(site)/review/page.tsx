import { ReviewForm } from "@/components/forms/ReviewForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { getCopy } from "@/lib/i18n/get-locale";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Share a client review",
  description:
    "Clients of Mr. Sanjeev Jain can share a review of their Vastu consultation. Reviews are moderated before publication.",
  path: "/review",
  image: images.geometry.src,
  noIndex: true,
});

export default async function ReviewPage() {
  const copy = await getCopy();
  return (
    <>
      <PageHero
        eyebrow="Client reviews"
        title="Share your experience with STHAPATYA."
        text="This page is for people who have already consulted with Mr. Sanjeev Jain. Reviews are read before they appear on the website. Please do not include private medical, financial, or property details."
        image={images.geometry}
        crumbs={[
          { href: "/", label: copy.common.home },
          { href: "/review", label: "Review" },
        ]}
      />
      <section className="bg-white py-16 sm:py-24">
        <Container className="max-w-2xl">
          <div className="mb-10 space-y-3 border-b border-deep/10 pb-8">
            <p className="text-[0.72rem] tracking-[0.18em] text-gold uppercase">Private submission</p>
            <p className="text-sm leading-relaxed text-deep/75">
              Your review is held as pending until it is read. Email addresses stay private. Do not include medical,
              financial, or property details you would not want stored.
            </p>
          </div>
          <ReviewForm />
        </Container>
      </section>
    </>
  );
}
