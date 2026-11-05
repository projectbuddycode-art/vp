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
