---
id: 019c9619-ff09-7009-a009-ff0900000009
title: 'レッスン 9: グラフ RAG — ナレッジ グラフ + ベクトル検索'
slug: bai-9-graph-rag
description: >-
  ナレッジ グラフとベクトル検索を組み合わせます。ドキュメントからエンティティ関係グラフを構築し、マルチホップ クエリを実行し、GraphRAG と
  Vector RAG を比較します。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 8
section_title: 'パート 3: 高度なクエリと取得'
course:
  id: 019c9619-aa05-7005-b005-aa0500000005
  title: リアルバトルRAG：基礎から上級まで
  slug: rag-thuc-chien
locale: ja
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🧠 AI と ML — レッスン 8</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 9: グラフ RAG — ナレッジ グラフ +</tspan>
      <tspan x="60" dy="42">ベクトル検索</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">リアルバトルRAG：基礎から上級まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 3: 高度なクエリと取得</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Graph RAG: Knowledge Graph + Vector Search](/storage/uploads/2026/04/rag-bai-9-graph-rag.webp)

## はじめに

ベクトル検索は **セマンティクス** に従って検索しますが、エンティティ間の **関係**は理解できません。質問にマルチホップ推論が必要な場合、ベクトル検索は失敗することがよくあります。

> **例:** 「プロジェクトマネージャーのアルファの上司は誰ですか?」
> - ベクトル検索で「Alpha project」を含む段落が見つかる → PM が Minh であることがわかる
> - しかし、「Minh の上司」は別のチャンクにあり、意味的に無関係であるため、見つかりません。
> - ナレッジグラフ: `Minh --[quản_lý]--> Alpha`、 `Hùng --[quản_lý]--> Minh` →今すぐ返信してください！

この記事の内容は次のとおりです。
1. **ナレッジ グラフ** — ドキュメントからエンティティ関係グラフを構築する
2. **Graph RAG** — マルチホップ推論のためにグラフとベクトルを組み合わせます
3. **Microsoft GraphRAG** — 実稼働対応のフレームワーク

---

## 1. 基礎知識グラフ

### 1.1 概念

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

### 1.2 テキストからナレッジグラフを抽出する

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

### 1.3 Neo4j に保存する

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

> **💡 演習 1:** テキスト (少なくとも 10 個のエンティティ) からナレッジ グラフを抽出します。 Neo4j に保存します。 3 つのマルチホップの質問を試みます。

---

## 2. グラフ RAG — グラフ + ベクトルの組み合わせ

### 2.1 アーキテクチャ

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

### 2.2 LangChain + Neo4j による実装

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

### 2.3 ハイブリッド: グラフ コンテキスト + ベクトル コンテキスト

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

### 3.1 GraphRAG アーキテクチャ

Microsoft GraphRAG はパイプライン全体を自動化します。

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

### 3.2 Microsoft GraphRAG のセットアップ

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

### 3.3 ローカル検索とグローバル検索

|モード |仕組み |いつ使用するか |
|------|------|-----------|
| **ローカル** |関連するエンティティを検索 → グラフをトラバース → コンテキスト |具体的で事実に基づく質問 |
| **グローバル** |コミュニティの概要を使用する → 概要 |一般質問、テーマ |

---

## 4. GraphRAG と Vector RAG の比較

### 4.1 ベンチマーク

|基準 |ベクトルラグ |グラフ RAG |ハイブリッド |
|--------|:---:|:---:|:---:|
|シングルホップクエリ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
|マルチホップクエリ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
|要約 | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
|セットアップの複雑さ | ⭐ (シンプル) | ⭐⭐⭐ (複雑) | ⭐⭐⭐⭐ |
|インデックス作成のコスト |低い | Cao (LLM 抽出物) |曹操 |
|クエリのレイテンシ |速い |遅い |平均 |

### 4.2 Graph RAG をいつ使用するか?

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

> **💡 演習 2:** Microsoft GraphRAG を使用してドキュメント フォルダーのインデックスを作成します。 5 つの具体的な質問 + 5 つの一般的な質問について、ローカル検索結果とグローバル検索結果を比較します。

---

## 概要

|コンセプト |覚えておいてください |
|----------|----------|
| **ナレッジ グラフ** |エンティティ関係グラフ、マルチホップに適しています |
| **エンティティの抽出** | LLM を使用してテキストからエンティティと関係を抽出する |
| **Neo4j** |グラフ データベース、Cypher を使用したクエリ |
| **GraphCypherQAChain** | LLM は独自の Cypher クエリを作成します。
| **Microsoft GraphRAG** |フレームワーク自動: 抽出 → コ​​ミュニティ → 要約 |
| **ローカル vs グローバル** |ローカル = 具体的な事実、グローバル = テーマ |
| **ハイブリッド** |グラフの事実 + ベクトルのコンテキスト = 最良の結果 |

## 一般的な演習

1. ✅ 2 つの小さな演習 (1、2) を完了します。
2. **完全なグラフ パイプライン:** 10 個以上のドキュメントから独自のナレッジ グラフを構築します。 LLM を使用してエンティティを抽出 → Neo4j を保存 → GraphCypherQAChain を実装 → 10 個のマルチホップ センテンスをテストします。
3. **ハイブリッド システム:** 組み合わせたシステムを構築します: Neo4j グラフ + クロマ ベクトル。ルーターは質問の種類に応じてデータ ソースを自動的に選択します。純粋なベクトル RAG と精度を比較します。
4. **視覚化:** Neo4j からグラフをエクスポート → NetworkX または Neo4j ブラウザを使用して視覚化します。スクリーンショット 1 つのサブグラフには少なくとも 20 個のノードがあります。

> **次の記事:** マルチモーダル RAG — ドキュメント内の画像、表、グラフを処理します — RAG はテキストだけを扱うものではありません。
