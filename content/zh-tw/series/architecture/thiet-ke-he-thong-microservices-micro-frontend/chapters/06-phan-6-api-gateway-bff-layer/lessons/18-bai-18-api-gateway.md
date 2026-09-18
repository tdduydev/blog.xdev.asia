---
id: 019e4a33-d418-7b20-c001-b1c2d3e4f518
title: 第 18 課：API Gateway — Kong、APISIX 與 Envoy 實戰
slug: bai-18-api-gateway-kong-apisix-envoy-thuc-chien
description: >-
  API網關：為什麼需要它，主要功能。比較 Kong、APISIX、Envoy Gateway 和 AWS API
  Gateway。設定身份驗證、速率限制、路由、負載平衡。聲明式配置和 GitOps。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 18
section_title: 第 6 部分：API 閘道和 BFF 層
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: 微服務與微前端系統設計－從基礎到生產
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ 建築 — 第 18 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 18 課：API 閘道 — Kong、APISIX 與 Envoy</tspan>
      <tspan x="60" dy="42">實戰</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">微服務與微前端系統設計－從基礎到生產</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 6 部分：API 閘道和 BFF 層</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

API 閘道是來自前端的所有 API 呼叫的**單一入口點**。它處理跨領域的問題：身份驗證、速率限制、路由、監控——幫助微服務專注於業務邏輯。


![API 閘道 — 所有要求的單一入口點](/storage/uploads/2026/04/mfe-ms-diagram-bai18-api-gateway.webp)

---

## 1.為什麼需要API網關？

### 1.1 無網關

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

### 1.2 使用API網關

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

## 2. 比較 API 網關

|特點| **孔** | **APISIX** | **特使網關** | **AWS API GW** |
|--------|---------|------------|--------|---------------|
| **核心** | Nginx/OpenResty | Nginx/etcd |特使代理人 |管理 |
| **性能** |高|非常高 |非常高 |高|
| **插件** | 100+ | 80+ |透過過濾器| AWS 原生 |
| **K8s 原生** |金剛入口 | APISIX 入口 | K8s 閘道器 API |不適用 |
| **設定** |資料庫/宣告式| etcd/YAML | K8s CRD |控制台/CF |
| **儀表板** |孔經理 |阿帕契儀表板|不適用 |控制台|
| **成本** |開源|開源|開源|按請求付費|
| **最適合** |一般|高性能，中國 | K8s原生| AWS 生態系統 |

---

## 3. Kong配置

### 3.1 宣告式設定 (kong.yml)

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

### 3.2 關鍵插件

|插件 |目的|
|--------|--------|
| `jwt` |驗證 JWT 令牌 |
| `rate-limiting` |每個消費者的速率限制|
| `cors` | CORS 標頭 |
| `request-transformer` |修改請求頭/內文 |
| `response-transformer` |修改回覆 |
| `prometheus` |指標端點 |
| `file-log` / `tcp-log` |記錄 |
| `ip-restriction` |白名單/黑名單 IP |

---

## 4. APISIX 配置

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

## 5. 網關模式

### 5.1 基於路徑的路由

```
/api/v1/products/*  → Product Service
/api/v1/orders/*    → Order Service
/api/v1/users/*     → User Service
/api/v1/cart/*      → Cart Service
```

### 5.2 基於標頭的路由

```
X-API-Version: v2 → v2 service
X-Client-Type: mobile → mobile-optimized service
```

### 5.3 金絲雀路由

```
95% traffic → Product Service v1 (stable)
5% traffic  → Product Service v2 (canary)
```

---

## 6. API 閘道的 GitOps

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

## 總結

- API 閘道 = **所有 API 呼叫的單一入口點**
- 處理橫切：身份驗證、速率限制、路由、監控
- **Kong**：通用、成熟、插件豐富
- **APISIX**：透過 etcd 的高效能、動態插件
- **Envoy Gateway**：K8s 網關 API 原生
- **GitOps**：聲明式配置，版本控制

---

**下一篇文章：** [第 19 課：GraphQL Federation — 微前端的統一 API](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-19-graphql-federation-unified-api-cho-micro-frontend)
