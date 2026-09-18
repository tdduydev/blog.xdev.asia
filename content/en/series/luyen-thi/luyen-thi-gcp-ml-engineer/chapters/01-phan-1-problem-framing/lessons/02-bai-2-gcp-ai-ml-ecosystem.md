---
id: 019c9619-lt03-l02
title: 'Lesson 2: GCP AI/ML Ecosystem Overview'
slug: bai-2-gcp-ai-ml-ecosystem
description: >-
  Vertex AI platform overview. AutoML vs Custom Training.
  BigQuery ML. Pre-trained APIs (Vision, NLP, Translation).
  When to use which service — decision tree.
duration_minutes: 50
is_free: true
video_url: null
sort_order: 2
section_title: "Part 1: ML Problem Framing & Architecture"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer Exam Prep'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai2-gcp-ecosystem.webp" alt="GCP AI/ML Ecosystem" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>GCP AI/ML Ecosystem: Vertex AI, AutoML, BigQuery ML, Pre-trained APIs and when to use each</em></p>
</div>

<h2 id="gcp-ml-landscape"><strong>1. GCP ML Landscape Overview</strong></h2>

<pre><code class="language-text">GCP ML Capability Spectrum:

LOW CODE ◄────────────────────────────────────► HIGH CONTROL
  │                        │                           │
  ▼                        ▼                           ▼
Pre-trained APIs      Vertex AI AutoML        Custom Training
(Vision, NLP,         (no code needed,        (full control,
Translation)          you bring data)         you bring code)
  │                        │                           │
No ML expertise       Some domain              ML expertise
needed                expertise               required

BigQuery ML ────── SQL interface for ML on warehouse data
</code></pre>

<h2 id="vertex-ai"><strong>2. Vertex AI — Unified ML Platform</strong></h2>

<p>Vertex AI is GCP's unified platform for the entire ML lifecycle. Understanding its components is essential for the exam.</p>

<table>
<thead><tr><th>Component</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td><strong>Vertex AI Workbench</strong></td><td>Managed Jupyter notebooks for data scientists</td></tr>
<tr><td><strong>Vertex AI Training</strong></td><td>Custom training jobs (CPUs, GPUs, TPUs)</td></tr>
<tr><td><strong>Vertex AI AutoML</strong></td><td>No-code model training (Tabular, Image, Text, Video)</td></tr>
<tr><td><strong>Vertex AI Endpoints</strong></td><td>Deploy models for online prediction</td></tr>
<tr><td><strong>Vertex AI Batch Prediction</strong></td><td>Asynchronous batch scoring</td></tr>
<tr><td><strong>Vertex AI Feature Store</strong></td><td>Serve features consistently across training/serving</td></tr>
<tr><td><strong>Vertex AI Pipelines</strong></td><td>Kubeflow Pipelines-based ML workflow orchestration</td></tr>
<tr><td><strong>Vertex AI Experiments</strong></td><td>Track runs, compare metrics</td></tr>
<tr><td><strong>Vertex AI Model Registry</strong></td><td>Version control for models</td></tr>
<tr><td><strong>Vertex AI Model Monitoring</strong></td><td>Detect feature skew and prediction drift</td></tr>
</tbody>
</table>

<h2 id="automl-vs-custom"><strong>3. AutoML vs. Custom Training</strong></h2>

<table>
<thead><tr><th>Criteria</th><th>AutoML</th><th>Custom Training</th></tr></thead>
<tbody>
<tr><td>ML expertise needed</td><td>Minimal</td><td>Required</td></tr>
<tr><td>Training time</td><td>Hours (automated)</td><td>Variable (you control)</td></tr>
<tr><td>Model interpretability</td><td>Limited</td><td>Full control</td></tr>
<tr><td>Cost</td><td>Higher per model</td><td>Pay per compute used</td></tr>
<tr><td>Best for</td><td>Quick prototypes, standard tasks</td><td>Custom architectures, research</td></tr>
<tr><td>Supported data types</td><td>Tabular, Image, Text, Video</td><td>Any (you write the code)</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> Questions with "team doesn't have ML expertise" or "fastest time to deployment" → AutoML. Questions with "custom neural architecture" or "full control over training loop" → Custom Training.</p>
</blockquote>

<h2 id="bigquery-ml"><strong>4. BigQuery ML</strong></h2>

<p>BigQuery ML lets you train and serve ML models using SQL — no need to export data from BigQuery.</p>

<table>
<thead><tr><th>Model Type</th><th>SQL Keyword</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td>Linear Regression</td><td>LINEAR_REG</td><td>Price prediction</td></tr>
<tr><td>Logistic Regression</td><td>LOGISTIC_REG</td><td>Classification</td></tr>
<tr><td>K-Means Clustering</td><td>KMEANS</td><td>Customer segmentation</td></tr>
<tr><td>XGBoost</td><td>BOOSTED_TREE_CLASSIFIER/REGRESSOR</td><td>Tabular classification/regression</td></tr>
<tr><td>Deep Neural Network</td><td>DNN_CLASSIFIER/DNN_REGRESSOR</td><td>Complex patterns</td></tr>
<tr><td>Matrix Factorization</td><td>MATRIX_FACTORIZATION</td><td>Recommendations</td></tr>
<tr><td>Imported TF models</td><td>TENSORFLOW</td><td>Custom TF models</td></tr>
</tbody>
</table>

<h2 id="pre-trained-apis"><strong>5. Pre-trained AI APIs</strong></h2>

<table>
<thead><tr><th>API</th><th>Capabilities</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>Cloud Vision API</strong></td><td>Labels, OCR, faces, logos, safe search</td><td>Image analysis without training</td></tr>
<tr><td><strong>Cloud Natural Language API</strong></td><td>Entities, sentiment, syntax, categories</td><td>Text analytics</td></tr>
<tr><td><strong>Cloud Translation API</strong></td><td>100+ language pairs</td><td>Multi-language content</td></tr>
<tr><td><strong>Cloud Speech-to-Text</strong></td><td>Transcription, speaker diarization</td><td>Audio processing</td></tr>
<tr><td><strong>Cloud Text-to-Speech</strong></td><td>WaveNet voices, SSML</td><td>Voice UI, accessibility</td></tr>
<tr><td><strong>Document AI</strong></td><td>Form parsing, invoice extraction</td><td>Document automation</td></tr>
<tr><td><strong>Recommendations AI</strong></td><td>Real-time product recommendations</td><td>E-commerce personalization</td></tr>
</tbody>
</table>

<h2 id="decision-tree"><strong>6. Service Selection Decision Tree</strong></h2>

<pre><code class="language-text">WHICH GCP ML SERVICE?

Do you have LABELED DATA?
│
├── NO → Pre-trained API sufficient for your task (Vision, NLP)?
│         YES → Use Pre-trained API
│         NO  → Vertex AI Custom Training (unsupervised)
│
└── YES → Is your data already IN BigQuery?
          │
          ├── YES → BigQuery ML (SQL-based, fast, no export)
          │
          └── NO → Need rapid prototyping, no ML team?
                    │
                    ├── YES → Vertex AI AutoML
                    │
                    └── NO  → Vertex AI Custom Training
</code></pre>

<h2 id="practice"><strong>7. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A data analytics team has petabytes of customer transaction data in BigQuery. They want to build a churn prediction model using their existing SQL skills without data exports. Which approach is BEST?</p>
<ul>
<li>A) Export to Cloud Storage, then use Vertex AI Custom Training</li>
<li>B) Use Cloud Natural Language API</li>
<li>C) Use BigQuery ML with CREATE MODEL LOGISTIC_REGRESSION ✓</li>
<li>D) Use Vertex AI AutoML Tabular</li>
</ul>
<p><em>Explanation: BigQuery ML allows training classification models directly on BigQuery data using SQL, leveraging existing data infrastructure and skills without exporting data. This is the fastest path when data is already in BigQuery.</em></p>

<p><strong>Q2:</strong> A small startup needs to add sentiment analysis to customer reviews. They have no ML team and no labeled sentiment data. Which solution requires the LEAST effort?</p>
<ul>
<li>A) Vertex AI AutoML Text Sentiment</li>
<li>B) Train a custom BERT model on Vertex AI</li>
<li>C) Cloud Natural Language API sentiment analysis ✓</li>
<li>D) BigQuery ML DNN classifier</li>
</ul>
<p><em>Explanation: Cloud Natural Language API is a pre-trained, fully managed service that requires no training data, no ML expertise, and no infrastructure setup. Just call the API. AutoML requires labeled sentiment examples; custom BERT requires significantly more expertise.</em></p>

<p><strong>Q3:</strong> Which Vertex AI component should a team use to ensure that feature values used during model training are identical to those served at prediction time?</p>
<ul>
<li>A) Vertex AI Experiments</li>
<li>B) Vertex AI Feature Store ✓</li>
<li>C) Vertex AI Model Registry</li>
<li>D) Vertex AI Pipelines</li>
</ul>
<p><em>Explanation: Vertex AI Feature Store provides a centralized repository for storing, serving, and sharing ML features. It ensures training-serving consistency by using the same feature definitions and values for both training and online/batch prediction, preventing training-serving skew.</em></p>
