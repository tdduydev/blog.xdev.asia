---
id: 019e4a33-d403-7b20-c001-b1c2d3e4f503
title: "Bài 3: Kiến trúc tổng quan Full-Stack — Microservices + Micro Frontend + BFF"
slug: bai-3-kien-truc-tong-quan-full-stack-microservices-micro-frontend-bff
description: >-
  Blueprint kiến trúc toàn diện: Frontend (Micro Frontend Shell + Remote Apps), BFF Layer, API Gateway, Backend Microservices, Message Broker, Database per Service. Luồng request end-to-end và các điểm tích hợp chính.
duration_minutes: 75
is_free: true
video_url: null
sort_order: 3
section_title: "Phần 1: Nền tảng — Evolution of Architecture"
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: "Thiết kế hệ thống Microservices & Micro Frontend — Từ cơ bản đến Production"
  slug: thiet-ke-he-thong-microservices-micro-frontend
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-5994" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-5994)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1055" cy="115" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="1010" cy="230" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="965" cy="85" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="920" cy="200" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="875" cy="55" r="8" fill="#fb923c" opacity="0.1"/>
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
    <line x1="600" y1="165" x2="1100" y2="245" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="195" x2="1050" y2="265" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="949.6410161513776,95 949.6410161513776,135 915,155 880.3589838486224,135 880.3589838486224,95.00000000000001 915,75" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ Kiến trúc — Bài 3</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 3: Kiến trúc tổng quan Full-Stack —</tspan>
      <tspan x="60" dy="42">Microservices + Micro Frontend + BFF</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Thiết kế hệ thống Microservices &amp; Micro Frontend — Từ cơ bản đến Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 1: Nền tảng — Evolution of Architecture</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Giới thiệu

Sau khi hiểu lộ trình tiến hóa kiến trúc và DDD, bài này vẽ ra **blueprint tổng quan** cho hệ thống Full-Stack Microservices + Micro Frontend — bản đồ kiến trúc mà chúng ta sẽ đi sâu vào từng phần trong suốt series.


![Full-Stack Architecture Blueprint — Microservices + Micro Frontend](/storage/uploads/2026/04/mfe-ms-diagram-bai3-fullstack-architecture.webp)

---

## 1. Architecture Overview

### 1.1 Full-Stack Architecture Blueprint

```
┌─────────────────────────────────────────────────────┐
│                    CLIENTS                          │
│            (Browser, Mobile, IoT)                   │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────┐
│              CDN (Static Assets)                    │
│         CloudFront / CloudFlare / Vercel            │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────┐
│           MICRO FRONTEND LAYER                      │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────────┐  │
│  │Shell │ │Produc│ │ Cart │ │Order │ │ Account  │  │
│  │ App  │ │ MFE  │ │ MFE  │ │ MFE  │ │   MFE    │  │
│  └──┬───┘ └──┬───┘ └──┬───┘ └──┬───┘ └────┬─────┘  │
└─────┼────────┼────────┼────────┼──────────┼─────────┘
      └────────┴────────┴────────┴──────────┘
                       │
┌──────────────────────┴──────────────────────────────┐
│              BFF LAYER (Optional)                   │
│        Backend for Frontend Aggregation             │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────┐
│              API GATEWAY                            │
│     (Kong / APISIX / Envoy Gateway)                 │
│  Auth │ Rate Limit │ Routing │ Load Balance         │
└──┬────────┬────────────┬────────────┬───────────────┘
   │        │            │            │
┌──┴──┐ ┌───┴───┐  ┌────┴────┐  ┌────┴────┐
│User │ │Product│  │  Cart   │  │  Order  │
│ µS  │ │  µS   │  │   µS    │  │   µS    │
│     │ │       │  │         │  │         │
│┌───┐│ │┌────┐ │  │ ┌─────┐ │  │ ┌─────┐ │
││PG ││ ││PG  │ │  │ │Redis│ │  │ │ PG  │ │
│└───┘│ │└────┘ │  │ └─────┘ │  │ └─────┘ │
└─────┘ └───────┘  └─────────┘  └────┬────┘
                                     │
┌────────────────────────────────────┴────────────────┐
│              MESSAGE BROKER                         │
│         (Kafka / RabbitMQ / NATS)                   │
│    Events: OrderPlaced, PaymentConfirmed, etc.      │
└─────────────────────────────────────────────────────┘
```

---

## 2. Các Layer chính

### 2.1 Micro Frontend Layer

Shell Application (Container) điều phối các Remote Micro Frontend applications. Mỗi MFE là một ứng dụng độc lập, được build và deploy riêng biệt.

**Trách nhiệm Shell App:**
- Layout chung (Header, Footer, Sidebar)
- Routing & Navigation
- Authentication state
- Error boundaries

### 2.2 BFF Layer

Backend for Frontend aggregates data từ nhiều microservices, transform thành format phù hợp cho từng micro frontend. Đặc biệt hữu ích khi:
- Frontend cần data từ nhiều services trong 1 request
- Mobile vs Web cần data format khác nhau
- Cần caching layer riêng cho frontend

### 2.3 API Gateway

Entry point cho tất cả API calls. Xử lý cross-cutting concerns:
- **Authentication/Authorization**: Verify JWT tokens
- **Rate Limiting**: Bảo vệ backend khỏi abuse
- **Request Routing**: Route đến đúng service
- **Load Balancing**: Phân phối traffic
- **SSL Termination**: Xử lý HTTPS

### 2.4 Microservices Layer

Mỗi microservice own một Bounded Context, có database riêng, deploy độc lập. Giao tiếp qua REST/gRPC (sync) hoặc Message Broker (async).

### 2.5 Message Broker / Event Bus

Backbone cho async communication giữa các services. Đảm bảo loose coupling và event-driven data flow.

---

## 3. Request Flow End-to-End

```
User clicks "Add to Cart" trên Product MFE:

1. Product MFE → Shell App (event: addToCart)
2. Shell App → API Gateway (POST /api/cart/items)
3. API Gateway → Auth check → Route đến Cart Service
4. Cart Service → Validate product (call Product Service via gRPC)
5. Cart Service → Save to Redis
6. Cart Service → Publish event "ItemAddedToCart" lên Kafka
7. Response → API Gateway → Shell App
8. Shell App → Cart MFE (update cart badge via custom event)
9. Recommendation Service (async) → Listen event → Update recommendations
```

---

## 4. Technology Stack Overview

| Layer | Technology | Why |
|-------|-----------|-----|
| Micro Frontend | React + Module Federation | Mature ecosystem, large community |
| Shell App | React + React Router | SPA routing, lazy loading |
| Design System | Tailwind CSS + Storybook | Consistent UI, component library |
| BFF | Node.js (Fastify) | Same language as frontend, fast I/O |
| API Gateway | Kong / APISIX | Plugin ecosystem, high performance |
| Microservices | Node.js / Go | Node cho CRUD, Go cho high-perf |
| Message Broker | Apache Kafka | Durability, replayability, high throughput |
| Databases | PostgreSQL, Redis, Elasticsearch | Polyglot persistence |
| Auth | Keycloak | Open-source, full OAuth2/OIDC |
| CI/CD | GitHub Actions + ArgoCD | GitOps, Kubernetes-native |
| Observability | OpenTelemetry + Grafana Stack | Vendor-neutral, full-stack tracing |

---

## Tóm tắt

Bài này cung cấp **bản đồ kiến trúc** tổng quan cho toàn series. Mỗi layer sẽ được đi sâu trong các phần tiếp theo. Hiểu big picture giúp bạn không bị lạc khi đi vào chi tiết từng component.

---

**Bài tiếp theo:** [Bài 4: Service Decomposition — Bounded Context & Service Boundaries](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-4-service-decomposition-bounded-context-service-boundaries)
