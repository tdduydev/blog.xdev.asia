export const dynamic = "force-static";

import { getAllPosts, getAllSeries, getSettings } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

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

  const posts = getAllPosts();
  const series = getAllSeries();

  // Group series by category slug
  const seriesByCategory = new Map<string, typeof series>();
  for (const s of series) {
    const catSlug = s.category?.slug || "uncategorized";
    if (!seriesByCategory.has(catSlug)) seriesByCategory.set(catSlug, []);
    seriesByCategory.get(catSlug)!.push(s);
  }

  let output = `# ${siteName}\n\n`;
  output += `> ${siteDescription}\n\n`;

  // Series section grouped by broad categories
  output += `## Series\n\n`;
  const assignedSlugs = new Set<string>();
  for (const group of SERIES_GROUPS) {
    const groupItems = group.categorySlugs.flatMap((slug) => {
      assignedSlugs.add(slug);
      return seriesByCategory.get(slug) || [];
    });
    if (groupItems.length === 0) continue;
    output += `### ${group.name}\n\n`;
    for (const s of groupItems) {
      const catSlug = s.category?.slug || "uncategorized";
      const desc = s.description ? `: ${s.description}` : "";
      output += `- [${s.title}](${siteUrl}/series/${catSlug}/${s.slug}/)${desc}\n`;
    }
    output += `\n`;
  }
  // Any uncategorized series not in the groups
  const ungrouped = series.filter((s) => !assignedSlugs.has(s.category?.slug || "uncategorized"));
  if (ungrouped.length > 0) {
    output += `### Khác\n\n`;
    for (const s of ungrouped) {
      const catSlug = s.category?.slug || "uncategorized";
      const desc = s.description ? `: ${s.description}` : "";
      output += `- [${s.title}](${siteUrl}/series/${catSlug}/${s.slug}/)${desc}\n`;
    }
    output += `\n`;
  }

  // Blog posts section
  output += `## Blog\n\n`;
  for (const post of posts) {
    const desc = post.excerpt ? `: ${post.excerpt}` : "";
    output += `- [${post.title}](${siteUrl}/blog/${post.slug}/)${desc}\n`;
  }
  output += `\n`;

  return new Response(output, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
