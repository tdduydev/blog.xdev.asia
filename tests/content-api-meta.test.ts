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
