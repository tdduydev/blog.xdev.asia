---
id: 019d8a22-c315-7a10-b001-a1b2c3d4e515
title: 'レッスン 15: メトリクス — プロメテウスとグラファナ'
slug: bai-15-metrics-prometheus-grafana
description: >-
  RED メソッド、USE メソッド、Prometheus アーキテクチャ、基本的な PromQL、Kubernetes の
  ServiceMonitor、Grafana ダッシュボード設計、アラート ルール、および Alertmanager 構成。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 15
section_title: 'パート 5: 可観測性 — 3 つの柱'
course:
  id: 019d8a22-c300-7a10-b001-a1b2c3d4e5f7
  title: クラウドネイティブのマイクロサービスアーキテクチャ
  slug: cloud-native-microservices-architecture
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-334" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-334)"/>

  <!-- Decorations -->
  <g>
    <circle cx="819" cy="87" r="22" fill="#818cf8" opacity="0.12000000000000001"/>
    <circle cx="1038" cy="106" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="757" cy="125" r="36" fill="#818cf8" opacity="0.060000000000000005"/>
    <circle cx="976" cy="144" r="13" fill="#818cf8" opacity="0.13"/>
    <circle cx="695" cy="163" r="20" fill="#818cf8" opacity="0.1"/>
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
    <polygon points="964.712812921102,121 964.712812921102,153 937,169 909.287187078898,153 909.287187078898,121.00000000000001 937,105" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ アーキテクチャ — レッスン 15</text>

  <!-- Title -->
  <text x="60" y="160" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 15: メトリクス — プロメテウスとグラファナ</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="222" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">クラウドネイティブのマイクロサービスアーキテクチャ</text>

  <!-- Section -->
  <text x="60" y="246" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 5: 可観測性 — 3 つの柱</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![レッスン 15: メトリクス — プロメテウスとグラファナ](/storage/uploads/2026/03/cn-bai-15-diagram.webp)

## はじめに

マイクロサービス システムでは、従来のデバッグのように実行中のサービスを「内部を見る」ことはできません。 **Metrics** は Observability の最初のプラットフォームであり、システムの健全性とパフォーマンスを長期にわたって測定する数値データを提供します。

**Prometheus + Grafana** は、メトリクスの収集と視覚化のためのクラウド ネイティブ エコシステムの事実上の標準デュオです。

---

## 1. 測定方法

### 1.1 RED メソッド — サービスの場合

Tom Wilkie による **RED メソッド** は、各サービスの 3 つの最も重要な指標に焦点を当てています。

```
R — Rate     : Số lượng request service xử lý mỗi giây
E — Errors   : Tỷ lệ phần trăm request thất bại
D — Duration : Thời gian phân phối (latency percentiles)
```

Order Service のダッシュボードの例:

```
┌─────────────────────────────────────────────────────────┐
│                  Order Service — RED                    │
├──────────────────┬──────────────────┬───────────────────┤
│ Rate             │ Error Rate       │ Duration (p99)    │
│ 1,247 req/s      │ 0.3%             │ 145ms             │
│ ↑ +12% vs 1h ago│ ↓ Normal         │ → Within SLO      │
└──────────────────┴──────────────────┴───────────────────┘
```

### 1.2 USE メソッド — リソースの場合

インフラストラクチャ リソースに対する Brendan Gregg による **USE メソッド**:

```
U — Utilization : Tỷ lệ thời gian resource đang busy (%)
S — Saturation  : Mức độ "hàng đợi" extra work (queue length)
E — Errors      : Số lượng lỗi từ resource
```

各リソースに適用します。

|リソース |活用 |彩度 |エラー |
|----------|---------------|---------------|----------|
| CPU | `rate(cpu_seconds[5m])` |負荷平均 > コア |マシンチェックエラー |
|メモリ | `1 - mem_free/mem_total` |スワップレート、OOM キル | |
|ディスク I/O | `rate(disk_io_time[5m])` |ディスクキューの長さ | I/O エラー |
|ネットワーク | `rate(net_bytes[5m]) / capacity` |パケットのドロップ/再送信 | NIC エラー |

### 1.3 ゴールデン シグナル — エンドツーエンドの場合

Google SRE は **4 つのゴールデン シグナル** を定義しています。

1. **レイテンシ** — リクエストの処理時間 (成功とエラーのレイテンシを区別)
2. **トラフィック** — システムの需要 (リクエスト/秒、同時ユーザー数)
3. **エラー** — リクエスト失敗率 (明示的な 5xx、暗黙的な間違ったデータ)
4. **飽和** — システム リソースの充満レベル

---

## 2. プロメテウスのアーキテクチャ

### 2.1 概要

```
┌─────────────────────────────────────────────────────────────┐
│                      Prometheus Server                      │
│                                                             │
│  ┌──────────────┐   ┌──────────────┐   ┌────────────────┐  │
│  │ Retrieval    │   │ TSDB         │   │ HTTP Server    │  │
│  │ (Scraper)    │   │ (Time-Series │   │ (Query/API)    │  │
│  │              │   │  Database)   │   │                │  │
│  └──────┬───────┘   └──────────────┘   └────────┬───────┘  │
│         │                                        │          │
└─────────┼────────────────────────────────────────┼──────────┘
          │ /metrics scrape                        │ PromQL
          ▼                                        ▼
 ┌──────────────────┐                    ┌─────────────────┐
 │ Targets:         │                    │   Grafana       │
 │ - App /metrics   │                    │   Alertmanager  │
 │ - Node Exporter  │                    │   Other clients │
 │ - cAdvisor       │                    └─────────────────┘
 │ - kube-state-mts │
 └──────────────────┘
```

**プルベースのモデル**: Prometheus は、15 ～ 30 秒ごとにターゲットからメトリクスを積極的に取得します。プッシュベース (InfluxDB、StatsD) とは異なります。

### 2.2 メトリクスの種類

```python
# Counter — Chỉ tăng, dùng cho counts và rates
http_requests_total{method="POST", status="200"} 1027

# Gauge — Tăng giảm tự do, dùng cho current values
memory_usage_bytes 153344000
active_connections 42

# Histogram — Phân phối latency, tạo buckets tự động
http_request_duration_seconds_bucket{le="0.1"} 8521
http_request_duration_seconds_bucket{le="0.5"} 9812
http_request_duration_seconds_sum 1234.6789
http_request_duration_seconds_count 9987

# Summary — Như Histogram nhưng tính percentile phía client
http_request_duration_seconds{quantile="0.99"} 0.145
```

### 2.3 説明形式

各サービスは次の場所でメトリクスを公開します。 `/metrics` エンドポイント:

```java
// Spring Boot — thêm dependency
// actuator + micrometer-registry-prometheus

// Sau đó endpoint tự động có:
// GET /actuator/prometheus
```

```go
// Go — prometheus/client_golang
import "github.com/prometheus/client_golang/prometheus"
import "github.com/prometheus/client_golang/prometheus/promauto"

var (
    httpRequestsTotal = promauto.NewCounterVec(
        prometheus.CounterOpts{
            Name: "http_requests_total",
            Help: "Total HTTP requests",
        },
        []string{"method", "path", "status"},
    )

    httpDuration = promauto.NewHistogramVec(
        prometheus.HistogramOpts{
            Name:    "http_request_duration_seconds",
            Buckets: prometheus.DefBuckets,
        },
        []string{"method", "path"},
    )
)
```

---

## 3. Kubernetes の統合

### 3.1 kube-プロメテウス-スタック

最も簡単な方法: キットをインストールする `kube-prometheus-stack` Helm チャート — Prometheus、Grafana、Alertmanager、および必要なエクスポーターが含まれます。

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm upgrade --install kube-prometheus-stack \
  prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set grafana.adminPassword=<your-password> \
  --set prometheus.prometheusSpec.retention=15d
```

### 3.2 サービスモニター

`ServiceMonitor` Prometheus Operator の CRD (カスタム リソース定義) です。サービスからメトリクスを取得する方法を定義します。

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: order-service
  namespace: services-prod
  labels:
    # Phải match với selector của Prometheus
    release: kube-prometheus-stack
spec:
  namespaceSelector:
    matchNames:
      - services-prod
  selector:
    matchLabels:
      app: order-service
  endpoints:
    - port: http
      path: /actuator/prometheus
      interval: 15s
      scrapeTimeout: 10s
```

### 3.3 ポッドモニター

サービスに Kubernetes Service がない場合 (直接 Pod のみがある場合):

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PodMonitor
metadata:
  name: worker-pods
spec:
  selector:
    matchLabels:
      app: async-worker
  podMetricsEndpoints:
    - port: metrics
      path: /metrics
      interval: 30s
```

---

## 4. PromQL — Prometheus クエリ言語

### 4.1 基本構文

```promql
# Instant vector — giá trị tại thời điểm hiện tại
http_requests_total

# Range vector — giá trị trong khoảng thời gian
http_requests_total[5m]

# Filtering bằng labels
http_requests_total{job="order-service", status=~"5.."}

# Operators
http_requests_total{status=~"5.."} / http_requests_total  # ratio
```

### 4.2 重要な機能

```promql
# rate() — tốc độ thay đổi per second (dùng cho Counter)
rate(http_requests_total[5m])

# irate() — instant rate (nhạy hơn với spike ngắn)
irate(http_requests_total[5m])

# increase() — tổng tăng trong khoảng thời gian
increase(http_requests_total[1h])

# histogram_quantile() — percentile từ Histogram
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))

# sum() với by/without
sum(rate(http_requests_total[5m])) by (service)

# topk()
topk(5, rate(http_requests_total[5m]))
```

### 4.3 実際のクエリ

```promql
# Error rate (5xx) cho tất cả services
sum(rate(http_requests_total{status=~"5.."}[5m])) by (service)
/
sum(rate(http_requests_total[5m])) by (service)

# p99 latency theo service
histogram_quantile(
  0.99,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (service, le)
)

# CPU usage trên các pods
sum(rate(container_cpu_usage_seconds_total{container!=""}[5m])) by (pod, namespace)

# Memory usage (bytes)
sum(container_memory_rss{container!=""}) by (pod, namespace)

# Pod restart count
kube_pod_container_status_restarts_total{namespace="services-prod"}

# Service availability (based on successful requests)
1 - (
  sum(rate(http_requests_total{status=~"5.."}[5m])) by (service)
  /
  sum(rate(http_requests_total[5m])) by (service)
)
```

---

## 5. Grafana ダッシュボード

### 5.1 優れたダッシュボード構造

ダッシュボードの設計原則:

```
Level 1 — Overview (Top Row)
  Tổng quan toàn bộ hệ thống:
  - Total request rate
  - Overall error rate
  - System availability
  - Active alerts count

Level 2 — Service Overview
  Metrics per service:
  - Rate, Errors, Duration (RED)
  - Service status

Level 3 — Drill-down
  Chi tiết khi có vấn đề:
  - Request breakdown by endpoint
  - Latency percentiles (p50, p95, p99)
  - Error messages
  - Dependencies
```

### 5.2 コードとしてのダッシュボード

ダッシュボードを JSON として Git に保存します。

```yaml
# Grafana ConfigMap trong Kubernetes
apiVersion: v1
kind: ConfigMap
metadata:
  name: order-service-dashboard
  namespace: monitoring
  labels:
    grafana_dashboard: "1"  # Auto-discovered bởi Grafana sidecar
data:
  order-service.json: |
    {
      "title": "Order Service",
      "uid": "order-service",
      "panels": [ ... ]
    }
```

---

## 6. アラート

### 6.1 プロメテウスルール

アラート ルールの定義:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: order-service-alerts
  namespace: services-prod
  labels:
    release: kube-prometheus-stack
spec:
  groups:
    - name: order-service.rules
      interval: 30s
      rules:
        # Error rate cao
        - alert: HighErrorRate
          expr: |
            sum(rate(http_requests_total{service="order-service", status=~"5.."}[5m]))
            /
            sum(rate(http_requests_total{service="order-service"}[5m]))
            > 0.05
          for: 2m
          labels:
            severity: critical
            team: backend
          annotations:
            summary: "High error rate on order-service"
            description: "Error rate {{ $value | humanizePercentage }} > 5%"

        # Latency cao
        - alert: HighLatency
          expr: |
            histogram_quantile(0.99,
              sum(rate(http_request_duration_seconds_bucket{service="order-service"}[5m]))
              by (le)
            ) > 1.0
          for: 5m
          labels:
            severity: warning
          annotations:
            summary: "High p99 latency on order-service"
            description: "p99 latency is {{ $value | humanizeDuration }}"

        # Pod down
        - alert: PodDown
          expr: |
            kube_deployment_status_replicas_available{
              namespace="services-prod",
              deployment="order-service"
            } < kube_deployment_spec_replicas{
              namespace="services-prod",
              deployment="order-service"
            }
          for: 1m
          labels:
            severity: critical
          annotations:
            summary: "Order service pod(s) down"
```

### 6.2 アラートマネージャー

Alertmanager は Prometheus からアラートを受信し、通知を送信します。

```yaml
# alertmanager.yaml
global:
  slack_api_url: 'https://hooks.slack.com/services/...'

route:
  group_by: ['alertname', 'service']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 1h
  receiver: 'default'
  routes:
    - match:
        severity: critical
      receiver: 'pagerduty-critical'
      continue: true
    - match:
        severity: warning
      receiver: 'slack-warnings'

receivers:
  - name: 'default'
    slack_configs:
      - channel: '#alerts'
        text: '{{ .CommonAnnotations.summary }}'

  - name: 'pagerduty-critical'
    pagerduty_configs:
      - service_key: '<key>'

  - name: 'slack-warnings'
    slack_configs:
      - channel: '#alerts-warning'
        send_resolved: true
```

---

## 7. SLI / SLO / SLA

指標を **サービス レベル目標**と組み合わせる:

```yaml
# SLO Definition
service: order-service
slo:
  # 99.9% requests thành công trong 30 ngày
  - name: availability
    target: 99.9%
    indicator:
      ratio:
        good_events: http_requests_total{status!~"5.."}
        total_events: http_requests_total

  # 95% requests hoàn thành trong 200ms
  - name: latency
    target: 95%
    indicator:
      ratio:
        good_events: http_request_duration_seconds_bucket{le="0.2"}
        total_events: http_request_duration_seconds_count
```

**エラーバジェット**:
- SLO 99.9% → エラー バジェット = 0.1% = 43.8 分/月
- エラー バジェットがなくなったら、機能の導入を凍結し、信頼性を重視します

---

## 8. ベストプラクティス

**メトリクスに正しく名前を付けます:**
```
# Format: <namespace>_<subsystem>_<name>_<unit>
http_request_duration_seconds
database_queries_total
cache_hit_ratio
background_jobs_processed_total
```

**カーディナリティ制御:**
```
# ĐÚNG — cardinality thấp, controllable labels
http_requests_total{method, status_code, service}

# SAI — cardinality explode làm Prometheus OOM
http_requests_total{user_id, request_id, ip_address}
```

**事前計算コストの高いクエリの記録ルール**:
```yaml
groups:
  - name: recording_rules
    rules:
      - record: job:http_requests_total:rate5m
        expr: sum(rate(http_requests_total[5m])) by (job)
```

---

## 概要

|コンセプト |目的 |
|----------|----------|
| REDメソッド |各サービスの健全性を測定する |
| USEメソッド |インフラストラクチャ リソースの健全性の測定 |
|サービスモニター | Prometheus と Kubernetes の統合 |
|プロムQL |メトリクスのクエリと計算 |
|プロメテウスルール |アラート ルールの定義 |
|アラートマネージャー |通知のルーティングと送信 |
| SLO/SLI |信頼性目標の定量化 |

**次の記事**: ロギング — 構造化ロギング、Loki および ELK スタック
