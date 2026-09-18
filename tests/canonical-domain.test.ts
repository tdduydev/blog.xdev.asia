import { execSync } from "node:child_process";
import { describe, expect, it } from "vitest";

// Ba file được miễn, có lý do: hai file đầu coi xdev.asia là legacy asset host
// và chuẩn hoá /storage/ về đường dẫn tương đối; file thứ ba là link homepage
// của showcase, không phải canonical của blog.
const ALLOWED = [
  "src/lib/content.ts",
  "src/components/ContentRenderer.tsx",
  "src/lib/showcase-data.ts",
];

describe("canonical domain", () => {
  it("SITE_URL trỏ blog.xdev.asia", async () => {
    const { SITE_URL } = await import("@/lib/seo");
    expect(SITE_URL).toBe("https://blog.xdev.asia");
  });

  it("settings.site_url trỏ blog.xdev.asia", async () => {
    const settings = (await import("../data/settings.json")).default;
    expect(settings.site_url).toBe("https://blog.xdev.asia");
  });

  it("không còn hardcode https://xdev.asia ngoài danh sách được miễn", () => {
    const out = execSync("grep -rl 'https://xdev\\.asia' src scripts data || true", {
      encoding: "utf-8",
    });
    const offenders = out
      .split("\n")
      .filter(Boolean)
      .filter((file) => !ALLOWED.includes(file))
      .sort();
    expect(offenders).toEqual([]);
  });

  it("không file nào trong src/app hardcode domain — phải import SITE_URL", () => {
    const out = execSync("grep -rl 'blog\\.xdev\\.asia' src/app || true", {
      encoding: "utf-8",
    });
    expect(out.split("\n").filter(Boolean).sort()).toEqual([]);
  });
});
