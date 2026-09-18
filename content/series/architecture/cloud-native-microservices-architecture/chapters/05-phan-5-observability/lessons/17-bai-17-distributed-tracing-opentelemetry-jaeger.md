---
id: 019d8a22-c317-7a10-b001-a1b2c3d4e517
title: "Bài 17: Distributed Tracing — OpenTelemetry & Jaeger"
slug: bai-17-distributed-tracing-opentelemetry-jaeger
description: >-
  Distributed Tracing concepts (Trace, Span, Context Propagation),
  OpenTelemetry SDK instrumentation, OTLP protocol,
  OpenTelemetry Collector configuration, Jaeger/Tempo backend,
  trace analysis và performance debugging.
duration_minutes: 120
is_free: true
video_url: null
sort_order: 17
section_title: "Phần 5: Observability — Ba trụ cột"
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: "Cloud Native Microservices Architecture"
  slug: cloud-native-microservices-architecture
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ Kiến trúc — Bài 17</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 17: Distributed Tracing —</tspan>
      <tspan x="60" dy="42">OpenTelemetry &amp; Jaeger</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Cloud Native Microservices Architecture</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 5: Observability — Ba trụ cột</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 17: Distributed Tracing — OpenTelemetry & Jaeger](/storage/uploads/2026/03/cn-bai-17-diagram.webp)

## Giới thiệu

Metrics cho bạn biết *có gì đó* đang sai. Logs cho bạn biết *điều gì* đã xảy ra trong mỗi service. **Distributed Tracing** cho bạn biết *tại sao* một request lại chậm hay lỗi khi đi qua nhiều service.

Một request HTTP từ người dùng có thể đi qua 10 services, 20 database queries, 5 cache lookups — distributed tracing theo dõi toàn bộ hành trình đó.

---

## 1. Concepts cơ bản

### 1.1 Trace, Span và Context

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

**Trace**: Đại diện cho toàn bộ hành trình của một request, được định danh bởi `traceId`.

**Span**: Đơn vị công việc trong trace (một function call, một database query, một HTTP call). Có:
- `spanId`: ID của span
- `parentSpanId`: ID của span cha
- `startTime`, `endTime`
- `status`: OK / ERROR
- `attributes`: key-value metadata
- `events`: timestamped annotations

**Context Propagation**: Cách truyền `traceId` và `spanId` qua service boundaries:
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

### 1.2 Sampling Strategies

Trace mọi request trong production = tốn storage và CPU khổng lồ. Cần sampling:

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

**Tail-based sampling tốt hơn** — không bỏ sót bất kỳ lỗi hay slow request nào.

---

## 2. OpenTelemetry — Chuẩn hóa Observability

### 2.1 Tại sao OpenTelemetry?

Trước OpenTelemetry, mỗi vendor có SDK riêng (Jaeger, Zipkin, DataDog, New Relic, Dynatrace...). Thay đổi vendor = rewrite toàn bộ instrumentation code.

**OpenTelemetry (OTel)** là standard mở do CNCF quản lý:

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

### 2.2 OTel Components

- **OTel API**: Interfaces để instrument code (Tracer, Meter, Logger)
- **OTel SDK**: Implementation của API, xử lý sampling, export
- **OTel Collector**: Agent/Gateway nhận, process và export telemetry
- **OTLP**: OpenTelemetry Protocol — giao thức truyền data (gRPC port 4317, HTTP port 4318)

---

## 3. Instrumentation

### 3.1 Auto-Instrumentation

Cách đơn giản nhất — không cần thay đổi code:

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

Với Node.js:
```yaml
    instrumentation.opentelemetry.io/inject-nodejs: "true"
```

### 3.2 Manual Instrumentation (Java)

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

### 3.3 Manual Instrumentation (Node.js/TypeScript)

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

### 3.4 Span Attributes Best Practices

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

## 4. OpenTelemetry Collector

### 4.1 Deployment Modes

**Agent Mode** (DaemonSet): Mỗi node có một Collector, nhận từ pods trên node đó:
```
Pod → localhost:4317 → OTel Collector (DaemonSet) → Backend
```

**Gateway Mode** (Deployment): Một Collector tập trung, nhận từ tất cả agents:
```
OTel Collector (DaemonSet) → OTel Collector (Gateway) → Multiple Backends
```

Dùng **cả hai** trong production: DaemonSet Agent gần pod, Gateway xử lý fan-out và tail-based sampling.

### 4.2 Collector Configuration

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

## 5. Jaeger — Trace Backend

### 5.1 Jaeger Architecture

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

### 5.2 Deploy Jaeger trên Kubernetes

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

## 6. Trace Analysis — Debug thực tế

### 6.1 Tìm slow traces

Trong Jaeger UI:
- Chọn service, operation
- Filter: `min Duration > 500ms`
- Sort by Duration DESC
- Click trace dài nhất → analyze span waterfall

### 6.2 Root Cause Analysis theo waterfall

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

**Kết luận**: `inventory` table thiếu index trên `product_id` → query full scan.

### 6.3 Service Dependency Map

Jaeger và Grafana Tempo cung cấp **Service Map** visualization:
- Hiển thị đồ thị các service phụ thuộc lẫn nhau
- Error rate và latency trên mỗi edge
- Dễ dàng identify bottleneck và single point of failure

---

## 7. Grafana Tempo

Tempo là log-style storage cho traces — rẻ hơn Jaeger với Elasticsearch:

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

## 8. Correlating Metrics, Logs và Traces

Sức mạnh thực sự của observability là khi cả ba trụ cột liên kết với nhau:

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

## Tóm tắt

| Khái niệm | Mục đích |
|-----------|---------|
| Trace / Span | Đơn vị theo dõi request qua nhiều service |
| W3C traceparent | Chuẩn propagate context qua HTTP headers |
| OpenTelemetry | Vendor-neutral instrumentation standard |
| OTel Collector | Nhận, process (sampling), và export telemetry |
| Tail-based sampling | Sample dựa trên kết quả, không bỏ sót errors |
| Jaeger / Tempo | Backend lưu trữ và query traces |
| Trace correlation | Liên kết trace ↔ logs ↔ metrics trong Grafana |

**Bài tiếp theo**: Circuit Breaker & Retry Patterns

---

## Bài học rút ra

- Đừng instrument bằng vendor SDK riêng — dùng OpenTelemetry ngay từ đầu
- Tail-based sampling bắt được 100% errors mà không tốn quá nhiều storage
- Giá trị thực của observability là khi ba trụ cột **correlate** với nhau, không phải khi dùng riêng lẻ
- `traceId` phải có mặt trong **cả logs, metrics labels và traces** để correlation hoạt động
