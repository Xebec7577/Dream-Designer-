"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Compass,
  Film,
  FolderKanban,
  Home,
  Layers,
  LayoutGrid,
  Phone,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { useSpatialTour } from "./SpatialTourContext";

const LINKS = [
  { href: "/", label: "Spaces", icon: Home },
  { href: "/showroom", label: "Showroom", icon: Compass },
  { href: "/projects", label: "Portfolio", icon: FolderKanban },
  { href: "/services", label: "Services", icon: Layers },
  { href: "/reels", label: "Reels", icon: Film },
  { href: "/studio", label: "Studio", icon: Building2 },
  { href: "/process", label: "Process", icon: Workflow },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { openPicker } = useSpatialTour();

  // Close mobile vertical corner rail on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-hairline bg-pure/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-display text-base sm:text-lg font-bold tracking-[-0.02em] text-ink"
          >
            {SITE_CONFIG.name}
          </Link>

          {/* Desktop Primary Nav */}
          <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-[13px] transition-colors ${
                    active ? "font-semibold text-ink" : "font-medium text-slateMuted hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Pills */}
          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={openPicker}
              className="glass-white rounded-full px-4 py-2 text-xs font-semibold"
            >
              Peek 3D
            </button>
            <Link href="/start-project" className="glass-black rounded-full px-5 py-2 text-xs font-semibold">
              Start yours
            </Link>
          </div>

          {/* Mobile: Reserve right space for the floating vertical corner rail */}
          <div className="flex items-center gap-2 pr-[88px] lg:hidden">
            <button
              type="button"
              onClick={openPicker}
              className="glass-white inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-semibold"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Peek 3D</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Tap-Outside Soft Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity lg:hidden"
        />
      )}

      {/* Mobile Floating Vertical Top-Right Corner Menu (Replaces 3-line Hamburger) */}
      <div className="fixed right-3 top-3 z-50 flex flex-col items-end lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close navigation rail" : "Open navigation rail"}
          aria-expanded={open}
          className={`${
            open ? "glass-black" : "glass-white"
          } inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-[11px] font-semibold tracking-tight shadow-lg`}
        >
          {open ? (
            <>
              <X className="h-3.5 w-3.5" />
              <span>Close</span>
            </>
          ) : (
            <>
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Pages</span>
            </>
          )}
        </button>

        {open && (
          <nav
            aria-label="Mobile vertical corner navigation"
            className="corner-rail-enter glass-dock-white mt-2 flex w-44 flex-col gap-1 rounded-[24px] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
          >
            {LINKS.map((l) => {
              const Icon = l.icon;
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2.5 rounded-2xl px-3 py-2.5 text-xs font-semibold transition-all ${
                    active
                      ? "glass-black text-white shadow-sm"
                      : "text-ink/85 hover:bg-black/[0.05] active:scale-[0.98]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 opacity-85" />
                  <span>{l.label}</span>
                </Link>
              );
            })}

            <div className="my-1 h-px bg-black/10" />

            <Link
              href="/start-project"
              onClick={() => setOpen(false)}
              className="glass-black flex items-center justify-center gap-1.5 rounded-2xl px-3 py-2.5 text-xs font-semibold"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Start Brief</span>
            </Link>

            <a
              href={SITE_CONFIG.phoneHref}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-2xl px-3 py-2 text-[11px] font-semibold text-ink/75 hover:bg-black/[0.05]"
            >
              <Phone className="h-3 w-3" />
              <span>Call Studio</span>
            </a>
          </nav>
        )}
      </div>
    </>
  );
}
