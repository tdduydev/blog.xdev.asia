---
id: 019c9619-lt01-d4-l10
title: 'Lesson 10: AWS Responsible AI Tools — Clarify, A2I & Guardrails'
slug: bai-10-aws-responsible-ai-tools
description: >-
  Amazon SageMaker Clarify (bias detection, explainability).
  Amazon Augmented AI (A2I) — Human-in-the-loop.
  Amazon Bedrock Guardrails deep dive. Content moderation.
duration_minutes: 50
is_free: true
video_url: null
sort_order: 2
section_title: "Domain 4: Guidelines for Responsible AI (14%)"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS Certified AI Practitioner (AIF-C01) Exam Prep'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai10-clarify-a2i-guardrails.webp" alt="AWS Responsible AI Tools" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>AWS Responsible AI Tools: SageMaker Clarify, Amazon A2I, and Bedrock Guardrails</em></p>
</div>

<h2 id="sagemaker-clarify"><strong>1. Amazon SageMaker Clarify</strong></h2>

<p><strong>SageMaker Clarify</strong> helps detect bias in data and models, and provides model explainability — the go-to AWS service for Responsible AI.</p>

<h3 id="clarify-capabilities"><strong>1.1. Three Core Capabilities</strong></h3>

<table>
<thead><tr><th>Capability</th><th>When</th><th>What it does</th></tr></thead>
<tbody>
<tr><td><strong>Pre-training bias detection</strong></td><td>Before training</td><td>Detects imbalances in training data across demographic groups</td></tr>
<tr><td><strong>Post-training bias detection</strong></td><td>After training</td><td>Detects bias in model predictions (e.g., different accuracy across groups)</td></tr>
<tr><td><strong>Explainability (SHAP)</strong></td><td>After training</td><td>Shows feature contributions to each prediction</td></tr>
</tbody>
</table>

<h3 id="clarify-bias-metrics"><strong>1.2. Key Bias Metrics in Clarify</strong></h3>

<table>
<thead><tr><th>Metric</th><th>Pre/Post training</th><th>What it measures</th></tr></thead>
<tbody>
<tr><td><strong>Class Imbalance (CI)</strong></td><td>Pre-training</td><td>Distribution of classes across groups</td></tr>
<tr><td><strong>Difference in Proportions (DPL)</strong></td><td>Pre-training</td><td>Proportion of positive labels across groups</td></tr>
<tr><td><strong>KL Divergence</strong></td><td>Pre-training</td><td>Distribution divergence between groups</td></tr>
<tr><td><strong>Disparate Impact (DI)</strong></td><td>Post-training</td><td>Ratio of positive predictions across groups</td></tr>
<tr><td><strong>Accuracy Difference (AD)</strong></td><td>Post-training</td><td>Accuracy gap between groups</td></tr>
<tr><td><strong>Treatment Equality (TE)</strong></td><td>Post-training</td><td>Ratio of FP to FN across groups</td></tr>
</tbody>
</table>

<h3 id="clarify-workflow"><strong>1.3. Clarify Workflow</strong></h3>

<pre><code class="language-text">1. Configure Clarify Job
   ├── Specify sensitive attributes (gender, age, race)
   ├── Define facets (groups to compare)
   └── Choose bias metrics to compute

2. Run Pre-training Analysis
   ├── Upload training dataset
   └── Get bias report on data distribution

3. Train Model

4. Run Post-training Analysis
   ├── Compare predictions across groups
   └── Get SHAP values for explainability

5. Monitor with SageMaker Model Monitor
   └── Detect bias drift over time in production
</code></pre>

<blockquote>
<p><strong>Exam tip:</strong> "Which AWS service can detect if a model makes more errors for one racial group vs another?" → <strong>SageMaker Clarify</strong> (post-training bias detection).</p>
</blockquote>

<h2 id="a2i"><strong>2. Amazon Augmented AI (Amazon A2I)</strong></h2>

<p><strong>Amazon A2I</strong> provides <strong>human-in-the-loop (HITL)</strong> workflows for AI predictions — especially important when model confidence is low or for high-stakes decisions.</p>

<h3 id="a2i-how"><strong>2.1. How A2I Works</strong></h3>

<pre><code class="language-text">AI Prediction Flow with A2I:
                                          ┌─────────────┐
User Request → AI Model → Confident?  YES → Return result
                              │
                              NO (below threshold)
                              ↓
                     ┌──────────────────┐
                     │  Create Human    │
                     │  Review Task     │
                     │  (A2I Workflow)   │
                     └────────┬─────────┘
                              ↓
                     ┌──────────────────┐
                     │  Human Reviewer  │  ← AWS Mechanical Turk
                     │  Reviews &       │  ← Private workforce
                     │  Corrects        │  ← Third-party vendor
                     └────────┬─────────┘
                              ↓
                     Return human-verified result
</code></pre>

<h3 id="a2i-components"><strong>2.2. A2I Components</strong></h3>

<table>
<thead><tr><th>Component</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td><strong>Human review workflow</strong></td><td>Defines when and how to trigger human review</td></tr>
<tr><td><strong>Worker task template</strong></td><td>UI for human reviewers to make decisions</td></tr>
<tr><td><strong>Workforce</strong></td><td>Who does the review (private, Mechanical Turk, vendor)</td></tr>
<tr><td><strong>Activation conditions</strong></td><td>Confidence threshold triggers (e.g., &lt; 95%)</td></tr>
</tbody>
</table>

<h3 id="a2i-built-in"><strong>2.3. Built-in A2I Integrations</strong></h3>

<table>
<thead><tr><th>Service</th><th>A2I Use Case</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Textract</strong></td><td>Review low-confidence document extractions</td></tr>
<tr><td><strong>Amazon Rekognition</strong></td><td>Review low-confidence content moderation</td></tr>
<tr><td><strong>Custom ML models</strong></td><td>Any SageMaker model can trigger A2I</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> "A healthcare company needs a human to review AI diagnoses when the model is less than 90% confident" → <strong>Amazon A2I</strong> with activation condition set to confidence &lt; 90%.</p>
</blockquote>

<h2 id="guardrails-deep"><strong>3. Amazon Bedrock Guardrails — Deep Dive</strong></h2>

<h3 id="guardrails-policies"><strong>3.1. Guardrail Policies</strong></h3>

<table>
<thead><tr><th>Policy</th><th>How it works</th><th>Configuration</th></tr></thead>
<tbody>
<tr><td><strong>Content filters</strong></td><td>Block by category + severity</td><td>None / Low / Medium / High for each category (Hate, Insults, Sexual, Violence, Misconduct)</td></tr>
<tr><td><strong>Denied topics</strong></td><td>Define topics to block</td><td>Natural language description + sample phrases</td></tr>
<tr><td><strong>Word filters</strong></td><td>Block specific words</td><td>Custom word/phrase list + profanity filter toggle</td></tr>
<tr><td><strong>Sensitive info (PII)</strong></td><td>Detect PII with action</td><td>BLOCK or ANONYMIZE for each PII type (SSN, email, phone, name, address, ...)</td></tr>
<tr><td><strong>Contextual grounding</strong></td><td>Check if answer is grounded</td><td>Grounding threshold (0-1) + relevance threshold</td></tr>
</tbody>
</table>

<h3 id="guardrails-flow"><strong>3.2. How Guardrails Process Requests</strong></h3>

<pre><code class="language-text">User Input
    ↓
[INPUT GUARDRAILS]
    ├── Content filter check
    ├── Denied topic check
    ├── Word filter check
    ├── PII detection → BLOCK or ANONYMIZE
    ↓ (if passes all checks)
Foundation Model generates response
    ↓
[OUTPUT GUARDRAILS]
    ├── Content filter check
    ├── Denied topic check
    ├── Word filter check
    ├── PII detection → BLOCK or ANONYMIZE
    ├── Contextual grounding check
    ↓ (if passes all checks)
Response returned to user

If blocked → Return configured "blocked" message
</code></pre>

<h3 id="guardrails-vs-system"><strong>3.3. Guardrails vs System Prompts</strong></h3>

<table>
<thead><tr><th>Aspect</th><th>System Prompt</th><th>Guardrails</th></tr></thead>
<tbody>
<tr><td><strong>Enforcement</strong></td><td>Soft — model may ignore</td><td>Hard — enforced by the platform</td></tr>
<tr><td><strong>Bypass risk</strong></td><td>Can be bypassed via prompt injection</td><td>Cannot be bypassed by prompts</td></tr>
<tr><td><strong>PII handling</strong></td><td>Model asked to not output PII</td><td>Programmatic detection & redaction</td></tr>
<tr><td><strong>Auditability</strong></td><td>Limited</td><td>Full logging and metrics</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> "A company needs to GUARANTEE that PII is never in model responses" → <strong>Bedrock Guardrails</strong> (not system prompts, which can be bypassed).</p>
</blockquote>

<h2 id="content-moderation"><strong>4. Content Moderation on AWS</strong></h2>

<table>
<thead><tr><th>Service</th><th>Content Type</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Rekognition</strong></td><td>Images & Video</td><td>Detect inappropriate content, faces, text</td></tr>
<tr><td><strong>Amazon Comprehend</strong></td><td>Text</td><td>Toxicity detection, sentiment analysis</td></tr>
<tr><td><strong>Bedrock Guardrails</strong></td><td>FM input/output</td><td>Filter harmful content in GenAI apps</td></tr>
<tr><td><strong>Amazon A2I</strong></td><td>Any</td><td>Human review for edge cases</td></tr>
</tbody>
</table>

<h2 id="governance"><strong>5. AI Governance</strong></h2>

<h3 id="governance-framework"><strong>5.1. Governance Framework</strong></h3>

<table>
<thead><tr><th>Area</th><th>What to implement</th></tr></thead>
<tbody>
<tr><td><strong>Policy</strong></td><td>Organization-wide AI ethics guidelines</td></tr>
<tr><td><strong>Risk assessment</strong></td><td>Evaluate risks before deploying AI systems</td></tr>
<tr><td><strong>Monitoring</strong></td><td>Continuous monitoring for bias, performance drift</td></tr>
<tr><td><strong>Audit trail</strong></td><td>Log all model decisions for accountability</td></tr>
<tr><td><strong>Human oversight</strong></td><td>Human-in-the-loop for high-stakes decisions</td></tr>
<tr><td><strong>Documentation</strong></td><td>Model cards, AI Service Cards</td></tr>
</tbody>
</table>

<h3 id="sagemaker-governance"><strong>5.2. SageMaker ML Governance</strong></h3>

<ul>
<li><strong>SageMaker Model Cards</strong>: Document model details and intended use</li>
<li><strong>SageMaker Model Dashboard</strong>: Centralized view of all model status</li>
<li><strong>SageMaker Model Monitor</strong>: Detect data drift, model quality degradation</li>
<li><strong>SageMaker Role Manager</strong>: Fine-grained access control for ML</li>
</ul>

<h2 id="practice-questions"><strong>6. Practice Questions</strong></h2>

<p><strong>Q1:</strong> An insurance company wants to ensure their claim approval model treats customers of all ages fairly. Which AWS service should they use to detect age-based bias in the model's predictions?</p>
<ul>
<li>A) Amazon Rekognition</li>
<li>B) Amazon SageMaker Clarify ✓</li>
<li>C) Amazon Bedrock Guardrails</li>
<li>D) Amazon Comprehend</li>
</ul>
<p><em>Explanation: SageMaker Clarify can run post-training bias analysis comparing model predictions across age groups, using metrics like Disparate Impact and Accuracy Difference.</em></p>

<p><strong>Q2:</strong> A document processing application using Amazon Textract needs human review when the extracted data has low confidence. Which AWS service provides this capability?</p>
<ul>
<li>A) Amazon SageMaker Ground Truth</li>
<li>B) Amazon Augmented AI (A2I) ✓</li>
<li>C) Amazon Mechanical Turk directly</li>
<li>D) Amazon Bedrock Agents</li>
</ul>
<p><em>Explanation: Amazon A2I has built-in integration with Amazon Textract and can automatically trigger human review workflows when extraction confidence falls below a defined threshold.</em></p>

<p><strong>Q3:</strong> A chatbot must NEVER reveal customer credit card numbers in its responses, even if the data exists in the knowledge base. Which approach provides the STRONGEST guarantee?</p>
<ul>
<li>A) Add "never output credit card numbers" to the system prompt</li>
<li>B) Fine-tune the model to not output PII</li>
<li>C) Use Amazon Bedrock Guardrails with PII filters set to BLOCK ✓</li>
<li>D) Remove credit card numbers from the knowledge base</li>
</ul>
<p><em>Explanation: Bedrock Guardrails with PII filters provide programmatic detection and blocking of credit card numbers in both input and output — this cannot be bypassed by prompt injection, unlike system prompts.</em></p>
