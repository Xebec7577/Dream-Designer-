"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Compass, Lock, Play } from "lucide-react";
import { FEATURED_MONTHLY, HOME_MODELS, IMAGES, INTERIOR_SHOWCASE, REELS_DATA, STUDIES } from "@/data/catalog";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/lib/site-config";
import { useSpatialTour } from "./SpatialTourContext";

const SWATCHES = [
  { id: "ivory", hex: "#F0ECE4", label: "Honed Travertine", filter: "none" },
  { id: "limestone", hex: "#D9D6CE", label: "Cool Limestone", filter: "brightness(1.06) saturate(0.84)" },
  { id: "oak", hex: "#A98863", label: "Natural Oak", filter: "saturate(1.1) sepia(0.08)" },
  { id: "charcoal", hex: "#444448", label: "Smoked Slate", filter: "contrast(1.12) brightness(0.88) saturate(0.85)" },
  { id: "obsidian", hex: "#18181A", label: "Obsidian Finish", filter: "contrast(1.14) brightness(0.82) saturate(0.82)" },
];

export function HomeExperience() {
  const [idx, setIdx] = useState(0);
  const [swatch, setSwatch] = useState(SWATCHES[0]);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const { openPicker, openRoom } = useSpatialTour();

  const m = HOME_MODELS[idx];
  const waHref = buildWhatsAppUrl("Hello Dream Designers, I explored your Digital Showroom and would like to schedule a consultation.");

  return (
    <>
      {/* 1. MOBILE-FIRST SAMARA MINIMAL WHITE HERO */}
      <section className="bg-pure pb-14 sm:pb-24 pt-8 sm:pt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-ink">
            Five spaces. <span className="font-normal text-slateMuted">Endless possibility.</span>
          </h1>

          <div className="mt-7 sm:mt-12">
            <p className="font-display text-lg sm:text-2xl font-semibold text-ink">{m.name}</p>
            <p className="mt-1 text-xs sm:text-sm text-slateMuted">{m.subtitle}</p>

            <div className="relative mx-auto mt-5 sm:mt-8 max-w-4xl">
              <div className="aspect-[4/5] sm:aspect-[16/9] overflow-hidden rounded-3xl bg-canvas shadow-[0_24px_70px_rgba(0,0,0,0.08)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.img} alt={m.name} className="h-full w-full object-cover transition-all duration-500" style={{ filter: swatch.filter }} />
              </div>
              <button type="button" aria-label="Previous space" onClick={() => setIdx((i) => (i - 1 + HOME_MODELS.length) % HOME_MODELS.length)} className="glass-white absolute left-2.5 sm:left-4 top-1/2 flex h-10 w-10 sm:h-11 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" aria-label="Next space" onClick={() => setIdx((i) => (i + 1) % HOME_MODELS.length)} className="glass-white absolute right-2.5 sm:right-4 top-1/2 flex h-10 w-10 sm:h-11 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2.5">
              {SWATCHES.map((sw) => (
                <button key={sw.id} type="button" title={sw.label} aria-label={sw.label} onClick={() => setSwatch(sw)} className={`h-8 w-8 rounded-full border-2 p-0.5 transition-all ${swatch.id === sw.id ? "scale-110 border-ink" : "border-transparent"}`}>
                  <span className="block h-full w-full rounded-full shadow-inner" style={{ backgroundColor: sw.hex }} />
                </button>
              ))}
            </div>

            <p className="mt-3.5 text-xs font-medium text-slateMuted">{m.meta}</p>
            <p className="mt-1 text-[11px] text-slateMuted/75">Dream Designers, Ambala &middot; Concept Visual Direction</p>

            <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2.5 rounded-3xl sm:rounded-full bg-canvas px-4 py-2.5">
              <Link href="/showroom" className="glass-black rounded-full px-5 py-2.5 text-xs font-semibold">
                Open 3D Showroom &rarr;
              </Link>
              <button type="button" onClick={() => openRoom(m.tourRoom)} className="glass-white rounded-full px-5 py-2.5 text-xs font-semibold">
                Peek Inside in 3D
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PROJECT OF THE MONTH (MONTHLY RETAINER SHOWCASE) */}
      <section className="border-y border-hairline bg-canvas py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-8 rounded-3xl bg-pure p-5 sm:p-10 shadow-sm lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="inline-block rounded-full bg-canvas px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slateMuted">
                {FEATURED_MONTHLY.monthLabel}
              </span>
              <h2 className="mt-3 font-display text-2xl sm:text-4xl font-bold tracking-tight text-ink">
                {FEATURED_MONTHLY.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slateMuted">{FEATURED_MONTHLY.subtitle}</p>
              <ul className="mt-5 space-y-2 text-xs sm:text-sm text-ink/80">
                {FEATURED_MONTHLY.highlights.map((h) => <li key={h}>&mdash; {h}</li>)}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <button type="button" onClick={() => openRoom(FEATURED_MONTHLY.tourRoom)} className="glass-black inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold">
                  <Compass className="h-3.5 w-3.5" /> Tour Featured Space
                </button>
                <Link href={`/projects/${FEATURED_MONTHLY.slug}`} className="glass-white rounded-full px-5 py-2.5 text-xs font-semibold">
                  Read Case Study
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-6">
              <div className="aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-2xl bg-canvas">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={FEATURED_MONTHLY.coverImage} alt="Twilight terrace pavilion" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-2xl bg-canvas">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={FEATURED_MONTHLY.secondaryImage} alt="Acoustic walnut media lounge" loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RICH 8-ROOM INTERIOR GALLERY (TAP ANY ROOM TO OPEN 3D VIEW) */}
      <section className="bg-pure py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slateMuted">Inside Every Room</p>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink">
                Interiors. <span className="font-normal text-slateMuted">Room by room.</span>
              </h2>
            </div>
            <button type="button" onClick={openPicker} className="glass-black self-start sm:self-auto rounded-full px-5 py-2.5 text-xs font-semibold">
              Open All 8 Spaces in 3D
            </button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
            {INTERIOR_SHOWCASE.map((room) => (
              <button key={room.title} type="button" onClick={() => openRoom(room.tourRoom)} className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-hairline bg-canvas text-left transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={room.img} alt={room.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-3.5 sm:p-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slateMuted">{room.tag}</span>
                  <p className="mt-1 font-display text-sm sm:text-base font-bold text-ink">{room.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 19-SECOND SAMARA "PEEK INSIDE." HOOK */}
      <section className="bg-canvas py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="group relative aspect-[4/5] sm:aspect-[16/9] overflow-hidden rounded-3xl bg-black shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.panoLiving} alt="Peek inside Dream Designers luxury residence" className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.02]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
              <h2 className="font-display text-4xl sm:text-7xl font-bold tracking-[-0.03em] text-white">Peek inside.</h2>
              <button type="button" onClick={openPicker} className="glass-white mt-5 sm:mt-7 inline-flex items-center gap-2 rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold">
                <Compass className="h-4 w-4" /> Tour Residence in 3D
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 11-SECOND SQUARESPACE BLACK PORTFOLIO */}
      <section className="overflow-hidden bg-black py-16 sm:py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">Crafted by Dream Designers</p>
              <h2 className="mt-2 font-display text-4xl sm:text-7xl font-bold uppercase tracking-[-0.03em]">PORTFOLIO</h2>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Scroll left" onClick={() => stripRef.current?.scrollBy({ left: -340, behavior: "smooth" })} className="glass-frosted-dark flex h-10 w-10 items-center justify-center rounded-full"><ArrowLeft className="h-4 w-4" /></button>
              <button type="button" aria-label="Scroll right" onClick={() => stripRef.current?.scrollBy({ left: 340, behavior: "smooth" })} className="glass-frosted-dark flex h-10 w-10 items-center justify-center rounded-full"><ArrowRight className="h-4 w-4" /></button>
              <Link href="/projects" className="glass-white rounded-full px-5 py-2.5 text-xs font-semibold">All 10 Studies</Link>
            </div>
          </div>
        </div>

        <div ref={stripRef} className="no-scrollbar mt-10 flex gap-5 sm:gap-7 overflow-x-auto px-4 sm:px-6 pb-4 lg:px-10 snap-x snap-mandatory">
          {STUDIES.map((s) => (
            <Link key={s.slug} href={`/projects/${s.slug}`} className="group w-[82vw] max-w-[420px] shrink-0 snap-start">
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5">
                <div className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.coverImage} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>
              <div className="mt-3.5 flex items-baseline justify-between gap-3">
                <h3 className="font-display text-base sm:text-lg font-semibold text-white group-hover:text-white/75">{s.title}</h3>
                <span className="text-[11px] text-white/50">{s.categories[0]}</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-white/55">{s.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. PRIVATE CLIENT PORTAL PREVIEW (THE MONTHLY RETAINER CLOSER!) */}
      <section className="border-b border-hairline bg-pure py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 rounded-3xl bg-ink p-6 sm:p-12 text-white lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
                <Lock className="h-3 w-3" /> Private Client Experience
              </span>
              <h2 className="mt-4 font-display text-2xl sm:text-4xl font-bold tracking-tight">
                Give every client their own private project portal.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                Instead of scattering 3D renders across WhatsApp groups, each Dream Designers client receives a private link showing their stage progress, approved material board, and interactive 3D rooms.
              </p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <Link href="/client/demo-residence" className="glass-white inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold">
                Preview Live Client Portal <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REELS & SOCIAL */}
      <section className="border-b border-hairline bg-pure py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slateMuted">Studio Motion &amp; Social</p>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink">
                Reels &amp; Feed <span className="font-normal text-slateMuted">@dream.designerz</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Link href="/reels" className="glass-white rounded-full px-5 py-2.5 text-xs font-semibold">Open Social Gallery</Link>
              <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="glass-black inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-semibold">
                Instagram <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
            {REELS_DATA.map((r) => (
              <Link key={r.id} href="/reels" className="group relative aspect-[9/16] overflow-hidden rounded-2xl sm:rounded-3xl bg-black text-left shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.img} alt={r.title} loading="lazy" className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <span className="glass-frosted-dark absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] sm:text-[10px] font-medium">{r.tag}</span>
                <span className="glass-white absolute right-3 top-3 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full"><Play className="h-3.5 w-3.5 text-ink" /></span>
                <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-5 sm:left-5 sm:right-5">
                  <p className="font-display text-xs sm:text-base font-semibold text-white">{r.title}</p>
                  <p className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-widest text-white/60">{r.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="bg-canvas py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink">Ready to design your space?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slateMuted">Share your property type, city, and design ambitions through our guided 6-step project brief.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/start-project" className="glass-black rounded-full px-8 py-3.5 text-xs font-semibold">Start Your Project</Link>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="glass-white inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold">
              WhatsApp {SITE_CONFIG.phoneDisplay} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
