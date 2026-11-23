import { z } from "zod";

export const reviewSchema = z.object({
  clientName: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Please keep the name under 80 characters."),
  clientEmail: z
    .string()
    .trim()
    .email("Enter a valid email address, or leave this blank.")
    .or(z.literal(""))
    .optional()
    .transform((value) => value ?? ""),
  rating: z.coerce
    .number()
    .int("Choose a whole-number rating.")
    .min(1, "Please choose a rating from 1 to 5.")
    .max(5, "Please choose a rating from 1 to 5."),
  reviewText: z
    .string()
    .trim()
    .min(20, "Please write at least a short review.")
    .max(2000, "Please keep the review under 2000 characters."),
  experienceText: z
    .string()
    .trim()
    .max(2000, "Please keep the experience note under 2000 characters.")
    .optional()
    .transform((value) => value ?? ""),
  publishConsent: z.boolean(),
  website: z.string().max(0).optional(),
  startedAt: z.string().optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
