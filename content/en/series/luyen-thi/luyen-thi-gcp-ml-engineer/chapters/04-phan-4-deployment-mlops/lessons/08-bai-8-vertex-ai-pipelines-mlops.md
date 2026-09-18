---
id: 019c9619-lt03-l08
title: 'Lesson 8: Vertex AI Pipelines & MLOps'
slug: bai-8-vertex-ai-pipelines-mlops
description: >-
  Vertex AI Pipelines (Kubeflow Pipelines SDK).
  Model Registry, Experiments, Metadata Store.
  Vertex AI Model Monitoring: skew, drift detection.
  CI/CD for ML: Cloud Build + Vertex AI.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 8
section_title: "Part 4: Model Deployment & MLOps"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer Exam Prep'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai8-mlops-cicd.webp" alt="Vertex AI Pipelines & MLOps" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Vertex AI MLOps: Pipelines, CI/CD, Model Registry, and monitoring for production ML</em></p>
</div>

<h2 id="mlops-maturity"><strong>1. MLOps Maturity Levels</strong></h2>

<table>
<thead><tr><th>Level</th><th>Description</th><th>Automation</th></tr></thead>
<tbody>
<tr><td><strong>Level 0</strong></td><td>Manual process, scripts only</td><td>None</td></tr>
<tr><td><strong>Level 1</strong></td><td>ML pipeline automation, continuous training</td><td>Training pipeline</td></tr>
<tr><td><strong>Level 2</strong></td><td>Full CI/CD for ML, automated retraining triggers</td><td>Everything</td></tr>
</tbody>
</table>

<h2 id="vertex-pipelines"><strong>2. Vertex AI Pipelines</strong></h2>

<p>Vertex AI Pipelines is a managed execution environment for <strong>Kubeflow Pipelines (KFP)</strong>. Pipelines are defined using the Python SDK and compiled to YAML.</p>

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
<thead><tr><th>Pipeline SDK</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>Kubeflow Pipelines SDK v2</strong></td><td>Primary SDK for Vertex AI Pipelines</td></tr>
<tr><td><strong>TFX</strong></td><td>TensorFlow-specific pipeline components</td></tr>
<tr><td><strong>Google Cloud Pipeline Components</strong></td><td>Pre-built components for Vertex AI services</td></tr>
</tbody>
</table>

<h2 id="model-monitoring"><strong>3. Vertex AI Model Monitoring</strong></h2>

<table>
<thead><tr><th>Monitoring Type</th><th>What It Detects</th></tr></thead>
<tbody>
<tr><td><strong>Feature Skew Monitoring</strong></td><td>Serving feature distribution ≠ training baseline</td></tr>
<tr><td><strong>Feature Drift Monitoring</strong></td><td>Serving feature distribution changes over time</td></tr>
<tr><td><strong>Prediction Drift</strong></td><td>Model output distribution changes (indirect label drift)</td></tr>
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

<h2 id="experiments-metadata"><strong>4. Vertex AI Experiments & Metadata</strong></h2>

<table>
<thead><tr><th>Component</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td><strong>Vertex AI Experiments</strong></td><td>Track hyperparameters, metrics, artifacts across runs</td></tr>
<tr><td><strong>ML Metadata Store</strong></td><td>Track lineage: data → model → endpoint</td></tr>
<tr><td><strong>Vertex AI TensorBoard</strong></td><td>Visualize training metrics (loss, accuracy curves)</td></tr>
</tbody>
</table>

<h2 id="cicd-ml"><strong>5. CI/CD for ML on GCP</strong></h2>

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
<p><strong>Exam tip:</strong> CI/CD for ML = Cloud Build (code testing + Docker build) + Vertex AI Pipelines (training + deployment orchestration). Cloud Source Repositories is GCP's Git hosting. Artifact Registry replaces Container Registry for storing Docker images.</p>
</blockquote>

<h2 id="practice"><strong>6. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A production ML model's prediction distribution has shifted significantly over 3 weeks, but ground truth labels are not yet available to measure accuracy directly. Which Vertex AI monitoring type detects this?</p>
<ul>
<li>A) Feature Skew Monitoring</li>
<li>B) Prediction Drift Monitoring ✓</li>
<li>C) Training data validation</li>
<li>D) Vertex AI Experiments baseline comparison</li>
</ul>
<p><em>Explanation: Prediction Drift Monitoring tracks how the model's output distribution changes over time, serving as an indirect signal of model degradation even when ground truth labels are unavailable. Feature Skew compares serving vs training feature distributions (requires known training baseline).</em></p>

<p><strong>Q2:</strong> A team is building a Vertex AI Pipeline that includes data preprocessing, model training, and deployment. They need to track all inputs, outputs, and model artifacts for auditability and reproducibility. Which service stores this lineage information?</p>
<ul>
<li>A) Cloud Logging</li>
<li>B) Vertex AI ML Metadata Store ✓</li>
<li>C) Cloud Storage versioning</li>
<li>D) Vertex AI Experiments dashboard</li>
</ul>
<p><em>Explanation: Vertex AI ML Metadata Store (also called Vertex ML Metadata) automatically tracks lineage: which datasets produced which models, which models were deployed to which endpoints, including hyperparameters and evaluation metrics — enabling full provenance tracking.</em></p>

<p><strong>Q3:</strong> A company wants to automatically retrain their ML model whenever new training data is available in Cloud Storage. The retraining should run a Vertex AI Pipeline and deploy if metrics pass thresholds. Which GCP service should trigger the pipeline?</p>
<ul>
<li>A) Vertex AI Schedules</li>
<li>B) Cloud Storage notifications + Cloud Functions/Eventarc → Vertex AI Pipelines ✓</li>
<li>C) BigQuery scheduled queries</li>
<li>D) Cloud Scheduler alone</li>
</ul>
<p><em>Explanation: Cloud Storage object finalize notifications can trigger Cloud Functions or Eventarc, which then programmatically start a Vertex AI Pipeline run. This creates event-driven continuous training (MLOps Level 1). Cloud Scheduler triggers on time, not on data availability.</em></p>
