---
id: kcna-d4-l08
title: 'レッスン8：クラウドネイティブオブザーバビリティ'
slug: 08-observability
description: >-
  オブザーバビリティの3本柱：メトリクス、ログ、トレース。Prometheus、Grafana、
  OpenTelemetry、Jaeger、LokiとKubernetesにおけるオブザーバビリティ。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 8
section_title: "Domain 4: Cloud Native Observability & Security (16%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA試験対策 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai8-observability.webp" alt="オブザーバビリティの3本柱 — メトリクス、ログ、トレース" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="three-pillars">1. オブザーバビリティの3本柱</h2>

<p>オブザーバビリティとは、外部からのシグナルを通じてシステムの内部状態を理解する能力です。3つの柱で構成されます：</p>

<table>
<thead><tr><th>柱</th><th>内容</th><th>回答する質問</th><th>ツール</th></tr></thead>
<tbody>
<tr><td><strong>Metrics</strong></td><td>時間経過に沿った集計データ</td><td>「システムの現在の状態は？」</td><td>Prometheus + Grafana</td></tr>
<tr><td><strong>Logs</strong></td><td>各サービスからのテキストイベント</td><td>「何が起きたか？」</td><td>Loki、Elasticsearch、Fluentd</td></tr>
<tr><td><strong>Traces</strong></td><td>複数サービスを通過するリクエストの流れ</td><td>「リクエストはどこを通り、どのくらい時間がかかったか？」</td><td>Jaeger、Zipkin、Tempo</td></tr>
</tbody>
</table>

<pre><code class="language-text">User request fails → Use 3 pillars:

  METRICS: CPU spike at 14:05?
  LOGS: Error "DB timeout" in service B  
  TRACES: Request A→B→C, step B took 8s  

  → Root cause: Service B DB connection pool exhausted</code></pre>

<blockquote><p><strong>試験のポイント：</strong> KCNAでは各柱に対応するツールがよく出題されます。Prometheus = メトリクス。Grafana = ビジュアライゼーション。Jaeger = 分散トレーシング。Loki = ログ集約。</p></blockquote>

<h2 id="prometheus">2. Prometheusとメトリクス</h2>

<p><strong>Prometheus</strong>はモニタリングとアラートのためのCNCF graduatedプロジェクトです。プルベース：Prometheusがターゲットからメトリクスをスクレイプします。</p>

<pre><code class="language-text">Prometheus Architecture:
  App (exposes /metrics)
       ↑ scrape
  Prometheus Server ──► Alert Manager ──► Slack/PagerDuty
       │
  Grafana (query PromQL → charts)</code></pre>

<table>
<thead><tr><th>メトリクスタイプ</th><th>意味</th><th>例</th></tr></thead>
<tbody>
<tr><td><strong>Counter</strong></td><td>増加のみ（再起動時にリセット）</td><td>http_requests_total</td></tr>
<tr><td><strong>Gauge</strong></td><td>自由に増減</td><td>memory_usage_bytes</td></tr>
<tr><td><strong>Histogram</strong></td><td>分布、パーセンタイル</td><td>request_duration_seconds</td></tr>
<tr><td><strong>Summary</strong></td><td>事前計算されたパーセンタイル</td><td>response_size_summary</td></tr>
</tbody>
</table>

<h2 id="opentelemetry">3. OpenTelemetry (OTel)</h2>

<p><strong>OpenTelemetry</strong>はベンダー中立のSDKとCollectorを使用してテレメトリ（メトリクス、ログ、トレース）を収集するためのCNCF標準です。</p>

<pre><code class="language-text">OpenTelemetry Flow:
  App (instrumented with OTel SDK)
       │ OTLP (protocol)
  OTel Collector (receive, process, export)
       │
  ┌────┴────┐
 Jaeger   Prometheus   Loki
(traces)  (metrics)   (logs)</code></pre>

<blockquote><p><strong>試験のポイント：</strong> OpenTelemetryはアプリからベンダー固有のコードを分離します。JaegerからZipkinへの切り替えはOTel Collectorの設定を変更するだけで、アプリコードの修正は不要です。</p></blockquote>

<h2 id="k8s-observability">4. Kubernetesにおけるオブザーバビリティ</h2>

<table>
<thead><tr><th>コンポーネント</th><th>提供するもの</th></tr></thead>
<tbody>
<tr><td><strong>kubelet /metrics</strong></td><td>Prometheus向けのノードリソースメトリクス</td></tr>
<tr><td><strong>metrics-server</strong></td><td>kubectl topとHPA向けのCPU/Memory</td></tr>
<tr><td><strong>kube-state-metrics</strong></td><td>Kubernetesオブジェクトの状態（Pod、Deploymentのステータス）</td></tr>
<tr><td><strong>Prometheus Operator</strong></td><td>CRD（ServiceMonitor）でPrometheusスタックをデプロイ</td></tr>
<tr><td><strong>Loki + Promtail</strong></td><td>ログ集約（Promtailがノードからログを収集）</td></tr>
</tbody>
</table>

<h3 id="kubectl-debug">kubectlデバッグコマンド</h3>

<pre><code class="language-text">kubectl logs pod-name              # Current container logs
kubectl logs pod-name --previous   # Last crashed container logs
kubectl logs -f pod-name           # Stream live logs
kubectl describe pod pod-name      # Events + status details
kubectl top pod                    # CPU/Memory (needs metrics-server)
kubectl top node                   # Node resource usage</code></pre>

<h2 id="cheatsheet">5. チートシート</h2>

<table>
<thead><tr><th>試験の質問</th><th>回答</th></tr></thead>
<tbody>
<tr><td>オブザーバビリティの3本柱は？</td><td><strong>メトリクス、ログ、トレース</strong></td></tr>
<tr><td>分散トレーシングツールは？</td><td><strong>Jaeger</strong>、Zipkin、Tempo</td></tr>
<tr><td>Kubernetesのメトリクス収集は？</td><td><strong>Prometheus</strong></td></tr>
<tr><td>ビジュアライゼーションダッシュボードは？</td><td><strong>Grafana</strong></td></tr>
<tr><td>ベンダー中立のテレメトリ標準は？</td><td><strong>OpenTelemetry</strong></td></tr>
<tr><td>kubectl topに必要なものは？</td><td><strong>metrics-server</strong></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習問題</h2>

<p><strong>Q1:</strong> チームが1つのHTTPリクエストが5つのマイクロサービスを通過する流れをトレースし、どのサービスが最も遅延を追加しているか調べる必要があります。どのオブザーバビリティツールを使用すべきですか？</p>
<ul>
<li>A) Prometheus</li>
<li>B) Grafana</li>
<li>C) Jaeger ✓</li>
<li>D) Loki</li>
</ul>
<p><em>解説：分散トレーシング（Jaeger、Zipkin）はリクエストの複数サービスにわたる全体の流れを追跡し、各ホップのレイテンシと関係を表示します。Prometheusは集計メトリクス、Lokiはログ、Grafanaはビジュアライゼーションです。</em></p>

<p><strong>Q2:</strong> 起動以来処理されたHTTPリクエストの合計数を追跡するために、どのタイプのPrometheusメトリクスを使用しますか？</p>
<ul>
<li>A) Gauge</li>
<li>B) Histogram</li>
<li>C) Counter ✓</li>
<li>D) Summary</li>
</ul>
<p><em>解説：Counterは単調増加メトリクスで、上がるだけです（再起動時に0にリセット）。リクエスト、エラー、転送バイト数などの累積イベントの追跡に最適です。Gaugeはメモリ使用量のように上下する値に使用します。</em></p>

<p><strong>Q3:</strong> 開発者がアプリケーションを一度インストルメント化するだけで、コード変更なしに複数のバックエンド（Jaeger、Prometheusなど）にテレメトリをエクスポートできるフレームワークはどれですか？</p>
<ul>
<li>A) Prometheusクライアントライブラリ</li>
<li>B) OpenTelemetry ✓</li>
<li>C) Kubernetes metrics-server</li>
<li>D) Grafana Agent</li>
</ul>
<p><em>解説：OpenTelemetryはトレース、メトリクス、ログを生成するためのベンダー中立のAPIとSDKを提供します。OTel Collectorがテレメトリを異なるバックエンドにルーティングします。バックエンドの切り替えにはCollectorの設定変更のみが必要で、アプリケーションコードの変更は不要です。</em></p>
