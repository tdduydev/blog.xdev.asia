---
id: kcna-d3-l07
title: 'Lesson 7: Cloud Native Architecture & Design Patterns'
slug: 07-cloud-native-architecture
description: >-
  Cloud native principles, microservices vs monolith, service mesh, 12-factor
  app, immutable infrastructure and cloud native design patterns.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 7
section_title: "Domain 3: Cloud Native Architecture (16%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA Exam Prep — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai7-cloud-native.webp" alt="Cloud Native Architecture — Microservices vs Monolith, 12-Factor App" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="cloud-native">1. Cloud Native — CNCF Definition</h2>

<p>According to the <strong>CNCF (Cloud Native Computing Foundation)</strong>, cloud native is an approach to building and running scalable applications in dynamic environments such as public, private, and hybrid clouds, using: <strong>containers, microservices, declarative APIs, and immutable infrastructure</strong>.</p>

<table>
<thead><tr><th>Principle</th><th>Meaning</th><th>Example</th></tr></thead>
<tbody>
<tr><td><strong>Containerized</strong></td><td>Package app + dependencies together</td><td>Docker image</td></tr>
<tr><td><strong>Dynamically orchestrated</strong></td><td>Automated scheduling, scaling, healing</td><td>Kubernetes</td></tr>
<tr><td><strong>Microservices</strong></td><td>Loose coupling, single responsibility</td><td>Auth service, Payment service</td></tr>
<tr><td><strong>Declarative APIs</strong></td><td>Describe desired state, not steps</td><td>kubectl apply -f deployment.yaml</td></tr>
<tr><td><strong>Immutable infrastructure</strong></td><td>Never modify running; replace instead</td><td>New image version → rolling update</td></tr>
</tbody>
</table>

<h2 id="microservices-vs-monolith">2. Microservices vs Monolith</h2>

<pre><code class="language-text">MONOLITH                          MICROSERVICES
─────────────────────             ──────────────────────────────
┌──────────────────┐              ┌────────┐ ┌────────┐ ┌─────┐
│  Auth    │  UI   │              │  Auth  │ │  Cart  │ │  UI │
│  Cart    │  API  │              │Service │ │Service │ │Svc  │
│  Payment │  DB   │              └────────┘ └────────┘ └─────┘
└──────────────────┘                   │          │         │
  Deploy as 1 unit                     └─── API Gateway ───┘
                                            │
                                       Client/Browser</code></pre>

<table>
<thead><tr><th>Aspect</th><th>Monolith</th><th>Microservices</th></tr></thead>
<tbody>
<tr><td>Deployment</td><td>All-or-nothing</td><td>Independent per service</td></tr>
<tr><td>Scaling</td><td>Scale entire app</td><td>Scale only bottleneck service</td></tr>
<tr><td>Complexity</td><td>Low (single codebase)</td><td>High (distributed)</td></tr>
<tr><td>Fault isolation</td><td>One bug crashes all</td><td>Failure contained in service</td></tr>
<tr><td>Technology</td><td>Single stack</td><td>Polyglot (best tool per service)</td></tr>
</tbody>
</table>

<h2 id="12-factor">3. 12-Factor App</h2>

<p>The <strong>12-factor app</strong> methodology defines best practices for cloud native applications:</p>

<table>
<thead><tr><th>#</th><th>Factor</th><th>Cloud Native Practice</th></tr></thead>
<tbody>
<tr><td>1</td><td><strong>Codebase</strong></td><td>1 repo per app, many deploys</td></tr>
<tr><td>2</td><td><strong>Dependencies</strong></td><td>Declare explicitly (package.json, go.mod)</td></tr>
<tr><td>3</td><td><strong>Config</strong></td><td>Store in environment (ConfigMap, Secrets)</td></tr>
<tr><td>4</td><td><strong>Backing services</strong></td><td>DB, cache = attached resources via URL</td></tr>
<tr><td>5</td><td><strong>Build/Release/Run</strong></td><td>Strict separation (CI builds, CD deploys)</td></tr>
<tr><td>6</td><td><strong>Processes</strong></td><td>Stateless processes, store state externally</td></tr>
<tr><td>7</td><td><strong>Port binding</strong></td><td>Export service via port (no web server layer)</td></tr>
<tr><td>8</td><td><strong>Concurrency</strong></td><td>Scale via process model (HPA)</td></tr>
<tr><td>9</td><td><strong>Disposability</strong></td><td>Fast startup, graceful shutdown</td></tr>
<tr><td>10</td><td><strong>Dev/Prod parity</strong></td><td>Same tools/services across environments</td></tr>
<tr><td>11</td><td><strong>Logs</strong></td><td>Treat as event streams (stdout, not files)</td></tr>
<tr><td>12</td><td><strong>Admin processes</strong></td><td>Run one-off admin tasks as Jobs</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Factors 3, 6, 9, and 11 frequently appear in KCNA questions. Factor 3 (config in env) → ConfigMap/Secret. Factor 6 (stateless) → the reason for using external storage. Factor 11 (logs as streams) → stdout → log aggregator.</p></blockquote>

<h2 id="service-mesh">4. Service Mesh</h2>

<p>As microservices grow, you need to manage: mTLS, retry, circuit breaker, and observability. A <strong>Service Mesh</strong> solves this by injecting a <strong>sidecar proxy</strong> into each Pod.</p>

<pre><code class="language-text">Without Service Mesh:          With Service Mesh (Istio):
  App A ──────────────► App B    App A ──► [Envoy] ──► [Envoy] ──► App B
  (manual TLS, retry code)         sidecar           sidecar
                                 (auto mTLS, metrics, retry, tracing)</code></pre>

<table>
<thead><tr><th>Feature</th><th>Provided by Service Mesh</th></tr></thead>
<tbody>
<tr><td>mTLS mutual authentication</td><td>Automatically encrypts traffic between services</td></tr>
<tr><td>Traffic management</td><td>Canary, A/B, weighted routing</td></tr>
<tr><td>Observability</td><td>Auto metrics, tracing, access logs</td></tr>
<tr><td>Resilience</td><td>Retry, timeout, circuit breaker</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Exam question</th><th>Answer</th></tr></thead>
<tbody>
<tr><td>What does the CNCF definition of cloud native include?</td><td>Containers, microservices, declarative APIs, immutable infra</td></tr>
<tr><td>Where should config be stored according to 12-factor?</td><td>Environment variables (not hardcoded)</td></tr>
<tr><td>Logs according to 12-factor?</td><td>Treat as streams (stdout/stderr)</td></tr>
<tr><td>What does a service mesh inject into Pods?</td><td><strong>Sidecar proxy</strong> (Envoy)</td></tr>
<tr><td>What part of microservices is scaled?</td><td>Only the service with the bottleneck</td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> According to the 12-factor app methodology, how should an application store its database connection string?</p>
<ul>
<li>A) Hardcoded in the source code</li>
<li>B) In a configuration file committed to the repository</li>
<li>C) As an environment variable (Kubernetes ConfigMap or Secret) ✓</li>
<li>D) In the container image as a build argument</li>
</ul>
<p><em>Explanation: Factor 3 (Config) states: "Store config in the environment." In Kubernetes, this means using ConfigMaps for non-sensitive config and Secrets for sensitive values, injected as environment variables.</em></p>

<p><strong>Q2:</strong> What is the primary benefit of using a Service Mesh in a microservices architecture?</p>
<ul>
<li>A) Replace Kubernetes for container orchestration</li>
<li>B) Provide infrastructure-level networking features (mTLS, retry, observability) without changing application code ✓</li>
<li>C) Store application configuration</li>
<li>D) Persist application state across container restarts</li>
</ul>
<p><em>Explanation: Service mesh moves cross-cutting concerns (security, observability, resilience) to the infrastructure layer via sidecar proxies. Developers don't need to implement retry logic or mTLS in each service.</em></p>

<p><strong>Q3:</strong> Which characteristic distinguishes "immutable infrastructure" from traditional infrastructure?</p>
<ul>
<li>A) Servers are never rebooted</li>
<li>B) Running systems are replaced rather than modified in-place ✓</li>
<li>C) Configuration changes require manual approval</li>
<li>D) Infrastructure is defined using only YAML files</li>
</ul>
<p><em>Explanation: Immutable infrastructure means you never update/patch a running container — you build a new image, deploy it, replace old containers. This eliminates configuration drift and improves repeatability.</em></p>
