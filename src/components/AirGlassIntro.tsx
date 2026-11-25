"use client";

import { useEffect, useState } from "react";

export function AirGlassIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.innerWidth < 768;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || reduced) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1650);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(circle at 22% 28%, rgba(255,255,255,0.88) 0%, transparent 45%), radial-gradient(circle at 78% 72%, rgba(210,228,250,0.65) 0%, transparent 48%), linear-gradient(180deg, #DDE8F6 0%, #EFF4FA 52%, #FFFFFF 100%)",
      }}
    >
      <svg viewBox="0 0 560 180" className="w-[70vw] max-w-[480px]" fill="none">
        <defs>
          <linearGradient id="ddGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
            <stop offset="45%" stopColor="#C8DCF4" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.92" />
          </linearGradient>
        </defs>
        <path d="M95 142 L95 38 C165 38 198 62 198 90 C198 118 165 142 95 142 Z M268 142 L268 38 C338 38 371 62 371 90 C371 118 338 142 268 142 Z M416 90 C416 62 438 40 466 40" stroke="url(#ddGlassGrad)" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" className="glass-tube-draw" />
        <path d="M95 142 L95 38 C165 38 198 62 198 90 C198 118 165 142 95 142 Z M268 142 L268 38 C338 38 371 62 371 90 C371 118 338 142 268 142 Z M416 90 C416 62 438 40 466 40" stroke="#FFFFFF" strokeOpacity="0.9" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="glass-tube-draw" />
        <circle cx="466" cy="134" r="14" fill="url(#ddGlassGrad)" />
      </svg>
      <p className="mt-4 font-display text-xl font-bold uppercase tracking-[0.22em] text-ink">Dream Designers</p>
      <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.28em] text-slateMuted">Architecture &middot; Interiors &middot; 3D Showroom</p>
    </div>
  );
}
