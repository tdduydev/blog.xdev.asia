export const dynamic = "force-static";

import { getQuizSlugs } from "@/lib/data";
import { buildQuizDetail } from "@/lib/quiz-api";

const EXTENSION = ".json";

/**
 * App Router yêu cầu TOÀN BỘ tên thư mục phải là `[name]` để được nhận diện
 * là dynamic segment — xem `getSegmentParam()` trong
 * `node_modules/next/dist/shared/lib/router/utils/get-segment-param.js`:
 * nó chỉ kiểm `segment.startsWith('[') && segment.endsWith(']')`. Một thư
 * mục đặt tên `[slug].json` (ghép bracket với hậu tố tĩnh trong CÙNG một
 * segment) không khớp điều kiện này — bị coi là segment TĨNH literally có
 * tên `[slug].json`, không phải dynamic segment tên `slug`. Đã đo bằng build
 * thật: `next build` báo lỗi
 * `TypeError: Cannot destructure property 'slug' of '(intermediate value)'
 * as it is undefined` khi prerender, vì `generateStaticParams()` trả về
 * `{ slug: 'cka' }` nhưng route không hề được đăng ký là có tham số nào để
 * nội suy — khác hẳn `[locale]/index.json/route.ts` (đã có, chạy đúng),
 * nơi `[locale]` đứng MỘT MÌNH trong thư mục riêng, tách biệt khỏi thư mục
 * tĩnh `index.json` kế tiếp.
 *
 * Vẫn cần URL cuối cùng là `/api/v1/quiz/{slug}.json` (một file `.json`
 * tĩnh mỗi đề, đúng kiến trúc "Content API tĩnh" của cả hệ thống) — nên thư
 * mục ở đây để THUẦN `[slug]`, và phần hậu tố `.json` được nhúng NGAY TRONG
 * GIÁ TRỊ mà `generateStaticParams()` trả về (`slug: "cka.json"`) thay vì
 * trong tên thư mục. Next chỉ nội suy chuỗi vào URL, không quan tâm chuỗi đó
 * có chứa dấu chấm hay không, nên file tĩnh sinh ra đúng là
 * `out/api/v1/quiz/cka.json`. Handler tự bóc `.json` khỏi param nhận được để
 * tra lại quiz thật.
 */
export function generateStaticParams() {
  return getQuizSlugs().map((slug) => ({ slug: `${slug}${EXTENSION}` }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.endsWith(EXTENSION) ? rawSlug.slice(0, -EXTENSION.length) : rawSlug;
  const quiz = buildQuizDetail(slug);
  if (!quiz) {
    return Response.json({ error: "not_found" }, { status: 404 });
  }
  return Response.json(quiz);
}
