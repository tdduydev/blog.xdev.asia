---
id: 019d8a22-c304-7a10-b001-a1b2c3d4e504
title: 'Lesson 4: Microservices Design Principles — SRP, DDD & Bounded Context'
slug: bai-4-microservices-design-principles-srp-ddd-bounded-context
description: >-
  What are microservices, Single Responsibility Principle, Domain-Driven Design,
  Bounded Context to define service boundaries, Loose Coupling & High Cohesion,
  when should and should not use microservices.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 4
section_title: 'Part 2: Microservices Design & Communication Patterns'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: Cloud Native Microservices Architecture
  slug: cloud-native-microservices-architecture
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8213" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-8213)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1028" cy="94" r="36" fill="#fbbf24" opacity="0.09"/>
    <circle cx="956" cy="202" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="884" cy="50" r="34" fill="#fbbf24" opacity="0.07"/>
    <circle cx="812" cy="158" r="18" fill="#fbbf24" opacity="0.11"/>
    <circle cx="740" cy="266" r="32" fill="#fbbf24" opacity="0.05"/>
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
    <line x1="600" y1="94" x2="1100" y2="174" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="124" x2="1050" y2="194" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="969.1147367097487,129.5 969.1147367097487,158.5 944,173 918.8852632902513,158.5 918.8852632902513,129.5 944,115" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ Architecture — Lesson 4</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 4: Microservices Design Principles —</tspan>
      <tspan x="60" dy="42">SRP, DDD & Bounded Context</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Cloud Native Microservices Architecture</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 2: Microservices Design & Communication Patterns</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Lesson 4: Microservices Design Principles — SRP, DDD & Bounded Context](/storage/uploads/2026/03/cn-bai-4-diagram.webp)

## Introduction

Microservices are more than just "splitting the monolith". If divided the wrong way, you will have a "distributed monolith" — with all the disadvantages of both architectures. This article covers design principles to divide microservices properly.

---

## 1. What are microservices?

Microservices is an **architectural style** in which an application is composed of many small, independent services:

```
Monolith                          Microservices
┌──────────────────────┐         ┌──────────┐ ┌──────────┐
│     Một ứng dụng     │         │  Order   │ │ Payment  │
│   ┌──────┐ ┌──────┐  │         │  Service │ │ Service  │
│   │Order │ │Payment│  │   →    └──────────┘ └──────────┘
│   ├──────┤ ├──────┤  │         ┌──────────┐ ┌──────────┐
│   │Invent│ │Notif  │  │         │Inventory │ │  Notif   │
│   └──────┘ └──────┘  │         │  Service │ │ Service  │
│    Shared Database    │         └──────────┘ └──────────┘
└──────────────────────┘          Mỗi service có DB riêng
```

### Features

- **Runs in a separate process**: Each service is an independent process/container
- **Network communication**: HTTP/REST, gRPC, Message Queue
- **Independent deployment**: Deploy service A without affecting service B
- **Private Database**: Database per Service pattern
- **Small team**: 2-Pizza team (5-8 people) owning 1-3 services

---

## 2. Single Responsibility Principle (SRP)

> Each service is only responsible for **one operation** and has **one reason to change**.

```
✅ Đúng — Mỗi service một nghiệp vụ rõ ràng:
├── OrderService         → Quản lý vòng đời đơn hàng
├── PaymentService       → Xử lý thanh toán
├── InventoryService     → Quản lý tồn kho
├── NotificationService  → Gửi email/SMS/push
└── UserService          → Quản lý tài khoản

❌ Sai — Service "thùng rác":
├── OrderPaymentService      → 2 nghiệp vụ gộp
├── CommonService            → Mọi thứ chung
└── UtilityService           → Không rõ trách nhiệm
```

### Sign of SRP violation

- Service has **too many unrelated API endpoints**
- Changing feature A requires retesting feature B
- Many teams fix the same service
- Service name contains "and" or "util" or "common"

---

## 3. Domain-Driven Design (DDD)

### 3.1 Why is DDD needed?

DDD helps answer the most important question: **"Where is the boundary of each service?"**

Instead of dividing by technique (frontend service, backend service, database service), DDD divides by **business domain**.

### 3.2 Strategic Design

#### Ubiquitous Language

Build a **common language** between developers and domain experts:

```
Domain Expert (Business):        Developer (Tech):
"Đơn hàng"                   →   Order
"Thanh toán"                  →   Payment
"Giao hàng"                  →   Shipment
"Hoàn tiền"                  →   Refund
"Kho hàng"                   →   Inventory

Đảm bảo: Code, API, database, documentation đều dùng cùng thuật ngữ
```

#### Bounded Context

Bounded Context defines the **scope within which a model has meaning**:

```
┌──────────────────────────────────────────────────────┐
│                   E-Commerce System                   │
│                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐ │
│  │   Order      │  │  Catalog    │  │  Customer    │ │
│  │   Context    │  │  Context    │  │  Context     │ │
│  │              │  │             │  │              │ │
│  │  "Product"   │  │  "Product"  │  │  "Customer"  │ │
│  │  = OrderItem │  │  = SKU with │  │  = Account   │ │
│  │  (id, qty,   │  │  specs,     │  │  with prefs, │ │
│  │   price)     │  │  images,    │  │  addresses   │ │
│  │              │  │  pricing    │  │              │ │
│  └─────────────┘  └─────────────┘  └──────────────┘ │
│                                                       │
│  Cùng từ "Product" nhưng ý nghĩa KHÁC NHAU           │
│  trong mỗi Bounded Context                           │
└──────────────────────────────────────────────────────┘
```

**Important Rule**: Each Bounded Context → One (or several) Microservices.

### 3.3 Context Mapping — Relationships between Contexts

```
┌─────────────┐    Published    ┌──────────────┐
│   Order     │────Language────▶│   Payment    │
│   Context   │                 │   Context    │
└──────┬──────┘                 └──────────────┘
       │
       │ Customer/Supplier
       ▼
┌─────────────┐    Conformist   ┌──────────────┐
│  Shipping   │◀───────────────│  3rd Party   │
│  Context    │                 │  Logistics   │
└─────────────┘                 └──────────────┘
```

| Relationship | Description |
|-------------|-------|
| **Shared Kernel** | 2 contexts share subset code/model |
| **Customer/Supplier** | Upstream provides API, downstream consumes |
| **Conformist** | Downstream fully complies with the upstream model |
| **Anti-Corruption Layer** | Translation layer between foreign model and internal model |
| **Published Language** | Communicate via standard format (JSON schema, Protobuf) |

### 3.4 Tactical Design — Building Blocks

```
Bounded Context
│
├── Entity        → Có identity, lifecycle (Order, User)
├── Value Object  → Không có identity, immutable (Money, Address)
├── Aggregate     → Cluster of entities, consistency boundary
│   └── Aggregate Root → Entry point (Order là root, OrderItem là child)
├── Domain Event  → Sự kiện nghiệp vụ (OrderCreated, PaymentReceived)
├── Repository    → Persistence abstraction
└── Domain Service → Logic không thuộc entity nào (PricingCalculator)
```

#### Aggregate — Consistency unit

```
Order Aggregate:
┌───────────────────────────────┐
│  Order (Aggregate Root)       │
│  ├── id: "O-001"             │
│  ├── status: "confirmed"     │
│  ├── total: $500             │
│  │                           │
│  ├── OrderItem               │
│  │   ├── product: "iPhone"   │
│  │   ├── qty: 1              │
│  │   └── price: $400         │
│  │                           │
│  ├── OrderItem               │
│  │   ├── product: "Case"     │
│  │   ├── qty: 1              │
│  │   └── price: $100         │
│  │                           │
│  └── ShippingAddress         │
│      └── "123 ABC Street"   │
└───────────────────────────────┘

Quy tắc:
- Chỉ truy cập thông qua Aggregate Root (Order)
- Một transaction = một aggregate
- Cross-aggregate = eventual consistency
```

---

## 4. Loose Coupling & High Cohesion

### 4.1 Loose Coupling

Changes in service A **do not require** changes in service B.

```
✅ Loose Coupling:
Order Service ──event──▶ Kafka ──▶ Payment Service
(Thay đổi internal logic của Order → Payment không bị ảnh hưởng)

❌ Tight Coupling:
Order Service ──direct DB query──▶ Payment Database
(Thay đổi schema Payment DB → Order Service bị broken)
```

### 4.2 High Cohesion

**Related** functions are grouped together in **one** service.

```
✅ High Cohesion:
Payment Service:
├── ProcessPayment()
├── RefundPayment()
├── ValidateCard()
└── GetPaymentHistory()
→ Tất cả đều liên quan đến "thanh toán"

❌ Low Cohesion:
MiscService:
├── ProcessPayment()
├── SendEmail()
├── GenerateReport()
└── ResizeImage()
→ Không liên quan gì đến nhau
```

---

## 5. When should/shouldn't you use Microservices?

### 5.1 SHOULD be used when

- ✅ **large scale** system, many teams developing in parallel
- ✅ Need to scale each part of the system independently
- ✅ Requires **polyglot** (multiple languages/frameworks)
- ✅ Fast release cycle, **continuous deployment**
- ✅ Complex domain, with **clear boundaries**
- ✅ The organization has **DevOps maturity** (CI/CD, monitoring, container orchestration)

### 5.2 Should NOT be used when

- ❌ Team **small** (< 5 people)
- ❌ **simple** application, less complicated domain
- ❌ **Not clearly understood** domain boundary
- ❌ No **CI/CD** infrastructure and container orchestration
- ❌ **Time** for limited development
- ❌ The team does not have experience operating a distributed system

### 5.3 Monolith First

Martin Fowler recommends **"Monolith First"**:

```
Phase 1: Monolith
├── Hiểu rõ domain
├── Phát triển nhanh
└── Xác định boundary tự nhiên

Phase 2: Modular Monolith
├── Tách module rõ ràng trong monolith
├── Mỗi module có boundary riêng
└── Giao tiếp qua internal API

Phase 3: Microservices (khi cần)
├── Tách module thành service
├── Thêm API Gateway
└── Event-driven communication
```

---

## 6. Anti-patterns should be avoided

### Distributed Monolith

```
❌ Chia thành nhiều service nhưng:
- Deploy phải đồng thời tất cả
- Shared database
- Synchronous chain calls dài
- Tightly coupled API contracts

→ Có đầy đủ nhược điểm của cả Monolith VÀ Microservices
→ Không có ưu điểm của cái nào cả
```

### Nano-services (too small)

```
❌ Chia quá nhỏ:
├── CreateOrderService
├── UpdateOrderService
├── DeleteOrderService
├── GetOrderService
└── ListOrderService

→ Quá nhiều service, overhead network, khó quản lý
→ Nên gom thành: OrderService
```

---

## 7. Summary

| Principle | Key Point |
|-----------|-----------|
| SRP | Each service has a business, a reason to change |
| DDD | Divide services according to Bounded Context, not according to technique |
| Aggregates | Consistency unit, accessible via Aggregate Root |
| Loose Coupling | Changing service A does not affect service B |
| High Cohesion | Related functions are grouped together into one service |
| Monolith First | Start monolith, gradually separate when understanding domain |

> **Next article**: Synchronous Communication — REST API & gRPC, the two most popular protocols for synchronous communication between microservices.
