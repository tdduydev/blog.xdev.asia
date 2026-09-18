---
id: 019e4a33-d417-7b20-c001-b1c2d3e4f517
title: 'Lesson 17: BFF Pattern — Backend for Frontend'
slug: bai-17-bff-pattern-backend-for-frontend
description: >-
  BFF Pattern: each frontend has its own backend. Why BFF is suitable for Micro
  Frontend. Design BFF for Web vs Mobile. BFF aggregation layer. Avoid BFF
  becoming monolith.
duration_minutes: 75
is_free: true
video_url: null
sort_order: 17
section_title: 'Part 6: API Gateway & BFF Layer'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: Microservices & Micro Frontend system design — From basics to Production
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-2107" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-2107)"/>

  <!-- Decorations -->
  <g>
    <circle cx="703" cy="99" r="16" fill="#c084fc" opacity="0.14"/>
    <circle cx="806" cy="122" r="35" fill="#c084fc" opacity="0.13"/>
    <circle cx="909" cy="145" r="24" fill="#c084fc" opacity="0.12000000000000001"/>
    <circle cx="1012" cy="168" r="13" fill="#c084fc" opacity="0.11"/>
    <circle cx="615" cy="191" r="32" fill="#c084fc" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#c084fc" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#c084fc" opacity="0.15"/>
    <line x1="600" y1="69" x2="1100" y2="149" stroke="#c084fc" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="99" x2="1050" y2="169" stroke="#c084fc" stroke-width="0.5" opacity="0.08"/>
    <polygon points="957.1051177665153,97 957.1051177665153,141 919,163 880.8948822334847,141 880.8948822334847,97.00000000000001 919,75" fill="none" stroke="#c084fc" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#c084fc"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#c084fc" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#c084fc">🏗️ Architecture — Lesson 17</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 17: BFF Pattern — Backend for Frontend</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Microservices & Micro Frontend system design — From basics to Production</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 6: API Gateway & BFF Layer</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

Backend for Frontend (BFF) is a pattern that places a separate **backend layer** for each frontend client. BFF aggregates data from multiple microservices, transforming it into a format suitable for the specific frontend.


![BFF Pattern — Separate Backend for Frontend for each client](/storage/uploads/2026/04/mfe-ms-diagram-bai17-bff-pattern.webp)

---

## 1. Why do you need a BFF?

### 1.1 The problem of not having a BFF

```
❌ Mỗi MFE gọi trực tiếp nhiều microservices:

Product MFE ──► Product Service
            ──► Review Service
            ──► Inventory Service
            ──► Pricing Service

→ 4 API calls cho 1 product page
→ Frontend phải aggregate data
→ Over-fetching (mỗi API trả về nhiều hơn cần)
→ Latency: waterfall requests
```

### 1.2 With BFF

```
✅ BFF aggregates cho frontend:

Product MFE ──► Web BFF ──► Product Service
                        ──► Review Service
                        ──► Inventory Service

→ 1 API call cho 1 product page
→ BFF aggregate và transform data
→ Frontend nhận đúng data cần
→ Parallel calls tại BFF layer
```

---

## 2. BFF Architecture

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Web App    │  │ Mobile App  │  │  Admin App  │
│  (MFE)     │  │  (React     │  │  (MFE)      │
│            │  │   Native)   │  │             │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Web BFF    │ │  Mobile BFF  │ │  Admin BFF   │
│  (Node.js)   │ │  (Node.js)   │ │  (Node.js)   │
│  Full data   │ │  Compact data│ │  All CRUD    │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │
       └────────────────┼────────────────┘
                        ▼
              ┌─────────────────┐
              │  Microservices  │
              │  (gRPC / REST)  │
              └─────────────────┘
```

---

## 3. BFF Design Principles

### 3.1 One BFF per Frontend Type

| Frontend | BFF | Optimized for |
|----------|-----|---------------|
| Web (Desktop) | Web BFF | Full data, rich UI |
| Mobile | Mobile BFF | Compact data, bandwidth |
| Admin Panel | Admin BFF | CRUD operations |
| Third-party | Public API (not BFF) | Stable, versioned |

### 3.2 BFF Responsibilities

```
BFF SHOULD:
✅ Aggregate data từ multiple services
✅ Transform data cho frontend format
✅ Handle authentication (validate tokens)
✅ Caching (Redis) cho frequently accessed data
✅ Rate limiting per client

BFF SHOULD NOT:
❌ Contain business logic (belongs to services)
❌ Have its own database (stateless!)
❌ Become a "smart proxy" monolith
❌ Be shared across different frontends
```

---

## 4. BFF Implementation (Node.js/Fastify)

```javascript
// Web BFF - Product Page Aggregation
app.get('/api/bff/product/:id', async (req, reply) => {
  const { id } = req.params;
  
  // Parallel calls to microservices
  const [product, reviews, inventory] = await Promise.all([
    productService.getProduct(id),
    reviewService.getReviews(id, { limit: 5 }),
    inventoryService.getStock(id),
  ]);
  
  // Transform for web frontend
  return {
    ...product,
    rating: reviews.averageRating,
    topReviews: reviews.items.slice(0, 3),
    inStock: inventory.quantity > 0,
    stockLevel: inventory.quantity > 10 ? 'high' : 'low',
  };
});
```

---

## 5. BFF vs API Gateway

| Features | API Gateway | BFF |
|--------|-------------|-----|
| **Purpose** | Cross-cutting concerns | Frontend-specific aggregation |
| **Logic** | Routing, auth, rate limit | Data transformation |
| **Per client** | One for all | One per frontend type |
| **Maintained by** | Platform team | Frontend team |

**In practice, use both:**
```
Frontend → API Gateway → BFF → Microservices
           (routing,      (aggregation,
            auth,          transformation)
            rate limit)
```

---

## Summary

- **BFF = separate backend for each frontend type**
- Aggregates data, transforms format, reduces frontend complexity
- **Stateless**, does not contain business logic
- One BFF per frontend type (Web, Mobile, Admin)
- Often combined with API Gateway

---

**Next article:** [Lesson 18: API Gateway — Kong, APISIX & Envoy](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-18-api-gateway-kong-apisix-envoy-thuc-chien)
