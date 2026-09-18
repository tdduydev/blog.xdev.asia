---
id: 019c9619-ff03-7003-a003-ff0300000003
title: 'レッスン 3: ベクトル データベース — Chroma、Qdrant、Pinecone、Weaviate'
slug: bai-3-vector-databases
description: >-
  最も一般的な 4 つの DB ベクトル (セットアップ、API、パフォーマンス、価格) を比較します。 HNSW
  インデックス、体外受精、PQ。ハイブリッド検索 (ベクトル + キーワード)。メタデータのフィルタリング。 ChromaDB と Qdrant の実践。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 2
section_title: 'パート 1: RAG プラットフォーム'
course:
  id: 019c9619-aa05-7005-b005-aa0500000005
  title: リアルバトルRAG：基礎から上級まで
  slug: rag-thuc-chien
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-9083" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-9083)"/>

  <!-- Decorations -->
  <g>
    <circle cx="799" cy="67" r="12" fill="#818cf8" opacity="0.12000000000000001"/>
    <circle cx="998" cy="166" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="697" cy="265" r="16" fill="#818cf8" opacity="0.060000000000000005"/>
    <circle cx="896" cy="104" r="33" fill="#818cf8" opacity="0.13"/>
    <circle cx="1095" cy="203" r="20" fill="#818cf8" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <line x1="600" y1="77" x2="1100" y2="157" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="107" x2="1050" y2="177" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="1004.712812921102,161 1004.712812921102,193 977,209 949.287187078898,193 949.287187078898,161 977,145" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🧠 AI と ML — レッスン 2</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 3: ベクトル データベース — Chroma、Qdrant、</tspan>
      <tspan x="60" dy="42">松ぼっくり、織り手</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">リアルバトルRAG：基礎から上級まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 1: RAG プラットフォーム</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![ベクトル データベースの比較: Chroma、Qdrant、Pinecone、Weaviate](/storage/uploads/2026/04/rag-bai-3-vector-db.webp)

## はじめに

前のレッスンでは、テキストをベクトルに変換しました。次の質問: **ベクトルを保存する場所**と**検索方法**

従来のデータベース (MySQL、PostgreSQL) は、**完全一致** (「SELECT WHERE id = 5」) 向けに設計されています。しかし、ベクトルの場合は、**最近傍**、つまり「クエリ ベクトルに最も近いベクトルはどれか?」を見つける必要があります。だからこそ **Vector Database** が必要なのです。

---

## 1. ベクターデータベースとは何ですか?

### 1.1 簡単な比較

| | SQL データベース |ベクトルデータベース |
|---|-------------|----------------|
| **何を保存するか** |行と列 |ベクトル (一連の数字) + メタデータ |
| **クエリ** | `WHERE name = "Minh"` | `NEAREST(query_vector, k=5)` |
| **検索** |完全一致 | **近似最近傍** (ANN) |
| **使用例** |従来の CRUD |セマンティック検索、RAG、レコメンデーション |

### 1.2 最も人気のある 4 つのベクトル データベース

| DB |タイプ |ホスティング |主な利点 |価格 (無料利用枠) |
|----|------|-----------|---------------|------|
| **ChromaDB** |埋め込み |ローカル |非常にシンプルでプロトタイピングに最適 |完全無料 |
| **クドラント** |クライアントサーバー |セルフホスト / クラウド |高性能、強力なフィルタリング |無料 (自己ホスト型) |
| **松ぼっくり** |マネージドクラウド |クラウドのみ |ゼロオペレーション、簡単なスケーリング |無料 (100K ベクター) |
| **ウィアビエイト** |クライアントサーバー |セルフホスト / クラウド | GraphQL API、マルチモーダル |無料 (自己ホスト型) |

---

## 2. ChromaDB — 5 分で始められます

ChromaDB は **初心者にとって最適な選択肢**です。Python で直接実行でき、サーバーのセットアップは必要ありません。

### 2.1 基本セットアップと CRUD

```bash
pip install chromadb
```

```python
"""ChromaDB: Vector DB đơn giản nhất"""
import chromadb

# === 1. Khởi tạo ===
# In-memory (tạm thời, mất khi tắt)
client = chromadb.Client()

# Persistent (lưu disk, giữ lại)
# client = chromadb.PersistentClient(path="./chroma_data")

# === 2. Tạo Collection (giống "table" trong SQL) ===
collection = client.create_collection(
    name="company_docs",
    metadata={"description": "Internal company documents"}
)

# === 3. Thêm documents ===
collection.add(
    documents=[
        "Chính sách nghỉ phép: 15 ngày/năm cho nhân viên full-time",
        "Quy trình xin phép: gửi đơn trước 3 ngày làm việc",
        "Lương thưởng: review mỗi 6 tháng, KPI-based",
        "Chế độ bảo hiểm: BHXH + bảo hiểm tư nhân Bảo Việt",
        "Giờ làm việc: 8:30-17:30, thứ 2-6, flexible ±1 giờ",
    ],
    ids=["doc1", "doc2", "doc3", "doc4", "doc5"],
    metadatas=[
        {"category": "leave", "department": "HR"},
        {"category": "leave", "department": "HR"},
        {"category": "compensation", "department": "HR"},
        {"category": "benefits", "department": "HR"},
        {"category": "policy", "department": "Admin"},
    ]
)
print(f"Added {collection.count()} documents")

# === 4. Tìm kiếm (semantic search) ===
results = collection.query(
    query_texts=["nghỉ phép bao nhiêu ngày?"],
    n_results=3  # Top 3 gần nhất
)

print("\n🔍 Query: 'nghỉ phép bao nhiêu ngày?'")
for doc, distance in zip(results["documents"][0], results["distances"][0]):
    relevance = 1 - distance  # Chuyển distance → relevance
    print(f"  [{relevance:.2%}] {doc[:60]}...")

# === 5. Filtering theo metadata ===
filtered = collection.query(
    query_texts=["chế độ cho nhân viên"],
    n_results=3,
    where={"category": "benefits"}  # Chỉ tìm trong "benefits"
)
print(f"\n🔍 Filtered (benefits only): {filtered['documents'][0]}")
```

### 2.2 ChromaDB をいつ使用するか?

| ✅ 次の場合に使用します | ❌ 次の場合は使用しないでください。
|----------|----------|
|プロトタイプ/POC |生産 100 万以上のベクター |
| < 100K documents | Multi-user concurrent |
| Jupyter/ローカルで使用 |モニタリング/メトリクスが必要 |
| 1 開発者 |チームには共有 DB が必要 |

---

## 3. Qdrant — Production-Ready Vector DB

### 3.1 Setup

```bash
# Chạy Qdrant server bằng Docker
docker run -p 6333:6333 qdrant/qdrant

# Hoặc dùng Qdrant Cloud (free tier)
pip install qdrant-client
```

### 3.2 Hands-on

```python
"""Qdrant: Production vector DB"""
from qdrant_client import QdrantClient
from qdrant_client.models import (
    PointStruct, VectorParams, Distance, Filter,
    FieldCondition, MatchValue
)
from openai import OpenAI

openai = OpenAI()
qdrant = QdrantClient(url="http://localhost:6333")

# === 1. Tạo collection ===
qdrant.create_collection(
    collection_name="company_docs",
    vectors_config=VectorParams(
        size=1536,              # text-embedding-3-small dimension
        distance=Distance.COSINE
    )
)

# === 2. Embed + Insert ===
documents = [
    {"text": "Chính sách nghỉ phép: 15 ngày/năm", "category": "leave"},
    {"text": "Lương review mỗi 6 tháng theo KPI", "category": "salary"},
    {"text": "Bảo hiểm Bảo Việt cho toàn bộ nhân viên", "category": "insurance"},
]

# Embed tất cả cùng lúc (batch)
texts = [d["text"] for d in documents]
response = openai.embeddings.create(
    model="text-embedding-3-small",
    input=texts
)
embeddings = [r.embedding for r in response.data]

# Insert vào Qdrant
points = [
    PointStruct(
        id=i,
        vector=emb,
        payload={"text": doc["text"], "category": doc["category"]}
    )
    for i, (doc, emb) in enumerate(zip(documents, embeddings))
]
qdrant.upsert(collection_name="company_docs", points=points)

# === 3. Search ===
query_emb = openai.embeddings.create(
    model="text-embedding-3-small",
    input=["bảo hiểm sức khỏe"]
).data[0].embedding

results = qdrant.search(
    collection_name="company_docs",
    query_vector=query_emb,
    limit=3
)

print("🔍 Search: 'bảo hiểm sức khỏe'")
for r in results:
    print(f"  [{r.score:.4f}] {r.payload['text']}")

# === 4. Filtered Search ===
filtered = qdrant.search(
    collection_name="company_docs",
    query_vector=query_emb,
    query_filter=Filter(
        must=[FieldCondition(key="category", match=MatchValue(value="insurance"))]
    ),
    limit=3
)
```

### 3.3 Qdrant vs ChromaDB

| Feature | ChromaDB | Qdrant |
|---------|----------|--------|
| **セットアップ** | Python の 1 行 |ドッカー / クラウド |
| **パフォーマンス** |良い (< 100K) |優れた (百万) |
| **フィルタリング** |基本 | **非常に強力** (ネスト、範囲) |
| **Multi-tenancy** | ❌ | ✅ |
| **REST API** | ❌ | ✅ |
| **Monitoring** | ❌ | ✅ Dashboard |
| **Production** | POC | ✅ Production-ready |

> **💡 演習 3:** ChromaDB を使用して、(FAQ、ドキュメント、または記事から) 20 個のドキュメントを追加します。 10 個の異なる質問をします。カウント: 上位 1 位の結果は何回正解ですか? →これが検索精度です。

---

## 4. 4 つの Vector DB の詳細な比較

### 4.1 総合比較表

|特長 |クロマDB |クドラント |松ぼっくり |回避する |
|----------|----------|----------|----------|----------|
| **言語** |パイソン |さび |管理 |行く |
| **ホスティング** |埋め込み |セルフ/クラウド |クラウドのみ |セルフ/クラウド |
| **インデックスの種類** |ニューサウスウェールズ州 |ニューサウスウェールズ州 |独自の |ニューサウスウェールズ州 |
| **最大ベクトル** | ～1M |数百万 | 10億以上 |数百万 |
| **フィルタリング** |基本 |上級 |上級 |グラフQL |
| **ハイブリッド検索** | ❌ | ✅ | ✅ | ✅ |
| **マルチモーダル** | ❌ | ❌ | ❌ | ✅ |
| **無料利用枠** |無制限 |自己ホスト型 | 100K ベック |自己ホスト型 |
| **良いこと** |プロトタイプ |制作 |エンタープライズ |マルチモーダル |

### 4.2 推奨事項

```
Bạn đang ở giai đoạn nào?

├── Prototype / Học tập
│   └── → ChromaDB ✅ (đơn giản, miễn phí)
│
├── Production (startup / team nhỏ)
│   ├── Self-hosted OK → Qdrant ✅ (mạnh, miễn phí)
│   └── Không muốn ops → Pinecone (managed, trả phí)
│
└── Enterprise (scale lớn)
    ├── Cần multimodal → Weaviate
    └── Cần đơn giản → Pinecone
```

---

## 5. ハイブリッド検索 — ベクトル + キーワードの組み合わせ

### 5.1 なぜハイブリッドが必要なのでしょうか?

セマンティック検索 (ベクトル) は、類似した意味を見つけることには **得意**ですが、次の点では **苦手**です。
- 個人名: 「Nguyen Van Binh」 (完全一致が必要です)
- コード: "ERR_404" (キーワードが必要です)
- データ: 「2025 年第 3 四半期」 (正確である必要があります)

ハイブリッド検索 = **ベクター検索 + BM25 キーワード検索**、両方の利点を活用してください。

### 5.2 相互ランク融合 (RRF)

```python
"""Hybrid Search: Vector + Keyword"""
from rank_bm25 import BM25Okapi
import numpy as np

documents = [
    "Chính sách nghỉ phép 2026: 15 ngày/năm cho full-time",
    "Ticket ERR_404: Server timeout lúc 3AM ngày 15/3",
    "Meeting Q3-2025: doanh thu tăng 23% so với Q2",
    "Nhân viên Nguyễn Văn Bình: đánh giá KPI quý 4",
]

# BM25 keyword search
tokenized = [doc.lower().split() for doc in documents]
bm25 = BM25Okapi(tokenized)

query = "ticket ERR_404"

# Keyword scores
keyword_scores = bm25.get_scores(query.lower().split())

# Vector scores (giả lập — thực tế dùng embedding)
vector_scores = np.array([0.3, 0.7, 0.2, 0.1])  # Từ vector search

# RRF fusion
def rrf_score(rank, k=60):
    return 1 / (k + rank)

# Combine rankings
keyword_ranks = np.argsort(-keyword_scores) + 1
vector_ranks = np.argsort(-vector_scores) + 1

final_scores = []
for i in range(len(documents)):
    kr = np.where(keyword_ranks == i+1)[0][0] + 1
    vr = np.where(vector_ranks == i+1)[0][0] + 1
    score = rrf_score(kr) + rrf_score(vr)
    final_scores.append(score)

# Sort by combined score
ranked = sorted(enumerate(final_scores), key=lambda x: -x[1])

print(f"Query: '{query}'\n")
for rank, (idx, score) in enumerate(ranked, 1):
    print(f"  #{rank} [{score:.4f}] {documents[idx][:50]}...")
```

> **💡 演習 5:** ベトナム語 + コード + 個人名を組み合わせた 10 個の文書を作成します。テスト: (a) ベクトル検索のみ、(b) キーワード検索のみ、(c) ハイブリッド。それぞれの手法の精度は？

---

## 概要

|コンセプト |覚えておいてください |
|----------|----------|
| **ベクター DB** |ベクトルを保存し、最近傍をすばやく検索 |
| **ChromaDB** |プロトタイプ、シンプル、組み込み、無料 |
| **クドラント** |プロダクション、Rust、強力、セルフホスト |
| **松ぼっくり** |マネージド クラウド、ゼロオペレーション、エンタープライズ |
| **ハイブリッド検索** |ベクトル + キーワード = ほとんどの場合に最適 |
| **メタデータ フィルタリング** |最も近いベクトルを検索 + カテゴリ/日付でフィルター |

## 一般的な演習

1. ✅ 小さな演習 (3、5) を完了する
2. **ChromaDB RAG:** ChromaDB + OpenAI を使用して、実際の PDF ファイル用の RAG を構築します。 10 個の質問をテストします。
3. **Qdrant のセットアップ:** Docker を使用して Qdrant を実行し、ChromaDB からデータを移行します。検索速度を比較します。
4. **メタデータ設計:** ナレッジ ベース (FAQ、ドキュメント) を基に、メタデータ スキーマを設計します。フィルタリングが必要なフィールドはどれですか? (カテゴリ、日付、著者、部門...)

> **次の記事:** ドキュメントの読み込み — PDF、DOCX、Web、YouTube、コード リポジトリを処理して、RAG 用のデータを準備します。
