---
id: 019e4a33-d418-7b20-c001-b1c2d3e4f518
title: 'Lesson 18: API Gateway — Kong, APISIX & Envoy in real combat'
slug: bai-18-api-gateway-kong-apisix-envoy-thuc-chien
description: >-
  API Gateway: why is it needed, main functions. Compare Kong vs APISIX vs Envoy
  Gateway vs AWS API Gateway. Configure authentication, rate limiting, routing,
  load balancing. Declarative configuration & GitOps.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 18
section_title: 'Part 6: API Gateway & BFF Layer'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: Microservices & Micro Frontend system design — From basics to Production
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-1637" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-1637)"/>

  <!-- Decorations -->
  <g>
    <circle cx="868" cy="74" r="36" fill="#fbbf24" opacity="0.09"/>
    <circle cx="636" cy="262" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="904" cy="190" r="34" fill="#fbbf24" opacity="0.07"/>
    <circle cx="672" cy="118" r="18" fill="#fbbf24" opacity="0.11"/>
    <circle cx="940" cy="46" r="32" fill="#fbbf24" opacity="0.05"/>
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
    <line x1="600" y1="214" x2="1100" y2="294" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="244" x2="1050" y2="314" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="939.1147367097487,99.5 939.1147367097487,128.5 914,143 888.8852632902513,128.5 888.8852632902513,99.50000000000001 914,85" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ Architecture — Lesson 18</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 18: API Gateway — Kong, APISIX & Envoy</tspan>
      <tspan x="60" dy="42">real combat</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Microservices & Micro Frontend system design — From basics to Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 6: API Gateway & BFF Layer</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

API Gateway is the **single entry point** for all API calls from the frontend. It handles cross-cutting concerns: authentication, rate limiting, routing, monitoring — helping microservices focus on business logic.


![API Gateway — single entry point for all requests](/storage/uploads/2026/04/mfe-ms-diagram-bai18-api-gateway.webp)

---

## 1. Why do we need API Gateway?

### 1.1 No Gateway

```
❌ Client gọi trực tiếp services:

Frontend ──► User Service    (port 8001)
         ──► Product Service (port 8002)
         ──► Order Service   (port 8003)
         ──► Cart Service    (port 8004)

Vấn đề:
- Frontend phải biết địa chỉ từng service
- Mỗi service tự implement auth, rate limit, CORS
- Không có single point for monitoring/logging
- Service addresses thay đổi → frontend phải update
```

### 1.2 With API Gateway

```
✅ Single entry point:

Frontend ──► API Gateway (/api/*) ──► User Service
                                  ──► Product Service
                                  ──► Order Service

API Gateway handles:
├── Authentication (JWT verification)
├── Rate Limiting (100 req/min per user)
├── Routing (path-based → service)
├── Load Balancing (round-robin)
├── SSL Termination
├── CORS
├── Request/Response transformation
└── Monitoring & Logging
```

---

## 2. Compare API Gateways

| Features | **Kong** | **APISIX** | **Envoy Gateway** | **AWS API GW** |
|--------|---------|-----------|-------|---------------|
| **Core** | Nginx/OpenResty | Nginx/etcd | Envoy Proxy | Managed |
| **Performance** | High | Very High | Very High | High |
| **Plugins** | 100+ | 80+ | Via filters | AWS native |
| **K8s native** | Kong Ingress | APISIX Ingress | K8s Gateway API | N/A |
| **Config** | DB/Declarative | etcd/YAML | K8s CRDs | Console/CF |
| **Dashboard** | Kong Manager | Apache Dashboard | N/A | Console |
| **Cost** | Open-source | Open-source | Open-source | Pay per request |
| **Best for** | General | High-perf, China | K8s native | AWS ecosystem |

---

## 3. Kong Configuration

### 3.1 Declarative Config (kong.yml)

```yaml
_format_version: "3.0"

services:
  - name: product-service
    url: http://product-svc:8080
    routes:
      - name: product-routes
        paths:
          - /api/v1/products
        strip_path: false
    plugins:
      - name: jwt
      - name: rate-limiting
        config:
          minute: 100
          policy: redis
          redis_host: redis
      - name: cors
        config:
          origins: ["https://app.example.com"]
          methods: ["GET", "POST", "PUT", "DELETE"]

  - name: order-service
    url: http://order-svc:8080
    routes:
      - name: order-routes
        paths:
          - /api/v1/orders
    plugins:
      - name: jwt
      - name: rate-limiting
        config:
          minute: 50
```

### 3.2 Key Plugins

| Plugins | Purpose |
|--------|--------|
| `jwt` | Verify JWT tokens |
| `rate-limiting` | Rate limit per consumer |
| `cors` | CORS headers |
| `request-transformer` | Modify request headers/body |
| `response-transformer` | Modify response |
| `prometheus` | Metrics endpoint |
| `file-log` / `tcp-log` | Logging |
| `ip-restriction` | Whitelist/Blacklist IPs |

---

## 4. APISIX Configuration

```yaml
routes:
  - uri: /api/v1/products/*
    upstream:
      type: roundrobin
      nodes:
        "product-svc:8080": 1
    plugins:
      jwt-auth:
        key: "product-key"
      limit-req:
        rate: 100
        burst: 50
        key_type: "var"
        key: "consumer_name"

  - uri: /api/v1/orders/*
    upstream:
      nodes:
        "order-svc:8080": 1
    plugins:
      jwt-auth: {}
```

---

## 5. Gateway Patterns

### 5.1 Path-based Routing

```
/api/v1/products/*  → Product Service
/api/v1/orders/*    → Order Service
/api/v1/users/*     → User Service
/api/v1/cart/*      → Cart Service
```

### 5.2 Header-based Routing

```
X-API-Version: v2 → v2 service
X-Client-Type: mobile → mobile-optimized service
```

### 5.3 Canary Routing

```
95% traffic → Product Service v1 (stable)
5% traffic  → Product Service v2 (canary)
```

---

## 6. GitOps for API Gateway

```
Repository:
├── gateway/
│   ├── kong.yml (declarative config)
│   ├── plugins/
│   └── consumers/
└── .github/workflows/
    └── deploy-gateway.yml

CI/CD:
1. PR: change gateway config
2. Review: team review routing/auth changes
3. Merge: auto-apply via deck sync (Kong)
4. Monitor: check metrics after deploy
```

---

## Summary

- API Gateway = **single entry point** for all API calls
- Handling cross-cutting: auth, rate limiting, routing, monitoring
- **Kong**: general purpose, mature, plugin-rich
- **APISIX**: high performance, dynamic plugins via etcd
- **Envoy Gateway**: K8s Gateway API native
- **GitOps**: declarative config, version controlled

---

**Next article:** [Lesson 19: GraphQL Federation — Unified API for Micro Frontend](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-19-graphql-federation-unified-api-cho-micro-frontend)
