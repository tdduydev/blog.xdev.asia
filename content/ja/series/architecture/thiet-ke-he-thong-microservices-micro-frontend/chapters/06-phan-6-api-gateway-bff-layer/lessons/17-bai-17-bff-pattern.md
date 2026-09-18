---
id: 019e4a33-d417-7b20-c001-b1c2d3e4f517
title: 'レッスン 17: BFF パターン — フロントエンド用のバックエンド'
slug: bai-17-bff-pattern-backend-for-frontend
description: >-
  BFF パターン: 各フロントエンドには独自のバックエンドがあります。 BFF がマイクロ フロントエンドに適している理由。 Web とモバイルの BFF
  を設計します。 BFF アグリゲーション層。 BFF がモノリスになるのを避けます。
duration_minutes: 75
is_free: true
video_url: null
sort_order: 17
section_title: 'パート 6: API ゲートウェイと BFF レイヤー'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#c084fc">🏗️ アーキテクチャ — レッスン 17</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 17: BFF パターン — フロントエンド用のバックエンド</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 6: API ゲートウェイと BFF レイヤー</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

フロントエンド用バックエンド (BFF) は、フロントエンド クライアントごとに個別の **バックエンド レイヤー** を配置するパターンです。 BFF は複数のマイクロサービスからデータを集約し、特定のフロントエンドに適した形式に変換します。


![BFF パターン - 各クライアントのフロントエンド用に個別のバックエンド](/storage/uploads/2026/04/mfe-ms-diagram-bai17-bff-pattern.webp)

---

## 1. BFF が必要な理由は何ですか?

### 1.1 BFF がいないという問題

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

### 1.2 BFF を使用する場合

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

## 2. BFF アーキテクチャ

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

## 3. BFF 設計原則

### 3.1 フロントエンド タイプごとに 1 つの BFF

|フロントエンド |親友 | | 向けに最適化
|----------|-----|---------------|
|ウェブ (デスクトップ) |ウェブ親友 |完全なデータ、豊富な UI |
|モバイル |モバイル親友 |コンパクトなデータ、帯域幅 |
|管理者パネル |管理者の親友 | CRUD 操作 |
|サードパーティ |パブリック API (BFF ではない) |安定した、バージョン管理された |

### 3.2 BFF の責任

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

## 4. BFF の実装 (Node.js/Fastify)

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

## 5. BFF と API ゲートウェイ

|特長 | APIゲートウェイ |親友 |
|----------|---------------|-----|
| **目的** |横断的な懸念事項 |フロントエンド固有の集約 |
| **ロジック** |ルーティング、認証、レート制限 |データ変換 |
| **クライアントごと** |ワン・フォー・オール |フロントエンド タイプごとに 1 つ |
| **管理者** |プラットフォームチーム |フロントエンドチーム |

**実際には、両方を使用します。**
```
Frontend → API Gateway → BFF → Microservices
           (routing,      (aggregation,
            auth,          transformation)
            rate limit)
```

---

## 概要

- **BFF = フロントエンド タイプごとに個別のバックエンド**
- データを集約し、フォーマットを変換し、フロントエンドの複雑さを軽減します
- **ステートレス**、ビジネス ロジックは含まれません
- フロントエンド タイプ (Web、モバイル、管理) ごとに 1 つの BFF
- API ゲートウェイと組み合わせて使用されることが多い

---

**次の記事:** [レッスン 18: API ゲートウェイ — Kong、APISIX、Envoy](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-18-api-gateway-kong-apisix-envoy-thuc-chien)
