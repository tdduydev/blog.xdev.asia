---
id: 019d8a22-c309-7a10-b001-a1b2c3d4e509
title: 第 9 課：事件溯源與 CQRS
slug: bai-9-event-sourcing-cqrs
description: 事件溯源－將狀態儲存為事件字串、事件儲存、快照最佳化。 CQRS — 單獨的命令和查詢模型、最終一致性、單獨的讀取/寫入資料庫、何時使用 CQRS。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 9
section_title: 第 3 部分：微服務中的資料管理
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: 雲端原生微服務架構
  slug: cloud-native-microservices-architecture
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ 建築 — 第 9 課</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 9 課：事件溯源與 CQRS</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">雲端原生微服務架構</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 3 部分：微服務中的資料管理</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 9 課：事件溯源與 CQRS](/storage/uploads/2026/03/cn-bai-9-diagram.webp)

## 簡介

事件溯源和 CQRS 是兩種經常齊頭並進的模式，有助於解決微服務中的資料一致性、稽核追蹤和效能最佳化等複雜問題。

---

## 1. 事件溯源

### 1.1 概念

不保存當前狀態，而是保存已發生的整個事件序列：

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

### 1.2 事件商店

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

**PostgreSQL 事件儲存：**

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

### 1.3 重建狀態

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

### 1.4 快照優化

當串流中的事件太多（數千個）且重播速度慢時→使用快照：

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

### 1.5 優點和缺點

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

## 2. CQRS－指令查詢職責分離

### 2.1 概念

單獨的**寫入模型**（命令）和**讀取模型**（查詢）：

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

### 2.2 為什麼要分開讀取和寫入？

```
Write:                              Read:
├── Ít operations hơn               ├── Nhiều operations hơn (10:1 ratio)
├── Cần ACID consistency             ├── Eventual consistency OK
├── Normalized schema                ├── Denormalized, pre-joined
├── Complex validation               ├── Simple query, fast response
├── Scale: moderate                   ├── Scale: aggressive (caching, replicas)
└── PostgreSQL (optimal)              └── Elasticsearch/Redis (optimal)
```

### 2.3 同步讀取模型

```
Option 1: Domain Events (khuyến nghị)
  Write DB ──event──▶ Kafka ──▶ Read Model Updater ──▶ Read DB

Option 2: Change Data Capture (CDC)
  Write DB ──Debezium──▶ Kafka ──▶ Read Model Updater ──▶ Read DB

Option 3: Dual Write (KHÔNG khuyến nghị)
  Service ──write──▶ Write DB
          ──write──▶ Read DB    ← Có thể inconsistent!
```

### 2.4 CQRS + 事件溯源

結合兩種模式：

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

### 2.5 最終一致性

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

## 3. 何時使用事件溯源/CQRS？

### 3.1 在下列情況下應使用事件溯源

- ✅ 需要完整的**審計追蹤**（財務、醫療保健、法律）
- ✅需要**時間旅行**（隨時重建狀態）
- ✅ 網域具有**複雜的狀態轉換**（訂單工作流程、預訂）
- ✅ 需要**調試生產問題**（重播事件）
- ✅ 事件驅動架構已經是基礎

### 3.2 什麼時候應該使用CQRS？

- ✅ 讀/寫比率**差異很大**（10:1 或更多）
- ✅ 讀寫需要**不同的尺度**
- ✅ 讀取需要**非規範化/預計算**的模型
- ✅ 複雜查詢需要**搜尋引擎**（Elasticsearch）

### 3.3 不應在下列情況下使用

- ❌簡單的CRUD應用程式
- ❌團隊沒有事件驅動經驗
- ❌ 域簡單，狀態轉換少
- ❌一致性要求=處處強一致性
- ❌ 期限緊迫，需快速出貨

---

## 4. 總結

|圖案|重點|
|--------|------------|
|事件溯源 |保存事件而不是狀態、僅附加、審計追蹤 |
|活動商店 |不可變的事件日誌，真相來源 |
|快照|使用定期快照優化重建 |
| CQRS |獨立的讀/寫模型，獨立擴展 |
|最終一致性|寫入後讀取模型更新（ms級延遲）|
|投影|處理事件→更新讀取模型|

> **下一篇文章**：Saga 模式 - 當每個服務都有自己的資料庫時處理分散式交易。
