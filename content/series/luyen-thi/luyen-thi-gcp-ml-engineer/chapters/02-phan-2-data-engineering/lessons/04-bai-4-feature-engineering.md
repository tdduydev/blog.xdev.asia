---
id: 019c9619-lt03-l04
title: 'Bài 4: Feature Engineering & Vertex AI Feature Store'
slug: bai-4-feature-engineering
description: >-
  Feature engineering techniques. BigQuery cho feature computation.
  Vertex AI Feature Store: online/offline serving.
  Feature monitoring, consistency giữa training/serving.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 4
section_title: "Phần 2: Data Engineering & Feature Engineering"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Luyện thi Google Cloud Professional Machine Learning Engineer'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai4-feature-store.webp" alt="Vertex AI Feature Store" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Feature Engineering & Vertex AI Feature Store: tạo, lưu trữ, và tái sử dụng features cho ML</em></p>
</div>

<h2 id="feature-engineering"><strong>1. Feature Engineering Techniques</strong></h2>

<table>
<thead><tr><th>Technique</th><th>When to Use</th><th>Example</th></tr></thead>
<tbody>
<tr><td><strong>Normalization (Min-Max)</strong></td><td>Bounded range required (0-1)</td><td>Image pixels, probabilities</td></tr>
<tr><td><strong>Standardization (Z-score)</strong></td><td>Normal-ish distribution, no bounds</td><td>Customer age, transaction amount</td></tr>
<tr><td><strong>Log Transform</strong></td><td>Skewed distributions (price, salary)</td><td>Log(price) for housing</td></tr>
<tr><td><strong>One-Hot Encoding</strong></td><td>Nominal categorical (no order)</td><td>Country, brand, color</td></tr>
<tr><td><strong>Label Encoding</strong></td><td>Ordinal categorical (has order)</td><td>Low/Medium/High → 0/1/2</td></tr>
<tr><td><strong>Feature Crossing</strong></td><td>Capture interaction between features</td><td>city × day_of_week</td></tr>
<tr><td><strong>Bucketizing</strong></td><td>Convert continuous to categorical</td><td>Age → age_group</td></tr>
<tr><td><strong>Embeddings</strong></td><td>High-cardinality categorical</td><td>UserID, ProductID</td></tr>
</tbody>
</table>

<h2 id="missing-values"><strong>2. Handling Missing Values</strong></h2>

<table>
<thead><tr><th>Strategy</th><th>When</th></tr></thead>
<tbody>
<tr><td><strong>Mean/Median imputation</strong></td><td>Numerical, low missingness rate</td></tr>
<tr><td><strong>Mode imputation</strong></td><td>Categorical features</td></tr>
<tr><td><strong>Model-based imputation</strong></td><td>High missingness, complex patterns</td></tr>
<tr><td><strong>Indicator variable</strong></td><td>Missingness itself is informative (add is_missing flag)</td></tr>
<tr><td><strong>Drop rows</strong></td><td>Missing target / very few rows affected</td></tr>
<tr><td><strong>Drop column</strong></td><td>&gt;80% missing</td></tr>
</tbody>
</table>

<h2 id="training-serving-skew"><strong>3. Training-Serving Skew</strong></h2>

<p><strong>Training-serving skew</strong> là vấn đề nghiêm trọng: features được compute khác nhau giữa training và serving, khiến model hoạt động kém trong production dù test metrics tốt.</p>

<pre><code class="language-text">Training-Serving Skew Example:

TRAINING TIME:
  avg_purchase_last_30d = mean(all purchases in batch)  ← computed over full period

SERVING TIME:
  avg_purchase_last_30d = mean(last 5 purchases)        ← computed differently!

Result: Feature distribution mismatch → poor predictions

SOLUTION: Vertex AI Feature Store
  Same feature serve logic used at training AND serving time
</code></pre>

<h2 id="feature-store"><strong>4. Vertex AI Feature Store</strong></h2>

<table>
<thead><tr><th>Component</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Feature Store</strong></td><td>Centralized repository for ML features</td></tr>
<tr><td><strong>Entity Type</strong></td><td>Category of things you track (User, Product)</td></tr>
<tr><td><strong>Feature</strong></td><td>Named attribute of an entity (user.avg_spend)</td></tr>
<tr><td><strong>Online Store</strong></td><td>Low-latency serving (ms) for real-time predictions</td></tr>
<tr><td><strong>Offline Store</strong></td><td>BigQuery-backed, for batch training data retrieval</td></tr>
</tbody>
</table>

<pre><code class="language-text">Vertex AI Feature Store Architecture:

Feature Ingestion (Batch or Streaming)
        ↓
┌──── Feature Store ────────────────┐
│  Offline Store (BigQuery)          │  ← Training data export
│  Online Store (Bigtable-backed)    │  ← Serving (ms latency)
└───────────────────────────────────┘
        ↑ Same features ↑
  Training      Inference
  Pipeline      Endpoint
</code></pre>

<h2 id="bigquery-features"><strong>5. BigQuery for Feature Engineering</strong></h2>

<p>BigQuery là công cụ tốt nhất trên GCP để compute aggregate features từ large datasets.</p>

<table>
<thead><tr><th>Feature Pattern</th><th>BigQuery Approach</th></tr></thead>
<tbody>
<tr><td>Rolling window aggregates</td><td>Window functions: AVG() OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN ...)</td></tr>
<tr><td>User activity counts</td><td>COUNT() GROUP BY user_id</td></tr>
<tr><td>Categorical encoding</td><td>CASE WHEN ... or ML.ONE_HOT_ENCODE()</td></tr>
<tr><td>Hash embedding (high cardinality)</td><td>FARM_FINGERPRINT() mod N</td></tr>
<tr><td>Feature normalization</td><td>ML.STANDARD_SCALER() in BigQuery ML</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> Khi câu hỏi nhắc đến "training-serving consistency" hoặc "feature reuse across multiple models" → <strong>Vertex AI Feature Store</strong>. Khi nhắc đến "compute features from BigQuery data at scale" → BigQuery window functions + scheduled queries.</p>
</blockquote>

<h2 id="feature-monitoring"><strong>6. Feature Drift Monitoring</strong></h2>

<table>
<thead><tr><th>Type</th><th>What Changes</th><th>Detection Method</th></tr></thead>
<tbody>
<tr><td><strong>Feature Skew</strong></td><td>Training vs serving feature distribution differs</td><td>Compare training baseline vs serving stats</td></tr>
<tr><td><strong>Feature Drift</strong></td><td>Serving features change over time</td><td>Monitor serving feature distributions daily</td></tr>
<tr><td><strong>Label Drift</strong></td><td>Target variable distribution changes</td><td>Track prediction distribution shifts</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A team's ML model has excellent accuracy during testing but performs poorly in production. Investigations reveal that the average purchase feature is calculated differently in training (using historical batch data) vs. serving (using real-time lookups). What is this problem called and how should it be solved?</p>
<ul>
<li>A) Model drift — retrain the model more frequently</li>
<li>B) Training-serving skew — use Vertex AI Feature Store ✓</li>
<li>C) Data leakage — remove the purchase feature</li>
<li>D) Overfitting — add dropout layers</li>
</ul>
<p><em>Explanation: Training-serving skew occurs when features are computed differently at training and serving time. Vertex AI Feature Store solves this by providing a single source of truth for feature computation, ensuring the same logic is used for both training data export and online serving.</em></p>

<p><strong>Q2:</strong> A feature has values ranging from $10 to $10,000,000 with a heavily right-skewed distribution. Which transformation is MOST appropriate before using this feature in a linear model?</p>
<ul>
<li>A) One-Hot Encoding</li>
<li>B) Min-Max Normalization</li>
<li>C) Log transformation ✓</li>
<li>D) Label Encoding</li>
</ul>
<p><em>Explanation: Log transformation compresses the scale of highly skewed distributions, making them more normal-like and suitable for linear models. Min-Max normalization would still preserve the skew. One-hot encoding is for categorical data.</em></p>

<p><strong>Q3:</strong> Which Vertex AI Feature Store store type is optimized for serving features to real-time prediction endpoints with millisecond latency?</p>
<ul>
<li>A) Offline Store (BigQuery)</li>
<li>B) Online Store (Bigtable-backed) ✓</li>
<li>C) Feature Catalog</li>
<li>D) Cloud Memorystore</li>
</ul>
<p><em>Explanation: The Online Store in Vertex AI Feature Store is backed by Bigtable and designed for sub-100ms latency lookups, serving fresh feature values to real-time prediction endpoints. The Offline Store uses BigQuery and is for batch training data retrieval.</em></p>
