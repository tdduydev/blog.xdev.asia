---
id: kcna-d2-l06
title: 'レッスン6：コンテナオーケストレーションパターン'
slug: 06-orchestration-patterns
description: >-
  スケジューリング、オートスケーリング（HPA、VPA、Cluster Autoscaler）、リソース
  requestsとlimits、Namespace、マルチテナンシーとKubernetesアップグレード戦略。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 6
locale: ja
section_title: "ドメイン2：コンテナオーケストレーション（22%）"
course:
  id: lt-kcna-series-001
  title: 'KCNA試験対策 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai6-scheduling.webp" alt="Kubernetesスケジューリングパイプラインとオートスケーリング（HPA、VPA、Cluster Autoscaler）" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="scheduling">1. Kubernetesスケジューリング</h2>

<p>Podが作成されると、<strong>kube-scheduler</strong>が2つのステップで適切なノードを選択します：</p>

<pre><code class="language-text">Scheduling Pipeline:
  New Pod
    │
    ▼
  1. FILTERING: 条件を満たさないノードを除外
     - CPU/メモリ不足
     - TaintにTolerationが一致しない
     - Node Affinityが一致しない
     │
    ▼
  2. SCORING: 残ったノードにスコアリング
     - リソースバランス
     - Affinityの優先度
     │
    ▼
  Bind Pod → 最高スコアのNode</code></pre>

<table>
<thead><tr><th>メカニズム</th><th>目的</th><th>例</th></tr></thead>
<tbody>
<tr><td><strong>NodeSelector</strong></td><td>ラベルを持つノードにPodをスケジュール</td><td><code>disktype: ssd</code></td></tr>
<tr><td><strong>Affinity/Anti-affinity</strong></td><td>優先/必須のノードルール</td><td>zone-aを優先、別のpodと同じノードを避ける</td></tr>
<tr><td><strong>Taints & Tolerations</strong></td><td>PodにTolerationがない限りPodを排除</td><td>GPUワークロード専用ノード</td></tr>
<tr><td><strong>Resource requests</strong></td><td>スケジュールに必要な最小CPU/メモリ</td><td>requests.cpu: 500m</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong> <strong>Taints</strong>はNode側（Podを排除）。<strong>Tolerations</strong>はPod側（Taintを受け入れ）。Taintのeffect：<strong>NoSchedule</strong>（新しいPodをスケジュールしない）、<strong>PreferNoSchedule</strong>（できれば避ける）、<strong>NoExecute</strong>（実行中のPodも退去させる）。</p></blockquote>

<h2 id="resources">2. Resource RequestsとLimits</h2>

<table>
<thead><tr><th>設定</th><th>影響対象</th><th>超過した場合</th></tr></thead>
<tbody>
<tr><td><strong>requests.cpu</strong></td><td>スケジューリング（schedulerがノード選択に使用）</td><td>スロットリング（killされない）</td></tr>
<tr><td><strong>limits.cpu</strong></td><td>Cgroups CPUクォータ</td><td>CPUスロットリング</td></tr>
<tr><td><strong>requests.memory</strong></td><td>スケジューリング</td><td>limitを超えるとOOM Kill</td></tr>
<tr><td><strong>limits.memory</strong></td><td>Cgroups メモリリミット</td><td>コンテナが<strong>OOM Kill</strong>される</td></tr>
</tbody>
</table>

<pre><code class="language-text">QoS Classes:
  Guaranteed: requests == limits (最高品質、最後に退去)
  Burstable:  requests < limits (中間)
  BestEffort: requestsもlimitsもなし (最初に退去)</code></pre>

<h2 id="autoscaling">3. オートスケーリング</h2>

<table>
<thead><tr><th>スケーラー</th><th>スケール対象</th><th>メトリクス</th></tr></thead>
<tbody>
<tr><td><strong>HPA</strong>（Horizontal Pod Autoscaler）</td><td>Podレプリカ数</td><td>CPU%、Memory%、カスタムメトリクス</td></tr>
<tr><td><strong>VPA</strong>（Vertical Pod Autoscaler）</td><td>PodのCPU/Memory requests</td><td>実際の使用履歴</td></tr>
<tr><td><strong>Cluster Autoscaler</strong></td><td>クラスター内のノード数</td><td>Pending Pods（スケジュール不可）</td></tr>
<tr><td><strong>KEDA</strong></td><td>レプリカ数（0まで）</td><td>イベント駆動（キュー深度、Kafka）</td></tr>
</tbody>
</table>

<pre><code class="language-text">HPA integration:
  metrics-server → kubelet → Node/Pod metrics
       ↓
  HPA controller (checks every 15s)
       ↓
  Scale up: replicas++  (traffic spike)
  Scale down: replicas-- (traffic drops, 5 min cooldown)</code></pre>

<blockquote><p><strong>試験のポイント：</strong> HPAが機能するには<strong>metrics-server</strong>が必要です。VPAとHPAは同じDeploymentを管理する場合に競合する可能性があります。同じリソースに対して同時に使用すべきではありません（KEDAのマルチディメンションを除く）。</p></blockquote>

<h2 id="namespaces">4. Namespaceとマルチテナンシー</h2>

<p><strong>Namespace</strong>は仮想クラスター分離を提供します：RBACのスコープ、ResourceQuota、NetworkPolicy、DNS解決。</p>

<table>
<thead><tr><th>Namespace</th><th>目的</th><th>備考</th></tr></thead>
<tbody>
<tr><td><code>default</code></td><td>namespaceを指定しないオブジェクト</td><td>開発で使用、本番では使用しない</td></tr>
<tr><td><code>kube-system</code></td><td>Kubernetesシステムコンポーネント</td><td>CoreDNS、kube-proxy、metrics-server</td></tr>
<tr><td><code>kube-public</code></td><td>パブリック、全ユーザー読み取り可能</td><td>クラスター情報ConfigMap</td></tr>
<tr><td><code>kube-node-lease</code></td><td>ノードのハートビートリース</td><td>Kubeletハートビートのパフォーマンス</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">5. チートシート</h2>

<table>
<thead><tr><th>試験の質問</th><th>回答</th></tr></thead>
<tbody>
<tr><td>CPUに基づいてPod数をスケールするには？</td><td><strong>HPA</strong></td></tr>
<tr><td>クラスター内のノード数をスケールするには？</td><td><strong>Cluster Autoscaler</strong></td></tr>
<tr><td>GPU専用ノード、何を使う？</td><td><strong>Taint</strong> + Podの<strong>Toleration</strong></td></tr>
<tr><td>コンテナがOOM Killされる原因は？</td><td><strong>limits.memory</strong>を超過</td></tr>
<tr><td>最初に退去されるQoSクラスは？</td><td><strong>BestEffort</strong></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習問題</h2>

<p><strong>Q1:</strong> ノードに<code>key=gpu:NoSchedule</code>のTaintが設定されています。このノードにスケジュールできるPodはどれですか？</p>
<ul>
<li>A) クラスター内のすべてのPod</li>
<li>B) そのTaintに一致するTolerationを持つPod ✓</li>
<li>C) kube-system namespaceのPodのみ</li>
<li>D) クラスター管理者が作成したPodのみ</li>
</ul>
<p><em>解説：NoSchedule Taintは、Podが一致するtolerationを指定しない限り、新しいPodがそのノードにスケジュールされることを防ぎます。既存のPodは退去されません（それにはNoExecuteを使用します）。</em></p>

<p><strong>Q2:</strong> アプリケーションのPodがトラフィックスパイク時にOOM-killされ続けています。最も適切な解決策は何ですか？</p>
<ul>
<li>A) PodのCPU requestsを増やす</li>
<li>B) メモリ使用量に基づいてスケールするようにHPAを構成する ✓</li>
<li>C) アプリを新しいnamespaceに移動する</li>
<li>D) DeploymentをStatefulSetに変更する</li>
</ul>
<p><em>解説：OOM killはメモリ需要がlimitsを超えていることを意味します。HPAでスケールアウト（より多くのPodレプリカ）すると負荷が分散され、Pod当たりのメモリプレッシャーが軽減されます。または、メモリlimitsを増やすかVPAを使用します。</em></p>

<p><strong>Q3:</strong> HPAがスケーリングの判断に使用するCPUとメモリのメトリクスを提供するKubernetesコンポーネントはどれですか？</p>
<ul>
<li>A) kube-proxy</li>
<li>B) kube-scheduler</li>
<li>C) metrics-server ✓</li>
<li>D) etcd</li>
</ul>
<p><em>解説：metrics-serverはkubeletからリソースメトリクス（CPU、メモリ）を収集するオプションのクラスターアドオンです。HPAコントローラーはmetrics-serverが公開するメトリクスAPIをクエリしてスケーリングの判断を行います。</em></p>
