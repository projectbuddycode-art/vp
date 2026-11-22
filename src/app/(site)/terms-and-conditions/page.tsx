import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { getCopy, getLocale } from "@/lib/i18n/get-locale";
import { getPageBodies } from "@/lib/i18n/page-bodies";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "Terms for enquiring about and receiving a Vastu consultation.",
  path: "/terms-and-conditions",
});

export default async function TermsPage() {
  const [copy, locale] = await Promise.all([getCopy(), getLocale()]);
  const legal = getPageBodies(locale).legal;

  return (
    <>
      <PageHero
        eyebrow={legal.termsEyebrow}
        title={legal.termsTitle}
        text={legal.termsText}
        image={images.carving}
        crumbs={[
          { href: "/", label: copy.common.home },
          { href: "/terms-and-conditions", label: legal.termsEyebrow },
        ]}
      />
      <Container className="max-w-3xl space-y-5 py-16 text-base leading-relaxed text-deep/80">
        {legal.termsBody.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
        <p>{copy.home.disclaimer}</p>
      </Container>
    </>
  );
}
