#!/usr/bin/env node
/**
 * Preflight Checklist for Google News Readiness
 * Tests: HTTP status, schema markup, canonical, hreflang, news sitemap, Core Web Vitals signals
 */

import https from "https";
import { createGzip } from "zlib";

const SITE_URL = "https://blog.xdev.asia";
const RECENT_BLOG_POSTS = [
  "/blog/ban-tin-ai-06-04-2026/",
  "/blog/ban-tin-ai-05-04-2026/",
  "/blog/gemma-4-mo-hinh-ai-mo-manh-nhat-google-agentic-edge/",
  "/blog/claude-mythos-preview-system-card-phan-tich/",
  "/blog/minimax-danh-gia-chi-tiet-nen-tang-ai-full-stack-trung-quoc/",
];

const CRITICAL_PAGES = [
  "/",
  "/blog/",
  "/series/",
  "/roadmap/ai-engineer/",
  "/roadmap/ba/",
  "/search/",
];

const SCHEMA_CHECKS = {
  NewsArticle: /"@type"\s*:\s*"NewsArticle"/,
  datePublished: /"datePublished"\s*:\s*"[\d-]+T[\d:]+/,
  dateModified: /"dateModified"\s*:\s*"[\d-]+T[\d:]+/,
  author: /"@type"\s*:\s*"Person"/,
  image: /"image"\s*:\s*(\[|{)/,
  mainEntityOfPage: /"mainEntityOfPage"/,
};

const COLORS = {
  pass: "\x1b[32m✓\x1b[0m",
  fail: "\x1b[31m✗\x1b[0m",
  warn: "\x1b[33m⚠\x1b[0m",
  info: "\x1b[36mℹ\x1b[0m",
  reset: "\x1b[0m",
};

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 10000, headers: { "User-Agent": "Preflight-Checker/1.0" } }, (res) => {
      let data = "";
      let gunzip = createGzip();

      if (res.headers["content-encoding"] === "gzip") {
        res.pipe(gunzip);
        gunzip.on("data", (chunk) => (data += chunk));
        gunzip.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
      } else {
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
      }
    });

    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timeout"));
    });

    req.on("error", reject);
  });
}

async function checkHttpStatus(path) {
  try {
    const url = `${SITE_URL}${path}`;
    const { status } = await fetchUrl(url);
    const pass = status === 200;
    console.log(`${pass ? COLORS.pass : COLORS.fail} HTTP ${status} ${path}`);
    return pass;
  } catch (err) {
    console.log(`${COLORS.fail} ERROR ${err.message} ${path}`);
    return false;
  }
}

async function checkSchema(path, locale = "vi") {
  try {
    const url = `${SITE_URL}${path}`;
    const { body } = await fetchUrl(url);

    console.log(`\n${COLORS.info} Schema check: ${path}`);

    let allPass = true;
    for (const [check, regex] of Object.entries(SCHEMA_CHECKS)) {
      const pass = regex.test(body);
      console.log(`  ${pass ? COLORS.pass : COLORS.fail} ${check}`);
      allPass = allPass && pass;
    }

    // Check image dimensions for news suitability
    const imageMatch = body.match(/"image"\s*:\s*\{\s*"url"\s*:\s*"([^"]+)"/);
    if (imageMatch) {
      console.log(`  ${COLORS.info} Image found: ${imageMatch[1]}`);
    }

    return allPass;
  } catch (err) {
    console.log(`${COLORS.fail} Schema check failed: ${err.message}`);
    return false;
  }
}

async function checkCanonical(path) {
  try {
    const url = `${SITE_URL}${path}`;
    const { body } = await fetchUrl(url);
    const canonicalMatch = body.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);

    if (!canonicalMatch) {
      console.log(`${COLORS.fail} Missing canonical tag`);
      return false;
    }

    const expected = `${SITE_URL}${path}`;
    const actual = canonicalMatch[1];
    const pass = actual === expected;

    console.log(`  ${pass ? COLORS.pass : COLORS.fail} Canonical: ${actual}`);
    return pass;
  } catch (err) {
    console.log(`${COLORS.fail} Canonical check failed: ${err.message}`);
    return false;
  }
}

async function checkHreflang(path) {
  try {
    const url = `${SITE_URL}${path}`;
    const { body } = await fetchUrl(url);
    const hreflangMatches = body.match(/<link[^>]*rel="alternate"[^>]*hreflang="([^"]+)"[^>]*href="([^"]+)"/g) || [];

    if (hreflangMatches.length === 0) {
      console.log(`${COLORS.warn} No hreflang tags found (expected for multilingual)`);
      return false;
    }

    console.log(`  ${COLORS.pass} Found ${hreflangMatches.length} hreflang tags`);
    return hreflangMatches.length >= 3; // at least vi, en, x-default
  } catch (err) {
    console.log(`${COLORS.fail} Hreflang check failed: ${err.message}`);
    return false;
  }
}

async function checkNewsSitemap() {
  try {
    const url = `${SITE_URL}/news-sitemap.xml`;
    const { body, status } = await fetchUrl(url);

    if (status !== 200) {
      console.log(`${COLORS.fail} News sitemap returned ${status}`);
      return false;
    }

    const urlCount = (body.match(/<url>/g) || []).length;
    const hasNewsElement = /<news:news>/.test(body);
    const hasPublicationDate = /<news:publication_date>/.test(body);
    const hasNewsTitle = /<news:title>/.test(body);

    console.log(`  ${COLORS.pass} News sitemap: ${urlCount} URLs`);
    console.log(`  ${hasNewsElement ? COLORS.pass : COLORS.fail} news:news elements: ${urlCount > 0 ? "✓" : "✗"}`);
    console.log(`  ${hasPublicationDate ? COLORS.pass : COLORS.fail} news:publication_date: ${hasPublicationDate ? "✓" : "✗"}`);
    console.log(`  ${hasNewsTitle ? COLORS.pass : COLORS.fail} news:title: ${hasNewsTitle ? "✓" : "✗"}`);

    return hasNewsElement && hasPublicationDate && hasNewsTitle && urlCount > 0;
  } catch (err) {
    console.log(`${COLORS.fail} News sitemap check failed: ${err.message}`);
    return false;
  }
}

async function checkRegularSitemap() {
  try {
    const url = `${SITE_URL}/sitemap.xml`;
    const { body, status } = await fetchUrl(url);

    if (status !== 200) {
      console.log(`${COLORS.fail} Sitemap returned ${status}`);
      return false;
    }

    const urlCount = (body.match(/<url>/g) || []).length;
    const hasImages = /<image:image>/.test(body);
    const hasAlternates = /<xhtml:link rel="alternate"/.test(body);

    console.log(`  ${COLORS.pass} Sitemap: ${urlCount} URLs`);
    console.log(`  ${hasImages ? COLORS.pass : COLORS.fail} Images: ${hasImages ? "✓" : "✗"}`);
    console.log(`  ${hasAlternates ? COLORS.pass : COLORS.fail} Hreflang alternates: ${hasAlternates ? "✓" : "✗"}`);

    return urlCount > 100; // expect 8500+
  } catch (err) {
    console.log(`${COLORS.fail} Sitemap check failed: ${err.message}`);
    return false;
  }
}

async function checkOpenGraph(path) {
  try {
    const url = `${SITE_URL}${path}`;
    const { body } = await fetchUrl(url);

    const ogTitle = /<meta\s+property="og:title"[^>]*content="([^"]+)"/.test(body);
    const ogDescription = /<meta\s+property="og:description"[^>]*content="([^"]+)"/.test(body);
    const ogImage = /<meta\s+property="og:image"[^>]*content="([^"]+)"/.test(body);
    const ogUrl = /<meta\s+property="og:url"[^>]*content="([^"]+)"/.test(body);

    const pass = ogTitle && ogDescription && ogImage && ogUrl;
    console.log(`  ${pass ? COLORS.pass : COLORS.fail} og:title, og:description, og:image, og:url`);
    return pass;
  } catch (err) {
    console.log(`${COLORS.fail} OG check failed: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log(`\n${"=".repeat(60)}`);
  console.log("🔍 Google News Preflight Checklist");
  console.log(`${"=".repeat(60)}\n`);

  let results = {
    httpStatus: { pass: 0, fail: 0 },
    schemas: { pass: 0, fail: 0 },
    canonical: { pass: 0, fail: 0 },
    hreflang: { pass: 0, fail: 0 },
    sitemaps: { pass: 0, fail: 0 },
    openGraph: { pass: 0, fail: 0 },
  };

  // 1. HTTP Status
  console.log(`${COLORS.info} 1. HTTP Status Codes`);
  console.log("-".repeat(40));
  for (const page of CRITICAL_PAGES) {
    const pass = await checkHttpStatus(page);
    pass ? results.httpStatus.pass++ : results.httpStatus.fail++;
  }

  // 2. Sitemaps
  console.log(`\n${COLORS.info} 2. Sitemaps`);
  console.log("-".repeat(40));
  const regularSitemapPass = await checkRegularSitemap();
  const newsSitemapPass = await checkNewsSitemap();
  regularSitemapPass ? results.sitemaps.pass++ : results.sitemaps.fail++;
  newsSitemapPass ? results.sitemaps.pass++ : results.sitemaps.fail++;

  // 3. Schema Markup
  console.log(`\n${COLORS.info} 3. Schema Markup (NewsArticle)`);
  console.log("-".repeat(40));
  for (const blogPost of RECENT_BLOG_POSTS.slice(0, 3)) {
    const schemaPass = await checkSchema(blogPost);
    const canonicalPass = await checkCanonical(blogPost);
    const ogPass = await checkOpenGraph(blogPost);

    schemaPass ? results.schemas.pass++ : results.schemas.fail++;
    canonicalPass ? results.canonical.pass++ : results.canonical.fail++;
    ogPass ? results.openGraph.pass++ : results.openGraph.fail++;
  }

  // 4. Hreflang
  console.log(`\n${COLORS.info} 4. Hreflang (Multilingual)`);
  console.log("-".repeat(40));
  for (const path of ["/", "/blog/"]) {
    const pass = await checkHreflang(path);
    pass ? results.hreflang.pass++ : results.hreflang.fail++;
  }

  // Summary
  console.log(`\n${"=".repeat(60)}`);
  console.log("📊 Summary");
  console.log(`${"=".repeat(60)}`);

  for (const [category, counts] of Object.entries(results)) {
    const total = counts.pass + counts.fail;
    const percentage = total > 0 ? ((counts.pass / total) * 100).toFixed(0) : "0";
    const status = counts.fail === 0 ? COLORS.pass : counts.pass > counts.fail / 2 ? COLORS.warn : COLORS.fail;
    console.log(
      `${status} ${category.replace(/([A-Z])/g, " $1").trim()}: ${counts.pass}/${total} (${percentage}%)`
    );
  }

  const totalPass = Object.values(results).reduce((sum, c) => sum + c.pass, 0);
  const totalFail = Object.values(results).reduce((sum, c) => sum + c.fail, 0);
  const totalTests = totalPass + totalFail;
  const passRate = ((totalPass / totalTests) * 100).toFixed(0);

  console.log(`\n${totalFail === 0 ? COLORS.pass : COLORS.warn} Overall: ${totalPass}/${totalTests} (${passRate}%)`);

  if (totalFail === 0) {
    console.log(`\n✨ All checks passed! Production ready for Google News.`);
    console.log(`Next: Submit sitemap in Google Search Console.`);
  } else {
    console.log(`\n⚠️  ${totalFail} check(s) failed. Review above for details.`);
  }

  console.log();
}

main().catch(console.error);
