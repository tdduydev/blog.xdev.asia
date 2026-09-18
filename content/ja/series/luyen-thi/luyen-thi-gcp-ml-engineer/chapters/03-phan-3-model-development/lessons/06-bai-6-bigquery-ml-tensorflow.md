---
id: 019c9619-lt03-l06
title: '第6課：BigQuery MLとGCP上のTensorFlow'
slug: bai-6-bigquery-ml-tensorflow
description: >-
  BigQuery ML：CREATE MODEL構文、対応モデル。
  TensorFlow Extended（TFX）パイプラインコンポーネント。
  TFServing、TFLite。モデル最適化技法。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 6
section_title: "領域3：Vertex AI上でのモデル開発"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer 試験対策'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai6-bqml-tfx.webp" alt="BigQuery ML & TFX Pipeline" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>BigQuery MLとTFXパイプライン：SQLによるモデルトレーニング、モデル最適化、本番MLパイプライン</em></p>
</div>

<h2 id="bigquery-ml"><strong>1. BigQuery ML（BQML）</strong></h2>

<p>BigQuery MLは、データアナリストがBigQuery内でSQLを使用してMLモデルのトレーニングとサービングを行えるようにします — データのエクスポートやMLフレームワークの知識は不要です。</p>

<pre><code class="language-text">BigQuery ML Workflow:

1. CREATE MODEL → train
2. ML.EVALUATE() → evaluate metrics
3. ML.PREDICT() → generate predictions
4. ML.EXPLAIN_PREDICT() → SHAP-based explanations
5. EXPORT MODEL → export to Cloud Storage (TF SavedModel format)
</code></pre>

<table>
<thead><tr><th>モデルタイプ</th><th>BQMLオプション</th><th>タスク</th></tr></thead>
<tbody>
<tr><td>線形回帰</td><td>LINEAR_REG</td><td>回帰</td></tr>
<tr><td>ロジスティック回帰</td><td>LOGISTIC_REG</td><td>二値/多値分類</td></tr>
<tr><td>K-Means</td><td>KMEANS</td><td>クラスタリング</td></tr>
<tr><td>XGBoost</td><td>BOOSTED_TREE_CLASSIFIER / BOOSTED_TREE_REGRESSOR</td><td>テーブルデータの分類/回帰</td></tr>
<tr><td>Random Forest</td><td>RANDOM_FOREST_CLASSIFIER / RANDOM_FOREST_REGRESSOR</td><td>テーブルデータの分類/回帰</td></tr>
<tr><td>DNN</td><td>DNN_CLASSIFIER / DNN_REGRESSOR</td><td>複雑なパターン</td></tr>
<tr><td>Wide &amp; Deep</td><td>WIDE_AND_DEEP_CLASSIFIER</td><td>レコメンデーション（記憶 + 汎化）</td></tr>
<tr><td>AutoML</td><td>AUTOML_CLASSIFIER / AUTOML_REGRESSOR</td><td>自動モデル選択</td></tr>
<tr><td>時系列</td><td>ARIMA_PLUS</td><td>予測</td></tr>
<tr><td>行列分解</td><td>MATRIX_FACTORIZATION</td><td>協調フィルタリング</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> BQML ARIMA_PLUSは季節性、休日効果、トレンド分解を自動的に処理します。「BigQueryデータを使って予測」→ ARIMA_PLUS。「BigQueryでのレコメンデーションシステム」→ MATRIX_FACTORIZATION。</p>
</blockquote>

<h2 id="tfx"><strong>2. TensorFlow Extended（TFX）</strong></h2>

<p>TFXはTensorFlow向けの本番MLパイプラインライブラリです。MLライフサイクルの各ステップに標準コンポーネントを提供します。</p>

<table>
<thead><tr><th>TFXコンポーネント</th><th>目的</th></tr></thead>
<tbody>
<tr><td><strong>ExampleGen</strong></td><td>CSV、BigQuery、Avro、Parquetからのデータ取り込み</td></tr>
<tr><td><strong>StatisticsGen</strong></td><td>トレーニングデータの統計情報を計算</td></tr>
<tr><td><strong>SchemaGen</strong></td><td>統計情報からスキーマを推論</td></tr>
<tr><td><strong>ExampleValidator</strong></td><td>異常の検出：欠損、分布スキュー</td></tr>
<tr><td><strong>Transform</strong></td><td>特徴量エンジニアリング（Apache Beamベース）</td></tr>
<tr><td><strong>Trainer</strong></td><td>TFモデルのトレーニング（EvalSpec + TrainSpec）</td></tr>
<tr><td><strong>Tuner</strong></td><td>ハイパーパラメータチューニング（KerasTuner）</td></tr>
<tr><td><strong>Evaluator</strong></td><td>ベースラインに対するモデルの評価</td></tr>
<tr><td><strong>ModelValidator</strong></td><td>モデルが品質閾値を満たしているか検証</td></tr>
<tr><td><strong>Pusher</strong></td><td>サービングへのモデルプッシュ（TF Serving、Vertex AI）</td></tr>
</tbody>
</table>

<pre><code class="language-text">TFX Pipeline (simplified):

ExampleGen → StatisticsGen → SchemaGen → ExampleValidator
                ↓
            Transform (feature engineering)
                ↓
            Trainer (model training)
                ↓
            Evaluator (metrics vs baseline)
                ↓ (if pass)
            Pusher → TF Serving / Vertex AI Endpoint
</code></pre>

<h2 id="tf-serving"><strong>3. TF ServingとTFLite</strong></h2>

<table>
<thead><tr><th>オプション</th><th>ユースケース</th></tr></thead>
<tbody>
<tr><td><strong>TF Serving</strong></td><td>サーバー/クラウドでの高性能サービング（gRPCまたはREST）</td></tr>
<tr><td><strong>TFLite</strong></td><td>モバイルデバイス、エッジデバイス、マイクロコントローラー</td></tr>
<tr><td><strong>TF.js</strong></td><td>ブラウザベースの推論</td></tr>
</tbody>
</table>

<h2 id="model-optimization"><strong>4. モデル最適化技法</strong></h2>

<table>
<thead><tr><th>技法</th><th>説明</th><th>トレードオフ</th></tr></thead>
<tbody>
<tr><td><strong>量子化</strong></td><td>Float32 → INT8の重み変換</td><td>4倍小さく、約2倍高速、わずかな精度低下</td></tr>
<tr><td><strong>枝刈り</strong></td><td>低い重みの接続を削除</td><td>モデルの小型化、精度を維持</td></tr>
<tr><td><strong>知識蒸留</strong></td><td>大きな「教師」モデルから小さな「生徒」モデルを訓練</td><td>より小さく高速、わずかな精度低下</td></tr>
<tr><td><strong>TensorRT</strong></td><td>NVIDIA GPU最適化（レイヤー融合）</td><td>NVIDIA GPUで推論3-5倍高速化</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>5. 練習問題</strong></h2>

<p><strong>Q1：</strong> データアナリストチームがBigQueryに既にあるデータで売上予測モデルを構築する必要があります。SQLに精通していますが、Python/MLフレームワークの経験はありません。時系列予測にどのBigQuery MLモデルタイプを使用すべきでしょうか？</p>
<ul>
<li>A) KMEANS</li>
<li>B) LOGISTIC_REG</li>
<li>C) ARIMA_PLUS ✓</li>
<li>D) MATRIX_FACTORIZATION</li>
</ul>
<p><em>解説：BigQuery ML ARIMA_PLUSは時系列予測用に設計されており、季節性、トレンド、休日効果を自動的に処理します。SQLの簡単なCREATE MODEL文でトレーニングでき、Pythonの専門知識は不要です。</em></p>

<p><strong>Q2：</strong> TFXパイプラインが、新しい本番データの「age」特徴量の分布がトレーニングデータの分布と大きく異なることを検出しています。この異常の検出を担当するTFXコンポーネントはどれでしょうか？</p>
<ul>
<li>A) StatisticsGen</li>
<li>B) SchemaGen</li>
<li>C) ExampleValidator ✓</li>
<li>D) Transform</li>
</ul>
<p><em>解説：ExampleValidatorはデータ統計を期待されるスキーマと比較し、分布スキュー（トレーニングデータとサービングデータの分布の顕著な差異）を含む異常をフラグします。StatisticsGenは統計を計算し、SchemaGenはスキーマを作成し、Transformは特徴量エンジニアリングを行います。</em></p>

<p><strong>Q3：</strong> チームが計算リソースが限られたモバイルデバイスにTensorFlow画像分類モデルをデプロイする必要があります。精度の損失を最小限に抑えながらモデルサイズを4倍に削減する必要があります。どの技法を適用すべきでしょうか？</p>
<ul>
<li>A) 知識蒸留</li>
<li>B) モデル枝刈り</li>
<li>C) 学習後量子化（INT8） ✓</li>
<li>D) TensorRT最適化</li>
</ul>
<p><em>解説：学習後量子化はFloat32の重みをINT8に変換し、モデルサイズを約4倍削減し、推論速度を2倍向上させます。ほとんどのモデルで精度の損失は最小限です。TFLiteはモバイル/エッジデプロイメント向けのINT8量子化をサポートしています。TensorRTはモバイルではなくNVIDIA GPU向けです。</em></p>
