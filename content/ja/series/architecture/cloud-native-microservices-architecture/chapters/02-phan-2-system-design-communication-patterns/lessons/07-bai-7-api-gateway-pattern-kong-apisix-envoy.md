---
id: 019d8a22-c307-7a10-b001-a1b2c3d4e507
title: 'レッスン 7: API ゲートウェイ パターン — Kong、APISIX、Envoy'
slug: bai-7-api-gateway-pattern-kong-apisix-envoy
description: >-
  API ゲートウェイとは何か、機能 (ルーティング、認証、レート制限、プロトコル変換)、Kong 対 APISIX 対 Envoy 対 Traefik
  の比較、フロントエンド用バックエンド (BFF) パターン、Kubernetes での API ゲートウェイの構成。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 7
section_title: 'パート 2: マイクロサービスの設計と通信パターン'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🏗️ アーキテクチャ — レッスン 7</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 7: API ゲートウェイ パターン — Kong、APISIX</tspan>
      <tspan x="60" dy="42">& 特使</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 2: マイクロサービスの設計と通信パターン</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 7: API ゲートウェイ パターン — Kong、APISIX、Envoy](/storage/uploads/2026/03/cn-bai-7-diagram.webp)

## はじめに

システムに 10、50、または 100 のマイクロサービスがある場合、クライアントは各サービスを直接呼び出すことはできません。 API ゲートウェイは **単一のエントリ ポイント**として機能し、横断的な問題を一元的に処理します。

---

## 1. API ゲートウェイが必要な理由は何ですか?

### 1.1 ゲートウェイがない場合の問題

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

### 1.2 API ゲートウェイ ソリューション

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

## 2. 詳細な機能

### 2.1 リクエストのルーティング

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

### 2.2 認証

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

### 2.3 レート制限

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

### 2.4 プロトコルの変換

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

## 3. ゲートウェイ ソリューションの比較

|特長 |コン |アピシックス |特使 |トレフィク |
|----------|----------|----------|----------|----------|
| **コア** | Nginx + Lua | Nginx + Lua | C++ |行く |
| **構成ストア** |ポストグレSQL | etcd | xDS API |ファイル /K8s |
| **プラグイン システム** | Lua/Go/JS | Lua/Java/Go/WASM | C++/WASM | Goミドルウェア |
| **パフォーマンス** |曹操 |非常に高い |非常に高い |曹操 |
| **K8s ネイティブ** | Kong イングレス コントローラー | APISIX イングレス |エンボイゲートウェイ |トレフィクイングレス |
| **サービス メッシュ** |コングメッシュ | — | Istio データ プレーン |トレイフィックメッシュ |
| **管理 UI** | Kong マネージャー (エンタープライズ) |ダッシュボード (無料) | — |ダッシュボード |
| **学習曲線** |平均 |平均 |曹操 |低い |
| **最適な用途** |エンタープライズ、プラグインが豊富 |高性能 |サービスメッシュ | K8s 自動検出 |

### 3.1 推奨事項

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

## 4. フロントエンド用バックエンド (BFF) パターン

クライアント タイプ (Web、モバイル、IoT) に **異なる API** が必要な場合:

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

## 5. Kubernetes でのデプロイメント

### 5.1 Kong Ingress コントローラー

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

## 6. API ゲートウェイのアンチパターン

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

## 7. まとめ

|コンセプト |キーポイント |
|----------|----------|
| APIゲートウェイ |単一のエントリ ポイントで横断的な問題を一元的に処理 |
|ルーティング |リクエストを正しいダウンストリーム サービスにルーティングする |
|認証 | JWT 集中検証、ヘッダー経由でクレームを転送 |
|レート制限 |バックエンド サービスをトラフィックの急増から保護する |
|親友 |各クライアント タイプには、最適化された独自のゲートウェイがあります。
|アンチパターン |ビジネス ロジックをゲートウェイに配置しないでください。

> **次の記事**: サービスごとのデータベースと多言語永続性 — マイクロサービス アーキテクチャでデータを管理する方法。
