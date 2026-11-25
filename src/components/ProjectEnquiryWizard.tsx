"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/lib/site-config";

const PROPERTY_TYPES = ["Independent house", "Villa", "Apartment", "Office", "Commercial space", "Other"] as const;
const SERVICES = ["Architecture", "Interior design", "3D visualisation", "Multiple services", "Not sure yet"] as const;
const STAGES = [
  "New construction — plot / planning stage",
  "Under construction — shell ready",
  "Possession upcoming (within 6 months)",
  "Existing property — full renovation",
  "Existing property — partial refresh",
] as const;

export function ProjectEnquiryWizard({ initialContext }: { initialContext?: string }) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ referenceId: string; message: string } | null>(null);
  const [form, setForm] = useState({
    propertyType: "", serviceRequired: "", city: "", approximateArea: "",
    projectStage: "", budgetRange: "", projectTimeline: "",
    name: "", phone: "", email: "", additionalRequirements: initialContext || "",
    consent: false, websiteUrl: "",
  });

  const canProceed = () => {
    if (step === 1) return Boolean(form.propertyType);
    if (step === 2) return Boolean(form.serviceRequired);
    if (step === 3) return form.city.trim().length >= 2 && Boolean(form.projectStage);
    if (step === 4) return true;
    if (step === 5) return form.name.trim().length >= 2 && form.phone.trim().length >= 8 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (step === 6) return form.consent;
    return false;
  };

  async function handleSubmit() {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sourcePage: typeof window !== "undefined" ? window.location.pathname : "/start-project" }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) setError(json.error || "Unable to submit right now.");
      else setResult({ referenceId: json.referenceId, message: json.message });
    } catch {
      setError("Network error while submitting. Please try again or use WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    const waSummary = buildWhatsAppUrl(`Hello Dream Designers, I submitted a project brief (Ref: ${result.referenceId}). Property: ${form.propertyType}, Service: ${form.serviceRequired}, City: ${form.city}. Name: ${form.name}.`);
    return (
      <div className="rounded-3xl bg-canvas p-6 sm:p-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-pure"><Check className="h-5 w-5" /></div>
        <h2 className="mt-5 font-display text-2xl sm:text-3xl font-bold text-ink">Your project brief has been received.</h2>
        <p className="mt-3 text-sm text-slateMuted">{result.message}</p>
        <p className="mt-4 text-xs font-semibold text-ink">Reference ID: {result.referenceId}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={waSummary} target="_blank" rel="noopener noreferrer" className="glass-black inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold"><MessageCircle className="h-4 w-4" /> Continue on WhatsApp</a>
          <a href={SITE_CONFIG.phoneHref} className="glass-white rounded-full px-6 py-3 text-xs font-semibold">Call {SITE_CONFIG.phoneDisplay}</a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-canvas p-5 sm:p-10">
      <div className="mb-6 flex items-center justify-between border-b border-hairline pb-4">
        <span className="text-xs font-semibold text-slateMuted">Step 0{step} / 06</span>
        <div className="flex gap-1.5">{[1, 2, 3, 4, 5, 6].map((i) => <span key={i} className={`h-1.5 w-5 sm:w-6 rounded-full ${i <= step ? "bg-ink" : "bg-hairline"}`} />)}</div>
      </div>
      <input type="text" value={form.websiteUrl} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {step === 1 && (
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold">What are you planning?</h2>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {PROPERTY_TYPES.map((item) => (
              <button key={item} type="button" onClick={() => setForm({ ...form, propertyType: item })} className={`rounded-2xl px-4 py-3.5 text-left text-sm font-medium ${form.propertyType === item ? "glass-black" : "glass-white"}`}>{item}</button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold">What services do you need?</h2>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {SERVICES.map((item) => (
              <button key={item} type="button" onClick={() => setForm({ ...form, serviceRequired: item })} className={`rounded-2xl px-4 py-3.5 text-left text-sm font-medium ${form.serviceRequired === item ? "glass-black" : "glass-white"}`}>{item}</button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <h2 className="font-display text-xl sm:text-2xl font-bold">Project details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-semibold text-slateMuted">City &amp; Location *<input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="e.g., Ambala City, Sector 23" className="mt-2 w-full rounded-xl border border-hairline bg-pure px-4 py-3 text-sm text-ink" /></label>
            <label className="block text-xs font-semibold text-slateMuted">Approximate Area<input type="text" value={form.approximateArea} onChange={(e) => setForm({ ...form, approximateArea: e.target.value })} placeholder="e.g., 2,800 sq. ft." className="mt-2 w-full rounded-xl border border-hairline bg-pure px-4 py-3 text-sm text-ink" /></label>
          </div>
          <div className="space-y-2">
            {STAGES.map((s) => (
              <button key={s} type="button" onClick={() => setForm({ ...form, projectStage: s })} className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-medium ${form.projectStage === s ? "glass-black" : "glass-white"}`}>{s}</button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-5">
          <h2 className="font-display text-xl sm:text-2xl font-bold">Indicative budget &amp; timeline (Optional)</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {SITE_CONFIG.configurableBudgetRanges.map((b) => (
              <button key={b} type="button" onClick={() => setForm({ ...form, budgetRange: form.budgetRange === b ? "" : b })} className={`rounded-xl px-4 py-3 text-left text-xs font-medium ${form.budgetRange === b ? "glass-black" : "glass-white"}`}>{b}</button>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {SITE_CONFIG.configurableTimelines.map((t) => (
              <button key={t} type="button" onClick={() => setForm({ ...form, projectTimeline: form.projectTimeline === t ? "" : t })} className={`rounded-xl px-4 py-3 text-left text-xs font-medium ${form.projectTimeline === t ? "glass-black" : "glass-white"}`}>{t}</button>
            ))}
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-4">
          <h2 className="font-display text-xl sm:text-2xl font-bold">Your contact details</h2>
          <label className="block text-xs font-semibold text-slateMuted">Full Name *<input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-xl border border-hairline bg-pure px-4 py-3 text-sm text-ink" /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-semibold text-slateMuted">Phone / WhatsApp *<input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98XXX XXXXX" className="mt-2 w-full rounded-xl border border-hairline bg-pure px-4 py-3 text-sm text-ink" /></label>
            <label className="block text-xs font-semibold text-slateMuted">Email *<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-hairline bg-pure px-4 py-3 text-sm text-ink" /></label>
          </div>
          <label className="block text-xs font-semibold text-slateMuted">Additional Notes<textarea rows={3} value={form.additionalRequirements} onChange={(e) => setForm({ ...form, additionalRequirements: e.target.value })} className="mt-2 w-full rounded-xl border border-hairline bg-pure px-4 py-3 text-sm text-ink" /></label>
        </div>
      )}

      {step === 6 && (
        <div className="space-y-5">
          <h2 className="font-display text-xl sm:text-2xl font-bold">Review &amp; submit brief</h2>
          <div className="grid gap-3 rounded-2xl border border-hairline bg-pure p-5 text-sm sm:grid-cols-2">
            <div><span className="text-slateMuted">Property:</span> {form.propertyType}</div>
            <div><span className="text-slateMuted">Service:</span> {form.serviceRequired}</div>
            <div><span className="text-slateMuted">Location:</span> {form.city}</div>
            <div><span className="text-slateMuted">Stage:</span> {form.projectStage}</div>
            <div><span className="text-slateMuted">Contact:</span> {form.name} ({form.phone})</div>
          </div>
          <label className="flex items-start gap-3 text-sm text-slateMuted">
            <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 h-4 w-4 accent-ink" />
            <span>I consent to Dream Designers storing and using these details solely to respond to my project enquiry.</span>
          </label>
        </div>
      )}

      {error && <div role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-900">{error}</div>}

      <div className="mt-7 flex items-center justify-between border-t border-hairline pt-5">
        <button type="button" disabled={step === 1 || submitting} onClick={() => setStep((s) => Math.max(1, s - 1))} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slateMuted disabled:opacity-30">
          <ArrowLeft className="h-3.5 w-3.5" /> Back
        </button>
        {step < 6 ? (
          <button type="button" disabled={!canProceed()} onClick={() => setStep((s) => Math.min(6, s + 1))} className="glass-black inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold disabled:opacity-35">
            {step === 4 && !form.budgetRange && !form.projectTimeline ? "Skip & Continue" : "Continue"} <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button type="button" disabled={!canProceed() || submitting} onClick={handleSubmit} className="glass-black rounded-full px-7 py-3 text-xs font-semibold disabled:opacity-35">
            {submitting ? "Submitting..." : "Submit Project Brief"}
          </button>
        )}
      </div>
    </div>
  );
}
