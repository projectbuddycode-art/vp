import "server-only";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export function razorpayConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

export function razorpayKeyId() {
  return process.env.RAZORPAY_KEY_ID || "";
}

function secret() {
  const value = process.env.RAZORPAY_KEY_SECRET;
  if (!value) throw new Error("Payment secret is not configured.");
  return value;
}

export async function createRazorpayOrder(amountInr: number, receipt: string) {
  const auth = Buffer.from(`${razorpayKeyId()}:${secret()}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amountInr * 100,
      currency: "INR",
      receipt,
      payment_capture: 1,
    }),
  });
  const payload = (await response.json().catch(() => null)) as { id?: string; error?: { description?: string } } | null;
  if (!response.ok || !payload?.id) {
    throw new Error(payload?.error?.description || "The payment order could not be created.");
  }
  return payload.id;
}

export function verifyCheckoutSignature(orderId: string, paymentId: string, signature: string) {
  const expected = createHmac("sha256", secret()).update(`${orderId}|${paymentId}`).digest("hex");
  const left = Buffer.from(expected);
  const right = Buffer.from(signature);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function verifyWebhookSignature(rawBody: string, signature: string | null) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret || !signature) return false;
  const expected = createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
  const left = Buffer.from(expected);
  const right = Buffer.from(signature);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function bookingCode() {
  return `ST-${randomBytes(4).toString("hex").toUpperCase()}`;
}
