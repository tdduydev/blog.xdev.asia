export const dynamic = "force-static";

import { buildRoadmapList } from "@/lib/roadmap-api";

export function GET() {
  return Response.json(buildRoadmapList());
}
