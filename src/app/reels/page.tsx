import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { ReelsGallery } from "@/components/ReelsGallery";

export const metadata: Metadata = {
  title: "Reels & Instagram",
  description: "Architectural reels and visual direction linked to @dream.designerz.",
};

export default function ReelsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 lg:px-10">
      <div className="flex flex-col justify-between gap-5 border-b border-hairline pb-8 md:flex-row md:items-end">
        <div>
          <h1 className="font-display text-3xl sm:text-6xl font-bold text-ink">
            Reels &amp; IG. <span className="font-normal text-slateMuted">@dream.designerz</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slateMuted">
            Concept reel previews linked to @dream.designerz, ready for official Instagram embeds upon owner authorisation.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="glass-black inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold">Visit Instagram <ArrowUpRight className="h-3.5 w-3.5" /></a>
          <a href={SITE_CONFIG.social.behance} target="_blank" rel="noopener noreferrer" className="glass-white inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold">Behance <ArrowUpRight className="h-3.5 w-3.5" /></a>
        </div>
      </div>
      <ReelsGallery />
    </section>
  );
}
