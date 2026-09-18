import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { getMdxFilePath, getMdxFilePathByRelativePath } from "@/lib/content";
import { localizedCollection } from "@/lib/data";

describe("content file paths", () => {
  it("trả đường dẫn tuyệt đối tới file có thật của một bài series", () => {
    const filePath = getMdxFilePath("series", "ai-trong-y-te-healthcare");
    expect(filePath).toBeTruthy();
    expect(fs.existsSync(filePath!)).toBe(true);
    expect(filePath!.endsWith(".md")).toBe(true);
  });

  it("trả null với slug không tồn tại trong series", () => {
    expect(getMdxFilePath("series", "khong-ton-tai-dau")).toBeNull();
  });

  it("localizedCollection thêm prefix cho locale khác vi", () => {
    expect(localizedCollection("blog", "vi")).toBe("blog");
    expect(localizedCollection("blog", "en")).toBe("en/blog");
  });

  it("getMdxFilePathByRelativePath hoạt động trên collection series", () => {
    const collection = localizedCollection("series/architecture/hl7-fhir-r5-chuyen-sau", "vi");
    const filePath = getMdxFilePathByRelativePath(collection, "index");
    expect(filePath).toBeTruthy();
    expect(fs.existsSync(filePath!)).toBe(true);
  });
});
