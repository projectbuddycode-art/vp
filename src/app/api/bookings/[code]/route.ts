import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/admin";
import { isServiceRoleConfigured } from "@/lib/supabase/env";
import { readConsultationPhone } from "@/lib/payments/phone";

export async function GET(_request: Request, context: { params: Promise<{ code: string }> }) {
  if (!isServiceRoleConfigured()) {
    return NextResponse.json({ ok: false, message: "Bookings are not connected yet." }, { status: 503 });
  }
  const { code } = await context.params;
  const bookingCode = String(code || "").trim().toUpperCase();
  if (!bookingCode) return NextResponse.json({ ok: false, message: "Missing booking reference." }, { status: 400 });

  const supabase = createServiceClient();
  const { data } = await supabase
    .from("bookings")
    .select(
      "booking_code, kind, subject, full_name, language, preferred_date, preferred_time, total_amount, token_amount, remaining_amount, amount_paid, payment_status, booking_status, created_at",
    )
    .eq("booking_code", bookingCode)
    .maybeSingle();
  if (!data) return NextResponse.json({ ok: false, message: "This booking could not be found." }, { status: 404 });

  const row = data as {
    kind: string;
    payment_status: string;
  };
  const disclosePhone = row.kind === "phone" && (row.payment_status === "paid" || row.payment_status === "payment_bypassed");
  const phone = disclosePhone ? await readConsultationPhone() : "";

  return NextResponse.json({ ok: true, booking: data, phone });
}
