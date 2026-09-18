# Content API (blog side) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cho `blog.xdev.asia` phục vụ một Content API tĩnh (JSON + markdown thô) để app React Native đọc được toàn bộ nội dung blog trên 4 locale.

**Architecture:** Metadata đi qua 13 route handler sinh tĩnh lúc `next build`, tái dùng trực tiếp `src/lib/data.ts`. Nội dung markdown không render lại — một script copy `content/**/*.md` vào `public/api/v1/content/`, và `output: "export"` copy `public/` nguyên si sang `out/`. Trước đó phải chuẩn hoá canonical domain, vì field `url` trong API sinh từ `SITE_URL`.

**Tech Stack:** Next.js 16.2.1 (App Router, `output: "export"`), TypeScript 5, Vitest, Node 20.

**Spec:** `docs/superpowers/specs/2026-09-18-xdev-mobile-content-api-reader-design.md` (commit 0282c58d)

## Global Constraints

- Mọi dependency mới cài bằng `@latest`. Sau khi cài, ghi version thực tế vào commit message. Không ghim version theo trí nhớ.
- Next 16.2.1: trong route handler, `params` là **Promise** — luôn `await params`. Dùng `RouteContext<'/path/[param]'>` để type.
- Dưới `output: "export"`, route handler **chỉ hỗ trợ `GET`** và phải trả response tĩnh. Không đọc gì từ request.
- Canonical domain: `https://blog.xdev.asia`.
- `public/api/` là thư mục sinh ra — không commit.
- Locale hợp lệ: `vi`, `en`, `ja`, `zh-tw` (`src/lib/i18n/config.ts`). `vi` là `DEFAULT_LOCALE` và không có prefix đường dẫn.
- Chạy `npm run check:full` (lint + typecheck + build) trước mỗi commit đụng vào `src/`.
- `AGENTS.md` bắt buộc: Next 16.2.1 khác với kiến thức sẵn có. Trước khi viết bất kỳ file nào trong `src/app/`, đọc `node_modules/next/dist/docs/01-app/` — cụ thể `02-guides/static-exports.md` và `03-api-reference/03-file-conventions/route.md`. Hai ràng buộc ở trên (`GET` only, `params` là Promise) rút ra từ chính hai file đó.

---

### Task 1: Chuẩn hoá canonical domain + dựng Vitest

**Files:**
- Create: `vitest.config.ts`
- Create: `tests/canonical-domain.test.ts`
- Modify: `package.json` (devDependency + script `test`)
- Modify: `src/lib/seo.ts:7`
- Modify: `data/settings.json:7,9`
- Modify: `src/app/robots.ts:12-13`
- Modify: `src/app/llms.txt/route.ts:15`
- Modify: `src/app/feed.xml/route.ts:17`
- Modify: `src/app/llms-full.txt/route.ts:34`
- Modify: `scripts/preflight-checklist.mjs:10`
- Modify: `src/components/GlobalChatbot.tsx:71,81`
- Modify: `src/lib/content.ts:12`

**Interfaces:**
- Consumes: —
- Produces: `SITE_URL === "https://blog.xdev.asia"` từ `@/lib/seo`; script `npm test` chạy Vitest.

- [ ] **Step 1: Cài Vitest bản mới nhất**

```bash
npm install -D vitest@latest
npm ls vitest
```

Ghi lại version mà `npm ls` in ra — nó vào commit message ở Step 8.

- [ ] **Step 2: Tạo cấu hình Vitest**

`vitest.config.ts`:

```ts
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
```

Thêm script vào `package.json`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Viết test thất bại**

`tests/canonical-domain.test.ts`:

```ts
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
});
```

- [ ] **Step 4: Chạy test để xác nhận nó fail**

Run: `npm test`
Expected: FAIL cả 3 test — `SITE_URL` còn là `https://xdev.asia`, và `offenders` còn khoảng 8 file.

- [ ] **Step 5: Đổi domain ở các file nguồn**

Đổi `https://xdev.asia` → `https://blog.xdev.asia` tại:

- `src/lib/seo.ts:7` — `export const SITE_URL = "https://blog.xdev.asia";`
- `data/settings.json` — `site_url` và `profile_url`
- `src/app/robots.ts:12-13` — hai URL sitemap
- `src/app/llms.txt/route.ts:15`, `src/app/feed.xml/route.ts:17`, `src/app/llms-full.txt/route.ts:34` — chuỗi fallback
- `scripts/preflight-checklist.mjs:10`
- `src/components/GlobalChatbot.tsx:71,81` — text trong prompt

- [ ] **Step 6: Thêm blog.xdev.asia vào danh sách legacy asset host**

`src/lib/content.ts:12` — **giữ** `xdev.asia` (giờ nó đúng là legacy) và thêm domain mới, để link asset viết theo domain nào cũng được chuẩn hoá:

```ts
const legacyContentHosts = [
  "https://x-lms.test",
  "http://x-lms.test",
  "https://xdev.asia",
  "http://xdev.asia",
  "https://blog.xdev.asia",
  "http://blog.xdev.asia",
];
```

Làm tương tự trong `src/components/ContentRenderer.tsx`: thêm một `.replace()` cho `https?://blog\.xdev\.asia/storage/` → `/storage/`, đặt cạnh dòng xử lý `xdev.asia` đang có.

**Không** sửa 44 file trong `content/` — ảnh đã được hai chỗ trên chuẩn hoá, còn link prose sang `xdev.asia` vẫn resolve.

- [ ] **Step 7: Chạy test để xác nhận pass**

Run: `npm test`
Expected: PASS cả 3 test.

Run: `npm run check:full`
Expected: lint sạch, typecheck sạch, build thành công.

- [ ] **Step 8: Commit**

```bash
git add vitest.config.ts tests/canonical-domain.test.ts package.json package-lock.json \
  src/lib/seo.ts data/settings.json src/app/robots.ts src/app/llms.txt/route.ts \
  src/app/feed.xml/route.ts src/app/llms-full.txt/route.ts scripts/preflight-checklist.mjs \
  src/components/GlobalChatbot.tsx src/lib/content.ts src/components/ContentRenderer.tsx
git commit -m "fix: chuẩn hoá canonical domain sang blog.xdev.asia

Site phục vụ ở blog.xdev.asia nhưng sinh link sang xdev.asia. Đổi SITE_URL,
settings, robots, fallback của các route text, và prompt chatbot.

Giữ xdev.asia trong legacyContentHosts (giờ đúng là legacy) và thêm
blog.xdev.asia để asset viết theo domain mới cũng được chuẩn hoá.

Dựng Vitest <version> kèm guard test chống tái diễn."
```

Thay `<version>` bằng đúng con số `npm ls vitest` in ra ở Step 1 — đây là cách ghi lại phiên bản thực tế theo Global Constraints, không phải chỗ để trống.

---

### Task 2: Gỡ SITE_URL trùng lặp trong 6 page

**Files:**
- Modify: `src/app/series/[category]/[slug]/page.tsx:24`
- Modify: `src/app/roadmap/[slug]/page.tsx:10`
- Modify: `src/app/tags/[tag]/page.tsx:16`
- Modify: `src/app/[topic]/page.tsx:13`
- Modify: `src/app/pages/[slug]/page.tsx:19`
- Modify: `src/app/pages/ve-toi/page.tsx:21`
- Test: `tests/canonical-domain.test.ts`

**Interfaces:**
- Consumes: `SITE_URL` từ `@/lib/seo` (Task 1)
- Produces: một nguồn sự thật duy nhất cho domain

Sáu file này tự khai `const SITE_URL = "..."` — chính là nguyên nhân khiến domain lệch mà không ai thấy.

- [ ] **Step 1: Thêm test thất bại**

Thêm vào `tests/canonical-domain.test.ts`:

```ts
it("không page nào tự khai SITE_URL", () => {
  const out = execSync("grep -rln 'const SITE_URL' src/app || true", {
    encoding: "utf-8",
  });
  expect(out.split("\n").filter(Boolean).sort()).toEqual([]);
});
```

- [ ] **Step 2: Chạy test để xác nhận fail**

Run: `npm test`
Expected: FAIL, liệt kê 6 file.

- [ ] **Step 3: Thay bằng import**

Trong mỗi file, xoá dòng `const SITE_URL = "https://blog.xdev.asia";` và thêm vào khối import:

```ts
import { SITE_URL } from "@/lib/seo";
```

`src/app/pages/ve-toi/page.tsx:21` không dùng hằng số mà nhúng thẳng chuỗi trong `alternates.canonical` — đổi thành:

```ts
alternates: { canonical: `${SITE_URL}/pages/ve-toi/` },
```

- [ ] **Step 4: Chạy test để xác nhận pass**

Run: `npm test && npm run check:full`
Expected: PASS, build thành công.

- [ ] **Step 5: Commit**

```bash
git add src/app tests/canonical-domain.test.ts
git commit -m "refactor: 6 page dùng chung SITE_URL từ @/lib/seo

Mỗi page tự khai một hằng số domain là lý do domain lệch mà không ai phát hiện.
Guard test chặn tái diễn."
```

---

### Task 3: Mở đường lấy file path từ content.ts

**Files:**
- Modify: `src/lib/content.ts` (thêm 2 export ở cuối)
- Modify: `src/lib/data.ts:34` (thêm `export` cho `localizedCollection`)
- Test: `tests/content-paths.test.ts`

**Interfaces:**
- Consumes: —
- Produces:
  - `getMdxFilePath(collection: string, slug: string): string | null` — đường dẫn tuyệt đối
  - `getMdxFilePathByRelativePath(collection: string, relativePath: string): string | null`
  - `localizedCollection(collection: string, locale?: Locale): string`

Generator ở Task 4 cần biết mỗi bài nằm ở file nào. `content.ts` đã có map nội bộ (`slugToFilePath`, `relativePathToFilePath`) nhưng chưa mở ra.

- [ ] **Step 1: Viết test thất bại**

`tests/content-paths.test.ts`:

```ts
import fs from "node:fs";
import { describe, expect, it } from "vitest";
import {
  getMdxFilePath,
  getMdxFilePathByRelativePath,
  listMdxRelativePaths,
  listMdxSlugs,
} from "@/lib/content";
import { localizedCollection } from "@/lib/data";

describe("content file paths", () => {
  // Contract thật, đã đo ngày 2026-09-18: buildSlugMap chỉ đăng ký file phẳng và
  // file `/index`. Bài blog nằm ở `<category>/<slug>.md` — lồng nhau, không phải
  // index — nên KHÔNG tra được theo slug. Collection `blog` có 130 relativePath
  // nhưng 0 slug. Đây là cái bẫy im lặng, nên phải có test ghi lại.
  it("KHÔNG tra được bài blog theo slug, dù file có thật trên đĩa", () => {
    expect(fs.existsSync("content/blog/ai/ai-trong-y-te-healthcare.md")).toBe(true);
    expect(listMdxSlugs("blog")).toEqual([]);
    expect(getMdxFilePath("blog", "ai-trong-y-te-healthcare")).toBeNull();
  });

  it("tra được theo slug trên collection có file /index", () => {
    const collection = localizedCollection("series/architecture/hl7-fhir-r5-chuyen-sau", "vi");
    const filePath = getMdxFilePathByRelativePath(collection, "index");
    expect(filePath).toBeTruthy();
    expect(fs.existsSync(filePath!)).toBe(true);
    expect(filePath!.endsWith(".md")).toBe(true);
  });

  it("trả null với slug không tồn tại", () => {
    expect(getMdxFilePath("blog", "khong-ton-tai-dau")).toBeNull();
  });

  // Đây là đường Task 4 thực sự dùng cho bài blog.
  it("getMdxFilePathByRelativePath hoạt động trên collection blog", () => {
    const relativePath = listMdxRelativePaths("blog")[0];
    const filePath = getMdxFilePathByRelativePath("blog", relativePath);
    expect(filePath).toBeTruthy();
    expect(fs.existsSync(filePath!)).toBe(true);
    expect(filePath!.endsWith(".md")).toBe(true);
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
```

- [ ] **Step 2: Chạy test để xác nhận fail**

Run: `npx vitest run tests/content-paths.test.ts`
Expected: FAIL — `getMdxFilePath is not a function` và `localizedCollection` không export.

- [ ] **Step 3: Thêm export vào content.ts**

Thêm vào cuối `src/lib/content.ts`:

```ts
/** Đường dẫn tuyệt đối tới file markdown của một slug, hoặc null nếu không có. */
export function getMdxFilePath(collection: string, slug: string): string | null {
  return getCollectionIndex(collection).slugToFilePath.get(slug) ?? null;
}

/** Như trên nhưng tra theo relative path trong collection. */
export function getMdxFilePathByRelativePath(
  collection: string,
  relativePath: string
): string | null {
  return getCollectionIndex(collection).relativePathToFilePath.get(relativePath) ?? null;
}
```

Trong `src/lib/data.ts:34`, đổi `function localizedCollection` thành `export function localizedCollection`.

- [ ] **Step 4: Chạy test để xác nhận pass**

Run: `npx vitest run tests/content-paths.test.ts`
Expected: PASS cả 4 test.

- [ ] **Step 5: Commit**

```bash
git add src/lib/content.ts src/lib/data.ts tests/content-paths.test.ts
git commit -m "feat: mở accessor file path cho content collection

Content API cần biết mỗi bài nằm ở file nào để sinh field path trong index."
```

---

### Task 4: Builder cho index.json

**Files:**
- Create: `src/lib/content-api.ts`
- Test: `tests/content-api-index.test.ts`

**Interfaces:**
- Consumes: `getMdxFilePathByRelativePath`, `listMdxRelativePaths`, `readMdxDocumentByRelativePath` (Task 3 + có sẵn); `localizedCollection` (Task 3); `getAllPosts`, `getAllSeries`, `getSeries`, `resolveSeriesCompoundSlug` từ `@/lib/data`; `SITE_URL` từ `@/lib/seo`. **Không** dùng `getMdxFilePath` — đã đo là luôn trả `null` cho bài blog và lesson.
- Produces:
  - `interface ApiIndexEntry` (shape bên dưới)
  - `buildIndex(locale: Locale): ApiIndexEntry[]`
  - `toApiPath(absoluteFilePath: string): string`

- [ ] **Step 1: Viết test thất bại**

`tests/content-api-index.test.ts`:

```ts
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { buildIndex } from "@/lib/content-api";

describe("buildIndex", () => {
  const entries = buildIndex("vi");

  it("có cả bài blog lẫn lesson", () => {
    expect(entries.some((e) => e.type === "blog")).toBe(true);
    expect(entries.some((e) => e.type === "lesson")).toBe(true);
  });

  it("mọi path trỏ tới file có thật", () => {
    const missing = entries
      .map((e) => e.path)
      .filter((p) => !fs.existsSync(path.join(process.cwd(), p)));
    expect(missing).toEqual([]);
  });

  it("mọi path nằm trong content/ và kết thúc bằng .md", () => {
    const bad = entries.filter((e) => !e.path.startsWith("content/") || !e.path.endsWith(".md"));
    expect(bad).toEqual([]);
  });

  it("url dùng canonical domain", () => {
    const bad = entries.filter((e) => !e.url.startsWith("https://blog.xdev.asia/"));
    expect(bad).toEqual([]);
  });

  it("slug là duy nhất trong một locale", () => {
    const seen = new Set<string>();
    const dupes: string[] = [];
    for (const e of entries) {
      const key = `${e.type}:${e.slug}`;
      if (seen.has(key)) dupes.push(key);
      seen.add(key);
    }
    expect(dupes).toEqual([]);
  });

  it("lesson mang thông tin series, blog thì không", () => {
    const lesson = entries.find((e) => e.type === "lesson")!;
    expect(lesson.series).not.toBeNull();
    expect(typeof lesson.series!.slug).toBe("string");
    expect(typeof lesson.series!.order).toBe("number");

    const blog = entries.find((e) => e.type === "blog")!;
    expect(blog.series).toBeNull();
  });

  it("sinh được index cho cả 4 locale", () => {
    for (const locale of ["vi", "en", "ja", "zh-tw"] as const) {
      expect(buildIndex(locale).length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận fail**

Run: `npx vitest run tests/content-api-index.test.ts`
Expected: FAIL — không import được `@/lib/content-api`.

- [ ] **Step 3: Viết builder**

`src/lib/content-api.ts`:

```ts
import path from "node:path";
import {
  getAllPosts,
  getAllSeries,
  getSeries,
  localizedCollection,
  resolveSeriesCompoundSlug,
} from "@/lib/data";
import {
  getMdxFilePathByRelativePath,
  listMdxRelativePaths,
  readMdxDocumentByRelativePath,
} from "@/lib/content";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo";

export interface ApiIndexEntry {
  id: string;
  type: "blog" | "lesson";
  locale: Locale;
  slug: string;
  title: string;
  excerpt: string | null;
  featuredImage: string | null;
  readingTime: number | null;
  publishedAt: string | null;
  author: { name: string; avatar: string | null };
  tags: string[];
  category: { slug: string; name: string } | null;
  series: { slug: string; chapter: string; order: number } | null;
  path: string;
  url: string;
}

/** Đường dẫn tuyệt đối → đường dẫn tương đối kiểu "content/blog/ai/foo.md". */
export function toApiPath(absoluteFilePath: string): string {
  return path.relative(process.cwd(), absoluteFilePath).split(path.sep).join("/");
}

function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/**
 * slug → đường dẫn tuyệt đối, dựng từ frontmatter.
 *
 * KHÔNG dùng `getMdxFilePath` ở đây. Nó tra qua `buildSlugMap`, mà map đó chỉ
 * đăng ký file phẳng và file `/index`. Bài blog nằm ở `<category>/<slug>.md` và
 * lesson nằm ở `chapters/<NN>/lessons/<NN-slug>` — đều là file lồng nhau không
 * phải `/index` — nên `getMdxFilePath` trả `null` cho cả hai. Đã đo ngày
 * 2026-09-18: collection `blog` có 130 relativePath nhưng 0 slug.
 *
 * Slug thật nằm trong frontmatter, đúng cách `getPostFromMdx`
 * (`src/lib/data.ts:258`) đang làm.
 */
function slugToFilePath(
  collection: string,
  relativePathFilter?: (relativePath: string) => boolean
): Map<string, string> {
  const map = new Map<string, string>();

  for (const relativePath of listMdxRelativePaths(collection)) {
    if (relativePathFilter && !relativePathFilter(relativePath)) continue;

    const document = readMdxDocumentByRelativePath<{ slug?: string }>(collection, relativePath);
    const slug = document?.data?.slug;
    if (!slug) continue;

    const filePath = getMdxFilePathByRelativePath(collection, relativePath);
    if (filePath) map.set(slug, filePath);
  }

  return map;
}

function buildPostEntries(locale: Locale): ApiIndexEntry[] {
  const collection = localizedCollection("blog", locale);
  const pathBySlug = slugToFilePath(collection);
  const entries: ApiIndexEntry[] = [];

  for (const post of getAllPosts(locale)) {
    const filePath = pathBySlug.get(post.slug);
    if (!filePath) continue;

    entries.push({
      id: post.id,
      type: "blog",
      locale,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      featuredImage: post.featured_image,
      readingTime: post.reading_time,
      publishedAt: post.published_at,
      author: { name: post.author?.name ?? "", avatar: post.author?.avatar ?? null },
      tags: (post.tags ?? []).map((tag) => tag.slug),
      category: post.category ? { slug: post.category.slug, name: post.category.name } : null,
      series: null,
      path: toApiPath(filePath),
      url: `${SITE_URL}${localePrefix(locale)}/blog/${post.slug}/`,
    });
  }

  return entries;
}

function buildLessonEntries(locale: Locale): ApiIndexEntry[] {
  const entries: ApiIndexEntry[] = [];

  for (const seriesIndex of getAllSeries(locale)) {
    const series = getSeries(seriesIndex.slug, locale);
    if (!series) continue;

    const compoundSlug = resolveSeriesCompoundSlug(series.slug, locale);
    const collection = localizedCollection(`series/${compoundSlug}`, locale);

    // Lesson relativePath có dạng `chapters/<NN-chapter>/lessons/<NN-slug>` —
    // tiền tố số khiến nó không khớp `lesson.slug`, nên phải tra qua frontmatter
    // chứ không ghép chuỗi đường dẫn. Đã đo: relPath
    // "chapters/01-hai-nghia-cua-chu-translation/lessons/01-linq-di-xuong-sql-server"
    // ứng với frontmatter.slug "linq-di-xuong-sql-server".
    const pathBySlug = slugToFilePath(
      collection,
      (relativePath) => relativePath.includes("/lessons/") && !relativePath.endsWith("/index")
    );

    for (const section of series.sections) {
      for (const lesson of section.lessons) {
        const filePath = pathBySlug.get(lesson.slug);
        if (!filePath) continue;

        entries.push({
          id: lesson.id,
          type: "lesson",
          locale,
          slug: lesson.slug,
          title: lesson.title,
          excerpt: lesson.description ?? null,
          featuredImage: series.featured_image,
          readingTime: lesson.duration_minutes ?? null,
          publishedAt: series.published_at,
          author: { name: series.author?.name ?? "", avatar: series.author?.avatar ?? null },
          tags: (series.tags ?? []).map((tag) => tag.slug),
          category: series.category
            ? { slug: series.category.slug, name: series.category.name }
            : null,
          series: {
            slug: series.slug,
            chapter: section.title,
            order: lesson.sort_order ?? section.sort_order,
          },
          path: toApiPath(filePath),
          url: `${SITE_URL}${localePrefix(locale)}/lessons/${series.slug}/${lesson.slug}/`,
        });
      }
    }
  }

  return entries;
}

export function buildIndex(locale: Locale): ApiIndexEntry[] {
  return [...buildPostEntries(locale), ...buildLessonEntries(locale)];
}
```

- [ ] **Step 4: Chạy test để xác nhận pass**

Run: `npx vitest run tests/content-api-index.test.ts`
Expected: PASS cả 7 test.

Nếu test "có cả bài blog lẫn lesson" fail vì 0 bài blog: `slugToFilePath` không khớp được slug nào. Kiểm bằng cách in `listMdxRelativePaths(collection).length` và kích thước map — relativePath có mà map rỗng nghĩa là frontmatter thiếu trường `slug`. Đừng quay lại `getMdxFilePath`, nó đã được đo là luôn trả `null` cho collection blog.

- [ ] **Step 5: Commit**

```bash
git add src/lib/content-api.ts tests/content-api-index.test.ts
git commit -m "feat: builder index.json cho Content API

Gộp bài blog và lesson thành một danh sách metadata thống nhất, kèm path
trỏ tới file markdown và url canonical. Test khẳng định mọi path có thật."
```

---

### Task 5: Builder cho series.json, taxonomy.json, manifest.json

**Files:**
- Modify: `src/lib/content-api.ts`
- Test: `tests/content-api-meta.test.ts`

**Interfaces:**
- Consumes: `buildIndex` (Task 4); `getAllSeries`, `getSeries`, `getTags`, `getCategories`, `getAuthors` từ `@/lib/data`
- Produces:
  - `buildSeriesTree(locale: Locale): ApiSeriesNode[]`
  - `buildTaxonomy(locale: Locale): ApiTaxonomy`
  - `buildManifest(): ApiManifest`

- [ ] **Step 1: Viết test thất bại**

`tests/content-api-meta.test.ts`:

```ts
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
```

- [ ] **Step 2: Chạy test để xác nhận fail**

Run: `npx vitest run tests/content-api-meta.test.ts`
Expected: FAIL — ba hàm chưa tồn tại.

- [ ] **Step 3: Viết builder**

Thêm vào `src/lib/content-api.ts`:

```ts
import { execSync } from "node:child_process";
import { getAuthors, getCategories, getTags } from "@/lib/data";
import { LOCALES } from "@/lib/i18n/config";

export interface ApiSeriesNode {
  slug: string;
  title: string;
  description: string | null;
  featuredImage: string | null;
  level: string;
  lessonCount: number;
  category: { slug: string; name: string } | null;
  url: string;
  chapters: {
    title: string;
    order: number;
    lessons: { slug: string; title: string; order: number }[];
  }[];
}

export interface ApiTaxonomy {
  categories: { slug: string; name: string }[];
  tags: { slug: string; name: string }[];
  authors: { name: string; avatar: string | null }[];
}

export interface ApiManifest {
  version: string;
  generatedAt: string;
  locales: readonly Locale[];
  counts: Record<Locale, { posts: number; lessons: number; series: number }>;
}

export function buildSeriesTree(locale: Locale): ApiSeriesNode[] {
  const nodes: ApiSeriesNode[] = [];

  for (const seriesIndex of getAllSeries(locale)) {
    const series = getSeries(seriesIndex.slug, locale);
    if (!series) continue;

    nodes.push({
      slug: series.slug,
      title: series.title,
      description: series.description,
      featuredImage: series.featured_image,
      level: series.level,
      lessonCount: series.lesson_count,
      category: series.category
        ? { slug: series.category.slug, name: series.category.name }
        : null,
      url: `${SITE_URL}${localePrefix(locale)}/series/${
        series.category?.slug ?? "uncategorized"
      }/${series.slug}/`,
      chapters: series.sections.map((section) => ({
        title: section.title,
        order: section.sort_order,
        lessons: section.lessons.map((lesson) => ({
          slug: lesson.slug,
          title: lesson.title,
          order: lesson.sort_order ?? section.sort_order,
        })),
      })),
    });
  }

  return nodes;
}

/**
 * `getCategories()`, `getTags()` và `getAuthors()` đều KHÔNG nhận locale —
 * dữ liệu gốc (`data/*.json`) không dịch theo ngôn ngữ. Nếu trả nguyên si thì
 * bốn file taxonomy.json giống hệt nhau và app tưởng phải tải lại theo locale.
 * Nên lọc xuống đúng những gì locale đó thực sự dùng.
 */
export function buildTaxonomy(locale: Locale): ApiTaxonomy {
  const entries = buildIndex(locale);
  const usedTags = new Set(entries.flatMap((entry) => entry.tags));
  const usedCategories = new Set(
    entries.map((entry) => entry.category?.slug).filter((slug): slug is string => Boolean(slug))
  );
  const usedAuthors = new Set(
    entries.map((entry) => entry.author.name).filter((name) => name.length > 0)
  );

  return {
    categories: getCategories()
      .filter((category) => usedCategories.has(category.slug))
      .map((category) => ({ slug: category.slug, name: category.name })),
    tags: getTags()
      .filter((tag) => usedTags.has(tag.slug))
      .map((tag) => ({ slug: tag.slug, name: tag.name })),
    authors: getAuthors()
      .filter((author) => usedAuthors.has(author.name))
      .map((author) => ({ name: author.name, avatar: author.avatar ?? null })),
  };
}

function resolveVersion(): string {
  if (process.env.CONTENT_API_VERSION) return process.env.CONTENT_API_VERSION;
  try {
    return execSync("git rev-parse --short HEAD", { encoding: "utf-8" }).trim();
  } catch {
    return "unknown";
  }
}

export function buildManifest(): ApiManifest {
  const counts = {} as ApiManifest["counts"];

  for (const locale of LOCALES) {
    const entries = buildIndex(locale);
    counts[locale] = {
      posts: entries.filter((entry) => entry.type === "blog").length,
      lessons: entries.filter((entry) => entry.type === "lesson").length,
      series: buildSeriesTree(locale).length,
    };
  }

  return {
    version: resolveVersion(),
    generatedAt: new Date().toISOString(),
    locales: LOCALES,
    counts,
  };
}
```

Chữ ký đã xác minh trong `src/lib/data.ts`: `getCategories(): Category[]` (486), `getTags(): Tag[]` (523), `getAuthors(): Author[]` (527) — **cả ba đều không nhận locale**. Đừng truyền `locale` vào, sẽ lỗi typecheck.

- [ ] **Step 4: Chạy test để xác nhận pass**

Run: `npx vitest run tests/content-api-meta.test.ts`
Expected: PASS cả 7 test.

- [ ] **Step 5: Commit**

```bash
git add src/lib/content-api.ts tests/content-api-meta.test.ts
git commit -m "feat: builder series tree, taxonomy và manifest

manifest.version lấy từ git sha để app biết khi nào phải tải lại index."
```

---

### Task 6: Route handler phục vụ 13 file JSON

**Files:**
- Create: `src/app/api/v1/manifest.json/route.ts`
- Create: `src/app/api/v1/[locale]/index.json/route.ts`
- Create: `src/app/api/v1/[locale]/series.json/route.ts`
- Create: `src/app/api/v1/[locale]/taxonomy.json/route.ts`
- Test: `tests/content-api-routes.test.ts`

**Interfaces:**
- Consumes: `buildIndex`, `buildSeriesTree`, `buildTaxonomy`, `buildManifest` (Task 4, 5)
- Produces: 13 file tĩnh trong `out/api/v1/` sau `next build`

Hai ràng buộc đã xác minh trong `node_modules/next/dist/docs/01-app/`: route handler dưới `output: "export"` **chỉ nhận `GET`**, và `params` là **Promise** phải `await`.

- [ ] **Step 1: Viết test thất bại**

`tests/content-api-routes.test.ts`:

```ts
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
```

- [ ] **Step 2: Chạy test để xác nhận fail**

Run: `npx vitest run tests/content-api-routes.test.ts`
Expected: FAIL — các route chưa tồn tại.

- [ ] **Step 3: Viết manifest route**

`src/app/api/v1/manifest.json/route.ts`:

```ts
export const dynamic = "force-static";

import { buildManifest } from "@/lib/content-api";

export function GET() {
  return Response.json(buildManifest());
}
```

- [ ] **Step 4: Viết ba route theo locale**

`src/app/api/v1/[locale]/index.json/route.ts`:

```ts
export const dynamic = "force-static";

import { buildIndex } from "@/lib/content-api";
import { LOCALES, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  return Response.json(buildIndex(locale as Locale));
}
```

`src/app/api/v1/[locale]/series.json/route.ts` — giống hệt nhưng gọi `buildSeriesTree`:

```ts
export const dynamic = "force-static";

import { buildSeriesTree } from "@/lib/content-api";
import { LOCALES, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  return Response.json(buildSeriesTree(locale as Locale));
}
```

`src/app/api/v1/[locale]/taxonomy.json/route.ts`:

```ts
export const dynamic = "force-static";

import { buildTaxonomy } from "@/lib/content-api";
import { LOCALES, type Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  return Response.json(buildTaxonomy(locale as Locale));
}
```

- [ ] **Step 5: Chạy test để xác nhận pass**

Run: `npx vitest run tests/content-api-routes.test.ts`
Expected: PASS cả 3 test.

- [ ] **Step 6: Build và kiểm file thật sinh ra**

Run: `npm run build`
Run: `find out/api/v1 -type f | sort`
Expected: đúng 13 file —

```
out/api/v1/manifest.json
out/api/v1/en/index.json
out/api/v1/en/series.json
out/api/v1/en/taxonomy.json
out/api/v1/ja/index.json
out/api/v1/ja/series.json
out/api/v1/ja/taxonomy.json
out/api/v1/vi/index.json
out/api/v1/vi/series.json
out/api/v1/vi/taxonomy.json
out/api/v1/zh-tw/index.json
out/api/v1/zh-tw/series.json
out/api/v1/zh-tw/taxonomy.json
```

Run: `node -e "const a=require('./out/api/v1/vi/index.json'); console.log(a.length, a[0].path, a[0].url)"`
Expected: số entry > 1700, `path` bắt đầu bằng `content/`, `url` bắt đầu bằng `https://blog.xdev.asia/`.

- [ ] **Step 7: Commit**

```bash
git add src/app/api tests/content-api-routes.test.ts
git commit -m "feat: 13 route handler phục vụ Content API JSON

manifest + index/series/taxonomy cho 4 locale, sinh tĩnh lúc build qua
generateStaticParams. Next 16: params là Promise nên phải await."
```

---

### Task 7: Copy markdown thô vào public/api/v1/content/

**Files:**
- Create: `scripts/build-content-api.mjs`
- Modify: `package.json` (script `build` và `build:ci`)
- Modify: `.gitignore`
- Test: `tests/content-api-copy.test.ts`

**Interfaces:**
- Consumes: —
- Produces: `public/api/v1/content/**/*.md` phản chiếu nguyên cấu trúc `content/`

- [ ] **Step 1: Viết test thất bại**

`tests/content-api-copy.test.ts`:

```ts
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it, beforeAll } from "vitest";
import { buildIndex } from "@/lib/content-api";

const TARGET = path.join(process.cwd(), "public", "api", "v1", "content");

describe("build-content-api script", () => {
  beforeAll(() => {
    execFileSync("node", ["scripts/build-content-api.mjs"], { stdio: "inherit" });
  });

  it("copy được markdown sang public/api/v1/content", () => {
    expect(fs.existsSync(TARGET)).toBe(true);
  });

  it("mọi path trong index vi đều có bản copy tương ứng", () => {
    const missing = buildIndex("vi")
      .map((entry) => entry.path)
      .filter((p) => !fs.existsSync(path.join(process.cwd(), "public", "api", "v1", p)));
    expect(missing).toEqual([]);
  });

  it("nội dung bản copy giống hệt bản gốc", () => {
    const entry = buildIndex("vi")[0];
    const original = fs.readFileSync(path.join(process.cwd(), entry.path), "utf-8");
    const copied = fs.readFileSync(
      path.join(process.cwd(), "public", "api", "v1", entry.path),
      "utf-8"
    );
    expect(copied).toBe(original);
  });
});
```

Lưu ý shape: `entry.path` là `content/blog/...`, và đích là `public/api/v1/content/blog/...` — nên ghép `public/api/v1/` + `entry.path`. Nhờ vậy app fetch `{API_BASE}/{path}` là ra đúng file.

- [ ] **Step 2: Chạy test để xác nhận fail**

Run: `npx vitest run tests/content-api-copy.test.ts`
Expected: FAIL — script chưa tồn tại.

- [ ] **Step 3: Viết script copy**

`scripts/build-content-api.mjs`:

```js
#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "content");
const target = path.join(root, "public", "api", "v1", "content");

if (!fs.existsSync(source)) {
  console.error(`[content-api] không tìm thấy thư mục nguồn: ${source}`);
  process.exit(1);
}

// Xoá bản cũ để file đã bị gỡ khỏi content/ không còn sót lại trong out/
fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });

let copied = 0;

function copyMarkdown(sourceDir, targetDir) {
  for (const dirent of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, dirent.name);
    const targetPath = path.join(targetDir, dirent.name);

    if (dirent.isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
      copyMarkdown(sourcePath, targetPath);
      continue;
    }

    if (!dirent.isFile() || !dirent.name.endsWith(".md")) continue;

    fs.copyFileSync(sourcePath, targetPath);
    copied += 1;
  }
}

const startedAt = Date.now();
copyMarkdown(source, target);
const seconds = ((Date.now() - startedAt) / 1000).toFixed(1);

console.log(`[content-api] copy ${copied} file markdown trong ${seconds}s → public/api/v1/content`);
```

- [ ] **Step 4: Nối vào build và chặn commit thư mục sinh ra**

`package.json`:

```json
"build": "node scripts/build-content-api.mjs && next build",
"build:ci": "node scripts/build-content-api.mjs && next build",
```

Thêm vào `.gitignore`, ngay dưới khối `# next.js`:

```
/public/api/
```

- [ ] **Step 5: Chạy test để xác nhận pass**

Run: `npx vitest run tests/content-api-copy.test.ts`
Expected: PASS cả 3 test; script in ra khoảng 6480 file.

Run: `git status --short`
Expected: **không** thấy `public/api/` trong danh sách.

- [ ] **Step 6: Commit**

```bash
git add scripts/build-content-api.mjs package.json .gitignore tests/content-api-copy.test.ts
git commit -m "feat: copy markdown thô vào public/api/v1/content

Nội dung bài không render lại ở build — chỉ copy, nên next build gần như
không nặng thêm. output: export sẽ đưa nguyên public/ sang out/."
```

---

### Task 8: Đo chi phí deploy và chốt ngưỡng

**Files:**
- Create: `docs/superpowers/notes/2026-09-18-content-api-build-cost.md`

**Interfaces:**
- Consumes: toàn bộ Task 1-7
- Produces: số đo thật để quyết định có phải tách markdown ra khỏi GitHub Pages hay không

Spec mục 4.5 nói rõ đây là rủi ro **phải đo, không đoán**. Task này tồn tại để không ai bỏ qua bước đó.

- [ ] **Step 1: Lấy baseline đã đo sẵn — KHÔNG đo lại**

Bản gốc của plan bảo `git checkout 0282c58d -- .` rồi checkout ngược lại. **Đừng làm thế**: nó ghi đè toàn bộ cây làm việc hai lần và có thể để lại cây bẩn mà không ai nhận ra.

Baseline đã được đo sẵn ngày 2026-09-18 tại commit `cbe2868b`, trước Task 1, trên cây sạch:

| | |
|---|---|
| Thời gian build | **102 giây** |
| `out/` apparent size | **7,44 GB** |
| `out/` theo `du -sh` (allocated) | 9,2 GB |
| Số file | **95.477** |
| Số thư mục | 9.381 |

Dùng đúng những con số này làm mốc so sánh. Lưu ý phân biệt hai cách đo: `du` báo allocated blocks, `find -exec stat` báo apparent size. GitHub Pages tính apparent size, nên **so sánh phải dùng apparent**.

Sau baseline này đã có thêm commit `494984f7` (xoá `__next._full.txt` trong workflow) làm `out/` giảm còn **6,02 GB / 86.502 file** — nhưng đó là bước prune chạy trong CI sau `next build`, không ảnh hưởng `out/` khi build local. Khi so sánh local, dùng 7,44 GB.

- [ ] **Step 2: Đo build có API**

```bash
rm -rf .next out public/api
time npm run build
find out -type f -exec stat -f '%z' {} + | awk '{s+=$1;n++} END {printf "%d file, %.2f GB apparent\n", n, s/1073741824}'
du -sh out
find out/api/v1 -name '*.md' | wc -l
du -sh out/api/v1/content
find out/api/v1 -name '*.json' | sort
```

Dòng `awk` là con số dùng để so với baseline. Dòng `find ... *.json` phải liệt kê đúng 13 file.

- [ ] **Step 3: Ghi kết quả**

Tạo `docs/superpowers/notes/2026-09-18-content-api-build-cost.md` với bảng: thời gian build trước/sau, dung lượng `out/` trước/sau, số file markdown copy, dung lượng riêng `out/api/v1/content`.

- [ ] **Step 4: Đối chiếu ngưỡng và quyết định**

Ngưỡng tuyệt đối "700 MB" trong bản gốc của plan được viết khi chưa biết baseline, và vô nghĩa khi baseline đã là 7,44 GB. Ngưỡng thay thế là **tương đối**, so với bảng ở Step 1:

- apparent size tăng **dưới 10%** (tức dưới ~0,74 GB, khớp ước tính ~100 MB markdown)
- thời gian build tăng **dưới 50%** (tức dưới ~153 giây)

Nếu vượt một trong hai: ghi kết luận vào note và **dừng lại**, mở spec mới cho phương án phục vụ markdown từ nơi khác. Contract của app không đổi, vì base URL nằm trong một biến môi trường duy nhất.

Nếu dưới cả hai: ghi "đạt" vào note kèm con số thật và đi tiếp.

Ghi cả con số tuyệt đối vào note dù đạt hay không — người đọc sau cần số, không cần chữ "đạt".

- [ ] **Step 5: Đẩy lên và xác minh trên production**

**Đây là lần `git push` duy nhất của cả plan.** Task 1-7 chỉ commit local. Lý do: `.github/workflows/deploy.yml` chạy `on: push: branches: [main]` với `cancel-in-progress: false`, và mỗi lần deploy mất 17-21 phút (build ~13 phút, deploy ~7 phút). Push từng task sẽ xếp hàng khoảng năm tiếng deploy code dở dang. Người dùng đã chọn commit thẳng vào `main` sau khi biết điều này; commit và push là hai việc khác nhau, nên gom push về đây.

Trước khi push, kiểm lại toàn bộ chuỗi commit một lượt:

```bash
git log --oneline cbe2868b..HEAD
git status --short   # phải sạch; public/api/ không được xuất hiện
```

Rồi push:

```bash
git add docs/superpowers/notes/2026-09-18-content-api-build-cost.md
git commit -m "docs: số đo chi phí build của Content API"
git push
```

Đợi workflow `Deploy to GitHub Pages` xong — khoảng 20 phút, theo dõi bằng `gh run watch`. Lưu ý job `deploy` có timeout cứng **10 phút** và lần đo gần nhất đã mất **7 phút 02**; nếu Content API đẩy nó qua 10 phút thì deploy fail và đó là một phát hiện phải ghi vào note, không phải lỗi vặt.

Rồi kiểm bằng URL thật:

```bash
curl -sSf https://blog.xdev.asia/api/v1/manifest.json | head -c 300
curl -sSf https://blog.xdev.asia/api/v1/vi/index.json | head -c 300
curl -sSfI "https://blog.xdev.asia/api/v1/$(curl -sSf https://blog.xdev.asia/api/v1/vi/index.json | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>console.log(JSON.parse(s)[0].path))")" | head -3
```

Expected: cả ba lệnh trả 200. Lệnh thứ ba là phép thử quan trọng nhất — nó lấy một `path` thật từ index rồi fetch qua HTTP, đúng thứ app sẽ làm. Slug tiếng Việt có dấu có thể sống trên đĩa nhưng hỏng khi thành URL; đây là chỗ phát hiện.

- [ ] **Step 6: Nếu Step 5 fail vì ký tự trong đường dẫn**

Không nới lỏng test. Sửa ở nguồn: thêm `encodeURI` cho từng segment của `path` khi sinh trong `toApiPath`, thêm một test trong `tests/content-api-index.test.ts` khẳng định `encodeURI(entry.path) === entry.path`, rồi chạy lại từ Step 2.

---

## Kết thúc plan A

Sau Task 8, `https://blog.xdev.asia/api/v1/` phục vụ thật và đã được xác minh qua HTTP.

**Plan B (app React Native, S1) viết sau khi plan này chạy xong** — lý do: contract test của app fetch API thật, nên API phải sống trước. Trước khi viết plan B phải xác minh một điều spec đã đánh dấu: `react-native-webview` có nằm trong runtime Expo Go SDK 57 hay không. Nếu không thì cần development build, và bước đầu tiên của plan B đổi.
