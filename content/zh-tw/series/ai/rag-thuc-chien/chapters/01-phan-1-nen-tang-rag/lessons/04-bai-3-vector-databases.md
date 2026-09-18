---
id: 019c9619-ff03-7003-a003-ff0300000003
title: 第 3 課：向量資料庫 — Chroma、Qdrant、Pinecone、Weaviate
slug: bai-3-vector-databases
description: >-
  比較 4 個最受歡迎的資料庫向量：設定、API、效能、定價。 HNSW 指數、IVF、PQ。混合搜尋（向量+關鍵字）。元資料過濾。實踐 ChromaDB 和
  Qdrant。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 2
section_title: 第 1 部分：RAG 平台
course:
  id: 019c9619-aa05-7005-b005-aa0500000005
  title: 真實戰鬥 RAG：從基礎到高級
  slug: rag-thuc-chien
locale: zh-tw
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🧠 人工智慧與機器學習 — 第 2 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 3 課：向量資料庫 — Chroma、Qdrant、</tspan>
      <tspan x="60" dy="42">松果，織布工</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">真實戰鬥 RAG：從基礎到高級</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 1 部分：RAG 平台</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![比較向量資料庫：Chroma、Qdrant、Pinecone、Weaviate](/storage/uploads/2026/04/rag-bai-3-vector-db.webp)

## 簡介

在上一課中，我們將文字轉換為向量。下一個問題：**向量保存在哪裡**和**如何搜尋**？

傳統資料庫（MySQL、PostgreSQL）是為**精確匹配**（“SELECT WHERE id = 5”）而設計的。但對於向量，我們需要找到**最近鄰居**——「哪個向量最接近查詢向量？」這就是為什麼我們需要**向量資料庫**。

---

## 1.什麼是向量資料庫？

### 1.1 快速比較

| | SQL 資料庫 |向量資料庫|
|--|-------------|----------------|
| **保存什麼** |行和列|向量（數字序列）+元資料|
| **查詢** | `WHERE name = "Minh"` | `NEAREST(query_vector, k=5)` |
| **搜尋** |精確匹配| **近似最近鄰** (ANN) |
| **用例** |傳統CRUD |語意搜尋、RAG、推薦 |

### 1.2 四個最受歡迎的向量資料庫

|資料庫|類型 |託管|主要優點 |定價（免費套餐）|
|----|--------|---------|----------------|--------------------|
| **ChromaDB** |嵌入式|本地|極為簡單，非常適合原型設計 | 100% 免費 |
| **Qdrant** |客戶端-伺服器 |自架/雲端 |高效能、強過濾|免費（自架）|
| **松果** |託管雲端|僅限雲端 |零操作，輕鬆擴充 |免費（100K 向量）|
| **偏離** |客戶端-伺服器 |自架/雲端 | GraphQL API，多模式 |免費（自架）|

---

## 2. ChromaDB — 5 分鐘內上手

ChromaDB 是 **新手的最佳選擇** — 直接在 Python 中運行，無需設定伺服器。

### 2.1 基本設定和 CRUD

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

### 2.2 何時使用 ChromaDB？

| ✅ 使用時 | ❌ 當 | 時請勿使用
|------------|------------|
|原型/POC |生產超過 100 萬個向量 |
| < 100K documents | Multi-user concurrent |
|用於 Jupyter/local |需要監控/指標 |
| 1 開發人員 |團隊需要共享資料庫|

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
| **設定** | 1行Python | Docker / 雲端 |
| **性能** |好（<100K）|優（百萬）|
| **過濾** |基本 | **非常強**（嵌套，範圍）|
| **Multi-tenancy** | ❌ | ✅ |
| **REST API** | ❌ | ✅ |
| **Monitoring** | ❌ | ✅ Dashboard |
| **Production** | POC | ✅ Production-ready |

> **💡 練習 3：** 使用 ChromaDB，新增 20 個文件（來自常見問題、文件或文章）。查詢 10 個不同的問題。計數：top-1結果正確了幾次？ → 這是檢索精度。

---

## 4. 4個Vector DB的詳細比較

### 4.1 綜合對比表

|特色| ChromaDB | Qdrant|松果|維維特 |
|--------|----------|--------|---------|----------|
| **語言** |蟒蛇 |鐵鏽|管理 |去 |
| **託管** |嵌入式|自助/雲端 |僅限雲端 |自助/雲端 |
| **索引類型** |新南威爾斯 |新南威爾斯 |專有|新南威爾斯 |
| **最大向量** | 〜1M |數百萬 | 1B+ |數百萬 |
| **過濾** |基本 |進階|進階| GraphQL |
| **混合搜尋** | ❌ | ✅ | ✅ | ✅ |
| **多式聯運** | ❌ | ❌ | ❌ | ✅ |
| **免費方案** |無限|自架 | 100K 向量 |自架 |
| **有利於** |原型|生產|企業 |多式聯運 |

### 4.2 建議

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

## 5. 混合搜尋－向量+關鍵字結合

### 5.1 為什麼需要混合？

語意搜尋（向量）**擅長**尋找相似的意義，但**弱**：
- 個人姓名：「Nguyen Van Binh」（需完全符合）
- 代碼：“ERR_404”（需要關鍵字）
- 數據：「2025 年第三季」（需要準確）

混合搜尋=**向量搜尋+BM25關鍵字搜尋**，獲得兩者的優點！

### 5.2 倒數秩融合（RRF）

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

> **💡練習 5：** 建立 10 個越南語 + 代碼 + 個人姓名混合的文件。測試：(a) 僅向量搜索，(b) 僅關鍵字搜索，(c) 混合。每種方法的準確度？

---

## 總結

|概念 |記住|
|--------|--------|
| **向量資料庫** |儲存向量+快速尋找最近鄰居 |
| **ChromaDB** |原型，簡單，嵌入式，免費 |
| **Qdrant** |生產，Rust，強大，自架 |
| **松果** |託管雲端、零作業、企業 |
| **混合搜尋** |向量 + 關鍵字 = 大多數情況下最好 |
| **元資料過濾** |尋找最近的向量 + 依類別/日期篩選 |

## 一般練習

1. ✅ 完成小練習（3、5）
2. **ChromaDB RAG：** 使用 ChromaDB + OpenAI，為真實的 PDF 檔案建立 RAG。測試 10 個問題。
3. **Qdrant 設定：** 使用 Docker 執行 Qdrant，從 ChromaDB 遷移資料。比較搜尋速度。
4. **元資料設計：**給定知識庫（常見問題、文件），設計元資料模式：哪些欄位需要過濾？ （類別、日期、作者、部門...）

> **下一篇文章：** 文件載入 — 處理 PDF、DOCX、Web、YouTube、程式碼儲存庫，為 RAG 準備資料。
