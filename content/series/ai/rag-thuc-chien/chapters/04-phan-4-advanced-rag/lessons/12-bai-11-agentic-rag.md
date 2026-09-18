---
id: 019c9619-ff11-7011-a011-ff1100000011
title: 'Bài 11: Agentic RAG — Agent + RAG kết hợp sức mạnh'
slug: bai-11-agentic-rag
description: >-
  Agent tự quyết định khi nào search, search ở đâu, cần thêm thông tin gì.
  Tool-calling RAG, multi-step reasoning, self-reflective RAG (CRAG).
duration_minutes: 150
is_free: true
video_url: null
sort_order: 10
section_title: "Phần 4: Advanced RAG Patterns"
course:
  id: 019c9619-aa05-7005-b005-aa0500000005
  title: "RAG Thực Chiến: Từ Basic đến Advanced"
  slug: rag-thuc-chien
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#38bdf8">🧠 AI &amp; ML — Bài 10</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 11: Agentic RAG — Agent + RAG kết hợp</tspan>
      <tspan x="60" dy="42">sức mạnh</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">RAG Thực Chiến: Từ Basic đến Advanced</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 4: Advanced RAG Patterns</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Agentic RAG: AI Agent điều phối nhiều tools](/storage/uploads/2026/04/rag-bai-11-agentic-rag.webp)

## Giới thiệu

RAG truyền thống là **pipeline cố định**: query → retrieve → generate. Nhưng thực tế, nhiều câu hỏi cần **suy luận nhiều bước**, **tìm từ nhiều nguồn**, hoặc **tự đánh giá** kết quả trước khi trả lời.

> **Ví dụ:** "So sánh chính sách nghỉ phép của công ty mình với luật lao động Việt Nam."
> - Bước 1: Tìm chính sách nội bộ (vector store nội bộ)
> - Bước 2: Tìm luật lao động (web search hoặc vector store luật)
> - Bước 3: So sánh 2 kết quả
> - RAG pipeline cố định KHÔNG LÀM ĐƯỢC! Agent thì CÓ.

Bài này cover:
1. **Tool-calling RAG** — Agent gọi tools: search, calculator, web...
2. **Adaptive RAG** — Tự chọn strategy theo câu hỏi
3. **Self-Reflective RAG (CRAG)** — Tự đánh giá kết quả và retry

---

## 1. Từ Pipeline → Agent

### 1.1 So sánh

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

### 1.2 Khi nào cần Agentic RAG?

| Scenario | Pipeline RAG | Agentic RAG |
|---------|:---:|:---:|
| Q&A đơn giản (1 nguồn) | ✅ | Overkill |
| Multi-source (nội bộ + web) | ❌ | ✅ |
| Multi-step reasoning | ❌ | ✅ |
| Cần tính toán / SQL | ❌ | ✅ |
| Self-correction | ❌ | ✅ |

---

## 2. Tool-Calling RAG

### 2.1 Tạo RAG tool

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

### 2.2 Tạo Agent

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

### 2.3 Multi-source routing

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

> **💡 Bài tập 1:** Tạo agent với 2 tools: (a) search nội bộ, (b) web search. Test 5 câu hỏi đòi hỏi cả 2 nguồn.

---

## 3. Adaptive RAG — Tự chọn Strategy

### 3.1 Router Agent

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

### 3.2 Adaptive Pipeline

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

## 4. Self-Reflective RAG (CRAG)

### 4.1 Ý tưởng

Corrective RAG (CRAG): sau khi retrieve, **đánh giá** kết quả. Nếu không đủ tốt → **retry** với strategy khác.

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

### 4.2 Implementation với LangGraph

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

> **💡 Bài tập 2:** Implement CRAG pipeline. Tạo 10 câu test: 5 câu có đáp án trong vector store, 5 câu KHÔNG CÓ (cần web search). Kiểm tra CRAG có tự fallback web search đúng không.

---

## 5. Multi-Step Reasoning

### 5.1 Decompose complex questions

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

## Tóm tắt

| Concept | Ghi nhớ |
|---------|---------|
| **Agentic RAG** | Agent tự quyết search ở đâu, bao nhiêu lần |
| **Tool-calling** | Agent gọi tools: RAG search, web, SQL, calculator |
| **Adaptive RAG** | Router phân loại → chọn strategy phù hợp |
| **CRAG** | Grade results → fallback web search nếu kém |
| **Multi-step** | Chia câu hỏi phức tạp → nhiều sub-questions |
| **LangGraph** | Framework xây agent workflow dạng graph |

## Bài tập tổng hợp

1. ✅ Hoàn thành 2 bài tập nhỏ (1, 2)
2. **Full Agentic RAG:** Tạo agent với 3+ tools (internal docs, web search, SQL). Test 15 câu hỏi đa dạng. Agent có tự chọn đúng tool không?
3. **CRAG + Multi-step:** Implement CRAG kết hợp multi-step decomposition. Câu hỏi phức tạp → chia bước → search mỗi bước → grade → fallback → answer.
4. **Evaluation:** So sánh answer quality: (a) basic RAG, (b) adaptive RAG, (c) agentic CRAG. Dùng GPT-4 đánh giá 1-10.

> **Bài tiếp theo:** RAG Evaluation — RAGAS, Faithfulness & Relevancy — đo lường chất lượng RAG system một cách khoa học.
