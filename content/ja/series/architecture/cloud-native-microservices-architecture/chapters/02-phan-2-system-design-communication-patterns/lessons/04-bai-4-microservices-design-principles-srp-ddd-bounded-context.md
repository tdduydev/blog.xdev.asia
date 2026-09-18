---
id: 019d8a22-c304-7a10-b001-a1b2c3d4e504
title: 'レッスン 4: マイクロサービスの設計原則 — SRP、DDD、および境界付きコンテキスト'
slug: bai-4-microservices-design-principles-srp-ddd-bounded-context
description: >-
  マイクロサービスとは何か、単一責任の原則、ドメイン駆動設計、サービス境界を定義する境界コンテキスト、疎結合と高結合度、マイクロサービスを使用すべき場合と使用すべきでない場合。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 4
section_title: 'パート 2: マイクロサービスの設計と通信パターン'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8213" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-8213)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1028" cy="94" r="36" fill="#fbbf24" opacity="0.09"/>
    <circle cx="956" cy="202" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="884" cy="50" r="34" fill="#fbbf24" opacity="0.07"/>
    <circle cx="812" cy="158" r="18" fill="#fbbf24" opacity="0.11"/>
    <circle cx="740" cy="266" r="32" fill="#fbbf24" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <line x1="600" y1="94" x2="1100" y2="174" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="124" x2="1050" y2="194" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="969.1147367097487,129.5 969.1147367097487,158.5 944,173 918.8852632902513,158.5 918.8852632902513,129.5 944,115" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ アーキテクチャ — レッスン 4</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 4: マイクロサービスの設計原則 —</tspan>
      <tspan x="60" dy="42">SRP、DDD、および境界付きコンテキスト</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 2: マイクロサービスの設計と通信パターン</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 4: マイクロサービスの設計原則 — SRP、DDD、および境界付きコンテキスト](/storage/uploads/2026/03/cn-bai-4-diagram.webp)

## はじめに

マイクロサービスは単に「モノリスを分割する」だけではありません。間違った方法で分割すると、両方のアーキテクチャのすべての欠点を伴う「分散モノリス」が作成されます。この記事では、マイクロサービスを適切に分割するための設計原則について説明します。

---

## 1. マイクロサービスとは何ですか?

マイクロサービスは、アプリケーションが多数の小さな独立したサービスで構成される **アーキテクチャ スタイル**です。

```
Monolith                          Microservices
┌──────────────────────┐         ┌──────────┐ ┌──────────┐
│     Một ứng dụng     │         │  Order   │ │ Payment  │
│   ┌──────┐ ┌──────┐  │         │  Service │ │ Service  │
│   │Order │ │Payment│  │   →    └──────────┘ └──────────┘
│   ├──────┤ ├──────┤  │         ┌──────────┐ ┌──────────┐
│   │Invent│ │Notif  │  │         │Inventory │ │  Notif   │
│   └──────┘ └──────┘  │         │  Service │ │ Service  │
│    Shared Database    │         └──────────┘ └──────────┘
└──────────────────────┘          Mỗi service có DB riêng
```

### 機能

- **別のプロセスで実行**: 各サービスは独立したプロセス/コンテナです
- **ネットワーク通信**: HTTP/REST、gRPC、メッセージキュー
- **独立した展開**: サービス B に影響を与えずにサービス A を展開します。
- **プライベート データベース**: サービスごとのデータベース パターン
- **小規模チーム**: 1 ～ 3 つのサービスを所有する 2 つのピザ チーム (5 ～ 8 人)

---

## 2. 単一責任原則 (SRP)

> 各サービスは **1 つの操作**のみを担当し、**変更する理由は 1 つ**あります。

```
✅ Đúng — Mỗi service một nghiệp vụ rõ ràng:
├── OrderService         → Quản lý vòng đời đơn hàng
├── PaymentService       → Xử lý thanh toán
├── InventoryService     → Quản lý tồn kho
├── NotificationService  → Gửi email/SMS/push
└── UserService          → Quản lý tài khoản

❌ Sai — Service "thùng rác":
├── OrderPaymentService      → 2 nghiệp vụ gộp
├── CommonService            → Mọi thứ chung
└── UtilityService           → Không rõ trách nhiệm
```

### SRP違反の兆候

- サービスに **無関係な API エンドポイントが多すぎます**
- 機能 A を変更するには、機能 B を再テストする必要があります
- 多くのチームが同じサービスを修正する
- サービス名に「and」または「util」または「common」が含まれる

---

## 3. ドメイン駆動設計 (DDD)

### 3.1 なぜ DDD が必要なのでしょうか?

DDD は、**「各サービスの境界はどこですか?」** という最も重要な質問に答えるのに役立ちます。

DDD では、技術 (フロントエンド サービス、バックエンド サービス、データベース サービス) ごとに分割するのではなく、**ビジネス ドメイン** ごとに分割します。

### 3.2 戦略的設計

#### ユビキタス言語

開発者とドメイン専門家の間で **共通言語**を構築します。

```
Domain Expert (Business):        Developer (Tech):
"Đơn hàng"                   →   Order
"Thanh toán"                  →   Payment
"Giao hàng"                  →   Shipment
"Hoàn tiền"                  →   Refund
"Kho hàng"                   →   Inventory

Đảm bảo: Code, API, database, documentation đều dùng cùng thuật ngữ
```

#### 境界付きコンテキスト

境界コンテキストは、**モデルが意味を持つ範囲**を定義します。

```
┌──────────────────────────────────────────────────────┐
│                   E-Commerce System                   │
│                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐ │
│  │   Order      │  │  Catalog    │  │  Customer    │ │
│  │   Context    │  │  Context    │  │  Context     │ │
│  │              │  │             │  │              │ │
│  │  "Product"   │  │  "Product"  │  │  "Customer"  │ │
│  │  = OrderItem │  │  = SKU with │  │  = Account   │ │
│  │  (id, qty,   │  │  specs,     │  │  with prefs, │ │
│  │   price)     │  │  images,    │  │  addresses   │ │
│  │              │  │  pricing    │  │              │ │
│  └─────────────┘  └─────────────┘  └──────────────┘ │
│                                                       │
│  Cùng từ "Product" nhưng ý nghĩa KHÁC NHAU           │
│  trong mỗi Bounded Context                           │
└──────────────────────────────────────────────────────┘
```

**重要なルール**: 境界付けられた各コンテキスト → 1 つ (または複数) のマイクロサービス。

### 3.3 コンテキストのマッピング — コンテキスト間の関係

```
┌─────────────┐    Published    ┌──────────────┐
│   Order     │────Language────▶│   Payment    │
│   Context   │                 │   Context    │
└──────┬──────┘                 └──────────────┘
       │
       │ Customer/Supplier
       ▼
┌─────────────┐    Conformist   ┌──────────────┐
│  Shipping   │◀───────────────│  3rd Party   │
│  Context    │                 │  Logistics   │
└─────────────┘                 └──────────────┘
```

|関係 |説明 |
|-----------|----------|
| **共有カーネル** | 2 つのコンテキストがサブセット コード/モデルを共有する |
| **顧客/サプライヤー** |上流は API を提供し、下流は消費します。
| **適合者** |ダウンストリームはアップストリーム モデルに完全に準拠 |
| **腐敗防止層** |外部モデルと内部モデルの間の変換層 |
| **公開言語** |標準形式 (JSON スキーマ、Protobuf) で通信する |

### 3.4 戦術的設計 — 構成要素

```
Bounded Context
│
├── Entity        → Có identity, lifecycle (Order, User)
├── Value Object  → Không có identity, immutable (Money, Address)
├── Aggregate     → Cluster of entities, consistency boundary
│   └── Aggregate Root → Entry point (Order là root, OrderItem là child)
├── Domain Event  → Sự kiện nghiệp vụ (OrderCreated, PaymentReceived)
├── Repository    → Persistence abstraction
└── Domain Service → Logic không thuộc entity nào (PricingCalculator)
```

#### 集計 — 一貫性ユニット

```
Order Aggregate:
┌───────────────────────────────┐
│  Order (Aggregate Root)       │
│  ├── id: "O-001"             │
│  ├── status: "confirmed"     │
│  ├── total: $500             │
│  │                           │
│  ├── OrderItem               │
│  │   ├── product: "iPhone"   │
│  │   ├── qty: 1              │
│  │   └── price: $400         │
│  │                           │
│  ├── OrderItem               │
│  │   ├── product: "Case"     │
│  │   ├── qty: 1              │
│  │   └── price: $100         │
│  │                           │
│  └── ShippingAddress         │
│      └── "123 ABC Street"   │
└───────────────────────────────┘

Quy tắc:
- Chỉ truy cập thông qua Aggregate Root (Order)
- Một transaction = một aggregate
- Cross-aggregate = eventual consistency
```

---

## 4. 疎結合と高い凝集性

### 4.1 疎結合

サービス A を変更しても、サービス B を変更する必要はありません**。

```
✅ Loose Coupling:
Order Service ──event──▶ Kafka ──▶ Payment Service
(Thay đổi internal logic của Order → Payment không bị ảnh hưởng)

❌ Tight Coupling:
Order Service ──direct DB query──▶ Payment Database
(Thay đổi schema Payment DB → Order Service bị broken)
```

### 4.2 高い凝集性

**関連**機能は**1つの**サービスにグループ化されています。

```
✅ High Cohesion:
Payment Service:
├── ProcessPayment()
├── RefundPayment()
├── ValidateCard()
└── GetPaymentHistory()
→ Tất cả đều liên quan đến "thanh toán"

❌ Low Cohesion:
MiscService:
├── ProcessPayment()
├── SendEmail()
├── GenerateReport()
└── ResizeImage()
→ Không liên quan gì đến nhau
```

---

## 5. マイクロサービスを使用すべき/使用すべきでないのはどのような場合ですか?

### 5.1 は次の場合に使用する必要があります。

- ✅ **大規模** システム、多くのチームが並行して開発
- ✅ システムの各部分を個別に拡張する必要がある
- ✅ **多言語対応** (複数の言語/フレームワーク) が必要です
- ✅ 迅速なリリース サイクル、**継続的な展開**
- ✅ **明確な境界**を持つ複雑なドメイン
- ✅ 組織は **DevOps の成熟度** (CI/CD、モニタリング、コンテナ オーケストレーション) を備えています

### 5.2 次の場合は使用しないでください。

- ❌ チーム **小規模** (< 5 人)
- ❌ **シンプル** アプリケーション、それほど複雑ではないドメイン
- ❌ **明確に理解されていない** ドメイン境界
- ❌ **CI/CD** インフラストラクチャとコンテナ オーケストレーションなし
- ❌ **開発期間**は限られています
- ❌ チームには分散システムの運用経験がない

### 5.3 Monolith First

Martin Fowler は **「モノリス ファースト」** を推奨しています。

```
Phase 1: Monolith
├── Hiểu rõ domain
├── Phát triển nhanh
└── Xác định boundary tự nhiên

Phase 2: Modular Monolith
├── Tách module rõ ràng trong monolith
├── Mỗi module có boundary riêng
└── Giao tiếp qua internal API

Phase 3: Microservices (khi cần)
├── Tách module thành service
├── Thêm API Gateway
└── Event-driven communication
```

---

## 6. アンチパターンは避けるべきです

### Distributed Monolith

```
❌ Chia thành nhiều service nhưng:
- Deploy phải đồng thời tất cả
- Shared database
- Synchronous chain calls dài
- Tightly coupled API contracts

→ Có đầy đủ nhược điểm của cả Monolith VÀ Microservices
→ Không có ưu điểm của cái nào cả
```

### ナノサービス (小さすぎる)

```
❌ Chia quá nhỏ:
├── CreateOrderService
├── UpdateOrderService
├── DeleteOrderService
├── GetOrderService
└── ListOrderService

→ Quá nhiều service, overhead network, khó quản lý
→ Nên gom thành: OrderService
```

---

## 7. まとめ

|原則 |キーポイント |
|-----------|-----------|
|希望小売価格 |各サービスにはビジネスがあり、変更する理由があります。
| DD |技術ではなく境界コンテキストに従ってサービスを分割する |
|集計 |整合性ユニット、集約ルート経由でアクセス可能 |
|疎結合 |サービス A を変更してもサービス B には影響しません。
|高い凝集力 |関連する機能を 1 つのサービスにグループ化 |
|モノリスファースト |モノリスから始めて、ドメインを理解したら徐々に分離 |

> **次の記事**: 同期通信 — REST API と gRPC、マイクロサービス間の同期通信で最も一般的な 2 つのプロトコル。
