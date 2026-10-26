import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  return [
    ...["", "/projects", "/about", "/resume"].map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const })),
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, changeFrequency: "monthly" as const })),
  ];
}
