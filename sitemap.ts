import type { MetadataRoute } from "next";
import { listApprovedStores } from "@/lib/db";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stores = await listApprovedStores();
  return [
    { url: SITE.url, changeFrequency: "daily", priority: 1 },
    { url: `${SITE.url}/list-your-store`, priority: 0.6 },
    ...stores.map((s) => ({ url: `${SITE.url}/store/${s.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}
