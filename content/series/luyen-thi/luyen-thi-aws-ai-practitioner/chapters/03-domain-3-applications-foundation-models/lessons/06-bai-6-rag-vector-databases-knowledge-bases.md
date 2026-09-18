---
id: 019c9619-lt01-d3-l06
title: 'Bài 6: RAG, Vector Databases & Bedrock Knowledge Bases'
slug: bai-6-rag-vector-databases-knowledge-bases
description: >-
  Retrieval-Augmented Generation (RAG) architecture.
  Vector databases, embeddings, chunking strategies.
  Amazon Bedrock Knowledge Bases. So sánh RAG vs Fine-tuning.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 2
section_title: "Domain 3: Applications of Foundation Models (28%)"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'Luyện thi AWS Certified AI Practitioner (AIF-C01)'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai6-rag-architecture.webp" alt="RAG Architecture" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>RAG Architecture — Indexing Phase và Query Phase với Amazon Bedrock Knowledge Bases</em></p>
</div>

<h2 id="rag-overview"><strong>1. What is RAG?</strong></h2>

<p><strong>Retrieval-Augmented Generation (RAG)</strong> là kỹ thuật kết hợp FM với <strong>external knowledge sources</strong> để trả lời chính xác hơn, giảm hallucination, và cập nhật thông tin mà model chưa biết.</p>

<h3 id="why-rag"><strong>1.1. Why RAG?</strong></h3>

<table>
<thead><tr><th>Problem</th><th>RAG Solution</th></tr></thead>
<tbody>
<tr><td>Knowledge cutoff date</td><td>Retrieve latest documents</td></tr>
<tr><td>Hallucination</td><td>Ground responses in real data</td></tr>
<tr><td>No domain knowledge</td><td>Add company-specific documents</td></tr>
<tr><td>Generic answers</td><td>Cite specific sources</td></tr>
<tr><td>Privacy — can't send data to FM training</td><td>Keep data in your own vector DB</td></tr>
</tbody>
</table>

<h3 id="rag-flow"><strong>1.2. RAG Architecture</strong></h3>

<pre><code class="language-text">RAG Pipeline:

┌─────────────────────────────────────────────────────────────┐
│  INDEXING (Done once / periodically)                        │
│                                                             │
│  Documents → Chunking → Embedding Model → Vector Database   │
│  (PDF, web,    (split     (Amazon Titan     (OpenSearch,    │
│   S3, etc.)    text)       Embeddings)       Aurora pgvector)│
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  RETRIEVAL & GENERATION (Per query)                         │
│                                                             │
│  User Query → Embed Query → Search Vector DB → Top-K docs   │
│                                                             │
│  Augmented Prompt = System Prompt + Retrieved Docs + Query  │
│                                                             │
│  Augmented Prompt → Foundation Model → Answer with sources  │
└─────────────────────────────────────────────────────────────┘
</code></pre>

<h2 id="chunking"><strong>2. Chunking Strategies</strong></h2>

<p>Trước khi tạo embeddings, documents phải được <strong>chia nhỏ (chunked)</strong> thành các đoạn phù hợp.</p>

<table>
<thead><tr><th>Strategy</th><th>Description</th><th>Best For</th></tr></thead>
<tbody>
<tr><td><strong>Fixed-size</strong></td><td>Split every N characters/tokens</td><td>Simple, uniform documents</td></tr>
<tr><td><strong>Sentence-based</strong></td><td>Split at sentence boundaries</td><td>Narrative text</td></tr>
<tr><td><strong>Paragraph-based</strong></td><td>Split at paragraph breaks</td><td>Well-structured documents</td></tr>
<tr><td><strong>Semantic</strong></td><td>Split based on topic changes</td><td>Complex documents</td></tr>
<tr><td><strong>Hierarchical</strong></td><td>Parent-child chunk relationships</td><td>Long documents with sections</td></tr>
</tbody>
</table>

<h3 id="chunk-size"><strong>Chunk Size Trade-offs:</strong></h3>

<pre><code class="language-text">Small chunks (100-200 tokens):
  ✓ More precise retrieval
  ✗ May lose context
  ✗ More chunks to search

Large chunks (500-1000 tokens):
  ✓ More context preserved
  ✗ May include irrelevant info
  ✗ Fewer chunks, less granular

Overlap (e.g., 20% between chunks):
  ✓ Prevents information loss at boundaries
  ✗ Increases storage and compute
</code></pre>

<blockquote>
<p><strong>Exam tip:</strong> "How to improve RAG retrieval accuracy?" → Adjust <strong>chunk size</strong>, add <strong>overlap</strong>, use <strong>semantic chunking</strong>, improve <strong>embedding model</strong>.</p>
</blockquote>

<h2 id="embeddings"><strong>3. Embeddings for RAG</strong></h2>

<h3 id="embedding-models"><strong>3.1. AWS Embedding Models</strong></h3>

<table>
<thead><tr><th>Model</th><th>Modality</th><th>Dimensions</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Titan Text Embeddings V2</strong></td><td>Text</td><td>256/512/1024</td><td>Semantic search, RAG</td></tr>
<tr><td><strong>Amazon Titan Multimodal Embeddings</strong></td><td>Text + Image</td><td>256/384/1024</td><td>Cross-modal search</td></tr>
<tr><td><strong>Cohere Embed</strong></td><td>Text</td><td>1024</td><td>Multilingual search</td></tr>
</tbody>
</table>

<h3 id="vector-db"><strong>3.2. Vector Databases on AWS</strong></h3>

<table>
<thead><tr><th>Service</th><th>Type</th><th>Key Feature</th></tr></thead>
<tbody>
<tr><td><strong>Amazon OpenSearch Serverless</strong></td><td>Managed</td><td>Vector search collection type, serverless</td></tr>
<tr><td><strong>Amazon Aurora PostgreSQL</strong></td><td>RDB + Vector</td><td>pgvector extension</td></tr>
<tr><td><strong>Amazon Neptune</strong></td><td>Graph + Vector</td><td>Knowledge graphs with vector search</td></tr>
<tr><td><strong>Amazon DocumentDB</strong></td><td>Document + Vector</td><td>MongoDB-compatible with vector search</td></tr>
<tr><td><strong>Amazon MemoryDB</strong></td><td>In-memory + Vector</td><td>Redis-compatible, ultra-low latency</td></tr>
<tr><td><strong>Pinecone (3rd party)</strong></td><td>Dedicated vector DB</td><td>Popular, integrates with Bedrock</td></tr>
</tbody>
</table>

<h2 id="bedrock-kb"><strong>4. Amazon Bedrock Knowledge Bases</strong></h2>

<p><strong>Bedrock Knowledge Bases</strong> là <strong>fully managed RAG solution</strong>. AWS handles chunking, embedding, indexing, retrieval — bạn chỉ cần point to data sources.</p>

<h3 id="kb-architecture"><strong>4.1. How It Works</strong></h3>

<pre><code class="language-text">Setup:
┌───────────┐     ┌───────────────┐     ┌─────────────────┐
│ S3 Bucket │────→│ Bedrock       │────→│ Vector Store     │
│ (docs)    │     │ Knowledge Base│     │ (OpenSearch/     │
│           │     │ (auto-chunk,  │     │  Aurora/Pinecone) │
│           │     │  auto-embed)  │     │                  │
└───────────┘     └───────────────┘     └─────────────────┘

Query:
┌───────────┐     ┌───────────────┐     ┌─────────────────┐
│ User      │────→│ Knowledge Base│────→│ FM (Claude,      │
│ "What is  │     │ retrieves     │     │  Titan, etc.)    │
│  the..."  │     │ relevant docs │     │ generates answer │
└───────────┘     └───────────────┘     └─────────────────┘
</code></pre>

<h3 id="kb-data-sources"><strong>4.2. Supported Data Sources</strong></h3>

<ul>
<li><strong>Amazon S3</strong>: PDF, TXT, MD, HTML, DOC, CSV</li>
<li><strong>Web Crawler</strong>: Crawl websites automatically</li>
<li><strong>Confluence</strong>: Atlassian Confluence pages</li>
<li><strong>SharePoint</strong>: Microsoft SharePoint documents</li>
<li><strong>Salesforce</strong>: Salesforce knowledge articles</li>
</ul>

<h3 id="kb-features"><strong>4.3. Key Features</strong></h3>

<table>
<thead><tr><th>Feature</th><th>Benefit</th></tr></thead>
<tbody>
<tr><td><strong>Managed chunking</strong></td><td>Auto-splits documents (fixed, semantic, hierarchical)</td></tr>
<tr><td><strong>Auto-sync</strong></td><td>Periodically re-indexes when data changes</td></tr>
<tr><td><strong>Source attribution</strong></td><td>Returns source documents with answers</td></tr>
<tr><td><strong>Metadata filtering</strong></td><td>Filter chunks by custom metadata fields</td></tr>
<tr><td><strong>Hybrid search</strong></td><td>Combines semantic + keyword search</td></tr>
<tr><td><strong>Guardrails integration</strong></td><td>Apply safety filters to RAG responses</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>Exam tip:</strong> "A company wants to build a chatbot that answers questions from internal documents stored in S3, with minimal custom code" → <strong>Amazon Bedrock Knowledge Bases</strong>.</p>
</blockquote>

<h2 id="rag-vs-finetuning"><strong>5. RAG vs Fine-tuning</strong></h2>

<table>
<thead><tr><th>Factor</th><th>RAG</th><th>Fine-tuning</th></tr></thead>
<tbody>
<tr><td><strong>Purpose</strong></td><td>Access external/current data</td><td>Teach new skills/domain patterns</td></tr>
<tr><td><strong>Data freshness</strong></td><td>Always up-to-date</td><td>Fixed at training time</td></tr>
<tr><td><strong>Training required?</strong></td><td>No model training</td><td>Yes, needs labeled data + compute</td></tr>
<tr><td><strong>Cost</strong></td><td>Vector DB + retrieval costs</td><td>Training compute + storage</td></tr>
<tr><td><strong>Hallucination</strong></td><td>Reduced (grounded in data)</td><td>May still hallucinate</td></tr>
<tr><td><strong>Latency</strong></td><td>Slightly higher (retrieval step)</td><td>Same as base model</td></tr>
<tr><td><strong>Best for</strong></td><td>Q&A, search, knowledge bases</td><td>Style, tone, domain-specific patterns</td></tr>
<tr><td><strong>Data privacy</strong></td><td>Data stays in your vector DB</td><td>Data used in training process</td></tr>
</tbody>
</table>

<h3 id="when-to-use"><strong>Decision Matrix:</strong></h3>

<pre><code class="language-text">"Need to answer from company docs?"       → RAG
"Need real-time/latest information?"       → RAG
"Need to change model's writing style?"    → Fine-tuning
"Need model to follow specific format?"    → Try prompting first → then fine-tuning
"Need domain-specific terminology?"        → RAG (if in docs) or Fine-tuning (if patterns)
"Minimum effort/cost?"                     → RAG > Prompt Engineering > Fine-tuning
</code></pre>

<h2 id="rag-evaluation"><strong>6. Evaluating RAG Quality</strong></h2>

<table>
<thead><tr><th>Metric</th><th>What it measures</th></tr></thead>
<tbody>
<tr><td><strong>Faithfulness</strong></td><td>Is the answer grounded in retrieved docs? (no hallucination)</td></tr>
<tr><td><strong>Relevance</strong></td><td>Are retrieved documents relevant to the query?</td></tr>
<tr><td><strong>Answer correctness</strong></td><td>Is the final answer factually correct?</td></tr>
<tr><td><strong>Context precision</strong></td><td>What % of retrieved chunks are actually relevant?</td></tr>
<tr><td><strong>Context recall</strong></td><td>Did we retrieve all relevant chunks?</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>7. Practice Questions</strong></h2>

<p><strong>Q1:</strong> A healthcare company wants an AI assistant that answers questions from their latest medical research papers stored in Amazon S3. The information changes weekly. Which approach is MOST suitable?</p>
<ul>
<li>A) Fine-tune a foundation model on the papers</li>
<li>B) Use RAG with Amazon Bedrock Knowledge Bases ✓</li>
<li>C) Use zero-shot prompting with a large context window</li>
<li>D) Pre-train a custom model on medical data</li>
</ul>
<p><em>Explanation: RAG with Bedrock Knowledge Bases is ideal — it automatically indexes S3 documents, retrieves relevant information per query, and keeps responses current without retraining. Weekly updates are handled by auto-sync.</em></p>

<p><strong>Q2:</strong> What is the PRIMARY purpose of chunking documents in a RAG pipeline?</p>
<ul>
<li>A) To reduce storage costs</li>
<li>B) To split documents into manageable pieces for embedding and retrieval ✓</li>
<li>C) To encrypt sensitive data</li>
<li>D) To convert documents to a different file format</li>
</ul>
<p><em>Explanation: Chunking splits large documents into smaller, semantically meaningful pieces that can be individually embedded and retrieved. This enables precise retrieval of relevant information rather than processing entire documents.</em></p>

<p><strong>Q3:</strong> A company built a RAG application, but it sometimes returns answers not supported by the retrieved documents. Which metric should they focus on improving?</p>
<ul>
<li>A) Context recall</li>
<li>B) Answer length</li>
<li>C) Faithfulness ✓</li>
<li>D) Response latency</li>
</ul>
<p><em>Explanation: Faithfulness measures whether the generated answer is grounded in the retrieved documents. Low faithfulness means the model is generating information beyond what the retrieved context supports (hallucination in RAG context).</em></p>
