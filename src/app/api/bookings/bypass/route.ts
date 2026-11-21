import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { createServiceClient } from "@/lib/supabase/admin";
import { isServiceRoleConfigured } from "@/lib/supabase/env";
import { getSettings } from "@/lib/data/public";
import { phoneFees, visitFees } from "@/lib/payments/fees";
import { bookingCode } from "@/lib/payments/razorpay";
import { paymentBypassEnabled } from "@/lib/payments/config";
import { readConsultationPhone } from "@/lib/payments/phone";
import { isLocale } from "@/lib/i18n/locale";
import { normalizeIndianMobile } from "@/lib/utils";
import { parsePreferredDate } from "@/lib/validation/enquiry";

const subjects = new Set(["money", "health"]);
const times = new Set(["morning", "afternoon", "evening"]);

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!rateLimit(`booking-bypass:${ip}`, 8).ok) {
    return NextResponse.json({ ok: false, message: "Too many booking attempts. Please wait and try again." }, { status: 429 });
  }
  if (!paymentBypassEnabled()) {
    return NextResponse.json({ ok: false, message: "Temporary payment bypass is not enabled." }, { status: 403 });
  }
  if (!isServiceRoleConfigured()) {
    return NextResponse.json({ ok: false, message: "Bookings are not being stored yet." }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ ok: false, message: "The form could not be read." }, { status: 400 });

  const kind = body.kind === "on_site" ? "on_site" : body.kind === "phone" ? "phone" : "";
  const fullName = String(body.fullName || "").trim();
  const mobile = normalizeIndianMobile(String(body.mobile || ""));
  const language = isLocale(String(body.language || "")) ? String(body.language) : "en";
  const concern = String(body.concern || "").trim().slice(0, 2000);
  const subject = String(body.subject || "");
  const time = String(body.time || "");
  const date = parsePreferredDate(String(body.preferredDate || ""));
  if (!kind || fullName.length < 2 || !mobile || body.terms !== true) {
    return NextResponse.json({ ok: false, message: "Please complete the required details and accept the terms." }, { status: 400 });
  }
  if (!date.ok) return NextResponse.json({ ok: false, message: date.message }, { status: 400 });
  if (kind === "phone" && (!subjects.has(subject) || !times.has(time))) {
    return NextResponse.json({ ok: false, message: "Choose a consultation subject and a preferred time." }, { status: 400 });
  }

  const settings = await getSettings();
  const fees = kind === "phone" ? phoneFees() : visitFees(settings.consultationFee, settings.bookingToken);
  const code = bookingCode();
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      booking_code: code,
      kind,
      subject: kind === "phone" ? subject : null,
      full_name: fullName,
      mobile,
      language,
      preferred_date: date.date,
      preferred_time: kind === "phone" ? time : "",
      concern,
      service_slug: kind === "phone" ? "phone-consultation" : "on-site-visit",
      total_amount: fees.total,
      token_amount: fees.token,
      remaining_amount: fees.total,
      amount_paid: 0,
      payment_status: "payment_bypassed",
      booking_status: "requested",
      gateway: "bypass",
    })
    .select("id")
    .single();
  if (error || !data) {
    return NextResponse.json({ ok: false, message: "The booking could not be saved." }, { status: 500 });
  }

  await supabase.from("payment_events").insert({
    booking_id: (data as { id: string }).id,
    gateway_event_id: `bypass:${code}`,
    event_type: "payment.bypassed",
    payload: { bookingCode: code, amountPaid: 0, remaining: fees.total },
  });

  const phone = kind === "phone" ? await readConsultationPhone() : "";
  return NextResponse.json({
    ok: true,
    bookingCode: code,
    total: fees.total,
    token: fees.token,
    remaining: fees.total,
    amountPaid: 0,
    paymentStatus: "payment_bypassed",
    bookingStatus: "requested",
    phone,
    bypass: true,
  });
}
