---
id: 019e4a33-d403-7b20-c001-b1c2d3e4f503
title: 'レッスン 3: フルスタックのアーキテクチャの概要 — マイクロサービス + マイクロ フロントエンド + BFF'
slug: bai-3-kien-truc-tong-quan-full-stack-microservices-micro-frontend-bff
description: >-
  包括的なアーキテクチャ ブループリント: フロントエンド (マイクロ フロントエンド シェル + リモート アプリ)、BFF レイヤー、API
  ゲートウェイ、バックエンド マイクロサービス、メッセージ ブローカー、サービスごとのデータベース。エンドツーエンドのリクエスト フローと主要な統合ポイント。
duration_minutes: 75
is_free: true
video_url: null
sort_order: 3
section_title: 'パート 1: 基礎 — アーキテクチャの進化'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ アーキテクチャ — レッスン 3</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 3: フルスタックのアーキテクチャの概要 —</tspan>
      <tspan x="60" dy="42">マイクロサービス + マイクロ フロントエンド + BFF</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 1: 基礎 — アーキテクチャの進化</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

アーキテクチャと DDD 進化のロードマップを理解した後、この記事では、フルスタック マイクロサービス + マイクロ フロントエンド システムの **全体的な青写真**を描きます。このアーキテクチャ マップについては、シリーズ全体で詳しく説明します。


![Full-Stack Architecture Blueprint — Microservices + Micro Frontend](/storage/uploads/2026/04/mfe-ms-diagram-bai3-fullstack-architecture.webp)

---

## 1. アーキテクチャの概要

### 1.1 フルスタック アーキテクチャ ブループリント

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

## 2. 主要な層

### 2.1 マイクロフロントエンド層

シェル アプリケーション (コンテナ) は、リモート マイクロ フロントエンド アプリケーションを調整します。各 MFE は独立したアプリケーションであり、個別に構築および展開されます。

**シェルアプリの責任:**
- 一般的なレイアウト (ヘッダー、フッター、サイドバー)
- ルーティングとナビゲーション
- 認証状態
- エラー境界

### 2.2 BFF レイヤー

フロントエンド用バックエンドは、多くのマイクロサービスからのデータを集約し、各マイクロ フロントエンドに適した形式に変換します。次の場合に特に役立ちます。
- フロントエンドは 1 つのリクエストで多くのサービスからのデータを必要とします
- モバイルとウェブでは異なるデータ形式が必要です
- フロントエンドには別のキャッシュ層が必要

### 2.3 APIゲートウェイ

すべての API 呼び出しのエントリ ポイント。横断的な問題への対処:
- **認証/認可**: JWT トークンを検証します。
- **レート制限**: バックエンドを悪用から保護します。
- **リクエスト ルーティング**: 正しいサービスにルーティングします。
- **負荷分散**: トラフィック分散
- **SSL 終了**: HTTPS を処理します

### 2.4 マイクロサービス層

各マイクロサービスは境界コンテキストを所有し、独自のデータベースを持ち、独立してデプロイされます。 REST/gRPC (同期) またはメッセージ ブローカー (非同期) 経由で通信します。

### 2.5 メッセージ ブローカー/イベント バス

サービス間の非同期通信のためのバックボーン。疎結合とイベント駆動型のデータ フローを確保します。

---

## 3. エンドツーエンドのリクエスト フロー

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

## 4. テクノロジースタックの概要

|レイヤー |テクノロジー |なぜ |
|------|-----------|-----|
|マイクロフロントエンド | React + モジュールフェデレーション |成熟したエコシステム、大規模なコミュニティ |
|シェルアプリ | React + React ルーター | SPA ルーティング、遅延読み込み |
|デザインシステム | Tailwind CSS + ストーリーブック |一貫した UI、コンポーネント ライブラリ |
|親友 | Node.js (高速化) |フロントエンドと同じ言語、高速 I/O |
| APIゲートウェイ |コング / APISIX |プラグイン エコシステム、高パフォーマンス |
|マイクロサービス | Node.js/Go | CRUD 用のノード、高パフォーマンスを目指す |
|メッセージブローカー |アパッチカフカ |耐久性、再現性、高スループット |
|データベース | PostgreSQL、Redis、Elasticsearch |多言語永続性 |
|認証 |キークローク |オープンソースの完全な OAuth2/OIDC |
| CI/CD | GitHub アクション + ArgoCD | GitOps、Kubernetes ネイティブ |
|可観測性 | OpenTelemetry + Grafana スタック |ベンダー中立のフルスタック トレース |

---

## 概要

この記事では、シリーズ全体の概要**建築マップ**を提供します。各レイヤーについては、次のセクションで詳しく説明します。全体像を理解すると、各コンポーネントの詳細を検討するときに道に迷うことがなくなります。

---

**次の記事:** [レッスン 4: サービスの分解 — 境界のあるコンテキストとサービスの境界](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-4-service-decomposition-bounded-context-service-boundaries)
