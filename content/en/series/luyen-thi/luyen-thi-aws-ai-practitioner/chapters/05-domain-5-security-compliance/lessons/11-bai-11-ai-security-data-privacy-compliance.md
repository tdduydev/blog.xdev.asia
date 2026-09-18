---
id: 019c9619-lt01-d5-l11
title: 'Lesson 11: AI Security, Data Privacy & Compliance on AWS'
slug: bai-11-ai-security-data-privacy-compliance
description: >-
  IAM for AI/ML workloads. Encryption at rest & in transit.
  VPC endpoints for Bedrock/SageMaker. PII detection.
  AWS compliance programs. Data governance for AI.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 1
section_title: "Domain 5: Security, Compliance & Governance for AI (14%)"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS Certified AI Practitioner (AIF-C01) Exam Prep'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai11-ai-security-layers.webp" alt="AI Security Layers on AWS" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>AI Security Layers: Network, Identity, Data Protection, and AI-specific Controls on AWS</em></p>
</div>

<h2 id="security-overview"><strong>1. AI Security on AWS — Overview</strong></h2>

<p>AI workloads require security at <strong>multiple layers</strong>: data, model, infrastructure, and application.</p>

<pre><code class="language-text">AI Security Layers:
┌─────────────────────────────────────────┐
│  APPLICATION SECURITY                   │
│  Guardrails, input validation,          │
│  prompt injection prevention            │
├─────────────────────────────────────────┤
│  MODEL SECURITY                         │
│  Model access control, versioning,      │
│  model integrity, adversarial defense   │
├─────────────────────────────────────────┤
│  DATA SECURITY                          │
│  Encryption, PII handling, data access  │
│  control, audit logging                 │
├─────────────────────────────────────────┤
│  INFRASTRUCTURE SECURITY                │
│  VPC, security groups, endpoints,       │
│  network isolation, IAM                 │
└─────────────────────────────────────────┘
</code></pre>

<h2 id="iam"><strong>2. IAM for AI/ML Workloads</strong></h2>

<h3 id="iam-bedrock"><strong>2.1. IAM for Amazon Bedrock</strong></h3>

<table>
<thead><tr><th>Permission</th><th>What it controls</th></tr></thead>
<tbody>
<tr><td><code>bedrock:InvokeModel</code></td><td>Call a specific FM</td></tr>
<tr><td><code>bedrock:InvokeModelWithResponseStream</code></td><td>Streaming model invocation</td></tr>
<tr><td><code>bedrock:CreateKnowledgeBase</code></td><td>Create RAG knowledge bases</td></tr>
<tr><td><code>bedrock:CreateGuardrail</code></td><td>Create safety guardrails</td></tr>
<tr><td><code>bedrock:CreateModelCustomizationJob</code></td><td>Start fine-tuning jobs</td></tr>
</tbody>
</table>

<h3 id="iam-principles"><strong>2.2. IAM Best Practices for AI</strong></h3>

<ul>
<li><strong>Least privilege</strong>: Grant only required permissions per role</li>
<li><strong>Separate roles</strong>: Different roles for data scientists, ML engineers, admins</li>
<li><strong>Resource-based policies</strong>: Restrict access to specific models</li>
<li><strong>Service-linked roles</strong>: Let AWS services assume roles as needed</li>
<li><strong>Condition keys</strong>: Restrict by IP, VPC, time, MFA</li>
</ul>

<blockquote>
<p><strong>Exam tip:</strong> "How to restrict which foundation models a team can use in Bedrock?" → IAM policy with <code>bedrock:InvokeModel</code> and <strong>resource ARN</strong> for specific models.</p>
</blockquote>

<h2 id="encryption"><strong>3. Data Encryption</strong></h2>

<h3 id="encryption-rest"><strong>3.1. Encryption at Rest</strong></h3>

<table>
<thead><tr><th>Service</th><th>Default Encryption</th><th>Custom Key (KMS)</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Bedrock</strong></td><td>AWS-managed key</td><td>Customer-managed KMS key</td></tr>
<tr><td><strong>SageMaker training</strong></td><td>AWS-managed key</td><td>Customer-managed KMS key</td></tr>
<tr><td><strong>SageMaker notebooks</strong></td><td>AWS-managed key</td><td>Customer-managed KMS key</td></tr>
<tr><td><strong>S3 (training data)</strong></td><td>SSE-S3</td><td>SSE-KMS, SSE-C</td></tr>
<tr><td><strong>Knowledge Bases vectors</strong></td><td>Depends on vector DB</td><td>KMS encryption supported</td></tr>
</tbody>
</table>

<h3 id="encryption-transit"><strong>3.2. Encryption in Transit</strong></h3>

<ul>
<li>All AWS API calls use <strong>TLS 1.2+</strong> by default</li>
<li>Bedrock API calls are encrypted in transit</li>
<li>SageMaker endpoints use HTTPS</li>
<li>Inter-node training communication: encrypted</li>
</ul>

<h3 id="kms"><strong>3.3. AWS KMS for AI</strong></h3>

<pre><code class="language-text">Use AWS KMS when you need:
✓ Control over encryption keys
✓ Key rotation policies
✓ CloudTrail audit of key usage
✓ Cross-account key sharing
✓ Compliance requirements (HIPAA, PCI-DSS)
</code></pre>

<h2 id="network"><strong>4. Network Security</strong></h2>

<h3 id="vpc-endpoints"><strong>4.1. VPC Endpoints for AI Services</strong></h3>

<p><strong>VPC endpoints</strong> allow private access to AWS AI services — traffic does not traverse the internet.</p>

<pre><code class="language-text">Without VPC Endpoint:
App in VPC → Internet Gateway → Public Internet → Bedrock API

With VPC Endpoint (PrivateLink):
App in VPC → VPC Endpoint → AWS Private Network → Bedrock API
             (no internet!)
</code></pre>

<table>
<thead><tr><th>Service</th><th>VPC Endpoint Type</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Bedrock</strong></td><td>Interface (PrivateLink)</td></tr>
<tr><td><strong>SageMaker Runtime</strong></td><td>Interface (PrivateLink)</td></tr>
<tr><td><strong>SageMaker API</strong></td><td>Interface (PrivateLink)</td></tr>
<tr><td><strong>Amazon S3</strong></td><td>Gateway or Interface</td></tr>
</tbody>
</table>

<h3 id="sagemaker-network"><strong>4.2. SageMaker Network Isolation</strong></h3>

<ul>
<li><strong>VPC mode</strong>: Run training/inference inside your VPC</li>
<li><strong>Network isolation</strong>: No internet access for containers (EnableNetworkIsolation=true)</li>
<li><strong>Security groups</strong>: Control inbound/outbound traffic</li>
<li><strong>Private subnets</strong>: No direct internet access</li>
</ul>

<blockquote>
<p><strong>Exam tip:</strong> "How to ensure Bedrock API calls don't traverse the public internet?" → <strong>VPC endpoint</strong> (AWS PrivateLink) for Amazon Bedrock.</p>
</blockquote>

<h2 id="pii"><strong>5. PII Detection & Data Privacy</strong></h2>

<h3 id="pii-services"><strong>5.1. PII Detection Services</strong></h3>

<table>
<thead><tr><th>Service</th><th>PII Capability</th><th>Data Type</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Comprehend</strong></td><td>Detect and redact PII entities</td><td>Text</td></tr>
<tr><td><strong>Amazon Macie</strong></td><td>Discover PII in S3 buckets</td><td>Files in S3</td></tr>
<tr><td><strong>Bedrock Guardrails</strong></td><td>Block/anonymize PII in FM I/O</td><td>FM prompts/responses</td></tr>
<tr><td><strong>AWS Glue DataBrew</strong></td><td>PII detection in data pipelines</td><td>Structured data</td></tr>
</tbody>
</table>

<h3 id="pii-types"><strong>5.2. Common PII Types for Exam</strong></h3>

<table>
<thead><tr><th>PII Type</th><th>Examples</th></tr></thead>
<tbody>
<tr><td><strong>Direct identifiers</strong></td><td>Name, SSN, email, phone, passport number</td></tr>
<tr><td><strong>Financial</strong></td><td>Credit card number, bank account, tax ID</td></tr>
<tr><td><strong>Health</strong></td><td>Medical record number, health conditions (PHI)</td></tr>
<tr><td><strong>Location</strong></td><td>Home address, GPS coordinates</td></tr>
<tr><td><strong>Digital</strong></td><td>IP address, device ID, login credentials</td></tr>
</tbody>
</table>

<h2 id="bedrock-security"><strong>6. Amazon Bedrock Security</strong></h2>

<h3 id="bedrock-data"><strong>6.1. Data Privacy in Bedrock</strong></h3>

<ul>
<li><strong>Data isolation</strong>: Your data is NOT used to train base FMs</li>
<li><strong>Data stays in region</strong>: Processed in the AWS region you choose</li>
<li><strong>Custom models</strong>: Fine-tuned models are private to your account</li>
<li><strong>No data sharing</strong>: Your prompts/responses are not shared with model providers</li>
<li><strong>Encryption</strong>: All data encrypted at rest and in transit</li>
</ul>

<h3 id="bedrock-logging"><strong>6.2. Monitoring & Logging</strong></h3>

<table>
<thead><tr><th>Service</th><th>What it logs</th></tr></thead>
<tbody>
<tr><td><strong>AWS CloudTrail</strong></td><td>API calls (who invoked which model, when)</td></tr>
<tr><td><strong>Amazon CloudWatch</strong></td><td>Model invocation metrics (latency, errors, tokens)</td></tr>
<tr><td><strong>Bedrock Model Invocation Logging</strong></td><td>Full prompts and responses (to S3 or CloudWatch)</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> "How to audit which users are calling Bedrock models?" → <strong>CloudTrail</strong>. "How to log the actual prompts and responses?" → <strong>Bedrock Model Invocation Logging</strong>.</p>
</blockquote>

<h2 id="compliance"><strong>7. Compliance & Governance</strong></h2>

<h3 id="compliance-programs"><strong>7.1. AWS Compliance Programs</strong></h3>

<table>
<thead><tr><th>Program</th><th>What</th><th>Relevant AI Services</th></tr></thead>
<tbody>
<tr><td><strong>SOC 1/2/3</strong></td><td>Security controls audit</td><td>Bedrock, SageMaker</td></tr>
<tr><td><strong>HIPAA</strong></td><td>Healthcare data protection</td><td>SageMaker, Comprehend Medical</td></tr>
<tr><td><strong>GDPR</strong></td><td>EU data privacy</td><td>All AWS services (data residency)</td></tr>
<tr><td><strong>PCI-DSS</strong></td><td>Payment card data security</td><td>SageMaker (with controls)</td></tr>
<tr><td><strong>FedRAMP</strong></td><td>US government cloud security</td><td>GovCloud regions</td></tr>
<tr><td><strong>ISO 27001</strong></td><td>Information security management</td><td>Bedrock, SageMaker</td></tr>
</tbody>
</table>

<h3 id="shared-responsibility"><strong>7.2. Shared Responsibility Model for AI</strong></h3>

<pre><code class="language-text">CUSTOMER responsibility ("Security IN the cloud"):
├── Training data quality and bias
├── Model selection and evaluation
├── Prompt design and guardrails configuration
├── IAM permissions and access control
├── PII handling and data classification
├── Application-level security
└── Compliance with industry regulations

AWS responsibility ("Security OF the cloud"):
├── Physical infrastructure security
├── Network and hardware security
├── Base FM provider management
├── Service availability and reliability
├── Encryption implementation
└── Compliance certifications
</code></pre>

<h2 id="data-governance"><strong>8. Data Governance for AI</strong></h2>

<table>
<thead><tr><th>Practice</th><th>AWS Service</th></tr></thead>
<tbody>
<tr><td>Data cataloging</td><td>AWS Glue Data Catalog</td></tr>
<tr><td>Data classification</td><td>Amazon Macie</td></tr>
<tr><td>Access control</td><td>AWS Lake Formation</td></tr>
<tr><td>Data lineage</td><td>SageMaker ML Lineage Tracking</td></tr>
<tr><td>Data quality</td><td>SageMaker Data Wrangler, Glue DataBrew</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>9. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A financial services company wants to use Amazon Bedrock but requires that API calls do NOT traverse the public internet. What should they configure?</p>
<ul>
<li>A) AWS Direct Connect</li>
<li>B) VPC endpoint (AWS PrivateLink) for Bedrock ✓</li>
<li>C) VPN connection</li>
<li>D) CloudFront distribution</li>
</ul>
<p><em>Explanation: A VPC interface endpoint (PrivateLink) for Amazon Bedrock allows private connectivity from within a VPC without traffic going through the internet.</em></p>

<p><strong>Q2:</strong> According to the AWS Shared Responsibility Model, who is responsible for ensuring training data does not contain bias?</p>
<ul>
<li>A) AWS</li>
<li>B) The foundation model provider</li>
<li>C) The customer ✓</li>
<li>D) Both AWS and the customer equally</li>
</ul>
<p><em>Explanation: Under the shared responsibility model, customers are responsible for "security IN the cloud" — this includes training data quality, bias detection, and ethical AI practices. AWS is responsible for infrastructure security.</em></p>

<p><strong>Q3:</strong> A company needs to discover which S3 buckets contain personally identifiable information (PII) before using the data for ML training. Which service should they use?</p>
<ul>
<li>A) Amazon Comprehend</li>
<li>B) Amazon Macie ✓</li>
<li>C) Amazon Inspector</li>
<li>D) AWS Config</li>
</ul>
<p><em>Explanation: Amazon Macie uses machine learning to automatically discover and classify sensitive data (including PII) stored in Amazon S3 buckets. Comprehend detects PII in text, but Macie is designed for S3-level discovery.</em></p>
