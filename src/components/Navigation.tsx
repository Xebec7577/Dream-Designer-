"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { useSpatialTour } from "./SpatialTourContext";

const LINKS = [
  { href: "/", label: "Spaces" },
  { href: "/showroom", label: "3D Showroom" },
  { href: "/projects", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/reels", label: "Reels & IG" },
  { href: "/studio", label: "Studio" },
  { href: "/process", label: "Process" },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { openPicker } = useSpatialTour();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-pure/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" onClick={() => setOpen(false)} className="font-display text-base sm:text-lg font-bold tracking-[-0.02em] text-ink">
          {SITE_CONFIG.name}
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} className={`text-[13px] transition-colors ${active ? "font-semibold text-ink" : "font-medium text-slateMuted hover:text-ink"}`}>
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={openPicker} className="glass-white rounded-full px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold">
            Peek 3D
          </button>
          <Link href="/start-project" className="glass-black hidden rounded-full px-5 py-2 text-xs font-semibold sm:inline-block">
            Start yours
          </Link>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open} className="glass-white inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-hairline bg-pure px-5 py-6 shadow-xl lg:hidden">
          <nav className="flex flex-col gap-3.5">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-1 font-display text-lg font-semibold text-ink">
                {l.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2.5 border-t border-hairline pt-3">
              <Link href="/start-project" onClick={() => setOpen(false)} className="glass-black rounded-full py-3 text-center text-xs font-semibold">
                Start yours
              </Link>
              <a href={SITE_CONFIG.phoneHref} className="glass-white rounded-full py-3 text-center text-xs font-semibold">
                Call Studio
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
