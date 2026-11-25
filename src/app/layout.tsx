import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/site-config";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { SpatialTourProvider } from "@/components/SpatialTourContext";
import { AirGlassIntro } from "@/components/AirGlassIntro";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dreamdesigners.example.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_CONFIG.name} — Architecture, Interiors & 3D Digital Showroom`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    "Dream Designers is a boutique architecture, interior design, and 3D visualisation studio in Ambala City, Haryana, founded by Paras Julka.",
  keywords: [
    "Interior designers in Ambala",
    "Architecture firm in Ambala",
    "Residential interior design Ambala",
    "Luxury home interior design",
    "Commercial interior design",
    "Architecture and 3D visualisation",
    "Dream Designers Ambala",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — Architecture & 3D Digital Showroom`,
    description: SITE_CONFIG.positioning,
    images: [{ url: "/images/concepts/concept-twilight-villa.jpg", width: 1376, height: 768, alt: "Dream Designers architectural concept" }],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-pure text-ink font-sans antialiased selection:bg-ink selection:text-pure">
        <LocalBusinessJsonLd />
        <SpatialTourProvider>
          <AirGlassIntro />
          <Navigation />
          <main id="main-content" className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppFloatingButton />
        </SpatialTourProvider>
      </body>
    </html>
  );
}
