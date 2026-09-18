import { describe, expect, it } from "vitest";
import { buildIndex, buildManifest, buildSeriesTree, buildTaxonomy } from "@/lib/content-api";
import type { Locale } from "@/lib/i18n/config";

const LOCALES: Locale[] = ["vi", "en", "ja", "zh-tw"];

/**
 * `docs/superpowers/specs/2026-09-18-xdev-mobile-content-api-reader-design.md`
 * §4.3: mọi field luôn CÓ MẶT trong object phát ra, mang `null` tường minh
 * khi không có giá trị — không bao giờ bị lược khỏi object. Contract đó chỉ
 * có nghĩa nếu có một test kiểm tra ĐÚNG bất biến "field luôn có mặt", tách
 * biệt khỏi test "field có đúng kiểu" (đã có ở content-api-index.test.ts và
 * content-api-meta.test.ts).
 *
 * Vì sao không thể dùng `"key" in obj` trên giá trị trả về trực tiếp từ
 * `buildIndex`/`buildSeriesTree`/...: một property được gán giá trị
 * `undefined` trong object literal (`{ publishedAt: post.published_at }` khi
 * `post.published_at === undefined`) VẪN có mặt trong object đó — `"publishedAt"
 * in obj` trả `true`. Chỉ `JSON.stringify` (thứ `Response.json()` ở mọi route
 * handler dùng để serialize) mới thật sự xoá property có giá trị `undefined`.
 * Test phải round-trip qua `JSON.parse(JSON.stringify(...))` giống hệt những
 * gì client thật nhận được — nếu không, test này xanh ngay cả khi bug (field
 * biến mất khỏi JSON thật) đang xảy ra, đúng kiểu lỗi đã lọt qua production.
 */
function throughWire<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function missingKeys(obj: object, keys: string[]): string[] {
  return keys.filter((key) => !(key in obj));
}

const INDEX_ENTRY_KEYS = [
  "id", "type", "locale", "slug", "title", "excerpt", "featuredImage",
  "readingTime", "publishedAt", "author", "tags", "category", "series",
  "path", "url",
];
const AUTHOR_REF_KEYS = ["id", "name", "avatar"];
const CATEGORY_REF_KEYS = ["slug", "name"];
const SERIES_REF_KEYS = ["slug", "chapter", "order"];

const SERIES_NODE_KEYS = [
  "slug", "title", "description", "featuredImage", "level", "lessonCount",
  "category", "url", "chapters",
];
const CHAPTER_KEYS = ["title", "order", "lessons"];
const LESSON_REF_KEYS = ["id", "slug", "title", "order"];

const TAXONOMY_KEYS = ["categories", "tags", "authors"];
const TAXONOMY_CATEGORY_KEYS = ["slug", "name"];
const TAXONOMY_TAG_KEYS = ["slug", "name"];
const TAXONOMY_AUTHOR_KEYS = ["id", "name", "avatar"];

const MANIFEST_KEYS = ["version", "generatedAt", "locales", "counts"];
const MANIFEST_COUNT_KEYS = ["posts", "lessons", "series"];

describe("mọi key khai trong type đều có mặt sau khi qua JSON.stringify (index.json)", () => {
  it("mỗi entry index.json giữ đủ mọi key ở cả 4 locale", () => {
    const problems: string[] = [];
    for (const locale of LOCALES) {
      const entries = throughWire(buildIndex(locale));
      const bad: string[] = [];
      for (const entry of entries as unknown as Record<string, unknown>[]) {
        const missing = missingKeys(entry, INDEX_ENTRY_KEYS);
        if (missing.length > 0) bad.push(`${entry.id}:[${missing.join(",")}]`);

        if (entry.author !== null) {
          const authorMissing = missingKeys(entry.author as object, AUTHOR_REF_KEYS);
          if (authorMissing.length > 0) bad.push(`${entry.id}.author:[${authorMissing.join(",")}]`);
        }
        if (entry.category !== null) {
          const categoryMissing = missingKeys(entry.category as object, CATEGORY_REF_KEYS);
          if (categoryMissing.length > 0) bad.push(`${entry.id}.category:[${categoryMissing.join(",")}]`);
        }
        if (entry.series !== null) {
          const seriesMissing = missingKeys(entry.series as object, SERIES_REF_KEYS);
          if (seriesMissing.length > 0) bad.push(`${entry.id}.series:[${seriesMissing.join(",")}]`);
        }
      }
      if (bad.length > 0) {
        problems.push(`${locale}: ${bad.length} vấn đề — ví dụ: ${bad.slice(0, 5).join(" | ")}`);
      }
    }
    expect(problems).toEqual([]);
  });
});

describe("mọi key khai trong type đều có mặt sau khi qua JSON.stringify (series.json)", () => {
  it("mỗi node/chapter/lesson trong series.json giữ đủ mọi key ở cả 4 locale", () => {
    const problems: string[] = [];
    for (const locale of LOCALES) {
      const nodes = throughWire(buildSeriesTree(locale));
      const bad: string[] = [];
      for (const node of nodes as unknown as Record<string, unknown>[]) {
        const missing = missingKeys(node, SERIES_NODE_KEYS);
        if (missing.length > 0) bad.push(`${node.slug}:[${missing.join(",")}]`);

        if (node.category !== null) {
          const categoryMissing = missingKeys(node.category as object, CATEGORY_REF_KEYS);
          if (categoryMissing.length > 0) bad.push(`${node.slug}.category:[${categoryMissing.join(",")}]`);
        }

        const chapters = (node.chapters as Record<string, unknown>[]) ?? [];
        for (const chapter of chapters) {
          const chapterMissing = missingKeys(chapter, CHAPTER_KEYS);
          if (chapterMissing.length > 0) bad.push(`${node.slug}>${chapter.title}:[${chapterMissing.join(",")}]`);

          const lessons = (chapter.lessons as Record<string, unknown>[]) ?? [];
          for (const lesson of lessons) {
            const lessonMissing = missingKeys(lesson, LESSON_REF_KEYS);
            if (lessonMissing.length > 0) bad.push(`${node.slug}>${chapter.title}>${lesson.slug}:[${lessonMissing.join(",")}]`);
          }
        }
      }
      if (bad.length > 0) {
        problems.push(`${locale}: ${bad.length} vấn đề — ví dụ: ${bad.slice(0, 5).join(" | ")}`);
      }
    }
    expect(problems).toEqual([]);
  });
});

describe("mọi key khai trong type đều có mặt sau khi qua JSON.stringify (taxonomy.json)", () => {
  it("mỗi category/tag/author trong taxonomy.json giữ đủ mọi key ở cả 4 locale", () => {
    const problems: string[] = [];
    for (const locale of LOCALES) {
      const taxonomy = throughWire(buildTaxonomy(locale));
      const bad: string[] = [];

      const topMissing = missingKeys(taxonomy as unknown as object, TAXONOMY_KEYS);
      if (topMissing.length > 0) bad.push(`taxonomy:[${topMissing.join(",")}]`);

      for (const category of taxonomy.categories as Record<string, unknown>[]) {
        const missing = missingKeys(category, TAXONOMY_CATEGORY_KEYS);
        if (missing.length > 0) bad.push(`category ${category.slug}:[${missing.join(",")}]`);
      }
      for (const tag of taxonomy.tags as Record<string, unknown>[]) {
        const missing = missingKeys(tag, TAXONOMY_TAG_KEYS);
        if (missing.length > 0) bad.push(`tag ${tag.slug}:[${missing.join(",")}]`);
      }
      for (const author of taxonomy.authors as Record<string, unknown>[]) {
        const missing = missingKeys(author, TAXONOMY_AUTHOR_KEYS);
        if (missing.length > 0) bad.push(`author ${author.id}:[${missing.join(",")}]`);
      }

      if (bad.length > 0) {
        problems.push(`${locale}: ${bad.length} vấn đề — ví dụ: ${bad.slice(0, 5).join(" | ")}`);
      }
    }
    expect(problems).toEqual([]);
  });
});

describe("mọi key khai trong type đều có mặt sau khi qua JSON.stringify (manifest.json)", () => {
  it("manifest.json giữ đủ mọi key, kể cả counts theo từng locale", () => {
    const manifest = throughWire(buildManifest());
    const problems: string[] = [];

    const topMissing = missingKeys(manifest as unknown as object, MANIFEST_KEYS);
    if (topMissing.length > 0) problems.push(`manifest:[${topMissing.join(",")}]`);

    for (const locale of LOCALES) {
      const counts = (manifest.counts as Record<string, unknown>)[locale];
      if (!counts) {
        problems.push(`counts.${locale}: hoàn toàn vắng mặt`);
        continue;
      }
      const missing = missingKeys(counts as object, MANIFEST_COUNT_KEYS);
      if (missing.length > 0) problems.push(`counts.${locale}:[${missing.join(",")}]`);
    }

    expect(problems).toEqual([]);
  });
});
