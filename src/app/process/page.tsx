import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Process",
  description: "Five clear stages from discovery to delivery with Dream Designers.",
};

const STAGES = [
  ["01", "Discovery", "Understanding lifestyle, site context, functional priorities, and expectations."],
  ["02", "Concept", "Exploring spatial zoning, architectural massing, and tactile material direction."],
  ["03", "Design Development", "Refining layouts, bespoke joinery, stone and timber selections, and lighting logic."],
  ["04", "3D Visualisation", "Photorealistic renders and interactive walkthroughs for complete clarity before build."],
  ["05", "Execution & Delivery", "Exact site involvement and coordination scope confirmed directly in your engagement agreement."],
];

export default function ProcessPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 py-14 sm:py-20 lg:px-10">
      <h1 className="font-display text-3xl sm:text-6xl font-bold text-ink">
        Design Process. <span className="font-normal text-slateMuted">Five clear stages.</span>
      </h1>
      <ol className="mt-10 space-y-5">
        {STAGES.map(([n, t, b]) => (
          <li key={n} className="rounded-2xl bg-canvas p-5 sm:p-7">
            <span className="text-xs font-bold text-slateMuted">STAGE {n}</span>
            <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-ink">{t}</h2>
            <p className="mt-2 text-sm text-slateMuted">{b}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10">
        <Link href="/start-project" className="glass-black inline-block rounded-full px-8 py-3.5 text-xs font-semibold">
          Begin Stage 01 &mdash; Start Your Project
        </Link>
      </div>
    </section>
  );
}
