---
id: 019e4a33-d419-7b20-c001-b1c2d3e4f519
title: 'レッスン 19: GraphQL フェデレーション — マイクロ フロントエンド用の統合 API'
slug: bai-19-graphql-federation-unified-api-cho-micro-frontend
description: >-
  アポロ連合: スーパーグラフ、サブグラフ、ルーター。各マイクロサービスは GraphQL サブグラフを公開します。ルーターは統一された API
  として構成されます。スキーマステッチング対フェデレーション。パフォーマンスに関する考慮事項。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 19
section_title: 'パート 6: API ゲートウェイと BFF レイヤー'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ アーキテクチャ — レッスン 19</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 19: GraphQL フェデレーション — 統合 API</tspan>
      <tspan x="60" dy="42">マイクロフロントエンド用</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 6: API ゲートウェイと BFF レイヤー</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

GraphQL フェデレーションにより、各マイクロサービスが **サブグラフ**を公開できるようになり、ルーターはそれを **統合スーパーグラフ**に自動的に構成します。フロントエンドでは、すべてのサービスからデータをクエリするために 1 つのエンドポイントのみが必要です。


![GraphQL Federation — 複数のサブグラフからの統合グラフ](/storage/uploads/2026/04/mfe-ms-diagram-bai19-graphql-federation.webp)

---

## 1. 問題: 複数の GraphQL エンドポイント

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

## 2. GraphQL フェデレーション アーキテクチャ

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

## 3. サブグラフの定義

### 3.1 製品サブグラフ

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

### 3.2 サブグラフの確認 (製品の拡張)

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

### 3.3 フェデレーションクエリ

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

自動ルーター:
1. 製品サブグラフのクエリ → 製品データの取得
2. レビュー サブグラフをクエリ → レビューを取得 (product.id を使用)
3. ユーザー サブグラフをクエリ → 著者情報を取得 (review.author.id を使用)
4. すべて結合 → 1 つの応答を返す

---

## 4. スキーマステッチングとフェデレーション

| | **スキーマの結合** | **連盟** |
|---|---|---|
|所有権 |ゲートウェイがスキーマを所有 |サービス独自のスキーマ |
|カップリング |高 (ゲートウェイはサービスを認識しています) |低 (サービス自体が宣言) |
|スケーラビリティ |ゲートウェイのボトルネック |分散 |
|進化 |ハード(センターチェンジ) |簡単 (サービスレベル) |
| **評決** | ❌ レガシー | ✅ おすすめ |

---

## 5. パフォーマンスに関する考慮事項

### 5.1 クエリプランの最適化

```
Router tạo query plan tối ưu:
─ Parallel: Product + User subgraphs (independent)
─ Sequential: Reviews → after Product (needs product.id)
```

### 5.2 データローダーのパターン

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

### 5.3 キャッシュ

```
Persisted Queries: Client gửi query hash thay vì full query
Automatic Persisted Queries (APQ): Router cache query plans
CDN caching: @cacheControl directive
```

---

## 6. フェデレーションをいつ使用するか?

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

## 概要

- **フェデレーション** = 各サービス独自のサブグラフ、ルーターがスーパーグラフを構成
- `@key` サブグラフ間のエンティティ参照のディレクティブ
- ルーターは自動的にクエリを**分割、解決、マージ**します
- **DataLoader** パターンにより N+1 問題を回避
- 複数のサービスに **統合された GraphQL API** が必要な場合に使用します

---

**次の記事:** [レッスン 20: マイクロサービスのテスト — ユニット、統合、E2E](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-20-testing-microservices-unit-integration-e2e)
