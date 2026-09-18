---
id: 019e0a01-bb04-7001-c001-ee0400000001
title: "Bài 4: NLP Fundamentals — Tokenization, Embeddings & Transformer"
slug: bai-4-nlp-tokenization-embeddings-transformer
description: >-
  NLP pipeline: tokenization (BPE, WordPiece, SentencePiece). Word embeddings (Word2Vec, GloVe). Transformer architecture: self-attention, multi-head attention, positional encoding. Hugging Face Transformers library.
duration_minutes: 180
is_free: true
video_url: null
sort_order: 3
section_title: "Phần 2: NLP & Large Language Models (LLMs)"
course:
  id: 019e0a01-aa01-7001-b001-ff0500000001
  title: "AI Agent Engineer: Từ Zero đến Production"
  slug: ai-agent-engineer-tu-zero-den-production
---

> **Máy tính không hiểu ngôn ngữ — nó chỉ hiểu số.** Mọi bước tiến từ chatbot đến GPT-4 đều xoay quanh một câu hỏi: *làm sao biến text thành numbers mà vẫn giữ ý nghĩa?* Bài này đưa bạn qua toàn bộ hành trình: từ tokenization, word embeddings, đến kiến trúc Transformer — "trái tim" của mọi LLM hiện đại.

## 1. NLP Evolution — Bốn kỷ nguyên

NLP đã trải qua bốn giai đoạn lớn. Hiểu lịch sử giúp bạn biết **tại sao** Transformer thắng, không chỉ **cách** nó hoạt động.

```text
Timeline NLP Evolution:

1950s-1990s        1990s-2010s         2013-2017            2017-nay
┌──────────┐     ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐
│ Rule-based│────▶│  Statistical │───▶│   Neural     │───▶│   Transformer    │
│           │     │              │    │              │    │                  │
│ Regex     │     │ N-gram, TF-IDF│   │ Word2Vec     │    │ Attention is     │
│ Grammar   │     │ Naive Bayes  │    │ LSTM, GRU    │    │ All You Need     │
│ Templates │     │ HMM, CRF     │    │ Seq2Seq+Attn │    │ BERT, GPT, T5    │
└──────────┘     └──────────────┘    └──────────────┘    └──────────────────┘
     ▼                  ▼                   ▼                     ▼
 Brittle,          Better but          Good nhưng           Parallel training,
 không scale        cần nhiều          sequential = chậm     contextual, SOTA
                   feature eng.        vanishing gradient     mọi NLP task
```

| Kỷ nguyên | Đại diện | Ưu điểm | Hạn chế |
|-----------|----------|---------|---------|
| Rule-based | Regex, ELIZA | Deterministic, dễ debug | Không scale, fragile |
| Statistical | TF-IDF + Naive Bayes, HMM | Học từ data, xác suất | Feature engineering thủ công |
| Neural | Word2Vec, LSTM, Seq2Seq | Tự học features, dense vectors | Sequential → chậm, long-range khó |
| Transformer | BERT, GPT, T5 | Parallel, context sâu, scalable | Chi phí compute lớn |

> **Key insight:** Transformer giải quyết hai vấn đề lớn nhất của RNN: (1) **sequential bottleneck** — không parallelize được, (2) **vanishing gradient** — khó nhớ long-range dependencies.

## 2. Text Preprocessing — Làm sạch dữ liệu

Trước khi tokenize, text cần được **chuẩn hóa** (normalize). Garbage in = garbage out.

### 2.1. Pipeline cơ bản

```python
import re
import unicodedata

def preprocess_text(text: str) -> str:
    """Basic NLP preprocessing pipeline."""
    # 1. Lowercase
    text = text.lower()
    
    # 2. Unicode normalization (é → e, ñ → n cho Latin)
    text = unicodedata.normalize("NFKD", text)
    
    # 3. Xóa HTML tags
    text = re.sub(r"<[^>]+>", "", text)
    
    # 4. Xóa URLs
    text = re.sub(r"https?://\S+|www\.\S+", "", text)
    
    # 5. Xóa special characters (giữ alphanumeric + space)
    text = re.sub(r"[^a-z0-9\s]", "", text)
    
    # 6. Xóa extra whitespace
    text = re.sub(r"\s+", " ", text).strip()
    
    return text

# Demo
raw = "  Check out https://blog.xdev.asia! It's <b>AMAZING</b>... 🚀  "
print(preprocess_text(raw))
# Output: "check out its amazing"
```

### 2.2. Stopwords removal

**Stopwords** là các từ xuất hiện nhiều nhưng ít mang ý nghĩa: "the", "is", "at", "and"…

```python
# Cách 1: NLTK (nặng, 70+ languages)
# import nltk; nltk.download('stopwords')
# from nltk.corpus import stopwords
# stop_words = set(stopwords.words('english'))

# Cách 2: Tự định nghĩa (nhẹ, kiểm soát)
STOP_WORDS = {"the", "is", "at", "and", "a", "an", "in", "on", "to", "of", "it"}

def remove_stopwords(text: str) -> str:
    return " ".join(w for w in text.split() if w not in STOP_WORDS)

print(remove_stopwords("the cat is on the mat"))
# Output: "cat mat"
```

> **Lưu ý thực tế:** Với LLM hiện đại (BERT, GPT), **đừng remove stopwords** — model cần chúng để hiểu context. Stopword removal chỉ hữu ích cho TF-IDF, Bag-of-Words.

## 3. Tokenization Deep-dive

**Tokenization** = chia text thành đơn vị nhỏ (tokens). Đây là bước **quan trọng nhất** — quyết định vocabulary size, OOV handling, và chất lượng model.

### 3.1. Bốn cấp độ Tokenization

```text
Input: "unhappiness"

Character-level:  [u] [n] [h] [a] [p] [p] [i] [n] [e] [s] [s]    → Vocab nhỏ, sequence dài
Word-level:       [unhappiness]                                      → OOV problem, vocab lớn
Subword-level:    [un] [happi] [ness]                                → Balanced ✓
Sentence-level:   [unhappiness is real]                              → Dùng cho translation
```

### 3.2. Subword Tokenization — So sánh chi tiết

Đây là kỹ thuật **mọi LLM hiện đại đều dùng**. Ý tưởng: từ phổ biến giữ nguyên, từ hiếm chia nhỏ.

| Algorithm | Dùng bởi | Hướng tiếp cận | Đặc điểm |
|-----------|---------|----------------|----------|
| **BPE** (Byte-Pair Encoding) | GPT-2, GPT-3, GPT-4, LLaMA | Bottom-up: merge frequent pairs | Greedy, đơn giản, hiệu quả |
| **WordPiece** | BERT, DistilBERT | Bottom-up: merge maximize likelihood | Dùng `##` prefix cho subword |
| **Unigram** | T5, ALBERT, XLNet | Top-down: remove least useful tokens | Probabilistic, chọn best segmentation |
| **SentencePiece** | T5, mBART, LLaMA | Wrapper: BPE/Unigram trên raw text | Language-agnostic, không cần pre-tokenize |

```text
BPE Algorithm (simplified):

Corpus: "low low low low low lowest lowest newer newer newer wider wider"

Step 0 - Character vocab: {l, o, w, e, s, t, n, r, i, d, _}
Step 1 - Count pairs:     (l,o)=7  (o,w)=7  (w,e)=5  (e,r)=5  ...
Step 2 - Merge top pair:  (l,o) → "lo"    Vocab: {..., lo}
Step 3 - Count again:     (lo,w)=7  (w,e)=5 ...
Step 4 - Merge:           (lo,w) → "low"   Vocab: {..., lo, low}
... repeat N times (N = desired vocab size - initial chars)
```

### 3.3. Thực hành với tiktoken (GPT tokenizer)

```python
import tiktoken

# GPT-4 dùng cl100k_base encoding
enc = tiktoken.encoding_for_model("gpt-4")

text = "Transformers revolutionized NLP in 2017!"
tokens = enc.encode(text)
print(f"Text: {text}")
print(f"Token IDs: {tokens}")
print(f"Num tokens: {len(tokens)}")

# Decode từng token để thấy subwords
for tid in tokens:
    print(f"  {tid} → '{enc.decode([tid])}'")

# Output:
# Text: Transformers revolutionized NLP in 2017!
# Token IDs: [Transformers, revolution, ized, NLP, in, 2017, !]
# Num tokens: 7
```

```python
# So sánh token count giữa các encoding
for model_name in ["gpt-3.5-turbo", "gpt-4", "gpt-4o"]:
    enc = tiktoken.encoding_for_model(model_name)
    n = len(enc.encode(text))
    print(f"{model_name:20s} → {n} tokens (encoding: {enc.name})")

# Ước lượng nhanh: 1 token ≈ 4 chars (English), ≈ 0.7 words
# Tiếng Việt: 1 token ≈ 2-3 chars (vì Unicode)
```

### 3.4. Hugging Face Tokenizer

```python
from transformers import AutoTokenizer

# BERT tokenizer (WordPiece)
bert_tok = AutoTokenizer.from_pretrained("bert-base-uncased")
result = bert_tok("unhappiness is everywhere", return_tensors="pt")
print(bert_tok.convert_ids_to_tokens(result["input_ids"][0]))
# ['[CLS]', 'un', '##happi', '##ness', 'is', 'everywhere', '[SEP]']

# GPT-2 tokenizer (BPE)
gpt2_tok = AutoTokenizer.from_pretrained("gpt2")
tokens = gpt2_tok.tokenize("unhappiness is everywhere")
print(tokens)
# ['un', 'happiness', 'Ġis', 'Ġeverywhere']  (Ġ = space prefix)
```

> **Key insight:** BERT dùng `[CLS]`, `[SEP]` special tokens và `##` subword prefix. GPT-2 dùng `Ġ` (space) prefix. Hiểu conventions từng model là critical khi fine-tune.

## 4. Word Embeddings — Biến từ thành vectors

### 4.1. Tại sao cần Embeddings?

**One-hot encoding** biến mỗi từ thành vector thưa (sparse). Với vocab 50K từ, mỗi từ là vector 50K chiều với đúng 1 giá trị = 1. Vấn đề:

- **Sparse**: lãng phí memory
- **Không có similarity**: `cosine("king", "queen") = 0` (orthogonal)
- **Không scale**: vocab lớn → dimension lớn

**Word embeddings** giải quyết tất cả: dense vectors, cùng chiều cố định (thường 100-300d), và encode **semantic similarity**.

```text
One-hot (sparse, 10000-dim):
  "king"  = [0, 0, 0, ..., 1, ..., 0, 0]
  "queen" = [0, 0, 1, ..., 0, ..., 0, 0]
  cosine similarity = 0 ← không hữu ích

Word2Vec (dense, 300-dim):
  "king"  = [0.52, -0.31, 0.15, ..., 0.89]
  "queen" = [0.48, -0.29, 0.18, ..., 0.91]
  cosine similarity = 0.78 ← captures semantics!
  
  vector("king") - vector("man") + vector("woman") ≈ vector("queen")
```

### 4.2. Word2Vec — Hai kiến trúc

```text
CBOW (Continuous Bag of Words):
  Context → Predict center word
  
  "The cat [___] on the mat"
  Input: [the, cat, on, the, mat] → Output: "sat"
  Nhanh hơn, tốt cho frequent words

Skip-gram:
  Center word → Predict context
  
  "sat" → Predict: [the, cat, on, the, mat]
  Chậm hơn, tốt cho rare words, small datasets

┌────────────────────────────────────────────────┐
│              CBOW vs Skip-gram                  │
│                                                 │
│  CBOW:                  Skip-gram:              │
│  [the]──┐               ┌──▶[the]              │
│  [cat]──┤    ┌─────┐    │   ┌─────┐            │
│         ├───▶│ sat │    │   │     │──▶[cat]    │
│  [on]───┤    └─────┘    │   │ sat │             │
│  [the]──┤               │   │     │──▶[on]     │
│  [mat]──┘               │   └─────┘            │
│                         └──▶[mat]               │
│  Context → Word          Word → Context         │
└────────────────────────────────────────────────┘
```

### 4.3. Thực hành Word2Vec & GloVe với Gensim

```python
import gensim.downloader as api
import numpy as np

# Download pretrained Word2Vec (1.7GB) hoặc GloVe (nhẹ hơn)
# model = api.load("word2vec-google-news-300")   # Word2Vec 300d
model = api.load("glove-wiki-gigaword-100")       # GloVe 100d (nhẹ hơn)

# 1. Similarity
print(model.most_similar("king", topn=5))
# [('queen', 0.72), ('prince', 0.68), ('monarch', 0.66), ...]

# 2. Analogy: king - man + woman = ?
result = model.most_similar(
    positive=["king", "woman"], 
    negative=["man"], 
    topn=3
)
print(result)  # [('queen', 0.73), ...]

# 3. Odd one out
print(model.doesnt_match(["breakfast", "lunch", "dinner", "python"]))
# 'python'

# 4. Cosine similarity giữa hai từ
from numpy.linalg import norm
def cosine_sim(a, b):
    return np.dot(a, b) / (norm(a) * norm(b))

v_king = model["king"]
v_queen = model["queen"]
v_apple = model["apple"]
print(f"king ↔ queen: {cosine_sim(v_king, v_queen):.3f}")   # ~0.72
print(f"king ↔ apple: {cosine_sim(v_king, v_apple):.3f}")   # ~0.15
```

### 4.4. GloVe vs Word2Vec

| Tiêu chí | Word2Vec | GloVe |
|----------|----------|-------|
| Phương pháp | Predictive (neural net) | Count-based (co-occurrence matrix) |
| Training | Local context window | Global statistics |
| Tốc độ train | Chậm hơn | Nhanh hơn (matrix factorization) |
| Kết quả | Tốt cho analogy | Tốt cho similarity |
| Pretrained | Google News 300d | Wikipedia + Gigaword |

> **Hạn chế chung của static embeddings:** Mỗi từ chỉ có **MỘT vector** bất kể context. "bank" (ngân hàng) và "bank" (bờ sông) cùng vector → **không phân biệt polysemy**. Đây là động lực cho contextual embeddings.

## 5. Contextual Embeddings — ELMo đến BERT

### 5.1. Evolution: Static → Contextual

```text
Static Embeddings (Word2Vec, GloVe):
  "I went to the bank to deposit money"    bank = vector_A
  "I sat by the river bank"                bank = vector_A  ← SAME! sai

Contextual Embeddings (ELMo, BERT):
  "I went to the bank to deposit money"    bank = vector_X  (financial)
  "I sat by the river bank"                bank = vector_Y  (river)  ← DIFFERENT! đúng
```

| Model | Năm | Cách tạo context | Kiến trúc |
|-------|-----|-------------------|-----------|
| **ELMo** | 2018 | Bi-directional LSTM | 2-layer biLSTM, character CNN |
| **BERT** | 2018 | Masked Language Model | Transformer Encoder |
| **GPT** | 2018 | Autoregressive LM | Transformer Decoder |

### 5.2. ELMo — Embeddings from Language Models

ELMo chạy 2 LSTM (forward + backward), rồi **combine tất cả layers** thành final embedding. Mỗi layer capture thông tin khác nhau:

- Layer 1: Syntax (POS tagging, NER)
- Layer 2: Semantics (word sense, sentiment)

```text
          Forward LSTM ────────▶
Input: "The cat sat on the mat"
          ◀──────── Backward LSTM

Final embedding = weighted sum of all layers
```

> **Tại sao BERT thắng ELMo?** ELMo vẫn dùng LSTM → sequential, không parallel. BERT dùng Transformer → parallel training, deeper context qua self-attention.

## 6. Transformer Architecture — Deep-dive

**"Attention Is All You Need"** (Vaswani et al., 2017) — paper thay đổi toàn bộ NLP và AI. Không LSTM, không CNN — chỉ **Attention**.

### 6.1. Kiến trúc tổng quan

```text
┌─────────────────────────────────────────────────────┐
│                  TRANSFORMER                         │
│                                                      │
│  ┌──────────────┐              ┌──────────────────┐  │
│  │   ENCODER     │              │     DECODER      │  │
│  │   (×N layers) │              │    (×N layers)   │  │
│  │               │              │                  │  │
│  │ ┌───────────┐ │              │ ┌──────────────┐ │  │
│  │ │ Multi-Head│ │   K,V        │ │ Masked       │ │  │
│  │ │ Self-Attn │ │──────────────│▶│ Multi-Head   │ │  │
│  │ └─────┬─────┘ │              │ │ Self-Attn    │ │  │
│  │   Add & Norm  │              │ └──────┬───────┘ │  │
│  │ ┌───────────┐ │              │   Add & Norm     │  │
│  │ │ Feed-     │ │              │ ┌──────────────┐ │  │
│  │ │ Forward   │ │              │ │ Cross-Attn   │ │  │
│  │ └─────┬─────┘ │              │ │ (Enc-Dec)    │ │  │
│  │   Add & Norm  │              │ └──────┬───────┘ │  │
│  └───────┬──────┘              │   Add & Norm     │  │
│          │                      │ ┌──────────────┐ │  │
│          │                      │ │ Feed-Forward │ │  │
│          │                      │ └──────┬───────┘ │  │
│          │                      │   Add & Norm     │  │
│          │                      └──────────────────┘  │
│   Input Embeddings              Output Embeddings     │
│   + Positional Enc.             + Positional Enc.     │
│          ▲                              ▲             │
│     [Input tokens]              [Output tokens]       │
└─────────────────────────────────────────────────────┘
```

### 6.2. Self-Attention Mechanism — Step by Step

Self-attention cho phép mỗi token **"nhìn"** tất cả tokens khác trong sequence để quyết định **attend vào đâu**.

**Ba ma trận: Query (Q), Key (K), Value (V)**

Trực giác: Tưởng tượng bạn tìm sách trong thư viện.
- **Query** = câu hỏi của bạn ("sách về AI")
- **Key** = nhãn trên từng kệ sách ("AI", "Lịch sử", "Nấu ăn")
- **Value** = nội dung sách trên kệ đó

```text
Attention(Q, K, V) = softmax(Q × K^T / √d_k) × V

Trong đó:
  Q × K^T    → attention scores (ai liên quan ai?)  
  / √d_k     → scaling (tránh softmax saturation)
  softmax()  → normalize thành probabilities
  × V        → weighted sum of values
```

### 6.3. Self-Attention — Ví dụ bằng tay

```python
import torch
import torch.nn.functional as F

# Input: 3 tokens, embedding dim = 4
# "The cat sat"
X = torch.tensor([
    [1.0, 0.0, 1.0, 0.0],  # "The"
    [0.0, 2.0, 0.0, 2.0],  # "cat"
    [1.0, 1.0, 1.0, 1.0],  # "sat"
])

# Weight matrices (learned parameters)
d_k = 4  # key dimension
W_Q = torch.randn(4, d_k)
W_K = torch.randn(4, d_k)
W_V = torch.randn(4, d_k)

# Step 1: Compute Q, K, V
Q = X @ W_Q    # (3, 4) @ (4, 4) = (3, 4)
K = X @ W_K
V = X @ W_V

# Step 2: Attention scores = Q × K^T / √d_k
scores = Q @ K.T / (d_k ** 0.5)   # (3, 3)
print("Raw attention scores:")
print(scores)

# Step 3: Softmax → probabilities
attn_weights = F.softmax(scores, dim=-1)  # (3, 3) — mỗi hàng sum = 1
print("\nAttention weights:")
print(attn_weights)
# Hàng 0 = "The" attend bao nhiêu vào [The, cat, sat]
# Hàng 1 = "cat" attend bao nhiêu vào [The, cat, sat]

# Step 4: Weighted sum of Values
output = attn_weights @ V   # (3, 3) @ (3, 4) = (3, 4)
print("\nContextualized output:")
print(output)
# Mỗi token giờ là weighted combination of ALL tokens
```

### 6.4. Multi-Head Attention — Tại sao cần nhiều heads?

Một attention head chỉ học **một loại relationship**. Nhiều heads học **nhiều loại** đồng thời:

```text
Head 1: Syntactic relationships    ("cat" → "sat" — subject-verb)
Head 2: Semantic similarity        ("cat" → "dog" — meaning)  
Head 3: Positional/proximity       ("the" → "cat" — adjacency)
Head 4: Coreference               ("it" → "cat" — refers to)

MultiHead(Q,K,V) = Concat(head_1, ..., head_h) × W_O

Mỗi head_i = Attention(Q × W_Q_i, K × W_K_i, V × W_V_i)
```

```python
import torch
import torch.nn as nn

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model: int, num_heads: int):
        super().__init__()
        assert d_model % num_heads == 0
        self.d_k = d_model // num_heads
        self.num_heads = num_heads
        
        self.W_Q = nn.Linear(d_model, d_model)
        self.W_K = nn.Linear(d_model, d_model)
        self.W_V = nn.Linear(d_model, d_model)
        self.W_O = nn.Linear(d_model, d_model)
    
    def forward(self, Q, K, V, mask=None):
        batch_size = Q.size(0)
        
        # Linear projections + split into heads
        # (batch, seq_len, d_model) → (batch, num_heads, seq_len, d_k)
        Q = self.W_Q(Q).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = self.W_K(K).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = self.W_V(V).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        
        # Scaled dot-product attention
        scores = Q @ K.transpose(-2, -1) / (self.d_k ** 0.5)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float("-inf"))
        attn_weights = torch.softmax(scores, dim=-1)
        context = attn_weights @ V
        
        # Concat heads + output projection
        context = context.transpose(1, 2).contiguous().view(batch_size, -1, self.num_heads * self.d_k)
        return self.W_O(context)

# Demo
mha = MultiHeadAttention(d_model=512, num_heads=8)
x = torch.randn(2, 10, 512)  # batch=2, seq_len=10, d_model=512
out = mha(x, x, x)           # self-attention: Q=K=V=x
print(out.shape)              # torch.Size([2, 10, 512])
```

### 6.5. Positional Encoding — Vị trí matters

Transformer xử lý **parallel** → không biết thứ tự tokens. Cần thêm **positional information**.

**Sinusoidal encoding** (paper gốc):

```text
PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))

pos = vị trí token (0, 1, 2, ...)
i   = dimension index
```

```python
import torch
import math

def sinusoidal_positional_encoding(max_len: int, d_model: int) -> torch.Tensor:
    """Generate sinusoidal positional encodings."""
    pe = torch.zeros(max_len, d_model)
    position = torch.arange(0, max_len).unsqueeze(1).float()
    div_term = torch.exp(
        torch.arange(0, d_model, 2).float() * -(math.log(10000.0) / d_model)
    )
    pe[:, 0::2] = torch.sin(position * div_term)  # even dimensions
    pe[:, 1::2] = torch.cos(position * div_term)  # odd dimensions
    return pe

pe = sinusoidal_positional_encoding(max_len=100, d_model=512)
print(pe.shape)  # (100, 512)
# pe[0] = encoding cho position 0
# pe[1] = encoding cho position 1, ...
```

| Kiểu PE | Dùng bởi | Đặc điểm |
|---------|---------|----------|
| Sinusoidal (fixed) | Transformer gốc | Deterministic, extrapolate to longer seq |
| Learned | BERT, GPT-2 | Trainable parameters, tốt hơn trong practice |
| RoPE (Rotary) | LLaMA, GPT-NeoX | Encode relative position, scale tốt |
| ALiBi | BLOOM | Bias attention scores by distance |

### 6.6. Feed-Forward Network (FFN)

Mỗi layer có một **position-wise FFN** — cùng architecture cho mọi position, nhưng khác parameters giữa layers:

```text
FFN(x) = max(0, x × W₁ + b₁) × W₂ + b₂

Thường: d_model=512, d_ff=2048 (4× expansion)

x ──▶ [Linear 512→2048] ──▶ [ReLU/GELU] ──▶ [Linear 2048→512] ──▶ output
```

**FFN đóng vai trò "memory"** — lưu trữ factual knowledge trong weights. Đây là lý do LLM "biết" sự kiện: knowledge nằm trong FFN layers.

### 6.7. Layer Normalization + Residual Connections

Hai kỹ thuật giúp train deep networks ổn định:

```text
Residual Connection:
  output = LayerNorm(x + Sublayer(x))
  
  Tức là: output gốc + transformation → gradient flow tốt hơn
  
┌──────────┐
│   Input x │──────────────────────┐
└─────┬─────┘                      │ (skip connection)
      ▼                            │
┌──────────────┐                   │
│  Sublayer    │                   │
│ (Attention / │                   │
│  FFN)        │                   │
└─────┬────────┘                   │
      ▼                            ▼
┌──────────────────────────────────┐
│          Add (x + sublayer(x))   │
└─────────────┬────────────────────┘
              ▼
┌──────────────────────────────────┐
│         Layer Normalization       │
└──────────────────────────────────┘
```

**Layer Norm** normalize across features (không across batch như Batch Norm):
- Tốt cho variable-length sequences
- Không phụ thuộc batch size
- Ổn định hơn cho Transformer

### 6.8. Encoder vs Decoder Stack

```text
┌────────────────────────────────────────────────────────────┐
│                                                             │
│  ENCODER (×N)                    DECODER (×N)               │
│  ┌──────────────────┐           ┌────────────────────────┐ │
│  │ Self-Attention    │           │ Masked Self-Attention   │ │
│  │ (bidirectional)   │           │ (causal — chỉ nhìn trái)│ │
│  │ Add & Norm        │           │ Add & Norm              │ │
│  │                   │    K,V    │                         │ │
│  │ FFN               │──────────▶│ Cross-Attention         │ │
│  │ Add & Norm        │           │ (attend to encoder)    │ │
│  └──────────────────┘           │ Add & Norm              │ │
│                                  │                         │ │
│                                  │ FFN                     │ │
│                                  │ Add & Norm              │ │
│                                  └────────────────────────┘ │
│                                                             │
│  Encoder nhìn TOÀN BỘ input      Decoder nhìn LEFT-only    │
│  → tốt cho understanding          → tốt cho generation     │
└────────────────────────────────────────────────────────────┘
```

**Masked Self-Attention** trong Decoder: khi generate token tại position `t`, model chỉ nhìn tokens `0..t-1` (không nhìn tương lai → causal mask).

## 7. Attention Visualization

```python
# Visualize attention weights bằng BertViz
from transformers import AutoTokenizer, AutoModel
import torch

model_name = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name, output_attentions=True)

text = "The cat sat on the mat because it was tired"
inputs = tokenizer(text, return_tensors="pt")

with torch.no_grad():
    outputs = model(**inputs)

# outputs.attentions = tuple of (batch, num_heads, seq_len, seq_len) per layer
attentions = outputs.attentions   # 12 layers × 12 heads
print(f"Layers: {len(attentions)}")
print(f"Shape per layer: {attentions[0].shape}")
# torch.Size([1, 12, 12, 12]) → batch=1, heads=12, seq=12, seq=12

# Xem head 10, layer 11 — thường capture coreference
layer_idx, head_idx = 11, 10
attn = attentions[layer_idx][0, head_idx]  # (seq_len, seq_len)

tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
print(f"\nTokens: {tokens}")
print(f"\nAttention from 'it' (position 8):")
for i, (tok, score) in enumerate(zip(tokens, attn[8])):
    bar = "█" * int(score * 50)
    print(f"  {tok:12s} {score:.3f} {bar}")

# Expect: "it" attends strongly to "cat" → coreference resolution
```

```text
Expected output (simplified):
  [CLS]       0.02
  the         0.05
  cat         0.41  ████████████████████
  sat         0.08  ████
  on          0.03  █
  the         0.04  ██
  mat         0.06  ███
  because     0.12  ██████
  it          0.15  ███████
  was         0.02  █
  tired       0.01
  [SEP]       0.01

→ "it" attends most to "cat" = model learned coreference!
```

## 8. Hugging Face Transformers — Công cụ thực chiến

### 8.1. Pipeline API — Nhanh nhất để bắt đầu

```python
from transformers import pipeline

# Sentiment Analysis
classifier = pipeline("sentiment-analysis")
print(classifier("I love learning about Transformers!"))
# [{'label': 'POSITIVE', 'score': 0.9998}]

# Named Entity Recognition
ner = pipeline("ner", grouped_entities=True)
print(ner("Hugging Face is based in New York City"))
# [{'entity_group': 'ORG', 'word': 'Hugging Face', 'score': 0.99},
#  {'entity_group': 'LOC', 'word': 'New York City', 'score': 0.99}]

# Text Generation
generator = pipeline("text-generation", model="gpt2")
print(generator("Transformers are", max_length=30, num_return_sequences=1))

# Question Answering
qa = pipeline("question-answering")
result = qa(
    question="What is the capital of France?",
    context="France is a country in Europe. Its capital is Paris."
)
print(result)
# {'answer': 'Paris', 'score': 0.99, 'start': 52, 'end': 57}
```

### 8.2. AutoModel + AutoTokenizer — Kiểm soát chi tiết

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

model_name = "distilbert-base-uncased-finetuned-sst-2-english"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Tokenize
text = "This course on Transformers is incredibly helpful!"
inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
print(inputs.keys())  # dict_keys(['input_ids', 'attention_mask'])
print(f"input_ids shape: {inputs['input_ids'].shape}")

# Inference
with torch.no_grad():
    outputs = model(**inputs)
    logits = outputs.logits
    probs = torch.softmax(logits, dim=-1)

labels = ["NEGATIVE", "POSITIVE"]
pred = labels[probs.argmax()]
conf = probs.max().item()
print(f"Prediction: {pred} ({conf:.2%})")
# Prediction: POSITIVE (99.97%)
```

### 8.3. Embeddings extraction

```python
from transformers import AutoTokenizer, AutoModel
import torch

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModel.from_pretrained("bert-base-uncased")

sentences = [
    "The bank approved my loan.",
    "I sat by the river bank.",
    "The financial institution helped me."
]

embeddings = []
for sent in sentences:
    inputs = tokenizer(sent, return_tensors="pt", padding=True, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    # Mean pooling: average over token embeddings (exclude [CLS], [SEP])
    mask = inputs["attention_mask"].unsqueeze(-1)
    emb = (outputs.last_hidden_state * mask).sum(dim=1) / mask.sum(dim=1)
    embeddings.append(emb.squeeze())

# Cosine similarity
from torch.nn.functional import cosine_similarity
print(f"bank(financial) ↔ bank(river):      {cosine_similarity(embeddings[0], embeddings[1], dim=0):.3f}")
print(f"bank(financial) ↔ financial inst.:   {cosine_similarity(embeddings[0], embeddings[2], dim=0):.3f}")
# bank(financial) ↔ bank(river):      0.82
# bank(financial) ↔ financial inst.:   0.92  ← higher! context matters
```

> **Key takeaway:** BERT embeddings là **contextual** — cùng từ "bank" nhưng vector khác nhau tùy context. Đây là sức mạnh so với Word2Vec/GloVe.

## 9. BERT vs GPT — Encoder-only vs Decoder-only

Đây là câu hỏi **kiến trúc quan trọng nhất** trong LLM landscape hiện tại.

```text
ENCODER-ONLY (BERT):                    DECODER-ONLY (GPT):
  
  [CLS] The cat sat [SEP]               The → cat → sat → on → ...
  
  Nhìn TOÀN BỘ sequence                 Chỉ nhìn LEFT context
  (bidirectional attention)              (causal/autoregressive)
  
  Training: Masked LM                   Training: Next-token prediction
  "The [MASK] sat on the mat"           P(next | previous tokens)
  → predict "cat"                       "The cat" → "sat"

ENCODER-DECODER (T5, BART):
  Encoder: bidirectional (input)
  Decoder: autoregressive (output)
  Tốt cho translation, summarization
```

| Tiêu chí | BERT (Encoder) | GPT (Decoder) | T5 (Enc-Dec) |
|----------|---------------|---------------|--------------|
| Attention | Bidirectional | Causal (left-only) | Bi (enc) + Causal (dec) |
| Pre-training | Masked LM + NSP | Next-token prediction | Span corruption |
| Best for | Classification, NER, QA | Text generation, chat | Translation, summarization |
| Context | Understands full context | Generates fluently | Both |
| Models | BERT, RoBERTa, DeBERTa | GPT-2/3/4, LLaMA, Mistral | T5, BART, Flan-T5 |
| Param size | 110M - 340M | 124M - 1.8T | 60M - 11B |

```text
Task Selection Guide:

Need to UNDERSTAND text?          → BERT-family (encoder)
  ├─ Sentiment analysis
  ├─ Named Entity Recognition
  ├─ Question Answering (extractive)
  └─ Text Classification

Need to GENERATE text?            → GPT-family (decoder)
  ├─ Chatbot / Dialog
  ├─ Code generation
  ├─ Creative writing
  └─ Instruction following

Need both UNDERSTAND + GENERATE?  → T5-family (encoder-decoder)
  ├─ Translation
  ├─ Summarization
  └─ Question Answering (abstractive)
```

> **Trend 2024-2025:** Decoder-only (GPT architecture) đang thống trị vì scale tốt hơn — GPT-4, Claude, LLaMA, Mistral đều decoder-only. BERT-family vẫn king cho embedding/classification tasks nhỏ.

## 10. Cheat Sheet tổng hợp

| Component | Công thức / Ý nghĩa |
|-----------|---------------------|
| Tokenization | Text → token IDs (BPE/WordPiece/Unigram) |
| Embedding | token_id → dense vector (learned lookup table) |
| Positional Encoding | PE = sin/cos functions encode position |
| Self-Attention | softmax(QK^T / √d_k) × V |
| Multi-Head | Concat(head_1..h) × W_O, mỗi head = Attention(QW_Q, KW_K, VW_V) |
| FFN | max(0, xW₁+b₁)W₂+b₂ — position-wise, stores knowledge |
| Residual + LayerNorm | output = LN(x + Sublayer(x)) — stabilize training |
| Encoder | Bidirectional self-attention → understanding |
| Decoder | Causal masked attention → generation |
| BERT | Encoder-only, MLM, bidirectional |
| GPT | Decoder-only, next-token, autoregressive |

## Tổng kết

Bài này cover toàn bộ **foundation** cho NLP hiện đại:

1. **Tokenization** biến text thành numbers — BPE (GPT), WordPiece (BERT) là hai chuẩn chính
2. **Static embeddings** (Word2Vec, GloVe) cho mỗi từ một vector cố định — không handle polysemy
3. **Contextual embeddings** (BERT, GPT) tạo vector **khác nhau** cho cùng từ tùy context
4. **Transformer** = Self-Attention + FFN + Residual + LayerNorm — parallel, scalable, powerful
5. **Self-Attention** (Q, K, V) là core mechanism — cho phép mỗi token attend tất cả tokens khác
6. **Multi-Head Attention** học nhiều loại relationships đồng thời
7. **Hugging Face** ecosystem là công cụ #1 để dùng pretrained models

> **Bài tiếp theo (Bài 5):** Chúng ta sẽ đi sâu vào **Large Language Models** — GPT family, LLaMA, Mistral. Cách chúng được pre-trained, instruction-tuned, và RLHF. Đây là nơi lý thuyết Transformer trở thành **sản phẩm thực tế**.

## Bài tập

### Bài tập 1: Tokenizer Comparison (30 phút)

Viết script so sánh 3 tokenizers trên cùng 5 câu (mix English + Vietnamese):

```python
# So sánh tiktoken (GPT-4), BERT tokenizer, GPT-2 tokenizer
# Với mỗi câu, in ra:
# - Số tokens
# - Danh sách tokens
# - Tỷ lệ tokens/words

sentences = [
    "Transformers revolutionized natural language processing.",
    "The quick brown fox jumps over the lazy dog.",
    "Xin chào, tôi đang học AI Agent Engineering.",
    "pneumonoultramicroscopicsilicovolcanoconiosis",
    "🚀 AI is amazing! #NLP @huggingface",
]
```

### Bài tập 2: Self-Attention from Scratch (45 phút)

Implement `SingleHeadAttention` class hoàn chỉnh:

```python
class SingleHeadAttention(nn.Module):
    def __init__(self, d_model, d_k):
        # TODO: W_Q, W_K, W_V matrices
        pass
    
    def forward(self, x, mask=None):
        # TODO: Q, K, V projections
        # TODO: Scaled dot-product attention
        # TODO: Apply mask (nếu có)
        # TODO: Return attention output + attention weights
        pass

# Test: verify output shape, attention weights sum to 1
# Bonus: implement causal mask cho decoder
```

### Bài tập 3: Semantic Search Mini-project (60 phút)

Dùng Hugging Face để build semantic search engine đơn giản:

```python
# 1. Load sentence-transformers model
# 2. Encode 20 documents thành embeddings
# 3. Implement cosine similarity search
# 4. Input query → return top-5 relevant documents

# Documents (dùng bất kỳ domain nào: tech, medical, legal...)
# Bonus: thêm TF-IDF baseline để so sánh chất lượng
```

### Bài tập 4: Transformer Block (45 phút)

Implement một **Transformer Encoder Block** hoàn chỉnh gồm:
- Multi-Head Attention (dùng code từ bài học hoặc tự viết)
- Feed-Forward Network
- Residual connections + Layer Normalization

```python
class TransformerEncoderBlock(nn.Module):
    def __init__(self, d_model, num_heads, d_ff, dropout=0.1):
        # TODO
        pass
    
    def forward(self, x, mask=None):
        # TODO: Self-attention → Add & Norm → FFN → Add & Norm
        pass

# Test: stack 6 blocks, verify gradient flow
```

