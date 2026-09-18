---
id: 019c9619-lt01-d4-l09
title: 'Bài 9: Responsible AI — Fairness, Bias & Transparency'
slug: bai-9-responsible-ai-fairness-bias-transparency
description: >-
  Responsible AI principles. Types of bias (data, algorithmic, societal).
  Fairness metrics, model explainability (SHAP, LIME).
  AWS AI Service Cards, Transparency in AI.
duration_minutes: 55
is_free: true
video_url: null
sort_order: 1
section_title: "Domain 4: Guidelines for Responsible AI (14%)"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'Luyện thi AWS Certified AI Practitioner (AIF-C01)'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai9-responsible-ai-pillars.webp" alt="Responsible AI Pillars" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Responsible AI Pillars và các điểm Bias xâm nhập trong ML Pipeline</em></p>
</div>

<h2 id="responsible-ai"><strong>1. What is Responsible AI?</strong></h2>

<p><strong>Responsible AI</strong> là framework đảm bảo AI systems được phát triển và sử dụng một cách <strong>ethical, fair, transparent, và accountable</strong>.</p>

<h3 id="pillars"><strong>1.1. Pillars of Responsible AI</strong></h3>

<table>
<thead><tr><th>Pillar</th><th>Definition</th><th>Example</th></tr></thead>
<tbody>
<tr><td><strong>Fairness</strong></td><td>Treat all groups equitably</td><td>Loan approval model doesn't discriminate by race</td></tr>
<tr><td><strong>Explainability</strong></td><td>Understand why model made a decision</td><td>"Your loan was denied because debt-to-income ratio > 0.5"</td></tr>
<tr><td><strong>Transparency</strong></td><td>Clear about AI capabilities & limitations</td><td>Disclose when content is AI-generated</td></tr>
<tr><td><strong>Privacy</strong></td><td>Protect personal data</td><td>Don't train on PII without consent</td></tr>
<tr><td><strong>Safety</strong></td><td>Prevent harmful outputs</td><td>Content filters, guardrails</td></tr>
<tr><td><strong>Robustness</strong></td><td>Reliable under adversarial conditions</td><td>Resist prompt injection attacks</td></tr>
<tr><td><strong>Governance</strong></td><td>Oversight and accountability</td><td>Human review for high-stakes decisions</td></tr>
</tbody>
</table>

<h2 id="bias"><strong>2. Understanding Bias in AI</strong></h2>

<h3 id="bias-types"><strong>2.1. Types of Bias</strong></h3>

<table>
<thead><tr><th>Bias Type</th><th>What</th><th>Example</th></tr></thead>
<tbody>
<tr><td><strong>Selection bias</strong></td><td>Training data doesn't represent population</td><td>Hiring model trained only on tech company data</td></tr>
<tr><td><strong>Measurement bias</strong></td><td>Inconsistent data collection</td><td>Different image quality across demographic groups</td></tr>
<tr><td><strong>Confirmation bias</strong></td><td>Model reinforces existing patterns</td><td>Recommender shows only what users already like</td></tr>
<tr><td><strong>Label bias</strong></td><td>Human labelers introduce biases</td><td>Inconsistent sentiment labels across annotators</td></tr>
<tr><td><strong>Algorithmic bias</strong></td><td>Model architecture amplifies bias</td><td>Optimizing for accuracy favors majority group</td></tr>
<tr><td><strong>Recall bias</strong></td><td>Overrepresented historical patterns</td><td>More arrest data in certain areas → predicts more crime there</td></tr>
<tr><td><strong>Sampling bias</strong></td><td>Non-random data collection</td><td>Online survey misses elderly population</td></tr>
</tbody>
</table>

<h3 id="bias-lifecycle"><strong>2.2. Where Bias Can Enter the ML Lifecycle</strong></h3>

<pre><code class="language-text">Data Collection    Data Processing    Model Training    Evaluation    Deployment
     ↓                  ↓                  ↓               ↓            ↓
Selection bias    Feature engineering  Algorithmic       Evaluation    Feedback
Sampling bias     Missing values       bias              metric bias   loop bias
Measurement       Encoding choices     Optimization                   User bias
bias                                   objective
</code></pre>

<blockquote>
<p><strong>Exam tip:</strong> "Where can bias be introduced in an ML pipeline?" → <strong>At every stage</strong> — data collection, preprocessing, model training, evaluation, and deployment. This is why monitoring throughout the lifecycle is critical.</p>
</blockquote>

<h2 id="fairness"><strong>3. Fairness Metrics</strong></h2>

<h3 id="fairness-concepts"><strong>3.1. Key Fairness Concepts</strong></h3>

<table>
<thead><tr><th>Concept</th><th>Definition</th></tr></thead>
<tbody>
<tr><td><strong>Demographic parity</strong></td><td>Positive outcomes at same rate across groups</td></tr>
<tr><td><strong>Equal opportunity</strong></td><td>Equal true positive rates across groups</td></tr>
<tr><td><strong>Equalized odds</strong></td><td>Equal TPR and FPR across groups</td></tr>
<tr><td><strong>Individual fairness</strong></td><td>Similar individuals get similar outcomes</td></tr>
<tr><td><strong>Disparate impact</strong></td><td>Ratio of positive outcomes between groups (80% rule)</td></tr>
</tbody>
</table>

<h3 id="detect-bias"><strong>3.2. Detecting Bias</strong></h3>

<ul>
<li><strong>Pre-training</strong>: Analyze training data distribution across demographic groups</li>
<li><strong>Post-training</strong>: Compare model predictions across groups</li>
<li><strong>Runtime</strong>: Monitor live predictions for drift in fairness metrics</li>
</ul>

<h2 id="explainability"><strong>4. Model Explainability</strong></h2>

<p><strong>Explainability</strong> = ability to understand <strong>why</strong> a model made a specific prediction.</p>

<h3 id="explainability-methods"><strong>4.1. Explainability Techniques</strong></h3>

<table>
<thead><tr><th>Technique</th><th>Type</th><th>What it does</th></tr></thead>
<tbody>
<tr><td><strong>SHAP</strong> (SHapley Additive exPlanations)</td><td>Model-agnostic</td><td>Shows contribution of each feature to prediction</td></tr>
<tr><td><strong>LIME</strong> (Local Interpretable Model-agnostic Explanations)</td><td>Model-agnostic</td><td>Explains individual predictions by approximating locally</td></tr>
<tr><td><strong>Feature importance</strong></td><td>Model-specific</td><td>Ranks features by their impact on model output</td></tr>
<tr><td><strong>Attention visualization</strong></td><td>Transformer-specific</td><td>Shows which tokens the model focused on</td></tr>
<tr><td><strong>Partial Dependence Plots</strong></td><td>Model-agnostic</td><td>Shows how a feature affects predictions</td></tr>
</tbody>
</table>

<pre><code class="language-text">SHAP Example:
Loan Application: DENIED

Feature Contributions:
  Debt-to-income ratio:     +0.42 (pushes toward DENY)
  Credit score:             +0.28 (pushes toward DENY)
  Employment years:         -0.15 (pushes toward APPROVE)
  Loan amount:              +0.08 (pushes toward DENY)
  Age:                      -0.03 (neutral)
                           ─────────────
  Base (avg prediction):    0.45
  Final prediction:         0.45 + 0.42 + 0.28 - 0.15 + 0.08 - 0.03 = 1.05 → DENY
</code></pre>

<blockquote>
<p><strong>Exam tip:</strong> "How to explain why an ML model denied a loan application?" → <strong>SHAP values</strong> — shows the contribution of each feature to the individual prediction. <strong>SageMaker Clarify</strong> provides this on AWS.</p>
</blockquote>

<h2 id="transparency"><strong>5. Transparency in AI</strong></h2>

<h3 id="ai-service-cards"><strong>5.1. AWS AI Service Cards</strong></h3>

<p><strong>AI Service Cards</strong> are public documentation from AWS that provide transparency about AWS AI services:</p>

<ul>
<li><strong>Intended use cases</strong>: What the service is designed for</li>
<li><strong>Limitations</strong>: Known limitations and failure modes</li>
<li><strong>Design choices</strong>: How the model was built</li>
<li><strong>Best practices</strong>: Recommended usage patterns</li>
<li><strong>Fairness considerations</strong>: Known demographic performance differences</li>
</ul>

<p>Available for: Amazon Rekognition, Textract, Comprehend, Transcribe, etc.</p>

<h3 id="model-cards"><strong>5.2. Model Cards</strong></h3>

<p><strong>Model Cards</strong> (from SageMaker) are internal documentation you create for <strong>your own models</strong>:</p>

<ul>
<li>Model description and intended use</li>
<li>Training data details</li>
<li>Performance metrics across subgroups</li>
<li>Ethical considerations</li>
<li>Limitations and risks</li>
</ul>

<h3 id="transparency-practices"><strong>5.3. Transparency Best Practices</strong></h3>

<table>
<thead><tr><th>Practice</th><th>How</th></tr></thead>
<tbody>
<tr><td>Disclose AI usage</td><td>Tell users when they're interacting with AI</td></tr>
<tr><td>Source attribution</td><td>Cite sources in RAG applications</td></tr>
<tr><td>Confidence scores</td><td>Show model confidence to users</td></tr>
<tr><td>Limitations disclosure</td><td>Document what the model can't do</td></tr>
<tr><td>Watermarking</td><td>Mark AI-generated content (images, text)</td></tr>
</tbody>
</table>

<h2 id="toxicity"><strong>6. Toxicity & Harmful Content</strong></h2>

<h3 id="toxicity-types"><strong>Types of Harmful Content:</strong></h3>

<ul>
<li><strong>Hate speech</strong>: Content targeting protected groups</li>
<li><strong>Violence</strong>: Graphic or promoting violence</li>
<li><strong>Sexual content</strong>: Explicit or inappropriate</li>
<li><strong>Self-harm</strong>: Promoting self-harm or suicide</li>
<li><strong>Misinformation</strong>: Factually incorrect content presented as fact</li>
<li><strong>Prompt injection</strong>: Malicious prompts that override system instructions</li>
</ul>

<h3 id="toxicity-mitigation"><strong>Mitigation Strategies:</strong></h3>

<ol>
<li><strong>Content filters</strong>: Automated detection and blocking (Bedrock Guardrails)</li>
<li><strong>Human review</strong>: Human-in-the-loop for high-risk content</li>
<li><strong>Input sanitization</strong>: Validate and sanitize user inputs</li>
<li><strong>Output filtering</strong>: Check model outputs before showing to users</li>
<li><strong>Red teaming</strong>: Adversarial testing before deployment</li>
</ol>

<h2 id="practice-questions"><strong>7. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A hiring AI system consistently ranks male candidates higher than equally qualified female candidates. Which type of bias is MOST likely present?</p>
<ul>
<li>A) Measurement bias</li>
<li>B) Selection bias in training data ✓</li>
<li>C) Confirmation bias</li>
<li>D) Recall bias</li>
</ul>
<p><em>Explanation: If the training data contained historical hiring decisions that favored male candidates, the model would learn and reproduce that selection bias. The training data didn't represent the qualified population fairly.</em></p>

<p><strong>Q2:</strong> A bank is required by regulators to explain why each loan application was approved or denied. Which AWS service feature can provide per-prediction explanations?</p>
<ul>
<li>A) Amazon Bedrock Guardrails</li>
<li>B) Amazon SageMaker Clarify with SHAP values ✓</li>
<li>C) Amazon Comprehend sentiment analysis</li>
<li>D) AWS AI Service Cards</li>
</ul>
<p><em>Explanation: SageMaker Clarify computes SHAP values that show the contribution of each feature to individual predictions, providing the explainability required by regulators.</em></p>

<p><strong>Q3:</strong> Which AWS resource provides public documentation about the intended use cases, limitations, and fairness considerations of AWS AI services?</p>
<ul>
<li>A) SageMaker Model Cards</li>
<li>B) AWS AI Service Cards ✓</li>
<li>C) Amazon Bedrock Model Evaluation</li>
<li>D) AWS Trusted Advisor</li>
</ul>
<p><em>Explanation: AWS AI Service Cards are public documents that provide transparency about the design, limitations, and best practices for AWS AI services like Rekognition, Textract, and Comprehend. Model Cards are for your own custom models.</em></p>
