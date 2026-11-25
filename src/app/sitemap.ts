import type { MetadataRoute } from "next";
import { STUDIES } from "@/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dreamdesigners.example.com";
  const staticRoutes = ["", "/showroom", "/projects", "/services", "/reels", "/studio", "/process", "/start-project"].map(
    (route) => ({ url: `${baseUrl}${route}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.8 })
  );
  const studyRoutes = STUDIES.map((s) => ({
    url: `${baseUrl}/projects/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...staticRoutes, ...studyRoutes];
}
