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
import { localePrefix, type Locale } from "@/lib/i18n/config";
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
