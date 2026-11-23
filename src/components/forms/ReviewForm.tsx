"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function ReviewForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [startedAt, setStartedAt] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    setStartedAt(String(Date.now()));
  }, []);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const body = new FormData(form);
    body.set("rating", String(rating));
    body.set("publishConsent", consent ? "true" : "false");
    body.set("startedAt", startedAt);

    startTransition(async () => {
      try {
        const response = await fetch("/api/reviews", { method: "POST", body });
        const payload = (await response.json()) as { ok?: boolean; message?: string; reviewId?: string };
        if (!response.ok || !payload.ok) {
          setError(payload.message || "The review could not be sent.");
          return;
        }
        router.push(`/review/thank-you?ref=${encodeURIComponent(payload.reviewId || "")}`);
      } catch {
        setError("The review could not be sent. Please try again.");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div>
        <label className="label" htmlFor="clientName">
          Your name
        </label>
        <input id="clientName" name="clientName" required maxLength={80} className="field" autoComplete="name" />
      </div>
      <div>
        <label className="label" htmlFor="clientEmail">
          Email <span className="font-normal text-bark">(optional)</span>
        </label>
        <input id="clientEmail" name="clientEmail" type="email" maxLength={120} className="field" autoComplete="email" />
        <p className="mt-2 text-xs leading-relaxed text-bark">
          Used only if the consultancy needs to follow up. It is never shown on the website.
        </p>
      </div>
      <fieldset>
        <legend className="label">Rating</legend>
        <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Star rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              onClick={() => setRating(value)}
              className={cn(
                "min-h-11 min-w-11 border px-3 py-2 text-sm transition",
                rating === value ? "border-gold bg-deep text-ivory" : "border-deep/15 bg-white text-deep hover:border-gold",
              )}
            >
              {value}
              <span className="sr-only"> star{value === 1 ? "" : "s"}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <div>
        <label className="label" htmlFor="reviewText">
          Your review
        </label>
        <textarea
          id="reviewText"
          name="reviewText"
          required
          rows={5}
          maxLength={2000}
          className="field"
          placeholder="Share what you are comfortable saying about the consultation."
        />
      </div>
      <div>
        <label className="label" htmlFor="experienceText">
          Experience or results <span className="font-normal text-bark">(optional)</span>
        </label>
        <textarea
          id="experienceText"
          name="experienceText"
          rows={4}
          maxLength={2000}
          className="field"
          placeholder="Optional. Do not include private medical, financial, or property details you would not want published."
        />
      </div>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-deep/80">
        <input
          type="checkbox"
          className="mt-1"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
        />
        <span>
          I consent to STHAPATYA publishing this review on the website after it has been reviewed. Without this consent,
          the review stays private. Your email is never shown publicly.
        </span>
      </label>
      {error ? <p className="text-sm text-terracotta">{error}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Submit review"}
      </Button>
    </form>
  );
}
