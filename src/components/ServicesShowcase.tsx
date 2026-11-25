"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass } from "lucide-react";
import { SERVICE_DETAILS } from "@/data/catalog";
import { useSpatialTour } from "./SpatialTourContext";

export function ServicesShowcase() {
  const [tabs, setTabs] = useState<Record<string, string>>({
    architecture: "Spatial Strategy",
    interiors: "Spatial Strategy",
    visualisation: "Spatial Strategy",
  });
  const { openRoom } = useSpatialTour();

  return (
    <div className="mt-12 space-y-12 sm:space-y-16">
      {SERVICE_DETAILS.map((svc, idx) => {
        const activeKey = tabs[svc.id] || svc.tabs[0].key;
        const activeTab = svc.tabs.find((t) => t.key === activeKey) || svc.tabs[0];
        const reverse = idx % 2 === 1;
        return (
          <div key={svc.id} className="grid gap-8 rounded-3xl bg-canvas p-5 sm:p-10 lg:grid-cols-12 lg:items-center">
            <div className={`${reverse ? "lg:order-2" : ""} lg:col-span-6`}>
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-2xl bg-black shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={svc.img} alt={svc.title} loading="lazy" className="h-full w-full object-cover" />
                <button type="button" onClick={() => openRoom(svc.tourRoom)} className="glass-white absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold">
                  <Compass className="h-3.5 w-3.5" /> Peek in 3D
                </button>
              </div>
            </div>
            <div className={`${reverse ? "lg:order-1" : ""} lg:col-span-6`}>
              <span className="text-xs font-semibold uppercase tracking-widest text-slateMuted">{svc.num} &middot; {svc.tagline}</span>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold text-ink">{svc.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slateMuted">{svc.summary}</p>
              <div className="mt-6 rounded-2xl border border-hairline bg-pure p-4 sm:p-5">
                <div className="flex flex-wrap gap-2">
                  {svc.tabs.map((t) => (
                    <button key={t.key} type="button" onClick={() => setTabs((prev) => ({ ...prev, [svc.id]: t.key }))} className={`rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold transition-all ${activeKey === t.key ? "glass-black" : "glass-white"}`}>
                      {t.key}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink/85">{activeTab.text}</p>
              </div>
              <div className="mt-5">
                <Link href={`/start-project?ref=${encodeURIComponent(svc.title)}`} className="glass-black inline-block rounded-full px-6 py-3 text-xs font-semibold">
                  Enquire for {svc.title}
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
