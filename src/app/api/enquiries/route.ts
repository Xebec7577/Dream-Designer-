import { NextResponse } from "next/server";
import { and, eq, gte } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/db";
import { leads } from "@/db/schema";
import { computeSubmissionFingerprint, enquirySchema } from "@/lib/validation";
import { sendEnquiryNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid request payload." }, { status: 400 });
    }

    // Silent honeypot spam trap
    if (typeof body.websiteUrl === "string" && body.websiteUrl.trim().length > 0) {
      return NextResponse.json({ ok: true, referenceId: "DD-RECEIVED", message: "Thank you." });
    }

    const parsed = enquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const data = parsed.data;
    const fingerprint = computeSubmissionFingerprint({
      phone: data.phone,
      email: data.email,
      propertyType: data.propertyType,
      serviceRequired: data.serviceRequired,
    });

    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        {
          ok: false,
          code: "DATABASE_NOT_CONFIGURED",
          error:
            "Enquiry database is not yet connected. Add DATABASE_URL in Vercel Environment Variables or message Dream Designers on WhatsApp (+91 72065 57887).",
        },
        { status: 503 }
      );
    }

    const db = getDb();
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const existing = await db
      .select({ id: leads.id })
      .from(leads)
      .where(and(eq(leads.submissionFingerprint, fingerprint), gte(leads.createdAt, tenMinutesAgo)))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({
        ok: true,
        duplicate: true,
        referenceId: existing[0].id,
        message: "We already received this enquiry a few moments ago. Our studio will be in touch shortly.",
      });
    }

    const [inserted] = await db
      .insert(leads)
      .values({
        name: data.name,
        phone: data.phone,
        email: data.email,
        city: data.city,
        propertyType: data.propertyType,
        serviceRequired: data.serviceRequired,
        projectStage: data.projectStage,
        approximateArea: data.approximateArea ?? null,
        budgetRange: data.budgetRange ?? null,
        projectTimeline: data.projectTimeline ?? null,
        additionalRequirements: data.additionalRequirements ?? null,
        consent: data.consent,
        sourcePage: data.sourcePage,
        submissionFingerprint: fingerprint,
      })
      .returning({ id: leads.id });

    let emailNotified = false;
    try {
      const mail = await sendEnquiryNotification(inserted.id, data);
      emailNotified = mail.sent;
    } catch {
      emailNotified = false;
    }

    return NextResponse.json(
      {
        ok: true,
        referenceId: inserted.id,
        emailNotified,
        message: "Thank you. Your project brief has been recorded with Dream Designers.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/enquiries]", err);
    return NextResponse.json(
      { ok: false, error: "Could not submit your enquiry right now. Please try WhatsApp (+91 72065 57887)." },
      { status: 500 }
    );
  }
}
