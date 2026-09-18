---
id: ckad-d2-l04
title: 'レッスン4: Helm & Kustomize'
slug: 04-helm-kustomize
description: >-
  Helm charts、releases、values.yamlとupgrade/rollbackワークフロー。Kustomize
  overlaysとbases。CKAD向けHelmとKustomizeの使い分け。
duration_minutes: 50
is_free: true
video_url: null
sort_order: 4
section_title: "ドメイン2: Application Deployment (20%)"
course:
  id: lt-ckad-series-001
  title: 'CKAD試験対策 — Certified Kubernetes Application Developer'
  slug: luyen-thi-ckad
---

<img src="/storage/uploads/2026/04/k8s-cert-ckad-bai4-helm-kustomize.webp" alt="Helm vs Kustomize — Chart構造、テンプレートエンジン、overlays" style="max-width: 800px; width: 100%; border-radius: 12px;" />

<h2 id="helm-concepts">1. Helmの中核概念</h2>

<p><strong>Helm</strong>はKubernetesのパッケージマネージャーです。Kubernetesマニフェストを<strong>Charts</strong>にパッケージ化し、デプロイメントを<strong>Releases</strong>として管理します。</p>

<pre><code class="language-text">Helm Architecture:

  values.yaml          Chart templates
       │                    │
       ▼                    ▼
  ┌──────────────────────────────┐
  │   Helm Template Engine       │
  │   Renders YAML manifests     │
  └──────────────┬───────────────┘
                 │
                 ▼ kubectl apply
         Kubernetes Cluster
          (stored as Release)</code></pre>

<table>
<thead><tr><th>用語</th><th>定義</th></tr></thead>
<tbody>
<tr><td><strong>Chart</strong></td><td>Helmのパッケージ — テンプレート + デフォルト値を含む</td></tr>
<tr><td><strong>Release</strong></td><td>クラスターにデプロイされたChartのインスタンス</td></tr>
<tr><td><strong>Repository</strong></td><td>Chartsの保管場所（Artifact Hub、Bitnamiなど）</td></tr>
<tr><td><strong>Values</strong></td><td>Chartをカスタマイズする設定パラメータ</td></tr>
<tr><td><strong>Revision</strong></td><td>install/upgradeごとに新しいリビジョンが作成される</td></tr>
</tbody>
</table>

<h2 id="helm-commands">2. Helmコマンド</h2>

<pre><code class="language-text"># リポジトリを追加
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Chartsを検索
helm search repo bitnami/nginx
helm search hub wordpress

# Chartをインストール
helm install my-release bitnami/nginx
helm install my-release bitnami/nginx --values custom-values.yaml
helm install my-release bitnami/nginx --set image.tag=1.25

# Releasesを一覧表示
helm list
helm list -n production

# Releaseをアップグレード
helm upgrade my-release bitnami/nginx --set replicaCount=3

# 前のリビジョンにロールバック
helm rollback my-release 1   # リビジョン1にロールバック
helm rollback my-release     # 前のリビジョンにロールバック

# アンインストール
helm uninstall my-release

# レンダリングされたテンプレートを確認（dry-run）
helm template my-release bitnami/nginx
helm install my-release bitnami/nginx --dry-run</code></pre>

<blockquote><p><strong>試験のポイント:</strong> CKADでは<code>helm install</code>の<code>--set</code>フラグ（値を直接オーバーライド）と<code>--values file.yaml</code>（ファイルからオーバーライド）がよく出題されます。<code>helm upgrade</code>と<code>helm rollback</code>も出題されます。<code>--set</code>のオーバーライドは<code>--values</code>ファイルよりも優先されることを覚えましょう。</p></blockquote>

<h2 id="kustomize">3. Kustomize</h2>

<p><strong>Kustomize</strong>はkubectlに組み込まれたツールで、テンプレートやパラメータなしでKubernetesマニフェストをカスタマイズできます。オーバーレイパターンを使用します。</p>

<pre><code class="language-text">Kustomize Structure:
  base/
  ├── kustomization.yaml    # Base kustomization
  ├── deployment.yaml
  └── service.yaml

  overlays/
  ├── development/
  │   ├── kustomization.yaml  # Patches for dev
  │   └── replica-patch.yaml
  └── production/
      ├── kustomization.yaml  # Patches for prod
      └── replica-patch.yaml</code></pre>

<pre><code class="language-text"># base/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - deployment.yaml
  - service.yaml

# overlays/production/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
bases:
  - ../../base
patches:
  - path: replica-patch.yaml
images:
  - name: myapp
    newTag: "2.0"</code></pre>

<pre><code class="language-text"># Kustomizeで適用
kubectl apply -k overlays/production/

# レンダリング結果をプレビュー
kubectl kustomize overlays/production/</code></pre>

<h2 id="comparison">4. Helm vs Kustomize</h2>

<table>
<thead><tr><th>比較項目</th><th>Helm</th><th>Kustomize</th></tr></thead>
<tbody>
<tr><td>アプローチ</td><td>テンプレートベース（Goテンプレート）</td><td>オーバーレイ/パッチ（プレーンYAML）</td></tr>
<tr><td>学習コスト</td><td>高め（テンプレート構文）</td><td>低め（YAMLパッチ）</td></tr>
<tr><td>パッケージ管理</td><td>あり（charts、repos、バージョニング）</td><td>なし</td></tr>
<tr><td>Release履歴</td><td>あり（upgrade/rollback）</td><td>組み込み機能なし</td></tr>
<tr><td>kubectl組み込み</td><td>なし（別バイナリ）</td><td>あり（<code>kubectl apply -k</code>）</td></tr>
<tr><td>最適な用途</td><td>アプリの配布</td><td>環境別のカスタマイズ</td></tr>
</tbody>
</table>

<h2 id="cheatsheet">5. チートシート</h2>

<table>
<thead><tr><th>タスク</th><th>コマンド</th></tr></thead>
<tbody>
<tr><td>カスタム値でChartをインストール</td><td><code>helm install rel chart --values f.yaml</code></td></tr>
<tr><td>値を1つオーバーライド</td><td><code>helm install rel chart --set key=val</code></td></tr>
<tr><td>Helm releaseをロールバック</td><td><code>helm rollback release-name 2</code></td></tr>
<tr><td>Kustomizeオーバーレイを適用</td><td><code>kubectl apply -k overlays/prod/</code></td></tr>
<tr><td>Kustomize出力をプレビュー</td><td><code>kubectl kustomize overlays/prod/</code></td></tr>
</tbody>
</table>

<h2 id="practice">6. 練習問題</h2>

<p><strong>Q1:</strong> "stable"リポジトリからHelmチャートをレプリカ数5でデプロイする必要があります。正しいコマンドはどれですか？</p>
<ul>
<li>A) <code>helm deploy myapp stable/nginx --replicas=5</code></li>
<li>B) <code>helm install myapp stable/nginx --set replicaCount=5</code> ✓</li>
<li>C) <code>helm install myapp stable/nginx -e replicaCount=5</code></li>
<li>D) <code>helm apply myapp stable/nginx --values replicaCount=5</code></li>
</ul>
<p><em>解説: helm installでは--setフラグで値をオーバーライドします。構文は--set key=valueです。正確なキー名（replicaCount）はチャートのvalues.yamlに依存しますが、--setがインライン値オーバーライドの正しいフラグです。</em></p>

<p><strong>Q2:</strong> チームがKustomizeのbase設定とproduction/stagingオーバーレイを使用しています。productionオーバーレイを適用するコマンドはどれですか？</p>
<ul>
<li>A) <code>kubectl apply -f overlays/production/</code></li>
<li>B) <code>kubectl kustomize overlays/production/ | kubectl apply -f -</code></li>
<li>C) <code>kubectl apply -k overlays/production/</code> ✓</li>
<li>D) <code>kustomize apply overlays/production/</code></li>
</ul>
<p><em>解説: kubectl apply -k（-fではなく-k）がkustomizationディレクトリを適用する組み込みの方法です。選択肢Bも動作しますがより冗長です。-kフラグはkubectlにディレクトリをKustomize設定として処理するよう指示します。</em></p>

<p><strong>Q3:</strong> Helmのアップグレード後にバグが発生し、前の正常な状態に戻す必要があります。正しいアプローチはどれですか？</p>
<ul>
<li>A) kubectl rollout undo deployment/myapp</li>
<li>B) helm install --replace myapp stable/nginx</li>
<li>C) helm rollback myapp ✓</li>
<li>D) helm upgrade myapp --version=previous</li>
</ul>
<p><em>解説: helm rollbackはreleaseを前のリビジョンに戻します。リビジョン番号を指定しない場合、前のリビジョンにロールバックします。失敗したアップグレードによる変更（ConfigMaps、Secrets、チャートが管理するその他リソースを含む）をすべて元に戻します。</em></p>
