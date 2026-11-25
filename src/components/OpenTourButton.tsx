"use client";

import { Compass } from "lucide-react";
import { useSpatialTour } from "./SpatialTourContext";

export function OpenTourButton({ roomId, label = "Tour Space in 3D" }: { roomId: string; label?: string }) {
  const { openRoom } = useSpatialTour();
  return (
    <button type="button" onClick={() => openRoom(roomId)} className="glass-black inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold">
      <Compass className="h-4 w-4" /> {label}
    </button>
  );
}
