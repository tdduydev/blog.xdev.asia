---
id: 019c9619-lt03-l06
title: '第6課：BigQuery ML與GCP上的TensorFlow'
slug: bai-6-bigquery-ml-tensorflow
description: >-
  BigQuery ML：CREATE MODEL語法、支援的模型。
  TensorFlow Extended（TFX）管線元件。
  TFServing、TFLite。模型最佳化技術。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 6
section_title: "領域3：Vertex AI上的模型開發"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer 考試準備'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai6-bqml-tfx.webp" alt="BigQuery ML & TFX Pipeline" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>BigQuery ML與TFX管線：使用SQL訓練模型、模型最佳化與生產ML管線</em></p>
</div>

<h2 id="bigquery-ml"><strong>1. BigQuery ML（BQML）</strong></h2>

<p>BigQuery ML允許資料分析師使用SQL在BigQuery中訓練和服務ML模型——不需要匯出資料，不需要了解ML框架。</p>

<pre><code class="language-text">BigQuery ML Workflow:

1. CREATE MODEL → train
2. ML.EVALUATE() → evaluate metrics
3. ML.PREDICT() → generate predictions
4. ML.EXPLAIN_PREDICT() → SHAP-based explanations
5. EXPORT MODEL → export to Cloud Storage (TF SavedModel format)
</code></pre>

<table>
<thead><tr><th>模型類型</th><th>BQML選項</th><th>任務</th></tr></thead>
<tbody>
<tr><td>線性迴歸</td><td>LINEAR_REG</td><td>迴歸</td></tr>
<tr><td>邏輯迴歸</td><td>LOGISTIC_REG</td><td>二元/多類別分類</td></tr>
<tr><td>K-Means</td><td>KMEANS</td><td>聚類</td></tr>
<tr><td>XGBoost</td><td>BOOSTED_TREE_CLASSIFIER / BOOSTED_TREE_REGRESSOR</td><td>表格資料分類/迴歸</td></tr>
<tr><td>隨機森林</td><td>RANDOM_FOREST_CLASSIFIER / RANDOM_FOREST_REGRESSOR</td><td>表格資料分類/迴歸</td></tr>
<tr><td>DNN</td><td>DNN_CLASSIFIER / DNN_REGRESSOR</td><td>複雜模式</td></tr>
<tr><td>Wide &amp; Deep</td><td>WIDE_AND_DEEP_CLASSIFIER</td><td>推薦系統（記憶 + 泛化）</td></tr>
<tr><td>AutoML</td><td>AUTOML_CLASSIFIER / AUTOML_REGRESSOR</td><td>自動模型選擇</td></tr>
<tr><td>時間序列</td><td>ARIMA_PLUS</td><td>預測</td></tr>
<tr><td>矩陣分解</td><td>MATRIX_FACTORIZATION</td><td>協同過濾</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> BQML ARIMA_PLUS自動處理季節性、假日效應、趨勢分解。題目問「使用BigQuery資料進行預測」→ ARIMA_PLUS。問「BigQuery中的推薦系統」→ MATRIX_FACTORIZATION。</p>
</blockquote>

<h2 id="tfx"><strong>2. TensorFlow Extended（TFX）</strong></h2>

<p>TFX是TensorFlow的生產ML管線函式庫。為ML生命週期中的每個步驟提供標準元件。</p>

<table>
<thead><tr><th>TFX元件</th><th>用途</th></tr></thead>
<tbody>
<tr><td><strong>ExampleGen</strong></td><td>從CSV、BigQuery、Avro、Parquet擷取資料</td></tr>
<tr><td><strong>StatisticsGen</strong></td><td>計算訓練資料的統計資訊</td></tr>
<tr><td><strong>SchemaGen</strong></td><td>從統計資訊推斷綱要</td></tr>
<tr><td><strong>ExampleValidator</strong></td><td>偵測異常：缺失、分佈偏移</td></tr>
<tr><td><strong>Transform</strong></td><td>特徵工程（基於Apache Beam）</td></tr>
<tr><td><strong>Trainer</strong></td><td>訓練TF模型（EvalSpec + TrainSpec）</td></tr>
<tr><td><strong>Tuner</strong></td><td>超參數調優（KerasTuner）</td></tr>
<tr><td><strong>Evaluator</strong></td><td>與基準線比較評估模型</td></tr>
<tr><td><strong>ModelValidator</strong></td><td>驗證模型是否滿足品質閾值</td></tr>
<tr><td><strong>Pusher</strong></td><td>將模型推送到服務端（TF Serving、Vertex AI）</td></tr>
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

<h2 id="tf-serving"><strong>3. TF Serving與TFLite</strong></h2>

<table>
<thead><tr><th>選項</th><th>使用場景</th></tr></thead>
<tbody>
<tr><td><strong>TF Serving</strong></td><td>伺服器/雲端的高效能服務（gRPC或REST）</td></tr>
<tr><td><strong>TFLite</strong></td><td>行動裝置、邊緣裝置、微控制器</td></tr>
<tr><td><strong>TF.js</strong></td><td>瀏覽器端推論</td></tr>
</tbody>
</table>

<h2 id="model-optimization"><strong>4. 模型最佳化技術</strong></h2>

<table>
<thead><tr><th>技術</th><th>說明</th><th>權衡</th></tr></thead>
<tbody>
<tr><td><strong>量化</strong></td><td>Float32 → INT8權重</td><td>4倍縮小、約2倍加速、輕微精確度損失</td></tr>
<tr><td><strong>剪枝</strong></td><td>移除低權重的連接</td><td>更小的模型、保留精確度</td></tr>
<tr><td><strong>知識蒸餾</strong></td><td>從大型「教師」模型訓練小型「學生」模型</td><td>更小更快、輕微精確度損失</td></tr>
<tr><td><strong>TensorRT</strong></td><td>NVIDIA GPU最佳化（層融合）</td><td>在NVIDIA GPU上3-5倍推論加速</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>5. 練習題</strong></h2>

<p><strong>Q1：</strong> 資料分析團隊需要對BigQuery中的資料建構銷售預測模型。他們熟悉SQL但沒有Python/ML框架經驗。應使用哪種BigQuery ML模型類型進行時間序列預測？</p>
<ul>
<li>A) KMEANS</li>
<li>B) LOGISTIC_REG</li>
<li>C) ARIMA_PLUS ✓</li>
<li>D) MATRIX_FACTORIZATION</li>
</ul>
<p><em>解說：BigQuery ML ARIMA_PLUS專為時間序列預測設計，自動處理季節性、趨勢和假日效應。可以用簡單的SQL CREATE MODEL語句訓練，不需要Python專業知識。</em></p>

<p><strong>Q2：</strong> TFX管線偵測到新的生產資料中「age」特徵的分佈與訓練資料分佈有顯著差異。哪個TFX元件負責偵測此異常？</p>
<ul>
<li>A) StatisticsGen</li>
<li>B) SchemaGen</li>
<li>C) ExampleValidator ✓</li>
<li>D) Transform</li>
</ul>
<p><em>解說：ExampleValidator將資料統計與預期的綱要進行比較，並標記包括分佈偏移（訓練和服務資料分佈之間的顯著差異）在內的異常。StatisticsGen計算統計資訊；SchemaGen建立綱要；Transform進行特徵工程。</em></p>

<p><strong>Q3：</strong> 團隊需要將TensorFlow影像分類模型部署到運算資源有限的行動裝置。需要將模型大小縮小4倍且精確度損失最小。應使用哪種技術？</p>
<ul>
<li>A) 知識蒸餾</li>
<li>B) 模型剪枝</li>
<li>C) 訓練後量化（INT8） ✓</li>
<li>D) TensorRT最佳化</li>
</ul>
<p><em>解說：訓練後量化將Float32權重轉換為INT8，將模型大小縮小約4倍，推論速度提高2倍，對大多數模型的精確度損失最小。TFLite支援INT8量化用於行動/邊緣部署。TensorRT是針對NVIDIA GPU，不適用於行動裝置。</em></p>
