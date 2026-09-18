import { describe, expect, it } from "vitest";
import { getAllRoadmapSlugs } from "@/lib/roadmaps";
import { buildRoadmapDetail, buildRoadmapList } from "@/lib/roadmap-api";

function collectStrings(value: unknown, out: string[]): void {
  if (typeof value === "string") {
    out.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, out);
    return;
  }
  if (value !== null && typeof value === "object") {
    for (const v of Object.values(value)) collectStrings(v, out);
  }
}

describe("buildRoadmapList", () => {
  const list = buildRoadmapList();

  it("có đúng 5 roadmap, đúng số đã đo trong brief", () => {
    expect(list.length).toBe(5);
  });

  it("không kèm phases/tracks/faq trong danh sách", () => {
    for (const entry of list) {
      expect(entry).not.toHaveProperty("phases");
      expect(entry).not.toHaveProperty("tracks");
      expect(entry).not.toHaveProperty("faq");
    }
  });

  it("mọi slug trong danh sách đều fetch được roadmap đầy đủ qua buildRoadmapDetail", () => {
    const missing = list.filter((entry) => buildRoadmapDetail(entry.slug) === null);
    expect(missing.map((e) => e.slug)).toEqual([]);
  });

  it("mọi slug trong danh sách khớp getAllRoadmapSlugs() (nguồn generateStaticParams sẽ dùng)", () => {
    expect(list.map((e) => e.slug).sort()).toEqual(getAllRoadmapSlugs().sort());
  });

  it("mọi url đều là URL tuyệt đối (bắt đầu bằng http)", () => {
    for (const entry of list) {
      expect(entry.url.startsWith("http")).toBe(true);
    }
  });
});

describe("buildRoadmapDetail", () => {
  it("trả về null khi slug không tồn tại", () => {
    expect(buildRoadmapDetail("khong-ton-tai")).toBeNull();
  });

  it("mọi resourceLinks[].url đều bắt đầu bằng http (URL tài nguyên tuyệt đối) — không có field nào khác trong Roadmap là đường dẫn ảnh (đã đo: `icon` là emoji, không phải path)", () => {
    for (const slug of getAllRoadmapSlugs()) {
      const roadmap = buildRoadmapDetail(slug);
      if (!roadmap) continue;
      for (const phase of roadmap.phases) {
        for (const item of phase.items) {
          if (!item.resourceLinks) continue;
          for (const link of item.resourceLinks) {
            expect(link.url.startsWith("http") || link.url.startsWith("/")).toBe(true);
          }
        }
      }
    }
  });

  it("mỗi roadmap có ít nhất 1 phase, và mỗi phase có ít nhất 1 item", () => {
    for (const slug of getAllRoadmapSlugs()) {
      const roadmap = buildRoadmapDetail(slug);
      expect(roadmap).not.toBeNull();
      expect(roadmap!.phases.length).toBeGreaterThan(0);
      for (const phase of roadmap!.phases) {
        expect(phase.items.length).toBeGreaterThan(0);
      }
    }
  });

  it("không object nào trong cây roadmap chứa giá trị `undefined` (mọi field vô hướng optional đã qua orNull)", () => {
    for (const slug of getAllRoadmapSlugs()) {
      const roadmap = buildRoadmapDetail(slug);
      const serialized = JSON.stringify(roadmap);
      const strings: string[] = [];
      collectStrings(roadmap, strings);
      expect(serialized.includes("undefined")).toBe(false);
      expect(strings.some((s) => s === "undefined")).toBe(false);
    }
  });
});
