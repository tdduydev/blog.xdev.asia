---
id: 019e4a33-d404-7b20-c001-b1c2d3e4f504
title: 'レッスン 4: サービスの分解 — 境界のあるコンテキストとサービスの境界'
slug: bai-4-service-decomposition-bounded-context-service-boundaries
description: >-
  境界コンテキストに基づくサービス分離方式。サービス境界を適切に定義し、分散モノリスを避けます。サブドメインごとの分解とビジネス機能戦略ごとの分解。コンテキスト
  マッピング パターン。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 4
section_title: 'パート 2: マイクロサービス バックエンドの設計'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-9443" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-9443)"/>

  <!-- Decorations -->
  <g>
    <circle cx="922" cy="236" r="30" fill="#f87171" opacity="0.11"/>
    <circle cx="744" cy="218" r="26" fill="#f87171" opacity="0.07"/>
    <circle cx="1066" cy="200" r="22" fill="#f87171" opacity="0.13"/>
    <circle cx="888" cy="182" r="18" fill="#f87171" opacity="0.09"/>
    <circle cx="710" cy="164" r="14" fill="#f87171" opacity="0.05"/>
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
    <line x1="600" y1="156" x2="1100" y2="236" stroke="#f87171" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="186" x2="1050" y2="256" stroke="#f87171" stroke-width="0.5" opacity="0.08"/>
    <polygon points="982.8467875173176,140.5 982.8467875173176,171.5 956,187 929.1532124826824,171.5 929.1532124826824,140.5 956,125" fill="none" stroke="#f87171" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ アーキテクチャ — レッスン 4</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 4: サービスの分解 - 境界あり</tspan>
      <tspan x="60" dy="42">コンテキストとサービスの境界</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 2: マイクロサービス バックエンドの設計</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

サービスの分離は、マイクロサービスに移行する際のアーキテクチャ上の最も重要な決定事項です。分割が小さすぎる → 複雑さが爆発します。分割が大きすぎる→分散モノリス。この記事では、サービス境界を適切に定義する体系的な方法について説明します。


![サービス分解 — システムをマイクロサービスに分解します。](/storage/uploads/2026/04/mfe-ms-diagram-bai4-service-decomposition.webp)

---

## 1. 分離の原則

### 1.1 サービスに対する単一の責任

各サービスは **独自のビジネス機能**を担当します。
- ユーザーサービス → ユーザーライフサイクル管理（登録、ログイン、プロフィール）
- 製品サービス → 製品カタログ、検索、レビュー
- 注文サービス → 注文処理、履行、履歴

### 1.2 2 つの主な戦略

**ビジネス能力ごとに分解:**

組織が提供するビジネス機能に基づいて、次のことを行います。
```
E-Commerce Business Capabilities:
├── Customer Management   → User Service
├── Product Management    → Product Service
├── Order Management      → Order Service
├── Payment Processing    → Payment Service
├── Inventory Management  → Inventory Service
└── Shipping & Delivery   → Shipping Service
```

**サブドメインごとに分解 (DDD):**

DDD 経由で識別されたサブドメインに基づいて:
```
Core Subdomains (competitive advantage):
├── Product Catalog → Product Service (custom-built, best team)
├── Order Processing → Order Service (complex logic)

Supporting Subdomains (necessary but not differentiating):
├── Inventory → Inventory Service
├── Customer Profile → User Service

Generic Subdomains (solved problems):
├── Authentication → Keycloak (off-the-shelf)
├── Payment Gateway → Stripe integration
├── Email → SendGrid/SES
```

### 1.3 正しいサービス境界標識

- サービスは **独立して**開発、展開、拡張可能
- サービス A の変更でサービス B の変更が必要になることは**ほとんどありません**
- 各サービスには独自の **データベース**があります (共有テーブルはありません)
- チームは他のチームと **調整する必要なく** サービスに取り組むことができます
- サービスには **凝集した API** があり、密接に関連したエンドポイント

---

## 2. コンテキスト マッピング パターン

境界コンテキストを特定したら、それらの間の関係を定義する必要があります。

### 2.1 パートナーシップ
2 つのチームは緊密に協力し、インターフェースを共同開発します。
```
Product Team ←→ Search Team
(cùng định nghĩa product schema cho search indexing)
```

### 2.2 顧客とサプライヤー
上流 (サプライヤー) はデータ/API を提供し、下流 (顧客) は以下を消費します。
```
Product Service (Supplier) → Order Service (Customer)
(Order Service cần product info nhưng không thay đổi product)
```

### 2.3 破損防止層 (ACL)
ドメイン モデルを外部/レガシー システムから保護するための変換レイヤー:
```
┌──────────┐     ┌─────┐     ┌──────────────┐
│ Order    │ ──► │ ACL │ ──► │ Legacy ERP   │
│ Service  │     │     │     │ (SOAP/XML)   │
└──────────┘     └─────┘     └──────────────┘
ACL convert REST/JSON ↔ SOAP/XML
```

---

## 3. アンチパターンは避けるべきです

### 3.1 分散モノリス
```
❌ Services phụ thuộc chặt chẽ:
Service A → Service B → Service C → Service A (circular!)
Kết quả: phải deploy A, B, C cùng lúc = worse than monolith
```

### 3.2 ナノサービス
```
❌ Chia quá nhỏ:
├── ProductNameService
├── ProductPriceService
├── ProductImageService
└── ProductReviewService

✅ Chia hợp lý:
└── ProductService (gom lại thành 1 service)
```

### 3.3 共有データベース
```
❌ Nhiều services dùng chung DB:
Service A ──┐
Service B ──┼──► Shared PostgreSQL (products table)
Service C ──┘
Thay đổi schema → break tất cả services

✅ Database per Service:
Service A → DB_A
Service B → DB_B (replicate data nếu cần)
Service C → DB_C
```

---

## 4. 実践: 電子商取引プラットフォームの分離

シリーズ全体のプロジェクトに適用可能:

```
E-Commerce Platform Services:

┌─────────────────────────────────────────┐
│ User Service (Supporting)               │
│ - Registration, Login, Profile          │
│ - PostgreSQL (users, addresses)         │
│ - Team: 2-3 devs                       │
├─────────────────────────────────────────┤
│ Product Service (Core)                  │
│ - Catalog, Search, Reviews, Categories  │
│ - PostgreSQL + Elasticsearch            │
│ - Team: 3-4 devs                       │
├─────────────────────────────────────────┤
│ Cart Service (Supporting)               │
│ - Add/Remove items, Apply coupon        │
│ - Redis (fast, ephemeral)              │
│ - Team: 2 devs                         │
├─────────────────────────────────────────┤
│ Order Service (Core)                    │
│ - Place order, Track, History           │
│ - PostgreSQL (orders, order_items)      │
│ - Team: 3-4 devs                       │
├─────────────────────────────────────────┤
│ Payment Service (Generic)               │
│ - Stripe/VNPay integration              │
│ - PostgreSQL (transactions)            │
│ - Team: 2 devs                         │
└─────────────────────────────────────────┘
```

---

## 概要

|原則 |説明 |
|----------|----------|
|ドメインごとに分割 |技術層ごとに分割せずに DDD 境界コンテキストを使用する |
|疎結合 |サービス A は、サービス B をデプロイする必要なく変更されます。
|高い凝集力 |関連する機能は同じサービス内にあります |
|独自のデータ |各サービスには独自のデータベースがあります。
|適切なサイズ |大きすぎず（モノリス）、小さすぎず（ナノサービス） |

---

**次の記事:** [レッスン 5: API 設計マスタークラス — REST、GraphQL、gRPC](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-5-api-design-masterclass-rest-graphql-grpc)
