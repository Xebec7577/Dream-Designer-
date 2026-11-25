"use client";

import Link from "next/link";
import { Compass, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/site-config";
import { useSpatialTour } from "./SpatialTourContext";

export function WhatsAppFloatingButton() {
  const { openPicker } = useSpatialTour();
  const href = buildWhatsAppUrl("Hello Dream Designers, I explored your 3D Digital Showroom and would like to discuss a project.");

  return (
    <>
      {/* Desktop Floating Shiny Black Glass Pill */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message Dream Designers on WhatsApp"
        className="glass-black fixed bottom-5 left-5 z-40 hidden items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold sm:inline-flex"
      >
        <MessageCircle className="h-4 w-4" />
        <span>WhatsApp Studio</span>
      </a>

      {/* Mobile Sticky Thumb-Zone Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-hairline bg-pure/92 px-3 py-2.5 backdrop-blur-xl sm:hidden">
        <div className="grid grid-cols-3 gap-2">
          <a href={href} target="_blank" rel="noopener noreferrer" className="glass-white flex items-center justify-center gap-1.5 rounded-full py-2.5 text-[11px] font-semibold">
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
          </a>
          <button type="button" onClick={openPicker} className="glass-white flex items-center justify-center gap-1.5 rounded-full py-2.5 text-[11px] font-semibold">
            <Compass className="h-3.5 w-3.5" /> Peek 3D
          </button>
          <Link href="/start-project" className="glass-black flex items-center justify-center rounded-full py-2.5 text-[11px] font-semibold">
            Start Brief
          </Link>
        </div>
      </div>
    </>
  );
}
