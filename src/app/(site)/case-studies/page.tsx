import { CaseStudyBrowser } from "@/components/case-studies/CaseStudyBrowser";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { getCaseStudies } from "@/lib/data/public";
import { getCopy } from "@/lib/i18n/get-locale";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vastu case studies",
  description: "Client stories are published only with permission. A reported experience is not proof that another property will have the same result.",
  path: "/case-studies",
  image: images.modernHome.src,
});

export default async function CaseStudiesPage() {
  const [studies, copy] = await Promise.all([getCaseStudies(), getCopy()]);
  return (
    <>
      <PageHero
        eyebrow={copy.pages.studies.eyebrow}
        title={copy.pages.studies.title}
        text={copy.pages.studies.text}
        crumbs={[
          { href: "/", label: copy.common.home },
          { href: "/case-studies", label: copy.nav.studies },
        ]}
        image={images.modernHome}
      />
      <section className="bg-[#efe8da] py-16 sm:py-20">
        <Container>
          <CaseStudyBrowser studies={studies} />
        </Container>
      </section>
    </>
  );
}
