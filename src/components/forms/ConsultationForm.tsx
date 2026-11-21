"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { useCopy, useLocale } from "@/components/i18n/LocaleProvider";
import { translateError } from "@/lib/i18n/dictionaries";
import { openRazorpayCheckout } from "@/lib/payments/checkout";
import { visitFees } from "@/lib/payments/fees";
import {
  concernCategories,
  consultationModes,
  propertyTypes,
  type SiteSettings,
} from "@/lib/site";
import { enquirySchema, type EnquiryInput } from "@/lib/validation/enquiry";
import { formatInr, publicWhatsappNumber } from "@/lib/utils";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-terracotta">{message}</p>;
}

export function ConsultationForm({ settings }: { settings: SiteSettings }) {
  const copy = useCopy();
  const locale = useLocale();
  const router = useRouter();
  const fees = visitFees(settings.consultationFee, settings.bookingToken);
  const whatsappNumber = publicWhatsappNumber(settings.whatsapp, settings.phone);
  const [formError, setFormError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [bypass, setBypass] = useState(false);
  const [terms, setTerms] = useState(false);
  const modes = consultationModes.filter((mode) => mode.value !== "online" || settings.onlineConsultationEnabled);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      city: "",
      propertyType: undefined,
      consultationCategory: undefined,
      consultationMode: "on_site",
      preferredDate: "",
      propertyDescription: "",
      clientConcern: "",
      privacyConsent: false,
      marketingConsent: false,
      website: "",
      startedAt: "",
    },
  });

  useEffect(() => {
    setValue("startedAt", String(Date.now()));
  }, [setValue]);

  useEffect(() => {
    void fetch("/api/payments/bypass-status")
      .then((response) => response.json())
      .then((payload: { bypass?: boolean }) => setBypass(Boolean(payload.bypass)))
      .catch(() => setBypass(false));
  }, []);

  async function sendEnquiry(values: EnquiryInput) {
    setFormError(null);
    const body = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (typeof value === "boolean") body.set(key, value ? "true" : "false");
      else if (value != null) body.set(key, String(value));
    });
    const input = document.getElementById("attachments") as HTMLInputElement | null;
    if (input?.files) {
      Array.from(input.files).forEach((file) => body.append("attachments", file));
    }
    const response = await fetch("/api/enquiries", { method: "POST", body });
    const result = (await response.json().catch(() => null)) as
      | { ok: boolean; enquiryCode?: string; message?: string }
      | null;
    if (!response.ok || !result?.ok || !result.enquiryCode) {
      setFormError(translateError(copy, result?.message) || copy.errors["The enquiry could not be sent. Please try again."]);
      return;
    }
    router.push(`/contact/thank-you?ref=${encodeURIComponent(result.enquiryCode)}`);
  }

  async function payToken() {
    setFormError(null);
    if (!terms) {
      setFormError(translateError(copy, "Please accept the consultation terms.") || "");
      return;
    }
    const values = getValues();
    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      setFormError(translateError(copy, parsed.error.issues[0]?.message) || "");
      return;
    }
    setPaying(true);
    try {
      const created = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "on_site",
          fullName: parsed.data.fullName,
          mobile: parsed.data.mobile,
          language: locale,
          preferredDate: parsed.data.preferredDate,
          concern: parsed.data.clientConcern,
          terms: true,
        }),
      });
      const booking = (await created.json()) as { ok?: boolean; message?: string; bookingCode?: string };
      if (!created.ok || !booking.bookingCode) {
        setFormError(booking.message || copy.phone.unavailable);
        return;
      }
      const ordered = await fetch("/api/payments/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingCode: booking.bookingCode }),
      });
      const order = (await ordered.json()) as { ok?: boolean; message?: string; keyId?: string; orderId?: string; amount?: number };
      if (!ordered.ok || !order.orderId || !order.keyId) {
        setFormError(order.message || copy.phone.unavailable);
        return;
      }
      const payment = await openRazorpayCheckout({
        key: order.keyId,
        orderId: order.orderId,
        amountInr: order.amount || fees.token,
        name: parsed.data.fullName,
        contact: parsed.data.mobile,
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
        setFormError(done.message || copy.phone.unavailable);
        return;
      }
      router.push(`/booking/confirmation?ref=${encodeURIComponent(booking.bookingCode)}`);
    } catch {
      setFormError(copy.phone.unavailable);
    } finally {
      setPaying(false);
    }
  }

  async function bypassToken() {
    setFormError(null);
    if (!terms) {
      setFormError(translateError(copy, "Please accept the consultation terms.") || "");
      return;
    }
    const values = getValues();
    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      setFormError(translateError(copy, parsed.error.issues[0]?.message) || "");
      return;
    }
    setPaying(true);
    try {
      const created = await fetch("/api/bookings/bypass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "on_site",
          fullName: parsed.data.fullName,
          mobile: parsed.data.mobile,
          language: locale,
          preferredDate: parsed.data.preferredDate,
          concern: parsed.data.clientConcern,
          terms: true,
        }),
      });
      const booking = (await created.json()) as { ok?: boolean; message?: string; bookingCode?: string };
      if (!created.ok || !booking.bookingCode) {
        setFormError(booking.message || copy.phone.unavailable);
        return;
      }
      router.push(`/booking/confirmation?ref=${encodeURIComponent(booking.bookingCode)}`);
    } catch {
      setFormError(copy.phone.unavailable);
    } finally {
      setPaying(false);
    }
  }

  return (
    <form id="consultation" onSubmit={handleSubmit(sendEnquiry)} className="space-y-5" noValidate>
      {whatsappNumber ? (
        <div className="border border-[#1f6b45]/25 bg-[#1f6b45]/5 p-4">
          <p className="text-sm text-deep/80">{copy.whatsapp.prefer}</p>
          <WhatsAppButton
            number={whatsappNumber}
            message={copy.footer.whatsappMessage}
            label={copy.whatsapp.direct}
            className="mt-3 w-full px-6 py-3.5 text-[0.72rem] font-semibold tracking-[0.18em] uppercase sm:w-auto"
          />
          <p className="mt-3 text-xs text-bark">{copy.whatsapp.or}</p>
        </div>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-3">
        <p>
          <span className="block text-xs text-bark">{copy.visit.totalLabel}</span>
          <span className="font-serif text-2xl">{formatInr(fees.total)}</span>
        </p>
        <p>
          <span className="block text-xs text-bark">{copy.visit.tokenLabel}</span>
          <span className="font-serif text-2xl">{formatInr(fees.token)}</span>
        </p>
        <p>
          <span className="block text-xs text-bark">{copy.visit.remainingLabel}</span>
          <span className="font-serif text-2xl">{formatInr(fees.remaining)}</span>
        </p>
      </div>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Company website
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>
      <input type="hidden" {...register("startedAt")} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="fullName">
            {copy.form.fullName}
          </label>
          <input id="fullName" className="field" autoComplete="name" aria-invalid={Boolean(errors.fullName)} {...register("fullName")} />
          <FieldError message={translateError(copy, errors.fullName?.message)} />
        </div>
        <div>
          <label className="label" htmlFor="mobile">
            {copy.form.phone}
          </label>
          <input id="mobile" className="field" inputMode="tel" autoComplete="tel" placeholder="98XXXXXXXX" aria-invalid={Boolean(errors.mobile)} {...register("mobile")} />
          <FieldError message={translateError(copy, errors.mobile?.message)} />
        </div>
        <div>
          <label className="label" htmlFor="email">
            {copy.form.email}
          </label>
          <p className="mb-1 text-xs text-bark">{copy.form.emailHint}</p>
          <input id="email" type="email" className="field" autoComplete="email" aria-invalid={Boolean(errors.email)} {...register("email")} />
          <FieldError message={translateError(copy, errors.email?.message)} />
        </div>
        <div>
          <label className="label" htmlFor="city">
            {copy.form.city}
          </label>
          <input id="city" className="field" autoComplete="address-level2" aria-invalid={Boolean(errors.city)} {...register("city")} />
          <FieldError message={translateError(copy, errors.city?.message)} />
        </div>
        <div>
          <label className="label" htmlFor="propertyType">
            {copy.form.propertyType}
          </label>
          <select id="propertyType" className="field" aria-invalid={Boolean(errors.propertyType)} {...register("propertyType")}>
            <option value="">{copy.form.select}</option>
            {propertyTypes.map((item) => (
              <option key={item.value} value={item.value}>
                {copy.form.propertyOptions[item.value] || item.label}
              </option>
            ))}
          </select>
          <FieldError message={translateError(copy, errors.propertyType?.message)} />
        </div>
        <div>
          <label className="label" htmlFor="consultationCategory">
            {copy.form.concern}
          </label>
          <select id="consultationCategory" className="field" aria-invalid={Boolean(errors.consultationCategory)} {...register("consultationCategory")}>
            <option value="">{copy.form.select}</option>
            {concernCategories.map((item) => (
              <option key={item.value} value={item.value}>
                {copy.form.concernOptions[item.value] || item.label}
              </option>
            ))}
          </select>
          <FieldError message={translateError(copy, errors.consultationCategory?.message)} />
        </div>
        <div>
          <label className="label" htmlFor="consultationMode">
            {copy.form.mode}
          </label>
          <select id="consultationMode" className="field" aria-invalid={Boolean(errors.consultationMode)} {...register("consultationMode")}>
            {modes.map((item) => (
              <option key={item.value} value={item.value}>
                {copy.form.modeOptions[item.value] || item.label}
              </option>
            ))}
          </select>
          {!settings.onlineConsultationEnabled ? <p className="mt-1 text-xs text-deep/60">{copy.form.onlineOff}</p> : null}
          <FieldError message={translateError(copy, errors.consultationMode?.message)} />
        </div>
        <div>
          <label className="label" htmlFor="preferredDate">
            {copy.form.date}
          </label>
          <input id="preferredDate" type="date" className="field" {...register("preferredDate")} />
          <FieldError message={translateError(copy, errors.preferredDate?.message)} />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="propertyDescription">
          {copy.form.description}
        </label>
        <textarea id="propertyDescription" rows={4} className="field" {...register("propertyDescription")} />
        <FieldError message={translateError(copy, errors.propertyDescription?.message)} />
      </div>
      <div>
        <label className="label" htmlFor="clientConcern">
          {copy.form.concernLong}
        </label>
        <p className="mb-1 text-xs text-bark">{copy.form.concernHint}</p>
        <textarea id="clientConcern" rows={5} className="field" aria-invalid={Boolean(errors.clientConcern)} {...register("clientConcern")} />
        <FieldError message={translateError(copy, errors.clientConcern?.message)} />
      </div>
      <div>
        <label className="label" htmlFor="attachments">
          {copy.form.attachments}
        </label>
        <input id="attachments" name="attachments" type="file" multiple accept="image/jpeg,image/png,image/webp,application/pdf" className="field" />
        <p className="mt-1 text-xs text-deep/60">{copy.form.attachmentsHint}</p>
      </div>
      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <input type="checkbox" className="mt-1" {...register("privacyConsent")} />
        <span>{copy.form.privacy}</span>
      </label>
      <FieldError message={translateError(copy, errors.privacyConsent?.message)} />
      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <input type="checkbox" className="mt-1" {...register("marketingConsent")} />
        <span>{copy.form.marketing}</span>
      </label>
      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <input type="checkbox" className="mt-1" checked={terms} onChange={(event) => setTerms(event.target.checked)} />
        <span>
          {copy.form.terms}{" "}
          <Link href="/privacy-policy" className="underline">
            {copy.footer.privacy}
          </Link>
        </span>
      </label>
      <p className="text-sm leading-relaxed text-bark">{copy.phone.gatewayNote}</p>
      {formError ? (
        <p className="border border-terracotta/40 bg-sand/40 px-4 py-3 text-sm" role="alert">
          {formError}
        </p>
      ) : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          disabled={paying || isSubmitting}
          onClick={() => void payToken()}
          className="bg-deep px-6 py-3.5 text-[0.72rem] font-semibold tracking-[0.18em] text-ivory uppercase disabled:opacity-60"
        >
          {paying ? copy.form.payingToken : copy.form.payToken}
        </button>
        {bypass ? (
          <button
            type="button"
            disabled={paying || isSubmitting}
            onClick={() => void bypassToken()}
            className="border border-deep/20 px-6 py-3.5 text-[0.72rem] font-semibold tracking-[0.18em] text-deep uppercase disabled:opacity-60"
          >
            {copy.phone.bypass}
          </button>
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting || paying}
          className="border border-deep/20 px-6 py-3.5 text-[0.72rem] font-semibold tracking-[0.18em] text-deep uppercase disabled:opacity-60"
        >
          {isSubmitting ? copy.form.sending : copy.form.enquireOnly}
        </button>
      </div>
      {bypass ? <p className="text-sm leading-relaxed text-bark">{copy.phone.bypassNote}</p> : null}
    </form>
  );
}
