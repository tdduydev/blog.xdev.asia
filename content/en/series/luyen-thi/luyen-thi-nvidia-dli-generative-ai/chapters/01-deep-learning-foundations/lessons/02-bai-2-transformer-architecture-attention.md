---
id: 019c9619-nv01-p1-l02
title: 'Lesson 2: Transformer Architecture & Attention Mechanism'
slug: bai-2-transformer-architecture-attention
description: >-
  Self-attention, multi-head attention, positional encoding.
  Encoder-decoder architecture. BERT, GPT, T5 model families.
  Tokenization: BPE, WordPiece, SentencePiece.
  NLP tasks: classification, NER, QA, summarization.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 2
section_title: "Part 1: Deep Learning Foundations"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'NVIDIA DLI Exam Prep — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="gioi-thieu">1. Introduction</h2>

<p><strong>Transformer</strong> is the foundational architecture behind every modern Generative AI model — from <strong>GPT</strong>, <strong>BERT</strong>, <strong>Stable Diffusion</strong> to <strong>LLaMA</strong>. In the NVIDIA DLI assessment, you must thoroughly understand how the <strong>Attention Mechanism</strong> works and be able to implement it in PyTorch.</p>

<p>This lesson covers everything from <strong>Scaled Dot-Product Attention</strong> to the full <strong>Transformer</strong> architecture, then maps to specific model families and NLP tasks.</p>

<blockquote><p><strong>Exam tip:</strong> The NVIDIA DLI assessment often requires you to complete attention mechanism code or debug dimension mismatch errors in Transformers. Master the <strong>tensor shapes</strong> at each step of attention — this is the key to passing the assessment.</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai2-transformer-architecture.webp" alt="Transformer Architecture — Encoder-Decoder, Self-Attention, Cross-Attention" loading="lazy" /><figcaption>Transformer Architecture — Encoder-Decoder, Self-Attention, Cross-Attention</figcaption></figure>

<h2 id="attention-mechanism">2. Attention Mechanism</h2>

<h3 id="attention-intuition">2.1 Intuition — "What's most important?"</h3>

<p><strong>Attention</strong> answers the question: "When processing the current token, which tokens in the input sequence are most important?" Instead of compressing the entire sequence into a fixed-size vector like RNN, Attention allows the model to "look" directly at every position in the input.</p>

<p>The mechanism works through 3 components:</p>

<ul>
<li><strong>Query (Q)</strong> — "What am I looking for?" — the current token asks a question</li>
<li><strong>Key (K)</strong> — "What information do I contain?" — each token advertises its content</li>
<li><strong>Value (V)</strong> — "Here is the actual information" — the content returned when matched</li>
</ul>

<pre><code class="language-text">Example: "The cat sat on the mat because it was tired"
                                              ↑
                                        Token "it" (Query)
                                              │
                ┌─────────────────────────────┤
                │     Attention scores:       │
                │   "cat"  = 0.72  ← high!   │
                │   "mat"  = 0.11            │
                │   "sat"  = 0.08            │
                │   "The"  = 0.03            │
                │   ...                       │
                └─────────────────────────────┘
                → "it" attends mainly to "cat"
</code></pre>

<h3 id="scaled-dot-product">2.2 Scaled Dot-Product Attention</h3>

<p>The core attention formula:</p>

<pre><code class="language-text">Attention(Q, K, V) = softmax(Q · K^T / √d_k) · V

Where:
  Q: Query matrix  — shape (seq_len, d_k)
  K: Key matrix    — shape (seq_len, d_k)
  V: Value matrix  — shape (seq_len, d_v)
  d_k: dimension of Key vectors
  √d_k: scaling factor to prevent gradient vanishing in softmax
</code></pre>

<p>Why do we need <strong>scaling</strong> by √d_k? When d_k is large, the dot product Q·K^T can be very large, causing softmax to saturate → gradient approaches 0. Dividing by √d_k keeps the variance stable.</p>

<pre><code class="language-text">Scaled Dot-Product Attention Flow:

  Q ──┐
      │──→ MatMul ──→ Scale (÷√d_k) ──→ Mask (opt.) ──→ Softmax ──→ MatMul ──→ Output
  K ──┘                                                                ↑
                                                                       │
  V ────────────────────────────────────────────────────────────────────┘

Shapes (batch_size=B, seq_len=S, d_k=D):
  Q:        (B, S, D)
  K^T:      (B, D, S)
  Q·K^T:    (B, S, S)   ← attention score matrix
  softmax:  (B, S, S)   ← attention weights (each row sums to 1)
  × V:      (B, S, D)   ← weighted output
</code></pre>

<h3 id="attention-code">2.3 Code: Implement Attention from Scratch</h3>

<pre><code class="language-python">import torch
import torch.nn.functional as F
import math

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Q: (batch, seq_len, d_k)
    K: (batch, seq_len, d_k)
    V: (batch, seq_len, d_v)
    mask: (batch, 1, seq_len) or (batch, seq_len, seq_len)
    """
    d_k = Q.size(-1)

    # Step 1: Compute attention scores
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    # scores shape: (batch, seq_len, seq_len)

    # Step 2: Apply mask (for causal attention in decoder)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))

    # Step 3: Softmax to get attention weights
    attn_weights = F.softmax(scores, dim=-1)
    # attn_weights shape: (batch, seq_len, seq_len)

    # Step 4: Weighted sum of values
    output = torch.matmul(attn_weights, V)
    # output shape: (batch, seq_len, d_v)

    return output, attn_weights

# Demo
batch_size, seq_len, d_k = 2, 5, 64
Q = torch.randn(batch_size, seq_len, d_k)
K = torch.randn(batch_size, seq_len, d_k)
V = torch.randn(batch_size, seq_len, d_k)

output, weights = scaled_dot_product_attention(Q, K, V)
print(f"Output shape: {output.shape}")    # (2, 5, 64)
print(f"Weights shape: {weights.shape}")  # (2, 5, 5)
print(f"Weights sum per row: {weights.sum(dim=-1)}")  # each row = 1.0
</code></pre>

<blockquote><p><strong>Exam tip:</strong> The most common error when implementing attention: forgetting <code>K.transpose(-2, -1)</code> or dividing by the wrong dimension. Always check the shape after each step — <code>scores</code> must have shape <code>(batch, seq_len, seq_len)</code>.</p></blockquote>

<h2 id="multi-head-attention">3. Multi-Head Attention</h2>

<h3 id="why-multi-head">3.1 Why multiple heads?</h3>

<p>A single head can only learn <strong>one type of relationship</strong>. Multi-Head Attention allows the model to attend simultaneously to different <strong>representation subspaces</strong>:</p>

<ul>
<li>Head 1: learns syntactic relationships (subject-verb)</li>
<li>Head 2: learns coreference (pronoun → noun)</li>
<li>Head 3: learns positional proximity</li>
<li>Head 4: learns semantic similarity</li>
</ul>

<pre><code class="language-text">Multi-Head Attention Flow:

Input (batch, seq_len, d_model)
    │
    ├── Linear → Q ──┐
    ├── Linear → K ──┼── Split into h heads
    └── Linear → V ──┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
    Head 1        Head 2    ...  Head h
 Attention()   Attention()    Attention()
        │             │             │
        └─────────────┼─────────────┘
                      │
                  Concatenate
                      │
                   Linear
                      │
                   Output (batch, seq_len, d_model)

Shapes (d_model=512, h=8, d_k = d_model/h = 64):
  Input:          (B, S, 512)
  Per-head Q/K/V: (B, h, S, 64)   ← reshape after linear
  Per-head out:   (B, h, S, 64)
  Concat:         (B, S, 512)      ← h × d_k = d_model
  Final output:   (B, S, 512)
</code></pre>

<h3 id="multi-head-code">3.2 Code: MultiHeadAttention Module</h3>

<pre><code class="language-python">import torch
import torch.nn as nn
import math

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        assert d_model % num_heads == 0, "d_model must be divisible by num_heads"

        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads

        # Linear projections for Q, K, V and output
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

    def forward(self, query, key, value, mask=None):
        batch_size = query.size(0)

        # Step 1: Linear projections
        Q = self.W_q(query)  # (B, S, d_model)
        K = self.W_k(key)
        V = self.W_v(value)

        # Step 2: Reshape to multi-head format
        # (B, S, d_model) → (B, S, h, d_k) → (B, h, S, d_k)
        Q = Q.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = K.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = V.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)

        # Step 3: Scaled dot-product attention for each head
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)

        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))

        attn_weights = torch.softmax(scores, dim=-1)
        context = torch.matmul(attn_weights, V)
        # context: (B, h, S, d_k)

        # Step 4: Concatenate heads
        # (B, h, S, d_k) → (B, S, h, d_k) → (B, S, d_model)
        context = context.transpose(1, 2).contiguous().view(
            batch_size, -1, self.d_model
        )

        # Step 5: Final linear projection
        output = self.W_o(context)
        return output

# Demo
d_model, num_heads = 512, 8
mha = MultiHeadAttention(d_model, num_heads)

x = torch.randn(2, 10, d_model)  # batch=2, seq_len=10
output = mha(x, x, x)  # self-attention: Q=K=V=x
print(f"Output shape: {output.shape}")  # (2, 10, 512)
</code></pre>

<table>
<thead>
<tr><th>Parameter</th><th>Common Values</th><th>Notes</th></tr>
</thead>
<tbody>
<tr><td>d_model</td><td>512, 768, 1024</td><td>Embedding size</td></tr>
<tr><td>num_heads</td><td>8, 12, 16</td><td>d_model must be divisible by num_heads</td></tr>
<tr><td>d_k = d_model / h</td><td>64, 64, 64</td><td>Each head typically has d_k = 64</td></tr>
<tr><td>Total params (MHA)</td><td>4 × d_model²</td><td>4 linear layers: W_q, W_k, W_v, W_o</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> In the DLI assessment, if you encounter <code>RuntimeError: shape mismatch</code> in attention, check: (1) <code>d_model % num_heads == 0</code>, (2) <code>view()</code> and <code>transpose()</code> are in the correct order, (3) remember to call <code>.contiguous()</code> before <code>.view()</code> after transpose.</p></blockquote>

<h2 id="transformer-architecture">4. Transformer Architecture</h2>

<h3 id="encoder-block">4.1 Encoder Block</h3>

<p>Each layer in the <strong>Transformer Encoder</strong> consists of 2 sub-layers with <strong>residual connections</strong> and <strong>layer normalization</strong>:</p>

<pre><code class="language-text">Transformer Encoder Block:

  Input
    │
    ▼
┌─────────────────────────────┐
│  Multi-Head Self-Attention  │
└──────────────┬──────────────┘
               │
    ┌──────────┴──────────┐
    │     Add & Norm      │ ← x + Sublayer(x), then LayerNorm
    └──────────┬──────────┘
               │
    ┌──────────┴──────────┐
    │  Feed-Forward Net   │ ← 2 linear layers + ReLU/GELU
    │  FFN(x) = W₂·σ(W₁x + b₁) + b₂
    └──────────┬──────────┘
               │
    ┌──────────┴──────────┐
    │     Add & Norm      │
    └──────────┬──────────┘
               │
             Output
</code></pre>

<h3 id="decoder-block">4.2 Decoder Block</h3>

<p>The <strong>Decoder</strong> has an additional sub-layer for <strong>Cross-Attention</strong> — attending to the encoder output:</p>

<pre><code class="language-text">Transformer Decoder Block:

  Input (shifted right)
    │
    ▼
┌────────────────────────────────┐
│  Masked Multi-Head Attention   │ ← causal mask: only sees previous tokens
└──────────────┬─────────────────┘
               │
    ┌──────────┴──────────┐
    │     Add & Norm      │
    └──────────┬──────────┘
               │
    ┌──────────┴──────────────────────────┐
    │  Cross Multi-Head Attention         │ ← Q from decoder, K/V from encoder
    │  Q = decoder hidden states          │
    │  K, V = encoder output              │
    └──────────────────┬──────────────────┘
               │
    ┌──────────┴──────────┐
    │     Add & Norm      │
    └──────────┬──────────┘
               │
    ┌──────────┴──────────┐
    │  Feed-Forward Net   │
    └──────────┬──────────┘
               │
    ┌──────────┴──────────┐
    │     Add & Norm      │
    └──────────┬──────────┘
               │
             Output
</code></pre>

<h3 id="full-transformer">4.3 Full Transformer Architecture</h3>

<pre><code class="language-text">┌─────────────────────────────────────────────────────────────────┐
│                    TRANSFORMER ARCHITECTURE                     │
├───────────────────────┬─────────────────────────────────────────┤
│       ENCODER         │              DECODER                    │
│                       │                                         │
│   Input Embedding     │         Output Embedding                │
│        +              │              +                          │
│   Positional Enc.     │         Positional Enc.                 │
│        │              │              │                          │
│   ┌────┴────┐         │         ┌────┴──────────┐              │
│   │  MH     │         │         │  Masked MH    │              │
│   │  Self-  │         │         │  Self-        │              │
│   │  Attn   │         │         │  Attention    │              │
│   └────┬────┘         │         └────┬──────────┘              │
│   Add & Norm          │         Add & Norm                     │
│        │              │              │                          │
│   ┌────┴────┐         │    ┌────────┴────────────┐             │
│   │  Feed   │         │    │  Cross MH Attention │             │
│   │ Forward │    ─────┼───►│  Q=dec, K/V=enc    │             │
│   │   Net   │         │    └─────────┬───────────┘             │
│   └────┬────┘         │         Add & Norm                     │
│   Add & Norm          │              │                          │
│        │              │         ┌────┴────┐                    │
│      × N layers       │         │  Feed   │                    │
│        │              │         │ Forward │                    │
│     Encoder           │         └────┬────┘                    │
│     Output            │         Add & Norm                     │
│                       │              │                          │
│                       │           × N layers                   │
│                       │              │                          │
│                       │         Linear + Softmax               │
│                       │              │                          │
│                       │       Output Probabilities              │
└───────────────────────┴─────────────────────────────────────────┘
</code></pre>

<h3 id="positional-encoding">4.4 Positional Encoding</h3>

<p>Transformers have no concept of "order" like RNNs. <strong>Positional Encoding</strong> adds position information to embeddings using sin/cos functions:</p>

<pre><code class="language-text">PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))

pos: token position in sequence (0, 1, 2, ...)
i:   dimension index (0, 1, 2, ..., d_model/2)
</code></pre>

<p>This is the exact same concept <strong>reused in Diffusion Models</strong> — sinusoidal embeddings to encode timestep t. Mastering positional encoding here will help you greatly in the Diffusion section.</p>

<pre><code class="language-python">import torch
import math

class PositionalEncoding(nn.Module):
    def __init__(self, d_model, max_len=5000):
        super().__init__()
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len).unsqueeze(1).float()
        div_term = torch.exp(
            torch.arange(0, d_model, 2).float()
            * (-math.log(10000.0) / d_model)
        )
        pe[:, 0::2] = torch.sin(position * div_term)  # even indices
        pe[:, 1::2] = torch.cos(position * div_term)  # odd indices
        pe = pe.unsqueeze(0)  # (1, max_len, d_model)
        self.register_buffer('pe', pe)

    def forward(self, x):
        # x: (batch, seq_len, d_model)
        return x + self.pe[:, :x.size(1), :]

# Demo
pe = PositionalEncoding(d_model=512)
x = torch.randn(2, 100, 512)  # batch=2, seq_len=100
output = pe(x)
print(f"Output shape: {output.shape}")  # (2, 100, 512)
</code></pre>

<h3 id="layer-norm">4.5 Layer Normalization vs Batch Normalization</h3>

<table>
<thead>
<tr><th>Feature</th><th>Batch Normalization</th><th>Layer Normalization</th></tr>
</thead>
<tbody>
<tr><td>Normalizes across</td><td>Batch dimension</td><td>Feature dimension</td></tr>
<tr><td>Depends on batch size</td><td>Yes — requires large enough batch</td><td>No — operates on each sample individually</td></tr>
<tr><td>Used in</td><td>CNN (computer vision)</td><td>Transformer, RNN (NLP)</td></tr>
<tr><td>Inference behavior</td><td>Uses running statistics</td><td>Computed directly — same as training</td></tr>
<tr><td>Used in Transformer</td><td>No</td><td><strong>Yes — every sub-layer</strong></td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> If a question asks "why does Transformer use LayerNorm instead of BatchNorm?" → answer: (1) NLP has variable sequence lengths → batch stats are unstable, (2) LayerNorm is independent of batch size, works well with small batch sizes and inference.</p></blockquote>

<h2 id="model-families">5. Model Families</h2>

<h3 id="encoder-only">5.1 Encoder-only: BERT</h3>

<p><strong>BERT</strong> (Bidirectional Encoder Representations from Transformers) uses only the <strong>Encoder</strong>. Pre-trained using:</p>

<ul>
<li><strong>MLM (Masked Language Modeling)</strong> — mask 15% of tokens, predict the masked tokens</li>
<li><strong>NSP (Next Sentence Prediction)</strong> — are two sentences consecutive?</li>
</ul>

<p>Since BERT can see in both directions (bidirectional), it excels at <strong>understanding</strong> tasks: classification, NER, QA.</p>

<h3 id="decoder-only">5.2 Decoder-only: GPT</h3>

<p><strong>GPT</strong> (Generative Pre-trained Transformer) uses only the <strong>Decoder</strong> with <strong>causal masking</strong> — each token can only attend to previous tokens. Pre-trained using <strong>next-token prediction</strong>.</p>

<pre><code class="language-text">Causal Attention Mask (GPT):

Token:   [The]  [cat]  [sat]  [on]
The       ✓      ✗      ✗      ✗
cat       ✓      ✓      ✗      ✗
sat       ✓      ✓      ✓      ✗
on        ✓      ✓      ✓      ✓

✓ = can attend    ✗ = masked (= -inf before softmax)

→ Each token only "sees" tokens before it
→ Suitable for generation: predict the next token
</code></pre>

<h3 id="encoder-decoder">5.3 Encoder-Decoder: T5</h3>

<p><strong>T5</strong> (Text-to-Text Transfer Transformer) uses the full <strong>Encoder-Decoder</strong> architecture. Every task is framed as "text-in → text-out":</p>

<ul>
<li>Translation: <code>"translate English to French: The cat sat"</code> → <code>"Le chat s'est assis"</code></li>
<li>Summarization: <code>"summarize: {long text}"</code> → <code>"{summary}"</code></li>
<li>Classification: <code>"classify: {text}"</code> → <code>"positive"</code></li>
</ul>

<h3 id="model-comparison">5.4 Comparison Table</h3>

<table>
<thead>
<tr><th>Feature</th><th>BERT (Encoder)</th><th>GPT (Decoder)</th><th>T5 (Enc-Dec)</th></tr>
</thead>
<tbody>
<tr><td>Architecture</td><td>Encoder-only</td><td>Decoder-only</td><td>Encoder-Decoder</td></tr>
<tr><td>Directionality</td><td>Bidirectional</td><td>Left-to-right (causal)</td><td>Bidirectional enc + causal dec</td></tr>
<tr><td>Pre-training</td><td>MLM + NSP</td><td>Next-token prediction</td><td>Span corruption</td></tr>
<tr><td>Attention mask</td><td>Full (sees all tokens)</td><td>Causal (only sees past)</td><td>Full enc + causal dec</td></tr>
<tr><td>Strengths</td><td>Understanding: NER, QA, classification</td><td>Generation: text, code</td><td>Seq2seq: translation, summary</td></tr>
<tr><td>Output</td><td>Contextual embeddings</td><td>Next token probability</td><td>Target sequence</td></tr>
<tr><td>Example models</td><td>BERT, RoBERTa, DeBERTa</td><td>GPT-2/3/4, LLaMA</td><td>T5, BART, mBART</td></tr>
</tbody>
</table>

<pre><code class="language-text">Decision Tree — Choosing a Model Family:

                ┌─ Need to generate long text?
                │   YES → Decoder-only (GPT, LLaMA)
                │
Task ───────────┤
                │   ┌─ Input→Output sequences?
                │   │   YES → Encoder-Decoder (T5, BART)
                NO ─┤
                    │   NO → Encoder-only (BERT)
                    │   (classification, NER, embedding)
                    └──────────────────────────────────
</code></pre>

<blockquote><p><strong>Exam tip:</strong> Common question: "Given task X, which model family should you use?" Quick rule: (1) Understanding / classification → BERT, (2) Generation → GPT, (3) Seq2seq (translation, summarization) → T5. Note: a sufficiently large GPT can also handle any task via <strong>prompting</strong>.</p></blockquote>

<h2 id="tokenization">6. Tokenization</h2>

<h3 id="token-vs-word">6.1 Token vs Word</h3>

<p>Language models don't work with "words" but with <strong>tokens</strong> — units that are smaller than or equal to a word. Tokenization determines how text is split into tokens.</p>

<pre><code class="language-text">Example tokenization for "unbelievable":

Word-level:     ["unbelievable"]         → vocab too large, many OOV
Character:      ["u","n","b","e",...]    → sequence too long
Subword (BPE):  ["un", "believ", "able"] → balance vocab size and seq length
</code></pre>

<h3 id="bpe-wordpiece-sentencepiece">6.2 BPE, WordPiece, SentencePiece</h3>

<table>
<thead>
<tr><th>Algorithm</th><th>Used by</th><th>How It Works</th><th>Characteristics</th></tr>
</thead>
<tbody>
<tr><td><strong>BPE</strong> (Byte-Pair Encoding)</td><td>GPT-2/3/4, RoBERTa</td><td>Repeatedly merge the most frequent byte pairs</td><td>Bottom-up, greedy merging</td></tr>
<tr><td><strong>WordPiece</strong></td><td>BERT, DistilBERT</td><td>Merge pairs that maximize likelihood</td><td>Uses <code>##</code> prefix for subwords</td></tr>
<tr><td><strong>SentencePiece</strong></td><td>T5, LLaMA, mT5</td><td>Unigram LM or BPE on raw text</td><td>Language-agnostic, no pre-tokenization needed</td></tr>
</tbody>
</table>

<pre><code class="language-text">Comparison example:

Input: "I love tokenization"

BPE (GPT-2):       ["I", " love", " token", "ization"]
WordPiece (BERT):   ["I", "love", "token", "##ization"]
SentencePiece (T5): ["▁I", "▁love", "▁token", "ization"]

WordPiece uses ## for continuation
SentencePiece uses ▁ for word start
</code></pre>

<h3 id="tokenizer-code">6.3 Code: Tokenization with HuggingFace</h3>

<pre><code class="language-python">from transformers import AutoTokenizer

# Load tokenizers for each model family
bert_tok = AutoTokenizer.from_pretrained("bert-base-uncased")
gpt2_tok = AutoTokenizer.from_pretrained("gpt2")
t5_tok = AutoTokenizer.from_pretrained("t5-small")

text = "Transformers are amazing for NLP tasks!"

# BERT (WordPiece)
bert_tokens = bert_tok.tokenize(text)
print(f"BERT:  {bert_tokens}")
# ['transformers', 'are', 'amazing', 'for', 'nl', '##p', 'tasks', '!']

# GPT-2 (BPE)
gpt2_tokens = gpt2_tok.tokenize(text)
print(f"GPT-2: {gpt2_tokens}")
# ['Trans', 'formers', 'Ġare', 'Ġamazing', 'Ġfor', 'ĠNLP', 'Ġtasks', '!']

# T5 (SentencePiece)
t5_tokens = t5_tok.tokenize(text)
print(f"T5:    {t5_tokens}")
# ['▁Transform', 'ers', '▁are', '▁amazing', '▁for', '▁NLP', '▁tasks', '!']

# Encode → token IDs
ids = bert_tok.encode(text, return_tensors="pt")
print(f"Token IDs shape: {ids.shape}")

# Decode back to text
decoded = bert_tok.decode(ids[0])
print(f"Decoded: {decoded}")
</code></pre>

<p>Vocab size affects embedding size and model capacity:</p>

<table>
<thead>
<tr><th>Model</th><th>Tokenizer</th><th>Vocab Size</th><th>Notes</th></tr>
</thead>
<tbody>
<tr><td>BERT-base</td><td>WordPiece</td><td>30,522</td><td>Lowercase English</td></tr>
<tr><td>GPT-2</td><td>BPE</td><td>50,257</td><td>Case-sensitive</td></tr>
<tr><td>T5</td><td>SentencePiece</td><td>32,100</td><td>Multilingual capable</td></tr>
<tr><td>LLaMA-2</td><td>SentencePiece</td><td>32,000</td><td>BPE variant</td></tr>
<tr><td>GPT-4</td><td>BPE (cl100k)</td><td>100,256</td><td>Optimized for code + multilingual</td></tr>
</tbody>
</table>

<h2 id="nlp-tasks">7. NLP Tasks Mapping</h2>

<h3 id="task-overview">7.1 Task → Model → Output</h3>

<table>
<thead>
<tr><th>NLP Task</th><th>Task Type</th><th>Best Model Family</th><th>Output</th></tr>
</thead>
<tbody>
<tr><td>Text Classification</td><td>Sequence classification</td><td>Encoder (BERT)</td><td>Single label</td></tr>
<tr><td>Sentiment Analysis</td><td>Sequence classification</td><td>Encoder (BERT)</td><td>Positive/Negative</td></tr>
<tr><td>Named Entity Recognition</td><td>Token classification</td><td>Encoder (BERT)</td><td>Label per token</td></tr>
<tr><td>Question Answering</td><td>Extractive / Generative</td><td>Encoder or Enc-Dec</td><td>Span or text</td></tr>
<tr><td>Summarization</td><td>Seq2seq generation</td><td>Enc-Dec (T5, BART)</td><td>Summary text</td></tr>
<tr><td>Translation</td><td>Seq2seq generation</td><td>Enc-Dec (T5, mBART)</td><td>Translated text</td></tr>
<tr><td>Text Generation</td><td>Autoregressive</td><td>Decoder (GPT)</td><td>Continuation</td></tr>
<tr><td>Code Generation</td><td>Autoregressive</td><td>Decoder (CodeGen)</td><td>Code</td></tr>
</tbody>
</table>

<h3 id="classification-code">7.2 Code: Fine-tune BERT for Text Classification</h3>

<pre><code class="language-python">import torch
import torch.nn as nn
from transformers import BertModel, BertTokenizer

class BertClassifier(nn.Module):
    def __init__(self, num_classes, model_name='bert-base-uncased'):
        super().__init__()
        self.bert = BertModel.from_pretrained(model_name)
        self.dropout = nn.Dropout(0.1)
        self.classifier = nn.Linear(self.bert.config.hidden_size, num_classes)

    def forward(self, input_ids, attention_mask):
        # BERT output: last_hidden_state, pooler_output
        outputs = self.bert(input_ids=input_ids,
                           attention_mask=attention_mask)

        # Use [CLS] token representation for classification
        cls_output = outputs.pooler_output  # (batch, hidden_size)
        cls_output = self.dropout(cls_output)
        logits = self.classifier(cls_output)  # (batch, num_classes)
        return logits

# Usage
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertClassifier(num_classes=3)

# Tokenize input
text = "This movie was absolutely wonderful!"
encoded = tokenizer(text, return_tensors='pt', padding=True,
                    truncation=True, max_length=128)

# Forward pass
logits = model(encoded['input_ids'], encoded['attention_mask'])
prediction = torch.argmax(logits, dim=-1)
print(f"Predicted class: {prediction.item()}")
</code></pre>

<pre><code class="language-python"># Training loop for BERT classifier
from torch.utils.data import DataLoader

optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)
loss_fn = nn.CrossEntropyLoss()

model.train()
for epoch in range(3):
    total_loss = 0
    for batch in train_loader:
        optimizer.zero_grad()

        logits = model(batch['input_ids'], batch['attention_mask'])
        loss = loss_fn(logits, batch['labels'])

        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
        optimizer.step()

        total_loss += loss.item()

    print(f"Epoch {epoch+1}, Loss: {total_loss / len(train_loader):.4f}")
</code></pre>

<blockquote><p><strong>Exam tip:</strong> When fine-tuning BERT, 3 important points: (1) <strong>Small learning rate</strong> (2e-5 to 5e-5) since the model is already pre-trained, (2) <strong>Gradient clipping</strong> (<code>clip_grad_norm_</code>) to stabilize training, (3) Use <strong>pooler_output</strong> (CLS token) for classification, <strong>last_hidden_state</strong> for token-level tasks (NER).</p></blockquote>

<h2 id="cheat-sheet">8. Cheat Sheet</h2>

<table>
<thead>
<tr><th>Concept</th><th>Key Formula / Pattern</th><th>Remember</th></tr>
</thead>
<tbody>
<tr><td>Scaled Dot-Product</td><td><code>softmax(QK^T / √d_k) V</code></td><td>Divide by √d_k to prevent softmax saturation</td></tr>
<tr><td>Multi-Head</td><td>Split → h × Attention → Concat → Linear</td><td>d_k = d_model / num_heads</td></tr>
<tr><td>Positional Encoding</td><td>sin/cos functions</td><td>Reused in Diffusion timestep embedding</td></tr>
<tr><td>Encoder (BERT)</td><td>Bidirectional, MLM</td><td>Understanding tasks: NER, QA, classification</td></tr>
<tr><td>Decoder (GPT)</td><td>Causal mask, next-token</td><td>Generation tasks: text, code</td></tr>
<tr><td>Enc-Dec (T5)</td><td>Cross-attention, seq2seq</td><td>Translation, summarization</td></tr>
<tr><td>BPE</td><td>Merge frequent byte pairs</td><td>GPT family</td></tr>
<tr><td>WordPiece</td><td>Maximize likelihood merge</td><td>BERT family, uses ## prefix</td></tr>
<tr><td>SentencePiece</td><td>Language-agnostic on raw text</td><td>T5, LLaMA, uses ▁ prefix</td></tr>
<tr><td>Causal Mask</td><td>Lower-triangular matrix</td><td>GPT: each token only sees preceding ones</td></tr>
<tr><td>Layer Norm</td><td>Normalize across features</td><td>Used in Transformer (not BatchNorm)</td></tr>
<tr><td>Fine-tune LR</td><td>2e-5 → 5e-5</td><td>Small LR because of pre-trained weights</td></tr>
</tbody>
</table>

<h2 id="practice-questions">9. Practice Questions</h2>

<p>Coding assessment-style questions similar to NVIDIA DLI:</p>

<p><strong>Q1:</strong> Implement a <code>scaled_dot_product_attention</code> function. The function takes Q, K, V tensors and an optional mask, and returns the output and attention weights.</p>

<details>
<summary>Show Answer Q1</summary>

<pre><code class="language-python">import torch
import torch.nn.functional as F
import math

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Args:
        Q: (batch, seq_len, d_k)
        K: (batch, seq_len, d_k)
        V: (batch, seq_len, d_v)
        mask: optional (batch, 1, seq_len) or (batch, seq_len, seq_len)
    Returns:
        output: (batch, seq_len, d_v)
        attn_weights: (batch, seq_len, seq_len)
    """
    d_k = Q.size(-1)

    # Compute attention scores
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)

    # Apply mask if provided
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))

    # Softmax over last dimension (key dimension)
    attn_weights = F.softmax(scores, dim=-1)

    # Weighted sum of values
    output = torch.matmul(attn_weights, V)

    return output, attn_weights

# Verification:
B, S, D = 2, 4, 64
Q = torch.randn(B, S, D)
K = torch.randn(B, S, D)
V = torch.randn(B, S, D)
out, w = scaled_dot_product_attention(Q, K, V)
assert out.shape == (B, S, D)
assert w.shape == (B, S, S)
assert torch.allclose(w.sum(dim=-1), torch.ones(B, S), atol=1e-6)
print("All assertions passed!")
</code></pre>

<p><em>Explanation: The key points are (1) <code>K.transpose(-2, -1)</code> for correct matrix multiplication, (2) divide by <code>math.sqrt(d_k)</code> for scaling, (3) <code>masked_fill</code> with <code>-inf</code> before softmax, (4) softmax on <code>dim=-1</code>. Common error: forgetting to transpose K or applying softmax on the wrong dim.</em></p>
</details>

<p><strong>Q2:</strong> What happens if Positional Encoding is removed from a Transformer? Write code to prove it.</p>

<details>
<summary>Show Answer Q2</summary>

<pre><code class="language-python">import torch

# Self-attention WITHOUT positional encoding
# → output is permutation invariant (token order doesn't matter)

def self_attention_no_pos(x):
    """x: (batch, seq_len, d_model)"""
    d_k = x.size(-1)
    scores = torch.matmul(x, x.transpose(-2, -1)) / (d_k ** 0.5)
    weights = torch.softmax(scores, dim=-1)
    return torch.matmul(weights, x)

# Create input
x = torch.randn(1, 4, 8)  # 4 tokens, d_model=8

# Original output
out1 = self_attention_no_pos(x)

# Shuffle token order: [0,1,2,3] → [2,0,3,1]
perm = [2, 0, 3, 1]
x_shuffled = x[:, perm, :]
out2 = self_attention_no_pos(x_shuffled)

# Check: output is also shuffled in the same order
inv_perm = [1, 3, 0, 2]  # inverse permutation
out2_reordered = out2[:, inv_perm, :]

print(f"Difference: {(out1 - out2_reordered).abs().max().item():.10f}")
# → near 0! Attention doesn't distinguish order
# → "The cat sat on mat" = "mat on sat cat The"
# That's why Positional Encoding is REQUIRED!
</code></pre>

<p><em>Explanation: Without Positional Encoding, self-attention is <strong>permutation equivariant</strong> — it processes "The cat sat" identically to "sat The cat". Positional Encoding breaks this symmetry, allowing the model to distinguish token order. In Diffusion Models, the same concept is used for timestep embedding.</em></p>
</details>

<p><strong>Q3:</strong> GPT uses causal masking. Write code to create a causal mask and explain each element in the mask matrix.</p>

<details>
<summary>Show Answer Q3</summary>

<pre><code class="language-python">import torch

def create_causal_mask(seq_len):
    """
    Create a causal (look-ahead) mask for the decoder.
    mask[i][j] = 1 if token i can attend to token j (j <= i)
    mask[i][j] = 0 if token i CANNOT see token j (j > i)
    """
    mask = torch.tril(torch.ones(seq_len, seq_len))
    return mask

seq_len = 5
mask = create_causal_mask(seq_len)
print("Causal Mask:")
print(mask)
# tensor([[1., 0., 0., 0., 0.],
#         [1., 1., 0., 0., 0.],
#         [1., 1., 1., 0., 0.],
#         [1., 1., 1., 1., 0.],
#         [1., 1., 1., 1., 1.]])

# Apply to attention
def causal_attention(Q, K, V):
    d_k = Q.size(-1)
    seq_len = Q.size(1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)

    # Apply causal mask
    mask = create_causal_mask(seq_len).unsqueeze(0)  # (1, S, S)
    scores = scores.masked_fill(mask == 0, float('-inf'))
    # Result: future positions → -inf → softmax → 0

    weights = torch.softmax(scores, dim=-1)
    print("Attention weights (causal):")
    print(weights[0].detach())
    # Row 0: [1.0, 0.0, 0.0, 0.0, 0.0]  ← token 0 only sees itself
    # Row 1: [0.4, 0.6, 0.0, 0.0, 0.0]  ← token 1 sees tokens 0, 1
    # Row 4: [0.1, 0.2, 0.3, 0.2, 0.2]  ← token 4 sees all tokens

    return torch.matmul(weights, V)

B, S, D = 1, 5, 32
Q = torch.randn(B, S, D)
K = torch.randn(B, S, D)
V = torch.randn(B, S, D)
out = causal_attention(Q, K, V)
print(f"Output shape: {out.shape}")  # (1, 5, 32)
</code></pre>

<p><em>Explanation: The causal mask is a lower-triangular matrix (<code>torch.tril</code>). Positions where <code>mask[i][j]=0</code> (j > i) are filled with <code>-inf</code> before softmax, becoming 0 after softmax. This ensures each token only attends to preceding tokens — essential for autoregressive generation in GPT.</em></p>
</details>

<p><strong>Q4:</strong> For the following use cases, choose the most appropriate model family and explain why:</p>
<ul>
<li>(a) Email spam/not-spam classification</li>
<li>(b) Vietnamese to English translation</li>
<li>(c) Free-form text generation chatbot</li>
<li>(d) Extracting person names from text (NER)</li>
</ul>

<details>
<summary>Show Answer Q4</summary>

<pre><code class="language-python"># Mapping use cases → model families

tasks = {
    "(a) Email spam classification": {
        "model_family": "Encoder-only (BERT)",
        "reason": "Classification task — needs to understand the entire email "
                  "(bidirectional). Output = 1 label (spam/not-spam). "
                  "BERT + Linear classifier head.",
        "code_hint": "BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)"
    },
    "(b) Vietnamese → English translation": {
        "model_family": "Encoder-Decoder (T5, mBART)",
        "reason": "Seq2seq task — input sequence (Vietnamese) → output "
                  "sequence (English). Encoder understands input, decoder "
                  "generates output. T5 or mBART for multilingual.",
        "code_hint": "T5ForConditionalGeneration.from_pretrained('t5-base')"
    },
    "(c) Free-form chatbot": {
        "model_family": "Decoder-only (GPT, LLaMA)",
        "reason": "Autoregressive generation — generates text token-by-token, "
                  "no separate encoder needed. GPT/LLaMA with instruction "
                  "tuning for chatbot use case.",
        "code_hint": "AutoModelForCausalLM.from_pretrained('meta-llama/Llama-2-7b-chat-hf')"
    },
    "(d) Named Entity Recognition": {
        "model_family": "Encoder-only (BERT)",
        "reason": "Token classification — needs to assign a label to EACH token "
                  "(B-PER, I-PER, O, B-LOC,...). BERT's bidirectional attention "
                  "allows each token to see context on both sides.",
        "code_hint": "BertForTokenClassification.from_pretrained('bert-base-uncased', num_labels=9)"
    }
}

for task, info in tasks.items():
    print(f"\n{task}")
    print(f"  → {info['model_family']}")
    print(f"  Reason: {info['reason']}")
    print(f"  Code: {info['code_hint']}")
</code></pre>

<p><em>Explanation: General rule: (1) If output is 1 label for the entire input → Encoder (BERT), (2) If output is a label for each token → Encoder (BERT) + token classification head, (3) If output is a sequence in a different language/format → Encoder-Decoder (T5), (4) If continuous text generation is needed → Decoder (GPT). However, in practice, sufficiently large decoder-only LLMs (GPT-4, LLaMA-70B) can handle any task well via prompting.</em></p>
</details>

<p><strong>Q5:</strong> Debug the following Transformer error. The code has a dimension bug — find and fix it:</p>

<pre><code class="language-python"># BUG CODE — Find and fix the error
class BrokenMultiHeadAttention(nn.Module):
    def __init__(self, d_model=512, num_heads=8):
        super().__init__()
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads  # 64

        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

    def forward(self, x, mask=None):
        B = x.size(0)
        Q = self.W_q(x)
        K = self.W_k(x)
        V = self.W_v(x)

        # BUG: wrong dimension order in reshape
        Q = Q.view(B, self.num_heads, -1, self.d_k)  # ← Wrong!
        K = K.view(B, self.num_heads, -1, self.d_k)
        V = V.view(B, self.num_heads, -1, self.d_k)

        scores = torch.matmul(Q, K.transpose(-2, -1)) / (self.d_k ** 0.5)
        weights = torch.softmax(scores, dim=-1)
        context = torch.matmul(weights, V)

        # BUG: missing contiguous() before view
        context = context.transpose(1, 2).view(B, -1, self.d_model)  # ← Wrong!
        return self.W_o(context)
</code></pre>

<details>
<summary>Show Answer Q5</summary>

<pre><code class="language-python">import torch
import torch.nn as nn

class FixedMultiHeadAttention(nn.Module):
    def __init__(self, d_model=512, num_heads=8):
        super().__init__()
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads

        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

    def forward(self, x, mask=None):
        B = x.size(0)
        Q = self.W_q(x)
        K = self.W_k(x)
        V = self.W_v(x)

        # FIX 1: Correct order: (B, S, d_model) → (B, S, h, d_k) → (B, h, S, d_k)
        # Must view as (B, S, h, d_k) FIRST, then transpose(1,2)
        Q = Q.view(B, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = K.view(B, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = V.view(B, -1, self.num_heads, self.d_k).transpose(1, 2)

        scores = torch.matmul(Q, K.transpose(-2, -1)) / (self.d_k ** 0.5)
        weights = torch.softmax(scores, dim=-1)
        context = torch.matmul(weights, V)  # (B, h, S, d_k)

        # FIX 2: Add .contiguous() after transpose before .view()
        context = context.transpose(1, 2).contiguous().view(B, -1, self.d_model)
        return self.W_o(context)

# Verify
model = FixedMultiHeadAttention(d_model=512, num_heads=8)
x = torch.randn(2, 10, 512)
out = model(x)
print(f"Output shape: {out.shape}")  # (2, 10, 512) ✓
assert out.shape == (2, 10, 512)
print("Fixed! All correct.")
</code></pre>

<p><em>Explanation: There are 2 bugs: <strong>Bug 1:</strong> <code>view(B, num_heads, -1, d_k)</code> is wrong because the tensor layout in memory is <code>(B, S, d_model)</code>. You must first view as <code>(B, S, num_heads, d_k)</code> then <code>transpose(1, 2)</code> to get <code>(B, num_heads, S, d_k)</code>. Directly viewing as <code>(B, num_heads, S, d_k)</code> will mix data across heads. <strong>Bug 2:</strong> After <code>transpose(1, 2)</code>, the tensor is no longer contiguous in memory. Calling <code>.view()</code> on a non-contiguous tensor causes a RuntimeError. You must add <code>.contiguous()</code> before <code>.view()</code>.</em></p>
</details>
