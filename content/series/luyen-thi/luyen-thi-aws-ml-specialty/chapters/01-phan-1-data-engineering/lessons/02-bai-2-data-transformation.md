---
id: 621b7555-2901-469d-8b0b-a800506c8212
title: 'Bài 2: Data Transformation & Feature Engineering'
slug: bai-2-data-transformation
description: >-
  SageMaker Processing Jobs cho data prep. SageMaker Feature Store.
  Xử lý missing values, encoding, normalization, scaling.
  Text preprocessing, imbalanced data techniques.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 2
section_title: "Phần 1: Data Engineering (20%)"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'Luyện thi AWS Certified Machine Learning - Specialty'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai2-feature-engineering.webp" alt="AWS ML Data Transformation Pipeline" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Feature Engineering & Data Transformation: Glue, SageMaker Data Wrangler, và xử lý missing values</em></p>
</div>

<h2 id="overview"><strong>1. Data Transformation trong ML Pipeline</strong></h2>

<p>Trước khi train model, raw data phải qua nhiều bước transformation. Đây là nguồn gốc của câu nói nổi tiếng: <em>"Garbage in, garbage out"</em>. Đề thi MLS-C01 thường hỏi kỹ thuật xử lý data và tools phù hợp.</p>

<h2 id="processing-jobs"><strong>2. SageMaker Processing Jobs</strong></h2>

<p><strong>SageMaker Processing Jobs</strong> là managed service để chạy data processing scripts (Python, Spark) trên ephemeral compute clusters.</p>

<table>
<thead><tr><th>Processor Type</th><th>Framework</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>ScriptProcessor</strong></td><td>Custom Docker container</td><td>Any custom script</td></tr>
<tr><td><strong>SKLearnProcessor</strong></td><td>scikit-learn</td><td>Classic ML preprocessing</td></tr>
<tr><td><strong>PySparkProcessor</strong></td><td>Apache Spark</td><td>Large-scale distributed processing</td></tr>
<tr><td><strong>FrameworkProcessor</strong></td><td>TensorFlow/PyTorch</td><td>Deep learning data prep</td></tr>
</tbody>
</table>

<pre><code class="language-text">SageMaker Processing Job Flow:

S3 (input data)
      ↓
┌─────────────────────┐
│  Processing Job     │
│  (compute cluster)  │
│                     │
│  - Preprocess data  │
│  - Feature engineer │
│  - Split train/test │
└─────────────────────┘
      ↓
S3 (output: train/, validation/, test/)
</code></pre>

<h2 id="missing-values"><strong>3. Xử lý Missing Values</strong></h2>

<table>
<thead><tr><th>Strategy</th><th>Method</th><th>When to Use</th></tr></thead>
<tbody>
<tr><td><strong>Deletion</strong></td><td>Drop rows/columns</td><td>MCAR, ít missing (&lt;5%)</td></tr>
<tr><td><strong>Mean/Median Imputation</strong></td><td>Điền giá trị trung bình</td><td>Numeric, MCAR/MAR</td></tr>
<tr><td><strong>Mode Imputation</strong></td><td>Điền giá trị phổ biến nhất</td><td>Categorical</td></tr>
<tr><td><strong>KNN Imputation</strong></td><td>Dùng K neighbors gần nhất</td><td>Patterns in data, không quá lớn</td></tr>
<tr><td><strong>Model-based (MICE)</strong></td><td>Multiple imputation</td><td>Complex missingness patterns</td></tr>
<tr><td><strong>Indicator Feature</strong></td><td>Thêm cột is_missing</td><td>Khi missingness chứa thông tin</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> Ba loại missing data: <strong>MCAR</strong> (Missing Completely At Random) — deletion an toàn; <strong>MAR</strong> (Missing At Random) — imputation phù hợp; <strong>MNAR</strong> (Missing Not At Random) — cần indicator feature hoặc domain knowledge.</p>
</blockquote>

<h2 id="encoding"><strong>4. Categorical Encoding</strong></h2>

<table>
<thead><tr><th>Encoding</th><th>Method</th><th>When to Use</th><th>Issues</th></tr></thead>
<tbody>
<tr><td><strong>One-Hot Encoding</strong></td><td>Binary columns mỗi category</td><td>Nominal (no order), ít categories</td><td>High cardinality → curse of dimensionality</td></tr>
<tr><td><strong>Label Encoding</strong></td><td>0, 1, 2, 3...</td><td>Ordinal (có thứ tự)</td><td>Implies false order for nominal</td></tr>
<tr><td><strong>Target Encoding</strong></td><td>Mean of target per category</td><td>High cardinality nominal</td><td>Data leakage risk nếu không cẩn thận</td></tr>
<tr><td><strong>Embeddings</strong></td><td>Dense vector representation</td><td>Text, high cardinality</td><td>Cần đủ data để learn</td></tr>
</tbody>
</table>

<h2 id="scaling"><strong>5. Normalization & Scaling</strong></h2>

<table>
<thead><tr><th>Technique</th><th>Formula</th><th>Output Range</th><th>Best For</th></tr></thead>
<tbody>
<tr><td><strong>Min-Max Normalization</strong></td><td>(x - min) / (max - min)</td><td>[0, 1]</td><td>Neural networks, distance-based</td></tr>
<tr><td><strong>Standardization (Z-score)</strong></td><td>(x - mean) / std</td><td>Mean=0, SD=1</td><td>Linear models, SVM, PCA</td></tr>
<tr><td><strong>Robust Scaler</strong></td><td>(x - median) / IQR</td><td>Centered</td><td>Outliers present</td></tr>
<tr><td><strong>Log Transform</strong></td><td>log(x)</td><td>Compressed</td><td>Skewed distributions</td></tr>
</tbody>
</table>

<h2 id="imbalanced"><strong>6. Xử lý Imbalanced Data</strong></h2>

<p>Class imbalance (e.g., fraud detection: 99% normal, 1% fraud) khiến model bias về majority class.</p>

<table>
<thead><tr><th>Technique</th><th>Method</th><th>Direction</th></tr></thead>
<tbody>
<tr><td><strong>Oversampling</strong></td><td>Duplicate minority class samples</td><td>↑ minority</td></tr>
<tr><td><strong>SMOTE</strong></td><td>Synthetic Minority Oversampling Technique — generate synthetic samples</td><td>↑ minority</td></tr>
<tr><td><strong>Undersampling</strong></td><td>Remove majority class samples</td><td>↓ majority</td></tr>
<tr><td><strong>Class Weights</strong></td><td>Penalize misclassification of minority more</td><td>No data change</td></tr>
<tr><td><strong>Ensemble Methods</strong></td><td>BalancedBagging, EasyEnsemble</td><td>Algorithm-level</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> Metric phù hợp cho imbalanced data: <strong>F1 Score, AUC-ROC, Precision-Recall</strong> — KHÔNG dùng Accuracy (misleading). AWS SageMaker Clarify có thể detect class imbalance.</p>
</blockquote>

<h2 id="feature-store"><strong>7. SageMaker Feature Store</strong></h2>

<p><strong>SageMaker Feature Store</strong> là centralized repository để store, share và reuse ML features.</p>

<pre><code class="language-text">Feature Store Architecture:

          Feature Groups
         ┌──────────────────────────────┐
         │  user_features               │
         │  ┌──────┬────────┬────────┐  │
         │  │ id   │ age    │ recency│  │
         │  └──────┴────────┴────────┘  │
         └──────────────────────────────┘
               ↓ writes              ↑ reads
    ┌──────────────────┐   ┌──────────────────┐
    │  Offline Store   │   │  Online Store    │
    │  (S3 - training) │   │  (DynamoDB -     │
    │  batch reads     │   │  low-latency     │
    │                  │   │  inference)      │
    └──────────────────┘   └──────────────────┘
</code></pre>

<h2 id="cheat-sheet"><strong>8. Cheat Sheet — Feature Engineering</strong></h2>

<table>
<thead><tr><th>Problem</th><th>Solution</th></tr></thead>
<tbody>
<tr><td>High cardinality categorical</td><td>Target encoding hoặc embeddings</td></tr>
<tr><td>Missing values (numeric)</td><td>Median imputation + indicator feature</td></tr>
<tr><td>Skewed distribution</td><td>Log transform hoặc Box-Cox</td></tr>
<tr><td>Outliers</td><td>Robust Scaler hoặc clip/winsorize</td></tr>
<tr><td>Imbalanced classes</td><td>SMOTE + class weights + AUC metric</td></tr>
<tr><td>Reuse features across teams</td><td>SageMaker Feature Store</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>9. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A dataset for fraud detection has 98% negative (non-fraud) and 2% positive (fraud) examples. Which metric is MOST appropriate to evaluate the model?</p>
<ul>
<li>A) Accuracy</li>
<li>B) R-squared</li>
<li>C) AUC-ROC ✓</li>
<li>D) Mean Absolute Error</li>
</ul>
<p><em>Explanation: Accuracy is misleading for imbalanced data (predicting all negative gives 98% accuracy). AUC-ROC measures the model's ability to distinguish classes across all thresholds, making it ideal for imbalanced classification.</em></p>

<p><strong>Q2:</strong> Which technique generates SYNTHETIC samples to address class imbalance?</p>
<ul>
<li>A) Random undersampling</li>
<li>B) SMOTE (Synthetic Minority Oversampling Technique) ✓</li>
<li>C) Class weighting</li>
<li>D) Feature scaling</li>
</ul>
<p><em>Explanation: SMOTE creates new synthetic samples for the minority class by interpolating between existing minority class examples, rather than just duplicating them.</em></p>

<p><strong>Q3:</strong> A company wants to share engineered features between their training pipeline and real-time inference service. Which SageMaker feature addresses this?</p>
<ul>
<li>A) SageMaker Processing Jobs</li>
<li>B) SageMaker Experiments</li>
<li>C) SageMaker Feature Store ✓</li>
<li>D) SageMaker Data Wrangler</li>
</ul>
<p><em>Explanation: SageMaker Feature Store provides both an offline store (S3, for batch training) and online store (DynamoDB-backed, for low-latency real-time inference), ensuring feature consistency between training and serving.</em></p>
