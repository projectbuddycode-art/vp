import Link from "next/link";
import { redirect } from "next/navigation";
import { moderateReviewWithToken } from "@/lib/actions/reviews";
import { hashReviewToken } from "@/lib/reviews/tokens";
import { createServiceClient } from "@/lib/supabase/admin";
import { isServiceRoleConfigured } from "@/lib/supabase/env";

type ReviewPreview = {
  id: string;
  client_name: string;
  rating: number;
  review_text: string;
  experience_text: string;
  publish_consent: boolean;
  status: string;
  submitted_at: string;
};

export default async function ModerateReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  if (!token) redirect("/admin/reviews?error=token");
  if (!isServiceRoleConfigured()) redirect("/admin/reviews?error=config");

  const supabase = createServiceClient();
  const tokenHash = hashReviewToken(token);
  const { data: tokenRow } = await supabase
    .from("client_review_tokens")
    .select("id, review_id, expires_at, used_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (!tokenRow?.review_id) redirect("/admin/reviews?error=token");
  if (tokenRow.used_at) redirect("/admin/reviews?error=used");
  if (new Date(String(tokenRow.expires_at)).getTime() < Date.now()) redirect("/admin/reviews?error=expired");

  const { data: review } = await supabase
    .from("client_reviews")
    .select("id, client_name, rating, review_text, experience_text, publish_consent, status, submitted_at")
    .eq("id", tokenRow.review_id)
    .maybeSingle();

  if (!review) redirect("/admin/reviews?error=token");
  const row = review as ReviewPreview;

  if (row.status !== "PENDING") {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <h1 className="font-serif text-4xl">Already decided</h1>
        <p className="text-sm text-deep/70">
          This review is {row.status}. Open the reviews desk to see the full list.
        </p>
        <Link href="/admin/reviews" className="inline-block bg-deep px-4 py-2 text-sm text-ivory">
          Open reviews
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <p className="text-[0.72rem] tracking-[0.18em] text-gold uppercase">Secure moderation</p>
        <h1 className="mt-2 font-serif text-4xl">Review from {row.client_name}</h1>
        <p className="mt-2 text-sm text-deep/65">
          Submitted {new Date(row.submitted_at).toLocaleString()} · {row.rating}/5 · Consent{" "}
          {row.publish_consent ? "yes" : "no"}
        </p>
      </div>

      <div className="space-y-3 bg-ivory p-5 text-sm">
        <p className="whitespace-pre-wrap leading-relaxed">{row.review_text}</p>
        {row.experience_text ? (
          <p className="whitespace-pre-wrap text-deep/70">{row.experience_text}</p>
        ) : null}
      </div>

      <p className="text-xs leading-relaxed text-deep/60">
        This link expires and can be used once. Approving does not publish reviews that lack publication consent.
        Rejected and pending reviews never appear on the public site. Prefer signing in at /admin/reviews when
        possible.
      </p>

      <div className="flex flex-wrap gap-3">
        <form action={moderateReviewWithToken}>
          <input type="hidden" name="token" value={token} />
          <input type="hidden" name="decision" value="APPROVE" />
          <button type="submit" className="bg-deep px-5 py-2.5 text-sm text-ivory">
            Approve
          </button>
        </form>
        <form action={moderateReviewWithToken}>
          <input type="hidden" name="token" value={token} />
          <input type="hidden" name="decision" value="REJECT" />
          <button type="submit" className="border border-deep/25 px-5 py-2.5 text-sm">
            Reject
          </button>
        </form>
        <Link href="/admin/reviews" className="border border-deep/15 px-5 py-2.5 text-sm">
          All reviews
        </Link>
      </div>
    </div>
  );
}
