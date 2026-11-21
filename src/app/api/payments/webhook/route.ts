import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/admin";
import { isServiceRoleConfigured } from "@/lib/supabase/env";
import { verifyWebhookSignature } from "@/lib/payments/razorpay";

export async function POST(request: Request) {
  if (!isServiceRoleConfigured()) return NextResponse.json({ ok: false }, { status: 503 });
  const raw = await request.text();
  const signature = request.headers.get("x-razorpay-signature");
  if (!verifyWebhookSignature(raw, signature)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const event = JSON.parse(raw) as {
    event?: string;
    payload?: { payment?: { entity?: { id?: string; order_id?: string } } };
  };
  const payment = event.payload?.payment?.entity;
  if (event.event !== "payment.captured" || !payment?.order_id || !payment.id) {
    return NextResponse.json({ ok: true });
  }
  const supabase = createServiceClient();
  const { data } = await supabase.from("bookings").select("id, payment_status").eq("gateway_order_id", payment.order_id).maybeSingle();
  const row = data as { id: string; payment_status: string } | null;
  if (!row) return NextResponse.json({ ok: true });
  if (row.payment_status !== "paid") {
    await supabase
      .from("bookings")
      .update({ payment_status: "paid", gateway_payment_id: payment.id, confirmed_at: new Date().toISOString() })
      .eq("id", row.id);
  }
  await supabase.from("payment_events").upsert(
    {
      booking_id: row.id,
      gateway_event_id: `webhook:${payment.id}`,
      event_type: event.event,
      payload: { orderId: payment.order_id, paymentId: payment.id },
    },
    { onConflict: "gateway_event_id" },
  );
  return NextResponse.json({ ok: true });
}
