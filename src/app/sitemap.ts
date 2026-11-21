import type { MetadataRoute } from "next";
import { getArticles, getCaseStudies } from "@/lib/data/public";
import { locales } from "@/lib/i18n/locale";
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
    "/case-studies/understanding-a-modern-residence",
    "/testimonials",
    "/knowledge-centre",
    "/contact",
    "/phone-consultation",
    "/booking/confirmation",
    "/privacy-policy",
    "/terms-and-conditions",
    ...services.map((service) => `/expertise/${service.slug}`),
    ...articles.map((article) => `/knowledge-centre/${article.slug}`),
    ...studies.map((study) => `/case-studies/${study.slug}`),
  ];
  const base = siteUrl();
  return staticPaths.map((path) => {
    const url = `${base}${path || "/"}`;
    return {
      url,
      alternates: {
        languages: Object.fromEntries(locales.map((locale) => [locale, `${url}${url.includes("?") ? "&" : "?"}lang=${locale}`])),
      },
    };
  });
}
