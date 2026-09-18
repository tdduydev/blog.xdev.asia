---
id: 019c9619-lt03-l07
title: '第7課：モデルデプロイメントと予測'
slug: bai-7-model-deployment
description: >-
  Vertex AI Endpoints：オンライン予測、バッチ予測。
  モデルバージョニング、トラフィック分割。エッジデプロイメント。
  スケーリング設定、GPU割り当て。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 7
section_title: "領域4：モデルデプロイメントとMLOps"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer 試験対策'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai7-deployment.webp" alt="Vertex AI Model Deployment" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Vertex AIデプロイメント：オンライン予測、バッチ予測、トラフィック分割、エッジデプロイメント</em></p>
</div>

<h2 id="deployment-types"><strong>1. Vertex AIの予測タイプ</strong></h2>

<table>
<thead><tr><th>タイプ</th><th>レイテンシ</th><th>使用場面</th></tr></thead>
<tbody>
<tr><td><strong>オンライン予測</strong></td><td>ミリ秒（同期）</td><td>リアルタイムアプリ、ユーザー向けAPI</td></tr>
<tr><td><strong>バッチ予測</strong></td><td>分/時間（非同期）</td><td>大規模データセット、スケジュールされたスコアリング</td></tr>
<tr><td><strong>ストリーミング予測</strong></td><td>準リアルタイム</td><td>Pub/Subイベント + Dataflow + Vertex AI</td></tr>
</tbody>
</table>

<h2 id="vertex-endpoints"><strong>2. Vertex AI Endpoints</strong></h2>

<pre><code class="language-text">Vertex AI Endpoint Architecture:

Client Request
    ↓
Vertex AI Endpoint (load balancer)
    ├── Model Version A (70% traffic)
    │       └── Deployed Model (e.g., v1.0)
    └── Model Version B (30% traffic)  ← Canary/A-B test
            └── Deployed Model (e.g., v1.1)
</code></pre>

<p>各Endpointは<strong>複数のモデルバージョン</strong>と<strong>トラフィック分割</strong>を持つことができ、A/Bテストやカナリアデプロイメントに使用されます。</p>

<table>
<thead><tr><th>機能</th><th>詳細</th></tr></thead>
<tbody>
<tr><td><strong>専用Endpoint</strong></td><td>専用リソース、最低レイテンシ、高コスト</td></tr>
<tr><td><strong>共有Endpoint</strong></td><td>マルチテナント、低コスト、コールドスタートの可能性</td></tr>
<tr><td><strong>説明可能性</strong></td><td>デプロイされたモデルごとにVertex Explainabilityを有効化</td></tr>
<tr><td><strong>最小/最大レプリカ</strong></td><td>リクエストレートに基づくオートスケーリング</td></tr>
<tr><td><strong>GPU割り当て</strong></td><td>デプロイメントごとにGPUタイプ（NVIDIA T4、A100）を指定</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> Vertex AI Endpointsのトラフィック分割は、<strong>カナリアデプロイメント</strong>や<strong>A/Bテスト</strong>の実装方法です。「新しいモデルバージョンを安全にロールアウト」→ トラフィック分割（例：90% 旧版、10% 新版）。</p>
</blockquote>

<h2 id="batch-prediction"><strong>3. バッチ予測</strong></h2>

<table>
<thead><tr><th>プロパティ</th><th>値</th></tr></thead>
<tbody>
<tr><td><strong>入力</strong></td><td>Cloud Storage（CSV、JSON、JSONL、TFRecords、Avro）</td></tr>
<tr><td><strong>出力</strong></td><td>Cloud Storage（JSON/CSVとしての予測結果）</td></tr>
<tr><td><strong>Endpoint不要</strong></td><td>Model Registryから直接実行、永続的なEndpoint不要</td></tr>
<tr><td><strong>オートスケーリング</strong></td><td>完了時にゼロにスケール（コスト効率的）</td></tr>
<tr><td><strong>アクセラレータ</strong></td><td>バッチ推論用にGPU/TPUをサポート</td></tr>
</tbody>
</table>

<h2 id="model-versioning"><strong>4. モデルバージョニングとRegistry</strong></h2>

<pre><code class="language-text">Vertex AI Model Registry:

Model: churn-predictor
├── v1 (Logistic Regression)  ← Champion in production
│   - Accuracy: 0.87
│   - Deployed to: endpoint/prod (70% traffic)
│
└── v2 (XGBoost)              ← Challenger
    - Accuracy: 0.91
    - Deployed to: endpoint/prod (30% traffic)

After validation: promote v2 to Champion
</code></pre>

<h2 id="edge-deployment"><strong>5. エッジデプロイメント</strong></h2>

<table>
<thead><tr><th>プラットフォーム</th><th>ソリューション</th></tr></thead>
<tbody>
<tr><td>モバイル（Android/iOS）</td><td>TFLite + Vertex AIモデルエクスポート</td></tr>
<tr><td>エッジデバイス（IoT）</td><td>TFLite Micro / Edge TPU（Coral）</td></tr>
<tr><td>オンプレミスサーバー</td><td>Dockerコンテナ内のTF Serving</td></tr>
<tr><td>Kubernetes</td><td>GKE上のKServe（旧KFServing）</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>6. 練習問題</strong></h2>

<p><strong>Q1：</strong> ある企業が5,000万件の顧客レコードの解約リスクをスコアリングする必要があります。結果は2時間以内に必要ですが、リアルタイムである必要はありません。最もコスト効率的なVertex AI予測オプションはどれでしょうか？</p>
<ul>
<li>A) 高レプリカ数のオンライン予測</li>
<li>B) バッチ予測 ✓</li>
<li>C) Dataflowによるストリーミング予測</li>
<li>D) 専用GPUエンドポイントにデプロイ</li>
</ul>
<p><em>解説：バッチ予測は大規模な非同期スコアリング向けに設計されています。ジョブ中にコンピュートリソースをスケールアップし、完了時にゼロに戻すため、永続的なエンドポイントコストがかかりません。バッチスコアリングにリアルタイム応答は不要なので、オンライン予測は無駄です。</em></p>

<p><strong>Q2：</strong> チームが新しいモデルバージョンをデプロイしています。本番トラフィックの10%を新バージョンにルーティングし、旧バージョンが90%を処理するようにして、完全なロールアウト前にパフォーマンス指標を比較したいと考えています。これを可能にするVertex AI機能はどれでしょうか？</p>
<ul>
<li>A) Model Registryバージョニング</li>
<li>B) Vertex AI Endpointsのトラフィック分割 ✓</li>
<li>C) バッチ予測の比較</li>
<li>D) Vertex AI Experiments</li>
</ul>
<p><em>解説：Vertex AI Endpointsは、設定可能なトラフィック分割（例：90%/10%）で複数のモデルバージョンの同時デプロイをサポートしています。これにより、完全なロールアウトを行う前にライブパフォーマンスを比較するカナリアデプロイメントやA/Bテストが可能になります。</em></p>

<p><strong>Q3：</strong> 小売企業が、クラウドへのネットワーク接続なしで工場フロアの製品欠陥を検出したいと考えています。どのデプロイメントアプローチを使用すべきでしょうか？</p>
<ul>
<li>A) Vertex AIオンライン予測Endpoint</li>
<li>B) TFLiteを使用してデバイスにデプロイされたAutoML Edgeモデル ✓</li>
<li>C) BigQuery MLバッチ予測</li>
<li>D) Cloud Run上のTF Serving</li>
</ul>
<p><em>解説：TFLite（またはAutoML Edgeモデル）によるエッジデプロイメントは、ネットワーク接続なしでデバイス上でローカルに推論を実行します。TFLiteはコンピュータービジョンモデルのオンデバイス推論をサポートし、インターネットアクセスのない工場フロアの機器に適しています。</em></p>
