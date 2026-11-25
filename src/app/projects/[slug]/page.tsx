import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { STUDIES, getStudyBySlug } from "@/data/catalog";
import { buildWhatsAppUrl } from "@/lib/site-config";
import { OpenTourButton } from "@/components/OpenTourButton";

export function generateStaticParams() {
  return STUDIES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getStudyBySlug(params.slug);
  return s ? { title: s.title, description: s.shortDescription } : { title: "Not Found" };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const s = getStudyBySlug(params.slug);
  if (!s) notFound();
  const related = STUDIES.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <article>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 lg:px-10">
        <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-semibold text-slateMuted hover:text-ink">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Portfolio
        </Link>
        <div className="mt-6 grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <span className="inline-block rounded-full bg-canvas px-3.5 py-1 text-xs font-medium text-slateMuted">{s.typology}</span>
            <h1 className="mt-3 font-display text-3xl sm:text-6xl font-bold text-ink">{s.title}</h1>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <OpenTourButton roomId={s.tourRoom} />
          </div>
        </div>
        <div className="mt-8 aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-2xl sm:rounded-3xl bg-canvas shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.coverImage} alt={s.title} className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-14 sm:py-20 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2">
          <div><p className="text-xs font-semibold uppercase tracking-widest text-slateMuted">Overview</p><p className="mt-3 text-sm sm:text-base leading-relaxed text-ink/85">{s.overview}</p></div>
          <div><p className="text-xs font-semibold uppercase tracking-widest text-slateMuted">Design Concept</p><p className="mt-3 text-sm sm:text-base leading-relaxed text-ink/85">{s.designConcept}</p></div>
        </div>
        <div className="mt-12 grid gap-10 border-t border-hairline pt-12 md:grid-cols-2">
          <div><p className="text-xs font-semibold uppercase tracking-widest text-slateMuted">Material &amp; Lighting</p><ul className="mt-4 space-y-2.5 text-sm text-ink/85">{s.materialAndLighting.map((m) => <li key={m}>&mdash; {m}</li>)}</ul></div>
          <div><p className="text-xs font-semibold uppercase tracking-widest text-slateMuted">Spatial Planning</p><p className="mt-4 text-sm leading-relaxed text-slateMuted">{s.spatialPlanning}</p></div>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {s.secondaryImages.map((img) => (
            <figure key={img.src}>
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-canvas">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.caption} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <figcaption className="mt-2.5 text-xs text-slateMuted">{img.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-16 rounded-3xl bg-canvas p-6 sm:p-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">Envisioning a similar space?</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={`/start-project?ref=${encodeURIComponent(s.title)}`} className="glass-black rounded-full px-6 py-3 text-xs font-semibold">Submit Project Brief</Link>
            <a href={buildWhatsAppUrl(s.whatsappContext)} target="_blank" rel="noopener noreferrer" className="glass-white inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold">WhatsApp Studio <ArrowUpRight className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </div>

      <section className="border-t border-hairline bg-canvas py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-slateMuted">Related Studies</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/projects/${r.slug}`} className="overflow-hidden rounded-2xl bg-pure shadow-sm transition-all hover:shadow-lg">
                <div className="aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.coverImage} alt={r.title} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-4 sm:p-5"><h3 className="font-display text-base sm:text-lg font-bold text-ink">{r.title}</h3></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
