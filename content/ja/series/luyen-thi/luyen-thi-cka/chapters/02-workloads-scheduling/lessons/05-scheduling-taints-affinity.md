---
id: cka-d2-l05
title: 'レッスン5: スケジューリング、Taints & Affinity'
slug: 05-scheduling-taints-affinity
description: >-
  nodeSelector、nodeAffinity、podAffinity/podAntiAffinity。
  Taints & Tolerations。手動スケジューリングとCKA試験のスケジューリング問題。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 5
section_title: "ドメイン2: Workloads & Scheduling (15%)"
course:
  id: lt-cka-series-001
  title: 'CKA認定試験対策 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai5-scheduling.webp" alt="Kubernetesスケジューリングメカニズム — nodeAffinity、Taints & Tolerations" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="nodeselector">1. nodeSelector</h2>

<pre><code class="language-text"># ノードにラベルを追加
kubectl label node worker1 disktype=ssd

# PodでnodeSelectorを使用
apiVersion: v1
kind: Pod
metadata:
  name: ssd-pod
spec:
  nodeSelector:
    disktype: ssd    # ssdラベルを持つノードにスケジュール
  containers:
  - name: app
    image: nginx</code></pre>

<h2 id="node-affinity">2. Node Affinity</h2>

<pre><code class="language-text">spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:  # 必須条件
        nodeSelectorTerms:
        - matchExpressions:
          - key: disktype
            operator: In
            values: ["ssd", "nvme"]
      preferredDuringSchedulingIgnoredDuringExecution:  # 優先条件
      - weight: 80
        preference:
          matchExpressions:
          - key: zone
            operator: In
            values: ["zone-a"]</code></pre>

<table>
<thead><tr><th>タイプ</th><th>動作</th></tr></thead>
<tbody>
<tr><td><strong>required...IgnoredDuring...</strong></td><td>条件を満たすノードがない場合、PodはPending</td></tr>
<tr><td><strong>preferred...IgnoredDuring...</strong></td><td>優先だが、条件を満たすノードがなければ他のノードにスケジュール</td></tr>
</tbody>
</table>

<h2 id="taints-tolerations">3. Taints & Tolerations</h2>

<pre><code class="language-text"># ノードにTaintを追加
kubectl taint nodes worker1 env=production:NoSchedule

# Tolerationを持つPodのみがスケジュール可能
spec:
  tolerations:
  - key: "env"
    operator: "Equal"
    value: "production"
    effect: "NoSchedule"

# Taintの削除（末尾に"-"を付ける）
kubectl taint nodes worker1 env=production:NoSchedule-</code></pre>

<table>
<thead><tr><th>Effect</th><th>動作</th></tr></thead>
<tbody>
<tr><td><strong>NoSchedule</strong></td><td>Tolerationなしの新しいPodをスケジュールしない</td></tr>
<tr><td><strong>PreferNoSchedule</strong></td><td>スケジュールを避けるが、他に選択肢がなければ許可</td></tr>
<tr><td><strong>NoExecute</strong></td><td>既存PodもTolerationがなければ退避</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong>Taints & TolerationsとNode Affinityの違い：Taintはノード側の「拒否」、Affinityはpod側の「好み」です。両方を組み合わせて「特定のPodを特定のノードに限定する」ことができます。</p></blockquote>

<h2 id="pod-affinity">4. Pod Affinity / Anti-Affinity</h2>

<pre><code class="language-text">spec:
  affinity:
    podAntiAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchLabels:
            app: web
        topologyKey: kubernetes.io/hostname  # 同一ノードに配置しない

    podAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchLabels:
              app: cache
          topologyKey: kubernetes.io/hostname  # cacheと同じノードに配置</code></pre>

<h2 id="cheatsheet">5. チートシート</h2>

<table>
<thead><tr><th>タスク</th><th>コマンド</th></tr></thead>
<tbody>
<tr><td>ノードラベル追加</td><td><code>kubectl label node NODE key=value</code></td></tr>
<tr><td>Taint追加</td><td><code>kubectl taint node NODE key=value:Effect</code></td></tr>
<tr><td>Taint削除</td><td><code>kubectl taint node NODE key=value:Effect-</code></td></tr>
<tr><td>ノードラベル確認</td><td><code>kubectl get nodes --show-labels</code></td></tr>
<tr><td>Podスケジュール先確認</td><td><code>kubectl get pod -o wide</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習問題</h2>

<p><strong>Q1：</strong>ノードworker1にTaint "gpu=true:NoSchedule"があります。Tolerationなしの新しいPodはこのノードにスケジュールされますか？</p>
<ul>
<li>A) はい、Taintは無視される</li>
<li>B) いいえ、Podは他のノードにスケジュールされるかPendingになる ✓</li>
<li>C) はい、ただしPerformanceが低下する</li>
<li>D) Taintは新しいPodに影響しない</li>
</ul>
<p><em>解説：NoScheduleのTaintは、対応するTolerationを持たないPodのスケジューリングを拒否します。PodはTolerationを追加するか、他のノードにスケジュールされます。</em></p>

<p><strong>Q2：</strong>requiredDuringSchedulingIgnoredDuringExecutionのnodeAffinityで、条件に一致するノードが存在しない場合、Podはどうなりますか？</p>
<ul>
<li>A) ランダムなノードにスケジュールされる</li>
<li>B) PodはPending状態のまま、条件に一致するノードが利用可能になるまで待機 ✓</li>
<li>C) Podは自動的に削除される</li>
<li>D) Podはエラーで失敗する</li>
</ul>
<p><em>解説："required"は必須条件です。条件を満たすノードがないとPodはPendingのままです。"preferred"を使用すると、条件は優先されますが必須ではありません。</em></p>

<p><strong>Q3：</strong>podAntiAffinityにtopologyKey: kubernetes.io/hostnameを使用する目的は？</p>
<ul>
<li>A) Podを同じリージョンに配置する</li>
<li>B) 同じラベルを持つPodを異なるノードに分散配置する ✓</li>
<li>C) Podを特定のゾーンに制限する</li>
<li>D) Podを同じノードに集約する</li>
</ul>
<p><em>解説：podAntiAffinityとtopologyKey: kubernetes.io/hostnameの組み合わせにより、マッチするPodが同じノードに配置されないようにします。これは高可用性のための一般的なパターンです（例: WebレプリカをノードB、C、Dに分散配置）。</em></p>
