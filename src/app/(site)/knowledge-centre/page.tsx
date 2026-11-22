import { ArticleBrowser } from "@/components/knowledge/ArticleBrowser";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { getArticles } from "@/lib/data/public";
import { getCopy, getLocale } from "@/lib/i18n/get-locale";
import { localizeArticles } from "@/lib/i18n/article-bodies";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vastu questions, answered simply",
  description: "Plain answers from STHAPATYA about Vastu Shastra, directions, homes, offices, and how to prepare for a visit with Mr. Sanjeev Jain.",
  path: "/knowledge-centre",
  image: images.geometry.src,
});

export default async function KnowledgePage() {
  const [articles, copy, locale] = await Promise.all([getArticles(), getCopy(), getLocale()]);
  const localized = localizeArticles(articles, locale);
  return (
    <>
      <PageHero
        eyebrow={copy.pages.knowledge.eyebrow}
        title={copy.pages.knowledge.title}
        text={copy.pages.knowledge.text}
        crumbs={[
          { href: "/", label: copy.common.home },
          { href: "/knowledge-centre", label: copy.nav.knowledge },
        ]}
        image={images.geometry}
      />
      <section className="bg-ivory py-16 sm:py-20">
        <Container>
          <ArticleBrowser articles={localized} />
        </Container>
      </section>
    </>
  );
}
