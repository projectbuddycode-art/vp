import { ArticleBrowser } from "@/components/knowledge/ArticleBrowser";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { getArticles } from "@/lib/data/public";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Knowledge Centre",
  description: "Editorial notes on the Vastu Purusha Mandala, direction, homes, and practical recommendations.",
  path: "/knowledge-centre",
  image: images.geometry.src,
});

export default async function KnowledgePage() {
  const articles = await getArticles();
  return (
    <>
      <PageHero
        eyebrow="Knowledge centre"
        title="Read before you book."
        text="These articles explain Vastu in everyday language. They are not a reading of your property."
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
