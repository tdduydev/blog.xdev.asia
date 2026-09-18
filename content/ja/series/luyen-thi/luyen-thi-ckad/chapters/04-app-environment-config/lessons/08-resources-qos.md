---
id: ckad-d4-l08
title: 'レッスン8: Resource Requests, Limits & QoS'
slug: 08-resources-qos
description: >-
  Resource requests vs limits（CPU、Memory）。QoSクラス: Guaranteed、Burstable、
  BestEffort。LimitRangeのデフォルト設定とResourceQuotaのNamespace制限。
duration_minutes: 50
is_free: true
video_url: null
sort_order: 8
section_title: "ドメイン4: Application Environment, Configuration and Security (25%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD試験対策 — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai8-qos-classes.webp" alt="Resource Requests、Limits と QoSクラス — Guaranteed、Burstable、BestEffort" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="requests-limits">1. Requests vs Limits</h2>

<pre><code class="language-text">resources:
  requests:
    cpu: "250m"      # 250ミリコア = 0.25 CPU（スケジューリング用）
    memory: "128Mi"  # 最小保証メモリ
  limits:
    cpu: "500m"      # 最大CPU（超過するとスロットリング、killされない）
    memory: "256Mi"  # 最大メモリ（超過するとOOMKilled）</code></pre>

<table>
<thead><tr><th>リソース</th><th>Requests超過時</th><th>Limits超過時</th></tr></thead>
<tbody>
<tr><td><strong>CPU</strong></td><td>正常に動作（バースト）</td><td>スロットリング（速度低下、killされない）</td></tr>
<tr><td><strong>メモリ</strong></td><td>正常に動作</td><td>コンテナがkillされる → OOMKilled</td></tr>
</tbody>
</table>

<pre><code class="language-text">CPU単位:
  1 CPU = 1000m（ミリコア）
  0.5 CPU = 500m
  100m = 0.1 CPU

メモリ単位:
  Ki（キビバイト）= 1024 bytes
  Mi（メビバイト）= 1024 Ki
  Gi（ギビバイト）= 1024 Mi
  （KB/MB/GBは10進数なので異なる）</code></pre>

<h2 id="qos">2. QoSクラス</h2>

<pre><code class="language-text">QoS = Quality of Service（退避優先度を制御）

┌─────────────────────────────────────────────────────────┐
│  GUARANTEED — 最後に退避                                │
│  ✓ CPU requests == CPU limits                           │
│  ✓ Memory requests == Memory limits                     │
│  ✓ Pod内の全コンテナが条件を満たす必要あり              │
├─────────────────────────────────────────────────────────┤
│  BURSTABLE — 中間の優先度                               │
│  ✓ 少なくとも1つのコンテナにrequest/limitあり           │
│  ✗ Guaranteedの条件を満たさない                         │
├─────────────────────────────────────────────────────────┤
│  BESTEFFORT — 最初に退避                                │
│  ✗ request/limitが一切なし                              │
└─────────────────────────────────────────────────────────┘</code></pre>

<table>
<thead><tr><th>QoSクラス</th><th>条件</th><th>退避優先度</th></tr></thead>
<tbody>
<tr><td><strong>Guaranteed</strong></td><td>CPUとメモリ両方でrequests == limits（全コンテナ）</td><td>最低（最後に退避）</td></tr>
<tr><td><strong>Burstable</strong></td><td>少なくとも1つのコンテナにrequest/limitあり、Guaranteedの条件を満たさない</td><td>中間</td></tr>
<tr><td><strong>BestEffort</strong></td><td>request/limitが一切なし</td><td>最高（最初に退避）</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント:</strong> PodのQoSクラスを確認するコマンド: <code>kubectl describe pod &lt;name&gt; | grep -i qos</code> または <code>kubectl get pod &lt;name&gt; -o jsonpath='{.status.qosClass}'</code>。Guaranteedを実現するには: CPUとメモリ両方でrequests = limitsを設定し、全コンテナ（initコンテナを含む）で満たす必要があります。</p></blockquote>

<h2 id="limitrange">3. LimitRange</h2>

<p>LimitRangeはNamespace内のPodにデフォルトのrequests/limitsを設定します — Podが自身で設定していない場合に適用されます。</p>

<pre><code class="language-text">apiVersion: v1
kind: LimitRange
metadata:
  name: mem-limit-range
  namespace: development
spec:
  limits:
  - type: Container
    default:          # デフォルトlimits（コンテナがlimitsを設定していない場合）
      memory: 512Mi
      cpu: 500m
    defaultRequest:   # デフォルトrequests（コンテナがrequestsを設定していない場合）
      memory: 256Mi
      cpu: 250m
    max:              # 許可される最大limits
      memory: 1Gi
      cpu: "1"
    min:              # 必要な最小requests
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
    # コンピュートリソース
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    limits.memory: 40Gi
    # オブジェクト数
    pods: "50"
    services: "20"
    persistentvolumeclaims: "10"
    secrets: "30"
    configmaps: "30"</code></pre>

<blockquote><p><strong>試験のポイント:</strong> ResourceQuotaでリソースlimitsが要求されているNamespaceでは、<strong>全Pod</strong>がresource requestsとlimitsを設定する必要があります。設定されていない場合、LimitRangeがデフォルトを提供する必要があります。いずれもない場合、APIサーバーがPod作成を拒否します。</p></blockquote>

<h2 id="cheatsheet">5. チートシート</h2>

<table>
<thead><tr><th>シナリオ</th><th>対処法</th></tr></thead>
<tbody>
<tr><td>コンテナがOOMKilled</td><td><code>limits.memory</code>を増加</td></tr>
<tr><td>コンテナがスロットリング（遅い）</td><td><code>limits.cpu</code>を増加</td></tr>
<tr><td>Podがスケジュールできない</td><td><code>requests</code>を削減またはクラスターをスケール</td></tr>
<tr><td>QoSをGuaranteedにする</td><td>CPUとメモリで<code>requests == limits</code></td></tr>
<tr><td>Namespaceのデフォルトlimitsを設定</td><td><strong>LimitRange</strong></td></tr>
<tr><td>Namespace全体のリソースを制限</td><td><strong>ResourceQuota</strong></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習問題</h2>

<p><strong>Q1:</strong> コンテナにcpu requests=200m、cpu limits=500m、memory requests=256Mi、memory limits=256Miが設定されています。このPodのQoSクラスは何ですか（唯一のコンテナの場合）？</p>
<ul>
<li>A) Guaranteed</li>
<li>B) Burstable ✓</li>
<li>C) BestEffort</li>
<li>D) Critical</li>
</ul>
<p><em>解説: Guaranteedの条件は全requestsがlimitsと等しいことです。ここではcpu requests(200m) ≠ cpu limits(500m)です。Memory requestsはlimitsと等しい(256Mi)ですが、Guaranteedの条件を完全に満たしていないため、クラスはBurstableになります。</em></p>

<p><strong>Q2:</strong> コンテナのメモリ使用量がメモリlimitsを超えました。何が起こりますか？</p>
<ul>
<li>A) コンテナがスロットリング（速度低下）される</li>
<li>B) コンテナが終了して再起動される（OOMKilled） ✓</li>
<li>C) コンテナがノードから退避される</li>
<li>D) Podが別のノードにリスケジュールされる</li>
</ul>
<p><em>解説: CPU（圧縮可能 — スロットリングされるがkillされない）とは異なり、メモリは非圧縮リソースです。コンテナがメモリlimitsを超過すると、OOMKilled終了コードで終了し、コンテナランタイムによって再起動されます。OOMKillが繰り返されるとCrashLoopBackOffになります。</em></p>

<p><strong>Q3:</strong> limits.memoryの設定が必要なResourceQuotaがあるNamespaceで、リソースlimitsなしの新しいPodを作成します。何が起こりますか？</p>
<ul>
<li>A) Podはlimitsなしで起動する（ResourceQuotaは実行中のPodにのみ適用）</li>
<li>B) LimitRangeがデフォルトを提供しない限り、APIサーバーがPodを拒否する ✓</li>
<li>C) Podはデフォルトlimits 512Miで起動する</li>
<li>D) ResourceQuotaがこのPodを除外するよう自動更新される</li>
</ul>
<p><em>解説: ResourceQuotaでメモリlimitsをカバーしているNamespaceでは、全PodがメモリlimitsをSpecに指定する必要があります。LimitRangeがデフォルトを提供しない場合、APIサーバーがPodを拒否します。解決策: Podにlimitsを設定するか、Namespaceにdefault/defaultRequestを持つLimitRangeを作成します。</em></p>
