export const SITE_CONFIG = {
  name: "Dream Designers",
  tagline: "We Design Your Dreams...",
  positioning:
    "A boutique architecture and interior design studio specialising in high-end residential and selected commercial spaces.",
  founder: "Paras Julka",
  foundedYear: "2019",
  address: {
    street: "B4/01, Sector 23, Vatika City Central",
    city: "Ambala City",
    state: "Haryana",
    postalCode: "134003",
    country: "India",
    full: "B4/01, Sector 23, Vatika City Central, Ambala City, Haryana 134003, India",
  },
  coordinates: { lat: 30.3520586, lng: 76.7864222 },
  phoneDisplay: "+91 72065 57887",
  phoneHref: "tel:+917206557887",
  whatsappNumber: "917206557887",
  googleMapsUrl: "https://www.google.com/maps?q=30.3520586,76.7864222",
  social: {
    instagram: "https://www.instagram.com/dream.designerz/",
    linkedinCompany: "https://www.linkedin.com/company/dreamdesignerz/",
    linkedinFounder: "https://in.linkedin.com/in/paras-julka",
    behance: "https://www.behance.net/julkaparas838",
  },
  specialties: ["Architecture", "Interior Design", "3D Visualisation"] as const,
  configurableBudgetRanges: [
    "Under ₹15 Lakhs (Indicative)",
    "₹15 Lakhs – ₹35 Lakhs (Indicative)",
    "₹35 Lakhs – ₹75 Lakhs (Indicative)",
    "₹75 Lakhs – ₹1.5 Crore (Indicative)",
    "Above ₹1.5 Crore (Indicative)",
    "Prefer to discuss during consultation",
  ],
  configurableTimelines: [
    "Immediate (Within 1 month)",
    "1 – 3 months",
    "3 – 6 months",
    "6+ months / Planning stage",
    "Flexible",
  ],
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
