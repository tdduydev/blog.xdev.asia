---
id: 019d8a22-c307-7a10-b001-a1b2c3d4e507
title: 'Lesson 7: API Gateway Pattern — Kong, APISIX & Envoy'
slug: bai-7-api-gateway-pattern-kong-apisix-envoy
description: >-
  What is API Gateway, functions (routing, auth, rate limiting, protocol
  translation), compare Kong vs APISIX vs Envoy vs Traefik, Backend for Frontend
  (BFF) pattern, configure API Gateway on Kubernetes.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 7
section_title: 'Part 2: Microservices Design & Communication Patterns'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: Cloud Native Microservices Architecture
  slug: cloud-native-microservices-architecture
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-182" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-182)"/>

  <!-- Decorations -->
  <g>
    <circle cx="780" cy="170" r="18" fill="#38bdf8" opacity="0.05"/>
    <circle cx="960" cy="130" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="640" cy="90" r="28" fill="#38bdf8" opacity="0.05"/>
    <circle cx="820" cy="50" r="18" fill="#38bdf8" opacity="0.05"/>
    <circle cx="1000" cy="270" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <line x1="600" y1="90" x2="1100" y2="170" stroke="#38bdf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="120" x2="1050" y2="190" stroke="#38bdf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1061.650635094611,227.5 1061.650635094611,252.5 1040,265 1018.349364905389,252.5 1018.349364905389,227.5 1040,215" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#38bdf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#38bdf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🏗️ Architecture — Lesson 7</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 7: API Gateway Pattern — Kong, APISIX</tspan>
      <tspan x="60" dy="42">& Envoy</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Cloud Native Microservices Architecture</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 2: Microservices Design & Communication Patterns</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Lesson 7: API Gateway Pattern — Kong, APISIX & Envoy](/storage/uploads/2026/03/cn-bai-7-diagram.webp)

## Introduction

When the system has 10, 50, or 100 microservices, the client cannot call each service directly. API Gateway acts as a **single entry point**, centrally handling cross-cutting concerns.

---

## 1. Why do we need API Gateway?

### 1.1 Problems without Gateway

```
❌ Client gọi trực tiếp:
Mobile App ──▶ Order Service (https://order.internal:8080)
           ──▶ Payment Service (https://payment.internal:8081)
           ──▶ User Service (https://user.internal:8082)
           ──▶ Catalog Service (https://catalog.internal:8083)

Vấn đề:
├── Client cần biết địa chỉ từng service
├── Mỗi service tự implement auth, rate limit, CORS
├── Thay đổi service address → update client
├── Không có single point để monitor traffic
└── Security: expose internal services ra internet
```

### 1.2 API Gateway solution

```
✅ Single entry point:
Mobile App ──▶ API Gateway (https://api.example.com)
                   │
                   ├──▶ /orders   → Order Service
                   ├──▶ /payments → Payment Service
                   ├──▶ /users    → User Service
                   └──▶ /products → Catalog Service

Gateway xử lý tập trung:
├── Authentication (JWT validation)
├── Rate Limiting
├── Request Routing
├── Protocol Translation
├── Response Caching
├── Logging & Metrics
└── CORS, Compression
```

---

## 2. Detailed functions

### 2.1 Request Routing

```yaml
# Kong declarative config
services:
  - name: order-service
    url: http://order-service.services-prod:8080
    routes:
      - name: order-routes
        paths:
          - /api/v1/orders
        methods:
          - GET
          - POST
        strip_path: false

  - name: payment-service
    url: http://payment-service.services-prod:8080
    routes:
      - name: payment-routes
        paths:
          - /api/v1/payments
```

### 2.2 Authentication

```
Client ──Bearer Token──▶ API Gateway
                              │
                         JWT Validation:
                         ├── Verify signature (RS256/ES256)
                         ├── Check expiration
                         ├── Validate issuer
                         └── Extract claims (user_id, roles, tenant_id)
                              │
                         Forward headers:
                         X-User-ID: usr-042
                         X-Roles: admin,editor
                         X-Tenant-ID: tenant-001
                              │
                              ▼
                         Downstream Service
                         (trust gateway headers)
```

### 2.3 Rate Limiting

```
Rate Limiting Strategies:

Per User:
  user-A: 100 requests / minute
  user-B: 100 requests / minute

Per API:
  GET /orders:  1000 requests / minute
  POST /orders: 100 requests / minute

Per Service Plan:
  Free tier:  60 requests / minute
  Pro tier:   600 requests / minute
  Enterprise: 6000 requests / minute

Response khi exceed:
  HTTP 429 Too Many Requests
  Retry-After: 30
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 0
  X-RateLimit-Reset: 1711872000
```

### 2.4 Protocol Translation

```
Browser (REST/JSON) ──▶ API Gateway ──▶ gRPC Service
                              │
                     Translate:
                     - JSON → Protobuf
                     - HTTP/1.1 → HTTP/2
                     - REST method → gRPC method

WebSocket ──▶ API Gateway ──▶ Streaming Service
GraphQL   ──▶ API Gateway ──▶ REST Services (aggregation)
```

---

## 3. Compare Gateway Solutions

| Features | Kong | APISIX | Envoy | Traefik |
|--------|-------|--------|-------|--------|
| **Core** | Nginx + Lua | Nginx + Lua | C++ | Go |
| **Config Store** | PostgreSQL | etcd | xDS API | File /K8s |
| **Plugin System** | Lua/Go/JS | Lua/Java/Go/WASM | C++/WASM | Go middleware |
| **Performance** | Cao | Very high | Very high | Cao |
| **K8s Native** | Kong Ingress Controller | APISIX Ingress | Envoy Gateway | Traefik Ingress |
| **Service Mesh** | Kong Mesh | — | Istio Data Plane | Traefik Mesh |
| **Admin UI** | Kong Manager (Enterprise) | Dashboard (Free) | — | Dashboard |
| **Learning Curve** | Average | Average | Cao | Low |
| **Best For** | Enterprise, plugin-rich | High performance | Service mesh | K8s auto-discovery |

### 3.1 Recommendations

```
Startup / Small team:
  → Traefik (auto-discovery, Let's Encrypt built-in)

Medium / High performance:
  → APISIX (etcd-backed, hot reload, dashboard free)

Enterprise / Plugin-rich:
  → Kong (mature ecosystem, enterprise support)

Service Mesh integration:
  → Envoy (Istio data plane, xDS API)

AWS ecosystem:
  → AWS API Gateway + ALB
```

---

## 4. Backend for Frontend (BFF) Pattern

When client types (Web, Mobile, IoT) need **different APIs**:

```
┌──────────┐   ┌──────────────┐
│   Web    │──▶│  Web BFF     │──┐
│  Browser │   │ (REST, rich) │  │
└──────────┘   └──────────────┘  │
                                  │
┌──────────┐   ┌──────────────┐  │    ┌──────────────┐
│  Mobile  │──▶│ Mobile BFF   │──┼───▶│  Backend     │
│   App    │   │ (compact)    │  │    │  Services    │
└──────────┘   └──────────────┘  │    └──────────────┘
                                  │
┌──────────┐   ┌──────────────┐  │
│   IoT    │──▶│  IoT BFF     │──┘
│ Devices  │   │ (minimal)    │
└──────────┘   └──────────────┘

Web BFF: Trả full data, rich response
Mobile BFF: Response compact, ít fields, optimized bandwidth
IoT BFF: Minimal payload, binary protocol
```

---

## 5. Deployment on Kubernetes

### 5.1 Kong Ingress Controller

```yaml
# Cài đặt Kong qua Helm
# helm install kong kong/ingress -n gateway --create-namespace

apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: rate-limiting
config:
  minute: 100
  policy: redis
  redis_host: redis.platform
plugin: rate-limiting

---
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: jwt-auth
plugin: jwt

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
  annotations:
    konghq.com/plugins: rate-limiting, jwt-auth
    konghq.com/strip-path: "false"
spec:
  ingressClassName: kong
  tls:
    - hosts:
        - api.example.com
      secretName: api-tls
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /api/v1/orders
            pathType: Prefix
            backend:
              service:
                name: order-service
                port:
                  number: 8080
          - path: /api/v1/payments
            pathType: Prefix
            backend:
              service:
                name: payment-service
                port:
                  number: 8080
```

---

## 6. API Gateway Anti-patterns

```
❌ Business logic trong Gateway
   → Gateway chỉ xử lý cross-cutting concerns
   → Business logic thuộc về downstream services

❌ Gateway là single point of failure
   → Deploy multiple replicas + load balancer
   → Health check + auto-restart

❌ Quá nhiều aggregation trong Gateway
   → Dùng BFF pattern thay vì biến Gateway thành "God Service"

❌ Không có fallback khi downstream down
   → Implement circuit breaker tại Gateway layer
   → Trả cached response hoặc degraded response
```

---

## 7. Summary

| Concepts | Key Point |
|--------|-----------|
| API Gateway | Single entry point, centrally handling cross-cutting concerns |
| Routing | Route requests to the correct downstream service |
| Auth | JWT centralized validation, forward claims via headers |
| Rate Limiting | Protect backend services from traffic spikes |
| BFF | Each client type has its own gateway, optimized |
| Anti-patterns | Do not place business logic in gateway |

> **Next article**: Database per Service & Polyglot Persistence — How to manage data in microservices architecture.
