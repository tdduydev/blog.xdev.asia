---
id: 019e4a33-d407-7b20-c001-b1c2d3e4f507
title: 'Lesson 7: Database per Service & Polyglot Persistence'
slug: bai-7-database-per-service-polyglot-persistence
description: >-
  Why does each service need its own database? Strategy for choosing the right
  database: PostgreSQL, MongoDB, Redis, Elasticsearch. Shared database
  anti-pattern. Data isolation, schema ownership and migration strategy.
duration_minutes: 75
is_free: true
video_url: null
sort_order: 7
section_title: 'Part 3: Data Architecture in Microservices'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: Microservices & Micro Frontend system design — From basics to Production
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: en
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ Architecture — Lesson 7</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 7: Database per Service & Polyglot</tspan>
      <tspan x="60" dy="42">Persistence</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Microservices & Micro Frontend system design — From basics to Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 3: Data Architecture in Microservices</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

"Database per Service" is the foundation pattern of Microservices. Without it, you don't have real microservices — only modules sharing the same database (distributed monolith). This article explains why, how to choose the right DB, and how to handle data sharing.


![Database per Service — each service owns its own database](/storage/uploads/2026/04/mfe-ms-diagram-bai7-database-per-service.webp)

---

## 1. Why Database per Service?

### 1.1 Shared Database — The Road to Distributed Monolith

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

**Problem:**
- Schema changes affect all services
- Cannot scale database independently
- Tight coupling — deployment must be at the same time
- You cannot use different databases for different use cases

### 1.2 Database per Service

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

## 2. Polyglot Persistence — Choose the right DB

### 2.1 Decision Matrix

| Use Case | Database | Why |
|----------|----------|-------|
| User profiles, Orders | **PostgreSQL** | ACID, relational, mature |
| Product catalog | **PostgreSQL + Elasticsearch** | Relational + Full-text search |
| Shopping cart | **Redis** | Fast, ephemeral, TTL support |
| Session store | **Redis** | In-memory, fast expiry |
| Activity log, Events | **MongoDB / Kafka** | Schema-flexible, append-only |
| Recommendations | **Neo4j / Redis** | Graph relationships / Caching |
| Analytics/BI | **ClickHouse / BigQuery** | Columnar, fast aggregation |

### 2.2 E-Commerce Platform Database Design

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

## 3. Data Sharing Patterns

When Service A needs data from Service B:

### 3.1 API Composition
Service A calls Service B's API when it needs data. Simple but creates runtime dependencies.

### 3.2 Event-Carried State Transfer
Service B publishes events containing data → Service A saves a local copy.
```
ProductService publishes: ProductUpdated {id, name, price, image}
OrderService subscribes → lưu product snapshot trong order_items
→ Không cần gọi ProductService khi hiển thị order history
```

### 3.3 CQRS (see details in Lesson 9)
Create read-optimized views from events — dedicated query service.

---

## 4. Schema Migration Strategy

Each service manages its own schema:
- **Flyway / Liquibase** (Java) or **Prisma Migrate / Knex** (Node.js)
- Migration scripts versioned in source code
- Backward-compatible changes: add column (nullable), add table
- Breaking changes: multi-phase migration (add new → migrate data → remove old)

---

## Summary

- **Database per Service** is non-negotiable for real microservices
- Select DB according to use case (**Polyglot Persistence**)
- Data sharing via **Events** (preferred) or **API calls**
- Schema migration is the responsibility of each service team

---

**Next article:** [Lesson 8: Saga Pattern & Distributed Transactions](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-8-saga-pattern-distributed-transactions)
