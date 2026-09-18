import { describe, expect, it } from "vitest";
import { buildIndex, buildManifest, buildSeriesTree, buildTaxonomy } from "@/lib/content-api";

describe("buildSeriesTree", () => {
  const tree = buildSeriesTree("vi");

  it("có series và mỗi series có chapter", () => {
    expect(tree.length).toBeGreaterThan(0);
    expect(tree[0].chapters.length).toBeGreaterThan(0);
  });

  it("mọi lesson slug trong cây đều có mặt trong index", () => {
    const indexSlugs = new Set(
      buildIndex("vi").filter((e) => e.type === "lesson").map((e) => e.slug)
    );
    const missing: string[] = [];
    for (const series of tree) {
      for (const chapter of series.chapters) {
        for (const lesson of chapter.lessons) {
          if (!indexSlugs.has(lesson.slug)) missing.push(lesson.slug);
        }
      }
    }
    expect(missing).toEqual([]);
  });

  // Cùng lỗi hợp đồng với `category` trong buildIndex (xem
  // tests/content-api-index.test.ts) nhưng đo ở series tree: `series.category`
  // là chuỗi thô truthy cho series "luyen-thi-ckad" (ja) và
  // "docker-tu-co-ban-den-nang-cao" (zh-tw) — `.slug`/`.name` trên chuỗi ra
  // `undefined`, JSON.stringify phát `{}` thay vì `null`. Đo ngày 2026-09-18
  // trên artifact thật: 1 series/locale bị (`luyen-thi-ckad` ở `ja`,
  // `docker-tu-co-ban-den-nang-cao` ở `zh-tw`).
  // Gom vấn đề của cả 4 locale vào một mảng rồi assert một lần (xem lý do
  // đầy đủ trong tests/content-api-index.test.ts): assert ngay trong vòng
  // lặp sẽ dừng ở locale hỏng đầu tiên, không bao giờ báo tên locale thứ hai
  // nếu cả `ja` lẫn `zh-tw` cùng hỏng.
  it("mọi category trong series tree đều là null hoặc đủ cả slug lẫn name, ở cả 4 locale", () => {
    const problems: string[] = [];
    for (const locale of ["vi", "en", "ja", "zh-tw"] as const) {
      const nodes = buildSeriesTree(locale);
      const bad = nodes.filter((node) => {
        if (node.category === null) return false;
        const { slug, name } = node.category as { slug?: unknown; name?: unknown };
        return (
          typeof slug !== "string" ||
          slug.length === 0 ||
          typeof name !== "string" ||
          name.length === 0
        );
      });
      if (bad.length > 0) {
        problems.push(
          `${locale}: ${bad.length}/${nodes.length} series có category hỏng, ví dụ: ` +
            bad
              .slice(0, 3)
              .map((n) => `${n.slug}:${JSON.stringify(n.category)}`)
              .join(" | ")
        );
      }
    }
    expect(problems).toEqual([]);
  });
});

describe("buildTaxonomy", () => {
  const taxonomy = buildTaxonomy("vi");

  it("có categories, tags, authors", () => {
    expect(taxonomy.categories.length).toBeGreaterThan(0);
    expect(taxonomy.tags.length).toBeGreaterThan(0);
    expect(taxonomy.authors.length).toBeGreaterThan(0);
  });

  it("chỉ chứa tag và category thực sự xuất hiện trong index của locale đó", () => {
    const entries = buildIndex("vi");
    const usedTags = new Set(entries.flatMap((e) => e.tags));
    const usedCategories = new Set(entries.map((e) => e.category?.slug).filter(Boolean));

    expect(taxonomy.tags.filter((t) => !usedTags.has(t.slug))).toEqual([]);
    expect(taxonomy.categories.filter((c) => !usedCategories.has(c.slug))).toEqual([]);
  });

  it("mọi avatar đều cùng một dạng đường dẫn", () => {
    const fromIndex = buildIndex("vi").map((entry) => entry.author?.avatar ?? null);
    const fromTaxonomy = buildTaxonomy("vi").authors.map((author) => author.avatar);

    for (const avatar of [...fromIndex, ...fromTaxonomy]) {
      if (avatar === null) continue;
      expect(avatar.startsWith("/")).toBe(true);
    }
  });

  // Cùng lỗi hợp đồng với avatar (xem `normalizeAssetPath` trong
  // content-api.ts) nhưng ở trường `featuredImage`: bài blog phát ra
  // "/images/blog/...", còn lesson (đọc từ `series.featured_image`) và series
  // node phát ra "images/blog/..." — không dấu `/` đầu. Kiểm cả ba nơi phát
  // sinh featuredImage (`buildPostEntries`, `buildLessonEntries`,
  // `buildSeriesTree`) trong cùng một assertion.
  //
  // Chạy trên cả 4 locale, không chỉ `vi`: đo ngày 2026-09-18, `vi` có 0
  // frontmatter thiếu `featured_image` (toàn `null` tường minh), trong khi
  // `ja`/`zh-tw` có field bị thiếu hẳn (giá trị thật là `undefined` dù type
  // khai `string | null`) — `undefined` khiến JSON.stringify XOÁ LUÔN key
  // `featuredImage` thay vì phát `null`. Nếu chỉ test `vi`, phần lỗi nghiêm
  // trọng hơn (key biến mất) không được assertion nào bắt được.
  it("mọi featuredImage đều cùng một dạng đường dẫn, ở cả 4 locale", () => {
    for (const locale of ["vi", "en", "ja", "zh-tw"] as const) {
      const fromIndex = buildIndex(locale).map((entry) => entry.featuredImage);
      const fromSeriesTree = buildSeriesTree(locale).map((node) => node.featuredImage);
      const all = [...fromIndex, ...fromSeriesTree];

      const bad = all.filter(
        (image): image is string =>
          image !== null && !image.startsWith("/") && !/^https?:\/\//.test(image)
      );
      if (bad.length > 0) {
        console.log(
          `[${locale}] featuredImage không có dấu "/" đầu: ${bad.length}/${all.length}, ví dụ: ${bad.slice(0, 5).join(", ")}`
        );
      }

      expect(bad.length).toBe(0);
    }
  });

  // Ruling 15: nối theo `id`, không theo `name` — `data/authors.json` lưu
  // "DUY TRAN", frontmatter lưu "Duy Tran", cùng một author thật. Nếu
  // `taxonomy.authors[]` không mang `id` thì app không có cách nào đối chiếu
  // nó với `index.json` author ngoài tên hiển thị, vốn không ổn định. Test
  // này khẳng định mọi `id` phát ra trong taxonomy đều thực sự xuất hiện
  // trong index của cùng locale — tức là join theo `id` thực hiện được.
  //
  // Chạy trên cả 4 locale: `entry.author` chỉ thực sự là `null` ở `ja`/`zh-tw`
  // (series "luyen-thi-ckad" không khai `author` trong frontmatter — 10 entry
  // mỗi locale). `vi`/`en` có 0 entry `author: null`, nên chỉ test `vi` sẽ
  // không bao giờ đi qua nhánh `.filter((id) => Boolean(id))` loại bỏ id
  // rỗng/null — đúng nhánh mà Minor 6 vừa sửa.
  it("mọi taxonomy.authors[].id đều xuất hiện trong index của cùng locale, ở cả 4 locale", () => {
    for (const locale of ["vi", "en", "ja", "zh-tw"] as const) {
      const entryAuthorIds = new Set(
        buildIndex(locale)
          .map((entry) => entry.author?.id)
          .filter((id): id is string => Boolean(id))
      );
      const missing = buildTaxonomy(locale).authors.filter(
        (author) => !entryAuthorIds.has(author.id)
      );
      expect(missing).toEqual([]);
    }
  });
});

describe("buildManifest", () => {
  const manifest = buildManifest();

  it("liệt kê đủ 4 locale", () => {
    expect(manifest.locales).toEqual(["vi", "en", "ja", "zh-tw"]);
  });

  it("counts khớp với buildIndex", () => {
    const viEntries = buildIndex("vi");
    expect(manifest.counts.vi.posts).toBe(viEntries.filter((e) => e.type === "blog").length);
    expect(manifest.counts.vi.lessons).toBe(viEntries.filter((e) => e.type === "lesson").length);
  });

  it("version là chuỗi khác rỗng", () => {
    expect(typeof manifest.version).toBe("string");
    expect(manifest.version.length).toBeGreaterThan(0);
  });

  it("generatedAt là ISO timestamp hợp lệ", () => {
    expect(Number.isNaN(Date.parse(manifest.generatedAt))).toBe(false);
  });
});
