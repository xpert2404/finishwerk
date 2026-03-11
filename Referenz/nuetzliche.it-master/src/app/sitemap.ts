import type {MetadataRoute} from "next";
import {getSiteConfig} from "@/data/config";
import {allRouteKeys, getLocalizedPath} from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteConfig();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const route of allRouteKeys) {
    entries.push({
      url: `${site.siteUrl}${getLocalizedPath(route, "de")}`,
      lastModified: now,
      changeFrequency: route === "home" ? "weekly" : "monthly",
      priority: route === "home" ? 1 : 0.7
    });

    entries.push({
      url: `${site.siteUrl}${getLocalizedPath(route, "en")}`,
      lastModified: now,
      changeFrequency: route === "home" ? "weekly" : "monthly",
      priority: route === "home" ? 0.9 : 0.6
    });
  }

  return entries;
}
