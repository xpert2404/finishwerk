import type {MetadataRoute} from "next";
import {getSiteConfig} from "@/data/config";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteConfig();
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${site.siteUrl}/sitemap.xml`
  };
}
