export const dynamic = "force-static";

import { getAllRoadmapSlugs } from "@/lib/roadmaps";
import { buildRoadmapDetail } from "@/lib/roadmap-api";

const EXTENSION = ".json";

// Xem comment đầy đủ trong `src/app/api/v1/quiz/[slug]/route.ts`: thư mục
// `[slug].json` (bracket ghép hậu tố tĩnh trong cùng một segment) KHÔNG được
// App Router nhận diện là dynamic segment — build thật báo lỗi khi prerender.
// Thư mục ở đây để thuần `[slug]`; hậu tố `.json` nằm trong giá trị param.
export function generateStaticParams() {
  return getAllRoadmapSlugs().map((slug) => ({ slug: `${slug}${EXTENSION}` }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.endsWith(EXTENSION) ? rawSlug.slice(0, -EXTENSION.length) : rawSlug;
  const roadmap = buildRoadmapDetail(slug);
  if (!roadmap) {
    return Response.json({ error: "not_found" }, { status: 404 });
  }
  return Response.json(roadmap);
}
