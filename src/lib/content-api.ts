import { execSync } from "node:child_process";
import path from "node:path";
import {
  getAllPosts,
  getAllSeries,
  getAuthors,
  getCategories,
  getSeries,
  getTags,
  localizedCollection,
  resolveSeriesCompoundSlug,
} from "@/lib/data";
import {
  getMdxFilePathByRelativePath,
  listMdxRelativePaths,
  readMdxDocumentByRelativePath,
} from "@/lib/content";
import { LOCALES, localePrefix, type Locale } from "@/lib/i18n/config";
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
  author: { id: string; name: string; avatar: string | null } | null;
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

/**
 * Chuẩn hoá một đường dẫn asset (avatar, featuredImage, ...) về một dạng
 * duy nhất — luôn có dấu `/` đầu, trừ khi đã là URL tuyệt đối.
 *
 * Đã đo ngày 2026-09-18: frontmatter (blog lẫn series) lưu avatar KHÔNG có
 * dấu `/` đầu (vd "avatars/7e8eb5c6-....jpeg"), còn `getAuthors()`
 * (`src/lib/data.ts:527`) tự thêm dấu `/`. Cùng lỗi đó lặp lại ở
 * `featuredImage`: bài blog phát ra "/images/blog/...", còn lesson và series
 * node phát ra "images/blog/..." (đo trên artifact build: 89% số entry rơi
 * vào phía không có dấu `/`). Hai nguồn cùng nuôi API này mà phát ra hai dạng
 * khác nhau cho cùng một loại giá trị là lỗi hợp đồng của chính API — app
 * ghép `SITE_URL + value` sẽ ra URL hỏng cho một trong hai. Dùng chung một
 * hàm ở mọi nơi phát sinh đường dẫn asset để giá trị phát ra luôn nhất quán,
 * thay vì chuẩn hoá rời rạc mỗi nơi một kiểu.
 *
 * Một giá trị đã là URL tuyệt đối (`http://` hoặc `https://`) được giữ
 * nguyên — thêm `/` đầu vào đó sẽ phá URL thay vì chuẩn hoá nó. `null` và
 * `undefined` (frontmatter thiếu field dù type khai `string | null`) đều
 * gộp về `null`.
 */
function normalizeAssetPath(value: string | null | undefined): string | null {
  if (!value) return null;
  if (/^(\/|https?:)/.test(value)) return value;
  return `/${value}`;
}

/**
 * Trường frontmatter → đường dẫn tuyệt đối, dựng từ frontmatter.
 *
 * KHÔNG dùng `getMdxFilePath` ở đây. Nó tra qua `buildSlugMap`, mà map đó chỉ
 * đăng ký file phẳng và file `/index`. Bài blog nằm ở `<category>/<slug>.md` và
 * lesson nằm ở `chapters/<NN>/lessons/<NN-slug>` — đều là file lồng nhau không
 * phải `/index` — nên `getMdxFilePath` trả `null` cho cả hai. Đã đo ngày
 * 2026-09-18: collection `blog` có 130 relativePath nhưng 0 slug.
 *
 * Giá trị khóa thật nằm trong frontmatter, đúng cách `getPostFromMdx`
 * (`src/lib/data.ts:258`) đang làm.
 */
function frontmatterFieldToFilePath(
  collection: string,
  field: "slug" | "id",
  relativePathFilter?: (relativePath: string) => boolean
): Map<string, string> {
  const map = new Map<string, string>();

  for (const relativePath of listMdxRelativePaths(collection)) {
    if (relativePathFilter && !relativePathFilter(relativePath)) continue;

    const document = readMdxDocumentByRelativePath<{ slug?: string; id?: string }>(
      collection,
      relativePath
    );
    const key = document?.data?.[field];
    if (!key) continue;

    const filePath = getMdxFilePathByRelativePath(collection, relativePath);
    if (filePath) map.set(key, filePath);
  }

  return map;
}

function slugToFilePath(
  collection: string,
  relativePathFilter?: (relativePath: string) => boolean
): Map<string, string> {
  return frontmatterFieldToFilePath(collection, "slug", relativePathFilter);
}

/**
 * Post/series không phải lúc nào cũng có `author` — frontmatter của series
 * "luyen-thi-ckad" (ja, zh-tw) không khai field này dù type khai
 * `author: Author` bắt buộc, nên giá trị thật lúc runtime là `undefined`.
 *
 * Trước đây chỗ gọi dùng `post.author?.id ?? ""` cho từng field riêng lẻ,
 * phát ra `{ id: "", name: "", avatar: null }` — một "tác giả rỗng" giả,
 * trong khi type khai `author` không thể null. Đo ngày 2026-09-18: 10 entry
 * `ja` + 10 entry `zh-tw` (series "luyen-thi-ckad") lãnh đúng sentinel này.
 * Phát `null` cho cả object thay vì bịa ra một tác giả rỗng — đúng với thực
 * tế là entry đó không có tác giả.
 */
function buildAuthorRef(
  author: { id: string; name: string; avatar: string | null } | null | undefined
): { id: string; name: string; avatar: string | null } | null {
  if (!author) return null;
  return { id: author.id, name: author.name, avatar: normalizeAssetPath(author.avatar) };
}

/**
 * Tag[] → slug[], chỉ giữ chuỗi khác rỗng.
 *
 * Đo ngày 2026-09-18: `getSeries()` (dùng bởi `buildLessonEntries` và, qua
 * `series.category` bên dưới, `buildSeriesTree`) trả `tags` y nguyên từ
 * frontmatter thay vì qua `normalizeTags()` như `getAllPosts()`/
 * `getAllSeries()` đã làm. Với 2 series — "luyen-thi-ckad" (ja, zh-tw) và
 * "docker-tu-co-ban-den-nang-cao" (zh-tw) — frontmatter `tags` là mảng chuỗi
 * thô ("kubernetes", "ckad", ...), không phải object `{slug, name}`, nên
 * `tag.slug` ra `undefined` và `JSON.stringify` biến mỗi phần tử `undefined`
 * trong mảng thành `null`: 10 entry `ja` + 30 entry `zh-tw` phát `tags` chứa
 * `null`, dù type khai `string[]`. Lọc bỏ phần tử không phải chuỗi non-empty
 * thay vì phát `null` vào một mảng khai kiểu `string[]` — entry không còn
 * tag hợp lệ nào thì phát `[]`, không phải `[null, null, ...]`.
 */
function buildTagSlugs(tags: { slug: string }[] | null | undefined): string[] {
  return (tags ?? [])
    .map((tag) => tag?.slug)
    .filter((slug): slug is string => typeof slug === "string" && slug.length > 0);
}

/**
 * Category → { slug, name } | null, chỉ khi cả hai trường đều là chuỗi khác
 * rỗng.
 *
 * Cùng nguyên nhân với `buildTagSlugs` ở trên: `getSeries()` trả `category`
 * y nguyên frontmatter — với "luyen-thi-ckad" (ja) và
 * "docker-tu-co-ban-den-nang-cao" (zh-tw), đó là một chuỗi thô truthy (vd
 * "luyen-thi"), không phải object `{slug, name}`. Nhánh cũ
 * `series.category ? { slug: ..., name: ... } : null` vẫn rẽ vào nhánh
 * truthy (chuỗi khác rỗng luôn truthy), nhưng `.slug`/`.name` trên một chuỗi
 * đều ra `undefined` — `JSON.stringify` bỏ hẳn property có giá trị
 * `undefined`, nên phát ra `{}` thay vì `null`: 10 entry `ja` + 20 entry
 * `zh-tw` (kể cả 1 node series/locale trong series.json) lãnh đúng lỗi này.
 * Một category thiếu 1 trong 2 trường không phải là category hợp lệ — phát
 * `null` thay vì một object rỗng giả, mirror `buildAuthorRef()` ở trên.
 */
function buildCategoryRef(
  category: { slug: string; name: string } | null | undefined
): { slug: string; name: string } | null {
  if (!category) return null;
  const { slug, name } = category;
  if (typeof slug !== "string" || slug.length === 0) return null;
  if (typeof name !== "string" || name.length === 0) return null;
  return { slug, name };
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
      featuredImage: normalizeAssetPath(post.featured_image),
      readingTime: post.reading_time,
      publishedAt: post.published_at,
      author: buildAuthorRef(post.author),
      tags: buildTagSlugs(post.tags),
      category: buildCategoryRef(post.category),
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
    //
    // Tra theo `id` chứ không phải `slug`: đã đo ngày 2026-09-18, slug frontmatter
    // của lesson KHÔNG đảm bảo duy nhất — có series (vd "hl7-fhir-r5-chuyen-sau")
    // chứa 2 lesson khác chương nhưng cùng slug "terminology-service". Map theo
    // slug sẽ bị ghi đè (file sau thắng), khiến 1 trong 2 lesson bị gán nhầm path
    // sang file kia. `id` là UUID sinh riêng cho từng file lesson nên không đụng.
    const pathById = frontmatterFieldToFilePath(
      collection,
      "id",
      (relativePath) => relativePath.includes("/lessons/") && !relativePath.endsWith("/index")
    );

    for (const section of series.sections) {
      for (const lesson of section.lessons) {
        const filePath = pathById.get(lesson.id);
        if (!filePath) continue;

        entries.push({
          id: lesson.id,
          type: "lesson",
          locale,
          slug: lesson.slug,
          title: lesson.title,
          excerpt: lesson.description ?? null,
          featuredImage: normalizeAssetPath(series.featured_image),
          readingTime: lesson.duration_minutes ?? null,
          publishedAt: series.published_at,
          author: buildAuthorRef(series.author),
          tags: buildTagSlugs(series.tags),
          category: buildCategoryRef(series.category),
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

// ---------------------------------------------------------------------------
// Series tree, taxonomy, manifest (Task 5)
// ---------------------------------------------------------------------------

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
    // `id` bên cạnh `slug`: slug lesson không đảm bảo duy nhất trong một
    // series (xem lý do đầy đủ ở `buildLessonEntries` — vd 2 lesson
    // "terminology-service" khác chương trong "hl7-fhir-r5-chuyen-sau"). Một
    // app đi từ series.json → index.json → path mà tra theo `slug` có thể
    // trúng nhầm lesson. `id` đã sẵn có ở đây, không cần đo/tra thêm gì.
    lessons: { id: string; slug: string; title: string; order: number }[];
  }[];
}

export interface ApiTaxonomy {
  categories: { slug: string; name: string }[];
  tags: { slug: string; name: string }[];
  authors: { id: string; name: string; avatar: string | null }[];
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
      featuredImage: normalizeAssetPath(series.featured_image),
      level: series.level,
      lessonCount: series.lesson_count,
      category: buildCategoryRef(series.category),
      url: `${SITE_URL}${localePrefix(locale)}/series/${
        series.category?.slug ?? "uncategorized"
      }/${series.slug}/`,
      chapters: series.sections.map((section) => ({
        title: section.title,
        order: section.sort_order,
        lessons: section.lessons.map((lesson) => ({
          id: lesson.id,
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
  // Nối theo `id`, không theo `name`: `name` là trường hiển thị, không phải
  // khoá định danh — cùng loại lỗi lesson-join-theo-slug mà Task 4 đã gặp
  // (xem `buildLessonEntries` phía trên). Đã đo ngày 2026-09-18:
  // `data/authors.json` lưu "DUY TRAN", frontmatter lưu "Duy Tran", nhưng cả
  // hai cùng `id` "019c9616-d2b4-713f-9b2c-40e2e92a05cf". Nối theo tên (kể cả
  // không phân biệt hoa/thường) sẽ gộp nhầm hai tác giả khác nhau trót trùng
  // tên, và vỡ ngay khi một tác giả đổi tên hiển thị; `id` không có rủi ro đó.
  const usedAuthorIds = new Set(
    entries.map((entry) => entry.author?.id).filter((id): id is string => Boolean(id))
  );

  return {
    categories: getCategories()
      .filter((category) => usedCategories.has(category.slug))
      .map((category) => ({ slug: category.slug, name: category.name })),
    tags: getTags()
      .filter((tag) => usedTags.has(tag.slug))
      .map((tag) => ({ slug: tag.slug, name: tag.name })),
    // `id` phải có mặt ở đây, không chỉ `name`/`avatar`: nếu không, đây là
    // document duy nhất trong API không mang khoá định danh của author, nên
    // app không có cách nào nối `taxonomy.authors[]` với `index.json`
    // `author` ngoài tên hiển thị — đúng phép nối mà comment `usedAuthorIds`
    // phía trên vừa từ chối áp dụng cho chính document này.
    authors: getAuthors()
      .filter((author) => usedAuthorIds.has(author.id))
      .map((author) => ({
        id: author.id,
        name: author.name,
        avatar: normalizeAssetPath(author.avatar),
      })),
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
