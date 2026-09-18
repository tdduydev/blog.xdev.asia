---
id: 019d8a22-c309-7a10-b001-a1b2c3d4e509
title: "Bài 9: Event Sourcing & CQRS"
slug: bai-9-event-sourcing-cqrs
description: >-
  Event Sourcing — lưu trạng thái dưới dạng chuỗi event, Event Store,
  snapshot optimization. CQRS — tách Command và Query model, eventual consistency,
  read/write database riêng biệt, khi nào nên dùng CQRS.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 9
section_title: "Phần 3: Data Management trong Microservices"
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: "Cloud Native Microservices Architecture"
  slug: cloud-native-microservices-architecture
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ Kiến trúc — Bài 9</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 9: Event Sourcing &amp; CQRS</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Cloud Native Microservices Architecture</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 3: Data Management trong Microservices</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 9: Event Sourcing & CQRS](/storage/uploads/2026/03/cn-bai-9-diagram.webp)

## Giới thiệu

Event Sourcing và CQRS là hai pattern thường đi đôi, giúp giải quyết các bài toán phức tạp về data consistency, audit trail và performance optimization trong microservices.

---

## 1. Event Sourcing

### 1.1 Concept

Thay vì lưu **trạng thái hiện tại** (current state), lưu **toàn bộ chuỗi sự kiện** (events) đã xảy ra:

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

### 1.2 Event Store

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

**PostgreSQL Event Store:**

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

### 1.3 Rebuilding State

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

### 1.4 Snapshot Optimization

Khi stream có quá nhiều events (hàng nghìn), replay chậm → dùng Snapshot:

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

### 1.5 Ưu và nhược điểm

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

## 2. CQRS — Command Query Responsibility Segregation

### 2.1 Concept

Tách biệt **model cho write** (Command) và **model cho read** (Query):

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

### 2.2 Tại sao tách Read và Write?

```
Write:                              Read:
├── Ít operations hơn               ├── Nhiều operations hơn (10:1 ratio)
├── Cần ACID consistency             ├── Eventual consistency OK
├── Normalized schema                ├── Denormalized, pre-joined
├── Complex validation               ├── Simple query, fast response
├── Scale: moderate                   ├── Scale: aggressive (caching, replicas)
└── PostgreSQL (optimal)              └── Elasticsearch/Redis (optimal)
```

### 2.3 Synchronizing Read Model

```
Option 1: Domain Events (khuyến nghị)
  Write DB ──event──▶ Kafka ──▶ Read Model Updater ──▶ Read DB

Option 2: Change Data Capture (CDC)
  Write DB ──Debezium──▶ Kafka ──▶ Read Model Updater ──▶ Read DB

Option 3: Dual Write (KHÔNG khuyến nghị)
  Service ──write──▶ Write DB
          ──write──▶ Read DB    ← Có thể inconsistent!
```

### 2.4 CQRS + Event Sourcing

Kết hợp cả hai pattern:

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

### 2.5 Eventual Consistency

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

## 3. Khi nào dùng Event Sourcing / CQRS?

### 3.1 Nên dùng Event Sourcing khi

- ✅ Cần **audit trail** đầy đủ (finance, healthcare, legal)
- ✅ Cần **time travel** (rebuild state tại bất kỳ thời điểm)
- ✅ Domain có **complex state transitions** (order workflow, booking)
- ✅ Cần **debug production issues** (replay events)
- ✅ Event-driven architecture đã là nền tảng

### 3.2 Nên dùng CQRS khi

- ✅ Read/Write ratio **chênh lệch lớn** (10:1 hoặc hơn)
- ✅ Read và Write cần **scale khác nhau**
- ✅ Read model cần **denormalized/pre-computed**
- ✅ Complex queries cần **search engine** (Elasticsearch)

### 3.3 KHÔNG nên dùng khi

- ❌ Simple CRUD application
- ❌ Team chưa có kinh nghiệm event-driven
- ❌ Domain đơn giản, ít state transitions
- ❌ Consistency requirement = strong consistency everywhere
- ❌ Deadline gấp, cần ship nhanh

---

## 4. Tổng kết

| Pattern | Key Point |
|---------|-----------|
| Event Sourcing | Lưu events thay vì state, append-only, audit trail |
| Event Store | Immutable log of events, source of truth |
| Snapshot | Optimize rebuild bằng periodic snapshots |
| CQRS | Tách read/write model, scale independently |
| Eventual Consistency | Read model cập nhật sau write (ms-level delay) |
| Projection | Process events → update read model |

> **Bài tiếp theo**: Saga Pattern — Giải quyết distributed transactions khi mỗi service có database riêng.
