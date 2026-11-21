import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/admin";
import { isServiceRoleConfigured } from "@/lib/supabase/env";
import { createRazorpayOrder, razorpayConfigured, razorpayKeyId } from "@/lib/payments/razorpay";

export async function POST(request: Request) {
  if (!isServiceRoleConfigured()) {
    return NextResponse.json({ ok: false, message: "Bookings are not connected yet." }, { status: 503 });
  }
  if (!razorpayConfigured()) {
    return NextResponse.json(
      { ok: false, code: "unconfigured", message: "The payment desk is not connected yet. Nothing was charged." },
      { status: 503 },
    );
  }
  const body = (await request.json().catch(() => null)) as { bookingCode?: string } | null;
  const code = String(body?.bookingCode || "");
  const supabase = createServiceClient();
  const { data } = await supabase.from("bookings").select("id, booking_code, token_amount, payment_status, gateway_order_id").eq("booking_code", code).maybeSingle();
  const row = data as { id: string; token_amount: number; payment_status: string; gateway_order_id: string | null } | null;
  if (!row) return NextResponse.json({ ok: false, message: "This booking could not be found." }, { status: 404 });
  if (row.payment_status === "paid") {
    return NextResponse.json({ ok: false, message: "This booking is already paid." }, { status: 409 });
  }
  const orderId = row.gateway_order_id || (await createRazorpayOrder(row.token_amount, code));
  if (!row.gateway_order_id) {
    await supabase.from("bookings").update({ gateway_order_id: orderId, gateway: "razorpay", payment_status: "pending" }).eq("id", row.id);
  }
  return NextResponse.json({
    ok: true,
    keyId: razorpayKeyId(),
    orderId,
    amount: row.token_amount,
    currency: "INR",
  });
}
