import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-36 text-center">
      <h1 className="font-display text-5xl font-bold text-ink">404</h1>
      <p className="mt-4 text-slateMuted">This space does not exist.</p>
      <Link href="/" className="glass-black mt-8 inline-block rounded-full px-7 py-3 text-xs font-semibold">
        Return Home
      </Link>
    </section>
  );
}
