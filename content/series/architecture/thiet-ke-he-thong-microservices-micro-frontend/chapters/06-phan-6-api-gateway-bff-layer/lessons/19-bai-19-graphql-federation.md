---
id: 019e4a33-d419-7b20-c001-b1c2d3e4f519
title: "Bài 19: GraphQL Federation — Unified API cho Micro Frontend"
slug: bai-19-graphql-federation-unified-api-cho-micro-frontend
description: >-
  Apollo Federation: Supergraph, Subgraphs, Router. Mỗi microservice expose GraphQL subgraph. Router compose thành unified API. Schema stitching vs Federation. Performance considerations.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 19
section_title: "Phần 6: API Gateway & BFF Layer"
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: "Thiết kế hệ thống Microservices & Micro Frontend — Từ cơ bản đến Production"
  slug: thiet-ke-he-thong-microservices-micro-frontend
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ Kiến trúc — Bài 19</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 19: GraphQL Federation — Unified API</tspan>
      <tspan x="60" dy="42">cho Micro Frontend</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Thiết kế hệ thống Microservices &amp; Micro Frontend — Từ cơ bản đến Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 6: API Gateway &amp; BFF Layer</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Giới thiệu

GraphQL Federation cho phép mỗi microservice expose một **subgraph**, và Router tự động compose thành **unified supergraph**. Frontend chỉ cần 1 endpoint để query data từ mọi service.


![GraphQL Federation — unified graph từ nhiều subgraphs](/storage/uploads/2026/04/mfe-ms-diagram-bai19-graphql-federation.webp)

---

## 1. Vấn đề: Multiple GraphQL Endpoints

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

## 2. GraphQL Federation Architecture

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

## 3. Subgraph Definition

### 3.1 Product Subgraph

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

### 3.2 Review Subgraph (extends Product)

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

### 3.3 Federated Query

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

Router tự động:
1. Query Product Subgraph → lấy product data
2. Query Review Subgraph → lấy reviews (dùng product.id)
3. Query User Subgraph → lấy author info (dùng review.author.id)
4. Merge tất cả → trả về 1 response

---

## 4. Schema Stitching vs Federation

| | **Schema Stitching** | **Federation** |
|---|---|---|
| Ownership | Gateway owns schema | Services own schema |
| Coupling | High (gateway biết về services) | Low (services tự declare) |
| Scalability | Gateway bottleneck | Distributed |
| Evolution | Hard (central change) | Easy (service-level) |
| **Verdict** | ❌ Legacy | ✅ Recommended |

---

## 5. Performance Considerations

### 5.1 Query Plan Optimization

```
Router tạo query plan tối ưu:
─ Parallel: Product + User subgraphs (independent)
─ Sequential: Reviews → after Product (needs product.id)
```

### 5.2 Dataloader Pattern

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

### 5.3 Caching

```
Persisted Queries: Client gửi query hash thay vì full query
Automatic Persisted Queries (APQ): Router cache query plans
CDN caching: @cacheControl directive
```

---

## 6. Khi nào dùng Federation?

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

## Tóm tắt

- **Federation** = mỗi service own subgraph, Router compose supergraph
- `@key` directive cho entity reference across subgraphs
- Router tự động **split, resolve, merge** queries
- **DataLoader** pattern tránh N+1 problem
- Dùng khi cần **unified GraphQL API** cho nhiều services

---

**Bài tiếp theo:** [Bài 20: Testing Microservices — Unit, Integration & E2E](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-20-testing-microservices-unit-integration-e2e)
