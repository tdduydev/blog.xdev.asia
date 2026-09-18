export const dynamic = "force-static";

import { buildManifest } from "@/lib/content-api";

export function GET() {
  return Response.json(buildManifest());
}
