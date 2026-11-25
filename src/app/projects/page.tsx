import type { Metadata } from "next";
import { ProjectFilterGrid } from "@/components/ProjectFilterGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Architectural and interior concept studies by Dream Designers.",
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 lg:px-10">
      <h1 className="font-display text-3xl sm:text-6xl font-bold tracking-tight text-ink">
        Portfolio. <span className="font-normal text-slateMuted">Concept Direction.</span>
      </h1>
      <ProjectFilterGrid />
    </section>
  );
}
