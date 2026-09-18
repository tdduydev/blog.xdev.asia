---
id: 019c9619-nv01-p4-l09
title: '第9課：Agentic AI — 多代理系統'
slug: bai-9-agentic-ai-multi-agent-systems
description: >-
  Agent 抽象層：感知 → 推理 → 行動迴圈。
  認知架構：ReAct、Plan-and-Execute、LATS。
  LangGraph：有狀態的圖形化代理編排。
  多代理系統：監督者、階層式、群集模式。
  建構生產環境的多代理應用程式。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 9
section_title: "第4部分：Agentic AI與LLM客製化"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'NVIDIA DLI 考試準備 — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="1-agent-abstraction">1. Agent 抽象層 — LLM + 記憶 + 工具 + 規劃</h2>

<h3 id="1-1-agent-la-gi">1.1. 什麼是 Agent？</h3>

<p>第 8 課介紹了簡單的 <strong>ReAct agent</strong> — 一個選擇工具然後回答的 LLM。第 9 課擴展到 <strong>Agentic AI</strong>：LLM 作為<strong>中央大腦</strong>的系統 — 自主規劃、選擇工具、回應結果，並與其他代理協調。</p>

<p>一個 <strong>Agent</strong> 由 4 個核心元件組成：</p>

<ul>
<li><strong>LLM（大腦）</strong> — 推理、決策、文字生成</li>
<li><strong>記憶</strong> — 短期（對話緩衝區）與長期（向量儲存、資料庫）</li>
<li><strong>工具</strong> — 代理可呼叫的函式：搜尋、計算器、API、程式碼執行</li>
<li><strong>規劃</strong> — 建立計畫、分解任務、發生錯誤時反思</li>
</ul>

<pre><code class="language-text">
Agent Abstraction — Core Components
══════════════════════════════════════════════════════════════

                    ┌──────────────────────┐
                    │       USER           │
                    │   (Task / Query)     │
                    └──────────┬───────────┘
                               │
                               ▼
  ┌────────────────────────────────────────────────────────┐
  │                      AGENT                             │
  │  ┌──────────┐  ┌───────────┐  ┌──────────────────┐    │
  │  │ Planning │  │  LLM Core │  │     Memory       │    │
  │  │          │◄─┤  (Brain)  ├─►│ Short-term: chat │    │
  │  │ Decompose│  │ Reasoning │  │ Long-term: VDB   │    │
  │  │ Reflect  │  │ Decisions │  │ Episodic: logs   │    │
  │  └──────────┘  └─────┬─────┘  └──────────────────┘    │
  │                       │                                │
  │              ┌────────┼────────┐                       │
  │              ▼        ▼        ▼                       │
  │         ┌────────┐┌───────┐┌────────┐                  │
  │         │Search  ││ Code  ││  API   │  ◄── Tools      │
  │         │Engine  ││ Exec  ││ Calls  │                  │
  │         └────────┘└───────┘└────────┘                  │
  └────────────────────────────────────────────────────────┘
</code></pre>

<h3 id="1-2-perception-reasoning-action-loop">1.2. 感知 → 推理 → 行動 → 觀察迴圈</h3>

<p>每個代理都在一個基本迴圈上運行：</p>

<ol>
<li><strong>感知</strong> — 接收輸入（使用者查詢、工具輸出、環境回饋）</li>
<li><strong>推理</strong> — LLM 推理：「接下來該做什麼？用哪個工具？資訊夠了嗎？」</li>
<li><strong>行動</strong> — 執行動作：呼叫工具、生成文字、回答使用者</li>
<li><strong>觀察</strong> — 接收行動的結果，回饋至感知 → 重複</li>
</ol>

<pre><code class="language-text">
Agent Loop — Perception → Reasoning → Action → Observation
═══════════════════════════════════════════════════════════

  ┌──────────────┐     ┌───────────────┐     ┌──────────────┐
  │  PERCEPTION  │────►│   REASONING   │────►│    ACTION     │
  │              │     │               │     │               │
  │ User query   │     │ "Which tool?" │     │ Call tool     │
  │ Tool output  │     │ "Enough info?"│     │ Generate text │
  │ Error msg    │     │ "Need retry?" │     │ Return answer │
  └──────┬───────┘     └───────────────┘     └───────┬───────┘
         ▲                                           │
         │           ┌───────────────┐               │
         └───────────│  OBSERVATION  │◄──────────────┘
                     │               │
                     │ Tool result   │
                     │ Error / OK    │
                     └───────────────┘
         Loop continues until Final Answer
</code></pre>

<h3 id="1-3-levels-of-agency">1.3. 代理能力等級</h3>

<p>並非每個 LLM 應用都需要完整的代理。NVIDIA DLI 區分了不同的<strong>代理能力</strong>等級：</p>

<table>
<thead>
<tr><th>等級</th><th>模式</th><th>LLM 角色</th><th>範例</th></tr>
</thead>
<tbody>
<tr><td>L0 — 無代理能力</td><td>簡單提示 → 回應</td><td>文字生成器</td><td>FAQ 聊天機器人</td></tr>
<tr><td>L1 — 工具使用</td><td>LLM 選擇 1 個工具</td><td>路由器</td><td>Function calling API</td></tr>
<tr><td>L2 — 單一代理</td><td>ReAct 迴圈、多步驟</td><td>規劃者 + 執行者</td><td>RAG Agent（第 8 課）</td></tr>
<tr><td>L3 — 多代理</td><td>多個代理協調</td><td>協調者</td><td>監督者 + 工作者</td></tr>
<tr><td>L4 — 自主式</td><td>自我改進、長時間運行</td><td>自主系統</td><td>AI Scientist、Devin</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試提示：</strong>「LLM 自主分解任務、呼叫多個工具、根據需要重試」→ <strong>Agent（L2+）</strong>。「多個 LLM 協調，每個專精一項任務」→ <strong>Multi-Agent（L3）</strong>。DLI 考試常問：「Agent 與 Chain 有何不同？」→ Agent 具有<strong>動態控制流</strong>（LLM 決定下一步），Chain 具有<strong>固定控制流</strong>。</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai9-multi-agent-system.webp" alt="Multi-Agent System — Orchestrator, Specialized Agents, LangGraph State Machine" loading="lazy" /><figcaption>多代理系統 — 編排器、專業化代理、LangGraph 狀態機</figcaption></figure>

<h2 id="2-cognitive-architectures">2. LLM Agent 的認知架構</h2>

<h3 id="2-1-react">2.1. ReAct — 推理 + 行動</h3>

<p><strong>ReAct</strong>（第 8 課介紹）交替進行<strong>思考</strong>（推理）與<strong>行動</strong>（執行）。優點：簡單、透明。缺點：沒有長期規劃 — 代理只思考<em>下一步</em>，而非全局。</p>

<h3 id="2-2-plan-and-execute">2.2. Plan-and-Execute</h3>

<p><strong>Plan-and-Execute</strong> 明確分離兩個階段：(1) Planner LLM 預先建立完整計畫，(2) Executor LLM 執行每個步驟。每個步驟之後，Planner 可以<strong>重新規劃</strong>（調整計畫）。</p>

<pre><code class="language-text">
Plan-and-Execute Architecture
══════════════════════════════════════════════════════════

  User: "Analyze Q3 revenue, compare with Q2, write a report"
       │
       ▼
  ┌─────────────────────────────────────────────┐
  │  PLANNER LLM                                │
  │  Plan:                                      │
  │    Step 1: Retrieve Q3 revenue data         │
  │    Step 2: Retrieve Q2 revenue data         │
  │    Step 3: Calculate Q2→Q3 change           │
  │    Step 4: Write comparison report          │
  └─────────────────────┬───────────────────────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
     Execute S1    Execute S2    Execute S3 ...
     (retriever)   (retriever)   (calculator)
          │             │             │
          └─────────────┼─────────────┘
                        │
                        ▼
                ┌───────────────┐
                │ REPLAN?       │──► If step fails → adjust plan
                │ All done?     │──► If done → Step 4: report
                └───────────────┘
</code></pre>

<h3 id="2-3-lats">2.3. LATS — Language Agent Tree Search</h3>

<p><strong>LATS</strong> 結合了<strong>蒙特卡羅樹搜尋（MCTS）</strong>與 LLM 推理。不同於 ReAct 只走一條路徑，LATS 探索多個解決方案分支，使用 LLM 評估每個分支，然後選擇最佳路徑。就像 LLM 下棋一樣 — 提前思考好幾步。</p>

<h3 id="2-4-reflexion">2.4. Reflexion — 從錯誤中學習</h3>

<p><strong>Reflexion</strong> 增加了<strong>自我反思</strong>步驟：完成任務後，代理自我評估結果 → 如果錯誤，將「經驗教訓」寫入記憶 → 帶著前次嘗試的經驗重試。這是一種透過自我回饋的<em>上下文學習</em>形式。</p>

<h3 id="2-5-comparison-table">2.5. 認知架構比較</h3>

<table>
<thead>
<tr><th>架構</th><th>規劃</th><th>執行</th><th>優勢</th><th>劣勢</th></tr>
</thead>
<tbody>
<tr><td><strong>ReAct</strong></td><td>逐步（近視的）</td><td>交替思考+行動</td><td>簡單、透明</td><td>無全局規劃，可能迴圈</td></tr>
<tr><td><strong>Plan-and-Execute</strong></td><td>預先完整規劃</td><td>循序執行</td><td>全局視角，LLM 呼叫較少</td><td>執行步驟後計畫可能過時</td></tr>
<tr><td><strong>LATS</strong></td><td>樹搜尋（探索）</td><td>最佳優先搜尋</td><td>探索替代方案，穩健</td><td>非常昂貴（大量 LLM 呼叫）</td></tr>
<tr><td><strong>Reflexion</strong></td><td>試錯 + 記憶</td><td>執行 → 反思 → 重試</td><td>從錯誤中學習</td><td>收斂速度慢，需要評估器</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試提示：</strong>「代理需要在執行前先想好完整計畫」→ <strong>Plan-and-Execute</strong>。「代理嘗試多條解決路徑，選擇最佳」→ <strong>LATS</strong>。「代理自我評估結果並改進」→ <strong>Reflexion</strong>。「代理交替思考與行動」→ <strong>ReAct</strong>。DLI 考試通常聚焦於 <strong>ReAct</strong> 和 <strong>Plan-and-Execute</strong> 作為兩種最廣泛使用的架構。</p></blockquote>

<h2 id="3-langgraph">3. LangGraph — 有狀態的圖形化代理編排</h2>

<h3 id="3-1-tai-sao-langgraph">3.1. 為什麼選擇 LangGraph？</h3>

<p>LangChain 中的 <strong>AgentExecutor</strong>（第 8 課）是「黑盒子」— 難以自訂控制流。<strong>LangGraph</strong> 是一個 LangChain 函式庫，讓你將代理建構為<strong>有向圖</strong>：每個節點是一個處理步驟，邊定義流程，條件邊允許根據狀態進行分支。</p>

<table>
<thead>
<tr><th>特性</th><th>AgentExecutor</th><th>LangGraph</th></tr>
</thead>
<tbody>
<tr><td>控制流</td><td>固定 ReAct 迴圈</td><td>自訂圖形 — 你設計流程</td></tr>
<tr><td>狀態管理</td><td>隱藏的內部狀態</td><td>明確的 <code>TypedDict</code> 狀態</td></tr>
<tr><td>多代理</td><td>無原生支援</td><td>一等支援：每個代理 = 子圖</td></tr>
<tr><td>Human-in-the-loop</td><td>有限</td><td>內建：中斷、批准、編輯</td></tr>
<tr><td>持久化</td><td>無內建</td><td>Checkpointer：儲存/恢復狀態</td></tr>
<tr><td>串流</td><td>基本</td><td>逐事件串流</td></tr>
<tr><td>除錯</td><td>透過 LangSmith 追蹤</td><td>圖形視覺化 + LangSmith</td></tr>
</tbody>
</table>

<h3 id="3-2-core-concepts">3.2. 核心概念 — StateGraph、節點、邊</h3>

<p>LangGraph 建立在 3 個概念之上：</p>

<ul>
<li><strong>State</strong> — 一個 TypedDict，保存所有在節點間傳遞的資料。每個節點讀取/寫入狀態。</li>
<li><strong>Nodes</strong> — Python 函式。輸入：state → 輸出：部分狀態更新（僅需要更新的欄位）。</li>
<li><strong>Edges</strong> — 節點間的連接。<code>add_edge(A, B)</code> = 永遠走 A→B。<code>add_conditional_edges(A, func)</code> = func 決定走向。</li>
</ul>

<pre><code class="language-text">
LangGraph Concepts
══════════════════════════════════════════════════════════

  State = TypedDict(messages, plan, results, ...)
  ────────────────────────────────────────────────

  START ──► [Node: agent]  ──conditional──► [Node: tools]
                 │                              │
                 │  (if done)                   │ (tool result)
                 ▼                              │
               END ◄───────────────────────────┘

  Nodes: Python functions that read/write State
  Edges: Static (always) or Conditional (function decides)
</code></pre>

<h3 id="3-3-code-basic-langgraph-agent">3.3. 程式碼：基本 LangGraph Agent</h3>

<pre><code class="language-python">
from typing import TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain_core.tools import tool
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
import operator

# === 1. Define State ===
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]

# === 2. Define Tools ===
@tool
def search_docs(query: str) -> str:
    """Search internal documents for company information."""
    # Simulate retrieval
    docs = {
        "leave": "Employees get 12 days annual leave per year.",
        "refund": "Refund within 30 days with original receipt.",
    }
    for key, val in docs.items():
        if key in query.lower():
            return val
    return "No relevant documents found."

@tool
def calculator(expression: str) -> str:
    """Calculate mathematical expressions."""
    try:
        return str(eval(expression))  # production: use safe eval
    except Exception as e:
        return f"Error: {e}"

tools = [search_docs, calculator]

# === 3. Define LLM with tools ===
llm = ChatNVIDIA(
    model="meta/llama-3.1-70b-instruct",
    temperature=0.1
).bind_tools(tools)

# === 4. Define Nodes ===
def agent_node(state: AgentState) -> dict:
    """LLM decides: call tool or respond."""
    response = llm.invoke(state["messages"])
    return {"messages": [response]}

tool_node = ToolNode(tools)

# === 5. Define Routing ===
def should_continue(state: AgentState) -> str:
    last_message = state["messages"][-1]
    if last_message.tool_calls:
        return "tools"    # LLM wants to call a tool
    return "end"          # LLM is done, return answer

# === 6. Build Graph ===
graph = StateGraph(AgentState)

graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)

graph.set_entry_point("agent")
graph.add_conditional_edges("agent", should_continue, {
    "tools": "tools",
    "end": END,
})
graph.add_edge("tools", "agent")  # after tool → back to agent

app = graph.compile()

# === 7. Run ===
result = app.invoke({
    "messages": [HumanMessage(content="What is the leave policy?")]
})
print(result["messages"][-1].content)
</code></pre>

<h3 id="3-4-human-in-the-loop">3.4. Human-in-the-Loop</h3>

<p>LangGraph 支援在執行危險操作前<strong>中斷</strong> — 例如發送電子郵件、刪除資料、執行程式碼。代理暫停，等待使用者批准，然後繼續。</p>

<pre><code class="language-python">
from langgraph.checkpoint.memory import MemorySaver

# Compile with checkpointer for interruption + resume
checkpointer = MemorySaver()
app = graph.compile(
    checkpointer=checkpointer,
    interrupt_before=["tools"]   # pause BEFORE executing tools
)

# Run — will pause before the "tools" node
config = {"configurable": {"thread_id": "user-123"}}
result = app.invoke(
    {"messages": [HumanMessage(content="Delete file report.pdf")]},
    config=config,
)

# Inspect pending tool call
pending = result["messages"][-1].tool_calls
print(f"Agent wants to: {pending}")
# → Agent wants to: [{'name': 'delete_file', 'args': {'path': 'report.pdf'}}]

# Human approves → continue
final = app.invoke(None, config=config)  # resume from checkpoint
</code></pre>

<h3 id="3-5-checkpointing">3.5. Checkpointing — 儲存與恢復狀態</h3>

<p><strong>Checkpointer</strong> 在每個節點後儲存狀態，提供以下功能：</p>

<ul>
<li><strong>恢復</strong> — 代理執行中途崩潰 → 載入檢查點 → 繼續</li>
<li><strong>時間旅行</strong> — 回到任何檢查點 → 以不同輸入重試</li>
<li><strong>Human-in-the-loop</strong> — 暫停、等待使用者、恢復（如上所示）</li>
<li><strong>多輪對話</strong> — 跨多輪維護對話歷史</li>
</ul>

<blockquote><p><strong>考試提示：</strong>「建構具有自訂控制流、條件分支的代理」→ <strong>LangGraph</strong>（而非 AgentExecutor）。「暫停代理執行以等待人工批准」→ <strong>interrupt_before + checkpointer</strong>。「儲存代理狀態，稍後恢復」→ <strong>LangGraph checkpointing</strong>。DLI C-FX-25 常問：「為什麼用 LangGraph 而不是 AgentExecutor？」→ <strong>自訂流程、多代理、持久化、Human-in-the-loop</strong>。</p></blockquote>

<h2 id="4-multi-agent-patterns">4. 多代理模式</h2>

<h3 id="4-1-tai-sao-multi-agent">4.1. 為什麼需要多代理？</h3>

<p>單一代理配備 20+ 工具會面臨問題：<strong>工具選擇混淆</strong>（工具太多，LLM 選錯），<strong>提示過長</strong>（必須包含所有指令），<strong>難以除錯</strong>（不清楚代理在哪裡失敗）。多代理透過<strong>分解</strong>來解決：每個代理專精一項任務，配備較少的工具。</p>

<h3 id="4-2-supervisor-pattern">4.2. 監督者模式</h3>

<p>一個<strong>監督者代理</strong>（LLM）從使用者接收任務，委派給<strong>工作者代理</strong>，收集結果，並綜合最終答案。</p>

<pre><code class="language-text">
Supervisor Pattern
══════════════════════════════════════════════════════════

                    ┌──────────────┐
                    │     USER     │
                    └──────┬───────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   SUPERVISOR AGENT     │
              │   (Orchestrator LLM)   │
              │                        │
              │   Decides:             │
              │   • Which worker next? │
              │   • All done?          │
              │   • Need to re-route?  │
              └────┬──────┬──────┬─────┘
                   │      │      │
          ┌────────┘      │      └────────┐
          ▼               ▼               ▼
   ┌─────────────┐┌─────────────┐┌─────────────┐
   │ Researcher  ││   Coder     ││  Reporter   │
   │ Agent       ││   Agent     ││  Agent      │
   │             ││             ││             │
   │ Tools:      ││ Tools:      ││ Tools:      │
   │ • web_search││ • python    ││ • write_doc │
   │ • doc_search││ • shell     ││ • format    │
   └─────────────┘└─────────────┘└─────────────┘
</code></pre>

<h3 id="4-3-hierarchical-pattern">4.3. 階層式模式</h3>

<p><strong>階層式</strong>擴展了監督者模式：每個工作者本身可以是子工作者的監督者。適合複雜的組織結構 — 例如 CEO 代理 → 經理代理 → 專家代理。</p>

<pre><code class="language-text">
Hierarchical Multi-Agent
══════════════════════════════════════════════════════════

              ┌──────────────────────┐
              │   TOP SUPERVISOR     │
              │   (Project Manager)  │
              └───┬─────────────┬────┘
                  │             │
         ┌────────┘             └────────┐
         ▼                               ▼
  ┌──────────────┐                ┌──────────────┐
  │ RESEARCH     │                │ ENGINEERING  │
  │ SUPERVISOR   │                │ SUPERVISOR   │
  └──┬───────┬───┘                └──┬───────┬───┘
     │       │                       │       │
     ▼       ▼                       ▼       ▼
  [Web    [Paper                 [Backend [Frontend
  Searcher] Analyzer]             Dev]     Dev]
</code></pre>

<h3 id="4-4-swarm-pattern">4.4. 群集模式</h3>

<p><strong>Swarm</strong>（OpenAI Swarm 概念）— 無監督者。代理根據上下文互相移交。Agent A 意識到「這個任務屬於 Agent B 的專長」→ 自動移交。</p>

<h3 id="4-5-debate-pattern">4.5. 辯論模式</h3>

<p><strong>Debate</strong> — 兩個或多個代理就一個問題進行辯論。每個代理提出觀點並反駁對方。最後由 Judge 代理選擇最佳結論。此模式提升了複雜問題的推理品質。</p>

<h3 id="4-6-pattern-comparison">4.6. 多代理模式比較</h3>

<table>
<thead>
<tr><th>模式</th><th>控制流</th><th>通訊方式</th><th>最適用場景</th></tr>
</thead>
<tbody>
<tr><td><strong>監督者</strong></td><td>集中式 — 監督者路由</td><td>星形拓撲</td><td>明確的任務委派，中等複雜度</td></tr>
<tr><td><strong>階層式</strong></td><td>多層級監督</td><td>樹狀結構</td><td>複雜組織，多個專業化子團隊</td></tr>
<tr><td><strong>群集</strong></td><td>去中心化 — 代理互相移交</td><td>對等網路</td><td>客戶服務、路由、彈性流程</td></tr>
<tr><td><strong>辯論</strong></td><td>輪流論證</td><td>廣播 + 裁判</td><td>複雜推理、事實驗證</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試提示：</strong>「一個 LLM 將任務路由給專業化代理」→ <strong>監督者</strong>。「代理在無中央控制的情況下互相移交」→ <strong>Swarm</strong>。「多個代理辯論，裁判做決定」→ <strong>辯論</strong>。「巢狀監督者管理子團隊」→ <strong>階層式</strong>。DLI 考試通常聚焦於<strong>監督者模式</strong>，因為它在生產環境中最常見。</p></blockquote>

<h3 id="4-7-code-supervisor-multi-agent">4.7. 程式碼：使用 LangGraph 的監督者多代理系統</h3>

<pre><code class="language-python">
from typing import TypedDict, Annotated, Literal, Sequence
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain_core.tools import tool
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
import operator

# === State ===
class MultiAgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    next_agent: str

# === Worker Tools ===
@tool
def web_search(query: str) -> str:
    """Search the web for current information."""
    return f"[Web Result] Top findings for '{query}': ..."

@tool
def run_python(code: str) -> str:
    """Execute Python code and return output."""
    try:
        exec_globals = {}
        exec(code, exec_globals)
        return str(exec_globals.get("result", "Code executed successfully."))
    except Exception as e:
        return f"Error: {e}"

@tool
def write_report(content: str) -> str:
    """Format content into a professional report."""
    return f"=== REPORT ===\n{content}\n=== END ==="

# === Worker Agents ===
researcher_llm = ChatNVIDIA(
    model="meta/llama-3.1-70b-instruct", temperature=0.1
).bind_tools([web_search])

coder_llm = ChatNVIDIA(
    model="meta/llama-3.1-70b-instruct", temperature=0.0
).bind_tools([run_python])

reporter_llm = ChatNVIDIA(
    model="meta/llama-3.1-70b-instruct", temperature=0.3
).bind_tools([write_report])

# === Supervisor ===
supervisor_llm = ChatNVIDIA(
    model="meta/llama-3.1-70b-instruct", temperature=0.0
)

WORKERS = ["researcher", "coder", "reporter"]

def supervisor_node(state: MultiAgentState) -> dict:
    """Supervisor decides which worker to route to next."""
    system_prompt = f"""You are a supervisor managing these workers: {WORKERS}.
Given the conversation, decide which worker should act next,
or if the task is complete respond with FINISH.
Respond with ONLY the worker name or FINISH."""

    messages = [SystemMessage(content=system_prompt)] + state["messages"]
    response = supervisor_llm.invoke(messages)
    next_agent = response.content.strip().lower()

    if next_agent not in WORKERS:
        next_agent = "FINISH"
    return {"next_agent": next_agent}

def researcher_node(state: MultiAgentState) -> dict:
    system = SystemMessage(content="You are a research specialist. "
        "Use web_search to find information. Be thorough.")
    response = researcher_llm.invoke([system] + state["messages"])
    return {"messages": [response]}

def coder_node(state: MultiAgentState) -> dict:
    system = SystemMessage(content="You are a Python coding specialist. "
        "Use run_python to execute code for analysis and calculations.")
    response = coder_llm.invoke([system] + state["messages"])
    return {"messages": [response]}

def reporter_node(state: MultiAgentState) -> dict:
    system = SystemMessage(content="You are a report writer. "
        "Use write_report to create formatted reports from gathered info.")
    response = reporter_llm.invoke([system] + state["messages"])
    return {"messages": [response]}

# === Routing ===
def route_supervisor(state: MultiAgentState) -> str:
    next_agent = state.get("next_agent", "FINISH")
    if next_agent == "FINISH":
        return "end"
    return next_agent

# === Build Graph ===
graph = StateGraph(MultiAgentState)

graph.add_node("supervisor", supervisor_node)
graph.add_node("researcher", researcher_node)
graph.add_node("coder", coder_node)
graph.add_node("reporter", reporter_node)
graph.add_node("researcher_tools", ToolNode([web_search]))
graph.add_node("coder_tools", ToolNode([run_python]))
graph.add_node("reporter_tools", ToolNode([write_report]))

graph.set_entry_point("supervisor")

# Supervisor routes to workers
graph.add_conditional_edges("supervisor", route_supervisor, {
    "researcher": "researcher",
    "coder": "coder",
    "reporter": "reporter",
    "end": END,
})

# Workers → tool nodes → back to supervisor
for worker in WORKERS:
    def make_router(w):
        def router(state):
            last = state["messages"][-1]
            if hasattr(last, "tool_calls") and last.tool_calls:
                return f"{w}_tools"
            return "supervisor"
        return router
    graph.add_conditional_edges(worker, make_router(worker), {
        f"{worker}_tools": f"{worker}_tools",
        "supervisor": "supervisor",
    })
    graph.add_edge(f"{worker}_tools", worker)

app = graph.compile()

# === Run ===
result = app.invoke({
    "messages": [HumanMessage(
        content="Research NVIDIA H100 GPU specs, calculate price-performance "
                "ratio vs A100, and write a comparison report."
    )],
    "next_agent": "",
})

for msg in result["messages"]:
    print(f"[{msg.type}] {msg.content[:200]}...")
</code></pre>

<h2 id="5-build-production-ready">5. 建構生產環境的多代理應用程式</h2>

<h3 id="5-1-research-assistant">5.1. 研究助手 — 完整範例</h3>

<p>建構一個完整的<strong>研究助手</strong>，包含 3 個代理：<strong>研究者</strong>（尋找資訊）、<strong>程式設計師</strong>（分析資料）、<strong>報告撰寫者</strong>（撰寫報告）。包含錯誤處理、重試邏輯和結構化輸出。</p>

<pre><code class="language-python">
from typing import TypedDict, Annotated, Sequence, Optional
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage, AIMessage
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain_core.tools import tool
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
import operator
import json

# === Enhanced State ===
class ResearchState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    research_data: Optional[str]       # collected research
    analysis_result: Optional[str]     # code analysis output
    final_report: Optional[str]        # formatted report
    current_agent: str
    iteration: int                     # track iterations to prevent loops

MAX_ITERATIONS = 10

# === Tools ===
@tool
def search_arxiv(query: str) -> str:
    """Search academic papers on arxiv for research topics."""
    return json.dumps({
        "papers": [
            {"title": f"Paper on {query}", "abstract": f"Study of {query}...",
             "year": 2025, "citations": 42},
        ]
    })

@tool
def search_web(query: str) -> str:
    """Search the web for current news, blog posts, documentation."""
    return json.dumps({
        "results": [
            {"title": f"Latest news: {query}", "snippet": f"Updated info on {query}..."},
        ]
    })

@tool
def execute_analysis(code: str) -> str:
    """Run Python code for data analysis. Variable 'result' will be returned."""
    exec_globals = {}
    try:
        exec(code, exec_globals)
        return str(exec_globals.get("result", "Executed OK, no 'result' variable."))
    except Exception as e:
        return f"Error: {e}"

@tool
def generate_report(title: str, sections: str) -> str:
    """Generate a formatted markdown report from title and section content."""
    return f"# {title}\n\n{sections}\n\n---\nGenerated by Research Assistant"

# === Agent Nodes ===
base_llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct")

def researcher_node(state: ResearchState) -> dict:
    llm = base_llm.bind_tools([search_arxiv, search_web])
    system = SystemMessage(content=(
        "You are a research specialist. Search for papers and web results "
        "to gather comprehensive information. Summarize findings clearly."
    ))
    response = llm.invoke([system] + list(state["messages"]))

    # If no tool calls, research is done — extract data
    if not response.tool_calls:
        return {
            "messages": [response],
            "research_data": response.content,
            "current_agent": "supervisor",
        }
    return {"messages": [response], "current_agent": "researcher_tools"}

def coder_node(state: ResearchState) -> dict:
    llm = base_llm.bind_tools([execute_analysis])
    context = state.get("research_data", "No research data yet.")
    system = SystemMessage(content=(
        f"You are a data analyst. Use the research data below to perform "
        f"analysis with Python code.\n\nResearch Data:\n{context}"
    ))
    response = llm.invoke([system] + list(state["messages"]))

    if not response.tool_calls:
        return {
            "messages": [response],
            "analysis_result": response.content,
            "current_agent": "supervisor",
        }
    return {"messages": [response], "current_agent": "coder_tools"}

def reporter_node(state: ResearchState) -> dict:
    llm = base_llm.bind_tools([generate_report])
    research = state.get("research_data", "N/A")
    analysis = state.get("analysis_result", "N/A")
    system = SystemMessage(content=(
        f"You are a report writer. Create a professional report.\n"
        f"Research:\n{research}\n\nAnalysis:\n{analysis}"
    ))
    response = llm.invoke([system] + list(state["messages"]))

    if not response.tool_calls:
        return {
            "messages": [response],
            "final_report": response.content,
            "current_agent": "supervisor",
        }
    return {"messages": [response], "current_agent": "reporter_tools"}

def supervisor_node(state: ResearchState) -> dict:
    iteration = state.get("iteration", 0) + 1
    if iteration > MAX_ITERATIONS:
        return {
            "messages": [AIMessage(content="Max iterations reached. Returning results.")],
            "current_agent": "FINISH",
            "iteration": iteration,
        }

    system = SystemMessage(content="""You are a project supervisor. Based on the current state:
- If no research data → route to "researcher"
- If research done but no analysis → route to "coder"
- If analysis done but no report → route to "reporter"
- If report is ready → respond "FINISH"
Respond with ONLY one of: researcher, coder, reporter, FINISH""")

    response = base_llm.invoke([system] + list(state["messages"]))
    next_agent = response.content.strip().lower()

    valid = ["researcher", "coder", "reporter", "finish"]
    if next_agent not in valid:
        next_agent = "researcher"  # default fallback

    return {"current_agent": next_agent, "iteration": iteration}

# === Routing ===
def route_from_supervisor(state: ResearchState) -> str:
    agent = state.get("current_agent", "FINISH")
    if agent in ["researcher", "coder", "reporter"]:
        return agent
    return "end"

def route_from_worker(worker_name: str):
    def router(state: ResearchState) -> str:
        current = state.get("current_agent", "supervisor")
        if current == f"{worker_name}_tools":
            return f"{worker_name}_tools"
        return "supervisor"
    return router

# === Build Graph ===
from langgraph.prebuilt import ToolNode

graph = StateGraph(ResearchState)

graph.add_node("supervisor", supervisor_node)
graph.add_node("researcher", researcher_node)
graph.add_node("coder", coder_node)
graph.add_node("reporter", reporter_node)
graph.add_node("researcher_tools", ToolNode([search_arxiv, search_web]))
graph.add_node("coder_tools", ToolNode([execute_analysis]))
graph.add_node("reporter_tools", ToolNode([generate_report]))

graph.set_entry_point("supervisor")

graph.add_conditional_edges("supervisor", route_from_supervisor, {
    "researcher": "researcher",
    "coder": "coder",
    "reporter": "reporter",
    "end": END,
})

for worker in ["researcher", "coder", "reporter"]:
    graph.add_conditional_edges(worker, route_from_worker(worker), {
        f"{worker}_tools": f"{worker}_tools",
        "supervisor": "supervisor",
    })
    graph.add_edge(f"{worker}_tools", worker)

# Compile with checkpointing
checkpointer = MemorySaver()
app = graph.compile(checkpointer=checkpointer)

# === Execute ===
config = {"configurable": {"thread_id": "research-001"}}
result = app.invoke(
    {
        "messages": [HumanMessage(
            content="Research the latest advances in mixture-of-experts (MoE) "
                    "models, analyze their parameter efficiency compared to "
                    "dense models, and write a summary report."
        )],
        "current_agent": "",
        "iteration": 0,
    },
    config=config,
)

# Print final report
print(result.get("final_report", result["messages"][-1].content))
</code></pre>

<h3 id="5-2-production-best-practices">5.2. 生產環境最佳實踐</h3>

<table>
<thead>
<tr><th>實踐</th><th>原因</th><th>實作方式</th></tr>
</thead>
<tbody>
<tr><td><strong>最大迭代次數</strong></td><td>防止無限迴圈</td><td>在狀態中設置 <code>iteration</code> 計數器，在監督者處檢查</td></tr>
<tr><td><strong>錯誤處理</strong></td><td>工具失敗不應導致代理崩潰</td><td>工具中使用 try/except，回傳錯誤訊息</td></tr>
<tr><td><strong>檢查點</strong></td><td>崩潰後恢復</td><td><code>MemorySaver</code>（開發）/ <code>SqliteSaver</code>（生產）</td></tr>
<tr><td><strong>結構化輸出</strong></td><td>可靠的路由決策</td><td>限制監督者輸出為有效選項</td></tr>
<tr><td><strong>可觀測性</strong></td><td>多代理除錯困難</td><td>LangSmith 追蹤，記錄每個節點進出</td></tr>
<tr><td><strong>每節點超時</strong></td><td>單一節點不應阻塞</td><td>對 LLM 呼叫和工具執行設定超時</td></tr>
<tr><td><strong>Human-in-the-loop</strong></td><td>關鍵操作需要批准</td><td>在危險的工具節點使用 <code>interrupt_before</code></td></tr>
</tbody>
</table>

<blockquote><p><strong>考試提示：</strong>「如何防止代理無限迴圈？」→ <strong>max_iterations + 迭代計數器</strong>。「如何除錯多代理系統？」→ <strong>LangSmith 追蹤 + 日誌記錄</strong>。「代理崩潰恢復？」→ <strong>使用持久化儲存的 Checkpointing</strong>。生產部署 → <strong>LangGraph Platform</strong>（託管）或 <strong>LangServe</strong>（自行部署）。</p></blockquote>

<h2 id="6-dli-cfx25-overview">6. DLI C-FX-25 — Agentic AI 課程總覽</h2>

<h3 id="6-1-course-structure">6.1. 課程結構</h3>

<p>課程 <strong>C-FX-25:「Building Agentic AI Applications」</strong>是 DLI 的進階模組，專注於建構生產環境的 Agentic AI 系統。它補充了 S-FX-15，深入探討代理架構。</p>

<table>
<thead>
<tr><th>模組</th><th>主題</th><th>實作練習</th></tr>
</thead>
<tbody>
<tr><td>模組 1</td><td>Agent 基礎、ReAct、工具呼叫</td><td>使用 NVIDIA NIM 建構單一代理</td></tr>
<tr><td>模組 2</td><td>LangGraph 入門、StateGraph</td><td>實作自訂代理圖</td></tr>
<tr><td>模組 3</td><td>多代理架構</td><td>建構監督者多代理系統</td></tr>
<tr><td>模組 4</td><td>進階：記憶、規劃、評估</td><td>生產部署練習</td></tr>
</tbody>
</table>

<h3 id="6-2-assessment-focus">6.2. 評量重點領域</h3>

<p>C-FX-25 評量聚焦於<strong>實作</strong>：</p>

<ul>
<li><strong>LangGraph StateGraph</strong> — 定義狀態、節點、條件邊</li>
<li><strong>工具整合</strong> — 將工具綁定到 LLM、處理工具呼叫</li>
<li><strong>監督者路由</strong> — 實作監督者邏輯、路由至工作者</li>
<li><strong>檢查點</strong> — 儲存/恢復代理狀態</li>
<li><strong>Human-in-the-loop</strong> — interrupt_before、批准、恢復</li>
</ul>

<h3 id="6-3-key-apis">6.3. 需要記住的關鍵 API</h3>

<table>
<thead>
<tr><th>API / 概念</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td><code>StateGraph(State)</code></td><td>建立帶有型別狀態的圖</td></tr>
<tr><td><code>graph.add_node(name, func)</code></td><td>新增處理節點</td></tr>
<tr><td><code>graph.add_edge(A, B)</code></td><td>永遠路由 A → B</td></tr>
<tr><td><code>graph.add_conditional_edges(A, func, map)</code></td><td>根據函式輸出路由</td></tr>
<tr><td><code>graph.set_entry_point(name)</code></td><td>設定起始節點</td></tr>
<tr><td><code>graph.compile(checkpointer=...)</code></td><td>編譯圖，可選檢查點</td></tr>
<tr><td><code>ToolNode(tools)</code></td><td>LangGraph 預建節點，用於執行工具呼叫</td></tr>
<tr><td><code>MemorySaver()</code></td><td>記憶體內檢查點（僅限開發）</td></tr>
<tr><td><code>interrupt_before=[node]</code></td><td>在執行節點前暫停</td></tr>
<tr><td><code>llm.bind_tools(tools)</code></td><td>將工具附加到 LLM 以進行 function calling</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試提示：</strong>C-FX-25 評量要求<strong>從零開始撰寫 LangGraph 程式碼</strong>。記住這個模式：(1) 定義 State TypedDict，(2) 定義節點為函式，(3) 新增節點 + 邊，(4) 編譯 + 執行。你不需要背誦 API，但必須理解<strong>流程</strong>：狀態在節點間傳遞，條件邊動態路由。</p></blockquote>

<h2 id="7-cheat-sheet">7. 速查表</h2>

<table>
<thead>
<tr><th>概念</th><th>重點</th></tr>
</thead>
<tbody>
<tr><td>Agent 元件</td><td>LLM + 記憶 + 工具 + 規劃</td></tr>
<tr><td>Agent 迴圈</td><td>感知 → 推理 → 行動 → 觀察</td></tr>
<tr><td>Agent vs Chain</td><td>Agent = 動態流程（LLM 決定）；Chain = 固定流程</td></tr>
<tr><td>ReAct</td><td>交替思考 + 行動 + 觀察。簡單，近視的</td></tr>
<tr><td>Plan-and-Execute</td><td>預先規劃 → 執行步驟 → 需要時重新規劃</td></tr>
<tr><td>LATS</td><td>推理路徑的樹搜尋。昂貴但穩健</td></tr>
<tr><td>Reflexion</td><td>執行 → 自我反思 → 帶著經驗重試</td></tr>
<tr><td>LangGraph</td><td>StateGraph：節點 + 邊 + 條件路由</td></tr>
<tr><td>LangGraph State</td><td>所有節點共享的 TypedDict</td></tr>
<tr><td>條件邊</td><td>路由函式決定下一個節點</td></tr>
<tr><td>檢查點</td><td>MemorySaver（開發）、SqliteSaver（生產）。啟用恢復</td></tr>
<tr><td>Human-in-the-loop</td><td>interrupt_before=[node] + 使用 checkpointer 編譯</td></tr>
<tr><td>監督者模式</td><td>中央 LLM 路由至專業化工作者代理</td></tr>
<tr><td>階層式</td><td>巢狀監督者 — 代理樹</td></tr>
<tr><td>群集</td><td>去中心化移交，無中央監督者</td></tr>
<tr><td>辯論</td><td>代理辯論，裁判決定。更好的推理</td></tr>
<tr><td>最大迭代次數</td><td>始終設定以防止代理無限迴圈</td></tr>
<tr><td>ToolNode</td><td>LangGraph 預建節點，用於執行工具呼叫</td></tr>
<tr><td>C-FX-25 重點</td><td>LangGraph 程式碼、多代理、檢查點、HITL</td></tr>
</tbody>
</table>

<h2 id="8-practice-questions">8. 練習題 — 程式碼</h2>

<p><strong>Q1：建構基本的 LangGraph ReAct 代理</strong></p>
<p>建構一個簡單的 LangGraph 代理，包含 2 個工具：<code>search_docs</code>（搜尋文件）和 <code>calculator</code>（執行計算）。實作完整流程：State、agent 節點、tool 節點、條件邊路由、編譯並執行。</p>

<details>
<summary>顯示答案 Q1</summary>

<pre><code class="language-python">
from typing import TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage, HumanMessage
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain_core.tools import tool
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
import operator

# 1. State
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]

# 2. Tools
@tool
def search_docs(query: str) -> str:
    """Search internal knowledge base for relevant documents."""
    return f"Found: Documentation about {query} — key facts here."

@tool
def calculator(expression: str) -> str:
    """Calculate a mathematical expression."""
    return str(eval(expression))

tools = [search_docs, calculator]

# 3. LLM with tools
llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct", temperature=0.0)
llm_with_tools = llm.bind_tools(tools)

# 4. Nodes
def agent_node(state: AgentState) -> dict:
    response = llm_with_tools.invoke(state["messages"])
    return {"messages": [response]}

tool_node = ToolNode(tools)

# 5. Router
def should_continue(state: AgentState) -> str:
    last = state["messages"][-1]
    if hasattr(last, "tool_calls") and last.tool_calls:
        return "tools"
    return "end"

# 6. Build graph
graph = StateGraph(AgentState)
graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)
graph.set_entry_point("agent")
graph.add_conditional_edges("agent", should_continue, {
    "tools": "tools",
    "end": END,
})
graph.add_edge("tools", "agent")

app = graph.compile()

# 7. Run
result = app.invoke({
    "messages": [HumanMessage(content="What is 25 * 4 + 100?")]
})
print(result["messages"][-1].content)
</code></pre>
</details>

<p><strong>Q2：使用 LangGraph 檢查點實作 Human-in-the-loop</strong></p>
<p>修改 Q1 的代理以新增 <strong>Human-in-the-loop</strong>：代理在執行工具前暫停，使用者可以批准或拒絕。示範：(1) 使用 checkpointer + interrupt_before 編譯，(2) 執行並看到代理暫停，(3) 恢復執行。</p>

<details>
<summary>顯示答案 Q2</summary>

<pre><code class="language-python">
from langgraph.checkpoint.memory import MemorySaver

# Reuse graph from Q1, compile with HITL
checkpointer = MemorySaver()
app_hitl = graph.compile(
    checkpointer=checkpointer,
    interrupt_before=["tools"]  # Pause BEFORE tool execution
)

# Run — agent will pause before calling tools
config = {"configurable": {"thread_id": "hitl-demo-001"}}
result = app_hitl.invoke(
    {"messages": [HumanMessage(content="Calculate 1000 / 4")]},
    config=config,
)

# Agent paused — inspect what it wants to do
last_msg = result["messages"][-1]
print("Agent wants to call:")
for tc in last_msg.tool_calls:
    print(f"  Tool: {tc['name']}, Args: {tc['args']}")

# User approves → resume (pass None to continue from checkpoint)
final_result = app_hitl.invoke(None, config=config)
print("\nFinal answer:", final_result["messages"][-1].content)

# If user REJECTS → could modify state or stop here
# To reject: simply don't call invoke(None, config)
</code></pre>
</details>

<p><strong>Q3：建構監督者多代理系統</strong></p>
<p>實作一個<strong>監督者模式</strong>，包含 2 個工作者：<code>researcher</code>（使用 web_search 工具）和 <code>writer</code>（使用 write_report 工具）。監督者從使用者接收任務，路由至適當的工作者，並收集結果。使用條件邊實作路由邏輯。</p>

<details>
<summary>顯示答案 Q3</summary>

<pre><code class="language-python">
from typing import TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain_core.tools import tool
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
import operator

class SupervisorState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    next: str

@tool
def web_search(query: str) -> str:
    """Search the internet for information."""
    return f"Search results for '{query}': ..."

@tool
def write_report(content: str) -> str:
    """Write and format a professional report."""
    return f"=== Report ===\n{content}\n=== End ==="

llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct", temperature=0.0)

def supervisor(state: SupervisorState) -> dict:
    sys = SystemMessage(content=(
        "You are a supervisor. Workers: researcher, writer. "
        "Route to appropriate worker or say FINISH if task complete. "
        "Respond with ONLY: researcher, writer, or FINISH."
    ))
    resp = llm.invoke([sys] + list(state["messages"]))
    next_val = resp.content.strip().lower()
    if next_val not in ["researcher", "writer"]:
        next_val = "FINISH"
    return {"next": next_val}

def researcher(state: SupervisorState) -> dict:
    r_llm = llm.bind_tools([web_search])
    sys = SystemMessage(content="You are a researcher. Use web_search.")
    resp = r_llm.invoke([sys] + list(state["messages"]))
    return {"messages": [resp]}

def writer(state: SupervisorState) -> dict:
    w_llm = llm.bind_tools([write_report])
    sys = SystemMessage(content="You are a report writer. Use write_report.")
    resp = w_llm.invoke([sys] + list(state["messages"]))
    return {"messages": [resp]}

def route(state: SupervisorState) -> str:
    n = state.get("next", "FINISH")
    return n if n in ["researcher", "writer"] else "end"

# Build
g = StateGraph(SupervisorState)
g.add_node("supervisor", supervisor)
g.add_node("researcher", researcher)
g.add_node("writer", writer)
g.add_node("research_tools", ToolNode([web_search]))
g.add_node("writer_tools", ToolNode([write_report]))

g.set_entry_point("supervisor")
g.add_conditional_edges("supervisor", route, {
    "researcher": "researcher",
    "writer": "writer",
    "end": END,
})

# Researcher flow
def route_researcher(state):
    last = state["messages"][-1]
    if hasattr(last, "tool_calls") and last.tool_calls:
        return "research_tools"
    return "supervisor"

g.add_conditional_edges("researcher", route_researcher, {
    "research_tools": "research_tools",
    "supervisor": "supervisor",
})
g.add_edge("research_tools", "researcher")

# Writer flow
def route_writer(state):
    last = state["messages"][-1]
    if hasattr(last, "tool_calls") and last.tool_calls:
        return "writer_tools"
    return "supervisor"

g.add_conditional_edges("writer", route_writer, {
    "writer_tools": "writer_tools",
    "supervisor": "supervisor",
})
g.add_edge("writer_tools", "writer")

app = g.compile()

result = app.invoke({
    "messages": [HumanMessage(content="Research AI trends 2025 and write a report")],
    "next": "",
})
print(result["messages"][-1].content)
</code></pre>
</details>

<p><strong>Q4：為 LangGraph 代理新增 Plan-and-Execute</strong></p>
<p>實作 <strong>Plan-and-Execute</strong> 模式：(1) Planner 節點從使用者查詢建立步驟列表，(2) Executor 節點執行每個步驟，(3) Replanner 節點檢查進度並在需要時調整計畫。將計畫儲存在狀態中。</p>

<details>
<summary>顯示答案 Q4</summary>

<pre><code class="language-python">
from typing import TypedDict, Annotated, Sequence, List, Optional
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langgraph.graph import StateGraph, END
import operator, json

class PlanExecState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    plan: List[str]          # list of steps
    current_step: int        # index of current step
    step_results: List[str]  # results of each step
    done: bool

llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct", temperature=0.0)

def planner_node(state: PlanExecState) -> dict:
    """Create a plan from user request."""
    sys = SystemMessage(content=(
        "You are a planner. Break the user's request into 3-5 concrete steps. "
        "Return ONLY a JSON array of strings, e.g. [\"step1\", \"step2\"]."
    ))
    resp = llm.invoke([sys] + list(state["messages"]))
    try:
        plan = json.loads(resp.content)
    except json.JSONDecodeError:
        plan = [resp.content]
    return {"plan": plan, "current_step": 0, "step_results": []}

def executor_node(state: PlanExecState) -> dict:
    """Execute the current step of the plan."""
    step_idx = state["current_step"]
    plan = state["plan"]
    if step_idx >= len(plan):
        return {"done": True}

    current = plan[step_idx]
    sys = SystemMessage(content=(
        f"Execute this step: {current}\n"
        f"Previous results: {state['step_results']}\n"
        "Provide a concise result."
    ))
    resp = llm.invoke([sys] + list(state["messages"]))
    new_results = list(state["step_results"]) + [resp.content]
    return {
        "step_results": new_results,
        "current_step": step_idx + 1,
        "messages": [resp],
    }

def replanner_node(state: PlanExecState) -> dict:
    """Check progress, adjust plan if needed."""
    if state["current_step"] >= len(state["plan"]):
        return {"done": True}

    sys = SystemMessage(content=(
        f"Plan: {state['plan']}\n"
        f"Completed: {state['current_step']}/{len(state['plan'])}\n"
        f"Results so far: {state['step_results']}\n"
        "Should the remaining plan continue as-is? "
        "Reply 'CONTINUE' or provide updated remaining steps as JSON array."
    ))
    resp = llm.invoke([sys])
    if "CONTINUE" in resp.content.upper():
        return {"done": False}
    try:
        remaining = json.loads(resp.content)
        new_plan = state["plan"][:state["current_step"]] + remaining
        return {"plan": new_plan, "done": False}
    except json.JSONDecodeError:
        return {"done": False}

def route_after_exec(state: PlanExecState) -> str:
    if state.get("done", False):
        return "end"
    return "replanner"

def route_after_replan(state: PlanExecState) -> str:
    if state.get("done", False):
        return "end"
    return "executor"

# Build graph
g = StateGraph(PlanExecState)
g.add_node("planner", planner_node)
g.add_node("executor", executor_node)
g.add_node("replanner", replanner_node)

g.set_entry_point("planner")
g.add_edge("planner", "executor")
g.add_conditional_edges("executor", route_after_exec, {
    "replanner": "replanner",
    "end": END,
})
g.add_conditional_edges("replanner", route_after_replan, {
    "executor": "executor",
    "end": END,
})

app = g.compile()

result = app.invoke({
    "messages": [HumanMessage(
        content="Analyze the pros and cons of microservices architecture "
                "and recommend when to use it vs monolith."
    )],
    "plan": [],
    "current_step": 0,
    "step_results": [],
    "done": False,
})

for i, res in enumerate(result["step_results"]):
    print(f"Step {i+1}: {res[:150]}...")
</code></pre>
</details>

<p><strong>Q5：在多代理系統中實作錯誤處理和重試邏輯</strong></p>
<p>為多代理系統新增<strong>錯誤處理</strong>：(1) 工具失敗回傳錯誤訊息而非崩潰，(2) 代理收到錯誤 → 以不同策略重試（最多 2 次重試），(3) 代理狀態追蹤重試次數。實作節點包裝器模式。</p>

<details>
<summary>顯示答案 Q5</summary>

<pre><code class="language-python">
from typing import TypedDict, Annotated, Sequence, Dict
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain_core.tools import tool
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
import operator

class RobustState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    error_count: int
    max_retries: int

# Tools with error handling built-in
@tool
def risky_api_call(endpoint: str) -> str:
    """Call an external API that might fail."""
    import random
    if random.random() < 0.5:
        raise ConnectionError(f"API {endpoint} unreachable")
    return f"API response from {endpoint}: success data"

@tool
def safe_search(query: str) -> str:
    """Search with built-in error handling."""
    return f"Results for {query}: ..."

# Wrap tools with error handling
def safe_tool_node(tools):
    """ToolNode wrapper that catches errors and returns error messages."""
    base_node = ToolNode(tools)
    def wrapper(state: RobustState) -> dict:
        try:
            return base_node.invoke(state)
        except Exception as e:
            error_msg = AIMessage(content=f"Tool error: {str(e)}. Try different approach.")
            return {
                "messages": [error_msg],
                "error_count": state.get("error_count", 0) + 1,
            }
    return wrapper

tools = [risky_api_call, safe_search]
llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct", temperature=0.0)
llm_with_tools = llm.bind_tools(tools)

def agent_node(state: RobustState) -> dict:
    error_count = state.get("error_count", 0)
    max_retries = state.get("max_retries", 2)

    # If too many errors, give up gracefully
    if error_count >= max_retries:
        return {"messages": [AIMessage(
            content="I encountered multiple errors. Here's what I could gather "
                    "from successful attempts: " +
                    " | ".join(m.content for m in state["messages"][-3:])
        )]}

    # Add retry context if there were errors
    msgs = list(state["messages"])
    if error_count > 0:
        msgs.append(HumanMessage(
            content=f"Previous attempt failed ({error_count}/{max_retries} retries). "
                    "Try a different tool or approach."
        ))

    response = llm_with_tools.invoke(msgs)
    return {"messages": [response]}

def should_continue(state: RobustState) -> str:
    last = state["messages"][-1]
    error_count = state.get("error_count", 0)
    max_retries = state.get("max_retries", 2)

    # Stop if max retries exceeded
    if error_count >= max_retries and not (
        hasattr(last, "tool_calls") and last.tool_calls
    ):
        return "end"

    if hasattr(last, "tool_calls") and last.tool_calls:
        return "tools"
    return "end"

# Build
g = StateGraph(RobustState)
g.add_node("agent", agent_node)
g.add_node("tools", safe_tool_node(tools))
g.set_entry_point("agent")
g.add_conditional_edges("agent", should_continue, {
    "tools": "tools",
    "end": END,
})
g.add_edge("tools", "agent")  # tool result → back to agent

app = g.compile()

result = app.invoke({
    "messages": [HumanMessage(content="Call the user-data API endpoint")],
    "error_count": 0,
    "max_retries": 2,
})
print(result["messages"][-1].content)
</code></pre>
</details>
