---
id: cka-d2-l05
title: '第5課：排程、Taints & Affinity'
slug: 05-scheduling-taints-affinity
description: >-
  nodeSelector、nodeAffinity、podAffinity/podAntiAffinity。
  Taints & Tolerations。手動排程與 CKA 考試的排程問題。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 5
section_title: "領域2: Workloads & Scheduling (15%)"
course:
  id: lt-cka-series-001
  title: 'CKA 認證備考 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai5-scheduling.webp" alt="Kubernetes 排程機制 — nodeAffinity、Taints & Tolerations" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="nodeselector">1. nodeSelector</h2>

<pre><code class="language-text"># 為節點新增標籤
kubectl label node worker1 disktype=ssd

# 在 Pod 中使用 nodeSelector
apiVersion: v1
kind: Pod
metadata:
  name: ssd-pod
spec:
  nodeSelector:
    disktype: ssd    # 排程到有 ssd 標籤的節點
  containers:
  - name: app
    image: nginx</code></pre>

<h2 id="node-affinity">2. Node Affinity</h2>

<pre><code class="language-text">spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:  # 必要條件
        nodeSelectorTerms:
        - matchExpressions:
          - key: disktype
            operator: In
            values: ["ssd", "nvme"]
      preferredDuringSchedulingIgnoredDuringExecution:  # 偏好條件
      - weight: 80
        preference:
          matchExpressions:
          - key: zone
            operator: In
            values: ["zone-a"]</code></pre>

<table>
<thead><tr><th>類型</th><th>行為</th></tr></thead>
<tbody>
<tr><td><strong>required...IgnoredDuring...</strong></td><td>沒有符合條件的節點時，Pod 維持 Pending</td></tr>
<tr><td><strong>preferred...IgnoredDuring...</strong></td><td>偏好但非必要，沒有符合的節點仍可排程到其他節點</td></tr>
</tbody>
</table>

<h2 id="taints-tolerations">3. Taints & Tolerations</h2>

<pre><code class="language-text"># 為節點新增 Taint
kubectl taint nodes worker1 env=production:NoSchedule

# 只有具備 Toleration 的 Pod 才能排程
spec:
  tolerations:
  - key: "env"
    operator: "Equal"
    value: "production"
    effect: "NoSchedule"

# 移除 Taint（末尾加 "-"）
kubectl taint nodes worker1 env=production:NoSchedule-</code></pre>

<table>
<thead><tr><th>Effect</th><th>行為</th></tr></thead>
<tbody>
<tr><td><strong>NoSchedule</strong></td><td>不排程沒有 Toleration 的新 Pod</td></tr>
<tr><td><strong>PreferNoSchedule</strong></td><td>盡量避免排程，但沒有其他選擇時仍允許</td></tr>
<tr><td><strong>NoExecute</strong></td><td>現有的 Pod 如果沒有 Toleration 也會被驅逐</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點：</strong>Taints & Tolerations 和 Node Affinity 的差異：Taint 是節點端的「拒絕」，Affinity 是 Pod 端的「偏好」。兩者結合可以實現「特定 Pod 只在特定節點上運行」。</p></blockquote>

<h2 id="pod-affinity">4. Pod Affinity / Anti-Affinity</h2>

<pre><code class="language-text">spec:
  affinity:
    podAntiAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchLabels:
            app: web
        topologyKey: kubernetes.io/hostname  # 不放在同一節點

    podAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchLabels:
              app: cache
          topologyKey: kubernetes.io/hostname  # 跟 cache 放在同一節點</code></pre>

<h2 id="cheatsheet">5. 速查表</h2>

<table>
<thead><tr><th>任務</th><th>指令</th></tr></thead>
<tbody>
<tr><td>新增節點標籤</td><td><code>kubectl label node NODE key=value</code></td></tr>
<tr><td>新增 Taint</td><td><code>kubectl taint node NODE key=value:Effect</code></td></tr>
<tr><td>移除 Taint</td><td><code>kubectl taint node NODE key=value:Effect-</code></td></tr>
<tr><td>查看節點標籤</td><td><code>kubectl get nodes --show-labels</code></td></tr>
<tr><td>查看 Pod 排程位置</td><td><code>kubectl get pod -o wide</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習題</h2>

<p><strong>Q1：</strong>節點 worker1 有 Taint "gpu=true:NoSchedule"。沒有 Toleration 的新 Pod 會排程到這個節點嗎？</p>
<ul>
<li>A) 會，Taint 會被忽略</li>
<li>B) 不會，Pod 會排程到其他節點或維持 Pending ✓</li>
<li>C) 會，但效能會降低</li>
<li>D) Taint 不影響新 Pod</li>
</ul>
<p><em>解析：NoSchedule 的 Taint 會拒絕沒有對應 Toleration 的 Pod 排程。Pod 需要新增 Toleration 或排程到其他節點。</em></p>

<p><strong>Q2：</strong>requiredDuringSchedulingIgnoredDuringExecution 的 nodeAffinity，如果沒有符合條件的節點，Pod 會怎樣？</p>
<ul>
<li>A) 隨機排程到某個節點</li>
<li>B) Pod 維持 Pending 狀態，等待符合條件的節點可用 ✓</li>
<li>C) Pod 會自動被刪除</li>
<li>D) Pod 會因錯誤失敗</li>
</ul>
<p><em>解析："required" 是必要條件。沒有符合的節點時 Pod 會維持 Pending。使用 "preferred" 則條件是偏好但非必要。</em></p>

<p><strong>Q3：</strong>使用 podAntiAffinity 配合 topologyKey: kubernetes.io/hostname 的目的是？</p>
<ul>
<li>A) 將 Pod 放在同一個區域</li>
<li>B) 將相同標籤的 Pod 分散到不同節點 ✓</li>
<li>C) 限制 Pod 到特定可用區</li>
<li>D) 將 Pod 集中到同一節點</li>
</ul>
<p><em>解析：podAntiAffinity 配合 topologyKey: kubernetes.io/hostname 確保匹配的 Pod 不會放在同一節點。這是實現高可用性的常見模式（例：Web 副本分散到節點 B、C、D）。</em></p>
