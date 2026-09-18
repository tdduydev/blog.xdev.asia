---
id: 019e4a33-d418-7b20-c001-b1c2d3e4f518
title: 'レッスン 18: API ゲートウェイ — 実際の戦闘での Kong、APISIX、Envoy'
slug: bai-18-api-gateway-kong-apisix-envoy-thuc-chien
description: >-
  APIゲートウェイ:なぜ必要なのか、主な機能。 Kong、APISIX、Envoy ゲートウェイ、AWS API
  ゲートウェイを比較します。認証、レート制限、ルーティング、負荷分散を構成します。宣言型構成と GitOps。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 18
section_title: 'パート 6: API ゲートウェイと BFF レイヤー'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🏗️ アーキテクチャ — レッスン 18</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 18: API ゲートウェイ — Kong、APISIX、Envoy</tspan>
      <tspan x="60" dy="42">実戦</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 6: API ゲートウェイと BFF レイヤー</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

API ゲートウェイは、フロントエンドからのすべての API 呼び出しに対する **単一のエントリ ポイント**です。認証、レート制限、ルーティング、監視などの横断的な問題に対応し、マイクロサービスがビジネス ロジックに集中できるように支援します。


![API ゲートウェイ — すべてのリクエストに対する単一のエントリ ポイント](/storage/uploads/2026/04/mfe-ms-diagram-bai18-api-gateway.webp)

---

## 1. API ゲートウェイが必要な理由は何ですか?

### 1.1 ゲートウェイなし

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

### 1.2 API ゲートウェイを使用する

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

## 2. API ゲートウェイの比較

|特長 | **コン** | **APISIX** | **エンボイ ゲートウェイ** | **AWS API GW** |
|----------|-----------|-----------|----------|------|
| **コア** | Nginx/OpenResty | Nginx/etcd |特使代理人 |管理 |
| **パフォーマンス** |高 |非常に高い |非常に高い |高 |
| **プラグイン** | 100+ | 80+ |フィルター経由 | AWS ネイティブ |
| **K8s ネイティブ** |コングイングレス | APISIX イングレス | K8s ゲートウェイ API |該当なし |
| **構成** | DB/宣言型 | etcd/YAML | K8s CRD |コンソール/CF |
| **ダッシュボード** |コングマネージャー | Apache ダッシュボード |該当なし |コンソール |
| **コスト** |オープンソース |オープンソース |オープンソース |リクエストごとに支払う |
| **こんな用途に最適** |一般 |高パフォーマンス、中国 | K8s ネイティブ | AWS エコシステム |

---

## 3. Kong の構成

### 3.1 宣言型構成 (kong.yml)

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

### 3.2 主要なプラグイン

|プラグイン |目的 |
|----------|----------|
| `jwt` | JWT トークンを検証する |
| `rate-limiting` |消費者ごとのレート制限 |
| `cors` | CORS ヘッダー |
| `request-transformer` |リクエストのヘッダー/本文を変更する |
| `response-transformer` |応答を変更 |
| `prometheus` |メトリクスエンドポイント |
| `file-log` / `tcp-log` |ロギング |
| `ip-restriction` |ホワイトリスト/ブラックリスト IP |

---

## 4. APISIX 構成

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

## 5. ゲートウェイのパターン

### 5.1 パスベースのルーティング

```
/api/v1/products/*  → Product Service
/api/v1/orders/*    → Order Service
/api/v1/users/*     → User Service
/api/v1/cart/*      → Cart Service
```

### 5.2 ヘッダーベースのルーティング

```
X-API-Version: v2 → v2 service
X-Client-Type: mobile → mobile-optimized service
```

### 5.3 カナリアルーティング

```
95% traffic → Product Service v1 (stable)
5% traffic  → Product Service v2 (canary)
```

---

## 6. API ゲートウェイの GitOps

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

## 概要

- API ゲートウェイ = すべての API 呼び出しに対する **単一のエントリ ポイント**
- 横断的な処理: 認証、レート制限、ルーティング、モニタリング
- **Kong**: 汎用、成熟した、豊富なプラグイン
- **APISIX**: etcd を介した高性能の動的プラグイン
- **Envoy ゲートウェイ**: K8s ゲートウェイ API ネイティブ
- **GitOps**: 宣言型構成、バージョン管理

---

**次の記事:** [レッスン 19: GraphQL フェデレーション — マイクロ フロントエンド用の統合 API](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-19-graphql-federation-unified-api-cho-micro-frontend)
