---
id: 019d8a22-c316-7a10-b001-a1b2c3d4e516
title: 'レッスン 16: ロギング — 構造化ロギング、Loki および ELK スタック'
slug: bai-16-logging-structured-logging-loki-elk
description: >-
  構造化されたログ記録のベスト プラクティス、ログ レベル戦略、Fluent Bit ログ収集、Loki と
  Elasticsearch、LogQL、traceId とのログ相関、ログ保持ポリシー、コストの最適化。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 16
section_title: 'パート 5: 可観測性 — 3 つの柱'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-4079" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-4079)"/>

  <!-- Decorations -->
  <g>
    <circle cx="719" cy="107" r="12" fill="#818cf8" opacity="0.12000000000000001"/>
    <circle cx="838" cy="46" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="957" cy="245" r="16" fill="#818cf8" opacity="0.060000000000000005"/>
    <circle cx="1076" cy="184" r="33" fill="#818cf8" opacity="0.13"/>
    <circle cx="695" cy="123" r="20" fill="#818cf8" opacity="0.1"/>
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
    <line x1="600" y1="137" x2="1100" y2="217" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="167" x2="1050" y2="237" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1064.712812921102,221 1064.712812921102,253 1037,269 1009.287187078898,253 1009.287187078898,221 1037,205" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 16</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 16: ロギング — 構造化ロギング、Loki</tspan>
      <tspan x="60" dy="42">&ELKスタック</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 5: 可観測性 — 3 つの柱</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 16: ロギング — 構造化ロギング、Loki および ELK スタック](/storage/uploads/2026/03/cn-bai-16-diagram.webp)

## はじめに

モノリスでは、次のことができます。 `ssh` サーバーにアクセスして、 `tail -f` ログファイル。数百の動的ポッド上で数十のサービスが実行されているマイクロサービスでは、それはもはや不可能です。 **集中ログ**は必須の要件です。

しかし、単にログを収集するだけでは十分ではありません。効果的なデバッグのために、ログは構造化され、クエリ可能であり、トレースにリンクされている必要があります。

---

## 1. 構造化されたロギング

### 1.1 なぜ構造化ログを使用するのか?

**非構造化ログ** — 自動的に解析するのは困難です:
```
2026-03-31 10:15:30 INFO Order O-001 created for customer C-042, total 500000 VND, 3 items, took 45ms
```

**構造化ログ** (JSON) — 機械可読、クエリ可能:
```json
{
  "timestamp": "2026-03-31T10:15:30.123Z",
  "level": "INFO",
  "service": "order-service",
  "version": "1.2.3",
  "traceId": "abc123def456",
  "spanId": "span789abc",
  "message": "Order created successfully",
  "orderId": "O-001",
  "customerId": "C-042",
  "totalAmount": 500000,
  "currency": "VND",
  "itemCount": 3,
  "durationMs": 45
}
```

### 1.2 ログレベル戦略

```
TRACE — Rất chi tiết, chỉ dùng khi debug cụ thể
        Không bao giờ enable ở production

DEBUG — Thông tin debug (function calls, variable values)
        Chỉ enable ở development, có thể bật tạm ở staging

INFO  — Sự kiện business quan trọng (order created, payment processed)
        Enable ở production — đây là log chính cần thu thập

WARN  — Tình huống không mong đợi nhưng system vẫn hoạt động
        (deprecated API call, slow query > 500ms, retry attempt)

ERROR — Lỗi cần xử lý nhưng service vẫn chạy
        (external service timeout, validation failure)

FATAL — Lỗi nghiêm trọng, service sắp shutdown
        (database connection lost, out of memory)
```

**原則**:
- INFO ログは「監査証跡」です - すべての重要なアクションには INFO ログが必要です
- エラー ログには、追加情報を必要とせずにデバッグできるスタック トレースと十分なコンテキストが含まれている必要があります
- 機密データ (パスワード、クレジット カード、PII) をログに記録しないでください。

### 1.3 構造化ロギングの実装

**Java (Logback + Logstash エンコーダを備えた Spring Boot)**:
```xml
<!-- logback-spring.xml -->
<configuration>
  <appender name="JSON" class="ch.qos.logback.core.ConsoleAppender">
    <encoder class="net.logstash.logback.encoder.LogstashEncoder">
      <customFields>{"service":"order-service","version":"${APP_VERSION}"}</customFields>
    </encoder>
  </appender>

  <root level="INFO">
    <appender-ref ref="JSON"/>
  </root>
</configuration>
```

```java
// Sử dụng MDC (Mapped Diagnostic Context) cho correlation
import org.slf4j.MDC;

@Component
public class RequestLoggingFilter implements Filter {
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) {
        MDC.put("traceId", extractOrGenerateTraceId(request));
        MDC.put("userId", extractUserId(request));
        try {
            chain.doFilter(req, res);
        } finally {
            MDC.clear();
        }
    }
}

// Trong service code
@Slf4j
public class OrderService {
    public Order createOrder(CreateOrderRequest req) {
        log.info("Creating order", // message
            kv("customerId", req.getCustomerId()),
            kv("itemCount", req.getItems().size()),
            kv("totalAmount", req.getTotal())
        );
        // ...
    }
}
```

**Node.js (Pino)**:
```javascript
import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  base: {
    service: 'order-service',
    version: process.env.APP_VERSION,
  },
});

// Usage
logger.info({ orderId, customerId, totalAmount }, 'Order created successfully');
logger.error({ err, orderId }, 'Failed to process order');
```

---

## 2. ログ収集アーキテクチャ

### 2.1 パイプラインの概要

```
┌──────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                        │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Order Service│  │Payment Svc   │  │ Inventory Svc│      │
│  │ (Pod)        │  │ (Pod)        │  │ (Pod)        │      │
│  │ stdout/stderr│  │ stdout/stderr│  │ stdout/stderr│      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                 │                  │              │
│         └─────────────────┴──────────────────┘              │
│                           │                                 │
│              ┌────────────▼──────────────┐                  │
│              │   Fluent Bit (DaemonSet)  │                  │
│              │  - Tail /var/log/pods/    │                  │
│              │  - Parse JSON             │                  │
│              │  - Enrich (node, pod)     │                  │
│              │  - Buffer & retry         │                  │
│              └────────────┬──────────────┘                  │
└───────────────────────────┼─────────────────────────────────┘
                            │
               ┌────────────▼────────────┐
               │    Log Aggregation      │
               │   Loki / Elasticsearch  │
               └────────────┬────────────┘
                            │
               ┌────────────▼────────────┐
               │      Visualization      │
               │   Grafana / Kibana      │
               └─────────────────────────┘
```

### 2.2 滑らかなビット構成

```yaml
# fluent-bit ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluent-bit-config
  namespace: monitoring
data:
  fluent-bit.conf: |
    [SERVICE]
        Flush         5
        Daemon        Off
        Log_Level     info

    [INPUT]
        Name              tail
        Tag               kube.*
        Path              /var/log/containers/*.log
        Parser            docker
        DB                /run/fluent-bit/flb_kube.db
        Mem_Buf_Limit     10MB
        Skip_Long_Lines   On
        Refresh_Interval  10

    [FILTER]
        Name                kubernetes
        Match               kube.*
        Kube_URL            https://kubernetes.default.svc:443
        Merge_Log           On
        K8S-Logging.Parser  On
        K8S-Logging.Exclude On

    [FILTER]
        Name    grep
        Match   kube.*
        # Loại bỏ health check logs
        Exclude log /health

    [OUTPUT]
        Name          loki
        Match         kube.*
        Host          loki.monitoring.svc
        Port          3100
        Labels        job=fluentbit, node=${NODE_NAME}
        Label_keys    $kubernetes['namespace_name'],$kubernetes['pod_name'],$kubernetes['container_name']
        Remove_keys   kubernetes,stream
        Auto_Kubernetes_Labels  On
```

---

## 3. Loki — ログの集約

### 3.1 Loki 対 Elasticsearch

| |ロキ |エラスティックサーチ |
|--|------|--|
|インデックス作成 |インデックス ラベル (メタデータ) のみ |ログ全体の全文インデックス |
|ストレージ |はるかに安い (S3/MinIO) |ストレージとメモリを消費します |
|クエリ | LogQL (シンプル、ラベル中心) | Lucene/KQL (強力なフルテキスト) |
|セットアップ |シンプル |複雑 (クラスター、シャード) |
|使用例 |クラウドネイティブ、コスト重視 |コンプライアンス、全文検索 |
|統合 |グラファナネイティブ |キバナ |

**Loki を選択する場合**: ほとんどの場合、クラウド ネイティブです。低コストで、Grafana とネイティブに統合されており、運用ログには十分です。

**Elasticsearch を選択する場合**: コンプライアンス/監査ログ検索、ログコンテンツの全文検索が必要で、すでに Kibana エコシステムを備えています。

### 3.2 Loki アーキテクチャ

```
┌──────────────────────────────────────────────────┐
│                   Loki                           │
│                                                  │
│  ┌─────────────┐  ┌─────────────────────────┐   │
│  │  Distributor│──▶│   Ingester (in-memory)  │   │
│  │  (receive)  │  │                         │   │
│  └─────────────┘  └───────────┬─────────────┘   │
│                               │ flush            │
│  ┌─────────────┐  ┌───────────▼─────────────┐   │
│  │  Querier    │  │   Object Storage        │   │
│  │  (read)     │  │   (S3/MinIO/GCS)        │   │
│  └──────┬──────┘  └─────────────────────────┘   │
│         │                                        │
└─────────┼────────────────────────────────────────┘
          │ LogQL
          ▼
      Grafana
```

### 3.3 Loki と Grafana のインストール

```bash
helm repo add grafana https://grafana.github.io/helm-charts

# Cài Loki (simple scalable mode)
helm upgrade --install loki grafana/loki \
  --namespace monitoring \
  --set loki.storage.type=s3 \
  --set loki.storage.s3.bucket=loki-logs \
  --set loki.storage.s3.region=ap-southeast-1

# Cài Grafana Alloy (Fluent Bit alternative từ Grafana)
helm upgrade --install alloy grafana/alloy \
  --namespace monitoring
```

---

## 4. LogQL — ログクエリ言語

### 4.1 ストリームセレクター

ラベルによってログ ストリームを選択します。
```logql
# Tất cả log từ order-service
{service="order-service"}

# Log từ namespace services-prod
{namespace="services-prod"}

# Kết hợp nhiều labels
{namespace="services-prod", app="order-service", pod=~"order-service-.*"}
```

### 4.2 フィルター式

```logql
# Chứa chuỗi
{service="order-service"} |= "ERROR"

# Không chứa
{service="order-service"} != "health"

# Regex match
{service="order-service"} |~ "order.*created"

# Parse JSON và filter
{service="order-service"}
  | json
  | level = "ERROR"
  | durationMs > 1000

# Pipeline phức tạp
{namespace="services-prod"}
  | json
  | level = "ERROR"
  | line_format "{{.service}}: {{.message}} (trace: {{.traceId}})"
```

### 4.3 メトリッククエリ

```logql
# Đếm ERROR logs mỗi 5 phút
sum(rate({service="order-service"} |= "ERROR" [5m])) by (service)

# Log volume theo service
sum(bytes_rate({namespace="services-prod"}[5m])) by (service)

# Top 5 services nhiều lỗi nhất
topk(5,
  sum(count_over_time({namespace="services-prod"} |= "ERROR" [1h]))
  by (service)
)
```

---

## 5. トレースとのログの相関関係

目標: ログ エントリから、対応するトレースに即座にジャンプし、その逆も同様です。

### 5.1 トレースコンテキストをログに挿入する

```java
// Spring Boot với Micrometer Tracing tự động inject
// Log sẽ có traceId và spanId từ MDC

// Kết quả log:
{
  "timestamp": "...",
  "level": "ERROR",
  "service": "order-service",
  "traceId": "abc123def456789",   ← đây
  "spanId": "span789",             ← đây
  "message": "Payment failed"
}
```

### 5.2 Grafana 派生フィールド

ログ内のtraceIdからJaegerへのリンクを作成するようにGrafanaを構成します。

```json
// Trong Loki datasource config (Grafana)
{
  "derivedFields": [
    {
      "matcherRegex": "traceId=(\\w+)",
      "name": "TraceID",
      "url": "http://jaeger:16686/trace/$${__value.raw}",
      "datasourceUid": "jaeger"
    }
  ]
}
```

Grafana でログを表示すると、traceId が自動的にクリック可能なリンクとなり、Jaeger トレースを開くことができるようになりました。

---

## 6. 保持とコストの最適化

### 6.1 ログ保存ポリシー

```yaml
# Loki retention config
limits_config:
  # Giữ log 30 ngày cho prod
  retention_period: 720h

  # Per-stream override
  per_stream_rate_limit: 10MB
  per_stream_rate_limit_burst: 30MB

compactor:
  retention_enabled: true
  retention_delete_delay: 2h
```

**階層別の維持戦略**:
```
Hot  (0-7 ngày)   : SSD storage  — query nhanh
Warm (7-30 ngày)  : HDD storage  — query chậm hơn
Cold (30-365 ngày): S3 Glacier   — archive only
```

### 6.2 ログ量を減らす

```logql
# Filtering trước khi ingest (Fluent Bit)
# Loại bỏ health check, static assets, debug logs từ noisy service
```

```yaml
# Trong Fluent Bit:
[FILTER]
    Name    grep
    Match   kube.*
    Exclude log (GET /health|GET /metrics|\.css|\.js|\.png)

[FILTER]
    Name    grep
    Match   kube.monitoring.*
    Exclude log .*  # Bỏ hoàn toàn log từ monitoring namespace
```

**大容量サービスのサンプリング**:
```java
// Chỉ log 10% DEBUG requests bình thường, 100% errors
if (random.nextDouble() < 0.1 || isError) {
    log.debug("Request processed", kv("endpoint", endpoint));
}
```

---

## 7. ベストプラクティス

**ログチェックリスト:**
```
□ Structured JSON logging
□ Consistent field names (snake_case) across services
□ traceId / spanId có mặt trong mọi log line
□ Correlation ID từ user request
□ Không log PII (email, phone, card numbers)
□ Error logs kèm stack trace
□ Business events quan trọng có INFO log
□ Health check endpoints bị filter khỏi logs
□ Log retention policy phù hợp với compliance
□ Alerting trên ERROR log spike
```

**フィールドの命名規則:**
```json
{
  "timestamp": "2026-03-31T10:00:00Z",   // ISO 8601
  "level": "INFO",                         // UPPERCASE
  "service": "order-service",              // kebab-case
  "version": "1.2.3",                      // semver
  "traceId": "abc123",                     // camelCase
  "spanId": "def456",
  "userId": "u-001",                       // camelCase
  "message": "...",                        // human-readable
  // Domain fields: snake_case
  "order_id": "O-001",
  "total_amount": 500000,
  "duration_ms": 45                        // unit suffix
}
```

---

## 概要

|コンセプト |目的 |
|----------|----------|
|構造化ロギング |機械可読でクエリ可能なログ形式 |
|ログレベル |環境に適した冗長性の制御 |
|流暢なビット | DaemonSet はすべてのポッドからログを収集します。
|ロキ |クラウドネイティブ向けのコスト効率の高いログ集約 |
|ログQL |ラベルとフィルター式を使用してログをクエリする |
|ログ相関 |ログを分散トレースとリンクする |
|保持ポリシー |コストとコンプライアンス要件のバランスをとる |

**次の記事**: 分散トレーシング — OpenTelemetry と Yeter
