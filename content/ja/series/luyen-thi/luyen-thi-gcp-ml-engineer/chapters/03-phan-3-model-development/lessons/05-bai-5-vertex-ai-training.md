---
id: 019c9619-lt03-l05
title: '第5課：Vertex AIトレーニング — カスタムとAutoML'
slug: bai-5-vertex-ai-training
description: >-
  カスタムトレーニングジョブ：ビルド済みコンテナ、カスタムコンテナ。
  GPU/TPU上の分散トレーニング。AutoML：Tabular、Image、Text、Video。
  トレーニングパイプラインの設定。ハイパーパラメータチューニングサービス。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 5
section_title: "領域3：Vertex AI上でのモデル開発"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer 試験対策'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai5-vertex-training.webp" alt="Vertex AI Custom Training" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Vertex AIカスタムトレーニング：Training Jobs、AutoML、分散トレーニングと最適化</em></p>
</div>

<h2 id="custom-training"><strong>1. Vertex AIカスタムトレーニング</strong></h2>

<p>カスタムトレーニングでは、Google Cloudインフラ上で独自のトレーニングコードを実行できます。コードのパッケージング方法は2つあります：</p>

<table>
<thead><tr><th>方法</th><th>説明</th><th>使用場面</th></tr></thead>
<tbody>
<tr><td><strong>ビルド済みコンテナ</strong></td><td>GCP提供のコンテナ：TF、PyTorch、Scikit-learn、XGBoost</td><td>標準的なMLフレームワーク、迅速なセットアップ</td></tr>
<tr><td><strong>カスタムコンテナ</strong></td><td>独自のDockerイメージを構築</td><td>カスタム依存関係、特殊な環境</td></tr>
</tbody>
</table>

<pre><code class="language-text">Custom Training Job Structure:

training_package/ (Python package or Docker image)
│
├── trainer/
│   ├── __init__.py
│   ├── task.py        ← entry point (main training script)
│   └── model.py       ← model definition
│
└── setup.py

Arguments passed via:
  TRAINING_DATA_URI: gs://bucket/data/
  TRAINING_OUTPUT_URI: gs://bucket/model/
  Hyperparameters: --learning-rate=0.001
</code></pre>

<h2 id="compute-options"><strong>2. コンピュートオプション</strong></h2>

<table>
<thead><tr><th>ハードウェア</th><th>最適な用途</th><th>備考</th></tr></thead>
<tbody>
<tr><td><strong>CPU</strong></td><td>Scikit-learn、小規模テーブルデータ</td><td>最安価、GPU並列化なし</td></tr>
<tr><td><strong>GPU（T4、A100、V100）</strong></td><td>ディープラーニング、NLP、CV</td><td>DLではCPUの10-100倍高速</td></tr>
<tr><td><strong>TPU v3、v4</strong></td><td>TensorFlow大規模トレーニング</td><td>Google専用ハードウェア；TF/JAXで非常に高速</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> TPUはTensorFlowとJAX向けに最適化されたGoogle専用ハードウェアです。GPUはすべてのフレームワークで動作します。TPUは非常に大規模なTFモデルで最もコスト効率的で、GPUはより汎用性があります。「TensorFlowの大規模トレーニングで最もコスト効率的」→ TPU。</p>
</blockquote>

<h2 id="distributed-training"><strong>3. Vertex AI上の分散トレーニング</strong></h2>

<table>
<thead><tr><th>戦略</th><th>説明</th><th>ユースケース</th></tr></thead>
<tbody>
<tr><td><strong>Data Parallelism</strong></td><td>データをワーカー間で分割、同じモデル</td><td>ほとんどのDLトレーニングシナリオ</td></tr>
<tr><td><strong>Model Parallelism</strong></td><td>モデルのレイヤーをワーカー間で分割</td><td>モデルが1つのGPUに収まらない場合</td></tr>
<tr><td><strong>MirroredStrategy（TF）</strong></td><td>マルチGPU、単一マシン</td><td>単一ノード、複数GPU</td></tr>
<tr><td><strong>MultiWorkerMirroredStrategy</strong></td><td>マルチGPU、マルチマシン</td><td>クラスタートレーニング</td></tr>
<tr><td><strong>ParameterServerStrategy</strong></td><td>パラメータサーバーによる非同期更新</td><td>非常に大規模なモデル（レガシー）</td></tr>
</tbody>
</table>

<h2 id="automl"><strong>4. Vertex AI AutoML</strong></h2>

<table>
<thead><tr><th>AutoMLの種類</th><th>入力データ</th><th>サポートされるタスク</th></tr></thead>
<tbody>
<tr><td><strong>AutoML Tabular</strong></td><td>CSV、BigQueryテーブル</td><td>分類、回帰、予測</td></tr>
<tr><td><strong>AutoML Image</strong></td><td>JPEG、PNG、BMP</td><td>分類（単一/マルチ）、オブジェクト検出、セグメンテーション</td></tr>
<tr><td><strong>AutoML Text</strong></td><td>テキストドキュメント</td><td>分類、エンティティ抽出、感情分析</td></tr>
<tr><td><strong>AutoML Video</strong></td><td>MP4、AVI、MOV</td><td>分類、オブジェクト検出、アクション認識</td></tr>
</tbody>
</table>

<h2 id="hyperparameter-tuning"><strong>5. Vertex AIハイパーパラメータチューニング</strong></h2>

<p>Vertex AIハイパーパラメータチューニングは、最適なハイパーパラメータの組み合わせを自動的に探索します。</p>

<table>
<thead><tr><th>探索アルゴリズム</th><th>説明</th></tr></thead>
<tbody>
<tr><td><strong>Grid Search</strong></td><td>網羅的、高コスト；小さな探索空間向け</td></tr>
<tr><td><strong>Random Search</strong></td><td>ランダムサンプリング；グリッドより効果的なことが多い</td></tr>
<tr><td><strong>Bayesian Optimization</strong></td><td>ガウス過程を使用したスマートな探索；最も効率的</td></tr>
</tbody>
</table>

<pre><code class="language-text">HPT Job Setup:

hyperparameters:
  - parameter_id: learning_rate
    type: DOUBLE
    min_value: 0.0001
    max_value: 0.1
    scale: LOG  ← log scale for LR

  - parameter_id: batch_size
    type: INTEGER
    values: [32, 64, 128, 256]

metric:
  metric_id: val_accuracy
  goal: MAXIMIZE
  
max_trial_count: 50
parallel_trial_count: 5
</code></pre>

<h2 id="practice"><strong>6. 練習問題</strong></h2>

<p><strong>Q1：</strong> チームが、各8 GPUを搭載した複数のマシンでカスタムTensorFlowモデルをトレーニングしたいと考えています。パラメータサーバーなしで、すべてのワーカー間で勾配を同期したいです。どのTensorFlow分散戦略を使用すべきでしょうか？</p>
<ul>
<li>A) MirroredStrategy</li>
<li>B) MultiWorkerMirroredStrategy ✓</li>
<li>C) ParameterServerStrategy</li>
<li>D) TPUStrategy</li>
</ul>
<p><em>解説：MultiWorkerMirroredStrategyは、それぞれ複数のGPUを持つ複数のマシン間で同期データ並列トレーニングを可能にします。MirroredStrategyは単一マシンのマルチGPU専用です。ParameterServerStrategyは非同期更新を使用します。TPUStrategyはTPUポッド用です。</em></p>

<p><strong>Q2：</strong> ある企業が画像分類モデルをトレーニングする必要がありますが、チームにはディープラーニングの専門知識がありません。5,000枚のラベル付き商品画像があります。最もML専門知識が少なくて済むVertex AIオプションはどれでしょうか？</p>
<ul>
<li>A) TensorFlow CNNによるVertex AIカスタムトレーニング</li>
<li>B) Vertex AI AutoML Image Classification ✓</li>
<li>C) Dataproc Spark ML</li>
<li>D) BigQuery ML</li>
</ul>
<p><em>解説：AutoML Image Classificationは、アーキテクチャ選択、ハイパーパラメータチューニング、トレーニングを自動的に処理します。チームはラベル付き画像をアップロードしてタスクを指定するだけです。コードやディープラーニングの専門知識は不要です。</em></p>

<p><strong>Q3：</strong> 大規模な探索空間を持つ、トレーニングコストの高いディープラーニングモデルを評価する場合、最も効率的なハイパーパラメータ探索戦略はどれでしょうか？</p>
<ul>
<li>A) Grid Search — すべての組み合わせをテスト</li>
<li>B) Random Search — 均一にサンプリング</li>
<li>C) Bayesian Optimization — 過去の試行結果を使用して探索をガイド ✓</li>
<li>D) 手動チューニング — エキスパートがパラメータを選択</li>
</ul>
<p><em>解説：Bayesian Optimizationは、ガウス過程を使用して目的関数の確率モデルを構築し、過去の試行結果に基づいて次に評価するハイパーパラメータ設定をインテリジェントに選択します。グリッドやランダム探索よりもはるかに少ない試行で良好な設定を見つけます。</em></p>
