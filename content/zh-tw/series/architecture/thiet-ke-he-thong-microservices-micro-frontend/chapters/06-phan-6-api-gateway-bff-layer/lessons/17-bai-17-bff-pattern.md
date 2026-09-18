---
id: 019e4a33-d417-7b20-c001-b1c2d3e4f517
title: 第 17 課：BFF 模式 — 前端的後端
slug: bai-17-bff-pattern-backend-for-frontend
description: BFF 模式：每個前端都有自己的後端。為什麼BFF適合微前端。為 Web 與行動裝置設計 BFF。 BFF 聚合層。避免 BFF 成為龐然大物。
duration_minutes: 75
is_free: true
video_url: null
sort_order: 17
section_title: 第 6 部分：API 閘道和 BFF 層
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: 微服務與微前端系統設計－從基礎到生產
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-2107" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-2107)"/>

  <!-- Decorations -->
  <g>
    <circle cx="703" cy="99" r="16" fill="#c084fc" opacity="0.14"/>
    <circle cx="806" cy="122" r="35" fill="#c084fc" opacity="0.13"/>
    <circle cx="909" cy="145" r="24" fill="#c084fc" opacity="0.12000000000000001"/>
    <circle cx="1012" cy="168" r="13" fill="#c084fc" opacity="0.11"/>
    <circle cx="615" cy="191" r="32" fill="#c084fc" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <line x1="600" y1="69" x2="1100" y2="149" stroke="#c084fc" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="99" x2="1050" y2="169" stroke="#c084fc" stroke-width="0.5" opacity="0.08"/>
    <polygon points="957.1051177665153,97 957.1051177665153,141 919,163 880.8948822334847,141 880.8948822334847,97.00000000000001 919,75" fill="none" stroke="#c084fc" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#c084fc"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#c084fc" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#c084fc">🏗️ 建築 — 第 17 課</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 17 課：BFF 模式 — 前端的後端</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">微服務與微前端系統設計－從基礎到生產</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 6 部分：API 閘道和 BFF 層</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

前端後端 (BFF) 是一種為每個前端客戶端放置單獨的**後端層**的模式。 BFF 聚合來自多個微服務的數據，將其轉換為適合特定前端的格式。


![BFF 模式－為每個客戶端提供單獨的後端和前端](/storage/uploads/2026/04/mfe-ms-diagram-bai17-bff-pattern.webp)

---

## 1. 為什麼你需要一個最好的朋友？

### 1.1 沒有BFF的問題

```
❌ Mỗi MFE gọi trực tiếp nhiều microservices:

Product MFE ──► Product Service
            ──► Review Service
            ──► Inventory Service
            ──► Pricing Service

→ 4 API calls cho 1 product page
→ Frontend phải aggregate data
→ Over-fetching (mỗi API trả về nhiều hơn cần)
→ Latency: waterfall requests
```

### 1.2 與最好的朋友

```
✅ BFF aggregates cho frontend:

Product MFE ──► Web BFF ──► Product Service
                        ──► Review Service
                        ──► Inventory Service

→ 1 API call cho 1 product page
→ BFF aggregate và transform data
→ Frontend nhận đúng data cần
→ Parallel calls tại BFF layer
```

---

## 2. BFF 架構

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Web App    │  │ Mobile App  │  │  Admin App  │
│  (MFE)     │  │  (React     │  │  (MFE)      │
│            │  │   Native)   │  │             │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Web BFF    │ │  Mobile BFF  │ │  Admin BFF   │
│  (Node.js)   │ │  (Node.js)   │ │  (Node.js)   │
│  Full data   │ │  Compact data│ │  All CRUD    │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │
       └────────────────┼────────────────┘
                        ▼
              ┌─────────────────┐
              │  Microservices  │
              │  (gRPC / REST)  │
              └─────────────────┘
```

---

## 3.BFF設計原則

### 3.1 每種前端類型一個 BFF

|前端 |最好的朋友|優化為 |
|----------|-----|----------------|
|網路（桌面）|網路好友 |資料全，UI豐富|
|手機 |行動好友|緊湊的數據、頻寬|
|管理面板 |管理員好友 | CRUD 操作 |
|第三方|公共 API（非 BFF）|穩定，版本化 |

### 3.2 BFF 職責

```
BFF SHOULD:
✅ Aggregate data từ multiple services
✅ Transform data cho frontend format
✅ Handle authentication (validate tokens)
✅ Caching (Redis) cho frequently accessed data
✅ Rate limiting per client

BFF SHOULD NOT:
❌ Contain business logic (belongs to services)
❌ Have its own database (stateless!)
❌ Become a "smart proxy" monolith
❌ Be shared across different frontends
```

---

## 4. BFF 實作 (Node.js/Fastify)

```javascript
// Web BFF - Product Page Aggregation
app.get('/api/bff/product/:id', async (req, reply) => {
  const { id } = req.params;
  
  // Parallel calls to microservices
  const [product, reviews, inventory] = await Promise.all([
    productService.getProduct(id),
    reviewService.getReviews(id, { limit: 5 }),
    inventoryService.getStock(id),
  ]);
  
  // Transform for web frontend
  return {
    ...product,
    rating: reviews.averageRating,
    topReviews: reviews.items.slice(0, 3),
    inStock: inventory.quantity > 0,
    stockLevel: inventory.quantity > 10 ? 'high' : 'low',
  };
});
```

---

## 5. BFF 與 API 網關

|特點| API網關|最好的朋友|
|--------|-------------|-----|
| **目的** |跨領域關注點 |特定於前端的聚合 |
| **邏輯** |路由、驗證、速率限制 |資料轉換|
| **每位顧客** |為所有人合一 |每種前端類型一個 |
| **維護者** |平台團隊|前端團隊 |

**在實踐中，同時使用：**
```
Frontend → API Gateway → BFF → Microservices
           (routing,      (aggregation,
            auth,          transformation)
            rate limit)
```

---

## 總結

- **BFF = 每個前端類型的單獨後端**
- 聚合資料、轉換格式、降低前端複雜性
- **無狀態**，不含業務邏輯
- 每種前端類型（Web、行動、管理員）一名 BFF
- 通常與API網關結合使用

---

**下一篇文章：** [第 18 課：API 閘道 — Kong、APISIX 與 Envoy](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-18-api-gateway-kong-apisix-envoy-thuc-chien)
