export const dynamic = "force-static";

import { getAllPosts, getSettings } from "@/lib/data";
import { getPostImageUrl, SITE_URL } from "@/lib/seo";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const settings = getSettings();
  const siteUrl = settings.site_url || SITE_URL;
  const siteName = settings.site_name || "xDev Asia";
  const siteDescription = settings.site_description || "";

  const now = new Date();
  const items = getAllPosts()
    .filter((post) => {
      if (!post.published_at) return false;
      return new Date(post.published_at) <= now;
    })
    .map((post) => ({
      title: post.title,
      link: `${siteUrl}/blog/${post.slug}/`,
      description: post.excerpt || "",
      pubDate: new Date(post.published_at || 0).toUTCString(),
      category: post.category?.name || "",
      author: post.author?.name || "",
      image: post.featured_image ? getPostImageUrl(post) : "",
    }))
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  const rssItems = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>${item.category ? `\n      <category>${escapeXml(item.category)}</category>` : ""}${item.author ? `\n      <dc:creator>${escapeXml(item.author)}</dc:creator>` : ""}
      ${item.image ? `<media:content url="${escapeXml(item.image)}" medium="image" />` : ""}
      <guid isPermaLink="true">${escapeXml(item.link)}</guid>
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteName)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>vi</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(siteUrl)}/feed.xml/" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
