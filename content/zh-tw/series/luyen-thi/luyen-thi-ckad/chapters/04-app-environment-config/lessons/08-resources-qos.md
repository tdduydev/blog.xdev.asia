---
id: ckad-d4-l08
title: '第8課: Resource Requests、Limits 與 QoS'
slug: 08-resources-qos
description: >-
  Resource requests vs limits（CPU、Memory）。QoS 等級: Guaranteed、Burstable、
  BestEffort。LimitRange 預設設定與 ResourceQuota 的 Namespace 限制。
duration_minutes: 50
is_free: true
video_url: null
sort_order: 8
section_title: "領域4: Application Environment, Configuration and Security (25%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD 認證備考 — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai8-qos-classes.webp" alt="Resource Requests、Limits 與 QoS 等級 — Guaranteed、Burstable、BestEffort" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="requests-limits">1. Requests vs Limits</h2>

<pre><code class="language-text">resources:
  requests:
    cpu: "250m"      # 250 millicores = 0.25 CPU（排程用）
    memory: "128Mi"  # 最低保證記憶體
  limits:
    cpu: "500m"      # 最大 CPU（超過被節流，不會被 kill）
    memory: "256Mi"  # 最大記憶體（超過被 OOMKilled）</code></pre>

<table>
<thead><tr><th>資源</th><th>超過 Requests 時</th><th>超過 Limits 時</th></tr></thead>
<tbody>
<tr><td><strong>CPU</strong></td><td>正常運行（burst）</td><td>被節流（throttling，速度降低，不會被 kill）</td></tr>
<tr><td><strong>記憶體</strong></td><td>正常運行</td><td>容器被終止 → OOMKilled</td></tr>
</tbody>
</table>

<pre><code class="language-text">CPU 單位:
  1 CPU = 1000m（millicores）
  0.5 CPU = 500m
  100m = 0.1 CPU

記憶體單位:
  Ki（kibibyte）= 1024 bytes
  Mi（mebibyte）= 1024 Ki
  Gi（gibibyte）= 1024 Mi
  （KB/MB/GB 是十進位，值不同）</code></pre>

<h2 id="qos">2. QoS 等級</h2>

<pre><code class="language-text">QoS = Quality of Service（控制驅逐優先順序）

┌─────────────────────────────────────────────────────────┐
│  GUARANTEED — 最後被驅逐                                │
│  ✓ CPU requests == CPU limits                           │
│  ✓ Memory requests == Memory limits                     │
│  ✓ Pod 中所有容器都必須滿足條件                         │
├─────────────────────────────────────────────────────────┤
│  BURSTABLE — 中間優先順序                               │
│  ✓ 至少一個容器設定了 request/limit                     │
│  ✗ 不滿足 Guaranteed 的條件                            │
├─────────────────────────────────────────────────────────┤
│  BESTEFFORT — 最先被驅逐                                │
│  ✗ 完全沒有設定 request/limit                           │
└─────────────────────────────────────────────────────────┘</code></pre>

<table>
<thead><tr><th>QoS 等級</th><th>條件</th><th>驅逐優先順序</th></tr></thead>
<tbody>
<tr><td><strong>Guaranteed</strong></td><td>CPU 和 Memory 的 requests == limits（所有容器）</td><td>最低（最後被驅逐）</td></tr>
<tr><td><strong>Burstable</strong></td><td>至少一個容器設定了 request/limit，但不滿足 Guaranteed</td><td>中間</td></tr>
<tr><td><strong>BestEffort</strong></td><td>完全沒有 request/limit</td><td>最高（最先被驅逐）</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試重點:</strong> 查看 Pod QoS 等級的指令: <code>kubectl describe pod &lt;name&gt; | grep -i qos</code> 或 <code>kubectl get pod &lt;name&gt; -o jsonpath='{.status.qosClass}'</code>。達到 Guaranteed: CPU 和 Memory 都必須設定 requests = limits，且所有容器（包含 init containers）都必須滿足。</p></blockquote>

<h2 id="limitrange">3. LimitRange</h2>

<p>LimitRange 為 Namespace 內的 Pod 設定預設 requests/limits — 當 Pod 自身沒有設定時套用。</p>

<pre><code class="language-text">apiVersion: v1
kind: LimitRange
metadata:
  name: mem-limit-range
  namespace: development
spec:
  limits:
  - type: Container
    default:          # 預設 limits（容器未設定 limits 時）
      memory: 512Mi
      cpu: 500m
    defaultRequest:   # 預設 requests（容器未設定 requests 時）
      memory: 256Mi
      cpu: 250m
    max:              # 允許的最大 limits
      memory: 1Gi
      cpu: "1"
    min:              # 要求的最小 requests
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
    # 運算資源
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    limits.memory: 40Gi
    # 物件數量
    pods: "50"
    services: "20"
    persistentvolumeclaims: "10"
    secrets: "30"
    configmaps: "30"</code></pre>

<blockquote><p><strong>考試重點:</strong> 在 ResourceQuota 要求資源 limits 的 Namespace 中，<strong>所有 Pod</strong> 都必須設定 resource requests 和 limits。若沒有設定，LimitRange 需提供預設值。兩者皆無的情況下，API Server 會拒絕 Pod 建立。</p></blockquote>

<h2 id="cheatsheet">5. 速查表</h2>

<table>
<thead><tr><th>情境</th><th>處理方式</th></tr></thead>
<tbody>
<tr><td>容器 OOMKilled</td><td>增加 <code>limits.memory</code></td></tr>
<tr><td>容器被節流（慢）</td><td>增加 <code>limits.cpu</code></td></tr>
<tr><td>Pod 無法排程</td><td>降低 <code>requests</code> 或擴充叢集</td></tr>
<tr><td>QoS 設為 Guaranteed</td><td>CPU 和 Memory 都設 <code>requests == limits</code></td></tr>
<tr><td>設定 Namespace 預設 limits</td><td><strong>LimitRange</strong></td></tr>
<tr><td>限制 Namespace 整體資源</td><td><strong>ResourceQuota</strong></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習題</h2>

<p><strong>Q1:</strong> 容器設定 cpu requests=200m、cpu limits=500m、memory requests=256Mi、memory limits=256Mi。此 Pod 的 QoS 等級是什麼（假設為唯一容器）？</p>
<ul>
<li>A) Guaranteed</li>
<li>B) Burstable ✓</li>
<li>C) BestEffort</li>
<li>D) Critical</li>
</ul>
<p><em>解析: Guaranteed 的條件是所有 requests 等於 limits。此處 cpu requests(200m) ≠ cpu limits(500m)。Memory requests 和 limits 相等(256Mi)，但 Guaranteed 條件未完全滿足，因此等級為 Burstable。</em></p>

<p><strong>Q2:</strong> 容器的記憶體使用量超過記憶體 limits。會發生什麼？</p>
<ul>
<li>A) 容器被節流（速度降低）</li>
<li>B) 容器被終止並重啟（OOMKilled） ✓</li>
<li>C) 容器從節點被驅逐</li>
<li>D) Pod 被重新排程到其他節點</li>
</ul>
<p><em>解析: 不同於 CPU（可壓縮——被節流但不會被 kill），記憶體是不可壓縮資源。容器超過記憶體 limits 時，會以 OOMKilled 退出碼被終止，並由容器運行時重啟。反覆 OOMKill 會導致 CrashLoopBackOff。</em></p>

<p><strong>Q3:</strong> 某 Namespace 有 ResourceQuota 要求設定 limits.memory。在該 Namespace 建立沒有資源 limits 的新 Pod。會發生什麼？</p>
<ul>
<li>A) Pod 會無 limits 地啟動（ResourceQuota 僅適用於運行中的 Pod）</li>
<li>B) 除非 LimitRange 提供預設值，否則 API Server 會拒絕 Pod ✓</li>
<li>C) Pod 會以預設 limits 512Mi 啟動</li>
<li>D) ResourceQuota 會自動更新以排除此 Pod</li>
</ul>
<p><em>解析: 當 ResourceQuota 涵蓋記憶體 limits 的 Namespace，所有 Pod 都必須在 Spec 中指定記憶體 limits。若 LimitRange 未提供預設值，API Server 會拒絕 Pod。解決方案: 為 Pod 設定 limits，或在 Namespace 建立具有 default/defaultRequest 的 LimitRange。</em></p>
