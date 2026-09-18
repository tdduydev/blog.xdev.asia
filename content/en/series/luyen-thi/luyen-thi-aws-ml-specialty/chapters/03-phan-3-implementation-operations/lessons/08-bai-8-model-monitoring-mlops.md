---
id: 5ffdff76-3b56-4c4f-9e66-f0aa1c6642d1
title: 'Lesson 8: Model Monitoring & MLOps'
slug: bai-8-model-monitoring-mlops
description: >-
  SageMaker Model Monitor: Data Quality, Model Quality, Bias Drift, Feature Attribution Drift.
  SageMaker Pipelines for CI/CD ML. Model Registry, Experiments.
  Ground Truth for data labeling. Autopilot for AutoML.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 8
section_title: "Part 3: ML Implementation & Operations (20%)"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS Certified Machine Learning - Specialty Exam Prep'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai8-mlops-pipeline.webp" alt="SageMaker MLOps Pipeline" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>SageMaker MLOps: Model Monitor, SageMaker Pipelines, and CI/CD for ML workflows</em></p>
</div>

<h2 id="model-monitor"><strong>1. SageMaker Model Monitor</strong></h2>

<p><strong>SageMaker Model Monitor</strong> automatically monitors deployed models to detect quality issues in production. This is one of the most important MLOps topics.</p>

<table>
<thead><tr><th>Monitor Type</th><th>What It Detects</th><th>Baseline From</th></tr></thead>
<tbody>
<tr><td><strong>Data Quality Monitor</strong></td><td>Statistical drift in input features (mean, std, completeness)</td><td>Training data statistics</td></tr>
<tr><td><strong>Model Quality Monitor</strong></td><td>Model performance degradation (accuracy, F1 drop)</td><td>Ground truth labels</td></tr>
<tr><td><strong>Bias Drift Monitor</strong></td><td>Fairness metric shifts in predictions</td><td>Clarify baseline</td></tr>
<tr><td><strong>Feature Attribution Drift</strong></td><td>SHAP value changes — features changing importance</td><td>Clarify baseline</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> Model Monitor needs a <strong>baseline</strong> to compare against. The baseline is created from training data at deployment time. Monitor runs on a schedule (hourly/daily), compares incoming data with the baseline, and alerts if drift exceeds the threshold.</p>
</blockquote>

<h3 id="drift-types"><strong>1.1. Types of Drift</strong></h3>

<pre><code class="language-text">Data Drift Types:

┌─────────────────────────────────────────────────────┐
│  Covariate Shift (Input Drift):                     │
│  Input distribution P(X) changes                   │
│  Example: model trained on summer data,             │
│  production gets winter data                        │
│                                                     │
│  Concept Drift (Label Drift):                       │
│  Relationship P(Y|X) changes                        │
│  Example: fraud patterns evolve over time          │
│                                                     │
│  Prior Probability Shift:                           │
│  P(Y) class distribution changes                    │
│  Example: seasonal products change target balance   │
└─────────────────────────────────────────────────────┘
</code></pre>

<h2 id="pipelines"><strong>2. SageMaker Pipelines — MLOps CI/CD</strong></h2>

<p><strong>SageMaker Pipelines</strong> is the MLOps workflow orchestration tool — creates reproducible, automatable ML pipelines.</p>

<pre><code class="language-text">SageMaker Pipeline Example:

  ProcessingStep ──→ TrainingStep ──→ EvaluationStep ──→ ConditionStep
       ↓                  ↓                ↓                   ↓
   Clean Data         Train Model      Compute Metrics    If accuracy > 0.85
   Feature Eng        Save Artifact    to S3              ↓           ↓
                                                     Register    Fail Pipeline
                                                      Model
</code></pre>

<table>
<thead><tr><th>Step Type</th><th>What It Does</th></tr></thead>
<tbody>
<tr><td><strong>ProcessingStep</strong></td><td>Data preprocessing via Processing Jobs</td></tr>
<tr><td><strong>TrainingStep</strong></td><td>Model training via Training Jobs</td></tr>
<tr><td><strong>EvaluationStep</strong></td><td>Model evaluation, compute metrics</td></tr>
<tr><td><strong>ConditionStep</strong></td><td>Branching logic based on metrics</td></tr>
<tr><td><strong>RegisterModelStep</strong></td><td>Register approved model to Model Registry</td></tr>
<tr><td><strong>TransformStep</strong></td><td>Batch Transform inference</td></tr>
</tbody>
</table>

<h2 id="model-registry"><strong>3. SageMaker Model Registry</strong></h2>

<p><strong>Model Registry</strong> is a centralized catalog for tracking and governing ML models throughout their lifecycle.</p>

<table>
<thead><tr><th>Feature</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>Model Groups</strong></td><td>Logical grouping of versions of the same model</td></tr>
<tr><td><strong>Approval Status</strong></td><td>PendingManualApproval → Approved → Rejected</td></tr>
<tr><td><strong>Model Lineage</strong></td><td>Track training job, data, artifacts for each version</td></tr>
<tr><td><strong>Deployment</strong></td><td>Deploy directly from Registry to endpoint</td></tr>
</tbody>
</table>

<h2 id="ground-truth"><strong>4. SageMaker Ground Truth</strong></h2>

<p><strong>Ground Truth</strong> helps create <strong>high-quality labeled training datasets</strong> combining human labelers and automated labeling.</p>

<pre><code class="language-text">Ground Truth Workflow:

Raw Data (S3) ──→ Labeling Job
                       ↓
             ┌─── Auto Labeling ───┐
             │   (ML model labels  │
             │   easy examples)    │
             │                     │
             └─── Human Labeling ──┘
                   (Mechanical Turk  
                    or private team  
                    for hard examples)
                       ↓
               Labeled Dataset (S3)
</code></pre>

<h2 id="autopilot"><strong>5. SageMaker Autopilot — AutoML</strong></h2>

<p><strong>Autopilot</strong> automatically trains and tunes ML models — full AutoML with explainability.</p>

<table>
<thead><tr><th>What Autopilot Does</th><th>Detail</th></tr></thead>
<tbody>
<tr><td>Auto feature engineering</td><td>Detects data types, handles missing values, encoding</td></tr>
<tr><td>Algorithm selection</td><td>Tries multiple algorithms (XGBoost, Deep Learning, Linear)</td></tr>
<tr><td>Hyperparameter tuning</td><td>Bayesian optimization per algorithm</td></tr>
<tr><td>Explainability</td><td>SageMaker Clarify integration — SHAP values</td></tr>
<tr><td>Leaderboard</td><td>Ranked models by target metric</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> Autopilot only supports <strong>tabular data</strong>. When the question asks "automate model building for non-technical users" → Autopilot. Different from SageMaker JumpStart (pre-built models) and Canvas (no-code for business users).</p>
</blockquote>

<h2 id="cheat-sheet"><strong>6. Cheat Sheet — MLOps Services</strong></h2>

<table>
<thead><tr><th>Scenario</th><th>Service</th></tr></thead>
<tbody>
<tr><td>Detect data drift in production</td><td>SageMaker Model Monitor (Data Quality)</td></tr>
<tr><td>Automated ML pipeline CI/CD</td><td>SageMaker Pipelines</td></tr>
<tr><td>Track and govern model versions</td><td>SageMaker Model Registry</td></tr>
<tr><td>Label training data at scale</td><td>SageMaker Ground Truth</td></tr>
<tr><td>AutoML without coding</td><td>SageMaker Autopilot</td></tr>
<tr><td>Track experiments (metrics, params)</td><td>SageMaker Experiments</td></tr>
<tr><td>Model performance drop alert</td><td>Model Monitor + CloudWatch Alarms</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A deployed fraud detection model's accuracy dropped significantly after 3 months. Investigation shows the input feature distributions have changed. What tool should be used to automatically detect this going forward?</p>
<ul>
<li>A) SageMaker Clarify</li>
<li>B) SageMaker Experiments</li>
<li>C) SageMaker Model Monitor — Data Quality Monitor ✓</li>
<li>D) SageMaker Ground Truth</li>
</ul>
<p><em>Explanation: SageMaker Model Monitor's Data Quality Monitor continuously compares incoming inference data statistics against a baseline from training data. It detects feature drift (changed distributions) and sends CloudWatch alerts when thresholds are exceeded.</em></p>

<p><strong>Q2:</strong> A team wants to create a reproducible ML pipeline that automatically retrains and deploys a model when new data arrives, with a human approval step before production deployment. Which service provides this?</p>
<ul>
<li>A) SageMaker Autopilot</li>
<li>B) SageMaker Pipelines + Model Registry ✓</li>
<li>C) AWS Step Functions only</li>
<li>D) SageMaker Ground Truth</li>
</ul>
<p><em>Explanation: SageMaker Pipelines orchestrates the ML workflow (data prep → train → evaluate → register). Model Registry provides the approval workflow (PendingManualApproval → Approved) with human gate before deployment — the combination is the standard MLOps solution on AWS.</em></p>

<p><strong>Q3:</strong> A company needs to label 100,000 images for object detection training. They want to minimize labeling cost by using ML to automatically label easy examples. Which service should they use?</p>
<ul>
<li>A) SageMaker Autopilot</li>
<li>B) Amazon Rekognition Custom Labels</li>
<li>C) SageMaker Ground Truth with auto-labeling ✓</li>
<li>D) AWS Glue DataBrew</li>
</ul>
<p><em>Explanation: SageMaker Ground Truth uses automated labeling where an ML model labels high-confidence examples automatically, and only uncertain examples are sent to human workers. This can reduce labeling costs by up to 70%.</em></p>
