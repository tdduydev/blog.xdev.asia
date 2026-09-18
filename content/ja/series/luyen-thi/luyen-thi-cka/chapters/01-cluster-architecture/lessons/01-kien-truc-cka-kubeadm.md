---
id: cka-d1-l01
title: 'レッスン1: Kubernetesアーキテクチャ & クラスタコンポーネント'
slug: 01-kien-truc-cka-kubeadm
description: >-
  コントロールプレーンとワーカーノードのコンポーネント。kubeadmクラスタブートストラップ。
  CKA試験環境でのETCD、API Server、Scheduler、Controller Manager。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: "ドメイン1: Cluster Architecture, Installation & Configuration (25%)"
course:
  id: lt-cka-series-001
  title: 'CKA認定試験対策 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai1-kubeadm.webp" alt="kubeadm クラスタ初期化シーケンスとkubeconfig" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="architecture">1. Kubernetesアーキテクチャ概要（CKA重点）</h2>

<p>CKA試験では理論だけでなく、クラスタコンポーネントのトラブルシューティングが求められます。</p>

<pre><code class="language-text">コントロールプレーンノード           ワーカーノード
──────────────────                 ────────────
  kube-apiserver  ◄──────────────── kubelet
  etcd                               kube-proxy
  kube-scheduler                     コンテナランタイム
  controller-manager                 (containerd)
  cloud-controller-manager (任意)
  
全コンポーネントはkube-apiserverを介して通信（etcdのみAPI serverと直接通信）</code></pre>

<table>
<thead><tr><th>コンポーネント</th><th>場所</th><th>設定 / Podパス</th><th>トラブルシュート</th></tr></thead>
<tbody>
<tr><td><strong>kube-apiserver</strong></td><td>コントロールプレーン</td><td><code>/etc/kubernetes/manifests/kube-apiserver.yaml</code></td><td>kubectl get pods -n kube-system</td></tr>
<tr><td><strong>etcd</strong></td><td>コントロールプレーン</td><td><code>/etc/kubernetes/manifests/etcd.yaml</code></td><td>etcdctl member list</td></tr>
<tr><td><strong>kube-scheduler</strong></td><td>コントロールプレーン</td><td><code>/etc/kubernetes/manifests/kube-scheduler.yaml</code></td><td>kube-systemのログ確認</td></tr>
<tr><td><strong>controller-manager</strong></td><td>コントロールプレーン</td><td><code>/etc/kubernetes/manifests/kube-controller-manager.yaml</code></td><td>kube-systemのログ確認</td></tr>
<tr><td><strong>kubelet</strong></td><td>全ノード</td><td><code>/var/lib/kubelet/config.yaml</code>、systemdサービス</td><td>systemctl status kubelet</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong>kubeadmクラスタでは、コントロールプレーンコンポーネントは<strong>静的Pod</strong>（<code>/etc/kubernetes/manifests/</code>内のファイル）として実行されます。kubeletが自動的に起動・再起動します。マニフェストファイルを編集すると、kubeletがPodを自動リロードします（kubectl applyは不要）。</p></blockquote>

<h2 id="kubeadm">2. kubeadm — クラスタブートストラップ</h2>

<pre><code class="language-text"># 1. コントロールプレーンの初期化
sudo kubeadm init \
  --pod-network-cidr=10.244.0.0/16 \
  --apiserver-advertise-address=192.168.1.10

# 2. kubeconfigの設定
mkdir -p $HOME/.kube
sudo cp /etc/kubernetes/admin.conf $HOME/.kube/config

# 3. CNI（Pod Network）のインストール
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml

# 4. ワーカーノードの参加
kubeadm join 192.168.1.10:6443 --token xxx --discovery-token-ca-cert-hash sha256:yyy</code></pre>

<h2 id="static-pods">3. 静的Pod & マニフェスト</h2>

<pre><code class="language-text"># 静的Podのパス
/etc/kubernetes/manifests/
├── etcd.yaml
├── kube-apiserver.yaml
├── kube-controller-manager.yaml
└── kube-scheduler.yaml

# kubeletの静的Podパスを確認
cat /var/lib/kubelet/config.yaml | grep staticPodPath
# staticPodPath: /etc/kubernetes/manifests

# トラブルシュート: コンポーネントが起動しない場合
kubectl get pods -n kube-system
kubectl describe pod kube-apiserver-controlplane -n kube-system
kubectl logs kube-apiserver-controlplane -n kube-system</code></pre>

<h2 id="kubeconfig">4. kubeconfig & コンテキスト</h2>

<pre><code class="language-text"># 現在のコンテキスト
kubectl config current-context

# コンテキストの切り替え（CKA試験では各問題でクラスタ切り替えが必要）
kubectl config use-context cluster1

# kubeconfigの確認
kubectl config view
cat ~/.kube/config</code></pre>

<h2 id="cheatsheet">5. チートシート</h2>

<table>
<thead><tr><th>タスク</th><th>コマンド</th></tr></thead>
<tbody>
<tr><td>クラスタ初期化</td><td><code>kubeadm init --pod-network-cidr=...</code></td></tr>
<tr><td>ノード参加トークン生成</td><td><code>kubeadm token create --print-join-command</code></td></tr>
<tr><td>コントロールプレーンPod確認</td><td><code>kubectl get pods -n kube-system</code></td></tr>
<tr><td>静的Podマニフェスト</td><td><code>ls /etc/kubernetes/manifests/</code></td></tr>
<tr><td>kubelet設定確認</td><td><code>cat /var/lib/kubelet/config.yaml</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習問題</h2>

<p><strong>Q1：</strong>kubeadmクラスタでkube-apiserverが動作していない場合、最初に確認すべきファイルは？</p>
<ul>
<li>A) /etc/kubernetes/kubelet.conf</li>
<li>B) /etc/kubernetes/manifests/kube-apiserver.yaml ✓</li>
<li>C) ~/.kube/config</li>
<li>D) /var/log/syslog</li>
</ul>
<p><em>解説：kubeadmクラスタではkube-apiserverは静的Podとして実行されます。kubeletはマニフェストの変更を検知して自動リロードします。YAMLの構文エラーや設定ミスが最も一般的な原因です。</em></p>

<p><strong>Q2：</strong>新しいワーカーノードをクラスタに参加させるjoinコマンドを取得する方法は？</p>
<ul>
<li>A) kubectl get nodes --join-command</li>
<li>B) kubeadm token create --print-join-command ✓</li>
<li>C) kubeadm init --print-join</li>
<li>D) kubectl cluster-info --join</li>
</ul>
<p><em>解説：kubeadm token create --print-join-commandは新しいトークンを生成し、完全なjoinコマンドを表示します。トークンのデフォルト有効期限は24時間です。</em></p>

<p><strong>Q3：</strong>kube-schedulerが停止すると何が起きますか？</p>
<ul>
<li>A) 既存のPodがクラッシュする</li>
<li>B) 新しいPodがPending状態のまま、ノードにスケジュールされない ✓</li>
<li>C) クラスタ全体が停止する</li>
<li>D) すべてのServiceが到達不能になる</li>
</ul>
<p><em>解説：kube-schedulerは新しいPodをノードに割り当てる役割を担います。停止すると、新しいPodはPending状態のままになります。既に実行中のPodは影響を受けません。</em></p>
