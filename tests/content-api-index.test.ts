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

describe("url trong buildIndex", () => {
  // `url` không đảm bảo duy nhất toàn cục, khác với `id`/`path`. Đo ngày
  // 2026-09-18: đúng một cặp trùng trong `vi` — 2 lesson "terminology-service"
  // khác chương trong series "hl7-fhir-r5-chuyen-sau" (xem comment trong
  // `buildLessonEntries`, content-api.ts) dùng chung `series.slug + lesson.slug`
  // để dựng url, nên phát ra CÙNG một url dù `id` và `path` đúng và khác nhau.
  // Đây là lỗi định tuyến ở tầng site (một trong hai lesson không truy cập
  // được qua URL của nó) — theo README của Task 4, việc đổi slug để sửa thuộc
  // về chủ sở hữu vì nó phá URL đang sống, nên KHÔNG tự sửa ở đây.
  //
  // Mẫu miễn trừ giống hệt `KNOWN_DUPLICATES` trong
  // tests/content-integrity.test.ts:74-107: liệt kê cặp trùng đã biết để test
  // vẫn chặn được cặp trùng MỚI, thay vì tắt hẳn assertion.
  // Rỗng từ 2026-09-18: xem tests/content-integrity.test.ts, cặp url trùng duy
  // nhất đã hết sau khi đổi slug bài chương 12.
  const KNOWN_DUPLICATE_URLS: string[] = [];

  it("không có cặp url trùng MỚI trong index của mỗi locale", () => {
    for (const locale of ["vi", "en", "ja", "zh-tw"] as const) {
      const entries = buildIndex(locale);
      const idsByUrl = new Map<string, string[]>();
      for (const entry of entries) {
        if (!idsByUrl.has(entry.url)) idsByUrl.set(entry.url, []);
        idsByUrl.get(entry.url)!.push(entry.id);
      }

      const duplicates = [...idsByUrl.entries()]
        .filter(([url, ids]) => ids.length > 1 && !KNOWN_DUPLICATE_URLS.includes(url))
        .map(([url, ids]) => `${locale}: ${url} — id ${ids.join(", ")}`);

      expect(duplicates).toEqual([]);
    }
  });

  it("danh sách miễn trừ url rỗng — mọi cặp trùng đã biết đều đã được xử lý", () => {
    expect(KNOWN_DUPLICATE_URLS).toEqual([]);
  });
});

describe("tags và category trong buildIndex", () => {
  // Đo ngày 2026-09-18 trên artifact build thật (out/api/v1/): `tags` khai
  // kiểu `string[]` nhưng phát ra phần tử `null` — 10 entry `ja` + 30 entry
  // `zh-tw`, toàn bộ là lesson của series "luyen-thi-ckad" (ja, zh-tw) và
  // "docker-tu-co-ban-den-nang-cao" (zh-tw). Nguyên nhân: `getSeries()` (dùng
  // bởi `buildLessonEntries`) trả `tags` y nguyên frontmatter — một mảng
  // chuỗi thô ("kubernetes", "ckad", ...) — thay vì đi qua `normalizeTags()`
  // như `getAllPosts()` đã làm cho blog. `(tag) => tag.slug` trên một chuỗi
  // ra `undefined`, và `JSON.stringify` biến mỗi phần tử `undefined` trong
  // mảng thành `null`. `z.array(z.string())` phía app từ chối thẳng `[null]`.
  // Gom vấn đề của cả 4 locale vào MỘT mảng rồi assert một lần ở cuối — thay
  // vì assert ngay trong vòng lặp. Nếu assert ngay trong lặp, `expect` ném
  // lỗi ở locale hỏng ĐẦU TIÊN và vòng lặp dừng luôn, nên nếu có từ 2 locale
  // hỏng trở lên (đúng tình huống thật: `ja` VÀ `zh-tw`), locale thứ hai
  // không bao giờ được kiểm và không bao giờ xuất hiện trong assertion diff.
  // Gom trước rồi assert một lần đảm bảo message lỗi luôn nêu tên MỌI locale
  // đang hỏng kèm số đếm, không chỉ locale đầu tiên.
  it("mọi phần tử tags đều là chuỗi khác rỗng, ở cả 4 locale", () => {
    const problems: string[] = [];
    for (const locale of ["vi", "en", "ja", "zh-tw"] as const) {
      const entries = buildIndex(locale);
      const bad = entries.filter(
        (entry) => !entry.tags.every((tag) => typeof tag === "string" && tag.length > 0)
      );
      if (bad.length > 0) {
        problems.push(
          `${locale}: ${bad.length}/${entries.length} entry có tags hỏng, ví dụ: ` +
            bad
              .slice(0, 3)
              .map((e) => `${e.id}:${JSON.stringify(e.tags)}`)
              .join(" | ")
        );
      }
    }
    expect(problems).toEqual([]);
  });

  // Cùng nguyên nhân với tags ở trên nhưng cho `category`: `series.category`
  // trong frontmatter là một chuỗi thô truthy (vd "luyen-thi"), không phải
  // đối tượng `{slug, name}`. Nhánh `series.category ? {...} : null` cũ vẫn
  // rẽ vào nhánh truthy vì chuỗi khác rỗng là truthy, nhưng `category.slug`/
  // `.name` trên một chuỗi đều ra `undefined` — `JSON.stringify` bỏ hẳn
  // property có giá trị `undefined`, nên object phát ra là `{}` thay vì
  // `null`. `z.object({slug, name})` phía app từ chối `{}` vì thiếu field
  // bắt buộc.
  // Cùng lý do gom-rồi-assert-một-lần như test tags ở trên — tình huống thật
  // có cả `ja` lẫn `zh-tw` cùng hỏng category, và assert-trong-lặp sẽ chỉ báo
  // tên locale đầu tiên.
  it("mọi category đều là null hoặc đủ cả slug lẫn name, ở cả 4 locale", () => {
    const problems: string[] = [];
    for (const locale of ["vi", "en", "ja", "zh-tw"] as const) {
      const entries = buildIndex(locale);
      const bad = entries.filter((entry) => {
        if (entry.category === null) return false;
        const { slug, name } = entry.category as { slug?: unknown; name?: unknown };
        return (
          typeof slug !== "string" ||
          slug.length === 0 ||
          typeof name !== "string" ||
          name.length === 0
        );
      });
      if (bad.length > 0) {
        problems.push(
          `${locale}: ${bad.length}/${entries.length} entry có category hỏng, ví dụ: ` +
            bad
              .slice(0, 3)
              .map((e) => `${e.id}:${JSON.stringify(e.category)}`)
              .join(" | ")
        );
      }
    }
    expect(problems).toEqual([]);
  });
});
