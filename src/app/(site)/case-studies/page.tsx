import { CaseStudyBrowser } from "@/components/case-studies/CaseStudyBrowser";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { getCaseStudies } from "@/lib/data/public";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vastu case studies",
  description: "Client stories are published only with permission. A reported experience is not proof that another property will have the same result.",
  path: "/case-studies",
  image: images.modernHome.src,
});

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="What do real Vastu visits look like?"
        text="A story is published only when the client agrees. It separates the property, the concern, what was studied, the guidance, and the client’s own words. Their experience is not a promise for your property."
        crumbs={[{ href: "/", label: "Home" }, { href: "/case-studies", label: "Case studies" }]}
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
