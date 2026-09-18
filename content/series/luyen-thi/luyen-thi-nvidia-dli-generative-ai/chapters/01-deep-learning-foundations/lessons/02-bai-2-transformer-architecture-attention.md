---
id: 019c9619-nv01-p1-l02
title: 'Bài 2: Transformer Architecture & Attention Mechanism'
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
  title: 'Luyện thi NVIDIA DLI — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="gioi-thieu">1. Giới thiệu</h2>

<p><strong>Transformer</strong> là kiến trúc nền tảng đằng sau mọi mô hình Generative AI hiện đại — từ <strong>GPT</strong>, <strong>BERT</strong>, <strong>Stable Diffusion</strong> đến <strong>LLaMA</strong>. Trong bài assessment của NVIDIA DLI, bạn phải hiểu rõ cách <strong>Attention Mechanism</strong> hoạt động và có khả năng implement nó bằng PyTorch.</p>

<p>Bài học này sẽ đi từ <strong>Scaled Dot-Product Attention</strong> đến toàn bộ kiến trúc <strong>Transformer</strong>, sau đó mapping sang các model families và NLP tasks cụ thể.</p>

<blockquote><p><strong>Exam tip:</strong> NVIDIA DLI assessment thường yêu cầu bạn hoàn thành code cho attention mechanism hoặc debug lỗi dimension mismatch trong Transformer. Hãy nắm vững <strong>tensor shapes</strong> qua từng bước của attention — đây là chìa khóa để pass assessment.</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai2-transformer-architecture.webp" alt="Kiến trúc Transformer — Encoder-Decoder, Self-Attention, Cross-Attention" loading="lazy" /><figcaption>Kiến trúc Transformer — Encoder-Decoder, Self-Attention, Cross-Attention</figcaption></figure>

<h2 id="attention-mechanism">2. Attention Mechanism</h2>

<h3 id="attention-intuition">2.1 Trực giác — "Phần nào quan trọng nhất?"</h3>

<p><strong>Attention</strong> trả lời câu hỏi: "Khi xử lý token hiện tại, những token nào trong input sequence là quan trọng nhất?" Thay vì nén toàn bộ sequence vào một fixed-size vector như RNN, Attention cho phép mô hình "nhìn" trực tiếp vào mọi vị trí của input.</p>

<p>Cơ chế hoạt động qua 3 thành phần:</p>

<ul>
<li><strong>Query (Q)</strong> — "Tôi đang tìm gì?" — token hiện tại đặt câu hỏi</li>
<li><strong>Key (K)</strong> — "Tôi chứa thông tin gì?" — mỗi token quảng cáo nội dung của mình</li>
<li><strong>Value (V)</strong> — "Đây là thông tin thực sự" — nội dung được trả về khi match</li>
</ul>

<pre><code class="language-text">Ví dụ: "The cat sat on the mat because it was tired"
                                          ↑
                                    Token "it" (Query)
                                          │
            ┌─────────────────────────────┤
            │     Attention scores:       │
            │   "cat"  = 0.72  ← cao!    │
            │   "mat"  = 0.11            │
            │   "sat"  = 0.08            │
            │   "The"  = 0.03            │
            │   ...                       │
            └─────────────────────────────┘
            → "it" attend chủ yếu vào "cat"
</code></pre>

<h3 id="scaled-dot-product">2.2 Scaled Dot-Product Attention</h3>

<p>Công thức chính của attention:</p>

<pre><code class="language-text">Attention(Q, K, V) = softmax(Q · K^T / √d_k) · V

Trong đó:
  Q: Query matrix  — shape (seq_len, d_k)
  K: Key matrix    — shape (seq_len, d_k)
  V: Value matrix  — shape (seq_len, d_v)
  d_k: dimension của Key vectors
  √d_k: scaling factor để tránh gradient vanishing trong softmax
</code></pre>

<p>Tại sao cần <strong>scaling</strong> bằng √d_k? Khi d_k lớn, dot product Q·K^T có thể rất lớn, khiến softmax bão hòa → gradient gần bằng 0. Chia cho √d_k giữ variance ổn định.</p>

<pre><code class="language-text">Flow của Scaled Dot-Product Attention:

  Q ──┐
      │──→ MatMul ──→ Scale (÷√d_k) ──→ Mask (opt.) ──→ Softmax ──→ MatMul ──→ Output
  K ──┘                                                                ↑
                                                                       │
  V ────────────────────────────────────────────────────────────────────┘

Shapes (batch_size=B, seq_len=S, d_k=D):
  Q:        (B, S, D)
  K^T:      (B, D, S)
  Q·K^T:    (B, S, S)   ← attention score matrix
  softmax:  (B, S, S)   ← attention weights (mỗi hàng sum = 1)
  × V:      (B, S, D)   ← weighted output
</code></pre>

<h3 id="attention-code">2.3 Code: Implement Attention từ Scratch</h3>

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

    # Step 1: Tính attention scores
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    # scores shape: (batch, seq_len, seq_len)

    # Step 2: Apply mask (cho causal attention trong decoder)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))

    # Step 3: Softmax để có attention weights
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
print(f"Weights sum per row: {weights.sum(dim=-1)}")  # mỗi hàng = 1.0
</code></pre>

<blockquote><p><strong>Exam tip:</strong> Lỗi phổ biến nhất khi implement attention: quên <code>K.transpose(-2, -1)</code> hoặc chia sai dimension. Hãy luôn kiểm tra shape sau mỗi bước — <code>scores</code> phải có shape <code>(batch, seq_len, seq_len)</code>.</p></blockquote>

<h2 id="multi-head-attention">3. Multi-Head Attention</h2>

<h3 id="why-multi-head">3.1 Tại sao cần nhiều heads?</h3>

<p>Một head duy nhất chỉ học được <strong>một loại relationship</strong>. Multi-Head Attention cho phép mô hình attend đồng thời vào nhiều <strong>representation subspaces</strong> khác nhau:</p>

<ul>
<li>Head 1: học syntactic relationships (subject-verb)</li>
<li>Head 2: học coreference (pronoun → noun)</li>
<li>Head 3: học positional proximity</li>
<li>Head 4: học semantic similarity</li>
</ul>

<pre><code class="language-text">Multi-Head Attention Flow:

Input (batch, seq_len, d_model)
    │
    ├── Linear → Q ──┐
    ├── Linear → K ──┼── Split thành h heads
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
  Per-head Q/K/V: (B, h, S, 64)   ← reshape sau linear
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
        assert d_model % num_heads == 0, "d_model phải chia hết cho num_heads"

        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads

        # Linear projections cho Q, K, V và output
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

        # Step 2: Reshape thành multi-head format
        # (B, S, d_model) → (B, S, h, d_k) → (B, h, S, d_k)
        Q = Q.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = K.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = V.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)

        # Step 3: Scaled dot-product attention cho mỗi head
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
<tr><th>Parameter</th><th>Giá trị thường gặp</th><th>Ghi chú</th></tr>
</thead>
<tbody>
<tr><td>d_model</td><td>512, 768, 1024</td><td>Kích thước embedding</td></tr>
<tr><td>num_heads</td><td>8, 12, 16</td><td>d_model phải chia hết cho num_heads</td></tr>
<tr><td>d_k = d_model / h</td><td>64, 64, 64</td><td>Mỗi head thường có d_k = 64</td></tr>
<tr><td>Total params (MHA)</td><td>4 × d_model²</td><td>4 linear layers: W_q, W_k, W_v, W_o</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Trong DLI assessment, nếu bạn gặp lỗi <code>RuntimeError: shape mismatch</code> ở attention, hãy kiểm tra: (1) <code>d_model % num_heads == 0</code>, (2) <code>view()</code> và <code>transpose()</code> đúng thứ tự, (3) nhớ gọi <code>.contiguous()</code> trước <code>.view()</code> sau transpose.</p></blockquote>

<h2 id="transformer-architecture">4. Transformer Architecture</h2>

<h3 id="encoder-block">4.1 Encoder Block</h3>

<p>Mỗi layer trong <strong>Transformer Encoder</strong> gồm 2 sub-layers với <strong>residual connections</strong> và <strong>layer normalization</strong>:</p>

<pre><code class="language-text">Transformer Encoder Block:

  Input
    │
    ▼
┌─────────────────────────────┐
│  Multi-Head Self-Attention  │
└──────────────┬──────────────┘
               │
    ┌──────────┴──────────┐
    │     Add & Norm      │ ← x + Sublayer(x), rồi LayerNorm
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

<p><strong>Decoder</strong> có thêm một sub-layer <strong>Cross-Attention</strong> — attend vào output của encoder:</p>

<pre><code class="language-text">Transformer Decoder Block:

  Input (shifted right)
    │
    ▼
┌────────────────────────────────┐
│  Masked Multi-Head Attention   │ ← causal mask: chỉ nhìn tokens trước
└──────────────┬─────────────────┘
               │
    ┌──────────┴──────────┐
    │     Add & Norm      │
    └──────────┬──────────┘
               │
    ┌──────────┴──────────────────────────┐
    │  Cross Multi-Head Attention         │ ← Q từ decoder, K/V từ encoder
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

<p>Transformer không có khái niệm "thứ tự" như RNN. <strong>Positional Encoding</strong> thêm thông tin vị trí vào embedding bằng hàm sin/cos:</p>

<pre><code class="language-text">PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))

pos: vị trí token trong sequence (0, 1, 2, ...)
i:   chỉ số dimension (0, 1, 2, ..., d_model/2)
</code></pre>

<p>Đây chính xác là concept được <strong>reuse trong Diffusion Models</strong> — sinusoidal embeddings để encode timestep t. Nắm vững positional encoding ở đây sẽ giúp bạn rất nhiều ở phần Diffusion.</p>

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
<tr><td>Normalize across</td><td>Batch dimension</td><td>Feature dimension</td></tr>
<tr><td>Phụ thuộc batch size</td><td>Có — cần batch đủ lớn</td><td>Không — hoạt động trên từng sample</td></tr>
<tr><td>Dùng trong</td><td>CNN (computer vision)</td><td>Transformer, RNN (NLP)</td></tr>
<tr><td>Inference behavior</td><td>Dùng running statistics</td><td>Tính trực tiếp — giống train</td></tr>
<tr><td>Transformer sử dụng</td><td>Không</td><td><strong>Có — mọi sub-layer</strong></td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Nếu câu hỏi hỏi "vì sao Transformer dùng LayerNorm thay vì BatchNorm?" → trả lời: (1) NLP có variable sequence length → batch stats không ổn định, (2) LayerNorm không phụ thuộc batch size, hoạt động tốt với batch size nhỏ và inference.</p></blockquote>

<h2 id="model-families">5. Model Families</h2>

<h3 id="encoder-only">5.1 Encoder-only: BERT</h3>

<p><strong>BERT</strong> (Bidirectional Encoder Representations from Transformers) chỉ sử dụng phần <strong>Encoder</strong>. Pre-training bằng:</p>

<ul>
<li><strong>MLM (Masked Language Modeling)</strong> — che 15% tokens, dự đoán token bị che</li>
<li><strong>NSP (Next Sentence Prediction)</strong> — hai câu có liên tiếp không?</li>
</ul>

<p>Vì BERT nhìn được cả hai hướng (bidirectional), nó rất mạnh cho các task <strong>understanding</strong>: classification, NER, QA.</p>

<h3 id="decoder-only">5.2 Decoder-only: GPT</h3>

<p><strong>GPT</strong> (Generative Pre-trained Transformer) chỉ sử dụng <strong>Decoder</strong> với <strong>causal masking</strong> — mỗi token chỉ attend vào các token trước nó. Pre-training bằng <strong>next-token prediction</strong>.</p>

<pre><code class="language-text">Causal Attention Mask (GPT):

Token:   [The]  [cat]  [sat]  [on]
The       ✓      ✗      ✗      ✗
cat       ✓      ✓      ✗      ✗
sat       ✓      ✓      ✓      ✗
on        ✓      ✓      ✓      ✓

✓ = có thể attend    ✗ = bị mask (= -inf trước softmax)

→ Mỗi token chỉ "thấy" tokens trước nó
→ Phù hợp cho generation: sinh token tiếp theo
</code></pre>

<h3 id="encoder-decoder">5.3 Encoder-Decoder: T5</h3>

<p><strong>T5</strong> (Text-to-Text Transfer Transformer) sử dụng đầy đủ kiến trúc <strong>Encoder-Decoder</strong>. Mọi task đều được frame thành "text-in → text-out":</p>

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
<tr><td>Attention mask</td><td>Full (nhìn mọi token)</td><td>Causal (chỉ nhìn trước)</td><td>Full enc + causal dec</td></tr>
<tr><td>Mạnh cho</td><td>Understanding: NER, QA, classification</td><td>Generation: text, code</td><td>Seq2seq: translation, summary</td></tr>
<tr><td>Output</td><td>Contextual embeddings</td><td>Next token probability</td><td>Target sequence</td></tr>
<tr><td>Ví dụ models</td><td>BERT, RoBERTa, DeBERTa</td><td>GPT-2/3/4, LLaMA</td><td>T5, BART, mBART</td></tr>
</tbody>
</table>

<pre><code class="language-text">Decision Tree — Chọn Model Family:

                ┌─ Cần sinh text dài?
                │   YES → Decoder-only (GPT, LLaMA)
                │
Task ───────────┤
                │   ┌─ Input→Output seq?
                │   │   YES → Encoder-Decoder (T5, BART)
                NO ─┤
                    │   NO → Encoder-only (BERT)
                    │   (classification, NER, embedding)
                    └──────────────────────────────────
</code></pre>

<blockquote><p><strong>Exam tip:</strong> Câu hỏi thường gặp: "Cho task X, nên dùng model family nào?" Rule nhanh: (1) Understanding / classification → BERT, (2) Generation → GPT, (3) Seq2seq (translation, summarization) → T5. Nhưng lưu ý: GPT đủ lớn cũng làm được mọi task qua <strong>prompting</strong>.</p></blockquote>

<h2 id="tokenization">6. Tokenization</h2>

<h3 id="token-vs-word">6.1 Token vs Word</h3>

<p>Mô hình ngôn ngữ không làm việc với "từ" mà với <strong>tokens</strong> — đơn vị nhỏ hơn hoặc bằng một từ. Tokenization quyết định cách chia text thành tokens.</p>

<pre><code class="language-text">Ví dụ tokenization cho "unbelievable":

Word-level:     ["unbelievable"]         → vocab quá lớn, OOV nhiều
Character:      ["u","n","b","e",...]    → sequence quá dài
Subword (BPE):  ["un", "believ", "able"] → cân bằng vocab size và seq length
</code></pre>

<h3 id="bpe-wordpiece-sentencepiece">6.2 BPE, WordPiece, SentencePiece</h3>

<table>
<thead>
<tr><th>Algorithm</th><th>Sử dụng bởi</th><th>Cách hoạt động</th><th>Đặc điểm</th></tr>
</thead>
<tbody>
<tr><td><strong>BPE</strong> (Byte-Pair Encoding)</td><td>GPT-2/3/4, RoBERTa</td><td>Merge cặp byte phổ biến nhất lặp lại</td><td>Bottom-up, greedy merging</td></tr>
<tr><td><strong>WordPiece</strong></td><td>BERT, DistilBERT</td><td>Merge pair maximize likelihood</td><td>Dùng <code>##</code> prefix cho subword</td></tr>
<tr><td><strong>SentencePiece</strong></td><td>T5, LLaMA, mT5</td><td>Unigram LM hoặc BPE trên raw text</td><td>Language-agnostic, không cần pre-tokenize</td></tr>
</tbody>
</table>

<pre><code class="language-text">Ví dụ so sánh:

Input: "I love tokenization"

BPE (GPT-2):       ["I", " love", " token", "ization"]
WordPiece (BERT):   ["I", "love", "token", "##ization"]
SentencePiece (T5): ["▁I", "▁love", "▁token", "ization"]

WordPiece dùng ## cho continuation
SentencePiece dùng ▁ cho word start
</code></pre>

<h3 id="tokenizer-code">6.3 Code: Tokenization với HuggingFace</h3>

<pre><code class="language-python">from transformers import AutoTokenizer

# Load tokenizers của mỗi model family
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

# Decode ngược lại
decoded = bert_tok.decode(ids[0])
print(f"Decoded: {decoded}")
</code></pre>

<p>Vocab size ảnh hưởng đến embedding size và model capacity:</p>

<table>
<thead>
<tr><th>Model</th><th>Tokenizer</th><th>Vocab Size</th><th>Ghi chú</th></tr>
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

<h3 id="classification-code">7.2 Code: Fine-tune BERT cho Text Classification</h3>

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

        # Lấy [CLS] token representation cho classification
        cls_output = outputs.pooler_output  # (batch, hidden_size)
        cls_output = self.dropout(cls_output)
        logits = self.classifier(cls_output)  # (batch, num_classes)
        return logits

# Sử dụng
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

<pre><code class="language-python"># Training loop cho BERT classifier
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

<blockquote><p><strong>Exam tip:</strong> Khi fine-tune BERT, 3 điểm quan trọng: (1) <strong>Learning rate nhỏ</strong> (2e-5 đến 5e-5) vì model đã pre-trained, (2) <strong>Gradient clipping</strong> (<code>clip_grad_norm_</code>) để ổn định training, (3) Dùng <strong>pooler_output</strong> (CLS token) cho classification, <strong>last_hidden_state</strong> cho token-level tasks (NER).</p></blockquote>

<h2 id="cheat-sheet">8. Cheat Sheet</h2>

<table>
<thead>
<tr><th>Concept</th><th>Key Formula / Pattern</th><th>Ghi nhớ</th></tr>
</thead>
<tbody>
<tr><td>Scaled Dot-Product</td><td><code>softmax(QK^T / √d_k) V</code></td><td>Chia √d_k để tránh softmax bão hòa</td></tr>
<tr><td>Multi-Head</td><td>Split → h × Attention → Concat → Linear</td><td>d_k = d_model / num_heads</td></tr>
<tr><td>Positional Encoding</td><td>sin/cos functions</td><td>Reused trong Diffusion timestep embedding</td></tr>
<tr><td>Encoder (BERT)</td><td>Bidirectional, MLM</td><td>Understanding tasks: NER, QA, classification</td></tr>
<tr><td>Decoder (GPT)</td><td>Causal mask, next-token</td><td>Generation tasks: text, code</td></tr>
<tr><td>Enc-Dec (T5)</td><td>Cross-attention, seq2seq</td><td>Translation, summarization</td></tr>
<tr><td>BPE</td><td>Merge frequent byte pairs</td><td>GPT family</td></tr>
<tr><td>WordPiece</td><td>Maximize likelihood merge</td><td>BERT family, dùng ## prefix</td></tr>
<tr><td>SentencePiece</td><td>Language-agnostic on raw text</td><td>T5, LLaMA, dùng ▁ prefix</td></tr>
<tr><td>Causal Mask</td><td>Lower-triangular matrix</td><td>GPT: mỗi token chỉ thấy trước nó</td></tr>
<tr><td>Layer Norm</td><td>Normalize across features</td><td>Dùng trong Transformer (không phải BatchNorm)</td></tr>
<tr><td>Fine-tune LR</td><td>2e-5 → 5e-5</td><td>LR nhỏ vì pre-trained weights</td></tr>
</tbody>
</table>

<h2 id="practice-questions">9. Practice Questions</h2>

<p>Các câu hỏi dạng coding assessment tương tự NVIDIA DLI:</p>

<p><strong>Q1:</strong> Implement <code>scaled_dot_product_attention</code> function. Hàm nhận Q, K, V tensors và optional mask, trả về output và attention weights.</p>

<details>
<summary>Xem đáp án Q1</summary>

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

# Kiểm tra:
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

<p><em>Giải thích: Điểm mấu chốt là (1) <code>K.transpose(-2, -1)</code> để matrix multiply đúng, (2) chia <code>math.sqrt(d_k)</code> để scale, (3) <code>masked_fill</code> với <code>-inf</code> trước softmax, (4) softmax trên <code>dim=-1</code>. Lỗi phổ biến: quên transpose K hoặc softmax sai dim.</em></p>
</details>

<p><strong>Q2:</strong> Điều gì xảy ra nếu loại bỏ Positional Encoding khỏi Transformer? Viết code chứng minh.</p>

<details>
<summary>Xem đáp án Q2</summary>

<pre><code class="language-python">import torch

# Self-attention KHÔNG có positional encoding
# → output là permutation invariant (thứ tự token không ảnh hưởng)

def self_attention_no_pos(x):
    """x: (batch, seq_len, d_model)"""
    d_k = x.size(-1)
    scores = torch.matmul(x, x.transpose(-2, -1)) / (d_k ** 0.5)
    weights = torch.softmax(scores, dim=-1)
    return torch.matmul(weights, x)

# Tạo input
x = torch.randn(1, 4, 8)  # 4 tokens, d_model=8

# Output gốc
out1 = self_attention_no_pos(x)

# Shuffle thứ tự tokens: [0,1,2,3] → [2,0,3,1]
perm = [2, 0, 3, 1]
x_shuffled = x[:, perm, :]
out2 = self_attention_no_pos(x_shuffled)

# Kiểm tra: output cũng bị shuffle theo cùng thứ tự
inv_perm = [1, 3, 0, 2]  # inverse permutation
out2_reordered = out2[:, inv_perm, :]

print(f"Difference: {(out1 - out2_reordered).abs().max().item():.10f}")
# → gần 0! Attention không phân biệt thứ tự
# → "The cat sat on mat" = "mat on sat cat The"
# Đó là lý do PHẢI có Positional Encoding!
</code></pre>

<p><em>Giải thích: Không có Positional Encoding, self-attention là <strong>permutation equivariant</strong> — nó xử lý "The cat sat" giống hệt "sat The cat". Positional Encoding phá vỡ tính đối xứng này, cho phép model phân biệt thứ tự tokens. Trong Diffusion Models, cùng concept này được dùng cho timestep embedding.</em></p>
</details>

<p><strong>Q3:</strong> GPT sử dụng causal masking. Hãy viết code tạo causal mask và giải thích mỗi phần tử trong ma trận mask.</p>

<details>
<summary>Xem đáp án Q3</summary>

<pre><code class="language-python">import torch

def create_causal_mask(seq_len):
    """
    Tạo causal (look-ahead) mask cho decoder.
    mask[i][j] = 1 nếu token i được attend vào token j (j <= i)
    mask[i][j] = 0 nếu token i KHÔNG được nhìn token j (j > i)
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

# Áp dụng vào attention
def causal_attention(Q, K, V):
    d_k = Q.size(-1)
    seq_len = Q.size(1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)

    # Apply causal mask
    mask = create_causal_mask(seq_len).unsqueeze(0)  # (1, S, S)
    scores = scores.masked_fill(mask == 0, float('-inf'))
    # Kết quả: vị trí tương lai → -inf → softmax → 0

    weights = torch.softmax(scores, dim=-1)
    print("Attention weights (causal):")
    print(weights[0].detach())
    # Row 0: [1.0, 0.0, 0.0, 0.0, 0.0]  ← token 0 chỉ thấy chính nó
    # Row 1: [0.4, 0.6, 0.0, 0.0, 0.0]  ← token 1 thấy token 0,1
    # Row 4: [0.1, 0.2, 0.3, 0.2, 0.2]  ← token 4 thấy tất cả

    return torch.matmul(weights, V)

B, S, D = 1, 5, 32
Q = torch.randn(B, S, D)
K = torch.randn(B, S, D)
V = torch.randn(B, S, D)
out = causal_attention(Q, K, V)
print(f"Output shape: {out.shape}")  # (1, 5, 32)
</code></pre>

<p><em>Giải thích: Causal mask là ma trận tam giác dưới (<code>torch.tril</code>). Vị trí <code>mask[i][j]=0</code> (j > i) được fill bằng <code>-inf</code> trước softmax, biến thành 0 sau softmax. Điều này đảm bảo mỗi token chỉ attend vào các token trước nó — essential cho autoregressive generation trong GPT.</em></p>
</details>

<p><strong>Q4:</strong> Cho các use cases sau, hãy chọn model family phù hợp nhất và giải thích lý do:</p>
<ul>
<li>(a) Phân loại email spam/not-spam</li>
<li>(b) Dịch tiếng Việt sang tiếng Anh</li>
<li>(c) Chatbot tạo text tự do</li>
<li>(d) Trích xuất tên người từ văn bản (NER)</li>
</ul>

<details>
<summary>Xem đáp án Q4</summary>

<pre><code class="language-python"># Mapping use cases → model families

tasks = {
    "(a) Email spam classification": {
        "model_family": "Encoder-only (BERT)",
        "reason": "Classification task — cần hiểu toàn bộ email "
                  "(bidirectional). Output = 1 label (spam/not-spam). "
                  "BERT + Linear classifier head.",
        "code_hint": "BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)"
    },
    "(b) Vietnamese → English translation": {
        "model_family": "Encoder-Decoder (T5, mBART)",
        "reason": "Seq2seq task — input sequence (Vietnamese) → output "
                  "sequence (English). Encoder hiểu input, decoder sinh "
                  "output. T5 hoặc mBART cho multilingual.",
        "code_hint": "T5ForConditionalGeneration.from_pretrained('t5-base')"
    },
    "(c) Free-form chatbot": {
        "model_family": "Decoder-only (GPT, LLaMA)",
        "reason": "Autoregressive generation — sinh text token-by-token, "
                  "không cần encoder riêng. GPT/LLaMA với instruction "
                  "tuning cho chatbot use case.",
        "code_hint": "AutoModelForCausalLM.from_pretrained('meta-llama/Llama-2-7b-chat-hf')"
    },
    "(d) Named Entity Recognition": {
        "model_family": "Encoder-only (BERT)",
        "reason": "Token classification — cần gán label cho TỪNG token "
                  "(B-PER, I-PER, O, B-LOC,...). BERT bidirectional "
                  "giúp mỗi token nhìn context cả hai phía.",
        "code_hint": "BertForTokenClassification.from_pretrained('bert-base-uncased', num_labels=9)"
    }
}

for task, info in tasks.items():
    print(f"\n{task}")
    print(f"  → {info['model_family']}")
    print(f"  Lý do: {info['reason']}")
    print(f"  Code: {info['code_hint']}")
</code></pre>

<p><em>Giải thích: Rule tổng quát: (1) Nếu output là 1 label cho toàn bộ input → Encoder (BERT), (2) Nếu output là label cho mỗi token → Encoder (BERT) + token classification head, (3) Nếu output là sequence khác input language/format → Encoder-Decoder (T5), (4) Nếu cần sinh text liên tục → Decoder (GPT). Tuy nhiên, trong thực tế, LLM decoder-only đủ lớn (GPT-4, LLaMA-70B) có thể làm tốt mọi task qua prompting.</em></p>
</details>

<p><strong>Q5:</strong> Debug lỗi sau trong Transformer. Code có bug ở dimension — tìm và sửa:</p>

<pre><code class="language-python"># BUG CODE — Tìm và sửa lỗi
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

        # BUG: reshape sai thứ tự dimensions
        Q = Q.view(B, self.num_heads, -1, self.d_k)  # ← Sai!
        K = K.view(B, self.num_heads, -1, self.d_k)
        V = V.view(B, self.num_heads, -1, self.d_k)

        scores = torch.matmul(Q, K.transpose(-2, -1)) / (self.d_k ** 0.5)
        weights = torch.softmax(scores, dim=-1)
        context = torch.matmul(weights, V)

        # BUG: quên contiguous() trước view
        context = context.transpose(1, 2).view(B, -1, self.d_model)  # ← Sai!
        return self.W_o(context)
</code></pre>

<details>
<summary>Xem đáp án Q5</summary>

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

        # FIX 1: Đúng thứ tự: (B, S, d_model) → (B, S, h, d_k) → (B, h, S, d_k)
        # Phải view thành (B, S, h, d_k) TRƯỚC, rồi transpose(1,2)
        Q = Q.view(B, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = K.view(B, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = V.view(B, -1, self.num_heads, self.d_k).transpose(1, 2)

        scores = torch.matmul(Q, K.transpose(-2, -1)) / (self.d_k ** 0.5)
        weights = torch.softmax(scores, dim=-1)
        context = torch.matmul(weights, V)  # (B, h, S, d_k)

        # FIX 2: Thêm .contiguous() sau transpose trước .view()
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

<p><em>Giải thích: Có 2 lỗi: <strong>Bug 1:</strong> <code>view(B, num_heads, -1, d_k)</code> sai vì tensor layout trong memory là <code>(B, S, d_model)</code>. Phải view thành <code>(B, S, num_heads, d_k)</code> trước rồi <code>transpose(1, 2)</code> để có <code>(B, num_heads, S, d_k)</code>. View trực tiếp thành <code>(B, num_heads, S, d_k)</code> sẽ trộn lẫn data giữa các heads. <strong>Bug 2:</strong> Sau <code>transpose(1, 2)</code>, tensor không còn contiguous trong memory. Gọi <code>.view()</code> trên non-contiguous tensor gây RuntimeError. Phải thêm <code>.contiguous()</code> trước <code>.view()</code>.</em></p>
</details>
