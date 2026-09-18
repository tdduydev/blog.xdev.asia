---
id: 019c9619-nv01-p1-l02
title: '第2課：Transformer架構與Attention機制'
slug: bai-2-transformer-architecture-attention
description: >-
  Self-attention、multi-head attention、positional encoding。
  Encoder-decoder架構。BERT、GPT、T5模型家族。
  Tokenization：BPE、WordPiece、SentencePiece。
  NLP任務：分類、NER、QA、摘要。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 2
section_title: "第1部分：深度學習基礎"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'NVIDIA DLI 考試準備 — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="gioi-thieu">1. 簡介</h2>

<p><strong>Transformer</strong> 是所有現代 Generative AI 模型背後的基礎架構——從 <strong>GPT</strong>、<strong>BERT</strong>、<strong>Stable Diffusion</strong> 到 <strong>LLaMA</strong>。在 NVIDIA DLI 評估中，你必須徹底理解 <strong>Attention 機制</strong> 的工作原理，並能夠在 PyTorch 中實作。</p>

<p>本課涵蓋從 <strong>Scaled Dot-Product Attention</strong> 到完整 <strong>Transformer</strong> 架構的所有內容，然後對應到特定的模型家族和 NLP 任務。</p>

<blockquote><p><strong>考試提示：</strong>NVIDIA DLI 評估經常要求你補全 attention 機制的程式碼，或除錯 Transformer 中的維度不匹配錯誤。掌握 attention 每個步驟的 <strong>tensor 形狀</strong>——這是通過評估的關鍵。</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai2-transformer-architecture.webp" alt="Transformer 架構 — Encoder-Decoder、Self-Attention、Cross-Attention" loading="lazy" /><figcaption>Transformer 架構 — Encoder-Decoder、Self-Attention、Cross-Attention</figcaption></figure>

<h2 id="attention-mechanism">2. Attention 機制</h2>

<h3 id="attention-intuition">2.1 直覺理解——「什麼最重要？」</h3>

<p><strong>Attention</strong> 回答的問題是：「在處理當前 token 時，輸入序列中哪些 token 最重要？」Attention 不像 RNN 那樣將整個序列壓縮成固定大小的向量，而是讓模型直接「看到」輸入中的每個位置。</p>

<p>該機制透過 3 個組件運作：</p>

<ul>
<li><strong>Query (Q)</strong>——「我在尋找什麼？」——當前 token 提出問題</li>
<li><strong>Key (K)</strong>——「我包含什麼資訊？」——每個 token 宣告自己的內容</li>
<li><strong>Value (V)</strong>——「這是實際的資訊」——匹配時返回的內容</li>
</ul>

<pre><code class="language-text">範例："The cat sat on the mat because it was tired"
                                              ↑
                                        Token "it" (Query)
                                              │
                ┌─────────────────────────────┤
                │     Attention 分數：        │
                │   "cat"  = 0.72  ← 很高！  │
                │   "mat"  = 0.11            │
                │   "sat"  = 0.08            │
                │   "The"  = 0.03            │
                │   ...                       │
                └─────────────────────────────┘
                → "it" 主要關注 "cat"
</code></pre>

<h3 id="scaled-dot-product">2.2 Scaled Dot-Product Attention</h3>

<p>核心 attention 公式：</p>

<pre><code class="language-text">Attention(Q, K, V) = softmax(Q · K^T / √d_k) · V

其中：
  Q: Query 矩陣  — 形狀 (seq_len, d_k)
  K: Key 矩陣    — 形狀 (seq_len, d_k)
  V: Value 矩陣  — 形狀 (seq_len, d_v)
  d_k: Key 向量的維度
  √d_k: 縮放因子，防止 softmax 中梯度消失
</code></pre>

<p>為什麼需要用 √d_k 進行<strong>縮放</strong>？當 d_k 很大時，點積 Q·K^T 可能非常大，導致 softmax 飽和 → 梯度趨近於 0。除以 √d_k 可以保持方差穩定。</p>

<pre><code class="language-text">Scaled Dot-Product Attention 流程：

  Q ──┐
      │──→ MatMul ──→ Scale (÷√d_k) ──→ Mask (可選) ──→ Softmax ──→ MatMul ──→ 輸出
  K ──┘                                                                ↑
                                                                       │
  V ────────────────────────────────────────────────────────────────────┘

形狀 (batch_size=B, seq_len=S, d_k=D)：
  Q:        (B, S, D)
  K^T:      (B, D, S)
  Q·K^T:    (B, S, S)   ← attention 分數矩陣
  softmax:  (B, S, S)   ← attention 權重（每行總和為 1）
  × V:      (B, S, D)   ← 加權輸出
</code></pre>

<h3 id="attention-code">2.3 程式碼：從零實作 Attention</h3>

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

    # 步驟 1：計算 attention 分數
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    # scores 形狀：(batch, seq_len, seq_len)

    # 步驟 2：套用 mask（用於 decoder 的因果 attention）
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))

    # 步驟 3：Softmax 得到 attention 權重
    attn_weights = F.softmax(scores, dim=-1)
    # attn_weights 形狀：(batch, seq_len, seq_len)

    # 步驟 4：值的加權總和
    output = torch.matmul(attn_weights, V)
    # output 形狀：(batch, seq_len, d_v)

    return output, attn_weights

# 示範
batch_size, seq_len, d_k = 2, 5, 64
Q = torch.randn(batch_size, seq_len, d_k)
K = torch.randn(batch_size, seq_len, d_k)
V = torch.randn(batch_size, seq_len, d_k)

output, weights = scaled_dot_product_attention(Q, K, V)
print(f"Output shape: {output.shape}")    # (2, 5, 64)
print(f"Weights shape: {weights.shape}")  # (2, 5, 5)
print(f"Weights sum per row: {weights.sum(dim=-1)}")  # 每行 = 1.0
</code></pre>

<blockquote><p><strong>考試提示：</strong>實作 attention 時最常見的錯誤：忘記 <code>K.transpose(-2, -1)</code> 或除以錯誤的維度。每個步驟後都要檢查形狀——<code>scores</code> 必須是 <code>(batch, seq_len, seq_len)</code> 的形狀。</p></blockquote>

<h2 id="multi-head-attention">3. Multi-Head Attention</h2>

<h3 id="why-multi-head">3.1 為什麼需要多個 head？</h3>

<p>單一 head 只能學習<strong>一種關係</strong>。Multi-Head Attention 讓模型能同時關注不同的<strong>表示子空間</strong>：</p>

<ul>
<li>Head 1：學習語法關係（主語-動詞）</li>
<li>Head 2：學習共指消解（代名詞 → 名詞）</li>
<li>Head 3：學習位置鄰近性</li>
<li>Head 4：學習語義相似性</li>
</ul>

<pre><code class="language-text">Multi-Head Attention 流程：

輸入 (batch, seq_len, d_model)
    │
    ├── Linear → Q ──┐
    ├── Linear → K ──┼── 分割成 h 個 head
    └── Linear → V ──┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
    Head 1        Head 2    ...  Head h
 Attention()   Attention()    Attention()
        │             │             │
        └─────────────┼─────────────┘
                      │
                    串接
                      │
                   Linear
                      │
                   輸出 (batch, seq_len, d_model)

形狀 (d_model=512, h=8, d_k = d_model/h = 64)：
  輸入：          (B, S, 512)
  每個 head Q/K/V: (B, h, S, 64)   ← linear 後 reshape
  每個 head 輸出:  (B, h, S, 64)
  串接：          (B, S, 512)      ← h × d_k = d_model
  最終輸出：      (B, S, 512)
</code></pre>

<h3 id="multi-head-code">3.2 程式碼：MultiHeadAttention 模組</h3>

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

        # Q、K、V 和輸出的線性投影
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

    def forward(self, query, key, value, mask=None):
        batch_size = query.size(0)

        # 步驟 1：線性投影
        Q = self.W_q(query)  # (B, S, d_model)
        K = self.W_k(key)
        V = self.W_v(value)

        # 步驟 2：Reshape 為多頭格式
        # (B, S, d_model) → (B, S, h, d_k) → (B, h, S, d_k)
        Q = Q.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = K.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = V.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)

        # 步驟 3：每個 head 的 scaled dot-product attention
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)

        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))

        attn_weights = torch.softmax(scores, dim=-1)
        context = torch.matmul(attn_weights, V)
        # context: (B, h, S, d_k)

        # 步驟 4：串接所有 head
        # (B, h, S, d_k) → (B, S, h, d_k) → (B, S, d_model)
        context = context.transpose(1, 2).contiguous().view(
            batch_size, -1, self.d_model
        )

        # 步驟 5：最終線性投影
        output = self.W_o(context)
        return output

# 示範
d_model, num_heads = 512, 8
mha = MultiHeadAttention(d_model, num_heads)

x = torch.randn(2, 10, d_model)  # batch=2, seq_len=10
output = mha(x, x, x)  # self-attention：Q=K=V=x
print(f"Output shape: {output.shape}")  # (2, 10, 512)
</code></pre>

<table>
<thead>
<tr><th>參數</th><th>常見值</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td>d_model</td><td>512, 768, 1024</td><td>Embedding 大小</td></tr>
<tr><td>num_heads</td><td>8, 12, 16</td><td>d_model 必須能被 num_heads 整除</td></tr>
<tr><td>d_k = d_model / h</td><td>64, 64, 64</td><td>每個 head 通常 d_k = 64</td></tr>
<tr><td>總參數量 (MHA)</td><td>4 × d_model²</td><td>4 個線性層：W_q、W_k、W_v、W_o</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試提示：</strong>在 DLI 評估中，如果遇到 attention 中的 <code>RuntimeError: shape mismatch</code>，請檢查：(1) <code>d_model % num_heads == 0</code>，(2) <code>view()</code> 和 <code>transpose()</code> 的順序是否正確，(3) transpose 後記得呼叫 <code>.contiguous()</code> 再呼叫 <code>.view()</code>。</p></blockquote>

<h2 id="transformer-architecture">4. Transformer 架構</h2>

<h3 id="encoder-block">4.1 Encoder 區塊</h3>

<p><strong>Transformer Encoder</strong> 的每一層由 2 個子層組成，並帶有<strong>殘差連接</strong>和<strong>層正規化</strong>：</p>

<pre><code class="language-text">Transformer Encoder 區塊：

  輸入
    │
    ▼
┌─────────────────────────────┐
│  Multi-Head Self-Attention  │
└──────────────┬──────────────┘
               │
    ┌──────────┴──────────┐
    │     Add & Norm      │ ← x + Sublayer(x)，然後 LayerNorm
    └──────────┬──────────┘
               │
    ┌──────────┴──────────┐
    │  Feed-Forward Net   │ ← 2 個線性層 + ReLU/GELU
    │  FFN(x) = W₂·σ(W₁x + b₁) + b₂
    └──────────┬──────────┘
               │
    ┌──────────┴──────────┐
    │     Add & Norm      │
    └──────────┬──────────┘
               │
             輸出
</code></pre>

<h3 id="decoder-block">4.2 Decoder 區塊</h3>

<p><strong>Decoder</strong> 多了一個子層用於 <strong>Cross-Attention</strong>——關注 encoder 的輸出：</p>

<pre><code class="language-text">Transformer Decoder 區塊：

  輸入（右移）
    │
    ▼
┌────────────────────────────────┐
│  Masked Multi-Head Attention   │ ← 因果 mask：只能看到前面的 token
└──────────────┬─────────────────┘
               │
    ┌──────────┴──────────┐
    │     Add & Norm      │
    └──────────┬──────────┘
               │
    ┌──────────┴──────────────────────────┐
    │  Cross Multi-Head Attention         │ ← Q 來自 decoder，K/V 來自 encoder
    │  Q = decoder 隱藏狀態               │
    │  K, V = encoder 輸出                │
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
             輸出
</code></pre>

<h3 id="full-transformer">4.3 完整 Transformer 架構</h3>

<pre><code class="language-text">┌─────────────────────────────────────────────────────────────────┐
│                    TRANSFORMER 架構                              │
├───────────────────────┬─────────────────────────────────────────┤
│       ENCODER         │              DECODER                    │
│                       │                                         │
│   輸入 Embedding      │         輸出 Embedding                  │
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
│      × N 層           │         │  Feed   │                    │
│        │              │         │ Forward │                    │
│     Encoder           │         └────┬────┘                    │
│     輸出              │         Add & Norm                     │
│                       │              │                          │
│                       │           × N 層                       │
│                       │              │                          │
│                       │         Linear + Softmax               │
│                       │              │                          │
│                       │       輸出機率分布                      │
└───────────────────────┴─────────────────────────────────────────┘
</code></pre>

<h3 id="positional-encoding">4.4 Positional Encoding</h3>

<p>Transformer 不像 RNN 那樣有「順序」的概念。<strong>Positional Encoding</strong> 使用 sin/cos 函數將位置資訊加入 embedding 中：</p>

<pre><code class="language-text">PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))

pos: token 在序列中的位置 (0, 1, 2, ...)
i:   維度索引 (0, 1, 2, ..., d_model/2)
</code></pre>

<p>這與 <strong>Diffusion Models</strong> 中的概念完全相同——使用正弦嵌入來編碼時間步 t。在這裡掌握 positional encoding，將在 Diffusion 部分大有幫助。</p>

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
        pe[:, 0::2] = torch.sin(position * div_term)  # 偶數索引
        pe[:, 1::2] = torch.cos(position * div_term)  # 奇數索引
        pe = pe.unsqueeze(0)  # (1, max_len, d_model)
        self.register_buffer('pe', pe)

    def forward(self, x):
        # x: (batch, seq_len, d_model)
        return x + self.pe[:, :x.size(1), :]

# 示範
pe = PositionalEncoding(d_model=512)
x = torch.randn(2, 100, 512)  # batch=2, seq_len=100
output = pe(x)
print(f"Output shape: {output.shape}")  # (2, 100, 512)
</code></pre>

<h3 id="layer-norm">4.5 Layer Normalization 與 Batch Normalization 的比較</h3>

<table>
<thead>
<tr><th>特性</th><th>Batch Normalization</th><th>Layer Normalization</th></tr>
</thead>
<tbody>
<tr><td>正規化方向</td><td>Batch 維度</td><td>Feature 維度</td></tr>
<tr><td>是否依賴 batch 大小</td><td>是——需要足夠大的 batch</td><td>否——對每個樣本獨立運作</td></tr>
<tr><td>使用場景</td><td>CNN（電腦視覺）</td><td>Transformer、RNN（NLP）</td></tr>
<tr><td>推論行為</td><td>使用運行統計量</td><td>直接計算——與訓練時相同</td></tr>
<tr><td>Transformer 中使用</td><td>否</td><td><strong>是——每個子層都使用</strong></td></tr>
</tbody>
</table>

<blockquote><p><strong>考試提示：</strong>如果題目問「為什麼 Transformer 使用 LayerNorm 而非 BatchNorm？」→ 回答：(1) NLP 的序列長度不固定 → batch 統計量不穩定，(2) LayerNorm 不依賴 batch 大小，在小 batch 和推論時都表現良好。</p></blockquote>

<h2 id="model-families">5. 模型家族</h2>

<h3 id="encoder-only">5.1 僅 Encoder：BERT</h3>

<p><strong>BERT</strong>（Bidirectional Encoder Representations from Transformers）僅使用 <strong>Encoder</strong>。預訓練方式：</p>

<ul>
<li><strong>MLM（Masked Language Modeling）</strong>——遮蔽 15% 的 token，預測被遮蔽的 token</li>
<li><strong>NSP（Next Sentence Prediction）</strong>——兩個句子是否連續？</li>
</ul>

<p>由於 BERT 能看到兩個方向（雙向），因此擅長<strong>理解</strong>任務：分類、NER、QA。</p>

<h3 id="decoder-only">5.2 僅 Decoder：GPT</h3>

<p><strong>GPT</strong>（Generative Pre-trained Transformer）僅使用帶有<strong>因果遮蔽</strong>的 <strong>Decoder</strong>——每個 token 只能關注前面的 token。預訓練方式為<strong>下一個 token 預測</strong>。</p>

<pre><code class="language-text">因果 Attention 遮蔽（GPT）：

Token:   [The]  [cat]  [sat]  [on]
The       ✓      ✗      ✗      ✗
cat       ✓      ✓      ✗      ✗
sat       ✓      ✓      ✓      ✗
on        ✓      ✓      ✓      ✓

✓ = 可以關注    ✗ = 被遮蔽（= softmax 前為 -inf）

→ 每個 token 只能「看到」前面的 token
→ 適合生成：預測下一個 token
</code></pre>

<h3 id="encoder-decoder">5.3 Encoder-Decoder：T5</h3>

<p><strong>T5</strong>（Text-to-Text Transfer Transformer）使用完整的 <strong>Encoder-Decoder</strong> 架構。所有任務都被轉換為「文字輸入 → 文字輸出」：</p>

<ul>
<li>翻譯：<code>"translate English to French: The cat sat"</code> → <code>"Le chat s'est assis"</code></li>
<li>摘要：<code>"summarize: {長文本}"</code> → <code>"{摘要}"</code></li>
<li>分類：<code>"classify: {文本}"</code> → <code>"positive"</code></li>
</ul>

<h3 id="model-comparison">5.4 比較表</h3>

<table>
<thead>
<tr><th>特性</th><th>BERT（Encoder）</th><th>GPT（Decoder）</th><th>T5（Enc-Dec）</th></tr>
</thead>
<tbody>
<tr><td>架構</td><td>僅 Encoder</td><td>僅 Decoder</td><td>Encoder-Decoder</td></tr>
<tr><td>方向性</td><td>雙向</td><td>從左到右（因果）</td><td>雙向 enc + 因果 dec</td></tr>
<tr><td>預訓練</td><td>MLM + NSP</td><td>下一個 token 預測</td><td>Span corruption</td></tr>
<tr><td>Attention 遮蔽</td><td>完整（看到所有 token）</td><td>因果（只看到過去）</td><td>完整 enc + 因果 dec</td></tr>
<tr><td>優勢</td><td>理解：NER、QA、分類</td><td>生成：文字、程式碼</td><td>Seq2seq：翻譯、摘要</td></tr>
<tr><td>輸出</td><td>上下文嵌入</td><td>下一個 token 機率</td><td>目標序列</td></tr>
<tr><td>代表模型</td><td>BERT、RoBERTa、DeBERTa</td><td>GPT-2/3/4、LLaMA</td><td>T5、BART、mBART</td></tr>
</tbody>
</table>

<pre><code class="language-text">決策樹——選擇模型家族：

                ┌─ 需要生成長文本？
                │   是 → 僅 Decoder（GPT、LLaMA）
                │
任務 ───────────┤
                │   ┌─ 輸入→輸出序列？
                │   │   是 → Encoder-Decoder（T5、BART）
                否 ─┤
                    │   否 → 僅 Encoder（BERT）
                    │   （分類、NER、embedding）
                    └──────────────────────────────────
</code></pre>

<blockquote><p><strong>考試提示：</strong>常見問題：「給定任務 X，應該使用哪個模型家族？」快速法則：(1) 理解/分類 → BERT，(2) 生成 → GPT，(3) Seq2seq（翻譯、摘要）→ T5。注意：足夠大的 GPT 也能透過 <strong>prompting</strong> 處理任何任務。</p></blockquote>

<h2 id="tokenization">6. Tokenization</h2>

<h3 id="token-vs-word">6.1 Token 與 Word 的區別</h3>

<p>語言模型不處理「詞」，而是處理 <strong>token</strong>——小於或等於一個詞的單位。Tokenization 決定了文本如何被分割成 token。</p>

<pre><code class="language-text">「unbelievable」的 tokenization 範例：

詞級別：     ["unbelievable"]         → 詞彙表太大，很多未登錄詞
字元級別：   ["u","n","b","e",...]    → 序列太長
子詞 (BPE):  ["un", "believ", "able"] → 平衡詞彙表大小和序列長度
</code></pre>

<h3 id="bpe-wordpiece-sentencepiece">6.2 BPE、WordPiece、SentencePiece</h3>

<table>
<thead>
<tr><th>演算法</th><th>使用者</th><th>工作原理</th><th>特性</th></tr>
</thead>
<tbody>
<tr><td><strong>BPE</strong>（Byte-Pair Encoding）</td><td>GPT-2/3/4、RoBERTa</td><td>反覆合併最頻繁的位元組對</td><td>自底向上，貪心合併</td></tr>
<tr><td><strong>WordPiece</strong></td><td>BERT、DistilBERT</td><td>合併能最大化似然的對</td><td>使用 <code>##</code> 前綴表示子詞</td></tr>
<tr><td><strong>SentencePiece</strong></td><td>T5、LLaMA、mT5</td><td>在原始文本上使用 Unigram LM 或 BPE</td><td>語言無關，無需預分詞</td></tr>
</tbody>
</table>

<pre><code class="language-text">比較範例：

輸入："I love tokenization"

BPE (GPT-2):       ["I", " love", " token", "ization"]
WordPiece (BERT):   ["I", "love", "token", "##ization"]
SentencePiece (T5): ["▁I", "▁love", "▁token", "ization"]

WordPiece 使用 ## 表示延續
SentencePiece 使用 ▁ 表示詞的開頭
</code></pre>

<h3 id="tokenizer-code">6.3 程式碼：使用 HuggingFace 進行 Tokenization</h3>

<pre><code class="language-python">from transformers import AutoTokenizer

# 載入各模型家族的 tokenizer
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

# 編碼 → token ID
ids = bert_tok.encode(text, return_tensors="pt")
print(f"Token IDs shape: {ids.shape}")

# 解碼回文本
decoded = bert_tok.decode(ids[0])
print(f"Decoded: {decoded}")
</code></pre>

<p>詞彙表大小影響 embedding 大小和模型容量：</p>

<table>
<thead>
<tr><th>模型</th><th>Tokenizer</th><th>詞彙表大小</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td>BERT-base</td><td>WordPiece</td><td>30,522</td><td>小寫英文</td></tr>
<tr><td>GPT-2</td><td>BPE</td><td>50,257</td><td>區分大小寫</td></tr>
<tr><td>T5</td><td>SentencePiece</td><td>32,100</td><td>支援多語言</td></tr>
<tr><td>LLaMA-2</td><td>SentencePiece</td><td>32,000</td><td>BPE 變體</td></tr>
<tr><td>GPT-4</td><td>BPE (cl100k)</td><td>100,256</td><td>針對程式碼+多語言優化</td></tr>
</tbody>
</table>

<h2 id="nlp-tasks">7. NLP 任務對應</h2>

<h3 id="task-overview">7.1 任務 → 模型 → 輸出</h3>

<table>
<thead>
<tr><th>NLP 任務</th><th>任務類型</th><th>最佳模型家族</th><th>輸出</th></tr>
</thead>
<tbody>
<tr><td>文本分類</td><td>序列分類</td><td>Encoder（BERT）</td><td>單一標籤</td></tr>
<tr><td>情感分析</td><td>序列分類</td><td>Encoder（BERT）</td><td>正面/負面</td></tr>
<tr><td>命名實體辨識</td><td>Token 分類</td><td>Encoder（BERT）</td><td>每個 token 的標籤</td></tr>
<tr><td>問答</td><td>擷取式/生成式</td><td>Encoder 或 Enc-Dec</td><td>片段或文本</td></tr>
<tr><td>摘要</td><td>Seq2seq 生成</td><td>Enc-Dec（T5、BART）</td><td>摘要文本</td></tr>
<tr><td>翻譯</td><td>Seq2seq 生成</td><td>Enc-Dec（T5、mBART）</td><td>翻譯文本</td></tr>
<tr><td>文本生成</td><td>自迴歸</td><td>Decoder（GPT）</td><td>延續文本</td></tr>
<tr><td>程式碼生成</td><td>自迴歸</td><td>Decoder（CodeGen）</td><td>程式碼</td></tr>
</tbody>
</table>

<h3 id="classification-code">7.2 程式碼：微調 BERT 進行文本分類</h3>

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
        # BERT 輸出：last_hidden_state、pooler_output
        outputs = self.bert(input_ids=input_ids,
                           attention_mask=attention_mask)

        # 使用 [CLS] token 表示進行分類
        cls_output = outputs.pooler_output  # (batch, hidden_size)
        cls_output = self.dropout(cls_output)
        logits = self.classifier(cls_output)  # (batch, num_classes)
        return logits

# 使用方式
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertClassifier(num_classes=3)

# Tokenize 輸入
text = "This movie was absolutely wonderful!"
encoded = tokenizer(text, return_tensors='pt', padding=True,
                    truncation=True, max_length=128)

# 前向傳播
logits = model(encoded['input_ids'], encoded['attention_mask'])
prediction = torch.argmax(logits, dim=-1)
print(f"Predicted class: {prediction.item()}")
</code></pre>

<pre><code class="language-python"># BERT 分類器的訓練迴圈
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

<blockquote><p><strong>考試提示：</strong>微調 BERT 時的 3 個要點：(1) <strong>小學習率</strong>（2e-5 到 5e-5），因為模型已經預訓練過，(2) <strong>梯度裁剪</strong>（<code>clip_grad_norm_</code>）以穩定訓練，(3) 分類使用 <strong>pooler_output</strong>（CLS token），token 級別任務（NER）使用 <strong>last_hidden_state</strong>。</p></blockquote>

<h2 id="cheat-sheet">8. 速查表</h2>

<table>
<thead>
<tr><th>概念</th><th>關鍵公式/模式</th><th>記憶要點</th></tr>
</thead>
<tbody>
<tr><td>Scaled Dot-Product</td><td><code>softmax(QK^T / √d_k) V</code></td><td>除以 √d_k 防止 softmax 飽和</td></tr>
<tr><td>Multi-Head</td><td>分割 → h × Attention → 串接 → Linear</td><td>d_k = d_model / num_heads</td></tr>
<tr><td>Positional Encoding</td><td>sin/cos 函數</td><td>在 Diffusion timestep embedding 中重複使用</td></tr>
<tr><td>Encoder（BERT）</td><td>雙向、MLM</td><td>理解任務：NER、QA、分類</td></tr>
<tr><td>Decoder（GPT）</td><td>因果遮蔽、next-token</td><td>生成任務：文字、程式碼</td></tr>
<tr><td>Enc-Dec（T5）</td><td>Cross-attention、seq2seq</td><td>翻譯、摘要</td></tr>
<tr><td>BPE</td><td>合併頻繁的位元組對</td><td>GPT 家族</td></tr>
<tr><td>WordPiece</td><td>最大化似然合併</td><td>BERT 家族，使用 ## 前綴</td></tr>
<tr><td>SentencePiece</td><td>語言無關，處理原始文本</td><td>T5、LLaMA，使用 ▁ 前綴</td></tr>
<tr><td>Causal Mask</td><td>下三角矩陣</td><td>GPT：每個 token 只能看到前面的 token</td></tr>
<tr><td>Layer Norm</td><td>跨 feature 正規化</td><td>用於 Transformer（非 BatchNorm）</td></tr>
<tr><td>微調學習率</td><td>2e-5 → 5e-5</td><td>小學習率，因為已有預訓練權重</td></tr>
</tbody>
</table>

<h2 id="practice-questions">9. 練習題</h2>

<p>類似 NVIDIA DLI 的編碼評估風格題目：</p>

<p><strong>Q1：</strong>實作 <code>scaled_dot_product_attention</code> 函數。該函數接收 Q、K、V tensor 和可選的 mask，返回輸出和 attention 權重。</p>

<details>
<summary>顯示答案 Q1</summary>

<pre><code class="language-python">import torch
import torch.nn.functional as F
import math

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Args:
        Q: (batch, seq_len, d_k)
        K: (batch, seq_len, d_k)
        V: (batch, seq_len, d_v)
        mask: 可選 (batch, 1, seq_len) 或 (batch, seq_len, seq_len)
    Returns:
        output: (batch, seq_len, d_v)
        attn_weights: (batch, seq_len, seq_len)
    """
    d_k = Q.size(-1)

    # 計算 attention 分數
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)

    # 如果提供了 mask 則套用
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))

    # 在最後一個維度（key 維度）上做 softmax
    attn_weights = F.softmax(scores, dim=-1)

    # 值的加權總和
    output = torch.matmul(attn_weights, V)

    return output, attn_weights

# 驗證：
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

<p><em>解說：關鍵要點是 (1) <code>K.transpose(-2, -1)</code> 確保矩陣乘法正確，(2) 用 <code>math.sqrt(d_k)</code> 進行縮放，(3) 在 softmax 之前用 <code>-inf</code> 進行 <code>masked_fill</code>，(4) softmax 在 <code>dim=-1</code> 上。常見錯誤：忘記轉置 K 或在錯誤的 dim 上套用 softmax。</em></p>
</details>

<p><strong>Q2：</strong>如果從 Transformer 中移除 Positional Encoding 會發生什麼？撰寫程式碼來證明。</p>

<details>
<summary>顯示答案 Q2</summary>

<pre><code class="language-python">import torch

# 沒有 positional encoding 的 self-attention
# → 輸出是置換不變的（token 順序無關緊要）

def self_attention_no_pos(x):
    """x: (batch, seq_len, d_model)"""
    d_k = x.size(-1)
    scores = torch.matmul(x, x.transpose(-2, -1)) / (d_k ** 0.5)
    weights = torch.softmax(scores, dim=-1)
    return torch.matmul(weights, x)

# 建立輸入
x = torch.randn(1, 4, 8)  # 4 個 token，d_model=8

# 原始輸出
out1 = self_attention_no_pos(x)

# 打亂 token 順序：[0,1,2,3] → [2,0,3,1]
perm = [2, 0, 3, 1]
x_shuffled = x[:, perm, :]
out2 = self_attention_no_pos(x_shuffled)

# 檢查：輸出也以相同順序打亂
inv_perm = [1, 3, 0, 2]  # 逆置換
out2_reordered = out2[:, inv_perm, :]

print(f"Difference: {(out1 - out2_reordered).abs().max().item():.10f}")
# → 接近 0！Attention 無法區分順序
# → "The cat sat on mat" = "mat on sat cat The"
# 這就是為什麼 Positional Encoding 是必要的！
</code></pre>

<p><em>解說：沒有 Positional Encoding，self-attention 是<strong>置換等變</strong>的——它對「The cat sat」和「sat The cat」的處理方式完全相同。Positional Encoding 打破了這種對稱性，讓模型能區分 token 順序。在 Diffusion Models 中，同樣的概念被用於 timestep embedding。</em></p>
</details>

<p><strong>Q3：</strong>GPT 使用因果遮蔽。撰寫程式碼建立因果 mask，並解釋 mask 矩陣中每個元素的含義。</p>

<details>
<summary>顯示答案 Q3</summary>

<pre><code class="language-python">import torch

def create_causal_mask(seq_len):
    """
    為 decoder 建立因果（前瞻）mask。
    mask[i][j] = 1 表示 token i 可以關注 token j（j <= i）
    mask[i][j] = 0 表示 token i 不能看到 token j（j > i）
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

# 套用到 attention
def causal_attention(Q, K, V):
    d_k = Q.size(-1)
    seq_len = Q.size(1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)

    # 套用因果 mask
    mask = create_causal_mask(seq_len).unsqueeze(0)  # (1, S, S)
    scores = scores.masked_fill(mask == 0, float('-inf'))
    # 結果：未來位置 → -inf → softmax → 0

    weights = torch.softmax(scores, dim=-1)
    print("Attention weights (causal):")
    print(weights[0].detach())
    # 第 0 行：[1.0, 0.0, 0.0, 0.0, 0.0]  ← token 0 只能看到自己
    # 第 1 行：[0.4, 0.6, 0.0, 0.0, 0.0]  ← token 1 看到 token 0, 1
    # 第 4 行：[0.1, 0.2, 0.3, 0.2, 0.2]  ← token 4 看到所有 token

    return torch.matmul(weights, V)

B, S, D = 1, 5, 32
Q = torch.randn(B, S, D)
K = torch.randn(B, S, D)
V = torch.randn(B, S, D)
out = causal_attention(Q, K, V)
print(f"Output shape: {out.shape}")  # (1, 5, 32)
</code></pre>

<p><em>解說：因果 mask 是一個下三角矩陣（<code>torch.tril</code>）。<code>mask[i][j]=0</code>（j > i）的位置在 softmax 之前被填充為 <code>-inf</code>，softmax 之後變為 0。這確保每個 token 只能關注前面的 token——這對 GPT 中的自迴歸生成至關重要。</em></p>
</details>

<p><strong>Q4：</strong>對於以下使用情境，選擇最合適的模型家族並解釋原因：</p>
<ul>
<li>(a) 電子郵件垃圾/非垃圾郵件分類</li>
<li>(b) 越南語到英語翻譯</li>
<li>(c) 自由形式文本生成聊天機器人</li>
<li>(d) 從文本中擷取人名（NER）</li>
</ul>

<details>
<summary>顯示答案 Q4</summary>

<pre><code class="language-python"># 使用情境 → 模型家族的對應

tasks = {
    "(a) 電子郵件垃圾郵件分類": {
        "model_family": "僅 Encoder（BERT）",
        "reason": "分類任務——需要理解整封郵件"
                  "（雙向）。輸出 = 1 個標籤（垃圾/非垃圾）。"
                  "BERT + 線性分類器頭。",
        "code_hint": "BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)"
    },
    "(b) 越南語 → 英語翻譯": {
        "model_family": "Encoder-Decoder（T5、mBART）",
        "reason": "Seq2seq 任務——輸入序列（越南語）→ 輸出"
                  "序列（英語）。Encoder 理解輸入，Decoder "
                  "生成輸出。T5 或 mBART 適用於多語言。",
        "code_hint": "T5ForConditionalGeneration.from_pretrained('t5-base')"
    },
    "(c) 自由形式聊天機器人": {
        "model_family": "僅 Decoder（GPT、LLaMA）",
        "reason": "自迴歸生成——逐 token 生成文本，"
                  "不需要獨立的 encoder。GPT/LLaMA 經過指令"
                  "微調用於聊天場景。",
        "code_hint": "AutoModelForCausalLM.from_pretrained('meta-llama/Llama-2-7b-chat-hf')"
    },
    "(d) 命名實體辨識": {
        "model_family": "僅 Encoder（BERT）",
        "reason": "Token 分類——需要為每個 token 分配標籤"
                  "（B-PER、I-PER、O、B-LOC,...）。BERT 的雙向 attention "
                  "讓每個 token 都能看到兩側的上下文。",
        "code_hint": "BertForTokenClassification.from_pretrained('bert-base-uncased', num_labels=9)"
    }
}

for task, info in tasks.items():
    print(f"\n{task}")
    print(f"  → {info['model_family']}")
    print(f"  原因：{info['reason']}")
    print(f"  程式碼：{info['code_hint']}")
</code></pre>

<p><em>解說：一般法則：(1) 如果輸出是整個輸入的 1 個標籤 → Encoder（BERT），(2) 如果輸出是每個 token 的標籤 → Encoder（BERT）+ token 分類頭，(3) 如果輸出是不同語言/格式的序列 → Encoder-Decoder（T5），(4) 如果需要連續文本生成 → Decoder（GPT）。但實務上，足夠大的僅 decoder LLM（GPT-4、LLaMA-70B）可以透過 prompting 很好地處理任何任務。</em></p>
</details>
