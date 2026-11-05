"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/admin";
import { isServiceRoleConfigured, isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { caseCategoryValues, consentValues, leadStatusValues } from "@/lib/site";
import { csvCell, slugify } from "@/lib/utils";
import { safeFileName, validateUpload } from "@/lib/validation/files";

async function adminDb() {
  if (!isSupabaseConfigured()) throw new Error("Supabase is not configured.");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (profile?.role !== "admin") throw new Error("This account cannot change studio records.");
  return { supabase, userId: user.id };
}

function one(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function checked(formData: FormData, key: string) {
  const value = formData.get(key);
  return value === "on" || value === "true";
}

async function uploadPublicImage(file: File, folder: string) {
  const checkedFile = await validateUpload(file);
  if (!checkedFile.ok) throw new Error(checkedFile.message);
  if (checkedFile.contentType === "application/pdf") throw new Error("Use a JPG, PNG, or WEBP image.");
  if (!isServiceRoleConfigured()) throw new Error("The service role key is required before files can be uploaded.");
  const service = createServiceClient();
  const path = `${folder}/${crypto.randomUUID()}-${safeFileName(file.name)}`;
  const { error } = await service.storage.from("public-media").upload(path, Buffer.from(await file.arrayBuffer()), {
    contentType: checkedFile.contentType,
    upsert: false,
  });
  if (error) throw new Error(error.message);
  return service.storage.from("public-media").getPublicUrl(path).data.publicUrl;
}

export async function signOut() {
  if (!isSupabaseConfigured()) redirect("/admin/login");
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateEnquiry(formData: FormData) {
  const { supabase } = await adminDb();
  const id = one(formData, "id");
  const status = one(formData, "status");
  if (!leadStatusValues.includes(status as (typeof leadStatusValues)[number])) {
    throw new Error("Unknown status.");
  }
  const followUp = one(formData, "follow_up_at");
  const { error } = await supabase
    .from("enquiries")
    .update({ status, follow_up_at: followUp || null })
    .eq("id", id);
  if (error) throw new Error(error.message);
  if (status === "consultation_scheduled" && followUp) {
    await supabase.from("consultations").insert({
      enquiry_id: id,
      scheduled_at: followUp,
      mode: one(formData, "consultation_mode") || "on_site",
      status: "scheduled",
      notes: one(formData, "schedule_note"),
    });
  }
  redirect(`/admin/leads/${id}`);
}

export async function addEnquiryNote(formData: FormData) {
  const { supabase, userId } = await adminDb();
  const id = one(formData, "id");
  const body = one(formData, "note");
  if (!body) redirect(`/admin/leads/${id}`);
  const { error } = await supabase.from("enquiry_notes").insert({ enquiry_id: id, author_id: userId, body });
  if (error) throw new Error(error.message);
  redirect(`/admin/leads/${id}`);
}

export async function exportEnquiries() {
  const { supabase } = await adminDb();
  const { data, error } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  const rows = (data || []) as Record<string, unknown>[];
  const columns = [
    "enquiry_code",
    "created_at",
    "status",
    "full_name",
    "mobile",
    "email",
    "city",
    "property_type",
    "consultation_category",
    "consultation_mode",
    "preferred_date",
    "follow_up_at",
    "marketing_consent",
    "property_description",
    "client_concern",
  ];
  const lines = [columns.join(",")];
  rows.forEach((row) => {
    lines.push(columns.map((column) => csvCell(row[column])).join(","));
  });
  return lines.join("\n");
}

export async function saveCaseStudy(formData: FormData) {
  const { supabase } = await adminDb();
  const id = one(formData, "id");
  const title = one(formData, "title");
  const slug = slugify(one(formData, "slug") || title);
  const category = one(formData, "category");
  const consent = one(formData, "consent_status");
  if (!title || !slug) throw new Error("A title is required.");
  if (!caseCategoryValues.includes(category as (typeof caseCategoryValues)[number])) throw new Error("Choose a category.");
  if (!consentValues.includes(consent as (typeof consentValues)[number])) throw new Error("Choose a consent status.");
  const published = checked(formData, "published");
  if (published && consent !== "granted") {
    throw new Error("A study can be published only after client consent is marked as granted.");
  }

  let cover = one(formData, "existing_cover");
  const coverFile = formData.get("cover");
  if (coverFile instanceof File && coverFile.size > 0) cover = await uploadPublicImage(coverFile, "case-studies");

  const payload = {
    title,
    slug,
    category,
    client_concern: one(formData, "client_concern"),
    property_context: one(formData, "property_context"),
    assessment: one(formData, "assessment"),
    identified_issues: one(formData, "identified_issues"),
    recommendations: one(formData, "recommendations"),
    implementation_details: one(formData, "implementation_details"),
    estimated_remedy_cost: one(formData, "estimated_remedy_cost"),
    client_reported_experience: one(formData, "client_reported_experience"),
    timeline: one(formData, "timeline"),
    cover_image_url: cover,
    cover_image_alt: one(formData, "cover_image_alt") || title,
    consent_status: consent,
    published,
    seo_title: one(formData, "seo_title") || title,
    seo_description: one(formData, "seo_description"),
  };

  let studyId = id;
  if (id) {
    const { error } = await supabase.from("case_studies").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { data, error } = await supabase.from("case_studies").insert(payload).select("id").single();
    if (error || !data) throw new Error(error?.message || "The study could not be saved.");
    studyId = String(data.id);
  }

  for (const kind of ["before", "after"] as const) {
    const file = formData.get(kind);
    if (file instanceof File && file.size > 0) {
      const url = await uploadPublicImage(file, "case-studies");
      await supabase.from("case_study_media").insert({
        case_study_id: studyId,
        url,
        kind,
        alt: one(formData, `${kind}_alt`) || `${kind} photograph`,
      });
    }
  }

  updateTag("case-studies");
  redirect("/admin/case-studies");
}

export async function deleteCaseStudy(id: string) {
  const { supabase } = await adminDb();
  const { error } = await supabase.from("case_studies").delete().eq("id", id);
  if (error) throw new Error(error.message);
  updateTag("case-studies");
  redirect("/admin/case-studies");
}

export async function saveTestimonial(formData: FormData) {
  const { supabase } = await adminDb();
  const id = one(formData, "id");
  const approved = checked(formData, "approved");
  const published = checked(formData, "published");
  if (published && !approved) throw new Error("Approve the testimonial before publishing it.");
  let image = one(formData, "existing_image");
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) image = await uploadPublicImage(file, "testimonials");
  const payload = {
    kind: one(formData, "kind") === "video" ? "video" : "written",
    content: one(formData, "content"),
    video_url: one(formData, "video_url"),
    client_name: one(formData, "client_name"),
    client_image_url: image,
    source_url: one(formData, "source_url"),
    approved,
    published,
  };
  if (!payload.content && payload.kind === "written") throw new Error("A written testimonial needs the client’s words.");
  const query = id
    ? supabase.from("testimonials").update(payload).eq("id", id)
    : supabase.from("testimonials").insert(payload);
  const { error } = await query;
  if (error) throw new Error(error.message);
  updateTag("testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  const { supabase } = await adminDb();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  updateTag("testimonials");
  redirect("/admin/testimonials");
}

export async function saveArticle(formData: FormData) {
  const { supabase } = await adminDb();
  const id = one(formData, "id");
  const title = one(formData, "title");
  const slug = slugify(one(formData, "slug") || title);
  if (!title || !slug) throw new Error("A title is required.");
  let image = one(formData, "existing_image");
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) image = await uploadPublicImage(file, "articles");
  const categoryName = one(formData, "category") || "Practice";
  let categoryId = one(formData, "category_id");
  if (!categoryId) {
    const { data: existing } = await supabase.from("article_categories").select("id").eq("name", categoryName).maybeSingle();
    if (existing?.id) categoryId = String(existing.id);
    else {
      const { data: created, error } = await supabase
        .from("article_categories")
        .insert({ name: categoryName, slug: slugify(categoryName) })
        .select("id")
        .single();
      if (error || !created) throw new Error(error?.message || "The category could not be saved.");
      categoryId = String(created.id);
    }
  }
  const published = checked(formData, "published");
  const payload = {
    title,
    slug,
    excerpt: one(formData, "excerpt"),
    content: one(formData, "content"),
    category_id: categoryId,
    featured_image_url: image,
    featured_image_alt: one(formData, "image_alt") || title,
    published,
    published_at: published ? new Date().toISOString() : null,
    seo_title: one(formData, "seo_title") || title,
    seo_description: one(formData, "seo_description"),
  };
  const query = id ? supabase.from("articles").update(payload).eq("id", id) : supabase.from("articles").insert(payload);
  const { error } = await query;
  if (error) throw new Error(error.message);
  updateTag("articles");
  redirect("/admin/articles");
}

export async function deleteArticle(id: string) {
  const { supabase } = await adminDb();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  updateTag("articles");
  redirect("/admin/articles");
}

export async function saveFaq(formData: FormData) {
  const { supabase } = await adminDb();
  const id = one(formData, "id");
  const payload = {
    question: one(formData, "question"),
    answer: one(formData, "answer"),
    sort_order: Number(one(formData, "sort_order") || 0),
    published: checked(formData, "published"),
  };
  if (!payload.question || !payload.answer) throw new Error("A question and an answer are required.");
  const query = id ? supabase.from("faqs").update(payload).eq("id", id) : supabase.from("faqs").insert(payload);
  const { error } = await query;
  if (error) throw new Error(error.message);
  updateTag("faqs");
  redirect("/admin/faqs");
}

export async function saveSettings(formData: FormData) {
  const { supabase } = await adminDb();
  const deliverables = one(formData, "deliverables")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  let portrait = one(formData, "existing_portrait");
  const file = formData.get("portrait");
  if (file instanceof File && file.size > 0) portrait = await uploadPublicImage(file, "brand");
  const payload = {
    id: 1,
    brand_name: one(formData, "brand_name") || "STHAPATYA",
    practice_name: one(formData, "practice_name") || "Vedic Vastu Consultancy",
    tagline: one(formData, "tagline"),
    core_message: one(formData, "core_message"),
    phone: one(formData, "phone"),
    whatsapp: one(formData, "whatsapp"),
    email: one(formData, "email"),
    instagram_url: one(formData, "instagram_url"),
    linkedin_url: one(formData, "linkedin_url"),
    service_areas: one(formData, "service_areas"),
    address: one(formData, "address"),
    consultation_fee: Number(one(formData, "consultation_fee") || 10000),
    fee_note: one(formData, "fee_note"),
    remedy_note: one(formData, "remedy_note"),
    online_consultation_enabled: checked(formData, "online_consultation_enabled"),
    deliverables,
    founder_summary: one(formData, "founder_summary"),
    founder_portrait_url: portrait,
    hero_sanskrit: one(formData, "hero_sanskrit"),
    hero_translation: one(formData, "hero_translation"),
    booking_note: one(formData, "booking_note"),
  };
  const { error } = await supabase.from("website_settings").upsert(payload);
  if (error) throw new Error(error.message);
  updateTag("settings");
  redirect("/admin/settings");
}
