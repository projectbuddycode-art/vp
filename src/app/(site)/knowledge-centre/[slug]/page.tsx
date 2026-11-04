import Image from "next/image";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/content/Markdown";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getArticle, getArticles } from "@/lib/data/public";
import { pageMetadata } from "@/lib/seo";
import { readingMinutes, siteUrl } from "@/lib/utils";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return pageMetadata({ title: "Article", description: "Knowledge centre", path: "/knowledge-centre" });
  return pageMetadata({
    title: article.seoTitle,
    description: article.seoDescription,
    path: `/knowledge-centre/${article.slug}`,
    image: article.image,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const articles = await getArticles();
  const related = articles.filter((item) => item.slug !== article.slug && item.category === article.category).slice(0, 2);

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
            { href: "/", label: "Home" },
            { href: "/knowledge-centre", label: "Knowledge centre" },
            { href: `/knowledge-centre/${article.slug}`, label: article.title },
          ]}
        />
        <p className="font-serif text-xl italic text-bark">{article.category}</p>
        <h1 className="mt-4 font-serif text-5xl leading-[0.98] sm:text-6xl">{article.title}</h1>
        <p className="mt-4 text-sm text-deep/70">
          Written for the practice of Mr. Sanjeev Jain. Updated {article.publishedAt}. {readingMinutes(article.content)} minute read. This note explains an idea. It does not read your property.
        </p>
        <div className="relative mt-8 aspect-[16/9]">
          <Image src={article.image} alt={article.imageAlt} fill priority className="object-cover" sizes="(min-width: 768px) 768px, 100vw" />
        </div>
        <div className="mt-10">
          <Markdown source={article.content} />
        </div>
        <div className="mt-12">
          <Button href="/contact">Book a personal consultation</Button>
        </div>
        {related.length > 0 ? (
          <aside className="mt-14 border-t border-deep/10 pt-8">
            <h2 className="font-serif text-3xl">Continue reading</h2>
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
