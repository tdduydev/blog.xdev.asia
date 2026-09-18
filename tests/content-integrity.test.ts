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
  // Rỗng từ 2026-09-18: cặp trùng duy nhất đã được xử lý bằng cách đổi slug bài
  // chương 12 thành "terminology-service-mongodb". Giữ lại cơ chế để lần sau có
  // cặp trùng cần hoãn thì có chỗ khai báo, kèm lý do, thay vì tắt test.
  const KNOWN_DUPLICATES: string[] = [];

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

  it("danh sách miễn trừ rỗng — mọi cặp trùng đã biết đều đã được xử lý", () => {
    // Khi thêm một mục vào KNOWN_DUPLICATES, hãy đổi test này thành kiểm rằng
    // cặp đó thật sự còn tồn tại, để danh sách không mục ra khi content được sửa.
    expect(KNOWN_DUPLICATES).toEqual([]);
  });
});

describe("link chết sang xdev.asia", () => {
  // Đo ngày 2026-09-18 bằng curl: https://xdev.asia/ trả 404 cho MỌI đường dẫn,
  // kể cả trang chủ. Site phục vụ ở blog.xdev.asia. Nên mọi link trỏ sang
  // xdev.asia trong bài viết đều là link chết.
  //
  // NGOẠI LỆ DUY NHẤT: URI định danh FHIR. Trong FHIR, `system` của một
  // identifier và `url` của một SearchParameter là URI định danh namespace,
  // KHÔNG phải URL để truy cập. Đổi chúng là đổi ngữ nghĩa dữ liệu — hai
  // Patient.identifier khác `system` là hai định danh khác nhau. Chúng dùng
  // http:// cũng đúng quy ước FHIR, không phải nhầm lẫn.
  const FHIR_URI = /https?:\/\/xdev\.asia\/fhir\//;

  it("không còn link xdev.asia trong content, trừ URI định danh FHIR", () => {
    const offenders: string[] = [];

    for (const filePath of markdownFiles) {
      const source = fs.readFileSync(filePath, "utf-8");
      const matches = source.match(/https?:\/\/xdev\.asia[^\s)"'>,]*/g);
      if (!matches) continue;

      for (const match of matches) {
        if (FHIR_URI.test(match)) continue;
        offenders.push(`${path.relative(process.cwd(), filePath)} — ${match}`);
      }
    }

    expect(offenders).toEqual([]);
  });

  it("URI định danh FHIR vẫn còn nguyên — đừng ai 'dọn' chúng đi", () => {
    const fhirUris = markdownFiles.flatMap((filePath) => {
      const source = fs.readFileSync(filePath, "utf-8");
      return source.match(/https?:\/\/xdev\.asia\/fhir\/[^\s)"'>,]*/g) ?? [];
    });

    expect(fhirUris.length).toBe(16);
  });
});

describe("khối mermaid", () => {
  // Phát hiện ngày 2026-09-18 khi xem app trên simulator: sơ đồ mermaid không
  // hiện, và HTML thô phía trên nó bị nuốt vào cùng một khối.
  //
  // Nguyên nhân là CommonMark, không phải trình render: một khối HTML kéo dài
  // cho tới khi gặp DÒNG TRỐNG. Nội dung ở đây hay viết
  //
  //     <h3 id="...">Tiêu đề</h3>
  //     ```mermaid
  //
  // không có dòng trống ở giữa, nên fence bị hút vào khối HTML và không bao giờ
  // được nhận là code block. Hỏng trên CẢ website lẫn app — không phải lỗi riêng
  // của app.
  //
  // Đo lúc phát hiện: 120 fence đúng chuẩn, 28 fence thiếu dòng trống trong 10 file.
  it("mọi fence ```mermaid đều có dòng trống phía trước", () => {
    const offenders: string[] = [];

    for (const filePath of markdownFiles) {
      const lines = fs.readFileSync(filePath, "utf-8").split("\n");
      lines.forEach((line, index) => {
        if (!line.trim().startsWith("```mermaid")) return;
        if (index === 0) return;
        if (lines[index - 1]!.trim() === "") return;
        offenders.push(`${path.relative(process.cwd(), filePath)}:${index + 1}`);
      });
    }

    expect(offenders).toEqual([]);
  });
});
