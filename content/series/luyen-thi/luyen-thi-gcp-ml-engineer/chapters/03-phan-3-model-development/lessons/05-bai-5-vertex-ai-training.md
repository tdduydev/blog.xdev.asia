---
id: 019c9619-lt03-l05
title: 'Bài 5: Vertex AI Training — Custom & AutoML'
slug: bai-5-vertex-ai-training
description: >-
  Custom Training Jobs: pre-built containers, custom containers.
  Distributed training trên GPU/TPU. AutoML: Tabular, Image, Text, Video.
  Training pipeline setup. Hyperparameter tuning service.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 5
section_title: "Phần 3: Model Development trên Vertex AI"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Luyện thi Google Cloud Professional Machine Learning Engineer'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai5-vertex-training.webp" alt="Vertex AI Custom Training" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Vertex AI Custom Training: Training Jobs, AutoML, phân tán distributed training và tối ưu</em></p>
</div>

<h2 id="custom-training"><strong>1. Vertex AI Custom Training</strong></h2>

<p>Custom Training cho phép bạn chạy training code của mình trên Google Cloud infrastructure. Có 2 cách đóng gói code:</p>

<table>
<thead><tr><th>Method</th><th>Description</th><th>When to Use</th></tr></thead>
<tbody>
<tr><td><strong>Pre-built containers</strong></td><td>GCP-provided containers: TF, PyTorch, Scikit-learn, XGBoost</td><td>Standard ML frameworks, fast setup</td></tr>
<tr><td><strong>Custom containers</strong></td><td>Build your own Docker image</td><td>Custom dependencies, special environments</td></tr>
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

<h2 id="compute-options"><strong>2. Compute Options</strong></h2>

<table>
<thead><tr><th>Hardware</th><th>Best For</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>CPU</strong></td><td>Scikit-learn, small tabular</td><td>Cheapest, no GPU parallelism</td></tr>
<tr><td><strong>GPU (T4, A100, V100)</strong></td><td>Deep learning, NLP, CV</td><td>10-100x faster than CPU for DL</td></tr>
<tr><td><strong>TPU v3, v4</strong></td><td>TensorFlow large-scale training</td><td>Google-specific; very fast for TF/JAX</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> TPU is Google-specific hardware optimized for TensorFlow and JAX. GPUs work with all frameworks. TPUs are most cost-effective for very large TF models; GPUs are more versatile. Exam may ask "most cost-effective for TensorFlow large-scale" → TPU.</p>
</blockquote>

<h2 id="distributed-training"><strong>3. Distributed Training on Vertex AI</strong></h2>

<table>
<thead><tr><th>Strategy</th><th>Description</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>Data Parallelism</strong></td><td>Split data across workers, same model</td><td>Most DL training scenarios</td></tr>
<tr><td><strong>Model Parallelism</strong></td><td>Split model layers across workers</td><td>Model too large for one GPU</td></tr>
<tr><td><strong>MirroredStrategy (TF)</strong></td><td>Multi-GPU, single machine</td><td>Single node, multiple GPUs</td></tr>
<tr><td><strong>MultiWorkerMirroredStrategy</strong></td><td>Multi-GPU, multi-machine</td><td>Cluster training</td></tr>
<tr><td><strong>ParameterServerStrategy</strong></td><td>Async updates via parameter server</td><td>Very large models (legacy)</td></tr>
</tbody>
</table>

<h2 id="automl"><strong>4. Vertex AI AutoML</strong></h2>

<table>
<thead><tr><th>AutoML Type</th><th>Input Data</th><th>Supported Tasks</th></tr></thead>
<tbody>
<tr><td><strong>AutoML Tabular</strong></td><td>CSV, BigQuery table</td><td>Classification, Regression, Forecasting</td></tr>
<tr><td><strong>AutoML Image</strong></td><td>JPEG, PNG, BMP</td><td>Classification (single/multi), Object Detection, Segmentation</td></tr>
<tr><td><strong>AutoML Text</strong></td><td>Text documents</td><td>Classification, Entity Extraction, Sentiment</td></tr>
<tr><td><strong>AutoML Video</strong></td><td>MP4, AVI, MOV</td><td>Classification, Object Detection, Action Recognition</td></tr>
</tbody>
</table>

<h2 id="hyperparameter-tuning"><strong>5. Vertex AI Hyperparameter Tuning</strong></h2>

<p>Vertex AI Hyperparameter Tuning tự động tìm hyperparameter combinations tốt nhất.</p>

<table>
<thead><tr><th>Search Algorithm</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Grid Search</strong></td><td>Exhaustive, expensive; small search space</td></tr>
<tr><td><strong>Random Search</strong></td><td>Random sampling; often better than grid</td></tr>
<tr><td><strong>Bayesian Optimization</strong></td><td>Smart search using Gaussian Process; most efficient</td></tr>
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

<h2 id="practice"><strong>6. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A team wants to train a custom TensorFlow model across multiple machines with 8 GPUs each. They want gradients synchronized across all workers without a parameter server. Which TensorFlow distribution strategy should they use?</p>
<ul>
<li>A) MirroredStrategy</li>
<li>B) MultiWorkerMirroredStrategy ✓</li>
<li>C) ParameterServerStrategy</li>
<li>D) TPUStrategy</li>
</ul>
<p><em>Explanation: MultiWorkerMirroredStrategy enables synchronous data-parallel training across multiple machines, each with multiple GPUs. MirroredStrategy is single-machine multi-GPU only. ParameterServerStrategy uses asynchronous updates. TPUStrategy is for TPU pods.</em></p>

<p><strong>Q2:</strong> A company needs to train an image classification model but their team has no deep learning expertise. They have 5,000 labeled product images. Which Vertex AI option requires the LEAST ML expertise?</p>
<ul>
<li>A) Vertex AI Custom Training with TensorFlow CNN</li>
<li>B) Vertex AI AutoML Image Classification ✓</li>
<li>C) Dataproc Spark ML</li>
<li>D) BigQuery ML</li>
</ul>
<p><em>Explanation: AutoML Image Classification handles architecture selection, hyperparameter tuning, and training automatically. A team just needs to upload labeled images and specify the task. No code or deep learning expertise is required.</em></p>

<p><strong>Q3:</strong> Which hyperparameter search strategy is MOST efficient when evaluating expensive-to-train deep learning models with a large search space?</p>
<ul>
<li>A) Grid Search — tests all combinations</li>
<li>B) Random Search — samples uniformly</li>
<li>C) Bayesian Optimization — uses past trial results to guide search ✓</li>
<li>D) Manual tuning — expert selects parameters</li>
</ul>
<p><em>Explanation: Bayesian Optimization builds a probabilistic model of the objective function using Gaussian Processes to intelligently select the next hyperparameter configuration to evaluate, based on past trial results. It finds good configurations with far fewer trials than grid or random search.</em></p>
