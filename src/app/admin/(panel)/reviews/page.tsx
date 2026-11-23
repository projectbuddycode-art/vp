import { approveReview, rejectReview } from "@/lib/actions/reviews";
import { createServiceClient } from "@/lib/supabase/admin";
import { isServiceRoleConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

type ReviewRow = {
  id: string;
  client_name: string;
  client_email: string;
  rating: number;
  review_text: string;
  experience_text: string;
  publish_consent: boolean;
  status: string;
  submitted_at: string;
  decided_at: string | null;
  decided_by: string;
  decision_note: string;
  notify_email_sent: boolean;
  notify_email_error: string;
};

async function loadReviews(): Promise<ReviewRow[]> {
  if (isServiceRoleConfigured()) {
    const supabase = createServiceClient();
    const { data } = await supabase.from("client_reviews").select("*").order("submitted_at", { ascending: false });
    return (data || []) as ReviewRow[];
  }
  const supabase = await createClient();
  const { data } = await supabase.from("client_reviews").select("*").order("submitted_at", { ascending: false });
  return (data || []) as ReviewRow[];
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "APPROVED"
      ? "border-emerald-700/30 text-emerald-900"
      : status === "REJECTED"
        ? "border-terracotta/40 text-terracotta"
        : "border-deep/20 text-deep/70";
  return <span className={`border px-2 py-0.5 text-[0.65rem] tracking-[0.14em] uppercase ${tone}`}>{status}</span>;
}

function ReviewCard({ row }: { row: ReviewRow }) {
  return (
    <li className="space-y-3 bg-ivory p-5 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-serif text-2xl">{row.client_name}</p>
          <p className="mt-1 text-deep/60">
            {row.rating}/5 · submitted {new Date(row.submitted_at).toLocaleString()}
            {row.client_email ? ` · ${row.client_email}` : ""}
          </p>
        </div>
        <StatusBadge status={row.status} />
      </div>
      <p className="whitespace-pre-wrap leading-relaxed">{row.review_text}</p>
      {row.experience_text ? (
        <p className="whitespace-pre-wrap text-deep/70">
          <span className="tracking-[0.12em] uppercase">Experience · </span>
          {row.experience_text}
        </p>
      ) : null}
      <p className="text-xs text-deep/55">
        Publish consent: {row.publish_consent ? "Yes" : "No"}
        {row.decided_at
          ? ` · Decided ${new Date(row.decided_at).toLocaleString()} by ${row.decided_by || "unknown"}`
          : ""}
      </p>
      {!row.notify_email_sent && row.notify_email_error ? (
        <p className="border border-terracotta/30 bg-sand/40 px-3 py-2 text-xs text-deep/80">
          Notification email failed: {row.notify_email_error}
        </p>
      ) : null}
      {row.status === "PENDING" ? (
        <div className="flex flex-wrap gap-2 pt-1">
          <form action={approveReview.bind(null, row.id)}>
            <button type="submit" className="bg-deep px-4 py-2 text-xs tracking-[0.14em] text-ivory uppercase">
              Approve
            </button>
          </form>
          <form action={rejectReview.bind(null, row.id)}>
            <button type="submit" className="border border-deep/25 px-4 py-2 text-xs tracking-[0.14em] uppercase">
              Reject
            </button>
          </form>
        </div>
      ) : null}
    </li>
  );
}

export default async function ReviewsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ done?: string; error?: string }>;
}) {
  const params = await searchParams;
  const rows = await loadReviews();
  const pending = rows.filter((row) => row.status === "PENDING");
  const decided = rows.filter((row) => row.status !== "PENDING");

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-serif text-5xl">Client reviews</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-deep/70">
          Only APPROVED reviews with publication consent appear on the public website. Pending and rejected reviews stay private.
        </p>
      </div>

      {params.done ? (
        <p className="border border-deep/15 bg-sand/50 px-4 py-3 text-sm">
          Review {params.done === "approve" || params.done === "approved" ? "approved" : "rejected"}.
        </p>
      ) : null}
      {params.error ? (
        <p className="border border-terracotta/40 bg-sand/40 px-4 py-3 text-sm">
          Moderation link issue: {params.error}. Sign in and decide from this list instead.
        </p>
      ) : null}

      <section className="space-y-4">
        <h2 className="font-serif text-3xl">Pending ({pending.length})</h2>
        {pending.length === 0 ? (
          <p className="text-sm text-deep/60">No pending reviews.</p>
        ) : (
          <ul className="space-y-4">
            {pending.map((row) => (
              <ReviewCard key={row.id} row={row} />
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-3xl">Processed ({decided.length})</h2>
        {decided.length === 0 ? (
          <p className="text-sm text-deep/60">No approved or rejected reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {decided.map((row) => (
              <ReviewCard key={row.id} row={row} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
