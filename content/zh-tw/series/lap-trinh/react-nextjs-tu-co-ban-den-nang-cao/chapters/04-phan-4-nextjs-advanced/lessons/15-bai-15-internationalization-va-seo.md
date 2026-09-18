---
id: 019d8b40-d404-7001-b005-reactnx000404
title: 第 15 課：國際化與 SEO
slug: bai-15-internationalization-va-seo
description: >-
  Next.js i18n 路由，next-intl。動態元資料 API。 OpenGraph、Twitter 卡。 JSON-LD
  結構化資料。網站地圖、robots.txt 產生。
duration_minutes: 100
is_free: true
video_url: null
sort_order: 15
section_title: 第 4 部分：Next.js 高級
course:
  id: 019d8b40-d100-7001-b005-reactnx000001
  title: React 和 Next.js：從基礎到高級
  slug: react-nextjs-tu-co-ban-den-nang-cao
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3326" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#121a2b"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3326)"/>

  <!-- Decorations -->
  <g>
    <circle cx="676" cy="198" r="24" fill="#2dd4bf" opacity="0.13"/>
    <circle cx="752" cy="254" r="32" fill="#2dd4bf" opacity="0.11"/>
    <circle cx="828" cy="50" r="10" fill="#2dd4bf" opacity="0.09"/>
    <circle cx="904" cy="106" r="18" fill="#2dd4bf" opacity="0.07"/>
    <circle cx="980" cy="162" r="26" fill="#2dd4bf" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <line x1="600" y1="198" x2="1100" y2="278" stroke="#2dd4bf" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="228" x2="1050" y2="298" stroke="#2dd4bf" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1026.5788383248864,181.5 1026.5788383248864,214.5 998,231 969.4211616751136,214.5 969.4211616751135,181.5 998,165" fill="none" stroke="#2dd4bf" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#2dd4bf"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#2dd4bf" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">💻 程式設計 — 第 15 課</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 15 課：國際化與 SEO</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">React 和 Next.js：從基礎到高級</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 4 部分：Next.js 高級</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

<h2 id="1-i18n-routing"><strong>1.國際化路由</strong></h2>

<pre><code class="language-ts">// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(vi|en)/:path*'],
};
</code></pre>

<pre><code class="language-ts">// i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
});
</code></pre>

<pre><code class="language-ts">// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
</code></pre>

<h2 id="2-translations"><strong>2. 翻譯文件</strong></h2>

<pre><code class="language-json">// messages/vi.json
{
  "HomePage": {
    "title": "Chào mừng đến với website",
    "description": "Nền tảng học lập trình"
  },
  "Navigation": {
    "home": "Trang chủ",
    "blog": "Blog",
    "about": "Giới thiệu"
  }
}
</code></pre>

<pre><code class="language-tsx">// Sử dụng trong component
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    &lt;div&gt;
      &lt;h1&gt;{t('title')}&lt;/h1&gt;
      &lt;p&gt;{t('description')}&lt;/p&gt;
    &lt;/div&gt;
  );
}
</code></pre>

<h2 id="3-metadata"><strong>3. 動態元資料API</strong></h2>

<pre><code class="language-tsx">import type { Metadata } from 'next';

// Static metadata
export const metadata: Metadata = {
  title: 'Trang chủ | xDev',
  description: 'Nền tảng học lập trình',
  openGraph: {
    title: 'xDev',
    description: 'Nền tảng học lập trình',
    images: ['/images/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'xDev',
    description: 'Nền tảng học lập trình',
    images: ['/images/og-image.jpg'],
  },
};

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise&lt;{ slug: string }&gt;;
}): Promise&lt;Metadata&gt; {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
      type: 'article',
      publishedTime: post.createdAt,
      authors: [post.author.name],
    },
  };
}
</code></pre>

<h2 id="4-json-ld"><strong>4. JSON-LD結構化數據</strong></h2>

<pre><code class="language-tsx">export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.createdAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
  };

  return (
    &lt;&gt;
      &lt;script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      /&gt;
      &lt;article&gt;
        &lt;h1&gt;{post.title}&lt;/h1&gt;
      &lt;/article&gt;
    &lt;/&gt;
  );
}
</code></pre>

<h2 id="5-sitemap"><strong>5. 網站地圖和機器人</strong></h2>

<pre><code class="language-ts">// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise&lt;MetadataRoute.Sitemap&gt; {
  const posts = await db.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  return [
    { url: 'https://blog.xdev.asia', lastModified: new Date(), priority: 1 },
    { url: 'https://blog.xdev.asia/blog', lastModified: new Date(), priority: 0.8 },
    ...posts.map(post => ({
      url: `https://blog.xdev.asia/blog/${post.slug}`,
      lastModified: post.updatedAt,
      priority: 0.6,
    })),
  ];
}

// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
    ],
    sitemap: 'https://blog.xdev.asia/sitemap.xml',
  };
}
</code></pre>

<p>下一篇： <strong>文件上傳和圖像優化</strong> — 上傳檔案、下一個/圖像、回應影像。</p>
