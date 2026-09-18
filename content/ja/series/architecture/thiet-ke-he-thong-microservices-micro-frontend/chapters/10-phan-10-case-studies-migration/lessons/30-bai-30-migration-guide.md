---
id: 019e4a33-d430-7b20-c001-b1c2d3e4f530
title: 'レッスン 30: 移行ガイド — モノリスからマイクロサービスおよびマイクロ フロントエンドへ'
slug: bai-30-migration-guide-tu-monolith-den-microservices-micro-frontend
description: >-
  Monolith からの実際の移行ロードマップ。ストラングラーフィグパターン。モノリス分析: ホット スポット、カップリング、依存関係。移行バックエンド:
  サービスの抽出。移行フロントエンド: MFE の抽出。二重書き込み、データ移行。タイムラインとチーム組織。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 30
section_title: 'パート 10: ケーススタディと移行ガイド'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-5325" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-5325)"/>

  <!-- Decorations -->
  <g>
    <circle cx="796" cy="98" r="14" fill="#2dd4bf" opacity="0.13"/>
    <circle cx="992" cy="34" r="32" fill="#2dd4bf" opacity="0.11"/>
    <circle cx="688" cy="230" r="20" fill="#2dd4bf" opacity="0.09"/>
    <circle cx="884" cy="166" r="8" fill="#2dd4bf" opacity="0.07"/>
    <circle cx="1080" cy="102" r="26" fill="#2dd4bf" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <line x1="600" y1="58" x2="1100" y2="138" stroke="#2dd4bf" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="88" x2="1050" y2="158" stroke="#2dd4bf" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1036.5788383248864,191.5 1036.5788383248864,224.5 1008,241 979.4211616751136,224.5 979.4211616751135,191.5 1008,175" fill="none" stroke="#2dd4bf" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#2dd4bf"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#2dd4bf" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ アーキテクチャ — レッスン 30</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 30: 移行ガイド — モノリスから</tspan>
      <tspan x="60" dy="42">マイクロサービスとマイクロ フロントエンド</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 10: ケーススタディと移行ガイド</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

ほとんどの実用的なシステムはモノリスから始まります。そして、それは優れたモノリスです。マイクロサービス + マイクロ フロントエンドへの移行は、**長いプロセス**であり、ビッグバンの書き換えではありません。この記事では、安全な段階的な移行パスについて説明します。


![Strangler Fig パターン — モノリスからマイクロサービスへの移行](/storage/uploads/2026/04/mfe-ms-diagram-bai30-strangler-fig-migration.webp)

---

## 1. ストラングラーフィグパターン

### 1.1 アイデア

```
Strangler Fig Tree: cây phụ bao quanh cây chủ,
dần dần thay thế cho đến khi cây chủ biến mất.

Phase 1: Monolith xử lý mọi thứ
┌──────────────────────┐
│      Monolith        │
│ Users│Products│Orders│
└──────────────────────┘

Phase 2: Extract service, route traffic
┌───────────────────────┐
│     API Gateway       │
├───────────┬───────────┤
│ Monolith  │  Product  │
│ (Users,   │  Service  │
│  Orders)  │  (new)    │
└───────────┴───────────┘

Phase 3: Extract more services
┌───────────────────────────┐
│       API Gateway         │
├────────┬────────┬─────────┤
│Monolith│Product │  Order  │
│(Users) │Service │ Service │
│        │        │  (new)  │
└────────┴────────┴─────────┘

Phase N: Monolith is gone
┌────────────────────────────────┐
│          API Gateway           │
├────────┬────────┬──────────────┤
│  User  │Product │    Order     │
│Service │Service │   Service    │
└────────┴────────┴──────────────┘
```

---

## 2. 移行の評価

### 2.1 モノリス解析

```
Trước khi migration, hiểu monolith:

Code Analysis:
├── Module coupling (which modules call which?)
├── Database coupling (shared tables?)
├── Hot spots (most changed code)
├── Complexity (cyclomatic, LOC)
└── Team ownership (ai maintain gì?)

Prioritization Matrix:
┌──────────────────────────────────────┐
│         Business Value               │
│ High │ ★ Extract first │ Rewrite    │
│      │   (Product,     │ later      │
│      │    Order)       │            │
│──────┼─────────────────┼────────────│
│ Low  │ Leave in        │ Consider   │
│      │ monolith        │ removing   │
│      │ (low ROI)       │            │
│      └──── Low ─────── High ────────│
│           Change Frequency           │
└──────────────────────────────────────┘
```

---

## 3. バックエンド移行ハンドブック

### 3.1 フェーズ 1: API ゲートウェイ (第 1 ～ 4 週)

```
1. Deploy API Gateway trước monolith
2. Route ALL traffic qua Gateway
3. Gateway forward mọi thứ đến Monolith
4. Không thay đổi behavior — chỉ thêm routing layer

Frontend → API Gateway → Monolith (no change)
```

### 3.2 フェーズ 2: 最初のサービスの抽出 (第 5 週から第 12 週)

```
Chọn service ít coupling nhất (ví dụ: Product Catalog)

Steps:
1. Create Product Service (new codebase)
2. Copy/rewrite product logic
3. Setup database (copy product tables)
4. Dual-write: monolith write cả old DB + new service
5. Verify data consistency
6. Switch reads: Gateway route GET /products → new service
7. Switch writes: Gateway route POST/PUT /products → new service
8. Remove product code from monolith
9. Drop product tables from monolith DB (after verification)
```

### 3.3 データ移行戦略

```
Dual-Write Pattern:

Phase A: Monolith writes to Old DB + New DB
         Reads from Old DB
         → Verify New DB data matches

Phase B: Monolith writes to Old DB + New DB
         Reads from New DB (switch)
         → Verify reads correct

Phase C: New Service writes to New DB only
         Monolith no longer involved
         → Clean up Old DB tables
```

---

## 4. フロントエンド移行ハンドブック

### 4.1 フェーズ 1: シェル アプリ (第 1 ～ 4 週)

```
1. Create Shell App (new React app)
2. Shell wraps existing monolith frontend (iframe initially)
3. Shell provides Header, Footer, Navigation
4. Gradually replace iframe sections with MFEs
```

### 4.2 フェーズ 2: 最初の MFE の抽出 (第 5 ～ 8 週)

```
Extract Product pages as first MFE:

1. Create product-mfe project
2. Configure Module Federation (expose ProductList, ProductDetail)
3. Shell loads product-mfe via Module Federation
4. Remove product pages from monolith frontend
5. Verify routing, styling, functionality

Shell App
├── Header (Shell)
├── /products/* → Product MFE (new, Module Federation)
├── /cart/* → Monolith Frontend (iframe, temporary)
├── /orders/* → Monolith Frontend (iframe, temporary)
└── Footer (Shell)
```

### 4.3 段階的な置き換え

```
Month 1: Shell + Product MFE
Month 2: + Cart MFE
Month 3: + Order MFE
Month 4: + Account MFE
Month 5: Remove iframe, monolith frontend retired
```

---

## 5. 移行のアンチパターン

```
❌ Big Bang Rewrite
   → 12-18 months later: "it's not ready yet"
   → Business can't wait, original monolith diverges

❌ Extract based on technical layers
   → "API service", "DB service", "Auth service"
   → Should be business domains: Product, Order, User

❌ Shared database between old and new
   → Defeats the purpose of database per service
   → Temporal coupling, schema changes break both

❌ Migration without observability
   → Can't compare old vs new behavior
   → Can't detect regressions
```

---

## 6. 移行タイムライン (標準)

```
E-Commerce Monolith → Microservices + MFE:

Month 1-2:  Infrastructure setup
            (K8s, CI/CD, monitoring, API Gateway)

Month 3-4:  First service extraction
            (Product Service + Product MFE)

Month 5-6:  Second service extraction
            (Order Service + Order MFE)

Month 7-8:  Third + Fourth services
            (Cart, User)

Month 9-10: Supporting services
            (Payment, Notification, Inventory)

Month 11-12: Cleanup monolith
              Remove old code, drop old tables

Ongoing:    Optimize, add services as needed
```

---

## 7. 成功の指標

|メトリクス |前（モノリス） |後（マイクロ*） |
|--------|-------------------|------|
|導入頻度 | 1/週 | 1 チームあたり 5 ～ 10/日 |
|リードタイム | 2週間 | 1～2日 |
| MTTR | 2～4時間 | 15～30分 |
|故障率の変更 | 15% | < 5% |
|チームの自主性 |低 (PR の競合) |高（独立） |
|ビルド時間 | 15分 | 2 ～ 3 分 (サービスごと) |

---

## 概要

- **ストラングラーフィグパターン**: ビッグバン書き換えではなく、段階的に移行します
- **技術層ではなく、ビジネスドメイン別に抽出**
- **二重書き込み**によるデータ移行の安全性
- **最初に API ゲートウェイ** → トラフィックを段階的にルーティングします
- **フロントエンド**: シェル アプリ → MFE を 1 つずつ抽出します
- **スケジュール**: 一般的な電子商取引の場合は 9 ～ 12 か月
- **成功を測定**: 導入頻度、リードタイム、MTTR

---

## 🎉 シリーズの完了おめでとうございます!

あなたは旅全体を終えました:
1. **プラットフォーム**: モノリス → マイクロサービス → マイクロ フロントエンドの進化
2. **バックエンド**: サービス分解、API 設計、非同期通信
3. **データ**: サービスごとのデータベース、サガ、イベント ソーシング
4. **フロントエンド**: マイクロ フロントエンド アーキテクチャ、モジュール フェデレーション、シェル アプリ
5. **統合**: BFF、API ゲートウェイ、GraphQL フェデレーション
6. **品質**: テスト戦略、契約テスト
7. **デプロイメント**: CI/CD、カナリア、GitOps
8. **本番**: 可観測性、パフォーマンス、セキュリティ
9. **実践**: ケーススタディ、移行ガイド

**次へ:** 実際のプロジェクトに適用してください!小規模に開始し、早期に検証し、迅速に繰り返します。
