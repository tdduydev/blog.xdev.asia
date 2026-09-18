---
id: 019e4a33-d426-7b20-c001-b1c2d3e4f526
title: 'レッスン 26: フルスタックの可観測性 — ログ、メトリクス、トレース'
slug: bai-26-full-stack-observability-logs-metrics-traces
description: >-
  可観測性の 3 つの柱: ログ、メトリクス、トレース。 Node.js/React の OpenTelemetry セットアップ。分散トレーシング:
  マイクロ フロントエンドから API ゲートウェイを介してマイクロサービスへのリクエストをトレースします。グラファナ スタック:
  ロキ、プロメテウス、テンポ。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 26
section_title: 'パート 9: 可観測性と実稼働の準備状況'
course:
  id: 019e4a33-d400-7b20-c001-b1c2d3e4f5a8
  title: マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで
  slug: thiet-ke-he-thong-microservices-micro-frontend
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#a78bfa">🏗️ 建築 — レッスン 26</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 26: フルスタックの可観測性 — ログ、</tspan>
      <tspan x="60" dy="42">メトリクスとトレース</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">マイクロサービスとマイクロ フロントエンドのシステム設計 — 基本から運用まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 9: 可観測性と実稼働の準備状況</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

## はじめに

分散アーキテクチャでは、デバッグは次のことに相当します。 `console.log` 実現不可能です。リクエストが 5 つのサービスを経由する場合、リクエストがどこに送信されるか、どれくらいの時間がかかるか、どこで失敗するかを知るには**可観測性**が必要です。


![可観測性の 3 つの柱 — ログ、メトリクス、トレース](/storage/uploads/2026/04/mfe-ms-diagram-bai26-observability.webp)

---

## 1. 可観測性の 3 つの柱

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

## 2. 分散トレーシング

### 2.1 エンドツーエンドのリクエストをトレースする

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

### 2.2 OpenTelemetry のセットアップ (Node.js)

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

## 3. メトリクス (プロメテウス)

### 3.1 主要な指標 (RED メソッド)

|メトリクス |何を |アラートいつ |
|----------|----------|----------|
| **料金** | 1 秒あたりのリクエスト |突然の下落 |
| **エラー** |エラー率 (5xx) | > 1% |
| **期間** |レイテンシー (p50、p95、p99) | p99 > 2秒 |

### 3.2 カスタムメトリクス

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

## 4. 構造化ログ (Loki)

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

## 5. グラファナ スタック

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

## 6. フロントエンドの可観測性 (マイクロフロントエンド)

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

## 概要

|柱 |ツール |目的 |
|----------|----------|----------|
| **ログ** |ロキ＋ピノ |何が起こったのか (構造化された JSON) |
| **メトリクス** |プロメテウス |システムの動作方法 (RED メソッド) |
| **痕跡** |テンポ + OTEL |サービス間のリクエスト フロー |
| **フロントエンド** |ウェブバイタル | MFE ごとのコア Web バイタル |
| **ダッシュボード** |グラファナ |統合された視覚化 |

---

**次の記事:** [レッスン 27: パフォーマンスの最適化 — フロントエンドとバックエンド](/series/thiet-ke-he-thong-microservices-micro-frontend/bai-27-performance-optimization-frontend-backend)
