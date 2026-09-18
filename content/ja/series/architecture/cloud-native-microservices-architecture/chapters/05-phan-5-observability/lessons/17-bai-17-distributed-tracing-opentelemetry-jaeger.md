---
id: 019d8a22-c317-7a10-b001-a1b2c3d4e517
title: 'レッスン 17: 分散トレーシング — OpenTelemetry と Yeter'
slug: bai-17-distributed-tracing-opentelemetry-jaeger
description: >-
  分散トレーシングの概念 (トレース、スパン、コンテキスト伝播)、OpenTelemetry SDK インストルメンテーション、OTLP
  プロトコル、OpenTelemetry Collector 構成、Jaeger/Tempo バックエンド、トレース分析、およびパフォーマンス デバッグ。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 17
section_title: 'パート 5: 可観測性 — 3 つの柱'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-1512" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-1512)"/>

  <!-- Decorations -->
  <g>
    <circle cx="895" cy="195" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="690" cy="250" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="985" cy="45" r="8" fill="#fb923c" opacity="0.1"/>
    <circle cx="780" cy="100" r="23" fill="#fb923c" opacity="0.05"/>
    <circle cx="1075" cy="155" r="8" fill="#fb923c" opacity="0.1"/>
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
    <line x1="600" y1="85" x2="1100" y2="165" stroke="#fb923c" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="115" x2="1050" y2="185" stroke="#fb923c" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1069.6410161513775,215 1069.6410161513775,255 1035,275 1000.3589838486224,255 1000.3589838486224,215 1035,195" fill="none" stroke="#fb923c" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fb923c"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#fb923c" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ アーキテクチャ — レッスン 17</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 17: 分散トレーシング —</tspan>
      <tspan x="60" dy="42">OpenTelemetry とイェーガー</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 5: 可観測性 — 3 つの柱</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 17: 分散トレーシング — OpenTelemetry と Yeter](/storage/uploads/2026/03/cn-bai-17-diagram.webp)

## はじめに

メトリクスは、「何か」が間違っていることを示します。ログには、各サービスで「何が起こった」かがわかります。 **分散トレース** は、複数のサービスを経由するときにリクエストが遅いか失敗する「理由」を示します。

ユーザーからの 1 つの HTTP リクエストは、10 のサービス、20 のデータベース クエリ、5 つのキャッシュ ルックアップを通過する可能性があり、分散トレースはその過程全体を追跡します。

---

## 1. 基本概念

### 1.1 トレース、スパン、およびコンテキスト

```
Trace ID: abc123def456789  (định danh duy nhất cho toàn bộ request)

┌─ Trace ────────────────────────────────────────────────────────┐
│                                                                │
│  Span: POST /api/orders (API Gateway)          [0ms → 170ms]  │
│  │                                                            │
│  └─ Span: OrderService.createOrder()           [2ms → 165ms]  │
│     │                                                         │
│     ├─ Span: DB INSERT orders                  [5ms → 10ms]   │
│     │                                                         │
│     ├─ Span: gRPC PaymentService.charge()      [12ms → 132ms] │
│     │  │                                                      │
│     │  ├─ Span: Validate card                 [15ms → 30ms]   │
│     │  └─ Span: Process payment               [30ms → 130ms]  │
│     │     └─ Span: DB INSERT transactions     [50ms → 80ms]   │
│     │                                                         │
│     └─ Span: Kafka produce order.created       [133ms → 136ms]│
│                                                                │
└────────────────────────────────────────────────────────────────┘
Total: 170ms
```

**トレース**: リクエストの行程全体を表し、次のように識別されます。 `traceId`。

**スパン**: トレース内の作業単位 (1 つの関数呼び出し、1 つのデータベース クエリ、1 つの HTTP 呼び出し)。はい:
- `spanId`: スパンのID
- `parentSpanId`: 親スパンのID
- `startTime`、 `endTime`
- `status`: OK / エラー
- `attributes`: キーと値のメタデータ
- `events`: タイムスタンプ付きの注釈

**コンテキストの伝播**: 伝播方法 `traceId` そして `spanId` サービス境界経由:
```http
# HTTP Headers (W3C Trace Context standard)
traceparent: 00-abc123def456789-span123-01
             ^^ ^^^^^^^^^^^^^^^^ ^^^^^^^^ ^^
             version traceId     spanId   flags

# Hoặc B3 format (Zipkin/Jaeger legacy)
X-B3-TraceId: abc123def456789
X-B3-SpanId: span456
X-B3-Sampled: 1
```

### 1.2 サンプリング戦略

本番環境ですべてのリクエストをトレース = 大量のストレージと CPU を消費します。サンプリングが必要:

```
Head-based Sampling (quyết định khi request bắt đầu):
├── Always Sample:    100% — chỉ cho dev/staging nhỏ
├── Probabilistic:   1-10% — random sampling
└── Rate Limiting:   100 traces/sec max

Tail-based Sampling (quyết định sau khi request hoàn thành, nhìn đủ dữ liệu):
├── Sample 100% requests có ERROR
├── Sample 100% requests > 1 giây
├── Sample 1% requests bình thường
└── Sample 100% requests với specific user ID
```

**より優れた末尾ベースのサンプリング** — エラーや遅いリクエストを見逃すことがありません。

---

## 2. OpenTelemetry — 標準化された可観測性

### 2.1 なぜ OpenTelemetry を使うのか?

OpenTelemetry が登場する前は、各ベンダーが独自の SDK (Jaeger、Zipkin、DataDog、New Relic、Dynatrace...) を持っていました。ベンダーを変更する = インストルメンテーション コード全体を書き直す。

**OpenTelemetry (OTel)** は、CNCF によって管理されるオープン スタンダードです。

```
Application Code
       │
       │ OpenTelemetry SDK (vendor-neutral)
       ▼
OpenTelemetry Collector
       │
       ├──▶ Jaeger     (self-hosted)
       ├──▶ Grafana Tempo (self-hosted)
       ├──▶ DataDog    (SaaS)
       ├──▶ New Relic  (SaaS)
       └──▶ Honeycomb  (SaaS)

Đổi backend = chỉ thay đổi Collector config, không đụng application code
```

### 2.2 OTel コンポーネント

- **OTel API**: 計測器コードへのインターフェース (トレーサー、メーター、ロガー)
- **OTel SDK**: API の実装、サンプリング処理、エクスポート
- **OTel Collector**: エージェント/ゲートウェイはテレメトリを受信、処理、エクスポートします。
- **OTLP**: OpenTelemetry プロトコル — データ転送プロトコル (gRPC ポート 4317、HTTP ポート 4318)

---

## 3. 計測器

### 3.1 自動インスツルメンテーション

最も簡単な方法 — コードの変更は必要ありません。

```yaml
# Kubernetes — inject OTel auto-instrumentation
apiVersion: opentelemetry.io/v1alpha1
kind: Instrumentation
metadata:
  name: java-instrumentation
spec:
  exporter:
    endpoint: http://otel-collector:4317
  propagators:
    - tracecontext
    - baggage
  sampler:
    type: parentbased_traceidratio
    argument: "0.1"   # 10% sampling
  java:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-java:latest
```

```yaml
# Thêm annotation vào Deployment
metadata:
  annotations:
    instrumentation.opentelemetry.io/inject-java: "true"
```

Node.js を使用する場合:
```yaml
    instrumentation.opentelemetry.io/inject-nodejs: "true"
```

### 3.2 手動インストルメンテーション (Java)

```java
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.api.trace.Span;

@Service
public class OrderService {
    private final Tracer tracer = GlobalOpenTelemetry.getTracer("order-service");

    public Order createOrder(CreateOrderRequest request) {
        // Tạo span cho business operation
        Span span = tracer.spanBuilder("createOrder")
            .setAttribute("customer.id", request.getCustomerId())
            .setAttribute("order.items_count", request.getItems().size())
            .startSpan();

        try (Scope scope = span.makeCurrent()) {
            // Validate
            validateRequest(request);

            // Save to DB — span auto-created bởi JDBC instrumentation
            Order order = orderRepository.save(new Order(request));

            // Call payment service — span auto-created bởi HTTP client instrumentation
            paymentClient.charge(order);

            span.setAttribute("order.id", order.getId());
            span.setStatus(StatusCode.OK);
            return order;

        } catch (Exception e) {
            span.recordException(e);
            span.setStatus(StatusCode.ERROR, e.getMessage());
            throw e;
        } finally {
            span.end();
        }
    }
}
```

### 3.3 手動インストルメンテーション (Node.js/TypeScript)

```typescript
import { trace, context, SpanStatusCode } from '@opentelemetry/api';

const tracer = trace.getTracer('order-service');

async function createOrder(request: CreateOrderRequest): Promise<Order> {
  return tracer.startActiveSpan('createOrder', async (span) => {
    try {
      span.setAttributes({
        'customer.id': request.customerId,
        'order.items_count': request.items.length,
      });

      const order = await db.transaction(async (trx) => {
        const o = await trx('orders').insert(request).returning('*');
        await trx('outbox').insert({
          topic: 'order.created',
          payload: JSON.stringify(o),
        });
        return o;
      });

      span.setAttribute('order.id', order.id);
      span.setStatus({ code: SpanStatusCode.OK });
      return order;

    } catch (error) {
      span.recordException(error as Error);
      span.setStatus({ code: SpanStatusCode.ERROR });
      throw error;
    } finally {
      span.end();
    }
  });
}
```

### 3.4 スパン属性のベスト プラクティス

```python
# Standard semantic conventions (OTel Semantic Conventions)
# https://opentelemetry.io/docs/reference/specification/trace/semantic_conventions/

# HTTP
http.method = "POST"
http.url = "https://api.example.com/orders"
http.status_code = 201
http.request_content_length = 1024

# Database
db.system = "postgresql"
db.name = "orders"
db.operation = "INSERT"
db.statement = "INSERT INTO orders ..."  # Cẩn thận PII!

# Messaging
messaging.system = "kafka"
messaging.destination = "order.created"
messaging.operation = "publish"

# Custom business attributes (namespace your attributes)
order.id = "O-001"
order.total_amount = 500000
customer.tier = "premium"
```

---

## 4. OpenTelemetry コレクター

### 4.1 導入モード

**エージェント モード** (DaemonSet): 各ノードにはコレクタがあり、そのノード上のポッドから受信します。
```
Pod → localhost:4317 → OTel Collector (DaemonSet) → Backend
```

**ゲートウェイ モード** (展開): すべてのエージェントから受信する集中コレクタ:
```
OTel Collector (DaemonSet) → OTel Collector (Gateway) → Multiple Backends
```

運用環境では **両方** を使用します。ポッドの近くにある DaemonSet エージェント、ゲートウェイはファンアウトとテールベースのサンプリングを処理します。

### 4.2 コレクターの構成

```yaml
# otel-collector-config.yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  # Nhận từ Prometheus endpoints
  prometheus:
    config:
      scrape_configs:
        - job_name: 'services'
          kubernetes_sd_configs:
            - role: pod

processors:
  # Batching để giảm số lượng connection
  batch:
    timeout: 5s
    send_batch_size: 1024

  # Enrich với resource attributes
  resource:
    attributes:
      - key: environment
        value: production
        action: insert

  # Tail-based sampling
  tail_sampling:
    decision_wait: 10s   # Chờ 10s để có đủ spans
    num_traces: 50000    # Giữ tối đa 50k traces trong memory
    policies:
      # Luôn sample khi có error
      - name: errors
        type: status_code
        status_code: {status_codes: [ERROR]}
      # Luôn sample khi chậm hơn 1s
      - name: slow_traces
        type: latency
        latency: {threshold_ms: 1000}
      # 5% còn lại
      - name: probabilistic
        type: probabilistic
        probabilistic: {sampling_percentage: 5}

  # Giới hạn memory
  memory_limiter:
    check_interval: 1s
    limit_percentage: 75
    spike_limit_percentage: 15

exporters:
  # Self-hosted Jaeger
  jaeger:
    endpoint: jaeger-collector.monitoring:14250
    tls:
      insecure: true

  # Grafana Tempo
  otlp/tempo:
    endpoint: tempo.monitoring:4317
    tls:
      insecure: true

  # Metrics sang Prometheus
  prometheus:
    endpoint: 0.0.0.0:8889

  # Logs sang Loki
  loki:
    endpoint: http://loki.monitoring:3100/loki/api/v1/push

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter, batch, resource, tail_sampling]
      exporters: [jaeger, otlp/tempo]
    metrics:
      receivers: [otlp, prometheus]
      processors: [memory_limiter, batch, resource]
      exporters: [prometheus]
    logs:
      receivers: [otlp]
      processors: [memory_limiter, batch, resource]
      exporters: [loki]
```

---

## 5. イェーガー — トレースバックエンド

### 5.1 イェーガーアーキテクチャ

```
┌──────────────────────────────────────────────────┐
│                    Jaeger                        │
│                                                  │
│  ┌────────────────┐    ┌────────────────────┐   │
│  │ Jaeger         │    │  Jaeger Query      │   │
│  │ Collector      │    │  (UI + API)        │   │
│  │ port: 14250    │    │  port: 16686       │   │
│  └───────┬────────┘    └────────▲───────────┘   │
│          │                      │               │
│  ┌───────▼──────────────────────┴───────────┐   │
│  │          Storage Backend                 │   │
│  │    Elasticsearch / Cassandra / BadgerDB  │   │
│  └──────────────────────────────────────────┘   │
└──────────────────────────────────────────────────┘
```

### 5.2 Yeger を Kubernetes にデプロイする

```bash
# Sử dụng Jaeger Operator
kubectl create namespace monitoring
kubectl apply -f https://github.com/jaegertracing/jaeger-operator/releases/latest/download/jaeger-operator.yaml -n monitoring
```

```yaml
# Jaeger instance (production với Elasticsearch)
apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: jaeger
  namespace: monitoring
spec:
  strategy: production
  storage:
    type: elasticsearch
    options:
      es:
        server-urls: https://elasticsearch:9200
  query:
    replicas: 2
    serviceType: ClusterIP
  collector:
    replicas: 3
    resources:
      limits:
        memory: 1Gi
        cpu: 500m

---
# AllInOne cho dev/staging (memory storage)
apiVersion: jaegertracing.io/v1
kind: Jaeger
metadata:
  name: jaeger-dev
spec:
  strategy: allInOne
  allInOne:
    image: jaegertracing/all-in-one:latest
```

---

## 6. トレース解析 — 実際のデバッグ

### 6.1 遅いトレースを見つける

イェーガー UI の場合:
- サービス、操作の選択
- フィルター: `min Duration > 500ms`
- 期間 DESC で並べ替えます
- 最長トレースをクリック→スパンウォーターフォールを分析

### 6.2 ウォーターフォールによる根本原因分析

```
Trace: abc123 — Total: 2.3s  ← SLO vi phạm (target: < 500ms)
│
├─ API Gateway (5ms)
└─ OrderService.createOrder (2295ms) ← vấn đề ở đây
   │
   ├─ DB INSERT orders (8ms)         ← OK
   │
   ├─ InventoryService.reserve (2250ms) ← BOTTLENECK
   │  │
   │  └─ DB SELECT inventory (2200ms)  ← Missing index!
   │     tags:
   │       db.statement: SELECT * FROM inventory WHERE product_id = ?
   │       ← Không có index trên product_id
   │
   └─ Kafka produce (25ms)             ← OK
```

**結論**: `inventory` テーブルに上記のインデックスがありません `product_id` → フルスキャンを問い合わせます。

### 6.3 サービスの依存関係マップ

Yeter と Grafana Tempo は **サービス マップ** 視覚化を提供します。
- 相互に依存するサービスのグラフを表示
- エッジごとのエラー率とレイテンシ
- ボトルネックと単一障害点を簡単に特定

---

## 7. グラファナ・テンポ

Tempo は、トレース用のログ形式のストレージです。Elasticsearch を使用すると、Jaeger よりも安価です。

```yaml
# values.yaml cho Tempo Helm chart
tempo:
  storage:
    trace:
      backend: s3
      s3:
        bucket: tempo-traces
        region: ap-southeast-1
  retention: 336h  # 14 ngày

# Grafana datasource
- name: Tempo
  type: tempo
  url: http://tempo:3100
  jsonData:
    nodeGraph:
      enabled: true
    tracesToLogs:
      datasourceUid: loki
      tags: ['service', 'namespace']
    tracesToMetrics:
      datasourceUid: prometheus
      queries:
        - name: Request Rate
          query: rate(http_requests_total{$$__tags}[5m])
```

---

## 8. メトリクス、ログ、トレースの相関関係

可観測性の真の力は、次の 3 つの柱がすべて揃ったときに発揮されます。

```
1. Alert firing: "Error rate > 5% on order-service" (Prometheus → PagerDuty)
   ↓
2. Mở Grafana dashboard Order Service
   → Thấy error rate spike lúc 10:15
   ↓
3. Click "View Logs" trên dashboard panel (liên kết tới Loki)
   → Lọc level=ERROR, thấy: "PaymentService timeout after 3000ms"
   → Copy traceId: abc123def456
   ↓
4. Click traceId link → mở Jaeger
   → Xem trace: PaymentService.charge() = 3001ms (timeout)
   → Span attributes: db.statement thực hiện query không có index
   ↓
5. Fix: Thêm composite index vào payment_transactions table
   Deploy → verify metrics trở về bình thường
```

---

## 概要

|コンセプト |目的 |
|----------|----------|
|トレース/スパン |ユニットは多くのサービスにわたるリクエストを追跡します。
| W3C トレーサレント |標準では、HTTP ヘッダーを介してコンテキストが伝播されます。
|オープンテレメトリー |ベンダー中立の計測標準 |
| OTelコレクター |テレメトリの受信、処理 (サンプリング)、およびエクスポート |
|テールベースのサンプリング |結果に基づいたサンプル、エラーを見逃さない |
|イェーガー / テンポ |バックエンドストレージとクエリトレース |
|トレース相関 | Grafana のトレース ↔ ログ ↔ メトリクス リンク |

**次の記事**: サーキット ブレーカーと再試行パターン

---

## 教訓

- 独自のベンダー SDK を使用しないでください。最初から OpenTelemetry を使用してください。
- テールベースのサンプリングにより、ストレージをあまり消費せずに 100% のエラーを検出します
- 可観測性の真の価値は、3 つの柱が個別に使用される場合ではなく、**相互に関連する**場合にあります。
- `traceId` 相関関係が機能するには、**ログ、メトリック ラベル、トレースの両方に存在する必要があります**
