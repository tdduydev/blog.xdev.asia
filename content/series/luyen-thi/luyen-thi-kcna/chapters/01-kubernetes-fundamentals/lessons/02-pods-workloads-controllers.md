---
id: kcna-d1-l02
title: 'Bài 2: Pods, Workloads & Controllers'
slug: 02-pods-workloads-controllers
description: >-
  Pod lifecycle. Deployments, ReplicaSets, StatefulSets, DaemonSets,
  Jobs, CronJobs. Labels, selectors, annotations.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 2
section_title: "Domain 1: Kubernetes Fundamentals (46%)"
course:
  id: lt-kcna-series-001
  title: 'Luyện thi KCNA — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai2-pods-workloads.webp" alt="Kubernetes Workload Controllers — Deployment, StatefulSet, DaemonSet, Job" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="pod">1. Pod — Đơn vị nhỏ nhất</h2>

<p>Một <strong>Pod</strong> là nhóm 1 hoặc nhiều containers chia sẻ cùng network namespace (cùng IP, port space) và storage volumes. Pod là đơn vị scheduling trong Kubernetes.</p>

<pre><code class="language-text">┌─────────────────────────────────────┐
│              POD                    │
│  IP: 10.244.1.5                     │
│  ┌────────────┐  ┌───────────────┐  │
│  │  Container │  │  Sidecar      │  │
│  │   (app)    │  │  (log-agent)  │  │
│  └────────────┘  └───────────────┘  │
│       Shared Volume: /var/log       │
└─────────────────────────────────────┘</code></pre>

<h3 id="pod-lifecycle">Pod Lifecycle</h3>

<table>
<thead><tr><th>Phase</th><th>Ý nghĩa</th><th>Debug hint</th></tr></thead>
<tbody>
<tr><td><strong>Pending</strong></td><td>Chưa được schedule hoặc đang pull image</td><td>Check events: kubectl describe pod</td></tr>
<tr><td><strong>Running</strong></td><td>Đang chạy, ít nhất 1 container đang active</td><td>Normal state</td></tr>
<tr><td><strong>Succeeded</strong></td><td>Tất cả containers thoát với code 0</td><td>Job completed</td></tr>
<tr><td><strong>Failed</strong></td><td>Ít nhất 1 container thoát với lỗi</td><td>kubectl logs --previous</td></tr>
<tr><td><strong>Unknown</strong></td><td>Không liên lạc được với node</td><td>Node network issue</td></tr>
<tr><td><strong>CrashLoopBackOff</strong></td><td>Container liên tục crash và restart</td><td>kubectl logs -p</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> <strong>CrashLoopBackOff</strong> không phải Pod phase chính thức — nó là Container state trong Waiting. Câu hỏi hay hỏi "pod phase" vs "container state".</p></blockquote>

<h2 id="workloads">2. Workload Controllers</h2>

<table>
<thead><tr><th>Controller</th><th>Dùng khi</th><th>Đặc điểm nổi bật</th></tr></thead>
<tbody>
<tr><td><strong>Deployment</strong></td><td>Stateless apps (web server, API)</td><td>Rolling update, rollback, ReplicaSet management</td></tr>
<tr><td><strong>ReplicaSet</strong></td><td>Đảm bảo N replicas (thường dùng qua Deployment)</td><td>Label selector, ít dùng trực tiếp</td></tr>
<tr><td><strong>StatefulSet</strong></td><td>Stateful apps (database, Kafka, Elasticsearch)</td><td>Stable pod names (web-0, web-1), stable storage, ordered deployment</td></tr>
<tr><td><strong>DaemonSet</strong></td><td>Agent chạy trên mọi node (logging, monitoring, network)</td><td>1 Pod/node, auto-deploy khi node mới join</td></tr>
<tr><td><strong>Job</strong></td><td>Batch task chạy đến khi hoàn thành</td><td>completions, parallelism, backoffLimit</td></tr>
<tr><td><strong>CronJob</strong></td><td>Periodic batch tasks</td><td>cron syntax, concurrencyPolicy, schedule</td></tr>
</tbody>
</table>

<h3 id="deployment-vs-statefulset">Deployment vs StatefulSet</h3>

<pre><code class="language-text">DEPLOYMENT (Stateless)          STATEFULSET (Stateful)
─────────────────────           ────────────────────────
Pod names: web-a1b2c3            Pod names: web-0, web-1, web-2
Any order scale up/down          Ordered: web-0 first, then web-1...
Shared or no storage             Each Pod gets its own PVC
Pod replaced = new identity      Pod replaced = same identity
Examples: nginx, api-server      Examples: MySQL, MongoDB, Kafka</code></pre>

<h2 id="labels">3. Labels, Selectors & Annotations</h2>

<table>
<thead><tr><th>Concept</th><th>Dùng để</th><th>Ví dụ</th></tr></thead>
<tbody>
<tr><td><strong>Labels</strong></td><td>Tag resources để select và group</td><td><code>app: frontend, env: prod</code></td></tr>
<tr><td><strong>Selectors</strong></td><td>Query resources theo labels</td><td><code>selector: {app: frontend}</code></td></tr>
<tr><td><strong>Annotations</strong></td><td>Metadata không dùng để select (build info, contact)</td><td><code>maintainer: team@company.com</code></td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Service tìm Pods qua <strong>selector</strong> matching Pod <strong>labels</strong>. Nếu selector không match, Service sẽ có empty Endpoints → traffic không đến được Pod.</p></blockquote>

<h2 id="daemonset-usecase">4. DaemonSet Use Cases</h2>

<pre><code class="language-text">NODE 1         NODE 2         NODE 3
┌──────┐       ┌──────┐       ┌──────┐
│fluentd│      │fluentd│      │fluentd│  ← Log collector DaemonSet
│ Pod  │       │ Pod  │       │ Pod  │
├──────┤       ├──────┤       ├──────┤
│calico│       │calico│       │calico│  ← CNI network plugin DaemonSet
│ Pod  │       │ Pod  │       │ Pod  │
└──────┘       └──────┘       └──────┘</code></pre>

<p>DaemonSets thường dùng cho: <strong>Fluentd/Filebeat</strong> (log collection), <strong>Prometheus Node Exporter</strong> (metrics), <strong>kube-proxy</strong> (networking), <strong>CNI plugins</strong> (Calico, Cilium).</p>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Câu hỏi exam</th><th>Đáp án</th></tr></thead>
<tbody>
<tr><td>Stateful app, cần stable identity?</td><td><strong>StatefulSet</strong></td></tr>
<tr><td>1 Pod per node (monitoring agent)?</td><td><strong>DaemonSet</strong></td></tr>
<tr><td>Stateless app với rolling update?</td><td><strong>Deployment</strong></td></tr>
<tr><td>One-time batch processing?</td><td><strong>Job</strong></td></tr>
<tr><td>Scheduled batch (nightly backup)?</td><td><strong>CronJob</strong></td></tr>
<tr><td>Pod naming pattern cho StatefulSet?</td><td><code>name-0, name-1, name-2</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> A company needs to deploy a MySQL database on Kubernetes with stable network identity and dedicated storage per replica. Which workload type should they use?</p>
<ul>
<li>A) Deployment with PersistentVolumeClaim</li>
<li>B) StatefulSet ✓</li>
<li>C) DaemonSet</li>
<li>D) ReplicaSet</li>
</ul>
<p><em>Explanation: StatefulSet provides stable Pod names (mysql-0, mysql-1), ordered deployment/scaling, and each Pod gets its own PVC via volumeClaimTemplates. These properties are essential for databases.</em></p>

<p><strong>Q2:</strong> Which workload ensures exactly one Pod runs on every node in the cluster, including future nodes that join?</p>
<ul>
<li>A) Deployment with replicas matching node count</li>
<li>B) ReplicaSet with nodeSelector</li>
<li>C) DaemonSet ✓</li>
<li>D) StatefulSet</li>
</ul>
<p><em>Explanation: DaemonSet automatically deploys one Pod per node and watches cluster membership — when a new node joins, the DaemonSet controller immediately creates a Pod on it.</em></p>

<p><strong>Q3:</strong> A Pod is in 'Pending' state. What is the MOST likely cause?</p>
<ul>
<li>A) The container application crashed</li>
<li>B) No node satisfies the scheduling requirements ✓</li>
<li>C) The liveness probe failed</li>
<li>D) The container image is corrupted</li>
</ul>
<p><em>Explanation: Pending means the Pod has been accepted but hasn't started. Most common reasons: insufficient CPU/memory on nodes, unsatisfied node affinity/taints, or PVC not bound. Check kubectl describe pod events.</em></p>
