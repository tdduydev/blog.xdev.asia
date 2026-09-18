---
id: 019c9619-lt01-d2-l04
title: 'Bài 4: LLMs, Transformers & Multi-modal Models'
slug: bai-4-llm-transformers-multimodal
description: >-
  Transformer architecture: attention mechanism, self-attention.
  GPT (decoder-only), BERT (encoder-only), T5 (encoder-decoder).
  Multi-modal models. Hallucination: causes and mitigation.
  Embeddings và vector representations.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 2
section_title: "Domain 2: Fundamentals of Generative AI (24%)"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'Luyện thi AWS Certified AI Practitioner (AIF-C01)'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai4-transformer-architecture.webp" alt="Transformer Architecture" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Transformer Architecture — Encoder stack, Decoder stack và các biến thể BERT/GPT/T5</em></p>
</div>

<h2 id="transformer"><strong>1. Transformer Architecture</strong></h2>

<p>Transformer là kiến trúc neural network đã <strong>cách mạng hoá NLP</strong>, được giới thiệu trong paper "Attention Is All You Need" (2017). Hầu hết LLMs hiện tại đều dựa trên Transformer.</p>

<h3 id="attention"><strong>1.1. Self-Attention Mechanism</strong></h3>

<p>Self-attention cho phép model xem xét <strong>mối quan hệ giữa tất cả các từ</strong> trong input, bất kể khoảng cách.</p>

<pre><code class="language-text">Input: "The cat sat on the mat because it was tired"

Self-attention answers: What does "it" refer to?
→ Attends to "cat" (high attention score)
→ Not "mat" (low attention score)

Traditional RNN would struggle with this long-range dependency.
</code></pre>

<h3 id="encoder-decoder"><strong>1.2. Encoder-Decoder Architecture</strong></h3>

<pre><code class="language-text">Original Transformer:
┌──────────────────────────┐
│        ENCODER           │  ← Understands input
│  (Self-Attention +       │
│   Feed-Forward layers)   │
├──────────────────────────┤
│        DECODER           │  ← Generates output
│  (Masked Self-Attention +│
│   Cross-Attention +      │
│   Feed-Forward layers)   │
└──────────────────────────┘
</code></pre>

<h3 id="transformer-types"><strong>1.3. Three Types of Transformers</strong></h3>

<table>
<thead><tr><th>Type</th><th>Architecture</th><th>Best For</th><th>Models</th></tr></thead>
<tbody>
<tr><td><strong>Encoder-only</strong></td><td>Encoder</td><td>Understanding text (classification, NER, sentiment)</td><td>BERT, RoBERTa, DistilBERT</td></tr>
<tr><td><strong>Decoder-only</strong></td><td>Decoder</td><td>Generating text (chatbot, content creation)</td><td>GPT-4, Claude, Llama</td></tr>
<tr><td><strong>Encoder-Decoder</strong></td><td>Both</td><td>Sequence-to-sequence (translation, summarization)</td><td>T5, BART</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> "Which architecture is best for text generation?" → <strong>Decoder-only</strong> (GPT, Claude). "Which architecture is best for text classification?" → <strong>Encoder-only</strong> (BERT).</p>
</blockquote>

<h2 id="llm"><strong>2. Large Language Models (LLMs)</strong></h2>

<p>LLMs là Foundation Models specifically для text — trained on massive text corpora to understand and generate human language.</p>

<h3 id="llm-capabilities"><strong>2.1. LLM Capabilities</strong></h3>

<table>
<thead><tr><th>Capability</th><th>Description</th><th>Example</th></tr></thead>
<tbody>
<tr><td><strong>Text Generation</strong></td><td>Create new text content</td><td>Articles, emails, stories</td></tr>
<tr><td><strong>Summarization</strong></td><td>Condense long text</td><td>Document summaries</td></tr>
<tr><td><strong>Translation</strong></td><td>Convert between languages</td><td>English → Vietnamese</td></tr>
<tr><td><strong>Q&A</strong></td><td>Answer questions</td><td>Customer support, FAQ</td></tr>
<tr><td><strong>Code Generation</strong></td><td>Write and explain code</td><td>Amazon Q Developer</td></tr>
<tr><td><strong>Text Classification</strong></td><td>Categorize text</td><td>Sentiment analysis</td></tr>
<tr><td><strong>Reasoning</strong></td><td>Logical analysis</td><td>Math problems, step-by-step reasoning</td></tr>
</tbody>
</table>

<h3 id="llm-limitations"><strong>2.2. LLM Limitations</strong></h3>

<ul>
<li><strong>Knowledge cutoff</strong>: Doesn't know events after training data cutoff date</li>
<li><strong>Hallucination</strong>: Can generate false information confidently</li>
<li><strong>Context window limit</strong>: Can't process unlimited text</li>
<li><strong>No real-time data</strong>: Can't access internet or live data (unless augmented)</li>
<li><strong>Expensive</strong>: Large models need significant compute for inference</li>
<li><strong>Bias</strong>: Can reflect biases in training data</li>
</ul>

<h2 id="embeddings"><strong>3. Embeddings & Vector Representations</strong></h2>

<p><strong>Embeddings</strong> biến text (hoặc images, audio) thành <strong>numerical vectors</strong> mà machines hiểu được. Các text có ý nghĩa tương tự sẽ có vectors gần nhau trong không gian nhiều chiều.</p>

<pre><code class="language-text">Text: "King"     → [0.23, 0.87, -0.12, 0.45, ...]
Text: "Queen"    → [0.21, 0.89, -0.15, 0.43, ...]  ← Close vectors!
Text: "Banana"   → [0.91, -0.32, 0.67, -0.88, ...] ← Far away

Relationship: King - Man + Woman ≈ Queen
</code></pre>

<h3 id="embeddings-use"><strong>Why Embeddings Matter for the Exam:</strong></h3>

<ul>
<li><strong>Semantic search</strong>: Find similar documents based on meaning (not just keywords)</li>
<li><strong>RAG</strong>: Convert documents to embeddings, store in vector DB, retrieve relevant context</li>
<li><strong>Clustering</strong>: Group similar documents/sentences</li>
<li><strong>Amazon Titan Embeddings</strong>: AWS model specifically for creating text embeddings</li>
</ul>

<h3 id="vector-db"><strong>Vector Databases</strong></h3>

<p>Store and search embeddings efficiently:</p>

<table>
<thead><tr><th>Vector DB</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>Amazon OpenSearch Serverless</strong></td><td>AWS-managed vector search</td></tr>
<tr><td><strong>Amazon Aurora (pgvector)</strong></td><td>PostgreSQL with vector extension</td></tr>
<tr><td><strong>Pinecone</strong></td><td>Popular third-party vector DB</td></tr>
<tr><td><strong>Amazon Bedrock Knowledge Bases</strong></td><td>Managed RAG — handles vector storage internally</td></tr>
</tbody>
</table>

<h2 id="multimodal"><strong>4. Multi-modal Models</strong></h2>

<p><strong>Multi-modal models</strong> có thể xử lý và tạo nội dung từ <strong>nhiều loại data types</strong> (text + images + audio + video).</p>

<h3 id="multimodal-examples"><strong>Examples on AWS:</strong></h3>

<table>
<thead><tr><th>Model</th><th>Modalities</th><th>What it can do</th></tr></thead>
<tbody>
<tr><td><strong>Claude 3</strong> (Anthropic)</td><td>Text + Image input → Text output</td><td>Describe images, analyze charts, visual Q&A</td></tr>
<tr><td><strong>Amazon Titan Image Generator</strong></td><td>Text → Image</td><td>Create images from text descriptions</td></tr>
<tr><td><strong>Amazon Titan Multimodal Embeddings</strong></td><td>Text + Image → Vectors</td><td>Search across text and images</td></tr>
<tr><td><strong>Stable Diffusion</strong> (Stability AI)</td><td>Text → Image</td><td>Generate and edit images</td></tr>
</tbody>
</table>

<h3 id="multimodal-usecases"><strong>Multi-modal Use Cases for Exam:</strong></h3>

<ul>
<li>"Analyze product images and generate descriptions" → Multi-modal model (Claude 3 Vision)</li>
<li>"Generate product images from text descriptions" → Text-to-image (Titan Image Generator, Stable Diffusion)</li>
<li>"Search across both text documents and images" → Multi-modal embeddings</li>
</ul>

<h2 id="diffusion"><strong>5. Diffusion Models</strong></h2>

<p>Diffusion models (như Stable Diffusion) hoạt động bằng cách:</p>

<ol>
<li><strong>Forward process</strong>: Gradually add noise to an image until it becomes pure noise</li>
<li><strong>Reverse process</strong>: Learn to remove noise step by step, generating a new image</li>
</ol>

<pre><code class="language-text">Training (Forward):
Clean Image → Add Noise → Add More Noise → ... → Pure Noise

Generation (Reverse):
Pure Noise → Remove Noise → Remove More Noise → ... → New Image
                           (guided by text prompt)
</code></pre>

<blockquote>
<p><strong>Exam tip:</strong> Bạn không cần biết math chi tiết, chỉ cần hiểu concept: diffusion models tạo images bằng cách <strong>từ từ khử noise có guided bởi text prompt</strong>.</p>
</blockquote>

<h2 id="training-types"><strong>6. Pre-training vs Fine-tuning vs Prompting</strong></h2>

<table>
<thead><tr><th>Method</th><th>What</th><th>Data Needed</th><th>Cost</th><th>When to Use</th></tr></thead>
<tbody>
<tr><td><strong>Pre-training</strong></td><td>Train from scratch</td><td>Billions of examples</td><td>$$$$</td><td>Creating new FM (done by providers)</td></tr>
<tr><td><strong>Fine-tuning</strong></td><td>Further train existing FM</td><td>Thousands of examples</td><td>$$</td><td>Domain-specific knowledge</td></tr>
<tr><td><strong>Prompt Engineering</strong></td><td>Craft better inputs</td><td>None (few examples)</td><td>$</td><td>Quick adaptation, no training needed</td></tr>
<tr><td><strong>RAG</strong></td><td>Augment with external data</td><td>Knowledge base</td><td>$</td><td>Access current/proprietary data</td></tr>
</tbody>
</table>

<h3 id="decision-tree"><strong>Decision Tree for Exam:</strong></h3>

<pre><code class="language-text">Need the model to know specific domain knowledge?
├── Is the knowledge in documents you can provide?
│   └── YES → RAG (Bedrock Knowledge Bases)
│   └── NO, model needs to learn patterns →
│       ├── Have thousands of training examples? → Fine-tuning
│       └── Only a few examples? → Few-shot prompting
├── General knowledge is enough? → Prompt Engineering (zero/few-shot)
</code></pre>

<h2 id="practice-questions"><strong>7. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A company wants to search for relevant information across both product images and text descriptions. Which type of model would be MOST suitable?</p>
<ul>
<li>A) A text-only LLM</li>
<li>B) A multi-modal embedding model ✓</li>
<li>C) A diffusion model</li>
<li>D) A RNN model</li>
</ul>
<p><em>Explanation: Multi-modal embedding models can create vector representations of both text and images in the same vector space, enabling cross-modal search.</em></p>

<p><strong>Q2:</strong> Which Transformer architecture is BEST suited for text generation tasks such as chatbots and content creation?</p>
<ul>
<li>A) Encoder-only (BERT)</li>
<li>B) Decoder-only (GPT, Claude) ✓</li>
<li>C) Encoder-decoder (T5)</li>
<li>D) Convolutional Neural Network (CNN)</li>
</ul>
<p><em>Explanation: Decoder-only architectures generate text one token at a time (autoregressive) and are the basis for most modern chatbots and text generators.</em></p>

<p><strong>Q3:</strong> What is the purpose of text embeddings in the context of generative AI applications?</p>
<ul>
<li>A) To compress files for storage</li>
<li>B) To convert text into numerical vectors that capture semantic meaning ✓</li>
<li>C) To encrypt text for security</li>
<li>D) To translate text between languages</li>
</ul>
<p><em>Explanation: Embeddings are numerical vector representations of text that capture semantic meaning. Similar texts have similar vectors, enabling semantic search, RAG, and clustering.</em></p>
