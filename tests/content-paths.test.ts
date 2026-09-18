import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { getMdxFilePath, getMdxFilePathByRelativePath, listMdxRelativePaths } from "@/lib/content";
import { localizedCollection } from "@/lib/data";

describe("content file paths", () => {
  it("getMdxFilePath resolve được trên collection có file /index", () => {
    // Series files end with /index và được buildSlugMap đăng ký
    const filePath = getMdxFilePath("series", "ai-trong-y-te-healthcare");
    expect(filePath).toBeTruthy();
    expect(fs.existsSync(filePath!)).toBe(true);
    expect(filePath!.endsWith(".md")).toBe(true);
  });

  it("getMdxFilePath trả null cho blog dù file có thật — contract của buildSlugMap", () => {
    // Blog posts nằm ở content/blog/<category>/<slug>.md
    // Đây là file lồng nhau (có /) nhưng không kết thúc /index
    // buildSlugMap (src/lib/content.ts:77) chỉ đăng ký:
    //   - File phẳng (không có /)
    //   - File kết thúc /index
    // Nên slugToFilePath của collection "blog" luôn rỗng.
    // Để lấy đường dẫn bài blog, phải dùng getMdxFilePathByRelativePath + tra slug trong frontmatter.

    const filePath = getMdxFilePath("blog", "ai-trong-y-te-healthcare");
    expect(filePath).toBeNull();

    // Nhưng file thực sự tồn tại:
    expect(fs.existsSync("content/blog/ai/ai-trong-y-te-healthcare.md")).toBe(true);
  });

  it("localizedCollection thêm prefix cho locale khác vi", () => {
    expect(localizedCollection("blog", "vi")).toBe("blog");
    expect(localizedCollection("blog", "en")).toBe("en/blog");
  });

  it("getMdxFilePathByRelativePath hoạt động trên collection blog", () => {
    // Đây là đường thực tế mà Task 4 sẽ dùng để lấy path của bài blog
    const collection = localizedCollection("blog", "vi");
    const relativePaths = listMdxRelativePaths(collection);

    // Lấy một relative path thật từ collection
    expect(relativePaths.length).toBeGreaterThan(0);
    const testPath = relativePaths.find((p) => p.includes("ai-trong-y-te-healthcare"));
    expect(testPath).toBeTruthy();

    const filePath = getMdxFilePathByRelativePath(collection, testPath!);
    expect(filePath).toBeTruthy();
    expect(fs.existsSync(filePath!)).toBe(true);
    expect(filePath!.endsWith(".md")).toBe(true);
  });
});
