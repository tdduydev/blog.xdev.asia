---
id: kcna-d4-l08
title: '第8課：雲原生可觀測性'
slug: 08-observability
description: >-
  可觀測性三大支柱：Metrics、Logs、Traces。Prometheus、Grafana、
  OpenTelemetry、Jaeger、Loki 與 Kubernetes 中的可觀測性。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 8
section_title: "Domain 4: Cloud Native Observability & Security (16%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA 認證備考 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai8-observability.webp" alt="可觀測性三大支柱 — Metrics、Logs、Traces" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="three-pillars">1. 可觀測性三大支柱</h2>

<p>可觀測性是透過外部訊號了解系統內部狀態的能力，包含 3 個支柱：</p>

<table>
<thead><tr><th>支柱</th><th>是什麼</th><th>回答的問題</th><th>工具</th></tr></thead>
<tbody>
<tr><td><strong>Metrics</strong></td><td>隨時間彙總的數值資料</td><td>「系統目前處於什麼狀態？」</td><td>Prometheus + Grafana</td></tr>
<tr><td><strong>Logs</strong></td><td>各服務的文字事件記錄</td><td>「發生了什麼事？」</td><td>Loki、Elasticsearch、Fluentd</td></tr>
<tr><td><strong>Traces</strong></td><td>跨多個服務的請求流程</td><td>「請求經過哪裡？花了多長時間？」</td><td>Jaeger、Zipkin、Tempo</td></tr>
</tbody>
</table>

<pre><code class="language-text">User request fails → Use 3 pillars:

  METRICS: CPU spike at 14:05?
  LOGS: Error "DB timeout" in service B  
  TRACES: Request A→B→C, step B took 8s  

  → Root cause: Service B DB connection pool exhausted</code></pre>

<blockquote><p><strong>考試重點：</strong> KCNA 經常考「哪個工具」對應哪個支柱。Prometheus = metrics。Grafana = 視覺化。Jaeger = 分散式追蹤。Loki = 日誌聚合。</p></blockquote>

<h2 id="prometheus">2. Prometheus 與 Metrics</h2>

<p><strong>Prometheus</strong> 是 CNCF graduated 專案，用於監控和告警。Pull-based 模式：Prometheus 從目標抓取指標。</p>

<pre><code class="language-text">Prometheus Architecture:
  App (exposes /metrics)
       ↑ scrape
  Prometheus Server ──► Alert Manager ──► Slack/PagerDuty
       │
  Grafana (query PromQL → charts)</code></pre>

<table>
<thead><tr><th>指標類型</th><th>含義</th><th>範例</th></tr></thead>
<tbody>
<tr><td><strong>Counter</strong></td><td>僅遞增（重啟時重置）</td><td>http_requests_total</td></tr>
<tr><td><strong>Gauge</strong></td><td>自由升降</td><td>memory_usage_bytes</td></tr>
<tr><td><strong>Histogram</strong></td><td>分佈、分位數</td><td>request_duration_seconds</td></tr>
<tr><td><strong>Summary</strong></td><td>預先計算的分位數</td><td>response_size_summary</td></tr>
</tbody>
</table>

<h2 id="opentelemetry">3. OpenTelemetry（OTel）</h2>

<p><strong>OpenTelemetry</strong> 是 CNCF 標準，用於收集遙測資料（metrics、logs、traces），提供廠商中立的 SDK 和 Collector。</p>

<pre><code class="language-text">OpenTelemetry Flow:
  App (instrumented with OTel SDK)
       │ OTLP (protocol)
  OTel Collector (receive, process, export)
       │
  ┌────┴────┐
 Jaeger   Prometheus   Loki
(traces)  (metrics)   (logs)</code></pre>

<blockquote><p><strong>考試重點：</strong> OpenTelemetry 將廠商特定程式碼從應用中分離——只需更改 OTel Collector 設定即可從 Jaeger 切換到 Zipkin，無需修改應用程式碼。</p></blockquote>

<h2 id="k8s-observability">4. Kubernetes 中的可觀測性</h2>

<table>
<thead><tr><th>元件</th><th>提供功能</th></tr></thead>
<tbody>
<tr><td><strong>kubelet /metrics</strong></td><td>提供節點資源指標給 Prometheus</td></tr>
<tr><td><strong>metrics-server</strong></td><td>提供 CPU/Memory 給 kubectl top、HPA</td></tr>
<tr><td><strong>kube-state-metrics</strong></td><td>Kubernetes 物件狀態（Pod、Deployment 狀態）</td></tr>
<tr><td><strong>Prometheus Operator</strong></td><td>使用 CRD（ServiceMonitor）部署 Prometheus 堆疊</td></tr>
<tr><td><strong>Loki + Promtail</strong></td><td>日誌聚合（Promtail 從節點收集日誌）</td></tr>
</tbody>
</table>

<h3 id="kubectl-debug">kubectl 除錯命令</h3>

<pre><code class="language-text">kubectl logs pod-name              # Current container logs
kubectl logs pod-name --previous   # Last crashed container logs
kubectl logs -f pod-name           # Stream live logs
kubectl describe pod pod-name      # Events + status details
kubectl top pod                    # CPU/Memory (needs metrics-server)
kubectl top node                   # Node resource usage</code></pre>

<h2 id="cheatsheet">5. 速查表</h2>

<table>
<thead><tr><th>考試問題</th><th>答案</th></tr></thead>
<tbody>
<tr><td>可觀測性的 3 個支柱？</td><td><strong>Metrics、Logs、Traces</strong></td></tr>
<tr><td>分散式追蹤工具？</td><td><strong>Jaeger</strong>、Zipkin、Tempo</td></tr>
<tr><td>Kubernetes 指標收集？</td><td><strong>Prometheus</strong></td></tr>
<tr><td>視覺化儀表板？</td><td><strong>Grafana</strong></td></tr>
<tr><td>廠商中立的遙測標準？</td><td><strong>OpenTelemetry</strong></td></tr>
<tr><td>kubectl top 需要什麼？</td><td><strong>metrics-server</strong></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習題</h2>

<p><strong>Q1:</strong> 團隊需要追蹤單一 HTTP 請求如何流經 5 個微服務，以找出哪個服務增加最多延遲。應使用哪個可觀測性工具？</p>
<ul>
<li>A) Prometheus</li>
<li>B) Grafana</li>
<li>C) Jaeger ✓</li>
<li>D) Loki</li>
</ul>
<p><em>解析：分散式追蹤（Jaeger、Zipkin）追蹤請求跨多個服務的完整流程，顯示每一跳的延遲和關係。Prometheus 顯示聚合指標；Loki 顯示日誌；Grafana 用於視覺化。</em></p>

<p><strong>Q2:</strong> 要追蹤自啟動以來服務處理的 HTTP 請求總數，應使用哪種 Prometheus 指標類型？</p>
<ul>
<li>A) Gauge</li>
<li>B) Histogram</li>
<li>C) Counter ✓</li>
<li>D) Summary</li>
</ul>
<p><em>解析：Counter 是單調遞增的指標——只會上升（或在重啟時重置為 0）。非常適合追蹤累計事件如請求數、錯誤數或傳輸位元組。Gauge 用於會升降的值（如記憶體使用量）。</em></p>

<p><strong>Q3:</strong> 哪個框架讓開發者只需一次儀器化即可將遙測資料匯出到多個後端（Jaeger、Prometheus 等），無需修改程式碼？</p>
<ul>
<li>A) Prometheus client libraries</li>
<li>B) OpenTelemetry ✓</li>
<li>C) Kubernetes metrics-server</li>
<li>D) Grafana Agent</li>
</ul>
<p><em>解析：OpenTelemetry 提供廠商中立的 API 和 SDK 來產生 traces、metrics 和 logs。OTel Collector 將遙測資料路由到不同後端。切換後端只需更改 Collector 設定，無需修改應用程式碼。</em></p>
