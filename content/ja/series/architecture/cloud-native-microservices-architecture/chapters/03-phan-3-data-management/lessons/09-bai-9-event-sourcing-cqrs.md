---
id: 019d8a22-c309-7a10-b001-a1b2c3d4e509
title: 'レッスン 9: イベント ソーシングと CQRS'
slug: bai-9-event-sourcing-cqrs
description: >-
  イベント ソーシング - 状態をイベント文字列として保存、イベント ストア、スナップショットの最適化。 CQRS — 個別のコマンド モデルとクエリ
  モデル、結果整合性、個別の読み取り/書き込みデータベース、CQRS をいつ使用するか。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 9
section_title: 'パート 3: マイクロサービスにおけるデータ管理'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3592" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3592)"/>

  <!-- Decorations -->
  <g>
    <circle cx="746" cy="248" r="34" fill="#2dd4bf" opacity="0.13"/>
    <circle cx="892" cy="234" r="32" fill="#2dd4bf" opacity="0.11"/>
    <circle cx="1038" cy="220" r="30" fill="#2dd4bf" opacity="0.09"/>
    <circle cx="684" cy="206" r="28" fill="#2dd4bf" opacity="0.07"/>
    <circle cx="830" cy="192" r="26" fill="#2dd4bf" opacity="0.05"/>
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
    <line x1="600" y1="208" x2="1100" y2="288" stroke="#2dd4bf" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="238" x2="1050" y2="308" stroke="#2dd4bf" stroke-width="0.5" opacity="0.08"/>
    <polygon points="995.2390923627308,136.5 995.2390923627308,179.5 958,201 920.7609076372692,179.5 920.7609076372692,136.5 958,115" fill="none" stroke="#2dd4bf" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#2dd4bf"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#2dd4bf" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ アーキテクチャ — レッスン 9</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 9: イベント ソーシングと CQRS</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 3: マイクロサービスにおけるデータ管理</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 9: イベント ソーシングと CQRS](/storage/uploads/2026/03/cn-bai-9-diagram.webp)

## はじめに

イベント ソーシングと CQRS は、多くの場合連携して行われる 2 つのパターンであり、マイクロサービスにおけるデータの一貫性、監査証跡、パフォーマンスの最適化といった複雑な問題の解決に役立ちます。

---

## 1. イベントソーシング

### 1.1 コンセプト

現在の状態を保存する代わりに、発生したイベントのシーケンス全体を保存します。

```
Traditional (State-based):
┌──────────────────────────────┐
│ Orders Table                 │
│ id: O-001                    │
│ status: shipped       ← Chỉ biết state hiện tại
│ total: 500,000               │
│ updated_at: 2026-03-31       │
└──────────────────────────────┘

Event Sourcing:
┌──────────────────────────────────────────────────────────┐
│ Event Store (append-only)                                │
├────┬──────────────────┬──────────────┬──────────────────┤
│ #  │ Event Type       │ Data         │ Timestamp        │
├────┼──────────────────┼──────────────┼──────────────────┤
│ 1  │ OrderCreated     │ {items, ...} │ 10:00:00         │
│ 2  │ PaymentReceived  │ {amount}     │ 10:01:00         │
│ 3  │ ItemsReserved    │ {items}      │ 10:01:05         │
│ 4  │ OrderShipped     │ {tracking}   │ 10:30:00         │
└────┴──────────────────┴──────────────┴──────────────────┘

Current State = replay(events) → Order{status: "shipped"}
```

### 1.2 イベントストア

```
Đặc điểm:
├── Append-only: Không bao giờ update hoặc delete events
├── Immutable: Events là facts đã xảy ra, không thể thay đổi
├── Ordered: Events có thứ tự rõ ràng (sequence number)
└── Stream: Events được nhóm theo aggregate (ví dụ: order-O-001)

Implementation options:
├── EventStoreDB (purpose-built, recommended)
├── PostgreSQL + events table
├── Apache Kafka (log-based)
└── DynamoDB Streams (AWS)
```

**PostgreSQL イベント ストア:**

```sql
CREATE TABLE events (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stream_id   VARCHAR(255) NOT NULL,     -- "order-O-001"
    version     BIGINT NOT NULL,           -- sequence number
    event_type  VARCHAR(255) NOT NULL,     -- "OrderCreated"
    data        JSONB NOT NULL,            -- event payload
    metadata    JSONB DEFAULT '{}',        -- traceId, userId, ...
    created_at  TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(stream_id, version)             -- đảm bảo ordering
);

CREATE INDEX idx_events_stream ON events(stream_id, version);
```

### 1.3 状態の再構築

```python
def get_order(order_id: str) -> Order:
    events = event_store.get_events(stream_id=f"order-{order_id}")

    order = Order()  # empty state
    for event in events:
        order.apply(event)  # replay từng event

    return order  # current state

class Order:
    def apply(self, event):
        match event.type:
            case "OrderCreated":
                self.id = event.data["id"]
                self.status = "created"
                self.items = event.data["items"]
            case "PaymentReceived":
                self.status = "paid"
            case "OrderShipped":
                self.status = "shipped"
                self.tracking = event.data["tracking"]
```

### 1.4 スナップショットの最適化

ストリームにイベントが多すぎて（数千）、再生が遅い場合 → スナップショットを使用します。

```
Event Stream cho order-O-001:
  Event 1: OrderCreated
  Event 2: ItemAdded
  ...
  Event 500: ItemRemoved
  ──── Snapshot at version 500 ────
  { status: "processing", items: [...], total: 1000000 }

  Event 501: PaymentReceived
  Event 502: OrderShipped

Rebuild: Load snapshot (v500) + replay events 501-502
→ Nhanh hơn nhiều so với replay 502 events
```

### 1.5 メリットとデメリット

```
✅ Ưu điểm:
├── Complete audit trail (ai làm gì, lúc nào)
├── Time travel: Rebuild state tại bất kỳ thời điểm
├── Event replay: Fix bug rồi replay events để sửa data
├── Natural fit cho event-driven architecture
└── Debug: Hiểu chính xác điều gì đã xảy ra

❌ Nhược điểm:
├── Complexity: Khó hơn CRUD đáng kể
├── Query: Không thể query trực tiếp (cần CQRS)
├── Schema evolution: Thay đổi event format phức tạp
├── Storage: Nhiều events → nhiều storage
└── Learning curve: Team cần thời gian adapt
```

---

## 2. CQRS — コマンドクエリの責任の分離

### 2.1 概念

**書き込み用モデル** (コマンド) と **読み取り用モデル** (クエリ) を分けます。

```
Traditional:
  Client ──CRUD──▶ Same Model ──▶ Same Database

CQRS:
                    ┌─────────────────────────────────────┐
                    │            API Layer                  │
                    └──────────┬───────────────┬───────────┘
                               │               │
                    ┌──────────▼──────┐ ┌──────▼──────────┐
                    │  Command Side   │ │   Query Side     │
                    │  (Write Model)  │ │  (Read Model)    │
                    │                 │ │                   │
                    │  - CreateOrder  │ │  - GetOrderDetails│
                    │  - CancelOrder  │ │  - ListOrders     │
                    │  - UpdateStatus │ │  - SearchOrders   │
                    └────────┬────────┘ └────────▲─────────┘
                             │                   │
                    ┌────────▼────────┐  ┌───────┴─────────┐
                    │   PostgreSQL    │  │  Elasticsearch   │
                    │   (Write DB)   │  │   (Read DB)      │
                    │  Normalized     │  │  Denormalized    │
                    └────────┬────────┘  └─────────────────┘
                             │                   ▲
                             └───── Events ──────┘
                              (sync read model)
```

### 2.2 なぜ読み取りと書き込みを分けるのでしょうか?

```
Write:                              Read:
├── Ít operations hơn               ├── Nhiều operations hơn (10:1 ratio)
├── Cần ACID consistency             ├── Eventual consistency OK
├── Normalized schema                ├── Denormalized, pre-joined
├── Complex validation               ├── Simple query, fast response
├── Scale: moderate                   ├── Scale: aggressive (caching, replicas)
└── PostgreSQL (optimal)              └── Elasticsearch/Redis (optimal)
```

### 2.3 読み取りモデルの同期

```
Option 1: Domain Events (khuyến nghị)
  Write DB ──event──▶ Kafka ──▶ Read Model Updater ──▶ Read DB

Option 2: Change Data Capture (CDC)
  Write DB ──Debezium──▶ Kafka ──▶ Read Model Updater ──▶ Read DB

Option 3: Dual Write (KHÔNG khuyến nghị)
  Service ──write──▶ Write DB
          ──write──▶ Read DB    ← Có thể inconsistent!
```

### 2.4 CQRS + イベントソーシング

両方のパターンを組み合わせます。

```
Command Flow:
  Client ──CreateOrder──▶ Command Handler
                              │
                         Validate
                              │
                         Append event to Event Store
                              │
                         Publish event to Kafka
                              │
                              ▼
                         Event Store (source of truth)

Query Flow:
  Kafka ──OrderCreated──▶ Projection Handler
                              │
                         Update Read Model (Elasticsearch)
                              │
  Client ──GetOrder──▶ Query Handler ──▶ Read from Elasticsearch
```

### 2.5 最終的な整合性

```
Timeline:
  T0: Client tạo order (write to Event Store)
  T1: Event published to Kafka (~5ms)
  T2: Projection handler updates Elasticsearch (~50ms)
  T3: Read model available (~100ms after T0)

Giữa T0 và T3: Read model chưa có data mới = Eventual Consistency

Giải pháp UX:
├── Optimistic UI: Client hiển thị ngay sau write, không đợi read model
├── Read-your-writes: Sau write, query write DB cho user đó
├── Polling/WebSocket: Client poll cho đến khi read model updated
└── Inbox pattern: Return 202 Accepted + polling endpoint
```

---

## 3. イベント ソーシング/CQRS をいつ使用するか?

### 3.1 次の場合にはイベント ソーシングを使用する必要があります。

- ✅ 完全な **監査証跡** が必要 (財務、医療、法律)
- ✅ **タイムトラベル**が必要 (いつでも状態を再構築)
- ✅ ドメインには **複雑な状態遷移**があります (注文ワークフロー、予約)
- ✅ **本番環境の問題をデバッグ**する必要があります (イベントをリプレイ)
- ✅ イベント駆動型アーキテクチャはすでに基盤となっています

### 3.2 CQRS はどのような場合に使用する必要がありますか?

- ✅ 読み取り/書き込み比 **大きな違い** (10:1 以上)
- ✅ 読み取りと書き込みには **異なるスケール**が必要です
- ✅ **非正規化/事前計算**が必要なモデルを読み取る
- ✅ 複雑なクエリには **検索エンジン** (Elasticsearch) が必要です

### 3.3 次の場合には使用しないでください。

- ❌ シンプルな CRUD アプリケーション
- ❌ チームにはイベントドリブンの経験がない
- ❌ ドメインが単純で、状態遷移が少ない
- ❌ 一貫性要件 = どこでも強い一貫性
- ❌ 締め切りが迫っており、すぐに発送する必要があります

---

## 4. まとめ

|パターン |キーポイント |
|----------|----------|
|イベントソーシング |状態の代わりにイベントを保存、追加のみ、監査証跡 |
|イベントストア |不変のイベントログ、信頼できる情報源 |
|スナップショット |定期的なスナップショットを使用して再構築を最適化する |
| CQRS |個別の読み取り/書き込みモデル、個別にスケーリング |
|最終的な整合性 |書き込み後のモデル更新の読み取り (ms レベルの遅延) |
|投影 |イベントの処理 → 読み取りモデルの更新 |

> **次の記事**: Saga パターン — 各サービスが独自のデータベースを持つ場合の分散トランザクションの処理。
