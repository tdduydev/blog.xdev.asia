---
id: 019e4a33-d403-7b20-c001-b1c2d3e4f503
title: >-
  Lesson 3: Full-Stack overview architecture — Microservices + Micro Frontend +
  BFF
slug: bai-3-kien-truc-tong-quan-full-stack-microservices-micro-frontend-bff
description: >-
  Comprehensive architectural blueprint: Frontend (Micro Frontend Shell + Remote
  Apps), BFF Layer, API Gateway, Backend Microservices, Message Broker, Database
  per Service. End-to-end request flow and key integration points.
duration_minutes: 75
is_free: true
video_url: null
sort_order: 3
section_title: 'Part 1: Foundation — Evolution of Architecture'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: Microservices & Micro Frontend system design — From basics to Production
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: en
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ Architecture — Lesson 3</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 3: Full-Stack overview architecture —</tspan>
      <tspan x="60" dy="42">Microservices + Micro Frontend + BFF</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Microservices & Micro Frontend system design — From basics to Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 1: Foundation — Evolution of Architecture</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

After understanding the architectural and DDD evolution roadmap, this article draws the **overall blueprint** for the Full-Stack Microservices + Micro Frontend system — an architectural map that we will dive into in detail throughout the series.


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

## 2. Main layers

### 2.1 Micro Frontend Layer

Shell Application (Container) coordinates Remote Micro Frontend applications. Each MFE is an independent application, built and deployed separately.

**Shell App Responsibilities:**
- General layout (Header, Footer, Sidebar)
- Routing & Navigation
- Authentication state
- Error boundaries

### 2.2 BFF Layer

Backend for Frontend aggregates data from many microservices, transforming it into a suitable format for each micro frontend. Especially useful when:
- Frontend needs data from many services in one request
- Mobile vs Web needs different data formats
- Need separate caching layer for frontend

### 2.3 API Gateway

Entry point for all API calls. Handling cross-cutting concerns:
- **Authentication/Authorization**: Verify JWT tokens
- **Rate Limiting**: Protects the backend from abuse
- **Request Routing**: Route to the correct service
- **Load Balancing**: Traffic distribution
- **SSL Termination**: Handles HTTPS

### 2.4 Microservices Layer

Each microservice owns a Bounded Context, has its own database, and deploys independently. Communicate via REST/gRPC (sync) or Message Broker (async).

### 2.5 Message Broker / Event Bus

Backbone for async communication between services. Ensure loose coupling and event-driven data flow.

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

| Layers | Technology | Why |
|-------|-----------|-----|
| Micro Frontend | React + Module Federation | Mature ecosystem, large community |
| Shell App | React + React Router | SPA routing, lazy loading |
| Design System | Tailwind CSS + Storybook | Consistent UI, component library |
| BFF | Node.js (Fastify) | Same language as frontend, fast I/O |
| API Gateway | Kong / APISIX | Plugin ecosystem, high performance |
| Microservices | Node.js/Go | Node for CRUD, Go for high-perf |
| Message Broker | Apache Kafka | Durability, replayability, high throughput |
| Databases | PostgreSQL, Redis, Elasticsearch | Polyglot persistence |
| Auth | Keycloak | Open-source, full OAuth2/OIDC |
| CI/CD | GitHub Actions + ArgoCD | GitOps, Kubernetes-native |
| Observability | OpenTelemetry + Grafana Stack | Vendor-neutral, full-stack tracing |

---

## Summary

This article provides an overview **architectural map** for the entire series. Each layer will be delved into in the following sections. Understanding big picture helps you not get lost when going into the details of each component.

---

**Next article:** [Lesson 4: Service Decomposition — Bounded Context & Service Boundaries](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-4-service-decomposition-bounded-context-service-boundaries)
