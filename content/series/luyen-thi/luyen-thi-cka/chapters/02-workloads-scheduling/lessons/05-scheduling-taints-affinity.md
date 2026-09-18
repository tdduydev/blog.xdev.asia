---
id: cka-d2-l05
title: 'Bài 5: Scheduling — Taints, Tolerations & Affinity'
slug: 05-scheduling-taints-affinity
description: >-
  Node scheduling chi tiết: Taints và Tolerations, Node Affinity, Pod Affinity,
  Priority, resource requests trong scheduling. Hands-on CKA tasks.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 5
section_title: "Domain 2: Workloads & Scheduling (15%)"
course:
  id: lt-cka-series-001
  title: 'Luyện thi CKA — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai5-scheduling.webp" alt="Taints, Tolerations và Node Affinity trong Kubernetes" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="taints-tolerations">1. Taints & Tolerations</h2>

<pre><code class="language-text"># Add taint to node
kubectl taint nodes node1 gpu=true:NoSchedule
kubectl taint nodes node1 gpu=true:PreferNoSchedule
kubectl taint nodes node1 gpu=true:NoExecute

# Remove taint
kubectl taint nodes node1 gpu=true:NoSchedule-

# View taints on node
kubectl describe node node1 | grep -A5 Taints</code></pre>

<table>
<thead><tr><th>Taint Effect</th><th>Behavior</th></tr></thead>
<tbody>
<tr><td><strong>NoSchedule</strong></td><td>Pods không có matching toleration sẽ không được schedule</td></tr>
<tr><td><strong>PreferNoSchedule</strong></td><td>Scheduler cố tránh, nhưng không bắt buộc</td></tr>
<tr><td><strong>NoExecute</strong></td><td>Evict existing pods + không schedule mới (có thể set tolerationSeconds)</td></tr>
</tbody>
</table>

<pre><code class="language-text"># Pod toleration
spec:
  tolerations:
  - key: "gpu"
    operator: "Equal"
    value: "true"
    effect: "NoSchedule"
  # OR tolerate all taints on a node:
  - operator: "Exists"</code></pre>

<blockquote><p><strong>Exam tip:</strong> Taints/Tolerations = <strong>repulsion</strong> (node pushes pods away, pod tolerates). Node Affinity = <strong>attraction</strong> (pod prefers/requires certain nodes). Thường phải dùng kết hợp cả hai để đảm bảo pods chỉ chạy trên nodes mong muốn.</p></blockquote>

<h2 id="node-affinity">2. Node Affinity</h2>

<pre><code class="language-text">spec:
  affinity:
    nodeAffinity:
      # HARD rule: Pod MUST be on matching node
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: disktype
            operator: In
            values: [ssd, nvme]
      # SOFT rule: prefer but not required
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        preference:
          matchExpressions:
          - key: zone
            operator: In
            values: [us-east-1a]</code></pre>

<table>
<thead><tr><th>Affinity Type</th><th>Scheduling</th><th>Running</th></tr></thead>
<tbody>
<tr><td>requiredDuringScheduling<strong>IgnoredDuring</strong>Execution</td><td>Hard requirement</td><td>Pod stays even if node label removed</td></tr>
<tr><td>preferredDuringScheduling<strong>IgnoredDuring</strong>Execution</td><td>Best effort</td><td>Pod stays even if node label removed</td></tr>
<tr><td>requiredDuringScheduling<strong>RequiredDuring</strong>Execution (future)</td><td>Hard</td><td>Evict if node no longer matches</td></tr>
</tbody>
</table>

<h2 id="pod-affinity">3. Pod Affinity & Anti-Affinity</h2>

<pre><code class="language-text"># Pod anti-affinity: spread pods across nodes
spec:
  affinity:
    podAntiAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchLabels:
            app: frontend
        topologyKey: kubernetes.io/hostname  # 1 pod per node

# Pod affinity: co-locate pods (e.g., app + cache on same node)
spec:
  affinity:
    podAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchLabels:
              app: redis
          topologyKey: kubernetes.io/hostname</code></pre>

<h2 id="node-selector">4. NodeSelector (Simple)</h2>

<pre><code class="language-text"># Label node
kubectl label nodes node1 disktype=ssd

# Use in pod spec
spec:
  nodeSelector:
    disktype: ssd

# Schedule pod on specific node
spec:
  nodeName: node1  # Bypass scheduler entirely</code></pre>

<h2 id="cheatsheet">5. Cheat Sheet</h2>

<table>
<thead><tr><th>Need</th><th>Solution</th></tr></thead>
<tbody>
<tr><td>Node dành riêng cho GPU</td><td>Taint node + Pod toleration</td></tr>
<tr><td>Pod phải chạy trên SSD nodes</td><td>Node affinity (required) hoặc nodeSelector</td></tr>
<tr><td>Spread pods across nodes</td><td>Pod anti-affinity (required, topologyKey: hostname)</td></tr>
<tr><td>Co-locate app + cache</td><td>Pod affinity (preferred, topologyKey: hostname)</td></tr>
<tr><td>Schedule trên specific node</td><td>spec.nodeName hoặc nodeSelector</td></tr>
</tbody>
</table>

<h2 id="practice">6. Practice Questions</h2>

<p><strong>Q1:</strong> A node has been tainted with <code>dedicated=database:NoExecute</code>. A running Pod without tolerations is on this node. What happens?</p>
<ul>
<li>A) The Pod continues running; NoExecute only affects new Pods</li>
<li>B) The Pod is evicted immediately ✓</li>
<li>C) The Pod is evicted after 5 minutes</li>
<li>D) The Pod gets an error but continues running</li>
</ul>
<p><em>Explanation: NoExecute evicts existing Pods that don't tolerate the taint. The eviction is immediate unless the Pod has a toleration with tolerationSeconds (which allows it to remain for that duration before eviction).</em></p>

<p><strong>Q2:</strong> You want Pods of "frontend" Deployment to never run on the same node as each other. Which configuration achieves this?</p>
<ul>
<li>A) Node affinity with required rule</li>
<li>B) Taint each node after the first frontend Pod runs</li>
<li>C) Pod anti-affinity with required rule and topologyKey: kubernetes.io/hostname ✓</li>
<li>D) Use DaemonSet instead of Deployment</li>
</ul>
<p><em>Explanation: Pod anti-affinity with requiredDuringScheduling and topologyKey of hostname ensures no two Pods with matching labels land on the same node. This is the preferred way to spread Pods for high availability.</em></p>

<p><strong>Q3:</strong> A Pod has nodeAffinity with "requiredDuringSchedulingIgnoredDuringExecution" targeting nodes with label <code>zone=east</code>. After scheduling, the label is removed from the node. What happens to the running Pod?</p>
<ul>
<li>A) The Pod is immediately evicted</li>
<li>B) The Pod continues running ✓</li>
<li>C) The Pod restarts on a matching node</li>
<li>D) The Pod enters Pending state</li>
</ul>
<p><em>Explanation: "IgnoredDuringExecution" means the affinity rule only applies at scheduling time. Once running, removing the label doesn't affect the Pod. Future replacements (after crash/update) would fail to schedule if no matching node exists.</em></p>
