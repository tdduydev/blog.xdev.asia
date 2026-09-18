export const dynamic = "force-static";

import { buildManifest } from "@/lib/content-api";
import { buildQuizIndex } from "@/lib/quiz-api";
import { buildRoadmapList } from "@/lib/roadmap-api";

/**
 * Task 11: thêm số lượng quiz/roadmap ở CẤP GỐC, không nhét vào `counts`.
 * `counts` (theo brief) là hình dạng đã ổn định cho post/lesson/series theo
 * locale — quiz/roadmap không phân locale nên không có chỗ đứng tự nhiên
 * trong đó, và nhét vào sẽ buộc mọi locale phải mang cùng một con số, gây
 * hiểu lầm là dữ liệu có phân theo locale trong khi thực ra không.
 *
 * Đếm qua `buildQuizIndex()/buildRoadmapList()` (đúng mảng mà
 * `quizzes.json`/`roadmaps.json` trả về) thay vì gọi lại getter thô, để con
 * số này không bao giờ lệch khỏi độ dài mảng thật app nhận được.
 */
export function GET() {
  return Response.json({
    ...buildManifest(),
    quizzes: buildQuizIndex().length,
    roadmaps: buildRoadmapList().length,
  });
}
