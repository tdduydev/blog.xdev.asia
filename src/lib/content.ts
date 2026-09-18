import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

const contentRoot = path.join(process.cwd(), "content");
const legacyContentHosts = [
  "https://x-lms.test",
  "http://x-lms.test",
  "https://xdev.asia",
  "http://xdev.asia",
  "https://blog.xdev.asia",
  "http://blog.xdev.asia",
];
const collectionDirs: Record<string, string> = {
  blog: path.join(contentRoot, "blog"),
  series: path.join(contentRoot, "series"),
  pages: path.join(contentRoot, "pages"),
  "en/blog": path.join(contentRoot, "en", "blog"),
  "en/series": path.join(contentRoot, "en", "series"),
  "en/pages": path.join(contentRoot, "en", "pages"),
  "ja/blog": path.join(contentRoot, "ja", "blog"),
  "ja/series": path.join(contentRoot, "ja", "series"),
  "ja/pages": path.join(contentRoot, "ja", "pages"),
  "zh-tw/blog": path.join(contentRoot, "zh-tw", "blog"),
  "zh-tw/series": path.join(contentRoot, "zh-tw", "series"),
  "zh-tw/pages": path.join(contentRoot, "zh-tw", "pages"),
};

type CollectionIndex = {
  slugToRelativePath: Map<string, string>;
  slugToFilePath: Map<string, string>;
  relativePaths: string[];
  relativePathSet: Set<string>;
  relativePathToFilePath: Map<string, string>;
};

type MdxFileEntry = {
  relativePath: string;
  filePath: string;
};

const collectionIndexCache = new Map<string, CollectionIndex>();

function getDirectCollectionDir(collection: string): string | null {
  return collectionDirs[collection] ?? null;
}

function parseDerivedSeriesCollection(collection: string): {
  baseCollection: string;
  nestedPath: string;
} | null {
  const baseSeriesMatch = /^series\/(.+)$/.exec(collection);
  if (baseSeriesMatch) {
    return {
      baseCollection: "series",
      nestedPath: baseSeriesMatch[1],
    };
  }

  const localizedSeriesMatch = /^(en|ja|zh-tw)\/series\/(.+)$/.exec(collection);
  if (localizedSeriesMatch) {
    return {
      baseCollection: `${localizedSeriesMatch[1]}/series`,
      nestedPath: localizedSeriesMatch[2],
    };
  }

  return null;
}

function buildSlugMap(
  relativePaths: string[],
  relativePathToFilePath: Map<string, string>
): { slugToRelativePath: Map<string, string>; slugToFilePath: Map<string, string> } {
  const slugToRelativePath = new Map<string, string>();
  const slugToFilePath = new Map<string, string>();

  for (const relativePath of relativePaths) {
    const filePath = relativePathToFilePath.get(relativePath);
    if (!filePath) continue;

    if (!relativePath.includes("/")) {
      slugToRelativePath.set(relativePath, relativePath);
      slugToFilePath.set(relativePath, filePath);
      continue;
    }

    if (relativePath.endsWith("/index")) {
      const compoundSlug = relativePath.slice(0, -"/index".length);
      const leafSlug = compoundSlug.split("/").at(-1);

      // Register the compound slug (e.g. "architecture/omop-cdm-...") so that
      // callers using nested directory paths can resolve the correct file.
      slugToRelativePath.set(compoundSlug, relativePath);
      slugToFilePath.set(compoundSlug, filePath);

      // Also register the leaf-only slug for backwards compatibility with code
      // that resolves series by their bare slug. Avoid clobbering an existing
      // entry that already maps to the same compound key.
      if (leafSlug && leafSlug !== compoundSlug && !slugToRelativePath.has(leafSlug)) {
        slugToRelativePath.set(leafSlug, relativePath);
        slugToFilePath.set(leafSlug, filePath);
      }
    }
  }

  return { slugToRelativePath, slugToFilePath };
}

function walkDirectoryForMdx(rootDir: string, currentDir = rootDir): MdxFileEntry[] {
  if (!fs.existsSync(currentDir)) return [];

  const entries = fs.readdirSync(currentDir, { withFileTypes: true });
  const mdxFiles: MdxFileEntry[] = [];

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      mdxFiles.push(...walkDirectoryForMdx(rootDir, fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      const relativePath = path.relative(rootDir, fullPath).replace(/\\/g, "/").replace(/\.md$/, "");
      mdxFiles.push({ relativePath, filePath: fullPath });
    }
  }

  return mdxFiles;
}

function buildCollectionIndex(collection: string): CollectionIndex {
  const directCollectionDir = getDirectCollectionDir(collection);
  if (directCollectionDir) {
    const mdxEntries = walkDirectoryForMdx(directCollectionDir).sort((a, b) =>
      a.relativePath.localeCompare(b.relativePath)
    );
    const relativePaths = mdxEntries.map((entry) => entry.relativePath);
    const relativePathToFilePath = new Map<string, string>();

    for (const entry of mdxEntries) {
      relativePathToFilePath.set(entry.relativePath, entry.filePath);
    }

    const { slugToRelativePath, slugToFilePath } = buildSlugMap(relativePaths, relativePathToFilePath);

    return {
      slugToRelativePath,
      slugToFilePath,
      relativePaths,
      relativePathSet: new Set(relativePaths),
      relativePathToFilePath,
    };
  }

  const derivedSeriesCollection = parseDerivedSeriesCollection(collection);
  if (!derivedSeriesCollection) {
    return {
      slugToRelativePath: new Map<string, string>(),
      slugToFilePath: new Map<string, string>(),
      relativePaths: [],
      relativePathSet: new Set<string>(),
      relativePathToFilePath: new Map<string, string>(),
    };
  }

  const baseIndex = getCollectionIndex(derivedSeriesCollection.baseCollection);
  const normalizedNestedPath = `${derivedSeriesCollection.nestedPath.replace(/\/+$/, "")}/`;
  const relativePaths = baseIndex.relativePaths
    .filter((relativePath) => relativePath.startsWith(normalizedNestedPath))
    .map((relativePath) => relativePath.slice(normalizedNestedPath.length))
    .sort();
  const relativePathToFilePath = new Map<string, string>();

  for (const relativePath of relativePaths) {
    const fullPath = baseIndex.relativePathToFilePath.get(`${normalizedNestedPath}${relativePath}`);
    if (fullPath) {
      relativePathToFilePath.set(relativePath, fullPath);
    }
  }

  const { slugToRelativePath, slugToFilePath } = buildSlugMap(relativePaths, relativePathToFilePath);

  return {
    slugToRelativePath,
    slugToFilePath,
    relativePaths,
    relativePathSet: new Set(relativePaths),
    relativePathToFilePath,
  };
}

function getCollectionIndex(collection: string): CollectionIndex {
  const cached = collectionIndexCache.get(collection);
  if (cached) return cached;

  const index = buildCollectionIndex(collection);
  collectionIndexCache.set(collection, index);
  return index;
}

export function listMdxSlugs(collection: string): string[] {
  return [...getCollectionIndex(collection).slugToRelativePath.keys()].sort();
}

export function readMdxDocument<T>(collection: string, slug: string): { data: T; content: string } | null {
  const filePath = getCollectionIndex(collection).slugToFilePath.get(slug);
  if (!filePath) return null;

  const source = fs.readFileSync(filePath, "utf-8");
  const document = matter(source);
  return {
    data: document.data as T,
    content: document.content,
  };
}

export function listMdxRelativePaths(collection: string): string[] {
  return [...getCollectionIndex(collection).relativePaths];
}

export function readMdxDocumentByRelativePath<T>(collection: string, relativePath: string): { data: T; content: string } | null {
  const index = getCollectionIndex(collection);
  const filePath = index.relativePathToFilePath.get(relativePath);
  if (!filePath) return null;

  const source = fs.readFileSync(filePath, "utf-8");
  const document = matter(source);
  return {
    data: document.data as T,
    content: document.content,
  };
}

export function renderMdxBodyToHtml(source: string): string {
  const normalizedSource = source.trim();
  if (!normalizedSource) return "";

  const html = String(
    unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .processSync(normalizedSource)
  );

  return legacyContentHosts.reduce((result, host) => {
    return result.replaceAll(`${host}/storage/`, "/storage/");
  }, html);
}