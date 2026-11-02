import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { editorialArticles, type Article } from "@/lib/content/articles";
import { createClient } from "@supabase/supabase-js";
import {
  defaultSettings,
  fallbackFaqs,
  type Faq,
  type SiteSettings,
} from "@/lib/site";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  category: string;
  clientConcern: string;
  propertyContext: string;
  assessment: string;
  identifiedIssues: string;
  recommendations: string;
  implementationDetails: string;
  estimatedRemedyCost: string;
  clientReportedExperience: string;
  timeline: string;
  coverImageUrl: string;
  coverImageAlt: string;
  consentStatus: string;
  seoTitle: string;
  seoDescription: string;
  media: { id: string; url: string; kind: string; alt: string }[];
};

export type Testimonial = {
  id: string;
  kind: string;
  content: string;
  videoUrl: string;
  clientName: string;
  clientImageUrl: string;
  sourceUrl: string;
};

function publicClient() {
  return createClient(supabaseUrl(), supabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function asSettings(row: Record<string, unknown> | null): SiteSettings {
  if (!row) return defaultSettings;
  const deliverables = Array.isArray(row.deliverables)
    ? row.deliverables.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : defaultSettings.deliverables;
  return {
    brandName: String(row.brand_name || defaultSettings.brandName),
    practiceName: String(row.practice_name || defaultSettings.practiceName),
    tagline: String(row.tagline || defaultSettings.tagline),
    coreMessage: String(row.core_message || defaultSettings.coreMessage),
    phone: String(row.phone || ""),
    whatsapp: String(row.whatsapp || ""),
    email: String(row.email || ""),
    instagramUrl: String(row.instagram_url || ""),
    linkedinUrl: String(row.linkedin_url || ""),
    serviceAreas: String(row.service_areas || ""),
    address: String(row.address || ""),
    consultationFee: Number(row.consultation_fee || defaultSettings.consultationFee),
    feeNote: String(row.fee_note || defaultSettings.feeNote),
    remedyNote: String(row.remedy_note || defaultSettings.remedyNote),
    onlineConsultationEnabled: Boolean(row.online_consultation_enabled),
    deliverables: deliverables.length ? deliverables : defaultSettings.deliverables,
    founderSummary: String(row.founder_summary || ""),
    founderPortraitUrl: String(row.founder_portrait_url || ""),
    heroSanskrit: String(row.hero_sanskrit || ""),
    heroTranslation: String(row.hero_translation || ""),
    bookingNote: String(row.booking_note || defaultSettings.bookingNote),
  };
}

export async function getSettings(): Promise<SiteSettings> {
  "use cache";
  cacheLife("hours");
  cacheTag("settings");
  if (!isSupabaseConfigured()) return defaultSettings;
  try {
    const { data, error } = await publicClient()
      .from("website_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (error || !data) return defaultSettings;
    return asSettings(data as Record<string, unknown>);
  } catch {
    return defaultSettings;
  }
}

export async function getFaqs(): Promise<Faq[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("faqs");
  if (!isSupabaseConfigured()) return fallbackFaqs;
  try {
    const { data, error } = await publicClient()
      .from("faqs")
      .select("id, question, answer, sort_order")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return fallbackFaqs;
    return data.map((row) => {
      const item = row as Record<string, unknown>;
      return {
        id: String(item.id),
        question: String(item.question),
        answer: String(item.answer),
        sortOrder: Number(item.sort_order || 0),
      };
    });
  } catch {
    return fallbackFaqs;
  }
}

function mapArticle(row: Record<string, unknown>, category: string): Article {
  return {
    slug: String(row.slug),
    title: String(row.title),
    excerpt: String(row.excerpt || ""),
    category: category || "Practice",
    content: String(row.content || ""),
    image: String(row.featured_image_url || "/images/geometry-study.jpg"),
    imageAlt: String(row.featured_image_alt || row.title),
    publishedAt: String(row.published_at || row.created_at || ""),
    seoTitle: String(row.seo_title || row.title),
    seoDescription: String(row.seo_description || row.excerpt || ""),
    source: "cms",
  };
}

export async function getArticles(): Promise<Article[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");
  if (!isSupabaseConfigured()) return editorialArticles;
  try {
    const { data, error } = await publicClient()
      .from("articles")
      .select("*, article_categories(name)")
      .eq("published", true)
      .order("published_at", { ascending: false });
    if (error || !data?.length) return editorialArticles;
    const cmsArticles = data.map((row) => {
      const item = row as Record<string, unknown>;
      const categoryJoin = item.article_categories as { name?: string } | { name?: string }[] | null;
      const category = Array.isArray(categoryJoin)
        ? categoryJoin[0]?.name || "Practice"
        : categoryJoin?.name || "Practice";
      return mapArticle(item, category);
    });
    const publishedSlugs = new Set(cmsArticles.map((article) => article.slug));
    return [
      ...cmsArticles,
      ...editorialArticles.filter((article) => !publishedSlugs.has(article.slug)),
    ];
  } catch {
    return editorialArticles;
  }
}

export async function getArticle(slug: string) {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

function mapStudy(row: Record<string, unknown>): CaseStudy {
  const mediaRows = Array.isArray(row.case_study_media) ? row.case_study_media : [];
  return {
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    category: String(row.category),
    clientConcern: String(row.client_concern || ""),
    propertyContext: String(row.property_context || ""),
    assessment: String(row.assessment || ""),
    identifiedIssues: String(row.identified_issues || ""),
    recommendations: String(row.recommendations || ""),
    implementationDetails: String(row.implementation_details || ""),
    estimatedRemedyCost: String(row.estimated_remedy_cost || ""),
    clientReportedExperience: String(row.client_reported_experience || ""),
    timeline: String(row.timeline || ""),
    coverImageUrl: String(row.cover_image_url || ""),
    coverImageAlt: String(row.cover_image_alt || row.title),
    consentStatus: String(row.consent_status || "pending"),
    seoTitle: String(row.seo_title || row.title),
    seoDescription: String(row.seo_description || ""),
    media: mediaRows.map((media) => {
      const item = media as Record<string, unknown>;
      return {
        id: String(item.id),
        url: String(item.url || ""),
        kind: String(item.kind || "other"),
        alt: String(item.alt || ""),
      };
    }),
  };
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("case-studies");
  if (!isSupabaseConfigured()) return [];
  try {
    const { data, error } = await publicClient()
      .from("case_studies")
      .select("*, case_study_media(id, url, kind, alt, sort_order)")
      .eq("published", true)
      .eq("consent_status", "granted")
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map((row) => mapStudy(row as Record<string, unknown>));
  } catch {
    return [];
  }
}

export async function getCaseStudy(slug: string) {
  const studies = await getCaseStudies();
  return studies.find((study) => study.slug === slug) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("testimonials");
  if (!isSupabaseConfigured()) return [];
  try {
    const { data, error } = await publicClient()
      .from("testimonials")
      .select("id, kind, content, video_url, client_name, client_image_url, source_url")
      .eq("approved", true)
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map((row) => {
      const item = row as Record<string, unknown>;
      return {
        id: String(item.id),
        kind: String(item.kind || "written"),
        content: String(item.content || ""),
        videoUrl: String(item.video_url || ""),
        clientName: String(item.client_name || ""),
        clientImageUrl: String(item.client_image_url || ""),
        sourceUrl: String(item.source_url || ""),
      };
    });
  } catch {
    return [];
  }
}
