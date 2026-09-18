---
id: 019e0a01-bb04-7001-c001-ee0400000001
title: 'レッスン 4: NLP の基礎 — トークン化、埋め込み、トランスフォーマー'
slug: bai-4-nlp-tokenization-embeddings-transformer
description: >-
  NLP パイプライン: トークン化 (BPE、WordPiece、SentencePiece)。 Word の埋め込み
  (Word2Vec、GloVe)。トランスフォーマー アーキテクチャ: セルフ アテンション、マルチヘッド
  アテンション、位置エンコーディング。ハグフェイストランスフォーマーライブラリ。
duration_minutes: 180
is_free: true
video_url: null
sort_order: 3
section_title: 'パート 2: NLP と大規模言語モデル (LLM)'
course:
  id: 019e0a01-aa01-7001-b001-ff0500000001
  title: 'AI エージェント エンジニア: ゼロから本番環境まで'
  slug: ai-agent-engineer-tu-zero-den-production
locale: ja
---

> **コンピューターは言語を理解せず、数値のみを理解します。** チャットボットから GPT-4 に至るすべてのステップは、1 つの質問を中心に展開します: *意味を保持したままテキストを数値に変換するにはどうすればよいですか?* この記事では、トークン化、単語の埋め込みから、現代​​のすべての LLM の「心臓部」である Transformer アーキテクチャに至るまで、その過程全体を説明します。

## 1. NLP の進化 — 4 つの時代

NLP は 4 つの主要な段階を経ました。歴史を理解すると、トランスフォーマーが**どのように**機能したかだけでなく、**なぜ**勝ったのかを知ることができます。

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

|時代 |代表者 |利点 |制限事項 |
|----------|----------|----------|----------|
|ルールベース |正規表現、エリザ |決定的でデバッグが簡単 |スケールなし、壊れやすい |
|統計 | TF-IDF + ナイーブ ベイズ、HMM |データから学ぶ、確率 |手動による特徴量エンジニアリング |
|ニューラル | Word2Vec、LSTM、Seq2Seq |自習機能、密なベクトル |シーケンシャル→遅い、長距離は難しい |
|変圧器 |バート、GPT、T5 |並列、深いコンテキスト、スケーラブル |膨大なコンピューティングコスト |

> **重要な洞察:** Transformer は、RNN の 2 つの最大の問題を解決します: (1) **逐次ボトルネック** - 並列化できない、(2) **消失勾配** - 長距離の依存関係を覚えておくのが難しい。

## 2. テキストの前処理 — データ クリーニング

トークン化する前に、テキストを **正規化**する必要があります。ゴミが入る＝ゴミが出る。

＃＃＃２．１．基本的なパイプライン

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

＃＃＃２．２．ストップワードの削除

**ストップワード** とは、頻繁に出現するもののほとんど意味を持たない単語です。「the」、「is」、「at」、「and」などです。

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

> **実用的な注意事項:** 最新の LLM (BERT、GPT) では、**ストップワードを削除しないでください** — モデルはコンテキストを理解するためにストップワードを必要とします。ストップワードの削除は、TF-IDF、Bag-of-Words にのみ役立ちます。

## 3. トークン化の詳細

**トークン化** = テキストを小さな単位 (トークン) に分割します。これは**最も重要**なステップであり、語彙のサイズ、OOVの処理、モデルの品質を決定します。

＃＃＃３．１． 4 つのレベルのトークン化

```text
Input: "unhappiness"

Character-level:  [u] [n] [h] [a] [p] [p] [i] [n] [e] [s] [s]    → Vocab nhỏ, sequence dài
Word-level:       [unhappiness]                                      → OOV problem, vocab lớn
Subword-level:    [un] [happi] [ness]                                → Balanced ✓
Sentence-level:   [unhappiness is real]                              → Dùng cho translation
```

＃＃＃３．２．サブワードのトークン化 — 詳細な比較

これは、**最新の LLM がすべて使用している**手法です。アイデア: 一般的な単語はそのままで、珍しい単語は分割されます。

|アルゴリズム |使用者 |アプローチ |特長 |
|----------|-----------|----------|----------|
| **BPE** (バイトペアエンコーディング) | GPT-2、GPT-3、GPT-4、LLaMA |ボトムアップ: 頻繁に使用されるペアをマージする |貪欲、シンプル、効果的 |
| **ワードピース** | BERT、蒸留BERT |ボトムアップ: マージの可能性を最大化する |使用する `##` サブワードの接頭語 |
| **ユニグラム** | T5、アルバート、XLNet |トップダウン: 最も役に立たないトークンを削除します。確率的に、最適なセグメンテーションを選択する |
| **センテンスピース** | T5、mBART、LLaMA |ラッパー: 生のテキストの BPE/Unigram |言語に依存せず、事前のトークン化は不要 |

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

＃＃＃３．３． tiktoken（GPTトークナイザー）を使って練習する

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

＃＃＃３．４．ハグフェイストークナイザー

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

> **重要な洞察:** BERT の使用法 `[CLS]`、 `[SEP]` 特別なトークンと `##` サブワードプレフィックス。 GPT-2使用 `Ġ` (スペース) プレフィックス。各モデルを微調整する際に重要であるという規則を理解します。

## 4. Word の埋め込み — 単語をベクトルに変換する

＃＃＃４．１．なぜ埋め込みが必要なのでしょうか?

**ワンホット エンコーディング** は、各単語をスパース ベクトルに変換します。 50K 単語の語彙では、各単語はちょうど 1 つの値 = 1 を持つ 50K 次元のベクトルになります。 問題:

- **スパース**: メモリを無駄に消費します
- **類似点はありません**: `cosine("king", "queen") = 0` (直交)
- **スケールなし**: 大きな語彙 → 大きな次元

**単語埋め込み** は、密なベクトル、同じ固定次元 (通常は 100 ～ 300d)、エンコード **意味論的な類似性**など、すべてを処理します。

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

＃＃＃４．２． Word2Vec — 2 つのアーキテクチャ

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

＃＃＃４．３． Gensim で Word2Vec と GloVe を練習する

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

＃＃＃４．４． GloVe vs Word2Vec

|基準 | Word2Vec |グローブ |
|----------|----------|----------|
|方法 |予測 (ニューラル ネットワーク) |カウントベース (共起行列) |
|トレーニング |ローカル コンテキスト ウィンドウ |世界的な統計 |
|列車の速度 |遅い |高速化 (行列分解) |
|結果 |例えとしては良い |類似性に優れています |
|事前トレーニング済み | Google ニュース 300d |ウィキペディア + ギガワード |

> **静的埋め込みの一般的な制限:** コンテキストに関係なく、各単語には **1 つのベクトル**のみが含まれます。 「bank」と「bank」は同じベクトルを持ちます → **多義性はありません**。これがコンテキスト埋め込みの動機です。

## 5. コンテキスト埋め込み — ELMo から BERT へ

＃＃＃５．１．進化: 静的 → コンテキスト

```text
Static Embeddings (Word2Vec, GloVe):
  "I went to the bank to deposit money"    bank = vector_A
  "I sat by the river bank"                bank = vector_A  ← SAME! sai

Contextual Embeddings (ELMo, BERT):
  "I went to the bank to deposit money"    bank = vector_X  (financial)
  "I sat by the river bank"                bank = vector_Y  (river)  ← DIFFERENT! đúng
```

|モデル |年 |コンテキストの作成方法 |建築 |
|------|-----|--------|----------|
| **エルモ** | 2018年 |双方向LSTM | 2層biLSTM、文字CNN |
| **バート** | 2018年 |マスクされた言語モデル |トランスエンコーダ |
| **GPT** | 2018年 |自己回帰LM |トランスデコーダ |

＃＃＃５．２． ELMo — 言語モデルからの埋め込み

ELMo は 2 つの LSTM (順方向 + 逆方向) を実行し、**すべてのレイヤーを結合**して最終的な埋め込みを行います。各レイヤーは異なる情報を取得します。

- レイヤ 1: 構文 (POS タグ付け、NER)
- レイヤー 2: セマンティクス (語義、感情)

```text
          Forward LSTM ────────▶
Input: "The cat sat on the mat"
          ◀──────── Backward LSTM

Final embedding = weighted sum of all layers
```

> **BERT が ELMo に勝るのはなぜですか?** ELMo は依然として LSTM → 並列ではなくシーケンシャルを使用しています。 BERT は、Transformer → 並列トレーニングを使用し、セルフアテンションを通じてより深いコンテキストを実現します。

## 6. トランスのアーキテクチャ — 詳細

**「Attention Is All You Need」** (Vaswani et al.、2017) — NLP と AI を変えた論文。 LSTM や CNN はありません。**注意** だけです。

＃＃＃６．１．アーキテクチャの概要

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

＃＃＃６．２．自己注意のメカニズム — ステップバイステップ

自己注意により、各トークンはシーケンス内の他のすべてのトークンを**「見て」**、どこに**参加する**かを決定できます。

**3 つの行列: クエリ (Q)、キー (K)、値 (V)**

直感: 図書館で本を探していると想像してください。
- **クエリ** = あなたの質問 (「AI 書籍」)
- **キー** = 各棚のラベル (「AI」、「歴史」、「料理」)
- **値** = その棚にある本の内容

```text
Attention(Q, K, V) = softmax(Q × K^T / √d_k) × V

Trong đó:
  Q × K^T    → attention scores (ai liên quan ai?)  
  / √d_k     → scaling (tránh softmax saturation)
  softmax()  → normalize thành probabilities
  × V        → weighted sum of values
```

＃＃＃６．３．セルフアテンション — マニュアルの例

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

＃＃＃６．４．マルチヘッドの注意 — なぜ複数のヘッドが必要なのでしょうか?

注意力のある人は**1種類の関係**だけを学びます。複数のヘッドが **多くのタイプ** を同時に学習します。

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

＃＃＃６．５。位置エンコーディング — 位置が重要

Transformer は **並列** を処理します → トークンの順序がわかりません。さらに**位置情報**が必要です。

**正弦波エンコーディング** (元の論文):

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

| PEスタイル |使用者 |特長 |
|----------|----------|----------|
|正弦波 (固定) |オリジナルトランスフォーマー |決定的、より長いシーケンスに外挿 |
|学んだ |バート、GPT-2 |トレーニング可能なパラメータ、実際にはより優れています |
| RoPE（ロータリー） | LLaMA、GPT-NeoX |相対位置をエンコードし、適切にスケール |
|アリビ |ブルーム |距離による注意スコアの偏り |

＃＃＃６．６．フィードフォワードネットワーク (FFN)

各レイヤーには **位置に関する FFN** があり、すべての位置で同じアーキテクチャですが、レイヤー間でパラメーターが異なります。

```text
FFN(x) = max(0, x × W₁ + b₁) × W₂ + b₂

Thường: d_model=512, d_ff=2048 (4× expansion)

x ──▶ [Linear 512→2048] ──▶ [ReLU/GELU] ──▶ [Linear 2048→512] ──▶ output
```

**FFN は「メモリ」の役割を果たします** — 事実の知識を重み付けして保存します。これが、LLM がイベントを「認識」する理由です。知識は FFN 層にあります。

＃＃＃６．７．層の正規化 + 残留接続

ディープ ネットワークを安定してトレーニングするのに役立つ 2 つのテクニック:

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

**レイヤー ノルム** は特徴全体で正規化します (バッチ ノルムのようにバッチ全体ではありません)。
- 可変長シーケンスに適しています
- バッチサイズに依存しない
- トランスの安定性が向上

＃＃＃６．８。エンコーダーとデコーダー スタック

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

デコーダの **マスクされたセルフアテンション**: 位置でトークンを生成するとき `t`、モデルはトークンのみを調べます `0..t-1` （未来が見えない→因果マスク）。

## 7. 注意の視覚化

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

## 8. ハグフェイストランスフォーマー — 本物の戦闘ツール

### 8.1。パイプライン API — 最も早く開始できる

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

### 8.2。 AutoModel + AutoTokenizer — きめ細かい制御

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

### 8.3。埋め込みの抽出

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

> **重要なポイント:** BERT 埋め込みは **コンテキスト** です。同じ単語「銀行」ですが、コンテキストに応じてベクトルが異なります。これは Word2Vec/GloVe と比較して強力です。

## 9. BERT と GPT — エンコーダのみとデコーダのみ

これは、現在の LLM 環境における**最も重要なアーキテクチャ上の質問**です。

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

|基準 | BERT (エンコーダー) | GPT (デコーダー) | T5 (Enc-Dec) |
|----------|--------------|--------------|--------------|
|注意 |双方向 |因果関係 (左のみ) | Bi (enc) + 因果関係 (dec) |
|事前トレーニング |マスクされたLM + NSP |次のトークンの予測 |スパンの破損 |
|こんな方に最適 |分類、NER、QA |テキスト生成、チャット |翻訳、要約 |
|コンテキスト |完全なコンテキストを理解する |スムーズに生成 |両方 |
|モデル |バート、ロベルタ、デベルタ | GPT-2/3/4、LLaMA、ミストラル | T5、BART、フラン-T5 |
|パラメータのサイズ | 110M - 340M | 124M - 1.8T | 60M - 11B |

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

> **トレンド 2024-2025:** スケーリングが優れているため、デコーダーのみ (GPT アーキテクチャ) が優勢です。GPT-4、Claude、LLaMA、Mistral はすべてデコーダーのみです。 BERT ファミリは依然として小規模な埋め込み/分類タスクの王者です。

## 10. 包括的なチートシート

|コンポーネント |式/意味 |
|----------|----------|
|トークン化 |テキスト → トークン ID (BPE/WordPiece/Unigram) |
|埋め込み | token_id → 密ベクトル (学習済みルックアップ テーブル) |
|位置エンコーディング | PE = sin/cos 関数は位置をエンコードします。
|自己注意 |ソフトマックス(QK^T / √d_k) × V |
|マルチヘッド | Concat(head_1..h) × W_O、各ヘッド = Attendance(QW_Q, KW_K, VW_V) |
| FFN | max(0, xW₁+b₁)W₂+b₂ — 位置的に、知識を格納します。
|残差 + LayerNorm |出力 = LN(x + サブレイヤ(x)) — 安定化トレーニング |
|エンコーダ |双方向の自己注意→理解 |
|デコーダ |因果のマスクされた注意→生成 |
|バート |エンコーダのみ、MLM、双方向 |
| GPT |デコーダのみ、ネクストトークン、自己回帰 |

## 概要

この記事では、最新の NLP の**基礎**全体を説明します。

1. **トークン化** はテキストを数値に変換します — BPE (GPT) と WordPiece (BERT) が 2 つの主要な標準です
2. **静的埋め込み** (Word2Vec、GloVe) は各単語に固定ベクトルを与えます - 多義性ハンドルはありません
3. **コンテキスト埋め込み** (BERT、GPT) は、コンテキストに応じて同じ単語に対して **異なる** ベクトルを作成します
4. **Transformer** = Self-Attendance + FFN + Residual + LayerNorm — 並列、スケーラブル、強力
5. **セルフ アテンション** (Q、K、V) が中心的なメカニズムであり、各トークンが他のすべてのトークンに参加できるようになります。
6. **多頭注意** は多くの種類の関係を同時に学習します
7. **Hugging Face** エコシステムは、事前トレーニング済みモデルを使用するための最も優れたツールです

> **次のレッスン (レッスン 5):** **大規模言語モデル** — GPT ファミリ、LLaMA、Mistral について詳しく説明します。どのように事前トレーニングされ、指導が調整され、RLHF が行われるか。ここで、トランスフォーマー理論が**実際の製品**になります。

## 演習

### 演習 1: トークナイザーの比較 (30 分)

上記の 3 つのトークナイザーを 5 つの文 (英語とベトナム語を混ぜたもの) で比較するスクリプトを作成します。

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

### 演習 2: ゼロからの自己注意 (45 分)

実装する `SingleHeadAttention` 完全なクラス:

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

### 演習 3: セマンティック検索ミニプロジェクト (60 分)

Hugging Face を使用して、単純なセマンティック検索エンジンを構築します。

```python
# 1. Load sentence-transformers model
# 2. Encode 20 documents thành embeddings
# 3. Implement cosine similarity search
# 4. Input query → return top-5 relevant documents

# Documents (dùng bất kỳ domain nào: tech, medical, legal...)
# Bonus: thêm TF-IDF baseline để so sánh chất lượng
```

### 演習 4: 変圧器ブロック (45 分)

以下を含む完全な **Transformer Encoder ブロック** を実装します。
- マルチヘッド アテンション (レッスンのコードを使用するか、独自のコードを作成します)
- フィードフォワードネットワーク
- 残留接続 + 層の正規化

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

