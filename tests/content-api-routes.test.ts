import { describe, expect, it } from "vitest";
import { GET as manifestGet } from "@/app/api/v1/manifest.json/route";
import { GET as indexGet } from "@/app/api/v1/[locale]/index.json/route";
import { generateStaticParams } from "@/app/api/v1/[locale]/index.json/route";

describe("content API routes", () => {
  it("manifest route trả JSON hợp lệ", async () => {
    const response = manifestGet();
    const body = await response.json();
    expect(body.locales).toEqual(["vi", "en", "ja", "zh-tw"]);
  });

  it("index route trả mảng entry cho locale được truyền", async () => {
    const response = await indexGet(new Request("http://localhost/api/v1/vi/index.json"), {
      params: Promise.resolve({ locale: "vi" }),
    });
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0].locale).toBe("vi");
  });

  it("generateStaticParams liệt kê đủ 4 locale", async () => {
    expect(await generateStaticParams()).toEqual([
      { locale: "vi" },
      { locale: "en" },
      { locale: "ja" },
      { locale: "zh-tw" },
    ]);
  });
});
