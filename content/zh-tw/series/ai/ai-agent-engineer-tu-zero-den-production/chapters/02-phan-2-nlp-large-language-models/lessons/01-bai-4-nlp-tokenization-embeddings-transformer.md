---
id: 019e0a01-bb04-7001-c001-ee0400000001
title: 第 4 課：NLP 基礎 — 標記、嵌入與轉換器
slug: bai-4-nlp-tokenization-embeddings-transformer
description: >-
  NLP 管道：標記化（BPE、WordPiece、SentencePiece）。詞嵌入（Word2Vec、GloVe）。 Transformer
  架構：自註意力、多頭注意力、位置編碼。擁抱臉部變形金剛庫。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 3
section_title: 第 2 部分：NLP 和大型語言模型 (LLM)
course:
  id: 019e0a01-aa01-7001-b001-ff0500000001
  title: AI代理工程師：從零到生產
  slug: ai-agent-engineer-tu-zero-den-production
locale: zh-tw
---

> **電腦無法理解語言 - 它們只能理解數字。 ** 從聊天機器人到 GPT-4 的每一步都圍繞著一個問題：*如何將文字轉換為數字，同時仍保留意義？ * 本文將帶您完成整個旅程：從標記化、單字嵌入到 Transformer 架構 - 每個現代 LLM 的「心臟」。

## 1. NLP 的演進－四個時代

NLP經歷了四個主要階段。了解歷史可以幫助您了解 Transformer 獲勝的**原因**，而不僅僅是它**如何**工作。

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

|時代|代表|優勢 |限制 |
|------------|----------|---------|---------|
|基於規則|正規表示式，伊莉莎 |確定性、易於調試|無水垢，易碎|
|統計 | TF-IDF + 樸素貝葉斯，HMM |從資料、機率學習 |手動特徵工程 |
|神經| Word2Vec、LSTM、Seq2Seq |自學特徵、稠密向量|順序→緩慢，遠端困難|
|變壓器| BERT、GPT、T5 |並行、深度上下文、可擴展 |巨大的計算成本 |

> **關鍵見解：** Transformer 解決了 RNN 的兩個最大問題：(1) **順序瓶頸** - 無法並行化，(2) **梯度消失** - 難以記住長程依賴關係。

## 2. 文字預處理－資料清洗

在標記化之前，需要對文字進行**標準化**。垃圾輸入=垃圾輸出。

### 2.1。基本管道

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

### 2.2。停用詞刪除

**停用字**是出現很多但意義不大的字：「the」、「is」、「at」、「and」…

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

> **實用注意事項：**對於現代法學碩士（BERT、GPT），**不要刪除停用詞** - 模型需要它們來理解上下文。停用詞刪除僅對 TF-IDF、詞袋有用。

## 3. 代幣化深入研究

**標記化** = 將文字分割為小單元（標記）。這是**最重要的**步驟 - 決定詞彙量大小、OOV 處理和模型品質。

### 3.1。標記化的四個級別

```text
Input: "unhappiness"

Character-level:  [u] [n] [h] [a] [p] [p] [i] [n] [e] [s] [s]    → Vocab nhỏ, sequence dài
Word-level:       [unhappiness]                                      → OOV problem, vocab lớn
Subword-level:    [un] [happi] [ness]                                → Balanced ✓
Sentence-level:   [unhappiness is real]                              → Dùng cho translation
```

### 3.2。子詞標記化－詳細比較

這是**每個現代法學碩士都使用的技術**。想法：常用詞不變，生僻詞分。

|演算法|使用者 |方法|特點|
|------------|---------|----------|---------|
| **BPE**（位元組對編碼）| GPT-2、GPT-3、GPT-4、LLaMA |由下而上：合併頻繁對 |貪婪、簡單、有效 |
| **WordPiece** | BERT、DistilBERT |由下而上：最大化合併可能性 |使用 `##` 子詞的前綴 |
| **一元字** | T5、阿爾伯特、XLNet |由上而下：刪除最不有用的標記 |機率，選擇最佳分割 |
| **句子** | T5、mBART、駱駝 |包裝：原始文本上的 BPE/Unigram |與語言無關，無需預標記 |

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

### 3.3。使用 tiktoken（GPT 分詞器）進行練習

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

### 3.4。擁抱臉部標記器

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

> **關鍵見解：** BERT 用途 `[CLS]`, `[SEP]` 特殊代幣和 `##` 子詞前綴。使用GPT-2 `Ġ` （空格）前綴。了解每個模型在微調時至關重要的約定。

## 4. 字詞嵌入－將字轉換為向量

### 4.1。為什麼我們需要嵌入？

**One-hot 編碼** 將每個單字轉換為稀疏向量。對於 50K 單字詞彙，每個單字都是 50K 維向量，其中恰好有 1 個值 = 1。 問題：

- **稀疏**：浪費內存
- **沒有相似之處**： `cosine("king", "queen") = 0` （正交）
- **無尺度**：詞彙量大→維度大

**詞嵌入**可以處理這一切：密集向量、相同的固定維度（通常為 100-300d）以及編碼**語義相似性**。

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

### 4.2。 Word2Vec — 兩種架構

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

### 4.3。使用 Gensim 練習 Word2Vec 和 GloVe

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

### 4.4。 GloVe 與 Word2Vec

|標準| Word2Vec |手套 |
|----------|----------|--------|
|方法|預測（神經網路）|基於計數（共現矩陣）|
|培訓|本地情境視窗 |全球統計|
|列車速度|慢一點 |更快（矩陣分解）|
|結果 |適合類比|有利於相似性|
|預訓練 |Google新聞 300d |維基百科+Gigaword |

> **靜態嵌入的一般限制：** 每個單字只有 **一個向量**，無論上下文如何。 「bank」和「bank」有相同的向量 → **無多義性**。這就是上下文嵌入的動機。

## 5. 上下文嵌入－ELMo 到 BERT

### 5.1。演化：靜態→情境

```text
Static Embeddings (Word2Vec, GloVe):
  "I went to the bank to deposit money"    bank = vector_A
  "I sat by the river bank"                bank = vector_A  ← SAME! sai

Contextual Embeddings (ELMo, BERT):
  "I went to the bank to deposit money"    bank = vector_X  (financial)
  "I sat by the river bank"                bank = vector_Y  (river)  ← DIFFERENT! đúng
```

|型號|年份|如何創建上下文 |建築|
|--------|-----|--------------------|------------|
| **ELMo** | 2018 |雙向 LSTM | 2 層 biLSTM，字元 CNN |
| **伯特** | 2018 |遮罩語言模型|變壓器編碼器 |
| **GPT** | 2018 |自回歸 LM |變壓器解碼器 |

### 5.2。 ELMo — 語言模型的嵌入

ELMo 運行 2 個 LSTM（前向 + 後向），然後**將所有層**組合到最終嵌入中。每層捕獲不同的資訊：

- 第 1 層：語法（POS 標記、NER）
- 第 2 層：語意（字義、情感）

```text
          Forward LSTM ────────▶
Input: "The cat sat on the mat"
          ◀──────── Backward LSTM

Final embedding = weighted sum of all layers
```

> **為什麼 BERT 擊敗 ELMo？ ** ELMo 仍然使用 LSTM → 順序的，而不是並行的。 BERT 使用 Transformer → 並行訓練，透過自我注意更深層的脈絡。

## 6. Transformer 架構 — 深入探討

**「Attention Is All You Need」**（Vaswani 等人，2017）—改變 NLP 和 AI 的論文。沒有 LSTM，沒有 CNN——只有 **Attention**。

### 6.1。架構概覽

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

### 6.2。自註意力機制－一步一步

自註意允許每個令牌**「查看」**序列中的所有其他令牌，以決定**參加**的位置。

**三個矩陣：查詢（Q）、鍵（K）、值（V）**

直覺：想像一下你正在圖書館找一本書。
- **查詢** = 你的問題（「AI 書」）
- **鑰匙** = 每個架子上的標籤（「AI」、「歷史」、「烹飪」）
- **價值** = 該書架上書籍的內容

```text
Attention(Q, K, V) = softmax(Q × K^T / √d_k) × V

Trong đó:
  Q × K^T    → attention scores (ai liên quan ai?)  
  / √d_k     → scaling (tránh softmax saturation)
  softmax()  → normalize thành probabilities
  × V        → weighted sum of values
```

### 6.3。 Self-Attention－手動範例

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

### 6.4。多頭注意力－為什麼我們需要多頭？

注意力頭只學習**一種類型的關係**。多個頭同時學習**多種類型**：

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

### 6.5。位置編碼－位置很重要

Transformer 進程**並行** → 不知道 token 的順序。需要更多**位置資訊**。

**正弦編碼**（原文）：

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

| PE風格 |使用者 |特點|
|--------|---------|----------|
|正弦（固定）|原始變形金剛 |確定性，外推到更長的 seq |
|學到了| BERT、GPT-2 |可訓練參數，實踐中更好 |
|繩索（旋轉式）| LLaMA，GPT-NeoX |編碼相對位置，縮放良好 |
|阿里比 |綻放|依距離偏差注意力分數 |

### 6.6。前饋網路 (FFN)

每層都有一個 **position-wise FFN** — 所有位置的架構相同，但層之間的參數不同：

```text
FFN(x) = max(0, x × W₁ + b₁) × W₂ + b₂

Thường: d_model=512, d_ff=2048 (4× expansion)

x ──▶ [Linear 512→2048] ──▶ [ReLU/GELU] ──▶ [Linear 2048→512] ──▶ output
```

**FFN 扮演「記憶」的角色**——將事實知識儲存在權重中。這就是 LLM「知道」該事件的原因：知識位於 FFN 層中。

### 6.7。層歸一化+殘差連接

有兩種技術有助於穩定地訓練深度網路：

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

**Layer Norm** 跨特徵標準化（不像 Batch Norm 那樣跨批次）：
- 適用於可變長度序列
- 不依賴批次大小
- Transformer 更穩定

### 6.8。編碼器與解碼器堆疊

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

解碼器中的 **Masked Self-Attention**：在位置產生代幣時 `t`，該模型僅查看令牌 `0..t-1` （看不到未來→因果面具）。

## 7.注意力視覺化

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

## 8. 抱臉變形金剛－實戰利品

### 8.1。 Pipeline API — 最快上手

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

### 8.2。 AutoModel + AutoTokenizer — 精細控制

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

### 8.3。嵌入提取

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

> **關鍵要點：** BERT 嵌入是 **上下文相關的** — 相同的單字“bank”，但根據上下文不同的向量。與 Word2Vec/GloVe 相比，這很強大。

## 9. BERT 與 GPT — 僅編碼器與僅解碼器

這是當前法學碩士領域**最重要的架構問題**。

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

|標準| BERT（編碼器）| GPT（解碼器）| T5（Enc-Dec）|
|----------|----------------|----------------|----------------|
|注意|雙向|因果（僅左）|雙 (enc) + 因果 (dec) |
|預訓練|蒙版LM + NSP |下一個代幣預測 |跨越腐敗|
|最適合 |分類、NER、QA |文字產生、聊天 |翻譯、摘要|
|背景 |理解完整的上下文 |生成流暢 |兩者 |
|型號|伯特、羅伯塔、德伯特 | GPT-2/3/4、LLaMA、米斯特拉爾 | T5、BART、Flan-T5 |
|參數大小| 110M - 340M | 124M - 1.8T | 60M - 11B |

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

> **2024-2025 年趨勢：** 僅解碼器（GPT 架構）由於更好的擴展性而佔據主導地位 - GPT-4、Claude、LLaMA、Mistral 都是僅解碼器。 BERT 系列仍然是小型嵌入/分類任務的王者。

## 10. 綜合備忘單

|組件|公式/意義|
|------------|------------------------|
|代幣化 |文本 → 令牌 ID (BPE/WordPiece/Unigram) |
|嵌入 | token_id → 密集向量（學習的查找表）|
|位置編碼| PE = sin/cos 函數編碼位置 |
| 自我關注 | softmax(QK^T / √d_k) × V |
|多頭| Concat(head_1..h) × W_O，每個頭 = Attention(QW_Q, KW_K, VW_V) |
| FFN | max(0, xW₁+b₁)W2+b2 — 依地點儲存知識 |
|殘差 + LayerNorm |輸出 = LN(x + Sublayer(x)) — 穩定性訓練 |
|編碼器 |雙向自註意力 → 理解 |
|解碼器|因果掩蓋注意力 → 生成 |
|伯特 |僅限編碼器、MLM、雙向 |
| GPT |僅解碼器、下一個令牌、自回歸 |

## 總結

本文涵蓋了現代 NLP 的整個**基礎**：

1. **Tokenization** 將文字轉換為數字－BPE (GPT)、WordPiece (BERT) 是兩個主要標準
2. **靜態嵌入**（Word2Vec、GloVe）為每個單字提供一個固定向量 - 無多義處理
3. **上下文嵌入**（BERT、GPT）根據上下文為同一個單字創建**不同的**向量
4. **Transformer** = Self-Attention + FFN + Residual + LayerNorm — 並行、可擴展、強大
5. **自我注意力**（Q、K、V）是核心機制－允許每個代幣關注所有其他代幣
6. **多頭注意力**同時學習多種類型的關係
7. **Hugging Face** 生態系統是使用預訓練模型的第一大工具

> **下一課（第 5 課）：** 我們將深入研究 **大型語言模型** - GPT 系列、LLaMA、Mistral。它們是如何預先訓練、指令調整和 RLHF 的。這就是 Transformer 理論成為**實際產品**的地方。

## 練習

### 練習 1：分詞器比較（30 分鐘）

寫一個腳本來比較上述 3 個分詞器的 5 個句子（混合英語 + 越南語）：

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

### 練習 2：從頭開始自我專注（45 分鐘）

實施 `SingleHeadAttention` 完整課程：

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

### 練習 3：語意搜尋迷你項目（60 分鐘）

使用 Hugging Face 建立一個簡單的語意搜尋引擎：

```python
# 1. Load sentence-transformers model
# 2. Encode 20 documents thành embeddings
# 3. Implement cosine similarity search
# 4. Input query → return top-5 relevant documents

# Documents (dùng bất kỳ domain nào: tech, medical, legal...)
# Bonus: thêm TF-IDF baseline để so sánh chất lượng
```

### 練習 4：變壓器塊（45 分鐘）

實作一個完整的 **Transformer 編碼器區塊**，包括：
- 多頭注意力（使用課程中的程式碼或編寫自己的程式碼）
- 前饋網絡
- 剩餘連接+層歸一化

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

