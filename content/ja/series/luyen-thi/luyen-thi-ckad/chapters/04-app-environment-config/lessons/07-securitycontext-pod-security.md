---
id: ckad-d4-l07
title: 'レッスン7: SecurityContext, Capabilities & ServiceAccounts'
slug: 07-securitycontext-pod-security
description: >-
  SecurityContextのPodレベルとContainerレベル設定: runAsUser、runAsNonRoot、readOnlyRootFilesystem。
  Linux capabilities。ServiceAccountの作成とバインド、automountServiceAccountToken。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 7
section_title: "ドメイン4: Application Environment, Configuration and Security (25%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD試験対策 — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai7-security-context.webp" alt="SecurityContext — Podレベル vs Containerレベル、Linux capabilities" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="securitycontext">1. SecurityContext</h2>

<p>SecurityContextはPodまたはContainerの権限とアクセス制御を定義します。</p>

<pre><code class="language-text">apiVersion: v1
kind: Pod
spec:
  securityContext:            # Podレベル: 全コンテナに適用
    runAsUser: 1000           # コンテナ実行UID
    runAsGroup: 3000          # プライマリGID
    fsGroup: 2000             # マウントボリュームのGID
    runAsNonRoot: true        # root実行を拒否

  containers:
  - name: app
    image: myapp
    securityContext:          # Containerレベル: Podレベルをオーバーライド
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true   # ルートFSを読み取り専用にマウント
      capabilities:
        add: ["NET_BIND_SERVICE"]    # capabilityを追加
        drop: ["ALL"]               # すべてdropし、必要なもののみ追加</code></pre>

<table>
<thead><tr><th>設定項目</th><th>レベル</th><th>効果</th></tr></thead>
<tbody>
<tr><td><code>runAsUser</code></td><td>Pod/Container</td><td>特定のUIDでプロセスを実行</td></tr>
<tr><td><code>runAsNonRoot</code></td><td>Pod/Container</td><td>UID = 0（root）の場合は実行を拒否</td></tr>
<tr><td><code>readOnlyRootFilesystem</code></td><td>Container</td><td>ルートファイルシステムを読み取り専用でマウント</td></tr>
<tr><td><code>allowPrivilegeEscalation</code></td><td>Container</td><td>権限昇格（sudoなど）をブロック</td></tr>
<tr><td><code>privileged</code></td><td>Container</td><td>特権モードで実行（ホスト上のrootと同等）</td></tr>
<tr><td><code>fsGroup</code></td><td>Pod</td><td>ボリュームファイルのGID（共有ボリュームアクセス用）</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント:</strong> ContainerレベルのsecurityContextはPodレベルの設定を<strong>オーバーライド</strong>します。Podに<code>runAsUser: 1000</code>、コンテナに<code>runAsUser: 2000</code>が設定されている場合、そのコンテナはUID 2000で実行されます。よく出題されるパターン: <code>kubectl exec pod -- id</code>または<code>whoami</code>でユーザーを確認。</p></blockquote>

<h2 id="capabilities">2. Linux Capabilities</h2>

<pre><code class="language-text">Capabilitiesにより、完全なroot権限なしで特定の権限を付与できます。

# よく使われる例:
NET_BIND_SERVICE  — 1024未満のポートにバインド（例: ポート80）
NET_ADMIN         — ネットワーク管理（ifconfigなど）
SYS_TIME          — システムクロックの変更
CHOWN             — ファイル所有者の変更
SETUID/SETGID     — ユーザー/グループIDの変更

securityContext:
  capabilities:
    drop: ["ALL"]             # ベストプラクティス: まずすべてdrop
    add: ["NET_BIND_SERVICE"] # 必要なもののみ再追加</code></pre>

<h2 id="serviceaccount">3. ServiceAccounts</h2>

<p>PodはKubernetes APIへの認証に<strong>ServiceAccount</strong>を使用します。</p>

<pre><code class="language-text"># ServiceAccountの作成
kubectl create serviceaccount my-sa

# Roleにバインド
kubectl create rolebinding my-binding \
  --role=pod-reader \
  --serviceaccount=default:my-sa

# PodにSAを割り当て
spec:
  serviceAccountName: my-sa     # 特定のSAを使用
  automountServiceAccountToken: false  # SAトークンの自動マウントを無効化

# デフォルトでは: default SAが /var/run/secrets/kubernetes.io/serviceaccount/ にマウントされる
# トークンファイルを使ってコンテナ内からK8s APIを呼び出せる</code></pre>

<table>
<thead><tr><th>概念</th><th>説明</th></tr></thead>
<tbody>
<tr><td>デフォルトSA</td><td>各Namespaceに組み込みの<code>default</code> SAがある（最小権限）</td></tr>
<tr><td>トークンマウント</td><td>無効化しない限り、トークンはPodに自動マウントされる</td></tr>
<tr><td><code>automountServiceAccountToken: false</code></td><td>トークンマウントを無効化（セキュリティのベストプラクティス）</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント:</strong> PodがKubernetes APIを呼び出す必要がある場合（Operatorパターンなど）、適切な権限を持つServiceAccountが必要です。APIアクセスが不要な場合は、<code>automountServiceAccountToken: false</code>を設定するのがベストプラクティスです。CKADでよく出題されるパターン: SAの作成、Roleのバインド、Pod specへのSA設定。</p></blockquote>

<h2 id="readonly-volume">4. readOnlyRootFilesystem + emptyDir</h2>

<pre><code class="language-text"># readOnlyRootFilesystem: true の場合、アプリはルートFSに書き込めない。
# しかし一時ファイルの書き込みが必要な場合がある → emptyDirボリュームを使用:

spec:
  containers:
  - name: app
    image: myapp
    securityContext:
      readOnlyRootFilesystem: true
    volumeMounts:
    - name: tmp
      mountPath: /tmp        # 一時ファイルをここに書き込み
    - name: cache
      mountPath: /app/cache
  volumes:
  - name: tmp
    emptyDir: {}
  - name: cache
    emptyDir: {}</code></pre>

<h2 id="cheatsheet">5. チートシート</h2>

<table>
<thead><tr><th>タスク</th><th>YAML / コマンド</th></tr></thead>
<tbody>
<tr><td>非rootでコンテナを実行</td><td><code>securityContext: runAsNonRoot: true</code></td></tr>
<tr><td>特定のUIDで実行</td><td><code>securityContext: runAsUser: 1000</code></td></tr>
<tr><td>読み取り専用ファイルシステム</td><td><code>securityContext: readOnlyRootFilesystem: true</code></td></tr>
<tr><td>全capabilitiesをdrop</td><td><code>capabilities: drop: ["ALL"]</code></td></tr>
<tr><td>ServiceAccountを割り当て</td><td><code>spec: serviceAccountName: my-sa</code></td></tr>
<tr><td>コンテナ内のユーザーを確認</td><td><code>kubectl exec pod -- whoami</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習問題</h2>

<p><strong>Q1:</strong> Pod specのsecurityContext.runAsUser: 1000がPodレベルに設定されています。Pod内の1つのコンテナにsecurityContext.runAsUser: 2000が設定されています。そのコンテナはどのUIDで実行されますか？</p>
<ul>
<li>A) 0（root、Podレベルがオーバーライドするため）</li>
<li>B) 1000（Podレベルが優先）</li>
<li>C) 2000（ContainerレベルがPodレベルをオーバーライド） ✓</li>
<li>D) 両方のUIDで同時に実行</li>
</ul>
<p><em>解説: ContainerレベルのsecurityContext設定はPodレベルをオーバーライドします。このコンテナはUID 2000で実行されます。同じPod内でContainer固有のsecurityContextが設定されていない他のコンテナは、PodレベルのUID 1000を継承します。</em></p>

<p><strong>Q2:</strong> アプリケーションコンテナがポート80（1024未満の特権ポート）にバインドする必要がありますが、rootで実行すべきではありません。どう設定しますか？</p>
<ul>
<li>A) securityContext.privileged: trueを設定</li>
<li>B) securityContext.runAsUser: 0を設定</li>
<li>C) 他のすべてをdropしてNET_BIND_SERVICE capabilityを追加 ✓</li>
<li>D) ポート80の代わりにNodePort Serviceを使用</li>
</ul>
<p><em>解説: Linux capabilitiesにより細かな権限付与が可能です。NET_BIND_SERVICEは完全なroot権限なしで1024未満のポートへのバインドを許可します。ベストプラクティスはまずすべてのcapabilitiesをdropし、必要なもののみ追加: capabilities: { drop: ["ALL"], add: ["NET_BIND_SERVICE"] }。</em></p>

<p><strong>Q3:</strong> readOnlyRootFilesystem: trueで実行中のPodがあります。アプリケーションが/tmpに書き込もうとして失敗します。最適な解決策はどれですか？</p>
<ul>
<li>A) readOnlyRootFilesystem: trueを削除</li>
<li>B) securityContext.privileged: trueを設定</li>
<li>C) /tmpにemptyDirボリュームをマウント ✓</li>
<li>D) /tmpにConfigMapをマウント</li>
</ul>
<p><em>解説: readOnlyRootFilesystemはコンテナのファイルシステムへの書き込みを防止しますが、emptyDirボリュームは別の書き込み可能なマウントです。/tmpにemptyDirをマウントすることで、ルートファイルシステムは読み取り専用のまま、アプリケーションは一時ファイルを書き込めます。</em></p>
