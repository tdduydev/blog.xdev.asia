import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { buildIndex } from "@/lib/content-api";

describe("buildIndex", () => {
  const entries = buildIndex("vi");

  it("có cả bài blog lẫn lesson", () => {
    expect(entries.some((e) => e.type === "blog")).toBe(true);
    expect(entries.some((e) => e.type === "lesson")).toBe(true);
  });

  it("mọi path trỏ tới file có thật", () => {
    const missing = entries
      .map((e) => e.path)
      .filter((p) => !fs.existsSync(path.join(process.cwd(), p)));
    expect(missing).toEqual([]);
  });

  it("mọi path nằm trong content/ và kết thúc bằng .md", () => {
    const bad = entries.filter((e) => !e.path.startsWith("content/") || !e.path.endsWith(".md"));
    expect(bad).toEqual([]);
  });

  // Bug đã xảy ra thật (xem task-4-report.md): trước khi buildLessonEntries
  // tra path theo `id`, hai lesson "terminology-service" khác chương trong
  // series "hl7-fhir-r5-chuyen-sau" từng bị tra theo `slug` — map ghi đè, cả
  // hai entry nhận CÙNG một path (path của chương sau), một trong hai bị gán
  // sai file. Test "path có thật" ở trên vẫn xanh trong tình huống đó (file
  // đích vẫn tồn tại, chỉ sai file). Test uniqueness theo `id` cũng xanh (id
  // vẫn khác nhau, không liên quan gì tới việc path có đúng hay không).
  //
  // Assertion dưới đây không phụ thuộc join theo field nào — nó chỉ khẳng
  // định không có hai entry nào (bất kể type/id/slug) trỏ chung một file vật
  // lý. Đây là lưới an toàn sống sót qua việc Task 5 refactor lại module này.
  it("path là duy nhất trên toàn index — hai entry không được trỏ cùng một file", () => {
    const paths = entries.map((entry) => entry.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("url dùng canonical domain", () => {
    const bad = entries.filter((e) => !e.url.startsWith("https://blog.xdev.asia/"));
    expect(bad).toEqual([]);
  });

  // Đo ngày 2026-09-18 trên content/series (vi): lesson.slug KHÔNG đảm bảo duy
  // nhất toàn cục trong một locale. Vd "bai-12-capstone" xuất hiện ở cả series
  // "mlops-llmops" và "prompt-engineering-masterclass" (15 slug lesson bị
  // trùng kiểu này trên 1525 file lesson, do các series khác nhau đặt tên bài
  // học kiểu "bai-N-...". Điều này khớp bất biến sẵn có của codebase:
  // `getSeriesLessonSlugs` (src/lib/data.ts:686) tạo một `Set` MỚI cho từng
  // series — slug lesson vốn chỉ được xem là duy nhất trong phạm vi MỘT
  // series, chưa từng là duy nhất toàn cục. Bài blog thì khác: slug đã đo là
  // duy nhất toàn cục trong một locale (130 file, không trùng), nên dùng
  // nguyên `slug` làm khóa cho type "blog".
  //
  // Vì vậy khóa kiểm tra trùng lặp entry cho lesson dùng `id` (đo được: 0
  // trùng lặp trên 1525 file lesson) — đây là bất biến builder thực sự giữ
  // được, và là thứ phát hiện lỗi sinh trùng entry (hai entry cùng trỏ một
  // lesson) trong index. Ngoại lệ đã biết: series "hl7-fhir-r5-chuyen-sau" có
  // 2 lesson khác chương (chapter 10 và 12) cùng slug "terminology-service" —
  // 2 entry riêng biệt, `id`/`path` đúng và khác nhau, nhưng `url` bị trùng vì
  // dùng chung `series.slug + lesson.slug`. Đó là lỗi định tuyến ở tầng site
  // (một trong hai lesson không thể truy cập qua URL của nó), nằm ngoài phạm
  // vi Task 4 — xem báo cáo Task 4 để biết chi tiết.
  it("mỗi entry là duy nhất trong index (blog theo slug, lesson theo id)", () => {
    const seen = new Set<string>();
    const dupes: string[] = [];
    for (const e of entries) {
      const key = e.type === "lesson" ? `${e.type}:${e.id}` : `${e.type}:${e.slug}`;
      if (seen.has(key)) dupes.push(key);
      seen.add(key);
    }
    expect(dupes).toEqual([]);
  });

  it("lesson mang thông tin series, blog thì không", () => {
    const lesson = entries.find((e) => e.type === "lesson")!;
    expect(lesson.series).not.toBeNull();
    expect(typeof lesson.series!.slug).toBe("string");
    expect(typeof lesson.series!.order).toBe("number");

    const blog = entries.find((e) => e.type === "blog")!;
    expect(blog.series).toBeNull();
  });

  it("sinh được index cho cả 4 locale, đủ cả blog lẫn lesson", () => {
    for (const locale of ["vi", "en", "ja", "zh-tw"] as const) {
      const localeEntries = buildIndex(locale);
      expect(localeEntries.length).toBeGreaterThan(0);
      // Chỉ kiểm độ dài > 0 sẽ không bắt được trường hợp toàn bộ blog (hoặc
      // toàn bộ lesson) của một locale bị rơi im lặng trong khi loại còn lại
      // vẫn còn — đúng kiểu lỗi module này được dựng ra để tránh.
      expect(localeEntries.some((entry) => entry.type === "blog")).toBe(true);
      expect(localeEntries.some((entry) => entry.type === "lesson")).toBe(true);
    }
  });
});
