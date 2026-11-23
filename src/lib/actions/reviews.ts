"use server";

import { createHash } from "node:crypto";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { adminDevBypassAllowed } from "@/lib/payments/config";
import { hashReviewToken } from "@/lib/reviews/tokens";
import { createServiceClient } from "@/lib/supabase/admin";
import { isServiceRoleConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

async function requireAdminIdentity() {
  if (adminDevBypassAllowed()) return "admin-dev-bypass";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Sign in required.");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (profile?.role !== "admin") throw new Error("Admin access required.");
  return user.email || user.id;
}

async function decideReview(input: {
  reviewId: string;
  status: "APPROVED" | "REJECTED";
  decidedBy: string;
  note?: string;
}) {
  if (!isServiceRoleConfigured()) throw new Error("Supabase service role is not configured.");
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("client_reviews")
    .update({
      status: input.status,
      decided_at: new Date().toISOString(),
      decided_by: input.decidedBy,
      decision_note: input.note || "",
    })
    .eq("id", input.reviewId)
    .eq("status", "PENDING")
    .select("id");
  if (error) throw new Error(error.message);
  if (!data?.length) throw new Error("Review is not pending or was already decided.");
  updateTag("client-reviews");
  revalidatePath("/");
  revalidatePath("/testimonials");
  revalidatePath("/admin/reviews");
}

export async function moderateReviewWithToken(formData: FormData) {
  const token = String(formData.get("token") || "");
  const decision = String(formData.get("decision") || "");
  if (!token || (decision !== "APPROVE" && decision !== "REJECT")) {
    redirect("/admin/reviews?error=invalid");
  }
  if (!isServiceRoleConfigured()) redirect("/admin/reviews?error=config");

  const supabase = createServiceClient();
  const tokenHash = hashReviewToken(token);
  const { data: row } = await supabase
    .from("client_review_tokens")
    .select("id, review_id, expires_at, used_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (!row?.review_id) redirect("/admin/reviews?error=token");
  if (row.used_at) redirect("/admin/reviews?error=used");
  if (new Date(String(row.expires_at)).getTime() < Date.now()) redirect("/admin/reviews?error=expired");

  const decidedBy = `token:${createHash("sha256").update(token).digest("hex").slice(0, 12)}`;
  await decideReview({
    reviewId: String(row.review_id),
    status: decision === "APPROVE" ? "APPROVED" : "REJECTED",
    decidedBy,
  });

  await supabase.from("client_review_tokens").update({ used_at: new Date().toISOString() }).eq("id", row.id);
  redirect(`/admin/reviews?done=${decision.toLowerCase()}`);
}

export async function approveReview(reviewId: string) {
  const identity = await requireAdminIdentity();
  await decideReview({ reviewId, status: "APPROVED", decidedBy: identity });
  redirect("/admin/reviews?done=approve");
}

export async function rejectReview(reviewId: string) {
  const identity = await requireAdminIdentity();
  await decideReview({ reviewId, status: "REJECTED", decidedBy: identity });
  redirect("/admin/reviews?done=reject");
}
