"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Compass,
  Home,
  Lock,
  MessageCircle,
  Play,
  Sparkles,
  Star,
} from "lucide-react";
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
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasSwiped, setHasSwiped] = useState(false);

  const stripRef = useRef<HTMLDivElement | null>(null);
  const swipeRef = useRef({ startX: 0, startY: 0, lockedAxis: null as "x" | "y" | null, active: false });
  const { openPicker, openRoom } = useSpatialTour();

  const m = HOME_MODELS[idx];
  const waHref = buildWhatsAppUrl(
    "Hello Dream Designers, I explored your Digital Showroom and would like to schedule a consultation."
  );

  const goPrev = () => {
    setHasSwiped(true);
    setIdx((i) => (i - 1 + HOME_MODELS.length) % HOME_MODELS.length);
  };

  const goNext = () => {
    setHasSwiped(true);
    setIdx((i) => (i + 1) % HOME_MODELS.length);
  };

  // Smooth touch & pointer finger-swipe for Linear Villa hero slider (never blocks vertical scroll)
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    swipeRef.current = { startX: t.clientX, startY: t.clientY, lockedAxis: null, active: true };
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!swipeRef.current.active) return;
    const t = e.touches[0];
    const dx = t.clientX - swipeRef.current.startX;
    const dy = t.clientY - swipeRef.current.startY;

    if (!swipeRef.current.lockedAxis) {
      if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
        swipeRef.current.lockedAxis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
    }
    if (swipeRef.current.lockedAxis === "x") {
      setIsDragging(true);
      setDragX(Math.max(-140, Math.min(140, dx)));
    }
  };

  const onTouchEnd = () => {
    if (swipeRef.current.lockedAxis === "x") {
      if (dragX <= -42) goNext();
      else if (dragX >= 42) goPrev();
    }
    swipeRef.current.active = false;
    swipeRef.current.lockedAxis = null;
    setIsDragging(false);
    setDragX(0);
  };

  // Desktop mouse-drag support as well
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || (e.target as HTMLElement).closest("button")) return;
    swipeRef.current = { startX: e.clientX, startY: e.clientY, lockedAxis: "x", active: true };
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || !swipeRef.current.active) return;
    const dx = e.clientX - swipeRef.current.startX;
    setDragX(Math.max(-140, Math.min(140, dx)));
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || !swipeRef.current.active) return;
    if (dragX <= -45) goNext();
    else if (dragX >= 45) goPrev();
    swipeRef.current.active = false;
    setIsDragging(false);
    setDragX(0);
  };

  return (
    <>
      {/* 1. 50ms FIRST-IMPRESSION HERO — FINGER SWIPE + BUTTONS + TRUST SIGNAL */}
      <section className="bg-pure pb-12 sm:pb-20 pt-5 sm:pt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          {/* Credibility & Location Micro-Badge (50ms trust halo) */}
          <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-canvas px-3.5 py-1.5 text-[11px] font-medium text-ink/80">
            <Star className="h-3.5 w-3.5 fill-ink text-ink" />
            <span>4.9 Google Rated &middot; Ambala City &middot; Architecture, Interiors &amp; 3D</span>
          </div>

          <h1 className="mt-4 font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-ink">
            Five spaces. <span className="font-normal text-slateMuted">Endless possibility.</span>
          </h1>

          <div className="mt-5 sm:mt-10">
            <div className="flex items-center justify-center gap-2">
              <p className="font-display text-lg sm:text-2xl font-semibold text-ink">{m.name}</p>
              <span className="rounded-full bg-canvas px-2.5 py-0.5 text-[10px] font-semibold text-slateMuted">
                0{idx + 1} / 0{HOME_MODELS.length}
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-slateMuted">{m.subtitle}</p>

            {/* Finger-Swipeable & Button-Controlled Stage */}
            <div
              className="relative mx-auto mt-4 sm:mt-7 max-w-4xl select-none"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            >
              <div className="relative aspect-[4/5] sm:aspect-[16/9] overflow-hidden rounded-[26px] sm:rounded-[30px] bg-canvas shadow-[0_24px_70px_rgba(0,0,0,0.1)] cursor-grab active:cursor-grabbing">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={m.id}
                  src={m.img}
                  alt={m.name}
                  draggable={false}
                  className="h-full w-full object-cover will-change-transform"
                  style={{
                    filter: swatch.filter,
                    transform: `translate3d(${dragX}px, 0, 0) scale(${isDragging ? 1.015 : 1})`,
                    transition: isDragging
                      ? "filter 0.45s ease"
                      : "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1), filter 0.45s ease",
                  }}
                />

                {/* Top-Left Finish Indicator Pill */}
                <div className="glass-frosted-dark pointer-events-none absolute left-3 top-3 sm:left-4 sm:top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium">
                  <span className="h-2 w-2 rounded-full border border-white/60" style={{ backgroundColor: swatch.hex }} />
                  <span>{swatch.label}</span>
                </div>

                {/* Swipe Hint Micro-Pill (Fades after first swipe/click) */}
                {!hasSwiped && (
                  <div className="glass-frosted-dark pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-medium tracking-wide sm:hidden">
                    &larr; Swipe photo or tap arrows &rarr;
                  </div>
                )}

                {/* Bottom Pill Progress Dots inside Frame */}
                <div className="absolute bottom-3.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1.5 backdrop-blur-md">
                  {HOME_MODELS.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={`View ${item.name}`}
                      onClick={() => {
                        setHasSwiped(true);
                        setIdx(i);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === idx ? "w-6 bg-white" : "w-1.5 bg-white/45 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Liquid-Glass Prev & Next Buttons (Always accessible on Mobile + Desktop) */}
              <button
                type="button"
                aria-label="Previous space"
                onClick={goPrev}
                className="glass-white absolute left-2.5 sm:left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next space"
                onClick={goNext}
                className="glass-white absolute right-2.5 sm:right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Tactile Material Swatches */}
            <div className="mt-5 flex items-center justify-center gap-2.5">
              {SWATCHES.map((sw) => (
                <button
                  key={sw.id}
                  type="button"
                  title={sw.label}
                  aria-label={sw.label}
                  onClick={() => setSwatch(sw)}
                  className={`h-8 w-8 rounded-full border-2 p-0.5 transition-all ${
                    swatch.id === sw.id ? "scale-110 border-ink" : "border-transparent"
                  }`}
                >
                  <span className="block h-full w-full rounded-full shadow-inner" style={{ backgroundColor: sw.hex }} />
                </button>
              ))}
            </div>

            <p className="mt-3 text-xs font-medium text-slateMuted">{m.meta}</p>

            {/* Primary Dual Conversion CTA (Above-the-fold Fogg B=MAP trigger) */}
            <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2.5 rounded-3xl sm:rounded-full bg-canvas px-4 py-2.5">
              <button
                type="button"
                onClick={() => openRoom(m.tourRoom)}
                className="glass-black inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold"
              >
                <Compass className="h-3.5 w-3.5" /> Peek Inside in 3D
              </button>
              <Link href="/showroom" className="glass-white rounded-full px-5 py-2.5 text-xs font-semibold">
                Open 3D Showroom &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INSTANT 1-TAP INTENT ROUTER (FOGG B=MAP — ZERO FRICTION FOR ANY VISITOR) */}
      <section className="border-t border-hairline bg-canvas/70 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slateMuted">
                Start In One Tap
              </p>
              <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-ink">
                What are you looking to build?
              </h2>
            </div>
            <p className="text-xs text-slateMuted">Tap your goal to jump straight to the right experience.</p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Link
              href="/start-project?ref=Luxury%20Residence%20Architecture"
              className="group flex flex-col justify-between rounded-2xl border border-hairline bg-pure p-4 text-left transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-md"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-canvas text-ink">
                <Home className="h-4 w-4" />
              </div>
              <div className="mt-3.5">
                <p className="font-display text-sm font-bold text-ink">New Villa / Home</p>
                <p className="mt-0.5 text-[11px] text-slateMuted">Architecture, elevations &amp; floor plans</p>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => openRoom("living")}
              className="group flex flex-col justify-between rounded-2xl border border-hairline bg-pure p-4 text-left transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-md"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-canvas text-ink">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="mt-3.5">
                <p className="font-display text-sm font-bold text-ink">Luxury Interiors</p>
                <p className="mt-0.5 text-[11px] text-slateMuted">Walk 8 rooms in high-res 3D now</p>
              </div>
            </button>

            <Link
              href="/showroom"
              className="group flex flex-col justify-between rounded-2xl border border-hairline bg-pure p-4 text-left transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-md"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-canvas text-ink">
                <Building2 className="h-4 w-4" />
              </div>
              <div className="mt-3.5">
                <p className="font-display text-sm font-bold text-ink">3D Showroom</p>
                <p className="mt-0.5 text-[11px] text-slateMuted">Day/Twilight slider &amp; floor plan</p>
              </div>
            </Link>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-2xl bg-ink p-4 text-left text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div className="mt-3.5">
                <p className="font-display text-sm font-bold text-white">Direct WhatsApp</p>
                <p className="mt-0.5 text-[11px] text-white/70">Speak with Paras Julka&apos;s studio</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECT OF THE MONTH */}
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
                {FEATURED_MONTHLY.highlights.map((h) => (
                  <li key={h}>&mdash; {h}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => openRoom(FEATURED_MONTHLY.tourRoom)}
                  className="glass-black inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold"
                >
                  <Compass className="h-3.5 w-3.5" /> Tour Featured Space
                </button>
                <Link
                  href={`/projects/${FEATURED_MONTHLY.slug}`}
                  className="glass-white rounded-full px-5 py-2.5 text-xs font-semibold"
                >
                  Read Case Study
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-6">
              <div className="aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-2xl bg-canvas">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={FEATURED_MONTHLY.coverImage}
                  alt="Twilight terrace pavilion"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-2xl bg-canvas">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={FEATURED_MONTHLY.secondaryImage}
                  alt="Acoustic walnut media lounge"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RICH 8-ROOM INTERIOR GALLERY (TAP ANY ROOM TO OPEN AAA 3D VIEW) */}
      <section className="bg-pure py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slateMuted">Inside Every Room</p>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink">
                Interiors. <span className="font-normal text-slateMuted">Room by room.</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={openPicker}
              className="glass-black self-start sm:self-auto rounded-full px-5 py-2.5 text-xs font-semibold"
            >
              Open All 8 Spaces in 3D
            </button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
            {INTERIOR_SHOWCASE.map((room) => (
              <button
                key={room.title}
                type="button"
                onClick={() => openRoom(room.tourRoom)}
                className="group overflow-hidden rounded-2xl sm:rounded-3xl border border-hairline bg-canvas text-left transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={room.img}
                    alt={room.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="glass-frosted-dark absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-semibold">
                    <Compass className="h-2.5 w-2.5" /> 3D
                  </span>
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

      {/* 5. 19-SECOND SAMARA "PEEK INSIDE." HOOK */}
      <section className="bg-canvas py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="group relative aspect-[4/5] sm:aspect-[16/9] overflow-hidden rounded-3xl bg-black shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGES.panoLiving}
              alt="Peek inside Dream Designers luxury residence"
              className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
              <span className="glass-frosted-dark mb-4 rounded-full px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]">
                Interactive Spatial Engine &middot; 8 Rooms
              </span>
              <h2 className="font-display text-4xl sm:text-7xl font-bold tracking-[-0.03em] text-white">
                Peek inside.
              </h2>
              <button
                type="button"
                onClick={openPicker}
                className="glass-white mt-5 sm:mt-7 inline-flex items-center gap-2 rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold"
              >
                <Compass className="h-4 w-4" /> Tour Residence in 3D
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 11-SECOND SQUARESPACE BLACK PORTFOLIO */}
      <section className="overflow-hidden bg-black py-16 sm:py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
                Crafted by Dream Designers
              </p>
              <h2 className="mt-2 font-display text-4xl sm:text-7xl font-bold uppercase tracking-[-0.03em]">
                PORTFOLIO
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Scroll left"
                onClick={() => stripRef.current?.scrollBy({ left: -340, behavior: "smooth" })}
                className="glass-frosted-dark flex h-10 w-10 items-center justify-center rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Scroll right"
                onClick={() => stripRef.current?.scrollBy({ left: 340, behavior: "smooth" })}
                className="glass-frosted-dark flex h-10 w-10 items-center justify-center rounded-full"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/projects" className="glass-white rounded-full px-5 py-2.5 text-xs font-semibold">
                View All Projects
              </Link>
            </div>
          </div>
        </div>

        <div
          ref={stripRef}
          className="no-scrollbar mt-10 flex gap-5 sm:gap-7 overflow-x-auto px-4 sm:px-6 pb-4 lg:px-10 snap-x snap-mandatory"
        >
          {STUDIES.map((s) => (
            <Link key={s.slug} href={`/projects/${s.slug}`} className="group w-[82vw] max-w-[420px] shrink-0 snap-start">
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5">
                <div className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.coverImage}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="mt-3.5 flex items-baseline justify-between gap-3">
                <h3 className="font-display text-base sm:text-lg font-semibold text-white group-hover:text-white/75">
                  {s.title}
                </h3>
                <span className="text-[11px] text-white/50">{s.categories[0]}</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-white/55">{s.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. PRIVATE CLIENT PORTAL PREVIEW */}
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
                Instead of scattering 3D renders across WhatsApp groups, each Dream Designers client receives a private
                link showing their stage progress, approved material board, and interactive 3D rooms.
              </p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <Link
                href="/client/demo-residence"
                className="glass-white inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold"
              >
                Preview Live Client Portal <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. REELS & SOCIAL */}
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
              <Link href="/reels" className="glass-white rounded-full px-5 py-2.5 text-xs font-semibold">
                Open Social Gallery
              </Link>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-black inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-semibold"
              >
                Instagram <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
            {REELS_DATA.map((r) => (
              <Link
                key={r.id}
                href="/reels"
                className="group relative aspect-[9/16] overflow-hidden rounded-2xl sm:rounded-3xl bg-black text-left shadow-lg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.img}
                  alt={r.title}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <span className="glass-frosted-dark absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] sm:text-[10px] font-medium">
                  {r.tag}
                </span>
                <span className="glass-white absolute right-3 top-3 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full">
                  <Play className="h-3.5 w-3.5 text-ink" />
                </span>
                <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-5 sm:left-5 sm:right-5">
                  <p className="font-display text-xs sm:text-base font-semibold text-white">{r.title}</p>
                  <p className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-widest text-white/60">{r.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="bg-canvas py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink">
            Ready to design your space?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slateMuted">
            Share your property type, city, and design ambitions through our guided 6-step project brief.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/start-project" className="glass-black rounded-full px-8 py-3.5 text-xs font-semibold">
              Start Your Project
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-white inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold"
            >
              WhatsApp {SITE_CONFIG.phoneDisplay} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
