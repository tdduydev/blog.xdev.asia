---
id: 019e4a33-d404-7b20-c001-b1c2d3e4f504
title: 'Lesson 4: Service Decomposition — Bounded Context & Service Boundaries'
slug: bai-4-service-decomposition-bounded-context-service-boundaries
description: >-
  Service separation method based on Bounded Context. Define service boundaries
  properly, avoid distributed monolith. Decompose by subdomain vs decompose by
  business capability strategy. Context Mapping patterns.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 4
section_title: 'Part 2: Designing Microservices Backend'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: Microservices & Micro Frontend system design — From basics to Production
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-9443" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-9443)"/>

  <!-- Decorations -->
  <g>
    <circle cx="922" cy="236" r="30" fill="#f87171" opacity="0.11"/>
    <circle cx="744" cy="218" r="26" fill="#f87171" opacity="0.07"/>
    <circle cx="1066" cy="200" r="22" fill="#f87171" opacity="0.13"/>
    <circle cx="888" cy="182" r="18" fill="#f87171" opacity="0.09"/>
    <circle cx="710" cy="164" r="14" fill="#f87171" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <line x1="600" y1="156" x2="1100" y2="236" stroke="#f87171" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="186" x2="1050" y2="256" stroke="#f87171" stroke-width="0.5" opacity="0.08"/>
    <polygon points="982.8467875173176,140.5 982.8467875173176,171.5 956,187 929.1532124826824,171.5 929.1532124826824,140.5 956,125" fill="none" stroke="#f87171" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ Architecture — Lesson 4</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 4: Service Decomposition — Bounded</tspan>
      <tspan x="60" dy="42">Context & Service Boundaries</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Microservices & Micro Frontend system design — From basics to Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 2: Designing Microservices Backend</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

Service separation is the most important architectural decision when moving to Microservices. Divided too small → complexity explodes. Divided too large → distributed monolith. This article guides a systematic method to properly define service boundaries.


![Service Decomposition — decomposes the system into microservices](/storage/uploads/2026/04/mfe-ms-diagram-bai4-service-decomposition.webp)

---

## 1. Principle of separation

### 1.1 Single Responsibility for Services

Each service is responsible for **a unique business capability**:
- User Service → User lifecycle management (register, login, profile)
- Product Service → Product catalog, search, reviews
- Order Service → Order processing, fulfillment, history

### 1.2 Two main strategies

**Decompose by Business Capability:**

Based on the business functions the organization provides:
```
E-Commerce Business Capabilities:
├── Customer Management   → User Service
├── Product Management    → Product Service
├── Order Management      → Order Service
├── Payment Processing    → Payment Service
├── Inventory Management  → Inventory Service
└── Shipping & Delivery   → Shipping Service
```

**Decompose by Subdomain (DDD):**

Based on subdomains identified via DDD:
```
Core Subdomains (competitive advantage):
├── Product Catalog → Product Service (custom-built, best team)
├── Order Processing → Order Service (complex logic)

Supporting Subdomains (necessary but not differentiating):
├── Inventory → Inventory Service
├── Customer Profile → User Service

Generic Subdomains (solved problems):
├── Authentication → Keycloak (off-the-shelf)
├── Payment Gateway → Stripe integration
├── Email → SendGrid/SES
```

### 1.3 Correct service boundaries signs

- Service can be developed, deployed, scaled **independently**
- Changes in service A **seldom** require changes in service B
- Each service has its own **database** (no shared tables)
- Teams can work on the service **without needing to coordinate** with other teams
- Service has **cohesive API** — closely related endpoints

---

## 2. Context Mapping Patterns

Once you have identified Bounded Contexts, you need to define the relationship between them:

### 2.1 Partnership
The two teams cooperate closely, jointly developing the interface:
```
Product Team ←→ Search Team
(cùng định nghĩa product schema cho search indexing)
```

### 2.2 Customer-Supplier
Upstream (supplier) provides data/API, Downstream (customer) consumes:
```
Product Service (Supplier) → Order Service (Customer)
(Order Service cần product info nhưng không thay đổi product)
```

### 2.3 Anti-Corruption Layer (ACL)
Transformation layer to protect domain model from external/legacy systems:
```
┌──────────┐     ┌─────┐     ┌──────────────┐
│ Order    │ ──► │ ACL │ ──► │ Legacy ERP   │
│ Service  │     │     │     │ (SOAP/XML)   │
└──────────┘     └─────┘     └──────────────┘
ACL convert REST/JSON ↔ SOAP/XML
```

---

## 3. Anti-patterns should be avoided

### 3.1 Distributed Monolith
```
❌ Services phụ thuộc chặt chẽ:
Service A → Service B → Service C → Service A (circular!)
Kết quả: phải deploy A, B, C cùng lúc = worse than monolith
```

### 3.2 Nano-services
```
❌ Chia quá nhỏ:
├── ProductNameService
├── ProductPriceService
├── ProductImageService
└── ProductReviewService

✅ Chia hợp lý:
└── ProductService (gom lại thành 1 service)
```

### 3.3 Shared Database
```
❌ Nhiều services dùng chung DB:
Service A ──┐
Service B ──┼──► Shared PostgreSQL (products table)
Service C ──┘
Thay đổi schema → break tất cả services

✅ Database per Service:
Service A → DB_A
Service B → DB_B (replicate data nếu cần)
Service C → DB_C
```

---

## 4. Hands-on: Separating E-Commerce Platform

Applicable to projects throughout the series:

```
E-Commerce Platform Services:

┌─────────────────────────────────────────┐
│ User Service (Supporting)               │
│ - Registration, Login, Profile          │
│ - PostgreSQL (users, addresses)         │
│ - Team: 2-3 devs                       │
├─────────────────────────────────────────┤
│ Product Service (Core)                  │
│ - Catalog, Search, Reviews, Categories  │
│ - PostgreSQL + Elasticsearch            │
│ - Team: 3-4 devs                       │
├─────────────────────────────────────────┤
│ Cart Service (Supporting)               │
│ - Add/Remove items, Apply coupon        │
│ - Redis (fast, ephemeral)              │
│ - Team: 2 devs                         │
├─────────────────────────────────────────┤
│ Order Service (Core)                    │
│ - Place order, Track, History           │
│ - PostgreSQL (orders, order_items)      │
│ - Team: 3-4 devs                       │
├─────────────────────────────────────────┤
│ Payment Service (Generic)               │
│ - Stripe/VNPay integration              │
│ - PostgreSQL (transactions)            │
│ - Team: 2 devs                         │
└─────────────────────────────────────────┘
```

---

## Summary

| Principles | Description |
|-----------|-------|
| Divide by Domain | Use DDD Bounded Context, not divided by technical layer |
| Loosely Coupled | Service A changes without needing to deploy Service B |
| High Cohesion | Related functions are located in the same service |
| Own Data | Each service has its own database |
| Right Size | Not too big (monolith), not too small (nano-service) |

---

**Next article:** [Lesson 5: API Design Masterclass — REST, GraphQL & gRPC](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-5-api-design-masterclass-rest-graphql-grpc)
