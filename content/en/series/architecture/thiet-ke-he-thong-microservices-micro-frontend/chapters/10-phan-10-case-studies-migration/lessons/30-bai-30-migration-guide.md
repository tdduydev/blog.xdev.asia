---
id: 019e4a33-d430-7b20-c001-b1c2d3e4f530
title: 'Lesson 30: Migration Guide — From Monolith to Microservices & Micro Frontend'
slug: bai-30-migration-guide-tu-monolith-den-microservices-micro-frontend
description: >-
  Actual migration roadmap from Monolith. Strangler Fig Pattern. Monolith
  analysis: hot spots, coupling, dependencies. Migration backend: Extract
  Service. Migration frontend: Extract MFE. Dual-write, data migration. Timeline
  and team organization.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 30
section_title: 'Part 10: Case Studies & Migration Guide'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: Microservices & Micro Frontend system design — From basics to Production
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-5325" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-5325)"/>

  <!-- Decorations -->
  <g>
    <circle cx="796" cy="98" r="14" fill="#2dd4bf" opacity="0.13"/>
    <circle cx="992" cy="34" r="32" fill="#2dd4bf" opacity="0.11"/>
    <circle cx="688" cy="230" r="20" fill="#2dd4bf" opacity="0.09"/>
    <circle cx="884" cy="166" r="8" fill="#2dd4bf" opacity="0.07"/>
    <circle cx="1080" cy="102" r="26" fill="#2dd4bf" opacity="0.05"/>
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
    <line x1="600" y1="58" x2="1100" y2="138" stroke="#2dd4bf" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="88" x2="1050" y2="158" stroke="#2dd4bf" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1036.5788383248864,191.5 1036.5788383248864,224.5 1008,241 979.4211616751136,224.5 979.4211616751135,191.5 1008,175" fill="none" stroke="#2dd4bf" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#2dd4bf"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#2dd4bf" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ Architecture — Lesson 30</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 30: Migration Guide — From the Monolith</tspan>
      <tspan x="60" dy="42">Microservices & Micro Frontend</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Microservices & Micro Frontend system design — From basics to Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 10: Case Studies & Migration Guide</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

Most practical systems start from a Monolith — and a good monolith! Migration to Microservices + Micro Frontend is a **long process**, not a big bang rewrite. This article guides you through a safe, step-by-step migration path.


![Strangler Fig Pattern — Migration from Monolith to Microservices](/storage/uploads/2026/04/mfe-ms-diagram-bai30-strangler-fig-migration.webp)

---

## 1. Strangler Fig Pattern

### 1.1 Ideas

```
Strangler Fig Tree: cây phụ bao quanh cây chủ,
dần dần thay thế cho đến khi cây chủ biến mất.

Phase 1: Monolith xử lý mọi thứ
┌──────────────────────┐
│      Monolith        │
│ Users│Products│Orders│
└──────────────────────┘

Phase 2: Extract service, route traffic
┌───────────────────────┐
│     API Gateway       │
├───────────┬───────────┤
│ Monolith  │  Product  │
│ (Users,   │  Service  │
│  Orders)  │  (new)    │
└───────────┴───────────┘

Phase 3: Extract more services
┌───────────────────────────┐
│       API Gateway         │
├────────┬────────┬─────────┤
│Monolith│Product │  Order  │
│(Users) │Service │ Service │
│        │        │  (new)  │
└────────┴────────┴─────────┘

Phase N: Monolith is gone
┌────────────────────────────────┐
│          API Gateway           │
├────────┬────────┬──────────────┤
│  User  │Product │    Order     │
│Service │Service │   Service    │
└────────┴────────┴──────────────┘
```

---

## 2. Migration Assessment

### 2.1 Monolith Analysis

```
Trước khi migration, hiểu monolith:

Code Analysis:
├── Module coupling (which modules call which?)
├── Database coupling (shared tables?)
├── Hot spots (most changed code)
├── Complexity (cyclomatic, LOC)
└── Team ownership (ai maintain gì?)

Prioritization Matrix:
┌──────────────────────────────────────┐
│         Business Value               │
│ High │ ★ Extract first │ Rewrite    │
│      │   (Product,     │ later      │
│      │    Order)       │            │
│──────┼─────────────────┼────────────│
│ Low  │ Leave in        │ Consider   │
│      │ monolith        │ removing   │
│      │ (low ROI)       │            │
│      └──── Low ─────── High ────────│
│           Change Frequency           │
└──────────────────────────────────────┘
```

---

## 3. Backend Migration Playbook

### 3.1 Phase 1: API Gateway (Week 1-4)

```
1. Deploy API Gateway trước monolith
2. Route ALL traffic qua Gateway
3. Gateway forward mọi thứ đến Monolith
4. Không thay đổi behavior — chỉ thêm routing layer

Frontend → API Gateway → Monolith (no change)
```

### 3.2 Phase 2: Extract First Service (Week 5-12)

```
Chọn service ít coupling nhất (ví dụ: Product Catalog)

Steps:
1. Create Product Service (new codebase)
2. Copy/rewrite product logic
3. Setup database (copy product tables)
4. Dual-write: monolith write cả old DB + new service
5. Verify data consistency
6. Switch reads: Gateway route GET /products → new service
7. Switch writes: Gateway route POST/PUT /products → new service
8. Remove product code from monolith
9. Drop product tables from monolith DB (after verification)
```

### 3.3 Data Migration Strategy

```
Dual-Write Pattern:

Phase A: Monolith writes to Old DB + New DB
         Reads from Old DB
         → Verify New DB data matches

Phase B: Monolith writes to Old DB + New DB
         Reads from New DB (switch)
         → Verify reads correct

Phase C: New Service writes to New DB only
         Monolith no longer involved
         → Clean up Old DB tables
```

---

## 4. Frontend Migration Playbook

### 4.1 Phase 1: Shell App (Week 1-4)

```
1. Create Shell App (new React app)
2. Shell wraps existing monolith frontend (iframe initially)
3. Shell provides Header, Footer, Navigation
4. Gradually replace iframe sections with MFEs
```

### 4.2 Phase 2: Extract First MFE (Week 5-8)

```
Extract Product pages as first MFE:

1. Create product-mfe project
2. Configure Module Federation (expose ProductList, ProductDetail)
3. Shell loads product-mfe via Module Federation
4. Remove product pages from monolith frontend
5. Verify routing, styling, functionality

Shell App
├── Header (Shell)
├── /products/* → Product MFE (new, Module Federation)
├── /cart/* → Monolith Frontend (iframe, temporary)
├── /orders/* → Monolith Frontend (iframe, temporary)
└── Footer (Shell)
```

### 4.3 Gradual Replacement

```
Month 1: Shell + Product MFE
Month 2: + Cart MFE
Month 3: + Order MFE
Month 4: + Account MFE
Month 5: Remove iframe, monolith frontend retired
```

---

## 5. Migration Anti-patterns

```
❌ Big Bang Rewrite
   → 12-18 months later: "it's not ready yet"
   → Business can't wait, original monolith diverges

❌ Extract based on technical layers
   → "API service", "DB service", "Auth service"
   → Should be business domains: Product, Order, User

❌ Shared database between old and new
   → Defeats the purpose of database per service
   → Temporal coupling, schema changes break both

❌ Migration without observability
   → Can't compare old vs new behavior
   → Can't detect regressions
```

---

## 6. Migration Timeline (Typical)

```
E-Commerce Monolith → Microservices + MFE:

Month 1-2:  Infrastructure setup
            (K8s, CI/CD, monitoring, API Gateway)

Month 3-4:  First service extraction
            (Product Service + Product MFE)

Month 5-6:  Second service extraction
            (Order Service + Order MFE)

Month 7-8:  Third + Fourth services
            (Cart, User)

Month 9-10: Supporting services
            (Payment, Notification, Inventory)

Month 11-12: Cleanup monolith
              Remove old code, drop old tables

Ongoing:    Optimize, add services as needed
```

---

## 7. Success Metrics

| Metrics | Before (Monolith) | After (Micro*) |
|--------|-------------------|-----------------|
| Deploy frequency | 1/week | 5-10/day per team |
| Lead time | 2 weeks | 1-2 days |
| MTTR | 2-4 hours | 15-30 min |
| Change failure rate | 15% | < 5% |
| Team autonomy | Low (PR conflicts) | High (independent) |
| Build time | 15 min | 2-3 min (per service) |

---

## Summary

- **Strangler Fig Pattern**: migrate gradually, not big bang rewrite
- **Extract by business domain**, not technical layer
- **Dual-write** for data migration safety
- **API Gateway first** → route traffic incrementally
- **Frontend**: Shell App → extract MFEs one by one
- **Timeline**: 9-12 months for typical e-commerce
- **Measure success**: deploy frequency, lead time, MTTR

---

## 🎉 Congratulations on completing the Series!

You have gone through the entire journey:
1. **Platform**: Monolith → Microservices → Micro Frontend evolution
2. **Backend**: Service decomposition, API design, async communication
3. **Data**: Database per service, Saga, Event Sourcing
4. **Frontend**: Micro Frontend architecture, Module Federation, Shell App
5. **Integration**: BFF, API Gateway, GraphQL Federation
6. **Quality**: Testing strategy, Contract Testing
7. **Deployment**: CI/CD, Canary, GitOps
8. **Production**: Observability, Performance, Security
9. **Practice**: Case Study, Migration Guide

**Next:** Apply to real projects! Start small, validate early, iterate quickly.
