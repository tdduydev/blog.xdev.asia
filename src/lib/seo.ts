import type { Metadata } from "next";
import { LOCALE_HTML_LANG, type Locale } from "@/lib/i18n/config";
import type { Author, Post, PostIndex } from "@/lib/types";
import { getValidImageUrl } from "@/utils/image";
import { SITE_URL } from "@/lib/site";
import { getLocalImageSize } from "./image-size";

export { SITE_URL } from "@/lib/site";
export const SITE_NAME = "xDev Asia";
export const AUTHOR_PROFILE_URL = `${SITE_URL}/gioi-thieu/`;
export const PUBLISHER_LOGO_URL = `${SITE_URL}/images/logo.png`;

const OPEN_GRAPH_LOCALE: Record<Locale, string> = {
  vi: "vi_VN",
  en: "en_US",
  ja: "ja_JP",
  "zh-tw": "zh_TW",
};

export const DISCOVER_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  "max-image-preview": "large",
  "max-snippet": -1,
  "max-video-preview": -1,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  return `${SITE_URL}/${pathOrUrl.replace(/^\/+/, "")}`;
}

export function getPostImageUrl(post: Pick<Post | PostIndex, "featured_image" | "slug">): string {
  return absoluteUrl(getValidImageUrl(post.featured_image ?? null, post.slug));
}

export function jsonLdScriptContent(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildArticleMetadata({
  post,
  locale,
  canonicalUrl,
  languageAlternates,
  xDefaultUrl,
}: {
  post: Post | PostIndex;
  locale: Locale;
  canonicalUrl: string;
  languageAlternates: Record<string, string>;
  xDefaultUrl: string;
}): Metadata {
  const imageUrl = getPostImageUrl(post);
  const description = post.excerpt || post.title;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...languageAlternates,
        "x-default": xDefaultUrl,
      },
    },
    openGraph: {
      title: post.title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: OPEN_GRAPH_LOCALE[locale],
      type: "article",
      ...(post.published_at ? { publishedTime: post.published_at } : {}),
      authors: [post.author.name],
      // Kích thước đọc từ FILE THẬT, không khai cứng: ảnh trên site có nhiều cỡ (1920×1080,
      // 1600×900, 960×720…) nên một con số cố định sai cho gần hết bài, và Facebook dựng khung
      // xem trước lệch tỉ lệ. Đo không được (ảnh ngoài site, SVG, hoặc file thiếu) thì BỎ hẳn
      // width/height — khai số đoán còn tệ hơn không khai.
      images: [
        {
          url: imageUrl,
          ...(getLocalImageSize(post.featured_image ?? "") ?? {}),
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [imageUrl],
    },
    robots: DISCOVER_ROBOTS,
  };
}

export function buildArticleJsonLd({
  post,
  locale,
  canonicalUrl,
  fullAuthor,
}: {
  post: Post;
  locale: Locale;
  canonicalUrl: string;
  fullAuthor?: Author | null;
}) {
  const imageUrl = getPostImageUrl(post);
  const author = fullAuthor || post.author;
  const authorImageUrl = author.avatar
    ? absoluteUrl(getValidImageUrl(author.avatar, author.name))
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt || post.title,
    image: [imageUrl],
    thumbnailUrl: imageUrl,
    datePublished: post.published_at || post.created_at,
    dateModified: post.published_at || post.created_at,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: AUTHOR_PROFILE_URL,
      ...(authorImageUrl ? { image: authorImageUrl } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: PUBLISHER_LOGO_URL,
        width: 956,
        height: 398,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    url: canonicalUrl,
    isAccessibleForFree: true,
    inLanguage: LOCALE_HTML_LANG[locale],
    ...(post.category ? { articleSection: post.category.name } : {}),
    ...(post.tags.length > 0 ? { keywords: post.tags.map((tag) => tag.name).join(", ") } : {}),
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; item: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}
