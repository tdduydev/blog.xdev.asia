---
id: 019c9618-0501-7000-8000-c1147ba22e15
title: 'BÀI 28: OBSERVABILITY STACK 2026 — PLG + OPENTELEMETRY'
slug: bai-28-observability-stack-2026-plg-opentelemetry
description: >-
  3 pillars of observability với OpenTelemetry chuẩn 2026. PLG stack: Prometheus (metrics), Loki (logs), Grafana (visualization). Grafana Alloy thay thế Promtail + OTel Collector. Tại sao không EFK?
duration_minutes: 90
is_free: false
video_url: null
sort_order: 28
section_title: 'Module 7: Observability & Monitoring'
course:
  id: 019c9617-fbc2-7158-96c7-1eaa77391b4e
  title: 'KUBERNETES: TỪ CƠ BẢN ĐẾN NÂNG CAO'
  slug: kubernetes-tu-co-ban-den-nang-cao
---
<h2>Observability Stack 2026 — PLG + OpenTelemetry</h2>

<p>Trong thế giới hệ thống phân tán hiện đại, việc hiểu được trạng thái bên trong của một hệ thống dựa trên những gì nó xuất ra bên ngoài chính là định nghĩa cốt lõi của <strong>Observability</strong>. Khác với monitoring truyền thống — chỉ đặt câu hỏi "hệ thống có đang hoạt động không?" — observability cho phép bạn hỏi "tại sao hệ thống lại hoạt động như vậy?" ngay cả với những tình huống bạn chưa từng lường trước.</p>

<p>Bài học này sẽ giới thiệu toàn diện về Observability Stack được khuyến nghị cho năm 2026, bao gồm ba trụ cột quan sát, tiêu chuẩn OpenTelemetry, sự đối lập giữa PLG và EFK stack, và vai trò của Grafana Alloy như một unified collector.</p>

<img src="/storage/uploads/2026/03/k8s-observability-stack-2026.webp" alt="Kubernetes Observability Stack 2026 - Prometheus, Loki, Tempo, Grafana, OpenTelemetry" style="width:100%;max-width:800px;margin:24px auto;display:block;border-radius:12px;" />

<h2>Ba Trụ Cột Của Observability</h2>

<p>Mọi hệ thống observability đều xoay quanh ba loại tín hiệu cơ bản. Hiểu rõ từng loại và cách chúng bổ trợ cho nhau là nền tảng để xây dựng một hệ thống quan sát hiệu quả.</p>

<h3>Metrics — Dữ Liệu Số Theo Thời Gian</h3>

<p>Metrics là các giá trị số được đo lường và thu thập theo thời gian. Chúng cho phép bạn quan sát xu hướng, đặt ngưỡng cảnh báo, và phát hiện anomaly. Ví dụ: số lượng request mỗi giây, mức sử dụng CPU, latency trung bình, tỉ lệ lỗi.</p>

<p>Ưu điểm của metrics là chi phí lưu trữ thấp, query nhanh, và rất phù hợp với alerting. Tuy nhiên, metrics không thể nói cho bạn biết <em>tại sao</em> một giá trị lại bất thường — bạn cần logs và traces để điều tra sâu hơn.</p>

<h3>Logs — Bản Ghi Sự Kiện</h3>

<p>Logs là các bản ghi sự kiện được sinh ra bởi ứng dụng và hệ thống. Chúng cung cấp ngữ cảnh chi tiết nhất về những gì đã xảy ra tại một thời điểm cụ thể. Mỗi log entry thường bao gồm timestamp, severity level, message, và các trường metadata.</p>

<p>Logs rất mạnh khi bạn đã xác định được khoảng thời gian và component có vấn đề (từ metrics alert), và cần hiểu chi tiết hơn. Thách thức với logs là khối lượng dữ liệu khổng lồ và chi phí lưu trữ/query có thể rất cao.</p>

<h3>Traces — Vết Đường Đi Của Request</h3>

<p>Distributed traces theo dõi một request xuyên suốt nhiều service và component. Mỗi trace bao gồm nhiều <strong>spans</strong> — các đơn vị công việc có timestamp bắt đầu, kết thúc, tên operation, và metadata. Traces giúp bạn hiểu dependency giữa các service, xác định bottleneck, và debug các lỗi liên quan đến latency.</p>

<h3>Tại Sao Cần Cả Ba?</h3>

<p>Ba trụ cột hoạt động cùng nhau trong một quy trình điều tra điển hình:</p>
<ul>
  <li><strong>Metrics alert</strong> cảnh báo rằng error rate đang tăng cao vào lúc 2:30 AM</li>
  <li>Bạn mở <strong>Grafana dashboard</strong> để xem metrics và nhận ra service payment đang có vấn đề</li>
  <li>Bạn jump sang <strong>Loki logs</strong> cho service payment trong khoảng thời gian đó và thấy "connection refused" errors</li>
  <li>Bạn click vào một trace ID trong log line và nhảy sang <strong>Tempo traces</strong> để thấy rằng request đang bị timeout ở database call</li>
  <li>Kết luận: database connection pool bị cạn kiệt</li>
</ul>

<p>Không có một pillar nào trong ba pillar đó có thể cung cấp đủ thông tin một mình. Sức mạnh nằm ở sự kết hợp và tương quan giữa chúng.</p>

<h2>OpenTelemetry — Chuẩn Duy Nhất 2026</h2>

<p>Trước OpenTelemetry, mỗi vendor (Datadog, New Relic, Jaeger, Zipkin...) đều có SDK và agent riêng. Việc thay đổi vendor đồng nghĩa với việc viết lại code instrumentation. OpenTelemetry (OTel) ra đời để giải quyết vấn đề vendor lock-in này.</p>

<h3>OpenTelemetry Là Gì?</h3>

<p>OpenTelemetry là một CNCF Graduated Project — tiêu chuẩn công nghiệp cho việc thu thập và xuất telemetry data (metrics, logs, traces). Được hình thành từ sự hợp nhất của OpenCensus và OpenTracing vào năm 2019, đến 2026 OTel đã trở thành tiêu chuẩn không thể bàn cãi trong cloud-native ecosystem.</p>

<h3>Vendor-Agnostic Architecture</h3>

<p>Kiến trúc OTel tách biệt rõ ràng giữa instrumentation (cách thu thập data) và export (gửi data đi đâu). Bạn instrumentation một lần, sau đó có thể gửi data đến Prometheus, Jaeger, Datadog, New Relic hay bất kỳ backend nào chỉ bằng cách thay đổi cấu hình exporter.</p>

<h3>Auto-Instrumentation — Không Cần Thay Đổi Code</h3>

<p>Một trong những tính năng mạnh mẽ nhất của OTel là khả năng auto-instrumentation. Với các ngôn ngữ phổ biến như Java, Python, Node.js, và .NET, OTel có thể tự động inject instrumentation mà không cần developer thay đổi bất kỳ dòng code nào. Điều này đặc biệt hữu ích cho:</p>
<ul>
  <li>Legacy applications không có instrumentation</li>
  <li>Third-party libraries mà bạn không kiểm soát source code</li>
  <li>Rapid rollout instrumentation cho toàn bộ fleet</li>
</ul>

<h3>OTLP Protocol — Unified Transport</h3>

<p>OpenTelemetry Line Protocol (OTLP) là giao thức thống nhất cho việc truyền tải metrics, logs, và traces. OTLP hỗ trợ cả gRPC (port 4317) và HTTP (port 4318). Việc có một protocol duy nhất cho tất cả ba loại signal giúp đơn giản hóa đáng kể việc cấu hình network, firewall rules, và load balancing.</p>

<h3>OpenTelemetry Operator cho Kubernetes</h3>

<p>OpenTelemetry Operator là một Kubernetes Operator quản lý việc deploy và cấu hình OTel Collectors và auto-instrumentation. Nó cung cấp hai CRDs chính:</p>
<ul>
  <li><strong>OpenTelemetryCollector</strong>: deploy và configure OTel Collector instances</li>
  <li><strong>Instrumentation</strong>: configure auto-instrumentation cho các workloads</li>
</ul>

<pre><code class="language-yaml">apiVersion: opentelemetry.io/v1alpha1
kind: Instrumentation
metadata:
  name: my-instrumentation
spec:
  exporter:
    endpoint: http://otel-collector:4317
  propagators:
    - tracecontext
    - baggage
  sampler:
    type: parentbased_traceidratio
    argument: "0.1"
  java:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-java:latest
  nodejs:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-nodejs:latest
  python:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-python:latest
</code></pre>

<p>Sau khi apply Instrumentation CRD, bạn chỉ cần thêm annotation vào Pod để kích hoạt auto-instrumentation:</p>

<pre><code class="language-yaml">annotations:
  instrumentation.opentelemetry.io/inject-java: "true"
</code></pre>

<h2>PLG Stack vs EFK Stack</h2>

<p>Hai stack phổ biến nhất cho log aggregation và observability trong Kubernetes là PLG (Prometheus + Loki + Grafana) và EFK (Elasticsearch + Fluentd/Fluent Bit + Kibana). Lựa chọn giữa chúng phụ thuộc vào use case cụ thể.</p>

<h3>PLG Stack — Nhẹ, Cheap, Label-Based</h3>

<p>PLG stack được thiết kế cho cloud-native environments với triết lý "index labels, not content":</p>
<ul>
  <li><strong>Prometheus</strong>: thu thập và lưu trữ metrics dạng time series</li>
  <li><strong>Loki</strong>: log aggregation với label-based indexing (giống Prometheus nhưng cho logs)</li>
  <li><strong>Grafana</strong>: unified visualization cho tất cả data sources</li>
</ul>

<p>Loki không index nội dung log (chỉ index labels), điều này giúp chi phí lưu trữ và vận hành thấp hơn đáng kể so với Elasticsearch. Tradeoff là full-text search kém mạnh hơn. Nhưng với hầu hết use cases — query theo service, namespace, time range, pattern matching — Loki hoàn toàn đủ dùng.</p>

<h3>EFK Stack — Full-Text Search, Nặng Hơn</h3>

<p>EFK stack được tối ưu cho full-text search và analytics phức tạp:</p>
<ul>
  <li><strong>Elasticsearch</strong>: full-text indexed log storage, rất mạnh về search</li>
  <li><strong>Fluentd/Fluent Bit</strong>: log collector và processor</li>
  <li><strong>Kibana</strong>: visualization và search UI cho Elasticsearch</li>
</ul>

<p>Elasticsearch index toàn bộ nội dung log, cho phép full-text search cực kỳ mạnh mẽ. Tuy nhiên, điều này đi kèm với chi phí: Elasticsearch tiêu thụ nhiều RAM và CPU hơn đáng kể, yêu cầu cluster minimum 3 nodes để đảm bảo HA, và chi phí vận hành cao hơn nhiều.</p>

<h3>Khi Nào Dùng EFK?</h3>

<p>Chọn EFK khi:</p>
<ul>
  <li>Cần full-text search trong log content (ví dụ: search theo error message tùy ý)</li>
  <li>Cần complex aggregations và analytics trên log data</li>
  <li>Team đã có kinh nghiệm với Elasticsearch</li>
  <li>Budget không phải vấn đề và cần enterprise features của Elastic</li>
</ul>

<p>Với phần lớn các team, PLG stack là lựa chọn tốt hơn cho Kubernetes observability vào 2026. Chi phí vận hành thấp hơn, tích hợp tốt hơn với Prometheus ecosystem, và khả năng scale tốt hơn trên object storage.</p>

<h2>Grafana Alloy — Unified Collector</h2>

<p>Grafana Alloy (GA từ 2024, thay thế Grafana Agent) là unified telemetry collector kế thừa và hợp nhất nhiều tools trước đó:</p>
<ul>
  <li>Thay thế <strong>Promtail</strong> (log collector cho Loki)</li>
  <li>Thay thế <strong>Prometheus remote_write agent</strong></li>
  <li>Thay thế <strong>OTel Collector</strong> cho nhiều use cases</li>
  <li>Thay thế <strong>Grafana Agent</strong> (predecessor)</li>
</ul>

<h3>River DSL Configuration</h3>

<p>Alloy sử dụng River DSL — một configuration language riêng của Grafana, dựa trên HCL (Terraform). River có khả năng khai báo pipelines với components kết nối với nhau:</p>

<pre><code class="language-yaml">// Collect logs từ Kubernetes pods
loki.source.kubernetes "pods" {
  targets    = discovery.kubernetes.pods.targets
  forward_to = [loki.write.local.receiver]
}

// Discover Kubernetes pods
discovery.kubernetes "pods" {
  role = "pod"
}

// Write logs to Loki
loki.write "local" {
  endpoint {
    url = "http://loki:3100/loki/api/v1/push"
  }
}

// Collect metrics via Prometheus scrape
prometheus.scrape "default" {
  targets    = prometheus.operator.servicemonitors.targets
  forward_to = [prometheus.remote_write.mimir.receiver]
}

// Forward metrics to Prometheus/Mimir
prometheus.remote_write "mimir" {
  endpoint {
    url = "http://mimir:9009/api/v1/push"
  }
}
</code></pre>

<h3>Thu Thập Metrics, Logs, Traces Từ Một Agent</h3>

<p>Thay vì chạy 3-4 DaemonSets riêng biệt (Promtail, node-exporter, OTel Collector...), Alloy cho phép chạy một DaemonSet duy nhất đảm nhiệm tất cả. Điều này giảm thiểu:</p>
<ul>
  <li>Số lượng Pods chạy trên mỗi node</li>
  <li>Overhead của container runtime</li>
  <li>Complexity của configuration management</li>
  <li>Network connections đến backends</li>
</ul>

<h2>Stack Khuyến Nghị 2026</h2>

<p>Dựa trên thực tế vận hành và xu hướng cộng đồng, đây là observability stack khuyến nghị cho Kubernetes vào năm 2026:</p>

<h3>Components Chính</h3>
<ul>
  <li><strong>Metrics</strong>: Prometheus + kube-state-metrics + node-exporter</li>
  <li><strong>Logs</strong>: Loki (với object storage backend cho production)</li>
  <li><strong>Traces</strong>: Grafana Tempo</li>
  <li><strong>Visualization</strong>: Grafana</li>
  <li><strong>Collector</strong>: Grafana Alloy (DaemonSet trên mỗi node)</li>
  <li><strong>Instrumentation Standard</strong>: OpenTelemetry</li>
</ul>

<h3>Architecture Flow</h3>

<p>Luồng dữ liệu trong stack này như sau:</p>

<pre><code class="language-bash"># Layer 1: Data Sources
[Application Pods]  →  OTel SDK / auto-instrumentation
[Kubernetes API]    →  kube-state-metrics
[Node OS]          →  node-exporter

# Layer 2: Collection
[Grafana Alloy DaemonSet] ← scrape metrics, collect logs, receive traces via OTLP

# Layer 3: Storage Backends
[Alloy] → [Prometheus]   (metrics, 15 days retention)
[Alloy] → [Loki]         (logs, with S3 backend)
[Alloy] → [Tempo]        (traces, with S3 backend)

# Layer 4: Visualization
[Prometheus] → [Grafana]
[Loki]       → [Grafana]
[Tempo]      → [Grafana]
</code></pre>

<p>Điểm mạnh của kiến trúc này là tất cả visualization đều qua một cửa: Grafana. Bạn có thể drill down từ metrics → logs → traces mà không cần rời khỏi Grafana UI, và có thể correlate data theo trace ID hoặc time range.</p>

<h2>kube-prometheus-stack Helm Chart</h2>

<p>Thay vì cài từng component một, <strong>kube-prometheus-stack</strong> là Helm chart all-in-one tích hợp:</p>
<ul>
  <li>Prometheus Operator</li>
  <li>Prometheus instances</li>
  <li>AlertManager</li>
  <li>Grafana</li>
  <li>kube-state-metrics</li>
  <li>node-exporter</li>
  <li>Default dashboards và alert rules cho Kubernetes</li>
</ul>

<pre><code class="language-bash"># Add Helm repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install kube-prometheus-stack
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --values values.yaml
</code></pre>

<p>File values.yaml cơ bản để bắt đầu:</p>

<pre><code class="language-yaml">grafana:
  adminPassword: "your-secure-password"
  persistence:
    enabled: true
    size: 10Gi
  ingress:
    enabled: true
    hosts:
      - grafana.example.com

prometheus:
  prometheusSpec:
    retention: 15d
    storageSpec:
      volumeClaimTemplate:
        spec:
          storageClassName: standard
          accessModes: ["ReadWriteOnce"]
          resources:
            requests:
              storage: 50Gi

alertmanager:
  alertmanagerSpec:
    storage:
      volumeClaimTemplate:
        spec:
          storageClassName: standard
          resources:
            requests:
              storage: 5Gi
</code></pre>

<p>Sau khi cài kube-prometheus-stack, bạn đã có đầy đủ metrics và alerting cho Kubernetes cluster. Bước tiếp theo là thêm Loki (logs) và Tempo (traces) để hoàn thiện observability stack.</p>

<h2>Tổng Kết</h2>

<p>Observability không phải là một tính năng có thể thêm vào sau — nó cần được thiết kế từ đầu. Năm 2026, OpenTelemetry đã trở thành chuẩn không thể bàn cãi, và PLG stack với Grafana Alloy là lựa chọn thực tế nhất cho hầu hết các team Kubernetes.</p>

<p>Trong các bài học tiếp theo, chúng ta sẽ đi sâu vào từng component:</p>
<ul>
  <li><strong>Bài 29</strong>: Prometheus Operator, ServiceMonitor, PromQL, AlertManager</li>
  <li><strong>Bài 30</strong>: Loki, Tempo, và correlated observability</li>
  <li><strong>Bài 31</strong>: Debugging và troubleshooting Kubernetes</li>
  <li><strong>Thực hành 7</strong>: Deploy toàn bộ stack và thực hành end-to-end</li>
</ul>
