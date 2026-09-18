---
id: 8a7a5367-e4a4-4796-8aab-68326c1dc574
title: 'Lesson 5: Training & Hyperparameter Tuning'
slug: bai-5-training-hyperparameter-tuning
description: >-
  SageMaker Training Jobs: instance types, Pipe Mode vs File Mode.
  Distributed training: data parallelism vs model parallelism.
  Automatic Model Tuning (HPO): Bayesian vs Random vs Grid search.
  Spot Instance Training to reduce costs.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 5
section_title: "Part 2: Modeling (36%)"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS Certified Machine Learning - Specialty Exam Prep'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai5-training-hpo.webp" alt="SageMaker Training & Hyperparameter Tuning" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>SageMaker Training Jobs & Hyperparameter Tuning: distributed training, Spot Instances, and HPO strategies</em></p>
</div>

<h2 id="training-jobs"><strong>1. SageMaker Training Jobs</strong></h2>

<p><strong>SageMaker Training Jobs</strong> run ML training code on managed compute infrastructure. Training runs on ephemeral instances — you only pay while they're running.</p>

<pre><code class="language-text">Training Job Lifecycle:

  Submit Job ──→ Provision Instances ──→ Download Data
                                              ↓
                                       Run Training Code
                                              ↓
                                       Save Model to S3
                                              ↓
                                       Terminate Instances  
</code></pre>

<h2 id="instance-types"><strong>2. Instance Types for Training</strong></h2>

<table>
<thead><tr><th>Instance Family</th><th>Hardware</th><th>Best For</th></tr></thead>
<tbody>
<tr><td><strong>ml.c5</strong></td><td>CPU optimized</td><td>Tabular ML, XGBoost, sklearn</td></tr>
<tr><td><strong>ml.m5</strong></td><td>General purpose CPU</td><td>Light training, data processing</td></tr>
<tr><td><strong>ml.p3</strong></td><td>V100 GPU</td><td>Deep learning training</td></tr>
<tr><td><strong>ml.p4d</strong></td><td>A100 GPU (8x)</td><td>Large-scale DL, distributed training</td></tr>
<tr><td><strong>ml.g4dn</strong></td><td>T4 GPU (cost-effective)</td><td>Small-medium DL models</td></tr>
<tr><td><strong>ml.trn1</strong></td><td>AWS Trainium</td><td>LLM training, cost optimization</td></tr>
</tbody>
</table>

<h2 id="distributed-training"><strong>3. Distributed Training</strong></h2>

<p>When the model or dataset is too large for a single instance, <strong>distributed training</strong> across multiple instances is needed.</p>

<table>
<thead><tr><th>Strategy</th><th>How It Works</th><th>When to Use</th></tr></thead>
<tbody>
<tr><td><strong>Data Parallelism</strong></td><td>Each instance has a copy of the model, trains on a subset of data, syncs gradients</td><td>Dataset too large, model fits in one GPU</td></tr>
<tr><td><strong>Model Parallelism</strong></td><td>Model split across instances, each holds a portion</td><td>Model too large for a single GPU (LLMs)</td></tr>
</tbody>
</table>

<pre><code class="language-text">Data Parallelism:

Instance 1 [Full Model] ──→ Train on data shard A ──→ ↓
Instance 2 [Full Model] ──→ Train on data shard B ──→ ↓  AllReduce
Instance 3 [Full Model] ──→ Train on data shard C ──→ ↓  (sync gradients)
                                                          ↓
                                              Updated Model Weights

Model Parallelism:

Instance 1 [Layers 1-4]  ──→ forward pass ──→
Instance 2 [Layers 5-8]  ──→ forward pass ──→
Instance 3 [Layers 9-12] ──→ forward pass ──→ output
</code></pre>

<blockquote>
<p><strong>Exam tip:</strong> SageMaker provides the <strong>SageMaker Distributed</strong> library with 2 modules: (1) <code>smdistributed.dataparallel</code> — optimized AllReduce; (2) <code>smdistributed.modelparallel</code> — auto pipeline parallelism. When the question asks "large model training" → model parallelism.</p>
</blockquote>

<h2 id="hpo"><strong>4. Automatic Model Tuning (HPO)</strong></h2>

<p><strong>Hyperparameter Optimization (HPO)</strong> automatically finds the best hyperparameters by running multiple training jobs with different configurations.</p>

<table>
<thead><tr><th>Strategy</th><th>How It Works</th><th>Tradeoff</th></tr></thead>
<tbody>
<tr><td><strong>Random Search</strong></td><td>Randomly sample hyperparameters from range</td><td>Fast, good baseline</td></tr>
<tr><td><strong>Grid Search</strong></td><td>Try all combinations</td><td>Exhaustive, expensive, bad for large spaces</td></tr>
<tr><td><strong>Bayesian Optimization</strong></td><td>Probabilistic model of outcome, suggests best next config</td><td>Efficient, learns from previous trials — SageMaker default</td></tr>
<tr><td><strong>Hyperband</strong></td><td>Early-stop poorly performing trials</td><td>Resource-efficient, fast</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> SageMaker AMT (Automatic Model Tuning) uses <strong>Bayesian Optimization</strong> by default. It EXAMINES RESULTS from previous jobs to suggest the next hyperparameter set — intelligent search, not brute force.</p>
</blockquote>

<h2 id="spot-training"><strong>5. Spot Instance Training</strong></h2>

<p>SageMaker supports using <strong>EC2 Spot Instances</strong> for training jobs, saving up to <strong>90% in cost</strong> compared to On-Demand.</p>

<table>
<thead><tr><th>Feature</th><th>Detail</th></tr></thead>
<tbody>
<tr><td><strong>MaxWaitTimeInSeconds</strong></td><td>Maximum time to wait for spot capacity</td></tr>
<tr><td><strong>Checkpointing</strong></td><td>Saves model to S3 periodically — resume after interruption</td></tr>
<tr><td><strong>use_spot_instances=True</strong></td><td>Parameter in SageMaker Estimator</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> When the question asks "reduce training costs", the answer is usually <strong>Spot Instances with checkpointing</strong>. Checkpointing is essential to avoid losing progress when spot instances are terminated.</p>
</blockquote>

<h2 id="bias-variance"><strong>6. Bias-Variance Tradeoff</strong></h2>

<table>
<thead><tr><th>Issue</th><th>Symptom</th><th>Cause</th><th>Solution</th></tr></thead>
<tbody>
<tr><td><strong>High Bias (Underfitting)</strong></td><td>High train error, high test error</td><td>Model too simple</td><td>Increase model complexity, add features, reduce regularization</td></tr>
<tr><td><strong>High Variance (Overfitting)</strong></td><td>Low train error, high test error</td><td>Model too complex</td><td>Add more data, dropout, regularization, feature selection</td></tr>
<tr><td><strong>Balanced</strong></td><td>Low train error, low test error (close to each other)</td><td>Good fit</td><td>Deploy model</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A company is training a large deep learning model that doesn't fit on a single GPU instance. Which SageMaker distributed training strategy should they use?</p>
<ul>
<li>A) Data parallelism</li>
<li>B) Model parallelism ✓</li>
<li>C) Pipeline parallelism only</li>
<li>D) Increase batch size</li>
</ul>
<p><em>Explanation: Model parallelism splits the model itself across multiple GPU instances, allowing training of models too large to fit in a single GPU's memory. Data parallelism keeps a full model copy on each instance, which doesn't help when the model itself is too large.</em></p>

<p><strong>Q2:</strong> A team wants to minimize the cost of running 500 hyperparameter tuning jobs. Training can tolerate interruptions. What is the MOST cost-effective approach?</p>
<ul>
<li>A) Use larger instances to run jobs faster</li>
<li>B) Use Spot Instances with checkpointing enabled ✓</li>
<li>C) Use Grid Search instead of Bayesian Optimization</li>
<li>D) Reduce the number of epochs</li>
</ul>
<p><em>Explanation: Spot Instances can save up to 90% compared to On-Demand pricing. With checkpointing enabled, interrupted jobs save their state to S3 and can resume, making Spot Instances practical for long HPO jobs.</em></p>

<p><strong>Q3:</strong> A model achieves 95% accuracy on training data but only 62% on the test set. What problem does this indicate?</p>
<ul>
<li>A) Underfitting / High bias</li>
<li>B) Overfitting / High variance ✓</li>
<li>C) Data leakage</li>
<li>D) Class imbalance</li>
</ul>
<p><em>Explanation: The large gap between training accuracy (95%) and test accuracy (62%) is a classic sign of overfitting (high variance). The model memorized the training data but fails to generalize. Solutions: more data, regularization (L1/L2, dropout), reduce model complexity.</em></p>
