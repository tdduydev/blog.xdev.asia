---
id: 019c9619-nv01-p3-l08
title: '第8課：RAGエージェント — 構築と評価'
slug: bai-8-rag-agent-build-evaluate
description: >-
  RAGエージェントの構築：検索＋ツール＋推論の統合。
  マルチターン対話型RAG。
  評価指標：忠実性、関連性、正確性。
  LLM-as-Judge評価パターン。
  DLI S-FX-15の試験対策。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 8
section_title: "パート3：LLMアプリケーションとRAG"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'NVIDIA DLI 試験対策 — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="1-from-rag-pipeline-to-rag-agent">1. RAGパイプラインからRAGエージェントへ</h2>

<h3 id="1-1-han-che-cua-static-rag">1.1. 静的RAGの限界</h3>

<p>第7課では<strong>静的RAGパイプライン</strong>を構築しました — K件のドキュメントを検索 → プロンプトに挿入 → LLMが回答。このパイプラインは単純な質問には有効ですが、3つの重大な限界があります：</p>

<ul>
<li><strong>推論がない</strong> — パイプラインは常に検索→生成を行い、「検索すべきか？」「追加のステップが必要か？」を判断できません。</li>
<li><strong>ツールが使えない</strong> — データソースはベクトルストアの1つだけです。APIの呼び出し、計算、Web検索はできません。</li>
<li><strong>検索が1回のみ</strong> — 1回だけ検索します。結果が不十分でも、別のクエリで再検索できません。</li>
<li><strong>記憶がない</strong> — 各質問は独立して処理されます。前の質問のコンテキストを記憶できません。</li>
</ul>

<h3 id="1-2-rag-agent-retrieval-as-a-tool">1.2. RAGエージェント — ツールとしての検索</h3>

<p><strong>RAGエージェント</strong>は、検索をLLMが選択できる<em>多くのツールの1つ</em>に変えることで、静的RAGをアップグレードします。エージェントは以下のことができます：</p>

<ul>
<li><strong>いつ検索するかを判断</strong> — すでに答えを知っている場合 → 検索不要</li>
<li><strong>どのツールを選択するかを判断</strong> — 社内文書にはリトリーバー、ニュースにはWeb検索、計算には電卓</li>
<li><strong>反復的な推論</strong> — 検索 → 情報不足と判断 → 別のクエリで再検索</li>
<li><strong>複数ソースからの統合</strong> — 複数ツールの結果を組み合わせて回答</li>
</ul>

<h3 id="1-3-react-pattern">1.3. ReActパターン — Thought → Action → Observation</h3>

<p><strong>ReAct（Reasoning + Acting）</strong>はLLMエージェントで最も一般的なパターンです。LLMはループを実行します：思考（Thought）→ アクション選択（Action）→ 結果の観察（Observation）→ 最終回答（Final Answer）が得られるまで繰り返します。</p>

<pre><code class="language-text">
ReAct Agent Loop — RAGエージェントの意思決定フロー
══════════════════════════════════════════════════════════════════

  ユーザー: "第3四半期の会社の売上を業界平均と比較して"
       │
       ▼
  ┌─────────────────────────────────────────────────────────┐
  │  THOUGHT: 2つの情報が必要 — 社内の売上 +               │
  │           業界平均                                      │
  │  ACTION:  retriever_tool("第3四半期 会社の売上")         │
  └────────────────────────┬────────────────────────────────┘
                           │
                           ▼
  ┌─────────────────────────────────────────────────────────┐
  │  OBSERVATION: "第3四半期の売上：1500億ドン"              │
  │  THOUGHT: 社内の売上を取得。業界平均が必要 →            │
  │           Web検索                                       │
  │  ACTION:  web_search_tool("2025年第3四半期 ベトナム      │
  │           テック業界 平均売上")                           │
  └────────────────────────┬────────────────────────────────┘
                           │
                           ▼
  ┌─────────────────────────────────────────────────────────┐
  │  OBSERVATION: "ベトナムテック業界の第3四半期平均：1200億" │
  │  THOUGHT: データが揃った。比較 → 計算                   │
  │  ACTION:  calculator_tool("(150 - 120) / 120 * 100")   │
  └────────────────────────┬────────────────────────────────┘
                           │
                           ▼
  ┌─────────────────────────────────────────────────────────┐
  │  OBSERVATION: "25.0"                                    │
  │  THOUGHT: 全データ取得完了。回答を作成。                │
  │  FINAL ANSWER: "会社の第3四半期の売上（1500億）は       │
  │   業界平均（1200億）より25%高いです。"                   │
  └─────────────────────────────────────────────────────────┘
</code></pre>

<blockquote><p><strong>試験のヒント：</strong>「LLMがいつ検索し、いつ他のツールを使うかを自律的に判断する」→ 答えは<strong>Agent</strong>（静的RAG chainではない）。「LLMが推論とアクションを反復的に行うパターンは？」→ <strong>ReAct</strong>。重要な区別：<strong>Chain</strong> = 固定シーケンス、<strong>Agent</strong> = 動的な意思決定。</p></blockquote>

<table>
<thead>
<tr><th>特徴</th><th>静的RAG Chain</th><th>RAGエージェント</th></tr>
</thead>
<tbody>
<tr><td>実行フロー</td><td>固定：検索 → 生成</td><td>動的：LLMが各ステップを決定</td></tr>
<tr><td>ツール</td><td>リトリーバー1つのみ</td><td>複数：リトリーバー、検索、電卓、API...</td></tr>
<tr><td>推論</td><td>なし — 常に検索</td><td>ReActループ：Thought → Action → Observation</td></tr>
<tr><td>マルチステップ</td><td>1回の検索</td><td>異なるクエリで複数回検索可能</td></tr>
<tr><td>記憶</td><td>ステートレス</td><td>会話履歴を保持可能</td></tr>
<tr><td>複雑さ</td><td>シンプルで予測可能</td><td>強力だがデバッグが難しい</td></tr>
<tr><td>レイテンシー</td><td>低い（LLM呼び出し1回）</td><td>高い（LLM呼び出し複数回）</td></tr>
<tr><td>ユースケース</td><td>ドキュメントに対する単純なQ&A</td><td>複数ソースが必要な複雑なタスク</td></tr>
</tbody>
</table>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai8-rag-agent-evaluation.webp" alt="RAG Agent with Evaluation — エージェントループ、ツール、LLM-as-Judge指標" loading="lazy" /><figcaption>RAG Agent with Evaluation — エージェントループ、ツール、LLM-as-Judge指標</figcaption></figure>

<h2 id="2-build-rag-agent-langchain">2. LangChainでRAGエージェントを構築する</h2>

<h3 id="2-1-define-tools">2.1. ツールの定義</h3>

<p>最初のステップ：エージェントが使用できる<strong>ツール</strong>を定義します。各ツールには<strong>名前</strong>、<strong>説明</strong>（LLMは説明を読んでどのツールを使うか決定します）、および<strong>関数</strong>があります。</p>

<pre><code class="language-python">
from langchain_nvidia_ai_endpoints import ChatNVIDIA, NVIDIAEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain.tools.retriever import create_retriever_tool
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.tools import tool

# === ツール1：ドキュメントリトリーバー ===
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

# === ツール2：Web検索 ===
web_search_tool = TavilySearchResults(
    max_results=3,
    description="Search for information on the internet. "
                "Use when you need recent news, market data, "
                "or information not available in internal documents."
)

# === ツール3：電卓 ===
@tool
def calculator_tool(expression: str) -> str:
    """Calculate mathematical expressions. Use when you need to compute
    percentages, compare figures, or perform arithmetic."""
    try:
        result = eval(expression)  # 本番環境ではnumexprやsympyを使用
        return str(result)
    except Exception as e:
        return f"Calculation error: {e}"

# ツールリスト
tools = [retriever_tool, web_search_tool, calculator_tool]
</code></pre>

<blockquote><p><strong>試験のヒント：</strong><strong>ツールの説明</strong>は非常に重要です — LLMは説明を読んでどのツールを使うかを決定します。説明が曖昧だと → エージェントが間違ったツールを選択します。試験で出題される可能性があります：「エージェントが間違ったツールを選択する、根本原因は？」→ <strong>ツールの説明</strong>を確認してください。</p></blockquote>

<h3 id="2-2-create-agent">2.2. エージェントの作成 — Tool Calling Agent</h3>

<p>LangChainはエージェントを作成する2つの方法を提供しています：<strong>create_react_agent</strong>（ReActプロンプトベース）と<strong>create_tool_calling_agent</strong>（ネイティブのtool calling APIを使用）。NVIDIA NIM / OpenAI互換モデルには、<strong>tool calling agent</strong>が推奨されます。</p>

<pre><code class="language-python">
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

# tool calling対応のLLM
llm = ChatNVIDIA(
    model="meta/llama-3.1-70b-instruct",
    temperature=0.1
)

# エージェントプロンプト — {agent_scratchpad}は必須
prompt = ChatPromptTemplate.from_messages([
    ("system", """You are an intelligent company assistant. Use tools
to find accurate information. Always cite your sources.
If you can't find the information → clearly state "Information not found."
Never fabricate information."""),
    MessagesPlaceholder(variable_name="chat_history", optional=True),
    ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),
])

# エージェントの作成
agent = create_tool_calling_agent(llm, tools, prompt)

# AgentExecutor：エージェントループを実行
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,           # ReActループを表示
    max_iterations=5,       # イテレーション回数を制限（無限ループ防止！）
    handle_parsing_errors=True,
    return_intermediate_steps=True  # デバッグ：使用されたツールを確認
)
</code></pre>

<h3 id="2-3-agent-executor-run">2.3. エージェントの実行</h3>

<pre><code class="language-python">
# === クエリ1：検索が必要 ===
result = agent_executor.invoke({
    "input": "What is the company's leave policy?"
})
print(result["output"])
# エージェント：Thought → company_docs_search使用 → 回答

# === クエリ2：Web検索が必要 ===
result = agent_executor.invoke({
    "input": "What is NVIDIA's stock price today?"
})
# エージェント：Thought → web_search使用 → 回答

# === クエリ3：複数ツール ===
result = agent_executor.invoke({
    "input": "Compare Q3 company revenue with the VN tech industry average"
})
# エージェント：retriever → web_search → calculator → 統合

# === 中間ステップの確認（デバッグ） ===
for step in result["intermediate_steps"]:
    action, observation = step
    print(f"Tool: {action.tool}")
    print(f"Input: {action.tool_input}")
    print(f"Output: {observation[:100]}...")
    print("---")
</code></pre>

<h3 id="2-4-tool-selection-logic">2.4. ツール選択ロジック</h3>

<p>LLMはユーザークエリとツールの説明の間の<strong>意味的マッチング</strong>に基づいてツールを選択します。プロセスは以下の通りです：</p>

<pre><code class="language-text">
ツール選択 — LLMがツールを選ぶ仕組み
═══════════════════════════════════════════════════════

  ユーザークエリ: "第3四半期の売上は？"
       │
       ▼
  ┌──────────────────────────────────────────────────┐
  │  LLMがツールの説明を読む：                        │
  │                                                  │
  │  1. company_docs_search:                         │
  │     "社内文書を検索。                              │
  │      ポリシー、プロセスに使用..."                   │
  │     → 関連度：高 ✅（社内 + 数値データ）           │
  │                                                  │
  │  2. web_search:                                  │
  │     "インターネットを検索。ニュース、               │
  │      市場データに使用..."                           │
  │     → 関連度：中（文書に見つからない場合に         │
  │       必要かも）                                   │
  │                                                  │
  │  3. calculator:                                  │
  │     "数式を計算..."                                │
  │     → 関連度：低（まだ計算は不要）                 │
  └──────────────────────┬───────────────────────────┘
                         │
                         ▼
          選択: company_docs_search ✅
</code></pre>

<blockquote><p><strong>試験のヒント：</strong>「エージェントが間違ったツールを呼び出す」→ <strong>ツールの説明が十分に明確かどうか</strong>を確認してください。「エージェントがツールを何度も呼び出す（無限ループ）」→ <strong>max_iterations</strong>を設定してください。AgentExecutorの最も重要な2つのパラメータ：<strong>max_iterations</strong>（デフォルト15、5〜10に制限すべき）と<strong>handle_parsing_errors=True</strong>。</p></blockquote>

<h2 id="3-multi-turn-conversational-rag">3. マルチターン対話型RAG</h2>

<h3 id="3-1-van-de-khong-co-memory">3.1. 問題：記憶がない</h3>

<p>静的RAGパイプラインは各クエリを独立して処理します。ユーザーがフォローアップの質問をすると、パイプラインはコンテキストを理解できません：</p>

<pre><code class="language-text">
チャット履歴がない場合の問題
═══════════════════════════════════════════════

  ユーザー: "休暇制度は？"
  ボット:   "従業員は年間12日間..."              ✅

  ユーザー: "病気休暇は？"              ← フォローアップ
  ボット:   ???                          ← 「病気休暇」にはコンテキストがない
                                            リトリーバーは「病気休暇」で検索
                                            → 関連文書を見逃す可能性

  ユーザー: "有給ですか？"              ← 何が「有給」なのか？
  ボット:   ???                          ← コンテキスト完全に喪失
</code></pre>

<h3 id="3-2-contextualize-question">3.2. 質問のコンテキスト化 — 履歴に基づく書き換え</h3>

<p>解決策：検索の前に、会話履歴のコンテキストを含めて<strong>質問を書き換え</strong>ます。「病気休暇は？」→「会社の病気休暇制度はどうなっていますか？有給ですか？」</p>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain.chains import create_history_aware_retriever

# チャット履歴に基づいて質問を書き換えるプロンプト
contextualize_q_prompt = ChatPromptTemplate.from_messages([
    ("system", """Given the conversation history and the latest question,
rewrite the question as a standalone question that can be understood
without the previous context.
Do NOT answer the question — only rewrite if needed, or keep as-is."""),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])

llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct", temperature=0.1)

# 履歴対応リトリーバー：クエリを書き換え → 検索
history_aware_retriever = create_history_aware_retriever(
    llm, retriever, contextualize_q_prompt
)
</code></pre>

<h3 id="3-3-conversational-rag-chain">3.3. 完全な対話型RAGチェーン</h3>

<pre><code class="language-python">
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.messages import HumanMessage, AIMessage

# QAプロンプト
qa_prompt = ChatPromptTemplate.from_messages([
    ("system", """You are an AI assistant. Answer based on the provided context.
If not found → say "Not found in the documents."

Context:
{context}"""),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])

# チェーン：stuff documents
question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)

# 完全な対話型RAGチェーン
rag_chain = create_retrieval_chain(
    history_aware_retriever, question_answer_chain
)

# === マルチターン会話 ===
chat_history = []

# ターン1
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

# ターン2 — フォローアップ
response2 = rag_chain.invoke({
    "input": "What about sick leave?",
    "chat_history": chat_history
})
print(response2["answer"])
# 質問が書き換えられる："What is the company's sick leave policy?"
# → より正確な検索が可能！
</code></pre>

<h3 id="3-4-runnablewithmessagehistory">3.4. 履歴の自動管理：RunnableWithMessageHistory</h3>

<pre><code class="language-python">
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

# セッション履歴を保存
session_store = {}

def get_session_history(session_id: str):
    if session_id not in session_store:
        session_store[session_id] = ChatMessageHistory()
    return session_store[session_id]

# チェーンにメッセージ履歴管理をラップ
conversational_rag = RunnableWithMessageHistory(
    rag_chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="chat_history",
    output_messages_key="answer",
)

# 使用方法 — session_idで履歴が自動管理される
config = {"configurable": {"session_id": "user-123"}}

r1 = conversational_rag.invoke(
    {"input": "What is the leave policy?"},
    config=config
)
# 自動的に履歴を保存

r2 = conversational_rag.invoke(
    {"input": "What about sick leave?"},        # 履歴に基づいて自動的に書き換え
    config=config
)
</code></pre>

<pre><code class="language-text">
マルチターン対話型RAGのフロー
════════════════════════════════════════════════════════════════════

  ユーザー: "休暇制度は？"     session_id: "user-123"
       │
       ▼
  ┌──────────────────┐     履歴: []  （空）
  │ 質問コンテキスト化│───► 独立質問: "休暇制度は？"
  └────────┬─────────┘     （そのまま、書き換え不要）
           │
           ▼
  ┌──────────────────┐
  │  リトリーバー     │───► 休暇制度に関する4つのチャンク
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐
  │  LLM生成         │───► "従業員は年間12日間..."
  └────────┬─────────┘
           │
           ▼
  履歴に保存: [Human: "休暇制度は...", AI: "従業員は..."]

  ─────────────────────────────────────────────────────────────

  ユーザー: "病気休暇は？"        session_id: "user-123"
       │
       ▼
  ┌──────────────────┐     履歴: [休暇制度のQ&A]
  │ 質問コンテキスト化│───► 書き換え: "会社の病気休暇制度は
  └────────┬─────────┘              どうなっていますか？"
           │
           ▼
  ┌──────────────────┐
  │  リトリーバー     │───► 書き換えたクエリで検索 → より正確！
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────┐
  │  LLM生成         │───► "病気休暇：年間最大30日..."
  └──────────────────┘
</code></pre>

<blockquote><p><strong>試験のヒント：</strong>「ユーザーがフォローアップの質問をしたが、リトリーバーが間違った結果を返す」→ <strong>history-aware retriever</strong>が不足しています（検索前に質問をコンテキスト化する必要があります）。「マルチセッションのチャット履歴を管理する」→ <strong>RunnableWithMessageHistory</strong> + session_id。DLI試験では<strong>contextualize prompt</strong>の役割について出題される可能性があります — 常に強調：独立した質問に書き換える、回答はしない。</p></blockquote>

<h2 id="4-evaluation-metrics-rag">4. RAGの評価指標</h2>

<h3 id="4-1-tai-sao-can-evaluation">4.1. なぜ評価が必要なのか？</h3>

<p>「結果は良さそう」では本番環境には不十分です。RAGパイプラインの品質を測定し、設定間（チャンクサイズ、埋め込みモデル、リトリーバーの種類...）で比較するための<strong>体系的な評価</strong>が必要です。</p>

<h3 id="4-2-bon-metrics-chinh">4.2. 4つの主要指標</h3>

<table>
<thead>
<tr><th>指標</th><th>何を測定するか？</th><th>計算方法</th><th>許容閾値</th></tr>
</thead>
<tbody>
<tr><td><strong>Faithfulness</strong></td><td>回答が「捏造」していないか？回答内のすべての主張がコンテキストに存在するか？</td><td>回答を主張に分割 → 各主張をコンテキストと照合</td><td>≥ 0.85</td></tr>
<tr><td><strong>Answer Relevance</strong></td><td>回答が実際に質問に答えているか？</td><td>回答から質問を生成 → 元の質問とコサイン類似度を比較</td><td>≥ 0.80</td></tr>
<tr><td><strong>Context Precision</strong></td><td>検索されたドキュメントは関連しているか？（精度）</td><td>検索されたドキュメントのうち実際に関連しているものの数 / 検索された総数</td><td>≥ 0.75</td></tr>
<tr><td><strong>Context Recall</strong></td><td>必要なドキュメントが十分に検索されたか？（再現率）</td><td>正解データの主張のうち、検索されたドキュメントに遡れるものの数</td><td>≥ 0.80</td></tr>
</tbody>
</table>

<pre><code class="language-text">
RAG評価 — 各指標が測定するもの
════════════════════════════════════════════════════════════════

  質問: "返品ポリシーは？"

  検索されたコンテキスト（3件）:
  ┌─────────────────────────────────────────────────────────┐
  │ Doc 1: "レシートがあれば30日以内に返品可能"         ✅   │
  │ Doc 2: "商品は元の未開封の状態でなければならない"    ✅   │
  │ Doc 3: "今週の社員食堂メニュー"                    ❌   │
  └─────────────────────────────────────────────────────────┘
  Context Precision = 2/3 = 0.67 ← Doc 3は無関係！

  正解データ: "30日以内に返品可能、レシート必要、未開封、
               メールでCSに連絡"
  検索結果がカバー: 返品 ✅、レシート ✅、未開封 ✅、メール ❌
  Context Recall = 3/4 = 0.75  ← メールの情報が欠落

  生成された回答: "レシートがあり、商品が未開封であれば
                   30日以内に返品可能です。"
  主張: [30日 ✅、レシート ✅、未開封 ✅]
  Faithfulness = 3/3 = 1.0    ← すべての主張が根拠あり！

  回答は質問に答えているか？ → はい、ただし不完全
  Answer Relevance ≈ 0.85     ← 関連しているがメールの詳細が欠落
</code></pre>

<h3 id="4-3-ragas-framework">4.3. RAGASフレームワーク</h3>

<p><strong>RAGAS（Retrieval Augmented Generation Assessment）</strong>はRAGを評価する最も人気のあるオープンソースフレームワークです。RAGASは人間のラベル付けなしに上記4つの指標すべてを自動的に計算します（LLMを使用して評価）。</p>

<pre><code class="language-python">
from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_precision,
    context_recall,
)
from datasets import Dataset

# 評価データセットを準備
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

# 評価を実行！
results = evaluate(
    dataset,
    metrics=[faithfulness, answer_relevancy, context_precision, context_recall],
)

print(results)
# {'faithfulness': 0.95, 'answer_relevancy': 0.88,
#  'context_precision': 0.83, 'context_recall': 0.75}

# pandasに変換して詳細分析
df = results.to_pandas()
print(df)
</code></pre>

<blockquote><p><strong>試験のヒント：</strong>「回答に検索コンテキストにない情報が含まれている」→ <strong>Faithfulnessが低い</strong>。「検索されたドキュメントが質問に関連していない」→ <strong>Context Precisionが低い</strong>。「回答は正しいが質問に答えていない」→ <strong>Answer Relevanceが低い</strong>。「重要なドキュメントが欠落」→ <strong>Context Recallが低い</strong>。最も人気のあるRAG評価フレームワーク → <strong>RAGAS</strong>。</p></blockquote>

<h2 id="5-llm-as-judge">5. LLM-as-Judge評価</h2>

<h3 id="5-1-tai-sao-llm-as-judge">5.1. なぜLLM-as-Judgeなのか？</h3>

<p>手動評価（人間による評価）は正確ですが<strong>スケールしません</strong>：1000件の回答 × 3人のアノテーター = 3000件のレビュー。<strong>LLM-as-Judge</strong>は、より強力な（または同等の）LLMを使用して、別のLLMの出力を自動評価します。</p>

<table>
<thead>
<tr><th>評価方法</th><th>メリット</th><th>デメリット</th></tr>
</thead>
<tbody>
<tr><td><strong>人間による評価</strong></td><td>ゴールドスタンダード、ニュアンスを捉える</td><td>高コスト、遅い、スケールしない</td></tr>
<tr><td><strong>自動指標</strong>（BLEU, ROUGE）</td><td>高速、低コスト、再現可能</td><td>意味的品質を捉えられない</td></tr>
<tr><td><strong>LLM-as-Judge</strong></td><td>スケーラブル、意味を捉える</td><td>バイアス、judge LLMのコスト、不完全</td></tr>
<tr><td><strong>RAGAS（LLMベース）</strong></td><td>自動化、複数指標</td><td>judge LLMの品質に依存</td></tr>
</tbody>
</table>

<h3 id="5-2-evaluation-prompt-template">5.2. 評価プロンプトテンプレート</h3>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

# Faithfulness評価プロンプト
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

# Judge LLM — 利用可能な最強モデルを使用
judge_llm = ChatNVIDIA(
    model="meta/llama-3.1-70b-instruct",
    temperature=0.0           # temperature=0で一貫した評価
)

faithfulness_chain = faithfulness_eval_prompt | judge_llm | JsonOutputParser()

# 回答を評価
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
#     {"claim": "Contact CS via email", "supported": false, ...}  ← 幻覚！
#   ],
#   "faithfulness_score": 0.67,
#   "reasoning": "2/3 claims supported. 'Contact CS via email' not in context."
# }
</code></pre>

<h3 id="5-3-pairwise-comparison">5.3. ペアワイズ比較 — A vs Bの比較</h3>

<p>絶対スコアリングの代わりに、<strong>ペアワイズ</strong>比較は2つの出力を評価し、より良い方を選びます。この方法は絶対スコアリングよりもバイアスが少ないです。</p>

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

<h3 id="5-4-limitations-llm-judge">5.4. LLM-as-Judgeの限界</h3>

<ul>
<li><strong>冗長性バイアス</strong> — LLM judgeは、短い回答の方が良い場合でも、長い出力を高く評価する傾向があります</li>
<li><strong>位置バイアス</strong> — ペアワイズ評価で、最初の出力を好む傾向があります（A > B）。対策：2回評価してA↔Bの位置を入れ替える</li>
<li><strong>自己強化バイアス</strong> — LLM judgeは自身の出力を好みます。judgeには別のモデルを使用してください</li>
<li><strong>推論の限界</strong> — judgeは専門分野（医療、法律）の微妙なエラーを見逃す可能性があります</li>
</ul>

<pre><code class="language-text">
LLM-as-Judgeバイアスの軽減
══════════════════════════════════════════

  位置バイアスの対策：
  ┌──────────────────────────────┐
  │  ラウンド1: A先、B後          │──► ラウンド1の勝者: A
  │  ラウンド2: B先、A後          │──► ラウンド2の勝者: A
  │  最終結果: 一貫 → Aが勝利    │
  │  （不一致の場合 → TIE）       │
  └──────────────────────────────┘

  冗長性バイアスの対策：
  ┌──────────────────────────────┐
  │  プロンプト: "正確さと簡潔さに│
  │  基づいて評価してください。    │
  │  長い ≠ より良い。"           │
  └──────────────────────────────┘
</code></pre>

<blockquote><p><strong>試験のヒント：</strong>「LLMの出力を大規模に評価する」→ <strong>LLM-as-Judge</strong>。「LLM judgeが長い回答を好む」→ <strong>冗長性バイアス</strong>。「LLM judgeがペアの最初の選択肢を好む」→ <strong>位置バイアス</strong>。位置バイアスの対策 → <strong>位置を入れ替えて平均化</strong>。DLI試験でよく出題されます：「最もスケーラブルな評価方法は？」→ LLM-as-Judge（人間による評価ではない）。</p></blockquote>

<h2 id="6-assessment-prep-dli-sfx15">6. 試験対策 — DLI S-FX-15</h2>

<h3 id="6-1-sfx15-overview">6.1. S-FX-15試験の概要</h3>

<p>コース<strong>S-FX-15:「Generative AI with Diffusion Models and Large Language Models」</strong>は、Jupyterノートブックでの<strong>実技試験</strong>で終了します。制限時間内にコーディングタスクを完了する必要があります。</p>

<table>
<thead>
<tr><th>項目</th><th>詳細</th></tr>
</thead>
<tbody>
<tr><td><strong>形式</strong></td><td>Jupyterノートブック — コードセルに記入し、テストを実行</td></tr>
<tr><td><strong>所要時間</strong></td><td>約2時間（ラボセッション内）</td></tr>
<tr><td><strong>合格条件</strong></td><td>すべての必須セルを完了＋正しい出力</td></tr>
<tr><td><strong>利用可能なツール</strong></td><td>コースのノートブック、NVIDIAドキュメント（DLI環境内）</td></tr>
<tr><td><strong>再受験</strong></td><td>不合格の場合、再受験可能（DLIポリシーに従う）</td></tr>
</tbody>
</table>

<h3 id="6-2-key-areas">6.2. 主要な出題範囲</h3>

<p>S-FX-15の試験は、コースの3つのパートすべての主要領域をカバーします：</p>

<table>
<thead>
<tr><th>パート</th><th>主要トピック</th><th>予想される試験タスク</th></tr>
</thead>
<tbody>
<tr><td><strong>パート1</strong>：生成AI基礎</td><td>拡散モデル、VAE、GAN</td><td>拡散パイプラインの設定、画像生成</td></tr>
<tr><td><strong>パート2</strong>：LLMコア</td><td>Transformer、トークナイザー、PEFT、推論</td><td>モデルの読み込み、トークン化、LoRAファインチューニング、推論パラメータ</td></tr>
<tr><td><strong>パート3</strong>：RAG＆アプリケーション</td><td>RAGパイプライン、エージェント、評価</td><td>RAGの構築、評価の実装、ガードレールの追加</td></tr>
</tbody>
</table>

<h3 id="6-3-time-management">6.3. 時間管理戦略</h3>

<pre><code class="language-text">
S-FX-15 時間管理
════════════════════════════════════════════

  合計：約120分

  ┌─────────────────────────────────────┐
  │  0-10分: ノートブック全体を読む      │ ← すぐにコードを書かない！
  │          簡単/難しいセルをマーク      │
  │          依存関係を特定              │
  └─────────────────────────────────────┘
  ┌─────────────────────────────────────┐
  │  10-50分: 簡単なセルから先に        │ ← クイックウィンを先に
  │           Import、セットアップ、設定 │
  │           シンプルなタスク           │
  └─────────────────────────────────────┘
  ┌─────────────────────────────────────┐
  │  50-100分: 難しいセル               │ ← RAGパイプライン、評価
  │            マルチステップタスク      │
  │            必要に応じてデバッグ      │
  └─────────────────────────────────────┘
  ┌─────────────────────────────────────┐
  │  100-120分: レビュー＆修正          │ ← すべてのセルを上から下へ実行
  │             出力が一致するか確認     │
  │             エラーがあれば修正       │
  └─────────────────────────────────────┘
</code></pre>

<h3 id="6-4-common-mistakes">6.4. よくある間違い — これらを避けてください</h3>

<table>
<thead>
<tr><th>間違い</th><th>結果</th><th>対策</th></tr>
</thead>
<tbody>
<tr><td>チャンク分割時に<code>chunk_overlap</code>を忘れる</td><td>境界でコンテキストが切断 → 回答品質低下</td><td>常にoverlap = chunk_sizeの10〜20%に設定</td></tr>
<tr><td>リトリーバーとインジェストで異なるembeddingモデルを使用</td><td>次元の不一致 → クラッシュ</td><td>embeddingと検索の両方で同じモデルを使用</td></tr>
<tr><td>評価で<code>temperature=0</code>を設定しない</td><td>評価結果が再現不可能</td><td>評価タスクは<code>temperature=0</code></td></tr>
<tr><td>エージェントの無限ループ</td><td>タイムアウト、セル失敗</td><td><code>max_iterations=5</code>を設定</td></tr>
<tr><td><code>handle_parsing_errors=True</code>を忘れる</td><td>LLMが不正な形式を返すとエージェントがクラッシュ</td><td>常にこのフラグを有効にする</td></tr>
<tr><td>RAGプロンプトでコンテキストのフォーマットが不適切</td><td>LLMがコンテキストを無視 → 幻覚</td><td>プロンプトテンプレートで<code>{context}</code>を明確に分離</td></tr>
<tr><td>セルを順番通りに実行しない</td><td>変数未定義エラー</td><td>上から下へ実行、または「Restart & Run All」</td></tr>
<tr><td>パッケージのインストールを忘れる</td><td>Importエラー</td><td>最初に<code>!pip install</code>セルを実行</td></tr>
</tbody>
</table>

<h3 id="6-5-tips-passing">6.5. 合格のためのヒント</h3>

<ul>
<li><strong>説明をよく読む</strong> — 各セルには通常TODOを示すコメントがあります。コーディング前によく読んでください。</li>
<li><strong>コースのノートブックが参考資料</strong> — 試験タスクは通常、コースの演習のバリエーションです。完了したノートブックを参照してください。</li>
<li><strong>NVIDIA APIパターン</strong> — インポートと初期化の方法を覚えておいてください：<code>ChatNVIDIA(model=...)</code>、<code>NVIDIAEmbeddings(model=...)</code>。</li>
<li><strong>各セルをテスト</strong> — セルを書いたらすぐに実行してください。全部書き終わるまで待たないでください。</li>
<li><strong>出力形式が重要</strong> — 説明でdictを返すよう要求されている場合 → stringではなくdictを返してください。</li>
</ul>

<blockquote><p><strong>試験のヒント：</strong>S-FX-15の試験は<strong>実技コーディング</strong>に重点を置いており、多肢選択ではありません。優先的に復習すべき項目：<strong>RAGパイプラインのセットアップ</strong>（ほぼ必ず出題）、<strong>PEFT/LoRAの設定</strong>、<strong>拡散パイプライン</strong>。コースのノートブックを参照してください — 試験では通常、異なるデータ/モデルで同様のタスクが要求されます。</p></blockquote>

<h2 id="7-cheat-sheet">7. チートシート</h2>

<table>
<thead>
<tr><th>概念</th><th>要点</th></tr>
</thead>
<tbody>
<tr><td>静的RAG vs エージェント</td><td>Chain = 固定フロー；Agent = 動的、LLMが決定</td></tr>
<tr><td>ReActパターン</td><td>Thought → Action → Observationのループ</td></tr>
<tr><td>ツールの説明</td><td>LLMは説明に基づいてツールを選択 — 明確であること！</td></tr>
<tr><td>create_tool_calling_agent</td><td>ネイティブのtool calling APIを使用（NVIDIA NIMに推奨）</td></tr>
<tr><td>AgentExecutor max_iterations</td><td>デフォルト15、無限ループ防止のため5〜10に設定すべき</td></tr>
<tr><td>handle_parsing_errors</td><td>常にTrue — LLMが不正な形式を返した時のクラッシュを防止</td></tr>
<tr><td>History-aware retriever</td><td>フォローアップクエリを検索前に独立した質問に書き換え</td></tr>
<tr><td>RunnableWithMessageHistory</td><td>session_idによるチャット履歴の自動管理</td></tr>
<tr><td>Faithfulness</td><td>回答はコンテキストに基づいているか？（≥ 0.85）</td></tr>
<tr><td>Answer Relevance</td><td>回答は質問に答えているか？（≥ 0.80）</td></tr>
<tr><td>Context Precision</td><td>検索されたドキュメントは関連しているか？（≥ 0.75）</td></tr>
<tr><td>Context Recall</td><td>十分なドキュメントが検索されたか？（≥ 0.80）</td></tr>
<tr><td>RAGAS</td><td>上記4指標を測定するフレームワーク、LLM評価を使用</td></tr>
<tr><td>LLM-as-Judge</td><td>強力なLLMを使用して別のLLMの出力を評価 — スケーラブル</td></tr>
<tr><td>冗長性バイアス</td><td>judgeが長い回答を好む</td></tr>
<tr><td>位置バイアス</td><td>judgeがペアの最初の選択肢を好む → A↔Bを入れ替えて平均化</td></tr>
<tr><td>S-FX-15の形式</td><td>実技Jupyterノートブック、約2時間、コーディングベース</td></tr>
<tr><td>S-FX-15の戦略</td><td>全体を読む → 簡単なものから → 難しいものへ → レビュー</td></tr>
</tbody>
</table>

<h2 id="8-practice-questions">8. 練習問題 — コーディング</h2>

<p><strong>Q1: リトリーバー＋Web検索のRAGエージェントを構築</strong></p>
<p>2つのツール：<code>retriever_tool</code>（社内文書を検索）と<code>web_search_tool</code>（インターネットを検索）を持つRAGエージェントを構築してください。エージェントはどのツールをいつ使うかを自律的に判断する必要があります。ツール選択ロジックを確認するために中間ステップを出力してください。</p>

<details>
<summary>回答Q1を表示</summary>

<pre><code class="language-python">
from langchain_nvidia_ai_endpoints import ChatNVIDIA, NVIDIAEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.tools.retriever import create_retriever_tool
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

# === リトリーバーのセットアップ ===
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

# === ツールの定義 ===
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

# === エージェントの作成 ===
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

# === テスト：社内の質問 → リトリーバーを使用すべき ===
result1 = agent_executor.invoke({"input": "What is the leave policy?"})
print("Answer:", result1["output"])
print("\nTools used:")
for step in result1["intermediate_steps"]:
    print(f"  → {step[0].tool}: {step[0].tool_input}")

# === テスト：外部の質問 → Web検索を使用すべき ===
result2 = agent_executor.invoke({"input": "NVIDIA stock price today?"})
print("Answer:", result2["output"])
print("\nTools used:")
for step in result2["intermediate_steps"]:
    print(f"  → {step[0].tool}: {step[0].tool_input}")
</code></pre>

<p><strong>ツール選択の説明：</strong>エージェントはツールの説明を読みます。「Leave policy」は「internal company documents, HR policies」にマッチ → <code>internal_docs_search</code>を選択。「NVIDIA stock price」は「news, stock prices, market data」にマッチ → <code>web_search</code>を選択。</p>
</details>

<p><strong>Q2: マルチターンRAGのHistory-aware Retrieverを実装</strong></p>
<p>フォローアップの質問を理解できる対話型RAGパイプラインを構築してください。3ターンの会話でテスト：最初の質問 → フォローアップ → もう1つのフォローアップ。</p>

<details>
<summary>回答Q2を表示</summary>

<pre><code class="language-python">
from langchain_nvidia_ai_endpoints import ChatNVIDIA, NVIDIAEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain

# === セットアップ ===
docs = [
    Document(page_content="Full-time employees: 12 days leave/year. Can carry over max 5 days to next year."),
    Document(page_content="Sick leave: up to 30 days/year with pay. Doctor's note required from day 3."),
    Document(page_content="Maternity leave: 6 months for women, 5 days for men. Per Vietnam labor law."),
]

embeddings = NVIDIAEmbeddings(model="NV-Embed-QA")
vectorstore = FAISS.from_documents(docs, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})
llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct", temperature=0.1)

# === History-awareリトリーバー ===
contextualize_prompt = ChatPromptTemplate.from_messages([
    ("system", "Given the conversation history, rewrite the question as a standalone question. "
               "Do NOT answer, only rewrite."),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])

history_aware_retriever = create_history_aware_retriever(
    llm, retriever, contextualize_prompt
)

# === QAチェーン ===
qa_prompt = ChatPromptTemplate.from_messages([
    ("system", "Answer based on context. If not found → say so.\n\n"
               "Context:\n{context}"),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}"),
])

qa_chain = create_stuff_documents_chain(llm, qa_prompt)
rag_chain = create_retrieval_chain(history_aware_retriever, qa_chain)

# === 3ターンの会話 ===
chat_history = []

# ターン1
r1 = rag_chain.invoke({"input": "What is the leave policy?", "chat_history": chat_history})
print(f"Turn 1: {r1['answer']}")
chat_history.extend([
    HumanMessage(content="What is the leave policy?"),
    AIMessage(content=r1["answer"])
])

# ターン2 — フォローアップ
r2 = rag_chain.invoke({"input": "What about sick leave?", "chat_history": chat_history})
print(f"Turn 2: {r2['answer']}")
# "What about sick leave?" → 書き換え: "What is the company's sick leave policy?"
chat_history.extend([
    HumanMessage(content="What about sick leave?"),
    AIMessage(content=r2["answer"])
])

# ターン3 — もう1つのフォローアップ
r3 = rag_chain.invoke({"input": "Do I need any documents?", "chat_history": chat_history})
print(f"Turn 3: {r3['answer']}")
# "Do I need any documents?" → 書き換え: "What documents are needed for sick leave?"
</code></pre>
</details>

<p><strong>Q3: Faithfulnessスコアを計算</strong></p>
<p><code>context</code>と<code>answer</code>を受け取り、LLMを使用して回答を主張に分割し、各主張をコンテキストと照合し、faithfulnessスコア [0.0 - 1.0] を返す<code>calculate_faithfulness()</code>関数を実装してください。</p>

<details>
<summary>回答Q3を表示</summary>

<pre><code class="language-python">
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

def calculate_faithfulness(context: str, answer: str) -> dict:
    """
    Faithfulnessスコアを計算：回答内の主張のうち
    コンテキストに裏付けられている割合。
    戻り値: {"score": float, "claims": list, "reasoning": str}
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


# === テスト ===
context = (
    "Company ABC offers refunds within 30 days from purchase date. "
    "Customers must present the original receipt. "
    "Product must still be sealed and unused."
)
answer = (
    "Company ABC offers refunds within 30 days with receipt. "
    "Product must be sealed. "
    "Call hotline 1900-xxxx for support."  # ← コンテキストにない！
)

result = calculate_faithfulness(context, answer)
print(f"Faithfulness Score: {result['score']}")
# 期待値: ~0.67 (3つの主張のうち2つが裏付けられている)
for claim in result["claims"]:
    status = "✅" if claim["supported"] else "❌"
    print(f"  {status} {claim['text']}")
</code></pre>
</details>

<p><strong>Q4: 構造化ルーブリックによるLLM-as-Judge評価器を実装</strong></p>
<p>3つの基準を含むルーブリックを持つLLM-as-Judgeパターンで評価器を構築してください：<strong>Faithfulness</strong>（1-5）、<strong>Completeness</strong>（1-5）、<strong>Clarity</strong>（1-5）。評価器はquestion、context、answerを受け取り、スコア＋理由を返します。また、位置バイアスを軽減するための<strong>位置入れ替えペアワイズ比較</strong>も実装してください。</p>

<details>
<summary>回答Q4を表示</summary>

<pre><code class="language-python">
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

judge_llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct", temperature=0.0)

# === パートA：単一回答の評価 ===
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

# === パートB：位置バイアス軽減付きペアワイズ比較 ===
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
    """位置バイアス軽減付きペアワイズ評価：2回評価し、順序を入れ替える。"""

    # ラウンド1：A先
    r1 = pairwise_chain.invoke({
        "question": question, "context": context,
        "response_1": resp_a, "response_2": resp_b
    })

    # ラウンド2：B先（入れ替え）
    r2 = pairwise_chain.invoke({
        "question": question, "context": context,
        "response_1": resp_b, "response_2": resp_a
    })

    # 正規化：r2の勝者をマッピング
    r2_winner_mapped = {"1": "2", "2": "1", "TIE": "TIE"}[r2["winner"]]

    # 最終的な勝者を決定
    if r1["winner"] == r2_winner_mapped:
        final_winner = r1["winner"]  # 一貫 → 高信頼度
        confidence = "HIGH"
    else:
        final_winner = "TIE"         # 不一致 → 位置バイアスの可能性
        confidence = "LOW (positional bias detected)"

    return {
        "final_winner": f"Response {'A' if final_winner == '1' else 'B' if final_winner == '2' else 'TIE'}",
        "confidence": confidence,
        "round1": r1,
        "round2_swapped": r2,
    }


# === テスト ===
question = "What is the refund policy?"
context = "Refund within 30 days with receipt. Product must be sealed."
resp_a = "Refund within 30 days with receipt and sealed product."
resp_b = "The company supports refunds. Contact the hotline for details."

# 単一評価
score_a = single_eval_chain.invoke({
    "question": question, "context": context, "response": resp_a
})
print(f"Response A overall: {score_a['overall']}")

# ペアワイズ比較（バイアス軽減済み）
comparison = pairwise_eval_debiased(question, context, resp_a, resp_b)
print(f"Winner: {comparison['final_winner']} ({comparison['confidence']})")
</code></pre>
</details>

<p><strong>Q5: デバッグ — エージェントの無限ループ</strong></p>
<p>以下のコードにはバグがあります：エージェントがツールを呼び続けて停止しません（無限ループ）。根本原因を見つけて修正してください。ヒント：<code>max_iterations</code>と<code>handle_parsing_errors</code>を確認してください。</p>

<pre><code class="language-python">
# バグのあるコード — 問題を見つけて修正してください
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

llm = ChatNVIDIA(model="meta/llama-3.1-70b-instruct", temperature=0.9)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    ("human", "{input}"),
    # バグ：agent_scratchpadがない！
])

agent = create_tool_calling_agent(llm, tools, prompt)

agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,
    # バグ：max_iterationsがない → デフォルト15、高すぎる
    # バグ：handle_parsing_errorsがない → パース失敗時にクラッシュ
)

result = agent_executor.invoke({"input": "Compare Q3 revenue with industry"})
</code></pre>

<details>
<summary>回答Q5を表示</summary>

<pre><code class="language-python">
# 修正済みコード — 4つのバグを修正

llm = ChatNVIDIA(
    model="meta/llama-3.1-70b-instruct",
    temperature=0.1          # 修正1：低いtemperature → より安定した出力
                              # temperature=0.9 → エージェントが「創造的」すぎる → ランダムにツールを選択
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant. Use tools to find accurate information."),
    ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),
    # 修正2：agent_scratchpadは必須！
    # LangChainがThought/Action/Observationの履歴を注入する場所
    # これがないと → エージェントがツールの結果を見れない → 永遠にツールを呼び続ける
])

agent = create_tool_calling_agent(llm, tools, prompt)

agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,
    max_iterations=5,            # 修正3：イテレーション回数を制限
    handle_parsing_errors=True,  # 修正4：パースエラーを適切に処理
    return_intermediate_steps=True,
)

result = agent_executor.invoke({"input": "Compare Q3 revenue with industry"})

# === 4つのバグのまとめ ===
# 1. temperature=0.9が高すぎる → 不安定なツール選択
# 2. MessagesPlaceholder("agent_scratchpad")がない → エージェントが
#    ツールからのobservationを見れない → 無限にツールを呼び続ける（根本原因！）
# 3. max_iterationsがない → 収束しない場合永遠に実行
# 4. handle_parsing_errorsがない → パース失敗時にリトライせずクラッシュ
</code></pre>

<p><strong>根本原因：</strong><code>agent_scratchpad</code>の欠落が主な問題です。これはLangChainがThought/Action/Observationの履歴を注入するプレースホルダーです。これがないと → エージェントはすでにツールを呼んだことを知らない → 再度呼び続けます。<code>max_iterations</code>はセーフティネットであり、低い<code>temperature</code>はエージェントがより安定した判断を行うのに役立ちます。</p>
</details>
