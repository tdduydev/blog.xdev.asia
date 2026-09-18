---
id: 019e4a33-d419-7b20-c001-b1c2d3e4f519
title: 第 19 課：GraphQL Federation — 微前端的統一 API
slug: bai-19-graphql-federation-unified-api-cho-micro-frontend
description: Apollo Federation：超級圖、子圖、路由器。每個微服務都公開 GraphQL 子圖。 Router組成統一的API。模式拼接與聯合。性能考慮。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 19
section_title: 第 6 部分：API 閘道和 BFF 層
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: 微服務與微前端系統設計－從基礎到生產
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-6867" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-6867)"/>

  <!-- Decorations -->
  <g>
    <circle cx="796" cy="118" r="14" fill="#2dd4bf" opacity="0.13"/>
    <circle cx="992" cy="234" r="32" fill="#2dd4bf" opacity="0.11"/>
    <circle cx="688" cy="90" r="20" fill="#2dd4bf" opacity="0.09"/>
    <circle cx="884" cy="206" r="8" fill="#2dd4bf" opacity="0.07"/>
    <circle cx="1080" cy="62" r="26" fill="#2dd4bf" opacity="0.05"/>
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
    <line x1="600" y1="58" x2="1100" y2="138" stroke="#2dd4bf" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="88" x2="1050" y2="158" stroke="#2dd4bf" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1036.5788383248864,191.5 1036.5788383248864,224.5 1008,241 979.4211616751136,224.5 979.4211616751135,191.5 1008,175" fill="none" stroke="#2dd4bf" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#2dd4bf"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#2dd4bf" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ 建築 — 第 19 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 19 課：GraphQL Federation — 統一 API</tspan>
      <tspan x="60" dy="42">對於微前端</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">微服務與微前端系統設計－從基礎到生產</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 6 部分：API 閘道和 BFF 層</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

GraphQL Federation允許每個微服務公開一個**子圖**，而Router會自動將其組合成**統一的超級圖**。前端僅需要 1 個端點來查詢每個服務的資料。


![GraphQL Federation — 來自多個子圖的統一圖](/storage/uploads/2026/04/mfe-ms-diagram-bai19-graphql-federation.webp)

---

## 1. 問題：多個 GraphQL 端點

```
❌ Mỗi service có GraphQL endpoint riêng:
Frontend → product.api.com/graphql (Product schema)
Frontend → user.api.com/graphql (User schema)
Frontend → order.api.com/graphql (Order schema)

→ Frontend phải biết endpoint nào chứa data gì
→ Không thể query cross-service trong 1 request
→ Ví dụ: Order + Product + User = 3 requests
```

---

## 2. GraphQL 聯邦架構

```
✅ Unified Supergraph:

┌─────────────┐
│   Frontend  │
│  1 endpoint │
└──────┬──────┘
       │
       ▼
┌──────────────────────┐
│   Apollo Router      │
│   (Supergraph)       │
│   gateway.api.com    │
└──┬────────┬────────┬─┘
   │        │        │
   ▼        ▼        ▼
┌──────┐ ┌──────┐ ┌──────┐
│Product│ │ User │ │Order │
│Subgra│ │Subgra│ │Subgra│
│  ph  │ │  ph  │ │  ph  │
└──────┘ └──────┘ └──────┘

1 query → Router splits → Subgraphs → Router merges → 1 response
```

---

## 3. 子圖定義

### 3.1 產品子圖

```graphql
# Product Service subgraph
type Product @key(fields: "id") {
  id: ID!
  name: String!
  price: Float!
  description: String
  category: Category!
}

type Category {
  id: ID!
  name: String!
}

type Query {
  product(id: ID!): Product
  products(limit: Int, offset: Int): [Product!]!
}
```

### 3.2 回顧子圖（擴展產品）

```graphql
# Review Service subgraph — extends Product
type Product @key(fields: "id") {
  id: ID!
  reviews: [Review!]!
  averageRating: Float
}

type Review {
  id: ID!
  rating: Int!
  comment: String
  author: User!
}

type Query {
  reviews(productId: ID!): [Review!]!
}
```

### 3.3 聯合查詢

```graphql
# Frontend query — Router handles cross-service resolution
query ProductPage($id: ID!) {
  product(id: $id) {
    id              # → Product Subgraph
    name            # → Product Subgraph
    price           # → Product Subgraph
    reviews {       # → Review Subgraph
      rating
      comment
      author {      # → User Subgraph
        name
        avatar
      }
    }
    averageRating   # → Review Subgraph
  }
}
```

自動路由器：
1.查詢產品子圖→取得產品數據
2.查詢評論子圖→取得評論（使用product.id）
3.查詢使用者子圖→取得作者資訊（使用review.author.id）
4. 合併全部→回傳1個回應

---

## 4. 模式拼接與聯合

| | **模式拼接** | **聯合會** |
|---|---|---|
|所有權|網關擁有架構 |服務自己的架構|
|聯軸器|高（網關了解服務） |低（服務聲明本身）|
|可擴充性|網關瓶頸|分散式 |
|進化|硬（中心變化）|簡單（服務等級）|
| **判決** | ❌ 遺產 | ✅ 推薦 |

---

## 5. 效能注意事項

### 5.1 查詢計劃最佳化

```
Router tạo query plan tối ưu:
─ Parallel: Product + User subgraphs (independent)
─ Sequential: Reviews → after Product (needs product.id)
```

### 5.2 資料載入器模式

```javascript
// Trong Review Subgraph, batch user lookups
const userLoader = new DataLoader(async (userIds) => {
  const users = await userService.getUsers(userIds);
  return userIds.map(id => users.find(u => u.id === id));
});

// Resolve author field
Review: {
  author: (review) => userLoader.load(review.authorId)
}
```

### 5.3 快取

```
Persisted Queries: Client gửi query hash thay vì full query
Automatic Persisted Queries (APQ): Router cache query plans
CDN caching: @cacheControl directive
```

---

## 6. 何時使用聯邦？

```
✅ Dùng khi:
- Nhiều microservices cần unified GraphQL API
- Frontend teams muốn 1 endpoint
- Complex, nested data relationships
- Multiple frontend clients

❌ Không cần khi:
- Chỉ có 1-2 services (đơn giản quá)
- REST đã đủ tốt
- Team chưa quen GraphQL
- Performance-critical (thêm latency qua Router)
```

---

## 總結

- **聯邦** = 每個服務都有自己的子圖，Router組成超圖
- `@key` 跨子圖的實體引用指令
- 路由器自動**分割、解析、合併**查詢
- **DataLoader** 模式避免了 N+1 問題
- 當您需要**統一的 GraphQL API** 用於多種服務時使用

---

**下一篇文章：** [第 20 課：測試微服務 — 單元、整合與 E2E](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-20-testing-microservices-unit-integration-e2e)
