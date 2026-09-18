import { describe, expect, it } from "vitest";
import { getQuizSlugs } from "@/lib/data";
import { getAllRoadmapSlugs, getRoadmapList } from "@/lib/roadmaps";
import { buildQuizDetail, buildQuizIndex } from "@/lib/quiz-api";
import { buildRoadmapDetail } from "@/lib/roadmap-api";

/**
 * Duyệt đệ quy một giá trị JSON. Với mọi mảng object "anh em" (cùng nằm
 * trong một mảng — vd danh sách quiz, danh sách domain, danh sách item
 * trong một phase roadmap), khẳng định: khoá nào xuất hiện ở ÍT NHẤT MỘT
 * phần tử thì phải xuất hiện ở MỌI phần tử khác trong cùng mảng đó (giá
 * trị có thể là `null`, nhưng khoá không được vắng mặt hẳn).
 *
 * Đây chính là bẫy Task 2 đã cắn: một field khai kiểu `T | undefined` mà
 * chỉ một vài entry thiếu — spread thẳng object nguồn ra JSON sẽ làm entry
 * đó thiếu hẳn khoá thay vì có `null` tường minh, trong khi type khai field
 * đó luôn tồn tại. Test này không hard-code danh sách khoá theo từng type
 * (sẽ rất dài và dễ sót với Roadmap — 11 field optional chỉ riêng
 * RoadmapItem) mà tự suy ra "khoá kỳ vọng" từ chính dữ liệu anh em.
 *
 * Đã chạy trực tiếp trên dữ liệu THÔ (`getAllQuizzes()`/`getRoadmap()`)
 * trước khi viết `src/lib/quiz-api.ts`/`src/lib/roadmap-api.ts` — ĐỎ đúng
 * như dự đoán: `quizzes[1]` (aws-ml-specialty) thiếu khoá `domains`, và 30
 * item/link rải khắp 4/5 roadmap thiếu đủ loại khoá khác nhau (`quiz`,
 * `resourceLinks`, `checklist`, `resources`, `learningSteps`, và bên trong
 * từng `resourceLinks[]` là `label`/`title`). Xem
 * `.superpowers/sdd/2026-09-18-xdev-mobile-app-and-cicd/task-11-report.md`
 * để có nguyên văn output đỏ. Giờ test dưới đây trỏ vào builder ĐÃ chuẩn
 * hoá (`buildQuizIndex`/`buildQuizDetail`/`buildRoadmapDetail`) — phải
 * xanh vĩnh viễn.
 */
function findInconsistentKeys(value: unknown, path: string, problems: string[]): void {
  if (Array.isArray(value)) {
    const objectItems = value.filter(
      (item): item is Record<string, unknown> =>
        item !== null && typeof item === "object" && !Array.isArray(item)
    );
    if (objectItems.length > 1) {
      const allKeys = new Set<string>();
      for (const item of objectItems) {
        for (const key of Object.keys(item)) allKeys.add(key);
      }
      objectItems.forEach((item, index) => {
        const missing = [...allKeys].filter((key) => !(key in item));
        if (missing.length > 0) {
          problems.push(`${path}[${index}] thiếu khoá: ${missing.join(", ")}`);
        }
      });
    }
    value.forEach((item, index) => findInconsistentKeys(item, `${path}[${index}]`, problems));
    return;
  }
  if (value !== null && typeof value === "object") {
    for (const [key, v] of Object.entries(value)) {
      findInconsistentKeys(v, `${path}.${key}`, problems);
    }
  }
}

/**
 * Round-trip qua JSON.stringify/parse giống hệt những gì
 * `Response.json()` phát ra cho client thật — một property gán giá trị
 * `undefined` trong object literal VẪN có mặt trước khi qua bước này (xem
 * comment cùng tên trong `tests/content-api-routes.test.ts`).
 */
function throughWire<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

describe("quizzes.json — không field nào thiếu khoá ngầm giữa các entry", () => {
  it("buildQuizIndex(): mọi entry cùng một bộ khoá, kể cả sau khi qua JSON.stringify", () => {
    const problems: string[] = [];
    findInconsistentKeys(throughWire(buildQuizIndex()), "quizzes", problems);
    expect(problems).toEqual([]);
  });
});

describe("quiz/{slug}.json — không field nào thiếu khoá ngầm giữa các entry", () => {
  it("buildQuizDetail(): mọi domain/question trong từng đề cùng một bộ khoá, ở cả 7 đề", () => {
    const problems: string[] = [];
    for (const slug of getQuizSlugs()) {
      findInconsistentKeys(throughWire(buildQuizDetail(slug)), `quiz(${slug})`, problems);
    }
    expect(problems).toEqual([]);
  });

  // Bổ sung sau góp ý advisor: gọi hàm trên TỪNG document riêng lẻ (như test
  // phía trên) không so sánh được các field NẰM Ở CẤP GỐC của document đó —
  // `findInconsistentKeys` chỉ so khoá giữa các phần tử "anh em" CÙNG MỘT
  // MẢNG, và một document đơn lẻ không phải mảng nên cấp gốc của nó không
  // bao giờ được đối chiếu với document khác. Đúng field mà brief nêu làm ví
  // dụng (`domains`) nằm Ở CẤP GỐC của quiz detail — phải gom cả 7 document
  // vào MỘT mảng rồi mới so khoá thì mới thực sự canh được field này. Không
  // có bước gom mảng này, một `buildQuizDetail` viết lại kiểu `{ ...quiz }`
  // (bỏ qua chuẩn hoá) vẫn có thể làm mất khoá `domains` ở aws-ml-specialty
  // mà test vẫn xanh.
  it("buildQuizDetail(): cấp gốc của 7 document (kể cả `domains`) cùng một bộ khoá khi gộp lại", () => {
    const problems: string[] = [];
    const allDetails = getQuizSlugs().map((slug) => throughWire(buildQuizDetail(slug)));
    findInconsistentKeys(allDetails, "quizDetails", problems);
    expect(problems).toEqual([]);
  });
});

describe("roadmap/{slug}.json — không field nào thiếu khoá ngầm giữa các entry", () => {
  it("buildRoadmapDetail(): mọi phase/item/resourceLink/quiz-question cùng một bộ khoá, ở cả 5 roadmap", () => {
    const problems: string[] = [];
    for (const slug of getAllRoadmapSlugs()) {
      findInconsistentKeys(throughWire(buildRoadmapDetail(slug)), `roadmap(${slug})`, problems);
    }
    expect(problems).toEqual([]);
  });

  // Cùng lý do với quiz ở trên: `intro`, `why_now`, `faq`, `tracks` đều là
  // field CẤP GỐC của roadmap detail (optional, đã chuẩn hoá qua `orNull`) —
  // chỉ lộ ra khi gộp cả 5 document vào một mảng rồi so khoá.
  it("buildRoadmapDetail(): cấp gốc của 5 document (kể cả intro/why_now/faq/tracks) cùng một bộ khoá khi gộp lại", () => {
    const problems: string[] = [];
    const allDetails = getAllRoadmapSlugs().map((slug) => throughWire(buildRoadmapDetail(slug)));
    findInconsistentKeys(allDetails, "roadmapDetails", problems);
    expect(problems).toEqual([]);
  });
});

describe("dữ liệu nguồn khớp con số đã đo trong brief", () => {
  it("7 slug quiz", () => {
    expect(getQuizSlugs().sort()).toEqual(
      [
        "aws-ai-practitioner",
        "aws-ml-specialty",
        "cka",
        "ckad",
        "gcp-ml-engineer",
        "kcna",
        "nvidia-dli-generative-ai",
      ].sort()
    );
  });

  it("5 roadmap", () => {
    expect(getRoadmapList().length).toBe(5);
  });
});
