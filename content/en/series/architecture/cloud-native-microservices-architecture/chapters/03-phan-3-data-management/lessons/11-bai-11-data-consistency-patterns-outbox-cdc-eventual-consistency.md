---
id: 019d8a22-c311-7a10-b001-a1b2c3d4e511
title: 'Lesson 11: Data Consistency Patterns — Outbox, CDC & Eventual Consistency'
slug: bai-11-data-consistency-patterns-outbox-cdc-eventual-consistency
description: >-
  CAP Theorem in practice, Eventual Consistency, Outbox Pattern, Change Data
  Capture (CDC) with Debezium, idempotent consumers, and end-to-end data
  consistency strategy.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 11
section_title: 'Part 3: Data Management in Microservices'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: Cloud Native Microservices Architecture
  slug: cloud-native-microservices-architecture
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-2523" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-2523)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1076" cy="218" r="14" fill="#2dd4bf" opacity="0.13"/>
    <circle cx="1052" cy="194" r="32" fill="#2dd4bf" opacity="0.11"/>
    <circle cx="1028" cy="170" r="20" fill="#2dd4bf" opacity="0.09"/>
    <circle cx="1004" cy="146" r="8" fill="#2dd4bf" opacity="0.07"/>
    <circle cx="980" cy="122" r="26" fill="#2dd4bf" opacity="0.05"/>
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
    <line x1="600" y1="98" x2="1100" y2="178" stroke="#2dd4bf" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="128" x2="1050" y2="198" stroke="#2dd4bf" stroke-width="0.5" opacity="0.08"/>
    <polygon points="976.5788383248864,131.5 976.5788383248864,164.5 948,181 919.4211616751136,164.5 919.4211616751135,131.5 948,115" fill="none" stroke="#2dd4bf" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#2dd4bf"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#2dd4bf" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ Architecture — Lesson 11</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 11: Data Consistency Patterns —</tspan>
      <tspan x="60" dy="42">Outbox, CDC & Eventual Consistency</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Cloud Native Microservices Architecture</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 3: Data Management in Microservices</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Lesson 11: Data Consistency Patterns — Outbox, CDC & Eventual Consistency](/storage/uploads/2026/03/cn-bai-11-diagram.webp)

## Introduction

When each microservice has its own database, the biggest challenge is ensuring **data consistency** between services. This lesson delves into patterns that address dual write, reliable event publishing, and eventual consistency.

---

## 1. Dual Write Problem

### 1.1 Problem

When a service needs to both **update database** and **publish event**, if either fails → inconsistency:

```
Scenario 1: DB thành công, Event thất bại
┌──────────────┐
│ Order Service│
│              │
│ 1. Save to DB ✅ (Order created)
│ 2. Publish to Kafka ❌ (Network error)
│              │
│ → Order tồn tại trong DB nhưng không ai biết
└──────────────┘

Scenario 2: Event thành công, DB thất bại
┌──────────────┐
│ Order Service│
│              │
│ 1. Publish to Kafka ✅ (OrderCreated sent)
│ 2. Save to DB ❌ (DB connection failed)
│              │
│ → Downstream services xử lý order không tồn tại
└──────────────┘
```

### 1.2 Why not use distributed transactions?

```
// ❌ Anti-pattern: Distributed transaction giữa DB và Kafka
@Transactional
public void createOrder(Order order) {
    database.save(order);           // Transaction participant 1
    kafka.publish(orderCreated);    // Transaction participant 2
    // Kafka không support XA/2PC → KHÔNG THỂ atomic
}
```

---

## 2. Outbox Pattern

### 2.1 Concepts

Record the event to the **outbox table** in the **same database transaction** as the business data. A separate process (Relay/Poller) reads the outbox and publishes it to the message broker:

```
┌─────────────────────────────────────────────────┐
│                Order Service                     │
│                                                  │
│  ┌───────────────────────────────────────────┐   │
│  │ Database Transaction (ACID)               │   │
│  │                                           │   │
│  │  INSERT INTO orders (...) VALUES (...);   │   │
│  │  INSERT INTO outbox (...) VALUES (...);   │   │
│  │                                           │   │
│  │  → Both succeed or both fail              │   │
│  └───────────────────────────────────────────┘   │
│                                                  │
│  ┌───────────────────────────────────────────┐   │
│  │ Outbox Relay (separate process)           │   │
│  │                                           │   │
│  │  1. Poll outbox table                     │   │
│  │  2. Publish event to Kafka                │   │
│  │  3. Mark outbox entry as published        │   │
│  └────────────────────┬──────────────────────┘   │
└───────────────────────┼──────────────────────────┘
                        │
                        ▼
                   ┌─────────┐
                   │  Kafka  │
                   └─────────┘
```

### 2.2 Implementation

**Outbox Table:**

```sql
CREATE TABLE outbox (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aggregate_type  VARCHAR(255) NOT NULL,   -- "Order"
    aggregate_id    VARCHAR(255) NOT NULL,   -- "O-001"
    event_type      VARCHAR(255) NOT NULL,   -- "OrderCreated"
    payload         JSONB NOT NULL,          -- event data
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    published_at    TIMESTAMPTZ,             -- NULL = chưa publish
    retries         INT DEFAULT 0
);

CREATE INDEX idx_outbox_unpublished 
ON outbox (created_at) WHERE published_at IS NULL;
```

**Business Logic:**

```java
@Service
public class OrderService {

    @Transactional
    public Order createOrder(CreateOrderCommand cmd) {
        // 1. Save business data
        Order order = new Order(cmd);
        order.setStatus(OrderStatus.PENDING);
        orderRepository.save(order);

        // 2. Save outbox event (same transaction!)
        OutboxEvent event = OutboxEvent.builder()
            .aggregateType("Order")
            .aggregateId(order.getId())
            .eventType("OrderCreated")
            .payload(toJson(new OrderCreatedPayload(order)))
            .build();
        outboxRepository.save(event);

        return order;
    }
}
```

**Outbox Relay (Polling):**

```java
@Scheduled(fixedDelay = 500) // Poll mỗi 500ms
public void publishOutboxEvents() {
    List<OutboxEvent> events = outboxRepository
        .findUnpublishedOrderByCreatedAt(BATCH_SIZE);

    for (OutboxEvent event : events) {
        try {
            kafkaTemplate.send(
                event.getAggregateType().toLowerCase() + ".events",
                event.getAggregateId(),
                event.getPayload()
            ).get(); // Wait for Kafka ACK

            event.setPublishedAt(Instant.now());
            outboxRepository.save(event);
        } catch (Exception e) {
            event.incrementRetries();
            if (event.getRetries() >= MAX_RETRIES) {
                event.moveToDeadLetter();
            }
            outboxRepository.save(event);
        }
    }
}
```

### 2.3 Advantages and disadvantages

| Advantages | Disadvantages |
|--------|-----------|
| Guaranteed delivery (at-least-once) | Polling delay (latency) |
| Atomic with business data | Outbox table needs cleanup |
| Simple implementation | At-least-once → consumer must be idempotent |
| No need to change database technology | Add storage overhead |

---

## 3. Change Data Capture (CDC)

### 3.1 Concepts

CDC captures **database changes** (INSERT, UPDATE, DELETE) from **transaction log** (WAL in PostgreSQL) and streams directly to the message broker:

```
┌──────────────────────────────────────────────┐
│               Order Service                   │
│                                               │
│  ┌────────────┐    ┌──────────────────────┐  │
│  │ Application│───▶│ PostgreSQL           │  │
│  │            │    │ ┌──────────────────┐ │  │
│  └────────────┘    │ │ orders table     │ │  │
│                    │ └──────────────────┘ │  │
│                    │ ┌──────────────────┐ │  │
│                    │ │ outbox table     │ │  │
│                    │ └──────────────────┘ │  │
│                    │ ┌──────────────────┐ │  │
│                    │ │ WAL (Write-Ahead │ │  │
│                    │ │ Log)             │ │  │
│                    │ └────────┬─────────┘ │  │
│                    └──────────┼───────────┘  │
└───────────────────────────────┼───────────────┘
                                │
                    ┌───────────▼───────────┐
                    │  Debezium Connector   │
                    │  (reads WAL stream)   │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │     Apache Kafka      │
                    │  topic: outbox.events │
                    └───────────────────────┘
```

### 3.2 Debezium Configuration

```json
{
  "name": "order-outbox-connector",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "database.hostname": "order-db",
    "database.port": "5432",
    "database.user": "debezium",
    "database.password": "${file:/secrets/db-password}",
    "database.dbname": "orders",
    "database.server.name": "order-service",
    "plugin.name": "pgoutput",
    
    "table.include.list": "public.outbox",
    
    "transforms": "outbox",
    "transforms.outbox.type": "io.debezium.transforms.outbox.EventRouter",
    "transforms.outbox.table.field.event.id": "id",
    "transforms.outbox.table.field.event.key": "aggregate_id",
    "transforms.outbox.table.field.event.type": "event_type",
    "transforms.outbox.table.field.event.payload": "payload",
    "transforms.outbox.route.topic.replacement": "${routedByValue}.events",
    
    "transforms.outbox.table.expand.json.payload": true
  }
}
```

### 3.3 CDC vs Polling

| Criteria | Polling (Outbox Relay) | CDC (Debezium) |
|----------|---------------------|----------------|
| Latency | 100ms-1s (poll interval) | ~10ms (near real-time) |
| Database load | Frequent queries | Reads WAL (minimal impact) |
| Infrastructure | Simple (no extra components) | Need Debezium + Kafka Connect |
| Complexity | Low | Medium |
| Reliability | Good | Excellent (WAL = source of truth) |
| **Recommended** | **Small/Medium scale** | **Large scale, low latency** |

---

## 4. Idempotent Consumers

### 4.1 Why do we need Idempotency?

At-least-once delivery can send **duplicate messages**:

```
Producer ──msg──▶ Broker ──msg──▶ Consumer
                                    │
                              Process ✅
                                    │
                              ACK ──▶ Broker (network timeout!)
                                    │
                         Broker re-delivers msg
                                    │
                              Consumer receives msg AGAIN
                              Process AGAIN? → Duplicate!
```

### 4.2 Implementation Strategies

**Strategy 1: Idempotency Key Table**

```sql
CREATE TABLE processed_events (
    event_id    UUID PRIMARY KEY,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Consumer logic
BEGIN;
  -- Check if already processed
  INSERT INTO processed_events (event_id) VALUES ($event_id)
  ON CONFLICT (event_id) DO NOTHING;
  
  -- If inserted (not duplicate), process the event
  IF FOUND THEN
    -- Business logic here
    UPDATE inventory SET quantity = quantity - $qty WHERE product_id = $pid;
  END IF;
COMMIT;
```

**Strategy 2: Natural Idempotency**

```java
// SET operations are naturally idempotent
// "Set order status to CONFIRMED" — same result regardless of how many times

@EventHandler
public void on(PaymentCompletedEvent event) {
    Order order = orderRepository.findById(event.getOrderId());
    
    // Idempotent check: if already confirmed, skip
    if (order.getStatus() == OrderStatus.CONFIRMED) {
        return;
    }
    
    order.setStatus(OrderStatus.CONFIRMED);
    orderRepository.save(order);
}
```

**Strategy 3: Version-based (Optimistic Locking)**

```sql
UPDATE orders 
SET status = 'CONFIRMED', version = version + 1
WHERE id = 'O-001' AND version = 3;

-- If version doesn't match → someone else already updated → skip
-- Rows affected = 0 → duplicate processing detected
```

---

## 5. Eventual Consistency Strategies

### 5.1 Read Your Own Writes

Make sure users always see the data they just changed:

```
Approach 1: Sticky Session
  → Route user requests đến cùng replica đã nhận write

Approach 2: Client-side Optimistic Update
  → UI cập nhật ngay trước khi server confirm, rollback nếu fail

Approach 3: Write-through Read Model
  → Sau khi write, đồng bộ invalidate read cache

Client ──POST /orders──▶ Order Service ──▶ Write DB
                                              │
Client ──GET /orders/123──▶ Order Service     │
  ↑                              │            │
  │                     Check: event synced?  │
  │                           Yes ──▶ Read DB │
  │                           No  ──▶ Write DB│ (fallback)
  └────────────────────────────────────────────┘
```

### 5.2 Consistency Monitoring

```sql
-- Monitor replication lag
SELECT
    topic,
    partition,
    MAX(offset) - MIN(committed_offset) AS lag
FROM consumer_offsets
GROUP BY topic, partition
HAVING lag > 1000; -- Alert if lag > 1000 messages
```

```yaml
# Prometheus alert for consistency lag
- alert: HighConsumerLag
  expr: kafka_consumer_group_lag > 5000
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "Consumer lag is high"
    description: "Consumer group {{ $labels.group }} has lag {{ $value }}"
```

---

## 6. End-to-End Pattern

### 6.1 Recommended Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     End-to-End Data Flow                     │
│                                                              │
│  ┌──────────┐    ┌──────────────────────┐    ┌───────────┐  │
│  │ Service  │    │ PostgreSQL           │    │ Debezium  │  │
│  │ Logic    │───▶│ ┌────────┐ ┌───────┐ │───▶│ CDC       │  │
│  │          │    │ │Business│ │Outbox │ │    │ Connector │  │
│  └──────────┘    │ │ Table  │ │ Table │ │    └─────┬─────┘  │
│                  │ └────────┘ └───────┘ │          │        │
│                  └──────────────────────┘          │        │
│                                                    ▼        │
│                                              ┌──────────┐   │
│                                              │  Kafka   │   │
│                                              │  Topic   │   │
│                                              └────┬─────┘   │
│                                                   │         │
│                              ┌────────────────────┼────┐    │
│                              │                    │    │    │
│                        ┌─────▼────┐         ┌─────▼────┐   │
│                        │ Consumer │         │ Consumer │   │
│                        │ Idempot. │         │ Idempot. │   │
│                        │ Check ✓  │         │ Check ✓  │   │
│                        └──────────┘         └──────────┘   │
└─────────────────────────────────────────────────────────────┘

Guarantees:
✅ Atomic write (business data + outbox in same TX)
✅ At-least-once delivery (CDC from WAL)
✅ Exactly-once processing (idempotent consumers)
✅ Near real-time (<50ms latency)
```

---

## Summary

- **Dual Write Problem** is the root cause of data inconsistency in microservices
- **Outbox Pattern** is solved by writing events to the same DB transaction
- **CDC (Debezium)** reads WAL stream for near real-time event delivery
- **Idempotent consumers** ensures exact-once processing despite at-least-once delivery
- Eventual consistency is unavoidable — design for it instead of against it
- **Monitoring consistency lag** is required for production
