import type { Metadata } from "next";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { ProjectEnquiryWizard } from "@/components/ProjectEnquiryWizard";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Start Your Project",
  description: "Submit a structured architecture, interior design, or 3D visualisation project brief to Dream Designers.",
};

export default function StartProjectPage({ searchParams }: { searchParams?: { ref?: string } }) {
  const initialContext = searchParams?.ref ? `Interested in: ${searchParams.ref}` : undefined;
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-ink">
            Start Your <span className="font-normal text-slateMuted">Project.</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slateMuted">
            Share structured details so Dream Designers can prepare thoughtfully for your first consultation.
          </p>
          <div className="mt-7 space-y-3 border-t border-hairline pt-6 text-sm text-slateMuted">
            <a href={SITE_CONFIG.phoneHref} className="flex items-center gap-3 font-medium text-ink"><Phone className="h-4 w-4" /> {SITE_CONFIG.phoneDisplay}</a>
            <a href={buildWhatsAppUrl("Hello Dream Designers, I would like to discuss a new project.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-medium text-ink"><MessageCircle className="h-4 w-4" /> Message on WhatsApp</a>
            <a href={SITE_CONFIG.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-ink"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {SITE_CONFIG.address.full}</a>
          </div>
        </div>
        <div className="lg:col-span-8">
          <ProjectEnquiryWizard initialContext={initialContext} />
        </div>
      </div>
    </section>
  );
}
