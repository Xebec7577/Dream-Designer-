import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { SITE_CONFIG, buildWhatsAppUrl } from "@/lib/site-config";

export function Footer() {
  const wa = buildWhatsAppUrl("Hello Dream Designers, I would like to discuss an architecture or interior design project.");
  return (
    <footer className="bg-black text-white pb-20 sm:pb-0">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-bold tracking-tight">{SITE_CONFIG.name}</p>
            <p className="mt-2 text-sm text-white/60">&ldquo;{SITE_CONFIG.tagline}&rdquo;</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">{SITE_CONFIG.positioning}</p>
          </div>
          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Navigation</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li><Link href="/showroom" className="hover:text-white">3D Digital Showroom</Link></li>
              <li><Link href="/projects" className="hover:text-white">Portfolio</Link></li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li><Link href="/reels" className="hover:text-white">Reels &amp; Instagram</Link></li>
              <li><Link href="/client/demo-residence" className="hover:text-white">Client Portal Demo</Link></li>
              <li><Link href="/studio" className="hover:text-white">The Studio</Link></li>
              <li><Link href="/start-project" className="hover:text-white">Start Your Project</Link></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Studio Office</p>
            <div className="mt-4 space-y-3.5 text-sm text-white/75">
              <a href={SITE_CONFIG.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 hover:text-white">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />
                <span>{SITE_CONFIG.address.full}</span>
              </a>
              <a href={SITE_CONFIG.phoneHref} className="flex items-center gap-2.5 hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-white/50" />
                <span>{SITE_CONFIG.phoneDisplay}</span>
              </a>
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white/80 hover:text-white">WhatsApp <ArrowUpRight className="h-3.5 w-3.5" /></a>
                <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white/80 hover:text-white">Instagram <ArrowUpRight className="h-3.5 w-3.5" /></a>
                <a href={SITE_CONFIG.social.linkedinCompany} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white/80 hover:text-white">LinkedIn <ArrowUpRight className="h-3.5 w-3.5" /></a>
                <a href={SITE_CONFIG.social.behance} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white/80 hover:text-white">Behance <ArrowUpRight className="h-3.5 w-3.5" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}, Ambala.</p>
          <p>Concept imagery shown for art-direction preview until owner portfolio photography is approved.</p>
        </div>
      </div>
    </footer>
  );
}
