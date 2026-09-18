---
id: 019e4a33-d406-7b20-c001-b1c2d3e4f506
title: 'Lesson 6: Inter-service Communication — Sync, Async & Event-Driven'
slug: bai-6-inter-service-communication-sync-async-event-driven
description: >-
  Synchronous (HTTP, gRPC) vs Asynchronous (Message Queue, Event Streaming)
  communication. Request-Reply, Publish-Subscribe, Event Notification patterns.
  When to use RabbitMQ vs Kafka vs NATS. Avoid distributing monolith
  anti-pattern.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 6
section_title: 'Part 2: Designing Microservices Backend'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: Microservices & Micro Frontend system design — From basics to Production
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-791" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-791)"/>

  <!-- Decorations -->
  <g>
    <circle cx="688" cy="174" r="36" fill="#fbbf24" opacity="0.09"/>
    <circle cx="776" cy="222" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="864" cy="270" r="34" fill="#fbbf24" opacity="0.07"/>
    <circle cx="952" cy="58" r="18" fill="#fbbf24" opacity="0.11"/>
    <circle cx="1040" cy="106" r="32" fill="#fbbf24" opacity="0.05"/>
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
    <line x1="600" y1="74" x2="1100" y2="154" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="104" x2="1050" y2="174" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="999.1147367097487,159.5 999.1147367097487,188.5 974,203 948.8852632902513,188.5 948.8852632902513,159.5 974,145" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ Architecture — Lesson 6</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 6: Inter-service Communication — Sync,</tspan>
      <tspan x="60" dy="42">Async & Event-Driven</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Microservices & Micro Frontend system design — From basics to Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 2: Designing Microservices Backend</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

How microservices communicate with each other determines the **coupling, reliability, and performance** of the entire system. This article analyzes communication patterns and guides on choosing the right pattern for each use case.


![Inter-service Communication — Sync, Async and Event Streaming](/storage/uploads/2026/04/mfe-ms-diagram-bai6-communication-patterns.webp)

---

## 1. Synchronous Communication

### 1.1 Request-Reply Pattern

```
┌──────────┐   HTTP/gRPC    ┌──────────┐
│  Order   │ ──────────────►│ Product  │
│  Service │◄────────────── │ Service  │
└──────────┘   Response     └──────────┘

Order Service gọi Product Service để validate product trước khi tạo order.
Phải đợi response → coupling tạm thời (temporal coupling).
```

**Advantages:**
- Simple, easy to understand, easy to debug
- Response immediately
- Explicit error handling (HTTP status codes)

**Disadvantages:**
- Temporal coupling: caller blocked until receiving response
- Cascade failure: if Product Service goes down → Order Service also fails
- Latency increases with each hop in the call chain

### 1.2 Minimize Sync risks

- **Circuit Breaker**: breaks circuit when downstream service fails
- **Timeout**: set a reasonable timeout (not too long)
- **Retry with backoff**: retry with exponential backoff
- **Fallback**: returns cached data or default response
- **Bulkhead**: isolate connection pools for each downstream

---

## 2. Asynchronous Communication

### 2.1 Message Queue Pattern

```
┌──────────┐   Enqueue      ┌──────────┐   Dequeue     ┌──────────┐
│  Order   │ ──────────────►│  Queue   │──────────────►│  Email   │
│  Service │                │(RabbitMQ)│               │  Service │
└──────────┘                └──────────┘               └──────────┘

Fire-and-forget: Order Service gửi message, không đợi.
Email Service xử lý khi sẵn sàng (rate riêng).
Queue đảm bảo message không mất.
```

**Use cases:**
- Task distribution (send email, resize image)
- Work queues (process video, generate report)
- Load leveling (absorb traffic spikes)

### 2.2 Event Streaming / Pub-Sub Pattern

```
┌──────────┐                ┌──────────────┐
│  Order   │──publish──────►│    Kafka     │
│  Service │  OrderPlaced   │   Topic:     │
└──────────┘                │  orders      │
                            └──┬───┬───┬───┘
                               │   │   │
                    ┌──────────┘   │   └──────────┐
                    ▼              ▼              ▼
              ┌──────────┐  ┌──────────┐  ┌──────────┐
              │ Payment  │  │Inventory │  │  Email   │
              │ Service  │  │ Service  │  │  Service │
              └──────────┘  └──────────┘  └──────────┘

1 event → N consumers. Services không biết nhau → loose coupling.
Events được lưu trữ → có thể replay (event sourcing).
```

**Use cases:**
- Domain events (OrderPlaced, PaymentConfirmed)
- Data replication across services
- Event sourcing & audit trail
- Real-time analytics

### 2.3 Event Notification vs Event-Carried State Transfer

| Pattern | What does Event contain | What do consumers need |
|--------|---------------|-----------------|
| **Event Notification** | ID only: `{orderId: "123"}` | Query source service again |
| **Event-Carried State** | Full data: `{orderId, items, total, ...}` | No need to query again |

**Recommendation:** Event-Carried State Transfer helps reduce coupling (consumers do not need to call the source again).

---

## 3. Compare Message Brokers

| Features | RabbitMQ | Apache Kafka | NATS |
|--------|----------|-------------|-------|
| **Model** | Message Queue | Event Stream/Log | Pub/Sub + JetStream |
| **Ordering** | Per queue | Per partition | Per subject |
| **Retention** | Consumed → deleted | Configurable (days/forever) | JetStream: configurable |
| **Throughput** | ~50K msg/s | ~1M msg/s | ~10M msg/s |
| **Replay** | No | Yes (offset-based) | JetStream: Yes |
| **Consumer groups** | Yes | Yes | JetStream: Yes |
| **Complexity** | Average | High (ZooKeeper/KRaft) | Low |
| **Best for** | Task queues, RPC | Event streaming, sourcing | Cloud-native, lightweight |

### 3.1 When to use what?

```
RabbitMQ: Task queues (send email, process image)
          Request-Reply pattern (RPC over messages)
          Complex routing (exchanges, bindings)

Kafka:    Domain events (OrderPlaced, PaymentConfirmed)
          Event sourcing & CQRS
          Data pipeline & streaming analytics
          Audit trail (event log)

NATS:     Lightweight microservices communication
          Real-time messaging (chat, notifications)
          Cloud-native, Kubernetes-native
          Request-Reply + Pub/Sub combined
```

---

## 4. Hybrid Approach (Production Pattern)

In practice, most systems use a **combination of both**:

```
┌─────────────────────────────────────────────────┐
│              E-Commerce Communication           │
├─────────────────────────────────────────────────┤
│ SYNCHRONOUS (REST/gRPC):                        │
│ • GET product details (query, cần response ngay)│
│ • Validate payment (command, cần kết quả)       │
│ • Search products (query, real-time)            │
├─────────────────────────────────────────────────┤
│ ASYNCHRONOUS (Kafka Events):                    │
│ • OrderPlaced → trigger Payment, Inventory      │
│ • PaymentConfirmed → trigger Shipping           │
│ • UserRegistered → trigger Welcome Email        │
│ • ProductUpdated → update Search Index          │
└─────────────────────────────────────────────────┘
```

---

## Summary

| Pattern | When to use | Tradeoff |
|--------|-------------|----------|
| **Sync (REST/gRPC)** | Need immediate response, query data | Tight coupling, cascade failure |
| **Async Queue** | Task distribution, load leveling | Eventual consistency |
| **Async Events** | Domain events, data sync | Complexity, difficult debugging |
| **Hybrid** | Production recommendation | Need to manage both |

---

**Next article:** [Lesson 7: Database per Service & Polyglot Persistence](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-7-database-per-service-polyglot-persistence)
