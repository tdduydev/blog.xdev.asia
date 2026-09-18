---
id: 019c9619-nv01-p4-l09
title: '第9課：Agentic AI — マルチエージェントシステム'
slug: bai-9-agentic-ai-multi-agent-systems
description: >-
  エージェント抽象化：知覚→推論→行動ループ。
  認知アーキテクチャ：ReAct、Plan-and-Execute、LATS。
  LangGraph：ステートフルなグラフベースのエージェントオーケストレーション。
  マルチエージェントシステム：Supervisor、階層型、Swarmパターン。
  本番環境対応のマルチエージェントアプリケーションを構築する。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 9
section_title: "パート4：Agentic AIとLLMカスタマイズ"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'NVIDIA DLI 試験対策 — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="1-agent-abstraction">1. エージェント抽象化 — LLM + Memory + Tools + Planning</h2>

<h3 id="1-1-agent-la-gi">1.1. エージェントとは？</h3>

<p>第8課ではシンプルな<strong>ReActエージェント</strong>——ツールを選択して回答するLLM——を紹介しました。第9課では<strong>Agentic AI</strong>に拡張します：LLMが<strong>中心的な頭脳</strong>として機能し、自律的に計画を立て、ツールを選択し、結果に対応し、他のエージェントと連携するシステムです。</p>

<p><strong>エージェント</strong>は4つのコアコンポーネントで構成されます：</p>

<ul>
<li><strong>LLM（頭脳）</strong> — 推論、意思決定、テキスト生成</li>
<li><strong>Memory</strong> — 短期記憶（会話バッファ）と長期記憶（ベクトルストア、データベース）</li>
<li><strong>Tools</strong> — エージェントが呼び出せる関数：検索、計算、API、コード実行</li>
<li><strong>Planning</strong> — 計画の作成、タスクの分解、エラー発生時の振り返り</li>
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

<h3 id="1-2-perception-reasoning-action-loop">1.2. 知覚 → 推論 → 行動 → 観察ループ</h3>

<p>すべてのエージェントは基本的なループで動作します：</p>

<ol>
<li><strong>知覚（Perception）</strong> — 入力を受け取る（ユーザーのクエリ、ツールの出力、環境からのフィードバック）</li>
<li><strong>推論（Reasoning）</strong> — LLMが推論する：「次に何をすべきか？どのツールを使うか？十分な情報があるか？」</li>
<li><strong>行動（Action）</strong> — アクションを実行する：ツールの呼び出し、テキスト生成、ユーザーへの回答</li>
<li><strong>観察（Observation）</strong> — アクションの結果を受け取り、知覚にフィードバック → 繰り返す</li>
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
         Final Answerが出るまでループが継続
</code></pre>

<h3 id="1-3-levels-of-agency">1.3. エージェンシーのレベル</h3>

<p>すべてのLLMアプリケーションに完全なエージェントが必要なわけではありません。NVIDIA DLIでは<strong>エージェンシー</strong>のレベルを以下のように区別しています：</p>

<table>
<thead>
<tr><th>レベル</th><th>パターン</th><th>LLMの役割</th><th>例</th></tr>
</thead>
<tbody>
<tr><td>L0 — エージェンシーなし</td><td>単純なプロンプト→応答</td><td>テキスト生成器</td><td>FAQチャットボット</td></tr>
<tr><td>L1 — ツール使用</td><td>LLMが1つのツールを選択</td><td>ルーター</td><td>Function calling API</td></tr>
<tr><td>L2 — シングルエージェント</td><td>ReActループ、マルチステップ</td><td>プランナー＋実行者</td><td>RAG Agent（第8課）</td></tr>
<tr><td>L3 — マルチエージェント</td><td>複数のエージェントが連携</td><td>コーディネーター</td><td>Supervisor + Workers</td></tr>
<tr><td>L4 — 自律型</td><td>自己改善、長時間実行</td><td>自律システム</td><td>AI Scientist、Devin</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のヒント：</strong>「LLMが自律的にタスクを分解し、複数のツールを呼び出し、必要に応じてリトライする」→ <strong>Agent（L2以上）</strong>。「複数のLLMが連携し、それぞれが1つのタスクを専門とする」→ <strong>Multi-Agent（L3）</strong>。DLI試験でよく出る問題：「エージェントとチェーンの違いは？」→ エージェントは<strong>動的な制御フロー</strong>（LLMが次のステップを決定）、チェーンは<strong>固定の制御フロー</strong>です。</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai9-multi-agent-system.webp" alt="Multi-Agent System — Orchestrator, Specialized Agents, LangGraph State Machine" loading="lazy" /><figcaption>マルチエージェントシステム — オーケストレーター、専門エージェント、LangGraph State Machine</figcaption></figure>

<h2 id="2-cognitive-architectures">2. LLMエージェントの認知アーキテクチャ</h2>

<h3 id="2-1-react">2.1. ReAct — Reasoning + Acting</h3>

<p><strong>ReAct</strong>（第8課で紹介）は<strong>Thought</strong>（推論）と<strong>Action</strong>（行動）を交互に実行します。強み：シンプルで透明性が高い。弱み：長期的な計画がない——エージェントは<em>次のステップ</em>のみを考え、全体像を見ません。</p>

<h3 id="2-2-plan-and-execute">2.2. Plan-and-Execute</h3>

<p><strong>Plan-and-Execute</strong>は2つのフェーズを明確に分離します：(1) Planner LLMが事前に完全な計画を作成、(2) Executor LLMが各ステップを実行。各ステップ後にPlannerは<strong>再計画</strong>（計画の調整）が可能です。</p>

<pre><code class="language-text">
Plan-and-Execute Architecture
══════════════════════════════════════════════════════════

  User: "Q3の売上を分析し、Q2と比較し、レポートを作成して"
       │
       ▼
  ┌─────────────────────────────────────────────┐
  │  PLANNER LLM                                │
  │  Plan:                                      │
  │    Step 1: Q3の売上データを取得              │
  │    Step 2: Q2の売上データを取得              │
  │    Step 3: Q2→Q3の変化を計算                │
  │    Step 4: 比較レポートを作成                │
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
                │ REPLAN?       │──► ステップ失敗時 → 計画を調整
                │ All done?     │──► 完了時 → Step 4: レポート
                └───────────────┘
</code></pre>

<h3 id="2-3-lats">2.3. LATS — Language Agent Tree Search</h3>

<p><strong>LATS</strong>は<strong>モンテカルロ木探索（MCTS）</strong>とLLM推論を組み合わせます。単一パスを辿る（ReAct）代わりに、LATSは複数の解法分岐を探索し、LLMを使って各分岐を評価し、最良のものを選択します。LLMがチェスをプレイするように——数手先を読みます。</p>

<h3 id="2-4-reflexion">2.4. Reflexion — 失敗から学ぶ</h3>

<p><strong>Reflexion</strong>は<strong>自己振り返り</strong>ステップを追加します：タスク完了後、エージェントが結果を自己評価 → 誤りがあれば「学んだ教訓」をメモリに書き込み → 前回の経験を活かしてリトライします。これはセルフフィードバックによる<em>インコンテキスト学習</em>の一形態です。</p>

<h3 id="2-5-comparison-table">2.5. 認知アーキテクチャの比較</h3>

<table>
<thead>
<tr><th>アーキテクチャ</th><th>計画</th><th>実行</th><th>強み</th><th>弱み</th></tr>
</thead>
<tbody>
<tr><td><strong>ReAct</strong></td><td>ステップごと（近視眼的）</td><td>思考＋行動を交互に</td><td>シンプル、透明性が高い</td><td>全体計画なし、ループの可能性</td></tr>
<tr><td><strong>Plan-and-Execute</strong></td><td>事前に完全な計画</td><td>順次実行</td><td>全体把握、LLM呼び出し回数が少ない</td><td>ステップ実行後に計画が陳腐化する可能性</td></tr>
<tr><td><strong>LATS</strong></td><td>木探索（探索型）</td><td>最良優先探索</td><td>代替案を探索、堅牢</td><td>非常に高コスト（多数のLLM呼び出し）</td></tr>
<tr><td><strong>Reflexion</strong></td><td>試行錯誤＋メモリ</td><td>実行→振り返り→リトライ</td><td>失敗から学習</td><td>収束が遅い、評価器が必要</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のヒント：</strong>「エージェントが実行前に計画全体を考え抜く必要がある」→ <strong>Plan-and-Execute</strong>。「エージェントが複数の解法パスを試し、最良のものを選ぶ」→ <strong>LATS</strong>。「エージェントが結果を自己評価し改善する」→ <strong>Reflexion</strong>。「エージェントが思考と行動を交互に行う」→ <strong>ReAct</strong>。DLI試験では通常、最も広く使われている2つのアーキテクチャとして<strong>ReAct</strong>と<strong>Plan-and-Execute</strong>が重点的に出題されます。</p></blockquote>

<h2 id="3-langgraph">3. LangGraph — ステートフルなグラフベースのエージェントオーケストレーション</h2>

<h3 id="3-1-tai-sao-langgraph">3.1. なぜLangGraphなのか？</h3>

<p>LangChainの<strong>AgentExecutor</strong>（第8課）は「ブラックボックス」——制御フローのカスタマイズが困難です。<strong>LangGraph</strong>はLangChainのライブラリで、エージェントを<strong>有向グラフ</strong>として構築できます：各ノードは処理ステップ、エッジはフローを定義し、条件付きエッジは状態に基づいた分岐を可能にします。</p>

<table>
<thead>
<tr><th>機能</th><th>AgentExecutor</th><th>LangGraph</th></tr>
</thead>
<tbody>
<tr><td>制御フロー</td><td>固定のReActループ</td><td>カスタムグラフ——フローを自由に設計</td></tr>
<tr><td>状態管理</td><td>隠蔽された内部状態</td><td>明示的な<code>TypedDict</code>状態</td></tr>
<tr><td>マルチエージェント</td><td>ネイティブサポートなし</td><td>ファーストクラス：各エージェント＝サブグラフ</td></tr>
<tr><td>Human-in-the-loop</td><td>限定的</td><td>組み込み：interrupt、approve、edit</td></tr>
<tr><td>永続化</td><td>組み込みなし</td><td>Checkpointer：状態の保存/復元</td></tr>
<tr><td>ストリーミング</td><td>基本的</td><td>イベントごとのストリーミング</td></tr>
<tr><td>デバッグ</td><td>LangSmithでトレース</td><td>グラフ可視化＋LangSmith</td></tr>
</tbody>
</table>

<h3 id="3-2-core-concepts">3.2. コアコンセプト — StateGraph、Nodes、Edges</h3>

<p>LangGraphは3つのコンセプトで構成されています：</p>

<ul>
<li><strong>State</strong> — ノード間で渡されるすべてのデータを保持するTypedDict。各ノードが状態を読み書きします。</li>
<li><strong>Nodes</strong> — Python関数。入力：state → 出力：部分的な状態更新（更新が必要なフィールドのみ）。</li>
<li><strong>Edges</strong> — ノード間の接続。<code>add_edge(A, B)</code> = 常にA→B。<code>add_conditional_edges(A, func)</code> = funcが行き先を決定。</li>
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

  Nodes: 状態を読み書きするPython関数
  Edges: 静的（常時）または条件付き（関数が決定）
</code></pre>

<h3 id="3-3-code-basic-langgraph-agent">3.3. コード：基本的なLangGraphエージェント</h3>

<pre><code class="language-python">
from typing import TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain_core.tools import tool
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
import operator

# === 1. Stateの定義 ===
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]

# === 2. Toolsの定義 ===
@tool
def search_docs(query: str) -> str:
    """Search internal documents for company information."""
    # 検索をシミュレート
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
        return str(eval(expression))  # 本番環境ではsafe evalを使用
    except Exception as e:
        return f"Error: {e}"

tools = [search_docs, calculator]

# === 3. ツール付きLLMの定義 ===
llm = ChatNVIDIA(
    model="meta/llama-3.1-70b-instruct",
    temperature=0.1
).bind_tools(tools)

# === 4. Nodesの定義 ===
def agent_node(state: AgentState) -> dict:
    """LLMが判断：ツールを呼ぶか、応答するか。"""
    response = llm.invoke(state["messages"])
    return {"messages": [response]}

tool_node = ToolNode(tools)

# === 5. ルーティングの定義 ===
def should_continue(state: AgentState) -> str:
    last_message = state["messages"][-1]
    if last_message.tool_calls:
        return "tools"    # LLMがツールを呼びたい
    return "end"          # LLM完了、回答を返す

# === 6. グラフの構築 ===
graph = StateGraph(AgentState)

graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)

graph.set_entry_point("agent")
graph.add_conditional_edges("agent", should_continue, {
    "tools": "tools",
    "end": END,
})
graph.add_edge("tools", "agent")  # ツール実行後 → エージェントに戻る

app = graph.compile()

# === 7. 実行 ===
result = app.invoke({
    "messages": [HumanMessage(content="What is the leave policy?")]
})
print(result["messages"][-1].content)
</code></pre>

<h3 id="3-4-human-in-the-loop">3.4. Human-in-the-Loop</h3>

<p>LangGraphは危険なアクションを実行する前に<strong>interrupt</strong>をサポートしています——例えばメール送信、データ削除、コード実行など。エージェントは一時停止し、ユーザーの承認を待ってから続行します。</p>

<pre><code class="language-python">
from langgraph.checkpoint.memory import MemorySaver

# 中断＋再開のためにcheckpointer付きでコンパイル
checkpointer = MemorySaver()
app = graph.compile(
    checkpointer=checkpointer,
    interrupt_before=["tools"]   # "tools"ノード実行前に一時停止
)

# 実行 — "tools"ノードの前で一時停止
config = {"configurable": {"thread_id": "user-123"}}
result = app.invoke(
    {"messages": [HumanMessage(content="Delete file report.pdf")]},
    config=config,
)

# 保留中のツール呼び出しを確認
pending = result["messages"][-1].tool_calls
print(f"Agent wants to: {pending}")
# → Agent wants to: [{'name': 'delete_file', 'args': {'path': 'report.pdf'}}]

# ユーザーが承認 → 続行
final = app.invoke(None, config=config)  # チェックポイントから再開
</code></pre>

<h3 id="3-5-checkpointing">3.5. Checkpointing — 状態の保存と復元</h3>

<p><strong>Checkpointer</strong>は各ノード後に状態を保存し、以下を可能にします：</p>

<ul>
<li><strong>復元</strong> — エージェントが実行中にクラッシュ → チェックポイントを読み込み → 続行</li>
<li><strong>タイムトラベル</strong> — 任意のチェックポイントに戻る → 異なる入力でリトライ</li>
<li><strong>Human-in-the-loop</strong> — 一時停止、ユーザー待機、再開（上記の通り）</li>
<li><strong>マルチターン</strong> — 複数ターンにわたる会話履歴の維持</li>
</ul>

<blockquote><p><strong>試験のヒント：</strong>「カスタム制御フロー、条件分岐を持つエージェントを構築」→ <strong>LangGraph</strong>（AgentExecutorではない）。「人間の承認のためにエージェント実行を一時停止」→ <strong>interrupt_before + checkpointer</strong>。「エージェントの状態を保存し、後で再開」→ <strong>LangGraph checkpointing</strong>。DLI C-FX-25でよく出る問題：「なぜAgentExecutorではなくLangGraphを使うのか？」→ <strong>カスタムフロー、マルチエージェント、永続化、Human-in-the-loop</strong>。</p></blockquote>

<h2 id="4-multi-agent-patterns">4. マルチエージェントパターン</h2>

<h3 id="4-1-tai-sao-multi-agent">4.1. なぜマルチエージェントなのか？</h3>

<p>20以上のツールを持つ単一エージェントは問題に直面します：<strong>ツール選択の混乱</strong>（ツールが多すぎてLLMが間違ったものを選ぶ）、<strong>プロンプトが長すぎる</strong>（すべての指示を含む必要がある）、<strong>デバッグが困難</strong>（エージェントがどこで失敗したか不明確）。マルチエージェントは<strong>分解</strong>によってこれを解決します：各エージェントが少数のツールで1つのタスクを専門とします。</p>

<h3 id="4-2-supervisor-pattern">4.2. Supervisorパターン</h3>

<p><strong>Supervisorエージェント</strong>（LLM）がユーザーからタスクを受け取り、<strong>Workerエージェント</strong>に委任し、結果を収集し、最終回答を統合します。</p>

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
              │   判断：               │
              │   • 次はどのWorker？   │
              │   • すべて完了？       │
              │   • ルート変更必要？   │
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

<h3 id="4-3-hierarchical-pattern">4.3. 階層型パターン</h3>

<p><strong>階層型</strong>はSupervisorを拡張します：各Workerがそれ自体サブWorkerのSupervisorになることができます。複雑な組織に適しています——例えばCEOエージェント → マネージャーエージェント → スペシャリストエージェント。</p>

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

<h3 id="4-4-swarm-pattern">4.4. Swarmパターン</h3>

<p><strong>Swarm</strong>（OpenAI Swarmのコンセプト）——Supervisorなし。エージェントはコンテキストに基づいて互いにハンドオフします。エージェントAが「このタスクはエージェントBの専門領域だ」と判断 → 自動的にハンドオフします。</p>

<h3 id="4-5-debate-pattern">4.5. Debateパターン</h3>

<p><strong>Debate</strong> ——2つ以上のエージェントが質問について議論します。各エージェントが自分の見解を提示し、相手に反論します。最後にJudgeエージェントが最良の結論を選択します。このパターンは複雑な質問に対する推論品質を向上させます。</p>

<h3 id="4-6-pattern-comparison">4.6. マルチエージェントパターンの比較</h3>

<table>
<thead>
<tr><th>パターン</th><th>制御フロー</th><th>コミュニケーション</th><th>最適な用途</th></tr>
</thead>
<tbody>
<tr><td><strong>Supervisor</strong></td><td>集中型——Supervisorがルーティング</td><td>ハブ＆スポーク</td><td>明確なタスク委任、中程度の複雑さ</td></tr>
<tr><td><strong>階層型</strong></td><td>多段階の監督</td><td>ツリー構造</td><td>複雑な組織、多くの専門サブチーム</td></tr>
<tr><td><strong>Swarm</strong></td><td>分散型——エージェントがハンドオフ</td><td>ピアツーピア</td><td>カスタマーサービス、ルーティング、柔軟なフロー</td></tr>
<tr><td><strong>Debate</strong></td><td>ラウンドロビンの議論</td><td>ブロードキャスト＋Judge</td><td>複雑な推論、事実検証</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のヒント：</strong>「1つのLLMが専門エージェントにタスクをルーティング」→ <strong>Supervisor</strong>。「エージェントが中央制御なしに互いにハンドオフ」→ <strong>Swarm</strong>。「複数のエージェントが議論し、Judgeが決定」→ <strong>Debate</strong>。「サブチームを管理するネストされたSupervisor」→ <strong>階層型</strong>。DLI試験では、本番環境で最も一般的な<strong>Supervisorパターン</strong>が重点的に出題されます。</p></blockquote>

<h3 id="4-7-code-supervisor-multi-agent">4.7. コード：LangGraphによるSupervisorマルチエージェント</h3>

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
    """Supervisorが次にどのWorkerにルーティングするか判断。"""
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

# === ルーティング ===
def route_supervisor(state: MultiAgentState) -> str:
    next_agent = state.get("next_agent", "FINISH")
    if next_agent == "FINISH":
        return "end"
    return next_agent

# === グラフの構築 ===
graph = StateGraph(MultiAgentState)

graph.add_node("supervisor", supervisor_node)
graph.add_node("researcher", researcher_node)
graph.add_node("coder", coder_node)
graph.add_node("reporter", reporter_node)
graph.add_node("researcher_tools", ToolNode([web_search]))
graph.add_node("coder_tools", ToolNode([run_python]))
graph.add_node("reporter_tools", ToolNode([write_report]))

graph.set_entry_point("supervisor")

# SupervisorがWorkerにルーティング
graph.add_conditional_edges("supervisor", route_supervisor, {
    "researcher": "researcher",
    "coder": "coder",
    "reporter": "reporter",
    "end": END,
})

# Workers → ツールノード → Supervisorに戻る
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

# === 実行 ===
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

<h2 id="5-build-production-ready">5. 本番環境対応のマルチエージェントアプリの構築</h2>

<h3 id="5-1-research-assistant">5.1. Research Assistant — 完全な例</h3>

<p>3つのエージェントを持つ完全な<strong>Research Assistant</strong>を構築します：<strong>Researcher</strong>（情報検索）、<strong>Coder</strong>（データ分析）、<strong>Reporter</strong>（レポート作成）。エラーハンドリング、リトライロジック、構造化出力を含みます。</p>

<pre><code class="language-python">
from typing import TypedDict, Annotated, Sequence, Optional
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage, AIMessage
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain_core.tools import tool
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
import operator
import json

# === 拡張State ===
class ResearchState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    research_data: Optional[str]       # 収集した調査データ
    analysis_result: Optional[str]     # コード分析の出力
    final_report: Optional[str]        # フォーマット済みレポート
    current_agent: str
    iteration: int                     # ループ防止のためイテレーションを追跡

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

# === エージェントノード ===
base_llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct")

def researcher_node(state: ResearchState) -> dict:
    llm = base_llm.bind_tools([search_arxiv, search_web])
    system = SystemMessage(content=(
        "You are a research specialist. Search for papers and web results "
        "to gather comprehensive information. Summarize findings clearly."
    ))
    response = llm.invoke([system] + list(state["messages"]))

    # ツール呼び出しがなければ調査完了 — データを抽出
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
        next_agent = "researcher"  # デフォルトのフォールバック

    return {"current_agent": next_agent, "iteration": iteration}

# === ルーティング ===
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

# === グラフの構築 ===
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

# チェックポイント付きでコンパイル
checkpointer = MemorySaver()
app = graph.compile(checkpointer=checkpointer)

# === 実行 ===
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

# 最終レポートを出力
print(result.get("final_report", result["messages"][-1].content))
</code></pre>

<h3 id="5-2-production-best-practices">5.2. 本番環境のベストプラクティス</h3>

<table>
<thead>
<tr><th>プラクティス</th><th>理由</th><th>実装方法</th></tr>
</thead>
<tbody>
<tr><td><strong>最大イテレーション数</strong></td><td>無限ループの防止</td><td>状態に<code>iteration</code>カウンター、Supervisorでチェック</td></tr>
<tr><td><strong>エラーハンドリング</strong></td><td>ツールの失敗でエージェントがクラッシュしない</td><td>ツール内のtry/except、エラーメッセージを返す</td></tr>
<tr><td><strong>チェックポイント</strong></td><td>クラッシュ後の復元</td><td><code>MemorySaver</code>（開発用） / <code>SqliteSaver</code>（本番用）</td></tr>
<tr><td><strong>構造化出力</strong></td><td>信頼性の高いルーティング判断</td><td>Supervisorの出力を有効な選択肢に制約</td></tr>
<tr><td><strong>オブザーバビリティ</strong></td><td>マルチエージェントのデバッグは困難</td><td>LangSmithトレース、各ノードの入出力ログ</td></tr>
<tr><td><strong>ノードごとのタイムアウト</strong></td><td>単一ノードがブロックしない</td><td>LLM呼び出しとツール実行にタイムアウトを設定</td></tr>
<tr><td><strong>Human-in-the-loop</strong></td><td>重要なアクションには承認が必要</td><td>危険なツールノードに<code>interrupt_before</code></td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のヒント：</strong>「エージェントの無限ループを防ぐには？」→ <strong>max_iterations + イテレーションカウンター</strong>。「マルチエージェントシステムのデバッグ方法は？」→ <strong>LangSmithトレース＋ロギング</strong>。「エージェントのクラッシュリカバリは？」→ <strong>永続ストレージによるチェックポイント</strong>。本番デプロイ → <strong>LangGraph Platform</strong>（マネージド）または<strong>LangServe</strong>（セルフホスト）。</p></blockquote>

<h2 id="6-dli-cfx25-overview">6. DLI C-FX-25 — Agentic AIコース概要</h2>

<h3 id="6-1-course-structure">6.1. コース構成</h3>

<p>コース<strong>C-FX-25：「Building Agentic AI Applications」</strong>はDLIの上級モジュールで、本番環境対応のAgentic AIシステムの構築に焦点を当てています。S-FX-15を補完し、エージェントアーキテクチャをより深く掘り下げます。</p>

<table>
<thead>
<tr><th>モジュール</th><th>トピック</th><th>ハンズオン</th></tr>
</thead>
<tbody>
<tr><td>モジュール1</td><td>エージェントの基礎、ReAct、ツール呼び出し</td><td>NVIDIA NIMでシングルエージェントを構築</td></tr>
<tr><td>モジュール2</td><td>LangGraph入門、StateGraph</td><td>カスタムエージェントグラフの実装</td></tr>
<tr><td>モジュール3</td><td>マルチエージェントアーキテクチャ</td><td>Supervisorマルチエージェントシステムの構築</td></tr>
<tr><td>モジュール4</td><td>上級：メモリ、計画、評価</td><td>本番デプロイの演習</td></tr>
</tbody>
</table>

<h3 id="6-2-assessment-focus">6.2. 評価の重点領域</h3>

<p>C-FX-25の評価は<strong>ハンズオンの実装</strong>に焦点を当てています：</p>

<ul>
<li><strong>LangGraph StateGraph</strong> — 状態、ノード、条件付きエッジの定義</li>
<li><strong>ツール統合</strong> — LLMへのツールのバインド、ツール呼び出しの処理</li>
<li><strong>Supervisorルーティング</strong> — Supervisorロジックの実装、Workerへのルーティング</li>
<li><strong>チェックポイント</strong> — エージェント状態の保存/復元</li>
<li><strong>Human-in-the-loop</strong> — interrupt_before、承認、再開</li>
</ul>

<h3 id="6-3-key-apis">6.3. 覚えておくべき主要API</h3>

<table>
<thead>
<tr><th>API / コンセプト</th><th>用途</th></tr>
</thead>
<tbody>
<tr><td><code>StateGraph(State)</code></td><td>型付き状態でグラフを作成</td></tr>
<tr><td><code>graph.add_node(name, func)</code></td><td>処理ノードを追加</td></tr>
<tr><td><code>graph.add_edge(A, B)</code></td><td>常にA → Bにルーティング</td></tr>
<tr><td><code>graph.add_conditional_edges(A, func, map)</code></td><td>関数の出力に基づいてルーティング</td></tr>
<tr><td><code>graph.set_entry_point(name)</code></td><td>開始ノードを設定</td></tr>
<tr><td><code>graph.compile(checkpointer=...)</code></td><td>グラフをコンパイル、オプションでcheckpointer</td></tr>
<tr><td><code>ToolNode(tools)</code></td><td>ツール呼び出しを実行するプリビルトノード</td></tr>
<tr><td><code>MemorySaver()</code></td><td>インメモリcheckpointer（開発用のみ）</td></tr>
<tr><td><code>interrupt_before=[node]</code></td><td>ノード実行前に一時停止</td></tr>
<tr><td><code>llm.bind_tools(tools)</code></td><td>Function calling用にLLMにツールをアタッチ</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のヒント：</strong>C-FX-25の評価では<strong>LangGraphコードをゼロから書く</strong>ことが求められます。パターンを覚えましょう：(1) State TypedDictの定義、(2) ノードを関数として定義、(3) ノード＋エッジの追加、(4) コンパイル＋実行。APIを暗記する必要はありませんが、<strong>フロー</strong>を理解する必要があります：状態がノードを通じて流れ、条件付きエッジが動的にルーティングします。</p></blockquote>

<h2 id="7-cheat-sheet">7. チートシート</h2>

<table>
<thead>
<tr><th>コンセプト</th><th>要点</th></tr>
</thead>
<tbody>
<tr><td>エージェントのコンポーネント</td><td>LLM + Memory + Tools + Planning</td></tr>
<tr><td>エージェントループ</td><td>知覚 → 推論 → 行動 → 観察</td></tr>
<tr><td>Agent vs Chain</td><td>Agent = 動的フロー（LLMが決定）；Chain = 固定フロー</td></tr>
<tr><td>ReAct</td><td>Thought + Action + Observationを交互に。シンプル、近視眼的</td></tr>
<tr><td>Plan-and-Execute</td><td>事前に計画 → ステップ実行 → 必要に応じて再計画</td></tr>
<tr><td>LATS</td><td>推論パスの木探索。高コストだが堅牢</td></tr>
<tr><td>Reflexion</td><td>実行 → 自己振り返り → 教訓を活かしてリトライ</td></tr>
<tr><td>LangGraph</td><td>StateGraph：ノード＋エッジ＋条件付きルーティング</td></tr>
<tr><td>LangGraph State</td><td>すべてのノードで共有されるTypedDict</td></tr>
<tr><td>条件付きエッジ</td><td>ルーター関数が次のノードを決定</td></tr>
<tr><td>チェックポイント</td><td>MemorySaver（開発用）、SqliteSaver（本番用）。再開を可能にする</td></tr>
<tr><td>Human-in-the-loop</td><td>interrupt_before=[node] + checkpointer付きでコンパイル</td></tr>
<tr><td>Supervisorパターン</td><td>中央LLMが専門Workerエージェントにルーティング</td></tr>
<tr><td>階層型</td><td>ネストされたSupervisor——エージェントのツリー</td></tr>
<tr><td>Swarm</td><td>分散型ハンドオフ、中央Supervisorなし</td></tr>
<tr><td>Debate</td><td>エージェントが議論、Judgeが決定。推論品質向上</td></tr>
<tr><td>最大イテレーション数</td><td>無限のエージェントループを防ぐため必ず設定</td></tr>
<tr><td>ToolNode</td><td>ツール呼び出しを実行するLangGraphプリビルトノード</td></tr>
<tr><td>C-FX-25の焦点</td><td>LangGraphコーディング、マルチエージェント、チェックポイント、HITL</td></tr>
</tbody>
</table>

<h2 id="8-practice-questions">8. 練習問題 — コーディング</h2>

<p><strong>Q1：基本的なLangGraph ReActエージェントの構築</strong></p>
<p>2つのツールを持つシンプルなLangGraphエージェントを構築してください：<code>search_docs</code>（ドキュメント検索）と<code>calculator</code>（計算実行）。完全なパイプラインを実装します：State、エージェントノード、ツールノード、条件付きエッジルーティング、コンパイルと実行。</p>

<details>
<summary>回答Q1を表示</summary>

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

# 3. ツール付きLLM
llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct", temperature=0.0)
llm_with_tools = llm.bind_tools(tools)

# 4. ノード
def agent_node(state: AgentState) -> dict:
    response = llm_with_tools.invoke(state["messages"])
    return {"messages": [response]}

tool_node = ToolNode(tools)

# 5. ルーター
def should_continue(state: AgentState) -> str:
    last = state["messages"][-1]
    if hasattr(last, "tool_calls") and last.tool_calls:
        return "tools"
    return "end"

# 6. グラフの構築
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

# 7. 実行
result = app.invoke({
    "messages": [HumanMessage(content="What is 25 * 4 + 100?")]
})
print(result["messages"][-1].content)
</code></pre>
</details>

<p><strong>Q2：LangGraphチェックポイントによるHuman-in-the-Loopの実装</strong></p>
<p>Q1のエージェントを修正して<strong>Human-in-the-Loop</strong>を追加してください：エージェントがツール実行前に一時停止し、ユーザーが承認または拒否できるようにします。デモ：(1) checkpointer + interrupt_before付きでコンパイル、(2) 実行してエージェントの一時停止を確認、(3) 実行を再開。</p>

<details>
<summary>回答Q2を表示</summary>

<pre><code class="language-python">
from langgraph.checkpoint.memory import MemorySaver

# Q1のグラフを再利用、HITL付きでコンパイル
checkpointer = MemorySaver()
app_hitl = graph.compile(
    checkpointer=checkpointer,
    interrupt_before=["tools"]  # ツール実行前に一時停止
)

# 実行 — エージェントはツール呼び出し前に一時停止
config = {"configurable": {"thread_id": "hitl-demo-001"}}
result = app_hitl.invoke(
    {"messages": [HumanMessage(content="Calculate 1000 / 4")]},
    config=config,
)

# エージェントが一時停止 — 何をしようとしているか確認
last_msg = result["messages"][-1]
print("Agent wants to call:")
for tc in last_msg.tool_calls:
    print(f"  Tool: {tc['name']}, Args: {tc['args']}")

# ユーザーが承認 → 再開（チェックポイントから続行するためNoneを渡す）
final_result = app_hitl.invoke(None, config=config)
print("\nFinal answer:", final_result["messages"][-1].content)

# ユーザーが拒否する場合 → 状態を変更するか、ここで停止
# 拒否するには：invoke(None, config)を呼ばないだけ
</code></pre>
</details>

<p><strong>Q3：Supervisorマルチエージェントシステムの構築</strong></p>
<p>2つのWorkerを持つ<strong>Supervisorパターン</strong>を実装してください：<code>researcher</code>（web_searchツールを使用）と<code>writer</code>（write_reportツールを使用）。Supervisorがユーザーからタスクを受け取り、適切なWorkerにルーティングし、結果を収集します。条件付きエッジによるルーティングロジックを実装します。</p>

<details>
<summary>回答Q3を表示</summary>

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

# 構築
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

# Researcherフロー
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

# Writerフロー
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

<p><strong>Q4：LangGraphエージェントにPlan-and-Executeを追加</strong></p>
<p><strong>Plan-and-Execute</strong>パターンを実装してください：(1) Plannerノードがユーザーのクエリからステップのリストを作成、(2) Executorノードが各ステップを実行、(3) Replannerノードが進捗を確認し必要に応じて計画を調整。計画を状態に保存します。</p>

<details>
<summary>回答Q4を表示</summary>

<pre><code class="language-python">
from typing import TypedDict, Annotated, Sequence, List, Optional
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langgraph.graph import StateGraph, END
import operator, json

class PlanExecState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    plan: List[str]          # ステップのリスト
    current_step: int        # 現在のステップのインデックス
    step_results: List[str]  # 各ステップの結果
    done: bool

llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct", temperature=0.0)

def planner_node(state: PlanExecState) -> dict:
    """ユーザーのリクエストから計画を作成。"""
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
    """計画の現在のステップを実行。"""
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
    """進捗を確認し、必要に応じて計画を調整。"""
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

# グラフの構築
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

<p><strong>Q5：マルチエージェントシステムにエラーハンドリングとリトライロジックを実装</strong></p>
<p>マルチエージェントシステムに<strong>エラーハンドリング</strong>を追加してください：(1) ツールの失敗がクラッシュの代わりにエラーメッセージを返す、(2) エージェントがエラーを受信 → 異なる戦略でリトライ（最大2回）、(3) エージェントの状態がリトライ回数を追跡。ノードラッパーパターンを実装します。</p>

<details>
<summary>回答Q5を表示</summary>

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

# エラーハンドリング組み込みのツール
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

# エラーハンドリング付きのツールラッパー
def safe_tool_node(tools):
    """エラーをキャッチしてエラーメッセージを返すToolNodeラッパー。"""
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

    # エラーが多すぎる場合、適切に終了
    if error_count >= max_retries:
        return {"messages": [AIMessage(
            content="I encountered multiple errors. Here's what I could gather "
                    "from successful attempts: " +
                    " | ".join(m.content for m in state["messages"][-3:])
        )]}

    # エラーがあった場合、リトライコンテキストを追加
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

    # 最大リトライを超えた場合停止
    if error_count >= max_retries and not (
        hasattr(last, "tool_calls") and last.tool_calls
    ):
        return "end"

    if hasattr(last, "tool_calls") and last.tool_calls:
        return "tools"
    return "end"

# 構築
g = StateGraph(RobustState)
g.add_node("agent", agent_node)
g.add_node("tools", safe_tool_node(tools))
g.set_entry_point("agent")
g.add_conditional_edges("agent", should_continue, {
    "tools": "tools",
    "end": END,
})
g.add_edge("tools", "agent")  # ツール結果 → エージェントに戻る

app = g.compile()

result = app.invoke({
    "messages": [HumanMessage(content="Call the user-data API endpoint")],
    "error_count": 0,
    "max_retries": 2,
})
print(result["messages"][-1].content)
</code></pre>
</details>
