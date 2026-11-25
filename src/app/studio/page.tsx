import type { Metadata } from "next";
import { ArrowUpRight, MapPin } from "lucide-react";
import { IMAGES } from "@/data/catalog";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "The Studio",
  description: "Dream Designers — Architecture, Interior Design, and 3D Visualisation studio in Ambala City led by Paras Julka.",
};

export default function StudioPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 lg:px-10">
      <h1 className="max-w-4xl font-display text-3xl sm:text-6xl font-bold tracking-tight text-ink">
        The Studio. <span className="font-normal text-slateMuted">Built for timeless spaces.</span>
      </h1>
      <div className="relative mt-8 sm:mt-12 aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-2xl sm:rounded-3xl bg-canvas shadow-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMAGES.studio} alt="Dream Designers architectural studio" className="h-full w-full object-cover" />
      </div>
      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <div className="space-y-5 text-sm sm:text-base leading-relaxed text-slateMuted lg:col-span-7">
          <p>
            <strong className="text-ink">{SITE_CONFIG.name}</strong> is a boutique architecture, interior design, and 3D
            visualisation studio in Ambala City, founded by <strong className="text-ink">{SITE_CONFIG.founder}</strong>.
          </p>
          <p>
            Guided by &ldquo;{SITE_CONFIG.tagline}&rdquo;, we design independent residences, bespoke interiors, and
            select commercial environments defined by proportion, daylight, and honest materials.
          </p>
          <p>
            From initial plot orientation and spatial planning to photorealistic 3D walkthroughs and execution
            detailing, every commission is tailored to how our clients actually live and host.
          </p>
        </div>
        <aside className="rounded-3xl bg-canvas p-6 sm:p-8 lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slateMuted">Studio Details</p>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-xs text-slateMuted">Founder</dt>
              <dd className="mt-1 font-semibold text-ink">{SITE_CONFIG.founder}</dd>
            </div>
            <div>
              <dt className="text-xs text-slateMuted">Disciplines</dt>
              <dd className="mt-1 text-ink">{SITE_CONFIG.specialties.join(" · ")}</dd>
            </div>
            <div>
              <dt className="text-xs text-slateMuted">Studio Address</dt>
              <dd className="mt-1 text-ink">{SITE_CONFIG.address.full}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <a
              href={SITE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-black inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold"
            >
              <MapPin className="h-3.5 w-3.5" /> Google Maps
            </a>
            <a
              href={SITE_CONFIG.social.linkedinFounder}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-white inline-flex items-center gap-1 rounded-full px-5 py-2.5 text-xs font-semibold"
            >
              LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
