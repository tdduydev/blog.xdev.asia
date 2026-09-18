---
id: 019d8b40-h403-7001-b009-vuenuxt000403
title: 'Lesson 15: File Upload, Images & SEO'
slug: bai-15-file-upload-images-va-seo
description: >-
  File upload handling, S3 storage. @nuxt/image, responsive images, lazy
  loading. SEO with useSeoMeta, useHead. Sitemap, OG tags, structured data
  (JSON-LD).
duration_minutes: 100
is_free: true
video_url: null
sort_order: 15
section_title: 'Part 4: Nuxt Advanced & Full-Stack'
course:
  id: 019d8b40-h100-7001-b009-vuenuxt000001
  title: 'Vue.js & Nuxt: From Basics to Advanced'
  slug: vuejs-nuxt-tu-co-ban-den-nang-cao
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-4434" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#121a2b"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-4434)"/>

  <!-- Decorations -->
  <g>
    <circle cx="865" cy="85" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="630" cy="190" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="895" cy="35" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="660" cy="140" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="925" cy="245" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fb923c" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fb923c" opacity="0.15"/>
    <line x1="600" y1="195" x2="1100" y2="275" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="225" x2="1050" y2="295" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="970.9807621135332,130 970.9807621135332,160 945,175 919.0192378864668,160 919.0192378864668,130 945,115" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">💻 Programming — Lesson 15</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 15: File Upload, Images & SEO</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Vue.js & Nuxt: From Basics to Advanced</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 4: Nuxt Advanced & Full-Stack</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

<h2 id="1-upload"><strong>1. File Upload</strong></h2>

<pre><code class="language-ts">// server/api/upload.post.ts
export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event)
  if (!files || files.length === 0) {
    throw createError({ statusCode: 400, message: 'No file uploaded' })
  }

  const file = files[0]
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

  if (!allowedTypes.includes(file.type || '')) {
    throw createError({ statusCode: 400, message: 'Invalid file type' })
  }

  if (file.data.length > 5 * 1024 * 1024) {
    throw createError({ statusCode: 400, message: 'File too large (max 5MB)' })
  }

  const filename = `${Date.now()}-${file.filename}`

  // NuxtHub Blob (Cloudflare R2)
  const blob = await hubBlob().put(filename, file.data, {
    contentType: file.type,
  })

  return { url: blob.pathname }
})
</code></pre>

<h2 id="2-nuxt-image"><strong>2. @nuxt/image</strong></h2>

<pre><code class="language-vue">&lt;template&gt;
  &lt;!-- Basic --&gt;
  &lt;NuxtImg
    src="/images/hero.jpg"
    alt="Hero"
    width="800"
    height="400"
    loading="lazy"
    format="webp"
  /&gt;

  &lt;!-- Responsive sizes --&gt;
  &lt;NuxtImg
    src="/images/banner.jpg"
    sizes="sm:100vw md:50vw lg:400px"
    quality="80"
    placeholder
  /&gt;

  &lt;!-- Picture element with multiple formats --&gt;
  &lt;NuxtPicture
    src="/images/photo.jpg"
    format="avif,webp"
    sizes="sm:100vw md:50vw"
    quality="80"
  /&gt;
&lt;/template&gt;
</code></pre>

<h2 id="3-seo"><strong>3. SEO with useSeoMeta</strong></h2>

<pre><code class="language-vue">&lt;script setup lang="ts"&gt;
// Static SEO
useSeoMeta({
  title: 'Trang chủ | xDev',
  ogTitle: 'xDev - Nền tảng học lập trình',
  description: 'Học lập trình miễn phí với các khóa học chất lượng',
  ogDescription: 'Học lập trình miễn phí',
  ogImage: '/images/og-default.jpg',
  twitterCard: 'summary_large_image',
})
&lt;/script&gt;
</code></pre>

<pre><code class="language-vue">&lt;!-- Dynamic SEO --&gt;
&lt;script setup lang="ts"&gt;
const { data: post } = await useFetch(`/api/posts/${slug}`)

useSeoMeta({
  title: () => post.value?.title,
  ogTitle: () => post.value?.title,
  description: () => post.value?.description,
  ogImage: () => post.value?.image,
  ogType: 'article',
  articlePublishedTime: () => post.value?.createdAt,
})

// useHead for full control
useHead({
  script: [
    {
      type: 'application/ld+json',
      textContent: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.value?.title,
        image: post.value?.image,
        datePublished: post.value?.createdAt,
      }),
    },
  ],
})
&lt;/script&gt;
</code></pre>

<h2 id="4-sitemap"><strong>4. Sitemap Generation</strong></h2>

<pre><code class="language-bash">npx nuxi module add @nuxtjs/sitemap
</code></pre>

<pre><code class="language-ts">// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/sitemap'],
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },
  site: {
    url: 'https://blog.xdev.asia',
  },
})

// server/api/__sitemap__/urls.ts
export default defineSitemapEventHandler(async () => {
  const posts = await db.select({ slug: schema.posts.slug, updatedAt: schema.posts.updatedAt })
    .from(schema.posts)
    .where(eq(schema.posts.published, true))

  return posts.map(post => ({
    loc: `/blog/${post.slug}`,
    lastmod: post.updatedAt,
    priority: 0.7,
  }))
})
</code></pre>

<p>Next article: <strong>Real-time, WebSockets & i18n</strong> — real-time interaction and multilingual.</p>
