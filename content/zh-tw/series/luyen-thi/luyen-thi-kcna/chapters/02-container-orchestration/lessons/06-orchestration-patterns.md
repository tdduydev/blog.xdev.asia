---
id: kcna-d2-l06
title: '第6課：容器編排模式'
slug: 06-orchestration-patterns
description: >-
  排程、自動擴展（HPA、VPA、Cluster Autoscaler）、資源請求
  與限制、Namespace、多租戶與 Kubernetes 升級策略。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 6
locale: zh-tw
section_title: "領域2：容器編排（22%）"
course:
  id: lt-kcna-series-001
  title: 'KCNA 認證備考 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai6-scheduling.webp" alt="Kubernetes 排程管線與自動擴展（HPA、VPA、Cluster Autoscaler）" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="scheduling">1. Kubernetes 排程</h2>

<p>當 Pod 被建立時，<strong>kube-scheduler</strong> 透過 2 個步驟選擇合適的節點：</p>

<pre><code class="language-text">Scheduling Pipeline:
  New Pod
    │
    ▼
  1. FILTERING: 排除不符條件的節點
     - CPU/Memory 不足
     - Taint 與 Toleration 不匹配
     - Node Affinity 不匹配
     │
    ▼
  2. SCORING: 為剩餘節點評分
     - 資源平衡
     - Affinity 偏好
     │
    ▼
  Bind Pod → Highest score Node</code></pre>

<table>
<thead><tr><th>機制</th><th>目的</th><th>範例</th></tr></thead>
<tbody>
<tr><td><strong>NodeSelector</strong></td><td>將 Pod 排程到有特定標籤的節點</td><td><code>disktype: ssd</code></td></tr>
<tr><td><strong>Affinity/Anti-affinity</strong></td><td>偏好/必需的節點規則</td><td>偏好 zone-a，避免與另一個 Pod 在同一節點</td></tr>
<tr><td><strong>Taints & Tolerations</strong></td><td>排斥 Pod 除非 Pod 有 Toleration</td><td>節點專用於 GPU 工作負載</td></tr>
<tr><td><strong>Resource requests</strong></td><td>排程所需的最低 CPU/Memory</td><td>requests.cpu: 500m</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點：</strong> <strong>Taint</strong> 套用在 Node 上（排斥 Pod）。<strong>Toleration</strong> 套用在 Pod 上（接受 Taint）。Taint 效果：<strong>NoSchedule</strong>（不排程新 Pod）、<strong>PreferNoSchedule</strong>（優先不排程）、<strong>NoExecute</strong>（驅逐正在執行的 Pod）。</p></blockquote>

<h2 id="resources">2. 資源 Requests 與 Limits</h2>

<table>
<thead><tr><th>設定</th><th>影響</th><th>超出時</th></tr></thead>
<tbody>
<tr><td><strong>requests.cpu</strong></td><td>排程（scheduler 用來選擇節點）</td><td>被節流（不會被終止）</td></tr>
<tr><td><strong>limits.cpu</strong></td><td>Cgroups CPU 配額</td><td>CPU 被節流</td></tr>
<tr><td><strong>requests.memory</strong></td><td>排程</td><td>超出 limit 時 OOM Kill</td></tr>
<tr><td><strong>limits.memory</strong></td><td>Cgroups 記憶體限制</td><td>容器被 <strong>OOM Kill</strong></td></tr>
</tbody>
</table>

<pre><code class="language-text">QoS Classes:
  Guaranteed: requests == limits (best quality, last to be evicted)
  Burstable:  requests < limits (middle)
  BestEffort: no requests, no limits (first to be evicted)</code></pre>

<h2 id="autoscaling">3. 自動擴展</h2>

<table>
<thead><tr><th>擴展器</th><th>擴展什麼</th><th>指標</th></tr></thead>
<tbody>
<tr><td><strong>HPA</strong>（Horizontal Pod Autoscaler）</td><td>Pod 副本數量</td><td>CPU%、Memory%、自訂指標</td></tr>
<tr><td><strong>VPA</strong>（Vertical Pod Autoscaler）</td><td>Pod 的 CPU/Memory requests</td><td>實際使用歷史記錄</td></tr>
<tr><td><strong>Cluster Autoscaler</strong></td><td>叢集中的節點數量</td><td>Pending Pod（無法排程）</td></tr>
<tr><td><strong>KEDA</strong></td><td>副本數量（可到 0）</td><td>事件驅動（佇列深度、Kafka）</td></tr>
</tbody>
</table>

<pre><code class="language-text">HPA integration:
  metrics-server → kubelet → Node/Pod metrics
       ↓
  HPA controller (checks every 15s)
       ↓
  Scale up: replicas++  (traffic spike)
  Scale down: replicas-- (traffic drops, 5 min cooldown)</code></pre>

<blockquote><p><strong>考試重點：</strong> HPA 需要 <strong>metrics-server</strong> 才能運作。VPA 和 HPA 同時管理一個 Deployment 可能產生衝突——不建議同時用於同一資源（除非 KEDA 搭配多維度）。</p></blockquote>

<h2 id="namespaces">4. Namespace 與多租戶</h2>

<p><strong>Namespace</strong> 提供虛擬叢集隔離：範圍包含 RBAC、ResourceQuota、NetworkPolicy 和 DNS 解析。</p>

<table>
<thead><tr><th>Namespace</th><th>用途</th><th>備註</th></tr></thead>
<tbody>
<tr><td><code>default</code></td><td>未指定 namespace 的物件</td><td>用於開發，不建議用於生產</td></tr>
<tr><td><code>kube-system</code></td><td>Kubernetes 系統元件</td><td>CoreDNS、kube-proxy、metrics-server</td></tr>
<tr><td><code>kube-public</code></td><td>公開，所有人可讀</td><td>叢集資訊 ConfigMap</td></tr>
<tr><td><code>kube-node-lease</code></td><td>節點心跳租約</td><td>Kubelet 心跳效能</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">5. 速查表</h2>

<table>
<thead><tr><th>考試問題</th><th>答案</th></tr></thead>
<tbody>
<tr><td>根據 CPU 擴展 Pod 數量？</td><td><strong>HPA</strong></td></tr>
<tr><td>擴展叢集中的節點數量？</td><td><strong>Cluster Autoscaler</strong></td></tr>
<tr><td>節點專用於 GPU，用什麼？</td><td><strong>Taint</strong> + Pod <strong>Toleration</strong></td></tr>
<tr><td>容器被 OOM Kill，原因？</td><td>超出 <strong>limits.memory</strong></td></tr>
<tr><td>哪個 QoS 等級最先被驅逐？</td><td><strong>BestEffort</strong></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習題</h2>

<p><strong>Q1:</strong> 一個節點被加上 Taint <code>key=gpu:NoSchedule</code>。哪些 Pod 可以排程到此節點？</p>
<ul>
<li>A) 叢集中的任何 Pod</li>
<li>B) 具有匹配 Toleration 的 Pod ✓</li>
<li>C) 僅 kube-system namespace 中的 Pod</li>
<li>D) 僅叢集管理員建立的 Pod</li>
</ul>
<p><em>解析：NoSchedule taint 防止任何新 Pod 排程到該節點，除非 Pod 指定了匹配的 toleration。現有 Pod 不會被驅逐（使用 NoExecute 才會）。</em></p>

<p><strong>Q2:</strong> 應用程式的 Pod 在流量高峰期持續被 OOM-Kill。最合適的解決方案是什麼？</p>
<ul>
<li>A) 增加 Pod CPU requests</li>
<li>B) 設定 HPA 根據記憶體使用量擴展 ✓</li>
<li>C) 將應用移到新的 namespace</li>
<li>D) 使用 StatefulSet 取代 Deployment</li>
</ul>
<p><em>解析：OOM Kill 意味著記憶體需求超過限制。HPA 水平擴展（更多 Pod 副本）分散負載，減少每個 Pod 的記憶體壓力。或者增加記憶體限制或使用 VPA。</em></p>

<p><strong>Q3:</strong> 哪個 Kubernetes 元件提供 HPA 用於擴展決策的 CPU 和記憶體指標？</p>
<ul>
<li>A) kube-proxy</li>
<li>B) kube-scheduler</li>
<li>C) metrics-server ✓</li>
<li>D) etcd</li>
</ul>
<p><em>解析：metrics-server 是可選的叢集附加元件，從 kubelet 收集資源指標（CPU、記憶體）。HPA 控制器查詢 metrics-server 暴露的 metrics API 來做出擴展決策。</em></p>
