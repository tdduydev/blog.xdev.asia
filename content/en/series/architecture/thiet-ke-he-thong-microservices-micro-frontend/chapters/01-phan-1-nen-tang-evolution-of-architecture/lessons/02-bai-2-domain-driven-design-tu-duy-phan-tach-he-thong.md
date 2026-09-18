---
id: 019e4a33-d402-7b20-c001-b1c2d3e4f502
title: 'Lesson 2: Domain-Driven Design — System separation thinking'
slug: bai-2-domain-driven-design-tu-duy-phan-tach-he-thong
description: >-
  DDD Platform: Ubiquitous Language, Bounded Context, Aggregates, Domain Events.
  How to use Event Storming to discover domains. Strategic vs Tactical DDD and
  application to Microservices & Micro Frontend division.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 2
section_title: 'Part 1: Foundation — Evolution of Architecture'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: Microservices & Micro Frontend system design — From basics to Production
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3008" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3008)"/>

  <!-- Decorations -->
  <g>
    <circle cx="695" cy="115" r="18" fill="#fb923c" opacity="0.1"/>
    <circle cx="790" cy="230" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="885" cy="85" r="28" fill="#fb923c" opacity="0.1"/>
    <circle cx="980" cy="200" r="33" fill="#fb923c" opacity="0.05"/>
    <circle cx="1075" cy="55" r="8" fill="#fb923c" opacity="0.1"/>
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
    <line x1="600" y1="185" x2="1100" y2="265" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="215" x2="1050" y2="285" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="969.6410161513776,115 969.6410161513776,155 935,175 900.3589838486224,155 900.3589838486224,115.00000000000001 935,95" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ Architecture — Lesson 2</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 2: Domain-Driven Design — Divided thinking</tspan>
      <tspan x="60" dy="42">system separation</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Microservices & Micro Frontend system design — From basics to Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 1: Foundation — Evolution of Architecture</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

Domain-Driven Design (DDD) is more than just a method of writing code — it's **thinking that decomposes complex systems** into parts that make business sense. DDD is the foundation that decides **how to divide Microservices** and **how to divide Micro Frontend**. If divided incorrectly, you will have a "distributed monolith" — worse than the original monolith.


![Context Map — Bounded Contexts and relationships between domains in DDD](/storage/uploads/2026/04/mfe-ms-diagram-bai2-bounded-context-map.webp)

---

## 1. Why is DDD needed?

### 1.1 The problem of technical decomposition

Dividing the system into **technical layers** (UI layer, Business layer, Data layer) is the most common mistake:

```
❌ Technical Decomposition (SAI):
├── frontend-service
├── backend-service
├── database-service
└── notification-service

✅ Domain Decomposition (ĐÚNG):
├── user-management (UI + API + DB cho User)
├── product-catalog (UI + API + DB cho Product)
├── order-processing (UI + API + DB cho Order)
└── payment (UI + API + DB cho Payment)
```

### 1.2 What does DDD solve?

- **Ubiquitous Language**: The whole team (dev, PM, business) speaks the same "language"
- **Bounded Context**: Define clear boundaries between domains
- **Reduce coupling**: Each bounded context is an independent unit
- **Align business & tech**: Architecture reflects business structure

---

## 2. Strategic DDD — Look at the big picture

### 2.1 Ubiquitous Language

Each Bounded Context has its own **language**. Same word "Product" but different meaning in each context:

```
┌───────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Product Catalog   │  │   Order Context  │  │  Shipping Context│
│                    │  │                  │  │                  │
│ Product:           │  │ OrderItem:       │  │ Parcel:          │
│ - name, desc       │  │ - productId      │  │ - weight         │
│ - price, images    │  │ - quantity       │  │ - dimensions     │
│ - categories       │  │ - unitPrice      │  │ - tracking       │
│ - reviews          │  │ - discount       │  │ - destination    │
└───────────────────┘  └──────────────────┘  └──────────────────┘

Cùng "Product" nhưng mỗi context cần thông tin khác nhau!
```

### 2.2 Bounded Context

**Bounded Context** is the logical boundary within which a consistent domain model is applied.

**Principles:**
- Each Bounded Context = 1 Microservice (or a small group)
- Each Bounded Context = 1 Micro Frontend (or part of UI)
- Between contexts: communicate via **API or Events** (no shared database!)

### 2.3 Context Mapping

Bounded Contexts do not exist independently — they have **relationships** with each other:

```
Context Map:
┌──────────────┐          ┌──────────────┐
│   Product    │◄─────────│    Order     │
│   Catalog    │ Upstream  │  Processing  │
│  (Supplier)  │──────────►│ (Consumer)   │
└──────────────┘          └──────┬───────┘
                                 │
                          ┌──────┴───────┐
                          │   Payment    │
                          │   Gateway    │
                          └──────────────┘
```

**Relationship patterns:**
| Pattern | Description | When to use |
|--------|-------|-------------|
| **Customer-Supplier** | Upstream provides, Downstream consumes | Explicit dependency relationships |
| **Shared Kernel** | Share part of the model | The two contexts are closely related |
| **Anti-Corruption Layer** | Layer transition between two models | Legacy system integration |
| **Published Language** | Standard API/Schema for communication | Many consumers need to use |

---

## 3. Tactical DDD — Design details

### 3.1 Aggregates

Aggregate is a **group of entities** treated as a unit of consistency. All changes go through **Aggregate Root**.

```
Order Aggregate:
┌─────────────────────────────────┐
│  Order (Aggregate Root)         │
│  ├── OrderItem                  │
│  ├── OrderItem                  │
│  └── ShippingAddress            │
│                                 │
│  Invariants:                    │
│  - Total = sum(items.price)     │
│  - Status transitions are valid │
│  - At least 1 item required     │
└─────────────────────────────────┘
```

### 3.2 Domain Events

Domain Events describes **events that occurred** in the domain:

```typescript
// Domain Events
interface OrderPlaced {
  orderId: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  placedAt: Date;
}

interface PaymentConfirmed {
  paymentId: string;
  orderId: string;
  amount: number;
  confirmedAt: Date;
}

// Event flow
OrderPlaced → PaymentService listens → PaymentConfirmed → ShippingService listens
```

---

## 4. Event Storming — Domain Discovery

### 4.1 What is Event Storming?

Event Storming is a workshop where **developers + domain experts** explore domains together by pasting sticky notes:

```
Timeline: ─────────────────────────────────────────────►

🟧 Domain Event     🟦 Command          🟨 Policy/Rule
"Order Placed"     "Place Order"       "If payment fails,
                                        cancel order"

🟪 Aggregate        🟩 External System   🔴 Hot Spot
"Order"            "Payment Gateway"   "Race condition
                                        when checking stock"
```

### 4.2 From Event Storming to Bounded Context

After the workshop, group related events → define Bounded Context → map to Microservices + Micro Frontends.

```
Event Storming Results → Bounded Contexts:
├── Product Context: ProductCreated, ProductUpdated, CategoryChanged
├── Cart Context: ItemAddedToCart, CartAbandoned, CouponApplied
├── Order Context: OrderPlaced, OrderConfirmed, OrderShipped
├── Payment Context: PaymentInitiated, PaymentConfirmed, RefundIssued
└── User Context: UserRegistered, ProfileUpdated, AddressAdded

Mapping:
├── Product Context → Product Microservice + Product MFE
├── Cart Context    → Cart Microservice + Cart MFE
├── Order Context   → Order Microservice + Checkout MFE
├── Payment Context → Payment Microservice (no separate MFE)
└── User Context    → User Microservice + Account MFE
```

---

## 5. Apply DDD to Micro Frontend

### 5.1 Bounded Context → Micro Frontend

Each Bounded Context not only maps into 1 Microservice but also maps into **1 Micro Frontend**:

```
Bounded Context: Product Catalog
├── Backend: Product Microservice
│   ├── REST API / GraphQL
│   ├── PostgreSQL database
│   └── Search index (Elasticsearch)
│
├── Frontend: Product Micro Frontend
│   ├── Product listing page
│   ├── Product detail page
│   ├── Search & filter UI
│   └── Product reviews
│
└── Team: Product Team (full-stack ownership)
```

### 5.2 Team Topology according to DDD

```
┌──────────────────────────────────────────┐
│              Organization                │
├──────────┬──────────┬────────┬───────────┤
│ Team     │ Team     │ Team   │ Team      │
│ Product  │ Cart     │ Order  │ Platform  │
├──────────┼──────────┼────────┼───────────┤
│ MFE:     │ MFE:     │ MFE:   │ Shell App │
│ Product  │ Cart     │ Order  │ Design Sys│
│ pages    │ sidebar  │ pages  │ Auth      │
├──────────┼──────────┼────────┼───────────┤
│ µS:      │ µS:      │ µS:    │ API GW    │
│ Product  │ Cart     │ Order  │ Infra     │
│ API      │ API      │ API    │           │
├──────────┼──────────┼────────┼───────────┤
│ DB:      │ DB:      │ DB:    │ Shared    │
│ Postgres │ Redis    │ Postgres│ Services │
└──────────┴──────────┴────────┴───────────┘
```

---

## Summary

- **DDD** is the thinking foundation for properly decomposing systems
- **Bounded Context** defines the boundary → maps to Microservices + Micro Frontends
- **Event Storming** helps explore domains with business experts
- **Context Mapping** defines the relationship between contexts
- Dividing by **domain** (not by technical layer) is the golden rule

---

**Next article:** [Lesson 3: Full-Stack overview architecture — Microservices + Micro Frontend + BFF](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-3-kien-truc-tong-quan-full-stack-microservices-micro-frontend-bff)
