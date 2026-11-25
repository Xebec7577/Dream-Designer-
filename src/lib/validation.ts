import { z } from "zod";
import crypto from "crypto";

const cleanText = (val: string) => val.replace(/[<>]/g, "").trim();

export const enquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name.").max(120).transform(cleanText),
  phone: z
    .string()
    .min(8, "Please enter a valid phone or WhatsApp number.")
    .max(30)
    .regex(/^[+0-9\s()-]{8,30}$/, "Phone number contains invalid characters.")
    .transform((v) => v.trim()),
  email: z.string().email("Please enter a valid email address.").max(160).transform((v) => v.trim().toLowerCase()),
  city: z.string().min(2, "Please enter your project city or location.").max(120).transform(cleanText),
  propertyType: z.enum([
    "Independent house",
    "Villa",
    "Apartment",
    "Office",
    "Commercial space",
    "Other",
  ]),
  serviceRequired: z.enum([
    "Architecture",
    "Interior design",
    "3D visualisation",
    "Multiple services",
    "Not sure yet",
  ]),
  projectStage: z.string().min(2, "Please select the current stage of your property.").max(120).transform(cleanText),
  approximateArea: z.string().max(80).optional().transform((v) => (v ? cleanText(v) : undefined)),
  budgetRange: z.string().max(100).optional().transform((v) => (v ? cleanText(v) : undefined)),
  projectTimeline: z.string().max(100).optional().transform((v) => (v ? cleanText(v) : undefined)),
  additionalRequirements: z.string().max(2000).optional().transform((v) => (v ? cleanText(v) : undefined)),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm consent so Dream Designers can respond to your enquiry." }),
  }),
  sourcePage: z.string().max(200).optional().default("/start-project").transform((v) => cleanText(v || "/start-project")),
  websiteUrl: z.string().max(0).optional().default(""),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export function computeSubmissionFingerprint(data: {
  phone: string;
  email: string;
  propertyType: string;
  serviceRequired: string;
}): string {
  const normalized = [
    data.phone.replace(/\D/g, ""),
    data.email.toLowerCase().trim(),
    data.propertyType,
    data.serviceRequired,
  ].join("|");
  return crypto.createHash("sha256").update(normalized).digest("hex");
}
