export const dynamic = "force-static";

import { buildQuizIndex } from "@/lib/quiz-api";

export function GET() {
  return Response.json(buildQuizIndex());
}
