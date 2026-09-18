---
id: 019d8a21-c106-7001-d001-e1f2a3b4c506
title: 'Lesson 6: CDN (Content Delivery Network) - Global acceleration'
slug: bai-6-cdn-content-delivery-network-tang-toc-toan-cau
description: >-
  What is a CDN and how does it work? Push CDN vs Pull CDN. Cache Invalidation
  strategies. Multi-tier CDN architecture. Edge Computing. Compare CloudFlare,
  AWS CloudFront, Fastly. Use cases and anti-patterns.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 6
section_title: 'Part 2: Infrastructure Components'
course:
  id: 019d8a21-c100-7001-d001-e1f2a3b4c5d6
  title: 'System Architecture: From Zero to Hero'
  slug: system-architecture-from-zero-to-hero
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-624" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-624)"/>

  <!-- Decorations -->
  <g>
    <circle cx="932" cy="266" r="20" fill="#f87171" opacity="0.11"/>
    <circle cx="764" cy="258" r="26" fill="#f87171" opacity="0.07"/>
    <circle cx="1096" cy="250" r="32" fill="#f87171" opacity="0.13"/>
    <circle cx="928" cy="242" r="8" fill="#f87171" opacity="0.09"/>
    <circle cx="760" cy="234" r="14" fill="#f87171" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <line x1="600" y1="86" x2="1100" y2="166" stroke="#f87171" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="116" x2="1050" y2="186" stroke="#f87171" stroke-width="0.5" opacity="0.08"/>
    <polygon points="971.507041555162,115.5 971.507041555162,156.5 936,177 900.492958444838,156.5 900.492958444838,115.50000000000001 936,95" fill="none" stroke="#f87171" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ Architecture — Lesson 6</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 6: CDN (Content Delivery Network) -</tspan>
      <tspan x="60" dy="42">Global acceleration</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">System Architecture: From Zero to Hero</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 2: Infrastructure Components</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

If the server is located in Singapore, users in Hanoi have to wait ~50ms roundtrip for each request. Users in the US have to wait ~200ms. CDN solves this problem by placing content **as close to the user as possible**.

---

## 1. What is CDN?

CDN is a globally distributed network of proxy servers, serving content from locations closest to users.

```
Không có CDN:
  User (Hà Nội) ──── 200ms ────► Origin Server (US)

Có CDN:
  User (Hà Nội) ──── 10ms ────► CDN Edge (Hà Nội)
                                    │ cache miss
                                    ▼
                              CDN Edge ── 200ms ──► Origin Server (US)
                                    │ cache result
                                    ▼
  User (Hà Nội) ──── 10ms ────► CDN Edge (Hà Nội)  ← Lần sau = 10ms!
```

### 1.1 CDN Architecture

```
                    Origin Server
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
         ┌────────┐ ┌────────┐ ┌────────┐
         │Regional│ │Regional│ │Regional│
         │  PoP   │ │  PoP   │ │  PoP   │
         │ (Asia) │ │  (EU)  │ │ (US)   │
         └───┬────┘ └───┬────┘ └───┬────┘
         ┌───┴───┐  ┌───┴───┐  ┌───┴───┐
         │Edge   │  │Edge   │  │Edge   │
         │Servers│  │Servers│  │Servers│
         └───────┘  └───────┘  └───────┘
             ▲           ▲          ▲
           Users       Users      Users
```

---

## 2. Push CDN vs Pull CDN

### 2.1 Push CDN

```
Origin Server ──push──► CDN Edge
  Khi content thay đổi, origin chủ động push lên CDN

Flow:
  1. Developer deploy new image
  2. CI/CD pipeline push image to CDN
  3. CDN distributes to all edges
  4. User request → Edge server → Return immediately
```

| Advantages | Disadvantages |
|--------|-----------|
| Content is always available | Must manage push process |
| There is no "first request" delay | Consumes storage on all edges |
| Full Control | Complicated when content changes a lot |

**Best for:** Static content with few, small changes

### 2.2 Pull CDN

```
User ──request──► CDN Edge
  Edge: "Tôi không có content này"
  Edge ──request──► Origin Server
  Origin ──response──► Edge
  Edge: cache content + return to user

Lần sau:
  User ──request──► CDN Edge
  Edge: "Tôi có rồi!" → Return from cache
```

| Advantages | Disadvantages |
|--------|-----------|
| Automatic, no management needed | First request is slow (cache miss) |
| Only cache content is requested | Need TTL strategy |
| Easy setup | Cache stampede risk |

**Best for:** Dynamic content, high traffic

---

## 3. Cache Invalidation Strategies

### 3.1 TTL (Time To Live)

```
CDN cache product image với TTL = 1 giờ
  T=0:  User request → Cache MISS → Fetch from origin → Cache 1 giờ
  T=30m: User request → Cache HIT → Return cached
  T=61m: Cache expired → Fetch from origin → Cache lại

Trade-off: TTL ngắn = fresh hơn nhưng nhiều origin hits
           TTL dài = nhanh hơn nhưng content có thể cũ
```

### 3.2 Cache Purge

```
CDN API: DELETE /cache?url=https://blog.xdev.asia/images/logo.png
→ Xóa content khỏi tất cả edge servers

Use case: Cập nhật logo, fix typo trong hình ảnh
```

### 3.3 Cache Busting

```
Thay đổi URL khi content thay đổi:

Trước: /style.css
Sau:   /style.css?v=2
Hoặc:  /style.a1b2c3d4.css (hash trong filename)

→ CDN coi đây là content mới → fetch from origin
```

### 3.4 Stale-While-Revalidate

```
Cache expired, nhưng:
  1. Trả cached content ngay (stale)
  2. Đồng thời fetch fresh content từ origin
  3. Update cache khi origin respond

→ User luôn nhận response nhanh
→ Content cuối cùng sẽ fresh
```

---

## 4. Edge Computing

```
Traditional CDN:
  Edge chỉ serve static files

Edge Computing:
  Edge chạy code (logic) tại edge location

Ví dụ Cloudflare Workers:
  - A/B testing tại edge
  - Geolocation-based redirects
  - Authentication tại edge
  - Image resizing tại edge
  - API response transformation
```

---

## 5. Compare CDN Providers

| Features | CloudFlare | AWS CloudFront | Fastly |
|--------|-----------|-----------|--------|
| **PoPs** | 300+ | 450+ | 90+ |
| **Edge Compute** | Workers | Lambda@Edge | Compute@Edge |
| **Free tier** | Generous | Limited | None |
| **Price** | $ | $$ | $$$ |
| **DDoS protection** | Built-in | AWS Shield | Limited |
| **Best for** | General, small-medium | AWS ecosystem | Performance-critical |

---

## 6. CDN Anti-patterns

| Anti-pattern | Problem | Solution |
|-------------|--------|-----------|
| Cache personalized content | User A sees data User B | Cache-Control: private |
| Too long TTL for API | Data stale | Short TTL + stale-while-revalidate |
| Do not use CDN for API | Slow API in remote | Cache GET APIs at edge |
| CDN for everything | POST/PUT/DELETE via CDN | CDN only for GET requests |

---

## Summary

| Concepts | Key Takeaway |
|--------|-------------|
| CDN | Serve content from the location closest to the user |
| Push vs Pull | Push for static, Pull for dynamic |
| Cache Invalidation | TTL + purge + cache busting |
| Edge Computing | Run logic at the edge, reduce latency |

---

## Exercises

1. **CDN Strategy:** Design CDN strategy for e-commerce site with: product images (few changes), product prices (change frequently), user profile (personalized).

2. **Cache Invalidation:** Blog platform needs to update posts as soon as the author edits. Design cache invalidation strategy.

3. **Cost Estimation:** Website has 10M page views/day, each page is 2MB (500KB HTML + 1.5MB images). Estimated CDN bandwidth/month and cost (CloudFront: $0.085/GB).
