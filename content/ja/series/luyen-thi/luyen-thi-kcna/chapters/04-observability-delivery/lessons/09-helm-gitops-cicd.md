---
id: kcna-d4-l09
title: 'レッスン9：Helm、GitOpsとCI/CD'
slug: 09-helm-gitops-cicd
description: >-
  HelmパッケージマネージャーArgo CDによるGitOps、KubernetesのCI/CDパイプライン。
  デプロイ戦略：ローリングアップデート、カナリア、ブルーグリーン。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 9
section_title: "Domain 4: Cloud Native Observability & Security (16%)"
course:
  id: lt-kcna-series-001
  title: 'KCNA試験対策 — Kubernetes and Cloud Native Associate'
  slug: luyen-thi-kcna
---

<img src="/storage/uploads/2026/04/k8s-cert-kcna-bai9-helm-gitops.webp" alt="HelmとArgo CDによるGitOpsワークフロー" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="helm">1. Helm — Kubernetesパッケージマネージャー</h2>

<p><strong>Helm</strong>はKubernetes用のパッケージマネージャーです。ChartはYAMLテンプレートで、再利用とパラメータ化が可能です。</p>

<pre><code class="language-text">Helm Concepts:
  Chart     = Package (templates + default values)
  Release   = Installed instance of a chart in a cluster
  Repository = Collection of charts (ArtifactHub.io)
  Values    = Parameters to customize a chart

$ helm install my-nginx bitnami/nginx --set service.type=LoadBalancer
  └── Release: my-nginx
      ├── templates/deployment.yaml
      ├── templates/service.yaml
      └── values.yaml (overridden)</code></pre>

<table>
<thead><tr><th>Helmコマンド</th><th>機能</th></tr></thead>
<tbody>
<tr><td><code>helm install</code></td><td>新しいChartをデプロイ（Releaseを作成）</td></tr>
<tr><td><code>helm upgrade</code></td><td>新しいChart/Valuesでリリースを更新</td></tr>
<tr><td><code>helm rollback</code></td><td>以前のリビジョンに復元</td></tr>
<tr><td><code>helm list</code></td><td>すべてのリリースを一覧表示</td></tr>
<tr><td><code>helm uninstall</code></td><td>リリースを削除</td></tr>
<tr><td><code>helm template</code></td><td>デプロイせずにテンプレートをレンダリング</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のポイント：</strong> HelmはリリースヒストリをKubernetes Secrets（ConfigMapではない）に保存します。これにより<code>helm rollback</code>が機能します。デフォルトで10リビジョンのヒストリを保持します。</p></blockquote>

<h2 id="gitops">2. GitOps</h2>

<p><strong>GitOps</strong>はGitをコードとインフラ設定の両方の<strong>唯一の信頼できるソース（Single Source of Truth）</strong>として使用するオペレーションフレームワークです。</p>

<pre><code class="language-text">GitOps Flow:
  Developer ──push──► Git Repo (desired state)
                          │
                    GitOps Operator (Argo CD / Flux)
                    - Watches Git repo
                    - Compares with cluster state
                    - Syncs if diff found
                          │
                       K8s Cluster (actual state)</code></pre>

<table>
<thead><tr><th>GitOpsの原則</th><th>意味</th></tr></thead>
<tbody>
<tr><td><strong>Declarative</strong></td><td>システム状態をGit内のYAMLで記述</td></tr>
<tr><td><strong>Versioned & immutable</strong></td><td>Gitヒストリ = 監査証跡</td></tr>
<tr><td><strong>Pulled automatically</strong></td><td>エージェントが変更をプル、クラスターへのpushアクセス不要</td></tr>
<tr><td><strong>Continuously reconciled</strong></td><td>ドリフト検出 — クラスターがGitと異なる場合に自動修正</td></tr>
</tbody>
</table>

<h3 id="argo-cd">Argo CD</h3>

<p><strong>Argo CD</strong>はKubernetesで最も人気のあるGitOpsコントローラーです（CNCF Incubating → Graduated 2022）。</p>

<blockquote><p><strong>試験のポイント：</strong> GitOpsはpushではなく<strong>プルベース</strong>のデプロイを使用します。利点：クラスターがAPIを外部に公開する必要がなく、CIパイプラインにkubeconfig資格情報が不要です。</p></blockquote>

<h2 id="cicd">3. KubernetesのCI/CD</h2>

<pre><code class="language-text">CI/CD Pipeline:
  Code Push
      │
  ┌───▼───┐  CI Phase (Build)
  │ Build  │── Unit tests ── Integration tests
  │ Image  │── Security scan (Trivy, Snyk)
  └───┬───┘── Push to Registry (ECR, GCR)
      │
  ┌───▼───┐  CD Phase (Deploy)
  │ Update │── Update Helm values / K8s manifest
  │ Manifest│── Push to GitOps repo
  └───┬───┘── Argo CD picks up and syncs
      │
  ┌───▼────────────────────┐
  │ Kubernetes Cluster     │
  │  Rolling Update        │
  └────────────────────────┘</code></pre>

<h2 id="deployment-strategies">4. デプロイ戦略</h2>

<table>
<thead><tr><th>戦略</th><th>動作方法</th><th>ダウンタイム</th><th>ロールバック</th><th>使用場面</th></tr></thead>
<tbody>
<tr><td><strong>Rolling Update</strong></td><td>Podを段階的に置換（デフォルト）</td><td>なし</td><td>kubectl rollout undo</td><td>ステートレスアプリ、段階的</td></tr>
<tr><td><strong>Recreate</strong></td><td>v1を全停止後にv2をデプロイ</td><td>あり</td><td>v1を再デプロイ</td><td>破壊的変更、シンプル</td></tr>
<tr><td><strong>Blue-Green</strong></td><td>v1（Blue）とv2（Green）を並行稼働し、トラフィックを切り替え</td><td>なし</td><td>即座に切り戻し</td><td>重要なアプリ、高速ロールバック</td></tr>
<tr><td><strong>Canary</strong></td><td>トラフィックの少量%を新バージョンにルーティング</td><td>なし</td><td>トラフィックをリダイレクト</td><td>段階的ロールアウト、A/Bテスト</td></tr>
</tbody>
</table>

<pre><code class="language-text">Canary in Kubernetes (Ingress weight):
  ┌─────────────────────────────────┐
  │  Ingress (canary annotation)     │
  │  90% ──────► Deployment v1.0    │
  │  10% ──────► Deployment v1.1    │
  └─────────────────────────────────┘
  → Monitor v1.1 errors → promote to 100% or rollback</code></pre>

<h2 id="cheatsheet">5. チートシート</h2>

<table>
<thead><tr><th>試験の質問</th><th>回答</th></tr></thead>
<tbody>
<tr><td>Helmはリリースヒストリをどこに保存する？</td><td><strong>Kubernetes Secrets</strong></td></tr>
<tr><td>GitOpsの唯一の信頼できるソースは？</td><td><strong>Gitリポジトリ</strong></td></tr>
<tr><td>GitOpsはプルベースかプッシュベースか？</td><td><strong>プルベース</strong>（エージェントがプル）</td></tr>
<tr><td>ダウンタイムなしのデプロイは？</td><td><strong>Rolling</strong>または<strong>Blue-Green</strong></td></tr>
<tr><td>5%のトラフィックで新バージョンをテストするには？</td><td><strong>Canary</strong>デプロイ</td></tr>
<tr><td>問題発生時の高速ロールバックは？</td><td><strong>Blue-Green</strong>（即座に切り替え）</td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習問題</h2>

<p><strong>Q1:</strong> チームがアプリの新バージョンをまず10%のユーザーにデプロイし、エラーを監視してから徐々にトラフィックを増やしたいと考えています。どのデプロイ戦略を使用すべきですか？</p>
<ul>
<li>A) Recreate</li>
<li>B) Rolling Update</li>
<li>C) Blue-Green</li>
<li>D) Canary ✓</li>
</ul>
<p><em>解説：Canaryデプロイはトラフィックの少量を新バージョンにルーティングし、完全ロールアウト前に実際のトラフィックで検証できます。これにより新バージョンにバグがある場合の影響範囲を最小限に抑えます。</em></p>

<p><strong>Q2:</strong> GitOpsモデルを最もよく説明しているのはどれですか？</p>
<ul>
<li>A) CI/CDパイプラインがテスト通過後にKubernetesに直接プッシュする</li>
<li>B) Gitリポジトリが唯一の信頼できるソースであり、コントローラーがクラスター状態をGitと継続的に照合する ✓</li>
<li>C) 開発者がワークステーションから手動でkubectlコマンドを適用する</li>
<li>D) インフラストラクチャが一貫性のためにリレーショナルデータベースで定義される</li>
</ul>
<p><em>解説：GitOpsはコントローラー（Argo CD、Flux）がGitリポジトリを監視し、クラスターがGitで宣言された内容と一致することを保証するプルベースモデルを使用します。これにより監査証跡、ドリフト検出、安全なデプロイが提供されます。</em></p>

<p><strong>Q3:</strong> Helmはロールバック機能を有効にするためにリリースヒストリをどこに保存しますか？</p>
<ul>
<li>A) Helmのローカルファイルシステム（~/.helm）</li>
<li>B) ターゲットnamespace内のConfigMap</li>
<li>C) ターゲットnamespace内のSecret ✓</li>
<li>D) 別のetcdデータベース</li>
</ul>
<p><em>解説：Helm v3以降、リリースメタデータ（ヒストリ、値、チャート情報）はリリースのnamespace内のSecretsとして保存されます。これにより前のリビジョンデータを読み取ることでhelm rollbackが可能になり、複数のユーザー/システムが同じリリースを管理できます。</em></p>
