---
id: 019e4a33-d411-7b20-c001-b1c2d3e4f511
title: 第 11 課：微前端整合策略 - 建置時與運行時
slug: bai-11-micro-frontend-integration-strategies-build-time-vs-run-time
description: 組成微前端的 7 種策略：iframe、Web 元件、建置時整合、JavaScript 捆綁、模組聯合、伺服器端包含、邊緣端包含。比較細節並選擇正確的方法。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 11
section_title: 第 4 部分：微前端 — 架構與原理
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: 微服務與微前端系統設計－從基礎到生產
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ 建築 — 第 11 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 11 課：微前端集成</tspan>
      <tspan x="60" dy="42">策略——建置時與運行時</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">微服務與微前端系統設計－從基礎到生產</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 4 部分：微前端 — 架構與原理</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

建立微前端應用程式的方法有很多種。每種方法都有其自身的權衡。本文深入探討了每種策略並幫助您選擇正確的策略。


![4 種微前端整合策略](/storage/uploads/2026/04/mfe-ms-diagram-bai11-mfe-integration.webp)

---

## 1. 建置時整合（NPM 套件）

每個 MFE 都會發佈為 npm 套件，並在建置時匯入主機應用程式：

```
host-app/package.json:
  "@company/product-mfe": "^2.1.0"
  "@company/cart-mfe": "^1.3.0"
```

**優點：** 簡單、型別安全、可搖樹
**缺點：** MFE 更新時必須重建 + 重新部署主機應用程式
**結論：** ❌ 不是「真正的」微前端－沒有獨立部署

---

## 2. 運行時集成

### 2.1 iframe

```html
<iframe src="https://product.example.com/embed" />
```

**優點：**完美隔離，簡單
**缺點：**沒有共享樣式，難以溝通，SEO糟糕，性能差
**用例：** 遺留應用程式嵌入、沙盒小部件

### 2.2 Web 元件

```html
<product-catalog data-category="electronics"></product-catalog>
<script src="https://product.cdn.com/product-catalog.js"></script>
```

**優點：** 框架無關、Shadow DOM 隔離、瀏覽器標準
**缺點：** 複雜的 SSR、需要 React 包裝器、Shadow DOM 樣式棘手

### 2.3 JavaScript 整合（動態腳本載入）

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

**優點：** 簡單、靈活、不可知的框架
**缺點：** 無依賴共享，捆綁包大

### 2.4 模組聯盟 (Webpack 5) ⭐

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

**優點：** 執行時期整合、共享依賴項、延遲載入、TypeScript
**缺點：** Webpack 特定的，學習曲線
**結論：** ⭐ **對於大多數用例推薦**。

---

## 3. 伺服器端方法

### 3.1 伺服器端包含 (SSI)

```html
<!--# include virtual="/fragments/product?id=123" -->
```

### 3.2 邊緣包含 (ESI)

```html
<esi:include src="https://product.service/fragment/header" />
```

**用例：** 內容豐富的頁面，當 SEO 和 TTFB 很重要時。

---

## 4.決策矩陣

|戰略|獨立|性能|複雜性 |最適合 |
|----------|-------------|-------------|------------|---------|
| NPM 套件 | ❌低| ✅ 最好 |低|共享庫 |
| iframe | ✅ 高 | ❌ 窮 |低|傳統嵌入式 |
|網頁組件 | ✅ 高 | ✅ 好 |中|多框架 |
| JS 整合 | ✅ 高 | ⚠️ 好的 |中等|簡單案例|
| **模組聯盟** | **✅ 高** | **✅ 好** | **中** | **大多數專案** |
| SSI/ESI | ✅ 高 | ✅ 很棒的 TTFB |高|內容網站 |

---

## 總結

- **建置時** (npm)：簡單但沒有獨立部署
- **模組聯盟**：同一框架的最佳平衡 - ⭐推薦
- **Web 元件**：最適合多框架
- **SSI/ESI**：最適合伺服器呈現的內容網站

---

**下一篇文章：** [第 12 課：Webpack 模組聯合與 Vite — 深入探討](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-12-webpack-module-federation-vite-federation-deep-dive)
