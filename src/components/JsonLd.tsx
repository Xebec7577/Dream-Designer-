import { SITE_CONFIG } from "@/lib/site-config";

export function LocalBusinessJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dreamdesigners.example.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.positioning,
    url: siteUrl,
    telephone: SITE_CONFIG.phoneDisplay,
    foundingDate: SITE_CONFIG.foundedYear,
    founder: { "@type": "Person", name: SITE_CONFIG.founder, sameAs: SITE_CONFIG.social.linkedinFounder },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE_CONFIG.coordinates.lat, longitude: SITE_CONFIG.coordinates.lng },
    hasMap: SITE_CONFIG.googleMapsUrl,
    sameAs: [SITE_CONFIG.social.instagram, SITE_CONFIG.social.linkedinCompany, SITE_CONFIG.social.behance],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
