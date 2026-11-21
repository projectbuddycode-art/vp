import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/admin";
import { isServiceRoleConfigured } from "@/lib/supabase/env";
import { readConsultationPhone } from "@/lib/payments/phone";
import { verifyCheckoutSignature } from "@/lib/payments/razorpay";

export async function POST(request: Request) {
  if (!isServiceRoleConfigured()) {
    return NextResponse.json({ ok: false, message: "Bookings are not connected yet." }, { status: 503 });
  }
  const body = (await request.json().catch(() => null)) as {
    bookingCode?: string;
    orderId?: string;
    paymentId?: string;
    signature?: string;
  } | null;
  const bookingCode = String(body?.bookingCode || "");
  const orderId = String(body?.orderId || "");
  const paymentId = String(body?.paymentId || "");
  const signature = String(body?.signature || "");
  if (!bookingCode || !orderId || !paymentId || !signature) {
    return NextResponse.json({ ok: false, message: "The payment confirmation was incomplete." }, { status: 400 });
  }
  if (!verifyCheckoutSignature(orderId, paymentId, signature)) {
    return NextResponse.json({ ok: false, message: "The payment could not be verified." }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data } = await supabase
    .from("bookings")
    .select("id, kind, gateway_order_id, payment_status, token_amount, remaining_amount, total_amount")
    .eq("booking_code", bookingCode)
    .maybeSingle();
  const row = data as {
    id: string;
    kind: string;
    gateway_order_id: string | null;
    payment_status: string;
    token_amount: number;
    remaining_amount: number;
    total_amount: number;
  } | null;
  if (!row || row.gateway_order_id !== orderId) {
    return NextResponse.json({ ok: false, message: "This payment does not match a booking." }, { status: 404 });
  }
  if (row.payment_status === "payment_bypassed") {
    return NextResponse.json({ ok: false, message: "This booking used temporary payment bypass and cannot be marked paid from checkout." }, { status: 409 });
  }

  if (row.payment_status !== "paid") {
    const remaining = Math.max(0, Number(row.total_amount) - Number(row.token_amount));
    const { error } = await supabase
      .from("bookings")
      .update({
        payment_status: "paid",
        gateway_payment_id: paymentId,
        amount_paid: row.token_amount,
        remaining_amount: remaining,
        confirmed_at: new Date().toISOString(),
      })
      .eq("id", row.id)
      .eq("gateway_order_id", orderId);
    if (error) return NextResponse.json({ ok: false, message: "The payment was verified but could not be recorded." }, { status: 500 });
    await supabase.from("payment_events").insert({
      booking_id: row.id,
      gateway_event_id: `checkout:${paymentId}`,
      event_type: "payment.captured",
      payload: { orderId, paymentId },
    });
  }

  const phone = row.kind === "phone" ? await readConsultationPhone() : "";
  const remaining = Math.max(0, Number(row.total_amount) - Number(row.token_amount));
  return NextResponse.json({
    ok: true,
    paid: true,
    total: row.total_amount,
    token: row.token_amount,
    remaining,
    phone: row.kind === "phone" ? phone : "",
    appointment: "requested",
  });
}
