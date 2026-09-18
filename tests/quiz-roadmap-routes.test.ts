import { describe, expect, it } from "vitest";
import { getQuizSlugs } from "@/lib/data";
import { getAllRoadmapSlugs } from "@/lib/roadmaps";
import { GET as manifestGet } from "@/app/api/v1/manifest.json/route";
import { GET as quizzesGet } from "@/app/api/v1/quizzes.json/route";
import {
  GET as quizGet,
  generateStaticParams as quizStaticParams,
} from "@/app/api/v1/quiz/[slug]/route";
import { GET as roadmapsGet } from "@/app/api/v1/roadmaps.json/route";
import {
  GET as roadmapGet,
  generateStaticParams as roadmapStaticParams,
} from "@/app/api/v1/roadmap/[slug]/route";

describe("quizzes.json route", () => {
  it("trả mảng 7 đề, không kèm questions", async () => {
    const body = await quizzesGet().json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(7);
    for (const entry of body) expect(entry.questions).toBeUndefined();
  });
});

describe("quiz/[slug]/route.ts — URL thật là quiz/{slug}.json", () => {
  it("generateStaticParams trả slug kèm hậu tố .json, khớp getQuizSlugs() sau khi bóc hậu tố", () => {
    const params = quizStaticParams();
    // Xem comment trong route.ts: thư mục phải để thuần `[slug]` (App Router
    // không nhận diện `[slug].json` là dynamic segment — đã đo bằng build
    // thật), nên hậu tố `.json` nằm trong GIÁ TRỊ param, không phải tên thư
    // mục. `/api/v1/quiz/cka.json` vẫn đúng vì Next nội suy thẳng chuỗi này
    // vào URL.
    expect(params.every((p) => p.slug.endsWith(".json"))).toBe(true);
    expect(params.map((p) => p.slug.replace(/\.json$/, "")).sort()).toEqual(
      getQuizSlugs().sort()
    );
  });

  it("trả đề đầy đủ kèm questions cho slug hợp lệ (param mang cả .json, như request thật)", async () => {
    const response = await quizGet(new Request("http://localhost/api/v1/quiz/cka.json"), {
      params: Promise.resolve({ slug: "cka.json" }),
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.slug).toBe("cka");
    expect(Array.isArray(body.questions)).toBe(true);
    expect(body.questions.length).toBeGreaterThan(0);
  });

  it("trả 404 cho slug không tồn tại", async () => {
    const response = await quizGet(new Request("http://localhost/api/v1/quiz/khong-co.json"), {
      params: Promise.resolve({ slug: "khong-co.json" }),
    });
    expect(response.status).toBe(404);
  });
});

describe("roadmaps.json route", () => {
  it("trả mảng 5 roadmap, không kèm phases", async () => {
    const body = await roadmapsGet().json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(5);
    for (const entry of body) expect(entry.phases).toBeUndefined();
  });
});

describe("roadmap/[slug]/route.ts — URL thật là roadmap/{slug}.json", () => {
  it("generateStaticParams trả slug kèm hậu tố .json, khớp getAllRoadmapSlugs() sau khi bóc hậu tố", () => {
    const params = roadmapStaticParams();
    expect(params.every((p) => p.slug.endsWith(".json"))).toBe(true);
    expect(params.map((p) => p.slug.replace(/\.json$/, "")).sort()).toEqual(
      getAllRoadmapSlugs().sort()
    );
  });

  it("trả roadmap đầy đủ kèm phases cho slug hợp lệ (param mang cả .json, như request thật)", async () => {
    const response = await roadmapGet(new Request("http://localhost/api/v1/roadmap/ba.json"), {
      params: Promise.resolve({ slug: "ba.json" }),
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.slug).toBe("ba");
    expect(Array.isArray(body.phases)).toBe(true);
    expect(body.phases.length).toBeGreaterThan(0);
  });

  it("trả 404 cho slug không tồn tại", async () => {
    const response = await roadmapGet(
      new Request("http://localhost/api/v1/roadmap/khong-co.json"),
      { params: Promise.resolve({ slug: "khong-co.json" }) }
    );
    expect(response.status).toBe(404);
  });
});

describe("manifest.json route — bổ sung Task 11", () => {
  it("thêm quizzes/roadmaps ở cấp gốc, không đụng vào counts theo locale", async () => {
    const body = await manifestGet().json();
    expect(body.quizzes).toBe(7);
    expect(body.roadmaps).toBe(5);
    // `counts` vẫn giữ nguyên hình dạng theo locale đã có trước Task 11.
    expect(Object.keys(body.counts).sort()).toEqual(["en", "ja", "vi", "zh-tw"]);
    for (const locale of Object.keys(body.counts)) {
      expect(Object.keys(body.counts[locale]).sort()).toEqual(["lessons", "posts", "series"]);
    }
  });
});
