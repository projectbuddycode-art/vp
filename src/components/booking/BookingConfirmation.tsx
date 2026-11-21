"use client";

import { useEffect, useState } from "react";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { fill } from "@/lib/i18n/dictionaries";
import { localeMeta } from "@/lib/i18n/locale";
import { formatInr } from "@/lib/utils";

type Booking = {
  booking_code: string;
  kind: string;
  subject: string | null;
  full_name: string;
  language: string;
  preferred_date: string | null;
  preferred_time: string;
  total_amount: number;
  remaining_amount: number;
  amount_paid: number | null;
  payment_status: string;
  booking_status: string;
};

export function BookingConfirmation({
  bookingCode,
  whatsappNumber,
}: {
  bookingCode: string;
  whatsappNumber?: string;
}) {
  const copy = useCopy();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void fetch(`/api/bookings/${encodeURIComponent(bookingCode)}`)
      .then(async (response) => {
        const payload = (await response.json()) as { ok?: boolean; booking?: Booking; phone?: string; message?: string };
        if (cancelled) return;
        if (!response.ok || !payload.ok || !payload.booking) {
          setError(payload.message || copy.common.notFoundText);
          return;
        }
        setBooking(payload.booking);
        setPhone(payload.phone || "");
      })
      .catch(() => {
        if (!cancelled) setError(copy.common.notFoundText);
      });
    return () => {
      cancelled = true;
    };
  }, [bookingCode, copy.common.notFoundText]);

  if (error) return <p className="border border-terracotta/40 bg-sand/40 px-4 py-3 text-sm">{error}</p>;
  if (!booking) return <p className="text-sm text-bark">{copy.common.loading}</p>;

  const subjectLabel =
    booking.subject === "money" ? copy.phone.money : booking.subject === "health" ? copy.phone.health : booking.kind;
  const languageLabel = localeMeta[booking.language as keyof typeof localeMeta]?.label || booking.language;
  const paid = Number(booking.amount_paid || 0);
  const paymentLabel =
    booking.payment_status === "paid" ? formatInr(paid) : booking.payment_status === "payment_bypassed" ? copy.confirm.unpaid : booking.payment_status;
  const statusLabel = booking.booking_status === "requested" ? copy.confirm.awaiting : booking.booking_status;
  const whatsappMessage = fill(copy.confirm.whatsappBooking, {
    ref: booking.booking_code,
    subject: subjectLabel,
    language: languageLabel,
  });

  return (
    <div className="border border-deep/10 bg-white p-6 sm:p-8">
      <p className="text-[0.72rem] tracking-[0.18em] text-gold uppercase">{copy.confirm.next}</p>
      <h1 className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.6rem)] leading-tight">{copy.confirm.title}</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-deep/80">{copy.confirm.text}</p>
      <dl className="mt-8 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs text-bark">{copy.confirm.reference}</dt>
          <dd className="mt-1 font-serif text-2xl">{booking.booking_code}</dd>
        </div>
        <div>
          <dt className="text-xs text-bark">{copy.confirm.name}</dt>
          <dd className="mt-1 text-base">{booking.full_name}</dd>
        </div>
        <div>
          <dt className="text-xs text-bark">{copy.confirm.subject}</dt>
          <dd className="mt-1 text-base">{subjectLabel}</dd>
        </div>
        <div>
          <dt className="text-xs text-bark">{copy.confirm.language}</dt>
          <dd className="mt-1 text-base">{languageLabel}</dd>
        </div>
        <div>
          <dt className="text-xs text-bark">{copy.confirm.date}</dt>
          <dd className="mt-1 text-base">{booking.preferred_date || "—"}</dd>
        </div>
        <div>
          <dt className="text-xs text-bark">{copy.confirm.time}</dt>
          <dd className="mt-1 text-base">{booking.preferred_time || "—"}</dd>
        </div>
        <div>
          <dt className="text-xs text-bark">{copy.confirm.total}</dt>
          <dd className="mt-1 text-base">{formatInr(booking.total_amount)}</dd>
        </div>
        <div>
          <dt className="text-xs text-bark">{copy.confirm.paid}</dt>
          <dd className="mt-1 text-base">{formatInr(paid)}</dd>
        </div>
        <div>
          <dt className="text-xs text-bark">{copy.confirm.paymentStatus}</dt>
          <dd className="mt-1 text-base">{paymentLabel}</dd>
        </div>
        <div>
          <dt className="text-xs text-bark">{copy.confirm.bookingStatus}</dt>
          <dd className="mt-1 text-base">{statusLabel}</dd>
        </div>
      </dl>

      {booking.kind === "phone" ? (
        <div className="mt-8 border-t border-deep/10 pt-6">
          <p className="text-[0.72rem] tracking-[0.16em] text-gold uppercase">{copy.phone.numberLabel}</p>
          {phone ? (
            <>
              <p className="mt-2 font-serif text-4xl">{phone}</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a href={`tel:${phone}`} className="inline-flex items-center justify-center bg-deep px-5 py-3 text-sm text-ivory">
                  {copy.phone.call}
                </a>
                <button
                  type="button"
                  className="inline-flex items-center justify-center border border-deep/20 px-5 py-3 text-sm"
                  onClick={async () => {
                    await navigator.clipboard.writeText(phone);
                    setCopied(true);
                  }}
                >
                  {copied ? copy.phone.copied : copy.phone.copyNumber}
                </button>
              </div>
            </>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-bark">{copy.phone.numberMissing}</p>
          )}
        </div>
      ) : null}

      <div className="mt-8">
        <WhatsAppButton number={whatsappNumber} message={whatsappMessage} label={copy.whatsapp.booking} />
      </div>
      {booking.payment_status === "payment_bypassed" ? (
        <p className="mt-4 text-sm leading-relaxed text-bark">{copy.phone.bypassNote}</p>
      ) : null}
    </div>
  );
}
