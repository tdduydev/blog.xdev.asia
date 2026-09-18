---
id: 019c9619-ff01-7001-a001-ff0100000001
title: 'Lesson 1: What is RAG? — Architecture, Use Cases & Why RAG is needed'
slug: bai-1-rag-la-gi
description: >-
  What problem does RAG solve: hallucination, knowledge cutoff, domain-specific.
  Architecture Retrieve → Augment → Generate. Compare RAG vs Fine-tuning. The
  simplest "Chat with PDF" demo in 50 lines of code.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 0
section_title: 'Part 1: RAG Platform'
course:
  id: 019c9619-aa05-7005-b005-aa0500000005
  title: 'Real Battle RAG: From Basic to Advanced'
  slug: rag-thuc-chien
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-5521" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-5521)"/>

  <!-- Decorations -->
  <g>
    <circle cx="1018" cy="124" r="16" fill="#fbbf24" opacity="0.09"/>
    <circle cx="936" cy="242" r="20" fill="#fbbf24" opacity="0.13"/>
    <circle cx="854" cy="100" r="24" fill="#fbbf24" opacity="0.07"/>
    <circle cx="772" cy="218" r="28" fill="#fbbf24" opacity="0.11"/>
    <circle cx="690" cy="76" r="32" fill="#fbbf24" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#fbbf24" opacity="0.15"/>
    <line x1="600" y1="164" x2="1100" y2="244" stroke="#fbbf24" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="194" x2="1050" y2="264" stroke="#fbbf24" stroke-width="0.5" opacity="0.08"/>
    <polygon points="997.7749907475932,144.5 997.7749907475932,183.5 964,203 930.2250092524068,183.5 930.2250092524068,144.5 964,125" fill="none" stroke="#fbbf24" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#fbbf24"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="99" height="28" rx="14" fill="#fbbf24" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#fbbf24">🧠 AI & ML — Lesson 0</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 1: What is RAG? — Architecture, Use Cases &</tspan>
      <tspan x="60" dy="42">Why do we need RAG?</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">Real Battle RAG: From Basic to Advanced</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 1: RAG Platform</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![RAG Architecture: Documents → Chunking → Embedding → Vector DB → Retrieval → LLM → Answer](/storage/uploads/2026/04/rag-bai-1-architecture.webp)

## Introduction

Have you ever asked ChatGPT about **your company's rules** and received a... made-up answer? Or ask about events **last week** but AI says "I don't have information after April 2024"?

Those are the 2 biggest problems of LLM:

| Problem | Explanation | Example |
|--------|-----------|-------|
| **Hallucination** | AI "makes up" information without knowing it | Ask about the rules → WHO made up the rules |
| **Knowledge Cutoff** | AI only knows the data up to the time of training | Ask about this week's news → "I don't know" |
| **No Domain Knowledge** | AI doesn't know your private data | Ask about company products → general answer |

**RAG** ​​(Retrieval-Augmented Generation) solves **all 3 problems** by having the LLM "read" your document before responding.

---

## 1. What is RAG?

### 1.1 Main idea

**Normal life example:** Imagine you take an oral exam:

- **No RAG** = Exam **closed book** → only uses knowledge in the head → easy to make mistakes, easy to forget
- **Yes RAG** = **Open book** exam → can look up documents before answering → much more accurate!

RAG = Let the AI ​​"open the book" before answering.

### 1.2 Three steps of RAG

```
User hỏi: "Chính sách nghỉ phép 2026 là gì?"
                                          │
                                          ▼
                    ┌─────────────────────────┐
Step 1: RETRIEVE    │ Tìm tài liệu liên quan  │
(Tìm kiếm)         │ trong knowledge base     │
                    │ → "HR_Policy_2026.pdf"   │
                    │    trang 15-17            │
                    └──────────┬──────────────┘
                               ▼
                    ┌─────────────────────────┐
Step 2: AUGMENT     │ Ghép tài liệu tìm được  │
(Bổ sung)           │ vào prompt cho LLM       │
                    │ → "Dựa trên tài liệu    │
                    │    sau, trả lời câu hỏi" │
                    └──────────┬──────────────┘
                               ▼
                    ┌─────────────────────────┐
Step 3: GENERATE    │ LLM đọc tài liệu        │
(Trả lời)          │ + tạo câu trả lời        │
                    │ → "Theo chính sách 2026, │
                    │    nhân viên được 15 ngày │
                    │    phép/năm..."           │
                    └─────────────────────────┘
```

### 1.3 Why is RAG effective?

| No RAG | Yes RAG |
|-------------|-------|
| AI answers from "memory" (training data) | AI answers from **real documents** |
| You can make it up if you don't know | Citation from specific source |
| Old knowledge (cutoff) | Documents **updated real-time** |
| Don't know private data | Read your **private data** |

---

## 2. Detailed RAG architecture

### 2.1 Two stages: Indexing & Querying

```
=== GIAI ĐOẠN 1: INDEXING (làm 1 lần, offline) ===

Tài liệu gốc     →    Chunking    →    Embedding    →    Vector DB
[PDF, DOCX, Web]     [Chia nhỏ]      [Text → Vector]    [Lưu trữ]

company_policy.pdf → Chunk 1: 300 từ → [0.23, -0.15, ...] → ChromaDB
                     Chunk 2: 300 từ → [0.45, 0.22, ...]
                     Chunk 3: 300 từ → [-0.11, 0.67, ...]


=== GIAI ĐOẠN 2: QUERYING (mỗi câu hỏi, real-time) ===

Câu hỏi user → Embedding → Similarity Search → Top-K chunks → LLM → Answer
"Nghỉ phép              tìm chunks               ghép vào      trả lời
 bao nhiêu?"            gần nhất                  prompt        từ tài liệu
```

### 2.2 Step-by-step explanation

**Step 1 — Chunking:** Divide the document into small paragraphs (~300-500 words). Why? Because LLM has a limited context window, small fragments are easier to search accurately.

**Step 2 — Embedding:** Turn text into **vector** (number sequence). Text segments with similar meanings will have vectors **close to each other** in high-dimensional space.

```python
# "Chính sách nghỉ phép" → [0.23, -0.15, 0.87, ...]
# "Quy định ngày phép"   → [0.25, -0.12, 0.85, ...]  ← rất gần!
# "Lương thưởng"         → [-0.45, 0.55, 0.12, ...]  ← rất xa
```

**Step 3 — Similarity Search:** When the user asks, embedding the question → find the chunks with the closest vector → return the top-K most related chunks (usually K=3-5).

**Step 4 — Generate:** Combine chunks into prompt, send to LLM:

```
System: Trả lời câu hỏi dựa trên context được cung cấp.
        Nếu context không chứa câu trả lời, nói "Tôi không
        tìm thấy thông tin trong tài liệu."

Context:
---
[Chunk 1: "Theo chính sách 2026, nhân viên full-time được
15 ngày phép/năm. Nhân viên trên 5 năm được 18 ngày..."]
[Chunk 2: "Quy trình xin phép: gửi đơn trước 3 ngày..."]
---

User: Nhân viên mới được bao nhiêu ngày nghỉ phép?
```

> **💡 Exercise 2:** Explain RAG to non-tech colleagues using the "library" example: librarian (retriever), related books (context), students (LLM compiles the answer himself). Try writing 3-4 sentences.

---

## 3. Demo: "Chat with PDF" in 50 lines

Here is the **simplest** RAG pipeline — just Python + OpenAI + ChromaDB:

### 3.1 Installation

```bash
pip install openai chromadb langchain langchain-openai \
            langchain-community pypdf
```

### 3.2 Complete code

```python
"""
RAG đơn giản nhất: Chat with PDF
50 dòng code — hiểu toàn bộ flow!
"""
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain.schema.runnable import RunnablePassthrough

# === Bước 1: Load PDF ===
loader = PyPDFLoader("company_policy.pdf")
pages = loader.load()
print(f"Loaded {len(pages)} pages")

# === Bước 2: Chunking ===
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,     # Mỗi chunk ~500 ký tự
    chunk_overlap=50    # Overlap 50 ký tự (tránh cắt giữa câu)
)
chunks = splitter.split_documents(pages)
print(f"Split into {len(chunks)} chunks")

# === Bước 3: Embedding + Store vào Vector DB ===
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vectorstore = Chroma.from_documents(chunks, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# === Bước 4: RAG Chain ===
template = """Trả lời câu hỏi dựa trên context sau.
Nếu không tìm thấy, nói "Tôi không tìm thấy trong tài liệu."
Trích dẫn nguồn (trang số) nếu có thể.

Context:
{context}

Câu hỏi: {question}
"""
prompt = ChatPromptTemplate.from_template(template)
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

rag_chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | llm
)

# === Bước 5: Hỏi! ===
while True:
    question = input("\n❓ Hỏi: ")
    if question.lower() in ["quit", "exit"]:
        break
    answer = rag_chain.invoke(question)
    print(f"\n💬 {answer.content}")
```

### 3.3 Explain flow

```
User: "Nhân viên mới được bao nhiêu ngày phép?"
  ↓
1. Embedding câu hỏi → vector [0.3, -0.1, ...]
  ↓
2. Tìm 3 chunks gần nhất trong ChromaDB
  ↓
3. Ghép chunks vào template prompt
  ↓
4. Gửi cho GPT-4o-mini
  ↓
5. AI đọc chunks + trả lời: "Theo tài liệu trang 15,
   nhân viên mới được 15 ngày phép/năm..."
```

> **Important:** AI answers **based on documents**, not made up! This is RAG's core strength.

> **💡 Exercise 3:** 
> 1. Run the above code with any PDF file (CV, study materials, docs). 
> 2. Ask 5 questions: 3 have answers in PDF, 2 do not → How does AI handle it?
> 3. Try changing `chunk_size=500` into `200` and `1000` — how does the quality change?

---

## 4. RAG vs Fine-tuning — When to use what?

This is the most common question: "Should I use RAG or fine-tune model?"

### 4.1 Detailed comparison table

| Criteria | RAG | Fine-tuning |
|--------|-----|-----------|
| **Purpose** | Add **knowledge** (knowledge) | Changing **behavior** (behavior) |
| **Example** | Reply from company docs | Write according to brand voice |
| **Setup costs** | Low (~$5-50) | High (~$50-500+) |
| **Time** | Few minutes | Hours → days |
| **Update data** | ✅ Real-time updates | ❌ Must re-train |
| **Accuracy** | Cao (cited source) | Moderate (possibly hallucinate) |
| **Scalable** | ✅ Add documents easily | ❌ Difficult to scale |

### 4.2 Decision Framework

```
Câu hỏi quyết định:
                        ┌─ Cần AI biết data MỚI/RIÊNG? → RAG
                        │
Bạn cần gì? ────────── ├─ Cần AI thay đổi PHONG CÁCH/FORMAT? → Fine-tuning
                        │
                        ├─ Cần CẢ HAI? → RAG + Fine-tuning (Hybrid)
                        │
                        └─ Không chắc? → Thử RAG trước (rẻ, nhanh)
```

### 4.3 Practical example

| Math problem | Select | Reason |
|--------|-------|-------|
| Chatbot answers FAQs from 100 blog posts | **RAG** ​​| Knowledge gap — needs separate data |
| AI writes emails in the CEO's voice | **Fine-tuning** | Behavior gap — need to change style |
| AI supports doctors in looking up drugs | **RAG** ​​| Need updated data + source citation |
| AI classifies support tickets | **Fine-tuning** | Task-specific behavior |
| Internal chatbot + brand voice | **Hybrid** | Need both knowledge + own style |

> **Rule of thumb:** If in doubt, **start with RAG**. RAG is cheap, fast, easy to iterate. Fine-tuning only when RAG is not enough.

---

## 5. Most common Use Cases

### 5.1 Business

| Use Case | Description | Data source |
|--------|-------|-----------|
| **Internal Knowledge Bot** | Employees ask about processes and policies | HR docs, SOPs, wiki |
| **Customer Support** | Bot answers from FAQ + product docs | Help center, manuals |
| **Legal Assistant** | Look up laws and contracts | Legal documents, contracts |
| **Sales Enablement** | Find case studies, competitive intel | CRM data, reports |

### 5.2 Personal / Education

| Use Case | Description | Data source |
|--------|-------|-----------|
| **Study Assistant** | "Chat with textbook" — ask textbook questions | PDF books, slides |
| **Research Helper** | Summary of insights from 50+ papers | Arxiv papers |
| **Personal Wiki** | Note-taking + Q&A from notes | Obsidian, Notion |
| **Code Documentation** | Ask about 100K+ line codebase | Source code, docs |

### 5.3 AI Products

| Use Case | Real-life example |
|--------|-------------|
| **Perplexity AI** | Search engine + RAG (search web → reply) |
| **Notion AI** | RAG from your Notion workspace |
| **GitHub Copilot** | RAG from current codebase |
| **ChatGPT + Browse** | RAG from real-time web |

> **💡 Exercise 5:** List 3 RAG use cases for your company/project/school. For each use case, determine: the data source, who the user is, and the success metrics.

---

## 6. Limitations — RAG is not "silver bullet"

| Limitations | Explanation | Solution (learn in the next lesson) |
|-----------|-----------|--------------------------|
| **Garbage in, garbage out** | Bad data → bad RAG | Data cleaning (Lesson 5) |
| **Chunk too small/big** | Lost context or too much noise | Chunking strategies (Lesson 5) |
| **Ambiguous query** | Retriever did not find the correct | Query transformation (Lesson 7) |
| **Lost in the middle** | LLM ignores the context between | Re-ranking (Lesson 8) |
| **Multimodal** | Image/table in PDF removed | Multimodal RAG (Lesson 10) |

---

## Summary

| Concepts | Remember |
|--------|--------|
| **RAG** ​​| Retrieve → Augment → Generate (exam "open book") |
| **Resolved** | Hallucination, knowledge cutoff, domain knowledge |
| **Indexing** | Chunk → Embed → Store (offline, 1 time) |
| **Querying** | Embed query → Search → Augment → Generate (real-time) |
| **vs Fine-tuning** | RAG = more knowledge, Fine-tuning = change behavior |
| **Begins with** | RAG first (cheap, fast, easy to iterate) |

## General exercises

1. ✅ Complete small exercises (2, 3, 5)
2. **Hands-on:** Run the "Chat with PDF" demo in part 3 with real documents. Take a screenshot of the result.
3. **Architecture Diagram:** Redraw the RAG architecture for a specific use case in part 5 (using draw.io or Mermaid).
4. **Research:** Find the 3 most used RAG tools/products in 2026 (hint: LangChain, LlamaIndex, Vercel AI SDK). Compare pros/cons.

> **Next article:** Embedding Models — how to turn text into vector, compare OpenAI vs Cohere vs Open-source, and embedding in Vietnamese.
