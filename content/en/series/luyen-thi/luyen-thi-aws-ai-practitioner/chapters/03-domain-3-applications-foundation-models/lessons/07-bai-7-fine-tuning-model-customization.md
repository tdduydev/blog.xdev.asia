---
id: 019c9619-lt01-d3-l07
title: 'Lesson 7: Fine-tuning & Model Customization'
slug: bai-7-fine-tuning-model-customization
description: >-
  Pre-training vs Fine-tuning vs RLHF. PEFT & LoRA.
  Continued Pre-training. Amazon Bedrock Custom Models.
  Training data preparation, evaluation, deployment.
duration_minutes: 50
is_free: true
video_url: null
sort_order: 3
section_title: "Domain 3: Applications of Foundation Models (28%)"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS Certified AI Practitioner (AIF-C01) Exam Prep'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai7-finetuning-spectrum.webp" alt="Model Customization Spectrum" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Model Customization Spectrum: from Prompt Engineering to Pre-training from Scratch</em></p>
</div>

<h2 id="customization-spectrum"><strong>1. Model Customization Spectrum</strong></h2>

<p>There are many ways to customize FM behavior, from simple to complex:</p>

<pre><code class="language-text">Least Effort                                    Most Effort
──────────────────────────────────────────────────────────
Prompt       Few-shot      RAG       Fine-      Continued    Pre-
Engineering  Prompting               tuning     Pre-training training
──────────────────────────────────────────────────────────
No training                   ←                 →    Full training
$ cheapest                    ←                 →    $$$$ most expensive
Minutes                       ←                 →    Weeks/Months
</code></pre>

<h2 id="fine-tuning"><strong>2. Fine-tuning</strong></h2>

<p><strong>Fine-tuning</strong> = further training an existing FM on <strong>your specific dataset</strong> to improve performance on your domain/task.</p>

<h3 id="when-fine-tune"><strong>2.1. When to Fine-tune?</strong></h3>

<table>
<thead><tr><th>Fine-tune When...</th><th>DON'T Fine-tune When...</th></tr></thead>
<tbody>
<tr><td>Need specific style, tone, or format</td><td>Just need factual Q&A (use RAG)</td></tr>
<tr><td>Domain-specific language patterns</td><td>Task works well with prompting</td></tr>
<tr><td>Improve accuracy on specific tasks</td><td>Don't have labeled training data</td></tr>
<tr><td>Reduce prompt size (internalize instructions)</td><td>Data changes frequently (use RAG)</td></tr>
<tr><td>Need consistent output format</td><td>Budget is limited</td></tr>
</tbody>
</table>

<h3 id="fine-tune-types"><strong>2.2. Types of Fine-tuning</strong></h3>

<table>
<thead><tr><th>Type</th><th>What</th><th>Data Format</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>Instruction fine-tuning</strong></td><td>Train on prompt-response pairs</td><td>{"prompt": "...", "completion": "..."}</td><td>Follow instructions better</td></tr>
<tr><td><strong>Domain adaptation</strong></td><td>Train on domain text</td><td>Domain documents (medical, legal)</td><td>Learn domain terminology</td></tr>
<tr><td><strong>Task-specific</strong></td><td>Train on specific task examples</td><td>Task input-output pairs</td><td>Classification, extraction</td></tr>
</tbody>
</table>

<h2 id="peft"><strong>3. PEFT & LoRA</strong></h2>

<h3 id="peft-overview"><strong>3.1. Parameter-Efficient Fine-Tuning (PEFT)</strong></h3>

<p>Full fine-tuning updates <strong>ALL model parameters</strong> — expensive and needs lots of GPU memory. PEFT methods update only a <strong>small subset of parameters</strong>.</p>

<pre><code class="language-text">Full Fine-tuning:
  Model: 7 billion parameters
  Updated: 7 billion parameters (100%)
  GPU Memory: Very high
  Cost: $$$$

PEFT (LoRA):
  Model: 7 billion parameters
  Updated: ~10 million parameters (0.1%)
  GPU Memory: Much lower
  Cost: $$
</code></pre>

<h3 id="lora"><strong>3.2. LoRA (Low-Rank Adaptation)</strong></h3>

<p>LoRA adds <strong>small trainable matrices</strong> to model layers instead of updating all weights:</p>

<ul>
<li>Freezes original model weights</li>
<li>Adds small "adapter" matrices (rank decomposition)</li>
<li>Only trains these small adapters</li>
<li>At inference: merge adapters with original weights</li>
</ul>

<blockquote>
<p><strong>Exam tip:</strong> "Which technique reduces the cost of fine-tuning while maintaining quality?" → <strong>LoRA / PEFT</strong>. Key concept: train a small percentage of parameters instead of all.</p>
</blockquote>

<h2 id="continued-pretraining"><strong>4. Continued Pre-training</strong></h2>

<p><strong>Continued Pre-training</strong> trains the FM on <strong>large amounts of unlabeled domain data</strong> — teaching the model new vocabulary and concepts <em>before</em> fine-tuning on task-specific data.</p>

<pre><code class="language-text">Workflow:
Base FM → Continued Pre-training → Fine-tuning → Evaluation
           (domain corpus,           (labeled        (test on
            unlabeled)                task data)       holdout)

Example:
Base Claude → Train on 100K medical papers → Fine-tune on
              (continued pre-training)       medical Q&A pairs
              Learns: medical terminology,   Learns: how to
              drug names, procedures         answer clinical questions
</code></pre>

<h3 id="cpt-vs-ft"><strong>Continued Pre-training vs Fine-tuning:</strong></h3>

<table>
<thead><tr><th>Aspect</th><th>Continued Pre-training</th><th>Fine-tuning</th></tr></thead>
<tbody>
<tr><td><strong>Data</strong></td><td>Large, unlabeled domain text</td><td>Smaller, labeled task data</td></tr>
<tr><td><strong>Goal</strong></td><td>Learn domain knowledge</td><td>Learn task-specific behavior</td></tr>
<tr><td><strong>Cost</strong></td><td>More expensive (larger data)</td><td>Less expensive</td></tr>
<tr><td><strong>When</strong></td><td>Model lacks domain vocabulary</td><td>Model needs to do specific tasks</td></tr>
</tbody>
</table>

<h2 id="rlhf"><strong>5. RLHF (Reinforcement Learning from Human Feedback)</strong></h2>

<p>RLHF is used to <strong>align</strong> model outputs with human preferences — making outputs more helpful, truthful, and harmless.</p>

<pre><code class="language-text">RLHF Pipeline:
1. Collect human feedback    2. Train reward model    3. Optimize with RL
   "Which response is           Learns: what humans      FM generates →
    better? A or B?"             prefer                   reward model scores →
                                                          update FM weights
</code></pre>

<p>RLHF is mainly done by <strong>FM providers</strong> (Anthropic, Meta, Amazon) — not typically by end users. But you should know the concept for the exam.</p>

<h2 id="bedrock-custom"><strong>6. Amazon Bedrock Custom Models</strong></h2>

<p>Bedrock offers two customization approaches:</p>

<h3 id="bedrock-ft"><strong>6.1. Fine-tuning in Bedrock</strong></h3>

<table>
<thead><tr><th>Feature</th><th>Detail</th></tr></thead>
<tbody>
<tr><td><strong>Supported models</strong></td><td>Amazon Titan, Meta Llama, Cohere</td></tr>
<tr><td><strong>Data format</strong></td><td>JSONL with prompt-completion pairs</td></tr>
<tr><td><strong>Data location</strong></td><td>Amazon S3</td></tr>
<tr><td><strong>Output</strong></td><td>Custom model version in Bedrock</td></tr>
<tr><td><strong>Provisioned Throughput</strong></td><td>Required to use fine-tuned model</td></tr>
</tbody>
</table>

<h3 id="bedrock-cpt"><strong>6.2. Continued Pre-training in Bedrock</strong></h3>

<table>
<thead><tr><th>Feature</th><th>Detail</th></tr></thead>
<tbody>
<tr><td><strong>Supported models</strong></td><td>Amazon Titan, Meta Llama, Cohere</td></tr>
<tr><td><strong>Data format</strong></td><td>Plain text files (unlabeled)</td></tr>
<tr><td><strong>Use case</strong></td><td>Domain adaptation before fine-tuning</td></tr>
</tbody>
</table>

<h3 id="bedrock-training-data"><strong>6.3. Training Data Preparation</strong></h3>

<pre><code class="language-json">// Fine-tuning data format (JSONL):
{"prompt": "What is the recommended dosage of Drug X?", "completion": "The recommended dosage of Drug X is 500mg twice daily for adults."}
{"prompt": "List side effects of Drug X.", "completion": "Common side effects include headache, nausea, and dizziness."}
</code></pre>

<h3 id="bedrock-model-eval"><strong>6.4. Model Evaluation in Bedrock</strong></h3>

<p>Amazon Bedrock Model Evaluation allows you to compare models:</p>

<ul>
<li><strong>Automatic evaluation</strong>: Built-in metrics (accuracy, robustness, toxicity)</li>
<li><strong>Human evaluation</strong>: Human reviewers rate model outputs</li>
<li><strong>Compare models</strong>: Side-by-side comparison of different FMs</li>
</ul>

<blockquote>
<p><strong>Exam tip:</strong> "How to compare the quality of two foundation models for a specific use case?" → <strong>Amazon Bedrock Model Evaluation</strong>. Supports both automatic metrics and human evaluation.</p>
</blockquote>

<h2 id="data-prep"><strong>7. Training Data Best Practices</strong></h2>

<table>
<thead><tr><th>Practice</th><th>Why</th></tr></thead>
<tbody>
<tr><td><strong>High-quality data</strong></td><td>Garbage in = garbage out</td></tr>
<tr><td><strong>Diverse examples</strong></td><td>Prevent overfitting to narrow patterns</td></tr>
<tr><td><strong>Balanced classes</strong></td><td>Avoid bias toward majority class</td></tr>
<tr><td><strong>Clean data</strong></td><td>Remove duplicates, errors, PII</td></tr>
<tr><td><strong>Sufficient quantity</strong></td><td>Typically 1000+ for fine-tuning</td></tr>
<tr><td><strong>Train/validation split</strong></td><td>Evaluate on unseen data</td></tr>
<tr><td><strong>Format consistency</strong></td><td>Same structure for all examples</td></tr>
</tbody>
</table>

<h2 id="summary-table"><strong>8. Summary: When to Use What</strong></h2>

<table>
<thead><tr><th>Scenario</th><th>Best Approach</th></tr></thead>
<tbody>
<tr><td>Simple task, model already good at it</td><td>Prompt Engineering</td></tr>
<tr><td>Need model to follow a specific pattern</td><td>Few-shot Prompting</td></tr>
<tr><td>Need answers from company documents</td><td>RAG</td></tr>
<tr><td>Need specific style/tone/format</td><td>Fine-tuning</td></tr>
<tr><td>Model doesn't know domain vocabulary</td><td>Continued Pre-training + Fine-tuning</td></tr>
<tr><td>Align with human preferences</td><td>RLHF (done by FM providers)</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>9. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A legal firm wants their AI assistant to generate legal documents in a specific firm-approved writing style. They have 5,000 examples of approved documents. Which customization approach is MOST appropriate?</p>
<ul>
<li>A) RAG with a knowledge base</li>
<li>B) Zero-shot prompting</li>
<li>C) Fine-tuning on the approved document examples ✓</li>
<li>D) Continued pre-training on legal textbooks</li>
</ul>
<p><em>Explanation: Fine-tuning is ideal for teaching a model a specific writing style with labeled examples. RAG is for retrieving information, not learning styles. Continued pre-training would teach legal concepts but not the firm's specific style.</em></p>

<p><strong>Q2:</strong> Which technique allows fine-tuning a large language model while updating only a small fraction of the model's parameters?</p>
<ul>
<li>A) Full fine-tuning</li>
<li>B) LoRA (Low-Rank Adaptation) ✓</li>
<li>C) Continued pre-training</li>
<li>D) RLHF</li>
</ul>
<p><em>Explanation: LoRA is a PEFT (Parameter-Efficient Fine-Tuning) method that adds small trainable adapter matrices while freezing the original model weights — typically updating less than 1% of total parameters.</em></p>

<p><strong>Q3:</strong> A company fine-tuned a foundation model, but the model performs well on training data and poorly on new data. What is this problem called?</p>
<ul>
<li>A) Underfitting</li>
<li>B) Overfitting ✓</li>
<li>C) High bias</li>
<li>D) Data drift</li>
</ul>
<p><em>Explanation: Overfitting occurs when a model memorizes training data instead of learning general patterns. Solutions include: more training data, regularization, lower learning rate, early stopping, or data augmentation.</em></p>
