import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { notifyEnquiry } from "@/lib/notifications";
import { rateLimit } from "@/lib/rate-limit";
import { createServiceClient } from "@/lib/supabase/admin";
import { isServiceRoleConfigured } from "@/lib/supabase/env";
import { normalizeIndianMobile } from "@/lib/utils";
import { enquirySchema, parsePreferredDate } from "@/lib/validation/enquiry";
import { MAX_UPLOAD_FILES, safeFileName, validateUpload } from "@/lib/validation/files";

function asBoolean(value: FormDataEntryValue | null) {
  return value === "true" || value === "on";
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const limited = rateLimit(`enquiry:${ip}`);
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, message: "Too many enquiries from this network. Please try again in a little while." },
      { status: 429 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "The form could not be read." }, { status: 400 });
  }

  if (String(form.get("website") || "").trim()) {
    return NextResponse.json({ ok: true, enquiryCode: "SJ-RECEIVED" });
  }

  const startedAt = Number(form.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 1500) {
    return NextResponse.json(
      { ok: false, message: "Please take a moment to review the form before sending it." },
      { status: 400 },
    );
  }

  const parsed = enquirySchema.safeParse({
    fullName: form.get("fullName"),
    mobile: form.get("mobile"),
    email: form.get("email"),
    city: form.get("city"),
    propertyType: form.get("propertyType"),
    consultationCategory: form.get("consultationCategory"),
    consultationMode: form.get("consultationMode"),
    preferredDate: String(form.get("preferredDate") || ""),
    propertyDescription: String(form.get("propertyDescription") || ""),
    clientConcern: form.get("clientConcern"),
    privacyConsent: asBoolean(form.get("privacyConsent")),
    marketingConsent: asBoolean(form.get("marketingConsent")),
    website: "",
    startedAt: String(form.get("startedAt") || ""),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message || "Please check the form." },
      { status: 400 },
    );
  }

  const preferred = parsePreferredDate(parsed.data.preferredDate);
  if (!preferred.ok) {
    return NextResponse.json({ ok: false, message: preferred.message }, { status: 400 });
  }

  const files = form
    .getAll("attachments")
    .filter((item): item is File => item instanceof File && item.size > 0);
  if (files.length > MAX_UPLOAD_FILES) {
    return NextResponse.json({ ok: false, message: "Please attach no more than 5 files." }, { status: 400 });
  }
  for (const file of files) {
    const checked = await validateUpload(file);
    if (!checked.ok) return NextResponse.json({ ok: false, message: checked.message }, { status: 400 });
  }

  if (!isServiceRoleConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        code: "database_unconfigured",
        message:
          "Your details were checked, but the private enquiry desk is not connected yet. Nothing was stored.",
      },
      { status: 503 },
    );
  }

  const mobile = normalizeIndianMobile(parsed.data.mobile);
  if (!mobile) {
    return NextResponse.json({ ok: false, message: "Enter a valid 10-digit Indian mobile number." }, { status: 400 });
  }

  const fingerprint = createHash("sha256")
    .update(`${parsed.data.email.toLowerCase()}|${mobile}|${parsed.data.consultationCategory}`)
    .digest("hex");
  const supabase = createServiceClient();

  if (parsed.data.consultationMode === "online") {
    const { data: settings } = await supabase
      .from("website_settings")
      .select("online_consultation_enabled")
      .eq("id", 1)
      .maybeSingle();
    if (!settings?.online_consultation_enabled) {
      return NextResponse.json(
        {
          ok: false,
          message: "Online consultation is not currently offered. Choose an on-site visit or an initial discussion.",
        },
        { status: 400 },
      );
    }
  }

  const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  const { data: existing } = await supabase
    .from("enquiries")
    .select("enquiry_code")
    .eq("fingerprint", fingerprint)
    .gte("created_at", since)
    .maybeSingle();
  if (existing?.enquiry_code) {
    return NextResponse.json({ ok: true, enquiryCode: existing.enquiry_code, duplicate: true });
  }

  let enquiryId = "";
  let enquiryCode = "";
  for (let attempt = 0; attempt < 5; attempt += 1) {
    enquiryCode = `SJ-${new Date().getFullYear()}-${randomBytes(3).toString("hex").toUpperCase()}`;
    const { data, error } = await supabase
      .from("enquiries")
      .insert({
        enquiry_code: enquiryCode,
        full_name: parsed.data.fullName,
        mobile,
        email: parsed.data.email.toLowerCase(),
        city: parsed.data.city,
        property_type: parsed.data.propertyType,
        consultation_category: parsed.data.consultationCategory,
        consultation_mode: parsed.data.consultationMode,
        preferred_date: preferred.date,
        property_description: parsed.data.propertyDescription || "",
        client_concern: parsed.data.clientConcern,
        privacy_consent: true,
        marketing_consent: Boolean(parsed.data.marketingConsent),
        status: "new",
        fingerprint,
      })
      .select("id, enquiry_code")
      .single();
    if (!error && data) {
      enquiryId = String(data.id);
      enquiryCode = String(data.enquiry_code);
      break;
    }
  }

  if (!enquiryId) {
    return NextResponse.json({ ok: false, message: "The enquiry could not be saved. Please try again." }, { status: 500 });
  }

  const paths: string[] = [];
  for (const file of files) {
    const checked = await validateUpload(file);
    if (!checked.ok) continue;
    const path = `${enquiryId}/${crypto.randomUUID()}-${safeFileName(file.name)}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    const { error } = await supabase.storage.from("enquiry-uploads").upload(path, bytes, {
      contentType: checked.contentType,
      upsert: false,
    });
    if (!error) paths.push(path);
  }
  if (paths.length) {
    await supabase.from("enquiries").update({ attachment_paths: paths }).eq("id", enquiryId);
  }

  const ipHash = createHash("sha256")
    .update(`${process.env.CONSENT_IP_SALT || "sj-consent"}:${ip}`)
    .digest("hex");
  await supabase.from("consent_records").insert([
    { enquiry_id: enquiryId, consent_type: "privacy", granted: true, ip_hash: ipHash },
    {
      enquiry_id: enquiryId,
      consent_type: "marketing",
      granted: Boolean(parsed.data.marketingConsent),
      ip_hash: ipHash,
    },
  ]);

  const email = await notifyEnquiry({
    enquiryCode,
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    mobile,
    city: parsed.data.city,
    propertyType: parsed.data.propertyType,
    category: parsed.data.consultationCategory,
    mode: parsed.data.consultationMode,
    concern: parsed.data.clientConcern,
  });

  return NextResponse.json({
    ok: true,
    enquiryCode,
    emailSent: email.visitorNotified,
    emailNote: email.emailNote,
  });
}
