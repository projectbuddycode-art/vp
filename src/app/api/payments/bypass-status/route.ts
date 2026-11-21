import { NextResponse } from "next/server";
import { paymentBypassEnabled } from "@/lib/payments/config";

export async function GET() {
  return NextResponse.json({ ok: true, bypass: paymentBypassEnabled() });
}
