---
id: 019d8a22-c307-7a10-b001-a1b2c3d4e507
title: 第 7 課：API 閘道模式 — Kong、APISIX 與 Envoy
slug: bai-7-api-gateway-pattern-kong-apisix-envoy
description: >-
  什麼是 API 閘道、功能（路由、驗證、速率限制、協定轉換）、比較 Kong、APISIX、Envoy、Traefik、前端後端 (BFF) 模式、在
  Kubernetes 上設定 API 閘道。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 7
section_title: 第 2 部分：微服務設計與通訊模式
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: 雲端原生微服務架構
  slug: cloud-native-microservices-architecture
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🏗️ 建築 — 第 7 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 7 課：API 閘道模式 — Kong、APISIX</tspan>
      <tspan x="60" dy="42">&特使</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">雲端原生微服務架構</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 2 部分：微服務設計與通訊模式</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 7 課：API 閘道模式 — Kong、APISIX 與 Envoy](/storage/uploads/2026/03/cn-bai-7-diagram.webp)

## 簡介

當系統有10個、50個、100個微服務時，客戶端無法直接呼叫每個服務。 API 閘道充當**單一入口點**，集中處理橫切問題。

---

## 1.為什麼需要API網關？

### 1.1 沒有網關的問題

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

### 1.2 API網關解決方案

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

## 2. 詳細功能

### 2.1 請求路由

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

### 2.2 身份驗證

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

### 2.3 速率限制

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

### 2.4 協定翻譯

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

## 3. 比較網關解決方案

|特點|孔 | APISIX |特使 |特拉菲克 |
|--------|--------|--------|--------|--------|
| **核心** | Nginx + Lua | Nginx + Lua | C++ |去 |
| **設定儲存** | PostgreSQL |等xDS API |檔/K8s |
| **插件系統** | Lua/Go/JS | Lua/Java/Go/WASM | C++/WASM |去中間件 |
| **效能** |曹 |非常高|非常高|曹 |
| **K8s 原生** | Kong 入口控制器 | APISIX 入口 |特使閘道 | Traefik 入口 |
| **服務網格** |孔網| — | Istio 資料平面 | Traefik 網格 |
| **管理介面** |孔經理（企業）|儀表板（免費）| — |儀表板 |
| **學習曲線** |平均 |平均 |曹 |低|
| **最適合** |企業級，插件豐富|高效能|服務網格| K8s自動發現|

### 3.1 建議

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

## 4.前端後端（BFF）模式

當客戶端類型（Web、行動、物聯網）需要 **不同的 API** 時：

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

## 5. 在 Kubernetes 上部署

### 5.1 Kong 入口控制器

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

## 6. API 閘道反模式

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

## 7. 總結

|概念 |重點|
|--------|------------|
| API閘道|單一入口點，集中處理橫切關注點 |
|路由|將請求路由到正確的下游服務 |
|授權 | JWT集中驗證，透過標頭轉發聲明 |
|速率限制 |保護後端服務免受流量高峰的影響 |
|最好的朋友|每種客戶端類型都有自己的、經過優化的網關 |
|反模式 |不要將業務邏輯放在網關中|

> **下一篇文章**：每個服務的資料庫和多語言持久性 - 如何管理微服務架構中的資料。
