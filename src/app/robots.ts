import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      "https://blog.xdev.asia/sitemap.xml",
      "https://blog.xdev.asia/news-sitemap.xml",
    ],
  };
}
