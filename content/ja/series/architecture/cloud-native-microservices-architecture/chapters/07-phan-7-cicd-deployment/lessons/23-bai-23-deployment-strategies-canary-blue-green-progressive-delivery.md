---
id: 019d8a22-c323-7a10-b001-a1b2c3d4e523
title: 'レッスン 23: 導入戦略 — カナリア、ブルー/グリーン、プログレッシブ配信'
slug: bai-23-deployment-strategies-canary-blue-green-progressive-delivery
description: >-
  ローリング アップデート、ブルー/グリーン デプロイメント、カナリア リリース、A/B テスト、Argo
  ロールアウト/フラッガーによるプログレッシブ配信、自動カナリア分析、ロールバック戦略、機能フラグ。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 23
section_title: 'パート 7: CI/CD および導入戦略'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-4779" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-4779)"/>

  <!-- Decorations -->
  <g>
    <circle cx="879" cy="127" r="32" fill="#818cf8" opacity="0.12000000000000001"/>
    <circle cx="658" cy="246" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="937" cy="105" r="26" fill="#818cf8" opacity="0.060000000000000005"/>
    <circle cx="716" cy="224" r="23" fill="#818cf8" opacity="0.13"/>
    <circle cx="995" cy="83" r="20" fill="#818cf8" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <line x1="600" y1="117" x2="1100" y2="197" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="147" x2="1050" y2="217" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1044.712812921102,201 1044.712812921102,233 1017,249 989.287187078898,233 989.287187078898,201 1017,185" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 23</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 23: 導入戦略 — カナリア、</tspan>
      <tspan x="60" dy="42">ブルー/グリーンおよびプログレッシブ配信</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 7: CI/CD および導入戦略</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 23: 導入戦略 — カナリア、ブルー/グリーン、プログレッシブ配信](/storage/uploads/2026/03/cn-bai-23-diagram.webp)

## はじめに

新しいバージョンを運用環境にデプロイするには、常にリスクが伴います。問題は、**リスクを最小限に抑えるためにどのように導入すればよいですか?** です。

最新のデプロイ戦略では、「すべてをデプロイして祈る」のではなく、変更を徐々にロールアウトし、動作を観察し、問題があればすぐにロールバックできます。

---

## 1. ローリング アップデート — Kubernetes のデフォルト

### 1.1 メカニズム

```
Before:  [v1][v1][v1][v1][v1]  (5 pods v1)

Step 1:  [v1][v1][v1][v1][v2]  (+1 v2, 0 downtime)
Step 2:  [v1][v1][v1][v2][v2]  (-1 v1, +1 v2)
Step 3:  [v1][v1][v2][v2][v2]
Step 4:  [v1][v2][v2][v2][v2]
After:   [v2][v2][v2][v2][v2]  (5 pods v2)

Traffic: Luôn có pods phục vụ (v1 hoặc v2)
```

### 1.2 構成

```yaml
spec:
  replicas: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1         # Tối đa 1 pod extra trong quá trình update
      maxUnavailable: 0   # Không có pod nào bị down (0 downtime)
```

### 1.3 制限事項

- 導入中、**v1 と v2 の両方のトラフィックが発生します**
- v2 に v1 と比較して重大な API 変更がある場合には適していません
- すぐにロールバックするのが難しい (ローリング更新が元に戻るまで待つ必要がある)

---

## 2. ブルー/グリーン展開

### 2.1 メカニズム

```
Blue environment (v1 — currently live):
  [v1][v1][v1][v1][v1]
        ↑
    Traffic (100%)

Chuẩn bị Green environment (v2 — idle):
  [v2][v2][v2][v2][v2]
        ↑
    Traffic (0%) — chỉ internal testing

Switch traffic (atomic):
  Blue  [v1][v1][v1][v1][v1] ← Traffic (0%)
  Green [v2][v2][v2][v2][v2] ← Traffic (100%)

Nếu v2 OK: Hủy Blue environment
Nếu v2 lỗi: Switch lại Blue (< 1 phút)
```

### 2.2 Kubernetes の実装

```yaml
# Blue Service (v1)
apiVersion: v1
kind: Service
metadata:
  name: order-service
spec:
  selector:
    app: order-service
    version: blue         # ← Chỉ route vào Blue pods
  ports:
    - port: 8080

---
# Blue Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service-blue
spec:
  replicas: 5
  selector:
    matchLabels:
      app: order-service
      version: blue
  template:
    metadata:
      labels:
        app: order-service
        version: blue
    spec:
      containers:
        - name: app
          image: order-service:v1

---
# Green Deployment (running idle, being tested)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service-green
spec:
  replicas: 5
  selector:
    matchLabels:
      app: order-service
      version: green
  template:
    metadata:
      labels:
        app: order-service
        version: green
    spec:
      containers:
        - name: app
          image: order-service:v2
```

```bash
# Switch traffic sang Green (atomic patch)
kubectl patch service order-service -p '{"spec":{"selector":{"version":"green"}}}'

# Rollback — switch lại Blue (< 5 giây)
kubectl patch service order-service -p '{"spec":{"selector":{"version":"blue"}}}'
```

### 2.3 メリットとデメリット

**利点**: ダウンタイムゼロ、非常に高速なロールバック、本番稼働前に v2 をテスト

**欠点**: リソースを 2 倍消費し (ブルーとグリーンの両方を実行)、セッション状態はステートレスである必要があります (スイッチがセッションを失うため)。

---

## 3. カナリアリリース

### 3.1 メカニズム

すべてを切り替えるのではなく、最初に**少量のトラフィック**を新しいバージョンに送信します。

```
  v1 pods (90% traffic):  [v1][v1][v1][v1][v1]
  v2 pods (10% traffic):  [v2]

  Sau 30 phút, không có vấn đề → tăng:
  v1 pods (75% traffic):  [v1][v1][v1]
  v2 pods (25% traffic):  [v2][v2]

  Sau 1 giờ → tăng:
  v1 pods (50%) / v2 pods (50%)

  Sau 2 giờ → v2 = 100%
```

### 3.2 Istio トラフィック分割

```yaml
# VirtualService — định nghĩa traffic split
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: order-service
spec:
  hosts:
    - order-service
  http:
    - route:
        - destination:
            host: order-service
            subset: v1
          weight: 90       # 90% traffic → v1
        - destination:
            host: order-service
            subset: v2
          weight: 10       # 10% traffic → v2

---
# DestinationRule — định nghĩa subsets
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: order-service
spec:
  host: order-service
  subsets:
    - name: v1
      labels:
        version: v1
    - name: v2
      labels:
        version: v2
```

---

## 4. Argo ロールアウトによるプログレッシブ配信

Argo Rollouts は **自動分析** によりカナリアのデプロイを自動化します。

### 4.1 ロールアウトの定義

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: order-service
spec:
  replicas: 10
  selector:
    matchLabels:
      app: order-service

  template:
    metadata:
      labels:
        app: order-service
    spec:
      containers:
        - name: order-service
          image: order-service:v2  # ← CI update này

  strategy:
    canary:
      # Các bước canary tự động
      steps:
        - setWeight: 10   # Bước 1: 10% traffic
        - pause: {duration: 10m}   # Chờ 10 phút
        - analysis:
            templates:
              - templateName: success-rate
        - setWeight: 25   # Bước 2: 25% nếu analysis pass
        - pause: {duration: 10m}
        - setWeight: 50   # Bước 3: 50%
        - pause: {duration: 10m}
        - setWeight: 100  # Bước 4: 100%

      # Service Mesh integration
      trafficRouting:
        istio:
          virtualService:
            name: order-service

      # Nếu analysis fail → tự động rollback
      autoPromotionEnabled: false  # Require explicit promotion
```

### 4.2 AnalysisTemplate — 自動カナリア分析

```yaml
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: success-rate
spec:
  args:
    - name: service-name
  metrics:
    # Metric 1: Error rate phải < 5%
    - name: success-rate
      interval: 1m
      count: 5          # Đo 5 lần
      successCondition: result[0] >= 0.95
      failureLimit: 2   # Cho phép fail ≤ 2 lần
      provider:
        prometheus:
          address: http://prometheus.monitoring:9090
          query: |
            sum(rate(http_requests_total{
              service="{{args.service-name}}",
              status!~"5.."
            }[5m]))
            /
            sum(rate(http_requests_total{
              service="{{args.service-name}}"
            }[5m]))

    # Metric 2: p99 latency phải < 500ms
    - name: latency-p99
      interval: 1m
      count: 5
      successCondition: result[0] < 0.5
      failureLimit: 2
      provider:
        prometheus:
          address: http://prometheus.monitoring:9090
          query: |
            histogram_quantile(0.99,
              sum(rate(http_request_duration_seconds_bucket{
                service="{{args.service-name}}"
              }[5m])) by (le)
            )

    # Metric 3: Compare canary vs baseline (kayenta style)
    - name: error-rate-canary-vs-stable
      interval: 2m
      count: 3
      successCondition: result[0] <= 1.5  # Canary không tệ hơn stable 1.5x
      provider:
        prometheus:
          query: |
            (
              sum(rate(http_requests_total{service="order-service",version="canary",status=~"5.."}[5m]))
              /
              sum(rate(http_requests_total{service="order-service",version="canary"}[5m]))
            ) / (
              sum(rate(http_requests_total{service="order-service",version="stable",status=~"5.."}[5m]))
              /
              sum(rate(http_requests_total{service="order-service",version="stable"}[5m]))
            )
```

### 4.3 手動制御

```bash
# CLI để interact với rollout
kubectl argo rollouts get rollout order-service --watch

# Promote manually (nếu autoPromotionEnabled: false)
kubectl argo rollouts promote order-service

# Abort và rollback
kubectl argo rollouts abort order-service

# Undo về stable
kubectl argo rollouts undo order-service
```

---

## 5. A/B テスト

**ユーザー属性**に基づくルート トラフィックの A/B テスト (ランダムな % ではありません):

```yaml
# Istio VirtualService với header-based routing
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: order-service
spec:
  http:
    # Route users với header X-Beta-User: true → v2
    - match:
        - headers:
            x-beta-user:
              exact: "true"
      route:
        - destination:
            host: order-service
            subset: v2

    # Route users ở EU → v2 (geographic test)
    - match:
        - headers:
            x-user-region:
              exact: "EU"
      route:
        - destination:
            host: order-service
            subset: v2

    # Tất cả còn lại → v1
    - route:
        - destination:
            host: order-service
            subset: v1
```

---

## 6. 機能フラグ

機能フラグは **デプロイ** と **リリース** を分けます。

```
Deploy: Upload code lên server (mọi user không thấy)
Release: Bật feature cho users chọn lọc (flag = on)

Cho phép:
- Dark launch: deploy trước, release sau
- Ring deployment: internal → beta users → 10% → 100%
- Hotfix without redeploy: tắt feature ngay bằng flag
```

```java
// OpenFeature + FlagD
@Autowired
Client featureClient;

public Order createOrder(CreateOrderRequest request) {
    // Check feature flag
    boolean useNewCheckout = featureClient.getBooleanValue(
        "new-checkout-flow",
        false,  // default
        EvaluationContext.builder()
            .targetingKey(request.getCustomerId())
            .add("plan", request.getCustomer().getPlan())
            .build()
    );

    if (useNewCheckout) {
        return newCheckoutService.process(request);
    } else {
        return legacyCheckoutService.process(request);
    }
}
```

```yaml
# FlagD manifest (feature flag definitions)
flags:
  new-checkout-flow:
    state: ENABLED
    variants:
      "on": true
      "off": false
    defaultVariant: "off"
    targeting:
      # 20% users ngẫu nhiên
      fractional:
        - ["on", 20]
        - ["off", 80]
```

---

## 7. 戦略を比較する

|戦略 |ダウンタイム |リソースコスト |ロールバック速度|リスクレベル |適切 |
|----------|----------|------|----------|-----------|---------|
|ローリングアップデート | 0 | 1x |遅い（ローリング） |平均 |ステートレス サービスのデフォルト |
|ブルー/グリーン | 0 | 2倍 |高速 (<1 分) |低い |すぐにロールバックする必要がある場合 |
|カナリア | 0 | 1x |速い |非常に低い |実際のトラフィックで検証したい場合 |
| A/B テスト | 0 | 1x |速い |低い | UX/ビジネス指標を検証する |
|機能フラグ | 0 | 1x |インスタント (フラグオフ) |非常に低い |段階的リリース、ダークローンチ |

---

## 8. ベストプラクティス

```
1. Luôn có readiness probe trước khi traffic vào
2. Graceful shutdown — drain in-flight requests trước khi pod down
3. Không deploy vào peak hours
4. Automated rollback khi error rate tăng
5. Canary trước production cho mọi breaking change
6. Feature flags cho long-running features
7. Post-deployment monitoring 30 phút
8. Runbook sẵn sàng trước mỗi deploy
```

---

## 概要

|コンセプト |目的 |
|----------|----------|
|ローリングアップデート |ダウンタイムゼロ、デフォルトの Kubernetes 戦略 |
|ブルー/グリーン |即時ロールバック、トラフィックの混合なし |
|カナリア |少数の実際のトラフィックで検証 |
| Argo のロールアウト |分析による自動化されたプログレッシブ配信 |
|分析テンプレート |メトリクスに基づいて Canary を自動的に合格/不合格にする |
| A/B テスト |ユーザー属性に応じたルーティング |
|機能フラグ |デプロイとリリースを個別に行う |

**次の記事**: 認証と認可 — OAuth2、JWT、OIDC
