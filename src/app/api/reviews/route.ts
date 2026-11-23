import { NextResponse } from "next/server";
import { notifyReviewSubmitted } from "@/lib/notifications";
import { rateLimit } from "@/lib/rate-limit";
import { createReviewToken, reviewSubmissionHash } from "@/lib/reviews/tokens";
import { createServiceClient } from "@/lib/supabase/admin";
import { isServiceRoleConfigured } from "@/lib/supabase/env";
import { siteUrl } from "@/lib/utils";
import { reviewSchema } from "@/lib/validation/review";

function asBoolean(value: FormDataEntryValue | null) {
  return value === "true" || value === "on" || value === "1";
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const limited = rateLimit(`review:${ip}`, 3, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, message: "Too many review submissions from this network. Please try again later." },
      { status: 429 },
    );
  }

  if (!isServiceRoleConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message: "Review storage is not configured yet. Please contact the consultancy by phone or WhatsApp.",
      },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "The form could not be read." }, { status: 400 });
  }

  if (String(form.get("website") || "").trim()) {
    return NextResponse.json({ ok: true, reviewId: "SJ-RECEIVED" });
  }

  const startedAt = Number(form.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 1500) {
    return NextResponse.json(
      { ok: false, message: "Please take a moment to review the form before sending it." },
      { status: 400 },
    );
  }

  const parsed = reviewSchema.safeParse({
    clientName: form.get("clientName"),
    clientEmail: String(form.get("clientEmail") || ""),
    rating: form.get("rating"),
    reviewText: form.get("reviewText"),
    experienceText: String(form.get("experienceText") || ""),
    publishConsent: asBoolean(form.get("publishConsent")),
    website: "",
    startedAt: String(form.get("startedAt") || ""),
  });

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message || "Please check the form and try again.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }

  const data = parsed.data;
  const submissionHash = reviewSubmissionHash(data.clientName, data.clientEmail, data.reviewText);
  const supabase = createServiceClient();

  const { data: existing } = await supabase
    .from("client_reviews")
    .select("id")
    .eq("submission_hash", submissionHash)
    .gte("submitted_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
    .limit(1)
    .maybeSingle();

  if (existing?.id) {
    return NextResponse.json(
      { ok: false, message: "A similar review was already received. Thank you." },
      { status: 409 },
    );
  }

  const { data: inserted, error } = await supabase
    .from("client_reviews")
    .insert({
      client_name: data.clientName,
      client_email: data.clientEmail,
      rating: data.rating,
      review_text: data.reviewText,
      experience_text: data.experienceText,
      publish_consent: data.publishConsent,
      status: "PENDING",
      submission_hash: submissionHash,
    })
    .select("id")
    .single();

  if (error || !inserted?.id) {
    return NextResponse.json(
      { ok: false, message: "The review could not be saved. Please try again." },
      { status: 500 },
    );
  }

  const reviewId = String(inserted.id);
  const { raw, hash } = createReviewToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const { error: tokenError } = await supabase.from("client_review_tokens").insert({
    review_id: reviewId,
    token_hash: hash,
    expires_at: expiresAt,
  });

  const moderationUrl = tokenError
    ? `${siteUrl()}/admin/reviews`
    : `${siteUrl()}/admin/reviews/moderate?token=${encodeURIComponent(raw)}`;

  const notify = await notifyReviewSubmitted({
    reviewId,
    clientName: data.clientName,
    rating: data.rating,
    reviewText: data.reviewText,
    experienceText: data.experienceText,
    moderationUrl,
  });

  await supabase
    .from("client_reviews")
    .update({
      notify_email_sent: notify.sent,
      notify_email_error: notify.sent ? "" : notify.reason || "Email could not be sent.",
    })
    .eq("id", reviewId);

  return NextResponse.json({
    ok: true,
    reviewId,
    emailNote: notify.sent ? "" : notify.reason,
  });
}
