import { createHash, randomBytes } from "node:crypto";

export function createReviewToken() {
  const raw = randomBytes(32).toString("base64url");
  return { raw, hash: hashReviewToken(raw) };
}

export function hashReviewToken(raw: string) {
  return createHash("sha256").update(raw).digest("hex");
}

export function reviewSubmissionHash(name: string, email: string, reviewText: string) {
  const normalized = `${name.trim().toLowerCase()}|${email.trim().toLowerCase()}|${reviewText.trim().toLowerCase()}`;
  return createHash("sha256").update(normalized).digest("hex");
}
