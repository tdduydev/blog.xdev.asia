---
id: 019c9619-nv01-p1-l02
title: '第2課：TransformerアーキテクチャとAttentionメカニズム'
slug: bai-2-transformer-architecture-attention
description: >-
  Self-attention、Multi-Head Attention、Positional Encoding。
  Encoder-Decoderアーキテクチャ。BERT、GPT、T5モデルファミリー。
  トークン化：BPE、WordPiece、SentencePiece。
  NLPタスク：分類、NER、QA、要約。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 2
section_title: "パート1：ディープラーニングの基礎"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'NVIDIA DLI 試験対策 — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="gioi-thieu">1. はじめに</h2>

<p><strong>Transformer</strong>は、<strong>GPT</strong>、<strong>BERT</strong>、<strong>Stable Diffusion</strong>から<strong>LLaMA</strong>まで、すべての現代のGenerative AIモデルの基盤となるアーキテクチャです。NVIDIA DLIアセスメントでは、<strong>Attentionメカニズム</strong>の仕組みを十分に理解し、PyTorchで実装できる必要があります。</p>

<p>この課では、<strong>Scaled Dot-Product Attention</strong>から完全な<strong>Transformer</strong>アーキテクチャまでを網羅し、具体的なモデルファミリーやNLPタスクとの対応を解説します。</p>

<blockquote><p><strong>試験のヒント：</strong> NVIDIA DLIアセスメントでは、Attentionメカニズムのコードを完成させたり、Transformerの次元不一致エラーをデバッグする問題がよく出題されます。Attentionの各ステップでの<strong>テンソルの形状</strong>をマスターすることが、アセスメント合格の鍵です。</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai2-transformer-architecture.webp" alt="Transformerアーキテクチャ — Encoder-Decoder、Self-Attention、Cross-Attention" loading="lazy" /><figcaption>Transformerアーキテクチャ — Encoder-Decoder、Self-Attention、Cross-Attention</figcaption></figure>

<h2 id="attention-mechanism">2. Attentionメカニズム</h2>

<h3 id="attention-intuition">2.1 直感的理解 — 「最も重要なものは何か？」</h3>

<p><strong>Attention</strong>は次の質問に答えます：「現在のトークンを処理するとき、入力シーケンスのどのトークンが最も重要か？」RNNのようにシーケンス全体を固定サイズのベクトルに圧縮するのではなく、Attentionはモデルが入力のすべての位置を直接「見る」ことを可能にします。</p>

<p>このメカニズムは3つのコンポーネントで動作します：</p>

<ul>
<li><strong>Query (Q)</strong> — 「何を探しているのか？」— 現在のトークンが質問をします</li>
<li><strong>Key (K)</strong> — 「どんな情報を持っているか？」— 各トークンが自身の内容を提示します</li>
<li><strong>Value (V)</strong> — 「これが実際の情報です」— マッチした際に返される内容です</li>
</ul>

<pre><code class="language-text">例: "The cat sat on the mat because it was tired"
                                              ↑
                                        トークン "it" (Query)
                                              │
                ┌─────────────────────────────┤
                │     Attentionスコア:        │
                │   "cat"  = 0.72  ← 高い!   │
                │   "mat"  = 0.11            │
                │   "sat"  = 0.08            │
                │   "The"  = 0.03            │
                │   ...                       │
                └─────────────────────────────┘
                → "it" は主に "cat" に注目する
</code></pre>

<h3 id="scaled-dot-product">2.2 Scaled Dot-Product Attention</h3>

<p>Attentionの核となる公式：</p>

<pre><code class="language-text">Attention(Q, K, V) = softmax(Q · K^T / √d_k) · V

各要素の説明:
  Q: Queryマトリクス  — 形状 (seq_len, d_k)
  K: Keyマトリクス    — 形状 (seq_len, d_k)
  V: Valueマトリクス  — 形状 (seq_len, d_v)
  d_k: Keyベクトルの次元数
  √d_k: softmaxでの勾配消失を防ぐためのスケーリングファクター
</code></pre>

<p>なぜ√d_kによる<strong>スケーリング</strong>が必要なのでしょうか？d_kが大きいと、内積Q·K^Tが非常に大きくなり、softmaxが飽和して勾配が0に近づきます。√d_kで割ることで分散を安定させます。</p>

<pre><code class="language-text">Scaled Dot-Product Attentionの流れ:

  Q ──┐
      │──→ MatMul ──→ Scale (÷√d_k) ──→ Mask (任意) ──→ Softmax ──→ MatMul ──→ 出力
  K ──┘                                                                ↑
                                                                       │
  V ────────────────────────────────────────────────────────────────────┘

形状 (batch_size=B, seq_len=S, d_k=D):
  Q:        (B, S, D)
  K^T:      (B, D, S)
  Q·K^T:    (B, S, S)   ← Attentionスコアマトリクス
  softmax:  (B, S, S)   ← Attention重み（各行の合計が1）
  × V:      (B, S, D)   ← 重み付き出力
</code></pre>

<h3 id="attention-code">2.3 コード：Attentionをゼロから実装</h3>

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

    # ステップ1: Attentionスコアを計算
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    # scoresの形状: (batch, seq_len, seq_len)

    # ステップ2: マスクを適用（デコーダのcausal attentionに使用）
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))

    # ステップ3: softmaxでAttention重みを取得
    attn_weights = F.softmax(scores, dim=-1)
    # attn_weightsの形状: (batch, seq_len, seq_len)

    # ステップ4: Valueの重み付き和
    output = torch.matmul(attn_weights, V)
    # outputの形状: (batch, seq_len, d_v)

    return output, attn_weights

# デモ
batch_size, seq_len, d_k = 2, 5, 64
Q = torch.randn(batch_size, seq_len, d_k)
K = torch.randn(batch_size, seq_len, d_k)
V = torch.randn(batch_size, seq_len, d_k)

output, weights = scaled_dot_product_attention(Q, K, V)
print(f"Output shape: {output.shape}")    # (2, 5, 64)
print(f"Weights shape: {weights.shape}")  # (2, 5, 5)
print(f"Weights sum per row: {weights.sum(dim=-1)}")  # 各行 = 1.0
</code></pre>

<blockquote><p><strong>試験のヒント：</strong> Attention実装で最も多いエラー：<code>K.transpose(-2, -1)</code>を忘れる、または間違った次元で割り算をする。各ステップ後に形状を必ず確認してください — <code>scores</code>は<code>(batch, seq_len, seq_len)</code>の形状でなければなりません。</p></blockquote>

<h2 id="multi-head-attention">3. Multi-Head Attention</h2>

<h3 id="why-multi-head">3.1 なぜ複数のヘッドが必要なのか？</h3>

<p>単一のヘッドでは<strong>1種類の関係</strong>しか学習できません。Multi-Head Attentionにより、モデルは異なる<strong>表現サブスペース</strong>に同時に注目できます：</p>

<ul>
<li>ヘッド1：構文関係を学習（主語-動詞）</li>
<li>ヘッド2：共参照を学習（代名詞→名詞）</li>
<li>ヘッド3：位置的近接性を学習</li>
<li>ヘッド4：意味的類似性を学習</li>
</ul>

<pre><code class="language-text">Multi-Head Attentionの流れ:

入力 (batch, seq_len, d_model)
    │
    ├── Linear → Q ──┐
    ├── Linear → K ──┼── hヘッドに分割
    └── Linear → V ──┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
    ヘッド1       ヘッド2    ...  ヘッドh
 Attention()   Attention()    Attention()
        │             │             │
        └─────────────┼─────────────┘
                      │
                   結合
                      │
                   Linear
                      │
                   出力 (batch, seq_len, d_model)

形状 (d_model=512, h=8, d_k = d_model/h = 64):
  入力:             (B, S, 512)
  各ヘッドのQ/K/V:  (B, h, S, 64)   ← Linear後にreshape
  各ヘッドの出力:    (B, h, S, 64)
  結合:             (B, S, 512)      ← h × d_k = d_model
  最終出力:         (B, S, 512)
</code></pre>

<h3 id="multi-head-code">3.2 コード：MultiHeadAttentionモジュール</h3>

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

        # Q, K, V および出力のLinear射影
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

    def forward(self, query, key, value, mask=None):
        batch_size = query.size(0)

        # ステップ1: Linear射影
        Q = self.W_q(query)  # (B, S, d_model)
        K = self.W_k(key)
        V = self.W_v(value)

        # ステップ2: マルチヘッド形式にreshape
        # (B, S, d_model) → (B, S, h, d_k) → (B, h, S, d_k)
        Q = Q.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = K.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = V.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)

        # ステップ3: 各ヘッドでScaled Dot-Product Attention
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)

        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))

        attn_weights = torch.softmax(scores, dim=-1)
        context = torch.matmul(attn_weights, V)
        # context: (B, h, S, d_k)

        # ステップ4: ヘッドを結合
        # (B, h, S, d_k) → (B, S, h, d_k) → (B, S, d_model)
        context = context.transpose(1, 2).contiguous().view(
            batch_size, -1, self.d_model
        )

        # ステップ5: 最終Linear射影
        output = self.W_o(context)
        return output

# デモ
d_model, num_heads = 512, 8
mha = MultiHeadAttention(d_model, num_heads)

x = torch.randn(2, 10, d_model)  # batch=2, seq_len=10
output = mha(x, x, x)  # self-attention: Q=K=V=x
print(f"Output shape: {output.shape}")  # (2, 10, 512)
</code></pre>

<table>
<thead>
<tr><th>パラメータ</th><th>一般的な値</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>d_model</td><td>512, 768, 1024</td><td>埋め込みサイズ</td></tr>
<tr><td>num_heads</td><td>8, 12, 16</td><td>d_modelはnum_headsで割り切れる必要がある</td></tr>
<tr><td>d_k = d_model / h</td><td>64, 64, 64</td><td>各ヘッドは通常d_k = 64</td></tr>
<tr><td>総パラメータ数（MHA）</td><td>4 × d_model²</td><td>4つのLinear層：W_q, W_k, W_v, W_o</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のヒント：</strong> DLIアセスメントでAttentionの<code>RuntimeError: shape mismatch</code>に遭遇した場合、以下を確認してください：(1) <code>d_model % num_heads == 0</code>、(2) <code>view()</code>と<code>transpose()</code>が正しい順序になっている、(3) transpose後に<code>.view()</code>を呼ぶ前に<code>.contiguous()</code>を呼んでいる。</p></blockquote>

<h2 id="transformer-architecture">4. Transformerアーキテクチャ</h2>

<h3 id="encoder-block">4.1 Encoderブロック</h3>

<p><strong>Transformer Encoder</strong>の各レイヤーは、<strong>残差接続</strong>と<strong>レイヤー正規化</strong>を持つ2つのサブレイヤーで構成されます：</p>

<pre><code class="language-text">Transformer Encoderブロック:

  入力
    │
    ▼
┌─────────────────────────────┐
│  Multi-Head Self-Attention  │
└──────────────┬──────────────┘
               │
    ┌──────────┴──────────┐
    │     Add & Norm      │ ← x + Sublayer(x)、次にLayerNorm
    └──────────┬──────────┘
               │
    ┌──────────┴──────────┐
    │  Feed-Forward Net   │ ← 2つのLinear層 + ReLU/GELU
    │  FFN(x) = W₂·σ(W₁x + b₁) + b₂
    └──────────┬──────────┘
               │
    ┌──────────┴──────────┐
    │     Add & Norm      │
    └──────────┬──────────┘
               │
             出力
</code></pre>

<h3 id="decoder-block">4.2 Decoderブロック</h3>

<p><strong>Decoder</strong>には、Encoderの出力に注目するための<strong>Cross-Attention</strong>サブレイヤーが追加されています：</p>

<pre><code class="language-text">Transformer Decoderブロック:

  入力（右シフト）
    │
    ▼
┌────────────────────────────────┐
│  Masked Multi-Head Attention   │ ← causal mask: 以前のトークンのみ参照可能
└──────────────┬─────────────────┘
               │
    ┌──────────┴──────────┐
    │     Add & Norm      │
    └──────────┬──────────┘
               │
    ┌──────────┴──────────────────────────┐
    │  Cross Multi-Head Attention         │ ← QはDecoder、K/VはEncoderから
    │  Q = Decoderの隠れ状態              │
    │  K, V = Encoderの出力               │
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
             出力
</code></pre>

<h3 id="full-transformer">4.3 完全なTransformerアーキテクチャ</h3>

<pre><code class="language-text">┌─────────────────────────────────────────────────────────────────┐
│                    TRANSFORMERアーキテクチャ                     │
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
│      × N層            │         │  Feed   │                    │
│        │              │         │ Forward │                    │
│     Encoder           │         └────┬────┘                    │
│     出力              │         Add & Norm                     │
│                       │              │                          │
│                       │           × N層                        │
│                       │              │                          │
│                       │         Linear + Softmax               │
│                       │              │                          │
│                       │       出力確率分布                       │
└───────────────────────┴─────────────────────────────────────────┘
</code></pre>

<h3 id="positional-encoding">4.4 Positional Encoding</h3>

<p>TransformerにはRNNのような「順序」の概念がありません。<strong>Positional Encoding</strong>はsin/cos関数を使って、埋め込みに位置情報を追加します：</p>

<pre><code class="language-text">PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))

pos: シーケンス内のトークン位置 (0, 1, 2, ...)
i:   次元のインデックス (0, 1, 2, ..., d_model/2)
</code></pre>

<p>これは<strong>Diffusion Models</strong>で再利用されるまったく同じ概念です — タイムステップtをエンコードするための正弦波埋め込みです。ここでPositional Encodingをマスターすれば、Diffusionのセクションで大いに役立ちます。</p>

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
        pe[:, 0::2] = torch.sin(position * div_term)  # 偶数インデックス
        pe[:, 1::2] = torch.cos(position * div_term)  # 奇数インデックス
        pe = pe.unsqueeze(0)  # (1, max_len, d_model)
        self.register_buffer('pe', pe)

    def forward(self, x):
        # x: (batch, seq_len, d_model)
        return x + self.pe[:, :x.size(1), :]

# デモ
pe = PositionalEncoding(d_model=512)
x = torch.randn(2, 100, 512)  # batch=2, seq_len=100
output = pe(x)
print(f"Output shape: {output.shape}")  # (2, 100, 512)
</code></pre>

<h3 id="layer-norm">4.5 Layer Normalization vs Batch Normalization</h3>

<table>
<thead>
<tr><th>特徴</th><th>Batch Normalization</th><th>Layer Normalization</th></tr>
</thead>
<tbody>
<tr><td>正規化の対象</td><td>バッチ次元</td><td>特徴次元</td></tr>
<tr><td>バッチサイズへの依存</td><td>あり — 十分なバッチサイズが必要</td><td>なし — 各サンプルに対して独立に動作</td></tr>
<tr><td>使用される分野</td><td>CNN（コンピュータビジョン）</td><td>Transformer、RNN（NLP）</td></tr>
<tr><td>推論時の挙動</td><td>移動統計量を使用</td><td>直接計算 — 学習時と同じ</td></tr>
<tr><td>Transformerでの使用</td><td>いいえ</td><td><strong>はい — すべてのサブレイヤー</strong></td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のヒント：</strong> 「TransformerがBatchNormではなくLayerNormを使う理由は？」という問題が出た場合→回答：(1) NLPではシーケンス長が可変であるため、バッチ統計が不安定になる、(2) LayerNormはバッチサイズに依存せず、小さなバッチサイズや推論時にもうまく動作する。</p></blockquote>

<h2 id="model-families">5. モデルファミリー</h2>

<h3 id="encoder-only">5.1 Encoderのみ：BERT</h3>

<p><strong>BERT</strong>（Bidirectional Encoder Representations from Transformers）は<strong>Encoder</strong>のみを使用します。以下の方法で事前学習されています：</p>

<ul>
<li><strong>MLM（Masked Language Modeling）</strong> — トークンの15%をマスクし、マスクされたトークンを予測する</li>
<li><strong>NSP（Next Sentence Prediction）</strong> — 2つの文が連続しているかどうかを判定する</li>
</ul>

<p>BERTは両方向を見ることができる（双方向性）ため、<strong>理解</strong>タスクに優れています：分類、NER、QA。</p>

<h3 id="decoder-only">5.2 Decoderのみ：GPT</h3>

<p><strong>GPT</strong>（Generative Pre-trained Transformer）は<strong>causal masking</strong>を持つ<strong>Decoder</strong>のみを使用します — 各トークンは以前のトークンにのみ注目できます。<strong>次トークン予測</strong>で事前学習されています。</p>

<pre><code class="language-text">Causal Attentionマスク（GPT）:

トークン: [The]  [cat]  [sat]  [on]
The       ✓      ✗      ✗      ✗
cat       ✓      ✓      ✗      ✗
sat       ✓      ✓      ✓      ✗
on        ✓      ✓      ✓      ✓

✓ = 注目可能    ✗ = マスク済み（= softmax前に-inf）

→ 各トークンは前のトークンのみ「見る」ことができる
→ 生成に適している：次のトークンを予測
</code></pre>

<h3 id="encoder-decoder">5.3 Encoder-Decoder：T5</h3>

<p><strong>T5</strong>（Text-to-Text Transfer Transformer）は完全な<strong>Encoder-Decoder</strong>アーキテクチャを使用します。すべてのタスクが「テキスト入力→テキスト出力」として定式化されます：</p>

<ul>
<li>翻訳：<code>"translate English to French: The cat sat"</code> → <code>"Le chat s'est assis"</code></li>
<li>要約：<code>"summarize: {長いテキスト}"</code> → <code>"{要約}"</code></li>
<li>分類：<code>"classify: {テキスト}"</code> → <code>"positive"</code></li>
</ul>

<h3 id="model-comparison">5.4 比較表</h3>

<table>
<thead>
<tr><th>特徴</th><th>BERT（Encoder）</th><th>GPT（Decoder）</th><th>T5（Enc-Dec）</th></tr>
</thead>
<tbody>
<tr><td>アーキテクチャ</td><td>Encoderのみ</td><td>Decoderのみ</td><td>Encoder-Decoder</td></tr>
<tr><td>方向性</td><td>双方向</td><td>左から右（causal）</td><td>双方向enc + causal dec</td></tr>
<tr><td>事前学習</td><td>MLM + NSP</td><td>次トークン予測</td><td>Span corruption</td></tr>
<tr><td>Attentionマスク</td><td>全体（すべてのトークンを参照）</td><td>Causal（過去のみ参照）</td><td>全体enc + causal dec</td></tr>
<tr><td>得意分野</td><td>理解：NER、QA、分類</td><td>生成：テキスト、コード</td><td>Seq2seq：翻訳、要約</td></tr>
<tr><td>出力</td><td>文脈的埋め込み</td><td>次トークンの確率</td><td>ターゲットシーケンス</td></tr>
<tr><td>代表的なモデル</td><td>BERT, RoBERTa, DeBERTa</td><td>GPT-2/3/4, LLaMA</td><td>T5, BART, mBART</td></tr>
</tbody>
</table>

<pre><code class="language-text">決定木 — モデルファミリーの選択:

                ┌─ 長いテキストの生成が必要？
                │   はい → Decoderのみ（GPT, LLaMA）
                │
タスク ─────────┤
                │   ┌─ 入力→出力のシーケンス変換？
                │   │   はい → Encoder-Decoder（T5, BART）
                いいえ┤
                    │   いいえ → Encoderのみ（BERT）
                    │   （分類、NER、埋め込み）
                    └──────────────────────────────────
</code></pre>

<blockquote><p><strong>試験のヒント：</strong> よくある問題：「タスクXに対して、どのモデルファミリーを使うべきか？」クイックルール：(1) 理解/分類 → BERT、(2) 生成 → GPT、(3) Seq2seq（翻訳、要約）→ T5。注意：十分に大きなGPTは<strong>プロンプティング</strong>を通じてあらゆるタスクも処理できます。</p></blockquote>

<h2 id="tokenization">6. トークン化</h2>

<h3 id="token-vs-word">6.1 トークン vs 単語</h3>

<p>言語モデルは「単語」ではなく<strong>トークン</strong>で動作します — トークンは単語以下のサイズの単位です。トークン化は、テキストをどのようにトークンに分割するかを決定します。</p>

<pre><code class="language-text">"unbelievable"のトークン化の例:

単語レベル:       ["unbelievable"]         → 語彙が大きすぎ、OOVが多い
文字レベル:       ["u","n","b","e",...]    → シーケンスが長すぎ
サブワード (BPE): ["un", "believ", "able"] → 語彙サイズとシーケンス長のバランス
</code></pre>

<h3 id="bpe-wordpiece-sentencepiece">6.2 BPE、WordPiece、SentencePiece</h3>

<table>
<thead>
<tr><th>アルゴリズム</th><th>使用モデル</th><th>仕組み</th><th>特徴</th></tr>
</thead>
<tbody>
<tr><td><strong>BPE</strong>（Byte-Pair Encoding）</td><td>GPT-2/3/4, RoBERTa</td><td>最も頻度の高いバイトペアを繰り返しマージ</td><td>ボトムアップ、貪欲マージ</td></tr>
<tr><td><strong>WordPiece</strong></td><td>BERT, DistilBERT</td><td>尤度を最大化するペアをマージ</td><td>サブワードに<code>##</code>プレフィックスを使用</td></tr>
<tr><td><strong>SentencePiece</strong></td><td>T5, LLaMA, mT5</td><td>生テキストに対するUnigram LMまたはBPE</td><td>言語非依存、事前トークン化不要</td></tr>
</tbody>
</table>

<pre><code class="language-text">比較の例:

入力: "I love tokenization"

BPE (GPT-2):       ["I", " love", " token", "ization"]
WordPiece (BERT):   ["I", "love", "token", "##ization"]
SentencePiece (T5): ["▁I", "▁love", "▁token", "ization"]

WordPieceは接続に##を使用
SentencePieceは単語の開始に▁を使用
</code></pre>

<h3 id="tokenizer-code">6.3 コード：HuggingFaceによるトークン化</h3>

<pre><code class="language-python">from transformers import AutoTokenizer

# 各モデルファミリーのトークナイザーを読み込み
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

# エンコード → トークンID
ids = bert_tok.encode(text, return_tensors="pt")
print(f"Token IDs shape: {ids.shape}")

# テキストにデコード
decoded = bert_tok.decode(ids[0])
print(f"Decoded: {decoded}")
</code></pre>

<p>語彙サイズは埋め込みサイズとモデルの能力に影響します：</p>

<table>
<thead>
<tr><th>モデル</th><th>トークナイザー</th><th>語彙サイズ</th><th>備考</th></tr>
</thead>
<tbody>
<tr><td>BERT-base</td><td>WordPiece</td><td>30,522</td><td>小文字英語</td></tr>
<tr><td>GPT-2</td><td>BPE</td><td>50,257</td><td>大文字小文字区別あり</td></tr>
<tr><td>T5</td><td>SentencePiece</td><td>32,100</td><td>多言語対応</td></tr>
<tr><td>LLaMA-2</td><td>SentencePiece</td><td>32,000</td><td>BPEの変種</td></tr>
<tr><td>GPT-4</td><td>BPE (cl100k)</td><td>100,256</td><td>コード+多言語に最適化</td></tr>
</tbody>
</table>

<h2 id="nlp-tasks">7. NLPタスクのマッピング</h2>

<h3 id="task-overview">7.1 タスク → モデル → 出力</h3>

<table>
<thead>
<tr><th>NLPタスク</th><th>タスク種別</th><th>最適なモデルファミリー</th><th>出力</th></tr>
</thead>
<tbody>
<tr><td>テキスト分類</td><td>シーケンス分類</td><td>Encoder（BERT）</td><td>単一ラベル</td></tr>
<tr><td>感情分析</td><td>シーケンス分類</td><td>Encoder（BERT）</td><td>Positive/Negative</td></tr>
<tr><td>固有表現抽出</td><td>トークン分類</td><td>Encoder（BERT）</td><td>トークンごとのラベル</td></tr>
<tr><td>質問応答</td><td>抽出型/生成型</td><td>EncoderまたはEnc-Dec</td><td>スパンまたはテキスト</td></tr>
<tr><td>要約</td><td>Seq2seq生成</td><td>Enc-Dec（T5, BART）</td><td>要約テキスト</td></tr>
<tr><td>翻訳</td><td>Seq2seq生成</td><td>Enc-Dec（T5, mBART）</td><td>翻訳テキスト</td></tr>
<tr><td>テキスト生成</td><td>自己回帰</td><td>Decoder（GPT）</td><td>続きのテキスト</td></tr>
<tr><td>コード生成</td><td>自己回帰</td><td>Decoder（CodeGen）</td><td>コード</td></tr>
</tbody>
</table>

<h3 id="classification-code">7.2 コード：BERTをテキスト分類用にファインチューニング</h3>

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
        # BERTの出力: last_hidden_state, pooler_output
        outputs = self.bert(input_ids=input_ids,
                           attention_mask=attention_mask)

        # [CLS]トークンの表現を分類に使用
        cls_output = outputs.pooler_output  # (batch, hidden_size)
        cls_output = self.dropout(cls_output)
        logits = self.classifier(cls_output)  # (batch, num_classes)
        return logits

# 使用例
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertClassifier(num_classes=3)

# 入力をトークン化
text = "This movie was absolutely wonderful!"
encoded = tokenizer(text, return_tensors='pt', padding=True,
                    truncation=True, max_length=128)

# フォワードパス
logits = model(encoded['input_ids'], encoded['attention_mask'])
prediction = torch.argmax(logits, dim=-1)
print(f"Predicted class: {prediction.item()}")
</code></pre>

<pre><code class="language-python"># BERT分類器のトレーニングループ
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

<blockquote><p><strong>試験のヒント：</strong> BERTのファインチューニングで重要な3つのポイント：(1) <strong>小さな学習率</strong>（2e-5〜5e-5）— モデルが既に事前学習済みのため、(2) <strong>勾配クリッピング</strong>（<code>clip_grad_norm_</code>）で学習を安定化、(3) 分類には<strong>pooler_output</strong>（CLSトークン）を使用し、トークンレベルタスク（NER）には<strong>last_hidden_state</strong>を使用する。</p></blockquote>

<h2 id="cheat-sheet">8. チートシート</h2>

<table>
<thead>
<tr><th>概念</th><th>重要な公式/パターン</th><th>覚えておくこと</th></tr>
</thead>
<tbody>
<tr><td>Scaled Dot-Product</td><td><code>softmax(QK^T / √d_k) V</code></td><td>softmaxの飽和を防ぐため√d_kで割る</td></tr>
<tr><td>Multi-Head</td><td>分割 → h × Attention → 結合 → Linear</td><td>d_k = d_model / num_heads</td></tr>
<tr><td>Positional Encoding</td><td>sin/cos関数</td><td>Diffusionのタイムステップ埋め込みでも再利用</td></tr>
<tr><td>Encoder（BERT）</td><td>双方向、MLM</td><td>理解タスク：NER、QA、分類</td></tr>
<tr><td>Decoder（GPT）</td><td>Causalマスク、次トークン予測</td><td>生成タスク：テキスト、コード</td></tr>
<tr><td>Enc-Dec（T5）</td><td>Cross-attention、seq2seq</td><td>翻訳、要約</td></tr>
<tr><td>BPE</td><td>頻度の高いバイトペアをマージ</td><td>GPTファミリー</td></tr>
<tr><td>WordPiece</td><td>尤度最大化マージ</td><td>BERTファミリー、##プレフィックスを使用</td></tr>
<tr><td>SentencePiece</td><td>生テキストに対して言語非依存</td><td>T5、LLaMA、▁プレフィックスを使用</td></tr>
<tr><td>Causalマスク</td><td>下三角行列</td><td>GPT：各トークンは前のトークンのみ参照可能</td></tr>
<tr><td>Layer Norm</td><td>特徴次元で正規化</td><td>Transformerで使用（BatchNormではない）</td></tr>
<tr><td>ファインチューニングLR</td><td>2e-5 → 5e-5</td><td>事前学習済み重みのため小さなLR</td></tr>
</tbody>
</table>

<h2 id="practice-questions">9. 練習問題</h2>

<p>NVIDIA DLIに類似したコーディングアセスメント形式の問題：</p>

<p><strong>Q1：</strong> <code>scaled_dot_product_attention</code>関数を実装してください。この関数はQ、K、Vテンソルとオプションのマスクを受け取り、出力とAttention重みを返します。</p>

<details>
<summary>Q1の解答を表示</summary>

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

    # Attentionスコアを計算
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)

    # マスクがあれば適用
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))

    # 最後の次元（Key次元）でsoftmax
    attn_weights = F.softmax(scores, dim=-1)

    # Valueの重み付き和
    output = torch.matmul(attn_weights, V)

    return output, attn_weights

# 検証:
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

<p><em>解説：重要なポイントは (1) 正しい行列乗算のための<code>K.transpose(-2, -1)</code>、(2) スケーリングのための<code>math.sqrt(d_k)</code>による除算、(3) softmax前に<code>-inf</code>で<code>masked_fill</code>、(4) <code>dim=-1</code>でのsoftmax。よくあるエラー：Kの転置を忘れる、またはsoftmaxを間違った次元で適用する。</em></p>
</details>

<p><strong>Q2：</strong> TransformerからPositional Encodingを削除するとどうなりますか？コードで証明してください。</p>

<details>
<summary>Q2の解答を表示</summary>

<pre><code class="language-python">import torch

# Positional EncodingなしのSelf-Attention
# → 出力は順列不変（トークンの順序は関係ない）

def self_attention_no_pos(x):
    """x: (batch, seq_len, d_model)"""
    d_k = x.size(-1)
    scores = torch.matmul(x, x.transpose(-2, -1)) / (d_k ** 0.5)
    weights = torch.softmax(scores, dim=-1)
    return torch.matmul(weights, x)

# 入力を作成
x = torch.randn(1, 4, 8)  # 4トークン、d_model=8

# 元の出力
out1 = self_attention_no_pos(x)

# トークンの順序をシャッフル: [0,1,2,3] → [2,0,3,1]
perm = [2, 0, 3, 1]
x_shuffled = x[:, perm, :]
out2 = self_attention_no_pos(x_shuffled)

# 確認: 出力も同じ順序でシャッフルされている
inv_perm = [1, 3, 0, 2]  # 逆順列
out2_reordered = out2[:, inv_perm, :]

print(f"Difference: {(out1 - out2_reordered).abs().max().item():.10f}")
# → ほぼ0！ Attentionは順序を区別しない
# → "The cat sat on mat" = "mat on sat cat The"
# だからPositional Encodingが必須なのです！
</code></pre>

<p><em>解説：Positional Encodingがない場合、Self-Attentionは<strong>順列同変</strong>です — 「The cat sat」と「sat The cat」を同一に処理します。Positional Encodingはこの対称性を破り、モデルがトークンの順序を区別できるようにします。Diffusion Modelsでも、同じ概念がタイムステップ埋め込みに使われています。</em></p>
</details>

<p><strong>Q3：</strong> GPTはcausal maskingを使用します。causal maskを作成するコードを書き、マスク行列の各要素を説明してください。</p>

<details>
<summary>Q3の解答を表示</summary>

<pre><code class="language-python">import torch

def create_causal_mask(seq_len):
    """
    Decoder用のcausal（先読み防止）マスクを作成。
    mask[i][j] = 1: トークンiがトークンjに注目できる（j <= i）
    mask[i][j] = 0: トークンiがトークンjを見ることができない（j > i）
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

# Attentionに適用
def causal_attention(Q, K, V):
    d_k = Q.size(-1)
    seq_len = Q.size(1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)

    # causal maskを適用
    mask = create_causal_mask(seq_len).unsqueeze(0)  # (1, S, S)
    scores = scores.masked_fill(mask == 0, float('-inf'))
    # 結果: 未来の位置 → -inf → softmax → 0

    weights = torch.softmax(scores, dim=-1)
    print("Attention重み（causal）:")
    print(weights[0].detach())
    # 行0: [1.0, 0.0, 0.0, 0.0, 0.0]  ← トークン0は自分自身のみ参照
    # 行1: [0.4, 0.6, 0.0, 0.0, 0.0]  ← トークン1はトークン0, 1を参照
    # 行4: [0.1, 0.2, 0.3, 0.2, 0.2]  ← トークン4はすべてのトークンを参照

    return torch.matmul(weights, V)

B, S, D = 1, 5, 32
Q = torch.randn(B, S, D)
K = torch.randn(B, S, D)
V = torch.randn(B, S, D)
out = causal_attention(Q, K, V)
print(f"Output shape: {out.shape}")  # (1, 5, 32)
</code></pre>

<p><em>解説：causal maskは下三角行列（<code>torch.tril</code>）です。<code>mask[i][j]=0</code>（j > i）の位置はsoftmax前に<code>-inf</code>で埋められ、softmax後に0になります。これにより各トークンは前のトークンにのみ注目できます — GPTの自己回帰生成に不可欠です。</em></p>
</details>

<p><strong>Q4：</strong> 以下のユースケースに対して、最も適切なモデルファミリーを選び、理由を説明してください：</p>
<ul>
<li>(a) メールのスパム/非スパム分類</li>
<li>(b) ベトナム語から英語への翻訳</li>
<li>(c) 自由形式のテキスト生成チャットボット</li>
<li>(d) テキストからの人名抽出（NER）</li>
</ul>

<details>
<summary>Q4の解答を表示</summary>

<pre><code class="language-python"># ユースケース → モデルファミリーのマッピング

tasks = {
    "(a) メールスパム分類": {
        "model_family": "Encoderのみ（BERT）",
        "reason": "分類タスク — メール全体を理解する必要がある"
                  "（双方向）。出力 = 1つのラベル（スパム/非スパム）。"
                  "BERT + Linear分類ヘッド。",
        "code_hint": "BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)"
    },
    "(b) ベトナム語 → 英語翻訳": {
        "model_family": "Encoder-Decoder（T5, mBART）",
        "reason": "Seq2seqタスク — 入力シーケンス（ベトナム語）→ 出力"
                  "シーケンス（英語）。Encoderが入力を理解し、Decoderが"
                  "出力を生成。多言語対応のT5またはmBART。",
        "code_hint": "T5ForConditionalGeneration.from_pretrained('t5-base')"
    },
    "(c) 自由形式チャットボット": {
        "model_family": "Decoderのみ（GPT, LLaMA）",
        "reason": "自己回帰生成 — トークンごとにテキストを生成し、"
                  "別のEncoderは不要。チャットボット用途には"
                  "指示チューニング済みのGPT/LLaMA。",
        "code_hint": "AutoModelForCausalLM.from_pretrained('meta-llama/Llama-2-7b-chat-hf')"
    },
    "(d) 固有表現抽出": {
        "model_family": "Encoderのみ（BERT）",
        "reason": "トークン分類 — 各トークンにラベルを割り当てる必要がある"
                  "（B-PER, I-PER, O, B-LOC,...）。BERTの双方向Attentionにより"
                  "各トークンが両方向のコンテキストを参照可能。",
        "code_hint": "BertForTokenClassification.from_pretrained('bert-base-uncased', num_labels=9)"
    }
}

for task, info in tasks.items():
    print(f"\n{task}")
    print(f"  → {info['model_family']}")
    print(f"  理由: {info['reason']}")
    print(f"  コード: {info['code_hint']}")
</code></pre>

<p><em>解説：一般的なルール：(1) 出力が入力全体に対する1つのラベル → Encoder（BERT）、(2) 出力が各トークンに対するラベル → Encoder（BERT）+ トークン分類ヘッド、(3) 出力が異なる言語/形式のシーケンス → Encoder-Decoder（T5）、(4) 継続的なテキスト生成が必要 → Decoder（GPT）。ただし実際には、十分に大きなDecoder-only LLM（GPT-4、LLaMA-70B）はプロンプティングを通じてあらゆるタスクをうまく処理できます。</em></p>
</details>
