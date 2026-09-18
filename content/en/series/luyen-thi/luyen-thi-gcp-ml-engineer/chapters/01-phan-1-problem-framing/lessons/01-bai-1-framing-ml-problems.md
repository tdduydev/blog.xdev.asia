---
id: 019c9619-lt03-l01
title: 'Lesson 1: Framing ML Problems — Supervised, Unsupervised, RL'
slug: bai-1-framing-ml-problems
description: >-
  How to determine if a problem needs ML. Choosing the right model type.
  Business metrics vs ML metrics. Data availability assessment.
  Google's ML best practices.
duration_minutes: 50
is_free: true
video_url: null
sort_order: 1
section_title: "Part 1: ML Problem Framing & Architecture"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer Exam Prep'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai1-problem-framing.webp" alt="ML Problem Framing Framework" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>ML Problem Framing: identifying the problem, choosing the model type, and defining metrics per Google standards</em></p>
</div>

<h2 id="when-to-use-ml"><strong>1. When to Use ML?</strong></h2>

<p>The Google ML certification often tests <strong>problem framing</strong> — determining whether a problem is suitable for ML and, if so, which type of ML to apply. This is a critical skill for a professional ML Engineer.</p>

<table>
<thead><tr><th>Question to Ask</th><th>If "Yes"</th><th>If "No"</th></tr></thead>
<tbody>
<tr><td>Are there complex patterns in the data?</td><td>ML can help</td><td>Rules-based logic is sufficient</td></tr>
<tr><td>Is there enough data (labels)?</td><td>Supervised Learning</td><td>Unsupervised or collect more data</td></tr>
<tr><td>Can the output be clearly defined?</td><td>Supervised ML</td><td>Clarify with stakeholders</td></tr>
<tr><td>Does the problem require an agent interacting with an environment?</td><td>Reinforcement Learning</td><td>Supervised/Unsupervised</td></tr>
</tbody>
</table>

<h2 id="ml-types"><strong>2. ML Types and When to Use Them</strong></h2>

<pre><code class="language-text">Problem Framing Decision Tree:

Has labeled training data?
    YES → Supervised Learning
           ├── Output is category? → Classification
           └── Output is number? → Regression

    NO → Has examples, no labels?
           YES → Unsupervised Learning
                  ├── Find groups? → Clustering
                  └── Find patterns/anomalies? → Density estimation
           NO → Agent in environment?
                  YES → Reinforcement Learning
                  NO → Reconsider problem definition
</code></pre>

<table>
<thead><tr><th>ML Type</th><th>When to Use</th><th>GCP Services</th></tr></thead>
<tbody>
<tr><td><strong>Supervised Classification</strong></td><td>Email spam, image labels, churn prediction</td><td>Vertex AI AutoML, BigQuery ML</td></tr>
<tr><td><strong>Supervised Regression</strong></td><td>Price prediction, demand forecast</td><td>Vertex AI, BigQuery ML BQML_REGRESSOR</td></tr>
<tr><td><strong>Unsupervised Clustering</strong></td><td>Customer segmentation, topic discovery</td><td>Vertex AI Custom Training (k-means)</td></tr>
<tr><td><strong>Reinforcement Learning</strong></td><td>Game agents, robotics, ad bidding</td><td>Vertex AI + custom environment</td></tr>
<tr><td><strong>Self-supervised</strong></td><td>LLMs, foundation models</td><td>Vertex AI Model Garden</td></tr>
</tbody>
</table>

<h2 id="business-vs-ml-metrics"><strong>3. Business Metrics vs. ML Metrics</strong></h2>

<p>A common mistake is <strong>optimizing the wrong metric</strong>. ML objectives must align with business goals.</p>

<table>
<thead><tr><th>Business Goal</th><th>Wrong ML Metric</th><th>Correct ML Metric</th></tr></thead>
<tbody>
<tr><td>Reduce fraud-related revenue loss</td><td>Accuracy (99%!)</td><td>Recall (catch more fraud)</td></tr>
<tr><td>Reduce spam for better user experience</td><td>Recall</td><td>Precision (fewer false positives)</td></tr>
<tr><td>Forecast inventory demand</td><td>MSE</td><td>MAPE (scale-independent)</td></tr>
<tr><td>Rank products in search results</td><td>Accuracy</td><td>NDCG, MRR (ranking metrics)</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> The Professional ML Engineer exam often asks "which metric BEST aligns with the business objective." For fraud/medical diagnosis → Recall. For spam/precision-critical → Precision. For class imbalance → F1 or AUC-ROC.</p>
</blockquote>

<h2 id="data-assessment"><strong>4. Data Availability Assessment</strong></h2>

<table>
<thead><tr><th>Data Situation</th><th>ML Approach</th></tr></thead>
<tbody>
<tr><td>Plenty of labeled data</td><td>Fully supervised, train from scratch</td></tr>
<tr><td>Little labeled data (&lt;1000)</td><td><strong>Transfer Learning</strong> (pre-trained + fine-tune)</td></tr>
<tr><td>No labels</td><td>Unsupervised or collect labels (Vertex AI Data Labeling)</td></tr>
<tr><td>Labels are expensive</td><td><strong>Active Learning</strong> — label uncertain samples first</td></tr>
<tr><td>Imbalanced data</td><td>Oversampling, undersampling, class weights</td></tr>
</tbody>
</table>

<h2 id="google-ml-practices"><strong>5. Google's ML Best Practices</strong></h2>

<ul>
<li><strong>Start simple</strong>: Begin with the simplest model, then increase complexity gradually</li>
<li><strong>Establish baseline</strong>: Compare against heuristics/rules before using ML</li>
<li><strong>Data quality first</strong>: 80% of ML project time is data preparation</li>
<li><strong>Reproducibility</strong>: Pipelines must be reproducible with the same data</li>
<li><strong>Monitor in production</strong>: Models decay over time — continuous monitoring is needed</li>
</ul>

<h2 id="practice"><strong>6. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A company wants to identify which of its customers are most likely to cancel their subscription in the next 30 days. They have 3 years of historical customer behavior data with known churn events. Which ML approach should they use?</p>
<ul>
<li>A) Unsupervised clustering to find customer groups</li>
<li>B) Reinforcement learning to optimize retention campaigns</li>
<li>C) Supervised binary classification with historical churn labels ✓</li>
<li>D) Anomaly detection to find unusual behavior</li>
</ul>
<p><em>Explanation: This is a classic supervised classification problem (churn = yes/no). Historical data with known outcomes (churned/not churned) provides the labels needed. Clustering would not predict individual churn probability. RL is for sequential decision making, not prediction.</em></p>

<p><strong>Q2:</strong> A medical imaging ML model achieves 98% accuracy on test data but the business team is unsatisfied. The task is detecting rare cancer cells (1% prevalence). What is the most likely issue?</p>
<ul>
<li>A) The model is overfitting to training data</li>
<li>B) Accuracy is the wrong metric — the model may be predicting "no cancer" for everything ✓</li>
<li>C) The model needs more training iterations</li>
<li>D) The test dataset is too small</li>
</ul>
<p><em>Explanation: With 1% prevalence, a model always predicting "no cancer" achieves 99% accuracy but has 0% recall — it misses every cancer case. For rare class problems, Recall (sensitivity) is the critical metric, not accuracy.</em></p>

<p><strong>Q3:</strong> A startup has 500 labeled product images for a new custom classification task. Which training approach is MOST appropriate?</p>
<ul>
<li>A) Train a deep learning CNN from scratch on the 500 images</li>
<li>B) Use AutoML Tabular on the image metadata</li>
<li>C) Use Transfer Learning from a pre-trained image model ✓</li>
<li>D) Apply K-Means clustering since the dataset is too small</li>
</ul>
<p><em>Explanation: With only 500 labeled examples, training from scratch would overfit severely. Transfer Learning reuses features from a model pre-trained on millions of images (e.g., ImageNet), requiring far less data to achieve good accuracy on the new task.</em></p>
