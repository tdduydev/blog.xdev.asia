---
id: kcna-d1-l04
title: 'レッスン4：RBACとKubernetesセキュリティ'
slug: 04-rbac-security
description: >-
  ロールベースアクセス制御（RBAC）、ServiceAccount、NetworkPolicy、
  Pod Security StandardsとSecurityContext。Kubernetesクラスターのセキュリティ。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 4
section_title: "Domain 1: Kubernetes Fundamentals (46%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA試験対策 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai4-rbac.webp" alt="RBAC認可モデル — Subject、RoleBinding、Role、Rules" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="rbac">1. RBAC — ロールベースアクセス制御</h2>

<p><strong>RBAC</strong>は誰（User、Group、ServiceAccount）がどのリソース（resources）に対して何（verbs）ができるかを、namespaceまたはクラスターレベルで制御します。</p>

<pre><code class="language-text">RBAC Flow:
Subject (Who?)    →    Role/ClusterRole (What?)    →    RoleBinding (Links)

  User "alice"          Role "pod-reader"              RoleBinding
  ServiceAccount        - get pods                     alice → pod-reader
  Group "devs"          - list pods                    (in namespace "dev")
                        - watch pods</code></pre>

<table>
<thead><tr><th>オブジェクト</th><th>スコープ</th><th>使用場面</th></tr></thead>
<tbody>
<tr><td><strong>Role</strong></td><td>Namespace</td><td>1つのnamespace内の権限</td></tr>
<tr><td><strong>ClusterRole</strong></td><td>Cluster-wide</td><td>クラスター全体またはnamespaceに属さないリソース（nodes）の権限</td></tr>
<tr><td><strong>RoleBinding</strong></td><td>Namespace</td><td>RoleまたはClusterRoleを1つのnamespace内のSubjectに紐付け</td></tr>
<tr><td><strong>ClusterRoleBinding</strong></td><td>Cluster-wide</td><td>ClusterRoleをクラスター全体のSubjectに紐付け</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong> <strong>RoleBinding</strong>で<strong>ClusterRole</strong>を特定のnamespaceに紐付けることができます。これはクラスター全体の権限を付与せずに権限テンプレートを再利用する方法です。試験によく出ます！</p></blockquote>

<h2 id="serviceaccounts">2. ServiceAccount</h2>

<p>各PodにはServiceAccountを関連付けることができます。ServiceAccountのトークンは自動的に<code>/var/run/secrets/kubernetes.io/serviceaccount/</code>にマウントされます。PodはこのトークンでKubernetes APIを呼び出します。</p>

<pre><code class="language-text">Default ServiceAccount flow:
  Pod → ServiceAccount → RBAC Role → API Server

例: PrometheusがPodメトリクスを読み取る必要がある場合:
  ServiceAccount: prometheus-sa
  ClusterRole: pod-metrics-reader (verbs: get, list, watch)
  ClusterRoleBinding: prometheus-sa → pod-metrics-reader</code></pre>

<h2 id="network-policies">3. NetworkPolicy</h2>

<p>デフォルトでは、クラスター内のすべてのPodが相互通信可能です。<strong>NetworkPolicy</strong>はPodセレクター、namespaceセレクター、またはIPブロックに基づいてingress/egressトラフィックを制限します。</p>

<pre><code class="language-text">❌ Default (no NetworkPolicy): All pods talk to all pods
✅ With NetworkPolicy:
   frontend → backend (allowed)
   frontend → database (BLOCKED)
   backend → database (allowed)</code></pre>

<blockquote><p><strong>試験のポイント：</strong> NetworkPolicyは<strong>CNIプラグインがサポートしている</strong>場合のみ有効です（Calico、Cilium、Weave）。FlannelはNetworkPolicyをサポートしません。ポリシーがなければ→全許可。1つでもポリシーがあれば→選択されたトラフィックはデフォルト拒否。</p></blockquote>

<h2 id="pod-security">4. Pod Security Standards</h2>

<p>Kubernetesは3つの<strong>Pod Security Standards</strong>を定義しています（v1.25からPodSecurityPolicyを置き換え）：</p>

<table>
<thead><tr><th>プロファイル</th><th>制限レベル</th><th>用途</th></tr></thead>
<tbody>
<tr><td><strong>Privileged</strong></td><td>制限なし</td><td>システム/インフラワークロード（kube-system）</td></tr>
<tr><td><strong>Baseline</strong></td><td>明らかな権限エスカレーションを防止</td><td>一般的なワークロード</td></tr>
<tr><td><strong>Restricted</strong></td><td>最大限のハードニング準拠</td><td>セキュリティ重視のアプリ</td></tr>
</tbody>
</table>

<h2 id="security-context">5. SecurityContext</h2>

<p><strong>SecurityContext</strong>はPodまたはコンテナレベルでセキュリティを構成します：</p>

<table>
<thead><tr><th>セキュリティ設定</th><th>意味</th></tr></thead>
<tbody>
<tr><td><code>runAsNonRoot: true</code></td><td>コンテナはUID 0で実行不可</td></tr>
<tr><td><code>runAsUser: 1000</code></td><td>UID 1000でコンテナを実行</td></tr>
<tr><td><code>readOnlyRootFilesystem: true</code></td><td>ファイルシステムは読み取り専用（書き込みはvolumeを使用）</td></tr>
<tr><td><code>allowPrivilegeEscalation: false</code></td><td>プロセスの権限エスカレーションを禁止</td></tr>
<tr><td><code>capabilities.drop: ["ALL"]</code></td><td>すべてのLinux capabilitiesを削除</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">6. チートシート</h2>

<table>
<thead><tr><th>試験の質問</th><th>回答</th></tr></thead>
<tbody>
<tr><td>PodがK8s APIを呼び出す必要がある場合は？</td><td><strong>ServiceAccount</strong></td></tr>
<tr><td>1つのnamespace内でユーザー権限を制限するには？</td><td><strong>Role</strong> + <strong>RoleBinding</strong></td></tr>
<tr><td>Pod間のネットワークトラフィックを制限するには？</td><td><strong>NetworkPolicy</strong></td></tr>
<tr><td>NetworkPolicyが機能するために何が必要？</td><td>サポートするCNIプラグイン（Calico、Cilium）</td></tr>
<tr><td>Privileged → Restricted、Pod Securityには？</td><td><strong>Pod Security Admission</strong></td></tr>
</tbody>
</table>

<h2 id="practice">7. 練習問題</h2>

<p><strong>Q1:</strong> アプリケーションPodが自身のnamespace内のPodをリストするためにKubernetes APIにアクセスする必要があります。クラスター管理者は何を作成すべきですか？</p>
<ul>
<li>A) すべてのnamespace用のClusterRoleとClusterRoleBinding</li>
<li>B) ServiceAccountとRole（list pods）とRoleBinding ✓</li>
<li>C) APIサーバー用のLoadBalancerタイプのService</li>
<li>D) APIサーバーの認証情報を含むConfigMap</li>
</ul>
<p><em>解説：PodにはServiceAccount、そのnamespace内で「list pods」を許可するRole、およびそれらを紐付けるRoleBindingが必要です。ClusterRoleを使用するとすべてのnamespaceにアクセス権を過剰に付与することになります。</em></p>

<p><strong>Q2:</strong> NetworkPolicyがPodに適用されています。どのルールにも明示的に一致しないトラフィックのデフォルトの動作は何ですか？</p>
<ul>
<li>A) すべてのトラフィックが許可される（デフォルト許可）</li>
<li>B) トラフィックはログに記録されるがブロックされない</li>
<li>C) Podセレクターに一致するトラフィックは拒否され、その他のトラフィックは通過する ✓</li>
<li>D) Podとの間のすべてのトラフィックが拒否される</li>
</ul>
<p><em>解説：NetworkPolicyがPodを選択すると（podSelector経由）、そのポリシータイプ（ingress/egress）で明示的に許可されていないすべてのトラフィックは拒否されます。選択されていないPodは影響を受けず、完全な接続性を維持します。</em></p>

<p><strong>Q3:</strong> ホストへの特権アクセスを必要とするシステムレベルコンポーネントには、どのPod Security Standardsプロファイルを使用すべきですか？</p>
<ul>
<li>A) Restricted</li>
<li>B) Baseline</li>
<li>C) Privileged ✓</li>
<li>D) SystemAdmin</li>
</ul>
<p><em>解説：PrivilegedプロファイルはPodに制限を設けず、すべてのcapabilitiesを許可します。システム/インフラコンポーネント向けです。Baselineは既知の権限エスカレーションを防止し、Restrictedは最大限のハードニングを適用します。</em></p>
