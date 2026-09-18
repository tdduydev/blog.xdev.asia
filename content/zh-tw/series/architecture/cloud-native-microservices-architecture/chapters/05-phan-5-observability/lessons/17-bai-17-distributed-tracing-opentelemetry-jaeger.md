---
id: 019d8a22-c317-7a10-b001-a1b2c3d4e517
title: 第 17 課：分散式追蹤 — OpenTelemetry 和 Jaeger
slug: bai-17-distributed-tracing-opentelemetry-jaeger
description: >-
  分散式追蹤概念（追蹤、跨度、上下文傳播）、OpenTelemetry SDK 工具、OTLP 協定、OpenTelemetry Collector
  配置、Jaeger/Tempo 後端、追蹤分析和效能調試。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 17
section_title: 第 5 部分：可觀察性 — 三大支柱
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: 雲端原生微服務架構
  slug: cloud-native-microservices-architecture
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fb923c">🏗️ 建筑 — 第 17 课</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 17 課：分散式追蹤 —</tspan>
      <tspan x="60" dy="42">OpenTelemetry 和 Jaeger</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">雲端原生微服務架構</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 5 部分：可觀察性 — 三大支柱</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![第 17 課：分散式追蹤 — OpenTelemetry 和 Jaeger](/storage/uploads/2026/03/cn-bai-17-diagram.webp)

## 簡介

指标告诉您“有些事情”是错误的。日誌告訴您每個服務中發生了「什麼」。 **分布式跟踪**告诉您*为什么*请求在通过多个服务时缓慢或失败。

用戶發出的一個 HTTP 請求可以經過 10 個服務、20 個資料庫查詢、5 個快取查找——分散式追蹤追蹤整個旅程。

---

## 1. 基本概念

### 1.1 跟踪、跨度和上下文

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

**Trace**：代表一個請求的整個旅程，由 `traceId`。

**跨度**：追蹤中的工作單元（一次函數呼叫、一次資料庫查詢、一次 HTTP 呼叫）。是的：
- `spanId`：跨度的 ID
- `parentSpanId`: 父span的ID
- `startTime`, `endTime`
- `status`: 正常 / 錯誤
- `attributes`：鍵值元數據
- `events`: 帶時間戳的註釋

**上下文傳播**：如何傳播 `traceId` 和 `spanId` 透過服務邊界：
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

### 1.2 抽樣策略

追蹤生產中的每個請求 = 消耗大量儲存和 CPU。需要取樣：

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

**更好的基於尾部的採樣** - 不會錯過任何錯誤或緩慢的請求。

---

## 2. OpenTelemetry－標準化可觀測性

### 2.1 為什麼選擇 OpenTelemetry？

在 OpenTelemetry 之前，每個供應商都有自己的 SDK（Jaeger、Zipkin、DataDog、New Relic、Dynatrace...）。更改供应商=重写整个检测代码。

**OpenTelemetry (OTel)** 是由 CNCF 管理的開放標準：

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

### 2.2 OTel 元件

- **OTel API**：儀器代碼介面（追蹤器、儀表、記錄器）
- **OTel SDK**：API、取樣處理、匯出的實作
- **OTel Collector**：代理程式/網關接收、處理和匯出遙測數據
- **OTLP**：OpenTelemetry 協定 — 資料傳輸協定（gRPC 連接埠 4317、HTTP 連接埠 4318）

---

## 3. 儀器

### 3.1 自動儀表

最簡單的方法－無需更改程式碼：

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

使用 Node.js：
```yaml
    instrumentation.opentelemetry.io/inject-nodejs: "true"
```

### 3.2 手動偵測（Java）

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

### 3.3 手動偵測 (Node.js/TypeScript)

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

### 3.4 Span 屬性最佳實踐

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

## 4.開放遙測收集器

### 4.1 部署模式

**代理模式**（DaemonSet）：每個節點都有一個收集器，從該節點上的 pod 接收：
```
Pod → localhost:4317 → OTel Collector (DaemonSet) → Backend
```

**網關模式**（部署）：集中式收集器，從所有代理程式接收：
```
OTel Collector (DaemonSet) → OTel Collector (Gateway) → Multiple Backends
```

在生產中使用**兩者**：Pod 附近的 DaemonSet 代理，網關處理扇出和基於尾部的採樣。

### 4.2 收集器配置

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

## 5. Jaeger — 跟蹤後端

### 5.1 Jaeger 架構

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

### 5.2 在 Kubernetes 上部署 Jaeger

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

## 6. 追蹤分析－實際調試

### 6.1 找慢蹤跡

在 Jaeger 使用者介面中：
- 選擇服務、操作
- 過濾器： `min Duration > 500ms`
- 按持續時間 DESC 排序
- 點選最長軌跡→分析跨度瀑布

### 6.2 瀑布根本原因分析

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

**結論**： `inventory` 表缺上述索引 `product_id` → 查詢全掃描。

### 6.3 服務依賴關係圖

Jaeger 和 Grafana Tempo 提供 **服务地图** 可视化：
- 顯示相互依賴的服務圖表
- 每個邊緣的錯誤率和延遲
- 輕鬆識別瓶頸和單點故障

---

## 7. Grafana 節奏

Tempo 是日志式跟踪存储 — 比 Jaeger 和 Elasticsearch 便宜：

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

## 8. 關聯指標、日誌和追蹤

可观察性的真正力量在于所有三个支柱结合在一起：

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

## 總結

|概念 |目的|
|------------|---------|
|轨迹/跨度|单位跟踪许多服务的请求 |
| W3C 追踪父 |标准通过 HTTP 标头传播上下文 |
|開放遙測 |供應商中立的儀器標準 |
| OTel 收藏家 |接收、处理（采样）和导出遥测数据 |
|基于尾部的采样 |根据结果​​进行采样，不要错过错误 |
|耶格/節奏|後端儲存與查詢痕跡|
|跟踪相关性 | Grafana 中的跟踪 ↔ 日志 ↔ 指标链接 |

**下一篇文章**：斷路器與重試模式

---

## 經驗教訓

- 不要使用您自己的供应商 SDK 进行检测 - 从一开始就使用 OpenTelemetry
- 基于尾部的采样可捕获 100% 的错误，且不会消耗太多存储空间
- 可觀察性的真正價值在於三個支柱**相關**在一起，而不是單獨使用時
- `traceId` 必须出现在**日志、指标标签和跟踪**中才能发挥关联作用
