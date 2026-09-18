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
  // Nối theo tên phải không phân biệt hoa/thường: đã đo ngày 2026-09-18 —
  // `data/authors.json` lưu "DUY TRAN" (viết hoa toàn bộ), còn frontmatter
  // (blog lẫn series) lưu "Duy Tran" — cùng một author (cùng id
  // 019c9616-d2b4-713f-9b2c-40e2e92a05cf), chỉ khác cách viết hoa. Nối phân
  // biệt hoa/thường sẽ khiến usedAuthors và getAuthors() không bao giờ khớp,
  // taxonomy.authors luôn rỗng. `ApiIndexEntry.author` (Task 4) không mang
  // `id` nên không nối theo id được ở đây; đổi shape của Task 4 nằm ngoài
  // phạm vi Task 5.
  const usedAuthors = new Set(
    entries
      .map((entry) => entry.author.name.trim().toLowerCase())
      .filter((name) => name.length > 0)
  );

  return {
    categories: getCategories()
      .filter((category) => usedCategories.has(category.slug))
      .map((category) => ({ slug: category.slug, name: category.name })),
    tags: getTags()
      .filter((tag) => usedTags.has(tag.slug))
      .map((tag) => ({ slug: tag.slug, name: tag.name })),
    authors: getAuthors()
      .filter((author) => usedAuthors.has(author.name.trim().toLowerCase()))
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
