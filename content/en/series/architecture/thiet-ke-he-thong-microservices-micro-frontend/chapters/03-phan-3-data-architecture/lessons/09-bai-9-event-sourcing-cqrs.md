---
id: 019e4a33-d409-7b20-c001-b1c2d3e4f509
title: 'Lesson 9: Event Sourcing & CQRS — When to need it, when not to?'
slug: bai-9-event-sourcing-cqrs-khi-nao-can-khi-nao-khong
description: >-
  Event Sourcing: stores events instead of state. CQRS: separate read/write
  models. Combine Event Sourcing + CQRS. Trade-offs, complexity, and decision
  framework. When is CQRS too complicated, when is it really necessary?
duration_minutes: 75
is_free: true
video_url: null
sort_order: 9
section_title: 'Part 3: Data Architecture in Microservices'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: Microservices & Micro Frontend system design — From basics to Production
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-4055" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-4055)"/>

  <!-- Decorations -->
  <g>
    <circle cx="861" cy="53" r="24" fill="#34d399" opacity="0.08"/>
    <circle cx="622" cy="234" r="17" fill="#34d399" opacity="0.11"/>
    <circle cx="883" cy="155" r="10" fill="#34d399" opacity="0.14"/>
    <circle cx="644" cy="76" r="33" fill="#34d399" opacity="0.07"/>
    <circle cx="905" cy="257" r="26" fill="#34d399" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#34d399" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#34d399" opacity="0.15"/>
    <line x1="600" y1="203" x2="1100" y2="283" stroke="#34d399" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="233" x2="1050" y2="303" stroke="#34d399" stroke-width="0.5" opacity="0.08"/>
    <polygon points="985.9089653438086,134 985.9089653438086,172 953,191 920.0910346561914,172 920.0910346561914,134 953,115" fill="none" stroke="#34d399" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#34d399"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#34d399" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#34d399">🏗️ Architecture — Lesson 9</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 9: Event Sourcing & CQRS — When</tspan>
      <tspan x="60" dy="42">need, when not?</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Microservices & Micro Frontend system design — From basics to Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 3: Data Architecture in Microservices</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

Event Sourcing and CQRS are two powerful but **often abused** patterns. This article will help you understand its nature, real benefits, and most importantly — **when NOT to use it**.


![CQRS and Event Sourcing — separate Command and Query](/storage/uploads/2026/04/mfe-ms-diagram-bai9-cqrs-event-sourcing.webp)

---

## 1. Event Sourcing

### 1.1 Core ideas

Instead of saving the **current state**, save the **sequence of events** that occurred:

```
Traditional (State-based):
┌─────────────────────────┐
│ orders table            │
│ id: 123                 │
│ status: SHIPPED   ← chỉ biết trạng thái hiện tại
│ total: 500.000         │
└─────────────────────────┘

Event Sourcing:
┌─────────────────────────────────────┐
│ Event Store (Order #123)            │
│ 1. OrderCreated    {items, total}   │
│ 2. PaymentReceived {amount}         │
│ 3. ItemRemoved     {itemId}   ← biết toàn bộ lịch sử
│ 4. OrderConfirmed  {}               │
│ 5. OrderShipped    {trackingId}     │
└─────────────────────────────────────┘

State = replay(events) → current state
```

### 1.2 Benefits

- **Complete audit trail**: know exactly who did what and when
- **Time travel**: rebuild state at any time
- **Debug**: replay events to reproduce bugs
- **Analytics**: analyze event patterns

### 1.3 Disadvantages

- **Complexity**: needs event store, projections, snapshots
- **Eventual consistency**: read model not real-time
- **Schema evolution**: changing event schema is very difficult
- **Difficult query**: cannot SELECT * FROM orders WHERE status = 'SHIPPED'

---

## 2. CQRS (Command Query Responsibility Segregation)

### 2.1 Separating Read and Write

```
Traditional:
┌──────────┐     ┌──────────┐
│  Client  │────►│ Service  │────► Database
│          │◄────│(CRUD all)│◄──── (1 model)
└──────────┘     └──────────┘

CQRS:
                 ┌──────────────┐     ┌────────────┐
           ────► │ Command Side │────►│ Write DB   │
┌──────────┐     │ (Create,     │     │ (optimized │
│  Client  │     │  Update)     │     │  for write)│
└──────────┘     └──────────────┘     └─────┬──────┘
           ────► ┌──────────────┐           │ Events
                 │ Query Side   │     ┌─────▼──────┐
           ◄──── │ (Read,       │◄────│ Read DB    │
                 │  Search)     │     │ (optimized │
                 └──────────────┘     │  for read) │
                                      └────────────┘
```

### 2.2 When is CQRS valuable?

- Read/Write ratio **very different** (90% read, 10% write)
- Read model needs **different format** write model (denormalized views)
- Need to **scale read/write independently** (add read replicas)
- Complex queries need **optimized read models** (Elasticsearch, materialized views)

---

## 3. Decision Framework

### 3.1 When to USE Event Sourcing + CQRS?

✅ Financial systems (need audit trail)
✅ Order processing (complicated status, needs history)
✅ Collaborative editing (conflict resolution)
✅ Regulatory compliance (need to prove what happened)

### 3.2 When NOT TO USE?

❌ Simple CRUD (blog, user profile) → overkill
❌ Small team, no experience → learning curve is too high
❌ No need to audit trail or time travel
❌ Real-time consistency is required

### 3.3 Can use CQRS WITHOUT Event Sourcing

```
CQRS without Event Sourcing (pragmatic approach):

Write Side: PostgreSQL (normalized)
  → On write: publish event to Kafka
  
Read Side: Elasticsearch (denormalized)
  → Consumer: listen events → update search index

Đơn giản hơn nhiều, vẫn có lợi ích tách read/write.
```

---

## 4. Apply to E-Commerce

```
Product Service: CQRS (no Event Sourcing)
  Write: PostgreSQL (products table)
  Read:  Elasticsearch (search index, facets)
  Sync:  ProductUpdated event → ES consumer

Order Service: Event Sourcing + CQRS (trạng thái phức tạp)
  Event Store: PostgreSQL (events table)
  Read Model: PostgreSQL (materialized orders view)
  
Cart Service: Simple CRUD (Redis)
  Không cần CQRS — read/write model giống nhau

User Service: Simple CRUD (PostgreSQL)
  Không cần CQRS — straightforward CRUD
```

---

## Summary

| Pattern | Complexity | When to use | When to avoid |
|--------|-----------|-------------|-----------|
| **Simple CRUD** | Low | Most services | High-traffic reads |
| **CQRS only** | Medium | Separate read/write scale | Simple domains |
| **Event Sourcing** | High | Audit trail, time travel | Simple CRUD |
| **ES + CQRS** | Very High | Financial, ordering | Almost everything else |

> **Golden rule:** Start simple (CRUD). Only add CQRS/ES when a specific **pain point** proves necessary.

---

**Next article:** [Lesson 10: What is Micro Frontend? — Benefits, Trade-offs & Decision Framework](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-10-micro-frontend-la-gi-loi-ich-trade-offs-decision-framework)
