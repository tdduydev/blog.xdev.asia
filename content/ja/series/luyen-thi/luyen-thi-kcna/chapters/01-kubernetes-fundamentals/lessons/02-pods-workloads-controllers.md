---
id: kcna-d1-l02
title: 'レッスン2：Pod、ワークロード、コントローラー'
slug: 02-pods-workloads-controllers
description: >-
  Podライフサイクル。Deployment、ReplicaSet、StatefulSet、DaemonSet、
  Job、CronJob。ラベル、セレクター、アノテーション。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 2
section_title: "Domain 1: Kubernetes Fundamentals (46%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA試験対策 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai2-pods-workloads.webp" alt="Kubernetesワークロードコントローラー — Deployment、StatefulSet、DaemonSet、Job" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="pod">1. Pod — 最小単位</h2>

<p><strong>Pod</strong>は1つ以上のコンテナのグループで、同じネットワークネームスペース（同一IP、ポート空間）とストレージボリュームを共有します。PodはKubernetesにおけるスケジューリングの単位です。</p>

<pre><code class="language-text">┌─────────────────────────────────────┐
│              POD                    │
│  IP: 10.244.1.5                     │
│  ┌────────────┐  ┌───────────────┐  │
│  │  Container │  │  Sidecar      │  │
│  │   (app)    │  │  (log-agent)  │  │
│  └────────────┘  └───────────────┘  │
│       Shared Volume: /var/log       │
└─────────────────────────────────────┘</code></pre>

<h3 id="pod-lifecycle">Podライフサイクル</h3>

<table>
<thead><tr><th>Phase</th><th>意味</th><th>デバッグヒント</th></tr></thead>
<tbody>
<tr><td><strong>Pending</strong></td><td>まだスケジュールされていないか、イメージをプル中</td><td>イベントを確認：kubectl describe pod</td></tr>
<tr><td><strong>Running</strong></td><td>実行中、少なくとも1つのコンテナがアクティブ</td><td>正常な状態</td></tr>
<tr><td><strong>Succeeded</strong></td><td>すべてのコンテナがコード0で終了</td><td>Jobが完了</td></tr>
<tr><td><strong>Failed</strong></td><td>少なくとも1つのコンテナがエラーで終了</td><td>kubectl logs --previous</td></tr>
<tr><td><strong>Unknown</strong></td><td>ノードとの通信ができない</td><td>ノードのネットワーク問題</td></tr>
<tr><td><strong>CrashLoopBackOff</strong></td><td>コンテナが繰り返しクラッシュと再起動</td><td>kubectl logs -p</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong> <strong>CrashLoopBackOff</strong>は正式なPodフェーズではありません。WaitingのContainerステートです。「pod phase」と「container state」の違いを問う問題が出ます。</p></blockquote>

<h2 id="workloads">2. ワークロードコントローラー</h2>

<table>
<thead><tr><th>コントローラー</th><th>使用場面</th><th>主な特徴</th></tr></thead>
<tbody>
<tr><td><strong>Deployment</strong></td><td>ステートレスアプリ（Webサーバー、API）</td><td>ローリングアップデート、ロールバック、ReplicaSet管理</td></tr>
<tr><td><strong>ReplicaSet</strong></td><td>N個のレプリカを保証（通常はDeployment経由で使用）</td><td>ラベルセレクター、直接使用することは稀</td></tr>
<tr><td><strong>StatefulSet</strong></td><td>ステートフルアプリ（データベース、Kafka、Elasticsearch）</td><td>安定したPod名（web-0、web-1）、安定したストレージ、順序付きデプロイ</td></tr>
<tr><td><strong>DaemonSet</strong></td><td>すべてのノードで実行するエージェント（ロギング、モニタリング、ネットワーク）</td><td>1 Pod/ノード、新しいノード参加時に自動デプロイ</td></tr>
<tr><td><strong>Job</strong></td><td>完了まで実行するバッチタスク</td><td>completions、parallelism、backoffLimit</td></tr>
<tr><td><strong>CronJob</strong></td><td>定期的なバッチタスク</td><td>cron構文、concurrencyPolicy、schedule</td></tr>
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

<h2 id="labels">3. ラベル、セレクター、アノテーション</h2>

<table>
<thead><tr><th>概念</th><th>用途</th><th>例</th></tr></thead>
<tbody>
<tr><td><strong>Labels</strong></td><td>リソースにタグを付けてselectやgroup</td><td><code>app: frontend, env: prod</code></td></tr>
<tr><td><strong>Selectors</strong></td><td>ラベルでリソースをクエリ</td><td><code>selector: {app: frontend}</code></td></tr>
<tr><td><strong>Annotations</strong></td><td>select用ではないメタデータ（ビルド情報、連絡先）</td><td><code>maintainer: team@company.com</code></td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong> ServiceはPodの<strong>labels</strong>に一致する<strong>selector</strong>でPodを見つけます。selectorが一致しない場合、ServiceのEndpointsは空になり、トラフィックがPodに到達しません。</p></blockquote>

<h2 id="daemonset-usecase">4. DaemonSetのユースケース</h2>

<pre><code class="language-text">NODE 1         NODE 2         NODE 3
┌──────┐       ┌──────┐       ┌──────┐
│fluentd│      │fluentd│      │fluentd│  ← ログコレクターDaemonSet
│ Pod  │       │ Pod  │       │ Pod  │
├──────┤       ├──────┤       ├──────┤
│calico│       │calico│       │calico│  ← CNIネットワークプラグインDaemonSet
│ Pod  │       │ Pod  │       │ Pod  │
└──────┘       └──────┘       └──────┘</code></pre>

<p>DaemonSetの一般的な用途：<strong>Fluentd/Filebeat</strong>（ログ収集）、<strong>Prometheus Node Exporter</strong>（メトリクス）、<strong>kube-proxy</strong>（ネットワーキング）、<strong>CNIプラグイン</strong>（Calico、Cilium）。</p>

<h2 id="cheatsheet">5. チートシート</h2>

<table>
<thead><tr><th>試験の質問</th><th>回答</th></tr></thead>
<tbody>
<tr><td>ステートフルアプリ、安定したIDが必要？</td><td><strong>StatefulSet</strong></td></tr>
<tr><td>ノードごとに1 Pod（監視エージェント）？</td><td><strong>DaemonSet</strong></td></tr>
<tr><td>ステートレスアプリでローリングアップデート？</td><td><strong>Deployment</strong></td></tr>
<tr><td>一度限りのバッチ処理？</td><td><strong>Job</strong></td></tr>
<tr><td>スケジュールされたバッチ（夜間バックアップ）？</td><td><strong>CronJob</strong></td></tr>
<tr><td>StatefulSetのPod命名パターン？</td><td><code>name-0, name-1, name-2</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習問題</h2>

<p><strong>Q1:</strong> 安定したネットワークIDとレプリカごとの専用ストレージを持つMySQLデータベースをKubernetesにデプロイする必要があります。どのワークロードタイプを使用すべきですか？</p>
<ul>
<li>A) PersistentVolumeClaimを持つDeployment</li>
<li>B) StatefulSet ✓</li>
<li>C) DaemonSet</li>
<li>D) ReplicaSet</li>
</ul>
<p><em>解説：StatefulSetは安定したPod名（mysql-0、mysql-1）、順序付きデプロイ/スケーリングを提供し、各PodがvolumeClaimTemplates経由で独自のPVCを取得します。これらの特性はデータベースに不可欠です。</em></p>

<p><strong>Q2:</strong> クラスター内のすべてのノード（将来参加するノードを含む）で正確に1つのPodが実行されることを保証するワークロードはどれですか？</p>
<ul>
<li>A) ノード数に一致するレプリカを持つDeployment</li>
<li>B) nodeSelectorを持つReplicaSet</li>
<li>C) DaemonSet ✓</li>
<li>D) StatefulSet</li>
</ul>
<p><em>解説：DaemonSetは自動的にノードごとに1つのPodをデプロイし、クラスターメンバーシップを監視します。新しいノードが参加すると、DaemonSetコントローラーは直ちにそのノード上にPodを作成します。</em></p>

<p><strong>Q3:</strong> PodがPending状態にあります。最も可能性の高い原因は何ですか？</p>
<ul>
<li>A) コンテナアプリケーションがクラッシュした</li>
<li>B) スケジューリング要件を満たすノードがない ✓</li>
<li>C) livenessプローブが失敗した</li>
<li>D) コンテナイメージが破損している</li>
</ul>
<p><em>解説：Pendingは、Podが受け入れられたがまだ開始されていないことを意味します。最も一般的な理由：ノードのCPU/メモリ不足、ノードアフィニティ/taintの条件未達、PVCが未バインド。kubectl describe podのイベントを確認してください。</em></p>
