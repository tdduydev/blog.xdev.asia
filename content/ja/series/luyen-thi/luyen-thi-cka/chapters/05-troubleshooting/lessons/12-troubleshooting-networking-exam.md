---
id: cka-d5-l12
title: 'レッスン12: ネットワークトラブルシューティング & 試験戦略'
slug: 12-troubleshooting-networking-exam
description: >-
  ネットワーク接続性のデバッグ。DNS問題、Serviceへの到達不能。クラスタネットワーキングフロー。
  CKA試験のコツ、時間管理とコマンドショートカット。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 12
section_title: "ドメイン5: Troubleshooting (30%)"
course:
  id: lt-cka-series-001
  title: 'CKA認定試験対策 — Certified Kubernetes Administrator'
  slug: luyen-thi-cka
---

<img src="/storage/uploads/2026/04/k8s-cert-cka-bai12-network-debug.webp" alt="ネットワークトラブルシューティングレイヤー — レイヤーごとのデバッグアプローチ" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="network-debug">1. ネットワークトラブルシューティングワークフロー</h2>

<pre><code class="language-text">ネットワーク接続性の問題:
  Pod AがPod B（またはService）に到達できない
  
  レイヤーごとのデバッグ:
  
  1. 同じノード、同じNamespace？
     kubectl exec pod-a -- ping POD_B_IP

  2. 異なるノード？
     kubectl get pod pod-a pod-b -o wide  # ノード配置を確認

  3. Service名（DNS）経由？
     kubectl exec pod-a -- nslookup my-service
     kubectl exec pod-a -- wget -qO- http://my-service:8080

  4. NetworkPolicyがブロック？
     kubectl get networkpolicy -n NAMESPACE

  5. kube-proxyが動作中？
     kubectl get pods -n kube-system -l k8s-app=kube-proxy</code></pre>

<h2 id="network-flow">2. フルネットワークフロー図</h2>

<pre><code class="language-text">クライアントPod ──(ルーティング)──► Service ClusterIP (iptables/ipvs)
                                │
                            kube-proxyが以下のいずれかにルーティング:
                           Pod IP 1 | Pod IP 2 | Pod IP 3
                                │
                          CNI (Calico/Flannel)がクロスノードの場合
                          正しいノードにルーティング
                                │
                          コンテナがcontainerPortで受信</code></pre>

<table>
<thead><tr><th>障害コンポーネント</th><th>症状</th><th>対処法</th></tr></thead>
<tbody>
<tr><td>CoreDNS</td><td>DNS解決失敗</td><td>CoreDNS Podを再起動</td></tr>
<tr><td>kube-proxy</td><td>Service IPに到達不能</td><td>kube-proxy DaemonSetを再起動</td></tr>
<tr><td>CNIプラグイン</td><td>クロスノードPod通信失敗</td><td>CNIの再インストールまたはCNI Podを確認</td></tr>
<tr><td>NetworkPolicy</td><td>特定のトラフィックがブロック</td><td>ブロックしているポリシーを確認/削除</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong>ネットワーキングをデバッグする際は、Pod内部から開始（IPで到達可能か？）→ Service（DNS + Endpoints？）→ ノード（CNIルーティング？）→ NetworkPolicy。DNSをテストせずにいきなりkube-proxyを確認しないでください。</p></blockquote>

<h2 id="exam-strategy">3. CKA試験戦略</h2>

<table>
<thead><tr><th>ヒント</th><th>詳細</th></tr></thead>
<tbody>
<tr><td><strong>すぐにコンテキストを切り替え</strong></td><td>各問題はクラスタを指定 → <code>kubectl config use-context CLUSTER</code></td></tr>
<tr><td><strong>--dry-runを使用</strong></td><td><code>kubectl create deploy --dry-run=client -o yaml > file.yaml</code>でYAMLを生成</td></tr>
<tr><td><strong>explainを使用</strong></td><td><code>kubectl explain pod.spec.containers.resources</code>でフィールドヘルプ</td></tr>
<tr><td><strong>素早くブックマーク</strong></td><td>YAMLテンプレートが必要な時はKubernetes docs検索を使用</td></tr>
<tr><td><strong>難問はスキップ</strong></td><td>マークして後で戻る；簡単な問題から先に（30%のトラブルシューティング = 最多配点）</td></tr>
<tr><td><strong>完了後に検証</strong></td><td><code>kubectl get/describe</code>で変更が反映されたか確認</td></tr>
</tbody>
</table>

<h2 id="kubectl-shortcuts">4. 必須kubectlショートカット</h2>

<pre><code class="language-text"># 時間節約のためのエイリアス
alias k=kubectl
alias kgp='kubectl get pods'
alias kgs='kubectl get svc'
alias kns='kubectl config set-context --current --namespace'

# リソース短縮名
po  = pods
svc = services
deploy = deployments
ns  = namespaces
cm  = configmaps
pvc = persistentvolumeclaims
pv  = persistentvolumes
rs  = replicasets
sa  = serviceaccounts
no  = nodes

# よく使うフラグ
-n NAMESPACE    --namespace
-o wide         詳細出力（IP、Node）
-o yaml         完全YAML出力
-o jsonpath     特定フィールドの抽出
--all-namespaces / -A   全Namespaceで検索</code></pre>

<h2 id="exam-commands">5. CKA必須コマンド</h2>

<pre><code class="language-text"># dry-runでYAML生成
kubectl run nginx --image=nginx --dry-run=client -o yaml > pod.yaml
kubectl create deployment myapp --image=myapp --replicas=3 --dry-run=client -o yaml

# フィールドの抽出
kubectl get node NODENAME -o jsonpath='{.status.capacity.cpu}'
kubectl get pod PODNAME -o jsonpath='{.status.podIP}'

# フィールドでソート
kubectl get events --sort-by='.lastTimestamp'
kubectl get pods --sort-by='.status.startTime'

# リソースのウォッチ
kubectl get pods -w

# 全Namespace
kubectl get pods -A
kubectl get pods -A | grep CrashLoop</code></pre>

<h2 id="cheatsheet">6. CKAクイックリファレンス</h2>

<table>
<thead><tr><th>ドメイン（配点）</th><th>主要トピック</th></tr></thead>
<tbody>
<tr><td>Cluster Architecture (25%)</td><td>kubeadm、静的Pod、kubeconfig、RBAC</td></tr>
<tr><td>Workloads (15%)</td><td>Deployments、rollout、DaemonSet、StatefulSet、スケジューリング</td></tr>
<tr><td>Services & Networking (20%)</td><td>Services、Ingress、NetworkPolicy、DNS</td></tr>
<tr><td>Storage (10%)</td><td>PV、PVC、StorageClass、ボリュームマウント</td></tr>
<tr><td><strong>Troubleshooting (30%)</strong></td><td>ノード、ワークロード、ネットワークデバッグ — 最高配点</td></tr>
</tbody>
</table>

<h2 id="practice">7. 練習問題</h2>

<p><strong>Q1：</strong>PodがService名で到達できませんがIP直接では成功します。DNS解決が失敗しています。CoreDNS Podは実行中です。何を確認すべきですか？</p>
<ul>
<li>A) kube-proxyの設定</li>
<li>B) Podの/etc/resolv.confのnameserverエントリ ✓</li>
<li>C) ノードのiptablesルール</li>
<li>D) ServiceのtargetPort</li>
</ul>
<p><em>解説：IPでは到達可能だがDNSが失敗する場合、PodがCoreDNSサーバーを使用していません。Pod内の/etc/resolv.confを確認 — kube-dns ClusterIPがnameserverとして表示されるべきです。表示されない場合、PodのdnsPolicyまたはdnsConfigがデフォルトをオーバーライドしている可能性があります。</em></p>

<p><strong>Q2：</strong>CKA試験で新しい問題に取り組む際、最初に必ず行うことは？</p>
<ul>
<li>A) そのトピックのKubernetesドキュメントを読む</li>
<li>B) kubectl config use-contextで正しいクラスタコンテキストに切り替える ✓</li>
<li>C) 現在のクラスタ状態のバックアップを作成する</li>
<li>D) クラスタの既存リソースを確認する</li>
</ul>
<p><em>解説：CKAは複数のクラスタを使用します。各問題はクラスタを指定します。まずコンテキストを切り替えてください — 間違ったクラスタで作業すると、完璧に実行しても不合格になります。これが試験での#1のミスです。</em></p>

<p><strong>Q3：</strong>Deployment「webapp」をポート80でNodePort Serviceとして外部に公開する最速の方法は？</p>
<ul>
<li>A) Service YAMLを記述してkubectl applyする</li>
<li>B) kubectl expose deployment webapp --type=NodePort --port=80 ✓</li>
<li>C) kubectl create service nodeport webapp --tcp=80:80</li>
<li>D) Deployment YAMLを編集してhostPortを追加する</li>
</ul>
<p><em>解説：kubectl exposeが最速です — Deploymentの既存セレクタを使用してPodをターゲットにするServiceを作成します。YAML編集が不要です。選択肢Cも動作しますが、Deploymentの既存セレクタを使用しません。</em></p>
