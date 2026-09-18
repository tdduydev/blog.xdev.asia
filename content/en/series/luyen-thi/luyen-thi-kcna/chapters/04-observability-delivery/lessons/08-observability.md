---
id: kcna-d4-l08
title: 'Lesson 8: Cloud Native Observability'
slug: 08-observability
description: >-
  Three pillars of Observability: Metrics, Logs, Traces. Prometheus, Grafana,
  OpenTelemetry, Jaeger, Loki and observability in Kubernetes.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 8
section_title: "Domain 4: Cloud Native Observability & Security (16%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA Exam Prep — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai8-observability.webp" alt="Three Pillars of Observability — Metrics, Logs, Traces" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="three-pillars">1. Three Pillars of Observability</h2>

<p>Observability is the ability to understand the internal state of a system through its external signals. It consists of 3 pillars:</p>

<table>
<thead><tr><th>Pillar</th><th>What it is</th><th>What question it answers</th><th>Tool</th></tr></thead>
<tbody>
<tr><td><strong>Metrics</strong></td><td>Aggregated numerical data over time</td><td>"What is the current state of the system?"</td><td>Prometheus + Grafana</td></tr>
<tr><td><strong>Logs</strong></td><td>Text event lines from each service</td><td>"What happened?"</td><td>Loki, Elasticsearch, Fluentd</td></tr>
<tr><td><strong>Traces</strong></td><td>Request flow across multiple services</td><td>"Where did the request go and how long did it take?"</td><td>Jaeger, Zipkin, Tempo</td></tr>
</tbody>
</table>

<pre><code class="language-text">User request fails → Use 3 pillars:

  METRICS: CPU spike at 14:05?
  LOGS: Error "DB timeout" in service B  
  TRACES: Request A→B→C, step B took 8s  

  → Root cause: Service B DB connection pool exhausted</code></pre>

<blockquote><p><strong>Exam tip:</strong> KCNA often asks "which tool" for each pillar. Prometheus = metrics. Grafana = visualization. Jaeger = distributed tracing. Loki = log aggregation.</p></blockquote>

<h2 id="prometheus">2. Prometheus & Metrics</h2>

<p><strong>Prometheus</strong> is a CNCF graduated project for monitoring and alerting. It uses a pull-based model: Prometheus scrapes metrics from targets.</p>

<pre><code class="language-text">Prometheus Architecture:
  App (exposes /metrics)
       ↑ scrape
  Prometheus Server ──► Alert Manager ──► Slack/PagerDuty
       │
  Grafana (query PromQL → charts)</code></pre>

<table>
<thead><tr><th>Metric Type</th><th>Meaning</th><th>Example</th></tr></thead>
<tbody>
<tr><td><strong>Counter</strong></td><td>Only increases (resets on restart)</td><td>http_requests_total</td></tr>
<tr><td><strong>Gauge</strong></td><td>Can go up and down freely</td><td>memory_usage_bytes</td></tr>
<tr><td><strong>Histogram</strong></td><td>Distribution, quantile</td><td>request_duration_seconds</td></tr>
<tr><td><strong>Summary</strong></td><td>Pre-computed quantiles</td><td>response_size_summary</td></tr>
</tbody>
</table>

<h2 id="opentelemetry">3. OpenTelemetry (OTel)</h2>

<p><strong>OpenTelemetry</strong> is the CNCF standard for collecting telemetry (metrics, logs, traces) with vendor-neutral SDKs and a Collector.</p>

<pre><code class="language-text">OpenTelemetry Flow:
  App (instrumented with OTel SDK)
       │ OTLP (protocol)
  OTel Collector (receive, process, export)
       │
  ┌────┴────┐
 Jaeger   Prometheus   Loki
(traces)  (metrics)   (logs)</code></pre>

<blockquote><p><strong>Exam tip:</strong> OpenTelemetry separates vendor-specific code from apps — you only need to change the OTel Collector config to switch from Jaeger to Zipkin without modifying app code.</p></blockquote>

<h2 id="k8s-observability">4. Observability in Kubernetes</h2>

<table>
<thead><tr><th>Component</th><th>Provides</th></tr></thead>
<tbody>
<tr><td><strong>kubelet /metrics</strong></td><td>Node resource metrics for Prometheus</td></tr>
<tr><td><strong>metrics-server</strong></td><td>CPU/Memory for kubectl top, HPA</td></tr>
<tr><td><strong>kube-state-metrics</strong></td><td>Kubernetes object state (Pod, Deployment status)</td></tr>
<tr><td><strong>Prometheus Operator</strong></td><td>Deploy Prometheus stack with CRDs (ServiceMonitor)</td></tr>
<tr><td><strong>Loki + Promtail</strong></td><td>Log aggregation (Promtail collects logs from nodes)</td></tr>
</tbody>
</table>

<h3 id="kubectl-debug">kubectl debugging commands</h3>

<pre><code class="language-text">kubectl logs pod-name              # Current container logs
kubectl logs pod-name --previous   # Last crashed container logs
kubectl logs -f pod-name           # Stream live logs
kubectl describe pod pod-name      # Events + status details
kubectl top pod                    # CPU/Memory (needs metrics-server)
kubectl top node                   # Node resource usage</code></pre>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Exam question</th><th>Answer</th></tr></thead>
<tbody>
<tr><td>3 pillars of observability?</td><td><strong>Metrics, Logs, Traces</strong></td></tr>
<tr><td>Distributed tracing tool?</td><td><strong>Jaeger</strong>, Zipkin, Tempo</td></tr>
<tr><td>Kubernetes metrics collection?</td><td><strong>Prometheus</strong></td></tr>
<tr><td>Visualization dashboard?</td><td><strong>Grafana</strong></td></tr>
<tr><td>Vendor-neutral telemetry standard?</td><td><strong>OpenTelemetry</strong></td></tr>
<tr><td>What does kubectl top require?</td><td><strong>metrics-server</strong></td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> A team needs to trace how a single HTTP request flows through 5 microservices to find which service adds the most latency. Which observability tool should they use?</p>
<ul>
<li>A) Prometheus</li>
<li>B) Grafana</li>
<li>C) Jaeger ✓</li>
<li>D) Loki</li>
</ul>
<p><em>Explanation: Distributed tracing (Jaeger, Zipkin) tracks a request's entire flow across multiple services, showing each hop's latency and relationships. Prometheus shows aggregate metrics; Loki shows logs; Grafana is visualization.</em></p>

<p><strong>Q2:</strong> What type of Prometheus metric would you use to track the total number of HTTP requests served since startup?</p>
<ul>
<li>A) Gauge</li>
<li>B) Histogram</li>
<li>C) Counter ✓</li>
<li>D) Summary</li>
</ul>
<p><em>Explanation: Counter is a monotonically increasing metric — it only goes up (or resets to 0 on restart). Perfect for tracking cumulative events like requests, errors, or bytes transferred. Gauge is for values that go up and down (like memory usage).</em></p>

<p><strong>Q3:</strong> Which framework allows developers to instrument their application once and export telemetry to multiple backends (Jaeger, Prometheus, etc.) without code changes?</p>
<ul>
<li>A) Prometheus client libraries</li>
<li>B) OpenTelemetry ✓</li>
<li>C) Kubernetes metrics-server</li>
<li>D) Grafana Agent</li>
</ul>
<p><em>Explanation: OpenTelemetry provides vendor-neutral APIs and SDKs for generating traces, metrics, and logs. The OTel Collector routes telemetry to different backends. Switching backends requires only Collector config changes, not application code.</em></p>
