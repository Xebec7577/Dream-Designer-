"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, Grid, X, ZoomIn, ZoomOut } from "lucide-react";
import { TOUR_ROOMS } from "@/data/catalog";

type Mood = "daylight" | "golden" | "evening";

export function SpatialTourWindow({
  initialRoomId,
  onClose,
}: {
  initialRoomId: string | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const [stage, setStage] = useState<"picker" | "loading" | "live">(initialRoomId ? "loading" : "picker");
  const [roomId, setRoomId] = useState<string>(initialRoomId || "living");
  const [mood, setMood] = useState<Mood>("daylight");
  const [menuOpen, setMenuOpen] = useState(false);
  const [zoomLabel, setZoomLabel] = useState("1.0x");
  const [hintVisible, setHintVisible] = useState(true);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const planeRef = useRef<HTMLDivElement | null>(null);
  const camRef = useRef({
    scale: 1.12, targetScale: 1.12,
    tx: 0, ty: 0, targetTx: 0, targetTy: 0,
    rx: 0, ry: 0, targetRx: 0, targetRy: 0,
    dragging: false, lastX: 0, lastY: 0, pinchDist: 0,
  });

  const room = TOUR_ROOMS.find((r) => r.id === roomId) || TOUR_ROOMS[0];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  useEffect(() => {
    if (stage !== "loading") return;
    const t = setTimeout(() => {
      camRef.current = {
        scale: 1.12, targetScale: 1.12, tx: 0, ty: 0, targetTx: 0, targetTy: 0,
        rx: 0, ry: 0, targetRx: 0, targetRy: 0, dragging: false, lastX: 0, lastY: 0, pinchDist: 0,
      };
      setZoomLabel("1.0x");
      setHintVisible(true);
      setStage("live");
    }, 400);
    return () => clearTimeout(t);
  }, [stage, roomId]);

  useEffect(() => {
    if (stage !== "live") return;
    let raf = 0;
    const clampPan = () => {
      const vp = viewportRef.current;
      if (!vp) return;
      const c = camRef.current;
      const maxX = Math.max(0, (vp.clientWidth * (c.targetScale - 1)) / 2);
      const maxY = Math.max(0, (vp.clientHeight * (c.targetScale - 1)) / 2);
      c.targetTx = Math.max(-maxX, Math.min(maxX, c.targetTx));
      c.targetTy = Math.max(-maxY, Math.min(maxY, c.targetTy));
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const c = camRef.current;
      c.scale += (c.targetScale - c.scale) * 0.1;
      c.tx += (c.targetTx - c.tx) * 0.12;
      c.ty += (c.targetTy - c.ty) * 0.12;
      c.rx += (c.targetRx - c.rx) * 0.08;
      c.ry += (c.targetRy - c.ry) * 0.08;
      if (planeRef.current) {
        planeRef.current.style.transform = `translate3d(${c.tx.toFixed(2)}px, ${c.ty.toFixed(2)}px, 0) scale(${c.scale.toFixed(4)}) rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg)`;
      }
    };
    tick();

    const vp = viewportRef.current;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setHintVisible(false);
      camRef.current.targetScale = Math.max(1.06, Math.min(2.45, camRef.current.targetScale - e.deltaY * 0.0014));
      clampPan();
      setZoomLabel((camRef.current.targetScale / 1.12).toFixed(1) + "x");
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        setHintVisible(false);
        const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        if (camRef.current.pinchDist > 0) {
          camRef.current.targetScale = Math.max(1.06, Math.min(2.45, camRef.current.targetScale * (dist / camRef.current.pinchDist)));
          clampPan();
          setZoomLabel((camRef.current.targetScale / 1.12).toFixed(1) + "x");
        }
        camRef.current.pinchDist = dist;
      }
    };
    const onTouchEnd = () => { camRef.current.pinchDist = 0; };
    const onUp = () => { camRef.current.dragging = false; };

    vp?.addEventListener("wheel", onWheel, { passive: false });
    vp?.addEventListener("touchmove", onTouchMove, { passive: false });
    vp?.addEventListener("touchend", onTouchEnd);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      vp?.removeEventListener("wheel", onWheel);
      vp?.removeEventListener("touchmove", onTouchMove);
      vp?.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("pointerup", onUp);
    };
  }, [stage]);

  const enterRoom = (id: string) => {
    setMenuOpen(false);
    setRoomId(id);
    setStage("loading");
  };

  const adjustZoom = (delta: number) => {
    setHintVisible(false);
    const c = camRef.current;
    c.targetScale = Math.max(1.06, Math.min(2.45, c.targetScale + delta));
    const vp = viewportRef.current;
    if (vp) {
      const maxX = Math.max(0, (vp.clientWidth * (c.targetScale - 1)) / 2);
      const maxY = Math.max(0, (vp.clientHeight * (c.targetScale - 1)) / 2);
      c.targetTx = Math.max(-maxX, Math.min(maxX, c.targetTx));
      c.targetTy = Math.max(-maxY, Math.min(maxY, c.targetTy));
    }
    setZoomLabel((c.targetScale / 1.12).toFixed(1) + "x");
  };

  const resetView = () => {
    camRef.current.targetScale = 1.12;
    camRef.current.targetTx = 0;
    camRef.current.targetTy = 0;
    setZoomLabel("1.0x");
  };

  const moodFilter =
    mood === "golden"
      ? "contrast(1.05) saturate(1.14) sepia(0.12) brightness(0.97)"
      : mood === "evening"
      ? "brightness(0.74) contrast(1.16) saturate(1.1)"
      : "none";

  return (
    <div className="fixed inset-0 z-[90] flex flex-col bg-black text-white" role="dialog" aria-modal="true" aria-label="Dream Designers 3D House Tour">
      {stage === "picker" && (
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-y-auto bg-black px-5 py-16">
          <button type="button" onClick={onClose} aria-label="Close" className="glass-frosted-dark absolute right-4 top-4 sm:right-6 sm:top-6 flex h-10 w-10 items-center justify-center rounded-full">
            <X className="h-5 w-5" />
          </button>
          <div className="w-full max-w-md text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Choose a space to tour.</h2>
            <p className="mt-2 text-xs sm:text-sm text-white/55">Dream Designers residence concept in six high-resolution spaces.</p>
            <div className="mt-7 space-y-2.5 text-left">
              {TOUR_ROOMS.map((r) => (
                <button key={r.id} type="button" onClick={() => enterRoom(r.id)} className="flex w-full items-center gap-3.5 rounded-2xl border border-white/15 bg-white/[0.06] p-3 text-left transition-all hover:border-white/40 hover:bg-white/[0.14]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.img} alt={r.name} className="h-12 w-16 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <p className="font-display text-sm font-semibold text-white truncate">{r.name}</p>
                    <p className="mt-0.5 text-[11px] text-white/55 truncate">{r.meta}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {stage === "loading" && (
        <div className="flex h-full w-full flex-col items-center justify-center bg-black">
          <div className="h-0.5 w-36 overflow-hidden bg-white/20">
            <div className="h-full w-full bg-white animate-pulse" />
          </div>
          <p className="mt-4 text-xs text-white/60">Entering {room.name}...</p>
        </div>
      )}

      {stage === "live" && (
        <div className="relative flex-1 bg-black">
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-30 flex items-center justify-between gap-2 px-3 py-3 sm:px-6 sm:py-5">
            <button type="button" onClick={() => setStage("picker")} className="pointer-events-auto glass-frosted-dark inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] sm:text-xs font-medium">
              <Grid className="h-3.5 w-3.5" /> <span className="hidden sm:inline">All Spaces</span>
            </button>

            <div className="pointer-events-auto relative">
              <button type="button" onClick={() => setMenuOpen((v) => !v)} className="glass-frosted-dark inline-flex items-center gap-1.5 rounded-full px-4 sm:px-5 py-2 text-[11px] sm:text-xs font-medium">
                <span className="max-w-[165px] sm:max-w-none truncate">{room.name}</span>
                <ChevronDown className="h-3.5 w-3.5 shrink-0" />
              </button>
              {menuOpen && (
                <div className="glass-frosted-dark absolute left-1/2 top-12 w-64 -translate-x-1/2 rounded-2xl p-1.5">
                  {TOUR_ROOMS.map((r) => (
                    <button key={r.id} type="button" onClick={() => enterRoom(r.id)} className={`block w-full rounded-xl px-3.5 py-2.5 text-left text-xs ${r.id === roomId ? "bg-white text-black font-semibold" : "text-white/80 hover:bg-white/10"}`}>
                      {r.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button type="button" onClick={onClose} aria-label="Close 3D Tour" className="pointer-events-auto glass-frosted-dark flex h-9 w-9 items-center justify-center rounded-full">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={viewportRef}
            className="relative h-full w-full overflow-hidden bg-[#080808] select-none touch-none cursor-grab active:cursor-grabbing"
            style={{ perspective: "1600px" }}
            onPointerDown={(e) => {
              if ((e.target as HTMLElement).closest("button")) return;
              camRef.current.dragging = true;
              camRef.current.lastX = e.clientX;
              camRef.current.lastY = e.clientY;
              setHintVisible(false);
            }}
            onPointerMove={(e) => {
              const vp = viewportRef.current;
              if (!vp) return;
              const rect = vp.getBoundingClientRect();
              camRef.current.targetRy = -((e.clientX - rect.left) / rect.width - 0.5) * 3.4;
              camRef.current.targetRx = ((e.clientY - rect.top) / rect.height - 0.5) * 2.4;
              if (!camRef.current.dragging) return;
              camRef.current.targetTx += (e.clientX - camRef.current.lastX) * 1.15;
              camRef.current.targetTy += (e.clientY - camRef.current.lastY) * 1.15;
              camRef.current.lastX = e.clientX;
              camRef.current.lastY = e.clientY;
              const maxX = Math.max(0, (vp.clientWidth * (camRef.current.targetScale - 1)) / 2);
              const maxY = Math.max(0, (vp.clientHeight * (camRef.current.targetScale - 1)) / 2);
              camRef.current.targetTx = Math.max(-maxX, Math.min(maxX, camRef.current.targetTx));
              camRef.current.targetTy = Math.max(-maxY, Math.min(maxY, camRef.current.targetTy));
            }}
          >
            <div ref={planeRef} className="absolute inset-0 will-change-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={room.img} alt={room.name} draggable={false} className="h-full w-full object-cover transition-all duration-500" style={{ filter: moodFilter }} />
              <div className="absolute inset-0 z-20">
                {room.portals.map((pt) => (
                  <button key={pt.label} type="button" onClick={() => enterRoom(pt.targetRoom)} style={{ left: `${pt.x}%`, top: `${pt.y}%` }} className="samara-step-node inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs font-semibold">
                    <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_#fff]" />
                    <span>{pt.label}</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                ))}
              </div>
            </div>
            {hintVisible && (
              <div className="pointer-events-none absolute left-1/2 top-16 sm:top-20 z-20 -translate-x-1/2 rounded-full bg-black/50 px-3.5 py-1 text-[10px] font-medium tracking-wider text-white/80 backdrop-blur-md">
                Drag to look &middot; Pinch or scroll to zoom
              </div>
            )}
          </div>

          <div className="pointer-events-none absolute bottom-4 sm:bottom-6 left-0 right-0 z-30 flex justify-center px-3">
            <div className="pointer-events-auto glass-frosted-dark flex max-w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2 rounded-full p-1.5">
              <button type="button" onClick={() => adjustZoom(0.28)} className="flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-medium hover:bg-white/15">
                <ZoomIn className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Zoom in</span>
              </button>
              <button type="button" onClick={() => adjustZoom(-0.28)} aria-label="Zoom out" className="rounded-full px-2.5 py-1.5 hover:bg-white/15">
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <button type="button" onClick={resetView} className="rounded-full px-2.5 py-1.5 text-[11px] font-medium text-white/80 hover:bg-white/15">
                {zoomLabel}
              </button>
              <span className="h-4 w-px bg-white/20" />
              {(["daylight", "golden", "evening"] as Mood[]).map((m) => (
                <button key={m} type="button" onClick={() => setMood(m)} className={`rounded-full px-3 py-1.5 text-[11px] font-medium capitalize ${mood === m ? "bg-white text-black font-semibold" : "text-white/75"}`}>
                  {m === "daylight" ? "Day" : m}
                </button>
              ))}
              <button
                type="button"
                onClick={() => { onClose(); router.push(`/start-project?ref=${encodeURIComponent(room.name)}`); }}
                className="glass-white inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[11px] font-semibold"
              >
                Enquire <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
