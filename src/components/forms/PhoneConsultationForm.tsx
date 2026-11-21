"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { useCopy, useLocale } from "@/components/i18n/LocaleProvider";
import { localeMeta, locales, type Locale } from "@/lib/i18n/locale";
import { translateError } from "@/lib/i18n/dictionaries";
import { openRazorpayCheckout } from "@/lib/payments/checkout";
import { phoneFees } from "@/lib/payments/fees";
import { formatInr } from "@/lib/utils";

export function PhoneConsultationForm({
  initialSubject,
  whatsappNumber,
}: {
  initialSubject: "money" | "health" | "";
  whatsappNumber?: string;
}) {
  const copy = useCopy();
  const locale = useLocale();
  const router = useRouter();
  const fees = phoneFees();
  const [bypass, setBypass] = useState(false);
  const [subject, setSubject] = useState<"money" | "health" | "">(initialSubject);
  const [language, setLanguage] = useState<Locale>(locale);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [time, setTime] = useState("");
  const [concern, setConcern] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void fetch("/api/payments/bypass-status")
      .then((response) => response.json())
      .then((payload: { bypass?: boolean }) => setBypass(Boolean(payload.bypass)))
      .catch(() => setBypass(false));
  }, []);

  async function createBooking() {
    const created = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "phone", subject, fullName, mobile, language, preferredDate, time, concern, terms }),
    });
    return (await created.json()) as { ok?: boolean; message?: string; bookingCode?: string };
  }

  async function onPay(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!subject) return setError(translateError(copy, "Select a consultation subject.") || "");
    if (!time) return setError(translateError(copy, "Choose a preferred time.") || "");
    if (!terms) return setError(translateError(copy, "Please accept the consultation terms.") || "");
    setBusy(true);
    try {
      const booking = await createBooking();
      if (!booking.bookingCode) {
        setError(booking.message || copy.phone.unavailable);
        return;
      }
      const ordered = await fetch("/api/payments/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingCode: booking.bookingCode }),
      });
      const order = (await ordered.json()) as { ok?: boolean; message?: string; keyId?: string; orderId?: string; amount?: number };
      if (!ordered.ok || !order.orderId || !order.keyId) {
        setError(order.message || copy.phone.unavailable);
        return;
      }
      const payment = await openRazorpayCheckout({
        key: order.keyId,
        orderId: order.orderId,
        amountInr: order.amount || fees.token,
        name: fullName,
        contact: mobile,
      });
      const confirmed = await fetch("/api/payments/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingCode: booking.bookingCode,
          orderId: payment.razorpay_order_id,
          paymentId: payment.razorpay_payment_id,
          signature: payment.razorpay_signature,
        }),
      });
      const done = (await confirmed.json()) as { ok?: boolean; message?: string };
      if (!confirmed.ok || !done.ok) {
        setError(done.message || copy.phone.unavailable);
        return;
      }
      router.push(`/booking/confirmation?ref=${encodeURIComponent(booking.bookingCode)}`);
    } catch {
      setError(copy.phone.unavailable);
    } finally {
      setBusy(false);
    }
  }

  async function onBypass() {
    setError("");
    if (!subject) return setError(translateError(copy, "Select a consultation subject.") || "");
    if (!time) return setError(translateError(copy, "Choose a preferred time.") || "");
    if (!terms) return setError(translateError(copy, "Please accept the consultation terms.") || "");
    setBusy(true);
    try {
      const created = await fetch("/api/bookings/bypass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "phone", subject, fullName, mobile, language, preferredDate, time, concern, terms }),
      });
      const booking = (await created.json()) as { ok?: boolean; message?: string; bookingCode?: string };
      if (!created.ok || !booking.bookingCode) {
        setError(booking.message || copy.phone.unavailable);
        return;
      }
      router.push(`/booking/confirmation?ref=${encodeURIComponent(booking.bookingCode)}`);
    } catch {
      setError(copy.phone.unavailable);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onPay} className="space-y-5 border border-deep/10 bg-white p-6 sm:p-8" noValidate>
      <div className="grid gap-3 sm:grid-cols-3">
        <p>
          <span className="block text-xs text-bark">{copy.phone.totalLabel}</span>
          <span className="font-serif text-3xl">{formatInr(fees.total)}</span>
        </p>
        <p>
          <span className="block text-xs text-bark">{copy.phone.tokenLabel}</span>
          <span className="font-serif text-3xl">{formatInr(fees.token)}</span>
        </p>
        <p>
          <span className="block text-xs text-bark">{copy.phone.remainingLabel}</span>
          <span className="font-serif text-3xl">{formatInr(fees.remaining)}</span>
        </p>
      </div>
      <fieldset>
        <legend className="label">{copy.phone.subject}</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(["money", "health"] as const).map((item) => (
            <label key={item} className="flex items-start gap-3 border border-deep/10 p-3 text-sm">
              <input type="radio" name="subject" checked={subject === item} onChange={() => setSubject(item)} />
              <span>{item === "money" ? copy.phone.money : copy.phone.health}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="phone-name">
            {copy.form.fullName}
          </label>
          <input id="phone-name" className="field" autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} required />
        </div>
        <div>
          <label className="label" htmlFor="phone-mobile">
            {copy.form.phone}
          </label>
          <input id="phone-mobile" className="field" inputMode="tel" autoComplete="tel" placeholder="98XXXXXXXX" value={mobile} onChange={(event) => setMobile(event.target.value)} required />
        </div>
        <div>
          <label className="label" htmlFor="phone-language">
            {copy.phone.preferredLanguage}
          </label>
          <select id="phone-language" className="field" value={language} onChange={(event) => setLanguage(event.target.value as Locale)}>
            {locales.map((item) => (
              <option key={item} value={item}>
                {localeMeta[item].label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="phone-date">
            {copy.phone.date}
          </label>
          <input id="phone-date" type="date" className="field" value={preferredDate} onChange={(event) => setPreferredDate(event.target.value)} required />
        </div>
        <div>
          <label className="label" htmlFor="phone-time">
            {copy.phone.time}
          </label>
          <select id="phone-time" className="field" value={time} onChange={(event) => setTime(event.target.value)} required>
            <option value="">{copy.form.select}</option>
            <option value="morning">{copy.phone.morning}</option>
            <option value="afternoon">{copy.phone.afternoon}</option>
            <option value="evening">{copy.phone.evening}</option>
          </select>
        </div>
      </div>
      <div>
        <label className="label" htmlFor="phone-note">
          {copy.phone.note}
        </label>
        <textarea id="phone-note" rows={4} className="field" value={concern} onChange={(event) => setConcern(event.target.value)} />
      </div>
      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <input type="checkbox" className="mt-1" checked={terms} onChange={(event) => setTerms(event.target.checked)} />
        <span>
          {copy.phone.terms}{" "}
          <Link href="/privacy-policy" className="underline">
            Privacy
          </Link>
        </span>
      </label>
      <p className="text-sm leading-relaxed text-bark">{copy.phone.balanceNote}</p>
      <p className="text-sm leading-relaxed text-bark">{copy.phone.gatewayNote}</p>
      <p className="text-sm leading-relaxed text-bark">{copy.home.disclaimer}</p>
      {error ? (
        <p className="border border-terracotta/40 bg-sand/40 px-4 py-3 text-sm" role="alert">
          {error}
        </p>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button type="submit" disabled={busy} className="bg-deep px-6 py-3.5 text-sm text-ivory disabled:opacity-60">
          {busy ? copy.phone.paying : copy.phone.pay}
        </button>
        {bypass ? (
          <button type="button" disabled={busy} onClick={() => void onBypass()} className="border border-deep/20 px-6 py-3.5 text-sm disabled:opacity-60">
            {copy.phone.bypass}
          </button>
        ) : null}
        <WhatsAppButton
          number={whatsappNumber}
          message={subject === "health" ? copy.whatsapp.health : copy.whatsapp.money}
          label={copy.whatsapp.enquire}
          variant="line"
        />
      </div>
      {bypass ? <p className="text-sm leading-relaxed text-bark">{copy.phone.bypassNote}</p> : null}
    </form>
  );
}
