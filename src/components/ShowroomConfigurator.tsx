"use client";

import { useState } from "react";
import { Compass, X } from "lucide-react";
import { IMAGES, SHOWROOM_SPOTS, TOUR_ROOMS, type ShowroomMode } from "@/data/catalog";
import { useSpatialTour } from "./SpatialTourContext";

export function ShowroomConfigurator() {
  const [mode, setMode] = useState<ShowroomMode>("exterior");
  const [light, setLight] = useState<"day" | "twilight">("twilight");
  const [finish, setFinish] = useState<"travertine" | "limestone" | "charcoal">("travertine");
  const [spotId, setSpotId] = useState<string | null>(null);
  const { openPicker, openRoom } = useSpatialTour();

  const isFloor = mode === "floorplan";
  const bgImg = mode === "interior" ? IMAGES.panoLiving : isFloor ? IMAGES.floorPlan : IMAGES.villa;
  const spots = SHOWROOM_SPOTS[mode];
  const activeSpot = spots.find((s) => s.id === spotId) || null;

  let imgFilter = "";
  if (!isFloor) {
    if (finish === "limestone") imgFilter += "brightness(1.06) saturate(0.84) ";
    if (finish === "charcoal") imgFilter += "contrast(1.12) brightness(0.88) saturate(0.85) ";
    if (light === "day") imgFilter += "brightness(1.15) saturate(1.06) ";
  }

  return (
    <section className={`${isFloor ? "bg-[#F6F5F2] text-ink" : "bg-black text-white"} min-h-[calc(100vh-4rem)] pb-16 pt-4 sm:pt-6 transition-colors duration-500`}>
      <div className="mx-auto max-w-[1440px] px-3 sm:px-8">
        <div className="mb-4 flex justify-center sm:hidden">
          <div className="glass-dock-white inline-flex items-center gap-1 rounded-full p-1">
            {(["exterior", "interior", "floorplan"] as ShowroomMode[]).map((id) => (
              <button key={id} type="button" onClick={() => { setMode(id); setSpotId(null); }} className={`rounded-full px-4 py-2 text-xs font-semibold capitalize ${mode === id ? "glass-black" : "text-ink/70"}`}>
                {id === "floorplan" ? "Floor Plan" : id}
              </button>
            ))}
          </div>
        </div>

        <div className={`relative aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl sm:rounded-[28px] shadow-2xl ${isFloor ? "border border-black/10 bg-[#F6F5F2]" : "border border-white/15 bg-black"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bgImg} alt={`Dream Designers ${mode} view`} className={`h-full w-full transition-all duration-700 ${isFloor ? "object-contain p-2 sm:p-10" : "object-cover"}`} style={{ filter: imgFilter.trim() || "none" }} />
          {!isFloor && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />}

          <div className="hidden sm:block absolute left-1/2 top-5 z-20 -translate-x-1/2">
            <div className="glass-dock-white inline-flex items-center gap-1 rounded-full p-1">
              {(["exterior", "interior", "floorplan"] as ShowroomMode[]).map((id) => (
                <button key={id} type="button" onClick={() => { setMode(id); setSpotId(null); }} className={`rounded-full px-6 py-2 text-xs font-semibold capitalize ${mode === id ? "glass-black" : "text-ink/70 hover:text-ink"}`}>
                  {id === "floorplan" ? "Floor Plan" : id}
                </button>
              ))}
            </div>
          </div>

          {spots.map((sp) => (
            <button key={sp.id} type="button" onClick={() => setSpotId(sp.id)} style={{ left: `${sp.x}%`, top: `${sp.y}%` }} className="ae-hotspot" aria-label={sp.title} />
          ))}

          {activeSpot && (
            <div className="hidden sm:block glass-white absolute bottom-20 left-6 z-20 max-w-sm rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slateMuted">Architectural Detail</span>
                  <h3 className="mt-1 font-display text-lg font-bold text-ink">{activeSpot.title}</h3>
                </div>
                <button type="button" onClick={() => setSpotId(null)} aria-label="Close"><X className="h-4 w-4 text-slateMuted" /></button>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slateMuted">{activeSpot.desc}</p>
              <button type="button" onClick={() => openRoom(activeSpot.tourRoom)} className="glass-black mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold">
                <Compass className="h-3.5 w-3.5" /> Step Inside High-Res 3D &rarr;
              </button>
            </div>
          )}

          <div className="hidden sm:flex absolute bottom-5 left-1/2 z-20 w-[94%] max-w-4xl -translate-x-1/2 flex-wrap items-center justify-center gap-2.5">
            <button type="button" onClick={() => openRoom(mode === "interior" ? "living" : "exterior")} className="glass-frosted-dark inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold">
              <Compass className="h-3.5 w-3.5" /> Fullscreen 3D Tour
            </button>
            {!isFloor ? (
              <>
                <div className="glass-frosted-dark inline-flex items-center gap-1 rounded-full p-1">
                  <button type="button" onClick={() => setLight("day")} className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold ${light === "day" ? "glass-white" : "text-white/80"}`}>Day Mode</button>
                  <button type="button" onClick={() => setLight("twilight")} className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold ${light === "twilight" ? "glass-white" : "text-white/80"}`}>Twilight Mode</button>
                </div>
                <div className="glass-frosted-dark inline-flex items-center gap-1 rounded-full p-1">
                  {([["travertine", "Travertine", "#DDD1BE"], ["limestone", "Limestone", "#ECECE8"], ["charcoal", "Obsidian", "#2C2C30"]] as const).map(([fid, flabel, fcol]) => (
                    <button key={fid} type="button" onClick={() => setFinish(fid)} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium ${finish === fid ? "glass-white" : "text-white/80"}`}>
                      <span className="h-3 w-3 rounded-full border border-black/20" style={{ backgroundColor: fcol }} />
                      <span>{flabel}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <button type="button" onClick={openPicker} className="glass-black inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold">
                <Compass className="h-3.5 w-3.5" /> Choose Any Room to Tour
              </button>
            )}
          </div>
        </div>

        {activeSpot && (
          <div className="sm:hidden mt-4 rounded-2xl border border-hairline bg-pure p-4 text-ink shadow-lg">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display text-base font-bold">{activeSpot.title}</h3>
              <button type="button" onClick={() => setSpotId(null)} aria-label="Close"><X className="h-4 w-4 text-slateMuted" /></button>
            </div>
            <p className="mt-1.5 text-xs text-slateMuted">{activeSpot.desc}</p>
            <button type="button" onClick={() => openRoom(activeSpot.tourRoom)} className="glass-black mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold">Step Inside 3D &rarr;</button>
          </div>
        )}

        <div className="sm:hidden mt-4 flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => openRoom(mode === "interior" ? "living" : "exterior")} className={`${isFloor ? "glass-black" : "glass-white"} inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold`}>
            <Compass className="h-3.5 w-3.5" /> Fullscreen 3D Tour
          </button>
          {!isFloor && (
            <button type="button" onClick={() => setLight((l) => (l === "day" ? "twilight" : "day"))} className="glass-frosted-dark rounded-full px-4 py-2 text-xs font-medium">
              {light === "day" ? "Switch to Twilight" : "Switch to Daylight"}
            </button>
          )}
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {TOUR_ROOMS.slice(0, 4).map((r) => (
            <button key={r.id} type="button" onClick={() => openRoom(r.id)} className={`group overflow-hidden rounded-2xl border text-left transition-transform hover:-translate-y-1 ${isFloor ? "border-black/10 bg-white" : "border-white/15 bg-white/5"}`}>
              <div className="aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.img} alt={r.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-3 sm:p-4">
                <p className={`font-display text-xs sm:text-sm font-semibold truncate ${isFloor ? "text-ink" : "text-white"}`}>{r.name}</p>
                <p className={`mt-0.5 text-[10px] sm:text-[11px] ${isFloor ? "text-slateMuted" : "text-white/55"}`}>Open 3D Tour &rarr;</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
