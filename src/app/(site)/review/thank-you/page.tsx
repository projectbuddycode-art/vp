import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getCopy } from "@/lib/i18n/get-locale";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Review received",
  description: "Your client review has been received and is awaiting moderation.",
  path: "/review/thank-you",
  noIndex: true,
});

export default async function ReviewThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const [{ ref }, copy] = await Promise.all([searchParams, getCopy()]);
  return (
    <>
      <PageHero
        eyebrow="Thank you"
        title="Your review has been received."
        text="It is held as pending until Mr. Sanjeev Jain has read it. Only approved reviews with your consent may appear on the website."
        image={images.geometry}
        crumbs={[
          { href: "/", label: copy.common.home },
          { href: "/review", label: "Review" },
          { href: "/review/thank-you", label: "Received" },
        ]}
      />
      <Container className="max-w-2xl space-y-6 py-16">
        {ref ? <p className="text-sm text-bark">Reference: {ref}</p> : null}
        <p className="text-base leading-relaxed text-deep/80">
          A personal reply is not automatic. If you asked a follow-up question, the consultancy may contact you using the
          email you provided.
        </p>
        <Button href="/">{copy.common.home}</Button>
      </Container>
    </>
  );
}
