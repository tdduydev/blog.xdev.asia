---
id: 019c9619-ff03-7003-a003-ff0300000003
title: 'Bài 3: Vector Databases — Chroma, Qdrant, Pinecone, Weaviate'
slug: bai-3-vector-databases
description: >-
  So sánh 4 vector DB phổ biến nhất: setup, API, performance, pricing.
  HNSW index, IVF, PQ. Hybrid search (vector + keyword). Metadata
  filtering. Hands-on với ChromaDB và Qdrant.
duration_minutes: 150
is_free: true
video_url: null
sort_order: 2
section_title: "Phần 1: Nền tảng RAG"
course:
  id: 019c9619-aa05-7005-b005-aa0500000005
  title: "RAG Thực Chiến: Từ Basic đến Advanced"
  slug: rag-thuc-chien
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🧠 AI &amp; ML — Bài 2</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 3: Vector Databases — Chroma, Qdrant,</tspan>
      <tspan x="60" dy="42">Pinecone, Weaviate</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">RAG Thực Chiến: Từ Basic đến Advanced</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 1: Nền tảng RAG</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![So sánh Vector Databases: Chroma, Qdrant, Pinecone, Weaviate](/storage/uploads/2026/04/rag-bai-3-vector-db.webp)

## Giới thiệu

Ở bài trước, chúng ta đã biến text thành vectors. Câu hỏi tiếp theo: **lưu vectors ở đâu** và **tìm kiếm thế nào**?

Database truyền thống (MySQL, PostgreSQL) được thiết kế cho **exact match** ("SELECT WHERE id = 5"). Nhưng với vectors, chúng ta cần tìm **nearest neighbors** — "vector nào gần nhất với vector query?" Đó là lý do cần **Vector Database**.

---

## 1. Vector Database là gì?

### 1.1 So sánh nhanh

| | SQL Database | Vector Database |
|--|-------------|----------------|
| **Lưu gì** | Rows & columns | Vectors (dãy số) + metadata |
| **Query** | `WHERE name = "Minh"` | `NEAREST(query_vector, k=5)` |
| **Tìm kiếm** | Exact match | **Approximate nearest neighbor** (ANN) |
| **Use case** | CRUD truyền thống | Semantic search, RAG, recommendation |

### 1.2 Bốn Vector Databases phổ biến nhất

| DB | Loại | Hosting | Ưu điểm chính | Pricing (free tier) |
|----|------|---------|---------------|-------------------|
| **ChromaDB** | Embedded | Local | Cực đơn giản, perfect cho prototype | 100% free |
| **Qdrant** | Client-Server | Self-hosted / Cloud | Performance cao, filtering mạnh | Free (self-hosted) |
| **Pinecone** | Managed Cloud | Cloud only | Zero-ops, scale dễ | Free (100K vectors) |
| **Weaviate** | Client-Server | Self-hosted / Cloud | GraphQL API, multimodal | Free (self-hosted) |

---

## 2. ChromaDB — Bắt đầu ngay trong 5 phút

ChromaDB là lựa chọn **tốt nhất cho người mới** — chạy ngay trong Python, không cần setup server.

### 2.1 Setup & CRUD cơ bản

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

### 2.2 Khi nào dùng ChromaDB?

| ✅ Dùng khi | ❌ Không dùng khi |
|-----------|-----------------|
| Prototype / POC | Production 1M+ vectors |
| < 100K documents | Multi-user concurrent |
| Dùng trong Jupyter/local | Cần monitoring/metrics |
| 1 developer | Team cần shared DB |

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
| **Setup** | 1 dòng Python | Docker / Cloud |
| **Performance** | Tốt (< 100K) | Xuất sắc (hàng triệu) |
| **Filtering** | Cơ bản | **Rất mạnh** (nested, range) |
| **Multi-tenancy** | ❌ | ✅ |
| **REST API** | ❌ | ✅ |
| **Monitoring** | ❌ | ✅ Dashboard |
| **Production** | POC | ✅ Production-ready |

> **💡 Bài tập 3:** Dùng ChromaDB, thêm 20 documents (từ FAQ, docs, hoặc bài báo). Query 10 câu hỏi khác nhau. Đếm: bao nhiêu lần top-1 result đúng? → Đây là retrieval accuracy.

---

## 4. So sánh chi tiết 4 Vector DBs

### 4.1 Bảng so sánh toàn diện

| Feature | ChromaDB | Qdrant | Pinecone | Weaviate |
|---------|----------|--------|----------|----------|
| **Ngôn ngữ** | Python | Rust | Managed | Go |
| **Hosting** | Embedded | Self/Cloud | Cloud only | Self/Cloud |
| **Index type** | HNSW | HNSW | Proprietary | HNSW |
| **Max vectors** | ~1M | Hàng triệu | 1B+ | Hàng triệu |
| **Filtering** | Basic | Advanced | Advanced | GraphQL |
| **Hybrid search** | ❌ | ✅ | ✅ | ✅ |
| **Multimodal** | ❌ | ❌ | ❌ | ✅ |
| **Free tier** | Unlimited | Self-hosted | 100K vecs | Self-hosted |
| **Tốt cho** | Prototype | Production | Enterprise | Multimodal |

### 4.2 Recommendation

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

## 5. Hybrid Search — Kết hợp Vector + Keyword

### 5.1 Tại sao cần Hybrid?

Semantic search (vector) **giỏi** tìm ý nghĩa tương đồng nhưng **yếu** với:
- Tên riêng: "Nguyễn Văn Bình" (cần exact match)
- Mã code: "ERR_404" (cần keyword)
- Số liệu: "Q3 2025" (cần chính xác)

Hybrid search = **Vector search + BM25 keyword search**, lấy ưu điểm cả hai!

### 5.2 Reciprocal Rank Fusion (RRF)

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

> **💡 Bài tập 5:** Tạo 10 documents có mix tiếng Việt + mã code + tên riêng. Test: (a) chỉ vector search, (b) chỉ keyword search, (c) hybrid. Accuracy mỗi phương pháp?

---

## Tóm tắt

| Concept | Ghi nhớ |
|---------|---------|
| **Vector DB** | Lưu trữ vectors + tìm nearest neighbors nhanh |
| **ChromaDB** | Prototype, đơn giản, embedded, miễn phí |
| **Qdrant** | Production, Rust, mạnh, self-hosted |
| **Pinecone** | Managed cloud, zero-ops, enterprise |
| **Hybrid Search** | Vector + Keyword = tốt nhất cho most cases |
| **Metadata Filtering** | Tìm vector GẦN NHẤT + filter theo category/date |

## Bài tập tổng hợp

1. ✅ Hoàn thành bài tập nhỏ (3, 5)
2. **ChromaDB RAG:** Dùng ChromaDB + OpenAI, xây RAG cho 1 file PDF thật. Test 10 câu hỏi.
3. **Qdrant Setup:** Chạy Qdrant bằng Docker, migrate data từ ChromaDB sang. So sánh search speed.
4. **Metadata Design:** Cho 1 knowledge base (FAQ, docs), thiết kế metadata schema: những field nào cần filter? (category, date, author, department...)

> **Bài tiếp theo:** Document Loading — xử lý PDF, DOCX, Web, YouTube, code repos để chuẩn bị data cho RAG.
