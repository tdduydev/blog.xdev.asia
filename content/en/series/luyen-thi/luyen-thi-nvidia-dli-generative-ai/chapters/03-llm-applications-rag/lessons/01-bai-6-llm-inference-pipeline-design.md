---
id: 019c9619-nv01-p3-l06
title: 'Lesson 6: LLM Inference Pipeline Design'
slug: bai-6-llm-inference-pipeline-design
description: >-
  LLM inference parameters: temperature, top-k, top-p.
  NVIDIA NIM microservices for model deployment.
  LangChain LCEL pipeline.
  Gradio & LangServe: build UI + API.
  Dialog management & multi-turn conversation.
duration_minutes: 75
is_free: true
video_url: null
sort_order: 6
section_title: "Part 3: LLM Applications & RAG"
course:
  id: 019c9619-nv01-7001-c001-nv0100000001
  title: 'NVIDIA DLI Exam Prep — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="1-gioi-thieu-part-3">1. From Diffusion Models to LLM Applications</h2>

<p>In Part 2, we mastered <strong>Diffusion Models</strong> — from forward/reverse processes to CLIP-guided generation. Now in Part 3, the focus shifts to <strong>Large Language Models (LLMs)</strong> and how to build real-world applications: inference pipelines, RAG, and chatbots.</p>

<p>This lesson focuses on <strong>LLM Inference Pipeline Design</strong> — how to control LLM output through sampling parameters, deploy models with <strong>NVIDIA NIM</strong>, build pipelines with <strong>LangChain LCEL</strong>, and create UI/APIs with <strong>Gradio</strong> + <strong>LangServe</strong>.</p>

<blockquote><p><strong>Exam tip:</strong> The NVIDIA DLI exam frequently asks about inference parameters (temperature, top-k, top-p) and when to use NIM vs other frameworks. Make sure you know the comparison table at the end of this lesson.</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai6-llm-inference-pipeline.webp" alt="LLM Inference Pipeline — Prompt Template, NIM, LCEL Chain, Gradio UI" loading="lazy" /><figcaption>LLM Inference Pipeline — Prompt Template, NIM, LCEL Chain, Gradio UI</figcaption></figure>

<h2 id="2-llm-inference-fundamentals">2. LLM Inference Fundamentals</h2>

<h3 id="2-1-autoregressive-generation">2.1. Autoregressive Generation</h3>

<p>LLMs generate text using an <strong>autoregressive</strong> mechanism: at each step, the model predicts the next token based on all previous tokens. This process repeats until a <strong>stop token</strong> is encountered or <strong>max_tokens</strong> is reached.</p>

<pre><code class="language-text">
Autoregressive Generation Flow
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
│   Select next token  │
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
   ... repeat until &lt;EOS&gt; or max_tokens
</code></pre>

<h3 id="2-2-sampling-parameters">2.2. Sampling Parameters</h3>

<p>The three most important parameters controlling the creativity of the output:</p>

<table>
<thead>
<tr><th>Parameter</th><th>Range</th><th>Effect</th><th>Low Value</th><th>High Value</th></tr>
</thead>
<tbody>
<tr><td><strong>temperature</strong></td><td>0.0 – 2.0</td><td>Adjusts entropy of the probability distribution</td><td>Deterministic, repetitive</td><td>Creative, more random</td></tr>
<tr><td><strong>top_k</strong></td><td>1 – vocab_size</td><td>Limits to only the top K highest-probability tokens</td><td>More selective, less diverse</td><td>More choices</td></tr>
<tr><td><strong>top_p</strong></td><td>0.0 – 1.0</td><td>Nucleus sampling: only considers tokens with cumulative prob ≤ p</td><td>Only the most certain tokens</td><td>Considers more tokens</td></tr>
</tbody>
</table>

<pre><code class="language-text">
Token Sampling Process (temperature + top-p)
═════════════════════════════════════════════

Raw logits:  [2.1, 1.8, 0.5, 0.3, -1.0, -2.5, ...]
                │
                ▼
         ┌──────────────┐
         │  ÷ temperature │  (temp=0.7 → sharper)
         └──────┬───────┘
                │
                ▼
Scaled probs: [0.35, 0.28, 0.12, 0.09, 0.08, 0.05, 0.03]
                │
                ▼
         ┌──────────────┐
         │   top-p=0.8   │  cumsum: 0.35→0.63→0.75→0.84 ✓
         │   Keep top 4   │  → discard tokens 5,6,7...
         └──────┬───────┘
                │
                ▼
Filtered:   [0.41, 0.33, 0.14, 0.12]  (re-normalized)
                │
                ▼
         Random sample → token "the"
</code></pre>

<h3 id="2-3-other-parameters">2.3. Other Parameters</h3>

<table>
<thead>
<tr><th>Parameter</th><th>Description</th><th>Use Case</th></tr>
</thead>
<tbody>
<tr><td><strong>max_tokens</strong></td><td>Limits the maximum number of output tokens</td><td>Control cost, latency</td></tr>
<tr><td><strong>stop</strong></td><td>Stop generation when this string is encountered</td><td>Structured output, function calling</td></tr>
<tr><td><strong>repetition_penalty</strong></td><td>Penalize already-appeared tokens (>1.0 = heavier penalty)</td><td>Avoid word/sentence repetition</td></tr>
<tr><td><strong>frequency_penalty</strong></td><td>Reduce probability based on frequency of occurrence</td><td>More diverse output</td></tr>
<tr><td><strong>presence_penalty</strong></td><td>Penalize if token has appeared at least once</td><td>Encourage new topics</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Common question: "To always get the same output (deterministic), which parameter should you set?" → <strong>temperature = 0.0</strong>. If asking "reduce word repetition" → use <strong>repetition_penalty > 1.0</strong> or <strong>frequency_penalty > 0</strong>.</p></blockquote>

<h2 id="3-nvidia-nim">3. NVIDIA NIM (NVIDIA Inference Microservices)</h2>

<h3 id="3-1-nim-la-gi">3.1. What is NIM?</h3>

<p><strong>NVIDIA NIM</strong> is a set of <strong>pre-optimized inference containers</strong> that deploy LLM/multimodal models with maximum performance on NVIDIA GPUs. NIM comes with built-in <strong>TensorRT-LLM</strong>, quantization, and memory optimizations.</p>

<p>Key features:</p>
<ul>
<li><strong>OpenAI-compatible API</strong> — drop-in replacement, call directly using the openai client</li>
<li><strong>TensorRT-LLM backend</strong> — optimized kernels for NVIDIA GPUs</li>
<li><strong>Continuous batching</strong> — efficiently processes multiple requests simultaneously</li>
<li><strong>gRPC + REST API</strong> — flexible integration</li>
<li><strong>Multi-GPU support</strong> — automatic tensor parallelism</li>
</ul>

<h3 id="3-2-nim-architecture">3.2. NIM Architecture</h3>

<pre><code class="language-text">
NVIDIA NIM Architecture
════════════════════════

┌─────────────────────────────────────────────┐
│              NIM Container                   │
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

<h3 id="3-3-pull-run-nim">3.3. Pull & Run NIM Container</h3>

<pre><code class="language-python">
# Pull and run NIM container for Llama-3
# Requirements: NVIDIA GPU, Docker + NVIDIA Container Toolkit

# Terminal command:
# docker run -it --rm --gpus all \
#   -p 8000:8000 \
#   -e NGC_API_KEY=$NGC_API_KEY \
#   nvcr.io/nim/meta/llama-3.1-8b-instruct:latest
</code></pre>

<h3 id="3-4-call-nim-api">3.4. Call NIM API</h3>

<pre><code class="language-python">
from openai import OpenAI

# NIM is OpenAI API-compatible — just change base_url
client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="not-used"  # Local NIM doesn't require a key
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

<h3 id="3-5-nim-vs-hf">3.5. NIM vs Raw HuggingFace Inference Comparison</h3>

<table>
<thead>
<tr><th>Criteria</th><th>NVIDIA NIM</th><th>HuggingFace Transformers</th></tr>
</thead>
<tbody>
<tr><td><strong>Backend</strong></td><td>TensorRT-LLM</td><td>PyTorch</td></tr>
<tr><td><strong>Throughput</strong> (tokens/s)</td><td>~2500-4000</td><td>~300-800</td></tr>
<tr><td><strong>Latency</strong> (TTFT)</td><td>~50-100ms</td><td>~200-500ms</td></tr>
<tr><td><strong>Batching</strong></td><td>Continuous batching</td><td>Manual / static</td></tr>
<tr><td><strong>API</strong></td><td>OpenAI-compatible REST</td><td>Python API</td></tr>
<tr><td><strong>Setup</strong></td><td>1 docker run command</td><td>Install libs + code</td></tr>
<tr><td><strong>Quantization</strong></td><td>Built-in (FP8, INT4)</td><td>Requires separate GPTQ/AWQ</td></tr>
<tr><td><strong>Production ready</strong></td><td>Yes (monitoring, scaling)</td><td>Needs additional serving layer</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> NIM is always the correct answer when the exam asks "fastest way to deploy LLM on NVIDIA GPU" or "production-ready inference with TensorRT-LLM optimization". NIM ≠ training framework — it's only used for <strong>inference</strong>.</p></blockquote>

<h2 id="4-langchain-lcel">4. LangChain LCEL Pipeline Design</h2>

<h3 id="4-1-lcel-la-gi">4.1. What is LCEL?</h3>

<p><strong>LangChain Expression Language (LCEL)</strong> is a declarative syntax for building LLM processing pipelines. It uses the <code>|</code> (pipe) operator to chain components together — similar to Unix pipes.</p>

<p>LCEL advantages:</p>
<ul>
<li><strong>Streaming</strong> — supports token-by-token output streaming</li>
<li><strong>Async</strong> — native async support</li>
<li><strong>Batching</strong> — processes multiple inputs simultaneously</li>
<li><strong>Retry/Fallback</strong> — automatic retry on errors</li>
<li><strong>Tracing</strong> — integrates with LangSmith for debugging</li>
</ul>

<h3 id="4-2-core-primitives">4.2. Core Primitives</h3>

<table>
<thead>
<tr><th>Component</th><th>Role</th><th>Input → Output</th></tr>
</thead>
<tbody>
<tr><td><strong>PromptTemplate</strong></td><td>Format prompt with variables</td><td>dict → PromptValue</td></tr>
<tr><td><strong>ChatPromptTemplate</strong></td><td>Format chat messages</td><td>dict → ChatPromptValue</td></tr>
<tr><td><strong>ChatModel</strong></td><td>Call LLM (ChatOpenAI, ChatNVIDIA...)</td><td>PromptValue → AIMessage</td></tr>
<tr><td><strong>StrOutputParser</strong></td><td>Extract string from AIMessage</td><td>AIMessage → str</td></tr>
<tr><td><strong>JsonOutputParser</strong></td><td>Parse JSON from output</td><td>AIMessage → dict</td></tr>
<tr><td><strong>RunnablePassthrough</strong></td><td>Pass input through unchanged</td><td>any → any</td></tr>
<tr><td><strong>RunnableLambda</strong></td><td>Wrap function as Runnable</td><td>any → any</td></tr>
<tr><td><strong>RunnableParallel</strong></td><td>Run multiple chains in parallel</td><td>dict → dict</td></tr>
</tbody>
</table>

<h3 id="4-3-lcel-pipeline-diagram">4.3. LCEL Pipeline Flow</h3>

<pre><code class="language-text">
LCEL Pipeline Architecture
════════════════════════════

Simple Chain:
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


Parallel Chain (RunnableParallel):
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

<h3 id="4-4-lcel-code">4.4. Code: LCEL Chain</h3>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# 1. Initialize components
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

# 2. Create chain using LCEL pipe syntax
chain = prompt | llm | parser

# 3. Invoke (synchronous)
result = chain.invoke({
    "domain": "deep learning",
    "question": "How does Transformer self-attention work?"
})
print(result)

# 4. Stream (token-by-token)
for chunk in chain.stream({
    "domain": "deep learning",
    "question": "Compare RNN and Transformer"
}):
    print(chunk, end="", flush=True)
</code></pre>

<h3 id="4-5-advanced-lcel">4.5. Advanced: RunnableParallel & RunnableLambda</h3>

<pre><code class="language-python">
from langchain_core.runnables import (
    RunnablePassthrough,
    RunnableParallel,
    RunnableLambda
)

# Custom function wrapped as Runnable
def word_count(text: str) -> dict:
    return {"text": text, "word_count": len(text.split())}

# Parallel chain: summarize and count words simultaneously
parallel_chain = RunnableParallel(
    summary=prompt | llm | parser,
    metadata=RunnableLambda(
        lambda x: f"Query: {x['question']}"
    )
)

# Chain with passthrough — keep original input through pipeline
chain_with_context = (
    RunnablePassthrough.assign(
        answer=prompt | llm | parser
    )
)

# Invoke parallel
result = parallel_chain.invoke({
    "domain": "AI",
    "question": "What is Generative AI?"
})
# result = {"summary": "...", "metadata": "Query: What is Generative AI?"}
</code></pre>

<blockquote><p><strong>Exam tip:</strong> When the exam gives LCEL code and asks "what is the output type?", trace each step: PromptTemplate → PromptValue, ChatModel → AIMessage, StrOutputParser → str. <strong>If you forget the parser</strong>, the output will be an AIMessage object (not a string).</p></blockquote>

<h2 id="5-gradio-langserve">5. Build UI with Gradio & API with LangServe</h2>

<h3 id="5-1-gradio-chatbot">5.1. Gradio: Rapid Chatbot UI</h3>

<p><strong>Gradio</strong> lets you create web UIs for ML models with just a few lines of code. The <code>gr.ChatInterface</code> component is especially well-suited for chatbots.</p>

<pre><code class="language-python">
import gradio as gr
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# Setup chain
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a friendly AI assistant."),
    ("human", "{message}")
])
llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
chain = prompt | llm | StrOutputParser()

# Gradio handler
def respond(message, history):
    """Handle chat message — history is a list of [user, bot] pairs."""
    response = chain.invoke({"message": message})
    return response

# Launch UI
demo = gr.ChatInterface(
    fn=respond,
    title="NVIDIA NIM Chatbot",
    description="Chatbot powered by Llama 3.1 via NIM",
    examples=["What is Generative AI?", "Compare GAN and Diffusion"],
    theme="soft"
)
demo.launch(server_port=7860)
</code></pre>

<h3 id="5-2-langserve-api">5.2. LangServe: Expose Chain as REST API</h3>

<p><strong>LangServe</strong> turns any LCEL chain into a REST API with auto-generated docs (Swagger). Suitable for production deployment.</p>

<pre><code class="language-python">
# === Server (server.py) ===
from fastapi import FastAPI
from langserve import add_routes
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

app = FastAPI(title="LLM API")

# Create chain
chain = (
    ChatPromptTemplate.from_messages([
        ("system", "AI assistant specializing in {domain}."),
        ("human", "{question}")
    ])
    | ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
    | StrOutputParser()
)

# Expose chain at /chat endpoint
add_routes(app, chain, path="/chat")

# Run: uvicorn server:app --port 8080
</code></pre>

<pre><code class="language-python">
# === Client (client.py) ===
from langserve import RemoteRunnable

# Connect to LangServe endpoint
chain = RemoteRunnable("http://localhost:8080/chat")

# Invoke just like a local chain
result = chain.invoke({
    "domain": "machine learning",
    "question": "What is overfitting?"
})
print(result)

# Streaming also works
for chunk in chain.stream({
    "domain": "NLP",
    "question": "How does tokenization work?"
}):
    print(chunk, end="")
</code></pre>

<pre><code class="language-text">
Gradio + LangServe Deployment Pattern
═══════════════════════════════════════

   Browser (User)           Mobile App / Service
        │                          │
        ▼                          ▼
┌──────────────┐          ┌──────────────┐
│ Gradio UI     │          │ REST Client   │
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
      │  LCEL Chain       │
      │  prompt|llm|parser│
      └────────┬─────────┘
               ▼
      ┌──────────────────┐
      │  NVIDIA NIM       │
      │  :8000            │
      └──────────────────┘
</code></pre>

<blockquote><p><strong>Exam tip:</strong> Gradio = <strong>prototyping/demo UI</strong>, LangServe = <strong>production REST API</strong>. If the exam asks "fastest way to demo a chatbot" → Gradio. "Expose chain for multiple clients" → LangServe. The two can be used together.</p></blockquote>

<h2 id="6-dialog-management">6. Dialog Management & Multi-turn Conversation</h2>

<h3 id="6-1-memory-types">6.1. Memory Types</h3>

<p>Chatbots need to <strong>remember</strong> context from previous conversation turns. LangChain provides several memory types:</p>

<table>
<thead>
<tr><th>Memory Type</th><th>How It Works</th><th>Pros</th><th>Cons</th></tr>
</thead>
<tbody>
<tr><td><strong>ConversationBufferMemory</strong></td><td>Stores entire history</td><td>No information lost</td><td>Token count grows quickly</td></tr>
<tr><td><strong>ConversationBufferWindowMemory</strong></td><td>Keeps the N most recent turns</td><td>Controls token usage</td><td>Loses older context</td></tr>
<tr><td><strong>ConversationSummaryMemory</strong></td><td>Summarizes history using LLM</td><td>Efficient compression</td><td>Costs extra LLM calls</td></tr>
<tr><td><strong>ConversationSummaryBufferMemory</strong></td><td>Summarizes old + keeps recent as-is</td><td>Balances detail/compression</td><td>More complex</td></tr>
</tbody>
</table>

<h3 id="6-2-message-types">6.2. Message Types</h3>

<p>LangChain uses typed messages to distinguish roles:</p>

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

<h3 id="6-3-multi-turn-code">6.3. Code: Multi-turn Chatbot with Memory</h3>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# 1. Prompt with slot for message history
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an AI assistant. Answer concisely."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
chain = prompt | llm | StrOutputParser()

# 2. Session store — each user gets their own history
session_store = {}

def get_session_history(session_id: str):
    if session_id not in session_store:
        session_store[session_id] = InMemoryChatMessageHistory()
    return session_store[session_id]

# 3. Wrap chain with message history
chain_with_history = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="history"
)

# 4. Chat — same session_id preserves context
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
print(r2)  # "Your name is Minh."  ← remembers context!
</code></pre>

<h3 id="6-4-window-memory">6.4. Window Memory Pattern</h3>

<pre><code class="language-text">
Window Memory (k=3): Keep only the 3 most recent turns
═══════════════════════════════════════════════════════

Turn 1: User: "Hello"              ─┐
Turn 2: AI: "Hi there!"             │ ← dropped when turn count > 3+k
Turn 3: User: "My name is Minh"     │
Turn 4: AI: "Hello Minh!"          ─┘

Turn 5: User: "Explain CNN"         ─┐
Turn 6: AI: "CNN is..."              │ ← kept
Turn 7: User: "Compare with RNN?"   ─┘

Prompt sent includes only: [System] + [Turn 5,6,7] + [Turn 8 input]
→ Saves tokens, but loses context "name is Minh"
</code></pre>

<blockquote><p><strong>Exam tip:</strong> "Chatbot forgets context after a few turns" → using <strong>BufferWindowMemory that's too small</strong> or no memory at all. "Token limit exceeded" → switch to <strong>ConversationSummaryMemory</strong> to compress history.</p></blockquote>

<h2 id="7-comparison-table">7. Inference Framework Comparison</h2>

<table>
<thead>
<tr><th>Feature</th><th>NVIDIA NIM</th><th>vLLM</th><th>TGI (HuggingFace)</th><th>Ollama</th></tr>
</thead>
<tbody>
<tr><td><strong>Backend</strong></td><td>TensorRT-LLM</td><td>PagedAttention</td><td>PyTorch + Flash</td><td>llama.cpp</td></tr>
<tr><td><strong>GPU Required</strong></td><td>NVIDIA (A100/H100)</td><td>NVIDIA</td><td>NVIDIA</td><td>No (CPU OK)</td></tr>
<tr><td><strong>Throughput</strong></td><td>Highest</td><td>Very high</td><td>High</td><td>Low</td></tr>
<tr><td><strong>Quantization</strong></td><td>FP8, INT4 built-in</td><td>AWQ, GPTQ</td><td>GPTQ, bitsandbytes</td><td>GGUF</td></tr>
<tr><td><strong>API</strong></td><td>OpenAI-compatible</td><td>OpenAI-compatible</td><td>Custom + Messages</td><td>OpenAI-compatible</td></tr>
<tr><td><strong>Setup</strong></td><td>Docker (NGC)</td><td>pip install</td><td>Docker</td><td>1 binary</td></tr>
<tr><td><strong>Best for</strong></td><td>Enterprise, production</td><td>Research, high-throughput</td><td>HF ecosystem</td><td>Local dev, laptop</td></tr>
<tr><td><strong>NVIDIA optimized</strong></td><td>✅ Deepest</td><td>✅ Good</td><td>Partial</td><td>❌</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> The NVIDIA DLI exam favors <strong>NIM</strong> for all production deployment questions. "Best performance on NVIDIA GPU" → NIM. "Quick local testing on laptop" → Ollama. "Open-source high throughput" → vLLM.</p></blockquote>

<h2 id="8-cheat-sheet">8. Cheat Sheet</h2>

<table>
<thead>
<tr><th>Concept</th><th>Key Point</th></tr>
</thead>
<tbody>
<tr><td>temperature = 0.0</td><td>Deterministic output (reproducible)</td></tr>
<tr><td>temperature = 1.0+</td><td>Creative, more random</td></tr>
<tr><td>top_p = 0.1</td><td>Only selects the most certain tokens</td></tr>
<tr><td>top_k = 50</td><td>Limits to 50 token candidates</td></tr>
<tr><td>NIM</td><td>Pre-optimized container, TensorRT-LLM, OpenAI API</td></tr>
<tr><td>LCEL pipe</td><td>prompt | llm | parser</td></tr>
<tr><td>RunnableParallel</td><td>Run multiple chains simultaneously</td></tr>
<tr><td>Gradio</td><td>Demo UI, gr.ChatInterface</td></tr>
<tr><td>LangServe</td><td>REST API from LCEL chain, FastAPI</td></tr>
<tr><td>BufferMemory</td><td>Stores entire history → token count grows quickly</td></tr>
<tr><td>SummaryMemory</td><td>Compresses history using LLM → saves tokens</td></tr>
<tr><td>WindowMemory (k=N)</td><td>Keeps the N most recent turns</td></tr>
<tr><td>MessagesPlaceholder</td><td>Slot in prompt for chat history</td></tr>
<tr><td>RunnableWithMessageHistory</td><td>Wrap chain + session-based memory</td></tr>
</tbody>
</table>

<h2 id="9-practice-questions">9. Practice Questions</h2>

<p><strong>Q1: Build LCEL Chain with Streaming</strong></p>
<p>Write an LCEL chain using <code>PromptTemplate</code> → <code>ChatNVIDIA</code> → <code>StrOutputParser</code>. The prompt takes a <code>topic</code> and asks the LLM to explain it. Add streaming output.</p>

<details>
<summary>Show Answer Q1</summary>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# Create prompt template
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an AI teacher. Explain clearly and simply."),
    ("human", "Explain in detail: {topic}")
])

# Create LLM
llm = ChatNVIDIA(
    model="meta/llama-3.1-8b-instruct",
    temperature=0.5,
    max_tokens=1024
)

# Create parser
parser = StrOutputParser()

# LCEL chain
chain = prompt | llm | parser

# Invoke (returns result all at once)
result = chain.invoke({"topic": "Diffusion Models"})
print(result)

# Stream (token-by-token) — use .stream() instead of .invoke()
for chunk in chain.stream({"topic": "Diffusion Models"}):
    print(chunk, end="", flush=True)

# Explanation:
# - .invoke() calls the chain and waits for the complete output
# - .stream() returns an iterator, each chunk is a portion of the output
# - StrOutputParser allows streaming because it passes through string chunks
# - If using JsonOutputParser, stream will return partial JSON
</code></pre>
</details>

<p><strong>Q2: Configure NIM & Compare Temperature</strong></p>
<p>Call the NIM endpoint using the OpenAI client. With the same prompt, compare output when <code>temperature=0.0</code> vs <code>temperature=1.0</code>. Run each configuration 3 times and observe the differences.</p>

<details>
<summary>Show Answer Q2</summary>

<pre><code class="language-python">
from openai import OpenAI

# Connect to NIM endpoint
client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="not-used"
)

prompt_msg = [
    {"role": "system", "content": "Answer concisely in 1-2 sentences."},
    {"role": "user", "content": "Why is the sky blue?"}
]

print("=== Temperature = 0.0 (Deterministic) ===")
for i in range(3):
    resp = client.chat.completions.create(
        model="meta/llama-3.1-8b-instruct",
        messages=prompt_msg,
        temperature=0.0,  # Always picks the highest-probability token
        max_tokens=100
    )
    print(f"Run {i+1}: {resp.choices[0].message.content}")
# → All 3 runs produce IDENTICAL output

print("\n=== Temperature = 1.0 (Creative) ===")
for i in range(3):
    resp = client.chat.completions.create(
        model="meta/llama-3.1-8b-instruct",
        messages=prompt_msg,
        temperature=1.0,  # Broader distribution, more random
        max_tokens=100
    )
    print(f"Run {i+1}: {resp.choices[0].message.content}")
# → All 3 runs produce DIFFERENT output

# Key insight:
# - temp=0.0: greedy decoding, reproducible, use for factual tasks
# - temp=1.0: broader sampling, creative, use for brainstorming
# - NIM uses OpenAI-compatible API so client code is identical
</code></pre>
</details>

<p><strong>Q3: Multi-turn Chatbot with Memory</strong></p>
<p>Create a chatbot using <code>ConversationBufferMemory</code> integrated into an LCEL chain via <code>RunnableWithMessageHistory</code>. The bot must remember the user's name from a previous turn.</p>

<details>
<summary>Show Answer Q3</summary>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# 1. Prompt with history placeholder
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a friendly assistant. Remember information the user shares."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

# 2. Chain
llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct", temperature=0.3)
chain = prompt | llm | StrOutputParser()

# 3. Session store
store = {}
def get_history(session_id: str):
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]

# 4. Wrap with message history
chatbot = RunnableWithMessageHistory(
    chain,
    get_history,
    input_messages_key="input",
    history_messages_key="history"
)

# 5. Test multi-turn
cfg = {"configurable": {"session_id": "demo-001"}}

print(chatbot.invoke({"input": "My name is Lan"}, config=cfg))
# → "Hello Lan! Nice to meet you..."

print(chatbot.invoke({"input": "What is my name?"}, config=cfg))
# → "Your name is Lan." ← Bot remembers context!

print(chatbot.invoke({"input": "I like machine learning"}, config=cfg))
# → "That's great, Lan! Machine learning is..."

# Check saved history
history = store["demo-001"]
for msg in history.messages:
    print(f"{msg.type}: {msg.content[:50]}...")
</code></pre>
</details>

<p><strong>Q4: Gradio ChatInterface + LangChain</strong></p>
<p>Create a Gradio UI chatbot using <code>gr.ChatInterface</code>, with an LCEL chain calling NIM as the backend. Support streaming responses.</p>

<details>
<summary>Show Answer Q4</summary>

<pre><code class="language-python">
import gradio as gr
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# 1. Setup LCEL chain
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an AI assistant specializing in deep learning."),
    ("human", "{message}")
])
llm = ChatNVIDIA(
    model="meta/llama-3.1-8b-instruct",
    temperature=0.7
)
chain = prompt | llm | StrOutputParser()

# 2. Streaming handler for Gradio
def respond_stream(message, history):
    """
    Gradio ChatInterface calls this function.
    - message: user's new message
    - history: list of [user_msg, bot_msg] pairs
    Yield each chunk so Gradio displays streaming.
    """
    partial = ""
    for chunk in chain.stream({"message": message}):
        partial += chunk
        yield partial  # Gradio updates UI on each yield

# 3. Launch Gradio app
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

# Access: http://localhost:7860
# Gradio will display streaming responses in real-time
</code></pre>
</details>

<p><strong>Q5: Debug — Chain returns empty output</strong></p>
<p>The code below runs but the output is always empty or an unexpected object. Find and fix the bug.</p>

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
<summary>Show Answer Q5</summary>

<pre><code class="language-python">
# BUG ANALYSIS:
# - The prompt asks the LLM to answer in plain text
# - But the parser is JsonOutputParser → expects JSON format
# - LLM returns "AI is artificial intelligence..." (not JSON)
# - JsonOutputParser tries to parse → fails or returns empty output

# FIX: Replace JsonOutputParser with StrOutputParser

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser  # ← FIX!
from langchain_nvidia_ai_endpoints import ChatNVIDIA

prompt = ChatPromptTemplate.from_messages([
    ("system", "Answer concisely in plain text."),
    ("human", "{question}")
])

llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
chain = prompt | llm | StrOutputParser()  # ← StrOutputParser

result = chain.invoke({"question": "What is AI?"})
print(result)  # → "AI (Artificial Intelligence) is..."

# RULE: OutputParser type MUST match output format:
# - Plain text → StrOutputParser
# - JSON output (prompt must request JSON) → JsonOutputParser
# - Structured output → PydanticOutputParser
# If mismatched → chain fails silently or raises error
</code></pre>
</details>
