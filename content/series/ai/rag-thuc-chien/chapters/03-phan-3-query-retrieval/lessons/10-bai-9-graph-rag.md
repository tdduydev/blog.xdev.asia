---
id: 019c9619-ff09-7009-a009-ff0900000009
title: 'Bài 9: Graph RAG — Knowledge Graph + Vector Search'
slug: bai-9-graph-rag
description: >-
  Kết hợp Knowledge Graph với Vector Search. Xây dựng entity-relationship
  graph từ tài liệu, truy vấn multi-hop, so sánh GraphRAG vs Vector RAG.
duration_minutes: 150
is_free: true
video_url: null
sort_order: 8
section_title: "Phần 3: Query & Retrieval Nâng cao"
course:
  id: 019c9619-aa05-7005-b005-aa0500000005
  title: "RAG Thực Chiến: Từ Basic đến Advanced"
  slug: rag-thuc-chien
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-9825" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-9825)"/>

  <!-- Decorations -->
  <g>
    <circle cx="710" cy="140" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="820" cy="90" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="930" cy="40" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="1040" cy="250" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="650" cy="200" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#38bdf8" opacity="0.15"/>
    <line x1="600" y1="80" x2="1100" y2="160" stroke="#38bdf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="110" x2="1050" y2="180" stroke="#38bdf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="960.3108891324554,112.5 960.3108891324554,147.5 930,165 899.6891108675446,147.5 899.6891108675446,112.50000000000001 930,95" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#38bdf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#38bdf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🧠 AI &amp; ML — Bài 8</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 9: Graph RAG — Knowledge Graph +</tspan>
      <tspan x="60" dy="42">Vector Search</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">RAG Thực Chiến: Từ Basic đến Advanced</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 3: Query &amp; Retrieval Nâng cao</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Graph RAG: Knowledge Graph + Vector Search](/storage/uploads/2026/04/rag-bai-9-graph-rag.webp)

## Giới thiệu

Vector search tìm kiếm theo **ngữ nghĩa** — nhưng nó không hiểu **quan hệ** giữa các thực thể. Khi câu hỏi đòi hỏi suy luận nhiều bước (multi-hop), vector search thường thất bại.

> **Ví dụ:** "Ai là sếp của người quản lý dự án Alpha?"
> - Vector search tìm đoạn chứa "dự án Alpha" → biết PM là Minh
> - Nhưng KHÔNG tìm được "sếp của Minh" vì đó ở chunk khác, không liên quan về ngữ nghĩa
> - Knowledge Graph: `Minh --[quản_lý]--> Alpha`, `Hùng --[quản_lý]--> Minh` → trả lời ngay!

Bài này cover:
1. **Knowledge Graph** — xây đồ thị entity-relationship từ tài liệu
2. **Graph RAG** — kết hợp graph + vector cho multi-hop reasoning
3. **Microsoft GraphRAG** — framework production-ready

---

## 1. Knowledge Graph cơ bản

### 1.1 Khái niệm

```
Knowledge Graph = Đồ thị gồm:
  - Nodes (entities): Người, Địa điểm, Dự án, Phòng ban...
  - Edges (relationships): quản_lý, thuộc_về, làm_việc_tại...

Ví dụ:
  [Minh] ──quản_lý──→ [Dự án Alpha]
  [Minh] ──thuộc_về──→ [Phòng IT]
  [Hùng] ──quản_lý──→ [Minh]
  [Hùng] ──thuộc_về──→ [Ban Giám đốc]
  [Dự án Alpha] ──sử_dụng──→ [Python]
  [Dự án Alpha] ──deadline──→ [2025-06-30]
```

### 1.2 Trích xuất Knowledge Graph từ text

```python
"""Dùng LLM để trích xuất entities và relationships"""
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

EXTRACT_PROMPT = ChatPromptTemplate.from_messages([
    ("system", """Trích xuất entities và relationships từ đoạn văn.
Output dạng JSON:
{{
  "entities": [
    {{"name": "...", "type": "Person|Org|Project|Location|Tech"}},
  ],
  "relationships": [
    {{"source": "...", "relation": "...", "target": "..."}},
  ]
}}"""),
    ("human", "{text}"),
])

text = """Minh là Project Manager của dự án Alpha, thuộc phòng IT.
Dự án Alpha sử dụng Python và PostgreSQL, deadline 30/6/2025.
Minh báo cáo trực tiếp cho Giám đốc Hùng."""

result = (EXTRACT_PROMPT | llm).invoke({"text": text})
print(result.content)
# {
#   "entities": [
#     {"name": "Minh", "type": "Person"},
#     {"name": "Alpha", "type": "Project"},
#     {"name": "Phòng IT", "type": "Org"},
#     {"name": "Hùng", "type": "Person"},
#     {"name": "Python", "type": "Tech"},
#     {"name": "PostgreSQL", "type": "Tech"}
#   ],
#   "relationships": [
#     {"source": "Minh", "relation": "quản_lý", "target": "Alpha"},
#     {"source": "Minh", "relation": "thuộc_về", "target": "Phòng IT"},
#     {"source": "Alpha", "relation": "sử_dụng", "target": "Python"},
#     {"source": "Alpha", "relation": "sử_dụng", "target": "PostgreSQL"},
#     {"source": "Minh", "relation": "báo_cáo", "target": "Hùng"}
#   ]
# }
```

### 1.3 Lưu vào Neo4j

```python
"""Lưu Knowledge Graph vào Neo4j"""
from neo4j import GraphDatabase

driver = GraphDatabase.driver(
    "bolt://localhost:7687",
    auth=("neo4j", "password")
)

def create_graph(entities, relationships):
    with driver.session() as session:
        # Tạo nodes
        for entity in entities:
            session.run(
                "MERGE (n:{type} {{name: $name}})".format(type=entity["type"]),
                name=entity["name"]
            )
        
        # Tạo edges
        for rel in relationships:
            session.run(
                """MATCH (a {{name: $source}}), (b {{name: $target}})
                   MERGE (a)-[:{relation}]->(b)""".format(relation=rel["relation"]),
                source=rel["source"],
                target=rel["target"]
            )

# Query: "Ai quản lý dự án Alpha?"
result = session.run("""
    MATCH (person)-[:quản_lý]->(project {name: 'Alpha'})
    RETURN person.name
""")
# → "Minh"

# Multi-hop: "Sếp của người quản lý dự án Alpha?"
result = session.run("""
    MATCH (boss)-[:quản_lý]->(manager)-[:quản_lý]->(project {name: 'Alpha'})
    RETURN boss.name
""")
# → "Hùng" ← Vector search KHÔNG THỂ trả lời!
```

> **💡 Bài tập 1:** Trích xuất Knowledge Graph từ 1 đoạn văn bản (ít nhất 10 entities). Lưu vào Neo4j. Thử 3 câu hỏi multi-hop.

---

## 2. Graph RAG — Kết hợp Graph + Vector

### 2.1 Kiến trúc

```
                    User Query
                        │
            ┌───────────┼───────────┐
            │                       │
    ┌───────┴───────┐       ┌───────┴───────┐
    │  Vector Store │       │  Knowledge    │
    │  (semantic)   │       │  Graph (Neo4j)│
    └───────┬───────┘       └───────┬───────┘
            │                       │
     Semantic chunks         Graph traversal
     (context rộng)          (quan hệ chính xác)
            │                       │
            └───────────┬───────────┘
                        │
                   Merge context
                        │
                      LLM → Answer
```

### 2.2 Implementation với LangChain + Neo4j

```python
"""Graph RAG: kết hợp Neo4j graph + Chroma vector"""
from langchain_community.graphs import Neo4jGraph
from langchain.chains import GraphCypherQAChain
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o", temperature=0)

# Neo4j graph
graph = Neo4jGraph(
    url="bolt://localhost:7687",
    username="neo4j",
    password="password",
)

# GraphCypherQAChain: LLM tự viết Cypher query
graph_chain = GraphCypherQAChain.from_llm(
    llm=llm,
    graph=graph,
    verbose=True,
)

# Query multi-hop
result = graph_chain.invoke(
    "Liệt kê tất cả tech stack mà team của Hùng sử dụng?"
)
# LLM tự generate Cypher:
# MATCH (Hùng {name:'Hùng'})-[:quản_lý]->(person)
#       -[:quản_lý]->(project)-[:sử_dụng]->(tech)
# RETURN DISTINCT tech.name
```

### 2.3 Hybrid: Graph context + Vector context

```python
"""Kết hợp graph traversal + vector search"""
def hybrid_graph_rag(question, graph_chain, vector_retriever, llm):
    # 1. Graph context (quan hệ, facts)
    try:
        graph_context = graph_chain.invoke(question)["result"]
    except Exception:
        graph_context = "Không tìm thấy thông tin trong graph."
    
    # 2. Vector context (nội dung chi tiết)
    vector_docs = vector_retriever.invoke(question)
    vector_context = "\n".join([d.page_content for d in vector_docs])
    
    # 3. Merge và trả lời
    prompt = f"""Dựa trên thông tin sau, trả lời câu hỏi.

**Thông tin từ Knowledge Graph:**
{graph_context}

**Thông tin từ tài liệu:**
{vector_context}

**Câu hỏi:** {question}
**Trả lời:**"""
    
    return llm.invoke(prompt).content
```

---

## 3. Microsoft GraphRAG

### 3.1 Kiến trúc GraphRAG

Microsoft GraphRAG tự động hóa toàn bộ pipeline:

```
Documents → Entity Extraction → Community Detection → Summarization
                │                       │                    │
         Entities &              Groups of related      Summary per
         Relationships           entities (Leiden)       community
                │                       │                    │
                └───────────────────────┼────────────────────┘
                                        │
                                 Query modes:
                            Local search │ Global search
                            (specific)   │ (broad themes)
```

### 3.2 Setup Microsoft GraphRAG

```bash
# Cài đặt
pip install graphrag

# Init project
graphrag init --root ./my-rag-project

# Cấu hình settings.yaml
# - llm: model, api_key
# - embeddings: model
# - chunks: size, overlap
```

```python
"""Index tài liệu"""
# graphrag index --root ./my-rag-project
# → Tự extract entities, build graph, detect communities, summarize

"""Query"""
# Local search: tìm thông tin cụ thể
# graphrag query --root ./my-rag-project --method local \
#   --query "Ai quản lý dự án Alpha?"

# Global search: tổng hợp theo chủ đề
# graphrag query --root ./my-rag-project --method global \
#   --query "Tóm tắt các dự án đang triển khai và tech stack?"
```

### 3.3 Local vs Global Search

| Mode | Cách hoạt động | Khi nào dùng |
|------|---------------|-------------|
| **Local** | Tìm entities liên quan → traverse graph → context | Câu hỏi cụ thể, factual |
| **Global** | Dùng community summaries → tổng hợp | Câu hỏi tổng quan, thematic |

---

## 4. So sánh GraphRAG vs Vector RAG

### 4.1 Benchmark

| Tiêu chí | Vector RAG | Graph RAG | Hybrid |
|---------|:---:|:---:|:---:|
| Single-hop queries | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Multi-hop queries | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Summarization | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Setup complexity | ⭐ (đơn giản) | ⭐⭐⭐ (phức tạp) | ⭐⭐⭐⭐ |
| Indexing cost | Thấp | Cao (LLM extract) | Cao |
| Query latency | Nhanh | Chậm hơn | Trung bình |

### 4.2 Khi nào dùng Graph RAG?

```
✅ Dùng Graph RAG khi:
  - Câu hỏi multi-hop, cần suy luận qua nhiều entities
  - Tài liệu có nhiều quan hệ phức tạp (org chart, supply chain)
  - Cần tổng hợp theo chủ đề (global search)
  - Domain có entity types rõ ràng (legal, medical, HR)

❌ KHÔNG cần Graph RAG khi:
  - Câu hỏi đơn giản, 1-hop
  - Tài liệu ít quan hệ (blog posts, FAQ)
  - Budget thấp (indexing tốn nhiều LLM calls)
  - Latency-critical (graph query chậm hơn vector)
```

> **💡 Bài tập 2:** Dùng Microsoft GraphRAG index 1 folder tài liệu. So sánh kết quả local search vs global search trên 5 câu hỏi cụ thể + 5 câu tổng quát.

---

## Tóm tắt

| Concept | Ghi nhớ |
|---------|---------|
| **Knowledge Graph** | Đồ thị entity-relationship, tốt cho multi-hop |
| **Entity Extraction** | Dùng LLM trích xuất entities + relations từ text |
| **Neo4j** | Graph database, query bằng Cypher |
| **GraphCypherQAChain** | LLM tự viết Cypher query |
| **Microsoft GraphRAG** | Framework auto: extract → community → summarize |
| **Local vs Global** | Local = specific facts, Global = themes |
| **Hybrid** | Graph facts + Vector context = best results |

## Bài tập tổng hợp

1. ✅ Hoàn thành 2 bài tập nhỏ (1, 2)
2. **Full Graph Pipeline:** Tự build Knowledge Graph từ 10+ tài liệu. Extract entities bằng LLM → lưu Neo4j → implement GraphCypherQAChain → test 10 câu multi-hop.
3. **Hybrid System:** Xây system kết hợp: Neo4j graph + Chroma vector. Router tự chọn data source theo loại câu hỏi. So sánh accuracy với pure vector RAG.
4. **Visualization:** Export graph từ Neo4j → visualize bằng NetworkX hoặc Neo4j Browser. Screenshot 1 subgraph có ít nhất 20 nodes.

> **Bài tiếp theo:** Multimodal RAG — xử lý ảnh, bảng, biểu đồ trong tài liệu — RAG không chỉ cho text.
