---
id: 019c9619-lt03-l08
title: '第8課：Vertex AIパイプラインとMLOps'
slug: bai-8-vertex-ai-pipelines-mlops
description: >-
  Vertex AI Pipelines（Kubeflow Pipelines SDK）。
  Model Registry、Experiments、Metadata Store。
  Vertex AI Model Monitoring：スキュー、ドリフト検出。
  ML向けCI/CD：Cloud Build + Vertex AI。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 8
section_title: "領域4：モデルデプロイメントとMLOps"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer 試験対策'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai8-mlops-cicd.webp" alt="Vertex AI Pipelines & MLOps" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Vertex AI MLOps：Pipelines、CI/CD、Model Registry、本番ML向けモニタリング</em></p>
</div>

<h2 id="mlops-maturity"><strong>1. MLOps成熟度レベル</strong></h2>

<table>
<thead><tr><th>レベル</th><th>説明</th><th>自動化</th></tr></thead>
<tbody>
<tr><td><strong>レベル0</strong></td><td>手動プロセス、スクリプトのみ</td><td>なし</td></tr>
<tr><td><strong>レベル1</strong></td><td>MLパイプラインの自動化、継続的トレーニング</td><td>トレーニングパイプライン</td></tr>
<tr><td><strong>レベル2</strong></td><td>ML向けの完全なCI/CD、自動再トレーニングトリガー</td><td>すべて</td></tr>
</tbody>
</table>

<h2 id="vertex-pipelines"><strong>2. Vertex AI Pipelines</strong></h2>

<p>Vertex AI Pipelinesは<strong>Kubeflow Pipelines（KFP）</strong>のマネージド実行環境です。パイプラインはPython SDKで定義され、YAMLにコンパイルされます。</p>

<pre><code class="language-text">Vertex AI Pipeline Structure:

@component (preprocess_data)
     ↓
@component (train_model)
     ↓
@component (evaluate_model)
     ↓ (if accuracy > threshold)
@component (deploy_model)

Each component = isolated Docker container
Artifacts (data, models) stored in Cloud Storage
Metadata tracked in Vertex ML Metadata Store
</code></pre>

<table>
<thead><tr><th>パイプラインSDK</th><th>備考</th></tr></thead>
<tbody>
<tr><td><strong>Kubeflow Pipelines SDK v2</strong></td><td>Vertex AI Pipelinesの主要SDK</td></tr>
<tr><td><strong>TFX</strong></td><td>TensorFlow固有のパイプラインコンポーネント</td></tr>
<tr><td><strong>Google Cloud Pipeline Components</strong></td><td>Vertex AIサービス向けのビルド済みコンポーネント</td></tr>
</tbody>
</table>

<h2 id="model-monitoring"><strong>3. Vertex AI Model Monitoring</strong></h2>

<table>
<thead><tr><th>モニタリングタイプ</th><th>検出対象</th></tr></thead>
<tbody>
<tr><td><strong>特徴量スキューモニタリング</strong></td><td>サービング時の特徴量分布 ≠ トレーニングベースライン</td></tr>
<tr><td><strong>特徴量ドリフトモニタリング</strong></td><td>サービング時の特徴量分布が時間とともに変化</td></tr>
<tr><td><strong>予測ドリフト</strong></td><td>モデル出力分布が変化（間接的なラベルドリフト）</td></tr>
</tbody>
</table>

<pre><code class="language-text">Model Monitoring Workflow:

Training Data Baseline (BigQuery/GCS)
     ↓ (establish distribution)
Deploy to Endpoint with Monitoring enabled
     ↓ (collect serving requests)
Periodic Analysis (hourly/daily)
     ↓ (compare distributions)
Alert if skew/drift > threshold
     ↓
Retrain trigger → new Pipeline run
</code></pre>

<h2 id="experiments-metadata"><strong>4. Vertex AI ExperimentsとMetadata</strong></h2>

<table>
<thead><tr><th>コンポーネント</th><th>目的</th></tr></thead>
<tbody>
<tr><td><strong>Vertex AI Experiments</strong></td><td>実行間のハイパーパラメータ、メトリクス、アーティファクトを追跡</td></tr>
<tr><td><strong>ML Metadata Store</strong></td><td>リネージの追跡：データ → モデル → エンドポイント</td></tr>
<tr><td><strong>Vertex AI TensorBoard</strong></td><td>トレーニングメトリクスの可視化（損失、精度曲線）</td></tr>
</tbody>
</table>

<h2 id="cicd-ml"><strong>5. GCP上のML向けCI/CD</strong></h2>

<pre><code class="language-text">ML CI/CD Pipeline on GCP:

Code Push to Cloud Source Repositories
     ↓
Cloud Build trigger (CI)
     ├── Unit tests for ML components
     ├── Data validation tests
     └── Build Docker image → push to Artifact Registry
          ↓
Vertex AI Pipeline trigger (CD/CT)
     ├── Data preprocessing
     ├── Model training
     ├── Model evaluation
     └── Conditional deployment → Vertex AI Endpoint
</code></pre>

<blockquote>
<p><strong>試験のヒント：</strong> ML向けCI/CD = Cloud Build（コードテスト + Dockerビルド）+ Vertex AI Pipelines（トレーニング + デプロイメントオーケストレーション）。Cloud Source RepositoriesはGCPのGitホスティングです。Artifact RegistryがContainer Registryに代わってDockerイメージを保存します。</p>
</blockquote>

<h2 id="practice"><strong>6. 練習問題</strong></h2>

<p><strong>Q1：</strong> 本番MLモデルの予測分布が3週間にわたって大幅にシフトしていますが、精度を直接測定するためのグラウンドトゥルースラベルはまだ利用できません。これを検出するVertex AIモニタリングタイプはどれでしょうか？</p>
<ul>
<li>A) 特徴量スキューモニタリング</li>
<li>B) 予測ドリフトモニタリング ✓</li>
<li>C) トレーニングデータバリデーション</li>
<li>D) Vertex AI Experimentsベースライン比較</li>
</ul>
<p><em>解説：予測ドリフトモニタリングは、モデルの出力分布が時間とともにどのように変化するかを追跡し、グラウンドトゥルースラベルが利用できない場合でもモデル劣化の間接的なシグナルとして機能します。特徴量スキューは、サービング時とトレーニング時の特徴量分布を比較します（既知のトレーニングベースラインが必要）。</em></p>

<p><strong>Q2：</strong> チームが、データ前処理、モデルトレーニング、デプロイメントを含むVertex AI Pipelineを構築しています。監査可能性と再現性のために、すべての入力、出力、モデルアーティファクトを追跡する必要があります。このリネージ情報を保存するサービスはどれでしょうか？</p>
<ul>
<li>A) Cloud Logging</li>
<li>B) Vertex AI ML Metadata Store ✓</li>
<li>C) Cloud Storageバージョニング</li>
<li>D) Vertex AI Experimentsダッシュボード</li>
</ul>
<p><em>解説：Vertex AI ML Metadata Store（Vertex ML Metadataとも呼ばれる）は、どのデータセットがどのモデルを生成し、どのモデルがどのエンドポイントにデプロイされたかを、ハイパーパラメータや評価メトリクスを含めて自動的に追跡し、完全な来歴追跡を可能にします。</em></p>

<p><strong>Q3：</strong> 企業が、Cloud Storageに新しいトレーニングデータが利用可能になるたびにMLモデルを自動的に再トレーニングしたいと考えています。再トレーニングはVertex AI Pipelineを実行し、メトリクスが閾値を超えた場合にデプロイする必要があります。パイプラインをトリガーするGCPサービスはどれでしょうか？</p>
<ul>
<li>A) Vertex AI Schedules</li>
<li>B) Cloud Storage通知 + Cloud Functions/Eventarc → Vertex AI Pipelines ✓</li>
<li>C) BigQueryスケジュールクエリ</li>
<li>D) Cloud Scheduler単体</li>
</ul>
<p><em>解説：Cloud Storageのオブジェクト完了通知はCloud FunctionsまたはEventarcをトリガーでき、それがプログラム的にVertex AI Pipelineの実行を開始します。これにより、イベント駆動の継続的トレーニング（MLOpsレベル1）が実現されます。Cloud Schedulerはデータの可用性ではなく時間に基づいてトリガーします。</em></p>
