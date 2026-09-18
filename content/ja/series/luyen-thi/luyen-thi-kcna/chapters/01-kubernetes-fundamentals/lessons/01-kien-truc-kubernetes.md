---
id: kcna-d1-l01
title: 'レッスン1：Kubernetesアーキテクチャとコアコンポーネント'
slug: 01-kien-truc-kubernetes
description: >-
  コントロールプレーン vs ワーカーノード。kube-apiserver、etcd、kube-scheduler、
  controller-manager、kubelet、kube-proxy。Kubernetesオブジェクト概要。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 1
section_title: "Domain 1: Kubernetes Fundamentals (46%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA試験対策 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai1-architecture.webp" alt="Kubernetesアーキテクチャ — コントロールプレーンとワーカーノードコンポーネント" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="overview">1. Kubernetes概要</h2>

<p><strong>Kubernetes</strong>（K8s）は、Googleが開発しオープンソース化したコンテナオーケストレーションプラットフォームで、2014年にCNCFに寄贈されました。Kubernetesはコンテナ化されたアプリケーションのデプロイ、スケーリング、管理を自動化します。</p>

<blockquote><p><strong>試験のポイント：</strong> KCNAドメイン1は試験の<strong>46%</strong>を占めます。「どのコンポーネントが～を担当するか」という質問がよく出ます。各コンポーネントの役割を覚えましょう。</p></blockquote>

<h2 id="architecture">2. Kubernetesアーキテクチャ</h2>

<p>Kubernetesクラスターは2種類のノードで構成されます：<strong>コントロールプレーン</strong>と<strong>ワーカーノード</strong>。</p>

<pre><code class="language-text">┌─────────────────────────────────────────────────────────┐
│                    CONTROL PLANE                        │
│  ┌──────────────┐  ┌─────────┐  ┌────────────────────┐ │
│  │ kube-apiserver│  │  etcd   │  │kube-controller-mgr │ │
│  │  (REST API)  │  │(DB key- │  │ - Node Controller  │ │
│  │  front door  │  │ value)  │  │ - ReplicaSet Ctrl  │ │
│  └──────────────┘  └─────────┘  │ - Endpoints Ctrl   │ │
│  ┌──────────────┐               └────────────────────┘ │
│  │kube-scheduler│                                       │
│  │ (assign node)│                                       │
│  └──────────────┘                                       │
└─────────────────────────────────────────────────────────┘
         │              │              │
┌────────▼──────┐ ┌─────▼──────┐ ┌───▼────────────┐
│  WORKER NODE 1│ │WORKER NODE 2│ │  WORKER NODE 3 │
│  ┌──────────┐ │ │ ┌────────┐ │ │  ┌──────────┐  │
│  │ kubelet  │ │ │ │kubelet │ │ │  │ kubelet  │  │
│  │kube-proxy│ │ │ │k-proxy │ │ │  │kube-proxy│  │
│  │ Pod Pod  │ │ │ │Pod Pod │ │ │  │ Pod Pod  │  │
│  └──────────┘ │ │ └────────┘ │ │  └──────────┘  │
└───────────────┘ └────────────┘ └────────────────┘</code></pre>

<h2 id="control-plane">3. コントロールプレーンコンポーネント</h2>

<table>
<thead><tr><th>コンポーネント</th><th>役割</th><th>試験キーワード</th></tr></thead>
<tbody>
<tr><td><strong>kube-apiserver</strong></td><td>クラスターの唯一の入口。REST APIを処理し、すべての通信がここを経由します。</td><td>"single point of truth"、"REST API"、"authentication &amp; authorization"</td></tr>
<tr><td><strong>etcd</strong></td><td>クラスター全体のステートを保存するKey-Valueストア。KubernetesのDBです。</td><td>"cluster state"、"consistent"、"distributed key-value"</td></tr>
<tr><td><strong>kube-scheduler</strong></td><td>ノードが未割り当てのPodを確認し、リソースや制約に基づいて適切なノードを選択します。</td><td>"schedule"、"assign node"、"resource fit"</td></tr>
<tr><td><strong>kube-controller-manager</strong></td><td>複数のコントローラーループを実行：Node、ReplicaSet、Endpoints、ServiceAccountなど。</td><td>"reconciliation loop"、"desired state"、"controller"</td></tr>
<tr><td><strong>cloud-controller-manager</strong></td><td>クラウドプロバイダーAPI（AWS、GCP、Azure）との統合（オプション）。</td><td>"cloud integration"、"LoadBalancer provisioning"</td></tr>
</tbody>
</table>

<h2 id="worker-node">4. ワーカーノードコンポーネント</h2>

<table>
<thead><tr><th>コンポーネント</th><th>役割</th><th>試験キーワード</th></tr></thead>
<tbody>
<tr><td><strong>kubelet</strong></td><td>各ノードで動作するエージェント。apiserverからPodSpecを受け取り、コンテナが正しく動作することを保証します。</td><td>"node agent"、"PodSpec"、"container health"</td></tr>
<tr><td><strong>kube-proxy</strong></td><td>Serviceのネットワークルール（iptables/IPVS）を管理し、Podへのネットワーク通信を可能にします。</td><td>"networking"、"iptables"、"Service load balancing"</td></tr>
<tr><td><strong>Container Runtime</strong></td><td>コンテナを実行するソフトウェア：containerd、CRI-O。Dockerは非推奨になりました。</td><td>"CRI"、"containerd"、"run containers"</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong> <strong>kubelet</strong>はコンテナ内で動作しない唯一のコンポーネントです。ノード上のsystemdサービスとして直接動作します。kubeletがクラッシュするとノードはNotReadyになります。</p></blockquote>

<h2 id="objects">5. 基本的なKubernetesオブジェクト</h2>

<p>Kubernetesのすべてはetcdに保存される宣言型リソースである<strong>オブジェクト</strong>です。</p>

<table>
<thead><tr><th>オブジェクト</th><th>説明</th><th>スコープ</th></tr></thead>
<tbody>
<tr><td><strong>Pod</strong></td><td>最小単位。1つ以上のコンテナがネットワークとストレージを共有</td><td>Namespaced</td></tr>
<tr><td><strong>Namespace</strong></td><td>仮想クラスター、リソースの分離</td><td>Cluster-wide</td></tr>
<tr><td><strong>Node</strong></td><td>ワーカーマシン（VMまたは物理）</td><td>Cluster-wide</td></tr>
<tr><td><strong>Deployment</strong></td><td>ローリングアップデートでステートレスアプリのレプリカを管理</td><td>Namespaced</td></tr>
<tr><td><strong>Service</strong></td><td>Podへの安定したネットワークエンドポイント</td><td>Namespaced</td></tr>
<tr><td><strong>ConfigMap / Secret</strong></td><td>設定データ</td><td>Namespaced</td></tr>
<tr><td><strong>PersistentVolume</strong></td><td>ストレージリソース</td><td>Cluster-wide</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">6. チートシート — コンポーネント → 役割</h2>

<table>
<thead><tr><th>質問</th><th>回答</th></tr></thead>
<tbody>
<tr><td>クラスターステートはどこに保存される？</td><td><strong>etcd</strong></td></tr>
<tr><td>Podにノードを割り当てるコンポーネントは？</td><td><strong>kube-scheduler</strong></td></tr>
<tr><td>各ワーカーで動作しPodを管理するコンポーネントは？</td><td><strong>kubelet</strong></td></tr>
<tr><td>すべてのAPIコールを処理するコンポーネントは？</td><td><strong>kube-apiserver</strong></td></tr>
<tr><td>Serviceのネットワークルールを管理するコンポーネントは？</td><td><strong>kube-proxy</strong></td></tr>
<tr><td>望ましい状態を監視・調整するコンポーネントは？</td><td><strong>kube-controller-manager</strong></td></tr>
</tbody>
</table>

<h2 id="practice">7. 練習問題</h2>

<p><strong>Q1:</strong> ノードが未割り当ての新しく作成されたPodを監視し、それらにノードを選択するKubernetesコントロールプレーンコンポーネントはどれですか？</p>
<ul>
<li>A) kube-apiserver</li>
<li>B) kube-scheduler ✓</li>
<li>C) kube-controller-manager</li>
<li>D) kubelet</li>
</ul>
<p><em>解説：kube-schedulerはスケジュールされていないPodを監視し、リソース要件、アフィニティルール、制約に基づいて適切なノードに割り当てます。</em></p>

<p><strong>Q2:</strong> Kubernetesはすべてのクラスター構成とステートをどこに保存しますか？</p>
<ul>
<li>A) kube-apiserverのメモリ</li>
<li>B) 各ノードの/etc/kubernetes/</li>
<li>C) etcd ✓</li>
<li>D) kubeletデータベース</li>
</ul>
<p><em>解説：etcdは一貫性のある高可用Key-Valueストアで、すべてのKubernetesクラスターデータのバッキングストアとして機能します。etcdのバックアップ＝クラスター全体のバックアップです。</em></p>

<p><strong>Q3:</strong> ワーカーノード上で、PodSpecに記述されたコンテナが実行されて正常であることを保証するコンポーネントはどれですか？</p>
<ul>
<li>A) kube-proxy</li>
<li>B) Container runtime</li>
<li>C) kubelet ✓</li>
<li>D) kube-controller-manager</li>
</ul>
<p><em>解説：kubeletはkube-apiserverからPodSpecを受け取り、記述されたコンテナが動作していることを保証するノードエージェントです。ノードとPodのステータスをコントロールプレーンに報告します。</em></p>
