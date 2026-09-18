---
id: 019c9619-lt03-l06
title: 'Bài 6: BigQuery ML & TensorFlow on GCP'
slug: bai-6-bigquery-ml-tensorflow
description: >-
  BigQuery ML: CREATE MODEL syntax, supported models.
  TensorFlow Extended (TFX) pipeline components.
  TFServing, TFLite. Model optimization techniques.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 6
section_title: "Phần 3: Model Development trên Vertex AI"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Luyện thi Google Cloud Professional Machine Learning Engineer'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai6-bqml-tfx.webp" alt="BigQuery ML & TFX Pipeline" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>BigQuery ML và TFX Pipeline: train models bằng SQL, optimize model, và production ML pipelines</em></p>
</div>

<h2 id="bigquery-ml"><strong>1. BigQuery ML (BQML)</strong></h2>

<p>BigQuery ML cho phép data analysts train và serve ML models bằng SQL trong BigQuery — không cần export data, không cần biết framework ML.</p>

<pre><code class="language-text">BigQuery ML Workflow:

1. CREATE MODEL → train
2. ML.EVALUATE() → evaluate metrics
3. ML.PREDICT() → generate predictions
4. ML.EXPLAIN_PREDICT() → SHAP-based explanations
5. EXPORT MODEL → export to Cloud Storage (TF SavedModel format)
</code></pre>

<table>
<thead><tr><th>Model Type</th><th>BQML Option</th><th>Task</th></tr></thead>
<tbody>
<tr><td>Linear Regression</td><td>LINEAR_REG</td><td>Regression</td></tr>
<tr><td>Logistic Regression</td><td>LOGISTIC_REG</td><td>Binary/Multiclass classification</td></tr>
<tr><td>K-Means</td><td>KMEANS</td><td>Clustering</td></tr>
<tr><td>XGBoost</td><td>BOOSTED_TREE_CLASSIFIER / BOOSTED_TREE_REGRESSOR</td><td>Tabular classification/regression</td></tr>
<tr><td>Random Forest</td><td>RANDOM_FOREST_CLASSIFIER / RANDOM_FOREST_REGRESSOR</td><td>Tabular classification/regression</td></tr>
<tr><td>DNN</td><td>DNN_CLASSIFIER / DNN_REGRESSOR</td><td>Complex patterns</td></tr>
<tr><td>Wide &amp; Deep</td><td>WIDE_AND_DEEP_CLASSIFIER</td><td>Recommendations (memorization + generalization)</td></tr>
<tr><td>AutoML</td><td>AUTOML_CLASSIFIER / AUTOML_REGRESSOR</td><td>Automated model selection</td></tr>
<tr><td>Time Series</td><td>ARIMA_PLUS</td><td>Forecasting</td></tr>
<tr><td>Matrix Factorization</td><td>MATRIX_FACTORIZATION</td><td>Collaborative filtering</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> BQML ARIMA_PLUS tự động xử lý seasonality, holiday effects, trend decomposition. Khi đề hỏi "forecast using BigQuery data" → ARIMA_PLUS. Khi hỏi "recommendation system in BigQuery" → MATRIX_FACTORIZATION.</p>
</blockquote>

<h2 id="tfx"><strong>2. TensorFlow Extended (TFX)</strong></h2>

<p>TFX là production ML pipeline library dành cho TensorFlow. Cung cấp standard components cho mỗi bước trong ML lifecycle.</p>

<table>
<thead><tr><th>TFX Component</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td><strong>ExampleGen</strong></td><td>Ingest data từ CSV, BigQuery, Avro, Parquet</td></tr>
<tr><td><strong>StatisticsGen</strong></td><td>Compute statistics về training data</td></tr>
<tr><td><strong>SchemaGen</strong></td><td>Infer schema từ statistics</td></tr>
<tr><td><strong>ExampleValidator</strong></td><td>Detect anomalies: missing, distribution skew</td></tr>
<tr><td><strong>Transform</strong></td><td>Feature engineering (Apache Beam-based)</td></tr>
<tr><td><strong>Trainer</strong></td><td>Train TF model (EvalSpec + TrainSpec)</td></tr>
<tr><td><strong>Tuner</strong></td><td>Hyperparameter tuning (KerasTuner)</td></tr>
<tr><td><strong>Evaluator</strong></td><td>Evaluate model against baseline</td></tr>
<tr><td><strong>ModelValidator</strong></td><td>Validate model meets quality thresholds</td></tr>
<tr><td><strong>Pusher</strong></td><td>Push model to serving (TF Serving, Vertex AI)</td></tr>
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

<h2 id="tf-serving"><strong>3. TF Serving & TFLite</strong></h2>

<table>
<thead><tr><th>Option</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>TF Serving</strong></td><td>High-performance serving trên server/cloud (gRPC or REST)</td></tr>
<tr><td><strong>TFLite</strong></td><td>Mobile devices, edge devices, microcontrollers</td></tr>
<tr><td><strong>TF.js</strong></td><td>Browser-based inference</td></tr>
</tbody>
</table>

<h2 id="model-optimization"><strong>4. Model Optimization Techniques</strong></h2>

<table>
<thead><tr><th>Technique</th><th>Description</th><th>Trade-off</th></tr></thead>
<tbody>
<tr><td><strong>Quantization</strong></td><td>Float32 → INT8 weights</td><td>4x smaller, ~2x faster, slight accuracy loss</td></tr>
<tr><td><strong>Pruning</strong></td><td>Remove low-weight connections</td><td>Smaller model, preserve accuracy</td></tr>
<tr><td><strong>Knowledge Distillation</strong></td><td>Train small "student" model from large "teacher"</td><td>Smaller + fast, slight accuracy loss</td></tr>
<tr><td><strong>TensorRT</strong></td><td>NVIDIA GPU optimization (layer fusion)</td><td>3-5x inference speedup on NVIDIA GPUs</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>5. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A data analyst team needs to build a sales forecasting model on data already in BigQuery. They are comfortable with SQL but have no Python/ML framework experience. Which BigQuery ML model type should they use for time series forecasting?</p>
<ul>
<li>A) KMEANS</li>
<li>B) LOGISTIC_REG</li>
<li>C) ARIMA_PLUS ✓</li>
<li>D) MATRIX_FACTORIZATION</li>
</ul>
<p><em>Explanation: BigQuery ML ARIMA_PLUS is designed for time series forecasting and automatically handles seasonality, trend, and holiday effects. It can be trained with a simple CREATE MODEL statement in SQL, requiring no Python expertise.</em></p>

<p><strong>Q2:</strong> A TFX pipeline is detecting that the distribution of the "age" feature in new production data differs significantly from the training data distribution. Which TFX component is responsible for detecting this anomaly?</p>
<ul>
<li>A) StatisticsGen</li>
<li>B) SchemaGen</li>
<li>C) ExampleValidator ✓</li>
<li>D) Transform</li>
</ul>
<p><em>Explanation: ExampleValidator compares data statistics against the expected schema and flags anomalies including distribution skew (significant difference between training and serving data distributions). StatisticsGen computes statistics; SchemaGen creates the schema; Transform does feature engineering.</em></p>

<p><strong>Q3:</strong> A team needs to deploy a TensorFlow image classification model to mobile devices with limited compute resources. They need to reduce model size by 4x with minimal accuracy loss. Which technique should they apply?</p>
<ul>
<li>A) Knowledge Distillation</li>
<li>B) Model Pruning</li>
<li>C) Post-training quantization (INT8) ✓</li>
<li>D) TensorRT optimization</li>
</ul>
<p><em>Explanation: Post-training quantization converts Float32 weights to INT8, reducing model size by approximately 4x and improving inference speed by 2x, with minimal accuracy loss for most models. TFLite supports INT8 quantization for mobile/edge deployment. TensorRT is for NVIDIA GPUs, not mobile.</em></p>
