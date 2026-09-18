---
id: 019c9619-nv01-p3-l06
title: 'Bài 6: LLM Inference Pipeline Design'
slug: bai-6-llm-inference-pipeline-design
description: >-
  LLM inference parameters: temperature, top-k, top-p.
  NVIDIA NIM microservices cho triển khai model.
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
  title: 'Luyện thi NVIDIA DLI — Generative AI with Diffusion Models & LLMs'
  slug: luyen-thi-nvidia-dli-generative-ai
---

<h2 id="1-gioi-thieu-part-3">1. Từ Diffusion Models sang LLM Applications</h2>

<p>Trong Part 2, chúng ta đã làm chủ <strong>Diffusion Models</strong> — từ forward/reverse process đến CLIP-guided generation. Giờ sang Part 3, trọng tâm chuyển sang <strong>Large Language Models (LLMs)</strong> và cách xây dựng ứng dụng thực tế: inference pipeline, RAG, chatbot.</p>

<p>Bài này tập trung vào <strong>LLM Inference Pipeline Design</strong> — cách điều khiển output của LLM thông qua sampling parameters, triển khai model với <strong>NVIDIA NIM</strong>, xây pipeline với <strong>LangChain LCEL</strong>, và build UI/API với <strong>Gradio</strong> + <strong>LangServe</strong>.</p>

<blockquote><p><strong>Exam tip:</strong> Đề thi NVIDIA DLI rất hay hỏi về inference parameters (temperature, top-k, top-p) và khi nào dùng NIM vs framework khác. Nắm chắc bảng so sánh ở cuối bài.</p></blockquote>

<figure><img src="/storage/uploads/2026/04/nvidia-dli-bai6-llm-inference-pipeline.webp" alt="LLM Inference Pipeline — Prompt Template, NIM, LCEL Chain, Gradio UI" loading="lazy" /><figcaption>LLM Inference Pipeline — Prompt Template, NIM, LCEL Chain, Gradio UI</figcaption></figure>

<h2 id="2-llm-inference-fundamentals">2. LLM Inference Fundamentals</h2>

<h3 id="2-1-autoregressive-generation">2.1. Autoregressive Generation</h3>

<p>LLM sinh text theo cơ chế <strong>autoregressive</strong>: mỗi bước, model dự đoán token tiếp theo dựa trên tất cả token trước đó. Quá trình lặp lại cho đến khi gặp <strong>stop token</strong> hoặc đạt <strong>max_tokens</strong>.</p>

<pre><code class="language-text">
Autoregressive Generation Flow
═══════════════════════════════

Input: "Hà Nội là"
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
    token = "thủ"
           │
           ▼
Input: "Hà Nội là thủ"
         │
         ▼
┌─────────────────────┐
│   LLM Forward Pass   │
└──────────┬──────────┘
           │
           ▼
    token = "đô"
           │
           ▼
   ... lặp lại đến &lt;EOS&gt; hoặc max_tokens
</code></pre>

<h3 id="2-2-sampling-parameters">2.2. Sampling Parameters</h3>

<p>Ba tham số quan trọng nhất kiểm soát tính sáng tạo của output:</p>

<table>
<thead>
<tr><th>Parameter</th><th>Range</th><th>Tác dụng</th><th>Giá trị thấp</th><th>Giá trị cao</th></tr>
</thead>
<tbody>
<tr><td><strong>temperature</strong></td><td>0.0 – 2.0</td><td>Điều chỉnh entropy của phân phối xác suất</td><td>Deterministic, lặp lại</td><td>Sáng tạo, random hơn</td></tr>
<tr><td><strong>top_k</strong></td><td>1 – vocab_size</td><td>Giới hạn chỉ xét top K token có xác suất cao nhất</td><td>Chọn lọc hơn, ít đa dạng</td><td>Nhiều lựa chọn hơn</td></tr>
<tr><td><strong>top_p</strong></td><td>0.0 – 1.0</td><td>Nucleus sampling: chỉ xét tokens có cumulative prob ≤ p</td><td>Chỉ token chắc chắn nhất</td><td>Xét nhiều token hơn</td></tr>
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
         │   Keep top 4   │  → loại bỏ token 5,6,7...
         └──────┬───────┘
                │
                ▼
Filtered:   [0.41, 0.33, 0.14, 0.12]  (re-normalized)
                │
                ▼
         Random sample → token "thủ"
</code></pre>

<h3 id="2-3-other-parameters">2.3. Các tham số khác</h3>

<table>
<thead>
<tr><th>Parameter</th><th>Mô tả</th><th>Use case</th></tr>
</thead>
<tbody>
<tr><td><strong>max_tokens</strong></td><td>Giới hạn số token output tối đa</td><td>Kiểm soát chi phí, latency</td></tr>
<tr><td><strong>stop</strong></td><td>Dừng generation khi gặp chuỗi này</td><td>Structured output, function calling</td></tr>
<tr><td><strong>repetition_penalty</strong></td><td>Phạt token đã xuất hiện (>1.0 = phạt nặng)</td><td>Tránh lặp từ/câu</td></tr>
<tr><td><strong>frequency_penalty</strong></td><td>Giảm xác suất theo tần suất xuất hiện</td><td>Output đa dạng hơn</td></tr>
<tr><td><strong>presence_penalty</strong></td><td>Phạt nếu token đã xuất hiện ít nhất 1 lần</td><td>Khuyến khích chủ đề mới</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Câu hỏi hay gặp: "Muốn output luôn giống nhau (deterministic), set parameter nào?" → <strong>temperature = 0.0</strong>. Nếu hỏi "giảm lặp từ" → dùng <strong>repetition_penalty > 1.0</strong> hoặc <strong>frequency_penalty > 0</strong>.</p></blockquote>

<h2 id="3-nvidia-nim">3. NVIDIA NIM (NVIDIA Inference Microservices)</h2>

<h3 id="3-1-nim-la-gi">3.1. NIM là gì?</h3>

<p><strong>NVIDIA NIM</strong> là bộ <strong>pre-optimized inference containers</strong> cho phép deploy LLM/multimodal models với hiệu năng cao nhất trên GPU NVIDIA. NIM đã tích hợp sẵn <strong>TensorRT-LLM</strong>, quantization, và tối ưu memory.</p>

<p>Đặc điểm chính:</p>
<ul>
<li><strong>OpenAI-compatible API</strong> — drop-in replacement, dùng openai client gọi thẳng</li>
<li><strong>TensorRT-LLM backend</strong> — tối ưu kernel cho NVIDIA GPU</li>
<li><strong>Continuous batching</strong> — xử lý nhiều request cùng lúc hiệu quả</li>
<li><strong>gRPC + REST API</strong> — flexible integration</li>
<li><strong>Multi-GPU support</strong> — tensor parallelism tự động</li>
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

<h3 id="3-3-pull-run-nim">3.3. Pull &amp; Run NIM Container</h3>

<pre><code class="language-python">
# Pull và chạy NIM container cho Llama-3
# Yêu cầu: NVIDIA GPU, Docker + NVIDIA Container Toolkit

# Terminal command:
# docker run -it --rm --gpus all \
#   -p 8000:8000 \
#   -e NGC_API_KEY=$NGC_API_KEY \
#   nvcr.io/nim/meta/llama-3.1-8b-instruct:latest
</code></pre>

<h3 id="3-4-call-nim-api">3.4. Gọi NIM API</h3>

<pre><code class="language-python">
from openai import OpenAI

# NIM tương thích OpenAI API — chỉ cần đổi base_url
client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="not-used"  # NIM local không cần key
)

response = client.chat.completions.create(
    model="meta/llama-3.1-8b-instruct",
    messages=[
        {"role": "system", "content": "Bạn là trợ lý AI hữu ích."},
        {"role": "user", "content": "Giải thích Transformer architecture"}
    ],
    temperature=0.7,
    top_p=0.9,
    max_tokens=512
)

print(response.choices[0].message.content)
</code></pre>

<h3 id="3-5-nim-vs-hf">3.5. So sánh NIM vs Raw HuggingFace Inference</h3>

<table>
<thead>
<tr><th>Tiêu chí</th><th>NVIDIA NIM</th><th>HuggingFace Transformers</th></tr>
</thead>
<tbody>
<tr><td><strong>Backend</strong></td><td>TensorRT-LLM</td><td>PyTorch</td></tr>
<tr><td><strong>Throughput</strong> (tokens/s)</td><td>~2500-4000</td><td>~300-800</td></tr>
<tr><td><strong>Latency</strong> (TTFT)</td><td>~50-100ms</td><td>~200-500ms</td></tr>
<tr><td><strong>Batching</strong></td><td>Continuous batching</td><td>Manual / static</td></tr>
<tr><td><strong>API</strong></td><td>OpenAI-compatible REST</td><td>Python API</td></tr>
<tr><td><strong>Setup</strong></td><td>1 lệnh docker run</td><td>Install libs + code</td></tr>
<tr><td><strong>Quantization</strong></td><td>Tích hợp sẵn (FP8, INT4)</td><td>Cần GPTQ/AWQ riêng</td></tr>
<tr><td><strong>Production ready</strong></td><td>Có (monitoring, scaling)</td><td>Cần thêm serving layer</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> NIM luôn là đáp án đúng khi đề hỏi "fastest way to deploy LLM on NVIDIA GPU" hoặc "production-ready inference with TensorRT-LLM optimization". NIM ≠ training framework — chỉ dùng cho <strong>inference</strong>.</p></blockquote>

<h2 id="4-langchain-lcel">4. LangChain LCEL Pipeline Design</h2>

<h3 id="4-1-lcel-la-gi">4.1. LCEL là gì?</h3>

<p><strong>LangChain Expression Language (LCEL)</strong> là cú pháp declarative để xây dựng pipeline xử lý LLM. Dùng toán tử <code>|</code> (pipe) để nối các component lại thành chain — tương tự Unix pipe.</p>

<p>Ưu điểm LCEL:</p>
<ul>
<li><strong>Streaming</strong> — hỗ trợ stream output token-by-token</li>
<li><strong>Async</strong> — native async support</li>
<li><strong>Batching</strong> — xử lý nhiều input cùng lúc</li>
<li><strong>Retry/Fallback</strong> — tự động retry khi lỗi</li>
<li><strong>Tracing</strong> — tích hợp LangSmith để debug</li>
</ul>

<h3 id="4-2-core-primitives">4.2. Core Primitives</h3>

<table>
<thead>
<tr><th>Component</th><th>Vai trò</th><th>Input → Output</th></tr>
</thead>
<tbody>
<tr><td><strong>PromptTemplate</strong></td><td>Format prompt với variables</td><td>dict → PromptValue</td></tr>
<tr><td><strong>ChatPromptTemplate</strong></td><td>Format chat messages</td><td>dict → ChatPromptValue</td></tr>
<tr><td><strong>ChatModel</strong></td><td>Gọi LLM (ChatOpenAI, ChatNVIDIA...)</td><td>PromptValue → AIMessage</td></tr>
<tr><td><strong>StrOutputParser</strong></td><td>Extract string từ AIMessage</td><td>AIMessage → str</td></tr>
<tr><td><strong>JsonOutputParser</strong></td><td>Parse JSON từ output</td><td>AIMessage → dict</td></tr>
<tr><td><strong>RunnablePassthrough</strong></td><td>Pass input qua không đổi</td><td>any → any</td></tr>
<tr><td><strong>RunnableLambda</strong></td><td>Wrap function thành Runnable</td><td>any → any</td></tr>
<tr><td><strong>RunnableParallel</strong></td><td>Chạy nhiều chain song song</td><td>dict → dict</td></tr>
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
│ PromptTemplate │──►│  ChatModel   │──►│ StrOutputParser │──► "AI là..."
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

# 1. Khởi tạo components
prompt = ChatPromptTemplate.from_messages([
    ("system", "Bạn là chuyên gia {domain}. Trả lời ngắn gọn."),
    ("human", "{question}")
])

llm = ChatNVIDIA(
    model="meta/llama-3.1-8b-instruct",
    temperature=0.3,
    top_p=0.9,
    max_tokens=512
)

parser = StrOutputParser()

# 2. Tạo chain bằng LCEL pipe syntax
chain = prompt | llm | parser

# 3. Invoke (đồng bộ)
result = chain.invoke({
    "domain": "deep learning",
    "question": "Transformer self-attention hoạt động thế nào?"
})
print(result)

# 4. Stream (token-by-token)
for chunk in chain.stream({
    "domain": "deep learning",
    "question": "So sánh RNN và Transformer"
}):
    print(chunk, end="", flush=True)
</code></pre>

<h3 id="4-5-advanced-lcel">4.5. Advanced: RunnableParallel &amp; RunnableLambda</h3>

<pre><code class="language-python">
from langchain_core.runnables import (
    RunnablePassthrough,
    RunnableParallel,
    RunnableLambda
)

# Custom function wrapped thành Runnable
def word_count(text: str) -> dict:
    return {"text": text, "word_count": len(text.split())}

# Parallel chain: vừa summarize vừa đếm từ
parallel_chain = RunnableParallel(
    summary=prompt | llm | parser,
    metadata=RunnableLambda(
        lambda x: f"Query: {x['question']}"
    )
)

# Chain với passthrough — giữ input gốc qua pipeline
chain_with_context = (
    RunnablePassthrough.assign(
        answer=prompt | llm | parser
    )
)

# Invoke parallel
result = parallel_chain.invoke({
    "domain": "AI",
    "question": "Generative AI là gì?"
})
# result = {"summary": "...", "metadata": "Query: Generative AI là gì?"}
</code></pre>

<blockquote><p><strong>Exam tip:</strong> Khi đề cho code LCEL và hỏi "output type là gì", hãy trace từng bước: PromptTemplate → PromptValue, ChatModel → AIMessage, StrOutputParser → str. <strong>Nếu quên parser</strong>, output sẽ là AIMessage object (không phải string).</p></blockquote>

<h2 id="5-gradio-langserve">5. Build UI với Gradio &amp; API với LangServe</h2>

<h3 id="5-1-gradio-chatbot">5.1. Gradio: Rapid Chatbot UI</h3>

<p><strong>Gradio</strong> cho phép tạo web UI cho ML models chỉ với vài dòng code. Component <code>gr.ChatInterface</code> đặc biệt phù hợp cho chatbot.</p>

<pre><code class="language-python">
import gradio as gr
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# Setup chain
prompt = ChatPromptTemplate.from_messages([
    ("system", "Bạn là trợ lý AI thân thiện."),
    ("human", "{message}")
])
llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
chain = prompt | llm | StrOutputParser()

# Gradio handler
def respond(message, history):
    """Handle chat message — history là list of [user, bot] pairs."""
    response = chain.invoke({"message": message})
    return response

# Launch UI
demo = gr.ChatInterface(
    fn=respond,
    title="NVIDIA NIM Chatbot",
    description="Chatbot powered by Llama 3.1 via NIM",
    examples=["Generative AI là gì?", "So sánh GAN và Diffusion"],
    theme="soft"
)
demo.launch(server_port=7860)
</code></pre>

<h3 id="5-2-langserve-api">5.2. LangServe: Expose Chain as REST API</h3>

<p><strong>LangServe</strong> biến bất kỳ LCEL chain nào thành REST API với docs tự động (Swagger). Phù hợp cho production deployment.</p>

<pre><code class="language-python">
# === Server (server.py) ===
from fastapi import FastAPI
from langserve import add_routes
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

app = FastAPI(title="LLM API")

# Tạo chain
chain = (
    ChatPromptTemplate.from_messages([
        ("system", "Trợ lý AI chuyên về {domain}."),
        ("human", "{question}")
    ])
    | ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
    | StrOutputParser()
)

# Expose chain tại /chat endpoint
add_routes(app, chain, path="/chat")

# Run: uvicorn server:app --port 8080
</code></pre>

<pre><code class="language-python">
# === Client (client.py) ===
from langserve import RemoteRunnable

# Kết nối đến LangServe endpoint
chain = RemoteRunnable("http://localhost:8080/chat")

# Invoke giống như local chain
result = chain.invoke({
    "domain": "machine learning",
    "question": "Overfitting là gì?"
})
print(result)

# Stream cũng hoạt động
for chunk in chain.stream({
    "domain": "NLP",
    "question": "Tokenization hoạt động thế nào?"
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

<blockquote><p><strong>Exam tip:</strong> Gradio = <strong>prototyping/demo UI</strong>, LangServe = <strong>production REST API</strong>. Nếu đề hỏi "fastest way to demo a chatbot" → Gradio. "Expose chain for multiple clients" → LangServe. Hai cái có thể dùng cùng nhau.</p></blockquote>

<h2 id="6-dialog-management">6. Dialog Management &amp; Multi-turn Conversation</h2>

<h3 id="6-1-memory-types">6.1. Các loại Memory</h3>

<p>Chatbot cần <strong>nhớ</strong> context từ các lượt hội thoại trước. LangChain cung cấp nhiều loại memory:</p>

<table>
<thead>
<tr><th>Memory Type</th><th>Cách hoạt động</th><th>Ưu điểm</th><th>Nhược điểm</th></tr>
</thead>
<tbody>
<tr><td><strong>ConversationBufferMemory</strong></td><td>Lưu toàn bộ lịch sử</td><td>Không mất thông tin</td><td>Token count tăng nhanh</td></tr>
<tr><td><strong>ConversationBufferWindowMemory</strong></td><td>Giữ N lượt gần nhất</td><td>Kiểm soát token</td><td>Mất context cũ</td></tr>
<tr><td><strong>ConversationSummaryMemory</strong></td><td>Tóm tắt lịch sử bằng LLM</td><td>Nén thông tin hiệu quả</td><td>Tốn thêm LLM call</td></tr>
<tr><td><strong>ConversationSummaryBufferMemory</strong></td><td>Tóm tắt cũ + giữ nguyên gần đây</td><td>Cân bằng chi tiết/nén</td><td>Phức tạp hơn</td></tr>
</tbody>
</table>

<h3 id="6-2-message-types">6.2. Message Types</h3>

<p>LangChain dùng typed messages để phân biệt vai trò:</p>

<pre><code class="language-python">
from langchain_core.messages import (
    SystemMessage,
    HumanMessage,
    AIMessage
)

messages = [
    SystemMessage(content="Bạn là trợ lý AI."),
    HumanMessage(content="Xin chào!"),
    AIMessage(content="Chào bạn! Tôi có thể giúp gì?"),
    HumanMessage(content="Giải thích attention mechanism"),
]
</code></pre>

<h3 id="6-3-multi-turn-code">6.3. Code: Multi-turn Chatbot với Memory</h3>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# 1. Prompt có slot cho message history
prompt = ChatPromptTemplate.from_messages([
    ("system", "Bạn là trợ lý AI. Trả lời ngắn gọn."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}")
])

llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
chain = prompt | llm | StrOutputParser()

# 2. Session store — mỗi user một history riêng
session_store = {}

def get_session_history(session_id: str):
    if session_id not in session_store:
        session_store[session_id] = InMemoryChatMessageHistory()
    return session_store[session_id]

# 3. Wrap chain với message history
chain_with_history = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="history"
)

# 4. Chat — cùng session_id giữ context
config = {"configurable": {"session_id": "user-123"}}

r1 = chain_with_history.invoke(
    {"input": "Tên tôi là Minh"},
    config=config
)
print(r1)  # "Xin chào Minh!..."

r2 = chain_with_history.invoke(
    {"input": "Tên tôi là gì?"},
    config=config
)
print(r2)  # "Tên bạn là Minh."  ← nhớ context!
</code></pre>

<h3 id="6-4-window-memory">6.4. Window Memory Pattern</h3>

<pre><code class="language-text">
Window Memory (k=3): Chỉ giữ 3 lượt gần nhất
═══════════════════════════════════════════════

Turn 1: User: "Xin chào"        ─┐
Turn 2: AI: "Chào bạn!"          │ ← bị loại khi turn > 3+k
Turn 3: User: "Tôi là Minh"      │
Turn 4: AI: "Chào Minh!"        ─┘

Turn 5: User: "Giải thích CNN"   ─┐
Turn 6: AI: "CNN là..."           │ ← giữ lại
Turn 7: User: "So với RNN?"      ─┘

Prompt gửi đi chỉ gồm: [System] + [Turn 5,6,7] + [Turn 8 input]
→ Tiết kiệm token, nhưng mất context "tên là Minh"
</code></pre>

<blockquote><p><strong>Exam tip:</strong> "Chatbot quên context sau vài lượt" → đang dùng <strong>BufferWindowMemory quá nhỏ</strong> hoặc không có memory. "Token limit exceeded" → chuyển sang <strong>ConversationSummaryMemory</strong> để nén lịch sử.</p></blockquote>

<h2 id="7-comparison-table">7. So sánh Inference Frameworks</h2>

<table>
<thead>
<tr><th>Feature</th><th>NVIDIA NIM</th><th>vLLM</th><th>TGI (HuggingFace)</th><th>Ollama</th></tr>
</thead>
<tbody>
<tr><td><strong>Backend</strong></td><td>TensorRT-LLM</td><td>PagedAttention</td><td>PyTorch + Flash</td><td>llama.cpp</td></tr>
<tr><td><strong>GPU Required</strong></td><td>NVIDIA (A100/H100)</td><td>NVIDIA</td><td>NVIDIA</td><td>Không (CPU OK)</td></tr>
<tr><td><strong>Throughput</strong></td><td>Cao nhất</td><td>Rất cao</td><td>Cao</td><td>Thấp</td></tr>
<tr><td><strong>Quantization</strong></td><td>FP8, INT4 tích hợp</td><td>AWQ, GPTQ</td><td>GPTQ, bitsandbytes</td><td>GGUF</td></tr>
<tr><td><strong>API</strong></td><td>OpenAI-compatible</td><td>OpenAI-compatible</td><td>Custom + Messages</td><td>OpenAI-compatible</td></tr>
<tr><td><strong>Setup</strong></td><td>Docker (NGC)</td><td>pip install</td><td>Docker</td><td>1 binary</td></tr>
<tr><td><strong>Best for</strong></td><td>Enterprise, production</td><td>Research, high-throughput</td><td>HF ecosystem</td><td>Local dev, laptop</td></tr>
<tr><td><strong>NVIDIA optimized</strong></td><td>✅ Sâu nhất</td><td>✅ Tốt</td><td>Một phần</td><td>❌</td></tr>
</tbody>
</table>

<blockquote><p><strong>Exam tip:</strong> Đề thi NVIDIA DLI sẽ ưu tiên <strong>NIM</strong> cho mọi câu hỏi deployment production. "Best performance on NVIDIA GPU" → NIM. "Quick local testing on laptop" → Ollama. "Open-source high throughput" → vLLM.</p></blockquote>

<h2 id="8-cheat-sheet">8. Cheat Sheet</h2>

<table>
<thead>
<tr><th>Concept</th><th>Key Point</th></tr>
</thead>
<tbody>
<tr><td>temperature = 0.0</td><td>Deterministic output (lặp lại)</td></tr>
<tr><td>temperature = 1.0+</td><td>Creative, random hơn</td></tr>
<tr><td>top_p = 0.1</td><td>Chỉ chọn token chắc chắn nhất</td></tr>
<tr><td>top_k = 50</td><td>Giới hạn 50 token candidates</td></tr>
<tr><td>NIM</td><td>Pre-optimized container, TensorRT-LLM, OpenAI API</td></tr>
<tr><td>LCEL pipe</td><td>prompt | llm | parser</td></tr>
<tr><td>RunnableParallel</td><td>Chạy nhiều chain cùng lúc</td></tr>
<tr><td>Gradio</td><td>Demo UI, gr.ChatInterface</td></tr>
<tr><td>LangServe</td><td>REST API từ LCEL chain, FastAPI</td></tr>
<tr><td>BufferMemory</td><td>Lưu toàn bộ history → token tăng nhanh</td></tr>
<tr><td>SummaryMemory</td><td>Nén history bằng LLM → tiết kiệm token</td></tr>
<tr><td>WindowMemory (k=N)</td><td>Giữ N lượt gần nhất</td></tr>
<tr><td>MessagesPlaceholder</td><td>Slot trong prompt cho chat history</td></tr>
<tr><td>RunnableWithMessageHistory</td><td>Wrap chain + session-based memory</td></tr>
</tbody>
</table>

<h2 id="9-practice-questions">9. Practice Questions</h2>

<p><strong>Q1: Build LCEL Chain với Streaming</strong></p>
<p>Viết LCEL chain dùng <code>PromptTemplate</code> → <code>ChatNVIDIA</code> → <code>StrOutputParser</code>. Prompt nhận <code>topic</code>, yêu cầu LLM giải thích topic đó. Thêm streaming output.</p>

<details>
<summary>Xem đáp án Q1</summary>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# Tạo prompt template
prompt = ChatPromptTemplate.from_messages([
    ("system", "Bạn là giáo viên AI. Giải thích dễ hiểu."),
    ("human", "Giải thích chi tiết về: {topic}")
])

# Tạo LLM
llm = ChatNVIDIA(
    model="meta/llama-3.1-8b-instruct",
    temperature=0.5,
    max_tokens=1024
)

# Tạo parser
parser = StrOutputParser()

# LCEL chain
chain = prompt | llm | parser

# Invoke (trả kết quả 1 lần)
result = chain.invoke({"topic": "Diffusion Models"})
print(result)

# Stream (token-by-token) — dùng .stream() thay vì .invoke()
for chunk in chain.stream({"topic": "Diffusion Models"}):
    print(chunk, end="", flush=True)

# Giải thích:
# - .invoke() gọi chain và đợi toàn bộ output
# - .stream() trả về iterator, mỗi chunk là 1 phần output
# - StrOutputParser cho phép stream vì nó pass-through string chunks
# - Nếu dùng JsonOutputParser, stream sẽ trả partial JSON
</code></pre>
</details>

<p><strong>Q2: Configure NIM &amp; So sánh Temperature</strong></p>
<p>Gọi NIM endpoint dùng OpenAI client. Cùng 1 prompt, so sánh output khi <code>temperature=0.0</code> vs <code>temperature=1.0</code>. Chạy mỗi cấu hình 3 lần và quan sát sự khác biệt.</p>

<details>
<summary>Xem đáp án Q2</summary>

<pre><code class="language-python">
from openai import OpenAI

# Kết nối NIM endpoint
client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="not-used"
)

prompt_msg = [
    {"role": "system", "content": "Trả lời ngắn gọn trong 1-2 câu."},
    {"role": "user", "content": "Tại sao bầu trời có màu xanh?"}
]

print("=== Temperature = 0.0 (Deterministic) ===")
for i in range(3):
    resp = client.chat.completions.create(
        model="meta/llama-3.1-8b-instruct",
        messages=prompt_msg,
        temperature=0.0,  # Luôn chọn token có xác suất cao nhất
        max_tokens=100
    )
    print(f"Run {i+1}: {resp.choices[0].message.content}")
# → 3 lần cho output GIỐNG NHAU

print("\n=== Temperature = 1.0 (Creative) ===")
for i in range(3):
    resp = client.chat.completions.create(
        model="meta/llama-3.1-8b-instruct",
        messages=prompt_msg,
        temperature=1.0,  # Phân phối rộng, random hơn
        max_tokens=100
    )
    print(f"Run {i+1}: {resp.choices[0].message.content}")
# → 3 lần cho output KHÁC NHAU

# Key insight:
# - temp=0.0: greedy decoding, reproducible, dùng cho factual tasks
# - temp=1.0: sampling rộng hơn, creative, dùng cho brainstorming
# - NIM dùng OpenAI-compatible API nên client code giống hệt
</code></pre>
</details>

<p><strong>Q3: Multi-turn Chatbot với Memory</strong></p>
<p>Tạo chatbot sử dụng <code>ConversationBufferMemory</code> tích hợp vào LCEL chain thông qua <code>RunnableWithMessageHistory</code>. Bot phải nhớ tên user từ lượt trước.</p>

<details>
<summary>Xem đáp án Q3</summary>

<pre><code class="language-python">
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# 1. Prompt với history placeholder
prompt = ChatPromptTemplate.from_messages([
    ("system", "Bạn là trợ lý thân thiện. Nhớ thông tin user đã chia sẻ."),
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

# 4. Wrap với message history
chatbot = RunnableWithMessageHistory(
    chain,
    get_history,
    input_messages_key="input",
    history_messages_key="history"
)

# 5. Test multi-turn
cfg = {"configurable": {"session_id": "demo-001"}}

print(chatbot.invoke({"input": "Tên tôi là Lan"}, config=cfg))
# → "Xin chào Lan! Rất vui được gặp bạn..."

print(chatbot.invoke({"input": "Tên tôi là gì?"}, config=cfg))
# → "Tên bạn là Lan." ← Bot nhớ context!

print(chatbot.invoke({"input": "Tôi thích machine learning"}, config=cfg))
# → "Tuyệt vời Lan! Machine learning là..."

# Kiểm tra history đã lưu
history = store["demo-001"]
for msg in history.messages:
    print(f"{msg.type}: {msg.content[:50]}...")
</code></pre>
</details>

<p><strong>Q4: Gradio ChatInterface + LangChain</strong></p>
<p>Tạo Gradio UI chatbot sử dụng <code>gr.ChatInterface</code>, backend là LCEL chain gọi NIM. Hỗ trợ streaming response.</p>

<details>
<summary>Xem đáp án Q4</summary>

<pre><code class="language-python">
import gradio as gr
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# 1. Setup LCEL chain
prompt = ChatPromptTemplate.from_messages([
    ("system", "Bạn là trợ lý AI chuyên về deep learning."),
    ("human", "{message}")
])
llm = ChatNVIDIA(
    model="meta/llama-3.1-8b-instruct",
    temperature=0.7
)
chain = prompt | llm | StrOutputParser()

# 2. Streaming handler cho Gradio
def respond_stream(message, history):
    """
    Gradio ChatInterface gọi function này.
    - message: tin nhắn mới của user
    - history: list of [user_msg, bot_msg] pairs
    Yield từng chunk để Gradio hiển thị streaming.
    """
    partial = ""
    for chunk in chain.stream({"message": message}):
        partial += chunk
        yield partial  # Gradio cập nhật UI mỗi lần yield

# 3. Launch Gradio app
demo = gr.ChatInterface(
    fn=respond_stream,
    title="🤖 DL Assistant (NIM-powered)",
    description="Hỏi bất kỳ câu nào về Deep Learning",
    examples=[
        "Transformer hoạt động thế nào?",
        "So sánh CNN và ViT",
        "Batch Normalization dùng để làm gì?"
    ],
    theme="soft"
)

demo.launch(server_port=7860, share=False)

# Truy cập: http://localhost:7860
# Gradio sẽ hiển thị streaming response real-time
</code></pre>
</details>

<p><strong>Q5: Debug — Chain trả về output rỗng</strong></p>
<p>Code bên dưới chạy nhưng output luôn rỗng hoặc là object không mong muốn. Tìm và sửa lỗi.</p>

<pre><code class="language-python">
# BUG: chain trả về AIMessage object thay vì string
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser  # ← Hmm...
from langchain_nvidia_ai_endpoints import ChatNVIDIA

prompt = ChatPromptTemplate.from_messages([
    ("system", "Trả lời ngắn gọn bằng tiếng Việt."),
    ("human", "{question}")
])

llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
chain = prompt | llm | JsonOutputParser()  # ← Lỗi ở đây

result = chain.invoke({"question": "AI là gì?"})
print(result)  # → Error hoặc output rỗng/lạ
</code></pre>

<details>
<summary>Xem đáp án Q5</summary>

<pre><code class="language-python">
# PHÂN TÍCH LỖI:
# - Prompt yêu cầu LLM trả lời bằng text thuần (tiếng Việt)
# - Nhưng parser là JsonOutputParser → expect JSON format
# - LLM trả về "AI là trí tuệ nhân tạo..." (not JSON)
# - JsonOutputParser cố parse → fail hoặc trả output rỗng

# SỬA: Thay JsonOutputParser bằng StrOutputParser

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser  # ← FIX!
from langchain_nvidia_ai_endpoints import ChatNVIDIA

prompt = ChatPromptTemplate.from_messages([
    ("system", "Trả lời ngắn gọn bằng tiếng Việt."),
    ("human", "{question}")
])

llm = ChatNVIDIA(model="meta/llama-3.1-8b-instruct")
chain = prompt | llm | StrOutputParser()  # ← StrOutputParser

result = chain.invoke({"question": "AI là gì?"})
print(result)  # → "AI (Artificial Intelligence) là trí tuệ nhân tạo..."

# RULE: OutputParser type PHẢI match output format:
# - Text thuần → StrOutputParser
# - JSON output (prompt phải yêu cầu JSON) → JsonOutputParser
# - Structured output → PydanticOutputParser
# Nếu mismatch → chain fail silently or raise error
</code></pre>
</details>
