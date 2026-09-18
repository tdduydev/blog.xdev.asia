---
id: kcna-d2-l06
title: 'Bài 6: Container Orchestration Patterns'
slug: 06-orchestration-patterns
description: >-
  Scheduling, auto-scaling (HPA, VPA, Cluster Autoscaler), resource requests
  và limits, namespaces, multi-tenancy và Kubernetes upgrade strategies.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 6
section_title: "Domain 2: Container Orchestration (22%)"
course:
  id: lt-kcna-series-001
  title: 'Luyện thi KCNA — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai6-scheduling.webp" alt="Kubernetes Scheduling Pipeline và Autoscaling (HPA, VPA, Cluster Autoscaler)" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="scheduling">1. Kubernetes Scheduling</h2>

<p>Khi Pod được tạo, <strong>kube-scheduler</strong> chọn node phù hợp qua 2 bước:</p>

<pre><code class="language-text">Scheduling Pipeline:
  New Pod
    │
    ▼
  1. FILTERING: Loại bỏ nodes không đủ điều kiện
     - Không đủ CPU/Memory
     - Taint không match Toleration
     - Node Affinity không match
     │
    ▼
  2. SCORING: Chấm điểm nodes còn lại
     - Resource balance
     - Affinity preferences
     │
    ▼
  Bind Pod → Highest score Node</code></pre>

<table>
<thead><tr><th>Cơ chế</th><th>Mục đích</th><th>Ví dụ</th></tr></thead>
<tbody>
<tr><td><strong>NodeSelector</strong></td><td>Schedule Pod lên node có label</td><td><code>disktype: ssd</code></td></tr>
<tr><td><strong>Affinity/Anti-affinity</strong></td><td>Preferred/required node rules</td><td>Prefer zone-a, avoid same node as another pod</td></tr>
<tr><td><strong>Taints & Tolerations</strong></td><td>Repel Pods trừ khi Pod có Toleration</td><td>Node dành riêng cho GPU workloads</td></tr>
<tr><td><strong>Resource requests</strong></td><td>Minimum CPU/memory để schedule</td><td>requests.cpu: 500m</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> <strong>Taints</strong> áp lên Node (repel pods). <strong>Tolerations</strong> áp lên Pod (accept taint). Taint có effect: <strong>NoSchedule</strong> (không schedule mới), <strong>PreferNoSchedule</strong> (ưu tiên không schedule), <strong>NoExecute</strong> (evict pods đang chạy).</p></blockquote>

<h2 id="resources">2. Resource Requests & Limits</h2>

<table>
<thead><tr><th>Setting</th><th>Ảnh hưởng đến</th><th>Nếu vượt quá</th></tr></thead>
<tbody>
<tr><td><strong>requests.cpu</strong></td><td>Scheduling (scheduler dùng để chọn node)</td><td>Throttled (không bị kill)</td></tr>
<tr><td><strong>limits.cpu</strong></td><td>Cgroups CPU quota</td><td>CPU throttled</td></tr>
<tr><td><strong>requests.memory</strong></td><td>Scheduling</td><td>OOM Kill nếu vượt limit</td></tr>
<tr><td><strong>limits.memory</strong></td><td>Cgroups memory limit</td><td>Container bị <strong>OOM Kill</strong></td></tr>
</tbody>
</table>

<pre><code class="language-text">QoS Classes:
  Guaranteed: requests == limits (best quality, last to be evicted)
  Burstable:  requests < limits (middle)
  BestEffort: no requests, no limits (first to be evicted)</code></pre>

<h2 id="autoscaling">3. Auto-scaling</h2>

<table>
<thead><tr><th>Scaler</th><th>Scale gì</th><th>Metric</th></tr></thead>
<tbody>
<tr><td><strong>HPA</strong> (Horizontal Pod Autoscaler)</td><td>Số lượng Pod replicas</td><td>CPU%, Memory%, custom metrics</td></tr>
<tr><td><strong>VPA</strong> (Vertical Pod Autoscaler)</td><td>CPU/Memory requests của Pod</td><td>Actual usage history</td></tr>
<tr><td><strong>Cluster Autoscaler</strong></td><td>Số lượng nodes trong cluster</td><td>Pending Pods (unschedulable)</td></tr>
<tr><td><strong>KEDA</strong></td><td>Số replicas (to 0)</td><td>Event-driven (queue depth, Kafka)</td></tr>
</tbody>
</table>

<pre><code class="language-text">HPA integration:
  metrics-server → kubelet → Node/Pod metrics
       ↓
  HPA controller (checks every 15s)
       ↓
  Scale up: replicas++  (traffic spike)
  Scale down: replicas-- (traffic drops, 5 min cooldown)</code></pre>

<blockquote><p><strong>Exam tip:</strong> HPA cần <strong>metrics-server</strong> để hoạt động. VPA và HPA có thể conflict khi cùng manage một Deployment — không nên dùng cùng lúc trên cùng resource (trừ KEDA với nhiều dimension).</p></blockquote>

<h2 id="namespaces">4. Namespaces & Multi-tenancy</h2>

<p><strong>Namespaces</strong> cung cấp virtual cluster isolation: scope RBAC, ResourceQuota, NetworkPolicy, và DNS resolution.</p>

<table>
<thead><tr><th>Namespace</th><th>Purpose</th><th>Ghi chú</th></tr></thead>
<tbody>
<tr><td><code>default</code></td><td>Objects không chỉ định namespace</td><td>Dùng trong dev, không dùng prod</td></tr>
<tr><td><code>kube-system</code></td><td>Kubernetes system components</td><td>CoreDNS, kube-proxy, metrics-server</td></tr>
<tr><td><code>kube-public</code></td><td>Public, readable by all</td><td>Cluster info ConfigMap</td></tr>
<tr><td><code>kube-node-lease</code></td><td>Node heartbeat leases</td><td>Kubelet heartbeat performance</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Câu hỏi exam</th><th>Đáp án</th></tr></thead>
<tbody>
<tr><td>Scale số Pod dựa trên CPU?</td><td><strong>HPA</strong></td></tr>
<tr><td>Scale số Node trong cluster?</td><td><strong>Cluster Autoscaler</strong></td></tr>
<tr><td>Node dành riêng cho GPU, dùng gì?</td><td><strong>Taint</strong> + Pod <strong>Toleration</strong></td></tr>
<tr><td>Container bị OOM Kill, do gì?</td><td>Vượt <strong>limits.memory</strong></td></tr>
<tr><td>QoS class nào bị evict đầu tiên?</td><td><strong>BestEffort</strong></td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> A node is tainted with <code>key=gpu:NoSchedule</code>. Which Pods can be scheduled on this node?</p>
<ul>
<li>A) Any Pod in the cluster</li>
<li>B) Pods with matching Toleration for the taint ✓</li>
<li>C) Pods in the kube-system namespace only</li>
<li>D) Pods created by cluster administrators only</li>
</ul>
<p><em>Explanation: NoSchedule taint prevents any new Pod from being scheduled on the node UNLESS the Pod specifies a matching toleration. Existing Pods are not evicted (use NoExecute for that).</em></p>

<p><strong>Q2:</strong> An application's Pods keep getting OOM-killed during traffic spikes. What is the most appropriate solution?</p>
<ul>
<li>A) Increase Pod CPU requests</li>
<li>B) Configure HPA to scale based on memory usage ✓</li>
<li>C) Move the app to a new namespace</li>
<li>D) Use a StatefulSet instead of Deployment</li>
</ul>
<p><em>Explanation: OOM kills mean memory demand exceeds limits. HPA scaling out (more Pod replicas) distributes the load, reducing per-pod memory pressure. Alternatively, increase memory limits or use VPA.</em></p>

<p><strong>Q3:</strong> Which Kubernetes component provides CPU and memory metrics that HPA uses for scaling decisions?</p>
<ul>
<li>A) kube-proxy</li>
<li>B) kube-scheduler</li>
<li>C) metrics-server ✓</li>
<li>D) etcd</li>
</ul>
<p><em>Explanation: metrics-server is an optional cluster add-on that collects resource metrics (CPU, memory) from kubelets. The HPA controller queries the metrics API exposed by metrics-server to make scaling decisions.</em></p>
