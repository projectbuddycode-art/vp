"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  concernCategories,
  consultationModes,
  propertyTypes,
  type SiteSettings,
} from "@/lib/site";
import { enquirySchema, type EnquiryInput } from "@/lib/validation/enquiry";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-terracotta">{message}</p>;
}

export function ConsultationForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const modes = consultationModes.filter(
    (mode) => mode.value !== "online" || settings.onlineConsultationEnabled,
  );

  const {
    register,
    handleSubmit,
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

  async function onSubmit(values: EnquiryInput) {
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
      | { ok: boolean; enquiryCode?: string; message?: string; duplicate?: boolean }
      | null;
    if (!response.ok || !result?.ok || !result.enquiryCode) {
      setFormError(result?.message || "The enquiry could not be sent. Please try again.");
      return;
    }
    router.push(`/contact/thank-you?ref=${encodeURIComponent(result.enquiryCode)}`);
  }

  return (
    <form id="consultation" onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Company website
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>
      <input type="hidden" {...register("startedAt")} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="fullName">Full name</label>
          <input id="fullName" className="field" autoComplete="name" aria-invalid={Boolean(errors.fullName)} {...register("fullName")} />
          <FieldError message={errors.fullName?.message} />
        </div>
        <div>
          <label className="label" htmlFor="mobile">Phone number</label>
          <input id="mobile" className="field" inputMode="tel" autoComplete="tel" placeholder="98XXXXXXXX" aria-invalid={Boolean(errors.mobile)} {...register("mobile")} />
          <FieldError message={errors.mobile?.message} />
        </div>
        <div>
          <label className="label" htmlFor="email">Email address</label>
          <p className="mb-1 text-xs text-bark">So we can reply.</p>
          <input id="email" type="email" className="field" autoComplete="email" aria-invalid={Boolean(errors.email)} {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
        <div>
          <label className="label" htmlFor="city">City</label>
          <input id="city" className="field" autoComplete="address-level2" aria-invalid={Boolean(errors.city)} {...register("city")} />
          <FieldError message={errors.city?.message} />
        </div>
        <div>
          <label className="label" htmlFor="propertyType">Property type</label>
          <select id="propertyType" className="field" aria-invalid={Boolean(errors.propertyType)} {...register("propertyType")}>
            <option value="">Select</option>
            {propertyTypes.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
          <FieldError message={errors.propertyType?.message} />
        </div>
        <div>
          <label className="label" htmlFor="consultationCategory">What would you like guidance about?</label>
          <select id="consultationCategory" className="field" aria-invalid={Boolean(errors.consultationCategory)} {...register("consultationCategory")}>
            <option value="">Select</option>
            {concernCategories.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
          <FieldError message={errors.consultationCategory?.message} />
        </div>
        <div>
          <label className="label" htmlFor="consultationMode">How should we meet?</label>
          <select id="consultationMode" className="field" aria-invalid={Boolean(errors.consultationMode)} {...register("consultationMode")}>
            {modes.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
          {!settings.onlineConsultationEnabled ? (
            <p className="mt-1 text-xs text-deep/60">Online consultation is not currently offered.</p>
          ) : null}
          <FieldError message={errors.consultationMode?.message} />
        </div>
        <div>
          <label className="label" htmlFor="preferredDate">Preferred consultation date</label>
          <input id="preferredDate" type="date" className="field" {...register("preferredDate")} />
          <FieldError message={errors.preferredDate?.message} />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="propertyDescription">Additional message about the property</label>
        <textarea id="propertyDescription" rows={4} className="field" {...register("propertyDescription")} />
        <FieldError message={errors.propertyDescription?.message} />
      </div>
      <div>
        <label className="label" htmlFor="clientConcern">Tell us a little more</label>
        <p className="mb-1 text-xs text-bark">A few sentences help us prepare. This is required.</p>
        <textarea id="clientConcern" rows={5} className="field" aria-invalid={Boolean(errors.clientConcern)} {...register("clientConcern")} />
        <FieldError message={errors.clientConcern?.message} />
      </div>
      <div>
        <label className="label" htmlFor="attachments">Floor plan upload, if you have one</label>
        <input id="attachments" name="attachments" type="file" multiple accept="image/jpeg,image/png,image/webp,application/pdf" className="field" />
        <p className="mt-1 text-xs text-deep/60">Optional. Up to 5 files, 8 MB each. JPG, PNG, WEBP, or PDF.</p>
      </div>
      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <input type="checkbox" className="mt-1" {...register("privacyConsent")} />
        <span>I agree that these details may be stored so the consultancy can respond to this enquiry.</span>
      </label>
      <FieldError message={errors.privacyConsent?.message} />
      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <input type="checkbox" className="mt-1" {...register("marketingConsent")} />
        <span>I am willing to receive occasional notes about the practice. This is optional, and it is not required to enquire.</span>
      </label>
      {formError ? (
        <p className="border border-terracotta/40 bg-sand/40 px-4 py-3 text-sm" role="alert">
          {formError}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-deep px-6 py-3.5 text-[0.72rem] font-semibold tracking-[0.18em] text-ivory uppercase disabled:opacity-60"
      >
        {isSubmitting ? "Sending" : "Book a Visit"}
      </button>
    </form>
  );
}
