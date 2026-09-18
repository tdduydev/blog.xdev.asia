export const dynamic = "force-static";

import {
  getAllPosts,
  getPost,
  getAllSeries,
  getSeries,
  getSettings,
} from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Map fine-grained category slugs to broad groups for LLM-friendly organization
const SERIES_GROUPS: { name: string; categorySlugs: string[] }[] = [
  { name: "AI", categorySlugs: ["ai-machine-learning"] },
  { name: "DevSecOps", categorySlugs: ["kubernetes"] },
  { name: "Infrastructure", categorySlugs: ["web-server", "database-course"] },
  { name: "Lập trình", categorySlugs: ["spring-boot"] },
];

export function GET() {
  const settings = getSettings();
  const siteUrl = settings.site_url || SITE_URL;
  const siteName = settings.site_name || "xDev Asia";
  const siteDescription = settings.site_description || "";

  const postsIndex = getAllPosts();
  const seriesIndex = getAllSeries();

  // Group series by category slug
  const seriesByCategory = new Map<string, typeof seriesIndex>();
  for (const s of seriesIndex) {
    const catSlug = s.category?.slug || "uncategorized";
    if (!seriesByCategory.has(catSlug)) seriesByCategory.set(catSlug, []);
    seriesByCategory.get(catSlug)!.push(s);
  }

  let output = `# ${siteName}\n\n`;
  output += `> ${siteDescription}\n\n`;

  // Series with full content, grouped by broad categories
  output += `## Series\n\n`;
  const assignedSlugs = new Set<string>();

  function renderSeriesGroup(items: typeof seriesIndex) {
    for (const s of items) {
      const catSlug = s.category?.slug || "uncategorized";
      const full = getSeries(s.slug);
      output += `#### ${s.title}\n`;
      output += `URL: ${siteUrl}/series/${catSlug}/${s.slug}/\n`;
      if (s.level) output += `Level: ${s.level}\n`;
      if (s.lesson_count) output += `Lessons: ${s.lesson_count}\n`;
      if (s.tags.length > 0) output += `Tags: ${s.tags.map((t) => t.name).join(", ")}\n`;
      output += `\n`;
      if (s.description) output += `${s.description}\n\n`;
      if (full?.content) {
        const plainContent = stripHtml(full.content);
        if (plainContent) output += `${plainContent}\n\n`;
      }
      output += `---\n\n`;
    }
  }

  for (const group of SERIES_GROUPS) {
    const groupItems = group.categorySlugs.flatMap((slug) => {
      assignedSlugs.add(slug);
      return seriesByCategory.get(slug) || [];
    });
    if (groupItems.length === 0) continue;
    output += `### ${group.name}\n\n`;
    renderSeriesGroup(groupItems);
  }
  // Any uncategorized series not in the groups
  const ungrouped = seriesIndex.filter((s) => !assignedSlugs.has(s.category?.slug || "uncategorized"));
  if (ungrouped.length > 0) {
    output += `### Khác\n\n`;
    renderSeriesGroup(ungrouped);
  }

  // Blog posts with full content
  output += `## Blog\n\n`;
  for (const postIdx of postsIndex) {
    const post = getPost(postIdx.slug);
    output += `### ${postIdx.title}\n`;
    output += `URL: ${siteUrl}/blog/${postIdx.slug}/\n`;
    if (postIdx.published_at) output += `Published: ${postIdx.published_at}\n`;
    if (postIdx.category) output += `Category: ${postIdx.category.name}\n`;
    if (postIdx.tags.length > 0) output += `Tags: ${postIdx.tags.map((t) => t.name).join(", ")}\n`;
    output += `\n`;
    if (postIdx.excerpt) output += `${postIdx.excerpt}\n\n`;
    if (post?.content) {
      const plainContent = stripHtml(post.content);
      if (plainContent) output += `${plainContent}\n\n`;
    }
    output += `---\n\n`;
  }

  return new Response(output, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
