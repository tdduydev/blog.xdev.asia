---
id: 8d704042-9cc5-478e-b198-d80ea70c22c5
title: 'Bài 4: SageMaker Built-in Algorithms'
slug: bai-4-sagemaker-built-in-algorithms
description: >-
  XGBoost, Linear Learner, Random Cut Forest, K-Means, KNN.
  BlazingText, Seq2Seq, DeepAR, Object Detection, Semantic Segmentation.
  Khi nào dùng algorithm nào — decision table chi tiết.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 4
section_title: "Phần 2: Modeling (36%)"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'Luyện thi AWS Certified Machine Learning - Specialty'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai4-sagemaker-algorithms.webp" alt="SageMaker Built-in Algorithms" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>SageMaker Built-in Algorithms: từ XGBoost, Linear Learner đến DeepAR và Image Classification</em></p>
</div>

<h2 id="overview"><strong>1. SageMaker Built-in Algorithms Overview</strong></h2>

<p>SageMaker cung cấp 18+ <strong>built-in algorithms</strong> được optimize để chạy distributed trên AWS infrastructure. Đây là topic <strong>cực kỳ quan trọng</strong> trong MLS-C01 — thường chiếm 8-12 câu.</p>

<blockquote>
<p><strong>Exam tip:</strong> Học thuộc bảng "Problem Type → Algorithm". Đề thi luôn cho scenario và hỏi algorithm phù hợp. Key patterns: time series → DeepAR; anomaly → Random Cut Forest; NLP classification → BlazingText; tabular → XGBoost.</p>
</blockquote>

<h2 id="supervised-table"><strong>2. Supervised Learning Algorithms</strong></h2>

<table>
<thead><tr><th>Algorithm</th><th>Problem Type</th><th>Input</th><th>Key Trait</th></tr></thead>
<tbody>
<tr><td><strong>XGBoost</strong></td><td>Classification, Regression</td><td>Tabular (CSV/LibSVM)</td><td>Top performer cho tabular data, gradient boosting</td></tr>
<tr><td><strong>Linear Learner</strong></td><td>Binary/Multiclass classification, Regression</td><td>RecordIO, CSV</td><td>Fast, scalable, regularization built-in</td></tr>
<tr><td><strong>Factorization Machines</strong></td><td>Binary classification, Regression</td><td>RecordIO-protobuf (sparse)</td><td>Sparse data, recommendation systems, CTR prediction</td></tr>
<tr><td><strong>KNN (k-Nearest Neighbors)</strong></td><td>Classification, Regression</td><td>RecordIO-protobuf</td><td>Instance-based, no training, lazy learner</td></tr>
<tr><td><strong>DeepAR</strong></td><td>Time series forecasting</td><td>JSON Lines</td><td>Multiple related time series, probabilistic forecasts</td></tr>
<tr><td><strong>Object2Vec</strong></td><td>Embeddings</td><td>Paired sequences</td><td>Learn embeddings cho words, products, users</td></tr>
</tbody>
</table>

<h2 id="nlp-algorithms"><strong>3. NLP Algorithms</strong></h2>

<table>
<thead><tr><th>Algorithm</th><th>Output</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>BlazingText</strong></td><td>Word vectors hoặc text classification</td><td>Sentiment analysis, spam detection, entity classification</td></tr>
<tr><td><strong>Seq2Seq</strong></td><td>Sequence → Sequence</td><td>Machine translation, summarization, Q&amp;A</td></tr>
<tr><td><strong>LDA (Latent Dirichlet Allocation)</strong></td><td>Topics per document</td><td>Topic modeling, document categorization</td></tr>
<tr><td><strong>NTM (Neural Topic Model)</strong></td><td>Latent representations</td><td>Topic modeling với neural networks</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> <strong>BlazingText</strong> có 2 modes: (1) <code>Word2Vec</code> mode — unsupervised, generates word embeddings; (2) <code>Text Classification</code> mode — supervised, like FastText. Phân biệt rõ khi đọc câu hỏi.</p>
</blockquote>

<h2 id="unsupervised-algorithms"><strong>4. Unsupervised Learning Algorithms</strong></h2>

<table>
<thead><tr><th>Algorithm</th><th>Problem Type</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>K-Means</strong></td><td>Clustering</td><td>Customer segmentation, document grouping</td></tr>
<tr><td><strong>PCA (Principal Component Analysis)</strong></td><td>Dimensionality reduction</td><td>High-dimensional data, feature compression</td></tr>
<tr><td><strong>Random Cut Forest (RCF)</strong></td><td>Anomaly detection</td><td>Fraud detection, IoT anomaly, time series anomaly</td></tr>
<tr><td><strong>IP Insights</strong></td><td>Anomaly detection</td><td>Detect unusual IP-entity relationships, security</td></tr>
</tbody>
</table>

<h2 id="computer-vision"><strong>5. Computer Vision Algorithms</strong></h2>

<table>
<thead><tr><th>Algorithm</th><th>Task</th><th>Output</th></tr></thead>
<tbody>
<tr><td><strong>Image Classification</strong></td><td>Multi-class classification</td><td>Class label + confidence</td></tr>
<tr><td><strong>Object Detection</strong></td><td>Locate + classify objects</td><td>Bounding boxes + labels</td></tr>
<tr><td><strong>Semantic Segmentation</strong></td><td>Pixel-level classification</td><td>Segmentation mask</td></tr>
</tbody>
</table>

<h2 id="algorithm-decision"><strong>6. Algorithm Selection Decision Tree</strong></h2>

<pre><code class="language-text">What is the problem type?
│
├── Tabular data, classification/regression?
│   └── XGBoost (best general choice)
│
├── Sparse features, recommendation, ad CTR?
│   └── Factorization Machines
│
├── Time series forecasting (multiple related series)?
│   └── DeepAR
│
├── Anomaly detection on time series / IoT?
│   └── Random Cut Forest (RCF)
│
├── Text classification / sentiment?
│   └── BlazingText (supervised mode)
│
├── Sequence-to-sequence (translation / summarization)?
│   └── Seq2Seq
│
├── Topic modeling?
│   └── LDA or NTM
│
├── Clustering?
│   └── K-Means
│
├── Dimensionality reduction?
│   └── PCA
│
└── Image tasks?
    ├── Classification only → Image Classification
    ├── Locate objects → Object Detection
    └── Pixel mask → Semantic Segmentation
</code></pre>

<h2 id="training-modes"><strong>7. Training Input Modes</strong></h2>

<table>
<thead><tr><th>Mode</th><th>How It Works</th><th>Best For</th></tr></thead>
<tbody>
<tr><td><strong>File Mode</strong></td><td>Downloads entire dataset to training instance before starting</td><td>Small to medium datasets</td></tr>
<tr><td><strong>Pipe Mode</strong></td><td>Streams data directly from S3 during training</td><td>Very large datasets — no disk bottleneck</td></tr>
<tr><td><strong>FastFile Mode</strong></td><td>Access S3 as if local file system (via FUSE)</td><td>Random access patterns</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> Khi đề hỏi "reduce training time for large dataset", đáp án thường là chuyển sang <strong>Pipe Mode</strong> với <strong>RecordIO format</strong>. Pipe Mode không download toàn bộ dataset — stream trực tiếp từ S3.</p>
</blockquote>

<h2 id="cheat-sheet"><strong>8. Cheat Sheet — Quick Reference</strong></h2>

<table>
<thead><tr><th>Keyword in Question</th><th>Algorithm</th></tr></thead>
<tbody>
<tr><td>"tabular data", "structured data"</td><td>XGBoost</td></tr>
<tr><td>"time series", "forecast"</td><td>DeepAR</td></tr>
<tr><td>"anomaly detection"</td><td>Random Cut Forest</td></tr>
<tr><td>"recommendation", "sparse features"</td><td>Factorization Machines</td></tr>
<tr><td>"text classification", "sentiment"</td><td>BlazingText (supervised)</td></tr>
<tr><td>"word embeddings"</td><td>BlazingText (Word2Vec mode)</td></tr>
<tr><td>"translation", "summarization"</td><td>Seq2Seq</td></tr>
<tr><td>"topic modeling"</td><td>LDA or NTM</td></tr>
<tr><td>"clustering", "segmentation"</td><td>K-Means</td></tr>
<tr><td>"dimensionality reduction"</td><td>PCA</td></tr>
<tr><td>"bounding boxes", "object detection"</td><td>Object Detection</td></tr>
<tr><td>"pixel-level", "segmentation mask"</td><td>Semantic Segmentation</td></tr>
<tr><td>"IP address anomaly", "fraud login"</td><td>IP Insights</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>9. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A retail company wants to forecast product demand for the next 30 days across 5,000 product categories. Which SageMaker algorithm is BEST suited?</p>
<ul>
<li>A) K-Means</li>
<li>B) Linear Learner</li>
<li>C) DeepAR ✓</li>
<li>D) Seq2Seq</li>
</ul>
<p><em>Explanation: DeepAR is specifically designed for time series forecasting across multiple related time series. It learns global patterns from all 5,000 series simultaneously, providing probabilistic forecasts. This is exactly the use case it's optimized for.</em></p>

<p><strong>Q2:</strong> An IoT system monitors server CPU usage. The team wants to detect unusual spikes automatically. Which SageMaker built-in algorithm should be used?</p>
<ul>
<li>A) XGBoost</li>
<li>B) Random Cut Forest ✓</li>
<li>C) BlazingText</li>
<li>D) PCA</li>
</ul>
<p><em>Explanation: Random Cut Forest (RCF) is SageMaker's built-in anomaly detection algorithm. It assigns an anomaly score to each data point and works well for time series anomaly detection, such as CPU usage spikes.</em></p>

<p><strong>Q3:</strong> A data scientist is training a model on a 500 GB dataset. Training is very slow because downloading data to the training instance takes too long. Which change will MOST improve performance?</p>
<ul>
<li>A) Switch from CSV to JSON format</li>
<li>B) Increase the training instance size</li>
<li>C) Switch to Pipe Mode with RecordIO-protobuf format ✓</li>
<li>D) Add more training epochs</li>
</ul>
<p><em>Explanation: Pipe Mode streams data directly from S3 during training without downloading it first, eliminating the I/O bottleneck for large datasets. Combined with RecordIO-protobuf format, it dramatically reduces startup time.</em></p>
