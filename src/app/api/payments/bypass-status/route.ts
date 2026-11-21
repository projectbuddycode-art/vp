import { connection } from "next/server";
import { NextResponse } from "next/server";
import { paymentBypassEnabled } from "@/lib/payments/config";

export async function GET() {
  await connection();
  return NextResponse.json(
    { ok: true, bypass: paymentBypassEnabled() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
