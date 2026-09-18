---
id: 019d8a22-c323-7a10-b001-a1b2c3d4e523
title: 第 23 課：部署策略 — 金絲雀、藍/綠和漸進式交付
slug: bai-23-deployment-strategies-canary-blue-green-progressive-delivery
description: 滾動更新、藍/綠部署、金絲雀發布、A/B 測試、使用 Argo Rollouts/Flagger 進行漸進式交付、自動金絲雀分析、回滾策略和功能標記。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 23
section_title: 第 7 部分：CI/CD 和部署策略
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: 雲端原生微服務架構
  slug: cloud-native-microservices-architecture
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 23 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 23 課：部署策略 — Canary、</tspan>
      <tspan x="60" dy="42">藍/綠和漸進式交付</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">雲端原生微服務架構</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 7 部分：CI/CD 和部署策略</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 23 課：部署策略 — 金絲雀、藍/綠和漸進式交付](/storage/uploads/2026/03/cn-bai-23-diagram.webp)

## 簡介

將新版本部署到生產環境總是會帶來風險。問題是：**如何部署才能最大程度地降低風險？ **

現代部署策略可讓您逐步推出變更、觀察行為並在出現問題時立即回滾，而不是「部署所有內容並祈禱」。

---

## 1. 滾動更新－Kubernetes 默認

### 1.1 機制

```
Before:  [v1][v1][v1][v1][v1]  (5 pods v1)

Step 1:  [v1][v1][v1][v1][v2]  (+1 v2, 0 downtime)
Step 2:  [v1][v1][v1][v2][v2]  (-1 v1, +1 v2)
Step 3:  [v1][v1][v2][v2][v2]
Step 4:  [v1][v2][v2][v2][v2]
After:   [v2][v2][v2][v2][v2]  (5 pods v2)

Traffic: Luôn có pods phục vụ (v1 hoặc v2)
```

### 1.2 配置

```yaml
spec:
  replicas: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1         # Tối đa 1 pod extra trong quá trình update
      maxUnavailable: 0   # Không có pod nào bị down (0 downtime)
```

### 1.3 限制

- 部署期間，同時存在 **v1 和 v2 服務流量**
- 當 v2 與 v1 相比有重大 API 變更時不適合
- 難以快速回滾（必須等待滾動更新才能逆轉）

---

## 2. 藍/綠部署

### 2.1 機制

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

### 2.2 Kubernetes 實現

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

### 2.3 優點和缺點

**優點**：零停機、極快回滾、上線前測試v2

**缺點**：消耗雙倍資源（Blue和Green都會運作），會話狀態必須是無狀態的（因為交換機會失去會話）

---

## 3. 金絲雀發布

### 3.1 機制

不要切換所有內容，而是先向新版本發送**少量流量**：

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

### 3.2 Istio 流量拆分

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

## 4. Argo 的漸進式交付

Argo Rollouts 透過**自動化分析**自動化金絲雀部署：

### 4.1 推出定義

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

### 4.2 AnalysisTemplate — 自動金絲雀分析

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

### 4.3 手動控制

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

## 5.A/B 測試

基於**使用者屬性**（非隨機%）對路由流量進行A/B測試：

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

## 6. 功能標誌

功能標誌將**部署**和**發布**分開：

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

## 7. 比較策略

|策略|停機時間 |資源成本|回滾速度|風險等級|適合|
|----------|----------|----------------|---------|------------|---------|
|滾動更新 | 0 | 1x |慢速（滾動）|平均 |無狀態服務的預設值 |
|藍/綠| 0 | 2x |快速（<1 分鐘）|低|當需要立即回滾時 |
|金絲雀| 0 | 1x |快|非常低|當您想要驗證真實流量時 |
| A/B 測試 | 0 | 1x |快|低|驗證使用者體驗/業務指標 |
|功能標誌| 0 | 1x |即時（關閉）|非常低|逐步發布，暗黑發布 |

---

## 8. 最佳實踐

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

## 總結

|概念 |目的|
|------------|---------|
|滾動更新 |零停機，預設的 Kubernetes 策略 |
|藍/綠|即時回滾，不混流 |
|金絲雀|驗證小百分比的真實流量 |
| Argo 推出 |自動化漸進式交付與分析 |
|分析模板|根據指標自動通過/失敗金絲雀 |
| A/B 測試 |依照使用者屬性進行路由 |
|功能標誌|分離部署與發布|

**下一篇文章**：身份驗證和授權 - OAuth2、JWT 和 OIDC
