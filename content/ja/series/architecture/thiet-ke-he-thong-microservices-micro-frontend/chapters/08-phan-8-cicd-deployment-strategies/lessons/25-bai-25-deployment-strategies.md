---
id: 019e4a33-d425-7b20-c001-b1c2d3e4f525
title: 'レッスン 25: 導入戦略 — ブルー/グリーン、カナリア、ローリング'
slug: bai-25-deployment-strategies-blue-green-canary-rolling
description: >-
  導入戦略を比較します: ローリング アップデート、ブルー/グリーン、カナリア、A/B テスト。 Kubernetes の導入戦略。段階的な配信のための
  Argo ロールアウト。 LaunchDarkly/Unleash の機能フラグ。ロールバック戦略。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 25
section_title: 'パート 8: CI/CD および導入戦略'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8360" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-8360)"/>

  <!-- Decorations -->
  <g>
    <circle cx="602" cy="76" r="30" fill="#f87171" opacity="0.11"/>
    <circle cx="604" cy="178" r="26" fill="#f87171" opacity="0.07"/>
    <circle cx="606" cy="280" r="22" fill="#f87171" opacity="0.13"/>
    <circle cx="608" cy="122" r="18" fill="#f87171" opacity="0.09"/>
    <circle cx="610" cy="224" r="14" fill="#f87171" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#f87171" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#f87171" opacity="0.15"/>
    <line x1="600" y1="96" x2="1100" y2="176" stroke="#f87171" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="126" x2="1050" y2="196" stroke="#f87171" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1072.8467875173176,230.5 1072.8467875173176,261.5 1046,277 1019.1532124826824,261.5 1019.1532124826824,230.5 1046,215" fill="none" stroke="#f87171" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f87171"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#f87171" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ 建築 — レッスン 25</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 25: 導入戦略 —</tspan>
      <tspan x="60" dy="42">ブルー/グリーン、カナリア＆ローリング</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 8: CI/CD および導入戦略</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

マイクロサービスを本番環境にデプロイするのは最もリスクが高い時期です。バグが発生した場合の**爆発範囲**は展開戦略によって決まります。影響を受けるのはユーザーの 100% ですか、それとも 5% だけですか?この記事では、戦略を比較し、適切な戦略を選択するためのガイダンスを提供します。


![Deployment Strategies — Blue-Green, Canary, Rolling](/storage/uploads/2026/04/mfe-ms-diagram-bai25-deployment-strategies.webp)

---

## 1. ローリングアップデート

```
Kubernetes mặc định:

Pod v1 ●●●●●  (5 replicas)

Deploy v2:
Step 1: ●●●●● + ○     (1 new pod v2 starting)
Step 2: ●●●● + ○○      (2 v2 ready, 1 v1 terminated)
Step 3: ●●● + ○○○      (3 v2 ready)
Step 4: ●● + ○○○○
Step 5: ○○○○○           (all v2)

● = v1, ○ = v2
```

**利点:** ダウンタイムゼロ、段階的、K8s ネイティブ
**欠点:** ロールアウト中にバージョンが混在し、ロールバックが遅い
**ユースケース:** 低リスクの変更、ステートレスなサービス

---

## 2. ブルー/グリーン展開

```
Blue (current, live):  ●●●●●  ← traffic
Green (new, staging):  ○○○○○  ← no traffic

Test Green thoroughly, then switch:

Blue:  ●●●●●  ← no traffic (standby)
Green: ○○○○○  ← ALL traffic switched instantly
```

**利点:** 即時ロールバック (青色に戻る)、本番前の完全なテスト
**欠点:** 2 倍のリソースが必要、データベースの移行には下位互換性が必要
**使用例:** 即時ロールバックが必要な場合の重要なサービス

---

## 3. カナリア展開 ⭐

```
Step 1: ●●●●● (100% v1)
Step 2: ●●●●○ (90% v1, 10% v2) ← canary
Step 3: Monitor metrics (error rate, latency, CPU)
Step 4a: Metrics OK → ●●●○○ → ●●○○○ → ○○○○○ (promote)
Step 4b: Metrics BAD → ●●●●● (rollback, remove canary)
```

**利点:** 最小の爆発範囲、データ主導型プロモーション
**欠点:** セットアップが複雑で、適切なモニタリングが必要
**使用例:** ほとんどの実稼働環境 - **推奨されるデフォルト**

---

## 4. Argo のロールアウト (プログレッシブ配信)

```yaml
# rollout.yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: product-service
spec:
  replicas: 5
  strategy:
    canary:
      canaryService: product-service-canary
      stableService: product-service-stable
      steps:
        - setWeight: 5
        - pause: { duration: 5m }
        - setWeight: 20
        - pause: { duration: 10m }
        - setWeight: 50
        - pause: { duration: 15m }
        - setWeight: 100
      analysis:
        templates:
          - templateName: success-rate
        startingStep: 2
        args:
          - name: service-name
            value: product-service

---
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: success-rate
spec:
  metrics:
    - name: success-rate
      interval: 1m
      successCondition: result[0] >= 0.99
      provider:
        prometheus:
          address: http://prometheus:9090
          query: |
            sum(rate(http_requests_total{service="{{args.service-name}}",code=~"2.."}[5m]))
            /
            sum(rate(http_requests_total{service="{{args.service-name}}"}[5m]))
```

---

## 5. 機能フラグ

ユーザーに対して **有効化せず**にコードを実稼働環境にデプロイします。

```javascript
// Feature flag check
const unleash = require('unleash-client');

app.get('/api/products', (req, res) => {
  const products = getProducts();
  
  if (unleash.isEnabled('new-recommendation-engine', {
    userId: req.user.id
  })) {
    // New feature, enabled for specific users
    products.forEach(p => {
      p.recommendations = newEngine.getRecommendations(p.id);
    });
  }
  
  res.json(products);
});
```

### 機能フラグ + カナリア

```
1. Deploy v2 with feature flag OFF → 100% users get old behavior
2. Enable flag for 5% users → monitor
3. Gradually increase → 20% → 50% → 100%
4. Remove flag from code after full rollout
```

---

## 6. 意思決定マトリックス

|戦略 |リスク |スピード |コスト |ロールバック |最適な用途 |
|----------|----------|----------|----------|----------|----------|
| **ローリング** |中 |遅い |低い |遅い |低リスクの変更 |
| **ブルー/グリーン** |低い |速い |高 (2x) |インスタント |重要なサービス |
| **カナリア** |非常に低い |中 |低い |速い |デフォルトの選択肢 |
| **機能フラグ** |非常に低い |インスタント |低い |インスタント | UX の変更 |

### 推奨

```
E-Commerce Platform:
├── Backend services: Canary (Argo Rollouts) + Auto analysis
├── Micro Frontends: Canary via CDN traffic splitting 
├── Database changes: Blue/Green (backward compatible)
└── UI features: Feature flags (Unleash)
```

---

## 7. ロールバック戦略

|コンポーネント |ロールバック方法 |
|----------|----------------|
| K8s の展開 | `kubectl rollout undo` |
|アルゴのロールアウト |失敗した分析時の自動ロールバック |
| CDN の MFE |前のバージョンを指す |
|データベース |順方向移行 (スキーマをロールバックしない) |
|機能フラグ |フラグを即座に無効にする |

---

## 概要

- **ローリング アップデート**: K8 のデフォルト、シンプル、低リスクに適しています
- **青/緑**: 即時ロールバック、コスト 2 倍
- **カナリア**: 最小爆発半径 — **推奨デフォルト**
- **Argo Rollouts**: 分析による自動化されたプログレッシブ配信
- **機能フラグ**: デプロイ ≠ リリース、インスタント有効化/無効化

---

**次の記事:** [レッスン 26: フルスタックの可観測性 — ログ、メトリクス、トレース](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-26-full-stack-observability-logs-metrics-traces)
