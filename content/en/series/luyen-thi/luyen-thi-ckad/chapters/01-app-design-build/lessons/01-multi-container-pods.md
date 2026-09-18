---
id: ckad-d1-l01
title: 'Lesson 1: Multi-container Pods & Init Containers'
slug: 01-multi-container-pods
description: >-
  Multi-container Pod patterns: Sidecar, Ambassador, Adapter. Init Containers
  for prerequisites. Shared volumes between containers. CKAD hands-on tasks.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 1
section_title: "Domain 1: Application Design and Build (20%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD Exam Prep — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai1-multicontainer.webp" alt="Multi-Container Pod Patterns — Sidecar, Ambassador, Adapter and Init Containers" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="multi-container">1. Multi-container Pod Patterns</h2>

<p>Containers in the same Pod share: network (same IP), IPC, and can share storage volumes. Use multiple containers when they need tight coordination.</p>

<table>
<thead><tr><th>Pattern</th><th>Role</th><th>Real-world Example</th></tr></thead>
<tbody>
<tr><td><strong>Sidecar</strong></td><td>Extend/enhance the main container (same lifecycle)</td><td>Log shipper, service mesh proxy (Envoy), config reloader</td></tr>
<tr><td><strong>Ambassador</strong></td><td>Proxy traffic to/from the main container</td><td>Local proxy cache, connection multiplexer</td></tr>
<tr><td><strong>Adapter</strong></td><td>Transform the main container's output</td><td>Metrics format converter (app → Prometheus format)</td></tr>
</tbody>
</table>

<pre><code class="language-text">Sidecar Pattern:
┌─────────────────────────────────────────────┐
│                    POD                      │
│  ┌──────────────┐    ┌─────────────────┐    │
│  │  App         │    │  Log Sidecar    │    │
│  │  Container   │    │  (Fluentd)      │    │
│  └──────┬───────┘    └────────┬────────┘    │
│         │                     │             │
│         └──── Shared Volume ──┘             │
│              /var/log/app                   │
└─────────────────────────────────────────────┘</code></pre>

<h2 id="multi-container-yaml">2. Multi-container Pod YAML</h2>

<pre><code class="language-text">apiVersion: v1
kind: Pod
metadata:
  name: web-with-sidecar
spec:
  containers:
  - name: web
    image: nginx:1.21
    volumeMounts:
    - name: shared-logs
      mountPath: /var/log/nginx

  - name: log-shipper
    image: fluent/fluentd:v1.14
    volumeMounts:
    - name: shared-logs
      mountPath: /var/log/nginx
      readOnly: true  # Sidecar reads, doesn't write

  volumes:
  - name: shared-logs
    emptyDir: {}     # Ephemeral, lost when pod deleted</code></pre>

<blockquote><p><strong>Exam tip:</strong> CKAD often gives tasks to create Pods with a sidecar container. Key points: you need a shared volume for containers to communicate, and both containers must mount the volume at the correct path. Sidecars typically mount with <code>readOnly: true</code>.</p></blockquote>

<h2 id="init-containers">3. Init Containers</h2>

<p><strong>Init Containers</strong> run before main containers and must complete successfully before the Pod starts. Use for: DB migration, waiting for a dependency, pre-populating a volume.</p>

<pre><code class="language-text">apiVersion: v1
kind: Pod
metadata:
  name: app-with-init
spec:
  initContainers:
  - name: wait-for-db
    image: busybox
    command: ['sh', '-c', 'until nc -z postgres-service 5432; do sleep 2; done']

  - name: db-migrate
    image: myapp:1.0
    command: ['python', 'manage.py', 'migrate']

  containers:
  - name: app
    image: myapp:1.0
    ports:
    - containerPort: 8000</code></pre>

<table>
<thead><tr><th>Property</th><th>Init Container</th><th>Regular Container</th></tr></thead>
<tbody>
<tr><td>Execution order</td><td>Sequential, all before app</td><td>Parallel start</td></tr>
<tr><td>Must complete?</td><td>Yes (exit 0)</td><td>Runs continuously</td></tr>
<tr><td>Liveness probe</td><td>Not supported</td><td>Supported</td></tr>
<tr><td>Resources</td><td>Counted separately</td><td>Normal requests/limits</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">4. Cheat Sheet</h2>

<table>
<thead><tr><th>Exam Question</th><th>Answer</th></tr></thead>
<tbody>
<tr><td>Log collection from app container?</td><td><strong>Sidecar</strong> with shared volume</td></tr>
<tr><td>Wait for service before starting?</td><td><strong>Init Container</strong></td></tr>
<tr><td>Run DB migration before app?</td><td><strong>Init Container</strong> with migration command</td></tr>
<tr><td>Shared storage between containers?</td><td><strong>emptyDir</strong> volume</td></tr>
</tbody>
</table>

<h2 id="practice">5. Practice Questions</h2>

<p><strong>Q1:</strong> You need to ensure a Pod's main application only starts after a config file is downloaded from an external URL. What is the best approach?</p>
<ul>
<li>A) Use a Sidecar container to download the file</li>
<li>B) Use an Init Container that runs wget and completes before the main container starts ✓</li>
<li>C) Use a DaemonSet to pre-populate config on all nodes</li>
<li>D) Mount a ConfigMap as the initial configuration</li>
</ul>
<p><em>Explanation: Init Containers run sequentially before main containers and must complete (exit 0). They're perfect for "prerequisites" like downloading config, waiting for services, or running migrations. Sidecar runs in parallel alongside the main container.</em></p>

<p><strong>Q2:</strong> Two containers in the same Pod need to share data. Container A writes to /tmp/data, Container B reads from /tmp/data. What should you configure?</p>
<ul>
<li>A) ExternalDNS shared volume</li>
<li>B) emptyDir volume mounted at /tmp/data in both containers ✓</li>
<li>C) A PersistentVolumeClaim for each container</li>
<li>D) ConfigMap mounted as a volume</li>
</ul>
<p><em>Explanation: emptyDir is created when a Pod is assigned to a Node, and deleted when the Pod is removed. It's perfect for sharing ephemeral data between containers in the same Pod. Both containers mount it at the same path.</em></p>

<p><strong>Q3:</strong> A Pod has a single Init Container that keeps failing (exit code 1). What happens to the main application container?</p>
<ul>
<li>A) The main container starts after a timeout</li>
<li>B) The main container is skipped and the Pod succeeds</li>
<li>C) The main container never starts; Pod shows Init:Error or Init:CrashLoopBackOff ✓</li>
<li>D) The init container failure is ignored if main container is defined</li>
</ul>
<p><em>Explanation: Init Containers MUST exit with code 0. If they fail, Kubernetes restarts them based on Pod's restartPolicy. The main container never starts until all init containers complete successfully.</em></p>
