import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { getCopy, getLocale } from "@/lib/i18n/get-locale";
import { getPageBodies } from "@/lib/i18n/page-bodies";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How consultation enquiries and website data are handled.",
  path: "/privacy-policy",
});

export default async function PrivacyPage() {
  const [copy, locale] = await Promise.all([getCopy(), getLocale()]);
  const legal = getPageBodies(locale).legal;

  return (
    <>
      <PageHero
        eyebrow={legal.privacyEyebrow}
        title={legal.privacyTitle}
        text={legal.privacyText}
        image={images.geometry}
        crumbs={[
          { href: "/", label: copy.common.home },
          { href: "/privacy-policy", label: legal.privacyEyebrow },
        ]}
      />
      <Container className="max-w-3xl space-y-5 py-16 text-base leading-relaxed text-deep/80">
        {legal.privacyBody.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </Container>
    </>
  );
}
