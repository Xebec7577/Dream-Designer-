import { Resend } from "resend";
import type { EnquiryInput } from "./validation";

export async function sendEnquiryNotification(
  leadId: string,
  enquiry: EnquiryInput
): Promise<{ sent: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEADS_NOTIFICATION_EMAIL;
  const fromEmail = process.env.EMAIL_FROM;

  if (!apiKey || !toEmail || !fromEmail) {
    return { sent: false, reason: "Email notification env vars not configured" };
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: enquiry.email,
    subject: `New Project Enquiry — ${enquiry.propertyType} (${enquiry.city})`,
    text: [
      `Reference ID: ${leadId}`,
      `Client Name: ${enquiry.name}`,
      `Phone: ${enquiry.phone}`,
      `Email: ${enquiry.email}`,
      `City / Location: ${enquiry.city}`,
      `Property Type: ${enquiry.propertyType}`,
      `Service Required: ${enquiry.serviceRequired}`,
      `Project Stage: ${enquiry.projectStage}`,
      `Approximate Area: ${enquiry.approximateArea || "Not provided"}`,
      `Indicative Budget: ${enquiry.budgetRange || "Skipped"}`,
      `Target Timeline: ${enquiry.projectTimeline || "Skipped"}`,
      `Source Page: ${enquiry.sourcePage}`,
      "",
      "Additional Requirements:",
      enquiry.additionalRequirements || "None specified.",
    ].join("\n"),
  });

  return { sent: true };
}
