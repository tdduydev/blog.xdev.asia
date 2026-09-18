---
id: 019c9619-ff11-7011-a011-ff1100000011
title: 'レッスン 11: Agentic RAG — Agent + RAG の組み合わせによるパワー'
slug: bai-11-agentic-rag
description: >-
  エージェントは、いつ、どこで検索するか、どのような追加情報が必要かを自分で決定します。ツール呼び出し RAG、マルチステップ推論、自己反省型 RAG
  (CRAG)。
duration_minutes: 150
is_free: true
video_url: null
sort_order: 10
section_title: 'パート 4: 高度な RAG パターン'
course:
  id: 019c9619-aa05-7005-b005-aa0500000005
  title: リアルバトルRAG：基礎から上級まで
  slug: rag-thuc-chien
locale: ja
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-8780" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-8780)"/>

  <!-- Decorations -->
  <g>
    <circle cx="900" cy="210" r="18" fill="#38bdf8" opacity="0.05"/>
    <circle cx="700" cy="270" r="8" fill="#38bdf8" opacity="0.05"/>
    <circle cx="1000" cy="70" r="28" fill="#38bdf8" opacity="0.05"/>
    <circle cx="800" cy="130" r="18" fill="#38bdf8" opacity="0.05"/>
    <circle cx="600" cy="190" r="8" fill="#38bdf8" opacity="0.05"/>
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
    <line x1="600" y1="50" x2="1100" y2="130" stroke="#38bdf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="80" x2="1050" y2="150" stroke="#38bdf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="971.650635094611,137.5 971.650635094611,162.5 950,175 928.349364905389,162.5 928.349364905389,137.5 950,125" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#38bdf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#38bdf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🧠 AI と ML — レッスン 10</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">レッスン 11: Agentic RAG — エージェントと RAG の組み合わせ</tspan>
      <tspan x="60" dy="42">強さ</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">リアルバトルRAG：基礎から上級まで</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">パート 4: 高度な RAG パターン</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Agentic RAG: AI エージェントが多くのツールを調整します](/storage/uploads/2026/04/rag-bai-11-agentic-rag.webp)

## はじめに

従来の RAG は、**固定パイプライン**: クエリ → 取得 → 生成です。しかし実際には、多くの質問では、**複数段階の推論**、**多くの情報源からの検索**、または回答する前に結果の**自己評価**が必要です。

> **例:** 「あなたの会社の休暇規定とベトナムの労働法を比較してください。」
> - ステップ 1: 内部ポリシーを見つける (内部ベクトル ストア)
> - ステップ 2: 労働法を検索する (ウェブ検索または法律ストア ベクトル)
> - ステップ 3: 2 つの結果を比較する
> - RAG パイプラインが機能しない問題を修正しました。エージェントは「はい」です。

この記事の内容は次のとおりです。
1. **ツール呼び出し RAG** — エージェントはツールを呼び出します: 検索、計算機、Web...
2. **アダプティブ RAG** — 質問に応じて独自の戦略を選択します
3. **Self-Reflective RAG (CRAG)** — 結果を自己評価し、再試行します

---

## 1. パイプライン → エージェント

### 1.1 比較

```
RAG Pipeline (cố định):
  Query → Retrieve → Generate → Answer
  ↑ luôn chạy 3 bước, không linh hoạt

Agentic RAG (linh hoạt):
  Query → Agent QUYẾT ĐỊNH:
           ├── Cần search không? → Search tool
           ├── Search ở đâu? → Internal docs / Web / SQL
           ├── Kết quả đủ chưa? → Search thêm / Dừng
           ├── Cần tính toán? → Calculator tool
           └── Cần đánh giá? → Self-reflect → Retry
```

### 1.2 Agentic RAG はどのような場合に必要ですか?

|シナリオ |パイプライン RAG |エージェントティック RAG |
|--------|:---:|:---:|
|簡単な Q&A (1 ソース) | ✅ |やりすぎ |
|マルチソース (社内 + Web) | ❌ | ✅ |
|多段階推論 | ❌ | ✅ |
|計算/SQLが必要 | ❌ | ✅ |
|自己修正 | ❌ | ✅ |

---

## 2. ツール呼び出し RAG

### 2.1 RAG ツールの作成

```python
"""Agent với RAG search tool"""
from langchain.tools.retriever import create_retriever_tool
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI

# Tool 1: Search tài liệu nội bộ
internal_retriever = Chroma(
    collection_name="internal_docs",
    embedding_function=OpenAIEmbeddings(),
).as_retriever(search_kwargs={"k": 3})

search_internal = create_retriever_tool(
    retriever=internal_retriever,
    name="search_internal_docs",
    description="Tìm kiếm tài liệu nội bộ công ty: chính sách, quy trình, HR...",
)

# Tool 2: Web search
from langchain_community.tools import TavilySearchResults
web_search = TavilySearchResults(max_results=3)

# Tool 3: Calculator
from langchain_community.tools import LLMMathChain
# ...hoặc custom tool
```

### 2.2 エージェントの作成

```python
"""LangGraph Agent với RAG tools"""
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o", temperature=0)

tools = [search_internal, web_search]

agent = create_react_agent(
    model=llm,
    tools=tools,
    state_modifier="""Bạn là AI assistant của công ty XYZ.
    Sử dụng search_internal_docs cho câu hỏi về chính sách nội bộ.
    Sử dụng web_search cho thông tin bên ngoài (luật, thị trường...).
    Nếu kết quả không đủ, hãy search thêm với query khác.""",
)

# Agent tự quyết định dùng tool nào
result = agent.invoke({
    "messages": [{"role": "user", "content":
        "So sánh chính sách nghỉ phép công ty với Bộ Luật Lao động 2019"}]
})
```

### 2.3 マルチソースルーティング

```
User: "So sánh nghỉ phép công ty vs luật"
   │
   └── Agent thinking:
       Step 1: Cần tìm chính sách nội bộ
               → search_internal_docs("chính sách nghỉ phép")
               → Kết quả: "15 ngày phép/năm cho full-time"
       
       Step 2: Cần tìm luật lao động
               → web_search("Bộ Luật Lao động 2019 nghỉ phép")
               → Kết quả: "Điều 113: tối thiểu 12 ngày/năm"
       
       Step 3: So sánh và trả lời
               → "Công ty cho 15 ngày, cao hơn luật quy định (12 ngày)"
```

> **💡 演習 1:** 2 つのツールを使用してエージェントを作成します: (a) 内部検索、(b) Web 検索。両方のソースを必要とする 5 つの質問をテストします。

---

## 3. アダプティブ RAG — 独自の戦略を選択する

### 3.1 ルーターエージェント

```python
"""Router: phân loại câu hỏi → chọn strategy"""
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from typing import Literal
from pydantic import BaseModel, Field

class RouteQuery(BaseModel):
    """Routing decision"""
    datasource: Literal["vectorstore", "web_search", "sql_database"] = Field(
        description="Chọn nguồn dữ liệu phù hợp nhất"
    )

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
structured_llm = llm.with_structured_output(RouteQuery)

router_prompt = ChatPromptTemplate.from_messages([
    ("system", """Phân loại câu hỏi dựa trên nội dung:
- vectorstore: câu hỏi về chính sách, quy trình nội bộ công ty
- web_search: thông tin bên ngoài, tin tức, luật pháp
- sql_database: câu hỏi cần query dữ liệu số (doanh thu, nhân sự...)"""),
    ("human", "{question}"),
])

router = router_prompt | structured_llm

# Test
route = router.invoke({"question": "Doanh thu Q3 2024 bao nhiêu?"})
print(route.datasource)  # "sql_database"

route = router.invoke({"question": "Quy trình xin nghỉ phép?"})
print(route.datasource)  # "vectorstore"
```

### 3.2 適応パイプライン

```python
"""Adaptive RAG: route → strategy → retrieve → generate"""
def adaptive_rag(question: str):
    # 1. Route
    route = router.invoke({"question": question})
    
    # 2. Retrieve theo route
    if route.datasource == "vectorstore":
        docs = vector_retriever.invoke(question)
        context = "\n".join([d.page_content for d in docs])
    elif route.datasource == "web_search":
        results = web_search.invoke(question)
        context = "\n".join([r["content"] for r in results])
    elif route.datasource == "sql_database":
        # Text-to-SQL
        context = sql_chain.invoke(question)
    
    # 3. Generate
    prompt = f"Context: {context}\n\nQuestion: {question}\nAnswer:"
    return llm.invoke(prompt).content
```

---

## 4. 自己反射 RAG (CRAG)

### 4.1 アイデア

修正 RAG (CRAG): 取得後、結果を **評価**します。十分でない場合は、別の戦略で **再試行**してください。

```
Query → Retrieve → Grader: kết quả tốt không?
                      │
                ┌─────┴─────┐
                │            │
            Relevant     Not Relevant
                │            │
            Generate     Web Search
                │            │
                └─────┬──────┘
                      │
                 Final Answer
```

### 4.2 LangGraph による実装

```python
"""CRAG: Corrective RAG với LangGraph"""
from langgraph.graph import StateGraph, END
from typing import TypedDict, List
from langchain.schema import Document

class GraphState(TypedDict):
    question: str
    documents: List[Document]
    generation: str
    web_search_needed: bool

# Node 1: Retrieve
def retrieve(state):
    docs = vector_retriever.invoke(state["question"])
    return {"documents": docs}

# Node 2: Grade documents
def grade_documents(state):
    """LLM đánh giá: documents có liên quan đến question không?"""
    question = state["question"]
    docs = state["documents"]
    
    relevant_docs = []
    web_search_needed = False
    
    for doc in docs:
        grade_prompt = f"""Document: {doc.page_content[:300]}
Question: {question}
Document có liên quan đến question không? Trả lời: yes hoặc no"""
        
        grade = llm.invoke(grade_prompt).content.strip().lower()
        if "yes" in grade:
            relevant_docs.append(doc)
    
    if len(relevant_docs) < 2:  # Ít hơn 2 doc relevant → cần web search
        web_search_needed = True
    
    return {"documents": relevant_docs, "web_search_needed": web_search_needed}

# Node 3: Web search (fallback)
def web_search_node(state):
    results = web_search.invoke(state["question"])
    web_docs = [Document(page_content=r["content"]) for r in results]
    return {"documents": state["documents"] + web_docs}

# Node 4: Generate
def generate(state):
    context = "\n".join([d.page_content for d in state["documents"]])
    prompt = f"Context: {context}\n\nQuestion: {state['question']}\nAnswer:"
    answer = llm.invoke(prompt).content
    return {"generation": answer}

# Build graph
workflow = StateGraph(GraphState)
workflow.add_node("retrieve", retrieve)
workflow.add_node("grade", grade_documents)
workflow.add_node("web_search", web_search_node)
workflow.add_node("generate", generate)

workflow.set_entry_point("retrieve")
workflow.add_edge("retrieve", "grade")
workflow.add_conditional_edges("grade", 
    lambda state: "web_search" if state["web_search_needed"] else "generate")
workflow.add_edge("web_search", "generate")
workflow.add_edge("generate", END)

app = workflow.compile()

result = app.invoke({"question": "Chính sách WFH mới nhất?"})
print(result["generation"])
```

> **💡 演習 2:** CRAG パイプラインを実装します。 10 個のテスト質問を作成します。5 つの質問にはベクター ストアに回答がありますが、5 つの質問には回答がありません (Web 検索が必要です)。 CRAG が Web 検索を自動的に適切にフォールバックするかどうかを確認します。

---

## 5. 複数ステップの推論

### 5.1 複雑な質問を分解する

```python
"""Agent tự chia câu hỏi phức tạp thành nhiều bước"""
decompose_prompt = ChatPromptTemplate.from_messages([
    ("system", """Chia câu hỏi phức tạp thành các bước nhỏ.
Mỗi bước là 1 câu hỏi đơn giản có thể search được.
Trả lời dạng JSON: ["bước 1", "bước 2", ...]"""),
    ("human", "{question}"),
])

def multi_step_rag(question: str):
    # Decompose
    steps = decompose_prompt | llm
    sub_questions = eval(steps.invoke({"question": question}).content)
    
    all_context = []
    for sub_q in sub_questions:
        # Search mỗi sub-question
        docs = vector_retriever.invoke(sub_q)
        all_context.extend([d.page_content for d in docs])
    
    # Generate final answer
    context = "\n".join(all_context)
    final_prompt = f"""Dựa trên thông tin thu thập:
{context}

Câu hỏi gốc: {question}
Trả lời đầy đủ:"""
    
    return llm.invoke(final_prompt).content
```

---

## 概要

|コンセプト |覚えておいてください |
|----------|----------|
| **Agentic RAG** |エージェントはどこを検索するか、何回検索するかを自分で決定します。
| **ツール呼び出し** |エージェントはツールを呼び出します: RAG 検索、Web、SQL、計算機 |
| **アダプティブ RAG** |ルーターの分類 → 適切な戦略を選択 |
| **クラッグ** |成績結果 → 成績が悪い場合はフォールバック Web 検索 |
| **マルチステップ** |複雑な質問を分割 → 複数のサブ質問 |
| **ランググラフ** |グラフベースのエージェント ワークフローを構築するためのフレームワーク |

## 一般的な演習

1. ✅ 2 つの小さな演習 (1、2) を完了します。
2. **完全なエージェント RAG:** 3 つ以上のツール (内部ドキュメント、Web 検索、SQL) を使用してエージェントを作成します。 15 個の多様な質問をテストします。エージェントは適切なツールを選択していますか?
3. **CRAG + マルチステップ:** CRAG をマルチステップ分解と組み合わせて実装します。複雑な質問→分割されたステップ→各ステップの検索→採点→フォールバック→回答。
4. **評価:** 回答の品質を比較します: (a) 基本 RAG、(b) アダプティブ RAG、(c) エージェント CRAG。 GPT-4 を使用して 1 ～ 10 を評価します。

> **次の記事:** RAG 評価 — RAGAS、忠実性、関連性 — RAG システムの品質を科学的に測定します。
