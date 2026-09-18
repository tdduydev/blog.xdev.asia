---
id: 019c9619-lt01-d2-l03
title: 'Bài 3: Generative AI & Foundation Models'
slug: bai-3-generative-ai-foundation-models
description: >-
  Generative AI là gì. Foundation Models: pre-training, fine-tuning.
  Types: text-to-text, text-to-image, text-to-code. Tokenization.
  Model parameters, inference, temperature, top-p, top-k.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: "Domain 2: Fundamentals of Generative AI (24%)"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'Luyện thi AWS Certified AI Practitioner (AIF-C01)'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai3-foundation-model-lifecycle.webp" alt="Foundation Model Lifecycle" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Foundation Model Lifecycle — Pre-training, Fine-tuning, RAG và Prompt Engineering</em></p>
</div>

<h2 id="overview"><strong>Tổng quan Domain 2</strong></h2>

<p>Domain 2 chiếm <strong>24% đề thi</strong> — đây là domain lớn thứ hai. Bạn cần hiểu rõ Generative AI, Foundation Models, và cách chúng khác biệt so với traditional ML.</p>

<h2 id="what-is-genai"><strong>1. What is Generative AI?</strong></h2>

<p><strong>Generative AI</strong> là nhánh của AI tập trung vào việc <strong>tạo nội dung mới</strong> (text, images, code, audio, video) dựa trên patterns học được từ training data.</p>

<h3 id="discriminative-vs-generative"><strong>Discriminative vs Generative AI</strong></h3>

<table>
<thead><tr><th>Aspect</th><th>Discriminative AI</th><th>Generative AI</th></tr></thead>
<tbody>
<tr><td><strong>What it does</strong></td><td>Classify / predict</td><td>Create / generate</td></tr>
<tr><td><strong>Output</strong></td><td>Label, category, number</td><td>New content (text, image, code)</td></tr>
<tr><td><strong>Example</strong></td><td>"Is this email spam?" → Yes/No</td><td>"Write an email about..." → New email</td></tr>
<tr><td><strong>Models</strong></td><td>Logistic Regression, SVM, CNN classifier</td><td>GPT, Claude, Stable Diffusion, DALL-E</td></tr>
</tbody>
</table>

<h3 id="genai-modalities"><strong>Generative AI Modalities</strong></h3>

<table>
<thead><tr><th>Input → Output</th><th>Examples</th><th>Models</th></tr></thead>
<tbody>
<tr><td><strong>Text → Text</strong></td><td>Chatbot, summarization, translation</td><td>GPT-4, Claude, Llama</td></tr>
<tr><td><strong>Text → Image</strong></td><td>Image generation from description</td><td>DALL-E, Stable Diffusion, Titan Image Generator</td></tr>
<tr><td><strong>Text → Code</strong></td><td>Code generation, debugging</td><td>CodeWhisperer, Copilot</td></tr>
<tr><td><strong>Text → Audio</strong></td><td>Speech synthesis, music generation</td><td>Amazon Polly (TTS)</td></tr>
<tr><td><strong>Image → Text</strong></td><td>Image captioning, visual Q&A</td><td>Claude (multi-modal), GPT-4V</td></tr>
<tr><td><strong>Audio → Text</strong></td><td>Transcription</td><td>Amazon Transcribe, Whisper</td></tr>
</tbody>
</table>

<h2 id="foundation-models"><strong>2. Foundation Models</strong></h2>

<p><strong>Foundation Model (FM)</strong> là model AI cực lớn, được <strong>pre-trained trên massive datasets</strong>, có thể adapt cho nhiều downstream tasks khác nhau.</p>

<h3 id="fm-characteristics"><strong>Key Characteristics</strong></h3>

<ul>
<li><strong>Large-scale pre-training</strong>: Trained on billions of data points (text from internet, books, code)</li>
<li><strong>General-purpose</strong>: Can handle multiple tasks without task-specific training</li>
<li><strong>Adaptable</strong>: Can be fine-tuned or prompted for specific use cases</li>
<li><strong>Expensive to train</strong>: Requires massive compute (GPU/TPU clusters)</li>
<li><strong>Accessible via API</strong>: Users don't need to train — use through APIs (Amazon Bedrock)</li>
</ul>

<h3 id="fm-lifecycle"><strong>Foundation Model Lifecycle</strong></h3>

<pre><code class="language-text">┌─────────────────┐     ┌──────────────┐     ┌──────────────┐
│ 1. Pre-training │────→│ 2. Fine-     │────→│ 3. Inference │
│ (Massive data,  │     │ tuning       │     │ (Use model   │
│  Billion params,│     │ (Adapt to    │     │  via API or  │
│  Very expensive)│     │  specific    │     │  endpoint)   │
│                 │     │  domain)     │     │              │
└─────────────────┘     └──────────────┘     └──────────────┘
     Model Provider          You/Org              Users
   (Anthropic, Meta,                         (Applications)
    Amazon, etc.)
</code></pre>

<h2 id="tokenization"><strong>3. Tokenization</strong></h2>

<p><strong>Tokenization</strong> là quá trình chia text thành các đơn vị nhỏ (<strong>tokens</strong>) mà model hiểu được.</p>

<pre><code class="language-text">Input:  "Machine learning is amazing!"
Tokens: ["Machine", " learning", " is", " amazing", "!"]
         token_1    token_2      token_3  token_4    token_5

OR (subword tokenization):
Tokens: ["Mach", "ine", " learn", "ing", " is", " amaz", "ing", "!"]
</code></pre>

<h3 id="token-key-points"><strong>Key Concepts for Exam:</strong></h3>

<ul>
<li><strong>Token ≠ word</strong>: A token can be part of a word, a whole word, or punctuation</li>
<li><strong>Context window</strong>: Maximum number of tokens a model can process at once (input + output)</li>
<li><strong>Token limit</strong>: Determines how much text the model can "see" and generate</li>
<li><strong>Pricing</strong>: API calls are typically priced per token (input tokens + output tokens)</li>
</ul>

<blockquote>
<p><strong>Exam tip:</strong> Context window size matters. Larger context = can process longer documents. But costs more and may be slower.</p>
</blockquote>

<h2 id="model-parameters"><strong>4. Model Parameters & Inference Settings</strong></h2>

<h3 id="model-params"><strong>4.1. Model Parameters (Learned during training)</strong></h3>

<ul>
<li><strong>Parameters</strong> = weights and biases trong neural network</li>
<li>GPT-4: ~1.7 trillion parameters, Claude: undisclosed, Llama 3: 8B/70B/405B</li>
<li>More parameters → generally more capable, but more expensive</li>
</ul>

<h3 id="inference-params"><strong>4.2. Inference Parameters (Set by user)</strong></h3>

<p>Khi gọi model, bạn có thể điều chỉnh các <strong>inference parameters</strong>:</p>

<table>
<thead><tr><th>Parameter</th><th>Range</th><th>What it controls</th></tr></thead>
<tbody>
<tr><td><strong>Temperature</strong></td><td>0.0 → 1.0+</td><td>Randomness/creativity. Low = deterministic, focused. High = creative, diverse.</td></tr>
<tr><td><strong>Top-p (Nucleus)</strong></td><td>0.0 → 1.0</td><td>Cumulative probability threshold. Lower = more focused vocabulary.</td></tr>
<tr><td><strong>Top-k</strong></td><td>1 → ∞</td><td>Number of top tokens to consider. Lower = more predictable.</td></tr>
<tr><td><strong>Max tokens</strong></td><td>1 → limit</td><td>Maximum length of generated output.</td></tr>
<tr><td><strong>Stop sequences</strong></td><td>strings</td><td>Text that tells model to stop generating.</td></tr>
</tbody>
</table>

<h3 id="temperature-guide"><strong>Temperature Guide for Exam</strong></h3>

<pre><code class="language-text">Temperature = 0  →  Most deterministic (factual Q&A, code, data extraction)
Temperature = 0.3 → Slightly creative (business writing, summaries)
Temperature = 0.7 → Creative (stories, brainstorming, marketing copy)
Temperature = 1.0+ → Very random (poetry, creative writing — may hallucinate more)
</code></pre>

<blockquote>
<p><strong>Exam tip:</strong> "A company needs consistent, accurate answers for customer FAQ" → use <strong>low temperature</strong>. "A company wants creative marketing slogans" → use <strong>high temperature</strong>.</p>
</blockquote>

<h2 id="hallucination"><strong>5. Hallucination</strong></h2>

<p><strong>Hallucination</strong> là khi model tạo ra output <strong>confident nhưng incorrect</strong> — bịa ra facts, citations, hoặc thông tin không tồn tại.</p>

<h3 id="hallucination-causes"><strong>Causes:</strong></h3>
<ul>
<li>Training data gaps or outdated information</li>
<li>Model doesn't truly "know" facts — it predicts likely next tokens</li>
<li>Ambiguous or too-open prompts</li>
<li>High temperature settings</li>
</ul>

<h3 id="hallucination-mitigation"><strong>Mitigation Strategies:</strong></h3>
<table>
<thead><tr><th>Strategy</th><th>How it helps</th></tr></thead>
<tbody>
<tr><td><strong>RAG</strong> (Retrieval-Augmented Generation)</td><td>Ground responses in actual data from knowledge base</td></tr>
<tr><td><strong>Lower temperature</strong></td><td>Reduce randomness in generation</td></tr>
<tr><td><strong>Guardrails</strong></td><td>Filter/validate outputs (Amazon Bedrock Guardrails)</td></tr>
<tr><td><strong>Better prompts</strong></td><td>"Only answer based on provided context" / "Say I don't know if unsure"</td></tr>
<tr><td><strong>Fine-tuning</strong></td><td>Train model on domain-specific accurate data</td></tr>
<tr><td><strong>Human review</strong></td><td>Human-in-the-loop validation</td></tr>
</tbody>
</table>

<h2 id="fm-on-aws"><strong>6. Foundation Models on AWS (Amazon Bedrock)</strong></h2>

<p>Amazon Bedrock cung cấp access đến nhiều Foundation Models từ các providers:</p>

<table>
<thead><tr><th>Provider</th><th>Models</th><th>Strengths</th></tr></thead>
<tbody>
<tr><td><strong>Anthropic</strong></td><td>Claude 3 (Haiku, Sonnet, Opus)</td><td>Reasoning, safety, long context</td></tr>
<tr><td><strong>Meta</strong></td><td>Llama 3</td><td>Open-source, versatile</td></tr>
<tr><td><strong>Amazon</strong></td><td>Titan (Text, Embeddings, Image)</td><td>AWS-native, embeddings for RAG</td></tr>
<tr><td><strong>Mistral AI</strong></td><td>Mistral, Mixtral</td><td>Efficient, fast inference</td></tr>
<tr><td><strong>Stability AI</strong></td><td>Stable Diffusion</td><td>Image generation</td></tr>
<tr><td><strong>Cohere</strong></td><td>Command, Embed</td><td>Enterprise NLP, embeddings</td></tr>
<tr><td><strong>AI21 Labs</strong></td><td>Jurassic</td><td>Text generation</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>7. Practice Questions</strong></h2>

<p><strong>Q1:</strong> What is the PRIMARY advantage of Foundation Models compared to traditional ML models?</p>
<ul>
<li>A) They are smaller and faster</li>
<li>B) They can be adapted to multiple downstream tasks without task-specific training ✓</li>
<li>C) They never produce incorrect outputs</li>
<li>D) They don't require any compute resources</li>
</ul>
<p><em>Explanation: Foundation Models are pre-trained on massive datasets and can be adapted (via prompting or fine-tuning) for many different tasks. They are large, can hallucinate, and still require compute.</em></p>

<p><strong>Q2:</strong> A company uses a generative AI model and notices it sometimes generates plausible but factually incorrect information. What is this phenomenon called?</p>
<ul>
<li>A) Overfitting</li>
<li>B) Data drift</li>
<li>C) Hallucination ✓</li>
<li>D) Bias</li>
</ul>
<p><em>Explanation: Hallucination is when a generative AI model produces confident but factually incorrect outputs.</em></p>

<p><strong>Q3:</strong> A developer wants to ensure their generative AI chatbot provides consistent, factual answers with minimal creativity. Which inference parameter should they adjust?</p>
<ul>
<li>A) Set max tokens to a very high value</li>
<li>B) Set temperature close to 0 ✓</li>
<li>C) Set temperature close to 1</li>
<li>D) Increase the top-k value</li>
</ul>
<p><em>Explanation: Low temperature makes the model more deterministic and focused, reducing creativity and randomness in responses.</em></p>
