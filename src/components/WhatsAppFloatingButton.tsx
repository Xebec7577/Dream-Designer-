"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/site-config";

export function WhatsAppFloatingButton() {
  const href = buildWhatsAppUrl("Hello Dream Designers, I explored your 3D Digital Showroom and would like to discuss a project.");
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Dream Designers on WhatsApp"
      className="glass-black fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2.5 text-xs font-semibold"
    >
      <MessageCircle className="h-4 w-4" />
      <span className="hidden sm:inline">WhatsApp Studio</span>
    </a>
  );
}
