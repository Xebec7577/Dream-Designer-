"use client";

import { useState } from "react";
import Link from "next/link";
import { STUDIES, type ProjectCategory } from "@/data/catalog";

const CATEGORIES: ("All" | ProjectCategory)[] = ["All", "Residential", "Commercial", "Architecture", "Interior Design", "3D Visualisation"];

export function ProjectFilterGrid() {
  const [selected, setSelected] = useState<"All" | ProjectCategory>("All");
  const filtered = selected === "All" ? STUDIES : STUDIES.filter((s) => s.categories.includes(selected));

  return (
    <div>
      <div role="tablist" className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button key={cat} type="button" role="tab" aria-selected={selected === cat} onClick={() => setSelected(cat)} className={`rounded-full px-4 sm:px-5 py-2 text-xs font-semibold transition-all ${selected === cat ? "glass-black" : "glass-white"}`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <Link key={s.slug} href={`/projects/${s.slug}`} className="group overflow-hidden rounded-3xl border border-hairline bg-pure transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden bg-canvas">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.coverImage} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="glass-white absolute left-3.5 top-3.5 rounded-full px-3 py-1 text-[10px] font-semibold">Concept Study</span>
            </div>
            <div className="p-5 sm:p-6">
              <span className="text-[11px] font-medium text-slateMuted">{s.categories.join(" · ")}</span>
              <h2 className="mt-1.5 font-display text-lg sm:text-xl font-bold text-ink">{s.title}</h2>
              <p className="mt-2 text-xs leading-relaxed text-slateMuted">{s.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
