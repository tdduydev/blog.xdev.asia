---
id: 019c9619-ff05-7005-a005-ff0500000005
title: 'レッスン 5: チャンク戦略 — 固定、セマンティック、再帰'
slug: bai-5-chunking-strategies
description: 'チャンク化は RAG の品質に直接影響します。比較: 固定サイズ、再帰文字、セマンティック チャンク。オーバーラップ戦略。チャンクサイズの最適化。'
duration_minutes: 150
is_free: true
video_url: null
sort_order: 4
section_title: 'パート 2: ドキュメント処理パイプライン'
course:
  id: 019c9619-aa05-7005-b005-aa0500000005
  title: リアルバトルRAG：基礎から上級まで
  slug: rag-thuc-chien
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-5910" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-5910)"/>

  <!-- Decorations -->
  <g>
    <circle cx="954" cy="192" r="32" fill="#f472b6" opacity="0.07"/>
    <circle cx="808" cy="246" r="14" fill="#f472b6" opacity="0.09"/>
    <circle cx="662" cy="40" r="26" fill="#f472b6" opacity="0.11"/>
    <circle cx="1016" cy="94" r="8" fill="#f472b6" opacity="0.13"/>
    <circle cx="870" cy="148" r="20" fill="#f472b6" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#f472b6" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#f472b6" opacity="0.15"/>
    <line x1="600" y1="92" x2="1100" y2="172" stroke="#f472b6" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="122" x2="1050" y2="192" stroke="#f472b6" stroke-width="0.5" opacity="0.08"/>
    <polygon points="965.3826859021799,128.5 965.3826859021799,155.5 942,169 918.6173140978201,155.5 918.6173140978201,128.5 942,115" fill="none" stroke="#f472b6" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#f472b6"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#f472b6" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#f472b6">🧠 AI と ML — レッスン 4</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 5: チャンク戦略 — 固定、</tspan>
      <tspan x="60" dy="42">セマンティック、再帰的</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">リアルバトルRAG：基礎から上級まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 2: ドキュメント処理パイプライン</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Chunking Strategies: Fixed-size, Recursive, Semantic](/storage/uploads/2026/04/rag-bai-5-chunking.webp)

## はじめに

ドキュメントをロードした後 (レッスン 4)、次のステップは **チャンク化**です。これは、**検索の品質の 60%** を決定するステップです。つまり、間違ったチャンク サイズを選択する = 間違ったコンテキストを見つける = AI が間違った答えを与えることになります。

> **例:** 500 ページの本の中で 1 つの段落を探していると想像してください。本を **章** に分割すると (大きすぎます) → 見つけることはできますが、冗長な情報が多くなります。 **個々の文**に分割すると (小さすぎる) → 文脈が失われます。適切なチャンク化 = 完全な意味を保つために **ちょうど十分な段落**に分割します。

---

## 1. なぜチャンク化が必要なのでしょうか?

### 1.1 3 つの主な理由

|理由 |説明 |
|------|-----------|
| **コンテキスト ウィンドウ** | LLM のトークンは限られています (4K ～ 128K)。 100 ページの文書が入りきらない |
| **検索精度** |小さなチャンク = より正確な検索 (ノイズが少ない) |
| **コスト** |各トークンには費用がかかります。十分な量 = 経済的 |

### 1.2 チャンクサイズはどのように影響しますか?

```
Chunk quá NHỎ (50 từ):
  ✅ Tìm kiếm chính xác
  ❌ Mất context xung quanh
  ❌ 1 ý bị tách thành 3 chunks → AI không hiểu

Chunk quá LỚN (2000 từ):
  ✅ Giữ đủ context
  ❌ Chứa nhiều thông tin không liên quan (noise)
  ❌ Embedding quality giảm (quá nhiều ý trong 1 vector)

Chunk VỪA ĐỦ (300-500 từ):
  ✅ Giữ context đủ cho 1 ý chính
  ✅ Embedding chính xác
  ✅ Ít noise
```

---

## 2. チャンク戦略

### 2.1 固定サイズのチャンク化 — 最も単純な

```python
"""Fixed-size: chia theo số ký tự cố định"""
from langchain.text_splitter import CharacterTextSplitter

text = """Chính sách nghỉ phép năm 2026:

1. Nhân viên full-time được 15 ngày phép/năm.
2. Nhân viên part-time được 8 ngày phép/năm.
3. Nhân viên trên 5 năm được +3 ngày.

Quy trình xin phép:
- Gửi đơn trước 3 ngày làm việc
- Được quản lý phê duyệt
- Nghỉ khẩn cấp: thông báo trong ngày"""

splitter = CharacterTextSplitter(
    separator="\n",       # Cắt theo dòng mới
    chunk_size=200,       # Mỗi chunk tối đa 200 ký tự
    chunk_overlap=30,     # Overlap 30 ký tự
)

chunks = splitter.split_text(text)
for i, chunk in enumerate(chunks):
    print(f"\n--- Chunk {i+1} ({len(chunk)} chars) ---")
    print(chunk)
```

### 2.2 再帰的文字分割 — **最も人気のある**

```python
"""Recursive: thử chia theo \n\n → \n → ". " → " " → """"""
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    separators=["\n\n", "\n", ". ", " ", ""],  # Thứ tự ưu tiên
)

chunks = splitter.split_text(text)
# Ưu tiên cắt theo paragraph → sentence → word
```

**なぜ「再帰的」なのか?**
```
1. Thử cắt theo "\n\n" (paragraph) → nếu chunk < 500 chars → OK
2. Nếu paragraph > 500 chars → thử cắt theo "\n" (dòng)
3. Nếu dòng > 500 chars → thử cắt theo ". " (câu)
4. Nếu câu > 500 chars → cắt theo " " (từ)
5. Last resort: cắt giữa từ (hiếm khi xảy ra)
```

### 2.3 セマンティックチャンキング — 最も賢い方法

```python
"""Semantic: cắt dựa trên ý nghĩa, không phải kích thước"""
from langchain_experimental.text_splitter import SemanticChunker
from langchain_openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

# Semantic chunker: chia khi "ý nghĩa thay đổi"
splitter = SemanticChunker(
    embeddings,
    breakpoint_threshold_type="percentile",  # Cắt khi similarity drop
    breakpoint_threshold_amount=80,          # Percentile 80 → new chunk
)

chunks = splitter.split_text(long_document)

# Chunks sẽ có size KHÁC NHAU — nhưng mỗi chunk chứa
# 1 ý trọn vẹn (tự detect khi nào chuyển chủ đề)
```

### 2.4 3 つの戦略を比較する

|戦略 |利点 |デメリット |いつ使用するか |
|----------|-----------|-----------|---------------|
| **固定サイズ** |シンプル、速い |真ん中をカット |プロトタイプ |
| **再帰的** |バランスをとり、境界を尊重する |チャンクサイズが等しい | **ほとんどのプロジェクト** |
| **セマンティック** |チャンクの意味 |高価な API (埋め込み)、遅い |高品質ラグ |

> **推奨事項:** **RecursiveCharacterTextSplitter** から始めます。高品質が必要な場合は、**SemanticChunker** をお試しください。

---

## 3. チャンクのオーバーラップ — なぜ必要なのでしょうか?

### 3.1 問題: 文の途中でカットする

```
Chunk 1: "...nhân viên trên 5 năm được"     ← Cắt giữa ý!
Chunk 2: "+3 ngày phép mỗi năm."             ← Mất context!
```

連続する 2 つのチャンク間のオーバーラップ = **繰り返し部分**:

```
Chunk 1: "...nhân viên trên 5 năm được +3 ngày phép mỗi năm."
Chunk 2: "được +3 ngày phép mỗi năm. Quy trình xin phép:..."
          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ overlap
```

### 3.2 オーバーラップサイズの選択

```
Chunk size: 500 chars
Overlap recommendations:
- 10% (50 chars): minimal, nhanh, ít trùng
- 20% (100 chars): balanced ← RECOMMENDED
- 30% (150 chars): safe, tốt cho văn bản phức tạp

Overlap > 30%: quá nhiều trùng lặp, lãng phí storage
```

---

## 4. チャンクサイズの最適化

### 4.1 ベンチマークのチャンク サイズ

```python
"""Benchmark: test nhiều chunk sizes để tìm tối ưu"""
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma

# Test data: 20 câu hỏi + đáp án đúng (golden test set)
test_qa = [
    {"question": "Nghỉ phép bao nhiêu ngày?", "expected": "15 ngày"},
    {"question": "Ai phê duyệt nghỉ phép?", "expected": "quản lý"},
    # ... 18 câu nữa
]

chunk_sizes = [200, 300, 500, 800, 1000, 1500]
results = {}

for size in chunk_sizes:
    # Chunk
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=size, chunk_overlap=int(size * 0.2)
    )
    chunks = splitter.split_documents(documents)
    
    # Index
    vectorstore = Chroma.from_documents(chunks, OpenAIEmbeddings())
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
    
    # Test retrieval accuracy
    correct = 0
    for qa in test_qa:
        results_docs = retriever.invoke(qa["question"])
        # Kiểm tra đáp án có trong retrieved docs không
        context = " ".join([d.page_content for d in results_docs])
        if qa["expected"].lower() in context.lower():
            correct += 1
    
    accuracy = correct / len(test_qa) * 100
    results[size] = {"accuracy": accuracy, "num_chunks": len(chunks)}
    print(f"Chunk size {size}: {accuracy:.0f}% accuracy, {len(chunks)} chunks")

# Kết quả thường: 300-500 tốt nhất cho hầu hết trường hợp
```

### 4.2 文書タイプ別のガイドライン

|ドキュメントの種類 |チャンクサイズ |オーバーラップ |理由 |
|----------|-----------|----------|----------|
| **よくある質問 / Q&A** | 200-300 | 20 |各 Q&A = 1 チャンク |
| **技術文書** | 500-800 | 100 |幅広いコンテキストが必要 |
| **法律/契約** | 300-500 | 50 |各節 = 1 チャンク |
| **ブログ/記事** | 500-1000 | 100 |段落ベース |
| **コードドキュメント** | 300-500 | 50 |関数/クラスベース |
| **チャットログ** | 200-400 | 30 |メッセージベース |

> **💡 演習 4:** 実際のドキュメントで 3 つのチャンク サイズ (200、500、1000) をベンチマークします。 10 個のテスト問題を作成します。どのチャンク サイズが最高の取得精度を実現しますか?

---

## 5. 高度な: ドキュメントベースのチャンク化

### 5.1 マークダウンヘッダーの分割

```python
"""Chia theo markdown headers — giữ nguyên cấu trúc"""
from langchain.text_splitter import MarkdownHeaderTextSplitter

md_text = """
# Chính sách nhân sự

## 1. Nghỉ phép
### 1.1 Nghỉ phép năm
15 ngày cho full-time, 8 ngày cho part-time.

### 1.2 Nghỉ ốm
Tối đa 30 ngày/năm có lương.

## 2. Lương thưởng
### 2.1 Lương cơ bản
Review mỗi 6 tháng.
"""

headers_to_split_on = [
    ("#", "H1"),
    ("##", "H2"),
    ("###", "H3"),
]

splitter = MarkdownHeaderTextSplitter(headers_to_split_on)
chunks = splitter.split_text(md_text)

for chunk in chunks:
    print(f"Headers: {chunk.metadata}")
    print(f"Content: {chunk.page_content[:80]}...")
    print()

# Output: chunk "1.1 Nghỉ phép năm" sẽ có metadata
# {"H1": "Chính sách nhân sự", "H2": "1. Nghỉ phép", "H3": "1.1 Nghỉ phép năm"}
```

### 5.2 親ドキュメントの取得者

```
Ý tưởng: Lưu chunks NHỎ để search chính xác,
         nhưng trả về chunk LỚN (parent) cho LLM.

Chunks nhỏ (search):  "15 ngày phép" (50 từ)
↓ match
Parent chunk (context): "Chính sách nghỉ phép: 15 ngày cho
                         full-time, 8 ngày cho part-time.
                         Nghỉ trên 5 năm được +3 ngày..." (300 từ)

→ Search chính xác + Context đầy đủ = Best of both worlds!
```

---

## 概要

|コンセプト |覚えておいてください |
|----------|----------|
| **チャンク** | RAG | 用にドキュメントを小さな段落に分割します。
| **再帰的** |ほとんどの場合に最適な戦略 |
| **セマンティック** |最もスマートで、心に刺さる |
| **オーバーラップ** | chunk_size 10 ～ 20%、コンテキストの損失を回避 |
| **チャンク サイズ** |ほとんどの使用例では 300 ～ 500 文字 |
| **ベンチマーク** |常に実際のデータでチャンク サイズをテストする |

## 一般的な演習

1. ✅ 小さな演習を完了する (4)
2. **チャンクパイプライン:** 書き込み関数 `smart_chunk(doc, doc_type)` ドキュメントの種類に基づいて戦略とサイズを選択します。
3. **視覚化:** 長いドキュメントをチャンク化し、視覚化します: チャンクの数を指定し、重複部分を強調表示し、チャンクごとのトークンをカウントします。
4. **エンドツーエンド:** PDF の読み込み → チャンク (3 つの戦略) → ChromaDB へのインデックス作成 → 10 個の質問のクエリ → 精度の比較。

> **次の記事:** メタデータ、フィルタリング、ハイブリッド検索 — チャンクにメタデータを追加し、ベクトル検索とキーワード検索を組み合わせます。
