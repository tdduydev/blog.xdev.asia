---
id: 019e4a33-d411-7b20-c001-b1c2d3e4f511
title: 'Lesson 11: Micro Frontend Integration Strategies — Build-time vs Run-time'
slug: bai-11-micro-frontend-integration-strategies-build-time-vs-run-time
description: >-
  7 strategies to compose Micro Frontend: iframe, Web Components, Build-time
  integration, JavaScript bundles, Module Federation, Server-Side Includes,
  Edge-Side Includes. Compare details and choose the right approach.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 11
section_title: 'Part 4: Micro Frontend — Architecture & Principles'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: Microservices & Micro Frontend system design — From basics to Production
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-2118" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-2118)"/>

  <!-- Decorations -->
  <g>
    <circle cx="655" cy="235" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="710" cy="130" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="765" cy="285" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="820" cy="180" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="875" cy="75" r="8" fill="#fb923c" opacity="0.1"/>
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
    <line x1="600" y1="65" x2="1100" y2="145" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="95" x2="1050" y2="165" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="949.6410161513776,95 949.6410161513776,135 915,155 880.3589838486224,135 880.3589838486224,95.00000000000001 915,75" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ Architecture — Lesson 11</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 11: Micro Frontend Integration</tspan>
      <tspan x="60" dy="42">Strategies — Build-time vs Run-time</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Microservices & Micro Frontend system design — From basics to Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 4: Micro Frontend — Architecture & Principles</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

There are many ways to compose Micro Frontend applications. Each approach has its own trade-offs. This article deep-dives into each strategy and helps you choose the right one.


![4 Micro Frontend Integration strategies](/storage/uploads/2026/04/mfe-ms-diagram-bai11-mfe-integration.webp)

---

## 1. Build-time Integration (NPM Packages)

Each MFE publishes as an npm package, host app imported at build-time:

```
host-app/package.json:
  "@company/product-mfe": "^2.1.0"
  "@company/cart-mfe": "^1.3.0"
```

**Advantages:** Simple, type-safe, tree-shakeable
**Disadvantages:** Must rebuild + redeploy host app when MFE updates
**Verdict:** ❌ Not "really" Micro Frontend — no independent deployment

---

## 2. Run-time Integration

### 2.1 iframes

```html
<iframe src="https://product.example.com/embed" />
```

**Advantages:** Perfect isolation, simple
**Disadvantages:** No shared styles, hard to communicate, SEO terrible, poor performance
**Use case:** Legacy app embedding, sandboxed widgets

### 2.2 Web Components

```html
<product-catalog data-category="electronics"></product-catalog>
<script src="https://product.cdn.com/product-catalog.js"></script>
```

**Advantages:** Framework agnostic, Shadow DOM isolation, browser standard
**Disadvantages:** Complicated SSR, React wrappers needed, Shadow DOM styling tricky

### 2.3 JavaScript Integration (Dynamic Script Loading)

```javascript
function loadMicroFrontend(name, containerId) {
  const script = document.createElement('script');
  script.src = `https://${name}.cdn.com/bundle.js`;
  script.onload = () => {
    window[`render_${name}`](document.getElementById(containerId));
  };
  document.body.appendChild(script);
}
```

**Advantages:** Simple, flexible, agnostic framework
**Disadvantages:** No dependency sharing, large bundles

### 2.4 Module Federation (Webpack 5) ⭐

```
┌─────────────────────────────┐
│        Shell App (Host)     │
│                             │
│  import('product/Catalog')  │──► Product MFE (Remote)
│  import('cart/MiniCart')     │──► Cart MFE (Remote)
│                             │
│  Shared: React, React-DOM   │
│  (loaded once, shared)      │
└─────────────────────────────┘
```

**Advantages:** Runtime integration, shared dependencies, lazy loading, TypeScript
**Disadvantages:** Webpack-specific, learning curve
**Verdict:** ⭐ **Recommended** for most use cases.

---

## 3. Server-Side Approaches

### 3.1 Server-Side Includes (SSI)

```html
<!--# include virtual="/fragments/product?id=123" -->
```

### 3.2 Edge-Side Includes (ESI)

```html
<esi:include src="https://product.service/fragment/header" />
```

**Use case:** Content-heavy pages, when SEO and TTFB are important.

---

## 4. Decision Matrix

| Strategy | Independence | Performance | Complexity | Best For |
|----------|-------------|-------------|-----------|----------|
| NPM Package | ❌ Low | ✅ Best | Low | Shared libraries |
| iframe | ✅ High | ❌ Poor | Low | Legacy embedded |
| Web Components | ✅ High | ✅ Good | Medium | Multi-framework |
| JS Integration | ✅ High | ⚠️ OK | Medium | Simple cases |
| **Module Federation** | **✅ High** | **✅ Good** | **Medium** | **Most projects** |
| SSI/ESI | ✅ High | ✅ Great TTFB | High | Content sites |

---

## Summary

- **Build-time** (npm): simple but no independent deployment
- **Module Federation**: best balance for the same framework — ⭐ recommended
- **Web Components**: best for multi-framework
- **SSI/ESI**: best for server-rendered content sites

---

**Next article:** [Lesson 12: Webpack Module Federation & Vite — Deep Dive](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-12-webpack-module-federation-vite-federation-deep-dive)
