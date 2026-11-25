"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { SpatialTourWindow } from "./SpatialTourWindow";

interface TourContextValue {
  openPicker: () => void;
  openRoom: (roomId: string) => void;
  closeTour: () => void;
}

const TourContext = createContext<TourContextValue>({
  openPicker: () => {},
  openRoom: () => {},
  closeTour: () => {},
});

export function useSpatialTour() {
  return useContext(TourContext);
}

export function SpatialTourProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState<string>("living");

  // Launch straight into the live full-screen 3D Living Salon — never a boring list screen
  const openPicker = () => {
    setRoomId("living");
    setOpen(true);
  };
  const openRoom = (id: string) => {
    setRoomId(id);
    setOpen(true);
  };
  const closeTour = () => setOpen(false);

  return (
    <TourContext.Provider value={{ openPicker, openRoom, closeTour }}>
      {children}
      {open && <SpatialTourWindow initialRoomId={roomId} onClose={closeTour} />}
    </TourContext.Provider>
  );
}
