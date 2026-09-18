import fs from "fs";
import path from "path";
import { listMdxRelativePaths, readMdxDocument, readMdxDocumentByRelativePath, renderMdxBodyToHtml } from "./content";
import { DEFAULT_LOCALE, LOCALES, localizedPath, type Locale } from "./i18n/config";
import type {
    Author,
    Category,
    Comment,
    Lesson,
    LessonSummary,
    Post,
    PostIndex,
    Quiz,
    QuizIndex,
    Review,
    Section,
    Series,
    SeriesIndex,
    Settings,
    Tag,
} from "./types";

const dataDir = path.join(process.cwd(), "data");

function readJSON<T>(filePath: string): T {
  const raw = fs.readFileSync(path.join(dataDir, filePath), "utf-8");
  return JSON.parse(raw) as T;
}

function fileExists(filePath: string): boolean {
  return fs.existsSync(path.join(dataDir, filePath));
}

export function localizedCollection(collection: string, locale: Locale = DEFAULT_LOCALE): string {
  return locale === DEFAULT_LOCALE ? collection : `${locale}/${collection}`;
}

// Resolve series slug to compound slug for categorized directory structure
// e.g. "ai-llm-tu-co-ban-den-nang-cao" → "ai-machine-learning/ai-llm-tu-co-ban-den-nang-cao"
const seriesSlugMaps = new Map<Locale, Map<string, string>>();

function getSeriesSlugMap(locale: Locale = DEFAULT_LOCALE): Map<string, string> {
  const cached = seriesSlugMaps.get(locale);
  if (cached) return cached;

  const map = new Map<string, string>();
  const seriesPaths = listMdxRelativePaths(localizedCollection("series", locale)).filter((relativePath) =>
    relativePath.endsWith("/index")
  );

  for (const indexPath of seriesPaths) {
    const segments = indexPath.split("/");

    // Flat series structure: <series-slug>/index
    if (segments.length === 2) {
      map.set(segments[0], segments[0]);
      continue;
    }

    // Categorized series structure: <category>/<series-slug>/index
    const seriesSlug = segments[segments.length - 2];
    const compoundSlug = segments.slice(0, -1).join("/");
    map.set(seriesSlug, compoundSlug);
  }

  seriesSlugMaps.set(locale, map);
  return map;
}

export function resolveSeriesCompoundSlug(
  seriesSlug: string,
  locale: Locale = DEFAULT_LOCALE
): string {
  return getSeriesSlugMap(locale).get(seriesSlug) || seriesSlug;
}

type PostFrontmatter = Omit<Post, "content" | "comments"> & {
  comments?: Comment[];
  comments_count?: number;
};

type SeriesFrontmatter = Omit<Series, "content">;
type LessonFrontmatter = Omit<Lesson, "content" | "course"> & {
  course?: Lesson["course"];
  course_id?: string;
  course_title?: string;
  course_slug?: string;
};

function buildSectionsFromLessonFiles(
  seriesSlug: string,
  locale: Locale = DEFAULT_LOCALE
): Section[] | null {
  const seriesCollection = localizedCollection(
    `series/${resolveSeriesCompoundSlug(seriesSlug, locale)}`,
    locale
  );
  const lessonPaths = listMdxRelativePaths(seriesCollection)
    .filter((p) => p.includes("/lessons/") && !p.endsWith("/index"));

  if (lessonPaths.length === 0) return null;

  const lessonsBySection = new Map<string, LessonSummary[]>();
  const sectionOrder = new Map<string, number>();

  for (const lessonPath of lessonPaths) {
    const mdxLesson = readMdxDocumentByRelativePath<LessonFrontmatter>(seriesCollection, lessonPath);
    if (!mdxLesson) continue;

    const fm = mdxLesson.data;
    const sectionTitle = fm.section_title || "Nội dung khóa học";

    if (!lessonsBySection.has(sectionTitle)) {
      lessonsBySection.set(sectionTitle, []);
      sectionOrder.set(sectionTitle, sectionOrder.size);
    }

    lessonsBySection.get(sectionTitle)!.push({
      id: fm.id,
      title: fm.title,
      slug: fm.slug || normalizeLessonSlugFromPath(lessonPath),
      description: fm.description ?? null,
      duration_minutes: fm.duration_minutes ?? null,
      is_free: fm.is_free ?? true,
      sort_order: fm.sort_order ?? 0,
      video_url: fm.video_url ?? null,
    });
  }

  const sections: Section[] = [];
  for (const [title, lessons] of lessonsBySection) {
    lessons.sort((a, b) => a.sort_order - b.sort_order);
    sections.push({
      id: `section-${sectionOrder.get(title) ?? 0}`,
      title,
      description: null,
      sort_order: sectionOrder.get(title) ?? 0,
      lessons,
    });
  }

  sections.sort((a, b) => a.sort_order - b.sort_order);
  return sections;
}

function normalizeLessonSlugFromPath(lessonPath: string): string {
  const fileName = lessonPath.split("/").at(-1) || lessonPath;
  return fileName.replace(/^\d+-/, "");
}

function getLessonMdxDocument(
  seriesSlug: string,
  lessonSlug: string,
  locale: Locale = DEFAULT_LOCALE
): { data: LessonFrontmatter; content: string } | null {
  const compoundSlug = resolveSeriesCompoundSlug(seriesSlug, locale);
  const seriesCollection = localizedCollection(`series/${compoundSlug}`, locale);
  const directDoc = readMdxDocument<LessonFrontmatter>(
    `${seriesCollection}/chapters`,
    lessonSlug
  );
  if (directDoc) return directDoc;

  const lessonPaths = listMdxRelativePaths(seriesCollection)
    .filter((relativePath) => relativePath.includes("/lessons/") && !relativePath.endsWith("/index"));
  for (const lessonPath of lessonPaths) {
    const mdxLesson = readMdxDocumentByRelativePath<LessonFrontmatter>(
      seriesCollection,
      lessonPath
    );
    if (!mdxLesson) continue;

    const frontmatterSlug = mdxLesson.data.slug || "";
    const pathSlug = normalizeLessonSlugFromPath(lessonPath);
    if (frontmatterSlug === lessonSlug || pathSlug === lessonSlug) {
      return mdxLesson;
    }
  }

  return null;
}

function sortByPublishedDate<T extends { published_at?: string | null; created_at?: string }>(items: T[]): T[] {
  return [...items].sort((left, right) => {
    const leftValue = new Date(left.published_at || left.created_at || 0).getTime();
    const rightValue = new Date(right.published_at || right.created_at || 0).getTime();
    return rightValue - leftValue;
  });
}

function tagNameFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeTags(tags: unknown): Tag[] {
  if (!Array.isArray(tags)) return [];

  return tags.flatMap((entry) => {
    if (!entry) return [];

    if (typeof entry === "string") {
      return [{ name: tagNameFromSlug(entry), slug: entry } satisfies Tag];
    }

    if (typeof entry !== "object") return [];

    const maybeTag = entry as Partial<Tag> & { slug?: unknown; name?: unknown };
    const slug = typeof maybeTag.slug === "string" ? maybeTag.slug : "";
    const name = typeof maybeTag.name === "string" ? maybeTag.name : "";

    if (!slug && !name) return [];

    const normalizedSlug = slug || name.toLowerCase().replace(/\s+/g, "-");
    return [{ name: name || tagNameFromSlug(normalizedSlug), slug: normalizedSlug } satisfies Tag];
  });
}

function postFromDocument(data: PostFrontmatter, content?: string): PostIndex {
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    featured_image: data.featured_image,
    type: data.type,
    reading_time: data.reading_time,
    view_count: data.view_count,
    published_at: data.published_at,
    author: data.author,
    category: data.category,
    tags: normalizeTags(data.tags),
    comments_count: data.comments_count ?? data.comments?.length ?? 0,
  } satisfies PostIndex;
}

function collectPostsFromCollection(collection: string): PostIndex[] {
  // Use recursive reading to handle category subdirectories
  const relativePaths = listMdxRelativePaths(collection);
  if (relativePaths.length === 0) return [];

  return relativePaths
    .map((relPath) => {
      const document = readMdxDocumentByRelativePath<PostFrontmatter>(collection, relPath);
      if (!document) return null;
      return postFromDocument(document.data);
    })
    .filter((post): post is PostIndex => post !== null);
}

function getAllPostsFromMdx(locale: Locale = DEFAULT_LOCALE): PostIndex[] {
  return sortByPublishedDate(collectPostsFromCollection(localizedCollection("blog", locale)));
}

function getPostFromMdx(slug: string, locale: Locale = DEFAULT_LOCALE): Post | null {
  const collection = localizedCollection("blog", locale);
  for (const relPath of listMdxRelativePaths(collection)) {
    const document = readMdxDocumentByRelativePath<PostFrontmatter>(collection, relPath);
    if (!document) continue;
    if (document.data.slug === slug) {
      return {
        ...document.data,
        comments: document.data.comments ?? [],
        content: renderMdxBodyToHtml(document.content),
      } satisfies Post;
    }
  }
  return null;
}


function getAllSeriesFromMdx(locale: Locale = DEFAULT_LOCALE): SeriesIndex[] {
  const slugMap = getSeriesSlugMap(locale);
  const series = [...slugMap.entries()]
    .map(([slug, compoundSlug]) => {
      const document = readMdxDocument<SeriesFrontmatter>(
        localizedCollection("series", locale),
        compoundSlug
      );
      if (!document) return null;

      const data = document.data;
      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
        featured_image: data.featured_image,
        level: data.level,
        duration_hours: data.duration_hours,
        lesson_count: data.lesson_count,
        price: data.price,
        is_free: data.is_free,
        view_count: data.view_count,
        average_rating: data.average_rating,
        review_count: data.review_count,
        enrollment_count: data.enrollment_count,
        published_at: data.published_at,
        author: data.author,
        category: data.category,
        tags: normalizeTags(data.tags),
      } satisfies SeriesIndex;
    })
    .filter((item): item is SeriesIndex => item !== null);

  return sortByPublishedDate(series);
}

function getSeriesFromMdx(slug: string, locale: Locale = DEFAULT_LOCALE): Series | null {
  const document = readMdxDocument<SeriesFrontmatter>(
    localizedCollection("series", locale),
    resolveSeriesCompoundSlug(slug, locale)
  );
  if (!document) return null;

  return normalizeSeries({
    ...document.data,
    content: renderMdxBodyToHtml(document.content),
  } satisfies Series, locale);
}

function createFallbackSections(series: Series): Section[] {
  const totalLessons = Math.max(series.lesson_count || 0, series.content ? 1 : 0);
  if (totalLessons <= 0) return [];

  const totalMinutes = Math.max(0, Math.round((series.duration_hours || 0) * 60));
  const durationPerLesson = totalMinutes > 0 ? Math.max(5, Math.round(totalMinutes / totalLessons)) : null;

  const lessons: LessonSummary[] = Array.from({ length: totalLessons }, (_, idx) => {
    const number = idx + 1;
    return {
      id: `${series.id}-lesson-${number}`,
      title: number === 1 ? "Bai 1: Tong quan khoa hoc" : `Bai ${number}`,
      slug: number === 1 ? "tong-quan" : `bai-${number}`,
      description: number === 1 ? (series.description || "Tong quan khoa hoc") : `Noi dung bai ${number} cua series ${series.title}.`,
      duration_minutes: durationPerLesson,
      is_free: series.is_free,
      sort_order: idx,
      video_url: null,
    };
  });

  return [
    {
      id: `${series.id}-section-1`,
      title: "Lo trinh bai hoc",
      description: "Danh sach bai hoc tu dong tao tu du lieu series.",
      sort_order: 0,
      lessons,
    },
  ];
}

function normalizeSeries(series: Series, locale: Locale = DEFAULT_LOCALE): Series {
  // Try to build sections from actual lesson files on disk
  const fileSections = buildSectionsFromLessonFiles(series.slug, locale);
  if (fileSections && fileSections.length > 0) {
    return { ...series, sections: fileSections };
  }

  // Fall back to frontmatter sections if present
  if (series.sections.length > 0) return series;

  // Last resort: generate placeholder sections from lesson_count
  return {
    ...series,
    sections: createFallbackSections(series),
  };
}

// Static content pages (content/pages/*.md)
export function getStaticPage(
  slug: string,
  locale: Locale = DEFAULT_LOCALE
): { title: string; content: string } | null {
  type PageFrontmatter = { title: string; slug?: string };
  const doc = readMdxDocument<PageFrontmatter>(localizedCollection("pages", locale), slug);
  if (!doc) return null;
  return {
    title: doc.data.title,
    content: renderMdxBodyToHtml(doc.content),
  };
}

export interface ContentLanguageLink {
  locale: Locale;
  href: string;
  title?: string;
  available: boolean;
}

function unavailableLanguageLink(locale: Locale): ContentLanguageLink {
  return {
    locale,
    href: localizedPath(locale, "/"),
    available: false,
  };
}

export function getPostLanguageLinks(post: Post | PostIndex): ContentLanguageLink[] {
  return LOCALES.map((locale) => {
    const localizedPost =
      getAllPosts(locale).find((item) => item.id === post.id) ??
      getAllPosts(locale).find((item) => item.slug === post.slug);

    if (!localizedPost) return unavailableLanguageLink(locale);

    return {
      locale,
      href: localizedPath(locale, `/blog/${localizedPost.slug}/`),
      title: localizedPost.title,
      available: true,
    };
  });
}

export function getSeriesLanguageLinks(series: Series | SeriesIndex): ContentLanguageLink[] {
  return LOCALES.map((locale) => {
    const localizedSeries =
      getAllSeries(locale).find((item) => item.id === series.id) ??
      getAllSeries(locale).find((item) => item.slug === series.slug);

    if (!localizedSeries) return unavailableLanguageLink(locale);

    return {
      locale,
      href: localizedPath(
        locale,
        `/series/${localizedSeries.category?.slug || "uncategorized"}/${localizedSeries.slug}/`
      ),
      title: localizedSeries.title,
      available: true,
    };
  });
}

export function getLessonLanguageLinks(series: Series, lesson: Lesson): ContentLanguageLink[] {
  return LOCALES.map((locale) => {
    const localizedSeriesIndex =
      getAllSeries(locale).find((item) => item.id === series.id) ??
      getAllSeries(locale).find((item) => item.slug === series.slug);

    if (!localizedSeriesIndex) return unavailableLanguageLink(locale);

    const localizedSeries = getSeries(localizedSeriesIndex.slug, locale);
    if (!localizedSeries) return unavailableLanguageLink(locale);

    const localizedLesson = localizedSeries.sections
      .flatMap((section) => section.lessons)
      .find((item) => item.id === lesson.id || item.slug === lesson.slug);

    if (!localizedLesson) return unavailableLanguageLink(locale);

    return {
      locale,
      href: localizedPath(locale, `/lessons/${localizedSeries.slug}/${localizedLesson.slug}/`),
      title: localizedLesson.title,
      available: true,
    };
  });
}

export function getStaticPageLanguageLinks(slug: string): ContentLanguageLink[] {
  return LOCALES.map((locale) => {
    const page = getStaticPage(slug, locale);
    if (!page) return unavailableLanguageLink(locale);

    return {
      locale,
      href: localizedPath(locale, `/pages/${slug}/`),
      title: page.title,
      available: true,
    };
  });
}

// Settings
export function getSettings(): Settings {
  return readJSON<Settings>("settings.json");
}

// Categories
export function getCategories(): Category[] {
  return readJSON<Category[]>("categories.json");
}

// Quizzes (data/quizzes/{slug}.json)
function readAllQuizFiles(): Quiz[] {
  const quizzesDir = path.join(dataDir, "quizzes");
  if (!fs.existsSync(quizzesDir)) return [];
  return fs
    .readdirSync(quizzesDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(quizzesDir, f), "utf-8")) as Quiz);
}

export function getAllQuizzes(): QuizIndex[] {
  return readAllQuizFiles().map(({ questions, ...rest }) => rest);
}

export function getQuiz(slug: string): Quiz | null {
  const filePath = path.join(dataDir, "quizzes", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as Quiz;
}

export function getQuizSlugs(): string[] {
  return readAllQuizFiles().map((q) => q.slug);
}

export function getBlogCategories(): Category[] {
  return getCategories().filter((c) => c.type === "blog");
}

export function getCourseCategories(): Category[] {
  return getCategories().filter((c) => c.type === "course");
}

// Tags
export function getTags(): Tag[] {
  return readJSON<Tag[]>("tags.json");
}

export function getAuthors(): Author[] {
  return readJSON<Author[]>("authors.json").map((author) => ({
    ...author,
    avatar: author.avatar
      ? author.avatar.startsWith("/")
        ? author.avatar
        : `/${author.avatar}`
      : null,
  }));
}

export function getAuthorById(id?: string): Author {
  const authors = getAuthors();
  if (authors.length === 0) {
    return {
      id: "unknown",
      name: "xDev Author",
      avatar: null,
      bio: null,
    };
  }
  if (!id) return authors[0];
  return authors.find((author) => author.id === id) ?? authors[0];
}

// Posts (content/blog/)
export function getAllPosts(locale: Locale = DEFAULT_LOCALE): PostIndex[] {
  return getAllPostsFromMdx(locale);
}

export function getPost(slug: string, locale: Locale = DEFAULT_LOCALE): Post | null {
  return getPostFromMdx(slug, locale);
}

export function getPostSlugs(locale: Locale = DEFAULT_LOCALE): string[] {
  return getAllPosts(locale).map((p) => p.slug);
}

// Series (content/series/)
export function getAllSeries(locale: Locale = DEFAULT_LOCALE): SeriesIndex[] {
  return getAllSeriesFromMdx(locale);
}

export function getSeries(slug: string, locale: Locale = DEFAULT_LOCALE): Series | null {
  return getSeriesFromMdx(slug, locale);
}

export function getSeriesSlugs(locale: Locale = DEFAULT_LOCALE): string[] {
  return getAllSeries(locale).map((item) => item.slug);
}

export function getSeriesSlugsWithCategory(
  locale: Locale = DEFAULT_LOCALE
): { category: string; slug: string }[] {
  return getAllSeries(locale).map((item) => ({
    category: item.category?.slug || "uncategorized",
    slug: item.slug,
  }));
}

export interface SeriesCategory {
  slug: string;
  name: string;
}

export function getSeriesCategories(locale: Locale = DEFAULT_LOCALE): SeriesCategory[] {
  const seriesItems = getAllSeries(locale);
  const map = new Map<string, string>();
  for (const s of seriesItems) {
    if (s.category?.slug) {
      map.set(s.category.slug, s.category.name);
    }
  }
  return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
}

export function getSeriesByCategory(
  categorySlug: string,
  locale: Locale = DEFAULT_LOCALE
): SeriesIndex[] {
  return getAllSeries(locale).filter((s) => s.category?.slug === categorySlug);
}

// Lessons
export function getLesson(
  seriesSlug: string,
  lessonSlug: string,
  locale: Locale = DEFAULT_LOCALE
): Lesson | null {
  const mdxLesson = getLessonMdxDocument(seriesSlug, lessonSlug, locale);
  if (mdxLesson) {
    const frontmatter = mdxLesson.data;
    const course = frontmatter.course ?? {
      id: frontmatter.course_id ?? "",
      title: frontmatter.course_title ?? "",
      slug: frontmatter.course_slug ?? seriesSlug,
    };

    return {
      id: frontmatter.id,
      title: frontmatter.title,
      slug: frontmatter.slug,
      description: frontmatter.description,
      content: renderMdxBodyToHtml(mdxLesson.content),
      duration_minutes: frontmatter.duration_minutes,
      is_free: frontmatter.is_free,
      video_url: frontmatter.video_url,
      sort_order: frontmatter.sort_order,
      section_title: frontmatter.section_title,
      course,
    } satisfies Lesson;
  }

  const filePath = `lessons/${seriesSlug}/${lessonSlug}.json`;
  if (fileExists(filePath)) {
    return readJSON<Lesson>(filePath);
  }

  const series = getSeries(seriesSlug, locale);
  if (!series) return null;

  for (const section of series.sections) {
    const lesson = section.lessons.find((l) => l.slug === lessonSlug);
    if (!lesson) continue;

    const generatedContent =
      lesson.slug === "tong-quan" && series.content
        ? series.content
          : `<h2>${lesson.title}</h2><p>Noi dung bai hoc dang duoc cap nhat. Trong thoi gian cho doi, ban co the tham khao trang series de theo lo trinh day du.</p><p><a href=\"/series/${series.category?.slug || "uncategorized"}/${series.slug}/\">Mo trang series</a></p>`;

    return {
      id: lesson.id,
      title: lesson.title,
      slug: lesson.slug,
      description: lesson.description,
      content: generatedContent,
      duration_minutes: lesson.duration_minutes,
      is_free: lesson.is_free,
      video_url: lesson.video_url,
      sort_order: lesson.sort_order,
      section_title: section.title,
      course: {
        id: series.id,
        title: series.title,
        slug: series.slug,
      },
    };
  }

  return null;
}

export function getSeriesLessonSlugs(
  locale: Locale = DEFAULT_LOCALE
): { seriesSlug: string; lessonSlug: string }[] {
  const seriesItems = getAllSeries(locale);
  const slugs: { seriesSlug: string; lessonSlug: string }[] = [];

  for (const series of seriesItems) {
    const compoundSlug = resolveSeriesCompoundSlug(series.slug, locale);
    const seriesCollection = localizedCollection(`series/${compoundSlug}`, locale);
    const mdxLessonPaths = listMdxRelativePaths(seriesCollection)
      .filter((relativePath) => relativePath.includes("/lessons/") && !relativePath.endsWith("/index"));
    if (mdxLessonPaths.length > 0) {
      const uniqueSlugs = new Set<string>();
      for (const lessonPath of mdxLessonPaths) {
        const mdxLesson = readMdxDocumentByRelativePath<LessonFrontmatter>(
          seriesCollection,
          lessonPath
        );
        if (!mdxLesson) continue;

        const lessonSlug = mdxLesson.data.slug || normalizeLessonSlugFromPath(lessonPath) || "";
        if (!lessonSlug) continue;
        uniqueSlugs.add(lessonSlug);
      }

      for (const lessonSlug of uniqueSlugs) {
        slugs.push({ seriesSlug: series.slug, lessonSlug });
      }
      continue;
    }

    const fullSeries = getSeries(series.slug, locale);
    if (!fullSeries) continue;
    for (const section of fullSeries.sections) {
      for (const lesson of section.lessons) {
        slugs.push({ seriesSlug: series.slug, lessonSlug: lesson.slug });
      }
    }
  }
  return slugs;
}

// Topics – driven by categories.json, enriched with actual post counts
export interface Topic {
  slug: string;
  name: string;
  icon: string;
  description: string;
  postCount: number;
}

export function getAvailableTopics(locale: Locale = DEFAULT_LOCALE): Topic[] {
  const categories = getCategories().filter((c) => c.type === "blog");
  const posts = getAllPosts(locale);

  // Count posts per category slug
  const countMap = new Map<string, number>();
  const nameMap = new Map<string, string>();
  for (const post of posts) {
    if (post.category) {
      countMap.set(post.category.slug, (countMap.get(post.category.slug) || 0) + 1);
      nameMap.set(post.category.slug, post.category.name);
    }
  }

  return categories
    .map((cat) => ({
      slug: cat.slug,
      name: locale === DEFAULT_LOCALE ? cat.name : nameMap.get(cat.slug) || cat.name,
      icon: cat.icon || "code",
      description: locale === DEFAULT_LOCALE ? cat.description || "" : "",
      postCount: countMap.get(cat.slug) || 0,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getPostsByTopic(
  topicSlug: string,
  locale: Locale = DEFAULT_LOCALE
): PostIndex[] {
  return getAllPosts(locale).filter((p) => p.category?.slug === topicSlug);
}

export interface TagStats extends Tag {
  postCount: number;
  seriesCount: number;
  totalCount: number;
}

function normalizeTagNameFromSlug(slug: string): string {
  return tagNameFromSlug(slug);
}

export function getTagStats(locale: Locale = DEFAULT_LOCALE): TagStats[] {
  const tagsFromData = getTags();
  const map = new Map<string, TagStats>();

  for (const tag of tagsFromData) {
    map.set(tag.slug, {
      name: tag.name,
      slug: tag.slug,
      postCount: 0,
      seriesCount: 0,
      totalCount: 0,
    });
  }

  for (const post of getAllPosts(locale)) {
    for (const tag of post.tags) {
      const current = map.get(tag.slug) ?? {
        name: tag.name || normalizeTagNameFromSlug(tag.slug),
        slug: tag.slug,
        postCount: 0,
        seriesCount: 0,
        totalCount: 0,
      };
      current.postCount += 1;
      current.totalCount += 1;
      map.set(tag.slug, current);
    }
  }

  for (const series of getAllSeries(locale)) {
    for (const tag of series.tags) {
      const current = map.get(tag.slug) ?? {
        name: tag.name || normalizeTagNameFromSlug(tag.slug),
        slug: tag.slug,
        postCount: 0,
        seriesCount: 0,
        totalCount: 0,
      };
      current.seriesCount += 1;
      current.totalCount += 1;
      map.set(tag.slug, current);
    }
  }

  return Array.from(map.values()).sort((a, b) => {
    if (b.totalCount !== a.totalCount) return b.totalCount - a.totalCount;
    return a.name.localeCompare(b.name, "vi");
  });
}

export function getTagBySlug(slug: string, locale: Locale = DEFAULT_LOCALE): TagStats | null {
  return getTagStats(locale).find((tag) => tag.slug === slug) ?? null;
}

export function getPostsByTag(
  tagSlug: string,
  locale: Locale = DEFAULT_LOCALE
): PostIndex[] {
  return getAllPosts(locale).filter((post) => post.tags.some((tag) => tag.slug === tagSlug));
}

export function getSeriesByTag(
  tagSlug: string,
  locale: Locale = DEFAULT_LOCALE
): SeriesIndex[] {
  return getAllSeries(locale).filter((series) => series.tags.some((tag) => tag.slug === tagSlug));
}

export function getActiveTagSlugs(locale: Locale = DEFAULT_LOCALE): string[] {
  return getTagStats(locale)
    .filter((tag) => tag.totalCount > 0)
    .map((tag) => tag.slug);
}

// Search index
export interface SearchItem {
  type: "post" | "series";
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  url: string;
}

export function buildSearchIndex(locale: Locale = DEFAULT_LOCALE): SearchItem[] {
  const items: SearchItem[] = [];
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

  for (const post of getAllPosts(locale)) {
    items.push({
      type: "post",
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      category: post.category?.name || "",
      tags: post.tags.map((t) => t.name),
      url: `${prefix}/blog/${post.slug}/`,
    });
  }

  for (const series of getAllSeries(locale)) {
    items.push({
      type: "series",
      title: series.title,
      slug: series.slug,
      excerpt: series.description || "",
      category: series.category?.name || "",
      tags: series.tags.map((t) => t.name),
      url: `${prefix}/series/${series.category?.slug || "uncategorized"}/${series.slug}/`,
    });
  }

  return items;
}

// Reviews
export function getAllReviews(): Review[] {
  return readJSON<Review[]>("reviews.json");
}

// Helpers
export function formatDate(dateStr: string | null, locale: Locale = DEFAULT_LOCALE): string {
  if (!dateStr) return "";
  const dateLocale: Record<Locale, string> = {
    vi: "vi-VN",
    en: "en-US",
    ja: "ja-JP",
    "zh-tw": "zh-TW",
  };
  return new Date(dateStr).toLocaleDateString(dateLocale[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDuration(minutes: number | null): string {
  if (!minutes) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} phút`;
  if (m === 0) return `${h} giờ`;
  return `${h} giờ ${m} phút`;
}
