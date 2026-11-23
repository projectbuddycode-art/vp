import "server-only";
import { labelFor, concernCategories, consultationModes, propertyTypes } from "@/lib/site";

type Notice = {
  enquiryCode: string;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  propertyType: string;
  category: string;
  mode: string;
  concern: string;
};

async function sendEmail(to: string, subject: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) return { sent: false, reason: "Email delivery is not configured." };
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, text }),
  });
  if (!response.ok) return { sent: false, reason: "The email service did not accept the message." };
  return { sent: true, reason: "" };
}

export async function notifyEnquiry(notice: Notice) {
  const admin = process.env.ADMIN_NOTIFICATION_EMAIL;
  const summary = [
    `New consultation enquiry ${notice.enquiryCode}`,
    `Name: ${notice.fullName}`,
    `Mobile: ${notice.mobile}`,
    `Email: ${notice.email}`,
    `City: ${notice.city}`,
    `Property: ${labelFor(propertyTypes, notice.propertyType)}`,
    `Concern: ${labelFor(concernCategories, notice.category)}`,
    `Mode: ${labelFor(consultationModes, notice.mode)}`,
    "",
    notice.concern,
  ].join("\n");

  const adminResult = admin
    ? await sendEmail(admin, `Consultation enquiry ${notice.enquiryCode}`, summary)
    : { sent: false, reason: "No administrator email is configured." };

  const visitorResult = notice.email
    ? await sendEmail(
    notice.email,
    `Enquiry received · ${notice.enquiryCode}`,
    [
      `Dear ${notice.fullName},`,
      "",
      `Your consultation enquiry has been received. The reference is ${notice.enquiryCode}.`,
      "The consultancy will review it and be in touch about the next step.",
      "",
      "This note confirms receipt only. It does not confirm a visit date, and it does not promise a particular outcome.",
      "",
      "Sanjeev Jain",
      "STHAPATYA",
    ].join("\n"),
    )
    : { sent: false, reason: "No email address was given." };

  return {
    adminNotified: adminResult.sent,
    visitorNotified: visitorResult.sent,
    emailNote: visitorResult.sent ? "" : visitorResult.reason,
  };
}

export type ReviewNotice = {
  reviewId: string;
  clientName: string;
  rating: number;
  reviewText: string;
  experienceText: string;
  moderationUrl: string;
};

export async function notifyReviewSubmitted(notice: ReviewNotice) {
  const admin = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!admin) {
    return { sent: false, reason: "ADMIN_NOTIFICATION_EMAIL is not configured." };
  }
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    return { sent: false, reason: "Email delivery is not configured (RESEND_API_KEY / EMAIL_FROM)." };
  }

  const summary = [
    "A new client review was submitted for STHAPATYA.",
    "",
    `Review ID: ${notice.reviewId}`,
    `Name: ${notice.clientName}`,
    `Rating: ${notice.rating} / 5`,
    "",
    "Review:",
    notice.reviewText,
    "",
    notice.experienceText ? `Experience note:\n${notice.experienceText}\n` : "",
    "Status: PENDING — not published.",
    "",
    "Open the secure moderation link to approve or reject (expires, single use):",
    notice.moderationUrl,
    "",
    "You can also manage reviews after signing in at /admin/reviews.",
    "Do not forward this link. It is for Sanjeev Jain / authorised administrators only.",
  ]
    .filter(Boolean)
    .join("\n");

  return sendEmail(admin, `New client review · ${notice.clientName}`, summary);
}
