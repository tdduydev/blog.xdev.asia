---
id: 019c9619-nv01-p3-l06
title: '第6課：LLM推論パイプライン設計'
slug: bai-6-llm-inference-pipeline-design
description: >-
  LLM推論パラメータ：temperature、top-k、top-p。
  NVIDIA NIMマイクロサービスによるモデルデプロイ。
  LangChain LCELパイプライン。
  GradioとLangServe：UI + APIの構築。
  対話管理とマルチターン会話。
duration_minutes: 75
is_free: true
video_url: null
sort_order: 6
section_title: "パート3：LLMアプリケーションとRAG"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'NVIDIA DLI 試験対策 — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="1-gioi-thieu-part-3">1. Diffusion ModelsからLLMアプリケーションへ</h2>

<p>パート2では、<strong>Diffusion Models</strong>を習得しました — forward/reverseプロセスからCLIPガイド生成まで。パート3では、<strong>大規模言語モデル（LLM）</strong>と実世界のアプリケーション構築に焦点を移します：推論パイプライン、RAG、チャットボット。</p>

<p>本レッスンでは、<strong>LLM推論パイプライン設計</strong>に焦点を当てます — サンプリングパラメータによるLLM出力の制御方法、<strong>NVIDIA NIM</strong>によるモデルデプロイ、<strong>LangChain LCEL</strong>によるパイプライン構築、そして<strong>Gradio</strong> + <strong>LangServe</strong>によるUI/APIの作成です。</p>

<blockquote><p><strong>試験のヒント：</strong> NVIDIA DLI試験では、推論パラメータ（temperature、top-k、top-p）やNIMと他のフレームワークの使い分けについて頻繁に出題されます。本レッスン末尾の比較表を必ず押さえてください。</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai6-llm-inference-pipeline.webp" alt="LLM Inference Pipeline — Prompt Template, NIM, LCEL Chain, Gradio UI" loading="lazy" /><figcaption>LLM推論パイプライン — Prompt Template、NIM、LCEL Chain、Gradio UI</figcaption></figure>

<h2 id="2-llm-inference-fundamentals">2. LLM推論の基礎</h2>

<h3 id="2-1-autoregressive-generation">2.1. 自己回帰生成</h3>

<p>LLMは<strong>自己回帰</strong>メカニズムでテキストを生成します：各ステップで、モデルはそれまでのすべてのトークンに基づいて次のトークンを予測します。このプロセスは<strong>停止トークン</strong>が出現するか、<strong>max_tokens</strong>に達するまで繰り返されます。</p>

<pre><code class="language-text">
自己回帰生成の流れ
═══════════════════════════════

Input: "Hanoi is"
         │
         ▼
┌─────────────────────┐
│   LLM Forward Pass   │
│   P(token | context) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Sampling Strategy  │──► temperature, top-k, top-p
│   次のトークンを選択  │
└──────────┬──────────┘
           │
           ▼
    token = "the"
           │
           ▼
Input: "Hanoi is the"
         │
         ▼
┌─────────────────────┐
│   LLM Forward Pass   │
└──────────┬──────────┘
           │
           ▼
    token = "capital"
           │
           ▼
   ... &lt;EOS&gt; または max_tokens まで繰り返す
</code></pre>

<h3 id="2-2-sampling-parameters">2.2. サンプリングパラメータ</h3>

<p>出力の創造性を制御する最も重要な3つのパラメータ：</p>

<table>
<thead>
<tr><th>パラメータ</th><th>範囲</th><th>効果</th><th>低い値</th><th>高い値</th></tr>
</thead>
<tbody>
<tr><td><strong>temperature</strong></td><td>0.0 – 2.0</td><td>確率分布のエントロピーを調整</td><td>決定論的、繰り返しが多い</td><td>創造的、よりランダム</td></tr>
<tr><td><strong>top_k</strong></td><td>1 – vocab_size</td><td>確率上位K個のトークンのみに制限</td><td>より選択的、多様性が低い</td><td>選択肢が多い</td></tr>
<tr><td><strong>top_p</strong></td><td>0.0 – 1.0</td><td>Nucleusサンプリング：累積確率≤pのトークンのみ考慮</td><td>最も確実なトークンのみ</td><td>より多くのトークンを考慮</td></tr>
</tbody>
</table>

<pre><code class="language-text">
トークンサンプリングプロセス（temperature + top-p）
═════════════════════════════════════════════

Raw logits:  [2.1, 1.8, 0.5, 0.3, -1.0, -2.5, ...]
                │
                ▼
         ┌──────────────┐
         │  ÷ temperature │  (temp=0.7 → より鋭い分布)
         └──────┬───────┘
                │
                ▼
Scaled probs: [0.35, 0.28, 0.12, 0.09, 0.08, 0.05, 0.03]
                │
                ▼
         ┌──────────────┐
         │   top-p=0.8   │  cumsum: 0.35→0.63→0.75→0.84 ✓
         │   上位4つを保持 │  → トークン5,6,7...を除外
         └──────┬───────┘
                │
                ▼
Filtered:   [0.41, 0.33, 0.14, 0.12]  (再正規化)
                │
                ▼
         ランダムサンプリング → token "the"
</code></pre>

<h3 id="2-3-other-parameters">2.3. その他のパラメータ</h3>

<table>
<thead>
<tr><th>パラメータ</th><th>説明</th><th>ユースケース</th></tr>
</thead>
<tbody>
<tr><td><strong>max_tokens</strong></td><td>出力トークンの最大数を制限</td><td>コスト・レイテンシの制御</td></tr>
<tr><td><strong>stop</strong></td><td>この文字列が出現したら生成を停止</td><td>構造化出力、function calling</td></tr>
<tr><td><strong>repetition_penalty</strong></td><td>既出トークンにペナルティを付与（>1.0 = 強いペナルティ）</td><td>単語・文の繰り返しを回避</td></tr>
<tr><td><strong>frequency_penalty</strong></td><td>出現頻度に基づいて確率を低下</td><td>より多様な出力</td></tr>
<tr><td><strong>presence_penalty</strong></td><td>1回でも出現したトークンにペナルティ</td><td>新しいトピックを促進</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のヒント：</strong> よくある問題：「常に同じ出力（決定論的）を得るにはどのパラメータを設定すべきか？」→ <strong>temperature = 0.0</strong>。「単語の繰り返しを減らす」場合 → <strong>repetition_penalty > 1.0</strong> または <strong>frequency_penalty > 0</strong> を使用します。</p></blockquote>

<h2 id="3-nvidia-nim">3. NVIDIA NIM（NVIDIA Inference Microservices）</h2>

<h3 id="3-1-nim-la-gi">3.1. NIMとは？</h3>

<p><strong>NVIDIA NIM</strong>は、NVIDIA GPU上でLLM/マルチモーダルモデルを最高のパフォーマンスでデプロイするための<strong>最適化済み推論コンテナ</strong>のセットです。NIMには<strong>TensorRT-LLM</strong>、量子化、メモリ最適化が組み込まれています。</p>

<p>主な特徴：</p>
<ul>
<li><strong>OpenAI互換API</strong> — ドロップイン置換可能、openaiクライアントで直接呼び出し</li>
<li><strong>TensorRT-LLMバックエンド</strong> — NVIDIA GPU向け最適化カーネル</li>
<li><strong>Continuous batching</strong> — 複数リクエストを効率的に同時処理</li>
<li><strong>gRPC + REST API</strong> — 柔軟な統合</li>
<li><strong>マルチGPUサポート</strong> — 自動テンソル並列化</li>
</ul>

<h3 id="3-2-nim-architecture">3.2. NIMアーキテクチャ</h3>

<pre><code class="language-text">
NVIDIA NIMアーキテクチャ
════════════════════════

┌─────────────────────────────────────────────┐
│              NIMコンテナ                      │
│                                              │
│  ┌──────────┐   ┌──────────────────────┐    │
│  │  REST API │   │   gRPC Endpoint      │    │
│  │ :8000     │   │   :8001              │    │
│  └─────┬────┘   └──────────┬───────────┘    │
│        │                    │                │
│        └────────┬───────────┘                │
│                 ▼                             │
│  ┌──────────────────────────────────┐       │
│  │     Request Router &amp; Batcher     │       │
│  │     (Continuous Batching)        │       │
│  └──────────────┬───────────────────┘       │
│                 ▼                             │
│  ┌──────────────────────────────────┐       │
│  │     TensorRT-LLM Engine          │       │
│  │  ┌────────┐ ┌────────────────┐   │       │
│  │  │ KV Cache│ │ Paged Attention│   │       │
│  │  └────────┘ └────────────────┘   │       │
│  └──────────────┬───────────────────┘       │
│                 ▼                             │
│  ┌──────────────────────────────────┐       │
│  │       NVIDIA GPU(s)              │       │
│  │   A100 / H100 / L40S            │       │
│  └──────────────────────────────────┘       │
└─────────────────────────────────────────────┘
</code></pre>

<h3 id="3-3-pull-run-nim">3.3. NIMコンテナのPull & Run</h3>

<pre><code class="language-python">
# Llama-3用NIMコンテナのPullと実行
# 要件：NVIDIA GPU、Docker + NVIDIA Container Toolkit

# ターミナルコマンド：
# docker run -it --rm --gpus all \
#   -p 8000:8000 \
#   -e NGC_API_KEY=$NGC_API_KEY \
#   nvcr.io/nim/meta/llama-3.1-8b-instruct:latest
</code></pre>

<h3 id="3-4-call-nim-api">3.4. NIM APIの呼び出し</h3>

<pre><code class="language-python">
from openai import OpenAI

# NIMはOpenAI API互換 — base_urlを変更するだけ
client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="not-used"  # ローカルNIMではキー不要
)

response = client.chat.completions.create(
    model="meta/llama-3.1-8b-instruct",
    messages=[
        {"role": "system", "content": "You are a helpful AI assistant."},
        {"role": "user", "content": "Explain the Transformer architecture"}
    ],
    temperature=0.7,
    top_p=0.9,
    max_tokens=512
)

print(response.choices[0].message.content)
</code></pre>

<h3 id="3-5-nim-vs-hf">3.5. NIMとHuggingFace推論の比較</h3>

<table>
<thead>
<tr><th>基準</th><th>NVIDIA NIM</th><th>HuggingFace Transformers</th></tr>
</thead>
<tbody>
<tr><td><strong>バックエンド</strong></td><td>TensorRT-LLM</td><td>PyTorch</td></tr>
<tr><td><strong>スループット</strong>（tokens/s）</td><td>~2500-4000</td><td>~300-800</td></tr>
<tr><td><strong>レイテンシ</strong>（TTFT）</td><td>~50-100ms</td><td>~200-500ms</td></tr>
<tr><td><strong>バッチ処理</strong></td><td>Continuous batching</td><td>手動 / 静的</td></tr>
<tr><td><strong>API</strong></td><td>OpenAI互換REST</td><td>Python API</td></tr>
<tr><td><strong>セットアップ</strong></td><td>docker runコマンド1つ</td><td>ライブラリインストール + コード</td></tr>
<tr><td><strong>量子化</strong></td><td>組み込み（FP8、INT4）</td><td>別途GPTQ/AWQが必要</td></tr>
<tr><td><strong>本番対応</strong></td><td>対応済み（モニタリング、スケーリング）</td><td>追加のサービングレイヤーが必要</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のヒント：</strong> 試験で「NVIDIA GPUでLLMを最速でデプロイする方法」や「TensorRT-LLM最適化による本番対応推論」を問われた場合、NIMが常に正解です。NIM ≠ 学習フレームワーク — <strong>推論</strong>専用です。</p></blockquote>

<h2 id="4-langchain-lcel">4. LangChain LCELパイプライン設計</h2>

<h3 id="4-1-lcel-la-gi">4.1. LCELとは？</h3>

<p><strong>LangChain Expression Language（LCEL）</strong>は、LLM処理パイプラインを構築するための宣言的構文です。<code>|</code>（パイプ）演算子でコンポーネントをチェーン接続します — Unixパイプに似ています。</p>

<p>LCELの利点：</p>
<ul>
<li><strong>ストリーミング</strong> — トークン単位の出力ストリーミングに対応</li>
<li><strong>非同期</strong> — ネイティブasyncサポート</li>
<li><strong>バッチ処理</strong> — 複数入力の同時処理</li>
<li><strong>リトライ/フォールバック</strong> — エラー時の自動リトライ</li>
<li><strong>トレーシング</strong> — LangSmithとの統合でデバッグ</li>
</ul>

<h3 id="4-2-core-primitives">4.2. コアプリミティブ</h3>

<table>
<thead>
<tr><th>コンポーネント</th><th>役割</th><th>入力 → 出力</th></tr>
</thead>
<tbody>
<tr><td><strong>PromptTemplate</strong></td><td>変数を使ってプロンプトをフォーマット</td><td>dict → PromptValue</td></tr>
<tr><td><strong>ChatPromptTemplate</strong></td><td>チャットメッセージをフォーマット</td><td>dict → ChatPromptValue</td></tr>
<tr><td><strong>ChatModel</strong></td><td>LLMを呼び出す（ChatOpenAI、ChatNVIDIA...）</td><td>PromptValue → AIMessage</td></tr>
<tr><td><strong>StrOutputParser</strong></td><td>AIMessageから文字列を抽出</td><td>AIMessage → str</td></tr>
<tr><td><strong>JsonOutputParser</strong></td><td>出力からJSONをパース</td><td>AIMessage → dict</td></tr>
<tr><td><strong>RunnablePassthrough</strong></td><td>入力をそのまま通過</td><td>any → any</td></tr>
<tr><td><strong>RunnableLambda</strong></td><td>関数をRunnableとしてラップ</td><td>any → any</td></tr>
<tr><td><strong>RunnableParallel</strong></td><td>複数チェーンを並列実行</td><td>dict → dict</td></tr>
</tbody>
</table>

<h3 id="4-3-lcel-pipeline-diagram">4.3. LCELパイプラインの流れ</h3>

<pre><code class="language-text">
LCELパイプラインアーキテクチャ
════════════════════════════

シンプルチェーン：
─────────────
  {"topic": "AI"}
        │
        ▼
┌───────────────┐    ┌─────────────┐    ┌────────────────┐
│ PromptTemplate │──►│  ChatModel   │──►│ StrOutputParser │──► "AI is..."
│ "Explain {topic}"│  │ (ChatNVIDIA) │    │                │
└───────────────┘    └─────────────┘    └────────────────┘

       prompt      |      llm       |      parser
                   LCEL: prompt | llm | parser


並列チェーン（RunnableParallel）：
───────────────────────────────────
                 {"topic": "AI"}
                       │
              ┌────────┴────────┐
              ▼                 ▼
     ┌──────────────┐  ┌──────────────┐
     │  chain_summary│  │  chain_quiz  │
     │  prompt | llm │  │  prompt | llm│
     └──────┬───────┘  └──────┬───────┘
              │                 │
              └────────┬────────┘
                       ▼
            {"summary": "...", "quiz": "..."}
</code></pre>

<h3 id="4-4-lcel-code">4.4. コード：LCELチェーン</h3>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# 1. コンポーネントの初期化
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a {domain} expert. Answer concisely."),
    ("human", "{question}")
])

llm = ChatNVIDIA(
    model="meta/llama-3.1-8b-instruct",
    temperature=0.3,
    top_p=0.9,
    max_tokens=512
)

parser = StrOutputParser()

# 2. LCELパイプ構文でチェーンを作成
chain = prompt | llm | parser

# 3. 同期呼び出し
result = chain.invoke({
    "domain": "deep learning",
    "question": "How does Transformer self-attention work?"
})
print(result)

# 4. ストリーミング（トークン単位）
for chunk in chain.stream({
    "domain": "deep learning",
    "question": "Compare RNN and Transformer"
}):
    print(chunk, end="", flush=True)
</code></pre>

<h3 id="4-5-advanced-lcel">4.5. 応用：RunnableParallelとRunnableLambda</h3>

<pre><code class="language-python">
from langchain_core.runnables import (
    RunnablePassthrough,
    RunnableParallel,
    RunnableLambda
)

# カスタム関数をRunnableとしてラップ
def word_count(text: str) -> dict:
    return {"text": text, "word_count": len(text.split())}

# 並列チェーン：要約と単語数カウントを同時実行
parallel_chain = RunnableParallel(
    summary=prompt | llm | parser,
    metadata=RunnableLambda(
        lambda x: f"Query: {x['question']}"
    )
)

# パススルー付きチェーン — パイプライン全体で元の入力を保持
chain_with_context = (
    RunnablePassthrough.assign(
        answer=prompt | llm | parser
    )
)

# 並列呼び出し
result = parallel_chain.invoke({
    "domain": "AI",
    "question": "What is Generative AI?"
})
# result = {"summary": "...", "metadata": "Query: What is Generative AI?"}
</code></pre>

<blockquote><p><strong>試験のヒント：</strong> 試験でLCELコードが提示され「出力の型は何か？」と問われた場合、各ステップをトレースしてください：PromptTemplate → PromptValue、ChatModel → AIMessage、StrOutputParser → str。<strong>パーサーを忘れると</strong>、出力は文字列ではなくAIMessageオブジェクトになります。</p></blockquote>

<h2 id="5-gradio-langserve">5. GradioでUIを構築 & LangServeでAPIを構築</h2>

<h3 id="5-1-gradio-chatbot">5.1. Gradio：高速チャットボットUI</h3>

<p><strong>Gradio</strong>を使えば、わずか数行のコードでMLモデルのWeb UIを作成できます。<code>gr.ChatInterface</code>コンポーネントはチャットボットに特に適しています。</p>

<pre><code class="language-python">
import gradio as gr
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# チェーンのセットアップ
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a friendly AI assistant."),
    ("human", "{message}")
])
llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
chain = prompt | llm | StrOutputParser()

# Gradioハンドラー
def respond(message, history):
    """チャットメッセージを処理 — historyは[user, bot]ペアのリスト。"""
    response = chain.invoke({"message": message})
    return response

# UIを起動
demo = gr.ChatInterface(
    fn=respond,
    title="NVIDIA NIM Chatbot",
    description="Chatbot powered by Llama 3.1 via NIM",
    examples=["What is Generative AI?", "Compare GAN and Diffusion"],
    theme="soft"
)
demo.launch(server_port=7860)
</code></pre>

<h3 id="5-2-langserve-api">5.2. LangServe：チェーンをREST APIとして公開</h3>

<p><strong>LangServe</strong>は任意のLCELチェーンを自動ドキュメント（Swagger）付きのREST APIに変換します。本番デプロイに適しています。</p>

<pre><code class="language-python">
# === サーバー (server.py) ===
from fastapi import FastAPI
from langserve import add_routes
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

app = FastAPI(title="LLM API")

# チェーンの作成
chain = (
    ChatPromptTemplate.from_messages([
        ("system", "AI assistant specializing in {domain}."),
        ("human", "{question}")
    ])
    | ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
    | StrOutputParser()
)

# /chatエンドポイントでチェーンを公開
add_routes(app, chain, path="/chat")

# 実行: uvicorn server:app --port 8080
</code></pre>

<pre><code class="language-python">
# === クライアント (client.py) ===
from langserve import RemoteRunnable

# LangServeエンドポイントに接続
chain = RemoteRunnable("http://localhost:8080/chat")

# ローカルチェーンと同様に呼び出し
result = chain.invoke({
    "domain": "machine learning",
    "question": "What is overfitting?"
})
print(result)

# ストリーミングも対応
for chunk in chain.stream({
    "domain": "NLP",
    "question": "How does tokenization work?"
}):
    print(chunk, end="")
</code></pre>

<pre><code class="language-text">
Gradio + LangServeデプロイパターン
═══════════════════════════════════════

   ブラウザ（ユーザー）         モバイルアプリ / サービス
        │                          │
        ▼                          ▼
┌──────────────┐          ┌──────────────┐
│ Gradio UI     │          │ RESTクライアント│
│ :7860         │          │               │
└──────┬───────┘          └──────┬───────┘
       │                         │
       └────────┬────────────────┘
                ▼
      ┌──────────────────┐
      │  LangServe API    │
      │  FastAPI :8080    │
      │  /chat/invoke     │
      │  /chat/stream     │
      └────────┬─────────┘
               ▼
      ┌──────────────────┐
      │  LCELチェーン      │
      │  prompt|llm|parser│
      └────────┬─────────┘
               ▼
      ┌──────────────────┐
      │  NVIDIA NIM       │
      │  :8000            │
      └──────────────────┘
</code></pre>

<blockquote><p><strong>試験のヒント：</strong> Gradio = <strong>プロトタイピング/デモUI</strong>、LangServe = <strong>本番REST API</strong>。試験で「チャットボットを最速でデモする方法」→ Gradio。「複数クライアントにチェーンを公開」→ LangServe。両方を組み合わせて使うことも可能です。</p></blockquote>

<h2 id="6-dialog-management">6. 対話管理とマルチターン会話</h2>

<h3 id="6-1-memory-types">6.1. メモリの種類</h3>

<p>チャットボットは前の会話ターンのコンテキストを<strong>記憶</strong>する必要があります。LangChainは複数のメモリタイプを提供しています：</p>

<table>
<thead>
<tr><th>メモリタイプ</th><th>仕組み</th><th>利点</th><th>欠点</th></tr>
</thead>
<tbody>
<tr><td><strong>ConversationBufferMemory</strong></td><td>履歴全体を保存</td><td>情報の損失なし</td><td>トークン数が急速に増加</td></tr>
<tr><td><strong>ConversationBufferWindowMemory</strong></td><td>直近N回のターンを保持</td><td>トークン使用量を制御</td><td>古いコンテキストを失う</td></tr>
<tr><td><strong>ConversationSummaryMemory</strong></td><td>LLMで履歴を要約</td><td>効率的な圧縮</td><td>追加のLLM呼び出しコスト</td></tr>
<tr><td><strong>ConversationSummaryBufferMemory</strong></td><td>古いものを要約 + 直近はそのまま保持</td><td>詳細と圧縮のバランス</td><td>より複雑</td></tr>
</tbody>
</table>

<h3 id="6-2-message-types">6.2. メッセージタイプ</h3>

<p>LangChainは型付きメッセージでロールを区別します：</p>

<pre><code class="language-python">
from langchain_core.messages import (
    SystemMessage,
    HumanMessage,
    AIMessage
)

messages = [
    SystemMessage(content="You are an AI assistant."),
    HumanMessage(content="Hello!"),
    AIMessage(content="Hi there! How can I help?"),
    HumanMessage(content="Explain the attention mechanism"),
]
</code></pre>

<h3 id="6-3-multi-turn-code">6.3. コード：メモリ付きマルチターンチャットボット</h3>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# 1. メッセージ履歴用スロット付きプロンプト
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an AI assistant. Answer concisely."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
chain = prompt | llm | StrOutputParser()

# 2. セッションストア — 各ユーザーが独自の履歴を持つ
session_store = {}

def get_session_history(session_id: str):
    if session_id not in session_store:
        session_store[session_id] = InMemoryChatMessageHistory()
    return session_store[session_id]

# 3. メッセージ履歴でチェーンをラップ
chain_with_history = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="history"
)

# 4. チャット — 同じsession_idでコンテキストを保持
config = {"configurable": {"session_id": "user-123"}}

r1 = chain_with_history.invoke(
    {"input": "My name is Minh"},
    config=config
)
print(r1)  # "Hello Minh!..."

r2 = chain_with_history.invoke(
    {"input": "What is my name?"},
    config=config
)
print(r2)  # "Your name is Minh."  ← コンテキストを記憶！
</code></pre>

<h3 id="6-4-window-memory">6.4. ウィンドウメモリパターン</h3>

<pre><code class="language-text">
ウィンドウメモリ（k=3）：直近3ターンのみ保持
═══════════════════════════════════════════════════════

Turn 1: User: "Hello"              ─┐
Turn 2: AI: "Hi there!"             │ ← ターン数 > 3+k で削除
Turn 3: User: "My name is Minh"     │
Turn 4: AI: "Hello Minh!"          ─┘

Turn 5: User: "Explain CNN"         ─┐
Turn 6: AI: "CNN is..."              │ ← 保持
Turn 7: User: "Compare with RNN?"   ─┘

送信されるプロンプト：[System] + [Turn 5,6,7] + [Turn 8 input]
→ トークンを節約するが、「name is Minh」のコンテキストは失われる
</code></pre>

<blockquote><p><strong>試験のヒント：</strong> 「チャットボットが数ターン後にコンテキストを忘れる」→ <strong>BufferWindowMemoryが小さすぎる</strong>か、メモリが一切ない状態です。「トークン上限超過」→ <strong>ConversationSummaryMemory</strong>に切り替えて履歴を圧縮します。</p></blockquote>

<h2 id="7-comparison-table">7. 推論フレームワーク比較</h2>

<table>
<thead>
<tr><th>機能</th><th>NVIDIA NIM</th><th>vLLM</th><th>TGI（HuggingFace）</th><th>Ollama</th></tr>
</thead>
<tbody>
<tr><td><strong>バックエンド</strong></td><td>TensorRT-LLM</td><td>PagedAttention</td><td>PyTorch + Flash</td><td>llama.cpp</td></tr>
<tr><td><strong>GPU必須</strong></td><td>NVIDIA（A100/H100）</td><td>NVIDIA</td><td>NVIDIA</td><td>不要（CPU可）</td></tr>
<tr><td><strong>スループット</strong></td><td>最高</td><td>非常に高い</td><td>高い</td><td>低い</td></tr>
<tr><td><strong>量子化</strong></td><td>FP8、INT4組み込み</td><td>AWQ、GPTQ</td><td>GPTQ、bitsandbytes</td><td>GGUF</td></tr>
<tr><td><strong>API</strong></td><td>OpenAI互換</td><td>OpenAI互換</td><td>カスタム + Messages</td><td>OpenAI互換</td></tr>
<tr><td><strong>セットアップ</strong></td><td>Docker（NGC）</td><td>pip install</td><td>Docker</td><td>バイナリ1つ</td></tr>
<tr><td><strong>最適な用途</strong></td><td>エンタープライズ、本番環境</td><td>研究、高スループット</td><td>HFエコシステム</td><td>ローカル開発、ノートPC</td></tr>
<tr><td><strong>NVIDIA最適化</strong></td><td>✅ 最も深い</td><td>✅ 良好</td><td>部分的</td><td>❌</td></tr>
</tbody>
</table>

<blockquote><p><strong>試験のヒント：</strong> NVIDIA DLI試験では、本番デプロイの問題はすべて<strong>NIM</strong>が有利です。「NVIDIA GPUで最高性能」→ NIM。「ノートPCで素早くローカルテスト」→ Ollama。「オープンソースの高スループット」→ vLLM。</p></blockquote>

<h2 id="8-cheat-sheet">8. チートシート</h2>

<table>
<thead>
<tr><th>概念</th><th>ポイント</th></tr>
</thead>
<tbody>
<tr><td>temperature = 0.0</td><td>決定論的出力（再現可能）</td></tr>
<tr><td>temperature = 1.0+</td><td>創造的、よりランダム</td></tr>
<tr><td>top_p = 0.1</td><td>最も確実なトークンのみ選択</td></tr>
<tr><td>top_k = 50</td><td>候補を50トークンに制限</td></tr>
<tr><td>NIM</td><td>最適化済みコンテナ、TensorRT-LLM、OpenAI API</td></tr>
<tr><td>LCELパイプ</td><td>prompt | llm | parser</td></tr>
<tr><td>RunnableParallel</td><td>複数チェーンを同時実行</td></tr>
<tr><td>Gradio</td><td>デモUI、gr.ChatInterface</td></tr>
<tr><td>LangServe</td><td>LCELチェーンからREST API、FastAPI</td></tr>
<tr><td>BufferMemory</td><td>履歴全体を保存 → トークン数が急速に増加</td></tr>
<tr><td>SummaryMemory</td><td>LLMで履歴を圧縮 → トークンを節約</td></tr>
<tr><td>WindowMemory（k=N）</td><td>直近Nターンを保持</td></tr>
<tr><td>MessagesPlaceholder</td><td>プロンプト内のチャット履歴スロット</td></tr>
<tr><td>RunnableWithMessageHistory</td><td>チェーン + セッションベースメモリのラップ</td></tr>
</tbody>
</table>

<h2 id="9-practice-questions">9. 練習問題</h2>

<p><strong>Q1：ストリーミング付きLCELチェーンの構築</strong></p>
<p><code>PromptTemplate</code> → <code>ChatNVIDIA</code> → <code>StrOutputParser</code>を使ったLCELチェーンを作成してください。プロンプトは<code>topic</code>を受け取り、LLMにその説明を求めます。ストリーミング出力を追加してください。</p>

<details>
<summary>回答 Q1を表示</summary>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# プロンプトテンプレートの作成
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an AI teacher. Explain clearly and simply."),
    ("human", "Explain in detail: {topic}")
])

# LLMの作成
llm = ChatNVIDIA(
    model="meta/llama-3.1-8b-instruct",
    temperature=0.5,
    max_tokens=1024
)

# パーサーの作成
parser = StrOutputParser()

# LCELチェーン
chain = prompt | llm | parser

# 同期呼び出し（結果を一括で返す）
result = chain.invoke({"topic": "Diffusion Models"})
print(result)

# ストリーミング（トークン単位） — .invoke()の代わりに.stream()を使用
for chunk in chain.stream({"topic": "Diffusion Models"}):
    print(chunk, end="", flush=True)

# 解説：
# - .invoke()はチェーンを呼び出し、完全な出力を待つ
# - .stream()はイテレータを返し、各チャンクが出力の一部
# - StrOutputParserは文字列チャンクをそのまま通すのでストリーミング可能
# - JsonOutputParserを使用すると、ストリームは部分的なJSONを返す
</code></pre>
</details>

<p><strong>Q2：NIMの設定とTemperatureの比較</strong></p>
<p>OpenAIクライアントを使ってNIMエンドポイントを呼び出してください。同じプロンプトで<code>temperature=0.0</code>と<code>temperature=1.0</code>の出力を比較してください。各設定で3回実行し、違いを観察してください。</p>

<details>
<summary>回答 Q2を表示</summary>

<pre><code class="language-python">
from openai import OpenAI

# NIMエンドポイントに接続
client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="not-used"
)

prompt_msg = [
    {"role": "system", "content": "Answer concisely in 1-2 sentences."},
    {"role": "user", "content": "Why is the sky blue?"}
]

print("=== Temperature = 0.0（決定論的）===")
for i in range(3):
    resp = client.chat.completions.create(
        model="meta/llama-3.1-8b-instruct",
        messages=prompt_msg,
        temperature=0.0,  # 常に最高確率のトークンを選択
        max_tokens=100
    )
    print(f"Run {i+1}: {resp.choices[0].message.content}")
# → 3回とも同一の出力

print("\n=== Temperature = 1.0（創造的）===")
for i in range(3):
    resp = client.chat.completions.create(
        model="meta/llama-3.1-8b-instruct",
        messages=prompt_msg,
        temperature=1.0,  # より広い分布、よりランダム
        max_tokens=100
    )
    print(f"Run {i+1}: {resp.choices[0].message.content}")
# → 3回とも異なる出力

# 重要なポイント：
# - temp=0.0：貪欲デコーディング、再現可能、事実に基づくタスクに使用
# - temp=1.0：より広いサンプリング、創造的、ブレインストーミングに使用
# - NIMはOpenAI互換APIのため、クライアントコードは同一
</code></pre>
</details>

<p><strong>Q3：メモリ付きマルチターンチャットボット</strong></p>
<p><code>ConversationBufferMemory</code>を<code>RunnableWithMessageHistory</code>経由でLCELチェーンに統合したチャットボットを作成してください。ボットは前のターンでユーザーの名前を記憶できる必要があります。</p>

<details>
<summary>回答 Q3を表示</summary>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# 1. 履歴プレースホルダー付きプロンプト
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a friendly assistant. Remember information the user shares."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

# 2. チェーン
llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct", temperature=0.3)
chain = prompt | llm | StrOutputParser()

# 3. セッションストア
store = {}
def get_history(session_id: str):
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]

# 4. メッセージ履歴でラップ
chatbot = RunnableWithMessageHistory(
    chain,
    get_history,
    input_messages_key="input",
    history_messages_key="history"
)

# 5. マルチターンのテスト
cfg = {"configurable": {"session_id": "demo-001"}}

print(chatbot.invoke({"input": "My name is Lan"}, config=cfg))
# → "Hello Lan! Nice to meet you..."

print(chatbot.invoke({"input": "What is my name?"}, config=cfg))
# → "Your name is Lan." ← ボットがコンテキストを記憶！

print(chatbot.invoke({"input": "I like machine learning"}, config=cfg))
# → "That's great, Lan! Machine learning is..."

# 保存された履歴を確認
history = store["demo-001"]
for msg in history.messages:
    print(f"{msg.type}: {msg.content[:50]}...")
</code></pre>
</details>

<p><strong>Q4：Gradio ChatInterface + LangChain</strong></p>
<p><code>gr.ChatInterface</code>を使ったGradio UIチャットボットを作成し、バックエンドとしてNIMを呼び出すLCELチェーンを使用してください。ストリーミングレスポンスに対応してください。</p>

<details>
<summary>回答 Q4を表示</summary>

<pre><code class="language-python">
import gradio as gr
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# 1. LCELチェーンのセットアップ
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an AI assistant specializing in deep learning."),
    ("human", "{message}")
])
llm = ChatNVIDIA(
    model="meta/llama-3.1-8b-instruct",
    temperature=0.7
)
chain = prompt | llm | StrOutputParser()

# 2. Gradio用ストリーミングハンドラー
def respond_stream(message, history):
    """
    Gradio ChatInterfaceがこの関数を呼び出します。
    - message：ユーザーの新しいメッセージ
    - history：[user_msg, bot_msg]ペアのリスト
    各チャンクをyieldしてGradioがストリーミング表示。
    """
    partial = ""
    for chunk in chain.stream({"message": message}):
        partial += chunk
        yield partial  # yieldのたびにGradioがUIを更新

# 3. Gradioアプリを起動
demo = gr.ChatInterface(
    fn=respond_stream,
    title="🤖 DL Assistant (NIM-powered)",
    description="Ask anything about Deep Learning",
    examples=[
        "How does Transformer work?",
        "Compare CNN and ViT",
        "What is Batch Normalization used for?"
    ],
    theme="soft"
)

demo.launch(server_port=7860, share=False)

# アクセス：http://localhost:7860
# Gradioがストリーミングレスポンスをリアルタイムで表示
</code></pre>
</details>

<p><strong>Q5：デバッグ — チェーンが空の出力を返す</strong></p>
<p>以下のコードは実行されますが、出力が常に空または予期しないオブジェクトです。バグを見つけて修正してください。</p>

<pre><code class="language-python">
# バグ：チェーンが文字列ではなくAIMessageオブジェクトを返す
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser  # ← うーん...
from langchain_nvidia_ai_endpoints import ChatNVIDIA

prompt = ChatPromptTemplate.from_messages([
    ("system", "Answer concisely in plain text."),
    ("human", "{question}")
])

llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
chain = prompt | llm | JsonOutputParser()  # ← バグはここ

result = chain.invoke({"question": "What is AI?"})
print(result)  # → エラーまたは空/おかしな出力
</code></pre>

<details>
<summary>回答 Q5を表示</summary>

<pre><code class="language-python">
# バグ分析：
# - プロンプトはLLMにプレーンテキストで回答するよう指示している
# - しかしパーサーはJsonOutputParser → JSON形式を期待
# - LLMは "AI is artificial intelligence..."（JSONではない）を返す
# - JsonOutputParserがパースを試みる → 失敗または空の出力

# 修正：JsonOutputParserをStrOutputParserに置き換え

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser  # ← 修正！
from langchain_nvidia_ai_endpoints import ChatNVIDIA

prompt = ChatPromptTemplate.from_messages([
    ("system", "Answer concisely in plain text."),
    ("human", "{question}")
])

llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
chain = prompt | llm | StrOutputParser()  # ← StrOutputParser

result = chain.invoke({"question": "What is AI?"})
print(result)  # → "AI (Artificial Intelligence) is..."

# ルール：OutputParserの型は出力形式と一致させる必要があります：
# - プレーンテキスト → StrOutputParser
# - JSON出力（プロンプトでJSONを要求する必要あり） → JsonOutputParser
# - 構造化出力 → PydanticOutputParser
# 不一致の場合 → チェーンがサイレントに失敗するかエラーが発生
</code></pre>
</details>
