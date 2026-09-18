---
id: kcna-d2-l05
title: 'レッスン5：コンテナランタイムとOCI標準'
slug: 05-container-runtimes-oci
description: >-
  OCI（Open Container Initiative）、Container Runtime Interface（CRI）。
  Docker、containerd、CRI-O。イメージレイヤー、レジストリとイメージライフサイクル。
duration_minutes: 50
is_free: true
video_url: null
sort_order: 5
locale: ja
section_title: "ドメイン2：コンテナオーケストレーション（22%）"
course:
  id: lt-kcna-series-001
  title: 'KCNA試験対策 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai5-oci-runtimes.webp" alt="OCIコンテナランタイムスタック — CRI、containerd、runc" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="oci">1. OCI — Open Container Initiative</h2>

<p><strong>OCI</strong>はLinux Foundation傘下のオープン組織で、コンテナのオープンスタンダードを定義しています：</p>

<table>
<thead><tr><th>仕様</th><th>定義</th><th>実装例</th></tr></thead>
<tbody>
<tr><td><strong>OCI Image Spec</strong></td><td>コンテナイメージの形式（レイヤー、マニフェスト）</td><td>Dockerイメージ、OCIイメージ</td></tr>
<tr><td><strong>OCI Runtime Spec</strong></td><td>イメージからコンテナを実行する方法（ライフサイクル、ファイルシステム）</td><td>runc、crun、kata-containers</td></tr>
<tr><td><strong>OCI Distribution Spec</strong></td><td>レジストリからイメージをpush/pullするAPI</td><td>DockerHub、ECR、GCR</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong> OCI標準は<strong>相互運用性</strong>を保証します：Dockerでビルドしたイメージは変更なしでcontainerdやCRI-Oで実行できます。KCNAではクラウドネイティブエコシステムにおけるOCIの役割についてよく出題されます。</p></blockquote>

<h2 id="container-runtime">2. Container Runtime Interface (CRI)</h2>

<p>KubernetesはDockerやcontainerdと直接通信しません。代わりに、kubeletは<strong>CRI（Container Runtime Interface）</strong>という標準gRPC APIを使用します。</p>

<pre><code class="language-text">Kubernetes Architecture (Runtime Layer):

  kubelet
     │ CRI (gRPC)
     ├─── containerd ─── runc ─── container
     ├─── CRI-O      ─── runc ─── container
     └─── (Docker)   ─── (deprecated v1.24+)

  OCI Runtime (runc, crun):
  - OCI runtime bundleを読み取り
  - Linuxカーネルを呼び出し（namespaces、cgroups）
  - コンテナプロセスを作成</code></pre>

<h2 id="runtimes-comparison">3. コンテナランタイムの比較</h2>

<table>
<thead><tr><th>ランタイム</th><th>種類</th><th>特徴</th><th>使用環境</th></tr></thead>
<tbody>
<tr><td><strong>containerd</strong></td><td>ハイレベル（CRI）</td><td>軽量、安定、CNCF graduated</td><td>Kubernetes 1.24+のデフォルト</td></tr>
<tr><td><strong>CRI-O</strong></td><td>ハイレベル（CRI）</td><td>Kubernetes向けに最適化、軽量</td><td>OpenShift、Kubernetes</td></tr>
<tr><td><strong>Docker Engine</strong></td><td>ハイレベル（非CRI）</td><td>K8s 1.24から非推奨（dockershim使用）</td><td>開発環境</td></tr>
<tr><td><strong>runc</strong></td><td>ローレベル（OCI）</td><td>OCI参照実装</td><td>containerd/CRI-Oのバックエンド</td></tr>
<tr><td><strong>gVisor (runsc)</strong></td><td>ローレベル（サンドボックス）</td><td>セキュリティサンドボックス、syscallをインターセプト</td><td>GKEサンドボックス、信頼できないワークロード</td></tr>
<tr><td><strong>Kata Containers</strong></td><td>ローレベル（VMベース）</td><td>コンテナごとにVM分離</td><td>マルチテナント、高セキュリティ</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong> Dockerはv1.24からKubernetesランタイムとして非推奨ですが、Dockerイメージ（OCI互換）はcontainerd/CRI-Oで引き続き実行できます。「Docker非推奨」≠「Dockerイメージ非推奨」。</p></blockquote>

<h2 id="image-layers">4. コンテナイメージレイヤー</h2>

<pre><code class="language-text">Layer architecture:
┌──────────────────────────────┐
│  Layer 4: App code (5 MB)    │  ← Writeable (container layer)
├──────────────────────────────┤
│  Layer 3: npm packages       │  ← Read-only
├──────────────────────────────┤
│  Layer 2: Node.js runtime    │  ← Read-only
├──────────────────────────────┤
│  Layer 1: Ubuntu base image  │  ← Read-only (shared across images)
└──────────────────────────────┘

キャッシュの利点: Layer 1-2が同じであれば、Layer 3-4のみダウンロード</code></pre>

<h2 id="registries">5. コンテナレジストリ</h2>

<table>
<thead><tr><th>レジストリ</th><th>プロバイダー</th><th>特徴</th></tr></thead>
<tbody>
<tr><td>Docker Hub</td><td>Docker Inc.</td><td>パブリックデフォルト、プルにレート制限あり</td></tr>
<tr><td>ECR (Elastic Container Registry)</td><td>AWS</td><td>プライベート、IAM統合</td></tr>
<tr><td>GCR / Artifact Registry</td><td>GCP</td><td>プライベート、Workload Identity</td></tr>
<tr><td>GHCR (GitHub Container Registry)</td><td>GitHub</td><td>パッケージ連携、Actions CI</td></tr>
<tr><td>Harbor</td><td>CNCF（オープンソース）</td><td>セルフホスト、脆弱性スキャン</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">6. チートシート</h2>

<table>
<thead><tr><th>試験の質問</th><th>回答</th></tr></thead>
<tbody>
<tr><td>OCIが定義する標準は？</td><td>Image Spec、Runtime Spec、Distribution Spec</td></tr>
<tr><td>K8s 1.24+のデフォルトランタイムは？</td><td><strong>containerd</strong></td></tr>
<tr><td>CRIとは？</td><td>Container Runtime Interface — kubeletとランタイム間のgRPC API</td></tr>
<tr><td>DockerのK8sでの非推奨は？</td><td><strong>v1.24から</strong>（dockershim削除）</td></tr>
<tr><td>信頼できないワークロード向けランタイムは？</td><td><strong>gVisor</strong>または<strong>Kata Containers</strong></td></tr>
</tbody>
</table>

<h2 id="practice">7. 練習問題</h2>

<p><strong>Q1:</strong> Kubernetesクラスターがcontainerdをコンテナランタイムとして使用しています。開発者がDocker HubにDockerイメージをプッシュしました。このイメージはクラスターで実行できますか？</p>
<ul>
<li>A) いいえ、Dockerイメージはcontainerdと互換性がない</li>
<li>B) はい、DockerイメージはOCI Image Specに準拠しており互換性がある ✓</li>
<li>C) クラスターにDocker互換shimをインストールした場合のみ</li>
<li>D) いいえ、containerdはCNCFレジストリのイメージのみサポート</li>
</ul>
<p><em>解説：DockerイメージはOCI Image Specに準拠しているため、containerdやCRI-Oを含むOCI準拠のランタイムと相互運用可能です。「Docker非推奨」はランタイムを指し、イメージ形式ではありません。</em></p>

<p><strong>Q2:</strong> Container Runtime Interface（CRI）の主な目的は何ですか？</p>
<ul>
<li>A) イメージレイヤー形式を定義する</li>
<li>B) kubeletがコンテナランタイムと通信するためのgRPC APIを提供する ✓</li>
<li>C) レジストリ間のコンテナイメージ配布を管理する</li>
<li>D) クラスターノード間でコンテナをスケジュールする</li>
</ul>
<p><em>解説：CRIはkubeletに異なるランタイム（containerd、CRI-O）と実装の詳細を知らずに対話するための安定したAPIを提供します。この分離により、kubeletのコードを変更せずにランタイムを切り替えることができます。</em></p>

<p><strong>Q3:</strong> 高セキュリティのマルチテナントワークロードに対してコンテナごとにVMレベルの分離を提供するコンテナランタイムはどれですか？</p>
<ul>
<li>A) containerd</li>
<li>B) CRI-O</li>
<li>C) Kata Containers ✓</li>
<li>D) runc</li>
</ul>
<p><em>解説：Kata Containersは各コンテナを軽量VM内で実行し、標準的なLinux namespaceベースのコンテナよりも強力な分離を提供します。gVisorはsyscallインターセプトによるユーザースペース分離を提供し、これも強力ですがアプローチが異なります。</em></p>
