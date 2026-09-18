import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { getMdxFilePath, getMdxFilePathByRelativePath, listMdxRelativePaths, listMdxSlugs } from "@/lib/content";
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
    // Nên cả slugToFilePath và slugToRelativePath của collection "blog" luôn rỗng.
    // Để lấy đường dẫn bài blog, phải dùng getMdxFilePathByRelativePath + tra slug trong frontmatter.

    // Khẳng định 1: listMdxSlugs("blog") rỗng
    expect(listMdxSlugs("blog")).toEqual([]);

    // Khẳng định 2: getMdxFilePath("blog", slug) trả null cho mọi slug
    const filePath = getMdxFilePath("blog", "ai-trong-y-te-healthcare");
    expect(filePath).toBeNull();

    // Khẳng định 3: Nhưng file thực sự tồn tại trên đĩa
    expect(fs.existsSync("content/blog/ai/ai-trong-y-te-healthcare.md")).toBe(true);
  });

  it("trả null với slug không tồn tại trên collection có slug map", () => {
    // Collection này có slug map thật sự có dữ liệu (files kết thúc /index)
    const collection = localizedCollection("series/architecture/hl7-fhir-r5-chuyen-sau", "vi");

    // Khẳng định 1: Slug map có dữ liệu (phân biệt với trường hợp map rỗng của blog)
    expect(listMdxSlugs(collection).length).toBeGreaterThan(0);

    // Khẳng định 2: Slug không tồn tại trả null
    expect(getMdxFilePath(collection, "khong-ton-tai-dau")).toBeNull();
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
