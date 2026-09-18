import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function listMarkdownFiles(dir: string): string[] {
  const files: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...listMarkdownFiles(fullPath));
    else if (entry.name.endsWith(".md")) files.push(fullPath);
  }

  return files;
}

const markdownFiles = listMarkdownFiles(CONTENT_ROOT);

describe("content integrity", () => {
  it("tìm thấy toàn bộ file markdown", () => {
    // Chốt số lượng ở mức thấp để test không vỡ mỗi lần viết bài mới, nhưng vẫn
    // đỏ nếu thư mục content bị trỏ sai và file biến mất hàng loạt.
    expect(markdownFiles.length).toBeGreaterThan(6000);
  });

  // Đây là test quan trọng nhất file này.
  //
  // Ngày 2026-09-18, file
  // content/series/lap-trinh/django-tu-co-ban-den-nang-cao/chapters/04-phan-4-advanced-features/lessons/13-bai-13-django-admin-customization.md
  // bắt đầu bằng `ba---` thay vì `---`. Thừa đúng hai ký tự. gray-matter không
  // nhận ra frontmatter, nên toàn bộ file bị coi là body không metadata và bài
  // đó biến mất khỏi index lẫn khỏi site — không lỗi build, không cảnh báo.
  // Đếm được 1524 file vào index so với 1525 file trên đĩa.
  //
  // Một file hỏng kiểu này im lặng hoàn toàn. Test này là thứ duy nhất phát ra
  // tiếng.
  it("mọi file markdown đều parse ra frontmatter khác rỗng", () => {
    const broken: string[] = [];

    for (const filePath of markdownFiles) {
      let data: Record<string, unknown>;

      try {
        data = matter(fs.readFileSync(filePath, "utf-8")).data;
      } catch (error) {
        broken.push(`${path.relative(process.cwd(), filePath)} — gray-matter lỗi: ${String(error)}`);
        continue;
      }

      if (!data || Object.keys(data).length === 0) {
        broken.push(`${path.relative(process.cwd(), filePath)} — frontmatter rỗng`);
      }
    }

    expect(broken).toEqual([]);
  });
});

describe("slug lesson trong cùng một series", () => {
  // URL bài học có dạng /lessons/<series-slug>/<lesson-slug>/ nên hai lesson
  // cùng series mà trùng slug thì chỉ một bài có URL truy cập được.
  //
  // Trùng slug giữa CÁC series khác nhau thì không sao — đường dẫn đã có tên
  // series phân biệt. Đo ngày 2026-09-18: có khoảng 15 trường hợp như vậy và
  // chúng hợp lệ.
  const LESSON_PATH = /^content\/(?:(en|ja|zh-tw)\/)?series\/([^/]+)\/([^/]+)\/chapters\/.*\/lessons\//;

  // Cặp trùng đã biết, chưa sửa vì đổi slug là phá URL cũ và cần quyết định về
  // redirect/SEO. Liệt kê ở đây để test vẫn chặn được cặp trùng MỚI thay vì bị
  // tắt hẳn. Xoá khỏi danh sách này khi cặp đó được xử lý.
  const KNOWN_DUPLICATES = ["vi|architecture/hl7-fhir-r5-chuyen-sau|terminology-service"];

  it("không có cặp trùng slug mới trong cùng một series", () => {
    const seen = new Map<string, string[]>();

    for (const filePath of markdownFiles) {
      const relativePath = path.relative(process.cwd(), filePath).split(path.sep).join("/");
      const match = relativePath.match(LESSON_PATH);
      if (!match) continue;

      const slug = matter(fs.readFileSync(filePath, "utf-8")).data?.slug;
      if (!slug) continue;

      const key = `${match[1] ?? "vi"}|${match[2]}/${match[3]}|${slug}`;
      if (!seen.has(key)) seen.set(key, []);
      seen.get(key)!.push(relativePath);
    }

    const duplicates = [...seen.entries()]
      .filter(([key, files]) => files.length > 1 && !KNOWN_DUPLICATES.includes(key))
      .map(([key, files]) => `${key}\n    ${files.join("\n    ")}`);

    expect(duplicates).toEqual([]);
  });

  it("cặp trùng đã biết vẫn còn đó — xoá khỏi KNOWN_DUPLICATES khi sửa xong", () => {
    // Giữ danh sách miễn trừ khỏi bị bỏ quên: khi cặp này được sửa, test đỏ và
    // nhắc người sửa dọn luôn danh sách.
    const [locale, series, slug] = KNOWN_DUPLICATES[0].split("|");
    const prefix = locale === "vi" ? "content/series/" : `content/${locale}/series/`;
    const matches = markdownFiles.filter((filePath) => {
      const relativePath = path.relative(process.cwd(), filePath).split(path.sep).join("/");
      if (!relativePath.startsWith(`${prefix}${series}/`)) return false;
      return matter(fs.readFileSync(filePath, "utf-8")).data?.slug === slug;
    });

    expect(matches.length).toBe(2);
  });
});
