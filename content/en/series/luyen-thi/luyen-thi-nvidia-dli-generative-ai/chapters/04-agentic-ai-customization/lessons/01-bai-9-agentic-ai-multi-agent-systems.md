---
id: 019c9619-nv01-p4-l09
title: 'Lesson 9: Agentic AI & Multi-Agent Systems'
slug: bai-9-agentic-ai-multi-agent-systems
description: >-
  Agent abstraction: perception → reasoning → action loop.
  Cognitive architectures: ReAct, Plan-and-Execute, LATS.
  LangGraph: stateful graph-based agent orchestration.
  Multi-agent systems: supervisor, hierarchical, swarm patterns.
  Build production-ready multi-agent application.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 9
section_title: "Part 4: Agentic AI & LLM Customization"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'NVIDIA DLI Exam Prep — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="1-agent-abstraction">1. Agent Abstraction — LLM + Memory + Tools + Planning</h2>

<h3 id="1-1-agent-la-gi">1.1. What Is an Agent?</h3>

<p>Lesson 8 introduced a simple <strong>ReAct agent</strong> — an LLM that picks tools then answers. Lesson 9 expands to <strong>Agentic AI</strong>: systems where the LLM acts as the <strong>central brain</strong> — autonomously planning, selecting tools, responding to results, and coordinating with other agents.</p>

<p>An <strong>Agent</strong> consists of 4 core components:</p>

<ul>
<li><strong>LLM (Brain)</strong> — reasoning, decision-making, text generation</li>
<li><strong>Memory</strong> — short-term (conversation buffer) and long-term (vector store, database)</li>
<li><strong>Tools</strong> — functions the agent can call: search, calculator, API, code execution</li>
<li><strong>Planning</strong> — create plans, decompose tasks, reflect when errors occur</li>
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

<h3 id="1-2-perception-reasoning-action-loop">1.2. Perception → Reasoning → Action → Observation Loop</h3>

<p>Every agent runs on a basic loop:</p>

<ol>
<li><strong>Perception</strong> — receive input (user query, tool output, environment feedback)</li>
<li><strong>Reasoning</strong> — LLM reasons: "What should I do next? Which tool? Do I have enough info?"</li>
<li><strong>Action</strong> — perform an action: call a tool, generate text, answer the user</li>
<li><strong>Observation</strong> — receive the result from the action, feed it back to Perception → repeat</li>
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

<h3 id="1-3-levels-of-agency">1.3. Levels of Agency</h3>

<p>Not every LLM application needs a full agent. NVIDIA DLI distinguishes levels of <strong>agency</strong>:</p>

<table>
<thead>
<tr><th>Level</th><th>Pattern</th><th>LLM Role</th><th>Example</th></tr>
</thead>
<tbody>
<tr><td>L0 — No agency</td><td>Simple prompt → response</td><td>Text generator</td><td>FAQ chatbot</td></tr>
<tr><td>L1 — Tool use</td><td>LLM picks 1 tool</td><td>Router</td><td>Function calling API</td></tr>
<tr><td>L2 — Single agent</td><td>ReAct loop, multi-step</td><td>Planner + executor</td><td>RAG Agent (Lesson 8)</td></tr>
<tr><td>L3 — Multi-agent</td><td>Multiple agents coordinate</td><td>Coordinator</td><td>Supervisor + workers</td></tr>
<tr><td>L4 — Autonomous</td><td>Self-improving, long-running</td><td>Autonomous system</td><td>AI Scientist, Devin</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> "LLM autonomously decomposes tasks, calls multiple tools, retries as needed" → <strong>Agent (L2+)</strong>. "Multiple LLMs coordinate, each specializing in one task" → <strong>Multi-Agent (L3)</strong>. DLI exam often asks: "What differentiates an agent from a chain?" → Agent has <strong>dynamic control flow</strong> (LLM decides the next step), chain has <strong>fixed control flow</strong>.</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai9-multi-agent-system.webp" alt="Multi-Agent System — Orchestrator, Specialized Agents, LangGraph State Machine" loading="lazy" /><figcaption>Multi-Agent System — Orchestrator, Specialized Agents, LangGraph State Machine</figcaption></figure>

<h2 id="2-cognitive-architectures">2. Cognitive Architectures for LLM Agents</h2>

<h3 id="2-1-react">2.1. ReAct — Reasoning + Acting</h3>

<p><strong>ReAct</strong> (introduced in Lesson 8) interleaves <strong>Thought</strong> (reasoning) with <strong>Action</strong> (acting). Strengths: simple, transparent. Weaknesses: no long-term planning — the agent only thinks about the <em>next step</em>, not the big picture.</p>

<h3 id="2-2-plan-and-execute">2.2. Plan-and-Execute</h3>

<p><strong>Plan-and-Execute</strong> clearly separates two phases: (1) a Planner LLM creates the full plan upfront, (2) an Executor LLM carries out each step. After each step, the Planner can <strong>replan</strong> (adjust the plan).</p>

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

<p><strong>LATS</strong> combines <strong>Monte Carlo Tree Search (MCTS)</strong> with LLM reasoning. Instead of following a single path (ReAct), LATS explores multiple solution branches, evaluates each branch using the LLM, then selects the best one. Like an LLM playing chess — thinking several moves ahead.</p>

<h3 id="2-4-reflexion">2.4. Reflexion — Learn from Mistakes</h3>

<p><strong>Reflexion</strong> adds a <strong>self-reflection</strong> step: after completing a task, the agent self-evaluates the result → if wrong, writes a "lesson learned" to memory → retries with experience from the previous attempt. This is a form of <em>in-context learning</em> through self-feedback.</p>

<h3 id="2-5-comparison-table">2.5. Cognitive Architecture Comparison</h3>

<table>
<thead>
<tr><th>Architecture</th><th>Planning</th><th>Execution</th><th>Strength</th><th>Weakness</th></tr>
</thead>
<tbody>
<tr><td><strong>ReAct</strong></td><td>Step-by-step (myopic)</td><td>Interleaved think+act</td><td>Simple, transparent</td><td>No global planning, can loop</td></tr>
<tr><td><strong>Plan-and-Execute</strong></td><td>Upfront full plan</td><td>Sequential execution</td><td>Global view, fewer LLM calls</td><td>Plan may become outdated after steps</td></tr>
<tr><td><strong>LATS</strong></td><td>Tree search (explore)</td><td>Best-first search</td><td>Explores alternatives, robust</td><td>Very expensive (many LLM calls)</td></tr>
<tr><td><strong>Reflexion</strong></td><td>Trial-and-error + memory</td><td>Execute → reflect → retry</td><td>Learns from mistakes</td><td>Slow convergence, needs evaluator</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> "Agent needs to think through the entire plan before executing" → <strong>Plan-and-Execute</strong>. "Agent tries multiple solution paths, picks the best" → <strong>LATS</strong>. "Agent self-evaluates results and improves" → <strong>Reflexion</strong>. "Agent interleaves thinking and acting" → <strong>ReAct</strong>. DLI exams typically focus on <strong>ReAct</strong> and <strong>Plan-and-Execute</strong> as the two most widely used architectures.</p></blockquote>

<h2 id="3-langgraph">3. LangGraph — Stateful Graph-Based Agent Orchestration</h2>

<h3 id="3-1-tai-sao-langgraph">3.1. Why LangGraph?</h3>

<p><strong>AgentExecutor</strong> in LangChain (Lesson 8) is a "black box" — hard to customize control flow. <strong>LangGraph</strong> is a LangChain library that lets you build agents as <strong>directed graphs</strong>: each node is a processing step, edges define flow, and conditional edges allow branching based on state.</p>

<table>
<thead>
<tr><th>Feature</th><th>AgentExecutor</th><th>LangGraph</th></tr>
</thead>
<tbody>
<tr><td>Control flow</td><td>Fixed ReAct loop</td><td>Custom graph — you design the flow</td></tr>
<tr><td>State management</td><td>Hidden internal state</td><td>Explicit <code>TypedDict</code> state</td></tr>
<tr><td>Multi-agent</td><td>No native support</td><td>First-class: each agent = sub-graph</td></tr>
<tr><td>Human-in-the-loop</td><td>Limited</td><td>Built-in: interrupt, approve, edit</td></tr>
<tr><td>Persistence</td><td>No built-in</td><td>Checkpointer: save/resume state</td></tr>
<tr><td>Streaming</td><td>Basic</td><td>Event-by-event streaming</td></tr>
<tr><td>Debug</td><td>Trace via LangSmith</td><td>Graph visualization + LangSmith</td></tr>
</tbody>
</table>

<h3 id="3-2-core-concepts">3.2. Core Concepts — StateGraph, Nodes, Edges</h3>

<p>LangGraph is built on 3 concepts:</p>

<ul>
<li><strong>State</strong> — a TypedDict holding all data passed between nodes. Each node reads/writes state.</li>
<li><strong>Nodes</strong> — Python functions. Input: state → Output: partial state update (only fields that need updating).</li>
<li><strong>Edges</strong> — connections between nodes. <code>add_edge(A, B)</code> = always go A→B. <code>add_conditional_edges(A, func)</code> = func decides where to go.</li>
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

<h3 id="3-3-code-basic-langgraph-agent">3.3. Code: Basic LangGraph Agent</h3>

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

<p>LangGraph supports <strong>interrupt</strong> before executing dangerous actions — e.g., sending emails, deleting data, executing code. The agent pauses, waits for user approval, then continues.</p>

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

<h3 id="3-5-checkpointing">3.5. Checkpointing — Save & Resume State</h3>

<p>A <strong>Checkpointer</strong> saves state after each node, enabling:</p>

<ul>
<li><strong>Resume</strong> — agent crashes mid-run → load checkpoint → continue</li>
<li><strong>Time travel</strong> — go back to any checkpoint → retry with different input</li>
<li><strong>Human-in-the-loop</strong> — pause, wait for user, resume (as shown above)</li>
<li><strong>Multi-turn</strong> — maintain conversation history across multiple turns</li>
</ul>

<blockquote><p><strong>Exam tip:</strong> "Build agent with custom control flow, conditional branching" → <strong>LangGraph</strong> (not AgentExecutor). "Pause agent execution for human approval" → <strong>interrupt_before + checkpointer</strong>. "Save agent state, resume later" → <strong>LangGraph checkpointing</strong>. DLI C-FX-25 often asks: "Why use LangGraph over AgentExecutor?" → <strong>Custom flow, multi-agent, persistence, human-in-the-loop</strong>.</p></blockquote>

<h2 id="4-multi-agent-patterns">4. Multi-Agent Patterns</h2>

<h3 id="4-1-tai-sao-multi-agent">4.1. Why Multi-Agent?</h3>

<p>A single agent with 20+ tools will face problems: <strong>tool selection confusion</strong> (too many tools, LLM picks wrong one), <strong>prompt too long</strong> (must include all instructions), <strong>hard to debug</strong> (unclear where the agent failed). Multi-agent solves this by <strong>decomposing</strong>: each agent specializes in one task with fewer tools.</p>

<h3 id="4-2-supervisor-pattern">4.2. Supervisor Pattern</h3>

<p>A <strong>Supervisor agent</strong> (LLM) receives the task from the user, delegates to <strong>Worker agents</strong>, collects results, and synthesizes the final answer.</p>

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

<h3 id="4-3-hierarchical-pattern">4.3. Hierarchical Pattern</h3>

<p><strong>Hierarchical</strong> extends Supervisor: each worker can itself be a supervisor of sub-workers. Suitable for complex organizations — e.g., CEO agent → Manager agents → Specialist agents.</p>

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

<h3 id="4-4-swarm-pattern">4.4. Swarm Pattern</h3>

<p><strong>Swarm</strong> (OpenAI Swarm concept) — no supervisor. Agents hand off to each other based on context. Agent A realizes "this task belongs to Agent B's expertise" → hands off automatically.</p>

<h3 id="4-5-debate-pattern">4.5. Debate Pattern</h3>

<p><strong>Debate</strong> — two or more agents argue about a question. Each agent presents its viewpoint and rebuts the other. Finally, a Judge agent selects the best conclusion. This pattern improves reasoning quality for complex questions.</p>

<h3 id="4-6-pattern-comparison">4.6. Multi-Agent Pattern Comparison</h3>

<table>
<thead>
<tr><th>Pattern</th><th>Control Flow</th><th>Communication</th><th>Best For</th></tr>
</thead>
<tbody>
<tr><td><strong>Supervisor</strong></td><td>Centralized — supervisor routes</td><td>Hub-and-spoke</td><td>Clear task delegation, moderate complexity</td></tr>
<tr><td><strong>Hierarchical</strong></td><td>Multi-level supervision</td><td>Tree structure</td><td>Complex orgs, many specialized sub-teams</td></tr>
<tr><td><strong>Swarm</strong></td><td>Decentralized — agents handoff</td><td>Peer-to-peer</td><td>Customer service, routing, flexible flow</td></tr>
<tr><td><strong>Debate</strong></td><td>Round-robin argumentation</td><td>Broadcast + judge</td><td>Complex reasoning, fact verification</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> "One LLM routes tasks to specialized agents" → <strong>Supervisor</strong>. "Agents hand off to each other without central control" → <strong>Swarm</strong>. "Multiple agents argue, a judge decides" → <strong>Debate</strong>. "Nested supervisors managing sub-teams" → <strong>Hierarchical</strong>. DLI exams typically focus on the <strong>Supervisor pattern</strong> as it is the most common in production.</p></blockquote>

<h3 id="4-7-code-supervisor-multi-agent">4.7. Code: Supervisor Multi-Agent with LangGraph</h3>

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

<h2 id="5-build-production-ready">5. Build Production-Ready Multi-Agent App</h2>

<h3 id="5-1-research-assistant">5.1. Research Assistant — Complete Example</h3>

<p>Build a complete <strong>Research Assistant</strong> with 3 agents: <strong>Researcher</strong> (find information), <strong>Coder</strong> (analyze data), <strong>Reporter</strong> (write reports). Includes error handling, retry logic, and structured output.</p>

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

<h3 id="5-2-production-best-practices">5.2. Production Best Practices</h3>

<table>
<thead>
<tr><th>Practice</th><th>Why</th><th>Implementation</th></tr>
</thead>
<tbody>
<tr><td><strong>Max iterations</strong></td><td>Prevent infinite loops</td><td><code>iteration</code> counter in state, check at supervisor</td></tr>
<tr><td><strong>Error handling</strong></td><td>Tool failures shouldn't crash agent</td><td>try/except in tools, return error message</td></tr>
<tr><td><strong>Checkpointing</strong></td><td>Resume after crash</td><td><code>MemorySaver</code> (dev) / <code>SqliteSaver</code> (prod)</td></tr>
<tr><td><strong>Structured output</strong></td><td>Reliable routing decisions</td><td>Constrain supervisor output to valid choices</td></tr>
<tr><td><strong>Observability</strong></td><td>Debugging multi-agent is hard</td><td>LangSmith tracing, log each node entry/exit</td></tr>
<tr><td><strong>Timeout per node</strong></td><td>Single node shouldn't block</td><td>Set timeout on LLM calls and tool executions</td></tr>
<tr><td><strong>Human-in-the-loop</strong></td><td>Critical actions need approval</td><td><code>interrupt_before</code> on dangerous tool nodes</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> "How to prevent agent infinite loops?" → <strong>max_iterations + iteration counter</strong>. "How to debug multi-agent systems?" → <strong>LangSmith tracing + logging</strong>. "Agent crash recovery?" → <strong>Checkpointing with persistent storage</strong>. Production deployment → <strong>LangGraph Platform</strong> (managed) or <strong>LangServe</strong> (self-hosted).</p></blockquote>

<h2 id="6-dli-cfx25-overview">6. DLI C-FX-25 — Agentic AI Course Overview</h2>

<h3 id="6-1-course-structure">6.1. Course Structure</h3>

<p>Course <strong>C-FX-25: "Building Agentic AI Applications"</strong> is an advanced module in DLI, focused on building production-ready Agentic AI systems. It complements S-FX-15 by diving deeper into agent architectures.</p>

<table>
<thead>
<tr><th>Module</th><th>Topics</th><th>Hands-On</th></tr>
</thead>
<tbody>
<tr><td>Module 1</td><td>Agent fundamentals, ReAct, tool calling</td><td>Build single agent with NVIDIA NIM</td></tr>
<tr><td>Module 2</td><td>LangGraph introduction, StateGraph</td><td>Implement custom agent graph</td></tr>
<tr><td>Module 3</td><td>Multi-agent architectures</td><td>Build supervisor multi-agent system</td></tr>
<tr><td>Module 4</td><td>Advanced: memory, planning, eval</td><td>Production deployment exercise</td></tr>
</tbody>
</table>

<h3 id="6-2-assessment-focus">6.2. Assessment Focus Areas</h3>

<p>C-FX-25 assessment focuses on <strong>hands-on implementation</strong>:</p>

<ul>
<li><strong>LangGraph StateGraph</strong> — define state, nodes, conditional edges</li>
<li><strong>Tool integration</strong> — bind tools to LLM, handle tool calls</li>
<li><strong>Supervisor routing</strong> — implement supervisor logic, route to workers</li>
<li><strong>Checkpointing</strong> — save/restore agent state</li>
<li><strong>Human-in-the-loop</strong> — interrupt_before, approve, resume</li>
</ul>

<h3 id="6-3-key-apis">6.3. Key APIs to Memorize</h3>

<table>
<thead>
<tr><th>API / Concept</th><th>Usage</th></tr>
</thead>
<tbody>
<tr><td><code>StateGraph(State)</code></td><td>Create graph with typed state</td></tr>
<tr><td><code>graph.add_node(name, func)</code></td><td>Add processing node</td></tr>
<tr><td><code>graph.add_edge(A, B)</code></td><td>Always route A → B</td></tr>
<tr><td><code>graph.add_conditional_edges(A, func, map)</code></td><td>Route based on function output</td></tr>
<tr><td><code>graph.set_entry_point(name)</code></td><td>Set starting node</td></tr>
<tr><td><code>graph.compile(checkpointer=...)</code></td><td>Compile graph, optional checkpointer</td></tr>
<tr><td><code>ToolNode(tools)</code></td><td>Pre-built node that executes tool calls</td></tr>
<tr><td><code>MemorySaver()</code></td><td>In-memory checkpointer (dev only)</td></tr>
<tr><td><code>interrupt_before=[node]</code></td><td>Pause before executing node</td></tr>
<tr><td><code>llm.bind_tools(tools)</code></td><td>Attach tools to LLM for function calling</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> C-FX-25 assessment requires <strong>writing LangGraph code from scratch</strong>. Remember the pattern: (1) Define State TypedDict, (2) Define nodes as functions, (3) Add nodes + edges, (4) Compile + run. You don't need to memorize APIs, but must understand the <strong>flow</strong>: state travels through nodes, conditional edges route dynamically.</p></blockquote>

<h2 id="7-cheat-sheet">7. Cheat Sheet</h2>

<table>
<thead>
<tr><th>Concept</th><th>Key Point</th></tr>
</thead>
<tbody>
<tr><td>Agent components</td><td>LLM + Memory + Tools + Planning</td></tr>
<tr><td>Agent loop</td><td>Perception → Reasoning → Action → Observation</td></tr>
<tr><td>Agent vs Chain</td><td>Agent = dynamic flow (LLM decides); Chain = fixed flow</td></tr>
<tr><td>ReAct</td><td>Interleave Thought + Action + Observation. Simple, myopic</td></tr>
<tr><td>Plan-and-Execute</td><td>Plan upfront → execute steps → replan if needed</td></tr>
<tr><td>LATS</td><td>Tree search over reasoning paths. Expensive but robust</td></tr>
<tr><td>Reflexion</td><td>Execute → self-reflect → retry with lessons</td></tr>
<tr><td>LangGraph</td><td>StateGraph: nodes + edges + conditional routing</td></tr>
<tr><td>LangGraph State</td><td>TypedDict shared across all nodes</td></tr>
<tr><td>Conditional edges</td><td>Router function decides next node</td></tr>
<tr><td>Checkpointing</td><td>MemorySaver (dev), SqliteSaver (prod). Enable resume</td></tr>
<tr><td>Human-in-the-loop</td><td>interrupt_before=[node] + compile with checkpointer</td></tr>
<tr><td>Supervisor pattern</td><td>Central LLM routes to specialized worker agents</td></tr>
<tr><td>Hierarchical</td><td>Nested supervisors — tree of agents</td></tr>
<tr><td>Swarm</td><td>Decentralized handoffs, no central supervisor</td></tr>
<tr><td>Debate</td><td>Agents argue, judge decides. Better reasoning</td></tr>
<tr><td>Max iterations</td><td>Always set to prevent infinite agent loops</td></tr>
<tr><td>ToolNode</td><td>LangGraph pre-built node to execute tool calls</td></tr>
<tr><td>C-FX-25 focus</td><td>LangGraph coding, multi-agent, checkpointing, HITL</td></tr>
</tbody>
</table>

<h2 id="8-practice-questions">8. Practice Questions — Coding</h2>

<p><strong>Q1: Build a basic LangGraph ReAct agent</strong></p>
<p>Build a simple LangGraph agent with 2 tools: <code>search_docs</code> (search documents) and <code>calculator</code> (perform calculations). Implement the full pipeline: State, agent node, tool node, conditional edge routing, compile and run.</p>

<details>
<summary>Show Answer Q1</summary>

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

<p><strong>Q2: Implement human-in-the-loop with LangGraph checkpointing</strong></p>
<p>Modify the agent from Q1 to add <strong>human-in-the-loop</strong>: the agent pauses before executing tools, and the user can approve or reject. Demonstrate: (1) compile with checkpointer + interrupt_before, (2) run and see the agent pause, (3) resume execution.</p>

<details>
<summary>Show Answer Q2</summary>

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

<p><strong>Q3: Build a Supervisor multi-agent system</strong></p>
<p>Implement a <strong>Supervisor pattern</strong> with 2 workers: <code>researcher</code> (uses web_search tool) and <code>writer</code> (uses write_report tool). The Supervisor receives tasks from the user, routes to the appropriate worker, and collects results. Implement routing logic with conditional edges.</p>

<details>
<summary>Show Answer Q3</summary>

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

<p><strong>Q4: Add Plan-and-Execute to a LangGraph agent</strong></p>
<p>Implement the <strong>Plan-and-Execute</strong> pattern: (1) Planner node creates a list of steps from the user query, (2) Executor node carries out each step, (3) Replanner node checks progress and adjusts the plan if needed. Store the plan in state.</p>

<details>
<summary>Show Answer Q4</summary>

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

<p><strong>Q5: Implement error handling and retry logic in multi-agent system</strong></p>
<p>Add <strong>error handling</strong> to a multi-agent system: (1) Tool failures return error messages instead of crashing, (2) Agent receives an error → retries with a different strategy (max 2 retries), (3) Agent state tracks retry count. Implement a node wrapper pattern.</p>

<details>
<summary>Show Answer Q5</summary>

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
