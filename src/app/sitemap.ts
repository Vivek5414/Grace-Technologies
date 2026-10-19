import type { MetadataRoute } from "next";
import { services } from "@/lib/site-data";
import { serviceDetailSlugById } from "@/lib/service-detail-data";

const paths = [
  "/",
  "/services",
  "/industries",
  "/projects",
  "/about",
  "/insights",
  "/contact",
  "/privacy",
  "/terms",
  ...services.map((service) => `/services/${serviceDetailSlugById[service.id]}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  if (!baseUrl) return [];

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/services" || path === "/contact" ? 0.8 : 0.6,
  }));
}
