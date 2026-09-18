---
id: 019c9619-lt03-l07
title: 'Lesson 7: Model Deployment & Prediction'
slug: bai-7-model-deployment
description: >-
  Vertex AI Endpoints: online, batch prediction.
  Model versioning, traffic splitting. Edge deployment.
  Scaling config, GPU allocation.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 7
section_title: "Part 4: Model Deployment & MLOps"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer Exam Prep'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai7-deployment.webp" alt="Vertex AI Model Deployment" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Vertex AI Deployment: Online Prediction, Batch Prediction, traffic splitting, and edge deployment</em></p>
</div>

<h2 id="deployment-types"><strong>1. Prediction Types on Vertex AI</strong></h2>

<table>
<thead><tr><th>Type</th><th>Latency</th><th>When to Use</th></tr></thead>
<tbody>
<tr><td><strong>Online Prediction</strong></td><td>Milliseconds (sync)</td><td>Real-time apps, user-facing APIs</td></tr>
<tr><td><strong>Batch Prediction</strong></td><td>Minutes/Hours (async)</td><td>Large datasets, scheduled scoring</td></tr>
<tr><td><strong>Streaming Prediction</strong></td><td>Near real-time</td><td>Pub/Sub events + Dataflow + Vertex AI</td></tr>
</tbody>
</table>

<h2 id="vertex-endpoints"><strong>2. Vertex AI Endpoints</strong></h2>

<pre><code class="language-text">Vertex AI Endpoint Architecture:

Client Request
    ↓
Vertex AI Endpoint (load balancer)
    ├── Model Version A (70% traffic)
    │       └── Deployed Model (e.g., v1.0)
    └── Model Version B (30% traffic)  ← Canary/A-B test
            └── Deployed Model (e.g., v1.1)
</code></pre>

<p>Each Endpoint can have <strong>multiple model versions</strong> with <strong>traffic splitting</strong> — used for A/B testing and canary deployments.</p>

<table>
<thead><tr><th>Feature</th><th>Details</th></tr></thead>
<tbody>
<tr><td><strong>Dedicated Endpoint</strong></td><td>Dedicated resources, lowest latency, higher cost</td></tr>
<tr><td><strong>Shared Endpoint</strong></td><td>Multi-tenant, lower cost, potential cold start</td></tr>
<tr><td><strong>Explanation</strong></td><td>Enable Vertex Explainability per deployed model</td></tr>
<tr><td><strong>Min/Max Replicas</strong></td><td>Autoscaling based on request rate</td></tr>
<tr><td><strong>GPU allocation</strong></td><td>Specify GPU type (NVIDIA T4, A100) per deployment</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> Traffic splitting in Vertex AI Endpoints is how you implement <strong>Canary deployment</strong> or <strong>A/B testing</strong>. For questions about "roll out new model version safely" → Traffic splitting (e.g., 90% old, 10% new).</p>
</blockquote>

<h2 id="batch-prediction"><strong>3. Batch Prediction</strong></h2>

<table>
<thead><tr><th>Property</th><th>Value</th></tr></thead>
<tbody>
<tr><td><strong>Input</strong></td><td>Cloud Storage (CSV, JSON, JSONL, TFRecords, Avro)</td></tr>
<tr><td><strong>Output</strong></td><td>Cloud Storage (predictions as JSON/CSV)</td></tr>
<tr><td><strong>No Endpoint needed</strong></td><td>Runs directly from Model Registry, no persistent endpoint</td></tr>
<tr><td><strong>Auto-scaling</strong></td><td>Scales to zero when done (cost-efficient)</td></tr>
<tr><td><strong>Accelerators</strong></td><td>Supports GPU/TPU for batch inference</td></tr>
</tbody>
</table>

<h2 id="model-versioning"><strong>4. Model Versioning & Registry</strong></h2>

<pre><code class="language-text">Vertex AI Model Registry:

Model: churn-predictor
├── v1 (Logistic Regression)  ← Champion in production
│   - Accuracy: 0.87
│   - Deployed to: endpoint/prod (70% traffic)
│
└── v2 (XGBoost)              ← Challenger
    - Accuracy: 0.91
    - Deployed to: endpoint/prod (30% traffic)

After validation: promote v2 to Champion
</code></pre>

<h2 id="edge-deployment"><strong>5. Edge Deployment</strong></h2>

<table>
<thead><tr><th>Platform</th><th>Solution</th></tr></thead>
<tbody>
<tr><td>Mobile (Android/iOS)</td><td>TFLite + Vertex AI model export</td></tr>
<tr><td>Edge devices (IoT)</td><td>TFLite Micro / Edge TPU (Coral)</td></tr>
<tr><td>On-premise servers</td><td>TF Serving in Docker container</td></tr>
<tr><td>Kubernetes</td><td>KServe (formerly KFServing) on GKE</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>6. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A company needs to score 50 million customer records for churn risk. Results are needed within 2 hours but not in real time. Which Vertex AI prediction option is MOST cost-effective?</p>
<ul>
<li>A) Online Prediction with high replica count</li>
<li>B) Batch Prediction ✓</li>
<li>C) Streaming prediction via Dataflow</li>
<li>D) Deploy on dedicated GPU endpoint</li>
</ul>
<p><em>Explanation: Batch Prediction is designed for large-scale asynchronous scoring. It scales compute resources up during the job and back to zero when done, with no persistent endpoint cost. Online Prediction would be wasteful since real-time response isn't needed for batch scoring.</em></p>

<p><strong>Q2:</strong> A team is deploying a new model version. They want to gradually route 10% of production traffic to the new version while the old version handles 90%, allowing comparison of performance metrics before full rollout. Which Vertex AI feature enables this?</p>
<ul>
<li>A) Model Registry versioning</li>
<li>B) Traffic splitting on Vertex AI Endpoints ✓</li>
<li>C) Batch Prediction comparison</li>
<li>D) Vertex AI Experiments</li>
</ul>
<p><em>Explanation: Vertex AI Endpoints support deploying multiple model versions simultaneously with configurable traffic splits (e.g., 90%/10%). This enables canary deployments and A/B testing to compare live performance before committing to a full rollout.</em></p>

<p><strong>Q3:</strong> A retail company wants to detect product defects on a factory floor without network connectivity to cloud. Which deployment approach should they use?</p>
<ul>
<li>A) Vertex AI Online Prediction Endpoint</li>
<li>B) AutoML Edge Model deployed to device using TFLite ✓</li>
<li>C) BigQuery ML batch prediction</li>
<li>D) TF Serving on Cloud Run</li>
</ul>
<p><em>Explanation: Edge deployment with TFLite (or AutoML Edge Model) runs inference locally on the device without network connectivity. TFLite supports on-device inference for computer vision models, suitable for factory floor equipment with no internet access.</em></p>
