"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, MoveHorizontal, Sparkles, Sun, Moon, X } from "lucide-react";
import { IMAGES, SHOWROOM_SPOTS, TOUR_ROOMS, type ShowroomMode } from "@/data/catalog";
import { useSpatialTour } from "./SpatialTourContext";

const FINISHES = [
  {
    id: "travertine" as const,
    label: "Honed Travertine",
    hex: "#DDD1BE",
    spec: "Italian vein-cut honed travertine · warm 2700K architectural wash",
    filter: "",
  },
  {
    id: "limestone" as const,
    label: "Cool Limestone",
    hex: "#ECECE8",
    spec: "Matte large-format Kota & ivory limestone · crisp daylight reflection",
    filter: "brightness(1.06) saturate(0.84)",
  },
  {
    id: "charcoal" as const,
    label: "Obsidian Slate",
    hex: "#2C2C30",
    spec: "Smoked basalt & brushed bronze detailing · dramatic evening contrast",
    filter: "contrast(1.12) brightness(0.88) saturate(0.85)",
  },
];

export function ShowroomConfigurator() {
  const [mode, setMode] = useState<ShowroomMode>("exterior");
  const [light, setLight] = useState<"day" | "twilight" | "compare">("compare");
  const [splitPos, setSplitPos] = useState(52);
  const [finishId, setFinishId] = useState<"travertine" | "limestone" | "charcoal">("travertine");
  const [spotId, setSpotId] = useState<string | null>(null);

  const stageBoxRef = useRef<HTMLDivElement | null>(null);
  const draggingSplitRef = useRef(false);
  const { openPicker, openRoom } = useSpatialTour();

  const isFloor = mode === "floorplan";
  const bgImg = mode === "interior" ? IMAGES.panoLiving : isFloor ? IMAGES.floorPlan : IMAGES.villa;
  const spots = SHOWROOM_SPOTS[mode];
  const activeSpot = spots.find((s) => s.id === spotId) || null;
  const activeFinish = FINISHES.find((f) => f.id === finishId) || FINISHES[0];

  const dayFilter = `${activeFinish.filter} brightness(1.16) saturate(1.05)`.trim();
  const twilightFilter = `${activeFinish.filter} brightness(0.82) contrast(1.14) saturate(1.08)`.trim();

  const updateSplitFromClientX = (clientX: number) => {
    const el = stageBoxRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplitPos(Math.max(8, Math.min(92, pct)));
  };

  return (
    <section
      className={`${
        isFloor ? "bg-[#F6F5F2] text-ink" : "bg-[#070709] text-white"
      } min-h-[calc(100vh-4rem)] pb-24 sm:pb-16 pt-4 sm:pt-6 transition-colors duration-500`}
    >
      <div className="mx-auto max-w-[1440px] px-3 sm:px-8">
        {/* Top Segmented Mode Switcher (Always visible & ergonomic) */}
        <div className="mb-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isFloor ? "text-slateMuted" : "text-white/55"}`}>
              Dream Designers &middot; Interactive Digital Showroom
            </p>
            <h1 className="mt-0.5 font-display text-xl sm:text-2xl font-bold tracking-tight">
              {mode === "exterior"
                ? "The Linear Villa — Exterior Architecture"
                : mode === "interior"
                ? "Courtyard Living Salon — Interior Detailing"
                : "Master Spatial Floor Plan — Tap Any Zone"}
            </h1>
          </div>

          <div className="glass-dock-white inline-flex items-center gap-1 rounded-full p-1">
            {(["exterior", "interior", "floorplan"] as ShowroomMode[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setMode(id);
                  setSpotId(null);
                }}
                className={`rounded-full px-4 sm:px-6 py-2 text-xs font-semibold capitalize transition-all ${
                  mode === id ? "glass-black" : "text-ink/75 hover:text-ink"
                }`}
              >
                {id === "floorplan" ? "Floor Plan" : id}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN INTERACTIVE SHOWROOM STAGE */}
        <div
          ref={stageBoxRef}
          onPointerMove={(e) => {
            if (!draggingSplitRef.current) return;
            updateSplitFromClientX(e.clientX);
          }}
          onPointerUp={() => {
            draggingSplitRef.current = false;
          }}
          onPointerLeave={() => {
            draggingSplitRef.current = false;
          }}
          className={`relative aspect-[4/5] sm:aspect-[16/9] w-full overflow-hidden rounded-[24px] sm:rounded-[30px] shadow-2xl select-none ${
            isFloor ? "border border-black/10 bg-[#F6F5F2]" : "border border-white/15 bg-black"
          }`}
        >
          {/* Base Layer (Twilight / Active Mode / Floor Plan) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgImg}
            alt={`Dream Designers ${mode} view`}
            draggable={false}
            className={`h-full w-full transition-[filter] duration-500 ${
              isFloor ? "object-contain p-3 sm:p-10" : "object-cover"
            }`}
            style={{
              filter: isFloor ? "none" : light === "day" ? dayFilter : twilightFilter,
            }}
          />

          {/* Interactive Day ↔ Twilight Split-Screen Reveal Layer */}
          {!isFloor && light === "compare" && (
            <>
              <div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - splitPos}% 0 0)` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bgImg}
                  alt={`Dream Designers ${mode} daylight comparison`}
                  draggable={false}
                  className="h-full w-full object-cover"
                  style={{ filter: dayFilter }}
                />
                <span className="glass-white absolute left-3 top-3 sm:left-5 sm:top-5 rounded-full px-3 py-1 text-[10px] font-semibold">
                  Daylight
                </span>
              </div>

              <span className="glass-frosted-dark pointer-events-none absolute right-3 top-3 sm:right-5 sm:top-5 rounded-full px-3 py-1 text-[10px] font-semibold">
                Twilight
              </span>

              {/* Draggable Liquid-Glass Comparison Divider */}
              <div
                style={{ left: `${splitPos}%` }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  draggingSplitRef.current = true;
                  updateSplitFromClientX(e.clientX);
                }}
                onTouchMove={(e) => {
                  if (e.touches[0]) updateSplitFromClientX(e.touches[0].clientX);
                }}
                className="absolute bottom-0 top-0 z-20 w-8 -translate-x-1/2 cursor-ew-resize touch-none flex items-center justify-center"
                role="slider"
                aria-label="Compare Daylight and Twilight lighting"
                aria-valuemin={8}
                aria-valuemax={92}
                aria-valuenow={Math.round(splitPos)}
              >
                <div className="h-full w-[2px] bg-white/85 shadow-[0_0_14px_rgba(255,255,255,0.9)]" />
                <div className="glass-white absolute flex h-10 w-10 items-center justify-center rounded-full shadow-xl">
                  <MoveHorizontal className="h-4 w-4 text-ink" />
                </div>
              </div>
            </>
          )}

          {!isFloor && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          )}

          {/* Pulsing Coral Architectural Hotspots */}
          {spots.map((sp) => (
            <button
              key={sp.id}
              type="button"
              onClick={() => setSpotId(sp.id)}
              style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
              className={`ae-hotspot ${spotId === sp.id ? "scale-125 ring-4 ring-white/50" : ""}`}
              aria-label={sp.title}
            />
          ))}

          {/* Desktop Hotspot Inspector Card */}
          {activeSpot && (
            <div className="hidden sm:block glass-white sheet-slide-up absolute bottom-20 left-6 z-30 max-w-sm rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slateMuted">
                    Architectural Detail
                  </span>
                  <h3 className="mt-1 font-display text-lg font-bold text-ink">{activeSpot.title}</h3>
                </div>
                <button type="button" onClick={() => setSpotId(null)} aria-label="Close">
                  <X className="h-4 w-4 text-slateMuted" />
                </button>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slateMuted">{activeSpot.desc}</p>
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openRoom(activeSpot.tourRoom)}
                  className="glass-black inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
                >
                  <Compass className="h-3.5 w-3.5" /> Step Inside 3D &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Desktop Floating Bottom Control Bar */}
          <div className="hidden sm:flex absolute bottom-5 left-1/2 z-30 w-[94%] max-w-4xl -translate-x-1/2 flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => openRoom(mode === "interior" ? "living" : "exterior")}
              className="glass-white inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold"
            >
              <Compass className="h-3.5 w-3.5" /> Launch Fullscreen 3D
            </button>

            {!isFloor ? (
              <>
                <div className="glass-frosted-dark inline-flex items-center gap-1 rounded-full p-1">
                  <button
                    type="button"
                    onClick={() => setLight("compare")}
                    className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold ${
                      light === "compare" ? "glass-white" : "text-white/80"
                    }`}
                  >
                    Day / Twilight Split
                  </button>
                  <button
                    type="button"
                    onClick={() => setLight("day")}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                      light === "day" ? "glass-white" : "text-white/80"
                    }`}
                  >
                    <Sun className="h-3 w-3" /> Day
                  </button>
                  <button
                    type="button"
                    onClick={() => setLight("twilight")}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                      light === "twilight" ? "glass-white" : "text-white/80"
                    }`}
                  >
                    <Moon className="h-3 w-3" /> Twilight
                  </button>
                </div>

                <div className="glass-frosted-dark inline-flex items-center gap-1 rounded-full p-1">
                  {FINISHES.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFinishId(f.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium ${
                        finishId === f.id ? "glass-white" : "text-white/80"
                      }`}
                    >
                      <span className="h-3 w-3 rounded-full border border-black/20" style={{ backgroundColor: f.hex }} />
                      <span>{f.label.split(" ")[1] || f.label}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={openPicker}
                className="glass-black inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold"
              >
                <Compass className="h-3.5 w-3.5" /> Choose Any Room in 3D
              </button>
            )}
          </div>
        </div>

        {/* MOBILE ERGONOMIC CONTROL DECK */}
        <div className="mt-4 space-y-3 sm:hidden">
          {activeSpot && (
            <div className="sheet-slide-up rounded-2xl border border-hairline bg-pure p-4 text-ink shadow-xl">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slateMuted">
                    Architectural Detail
                  </span>
                  <h3 className="mt-0.5 font-display text-base font-bold">{activeSpot.title}</h3>
                </div>
                <button type="button" onClick={() => setSpotId(null)} aria-label="Close">
                  <X className="h-4 w-4 text-slateMuted" />
                </button>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-slateMuted">{activeSpot.desc}</p>
              <button
                type="button"
                onClick={() => openRoom(activeSpot.tourRoom)}
                className="glass-black mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-xs font-semibold"
              >
                <Compass className="h-3.5 w-3.5" /> Step Inside High-Res 3D &rarr;
              </button>
            </div>
          )}

          {/* Mobile Lighting & Material Switcher */}
          {!isFloor && (
            <div className="flex flex-col gap-2.5 rounded-2xl border border-white/15 bg-white/[0.06] p-3">
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setLight("compare")}
                  className={`rounded-full py-2 text-[11px] font-semibold ${
                    light === "compare" ? "glass-white" : "text-white/75"
                  }`}
                >
                  Split View
                </button>
                <button
                  type="button"
                  onClick={() => setLight("day")}
                  className={`rounded-full py-2 text-[11px] font-semibold ${
                    light === "day" ? "glass-white" : "text-white/75"
                  }`}
                >
                  Daylight
                </button>
                <button
                  type="button"
                  onClick={() => setLight("twilight")}
                  className={`rounded-full py-2 text-[11px] font-semibold ${
                    light === "twilight" ? "glass-white" : "text-white/75"
                  }`}
                >
                  Twilight
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {FINISHES.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFinishId(f.id)}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-full py-2 text-[11px] font-semibold ${
                      finishId === f.id ? "glass-white" : "border border-white/15 text-white/75"
                    }`}
                  >
                    <span className="h-2.5 w-2.5 rounded-full border border-black/25" style={{ backgroundColor: f.hex }} />
                    <span>{f.label.split(" ")[1] || f.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Swipeable Mobile Hotspot Pills */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {spots.map((sp) => (
              <button
                key={sp.id}
                type="button"
                onClick={() => setSpotId(sp.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
                  spotId === sp.id ? "glass-white" : isFloor ? "bg-white text-ink border border-black/10" : "glass-frosted-dark"
                }`}
              >
                {sp.title}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => openRoom(mode === "interior" ? "living" : "exterior")}
            className={`${
              isFloor ? "glass-black" : "glass-white"
            } flex w-full items-center justify-center gap-2 rounded-full py-3 text-xs font-semibold`}
          >
            <Compass className="h-4 w-4" /> Launch Fullscreen AAA 3D Tour
          </button>
        </div>

        {/* Live Material Specification Strip */}
        {!isFloor && (
          <div className="mt-5 flex flex-col items-start justify-between gap-3 rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3.5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span
                className="h-5 w-5 shrink-0 rounded-full border border-white/40"
                style={{ backgroundColor: activeFinish.hex }}
              />
              <div>
                <p className="text-xs font-semibold text-white">{activeFinish.label}</p>
                <p className="text-[11px] text-white/60">{activeFinish.spec}</p>
              </div>
            </div>
            <Link
              href={`/start-project?ref=${encodeURIComponent(`Showroom: ${activeFinish.label}`)}`}
              className="glass-white inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-semibold shrink-0"
            >
              <Sparkles className="h-3.5 w-3.5" /> Request This Palette <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}

        {/* 8-ROOM DIRECT 3D LAUNCHER GRID */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className={`font-display text-lg sm:text-xl font-bold ${isFloor ? "text-ink" : "text-white"}`}>
              Jump straight into any 3D room
            </h2>
            <span className={`text-[11px] ${isFloor ? "text-slateMuted" : "text-white/50"}`}>8 Spaces Ready</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {TOUR_ROOMS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => openRoom(r.id)}
                className={`group overflow-hidden rounded-2xl border text-left transition-all hover:-translate-y-1 ${
                  isFloor ? "border-black/10 bg-white shadow-sm" : "border-white/15 bg-white/5 hover:border-white/35"
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.img}
                    alt={r.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="glass-frosted-dark absolute right-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-semibold">
                    3D
                  </span>
                </div>
                <div className="p-3 sm:p-4">
                  <p className={`font-display text-xs sm:text-sm font-semibold truncate ${isFloor ? "text-ink" : "text-white"}`}>
                    {r.name}
                  </p>
                  <p className={`mt-0.5 text-[10px] sm:text-[11px] ${isFloor ? "text-slateMuted" : "text-white/55"}`}>
                    Open 3D Tour &rarr;
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
