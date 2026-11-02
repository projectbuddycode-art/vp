"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { YantraFrame } from "@/components/animations/YantraFrame";
import type { Article } from "@/lib/content/articles";
import { articleCategories } from "@/lib/content/articles";

export function ArticleBrowser({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...articleCategories.filter((item) => articles.some((article) => article.category === item)), ...articles.map((article) => article.category).filter((item) => !articleCategories.includes(item))];
  const uniqueCategories = [...new Set(categories)];

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory = category === "All" || article.category === category;
      const matchesQuery =
        !needle ||
        article.title.toLowerCase().includes(needle) ||
        article.excerpt.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [articles, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <label className="block w-full max-w-md">
          <span className="label">Search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="field"
            placeholder="Search articles"
            type="search"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Article categories">
          {uniqueCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`px-3 py-2 text-[0.68rem] tracking-[0.14em] uppercase transition-colors hover:border-gold ${category === item ? "bg-deep text-ivory" : "border border-deep/15"}`}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {visible.length === 0 ? (
        <p className="mt-10 text-deep/70">No articles match that search.</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((article) => (
            <Link key={article.slug} href={`/knowledge-centre/${article.slug}`} className="group border border-deep/10 bg-ivory">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={article.image} alt={article.imageAlt} fill className="object-cover" sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw" />
                <YantraFrame />
              </div>
              <div className="p-6">
                <p className="text-[0.68rem] tracking-[0.16em] text-gold uppercase">{article.category}</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight group-hover:text-terracotta">{article.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-deep/70">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
