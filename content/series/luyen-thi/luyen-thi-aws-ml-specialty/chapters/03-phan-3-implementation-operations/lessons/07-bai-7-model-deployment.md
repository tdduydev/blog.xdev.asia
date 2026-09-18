---
id: 82fb04d8-e74e-4cf3-8b90-cfa274629073
title: 'Bài 7: Model Deployment — Endpoints & Inference'
slug: bai-7-model-deployment
description: >-
  Real-time Endpoints, Batch Transform, Async Inference, Serverless Inference.
  Multi-Model Endpoints, Inference Pipeline.
  Elastic Inference, SageMaker Neo (edge deployment).
  A/B Testing Production Variants.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 7
section_title: "Phần 3: ML Implementation & Operations (20%)"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'Luyện thi AWS Certified Machine Learning - Specialty'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai7-deployment-options.webp" alt="SageMaker Model Deployment Options" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>SageMaker Deployment: Real-time Endpoint, Serverless, Async Inference, và Batch Transform</em></p>
</div>

<h2 id="deployment-options"><strong>1. SageMaker Deployment Options</strong></h2>

<p>SageMaker cung cấp nhiều inference patterns — mỗi loại phù hợp với workload khác nhau. Phần này thường có 5-8 câu trong đề thi MLS-C01.</p>

<blockquote>
<p><strong>Exam tip:</strong> Key decision factors: latency requirement, volume, cost, payload size. Map these to: Real-time (low latency) → Async (large payload) → Serverless (sporadic) → Batch (no latency need).</p>
</blockquote>

<table>
<thead><tr><th>Deployment Type</th><th>Latency</th><th>Throughput</th><th>Cost Model</th><th>Best For</th></tr></thead>
<tbody>
<tr><td><strong>Real-time Endpoint</strong></td><td>Milliseconds</td><td>High</td><td>Always-on (pay per hour)</td><td>Interactive apps, APIs</td></tr>
<tr><td><strong>Serverless Inference</strong></td><td>Seconds (cold start)</td><td>Variable</td><td>Pay-per-invocation</td><td>Sporadic, unpredictable traffic</td></tr>
<tr><td><strong>Async Inference</strong></td><td>Minutes</td><td>High queued</td><td>Pay per processing</td><td>Large payloads, non-urgent</td></tr>
<tr><td><strong>Batch Transform</strong></td><td>No real-time</td><td>Very high</td><td>Pay per batch job</td><td>Scheduled offline predictions</td></tr>
</tbody>
</table>

<h2 id="realtime-endpoint"><strong>2. Real-time Inference</strong></h2>

<p>Standard deployment — persistent endpoint chạy constantly, responds synchronously.</p>

<pre><code class="language-text">Real-time Endpoint Architecture:

Client ──→ HTTPS Request
              ↓
      SageMaker Endpoint
      ┌────────────────┐
      │  Model Server  │  ← Instance running 24/7
      │  (TorchServe,  │
      │  TensorFlow    │
      │  Serving, etc) │
      └────────────────┘
              ↓
         Response (ms)
</code></pre>

<h3 id="autoscaling"><strong>2.1. Auto Scaling cho Endpoints</strong></h3>

<p>Endpoints có thể scale dựa trên <strong>InvocationsPerInstance</strong> metric qua Application Auto Scaling.</p>

<h2 id="serverless"><strong>3. Serverless Inference</strong></h2>

<p>Phù hợp khi traffic <strong>không đều, khó dự đoán</strong>. AWS tự động scale, kể cả về 0 khi không có traffic.</p>

<table>
<thead><tr><th>Feature</th><th>Detail</th></tr></thead>
<tbody>
<tr><td>Cold start latency</td><td>~1-2 seconds (đầu tiên sau thời gian nhàn rỗi)</td></tr>
<tr><td>Memory config</td><td>1 GB → 6 GB</td></tr>
<tr><td>Max payload</td><td>4 MB</td></tr>
<tr><td>Pricing</td><td>Per inference requests + processing time</td></tr>
</tbody>
</table>

<h2 id="async"><strong>4. Async Inference</strong></h2>

<p>Phù hợp cho <strong>large media files, long processing time</strong>. Request được queued, response lưu vào S3.</p>

<pre><code class="language-text">Async Inference Flow:

Client ──→ Upload payload to S3 ──→ Invoke Endpoint
                                          ↓
                                   Queue Request
                                          ↓
                               Process when instance available
                                          ↓
                                   Save output to S3
                                          ↓
                           SNS Notification → Client
</code></pre>

<table>
<thead><tr><th>Feature</th><th>Detail</th></tr></thead>
<tbody>
<tr><td>Max payload</td><td>1 GB (vs 6 MB for real-time)</td></tr>
<tr><td>Auto-scale to 0</td><td>Yes — scales down when queue empty</td></tr>
<tr><td>Response</td><td>S3 output path + SNS notification</td></tr>
</tbody>
</table>

<h2 id="batch-transform"><strong>5. Batch Transform</strong></h2>

<p>Chạy predictions trên <strong>toàn bộ dataset</strong> theo lịch. Không có endpoint — chỉ chạy khi cần.</p>

<pre><code class="language-text">Batch Transform:

Input S3 ──→ Batch Transform Job ──→ Output S3
  (CSV/       (ephemeral compute)      (CSV/JSON
  JSON/                                predictions)
  Parquet)           ↑
               No persistent endpoint
               Pay only when running
</code></pre>

<h2 id="multi-model"><strong>6. Multi-Model Endpoints (MME)</strong></h2>

<p><strong>MME</strong> cho phép host <strong>nhiều models</strong> trên một endpoint, giảm chi phí inference infrastructure.</p>

<table>
<thead><tr><th>Feature</th><th>Detail</th></tr></thead>
<tbody>
<tr><td>Cost saving</td><td>Một endpoint phục vụ hàng ngàn models</td></tr>
<tr><td>Dynamic loading</td><td>Models loaded into memory on-demand, cached</td></tr>
<tr><td>Use case</td><td>SaaS multi-tenant với model per customer</td></tr>
</tbody>
</table>

<h2 id="neo"><strong>7. SageMaker Neo — Edge Deployment</strong></h2>

<p><strong>SageMaker Neo</strong> compiles models và optimize cho specific hardware (edge devices, mobile).</p>

<pre><code class="language-text">Neo Workflow:

Trained Model (S3)
       ↓
  Neo Compiler
  (optimizes for target hardware)
       ↓
 Optimized Model
       ↓
    ├── Deploy to IoT Greengrass (edge)
    ├── Deploy to ARM devices
    └── Deploy to mobile (Android/iOS)
</code></pre>

<h2 id="cheat-sheet"><strong>8. Cheat Sheet — Deployment Decision</strong></h2>

<table>
<thead><tr><th>Scenario</th><th>Deployment Type</th></tr></thead>
<tbody>
<tr><td>Mobile app, real-time response (&lt;100ms)</td><td>Real-time Endpoint</td></tr>
<tr><td>Traffic is sporadic (few req/hour)</td><td>Serverless Inference</td></tr>
<tr><td>Video/audio processing (large files)</td><td>Async Inference</td></tr>
<tr><td>Nightly predictions on full dataset</td><td>Batch Transform</td></tr>
<tr><td>Thousands of customer-specific models</td><td>Multi-Model Endpoints</td></tr>
<tr><td>IoT edge device deployment</td><td>SageMaker Neo + Greengrass</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>9. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A company runs an e-commerce chatbot that requires sub-100ms response times during peak shopping hours. Which SageMaker inference type should they use?</p>
<ul>
<li>A) Batch Transform</li>
<li>B) Async Inference</li>
<li>C) Serverless Inference</li>
<li>D) Real-time Endpoint ✓</li>
</ul>
<p><em>Explanation: Real-time Endpoints provide persistent, always-on inference with millisecond latency. Serverless has cold start delays, Async is asynchronous (not sub-100ms), and Batch Transform is for scheduled offline processing.</em></p>

<p><strong>Q2:</strong> A media company wants to run ML classification on 1 GB video files. Processing time is not urgent. Which SageMaker inference option is MOST appropriate?</p>
<ul>
<li>A) Real-time Endpoints</li>
<li>B) Serverless Inference</li>
<li>C) Async Inference ✓</li>
<li>D) Batch Transform</li>
</ul>
<p><em>Explanation: Async Inference supports payloads up to 1 GB and queues requests for processing, making it ideal for large media files. Real-time is limited to 6 MB payload, Serverless to 4 MB, and Batch Transform is for scheduled bulk predictions without real-time queue.</em></p>

<p><strong>Q3:</strong> A SaaS company provides individual ML models for each of their 10,000 enterprise customers. Hosting each on a separate endpoint is too expensive. What is the BEST solution?</p>
<ul>
<li>A) Merge all models into one large model</li>
<li>B) Use SageMaker Multi-Model Endpoints ✓</li>
<li>C) Deploy all models on a single Batch Transform job</li>
<li>D) Use Serverless Inference for each model</li>
</ul>
<p><em>Explanation: Multi-Model Endpoints (MME) host multiple models on a single endpoint, dynamically loading them into memory on-demand. This is exactly designed for multi-tenant scenarios where each customer has their own model, reducing infrastructure costs by orders of magnitude.</em></p>
