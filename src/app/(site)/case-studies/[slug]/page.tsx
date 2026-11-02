import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getCaseStudies, getCaseStudy } from "@/lib/data/public";
import { pageMetadata } from "@/lib/seo";
import { caseCategories } from "@/lib/site";

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  if (studies.length === 0) return [{ slug: "unpublished" }];
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return pageMetadata({ title: "Case study", description: "Case study", path: "/case-studies" });
  return pageMetadata({
    title: study.seoTitle || study.title,
    description: study.seoDescription || study.clientConcern,
    path: `/case-studies/${study.slug}`,
    image: study.coverImageUrl || "/images/modern-home.jpg",
  });
}

function Block({ title, text }: { title: string; text: string }) {
  if (!text) return null;
  return (
    <section className="border-t border-deep/10 py-6">
      <h2 className="text-[0.68rem] tracking-[0.18em] text-gold uppercase">{title}</h2>
      <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-deep/80">{text}</p>
    </section>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();
  const category = caseCategories.find((item) => item.value === study.category)?.label ?? study.category;

  return (
    <article className="bg-ivory pb-20 pt-28">
      <Container>
        <p className="text-[0.72rem] tracking-[0.22em] text-gold uppercase">{category}</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.98] sm:text-7xl">{study.title}</h1>
        {study.coverImageUrl ? (
          <div className="relative mt-10 aspect-[16/8]">
            <Image src={study.coverImageUrl} alt={study.coverImageAlt} fill className="object-cover" priority sizes="100vw" />
          </div>
        ) : null}
        <div className="mt-10 max-w-3xl">
          <Block title="Client concern" text={study.clientConcern} />
          <Block title="Property context" text={study.propertyContext} />
          <Block title="Assessment" text={study.assessment} />
          <Block title="Identified issues" text={study.identifiedIssues} />
          <Block title="Recommendations" text={study.recommendations} />
          <Block title="Implementation" text={study.implementationDetails} />
          <Block title="Estimated remedy cost" text={study.estimatedRemedyCost} />
          <Block title="Timeline" text={study.timeline} />
          {study.clientReportedExperience ? (
            <section className="border-t border-deep/10 py-6">
              <h2 className="text-[0.68rem] tracking-[0.18em] text-gold uppercase">Client-reported experience</h2>
              <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-deep/80">{study.clientReportedExperience}</p>
              <p className="mt-3 text-sm text-deep/60">This is the client’s personal account. It is not presented as a proven result.</p>
            </section>
          ) : null}
        </div>
        {study.media.length > 0 ? (
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {study.media.map((media) => (
              <figure key={media.id}>
                <div className="relative aspect-[4/3]">
                  <Image src={media.url} alt={media.alt || study.title} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
                </div>
                <figcaption className="mt-2 text-xs tracking-[0.14em] text-deep/60 uppercase">{media.kind}</figcaption>
              </figure>
            ))}
          </div>
        ) : null}
        <div className="mt-12">
          <Button href="/contact">Request your consultation</Button>
        </div>
      </Container>
    </article>
  );
}
