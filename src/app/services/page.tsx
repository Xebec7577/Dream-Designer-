import type { Metadata } from "next";
import { ServicesShowcase } from "@/components/ServicesShowcase";

export const metadata: Metadata = {
  title: "Services",
  description: "Architecture, Interior Design, and 3D Visualisation services by Dream Designers in Ambala.",
};

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 lg:px-10">
      <h1 className="font-display text-3xl sm:text-6xl font-bold tracking-tight text-ink">
        Services. <span className="font-normal text-slateMuted">Built for visual certainty.</span>
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-slateMuted">
        Explore each discipline interactively. Exact deliverables and site involvement are confirmed directly during your initial consultation.
      </p>
      <ServicesShowcase />
    </section>
  );
}
