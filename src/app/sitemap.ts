import type { MetadataRoute } from "next";
import { getArticles, getCaseStudies } from "@/lib/data/public";
import { services } from "@/lib/site";
import { siteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, studies] = await Promise.all([getArticles(), getCaseStudies()]);
  const staticPaths = [
    "",
    "/about",
    "/understanding-vastu",
    "/approach",
    "/expertise",
    "/case-studies",
    "/testimonials",
    "/knowledge-centre",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
    ...services.map((service) => `/expertise/${service.slug}`),
    ...articles.map((article) => `/knowledge-centre/${article.slug}`),
    ...studies.map((study) => `/case-studies/${study.slug}`),
  ];
  return staticPaths.map((path) => ({
    url: `${siteUrl()}${path || "/"}`,
  }));
}
