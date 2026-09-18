---
id: 019c9619-nv01-p3-l08
title: 'Lesson 8: RAG Agent — Build & Evaluate'
slug: bai-8-rag-agent-build-evaluate
description: >-
  Build RAG Agent: combining retrieval + tools + reasoning.
  Multi-turn conversational RAG.
  Evaluation metrics: faithfulness, relevance, accuracy.
  LLM-as-judge evaluation pattern.
  Assessment prep for DLI S-FX-15.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 8
section_title: "Part 3: LLM Applications & RAG"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'NVIDIA DLI Exam Prep — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="1-from-rag-pipeline-to-rag-agent">1. From RAG Pipeline to RAG Agent</h2>

<h3 id="1-1-han-che-cua-static-rag">1.1. Limitations of Static RAG</h3>

<p>Lesson 7 built a <strong>static RAG pipeline</strong> — retrieve K docs → stuff into prompt → LLM answers. This pipeline works well for simple questions, but has three serious limitations:</p>

<ul>
<li><strong>No reasoning</strong> — the pipeline always retrieves then generates; it doesn't know "should I retrieve?" or "do I need additional steps?"</li>
<li><strong>No tool use</strong> — only one data source (vector store). Cannot call APIs, perform calculations, or do web searches.</li>
<li><strong>Single retrieval</strong> — retrieves exactly once. If results are insufficient → cannot re-retrieve with a different query.</li>
<li><strong>No memory</strong> — each question is processed independently. Cannot remember context from previous questions.</li>
</ul>

<h3 id="1-2-rag-agent-retrieval-as-a-tool">1.2. RAG Agent — Retrieval as a Tool</h3>

<p><strong>RAG Agent</strong> upgrades static RAG by turning retrieval into <em>one of many tools</em> the LLM can choose to use. The agent can:</p>

<ul>
<li><strong>Decide WHEN to retrieve</strong> — if it already knows the answer → no need to retrieve</li>
<li><strong>Choose WHAT tool</strong> — retriever for internal documents, web search for news, calculator for math</li>
<li><strong>Iterative reasoning</strong> — retrieve → realize info is missing → re-retrieve with a different query</li>
<li><strong>Synthesize from multiple sources</strong> — combine results from multiple tools</li>
</ul>

<h3 id="1-3-react-pattern">1.3. ReAct Pattern — Thought → Action → Observation</h3>

<p><strong>ReAct (Reasoning + Acting)</strong> is the most popular pattern for LLM agents. The LLM performs a loop: think (Thought) → choose an action (Action) → observe the result (Observation) → repeat until it has a Final Answer.</p>

<pre><code class="language-text">
ReAct Agent Loop — RAG Agent Decision Flow
══════════════════════════════════════════════════════════════════

  User: "Compare Q3 company revenue with industry average"
       │
       ▼
  ┌─────────────────────────────────────────────────────────┐
  │  THOUGHT: Need 2 pieces of info — internal revenue +   │
  │           industry average                              │
  │  ACTION:  retriever_tool("Q3 company revenue")          │
  └────────────────────────┬────────────────────────────────┘
                           │
                           ▼
  ┌─────────────────────────────────────────────────────────┐
  │  OBSERVATION: "Q3 revenue: 150 billion VND"             │
  │  THOUGHT: Have internal revenue. Need industry avg →    │
  │           web search                                    │
  │  ACTION:  web_search_tool("average revenue Q3 2025      │
  │           tech industry Vietnam")                        │
  └────────────────────────┬────────────────────────────────┘
                           │
                           ▼
  ┌─────────────────────────────────────────────────────────┐
  │  OBSERVATION: "VN tech industry avg Q3: 120 billion"    │
  │  THOUGHT: Have enough data. Need to compare → calculate │
  │  ACTION:  calculator_tool("(150 - 120) / 120 * 100")   │
  └────────────────────────┬────────────────────────────────┘
                           │
                           ▼
  ┌─────────────────────────────────────────────────────────┐
  │  OBSERVATION: "25.0"                                    │
  │  THOUGHT: Have all data. Synthesize the answer.         │
  │  FINAL ANSWER: "Company Q3 revenue (150B) is 25% higher│
  │   than industry average (120B)."                        │
  └─────────────────────────────────────────────────────────┘
</code></pre>

<blockquote><p><strong>Exam tip:</strong> "LLM autonomously decides when to retrieve, when to use other tools" → the answer is <strong>Agent</strong> (not static RAG chain). "Which pattern allows LLM to reason + act iteratively?" → <strong>ReAct</strong>. Key distinction: <strong>Chain</strong> = fixed sequence, <strong>Agent</strong> = dynamic decision.</p></blockquote>

<table>
<thead>
<tr><th>Feature</th><th>Static RAG Chain</th><th>RAG Agent</th></tr>
</thead>
<tbody>
<tr><td>Execution flow</td><td>Fixed: Retrieve → Generate</td><td>Dynamic: LLM decides each step</td></tr>
<tr><td>Tools</td><td>1 retriever only</td><td>Multiple: retriever, search, calc, API...</td></tr>
<tr><td>Reasoning</td><td>None — always retrieves</td><td>ReAct loop: Thought → Action → Observation</td></tr>
<tr><td>Multi-step</td><td>Single retrieval</td><td>Can retrieve multiple times with different queries</td></tr>
<tr><td>Memory</td><td>Stateless</td><td>Can maintain conversation history</td></tr>
<tr><td>Complexity</td><td>Simple, predictable</td><td>Powerful but harder to debug</td></tr>
<tr><td>Latency</td><td>Low (1 LLM call)</td><td>Higher (multiple LLM calls)</td></tr>
<tr><td>Use case</td><td>Simple Q&A over docs</td><td>Complex tasks needing multiple sources</td></tr>
</tbody>
</table>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai8-rag-agent-evaluation.webp" alt="RAG Agent with Evaluation — Agent Loop, Tools, LLM-as-Judge Metrics" loading="lazy" /><figcaption>RAG Agent with Evaluation — Agent Loop, Tools, LLM-as-Judge Metrics</figcaption></figure>

<h2 id="2-build-rag-agent-langchain">2. Build a RAG Agent with LangChain</h2>

<h3 id="2-1-define-tools">2.1. Define Tools</h3>

<p>First step: define the <strong>tools</strong> the agent can use. Each tool has a <strong>name</strong>, <strong>description</strong> (the LLM reads descriptions to decide which tool to use), and a <strong>function</strong>.</p>

<pre><code class="language-python">
from langchain_nvidia_ai_endpoints import ChatNVIDIA, NVIDIAEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain.tools.retriever import create_retriever_tool
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.tools import tool

# === Tool 1: Document Retriever ===
loader = PyPDFLoader("company_docs.pdf")
docs = loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(docs)
embeddings = NVIDIAEmbeddings(model="NV-Embed-QA")
vectorstore = FAISS.from_documents(chunks, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

retriever_tool = create_retriever_tool(
    retriever,
    name="company_docs_search",
    description="Search for information in internal company documents. "
                "Use when the user asks about policies, processes, or HR matters."
)

# === Tool 2: Web Search ===
web_search_tool = TavilySearchResults(
    max_results=3,
    description="Search for information on the internet. "
                "Use when you need recent news, market data, "
                "or information not available in internal documents."
)

# === Tool 3: Calculator ===
@tool
def calculator_tool(expression: str) -> str:
    """Calculate mathematical expressions. Use when you need to compute
    percentages, compare figures, or perform arithmetic."""
    try:
        result = eval(expression)  # Production: use numexpr or sympy
        return str(result)
    except Exception as e:
        return f"Calculation error: {e}"

# Tool list
tools = [retriever_tool, web_search_tool, calculator_tool]
</code></pre>

<blockquote><p><strong>Exam tip:</strong> <strong>Tool description</strong> is critically important — the LLM reads descriptions to decide which tool to use. Vague descriptions → agent picks the wrong tool. The exam may ask: "Agent picks wrong tool, root cause?" → check <strong>tool description</strong>.</p></blockquote>

<h3 id="2-2-create-agent">2.2. Create Agent — Tool Calling Agent</h3>

<p>LangChain provides two ways to create agents: <strong>create_react_agent</strong> (ReAct prompt-based) and <strong>create_tool_calling_agent</strong> (uses native tool calling API). For NVIDIA NIM / OpenAI-compatible models, prefer <strong>tool calling agent</strong>.</p>

<pre><code class="language-python">
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

# LLM with tool calling support
llm = ChatNVIDIA(
    model="meta/llama-3.1-70b-instruct",
    temperature=0.1
)

# Agent prompt — MUST include {agent_scratchpad}
prompt = ChatPromptTemplate.from_messages([
    ("system", """You are an intelligent company assistant. Use tools
to find accurate information. Always cite your sources.
If you can't find the information → clearly state "Information not found."
Never fabricate information."""),
    MessagesPlaceholder(variable_name="chat_history", optional=True),
    ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),
])

# Create agent
agent = create_tool_calling_agent(llm, tools, prompt)

# AgentExecutor: runs the agent loop
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,           # Show ReAct loop
    max_iterations=5,       # Limit iterations (prevent infinite loops!)
    handle_parsing_errors=True,
    return_intermediate_steps=True  # Debug: see which tools were used
)
</code></pre>

<h3 id="2-3-agent-executor-run">2.3. Run Agent</h3>

<pre><code class="language-python">
# === Query 1: Needs retrieval ===
result = agent_executor.invoke({
    "input": "What is the company's leave policy?"
})
print(result["output"])
# Agent will: Thought → use company_docs_search → answer

# === Query 2: Needs web search ===
result = agent_executor.invoke({
    "input": "What is NVIDIA's stock price today?"
})
# Agent will: Thought → use web_search → answer

# === Query 3: Multi-tool ===
result = agent_executor.invoke({
    "input": "Compare Q3 company revenue with the VN tech industry average"
})
# Agent will: retriever → web_search → calculator → synthesize

# === View intermediate steps (debug) ===
for step in result["intermediate_steps"]:
    action, observation = step
    print(f"Tool: {action.tool}")
    print(f"Input: {action.tool_input}")
    print(f"Output: {observation[:100]}...")
    print("---")
</code></pre>

<h3 id="2-4-tool-selection-logic">2.4. Tool Selection Logic</h3>

<p>The LLM selects tools based on <strong>semantic matching</strong> between the user query and tool descriptions. The process:</p>

<pre><code class="language-text">
Tool Selection — How LLM Chooses Tools
═══════════════════════════════════════════════════════

  User Query: "What was the Q3 revenue?"
       │
       ▼
  ┌──────────────────────────────────────────────────┐
  │  LLM reads tool descriptions:                    │
  │                                                  │
  │  1. company_docs_search:                         │
  │     "Search internal company documents.           │
  │      Use for policies, processes..."              │
  │     → Relevance: HIGH ✅ (internal + figures)     │
  │                                                  │
  │  2. web_search:                                  │
  │     "Search the internet. Use for news,           │
  │      market data..."                              │
  │     → Relevance: MEDIUM (might need if not        │
  │       found in docs)                              │
  │                                                  │
  │  3. calculator:                                  │
  │     "Calculate mathematical expressions..."       │
  │     → Relevance: LOW (no calculation needed yet)  │
  └──────────────────────┬───────────────────────────┘
                         │
                         ▼
          Selected: company_docs_search ✅
</code></pre>

<blockquote><p><strong>Exam tip:</strong> "Agent calls the wrong tool" → check if <strong>the tool description is clear enough</strong>. "Agent calls tools too many times (infinite loop)" → set <strong>max_iterations</strong>. Two most important AgentExecutor parameters: <strong>max_iterations</strong> (default 15, should limit to 5-10) and <strong>handle_parsing_errors=True</strong>.</p></blockquote>

<h2 id="3-multi-turn-conversational-rag">3. Multi-turn Conversational RAG</h2>

<h3 id="3-1-van-de-khong-co-memory">3.1. The Problem: No Memory</h3>

<p>Static RAG pipelines process each query independently. When the user asks a follow-up, the pipeline can't understand the context:</p>

<pre><code class="language-text">
The Problem Without Chat History
═══════════════════════════════════════════════

  User:  "What is the leave policy?"
  Bot:   "Employees get 12 days/year..."        ✅

  User:  "What about sick leave?"        ← follow-up
  Bot:   ???                              ← "sick leave" lacks context
                                            Retriever searches "sick leave"
                                            → may miss relevant docs

  User:  "Is it paid?"                   ← "is" and "paid" → what?
  Bot:   ???                              ← Context completely lost
</code></pre>

<h3 id="3-2-contextualize-question">3.2. Contextualize Question — Rewrite Based on History</h3>

<p>Solution: before retrieving, <strong>rewrite the question</strong> to include context from conversation history. "What about sick leave?" → "What is the company's sick leave policy? Is it paid?"</p>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain.chains import create_history_aware_retriever

# Prompt to rewrite question based on chat history
contextualize_q_prompt = ChatPromptTemplate.from_messages([
    ("system", """Given the conversation history and the latest question,
rewrite the question as a standalone question that can be understood
without the previous context.
Do NOT answer the question — only rewrite if needed, or keep as-is."""),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])

llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct", temperature=0.1)

# History-aware retriever: rewrite query → retrieve
history_aware_retriever = create_history_aware_retriever(
    llm, retriever, contextualize_q_prompt
)
</code></pre>

<h3 id="3-3-conversational-rag-chain">3.3. Full Conversational RAG Chain</h3>

<pre><code class="language-python">
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.messages import HumanMessage, AIMessage

# QA prompt
qa_prompt = ChatPromptTemplate.from_messages([
    ("system", """You are an AI assistant. Answer based on the provided context.
If not found → say "Not found in the documents."

Context:
{context}"""),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])

# Chain: stuff documents
question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)

# Full conversational RAG chain
rag_chain = create_retrieval_chain(
    history_aware_retriever, question_answer_chain
)

# === Multi-turn conversation ===
chat_history = []

# Turn 1
response1 = rag_chain.invoke({
    "input": "What is the leave policy?",
    "chat_history": chat_history
})
print(response1["answer"])
# → "Employees get 12 days of leave per year..."

chat_history.extend([
    HumanMessage(content="What is the leave policy?"),
    AIMessage(content=response1["answer"])
])

# Turn 2 — follow-up
response2 = rag_chain.invoke({
    "input": "What about sick leave?",
    "chat_history": chat_history
})
print(response2["answer"])
# Question rewritten to: "What is the company's sick leave policy?"
# → More accurate retrieval!
</code></pre>

<h3 id="3-4-runnablewithmessagehistory">3.4. Auto-manage History: RunnableWithMessageHistory</h3>

<pre><code class="language-python">
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

# Store session histories
session_store = {}

def get_session_history(session_id: str):
    if session_id not in session_store:
        session_store[session_id] = ChatMessageHistory()
    return session_store[session_id]

# Wrap chain with message history management
conversational_rag = RunnableWithMessageHistory(
    rag_chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="chat_history",
    output_messages_key="answer",
)

# Usage — history is automatically managed by session_id
config = {"configurable": {"session_id": "user-123"}}

r1 = conversational_rag.invoke(
    {"input": "What is the leave policy?"},
    config=config
)
# Automatically saves history

r2 = conversational_rag.invoke(
    {"input": "What about sick leave?"},        # automatically rewrites based on history
    config=config
)
</code></pre>

<pre><code class="language-text">
Multi-turn Conversational RAG Flow
════════════════════════════════════════════════════════════════════

  User: "What is the leave policy?"     session_id: "user-123"
       │
       ▼
  ┌──────────────────┐     History: []  (empty)
  │ Contextualize Q  │───► Standalone: "What is the leave policy?"
  └────────┬─────────┘     (kept as-is, no rewrite needed)
           │
           ▼
  ┌──────────────────┐
  │  Retriever       │───► 4 chunks about leave policy
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐
  │  LLM Generate    │───► "Employees get 12 days/year..."
  └────────┬─────────┘
           │
           ▼
  Save to History: [Human: "What is...", AI: "Employees..."]

  ─────────────────────────────────────────────────────────────

  User: "What about sick leave?"        session_id: "user-123"
       │
       ▼
  ┌──────────────────┐     History: [leave policy Q&A]
  │ Contextualize Q  │───► Rewrite: "What is the company's
  └────────┬─────────┘              sick leave policy?"
           │
           ▼
  ┌──────────────────┐
  │  Retriever       │───► Searches with rewritten query → more accurate!
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐
  │  LLM Generate    │───► "Sick leave: up to 30 days/year..."
  └──────────────────┘
</code></pre>

<blockquote><p><strong>Exam tip:</strong> "User asks a follow-up but retriever returns wrong results" → missing <strong>history-aware retriever</strong> (need to contextualize the question before retrieval). "Managing multi-session chat history" → <strong>RunnableWithMessageHistory</strong> + session_id. DLI exam may ask the role of the <strong>contextualize prompt</strong> — always emphasize: rewrite as a standalone question, do NOT answer.</p></blockquote>

<h2 id="4-evaluation-metrics-rag">4. Evaluation Metrics for RAG</h2>

<h3 id="4-1-tai-sao-can-evaluation">4.1. Why Do We Need Evaluation?</h3>

<p>"The results look fine" is not enough for production. You need <strong>systematic evaluation</strong> to measure RAG pipeline quality and compare across configurations (chunk size, embedding model, retriever type...).</p>

<h3 id="4-2-bon-metrics-chinh">4.2. Four Key Metrics</h3>

<table>
<thead>
<tr><th>Metric</th><th>What Does It Measure?</th><th>How It's Calculated</th><th>Acceptable Threshold</th></tr>
</thead>
<tbody>
<tr><td><strong>Faithfulness</strong></td><td>Does the answer "fabricate"? Are all claims in the answer present in the context?</td><td>Split answer into claims → check each claim against context</td><td>≥ 0.85</td></tr>
<tr><td><strong>Answer Relevance</strong></td><td>Does the answer actually address the question?</td><td>Generate questions from the answer → compare cosine similarity with original question</td><td>≥ 0.80</td></tr>
<tr><td><strong>Context Precision</strong></td><td>Are retrieved docs relevant? (precision)</td><td>How many retrieved docs are actually relevant / total retrieved docs</td><td>≥ 0.75</td></tr>
<tr><td><strong>Context Recall</strong></td><td>Were enough necessary docs retrieved? (recall)</td><td>How many claims in the ground truth can be traced back to retrieved docs</td><td>≥ 0.80</td></tr>
</tbody>
</table>

<pre><code class="language-text">
RAG Evaluation — What Each Metric Measures
════════════════════════════════════════════════════════════════

  Question: "What is the refund policy?"

  Retrieved Context (3 docs):
  ┌─────────────────────────────────────────────────────────┐
  │ Doc 1: "Refund within 30 days with receipt"        ✅   │
  │ Doc 2: "Product must be in original sealed packaging" ✅ │
  │ Doc 3: "This week's canteen menu"                  ❌   │
  └─────────────────────────────────────────────────────────┘
  Context Precision = 2/3 = 0.67 ← Doc 3 is irrelevant!

  Ground Truth: "Refund within 30 days, need receipt, original seal,
                 contact CS via email"
  Retrieved covers: refund ✅, receipt ✅, seal ✅, email ❌
  Context Recall = 3/4 = 0.75  ← Missing info about email

  Generated Answer: "Refund within 30 days if you have the receipt
                     and the product is still sealed."
  Claims: [30 days ✅, receipt ✅, sealed ✅]
  Faithfulness = 3/3 = 1.0    ← All claims are grounded!

  Does answer address the question? → Yes, but incomplete
  Answer Relevance ≈ 0.85     ← Relevant but missing email detail
</code></pre>

<h3 id="4-3-ragas-framework">4.3. RAGAS Framework</h3>

<p><strong>RAGAS (Retrieval Augmented Generation Assessment)</strong> is the most popular open-source framework for evaluating RAG. RAGAS automatically computes all 4 metrics above without requiring human labels (uses LLM to evaluate).</p>

<pre><code class="language-python">
from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_precision,
    context_recall,
)
from datasets import Dataset

# Prepare evaluation dataset
eval_data = {
    "question": [
        "What is the refund policy?",
        "How many days of leave?"
    ],
    "answer": [
        "Refund within 30 days with receipt.",
        "Employees get 12 days of leave per year."
    ],
    "contexts": [
        ["Refund within 30 days with original receipt.", "Product must be sealed."],
        ["Full-time employees: 12 days leave/year.", "Probation: 1 day/month."]
    ],
    "ground_truth": [
        "Customers can get a refund within 30 days with original receipt and sealed product.",
        "Full-time employees get 12 days leave/year, probation 1 day/month."
    ]
}

dataset = Dataset.from_dict(eval_data)

# Evaluate!
results = evaluate(
    dataset,
    metrics=[faithfulness, answer_relevancy, context_precision, context_recall],
)

print(results)
# {'faithfulness': 0.95, 'answer_relevancy': 0.88,
#  'context_precision': 0.83, 'context_recall': 0.75}

# Convert to pandas for detailed analysis
df = results.to_pandas()
print(df)
</code></pre>

<blockquote><p><strong>Exam tip:</strong> "Answer contains information not in retrieved context" → <strong>low Faithfulness</strong>. "Retrieved docs aren't relevant to the question" → <strong>low Context Precision</strong>. "Answer is correct but doesn't address the question" → <strong>low Answer Relevance</strong>. "Missing important docs" → <strong>low Context Recall</strong>. Most popular RAG evaluation framework → <strong>RAGAS</strong>.</p></blockquote>

<h2 id="5-llm-as-judge">5. LLM-as-Judge Evaluation</h2>

<h3 id="5-1-tai-sao-llm-as-judge">5.1. Why LLM-as-Judge?</h3>

<p>Manual evaluation (human assessment) is accurate but <strong>doesn't scale</strong>: 1000 answers × 3 annotators = 3000 reviews. <strong>LLM-as-Judge</strong> uses a stronger (or same-tier) LLM to automatically evaluate another LLM's output.</p>

<table>
<thead>
<tr><th>Evaluation Method</th><th>Pros</th><th>Cons</th></tr>
</thead>
<tbody>
<tr><td><strong>Human evaluation</strong></td><td>Gold standard, nuanced</td><td>Expensive, slow, not scalable</td></tr>
<tr><td><strong>Automatic metrics</strong> (BLEU, ROUGE)</td><td>Fast, cheap, reproducible</td><td>Doesn't capture semantic quality</td></tr>
<tr><td><strong>LLM-as-Judge</strong></td><td>Scalable, captures semantics</td><td>Bias, cost of judge LLM, imperfect</td></tr>
<tr><td><strong>RAGAS (LLM-based)</strong></td><td>Automated, multi-metric</td><td>Depends on judge LLM quality</td></tr>
</tbody>
</table>

<h3 id="5-2-evaluation-prompt-template">5.2. Evaluation Prompt Template</h3>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

# Faithfulness evaluator prompt
faithfulness_eval_prompt = ChatPromptTemplate.from_template("""
You are an impartial judge evaluating the faithfulness of an AI answer.

**Faithfulness** means every claim in the answer must be supported by
the provided context. The answer should NOT contain information
that cannot be traced back to the context.

**Context:**
{context}

**Question:**
{question}

**Answer to evaluate:**
{answer}

Evaluate step by step:
1. List all claims made in the answer.
2. For each claim, check if it is supported by the context.
3. Count supported claims vs total claims.

Respond in JSON format:
{{
  "claims": [
    {{"claim": "...", "supported": true/false, "evidence": "..."}}
  ],
  "faithfulness_score": <float 0.0 to 1.0>,
  "reasoning": "..."
}}
""")

# Judge LLM — use the strongest model available
judge_llm = ChatNVIDIA(
    model="meta/llama-3.1-70b-instruct",
    temperature=0.0           # temperature=0 for consistent evaluation
)

faithfulness_chain = faithfulness_eval_prompt | judge_llm | JsonOutputParser()

# Evaluate a response
eval_result = faithfulness_chain.invoke({
    "context": "The company offers refunds within 30 days with original receipt.",
    "question": "What is the refund policy?",
    "answer": "Refund within 30 days with receipt. Contact CS via email."
})

print(eval_result)
# {
#   "claims": [
#     {"claim": "Refund within 30 days", "supported": true, ...},
#     {"claim": "need receipt", "supported": true, ...},
#     {"claim": "Contact CS via email", "supported": false, ...}  ← hallucination!
#   ],
#   "faithfulness_score": 0.67,
#   "reasoning": "2/3 claims supported. 'Contact CS via email' not in context."
# }
</code></pre>

<h3 id="5-3-pairwise-comparison">5.3. Pairwise Comparison — Comparing A vs B</h3>

<p>Instead of absolute scoring, <strong>pairwise</strong> comparison evaluates two outputs and picks the better one. This method is less prone to bias than absolute scoring.</p>

<pre><code class="language-python">
pairwise_prompt = ChatPromptTemplate.from_template("""
You are comparing two AI responses to the same question.

**Question:** {question}
**Context:** {context}

**Response A:**
{response_a}

**Response B:**
{response_b}

Compare on these criteria:
1. Faithfulness: grounded in context?
2. Completeness: covers all relevant info?
3. Clarity: well-structured and easy to understand?

Choose the better response. Respond in JSON:
{{
  "winner": "A" or "B" or "TIE",
  "criteria_scores": {{
    "faithfulness": {{"A": <1-5>, "B": <1-5>}},
    "completeness": {{"A": <1-5>, "B": <1-5>}},
    "clarity": {{"A": <1-5>, "B": <1-5>}}
  }},
  "reasoning": "..."
}}
""")

pairwise_chain = pairwise_prompt | judge_llm | JsonOutputParser()
</code></pre>

<h3 id="5-4-limitations-llm-judge">5.4. Limitations of LLM-as-Judge</h3>

<ul>
<li><strong>Verbosity bias</strong> — LLM judges tend to rate longer outputs higher, even if a shorter answer is better</li>
<li><strong>Positional bias</strong> — in pairwise evaluation, tends to prefer the first output (A > B). Fix: evaluate twice and swap A↔B positions</li>
<li><strong>Self-enhancement bias</strong> — LLM judge favors its own outputs. Use a different model as judge</li>
<li><strong>Limited reasoning</strong> — judge may miss subtle errors in specialized domains (medical, legal)</li>
</ul>

<pre><code class="language-text">
Mitigate LLM-as-Judge Bias
══════════════════════════════════════════

  Positional Bias Fix:
  ┌──────────────────────────────┐
  │  Round 1: A first, B second  │──► Winner round 1: A
  │  Round 2: B first, A second  │──► Winner round 2: A
  │  Final: Consistent → A wins  │
  │  (If inconsistent → TIE)     │
  └──────────────────────────────┘

  Verbosity Bias Fix:
  ┌──────────────────────────────┐
  │  Prompt: "Evaluate based on  │
  │  accuracy and conciseness.   │
  │  Longer ≠ better."           │
  └──────────────────────────────┘
</code></pre>

<blockquote><p><strong>Exam tip:</strong> "Evaluate LLM output at scale" → <strong>LLM-as-Judge</strong>. "LLM judge prefers longer answers" → <strong>verbosity bias</strong>. "LLM judge prefers the first option in a pair" → <strong>positional bias</strong>. Fix positional bias → <strong>swap positions and average</strong>. DLI exam often asks: "Which evaluation method scales best?" → LLM-as-Judge (not human evaluation).</p></blockquote>

<h2 id="6-assessment-prep-dli-sfx15">6. Assessment Prep — DLI S-FX-15</h2>

<h3 id="6-1-sfx15-overview">6.1. S-FX-15 Assessment Overview</h3>

<p>Course <strong>S-FX-15: "Generative AI with Diffusion Models and Large Language Models"</strong> concludes with a <strong>hands-on assessment</strong> in a Jupyter notebook. You need to complete coding tasks within a time limit.</p>

<table>
<thead>
<tr><th>Aspect</th><th>Detail</th></tr>
</thead>
<tbody>
<tr><td><strong>Format</strong></td><td>Jupyter notebook — fill in code cells, run tests</td></tr>
<tr><td><strong>Duration</strong></td><td>~2 hours (within the lab session)</td></tr>
<tr><td><strong>Passing</strong></td><td>Complete all required cells + correct output</td></tr>
<tr><td><strong>Tools available</strong></td><td>Course notebooks, NVIDIA docs (within DLI environment)</td></tr>
<tr><td><strong>Retake</strong></td><td>Retakes allowed if you fail (per DLI policy)</td></tr>
</tbody>
</table>

<h3 id="6-2-key-areas">6.2. Key Areas Covered</h3>

<p>Assessment S-FX-15 covers key areas from all three parts of the course:</p>

<table>
<thead>
<tr><th>Part</th><th>Key Topics</th><th>Likely Assessment Tasks</th></tr>
</thead>
<tbody>
<tr><td><strong>Part 1</strong>: Generative AI Fundamentals</td><td>Diffusion models, VAE, GAN</td><td>Configure diffusion pipeline, generate images</td></tr>
<tr><td><strong>Part 2</strong>: LLM Core</td><td>Transformer, tokenizer, PEFT, inference</td><td>Load model, tokenize, LoRA fine-tuning, inference params</td></tr>
<tr><td><strong>Part 3</strong>: RAG & Applications</td><td>RAG pipeline, agent, evaluation</td><td>Build RAG, implement evaluation, add guardrails</td></tr>
</tbody>
</table>

<h3 id="6-3-time-management">6.3. Time Management Strategy</h3>

<pre><code class="language-text">
S-FX-15 Time Management
════════════════════════════════════════════

  Total: ~120 minutes

  ┌─────────────────────────────────────┐
  │  0-10 min: Read entire notebook     │ ← DON'T code right away!
  │            Mark easy/hard cells     │
  │            Identify dependencies    │
  └─────────────────────────────────────┘
  ┌─────────────────────────────────────┐
  │  10-50 min: Do easy cells first     │ ← Quick wins first
  │             Import, setup, config   │
  │             Straightforward tasks   │
  └─────────────────────────────────────┘
  ┌─────────────────────────────────────┐
  │  50-100 min: Hard cells             │ ← RAG pipeline, eval
  │              Multi-step tasks       │
  │              Debug if needed        │
  └─────────────────────────────────────┘
  ┌─────────────────────────────────────┐
  │  100-120 min: Review & fix          │ ← Run ALL cells top-down
  │               Check outputs match   │
  │               Fix any errors        │
  └─────────────────────────────────────┘
</code></pre>

<h3 id="6-4-common-mistakes">6.4. Common Mistakes — Avoid These</h3>

<table>
<thead>
<tr><th>Mistake</th><th>Consequence</th><th>Fix</th></tr>
</thead>
<tbody>
<tr><td>Forgetting <code>chunk_overlap</code> when chunking</td><td>Context cut at boundaries → poor answers</td><td>Always set overlap = 10-20% of chunk_size</td></tr>
<tr><td>Using different embedding models for retriever vs ingestion</td><td>Dimension mismatch → crash</td><td>Same model for both embedding and retrieval</td></tr>
<tr><td>Not setting <code>temperature=0</code> for evaluation</td><td>Evaluation results not reproducible</td><td>Evaluation tasks: <code>temperature=0</code></td></tr>
<tr><td>Agent infinite loop</td><td>Timeout, cell fails</td><td>Set <code>max_iterations=5</code></td></tr>
<tr><td>Forgetting <code>handle_parsing_errors=True</code></td><td>Agent crashes when LLM returns wrong format</td><td>Always enable this flag</td></tr>
<tr><td>Not formatting context properly in RAG prompt</td><td>LLM ignores context → hallucinates</td><td>Clearly separate <code>{context}</code> in prompt template</td></tr>
<tr><td>Running cells out of order</td><td>Variable undefined errors</td><td>Run top-down, or "Restart & Run All"</td></tr>
<tr><td>Forgetting to install packages</td><td>Import errors</td><td>Run <code>!pip install</code> cell first</td></tr>
</tbody>
</table>

<h3 id="6-5-tips-passing">6.5. Tips for Passing</h3>

<ul>
<li><strong>Read instructions carefully</strong> — each cell usually has comments indicating the TODO. Read thoroughly before coding.</li>
<li><strong>Course notebooks are your reference</strong> — assessment tasks are usually variations of course exercises. Refer to completed notebooks.</li>
<li><strong>NVIDIA API patterns</strong> — remember how to import and initialize: <code>ChatNVIDIA(model=...)</code>, <code>NVIDIAEmbeddings(model=...)</code>.</li>
<li><strong>Test each cell</strong> — run the cell right after writing it, don't wait until you've finished everything.</li>
<li><strong>Output format matters</strong> — if the instructions require returning a dict → return a dict, not a string.</li>
</ul>

<blockquote><p><strong>Exam tip:</strong> Assessment S-FX-15 focuses heavily on <strong>hands-on coding</strong>, not multiple choice. Prioritize reviewing: <strong>RAG pipeline setup</strong> (almost always on the exam), <strong>PEFT/LoRA configuration</strong>, <strong>diffusion pipeline</strong>. Reference course notebooks — the assessment usually requires similar tasks but with different data/models.</p></blockquote>

<h2 id="7-cheat-sheet">7. Cheat Sheet</h2>

<table>
<thead>
<tr><th>Concept</th><th>Key Point</th></tr>
</thead>
<tbody>
<tr><td>Static RAG vs Agent</td><td>Chain = fixed flow; Agent = dynamic, LLM decides</td></tr>
<tr><td>ReAct pattern</td><td>Thought → Action → Observation loop</td></tr>
<tr><td>Tool description</td><td>LLM chooses tools based on description — must be clear!</td></tr>
<tr><td>create_tool_calling_agent</td><td>Uses native tool calling API (preferred for NVIDIA NIM)</td></tr>
<tr><td>AgentExecutor max_iterations</td><td>Default 15, should set to 5-10 to prevent infinite loops</td></tr>
<tr><td>handle_parsing_errors</td><td>Always True — prevents crashes when LLM returns wrong format</td></tr>
<tr><td>History-aware retriever</td><td>Rewrites follow-up queries to standalone before retrieval</td></tr>
<tr><td>RunnableWithMessageHistory</td><td>Auto-manages chat history by session_id</td></tr>
<tr><td>Faithfulness</td><td>Is the answer grounded in context? (≥ 0.85)</td></tr>
<tr><td>Answer Relevance</td><td>Does the answer address the question? (≥ 0.80)</td></tr>
<tr><td>Context Precision</td><td>Are retrieved docs relevant? (≥ 0.75)</td></tr>
<tr><td>Context Recall</td><td>Were enough docs retrieved? (≥ 0.80)</td></tr>
<tr><td>RAGAS</td><td>Framework for measuring the 4 metrics above, uses LLM evaluation</td></tr>
<tr><td>LLM-as-Judge</td><td>Uses a strong LLM to evaluate another LLM's output — scalable</td></tr>
<tr><td>Verbosity bias</td><td>Judge prefers longer answers</td></tr>
<tr><td>Positional bias</td><td>Judge prefers first option → swap A↔B then average</td></tr>
<tr><td>S-FX-15 format</td><td>Hands-on Jupyter notebook, ~2h, coding-based</td></tr>
<tr><td>S-FX-15 strategy</td><td>Read all → easy first → hard second → review</td></tr>
</tbody>
</table>

<h2 id="8-practice-questions">8. Practice Questions — Coding</h2>

<p><strong>Q1: Build RAG Agent with Retriever + Web Search</strong></p>
<p>Build a RAG Agent with 2 tools: <code>retriever_tool</code> (search internal documents) and <code>web_search_tool</code> (search the internet). The agent must autonomously decide when to use which tool. Print intermediate steps to see the tool selection logic.</p>

<details>
<summary>Show Answer Q1</summary>

<pre><code class="language-python">
from langchain_nvidia_ai_endpoints import ChatNVIDIA, NVIDIAEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.tools.retriever import create_retriever_tool
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

# === Setup retriever ===
from langchain_core.documents import Document
docs = [
    Document(page_content="Employees get 12 days of leave per year. Probation: 1 day/month.",
             metadata={"source": "hr_policy.pdf"}),
    Document(page_content="Refund within 30 days with original receipt. Product must be sealed.",
             metadata={"source": "refund_policy.pdf"}),
]

embeddings = NVIDIAEmbeddings(model="NV-Embed-QA")
vectorstore = FAISS.from_documents(docs, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

# === Define tools ===
retriever_tool = create_retriever_tool(
    retriever,
    name="internal_docs_search",
    description="Search internal company documents: HR policies, "
                "processes, refunds. Use for internal company questions."
)

web_search_tool = TavilySearchResults(
    max_results=3,
    description="Search the internet. Use when you need external information: "
                "news, stock prices, market data, public information."
)

tools = [retriever_tool, web_search_tool]

# === Create agent ===
llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct", temperature=0.1)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an AI assistant. Use tools to find accurate information. "
               "Cite your sources when answering."),
    ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),
])

agent = create_tool_calling_agent(llm, tools, prompt)
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,
    max_iterations=5,
    handle_parsing_errors=True,
    return_intermediate_steps=True,
)

# === Test: internal question → should use retriever ===
result1 = agent_executor.invoke({"input": "What is the leave policy?"})
print("Answer:", result1["output"])
print("\nTools used:")
for step in result1["intermediate_steps"]:
    print(f"  → {step[0].tool}: {step[0].tool_input}")

# === Test: external question → should use web search ===
result2 = agent_executor.invoke({"input": "NVIDIA stock price today?"})
print("Answer:", result2["output"])
print("\nTools used:")
for step in result2["intermediate_steps"]:
    print(f"  → {step[0].tool}: {step[0].tool_input}")
</code></pre>

<p><strong>Tool selection explained:</strong> The agent reads tool descriptions. "Leave policy" matches "internal company documents, HR policies" → selects <code>internal_docs_search</code>. "NVIDIA stock price" matches "news, stock prices, market data" → selects <code>web_search</code>.</p>
</details>

<p><strong>Q2: Implement History-aware Retriever for Multi-turn RAG</strong></p>
<p>Build a conversational RAG pipeline that understands follow-up questions. Test with a 3-turn conversation: original question → follow-up → another follow-up.</p>

<details>
<summary>Show Answer Q2</summary>

<pre><code class="language-python">
from langchain_nvidia_ai_endpoints import ChatNVIDIA, NVIDIAEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain

# === Setup ===
docs = [
    Document(page_content="Full-time employees: 12 days leave/year. Can carry over max 5 days to next year."),
    Document(page_content="Sick leave: up to 30 days/year with pay. Doctor's note required from day 3."),
    Document(page_content="Maternity leave: 6 months for women, 5 days for men. Per Vietnam labor law."),
]

embeddings = NVIDIAEmbeddings(model="NV-Embed-QA")
vectorstore = FAISS.from_documents(docs, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})
llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct", temperature=0.1)

# === History-aware retriever ===
contextualize_prompt = ChatPromptTemplate.from_messages([
    ("system", "Given the conversation history, rewrite the question as a standalone question. "
               "Do NOT answer, only rewrite."),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])

history_aware_retriever = create_history_aware_retriever(
    llm, retriever, contextualize_prompt
)

# === QA chain ===
qa_prompt = ChatPromptTemplate.from_messages([
    ("system", "Answer based on context. If not found → say so.\n\n"
               "Context:\n{context}"),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])

qa_chain = create_stuff_documents_chain(llm, qa_prompt)
rag_chain = create_retrieval_chain(history_aware_retriever, qa_chain)

# === 3-turn conversation ===
chat_history = []

# Turn 1
r1 = rag_chain.invoke({"input": "What is the leave policy?", "chat_history": chat_history})
print(f"Turn 1: {r1['answer']}")
chat_history.extend([
    HumanMessage(content="What is the leave policy?"),
    AIMessage(content=r1["answer"])
])

# Turn 2 — follow-up
r2 = rag_chain.invoke({"input": "What about sick leave?", "chat_history": chat_history})
print(f"Turn 2: {r2['answer']}")
# "What about sick leave?" → rewrite: "What is the company's sick leave policy?"
chat_history.extend([
    HumanMessage(content="What about sick leave?"),
    AIMessage(content=r2["answer"])
])

# Turn 3 — another follow-up
r3 = rag_chain.invoke({"input": "Do I need any documents?", "chat_history": chat_history})
print(f"Turn 3: {r3['answer']}")
# "Do I need any documents?" → rewrite: "What documents are needed for sick leave?"
</code></pre>
</details>

<p><strong>Q3: Calculate Faithfulness Score</strong></p>
<p>Implement a <code>calculate_faithfulness()</code> function that takes <code>context</code> and <code>answer</code>, uses an LLM to split the answer into claims, checks each claim against context, and returns a faithfulness score [0.0 - 1.0].</p>

<details>
<summary>Show Answer Q3</summary>

<pre><code class="language-python">
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

def calculate_faithfulness(context: str, answer: str) -> dict:
    """
    Calculate faithfulness score: fraction of claims in answer
    that are supported by context.
    Returns: {"score": float, "claims": list, "reasoning": str}
    """
    llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct", temperature=0.0)

    prompt = ChatPromptTemplate.from_template("""
Analyze the faithfulness of the answer given the context.

Context:
{context}

Answer:
{answer}

Steps:
1. Break the answer into individual factual claims.
2. For each claim, determine if it is supported by the context.
3. Calculate: faithfulness_score = supported_claims / total_claims

Return JSON:
{{
  "claims": [
    {{"text": "claim text", "supported": true, "evidence": "quote from context"}},
    {{"text": "claim text", "supported": false, "evidence": "not found"}}
  ],
  "supported_count": <int>,
  "total_count": <int>,
  "score": <float 0.0-1.0>,
  "reasoning": "summary"
}}
""")

    chain = prompt | llm | JsonOutputParser()
    result = chain.invoke({"context": context, "answer": answer})
    return result


# === Test ===
context = (
    "Company ABC offers refunds within 30 days from purchase date. "
    "Customers must present the original receipt. "
    "Product must still be sealed and unused."
)
answer = (
    "Company ABC offers refunds within 30 days with receipt. "
    "Product must be sealed. "
    "Call hotline 1900-xxxx for support."  # ← NOT in context!
)

result = calculate_faithfulness(context, answer)
print(f"Faithfulness Score: {result['score']}")
# Expected: ~0.67 (2/3 claims supported)
for claim in result["claims"]:
    status = "✅" if claim["supported"] else "❌"
    print(f"  {status} {claim['text']}")
</code></pre>
</details>

<p><strong>Q4: Implement LLM-as-Judge Evaluator with Structured Rubric</strong></p>
<p>Build an evaluator using the LLM-as-Judge pattern with a rubric containing 3 criteria: <strong>Faithfulness</strong> (1-5), <strong>Completeness</strong> (1-5), <strong>Clarity</strong> (1-5). The evaluator takes question, context, answer and returns scores + reasoning. Also implement <strong>pairwise comparison</strong> with position swapping to reduce positional bias.</p>

<details>
<summary>Show Answer Q4</summary>

<pre><code class="language-python">
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

judge_llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct", temperature=0.0)

# === Part A: Single response evaluation ===
single_eval_prompt = ChatPromptTemplate.from_template("""
You are an expert evaluator. Score the AI response on a 1-5 scale.

**Question:** {question}
**Context:** {context}
**Response:** {response}

**Rubric:**
- Faithfulness (1-5): Is every claim supported by context? 5 = all claims grounded.
- Completeness (1-5): Does it cover all relevant info from context? 5 = comprehensive.
- Clarity (1-5): Well-structured and easy to understand? 5 = excellent.

Return JSON:
{{
  "scores": {{
    "faithfulness": <1-5>,
    "completeness": <1-5>,
    "clarity": <1-5>
  }},
  "overall": <float, average of 3 scores>,
  "reasoning": "..."
}}
""")

single_eval_chain = single_eval_prompt | judge_llm | JsonOutputParser()

# === Part B: Pairwise with positional bias mitigation ===
pairwise_prompt = ChatPromptTemplate.from_template("""
Compare two responses. Which is better overall?

**Question:** {question}
**Context:** {context}

**Response 1:**
{response_1}

**Response 2:**
{response_2}

Return JSON:
{{
  "winner": "1" or "2" or "TIE",
  "scores_1": {{"faithfulness": <1-5>, "completeness": <1-5>, "clarity": <1-5>}},
  "scores_2": {{"faithfulness": <1-5>, "completeness": <1-5>, "clarity": <1-5>}},
  "reasoning": "..."
}}
""")

pairwise_chain = pairwise_prompt | judge_llm | JsonOutputParser()


def pairwise_eval_debiased(question, context, resp_a, resp_b):
    """Pairwise eval with positional bias mitigation: evaluate twice, swap order."""

    # Round 1: A first
    r1 = pairwise_chain.invoke({
        "question": question, "context": context,
        "response_1": resp_a, "response_2": resp_b
    })

    # Round 2: B first (swapped)
    r2 = pairwise_chain.invoke({
        "question": question, "context": context,
        "response_1": resp_b, "response_2": resp_a
    })

    # Normalize: map r2 winner back
    r2_winner_mapped = {"1": "2", "2": "1", "TIE": "TIE"}[r2["winner"]]

    # Determine final winner
    if r1["winner"] == r2_winner_mapped:
        final_winner = r1["winner"]  # Consistent → confident
        confidence = "HIGH"
    else:
        final_winner = "TIE"         # Inconsistent → likely positional bias
        confidence = "LOW (positional bias detected)"

    return {
        "final_winner": f"Response {'A' if final_winner == '1' else 'B' if final_winner == '2' else 'TIE'}",
        "confidence": confidence,
        "round1": r1,
        "round2_swapped": r2,
    }


# === Test ===
question = "What is the refund policy?"
context = "Refund within 30 days with receipt. Product must be sealed."
resp_a = "Refund within 30 days with receipt and sealed product."
resp_b = "The company supports refunds. Contact the hotline for details."

# Single eval
score_a = single_eval_chain.invoke({
    "question": question, "context": context, "response": resp_a
})
print(f"Response A overall: {score_a['overall']}")

# Pairwise (debiased)
comparison = pairwise_eval_debiased(question, context, resp_a, resp_b)
print(f"Winner: {comparison['final_winner']} ({comparison['confidence']})")
</code></pre>
</details>

<p><strong>Q5: Debug — Agent Infinite Loop</strong></p>
<p>The code below has bugs: the agent continuously calls tools and never stops (infinite loop). Find the root causes and fix them. Hint: check <code>max_iterations</code> and <code>handle_parsing_errors</code>.</p>

<pre><code class="language-python">
# BUG CODE — find and fix the issues
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct", temperature=0.9)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("human", "{input}"),
    # BUG: missing agent_scratchpad!
])

agent = create_tool_calling_agent(llm, tools, prompt)

agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,
    # BUG: no max_iterations → default 15, too high
    # BUG: no handle_parsing_errors → crash if parsing fails
)

result = agent_executor.invoke({"input": "Compare Q3 revenue with industry"})
</code></pre>

<details>
<summary>Show Answer Q5</summary>

<pre><code class="language-python">
# FIXED CODE — 4 bugs fixed

llm = ChatNVIDIA(
    model="meta/llama-3.1-70b-instruct",
    temperature=0.1          # FIX 1: low temperature → more stable output
                              # temperature=0.9 → agent too "creative" → picks random tools
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant. Use tools to find accurate information."),
    ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),
    # FIX 2: MUST include agent_scratchpad!
    # This is where LangChain injects Thought/Action/Observation history
    # Missing it → agent can't see tool results → calls tools again endlessly
])

agent = create_tool_calling_agent(llm, tools, prompt)

agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,
    max_iterations=5,            # FIX 3: limit iterations
    handle_parsing_errors=True,  # FIX 4: handle parse errors gracefully
    return_intermediate_steps=True,
)

result = agent_executor.invoke({"input": "Compare Q3 revenue with industry"})

# === Summary of 4 bugs ===
# 1. temperature=0.9 too high → unstable tool selection
# 2. Missing MessagesPlaceholder("agent_scratchpad") → agent can't see
#    observations from tools → calls tools again infinitely (root cause!)
# 3. No max_iterations → runs forever if agent doesn't converge
# 4. No handle_parsing_errors → crashes instead of retrying on parse failures
</code></pre>

<p><strong>Root cause:</strong> Missing <code>agent_scratchpad</code> is the primary issue. This is the placeholder where LangChain injects the Thought/Action/Observation history. Without it → the agent doesn't know it already called a tool → calls it again endlessly. <code>max_iterations</code> is a safety net, and lower <code>temperature</code> helps the agent make more stable decisions.</p>
</details>
