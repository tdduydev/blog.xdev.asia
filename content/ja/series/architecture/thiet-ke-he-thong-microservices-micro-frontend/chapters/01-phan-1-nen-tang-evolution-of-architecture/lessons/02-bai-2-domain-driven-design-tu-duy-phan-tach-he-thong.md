---
id: 019e4a33-d402-7b20-c001-b1c2d3e4f502
title: 'レッスン 2: ドメイン駆動設計 — システム分離の考え方'
slug: bai-2-domain-driven-design-tu-duy-phan-tach-he-thong
description: >-
  DDD プラットフォーム: ユビキタス言語、境界コンテキスト、集約、ドメイン イベント。イベント ストーミングを使用してドメインを検出する方法。戦略的
  DDD と戦術的 DDD およびマイクロサービスおよびマイクロ フロントエンド部門へのアプリケーション。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 2
section_title: 'パート 1: 基礎 — アーキテクチャの進化'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3008" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3008)"/>

  <!-- Decorations -->
  <g>
    <circle cx="695" cy="115" r="18" fill="#fb923c" opacity="0.1"/>
    <circle cx="790" cy="230" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="885" cy="85" r="28" fill="#fb923c" opacity="0.1"/>
    <circle cx="980" cy="200" r="33" fill="#fb923c" opacity="0.05"/>
    <circle cx="1075" cy="55" r="8" fill="#fb923c" opacity="0.1"/>
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
    <line x1="600" y1="185" x2="1100" y2="265" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="215" x2="1050" y2="285" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="969.6410161513776,115 969.6410161513776,155 935,175 900.3589838486224,155 900.3589838486224,115.00000000000001 935,95" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ アーキテクチャ — レッスン 2</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 2: ドメイン駆動設計 — 分割された思考</tspan>
      <tspan x="60" dy="42">システムの分離</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 1: 基礎 — アーキテクチャの進化</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

ドメイン駆動設計 (DDD) は単なるコード記述方法ではなく、**複雑なシステムをビジネスに意味のある部分に分解する**考え方です。 DDD は、**マイクロサービスをどのように分割するか**と**マイクロ フロントエンドをどのように分割するか**を決定する基盤です。分割を誤ると、元のモノリスよりも悪い「分散モノリス」が作成されます。


![コンテキスト マップ — DDD の境界付きコンテキストとドメイン間の関係](/storage/uploads/2026/04/mfe-ms-diagram-bai2-bounded-context-map.webp)

---

## 1. なぜ DDD が必要なのでしょうか?

### 1.1 技術的分解の問題

システムを **技術レイヤー** (UI レイヤー、ビジネス レイヤー、データ レイヤー) に分割することは、最もよくある間違いです。

```
❌ Technical Decomposition (SAI):
├── frontend-service
├── backend-service
├── database-service
└── notification-service

✅ Domain Decomposition (ĐÚNG):
├── user-management (UI + API + DB cho User)
├── product-catalog (UI + API + DB cho Product)
├── order-processing (UI + API + DB cho Order)
└── payment (UI + API + DB cho Payment)
```

### 1.2 DDD は何を解決しますか?

- **ユビキタス言語**: チーム全体 (開発、PM、ビジネス) が同じ「言語」を話します。
- **境界コンテキスト**: ドメイン間の明確な境界を定義します。
- **結合を減らす**: 境界のある各コンテキストは独立した単位です
- **ビジネスとテクノロジーの連携**: アーキテクチャはビジネス構造を反映します

---

## 2. 戦略的 DDD — 全体像を見る

### 2.1 ユビキタス言語

各境界コンテキストには独自の **言語** があります。同じ「製品」という単語ですが、文脈ごとに意味が異なります。

```
┌───────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Product Catalog   │  │   Order Context  │  │  Shipping Context│
│                    │  │                  │  │                  │
│ Product:           │  │ OrderItem:       │  │ Parcel:          │
│ - name, desc       │  │ - productId      │  │ - weight         │
│ - price, images    │  │ - quantity       │  │ - dimensions     │
│ - categories       │  │ - unitPrice      │  │ - tracking       │
│ - reviews          │  │ - discount       │  │ - destination    │
└───────────────────┘  └──────────────────┘  └──────────────────┘

Cùng "Product" nhưng mỗi context cần thông tin khác nhau!
```

### 2.2 境界付きコンテキスト

**境界コンテキスト** は、一貫したドメイン モデルが適用される論理境界です。

**原則:**
- 各境界付きコンテキスト = 1 つのマイクロサービス (または小さなグループ)
- 各境界付きコンテキスト = 1 つのマイクロ フロントエンド (または UI の一部)
- コンテキスト間: **API またはイベント** を介して通信します (共有データベースは使用しません!)

### 2.3 コンテキストマッピング

境界付きコンテキストは独立して存在するのではなく、互いに **関係** を持っています。

```
Context Map:
┌──────────────┐          ┌──────────────┐
│   Product    │◄─────────│    Order     │
│   Catalog    │ Upstream  │  Processing  │
│  (Supplier)  │──────────►│ (Consumer)   │
└──────────────┘          └──────┬───────┘
                                 │
                          ┌──────┴───────┐
                          │   Payment    │
                          │   Gateway    │
                          └──────────────┘
```

**関係パターン:**
|パターン |説明 |いつ使用するか |
|----------|----------|---------------|
| **顧客とサプライヤー** |上流は提供し、下流は消費する |明示的な依存関係 |
| **共有カーネル** |モデルの一部を共有する | 2 つのコンテキストは密接に関連しています。
| **腐敗防止層** | 2 つのモデル間のレイヤー遷移 |レガシー システム統合 |
| **公開言語** |通信用の標準 API/スキーマ |多くの消費者は | を使用する必要があります。

---

## 3. 戦術的 DDD — 設計の詳細

### 3.1 集計

集約は、一貫性の単位として扱われる **エンティティのグループ** です。すべての変更は **集約ルート** を経由します。

```
Order Aggregate:
┌─────────────────────────────────┐
│  Order (Aggregate Root)         │
│  ├── OrderItem                  │
│  ├── OrderItem                  │
│  └── ShippingAddress            │
│                                 │
│  Invariants:                    │
│  - Total = sum(items.price)     │
│  - Status transitions are valid │
│  - At least 1 item required     │
└─────────────────────────────────┘
```

### 3.2 ドメインイベント

ドメイン イベントでは、ドメイン内で発生した **イベント**について説明します。

```typescript
// Domain Events
interface OrderPlaced {
  orderId: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  placedAt: Date;
}

interface PaymentConfirmed {
  paymentId: string;
  orderId: string;
  amount: number;
  confirmedAt: Date;
}

// Event flow
OrderPlaced → PaymentService listens → PaymentConfirmed → ShippingService listens
```

---

## 4. イベントストーミング — ドメイン検出

### 4.1 イベント ストーミングとは何ですか?

イベント ストーミングは、**開発者とドメインの専門家**が付箋を貼り付けて一緒にドメインを探索するワークショップです。

```
Timeline: ─────────────────────────────────────────────►

🟧 Domain Event     🟦 Command          🟨 Policy/Rule
"Order Placed"     "Place Order"       "If payment fails,
                                        cancel order"

🟪 Aggregate        🟩 External System   🔴 Hot Spot
"Order"            "Payment Gateway"   "Race condition
                                        when checking stock"
```

### 4.2 イベントストーミングから境界付きコンテキストへ

ワークショップの後、関連イベントをグループ化→境界コンテキストを定義→マイクロサービス + マイクロ フロントエンドにマッピングします。

```
Event Storming Results → Bounded Contexts:
├── Product Context: ProductCreated, ProductUpdated, CategoryChanged
├── Cart Context: ItemAddedToCart, CartAbandoned, CouponApplied
├── Order Context: OrderPlaced, OrderConfirmed, OrderShipped
├── Payment Context: PaymentInitiated, PaymentConfirmed, RefundIssued
└── User Context: UserRegistered, ProfileUpdated, AddressAdded

Mapping:
├── Product Context → Product Microservice + Product MFE
├── Cart Context    → Cart Microservice + Cart MFE
├── Order Context   → Order Microservice + Checkout MFE
├── Payment Context → Payment Microservice (no separate MFE)
└── User Context    → User Microservice + Account MFE
```

---

## 5. DDD をマイクロフロントエンドに適用する

### 5.1 境界付きコンテキスト → マイクロフロントエンド

各境界コンテキストは 1 つのマイクロサービスにマップされるだけでなく、**1 つのマイクロ フロントエンド**にもマップされます。

```
Bounded Context: Product Catalog
├── Backend: Product Microservice
│   ├── REST API / GraphQL
│   ├── PostgreSQL database
│   └── Search index (Elasticsearch)
│
├── Frontend: Product Micro Frontend
│   ├── Product listing page
│   ├── Product detail page
│   ├── Search & filter UI
│   └── Product reviews
│
└── Team: Product Team (full-stack ownership)
```

### 5.2 DDD に基づくチーム トポロジ

```
┌──────────────────────────────────────────┐
│              Organization                │
├──────────┬──────────┬────────┬───────────┤
│ Team     │ Team     │ Team   │ Team      │
│ Product  │ Cart     │ Order  │ Platform  │
├──────────┼──────────┼────────┼───────────┤
│ MFE:     │ MFE:     │ MFE:   │ Shell App │
│ Product  │ Cart     │ Order  │ Design Sys│
│ pages    │ sidebar  │ pages  │ Auth      │
├──────────┼──────────┼────────┼───────────┤
│ µS:      │ µS:      │ µS:    │ API GW    │
│ Product  │ Cart     │ Order  │ Infra     │
│ API      │ API      │ API    │           │
├──────────┼──────────┼────────┼───────────┤
│ DB:      │ DB:      │ DB:    │ Shared    │
│ Postgres │ Redis    │ Postgres│ Services │
└──────────┴──────────┴────────┴───────────┘
```

---

## 概要

- **DDD** はシステムを適切に分解するための思考基盤です
- **境界コンテキスト** で境界を定義 → マイクロサービス + マイクロ フロントエンドにマップ
- **イベント ストーミング** は、ビジネス専門家とのドメイン探索に役立ちます
- **コンテキスト マッピング** はコンテキスト間の関係を定義します
- (技術レイヤーごとではなく) **ドメイン** で分割することが黄金律です

---

**次の記事:** [レッスン 3: フルスタックのアーキテクチャの概要 — マイクロサービス + マイクロ フロントエンド + BFF](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-3-kien-truc-tong-quan-full-stack-microservices-micro-frontend-bff)
