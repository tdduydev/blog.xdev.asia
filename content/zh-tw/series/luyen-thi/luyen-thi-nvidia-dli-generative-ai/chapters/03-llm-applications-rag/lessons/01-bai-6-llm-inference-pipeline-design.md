---
id: 019c9619-nv01-p3-l06
title: '第6課：LLM推論管線設計'
slug: bai-6-llm-inference-pipeline-design
description: >-
  LLM推論參數：temperature、top-k、top-p。
  NVIDIA NIM微服務部署模型。
  LangChain LCEL管線。
  Gradio與LangServe：建構UI + API。
  對話管理與多輪對話。
duration_minutes: 75
is_free: true
video_url: null
sort_order: 6
section_title: "第3部分：LLM應用與RAG"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'NVIDIA DLI 考試準備 — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="1-gioi-thieu-part-3">1. 從Diffusion Models到LLM應用</h2>

<p>在第2部分中，我們掌握了<strong>Diffusion Models</strong>——從前向/反向過程到CLIP引導生成。現在在第3部分，重點轉向<strong>大型語言模型（LLMs）</strong>以及如何建構實際應用：推論管線、RAG和聊天機器人。</p>

<p>本課聚焦於<strong>LLM推論管線設計</strong>——如何透過取樣參數控制LLM輸出、使用<strong>NVIDIA NIM</strong>部署模型、使用<strong>LangChain LCEL</strong>建構管線，以及使用<strong>Gradio</strong> + <strong>LangServe</strong>建立UI/API。</p>

<blockquote><p><strong>考試提示：</strong> NVIDIA DLI考試經常考推論參數（temperature、top-k、top-p）以及何時使用NIM而非其他框架。請務必熟記本課末尾的比較表。</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai6-llm-inference-pipeline.webp" alt="LLM推論管線 — Prompt Template、NIM、LCEL Chain、Gradio UI" loading="lazy" /><figcaption>LLM推論管線 — Prompt Template、NIM、LCEL Chain、Gradio UI</figcaption></figure>

<h2 id="2-llm-inference-fundamentals">2. LLM推論基礎</h2>

<h3 id="2-1-autoregressive-generation">2.1. 自迴歸生成</h3>

<p>LLM使用<strong>自迴歸</strong>機制生成文字：每一步模型根據所有先前的token預測下一個token。這個過程不斷重複，直到遇到<strong>停止token</strong>或達到<strong>max_tokens</strong>為止。</p>

<pre><code class="language-text">
自迴歸生成流程
═══════════════════════════

輸入: "Hanoi is"
         │
         ▼
┌─────────────────────┐
│   LLM前向傳播         │
│   P(token | context) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   取樣策略            │──► temperature, top-k, top-p
│   選擇下一個token     │
└──────────┬──────────┘
           │
           ▼
    token = "the"
           │
           ▼
輸入: "Hanoi is the"
         │
         ▼
┌─────────────────────┐
│   LLM前向傳播         │
└──────────┬──────────┘
           │
           ▼
    token = "capital"
           │
           ▼
   ... 重複直到 &lt;EOS&gt; 或 max_tokens
</code></pre>

<h3 id="2-2-sampling-parameters">2.2. 取樣參數</h3>

<p>控制輸出創造性的三個最重要參數：</p>

<table>
<thead>
<tr><th>參數</th><th>範圍</th><th>效果</th><th>低值</th><th>高值</th></tr>
</thead>
<tbody>
<tr><td><strong>temperature</strong></td><td>0.0 – 2.0</td><td>調整機率分佈的熵</td><td>確定性、重複</td><td>創造性、更隨機</td></tr>
<tr><td><strong>top_k</strong></td><td>1 – vocab_size</td><td>僅限最高機率的前K個token</td><td>更精確、多樣性較低</td><td>更多選擇</td></tr>
<tr><td><strong>top_p</strong></td><td>0.0 – 1.0</td><td>核取樣：僅考慮累積機率≤p的token</td><td>僅最確定的token</td><td>考慮更多token</td></tr>
</tbody>
</table>

<pre><code class="language-text">
Token取樣過程（temperature + top-p）
═════════════════════════════════════════════

原始logits:  [2.1, 1.8, 0.5, 0.3, -1.0, -2.5, ...]
                │
                ▼
         ┌──────────────┐
         │  ÷ temperature │  (temp=0.7 → 更尖銳)
         └──────┬───────┘
                │
                ▼
縮放機率: [0.35, 0.28, 0.12, 0.09, 0.08, 0.05, 0.03]
                │
                ▼
         ┌──────────────┐
         │   top-p=0.8   │  cumsum: 0.35→0.63→0.75→0.84 ✓
         │   保留前4個    │  → 丟棄token 5,6,7...
         └──────┬───────┘
                │
                ▼
過濾後:   [0.41, 0.33, 0.14, 0.12]  (重新正規化)
                │
                ▼
         隨機取樣 → token "the"
</code></pre>

<h3 id="2-3-other-parameters">2.3. 其他參數</h3>

<table>
<thead>
<tr><th>參數</th><th>說明</th><th>使用場景</th></tr>
</thead>
<tbody>
<tr><td><strong>max_tokens</strong></td><td>限制輸出token的最大數量</td><td>控制成本、延遲</td></tr>
<tr><td><strong>stop</strong></td><td>遇到此字串時停止生成</td><td>結構化輸出、函數呼叫</td></tr>
<tr><td><strong>repetition_penalty</strong></td><td>懲罰已出現的token（>1.0 = 懲罰更重）</td><td>避免詞彙/句子重複</td></tr>
<tr><td><strong>frequency_penalty</strong></td><td>根據出現頻率降低機率</td><td>更多樣化的輸出</td></tr>
<tr><td><strong>presence_penalty</strong></td><td>若token已出現至少一次則懲罰</td><td>鼓勵新主題</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試提示：</strong> 常見題目：「要始終獲得相同的輸出（確定性），應該設定哪個參數？」→ <strong>temperature = 0.0</strong>。若問「減少詞彙重複」→ 使用 <strong>repetition_penalty > 1.0</strong> 或 <strong>frequency_penalty > 0</strong>。</p></blockquote>

<h2 id="3-nvidia-nim">3. NVIDIA NIM（NVIDIA Inference Microservices）</h2>

<h3 id="3-1-nim-la-gi">3.1. 什麼是NIM？</h3>

<p><strong>NVIDIA NIM</strong>是一組<strong>預先最佳化的推論容器</strong>，能在NVIDIA GPU上以最高效能部署LLM/多模態模型。NIM內建<strong>TensorRT-LLM</strong>、量化和記憶體最佳化功能。</p>

<p>主要特點：</p>
<ul>
<li><strong>OpenAI相容API</strong> — 直接替換，可直接使用openai客戶端呼叫</li>
<li><strong>TensorRT-LLM後端</strong> — 針對NVIDIA GPU最佳化的核心運算</li>
<li><strong>持續批次處理</strong> — 高效同時處理多個請求</li>
<li><strong>gRPC + REST API</strong> — 靈活整合</li>
<li><strong>多GPU支援</strong> — 自動張量平行化</li>
</ul>

<h3 id="3-2-nim-architecture">3.2. NIM架構</h3>

<pre><code class="language-text">
NVIDIA NIM架構
════════════════════════

┌─────────────────────────────────────────────┐
│              NIM容器                          │
│                                              │
│  ┌──────────┐   ┌──────────────────────┐    │
│  │  REST API │   │   gRPC端點            │    │
│  │ :8000     │   │   :8001              │    │
│  └─────┬────┘   └──────────┬───────────┘    │
│        │                    │                │
│        └────────┬───────────┘                │
│                 ▼                             │
│  ┌──────────────────────────────────┐       │
│  │     請求路由 &amp; 批次處理器           │       │
│  │     (持續批次處理)                  │       │
│  └──────────────┬───────────────────┘       │
│                 ▼                             │
│  ┌──────────────────────────────────┐       │
│  │     TensorRT-LLM引擎              │       │
│  │  ┌────────┐ ┌────────────────┐   │       │
│  │  │KV快取   │ │ 分頁注意力機制  │   │       │
│  │  └────────┘ └────────────────┘   │       │
│  └──────────────┬───────────────────┘       │
│                 ▼                             │
│  ┌──────────────────────────────────┐       │
│  │       NVIDIA GPU                  │       │
│  │   A100 / H100 / L40S            │       │
│  └──────────────────────────────────┘       │
└─────────────────────────────────────────────┘
</code></pre>

<h3 id="3-3-pull-run-nim">3.3. 拉取與執行NIM容器</h3>

<pre><code class="language-python">
# Pull and run NIM container for Llama-3
# Requirements: NVIDIA GPU, Docker + NVIDIA Container Toolkit

# Terminal command:
# docker run -it --rm --gpus all \
#   -p 8000:8000 \
#   -e NGC_API_KEY=$NGC_API_KEY \
#   nvcr.io/nim/meta/llama-3.1-8b-instruct:latest
</code></pre>

<h3 id="3-4-call-nim-api">3.4. 呼叫NIM API</h3>

<pre><code class="language-python">
from openai import OpenAI

# NIM與OpenAI API相容——只需更改base_url
client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="not-used"  # 本機NIM不需要金鑰
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

<h3 id="3-5-nim-vs-hf">3.5. NIM與原生HuggingFace推論比較</h3>

<table>
<thead>
<tr><th>標準</th><th>NVIDIA NIM</th><th>HuggingFace Transformers</th></tr>
</thead>
<tbody>
<tr><td><strong>後端</strong></td><td>TensorRT-LLM</td><td>PyTorch</td></tr>
<tr><td><strong>吞吐量</strong>（tokens/s）</td><td>~2500-4000</td><td>~300-800</td></tr>
<tr><td><strong>延遲</strong>（TTFT）</td><td>~50-100ms</td><td>~200-500ms</td></tr>
<tr><td><strong>批次處理</strong></td><td>持續批次處理</td><td>手動 / 靜態</td></tr>
<tr><td><strong>API</strong></td><td>OpenAI相容REST</td><td>Python API</td></tr>
<tr><td><strong>設置</strong></td><td>1個docker run命令</td><td>安裝函式庫 + 撰寫程式碼</td></tr>
<tr><td><strong>量化</strong></td><td>內建（FP8、INT4）</td><td>需要額外的GPTQ/AWQ</td></tr>
<tr><td><strong>生產就緒</strong></td><td>是（監控、擴展）</td><td>需要額外的服務層</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試提示：</strong> 當考試問「在NVIDIA GPU上部署LLM最快的方式」或「具備TensorRT-LLM最佳化的生產就緒推論」時，NIM永遠是正確答案。NIM ≠ 訓練框架——它僅用於<strong>推論</strong>。</p></blockquote>

<h2 id="4-langchain-lcel">4. LangChain LCEL管線設計</h2>

<h3 id="4-1-lcel-la-gi">4.1. 什麼是LCEL？</h3>

<p><strong>LangChain Expression Language（LCEL）</strong>是一種宣告式語法，用於建構LLM處理管線。它使用<code>|</code>（管道）運算子將元件串接在一起——類似於Unix管道。</p>

<p>LCEL的優勢：</p>
<ul>
<li><strong>串流</strong> — 支援逐token輸出串流</li>
<li><strong>非同步</strong> — 原生非同步支援</li>
<li><strong>批次處理</strong> — 同時處理多個輸入</li>
<li><strong>重試/備援</strong> — 錯誤時自動重試</li>
<li><strong>追蹤</strong> — 與LangSmith整合進行除錯</li>
</ul>

<h3 id="4-2-core-primitives">4.2. 核心元件</h3>

<table>
<thead>
<tr><th>元件</th><th>角色</th><th>輸入 → 輸出</th></tr>
</thead>
<tbody>
<tr><td><strong>PromptTemplate</strong></td><td>使用變數格式化提示詞</td><td>dict → PromptValue</td></tr>
<tr><td><strong>ChatPromptTemplate</strong></td><td>格式化聊天訊息</td><td>dict → ChatPromptValue</td></tr>
<tr><td><strong>ChatModel</strong></td><td>呼叫LLM（ChatOpenAI、ChatNVIDIA...）</td><td>PromptValue → AIMessage</td></tr>
<tr><td><strong>StrOutputParser</strong></td><td>從AIMessage提取字串</td><td>AIMessage → str</td></tr>
<tr><td><strong>JsonOutputParser</strong></td><td>從輸出解析JSON</td><td>AIMessage → dict</td></tr>
<tr><td><strong>RunnablePassthrough</strong></td><td>不變地傳遞輸入</td><td>any → any</td></tr>
<tr><td><strong>RunnableLambda</strong></td><td>將函式包裝為Runnable</td><td>any → any</td></tr>
<tr><td><strong>RunnableParallel</strong></td><td>平行執行多個鏈</td><td>dict → dict</td></tr>
</tbody>
</table>

<h3 id="4-3-lcel-pipeline-diagram">4.3. LCEL管線流程</h3>

<pre><code class="language-text">
LCEL管線架構
════════════════════════════

簡單鏈：
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


平行鏈（RunnableParallel）：
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

<h3 id="4-4-lcel-code">4.4. 程式碼：LCEL鏈</h3>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# 1. 初始化元件
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

# 2. 使用LCEL管道語法建立鏈
chain = prompt | llm | parser

# 3. 同步呼叫
result = chain.invoke({
    "domain": "deep learning",
    "question": "How does Transformer self-attention work?"
})
print(result)

# 4. 串流（逐token）
for chunk in chain.stream({
    "domain": "deep learning",
    "question": "Compare RNN and Transformer"
}):
    print(chunk, end="", flush=True)
</code></pre>

<h3 id="4-5-advanced-lcel">4.5. 進階：RunnableParallel與RunnableLambda</h3>

<pre><code class="language-python">
from langchain_core.runnables import (
    RunnablePassthrough,
    RunnableParallel,
    RunnableLambda
)

# 將自訂函式包裝為Runnable
def word_count(text: str) -> dict:
    return {"text": text, "word_count": len(text.split())}

# 平行鏈：同時摘要和計算字數
parallel_chain = RunnableParallel(
    summary=prompt | llm | parser,
    metadata=RunnableLambda(
        lambda x: f"Query: {x['question']}"
    )
)

# 帶passthrough的鏈——在管線中保留原始輸入
chain_with_context = (
    RunnablePassthrough.assign(
        answer=prompt | llm | parser
    )
)

# 平行呼叫
result = parallel_chain.invoke({
    "domain": "AI",
    "question": "What is Generative AI?"
})
# result = {"summary": "...", "metadata": "Query: What is Generative AI?"}
</code></pre>

<blockquote><p><strong>考試提示：</strong> 當考試給出LCEL程式碼並問「輸出類型是什麼？」時，逐步追蹤：PromptTemplate → PromptValue、ChatModel → AIMessage、StrOutputParser → str。<strong>如果忘記parser</strong>，輸出將是AIMessage物件（而非字串）。</p></blockquote>

<h2 id="5-gradio-langserve">5. 使用Gradio建構UI與使用LangServe建構API</h2>

<h3 id="5-1-gradio-chatbot">5.1. Gradio：快速建構聊天機器人UI</h3>

<p><strong>Gradio</strong>讓你只需幾行程式碼就能為ML模型建立Web UI。<code>gr.ChatInterface</code>元件特別適合聊天機器人。</p>

<pre><code class="language-python">
import gradio as gr
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# 設定鏈
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a friendly AI assistant."),
    ("human", "{message}")
])
llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
chain = prompt | llm | StrOutputParser()

# Gradio處理函式
def respond(message, history):
    """處理聊天訊息——history是[user, bot]配對的列表。"""
    response = chain.invoke({"message": message})
    return response

# 啟動UI
demo = gr.ChatInterface(
    fn=respond,
    title="NVIDIA NIM Chatbot",
    description="Chatbot powered by Llama 3.1 via NIM",
    examples=["What is Generative AI?", "Compare GAN and Diffusion"],
    theme="soft"
)
demo.launch(server_port=7860)
</code></pre>

<h3 id="5-2-langserve-api">5.2. LangServe：將鏈暴露為REST API</h3>

<p><strong>LangServe</strong>將任何LCEL鏈轉換為REST API，並自動生成文件（Swagger）。適合生產環境部署。</p>

<pre><code class="language-python">
# === 伺服器 (server.py) ===
from fastapi import FastAPI
from langserve import add_routes
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

app = FastAPI(title="LLM API")

# 建立鏈
chain = (
    ChatPromptTemplate.from_messages([
        ("system", "AI assistant specializing in {domain}."),
        ("human", "{question}")
    ])
    | ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
    | StrOutputParser()
)

# 在/chat端點暴露鏈
add_routes(app, chain, path="/chat")

# 執行: uvicorn server:app --port 8080
</code></pre>

<pre><code class="language-python">
# === 客戶端 (client.py) ===
from langserve import RemoteRunnable

# 連接到LangServe端點
chain = RemoteRunnable("http://localhost:8080/chat")

# 像本地鏈一樣呼叫
result = chain.invoke({
    "domain": "machine learning",
    "question": "What is overfitting?"
})
print(result)

# 串流也能運作
for chunk in chain.stream({
    "domain": "NLP",
    "question": "How does tokenization work?"
}):
    print(chunk, end="")
</code></pre>

<pre><code class="language-text">
Gradio + LangServe部署模式
═══════════════════════════════════════

   瀏覽器（使用者）          行動App / 服務
        │                          │
        ▼                          ▼
┌──────────────┐          ┌──────────────┐
│ Gradio UI     │          │ REST客戶端    │
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
      │  LCEL鏈           │
      │  prompt|llm|parser│
      └────────┬─────────┘
               ▼
      ┌──────────────────┐
      │  NVIDIA NIM       │
      │  :8000            │
      └──────────────────┘
</code></pre>

<blockquote><p><strong>考試提示：</strong> Gradio = <strong>原型/展示UI</strong>，LangServe = <strong>生產REST API</strong>。如果考試問「最快展示聊天機器人的方式」→ Gradio。「為多個客戶端暴露鏈」→ LangServe。兩者可以搭配使用。</p></blockquote>

<h2 id="6-dialog-management">6. 對話管理與多輪對話</h2>

<h3 id="6-1-memory-types">6.1. 記憶類型</h3>

<p>聊天機器人需要<strong>記住</strong>先前對話輪次的上下文。LangChain提供多種記憶類型：</p>

<table>
<thead>
<tr><th>記憶類型</th><th>運作方式</th><th>優點</th><th>缺點</th></tr>
</thead>
<tbody>
<tr><td><strong>ConversationBufferMemory</strong></td><td>儲存完整歷史記錄</td><td>不遺失任何資訊</td><td>Token數量快速增長</td></tr>
<tr><td><strong>ConversationBufferWindowMemory</strong></td><td>保留最近N輪對話</td><td>控制token使用量</td><td>遺失較舊的上下文</td></tr>
<tr><td><strong>ConversationSummaryMemory</strong></td><td>使用LLM摘要歷史記錄</td><td>高效壓縮</td><td>額外的LLM呼叫成本</td></tr>
<tr><td><strong>ConversationSummaryBufferMemory</strong></td><td>摘要舊的 + 保留近期原始內容</td><td>兼顧細節與壓縮</td><td>較為複雜</td></tr>
</tbody>
</table>

<h3 id="6-2-message-types">6.2. 訊息類型</h3>

<p>LangChain使用型別化訊息來區分角色：</p>

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

<h3 id="6-3-multi-turn-code">6.3. 程式碼：帶記憶的多輪聊天機器人</h3>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# 1. 帶歷史記錄插槽的提示詞
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an AI assistant. Answer concisely."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
chain = prompt | llm | StrOutputParser()

# 2. 會話儲存——每個使用者有自己的歷史記錄
session_store = {}

def get_session_history(session_id: str):
    if session_id not in session_store:
        session_store[session_id] = InMemoryChatMessageHistory()
    return session_store[session_id]

# 3. 用訊息歷史包裝鏈
chain_with_history = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="history"
)

# 4. 聊天——相同的session_id保留上下文
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
print(r2)  # "Your name is Minh."  ← 記住了上下文！
</code></pre>

<h3 id="6-4-window-memory">6.4. 視窗記憶模式</h3>

<pre><code class="language-text">
視窗記憶（k=3）：僅保留最近3輪對話
═══════════════════════════════════════════════════════

第1輪: 使用者: "Hello"              ─┐
第2輪: AI: "Hi there!"               │ ← 當對話輪數 > 3+k 時被丟棄
第3輪: 使用者: "My name is Minh"     │
第4輪: AI: "Hello Minh!"            ─┘

第5輪: 使用者: "Explain CNN"         ─┐
第6輪: AI: "CNN is..."                │ ← 保留
第7輪: 使用者: "Compare with RNN?"   ─┘

發送的提示詞僅包含: [System] + [第5,6,7輪] + [第8輪輸入]
→ 節省token，但遺失「name is Minh」的上下文
</code></pre>

<blockquote><p><strong>考試提示：</strong> 「聊天機器人在幾輪後忘記上下文」→ 使用了<strong>太小的BufferWindowMemory</strong>或完全沒有記憶。「Token限制超出」→ 改用<strong>ConversationSummaryMemory</strong>來壓縮歷史記錄。</p></blockquote>

<h2 id="7-comparison-table">7. 推論框架比較</h2>

<table>
<thead>
<tr><th>特性</th><th>NVIDIA NIM</th><th>vLLM</th><th>TGI（HuggingFace）</th><th>Ollama</th></tr>
</thead>
<tbody>
<tr><td><strong>後端</strong></td><td>TensorRT-LLM</td><td>PagedAttention</td><td>PyTorch + Flash</td><td>llama.cpp</td></tr>
<tr><td><strong>需要GPU</strong></td><td>NVIDIA（A100/H100）</td><td>NVIDIA</td><td>NVIDIA</td><td>否（CPU可用）</td></tr>
<tr><td><strong>吞吐量</strong></td><td>最高</td><td>非常高</td><td>高</td><td>低</td></tr>
<tr><td><strong>量化</strong></td><td>FP8、INT4內建</td><td>AWQ、GPTQ</td><td>GPTQ、bitsandbytes</td><td>GGUF</td></tr>
<tr><td><strong>API</strong></td><td>OpenAI相容</td><td>OpenAI相容</td><td>自訂 + Messages</td><td>OpenAI相容</td></tr>
<tr><td><strong>設置</strong></td><td>Docker（NGC）</td><td>pip install</td><td>Docker</td><td>1個二進位檔</td></tr>
<tr><td><strong>最適合</strong></td><td>企業、生產環境</td><td>研究、高吞吐量</td><td>HF生態系</td><td>本地開發、筆電</td></tr>
<tr><td><strong>NVIDIA最佳化</strong></td><td>✅ 最深度</td><td>✅ 良好</td><td>部分</td><td>❌</td></tr>
</tbody>
</table>

<blockquote><p><strong>考試提示：</strong> NVIDIA DLI考試在所有生產部署問題中偏好<strong>NIM</strong>。「NVIDIA GPU上的最佳效能」→ NIM。「筆電上快速本地測試」→ Ollama。「開源高吞吐量」→ vLLM。</p></blockquote>

<h2 id="8-cheat-sheet">8. 速查表</h2>

<table>
<thead>
<tr><th>概念</th><th>重點</th></tr>
</thead>
<tbody>
<tr><td>temperature = 0.0</td><td>確定性輸出（可重現）</td></tr>
<tr><td>temperature = 1.0+</td><td>創造性、更隨機</td></tr>
<tr><td>top_p = 0.1</td><td>僅選擇最確定的token</td></tr>
<tr><td>top_k = 50</td><td>限制為50個候選token</td></tr>
<tr><td>NIM</td><td>預先最佳化容器、TensorRT-LLM、OpenAI API</td></tr>
<tr><td>LCEL pipe</td><td>prompt | llm | parser</td></tr>
<tr><td>RunnableParallel</td><td>同時執行多個鏈</td></tr>
<tr><td>Gradio</td><td>展示UI、gr.ChatInterface</td></tr>
<tr><td>LangServe</td><td>從LCEL鏈建立REST API、FastAPI</td></tr>
<tr><td>BufferMemory</td><td>儲存完整歷史 → token數量快速增長</td></tr>
<tr><td>SummaryMemory</td><td>使用LLM壓縮歷史 → 節省token</td></tr>
<tr><td>WindowMemory（k=N）</td><td>保留最近N輪對話</td></tr>
<tr><td>MessagesPlaceholder</td><td>提示詞中聊天歷史的插槽</td></tr>
<tr><td>RunnableWithMessageHistory</td><td>包裝鏈 + 基於會話的記憶</td></tr>
</tbody>
</table>

<h2 id="9-practice-questions">9. 練習題</h2>

<p><strong>Q1：建構帶串流的LCEL鏈</strong></p>
<p>撰寫一個LCEL鏈，使用<code>PromptTemplate</code> → <code>ChatNVIDIA</code> → <code>StrOutputParser</code>。提示詞接受一個<code>topic</code>並要求LLM解釋它。加入串流輸出。</p>

<details>
<summary>顯示答案 Q1</summary>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# 建立提示詞模板
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an AI teacher. Explain clearly and simply."),
    ("human", "Explain in detail: {topic}")
])

# 建立LLM
llm = ChatNVIDIA(
    model="meta/llama-3.1-8b-instruct",
    temperature=0.5,
    max_tokens=1024
)

# 建立解析器
parser = StrOutputParser()

# LCEL鏈
chain = prompt | llm | parser

# 同步呼叫（一次返回完整結果）
result = chain.invoke({"topic": "Diffusion Models"})
print(result)

# 串流（逐token）——使用 .stream() 而非 .invoke()
for chunk in chain.stream({"topic": "Diffusion Models"}):
    print(chunk, end="", flush=True)

# 說明：
# - .invoke() 呼叫鏈並等待完整輸出
# - .stream() 返回迭代器，每個chunk是輸出的一部分
# - StrOutputParser允許串流，因為它直接傳遞字串chunk
# - 如果使用JsonOutputParser，串流將返回部分JSON
</code></pre>
</details>

<p><strong>Q2：配置NIM並比較Temperature</strong></p>
<p>使用OpenAI客戶端呼叫NIM端點。對同一個提示詞，比較<code>temperature=0.0</code>與<code>temperature=1.0</code>的輸出。每種配置執行3次並觀察差異。</p>

<details>
<summary>顯示答案 Q2</summary>

<pre><code class="language-python">
from openai import OpenAI

# 連接到NIM端點
client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="not-used"
)

prompt_msg = [
    {"role": "system", "content": "Answer concisely in 1-2 sentences."},
    {"role": "user", "content": "Why is the sky blue?"}
]

print("=== Temperature = 0.0（確定性）===")
for i in range(3):
    resp = client.chat.completions.create(
        model="meta/llama-3.1-8b-instruct",
        messages=prompt_msg,
        temperature=0.0,  # 始終選擇最高機率的token
        max_tokens=100
    )
    print(f"第{i+1}次: {resp.choices[0].message.content}")
# → 3次執行產生完全相同的輸出

print("\n=== Temperature = 1.0（創造性）===")
for i in range(3):
    resp = client.chat.completions.create(
        model="meta/llama-3.1-8b-instruct",
        messages=prompt_msg,
        temperature=1.0,  # 更寬的分佈，更隨機
        max_tokens=100
    )
    print(f"第{i+1}次: {resp.choices[0].message.content}")
# → 3次執行產生不同的輸出

# 關鍵要點：
# - temp=0.0：貪婪解碼，可重現，用於事實性任務
# - temp=1.0：更廣泛的取樣，有創造性，用於腦力激盪
# - NIM使用OpenAI相容API，所以客戶端程式碼完全相同
</code></pre>
</details>

<p><strong>Q3：帶記憶的多輪聊天機器人</strong></p>
<p>建立一個聊天機器人，使用<code>ConversationBufferMemory</code>透過<code>RunnableWithMessageHistory</code>整合到LCEL鏈中。機器人必須記住使用者在先前輪次中提到的名字。</p>

<details>
<summary>顯示答案 Q3</summary>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# 1. 帶歷史記錄佔位符的提示詞
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a friendly assistant. Remember information the user shares."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

# 2. 鏈
llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct", temperature=0.3)
chain = prompt | llm | StrOutputParser()

# 3. 會話儲存
store = {}
def get_history(session_id: str):
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]

# 4. 用訊息歷史包裝
chatbot = RunnableWithMessageHistory(
    chain,
    get_history,
    input_messages_key="input",
    history_messages_key="history"
)

# 5. 測試多輪對話
cfg = {"configurable": {"session_id": "demo-001"}}

print(chatbot.invoke({"input": "My name is Lan"}, config=cfg))
# → "Hello Lan! Nice to meet you..."

print(chatbot.invoke({"input": "What is my name?"}, config=cfg))
# → "Your name is Lan." ← 機器人記住了上下文！

print(chatbot.invoke({"input": "I like machine learning"}, config=cfg))
# → "That's great, Lan! Machine learning is..."

# 檢查已儲存的歷史記錄
history = store["demo-001"]
for msg in history.messages:
    print(f"{msg.type}: {msg.content[:50]}...")
</code></pre>
</details>

<p><strong>Q4：Gradio ChatInterface + LangChain</strong></p>
<p>使用<code>gr.ChatInterface</code>建立Gradio UI聊天機器人，後端使用呼叫NIM的LCEL鏈。支援串流回應。</p>

<details>
<summary>顯示答案 Q4</summary>

<pre><code class="language-python">
import gradio as gr
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# 1. 設定LCEL鏈
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an AI assistant specializing in deep learning."),
    ("human", "{message}")
])
llm = ChatNVIDIA(
    model="meta/llama-3.1-8b-instruct",
    temperature=0.7
)
chain = prompt | llm | StrOutputParser()

# 2. Gradio的串流處理函式
def respond_stream(message, history):
    """
    Gradio ChatInterface呼叫此函式。
    - message: 使用者的新訊息
    - history: [user_msg, bot_msg]配對的列表
    每個chunk都yield，讓Gradio即時顯示串流。
    """
    partial = ""
    for chunk in chain.stream({"message": message}):
        partial += chunk
        yield partial  # Gradio在每次yield時更新UI

# 3. 啟動Gradio應用
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

# 存取: http://localhost:7860
# Gradio將即時顯示串流回應
</code></pre>
</details>

<p><strong>Q5：除錯——鏈返回空輸出</strong></p>
<p>以下程式碼可以執行，但輸出總是空的或是意外的物件。找出並修復錯誤。</p>

<pre><code class="language-python">
# BUG: chain returns AIMessage object instead of string
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser  # ← Hmm...
from langchain_nvidia_ai_endpoints import ChatNVIDIA

prompt = ChatPromptTemplate.from_messages([
    ("system", "Answer concisely in plain text."),
    ("human", "{question}")
])

llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
chain = prompt | llm | JsonOutputParser()  # ← Bug is here

result = chain.invoke({"question": "What is AI?"})
print(result)  # → Error or empty/weird output
</code></pre>

<details>
<summary>顯示答案 Q5</summary>

<pre><code class="language-python">
# 錯誤分析：
# - 提示詞要求LLM以純文字回答
# - 但解析器是JsonOutputParser → 期望JSON格式
# - LLM返回 "AI is artificial intelligence..."（非JSON）
# - JsonOutputParser嘗試解析 → 失敗或返回空輸出

# 修復：將JsonOutputParser替換為StrOutputParser

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser  # ← 修復！
from langchain_nvidia_ai_endpoints import ChatNVIDIA

prompt = ChatPromptTemplate.from_messages([
    ("system", "Answer concisely in plain text."),
    ("human", "{question}")
])

llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
chain = prompt | llm | StrOutputParser()  # ← StrOutputParser

result = chain.invoke({"question": "What is AI?"})
print(result)  # → "AI (Artificial Intelligence) is..."

# 規則：OutputParser類型必須與輸出格式匹配：
# - 純文字 → StrOutputParser
# - JSON輸出（提示詞必須要求JSON）→ JsonOutputParser
# - 結構化輸出 → PydanticOutputParser
# 如果不匹配 → 鏈會靜默失敗或拋出錯誤
</code></pre>
</details>
