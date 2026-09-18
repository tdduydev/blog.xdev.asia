---
id: 019e4a33-d425-7b20-c001-b1c2d3e4f525
title: 'Lesson 25: Deployment Strategies — Blue/Green, Canary & Rolling'
slug: bai-25-deployment-strategies-blue-green-canary-rolling
description: >-
  Compare deployment strategies: Rolling Update, Blue/Green, Canary, A/B
  Testing. Kubernetes deployment strategies. Argo Rollouts for progressive
  delivery. Feature flags with LaunchDarkly/Unleash. Rollback strategies.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 25
section_title: 'Part 8: CI/CD & Deployment Strategies'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: Microservices & Micro Frontend system design — From basics to Production
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: en
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f87171">🏗️ Architecture — Lesson 25</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 25: Deployment Strategies —</tspan>
      <tspan x="60" dy="42">Blue/Green, Canary & Rolling</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Microservices & Micro Frontend system design — From basics to Production</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 8: CI/CD & Deployment Strategies</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## Introduction

Deploying microservices to production is the riskiest time. Deployment strategy decides **blast radius** when there is a bug — affects 100% of users or only 5%? This article compares strategies and provides guidance on choosing the right one.


![Deployment Strategies — Blue-Green, Canary, Rolling](/storage/uploads/2026/04/mfe-ms-diagram-bai25-deployment-strategies.webp)

---

## 1. Rolling Update

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

**Advantages:** Zero downtime, gradual, K8s native
**Disadvantages:** Mixed versions during rollout, rollback slow
**Use case:** Low-risk changes, stateless services

---

## 2. Blue/Green Deployment

```
Blue (current, live):  ●●●●●  ← traffic
Green (new, staging):  ○○○○○  ← no traffic

Test Green thoroughly, then switch:

Blue:  ●●●●●  ← no traffic (standby)
Green: ○○○○○  ← ALL traffic switched instantly
```

**Advantages:** Instant rollback (switch back to blue), full testing before live
**Disadvantages:** 2x resources needed, database migration must be backward compatible
**Use case:** Critical services, when instant rollback is needed

---

## 3. Canary Deployment ⭐

```
Step 1: ●●●●● (100% v1)
Step 2: ●●●●○ (90% v1, 10% v2) ← canary
Step 3: Monitor metrics (error rate, latency, CPU)
Step 4a: Metrics OK → ●●●○○ → ●●○○○ → ○○○○○ (promote)
Step 4b: Metrics BAD → ●●●●● (rollback, remove canary)
```

**Advantages:** Smallest blast radius, data-driven promotion
**Disadvantages:** Complex setup, needs good monitoring
**Use case:** Most production deployments — **recommended default**

---

## 4. Argo Rollouts (Progressive Delivery)

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

## 5. Feature Flags

Deploy code to production **without enabling** for users:

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

### Feature Flags + Canary

```
1. Deploy v2 with feature flag OFF → 100% users get old behavior
2. Enable flag for 5% users → monitor
3. Gradually increase → 20% → 50% → 100%
4. Remove flag from code after full rollout
```

---

## 6. Decision Matrix

| Strategy | Risk | Speed ​​| Cost | Rollback | Best For |
|----------|-------|-------|-------|----------|----------|
| **Rolling** | Medium | Slow | Low | Slow | Low-risk changes |
| **Blue/Green** | Low | Fast | High (2x) | Instant | Critical services |
| **Canary** | Very Low | Medium | Low | Fast | Default choice |
| **Feature Flags** | Very Low | Instant | Low | Instant | UX changes |

### Recommended

```
E-Commerce Platform:
├── Backend services: Canary (Argo Rollouts) + Auto analysis
├── Micro Frontends: Canary via CDN traffic splitting 
├── Database changes: Blue/Green (backward compatible)
└── UI features: Feature flags (Unleash)
```

---

## 7. Rollback Strategy

| Components | Rollback Method |
|-----------|----------------|
| K8s Deployment | `kubectl rollout undo` |
| Argo Rollout | Auto-rollback on failed analysis |
| MFE on CDN | Point to previous version |
| Database | Forward migration (never rollback schema) |
| Feature Flag | Disable flag instantly |

---

## Summary

- **Rolling Update**: K8s default, simple, good for low-risk
- **Blue/Green**: instant rollback, 2x cost
- **Canary**: smallest blast radius — **recommended default**
- **Argo Rollouts**: automated progressive delivery with analysis
- **Feature Flags**: deploy ≠ release, instant enable/disable

---

**Next article:** [Lesson 26: Full-Stack Observability — Logs, Metrics & Traces](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-26-full-stack-observability-logs-metrics-traces)
