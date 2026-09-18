---
id: 019e4a33-d425-7b20-c001-b1c2d3e4f525
title: 第 25 課：部署策略 — 藍/綠、金絲雀與滾動
slug: bai-25-deployment-strategies-blue-green-canary-rolling
description: >-
  比較部署策略：滾動更新、藍/綠、金絲雀、A/B 測試。 Kubernetes 部署策略。 Argo Rollouts 用於漸進式交付。帶有
  LaunchDarkly/Unleash 的功能標誌。回滾策略。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 25
section_title: 第 8 部分：CI/CD 和部署策略
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: 微服務與微前端系統設計－從基礎到生產
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ 建築 — 第 25 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 25 課：部署策略 —</tspan>
      <tspan x="60" dy="42">藍/綠、金絲雀和滾動</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">微服務與微前端系統設計－從基礎到生產</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 8 部分：CI/CD 和部署策略</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

將微服務部署到生產中是風險最大的時候。部署策略決定出現錯誤時的**影響範圍** — 影響 100% 的使用者還是僅影響 5%？本文比較了策略並提供了選擇正確策略的指導。


![Deployment Strategies — Blue-Green, Canary, Rolling](/storage/uploads/2026/04/mfe-ms-diagram-bai25-deployment-strategies.webp)

---

## 1. 滾動更新

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

**優點：** 零停機、漸進、K8s原生
**缺點：** 上線時版本混雜，回滾速度慢
**用例：** 低風險變更、無狀態服務

---

## 2. 藍/綠部署

```
Blue (current, live):  ●●●●●  ← traffic
Green (new, staging):  ○○○○○  ← no traffic

Test Green thoroughly, then switch:

Blue:  ●●●●●  ← no traffic (standby)
Green: ○○○○○  ← ALL traffic switched instantly
```

**優點：**即時回滾（切換回藍色），上線前全面測試
**缺點：**需要2x資源，資料庫遷移必須向後相容
**用例：** 關鍵服務，需要即時回滾時

---

## 3. 金絲雀部署 ⭐

```
Step 1: ●●●●● (100% v1)
Step 2: ●●●●○ (90% v1, 10% v2) ← canary
Step 3: Monitor metrics (error rate, latency, CPU)
Step 4a: Metrics OK → ●●●○○ → ●●○○○ → ○○○○○ (promote)
Step 4b: Metrics BAD → ●●●●● (rollback, remove canary)
```

**優點：**最小爆炸半徑，數據驅動推廣
**缺點：** 設定複雜，需要良好的監控
**用例：** 大多數生產部署 - **建議的預設值**

---

## 4. Argo 推出（漸進式交付）

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

## 5. 功能標誌

將程式碼部署到生產**而不為使用者啟用**：

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

### 功能標誌 + 金絲雀

```
1. Deploy v2 with feature flag OFF → 100% users get old behavior
2. Enable flag for 5% users → monitor
3. Gradually increase → 20% → 50% → 100%
4. Remove flag from code after full rollout
```

---

## 6. 決策矩陣

|戰略|風險|速度|成本|回滾 |最適合 |
|----------|-----|--------|--------|----------|----------|
| **滾動** |中|慢|低|慢|低風險變更 |
| **藍色/綠色** |低|快|高 (2x) |即時 |關鍵服務|
| **金絲雀** |極低|中|低|快|預設選擇|
| **功能標誌** |極低 |即時 |低|即時 |使用者體驗變更 |

### 推薦

```
E-Commerce Platform:
├── Backend services: Canary (Argo Rollouts) + Auto analysis
├── Micro Frontends: Canary via CDN traffic splitting 
├── Database changes: Blue/Green (backward compatible)
└── UI features: Feature flags (Unleash)
```

---

## 7.回滾策略

|組件|回滾方法|
|----------|----------------|
| K8s 部署 | `kubectl rollout undo` |
| Argo 推出 |分析失敗時自動回滾 |
| CDN 上的 MFE |指向先前的版本 |
|資料庫|正向遷移（永不回滾架構）|
|功能標誌|立即停用標誌 |

---

## 總結

- **滾動更新**：K8s默認，簡單，適合低風險
- **藍/綠**：即時回滾，2倍成本
- **金絲雀**：最小爆炸半徑 — **建議預設值**
- **Argo 推出**：自動漸進式交付與分析
- **功能標誌**：部署≠發布，即時啟用/停用

---

**下一篇文章：** [第 26 課：全端可觀察性 — 日誌、指標與追蹤](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-26-full-stack-observability-logs-metrics-traces)
