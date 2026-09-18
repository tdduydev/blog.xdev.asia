---
id: cka-d1-l02
title: 'レッスン2: クラスタアップグレード（kubeadm）'
slug: 02-cluster-upgrade-kubeadm
description: >-
  kubeadmでクラスタをアップグレードする手順。コントロールプレーンとワーカーノードの
  段階的アップグレード。バージョンスキューポリシー、drain/uncordon。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 2
section_title: "ドメイン1: Cluster Architecture, Installation & Configuration (25%)"
course:
  id: lt-cka-series-001
  title: 'CKA認定試験対策 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai2-upgrade.webp" alt="kubeadmクラスタアップグレードフロー — コントロールプレーンとワーカー" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="version-skew">1. バージョンスキューポリシー</h2>

<table>
<thead><tr><th>コンポーネント</th><th>許容バージョン差</th></tr></thead>
<tbody>
<tr><td>kube-apiserver</td><td>基準バージョン (例: 1.30)</td></tr>
<tr><td>controller-manager, scheduler</td><td>apiserver ± 1 (例: 1.29–1.30)</td></tr>
<tr><td>kubelet</td><td>apiserver -2 〜 apiserver (例: 1.28–1.30)</td></tr>
<tr><td>kubectl</td><td>apiserver ± 1</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong>1マイナーバージョンずつアップグレードする必要があります（例: 1.29 → 1.30 → 1.31）。バージョンスキップはサポートされていません。</p></blockquote>

<h2 id="upgrade-controlplane">2. コントロールプレーンのアップグレード</h2>

<pre><code class="language-text"># ステップ1: kubeadmのアップグレード
sudo apt-get update
sudo apt-get install -y kubeadm=1.30.0-00
kubeadm version  # 確認

# ステップ2: アップグレードプランの確認
sudo kubeadm upgrade plan

# ステップ3: コントロールプレーンの適用
sudo kubeadm upgrade apply v1.30.0

# ステップ4: ノードのdrain
kubectl drain controlplane --ignore-daemonsets

# ステップ5: kubelet & kubectlのアップグレード
sudo apt-get install -y kubelet=1.30.0-00 kubectl=1.30.0-00
sudo systemctl daemon-reload
sudo systemctl restart kubelet

# ステップ6: uncordon
kubectl uncordon controlplane</code></pre>

<h2 id="upgrade-worker">3. ワーカーノードのアップグレード</h2>

<pre><code class="language-text"># コントロールプレーンからdrainを実行
kubectl drain worker1 --ignore-daemonsets --delete-emptydir-data

# ワーカーノードにSSH
ssh worker1

# kubeadmのアップグレード
sudo apt-get update
sudo apt-get install -y kubeadm=1.30.0-00

# ノード設定のアップグレード
sudo kubeadm upgrade node

# kubeletのアップグレード
sudo apt-get install -y kubelet=1.30.0-00
sudo systemctl daemon-reload
sudo systemctl restart kubelet

# コントロールプレーンに戻ってuncordon
exit
kubectl uncordon worker1</code></pre>

<h2 id="drain-cordon">4. drain & cordon</h2>

<table>
<thead><tr><th>コマンド</th><th>動作</th></tr></thead>
<tbody>
<tr><td><code>kubectl cordon NODE</code></td><td>新しいPodのスケジュールを無効化（既存Podは維持）</td></tr>
<tr><td><code>kubectl drain NODE</code></td><td>cordon + 既存Podの退避（eviction）</td></tr>
<tr><td><code>kubectl uncordon NODE</code></td><td>スケジュール可能に戻す</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">5. チートシート</h2>

<table>
<thead><tr><th>タスク</th><th>コマンド</th></tr></thead>
<tbody>
<tr><td>アップグレード計画確認</td><td><code>kubeadm upgrade plan</code></td></tr>
<tr><td>コントロールプレーン適用</td><td><code>kubeadm upgrade apply v1.30.0</code></td></tr>
<tr><td>ワーカーノード設定更新</td><td><code>kubeadm upgrade node</code></td></tr>
<tr><td>ノードのdrain</td><td><code>kubectl drain NODE --ignore-daemonsets</code></td></tr>
<tr><td>ノードのuncordon</td><td><code>kubectl uncordon NODE</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習問題</h2>

<p><strong>Q1：</strong>コントロールプレーンのアップグレード手順として正しい順序は？</p>
<ul>
<li>A) kubelet → kubeadm → kubectl</li>
<li>B) kubeadm → kubeadm upgrade apply → drain → kubelet/kubectl → uncordon ✓</li>
<li>C) kubectl → kubeadm → kubelet</li>
<li>D) drain → kubeadm → kubelet → uncordon → kubeadm upgrade</li>
</ul>
<p><em>解説：正しい順序は、まずkubeadmパッケージをアップグレードし、kubeadm upgrade applyを実行、ノードをdrain、kubeletとkubectlをアップグレード、最後にuncordonです。</em></p>

<p><strong>Q2：</strong>kubectl drain node1で--ignore-daemonsetsフラグを使用しない場合、何が起きますか？</p>
<ul>
<li>A) DaemonSetのPodが削除される</li>
<li>B) drainがエラーで失敗する — DaemonSetのPodは退避できないため ✓</li>
<li>C) 全てのPodが正常に退避される</li>
<li>D) DaemonSetが自動的にスケールダウンする</li>
</ul>
<p><em>解説：DaemonSetのPodは各ノードに1つずつ配置される設計です。drainで退避しようとするとエラーになります。--ignore-daemonsetsフラグでDaemonSetのPodを無視してdrainを続行します。</em></p>

<p><strong>Q3：</strong>Kubernetes v1.29のクラスタをv1.31にアップグレードすることは可能ですか？</p>
<ul>
<li>A) はい、kubeadm upgrade apply v1.31.0を直接実行できる</li>
<li>B) いいえ、まずv1.30にアップグレードしてからv1.31にする必要がある ✓</li>
<li>C) はい、--skip-versionフラグを使えば可能</li>
<li>D) いいえ、クラスタを再構築する必要がある</li>
</ul>
<p><em>解説：Kubernetesのアップグレードは1マイナーバージョンずつ行う必要があります。v1.29 → v1.30 → v1.31の順序でアップグレードします。バージョンスキップは予期しない互換性問題を引き起こす可能性があります。</em></p>
