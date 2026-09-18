---
id: 53fa302d-d4b6-483f-af7d-5c9b26bbf21e
title: 'Bài 6: Model Evaluation & Validation'
slug: bai-6-model-evaluation
description: >-
  Metrics: Accuracy, Precision, Recall, F1, AUC-ROC, RMSE, MAE, R².
  Confusion Matrix. Cross-validation strategies.
  SageMaker Clarify cho bias detection & explainability.
  A/B testing với Production Variants.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 6
section_title: "Phần 2: Modeling (36%)"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'Luyện thi AWS Certified Machine Learning - Specialty'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai6-model-evaluation.webp" alt="Model Evaluation Metrics" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Model Evaluation: Classification metrics (AUC-ROC, F1), Regression metrics (RMSE, MAE), và Confusion Matrix</em></p>
</div>

<h2 id="classification-metrics"><strong>1. Classification Metrics</strong></h2>

<p>Chọn metric đúng là một trong các kỹ năng quan trọng nhất của ML Engineer. Đề thi MLS-C01 thường cho scenario và hỏi metric phù hợp.</p>

<h3 id="confusion-matrix"><strong>1.1. Confusion Matrix</strong></h3>

<pre><code class="language-text">                 Predicted
                 Positive  Negative
Actual Positive │   TP   │   FN   │  ← Recall = TP / (TP + FN)
       Negative │   FP   │   TN   │

Precision  = TP / (TP + FP)   ← of all predicted positive, how many are correct?
Recall     = TP / (TP + FN)   ← of all actual positive, how many did we catch?
F1 Score   = 2 × (P × R) / (P + R)   ← harmonic mean
Accuracy   = (TP + TN) / Total
</code></pre>

<table>
<thead><tr><th>Metric</th><th>Optimize When</th><th>Real-World Example</th></tr></thead>
<tbody>
<tr><td><strong>Precision</strong></td><td>FP cost is high — don't want false alarms</td><td>Spam filter (don't block legitimate email)</td></tr>
<tr><td><strong>Recall (Sensitivity)</strong></td><td>FN cost is high — don't miss positives</td><td>Cancer detection (find all cancer patients)</td></tr>
<tr><td><strong>F1 Score</strong></td><td>Balance Precision and Recall, imbalanced data</td><td>Fraud detection</td></tr>
<tr><td><strong>Accuracy</strong></td><td>Balanced classes only</td><td>Multi-class, balanced datasets</td></tr>
<tr><td><strong>AUC-ROC</strong></td><td>Ranking quality, threshold-independent</td><td>Credit scoring, ad ranking</td></tr>
<tr><td><strong>PR-AUC</strong></td><td>Imbalanced, care about minority class</td><td>Fraud, medical diagnoses</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> Kịch bản hay gặp — "Medical diagnosis, missing cancer is worse than false positive" → optimize <strong>Recall</strong>. "Spam detector, blocking good emails is bad" → optimize <strong>Precision</strong>. Imbalanced data → dùng <strong>F1 hoặc AUC-ROC</strong>, không dùng Accuracy.</p>
</blockquote>

<h2 id="regression-metrics"><strong>2. Regression Metrics</strong></h2>

<table>
<thead><tr><th>Metric</th><th>Formula</th><th>Sensitivity to Outliers</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>RMSE</strong></td><td>√(mean(errors²))</td><td>High — penalizes large errors</td><td>When large errors are unacceptable (price prediction)</td></tr>
<tr><td><strong>MAE</strong></td><td>mean(|errors|)</td><td>Low — equal weight all errors</td><td>Robust for outliers, demand forecasting</td></tr>
<tr><td><strong>R² (R-squared)</strong></td><td>1 - SS_res/SS_tot</td><td>Medium</td><td>Proportion of variance explained (0–1)</td></tr>
<tr><td><strong>MAPE</strong></td><td>mean(|error/actual|×100)</td><td>High when actuals near 0</td><td>Percentage error, easy business interpretation</td></tr>
</tbody>
</table>

<h2 id="cross-validation"><strong>3. Cross-Validation</strong></h2>

<table>
<thead><tr><th>Strategy</th><th>How It Works</th><th>Best For</th></tr></thead>
<tbody>
<tr><td><strong>Hold-out Split</strong></td><td>Train/Val/Test split (e.g., 70/15/15)</td><td>Large datasets, fast evaluation</td></tr>
<tr><td><strong>K-Fold CV</strong></td><td>K subsets, train on K-1, evaluate on 1, repeat K times</td><td>Medium datasets, robust estimate</td></tr>
<tr><td><strong>Stratified K-Fold</strong></td><td>Same as K-Fold but maintains class proportions each fold</td><td>Imbalanced classification</td></tr>
<tr><td><strong>Leave-One-Out (LOOCV)</strong></td><td>N-fold (each sample is test once)</td><td>Very small datasets</td></tr>
<tr><td><strong>Time-Series Split</strong></td><td>Training window grows forward — no future data in training</td><td>Time series data</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> Time series data PHẢI dùng <strong>time-based splits</strong>, không được shuffle rồi dùng K-Fold thông thường — sẽ leak future data vào training.</p>
</blockquote>

<h2 id="clarify"><strong>4. SageMaker Clarify — Bias & Explainability</strong></h2>

<p><strong>SageMaker Clarify</strong> phát hiện bias trong data/model và cung cấp model explainability sử dụng <strong>SHAP values</strong>.</p>

<table>
<thead><tr><th>Feature</th><th>What It Does</th><th>Output</th></tr></thead>
<tbody>
<tr><td><strong>Pre-training bias detection</strong></td><td>Analyzes raw data before training</td><td>Bias metrics: CI, DPL, KL, JS</td></tr>
<tr><td><strong>Post-training bias detection</strong></td><td>Evaluates model predictions for bias</td><td>Metrics: DPPL, DI, DCO, RD</td></tr>
<tr><td><strong>Model Explainability</strong></td><td>SHAP values cho feature importance</td><td>Feature weight contribution per prediction</td></tr>
</tbody>
</table>

<pre><code class="language-text">SHAP Explainability Example (Loan Approval):

Feature            SHAP Value  Contribution
─────────────────────────────────────────────
credit_score       +0.42       ↑ approval
income             +0.28       ↑ approval
debt_ratio         -0.35       ↓ approval
employment_years   +0.15       ↑ approval
age                -0.02       minimal impact
</code></pre>

<h2 id="production-variants"><strong>5. A/B Testing với Production Variants</strong></h2>

<p>SageMaker Endpoints hỗ trợ <strong>Production Variants</strong> — chạy nhiều models versions cùng lúc với traffic splitting.</p>

<pre><code class="language-text">Endpoint with A/B Testing:

          ┌──────────────────────────────┐
 Request ─→  SageMaker Endpoint         │
          │                              │
          │  Variant A (v1): 80% traffic │──→ Model v1 (current)
          │  Variant B (v2): 20% traffic │──→ Model v2 (candidate)
          └──────────────────────────────┘
                        ↓
                 Compare metrics, shift traffic gradually
</code></pre>

<h2 id="cheat-sheet"><strong>6. Cheat Sheet — Evaluation Metrics</strong></h2>

<table>
<thead><tr><th>Scenario</th><th>Best Metric</th></tr></thead>
<tbody>
<tr><td>Medical diagnosis (FN is critical)</td><td>Recall (Sensitivity)</td></tr>
<tr><td>Spam filter (FP is critical)</td><td>Precision</td></tr>
<tr><td>Imbalanced fraud detection</td><td>F1 Score, AUC-ROC</td></tr>
<tr><td>House price prediction (outliers matter)</td><td>RMSE</td></tr>
<tr><td>Demand forecasting (robust)</td><td>MAE</td></tr>
<tr><td>Explain individual prediction</td><td>SHAP (via SageMaker Clarify)</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A hospital wants to build a model to detect early-stage cancer. Missing an actual cancer case is more dangerous than a false positive. Which metric should be OPTIMIZED?</p>
<ul>
<li>A) Precision</li>
<li>B) Recall ✓</li>
<li>C) Accuracy</li>
<li>D) RMSE</li>
</ul>
<p><em>Explanation: Recall = TP / (TP + FN). Optimizing Recall minimizes False Negatives (missed cancer cases), which is the critical concern here. Precision optimizes against False Positives, Accuracy is misleading for imbalanced medical data, and RMSE is for regression.</em></p>

<p><strong>Q2:</strong> A company wants to gradually test a new model version in production while keeping the existing model as fallback. Which SageMaker feature provides this capability?</p>
<ul>
<li>A) SageMaker Experiments</li>
<li>B) SageMaker Pipelines</li>
<li>C) Production Variants on SageMaker Endpoints ✓</li>
<li>D) SageMaker Model Monitor</li>
</ul>
<p><em>Explanation: SageMaker Endpoints support Production Variants, allowing multiple model versions to run simultaneously with configurable traffic weights. This enables A/B testing and canary deployments without downtime.</em></p>

<p><strong>Q3:</strong> A model for predicting house prices has RMSE=50,000 and MAE=20,000. This indicates the presence of what?</p>
<ul>
<li>A) High bias</li>
<li>B) Data leakage</li>
<li>C) Outliers driving up RMSE ✓</li>
<li>D) Underfitting</li>
</ul>
<p><em>Explanation: When RMSE is significantly higher than MAE, it indicates outliers — since RMSE squares errors, it penalizes large errors much more than MAE. The gap (50k vs 20k) suggests some predictions have very large errors (outliers in target variable).</em></p>
