---
id: 019e4a33-d426-7b20-c001-b1c2d3e4f526
title: 第 26 課：全端可觀察性 — 日誌、指標與追蹤
slug: bai-26-full-stack-observability-logs-metrics-traces
description: >-
  可觀察性的 3 個支柱：日誌、指標、追蹤。 Node.js/React 的 OpenTelemetry 設定。分散式追蹤：從微前端透過 API
  閘道到微服務的追蹤請求。 Grafana 堆疊：Loki、Prometheus、Tempo。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 26
section_title: 第 9 部分：可觀察性與生產準備情況
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: 微服務與微前端系統設計－從基礎到生產
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-3493" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-3493)"/>

  <!-- Decorations -->
  <g>
    <circle cx="707" cy="91" r="10" fill="#a78bfa" opacity="0.060000000000000005"/>
    <circle cx="814" cy="198" r="11" fill="#a78bfa" opacity="0.07"/>
    <circle cx="921" cy="45" r="12" fill="#a78bfa" opacity="0.08"/>
    <circle cx="1028" cy="152" r="13" fill="#a78bfa" opacity="0.09"/>
    <circle cx="635" cy="259" r="14" fill="#a78bfa" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#a78bfa" opacity="0.15"/>
    <line x1="600" y1="61" x2="1100" y2="141" stroke="#a78bfa" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="91" x2="1050" y2="161" stroke="#a78bfa" stroke-width="0.5" opacity="0.08"/>
    <polygon points="992.1769145362398,143 992.1769145362398,179 961,197 929.8230854637602,179 929.8230854637602,143 961,125" fill="none" stroke="#a78bfa" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#a78bfa"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#a78bfa" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🏗️ 建築 — 第 26 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 26 課：全端可觀察性 — 日誌、</tspan>
      <tspan x="60" dy="42">指標和蹤跡</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">微服務與微前端系統設計－從基礎到生產</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 9 部分：可觀察性與生產準備情況</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 簡介

在分散式架構中，偵錯等於 `console.log` 不可行。当一个请求经过5个服务时，你需要**可观察性**来知道请求去了哪里，花了多长时间，以及哪里失败了。


![可觀察性的 3 個支柱——日誌、指標、跟踪](/storage/uploads/2026/04/mfe-ms-diagram-bai26-observability.webp)

---

## 1. 可觀察性的三大支柱

```
┌─────────────────────────────────────────────┐
│              Observability                  │
├──────────────┬──────────────┬───────────────┤
│    Logs      │   Metrics    │   Traces      │
│              │              │               │
│ What happened│ How system   │ Request flow  │
│ (events)     │ performs     │ across svcs   │
│              │ (numbers)    │ (journey)     │
│              │              │               │
│ Loki/ELK     │ Prometheus   │ Tempo/Jaeger  │
└──────────────┴──────────────┴───────────────┘
```

---

## 2. 分散式追蹤

### 2.1 追蹤端對端請求

```
User clicks "Place Order" trên frontend:

Trace ID: abc-123-def
├── Span 1: Shell App → POST /api/orders (200ms)
│   ├── Span 2: API Gateway → route to Order Service (5ms)
│   │   ├── Span 3: Order Service → validate (10ms)
│   │   ├── Span 4: Order Service → call Product Service (50ms)
│   │   │   └── Span 5: Product Service → DB query (15ms)
│   │   ├── Span 6: Order Service → call Payment Service (100ms)
│   │   │   └── Span 7: Payment Service → Stripe API (80ms)
│   │   └── Span 8: Order Service → publish OrderPlaced event (5ms)
│   └── Span 9: API Gateway → response (5ms)
└── Total: 200ms

→ Bottleneck: Payment Service → Stripe API (80ms) = 40% total
```

### 2.2 OpenTelemetry 設定 (Node.js)

```javascript
// tracing.js - Setup OpenTelemetry
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'http://otel-collector:4318/v1/traces',
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-http': { enabled: true },
      '@opentelemetry/instrumentation-express': { enabled: true },
      '@opentelemetry/instrumentation-pg': { enabled: true },
    }),
  ],
  serviceName: 'product-service',
});

sdk.start();
```

---

## 3. 指標（普羅米修斯）

### 3.1 關鍵指標（RED 方法）

|指標|什麼 |警報時間 |
|--------|--------|------------|
| **速率** |每秒請求數 |突然下降|
| **錯誤** |錯誤率 (5xx) | > 1% |
| **持续时间** |延迟（p50、p95、p99）| p99 > 2 秒 |

### 3.2 自訂指標

```javascript
const { meter } = require('@opentelemetry/api');

const orderCounter = meter.createCounter('orders_created_total', {
  description: 'Total orders created',
});

const orderDuration = meter.createHistogram('order_processing_duration_ms', {
  description: 'Order processing time',
});

// Usage
orderCounter.add(1, { status: 'success', payment_method: 'stripe' });
orderDuration.record(duration, { service: 'order-service' });
```

---

## 4. 結構化日誌記錄 (Loki)

```javascript
// Structured JSON logs
const logger = require('pino')({
  level: 'info',
});

app.use((req, res, next) => {
  const traceId = req.headers['x-trace-id'] || generateTraceId();
  req.log = logger.child({
    traceId,
    service: 'product-service',
    requestId: req.id,
  });
  next();
});

// Usage
req.log.info({ productId: '123', action: 'getProduct' }, 'Product fetched');
req.log.error({ error: err.message, stack: err.stack }, 'Product not found');
```

---

## 5.Grafana 堆疊

```
┌──────────────────────────────────────────┐
│              Grafana UI                  │
│  Dashboards │ Alerts │ Explore │ Traces  │
├──────────┬──────────┬────────────────────┤
│  Loki    │Prometheus│     Tempo          │
│  (Logs)  │(Metrics) │    (Traces)        │
├──────────┴──────────┴────────────────────┤
│         OpenTelemetry Collector          │
│  Receives → Processes → Exports          │
├──────────────────────────────────────────┤
│         Applications                     │
│  Microservices → OTLP → Collector        │
│  MFE → Web Vitals → Collector            │
└──────────────────────────────────────────┘
```

---

## 6.前端可觀察性（微前端）

```javascript
// Web Vitals tracking
import { onLCP, onFID, onCLS } from 'web-vitals';

onLCP((metric) => {
  sendToCollector('web_vitals_lcp', metric.value, {
    mfe: 'product-mfe',
    page: window.location.pathname,
  });
});

// Error tracking
window.addEventListener('error', (event) => {
  sendToCollector('frontend_error', {
    message: event.message,
    stack: event.error?.stack,
    mfe: detectMFE(event.filename),
  });
});
```

---

## 總結

|支柱|工具|目的|
|--------|--------|--------|
| **日志** |洛基+皮诺|发生了什么（结构化 JSON）|
| **指标** |普罗米修斯|系统如何执行（RED 方法）|
| **痕迹** |节奏+OTEL |跨服务的请求流 |
| **前端** |网络生命力 |每个 MFE 的核心 Web Vitals |
| **儀表板** |格拉法納 |統一視覺化 |

---

**下一篇文章：** [第 27 課：效能最佳化－前端和後端](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-27-performance-optimization-frontend-backend)
