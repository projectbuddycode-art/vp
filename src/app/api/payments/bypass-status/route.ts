import { NextResponse } from "next/server";
import { paymentBypassEnabled } from "@/lib/payments/config";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { ok: true, bypass: paymentBypassEnabled() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
