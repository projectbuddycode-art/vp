import { z } from "zod";
import {
  concernValues,
  modeValues,
  propertyTypeValues,
} from "@/lib/site";
import { normalizeIndianMobile } from "@/lib/utils";

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120),
  mobile: z
    .string()
    .trim()
    .refine((value) => normalizeIndianMobile(value) !== null, {
      message: "Enter a valid 10-digit Indian mobile number.",
    }),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address.")
    .max(160),
  city: z.string().trim().min(2, "Please enter your city.").max(80),
  propertyType: z.enum(propertyTypeValues, { message: "Select a property type." }),
  consultationCategory: z.enum(concernValues, { message: "Select a concern." }),
  consultationMode: z.enum(modeValues, { message: "Select how you would like to consult." }),
  preferredDate: z.string(),
  propertyDescription: z.string().max(4000),
  clientConcern: z
    .string()
    .trim()
    .min(20, "Please describe the concern in at least a few sentences.")
    .max(4000),
  privacyConsent: z.boolean().refine((value) => value, {
    message: "Consent is required before an enquiry can be sent.",
  }),
  marketingConsent: z.boolean(),
  website: z.string(),
  startedAt: z.string(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export function parsePreferredDate(value: string | undefined) {
  if (!value) return { ok: true as const, date: null };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return { ok: false as const, message: "Choose a valid date." };
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const chosen = new Date(`${value}T00:00:00`);
  if (Number.isNaN(chosen.getTime()) || chosen < today) {
    return { ok: false as const, message: "The preferred date should be today or later." };
  }
  return { ok: true as const, date: value };
}
