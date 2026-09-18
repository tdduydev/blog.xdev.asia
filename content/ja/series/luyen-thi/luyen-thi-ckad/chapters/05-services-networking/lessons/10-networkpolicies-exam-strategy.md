---
id: ckad-d5-l10
title: 'レッスン10: NetworkPolicies & CKAD試験戦略'
slug: 10-networkpolicies-exam-strategy
description: >-
  NetworkPolicyのingress/egressルール、default-denyパターンとpod selector。
  CKAD試験戦略: kubectlショートカット、--dry-runパターンと時間管理。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 10
section_title: "ドメイン5: Services and Networking (20%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD試験対策 — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai10-networkpolicy.webp" alt="NetworkPolicy — ingress/egressルール、default-denyとAND/ORロジック" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="networkpolicy">1. NetworkPolicy</h2>

<p>デフォルトでは、クラスター内のすべてのPodが相互に通信できます。NetworkPolicyはラベルに基づいてトラフィックを制限します。</p>

<pre><code class="language-text">デフォルト: 全PodがすべてのPodと通信可能（制限なし）

default-deny-all適用後:
  Pod A ──✗──► Pod B（ブロック）
  Pod A ──✗──► Pod C（ブロック）

allowポリシー適用後:
  Pod A (app=frontend) ──✓──► Pod B (app=backend, port 3000)
  Pod A ──✗──► Pod C (app=database)（依然ブロック）</code></pre>

<h2 id="policy-syntax">2. NetworkPolicy構文</h2>

<pre><code class="language-text">apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-policy
  namespace: production
spec:
  podSelector:         # これらのPodに適用（空 = NS内の全Pod）
    matchLabels:
      app: backend
  policyTypes:
  - Ingress            # インバウンドトラフィックを制御
  - Egress             # アウトバウンドトラフィックを制御
  ingress:
  - from:
    - podSelector:     # このラベルのPodからの通信を許可
        matchLabels:
          app: frontend
    - namespaceSelector: # このNamespaceのPodからの通信を許可
        matchLabels:
          name: production
    ports:
    - protocol: TCP
      port: 3000
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: database
    ports:
    - protocol: TCP
      port: 5432</code></pre>

<blockquote><p><strong>試験のポイント — NetworkPolicyのAND vs OR:</strong><br/>
<code>from: [{podSelector}, {namespaceSelector}]</code> = OR（いずれかのselectorに一致するPod）<br/>
<code>from: [{podSelector + namespaceSelector}]</code> 同じアイテム内 = AND（両方に一致するPod）<br/>
CKADで最もトリッキーなひっかけ問題の一つです。</p></blockquote>

<h2 id="common-patterns">3. よく使われるパターン</h2>

<pre><code class="language-text">パターン1: 全ingressをデフォルト拒否
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
spec:
  podSelector: {}     # 空 = 全Podに一致
  policyTypes:
  - Ingress
  # ingressルールなし = 全ingressを拒否

パターン2: 全トラフィックをデフォルト拒否（ingress + egress両方）
---
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  # ルールなし = 全拒否

パターン3: 全ingressを許可（denyをオーバーライド）
---
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  ingress:
  - {}  # 空のルール = 全ingressを許可</code></pre>

<table>
<thead><tr><th>パターン</th><th>policyTypes</th><th>ルール</th><th>効果</th></tr></thead>
<tbody>
<tr><td>全ingress拒否</td><td>[Ingress]</td><td>ingressルールなし</td><td>全インバウンドをブロック</td></tr>
<tr><td>全egress拒否</td><td>[Egress]</td><td>egressルールなし</td><td>全アウトバウンドをブロック</td></tr>
<tr><td>特定を許可</td><td>[Ingress]</td><td>ingressルールを列挙</td><td>一致するもののみ許可</td></tr>
<tr><td>DNS egressを許可</td><td>[Egress]</td><td>ポート53（UDP+TCP）宛て</td><td>DNSクエリを許可</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント:</strong> NetworkPolicyはCNIプラグインがサポートしている場合のみ動作します（Calico、Cilium、Weave）。<strong>FlannelはNetworkPolicyをサポートしません！</strong> Ingress/Egressルールは加算的 — 同じPodに複数のポリシーが適用される場合、KubernetesはすべてのルールをOR結合します。</p></blockquote>

<h2 id="exam-strategy">4. CKAD試験戦略</h2>

<pre><code class="language-text">試験情報:
- 2時間、約15-20のハンズオンタスク（パフォーマンスベース）
- 各タスクの配点が異なる（配点の高いタスクを優先）
- 合格点: 66%
- 参照可能: kubernetes.io/docs + helm.sh/docs

重要なキーボードショートカット:
  k = kubectl（試験でexport alias k=kubectlが事前設定済み）
  CTRL+R = コマンド履歴を検索
  CTRL+A = 行頭に移動</code></pre>

<pre><code class="language-text">各タスクのワークフロー:

1. タスク説明を注意深く読む（Namespaceに注意！）
2. 必要に応じてcontextを切り替え:
   kubectl config use-context cluster-name
3. Namespaceショートカットを設定:
   export ns=target-namespace
   alias kn="kubectl -n $ns"
4. --dry-run=client -o yamlでYAMLを生成:
   kubectl run pod --image=nginx --dry-run=client -o yaml > pod.yaml
5. YAMLを編集、apply、確認:
   kubectl apply -f pod.yaml
   kubectl get pods -n $ns</code></pre>

<h2 id="dry-run-pattern">5. --dry-runパターン</h2>

<pre><code class="language-text"># 手書きより速くYAMLテンプレートを生成:

Pod:
  kubectl run nginx --image=nginx --dry-run=client -o yaml > pod.yaml

Deployment:
  kubectl create deployment myapp --image=nginx --replicas=3 \
    --dry-run=client -o yaml > deploy.yaml

Service（ClusterIP）:
  kubectl create service clusterip myapp --tcp=80:8080 \
    --dry-run=client -o yaml > svc.yaml

ConfigMap:
  kubectl create configmap myconfig --from-literal=k=v \
    --dry-run=client -o yaml > cm.yaml

Secret:
  kubectl create secret generic mysecret --from-literal=pass=secret \
    --dry-run=client -o yaml > secret.yaml

Job:
  kubectl create job myjob --image=busybox -- echo hello \
    --dry-run=client -o yaml > job.yaml

CronJob:
  kubectl create cronjob mycron --image=busybox --schedule="*/1 * * * *" \
    -- echo hello --dry-run=client -o yaml > cron.yaml</code></pre>

<h2 id="kubectl-shortcuts">6. 必須kubectlショートカット</h2>

<table>
<thead><tr><th>フルコマンド</th><th>短縮形</th></tr></thead>
<tbody>
<tr><td><code>kubectl get pods</code></td><td><code>k get po</code></td></tr>
<tr><td><code>kubectl get deployments</code></td><td><code>k get deploy</code></td></tr>
<tr><td><code>kubectl get services</code></td><td><code>k get svc</code></td></tr>
<tr><td><code>kubectl get namespaces</code></td><td><code>k get ns</code></td></tr>
<tr><td><code>kubectl get persistentvolumeclaims</code></td><td><code>k get pvc</code></td></tr>
<tr><td><code>kubectl get configmaps</code></td><td><code>k get cm</code></td></tr>
<tr><td><code>kubectl get serviceaccounts</code></td><td><code>k get sa</code></td></tr>
<tr><td><code>kubectl get networkpolicies</code></td><td><code>k get netpol</code></td></tr>
<tr><td><code>kubectl describe pod mypod</code></td><td><code>k describe po mypod</code></td></tr>
<tr><td><code>kubectl delete pod mypod --force</code></td><td><code>k delete po mypod --force</code></td></tr>
</tbody>
</table>

<h2 id="cheatsheet">7. 最終CKADチートシート</h2>

<table>
<thead><tr><th>ドメイン</th><th>主要トピック</th><th>配点</th></tr></thead>
<tbody>
<tr><td>App Design & Build</td><td>マルチコンテナ、Init Containers、Jobs、CronJobs、ボリューム</td><td>20%</td></tr>
<tr><td>App Deployment</td><td>Rolling updates、rollbacks、Helm、Kustomize</td><td>20%</td></tr>
<tr><td>App Observability</td><td>Probes（liveness/readiness/startup）、logs、debug</td><td>15%</td></tr>
<tr><td>App Env/Config/Security</td><td>ConfigMaps、Secrets、SecurityContext、SA、Resources、QoS</td><td>25%</td></tr>
<tr><td>Services & Networking</td><td>Services、Ingress、NetworkPolicies</td><td>20%</td></tr>
</tbody>
</table>

<h2 id="practice">8. 練習問題</h2>

<p><strong>Q1:</strong> podSelector: {} と policyTypes: [Ingress] のNetworkPolicyを適用しましたが、ingressルールはありません。何が起こりますか？</p>
<ul>
<li>A) 全ingressトラフィックが許可される（ルールなし = 制限なし）</li>
<li>B) Namespace内の全Podへの全ingressトラフィックが拒否される ✓</li>
<li>C) 全Podが削除される</li>
<li>D) 外部ingressのみ拒否、内部Pod間通信は許可</li>
</ul>
<p><em>解説: podSelector: {} はNamespace内の全Podに一致します。policyTypes: [Ingress] はこのポリシーがingressを制御することを示します。ingressルールがないということは、ゼロのトラフィックが許可されることを意味します。これが「全ingressをデフォルト拒否」パターンです。ソースに関係なく、クラスター内のPod間通信も拒否されます。</em></p>

<p><strong>Q2:</strong> NetworkPolicyの以下の2つのfrom句の違いは何ですか？<br/>
句A: from: [{podSelector: {app: web}}, {namespaceSelector: {env: prod}}]<br/>
句B: from: [{podSelector: {app: web}, namespaceSelector: {env: prod}}]</p>
<ul>
<li>A) 同じ意味</li>
<li>B) 句A: app=webのPodから、またはenv=prod Namespaceの任意のPodからの通信を許可。句B: env=prod Namespaceに属するapp=webのPodからのみ許可 ✓</li>
<li>C) 句AがANDロジック、句BがORロジック</li>
<li>D) 句Bは無効なYAML構文</li>
</ul>
<p><em>解説: NetworkPolicyでは、podSelectorとnamespaceSelectorが別々のリストアイテム（-で区切られている）にある場合はORロジックです。同じリストアイテム（同じインデントレベル、-なし）にある場合はANDロジックです。これは重要な違いであり、試験でのよくあるひっかけ問題です。</em></p>

<p><strong>Q3:</strong> CKAD試験中に特定のPod specを持つDeploymentを作成する必要があります。最速のアプローチはどれですか？</p>
<ul>
<li>A) 暗記でYAML全体を手書き</li>
<li>B) kubernetes.ioドキュメントからサンプルYAMLを検索してコピー&ペースト</li>
<li>C) kubectl create deployment --dry-run=client -o yamlでテンプレートを生成して編集 ✓</li>
<li>D) Helmでデフォルト値のチャートをデプロイ</li>
</ul>
<p><em>解説: --dry-run=client -o yaml パターンはリソースを作成せずに有効なYAMLを生成します。ファイルにリダイレクトし、異なるフィールドのみ編集して適用します。手動YAML作成より速く、構文エラーの可能性も低くなります。> file.yamlとの組み合わせで正確な編集が可能です。</em></p>
