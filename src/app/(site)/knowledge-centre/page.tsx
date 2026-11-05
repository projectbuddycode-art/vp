import { ArticleBrowser } from "@/components/knowledge/ArticleBrowser";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { getArticles } from "@/lib/data/public";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vastu questions, answered simply",
  description: "Plain answers from STHAPATYA about Vastu Shastra, directions, homes, offices, and how to prepare for a visit with Mr. Sanjeev Jain.",
  path: "/knowledge-centre",
  image: images.geometry.src,
});

export default async function KnowledgePage() {
  const articles = await getArticles();
  return (
    <>
      <PageHero
        eyebrow="Knowledge centre"
        title="What should I read before a Vastu visit?"
        text="These notes answer common questions in everyday language. They are not a reading of your property."
        crumbs={[{ href: "/", label: "Home" }, { href: "/knowledge-centre", label: "Knowledge centre" }]}
        image={images.geometry}
      />
      <section className="bg-ivory py-16 sm:py-20">
        <Container>
          <ArticleBrowser articles={articles} />
        </Container>
      </section>
    </>
  );
}
