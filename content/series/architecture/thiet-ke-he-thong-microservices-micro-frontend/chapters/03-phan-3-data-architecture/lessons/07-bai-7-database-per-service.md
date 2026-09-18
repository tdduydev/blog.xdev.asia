---
id: 019e4a33-d407-7b20-c001-b1c2d3e4f507
title: "Bài 7: Database per Service & Polyglot Persistence"
slug: bai-7-database-per-service-polyglot-persistence
description: >-
  Tại sao mỗi service cần database riêng. Chiến lược chọn database phù hợp: PostgreSQL, MongoDB, Redis, Elasticsearch. Shared database anti-pattern. Data isolation, schema ownership và migration strategy.
duration_minutes: 75
is_free: true
video_url: null
sort_order: 7
section_title: "Phần 3: Data Architecture trong Microservices"
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: "Thiết kế hệ thống Microservices & Micro Frontend — Từ cơ bản đến Production"
  slug: thiet-ke-he-thong-microservices-micro-frontend
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ Kiến trúc — Bài 7</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 7: Database per Service &amp; Polyglot</tspan>
      <tspan x="60" dy="42">Persistence</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Thiết kế hệ thống Microservices &amp; Micro Frontend — Từ cơ bản đến Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 3: Data Architecture trong Microservices</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Giới thiệu

"Database per Service" là pattern nền tảng của Microservices. Không có nó, bạn không có real microservices — chỉ có modules chia sẻ cùng database (distributed monolith). Bài này giải thích tại sao, cách chọn DB đúng, và xử lý data sharing.


![Database per Service — mỗi service sở hữu database riêng](/storage/uploads/2026/04/mfe-ms-diagram-bai7-database-per-service.webp)

---

## 1. Tại sao Database per Service?

### 1.1 Shared Database — Con đường đến Distributed Monolith

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

**Vấn đề:**
- Thay đổi schema ảnh hưởng tất cả services
- Không thể scale database độc lập
- Tight coupling — deploy phải cùng lúc
- Không thể dùng database khác nhau cho use case khác nhau

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

## 2. Polyglot Persistence — Chọn DB đúng

### 2.1 Decision Matrix

| Use Case | Database | Tại sao |
|----------|----------|---------|
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

Khi Service A cần data từ Service B:

### 3.1 API Composition
Service A gọi API của Service B khi cần data. Simple nhưng tạo runtime dependency.

### 3.2 Event-Carried State Transfer
Service B publish events chứa data → Service A lưu local copy.
```
ProductService publishes: ProductUpdated {id, name, price, image}
OrderService subscribes → lưu product snapshot trong order_items
→ Không cần gọi ProductService khi hiển thị order history
```

### 3.3 CQRS (xem chi tiết ở Bài 9)
Tạo read-optimized views từ events — dedicated query service.

---

## 4. Schema Migration Strategy

Mỗi service quản lý schema riêng:
- **Flyway / Liquibase** (Java) hoặc **Prisma Migrate / Knex** (Node.js)
- Migration scripts versioned trong source code
- Backward-compatible changes: add column (nullable), add table
- Breaking changes: multi-phase migration (add new → migrate data → remove old)

---

## Tóm tắt

- **Database per Service** là non-negotiable cho real microservices
- Chọn DB theo use case (**Polyglot Persistence**)
- Data sharing qua **Events** (preferred) hoặc **API calls**
- Schema migration là trách nhiệm của từng service team

---

**Bài tiếp theo:** [Bài 8: Saga Pattern & Distributed Transactions](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-8-saga-pattern-distributed-transactions)
