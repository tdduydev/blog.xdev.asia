---
id: bb3d4aa7-2e63-49f6-a751-6323c5919325
title: 'Bài 9: Security & Cost Optimization'
slug: bai-9-security-cost
description: >-
  IAM roles và policies cho SageMaker. VPC configuration, PrivateLink.
  Encryption at rest (KMS) và in transit. Spot Training Instances.
  S3 lifecycle policies cho ML data. Right-sizing instances.
duration_minutes: 45
is_free: true
video_url: null
sort_order: 9
section_title: "Phần 3: ML Implementation & Operations (20%)"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'Luyện thi AWS Certified Machine Learning - Specialty'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai9-security-architecture.webp" alt="AWS ML Security Architecture" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Security trong AWS ML: IAM Roles, VPC isolation, KMS encryption, và tối ưu chi phí với Spot Instances</em></p>
</div>

<h2 id="iam-sagemaker"><strong>1. IAM for SageMaker</strong></h2>

<p>SageMaker sử dụng <strong>IAM Roles</strong> (không phải users) để thực hiện actions trên AWS resources. Đây là pattern bảo mật quan trọng trong đề thi.</p>

<table>
<thead><tr><th>Role Type</th><th>Used By</th><th>Needs Access To</th></tr></thead>
<tbody>
<tr><td><strong>Execution Role</strong></td><td>SageMaker Notebooks, Training Jobs, Endpoints</td><td>S3, ECR, CloudWatch, KMS</td></tr>
<tr><td><strong>SageMaker Studio Role</strong></td><td>Studio IDE users</td><td>Data, experiments, pipelines</td></tr>
<tr><td><strong>Training Job Role</strong></td><td>The training container itself</td><td>Input/output S3 buckets</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> SageMaker training/inference containers KHÔNG có EC2 instance credentials — họ chạy với IAM Role cross-account. Luôn cần grant S3 và ECR permissions cho execution role.</p>
</blockquote>

<h2 id="vpc-security"><strong>2. VPC Configuration for SageMaker</strong></h2>

<p>Chạy SageMaker workloads trong <strong>VPC</strong> để đảm bảo traffic không đi qua public internet.</p>

<pre><code class="language-text">SageMaker Network Security:

Internet ──✗────────────────────────────────────────
                                                    │
          ┌─── Private VPC ──────────────────────┐ │
          │                                       │ │
          │  SageMaker Training Instance          │ │
          │          ↓ (VPC Endpoint)             │ │
          │  ┌──── S3 Gateway Endpoint ────────┐  │ │
          │  │   ECR VPC Endpoint              │  │ │
          │  │   SageMaker API VPC Endpoint    │  │ │
          │  └─────────────────────────────────┘  │ │
          └───────────────────────────────────────┘ │
</code></pre>

<table>
<thead><tr><th>Feature</th><th>Description</th></tr></thead>
<tbody>
<tr><td><strong>VPC Endpoints (PrivateLink)</strong></td><td>Access S3, ECR, SageMaker API without internet</td></tr>
<tr><td><strong>Security Groups</strong></td><td>Control inbound/outbound traffic cho training instances</td></tr>
<tr><td><strong>Network Isolation</strong></td><td>Training job không có internet access (isolated mode)</td></tr>
<tr><td><strong>Inter-Container Encryption</strong></td><td>Encrypt distributed training traffic</td></tr>
</tbody>
</table>

<h2 id="encryption"><strong>3. Encryption</strong></h2>

<table>
<thead><tr><th>What</th><th>How</th><th>Service</th></tr></thead>
<tbody>
<tr><td><strong>S3 data at rest</strong></td><td>SSE-S3, SSE-KMS, SSE-C</td><td>S3 + KMS</td></tr>
<tr><td><strong>Model artifacts at rest</strong></td><td>KMS key cho output S3 bucket</td><td>KMS</td></tr>
<tr><td><strong>EBS volumes (training)</strong></td><td>KMS encryption for instance storage</td><td>KMS</td></tr>
<tr><td><strong>Data in transit</strong></td><td>TLS 1.2/1.3 for all API calls</td><td>Default</td></tr>
<tr><td><strong>Distributed training traffic</strong></td><td>Enable inter-container encryption</td><td>SageMaker config</td></tr>
</tbody>
</table>

<h2 id="cost-optimization"><strong>4. Cost Optimization Strategies</strong></h2>

<table>
<thead><tr><th>Strategy</th><th>Savings</th><th>How</th></tr></thead>
<tbody>
<tr><td><strong>Spot Instances</strong></td><td>Up to 90%</td><td>Training Jobs + checkpointing</td></tr>
<tr><td><strong>Right-sizing</strong></td><td>20-40%</td><td>Match instance type to actual GPU/CPU usage</td></tr>
<tr><td><strong>Serverless Inference</strong></td><td>Variable</td><td>Pay per invocation, no idle cost</td></tr>
<tr><td><strong>SageMaker Savings Plans</strong></td><td>Up to 64%</td><td>Commit to consistent usage</td></tr>
<tr><td><strong>S3 Intelligent-Tiering</strong></td><td>Variable</td><td>Auto-tier old training data</td></tr>
<tr><td><strong>Lifecycle Configurations</strong></td><td>Variable</td><td>Auto-stop idle notebooks</td></tr>
</tbody>
</table>

<h3 id="s3-lifecycle"><strong>4.1. S3 Lifecycle Policies cho ML Data</strong></h3>

<pre><code class="language-text">Data Lifecycle for ML:

  Active Training Data (S3 Standard)
           ↓ after 30 days unused
  S3 Intelligent-Tiering
           ↓ after 90 days
  S3 Standard-IA (Infrequent Access)
           ↓ after 180 days
  S3 Glacier Instant Retrieval
           ↓ after 1 year
  S3 Glacier Deep Archive (compliance)
</code></pre>

<h2 id="compliance"><strong>5. Compliance Frameworks</strong></h2>

<table>
<thead><tr><th>Framework</th><th>Relevance for ML</th></tr></thead>
<tbody>
<tr><td><strong>HIPAA</strong></td><td>Healthcare ML — PHI data encryption, audit logging, BAA required</td></tr>
<tr><td><strong>GDPR</strong></td><td>EU data — right to erasure, data minimization, consent</td></tr>
<tr><td><strong>SOC 2</strong></td><td>Security controls audit for SaaS ML products</td></tr>
<tr><td><strong>PCI DSS</strong></td><td>Payment card data in ML models</td></tr>
</tbody>
</table>

<h2 id="cheat-sheet"><strong>6. Cheat Sheet — Security & Cost</strong></h2>

<table>
<thead><tr><th>Scenario</th><th>Solution</th></tr></thead>
<tbody>
<tr><td>SageMaker training with no internet</td><td>VPC + Network Isolation + VPC Endpoints</td></tr>
<tr><td>Encrypt training data on S3</td><td>SSE-KMS with customer-managed key</td></tr>
<tr><td>Reduce training cost by 70%+</td><td>Spot Instances + checkpointing</td></tr>
<tr><td>Auto-archive old training datasets</td><td>S3 Lifecycle Policies</td></tr>
<tr><td>Prevent notebook idle cost</td><td>Studio Lifecycle Config → auto-shutdown</td></tr>
<tr><td>Healthcare data (HIPAA)</td><td>KMS + VPC + CloudTrail + BAA with AWS</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A company needs SageMaker training jobs to access data in S3 without traversing the public internet for security compliance. What should they configure?</p>
<ul>
<li>A) VPC Flow Logs</li>
<li>B) SageMaker Training with VPC + S3 VPC Gateway Endpoint ✓</li>
<li>C) IAM policy with IP restriction</li>
<li>D) AWS Shield</li>
</ul>
<p><em>Explanation: Configuring SageMaker Training Jobs to run in a VPC, combined with an S3 VPC Gateway Endpoint, ensures all S3 traffic stays within the AWS network without going through the public internet.</em></p>

<p><strong>Q2:</strong> A machine learning team wants to reduce costs for long-running training jobs that can be interrupted. The jobs should resume from where they stopped. Which approach is MOST cost-effective?</p>
<ul>
<li>A) Use larger instances to finish faster</li>
<li>B) Use Reserved Instances</li>
<li>C) Use Spot Instances with checkpointing to S3 ✓</li>
<li>D) Run training locally</li>
</ul>
<p><em>Explanation: Spot Instances provide up to 90% cost savings. With checkpointing enabled (saving model state to S3 periodically), jobs can resume from the last checkpoint if interrupted, making Spot Instances practical for long training runs.</em></p>

<p><strong>Q3:</strong> Which AWS service provides centralized key management for encrypting SageMaker training data, model artifacts, and EBS volumes?</p>
<ul>
<li>A) AWS Secrets Manager</li>
<li>B) AWS IAM</li>
<li>C) AWS KMS (Key Management Service) ✓</li>
<li>D) AWS Certificate Manager</li>
</ul>
<p><em>Explanation: AWS KMS provides encryption key management for at-rest encryption of S3 data (SSE-KMS), EBS volumes used by training instances, and model artifacts. SageMaker integrates natively with KMS throughout the training and deployment workflow.</em></p>
