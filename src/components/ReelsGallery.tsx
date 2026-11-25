"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Pause, Play, X } from "lucide-react";
import { IMAGES, REELS_DATA } from "@/data/catalog";
import { SITE_CONFIG } from "@/lib/site-config";

const IG_POSTS = [
  { img: IMAGES.villa, title: "Twilight Architectural Massing", tag: "Architecture" },
  { img: IMAGES.panoLiving, title: "Monolith Travertine Living", tag: "Interiors" },
  { img: IMAGES.material, title: "Tactile Material Palette", tag: "Materials" },
  { img: IMAGES.panoKitchen, title: "Stone & Walnut Kitchen", tag: "Kitchen & Dining" },
  { img: IMAGES.panoMaster, title: "Fluted Oak Master Suite", tag: "Bedroom" },
  { img: IMAGES.office, title: "Timber Executive Workplace", tag: "Commercial" },
];

export function ReelsGallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(true);
  const active = REELS_DATA.find((r) => r.id === activeId) || null;

  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
        {REELS_DATA.map((r) => (
          <button key={r.id} type="button" onClick={() => { setActiveId(r.id); setPlaying(true); }} className="group relative aspect-[9/16] overflow-hidden rounded-2xl sm:rounded-3xl bg-black text-left shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={r.img} alt={r.title} loading="lazy" className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
            <span className="glass-frosted-dark absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] sm:text-[10px] font-medium">{r.tag}</span>
            <span className="glass-white absolute right-3 top-3 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full"><Play className="h-3.5 w-3.5 text-ink" /></span>
            <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-5 sm:left-5 sm:right-5">
              <p className="font-display text-xs sm:text-base font-semibold text-white">{r.title}</p>
              <p className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-widest text-white/60">{r.duration}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-3">
        {IG_POSTS.map((p) => (
          <a key={p.title} href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden rounded-2xl bg-canvas">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex flex-col justify-end bg-black/0 p-4 sm:p-6 transition-colors duration-500 group-hover:bg-black/60">
              <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-white/75 opacity-0 transition-opacity group-hover:opacity-100">{p.tag}</span>
              <p className="mt-1 font-display text-sm sm:text-lg font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">{p.title}</p>
            </div>
          </a>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-4 backdrop-blur-md" role="dialog" aria-modal="true">
          <div className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/15 bg-ink text-white md:grid-cols-12">
            <button type="button" onClick={() => setActiveId(null)} aria-label="Close" className="glass-frosted-dark absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full"><X className="h-5 w-5" /></button>
            <div className="relative aspect-[9/14] sm:aspect-[9/16] max-h-[62vh] md:max-h-[78vh] overflow-hidden bg-black md:col-span-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={active.img} alt={active.title} className={`h-full w-full object-cover ${playing ? "reel-playing" : ""}`} />
              <button type="button" onClick={() => setPlaying((p) => !p)} aria-label="Toggle motion" className="glass-frosted-dark absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full">
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex flex-col justify-between p-5 sm:p-8 md:col-span-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">@dream.designerz &middot; Reel Direction</p>
                <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold">{active.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{active.desc}</p>
              </div>
              <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="glass-white flex w-full items-center justify-center gap-2 rounded-full py-3 text-xs font-semibold">
                  Open @dream.designerz <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <Link href={`/start-project?ref=${encodeURIComponent(active.title)}`} onClick={() => setActiveId(null)} className="glass-frosted-dark block w-full rounded-full py-3 text-center text-xs font-semibold">
                  Enquire About Similar Space
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
