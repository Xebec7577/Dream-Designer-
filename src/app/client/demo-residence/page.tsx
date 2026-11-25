import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock, Lock } from "lucide-react";
import { IMAGES } from "@/data/catalog";
import { buildWhatsAppUrl } from "@/lib/site-config";
import { OpenTourButton } from "@/components/OpenTourButton";

export const metadata: Metadata = {
  title: "Private Client Portal — Sector 23 Residence",
  description: "Private client project portal by Dream Designers for reviewing 3D renders, material boards, and stage milestones.",
};

const MILESTONES = [
  { num: "01", title: "Discovery & Site Brief", status: "Completed", done: true },
  { num: "02", title: "Spatial Concept & Floor Plan", status: "Completed", done: true },
  { num: "03", title: "Material Palette & Millwork", status: "Approved", done: true },
  { num: "04", title: "3D Room Visualisation", status: "Ready for Review", done: false },
  { num: "05", title: "Execution Drawings", status: "Upcoming", done: false },
];

const RENDERS = [
  { title: "Living Salon & Courtyard", room: "living", img: IMAGES.panoLiving },
  { title: "Acoustic Walnut Media Lounge", room: "media", img: IMAGES.mediaLounge },
  { title: "Monolithic Culinary Hall", room: "kitchen", img: IMAGES.panoKitchen },
  { title: "Master Suite & Glass Wardrobe", room: "master", img: IMAGES.panoMaster },
  { title: "Monolith Travertine Spa Bath", room: "master", img: IMAGES.spaBath },
  { title: "Twilight Terrace Pavilion", room: "terrace", img: IMAGES.terrace },
];

export default function ClientPortalDemoPage() {
  const feedbackWa = buildWhatsAppUrl(
    "Hello Dream Designers, I reviewed the 3D renders on our Client Project Portal and would like to share feedback."
  );

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <div className="rounded-3xl bg-ink p-6 sm:p-10 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
            <Lock className="h-3 w-3" /> Private Client Portal
          </span>
          <a href={feedbackWa} target="_blank" rel="noopener noreferrer" className="glass-white inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold">
            Message Studio <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <h1 className="mt-5 font-display text-3xl sm:text-5xl font-bold tracking-tight">
          Sector 23 Residence
        </h1>
        <p className="mt-2 max-w-2xl text-xs sm:text-sm text-white/65">
          Dedicated client workspace for tracking live architectural milestones, approving material palettes, and walking through 3D rooms from any device.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-5">
          {MILESTONES.map((m) => (
            <div key={m.num} className={`rounded-2xl border p-4 ${m.done ? "border-white/25 bg-white/10" : "border-white/10 bg-white/[0.03]"}`}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white/60">{m.num}</span>
                {m.done ? <CheckCircle2 className="h-4 w-4 text-white" /> : <Clock className="h-4 w-4 text-white/45" />}
              </div>
              <p className="mt-2 font-display text-xs font-semibold text-white">{m.title}</p>
              <p className="mt-1 text-[10px] text-white/55">{m.status}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slateMuted">Stage 04 Deliverables</p>
            <h2 className="mt-1 font-display text-2xl sm:text-4xl font-bold text-ink">Latest 3D Room Visuals</h2>
          </div>
          <OpenTourButton roomId="living" label="Open Fullscreen Walkthrough" />
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RENDERS.map((r) => (
            <div key={r.title} className="overflow-hidden rounded-3xl border border-hairline bg-canvas">
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.img} alt={r.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <p className="font-display text-sm font-bold text-ink">{r.title}</p>
                <OpenTourButton roomId={r.room} label="Inspect" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-8 rounded-3xl bg-canvas p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
        <div className="aspect-square overflow-hidden rounded-2xl lg:col-span-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMAGES.material} alt="Approved travertine, fluted oak, lime plaster, and bronze board" className="h-full w-full object-cover" />
        </div>
        <div className="lg:col-span-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-slateMuted">Stage 03 &middot; Material Specification</span>
          <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-ink">Approved Architectural Palette</h3>
          <p className="mt-3 text-sm text-slateMuted">
            Honed warm travertine, quarter-cut fluted oak, hand-troweled ivory lime plaster, raw limestone flooring, and brushed muted bronze hardware.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={feedbackWa} target="_blank" rel="noopener noreferrer" className="glass-black rounded-full px-6 py-3 text-xs font-semibold">
              Approve Stage 04 on WhatsApp
            </a>
            <Link href="/start-project" className="glass-white rounded-full px-6 py-3 text-xs font-semibold">
              Start Your Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
