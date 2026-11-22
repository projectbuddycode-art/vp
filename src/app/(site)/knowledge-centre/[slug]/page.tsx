import Image from "next/image";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/content/Markdown";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getArticle, getArticles } from "@/lib/data/public";
import { localizeArticle, localizeArticles } from "@/lib/i18n/article-bodies";
import { getCopy, getLocale } from "@/lib/i18n/get-locale";
import { pageMetadata } from "@/lib/seo";
import { readingMinutes, siteUrl } from "@/lib/utils";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, locale] = await Promise.all([getArticle(slug), getLocale()]);
  if (!article) return pageMetadata({ title: "Article", description: "Knowledge centre", path: "/knowledge-centre" });
  const localized = localizeArticle(article, locale);
  return pageMetadata({
    title: localized.seoTitle,
    description: localized.seoDescription,
    path: `/knowledge-centre/${localized.slug}`,
    image: localized.image,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [raw, copy, locale] = await Promise.all([getArticle(slug), getCopy(), getLocale()]);
  if (!raw) notFound();
  const article = localizeArticle(raw, locale);
  const articles = localizeArticles(await getArticles(), locale);
  const related = articles.filter((item) => item.slug !== article.slug && item.category === article.category).slice(0, 2);
  const minutes = readingMinutes(article.content);
  const byline = copy.pages.knowledge.byline.replace("{date}", article.publishedAt).replace("{minutes}", String(minutes));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { "@type": "Person", name: "Sanjeev Jain" },
    image: `${siteUrl()}${article.image}`,
    mainEntityOfPage: `${siteUrl()}/knowledge-centre/${article.slug}`,
  };

  return (
    <article className="bg-ivory pb-20 pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="max-w-3xl">
        <Breadcrumbs
          items={[
            { href: "/", label: copy.common.home },
            { href: "/knowledge-centre", label: copy.nav.knowledge },
            { href: `/knowledge-centre/${article.slug}`, label: article.title },
          ]}
        />
        <p className="font-serif text-xl italic text-bark">{article.category}</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.98] sm:text-6xl">{article.title}</h1>
        <p className="mt-4 text-sm text-deep/70">{byline}</p>
        <div className="relative mt-8 aspect-[16/9]">
          <Image src={article.image} alt={article.imageAlt} fill priority className="object-cover" sizes="(min-width: 768px) 768px, 100vw" />
        </div>
        <div className="mt-10">
          <Markdown source={article.content} />
        </div>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          {article.relatedHref ? (
            <Button href={article.relatedHref} variant="line">
              {copy.pages.knowledge.relatedPage}
            </Button>
          ) : null}
          <Button href="/contact">{copy.pages.knowledge.bookCta}</Button>
        </div>
        {related.length > 0 ? (
          <aside className="mt-14 border-t border-deep/10 pt-8">
            <h2 className="font-serif text-3xl">{copy.pages.knowledge.continueReading}</h2>
            <ul className="mt-4 space-y-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <a className="underline decoration-gold underline-offset-4" href={`/knowledge-centre/${item.slug}`}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </Container>
    </article>
  );
}
