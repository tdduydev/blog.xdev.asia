---
id: 019d8a22-c306-7a10-b001-a1b2c3d4e506
title: "Bài 6: Asynchronous Communication — Message Queue & Event Streaming"
slug: bai-6-asynchronous-communication-message-queue-event-streaming
description: >-
  Message Queue (RabbitMQ) vs Event Streaming (Apache Kafka), Pub/Sub pattern,
  Point-to-Point pattern, event schema design, idempotency, và khi nào
  chọn async over sync.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 6
section_title: "Phần 2: Microservices Design & Communication Patterns"
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: "Cloud Native Microservices Architecture"
  slug: cloud-native-microservices-architecture
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-9500" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-9500)"/>

  <!-- Decorations -->
  <g>
    <circle cx="819" cy="267" r="12" fill="#818cf8" opacity="0.12000000000000001"/>
    <circle cx="1038" cy="86" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="757" cy="165" r="16" fill="#818cf8" opacity="0.060000000000000005"/>
    <circle cx="976" cy="244" r="33" fill="#818cf8" opacity="0.13"/>
    <circle cx="695" cy="63" r="20" fill="#818cf8" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <line x1="600" y1="237" x2="1100" y2="317" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="267" x2="1050" y2="337" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1064.712812921102,221 1064.712812921102,253 1037,269 1009.287187078898,253 1009.287187078898,221 1037,205" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Kiến trúc — Bài 6</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 6: Asynchronous Communication —</tspan>
      <tspan x="60" dy="42">Message Queue &amp; Event Streaming</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Cloud Native Microservices Architecture</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 2: Microservices Design &amp; Communication Patterns</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 6: Asynchronous Communication — Message Queue & Event Streaming](/storage/uploads/2026/03/cn-bai-6-diagram.webp)

## Giới thiệu

Giao tiếp bất đồng bộ (asynchronous) cho phép services gửi message mà không cần chờ response. Đây là xương sống của Event-Driven Architecture và là chìa khoá để xây dựng hệ thống loosely coupled, resilient.

---

## 1. Tại sao cần Async Communication?

### 1.1 Vấn đề của Synchronous

```
Sync chain: Order → Payment → Inventory → Notification
                                              │
Vấn đề:                                      │
├── Temporal coupling: Tất cả phải online cùng lúc        
├── Latency: Total = sum(latency mỗi service)
├── Cascading failure: 1 service down → cả chain fail
└── Tight coupling: Order phải biết Payment, Inventory, ...
```

### 1.2 Giải pháp Async

```
Async: Order ──publish event──▶ Message Broker
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
                Payment        Inventory       Notification
                (subscribe)    (subscribe)     (subscribe)

Ưu điểm:
├── Temporal decoupling: Services không cần online cùng lúc
├── Performance: Order trả response ngay, không chờ downstream
├── Loose coupling: Order không biết ai subscribe
└── Resilience: Message broker buffer khi consumer down
```

---

## 2. Message Queue — Point-to-Point

### 2.1 Concept

Một producer gửi message, **chỉ một** consumer nhận và xử lý:

```
Producer ──msg──▶ Queue ──msg──▶ Consumer
                  (FIFO)

Nếu có nhiều consumers → Load balancing (round-robin)
Producer ──▶ Queue ──▶ Consumer 1
                   ──▶ Consumer 2
                   ──▶ Consumer 3
Mỗi message chỉ được xử lý bởi MỘT consumer
```

### 2.2 RabbitMQ

```
┌──────────┐    ┌──────────────────────────────────┐    ┌───────────┐
│ Producer │───▶│           RabbitMQ                │───▶│ Consumer  │
└──────────┘    │                                    │    └───────────┘
                │  ┌──────────┐    ┌──────────────┐ │
                │  │ Exchange │───▶│    Queue      │ │
                │  │ (routing)│    │ (buffer msgs) │ │
                │  └──────────┘    └──────────────┘ │
                └──────────────────────────────────┘

Exchange Types:
├── Direct   → Route by exact routing_key
├── Topic    → Route by pattern (order.* , *.created)
├── Fanout   → Broadcast to all bound queues
└── Headers  → Route by message headers
```

### 2.3 Use Cases cho Message Queue

- **Task Queue**: Background jobs (send email, generate report)
- **Work Distribution**: Phân chia công việc cho nhiều workers
- **Rate Limiting**: Buffer requests khi downstream chậm
- **Delayed Processing**: Dead Letter Exchange + TTL

---

## 3. Event Streaming — Pub/Sub

### 3.1 Concept

Producer **publish event**, nhiều consumer groups **subscribe** và xử lý **độc lập**:

```
                              Consumer Group A
                         ┌────▶ Payment Service
                         │
Producer ──▶ Topic ──────┤    Consumer Group B
(Order       (order.     ├────▶ Inventory Service
 Service)     created)   │
                         │    Consumer Group C
                         └────▶ Notification Service

Mỗi consumer group nhận TẤT CẢ messages
Trong một group, messages được phân chia cho các instances
```

### 3.2 Apache Kafka Architecture

```
┌────────────────────────────────────────────────────────┐
│                    Kafka Cluster                        │
│                                                         │
│  Topic: order.created                                   │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐          │
│  │ Partition 0│ │ Partition 1│ │ Partition 2│          │
│  │ msg1, msg4 │ │ msg2, msg5 │ │ msg3, msg6 │          │
│  │ msg7, ...  │ │ msg8, ...  │ │ msg9, ...  │          │
│  └────────────┘ └────────────┘ └────────────┘          │
│                                                         │
│  Broker 1         Broker 2         Broker 3             │
│  (Leader P0)     (Leader P1)     (Leader P2)           │
│  (Replica P1)    (Replica P2)    (Replica P0)          │
│                                                         │
│  ZooKeeper / KRaft (metadata management)               │
└────────────────────────────────────────────────────────┘
```

**Đặc điểm quan trọng:**
- **Log-based**: Messages được append-only, không xoá sau khi consume
- **Retention**: Giữ message theo thời gian (7 ngày default) hoặc size
- **Offset**: Mỗi consumer group track offset riêng
- **Replay**: Consumer có thể replay lại messages từ bất kỳ offset nào
- **Ordering**: Đảm bảo thứ tự trong partition (không đảm bảo cross-partition)

### 3.3 Topic Design

```
Naming convention: <domain>.<entity>.<event>

order.order.created
order.order.confirmed
order.order.cancelled
payment.payment.completed
payment.payment.failed
inventory.stock.reserved
inventory.stock.released

Partition key:
├── order_id → Đảm bảo events cùng order đi vào cùng partition → đúng thứ tự
├── customer_id → Events cùng customer ordered
└── random → Distribute đều, không đảm bảo ordering
```

---

## 4. Message Queue vs Event Streaming

| Tiêu chí | Message Queue (RabbitMQ) | Event Streaming (Kafka) |
|----------|-------------------------|------------------------|
| **Model** | Point-to-Point (hoặc Pub/Sub) | Pub/Sub (log-based) |
| **Message lifetime** | Deleted after consumed | Retained (configurable) |
| **Replay** | Không | Có |
| **Ordering** | Queue-level FIFO | Partition-level |
| **Throughput** | ~50K msg/s | ~1M+ msg/s |
| **Consumer groups** | Limited | Native support |
| **Use case** | Task queue, work distribution | Event streaming, audit log, analytics |
| **Complexity** | Thấp | Trung bình-Cao |
| **Protocol** | AMQP | Custom (Kafka protocol) |

### Khi nào chọn cái nào?

```
RabbitMQ:
├── Background jobs (send email, generate PDF)
├── Request-reply pattern
├── Complex routing rules
├── Low throughput (< 50K msg/s)
└── Team muốn đơn giản, ít learning curve

Kafka:
├── Event sourcing / Event-driven architecture
├── Stream processing (real-time analytics)
├── Audit log (cần replay)
├── High throughput (> 100K msg/s)
├── Multiple consumer groups cho cùng event
└── Data pipeline (connect to data warehouse)
```

---

## 5. Event Schema Design

### 5.1 CloudEvents Specification

Chuẩn hoá event format:

```json
{
  "specversion": "1.0",
  "id": "evt-001-abc-def",
  "source": "/services/order-service",
  "type": "com.myorg.order.created",
  "datacontenttype": "application/json",
  "time": "2026-03-31T10:00:00Z",
  "data": {
    "order_id": "O-001",
    "customer_id": "C-042",
    "items": [
      {"product_id": "P-100", "quantity": 2, "price": 250000}
    ],
    "total": 500000,
    "currency": "VND"
  }
}
```

### 5.2 Schema Evolution

Khi schema thay đổi, cần backward compatibility:

```
Schema Registry (Confluent / Apicurio):
├── v1: {order_id, customer_id, total}
├── v2: {order_id, customer_id, total, currency}  ← thêm optional field
└── v3: {order_id, customer_id, total, currency, discount}

Quy tắc:
✅ Thêm optional field → backward compatible
✅ Thêm default value cho field mới
❌ Xoá required field → breaking change
❌ Đổi type của field → breaking change
```

---

## 6. Idempotency — Xử lý duplicate messages

### 6.1 Vấn đề

Message broker đảm bảo **at-least-once delivery** → Consumer có thể nhận message **nhiều lần**:

```
Producer ──msg──▶ Broker ──msg──▶ Consumer
                              │      │
                              │  (process OK, nhưng ACK bị mất)
                              │      │
                              └──msg──▶ Consumer (nhận lại!)
```

### 6.2 Giải pháp: Idempotent Consumer

```sql
-- Lưu event_id đã xử lý
CREATE TABLE processed_events (
    event_id VARCHAR(255) PRIMARY KEY,
    processed_at TIMESTAMP DEFAULT NOW()
);

-- Trong consumer:
BEGIN;
  -- Kiểm tra đã xử lý chưa
  INSERT INTO processed_events (event_id) VALUES ('evt-001')
    ON CONFLICT (event_id) DO NOTHING;

  -- Nếu insert thành công (chưa xử lý) → xử lý business logic
  IF FOUND THEN
    UPDATE inventory SET stock = stock - 1 WHERE product_id = 'P-100';
  END IF;
COMMIT;
```

---

## 7. Tổng kết

| Pattern | Khi nào dùng |
|---------|-------------|
| Sync (REST/gRPC) | Cần response ngay, query, simple request-reply |
| Message Queue | Background jobs, task distribution, rate buffering |
| Event Streaming | Event-driven, audit log, multiple consumers, replay |
| Idempotent Consumer | Luôn implement cho mọi async consumer |
| Schema Registry | Khi event schema cần evolve mà không break consumers |

> **Bài tiếp theo**: API Gateway Pattern — Entry point duy nhất cho hệ thống microservices, xử lý routing, authentication, rate limiting tập trung.
