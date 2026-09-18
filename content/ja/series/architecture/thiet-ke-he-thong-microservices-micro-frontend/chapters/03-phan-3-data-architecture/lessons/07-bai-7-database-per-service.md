---
id: 019e4a33-d407-7b20-c001-b1c2d3e4f507
title: 'レッスン 7: サービスごとのデータベースと多言語の永続性'
slug: bai-7-database-per-service-polyglot-persistence
description: >-
  各サービスに独自のデータベースが必要なのはなぜですか?適切なデータベースを選択するための戦略:
  PostgreSQL、MongoDB、Redis、Elasticsearch。共有データベースのアンチパターン。データの分離、スキーマの所有権、および移行戦略。
duration_minutes: 75
is_free: true
video_url: null
sort_order: 7
section_title: 'パート 3: マイクロサービスのデータ アーキテクチャ'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3024" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3024)"/>

  <!-- Decorations -->
  <g>
    <circle cx="855" cy="175" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="610" cy="50" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="865" cy="185" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="620" cy="60" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="875" cy="195" r="8" fill="#fb923c" opacity="0.1"/>
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ アーキテクチャ — レッスン 7</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 7: サービスごとのデータベースと多言語対応</tspan>
      <tspan x="60" dy="42">持続性</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 3: マイクロサービスのデータ アーキテクチャ</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

「サービスごとのデータベース」はマイクロサービスの基本パターンです。これがなければ、実際のマイクロサービスは存在せず、同じデータベース (分散モノリス) を共有するモジュールだけが存在します。この記事では、その理由、適切な DB の選択方法、データ共有の処理方法について説明します。


![サービスごとのデータベース — 各サービスは独自のデータベースを所有します](/storage/uploads/2026/04/mfe-ms-diagram-bai7-database-per-service.webp)

---

## 1. サービスごとにデータベースを使用する理由

### 1.1 共有データベース — 分散モノリスへの道

```
❌ Shared Database Anti-pattern:
┌────────┐ ┌────────┐ ┌────────┐
│User µS │ │Order µS│ │Payment │
└───┬────┘ └───┬────┘ └───┬────┘
    │          │          │
    └──────────┼──────────┘
               ▼
    ┌─────────────────────┐
    │  Shared PostgreSQL  │
    │  ├── users          │  ← ai own schema này?
    │  ├── orders         │  ← coupling tại data layer
    │  ├── payments       │  ← thay đổi schema = break all
    │  └── products       │
    └─────────────────────┘
```

**問題:**
- スキーマの変更はすべてのサービスに影響します
- データベースを独立して拡張できない
- 密結合 - 導入は同時に行う必要があります
- ユースケースごとに異なるデータベースを使用することはできません

### 1.2 サービスごとのデータベース

```
✅ Database per Service:
┌────────┐    ┌────────┐    ┌────────┐
│User µS │    │Order µS│    │Cart µS │
└───┬────┘    └───┬────┘    └───┬────┘
    │             │             │
    ▼             ▼             ▼
┌────────┐  ┌────────┐    ┌────────┐
│PostgreSQL│ │PostgreSQL│  │ Redis  │
│(users)  │  │(orders) │   │(carts) │
└─────────┘  └─────────┘  └────────┘

Mỗi service own data riêng.
Schema changes chỉ ảnh hưởng 1 service.
Có thể chọn DB phù hợp nhất cho use case.
```

---

## 2. 多言語永続性 — 適切な DB を選択する

### 2.1 意思決定マトリックス

|使用例 |データベース |なぜ |
|----------|----------|----------|
|ユーザープロフィール、注文 | **PostgreSQL** | ACID、リレーショナル、成熟した |
|製品カタログ | **PostgreSQL + Elasticsearch** |リレーショナル + 全文検索 |
|ショッピングカート | **Redis** |高速、一時的な TTL サポート |
|セッションストア | **Redis** |メモリ内、有効期限が短い |
|アクティビティ ログ、イベント | **MongoDB / Kafka** |スキーマに柔軟、追加のみ |
|推奨事項 | **Neo4j / Redis** |グラフの関係 / キャッシュ |
|アナリティクス/BI | **クリックハウス / BigQuery** |列形式の高速集計 |

### 2.2 電子商取引プラットフォームのデータベース設計

```
┌─────────────────────────────────────────────┐
│ User Service → PostgreSQL                   │
│   users, addresses, preferences             │
├─────────────────────────────────────────────┤
│ Product Service → PostgreSQL + Elasticsearch│
│   products, categories, reviews (PG)        │
│   search index (ES)                         │
├─────────────────────────────────────────────┤
│ Cart Service → Redis                        │
│   cart:{userId} → JSON (items, quantities)  │
│   TTL: 7 days (auto-expire abandoned carts) │
├─────────────────────────────────────────────┤
│ Order Service → PostgreSQL                  │
│   orders, order_items, order_status_history  │
├─────────────────────────────────────────────┤
│ Payment Service → PostgreSQL                │
│   transactions, refunds, payment_methods    │
└─────────────────────────────────────────────┘
```

---

## 3. データ共有パターン

サービス A がサービス B からのデータを必要とする場合:

### 3.1 APIの構成
サービス A は、データが必要なときにサービス B の API を呼び出します。シンプルですが、実行時の依存関係が作成されます。

### 3.2 イベントを伴う状態転送
サービス B がデータを含むイベントを公開 → サービス A がローカル コピーを保存します。
```
ProductService publishes: ProductUpdated {id, name, price, image}
OrderService subscribes → lưu product snapshot trong order_items
→ Không cần gọi ProductService khi hiển thị order history
```

### 3.3 CQRS (詳細はレッスン 9 を参照)
イベントから読み取りに最適化されたビューを作成します (専用のクエリ サービス)。

---

## 4. スキーマ移行戦略

各サービスは独自のスキーマを管理します。
- **Flyway / Liquibase** (Java) または **Prisma Migrate / Knex** (Node.js)
- ソースコードでバージョン管理された移行スクリプト
- 下位互換性のある変更: 列の追加 (NULL 可能)、テーブルの追加
- 重大な変更: 多段階の移行 (新規追加 → データ移行 → 古いデータの削除)

---

## 概要

- **サービスごとのデータベース** は、実際のマイクロサービスでは交渉の余地がありません
- ユースケースに応じたDBの選択（**ポリグロット永続化**）
- **イベント** (推奨) または **API 呼び出し** によるデータ共有
- スキーマの移行は各サービス チームの責任です

---

**次の記事:** [レッスン 8: Saga パターンと分散トランザクション](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-8-saga-pattern-distributed-transactions)
