---
id: ckad-d4-l08
title: 'Lesson 8: Resource Requests, Limits & QoS'
slug: 08-resources-qos
description: >-
  Resource requests vs limits (CPU, Memory). QoS classes: Guaranteed, Burstable,
  BestEffort. LimitRange defaults and ResourceQuota namespace limits.
duration_minutes: 50
is_free: true
video_url: null
sort_order: 8
section_title: "Domain 4: Application Environment, Configuration and Security (25%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD Exam Prep — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai8-qos-classes.webp" alt="Resource Requests, Limits and QoS Classes — Guaranteed, Burstable, BestEffort" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="requests-limits">1. Requests vs Limits</h2>

<pre><code class="language-text">resources:
  requests:
    cpu: "250m"      # 250 millicores = 0.25 CPU (scheduling)
    memory: "128Mi"  # Minimum guaranteed memory
  limits:
    cpu: "500m"      # Max CPU (throttled but not killed)
    memory: "256Mi"  # Max memory (killed if exceeded → OOMKilled)</code></pre>

<table>
<thead><tr><th>Resource</th><th>When Exceeding Requests</th><th>When Exceeding Limits</th></tr></thead>
<tbody>
<tr><td><strong>CPU</strong></td><td>Runs normally (burst)</td><td>Throttled (slowed down, not killed)</td></tr>
<tr><td><strong>Memory</strong></td><td>Runs normally</td><td>Container is killed → OOMKilled</td></tr>
</tbody>
</table>

<pre><code class="language-text">CPU units:
  1 CPU = 1000m (millicores)
  0.5 CPU = 500m
  100m = 0.1 CPU

Memory units:
  Ki (Kibibyte) = 1024 bytes
  Mi (Mebibyte) = 1024 Ki
  Gi (Gibibyte) = 1024 Mi
  (NOT KB/MB/GB which are decimal)</code></pre>

<h2 id="qos">2. QoS Classes</h2>

<pre><code class="language-text">QoS = Quality of Service (controls eviction priority)

┌─────────────────────────────────────────────────────────┐
│  GUARANTEED — Last to evict                             │
│  ✓ CPU requests == CPU limits                           │
│  ✓ Memory requests == Memory limits                     │
│  ✓ ALL containers in pod must satisfy                   │
├─────────────────────────────────────────────────────────┤
│  BURSTABLE — Middle priority                            │
│  ✓ At least one container has requests OR limits        │
│  ✗ Doesn't meet Guaranteed criteria                     │
├─────────────────────────────────────────────────────────┤
│  BESTEFFORT — First to evict                            │
│  ✗ NO requests, NO limits set at all                    │
└─────────────────────────────────────────────────────────┘</code></pre>

<table>
<thead><tr><th>QoS Class</th><th>Condition</th><th>Eviction Priority</th></tr></thead>
<tbody>
<tr><td><strong>Guaranteed</strong></td><td>requests == limits for both CPU and Memory (all containers)</td><td>Lowest (last evicted)</td></tr>
<tr><td><strong>Burstable</strong></td><td>At least one container has request/limit, doesn't meet Guaranteed</td><td>Medium</td></tr>
<tr><td><strong>BestEffort</strong></td><td>No requests or limits set at all</td><td>Highest (first evicted)</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Check a pod's QoS class with: <code>kubectl describe pod &lt;name&gt; | grep -i qos</code> or <code>kubectl get pod &lt;name&gt; -o jsonpath='{.status.qosClass}'</code>. To achieve Guaranteed: set requests = limits for BOTH CPU and memory, in ALL containers (including init containers).</p></blockquote>

<h2 id="limitrange">3. LimitRange</h2>

<p>LimitRange sets default requests/limits for Pods in a namespace — applied when a Pod doesn't set its own.</p>

<pre><code class="language-text">apiVersion: v1
kind: LimitRange
metadata:
  name: mem-limit-range
  namespace: development
spec:
  limits:
  - type: Container
    default:          # Default limits (when container doesn't set limits)
      memory: 512Mi
      cpu: 500m
    defaultRequest:   # Default requests (when container doesn't set requests)
      memory: 256Mi
      cpu: 250m
    max:              # Maximum allowed limits
      memory: 1Gi
      cpu: "1"
    min:              # Minimum required requests
      memory: 64Mi
      cpu: 50m</code></pre>

<h2 id="resourcequota">4. ResourceQuota</h2>

<pre><code class="language-text">apiVersion: v1
kind: ResourceQuota
metadata:
  name: production-quota
  namespace: production
spec:
  hard:
    # Compute resources
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    limits.memory: 40Gi
    # Object counts
    pods: "50"
    services: "20"
    persistentvolumeclaims: "10"
    secrets: "30"
    configmaps: "30"</code></pre>

<blockquote><p><strong>Exam tip:</strong> If a namespace has a ResourceQuota requiring resource limits, then <strong>all Pods</strong> in that namespace MUST set resource requests and limits — or a LimitRange must provide defaults. If not set, the API server will reject Pod creation.</p></blockquote>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Scenario</th><th>Solution</th></tr></thead>
<tbody>
<tr><td>Container is OOMKilled</td><td>Increase <code>limits.memory</code></td></tr>
<tr><td>Container is throttled (slow)</td><td>Increase <code>limits.cpu</code></td></tr>
<tr><td>Pod can't be scheduled</td><td>Reduce <code>requests</code> or scale the cluster</td></tr>
<tr><td>QoS is Guaranteed</td><td><code>requests == limits</code> for CPU and Memory</td></tr>
<tr><td>Set default limits for a namespace</td><td><strong>LimitRange</strong></td></tr>
<tr><td>Limit total namespace resources</td><td><strong>ResourceQuota</strong></td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> A container has cpu requests=200m, cpu limits=500m, memory requests=256Mi, memory limits=256Mi. What is the QoS class of this Pod (assuming it's the only container)?</p>
<ul>
<li>A) Guaranteed</li>
<li>B) Burstable ✓</li>
<li>C) BestEffort</li>
<li>D) Critical</li>
</ul>
<p><em>Explanation: For Guaranteed, all requests must equal limits. Here cpu requests (200m) ≠ cpu limits (500m). Memory requests do equal limits (256Mi). Since the criteria for Guaranteed is not fully met, but resources are set, the class is Burstable.</em></p>

<p><strong>Q2:</strong> A container's memory usage exceeds its memory limit. What happens?</p>
<ul>
<li>A) The container is throttled (slowed down)</li>
<li>B) The container is terminated and restarted (OOMKilled) ✓</li>
<li>C) The container is evicted from the node</li>
<li>D) The Pod is rescheduled to a different node</li>
</ul>
<p><em>Explanation: Unlike CPU (which is compressible — throttled but not killed), memory is incompressible. When a container exceeds its memory limit, it receives an OOMKilled exit code and is restarted by the container runtime. Repeated OOMKills lead to CrashLoopBackOff.</em></p>

<p><strong>Q3:</strong> A namespace has a ResourceQuota requiring limits.memory to be set on all Pods. A new Pod is created without any resource limits. What happens?</p>
<ul>
<li>A) The Pod starts with no limits (ResourceQuota applies only to running Pods)</li>
<li>B) The Pod is rejected by the API server unless a LimitRange provides defaults ✓</li>
<li>C) The Pod starts with default limits of 512Mi</li>
<li>D) The ResourceQuota is automatically updated to exclude this Pod</li>
</ul>
<p><em>Explanation: When a ResourceQuota exists in a namespace that covers memory limits, ALL Pods must specify memory limits. If no LimitRange provides defaults, the API server rejects the Pod. Solution: either set limits on the Pod, or create a LimitRange with defaultRequest/default values for the namespace.</em></p>
