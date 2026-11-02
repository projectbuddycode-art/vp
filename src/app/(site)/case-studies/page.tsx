import { CaseStudyBrowser } from "@/components/case-studies/CaseStudyBrowser";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { getCaseStudies } from "@/lib/data/public";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Case Studies",
  description: "Consented Vastu case studies, published only when a client has agreed.",
  path: "/case-studies",
  image: images.modernHome.src,
});

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Stories from real properties."
        text="A case study is published only when the client agrees. It includes the situation, the concern, what was studied, the guidance, and the client’s own words."
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
