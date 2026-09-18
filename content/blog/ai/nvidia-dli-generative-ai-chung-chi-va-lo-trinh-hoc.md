---
id: 05e72d3d-f5d2-4304-8fe1-c29fe5ac8ec6
title: 'NVIDIA DLI Generative AI: Toàn bộ chứng chỉ, khóa học, bài thi và lộ trình chuẩn bị chi tiết'
slug: nvidia-dli-generative-ai-chung-chi-va-lo-trinh-hoc
excerpt: Hướng dẫn chi tiết toàn bộ hệ sinh thái NVIDIA DLI về Generative AI và LLM --- từ khóa Diffusion Models, RAG Agents, Agentic AI đến Transformer NLP. Phân tích nội dung bài thi, độ khó assessment, câu hỏi mẫu, mẹo thi, và lộ trình học từ beginner đến professional.
featured_image: /images/blog/nvidia-dli-genai-featured.webp
type: blog
reading_time: 30
view_count: 0
meta: null
published_at: '2026-04-13T14:00:00.000000Z'
created_at: '2026-04-13T14:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: AI, slug: ai}, {name: LLM, slug: llm}, {name: Deep Learning, slug: deep-learning}, {name: NVIDIA, slug: nvidia}, {name: Certification, slug: certification}]
comments: []
---

Nếu bạn đang tìm một **chứng chỉ AI thực chiến** thay vì chỉ lý thuyết suông, NVIDIA Deep Learning Institute (DLI) là lựa chọn hàng đầu. Khác với AWS hay Azure tập trung vào cloud platform riêng, NVIDIA DLI dạy bạn **hands-on coding trực tiếp** trên GPU --- từ build U-Net diffusion model từ đầu, đến deploy RAG agent production-grade.

Bài viết này sẽ đi sâu vào **toàn bộ hệ thống khóa học và chứng chỉ Generative AI** của NVIDIA DLI: nội dung từng khóa, format bài thi, độ khó assessment, câu hỏi mẫu, và lộ trình chuẩn bị chi tiết.

* * *

## 1. Tổng quan hệ thống NVIDIA DLI

NVIDIA DLI **không phải là một certification exam truyền thống** như AWS hay Azure. Thay vào đó, NVIDIA có **2 loại credential** riêng biệt:

### DLI Course Certificates (Completion-based)

- Hoàn thành khóa học self-paced hoặc instructor-led
- Phải **pass bài assessment cuối khóa** (hands-on coding, không phải MCQ)
- Nhận certificate qua email, verify trên NVIDIA
- Giá: **$30 --- $90/khóa** (self-paced) hoặc workshop fee (instructor-led)
- **Không có thời gian hết hạn**

### NVIDIA Professional Certifications (Exam-based)

- Thi proctored exam qua Pearson VUE
- Dạng multiple-choice + scenario-based
- Giá: **$125 (Associate)** hoặc **$400 (Professional)**
- Thời gian: **1--2 giờ**
- Hiệu lực: **2 năm**, sau đó phải thi lại
- Hiện có các chứng chỉ: **NCA-AIIO** (Associate), **NCP-AII**, **NCP-AIO**, **NCP-AIN** (Professional)

> **Lưu ý quan trọng:** Tính đến tháng 4/2026, NVIDIA **chưa có Professional Certification riêng cho Generative AI/LLM**. Các chứng chỉ professional hiện tại tập trung vào **AI Infrastructure, Operations, và Networking**. Tuy nhiên, DLI Course Certificates cho GenAI/LLM được industry công nhận rộng rãi và có assessment **khó hơn đáng kể** so với MCQ thông thường.

* * *

## 2. Generative AI with Diffusion Models --- Khoá khó nhất

<table>
<tr><td><strong>Mã khóa</strong></td><td>DLI+S-FX-14+V1</td></tr>
<tr><td><strong>Thời lượng</strong></td><td>8 giờ</td></tr>
<tr><td><strong>Giá</strong></td><td>$90</td></tr>
<tr><td><strong>Level</strong></td><td>Technical - Intermediate</td></tr>
<tr><td><strong>Ngôn ngữ</strong></td><td>English</td></tr>
<tr><td><strong>Framework</strong></td><td>PyTorch, CLIP</td></tr>
<tr><td><strong>Certificate</strong></td><td>Có (sau khi pass assessment)</td></tr>
</table>

### Nội dung chi tiết từng module

**Module 1: From U-Net to Diffusion**
- Build kiến trúc **U-Net từ đầu** bằng PyTorch
- Train model remove noise từ image
- Hiểu encoder-decoder architecture với skip connections
- Hands-on: Viết forward pass, loss function, training loop

**Module 2: Diffusion Models**
- Implement **forward diffusion function** --- thêm noise dần vào image
- Update U-Net architecture để accommodate **timestep embedding**
- Implement **reverse diffusion function** --- denoise image từ pure noise
- Toán học: Markov chain, variance schedule ($\beta_t$), reparameterization trick

**Module 3: Optimizations**
- Implement **Group Normalization** thay Batch Norm (stable hơn cho small batches)
- Implement **GELU activation** (Gaussian Error Linear Unit)
- Implement **Rearrange Pooling** cho spatial downsampling
- Implement **Sinusoidal Position Embeddings** cho timestep encoding:

$$PE(t, 2i) = \sin\left(\frac{t}{10000^{2i/d}}\right)$$
$$PE(t, 2i+1) = \cos\left(\frac{t}{10000^{2i/d}}\right)$$

**Module 4: Classifier-Free Diffusion Guidance**
- Thêm **categorical embeddings** vào U-Net
- Train model với **Bernoulli mask** --- random drop condition
- Implement **CFG scale** ($w$) cho inference:

$$\hat{\epsilon}_\theta(x_t, c) = \epsilon_\theta(x_t, \varnothing) + w \cdot (\epsilon_\theta(x_t, c) - \epsilon_\theta(x_t, \varnothing))$$

- Hiểu trade-off giữa diversity vs. fidelity

**Module 5: CLIP (Contrastive Language-Image Pretraining)**
- Sử dụng **CLIP Encodings** để map text → embedding space
- Kết hợp CLIP với U-Net để tạo **text-to-image pipeline**
- Implement cross-attention giữa text embeddings và image features
- Hands-on: Generate images từ English text prompts

### Assessment (Bài thi)

**Format:** Coding assessment trực tiếp trong Jupyter Notebook trên GPU cloud

**Yêu cầu:**
1. **Modify U-Net architecture** để support một condition mới (không phải copy-paste từ lab)
2. **Implement custom diffusion pipeline** kết hợp nhiều kỹ thuật đã học
3. **Debug model** khi output không đúng --- tìm lỗi trong noise schedule hoặc architecture
4. Code phải **chạy được** và output phải **đạt quality threshold**

**Điểm đậu:** Assessment được auto-grade, code phải compile + output phải match expected behavior

**Độ khó: 🔴🔴🔴🔴🔴 (5/5)**

Đây là khóa **khó nhất** trong toàn bộ GenAI track vì:
- Không có multiple-choice --- phải **viết code từ đầu**
- Đòi hỏi hiểu sâu **toán học diffusion**: variance schedule, ELBO, score matching
- Phải biết **PyTorch nhuần nhuyễn**: custom modules, autograd, tensor operations
- Thời gian hạn chế --- không thể Google từng dòng code

### Câu hỏi mẫu và dạng bài

> **Dạng 1: Implement Component**
> Cho skeleton code, implement `SinusoidalPositionEmbeddings` class với input là timestep tensor, output là embedding tensor kích thước `(batch_size, dim)`.

> **Dạng 2: Debug**
> Model diffusion sau training cho ra pure noise. Tìm lỗi trong function `reverse_diffusion()` dưới đây. (Gợi ý: kiểm tra variance schedule)

> **Dạng 3: Extend Architecture**
> Thêm classifier-free guidance vào model đã train. Implement function `guided_sampling(model, prompt, cfg_scale)` sao cho:
> - Khi `cfg_scale=0`: output giống unconditional model
> - Khi `cfg_scale=7.5`: output match prompt

> **Dạng 4: Integration**
> Kết hợp CLIP encoder với diffusion model. Viết full pipeline từ text input → generated image, bao gồm:
> - Text encoding qua CLIP
> - Cross-attention injection vào U-Net
> - Reverse diffusion loop với DDPM scheduler

### Mẹo thi

1. **Làm lab kỹ, đừng chỉ chạy cell** --- hiểu từng dòng code, đặc biệt tensor shapes
2. **Nhớ công thức toán**: $q(x_t | x_{t-1})$, $p_\theta(x_{t-1} | x_t)$, noise scheduling
3. **Practice PyTorch cơ bản**: `nn.Module`, `forward()`, `torch.randn()`, einops
4. **Đừng hoảng nếu model output noise** --- debug systematic: check shapes → check loss → check scheduling
5. **Thời gian**: Dành 60% thời gian cho lab, 40% cho assessment

* * *

## 3. Building RAG Agents with LLMs --- Khóa phổ biến nhất

<table>
<tr><td><strong>Mã khóa</strong></td><td>DLI+S-FX-15+V1</td></tr>
<tr><td><strong>Thời lượng</strong></td><td>8 giờ</td></tr>
<tr><td><strong>Giá</strong></td><td>$90</td></tr>
<tr><td><strong>Level</strong></td><td>Technical - Intermediate</td></tr>
<tr><td><strong>Framework</strong></td><td>LangChain, Gradio, LangServe</td></tr>
<tr><td><strong>Certificate</strong></td><td>Có</td></tr>
</table>

### Nội dung chi tiết từng module

**Module 1: LLM Inference Interfaces & Microservices**
- Setup environment kết nối với NVIDIA NIM (Inference Microservices)
- Query LLM qua API: prompt formatting, token management
- Hiểu inference parameters: temperature, top_p, max_tokens, stop sequences

**Module 2: Pipeline Design with LangChain, Gradio, LangServe**
- Build LLM pipeline với **LangChain Expression Language (LCEL)**
- Tạo UI prototype nhanh với **Gradio**
- Deploy pipeline production qua **LangServe** (FastAPI-based)
- Chain multiple components: prompt template → LLM → output parser

**Module 3: Dialog Management with Running States**
- Implement **conversation memory** --- giữ context qua nhiều turns
- Build **state machine** cho dialog flow
- Extract structured information từ free-text conversation
- Coerce LLM output vào **Pydantic models** (structured output)

**Module 4: Working with Documents**
- Load, split, parse documents (PDF, markdown, code files)
- Implement **chunking strategies**: recursive character, semantic, sentence
- Metadata extraction và document preprocessing

**Module 5: Embeddings for Semantic Similarity & Guardrailing**
- Sử dụng embedding models cho **semantic search**
- Implement **cosine similarity** cho retrieval ranking
- Build **guardrails** bằng embedding distance --- detect off-topic queries
- Hands-on: Input/output guardrailing system

**Module 6: Vector Stores for RAG Agents**
- Setup vector database (FAISS/Milvus)
- Implement full **RAG pipeline**: query → retrieve → augment → generate
- Evaluate RAG quality: relevance, faithfulness, answer correctness
- Build agent có khả năng answer questions về research papers

### Assessment

**Format:** Coding-based, build và deploy RAG agent hoàn chỉnh

**Yêu cầu:**
1. Implement RAG pipeline có thể answer questions từ **dataset chưa thấy**
2. Agent phải handle **multi-turn conversation** --- nhớ context
3. Implement **guardrailing** --- reject off-topic queries
4. Code phải chạy end-to-end, agent response phải **relevant và accurate**

**Độ khó: 🔴🔴🔴🔴⚪ (4/5)**

**Dễ hơn Diffusion Models** vì:
- Nhiều abstraction layer (LangChain, Gradio) --- ít low-level coding
- Không đòi hỏi toán nặng
- Nhưng vẫn khó vì phải **integrate nhiều components** thành system hoàn chỉnh

### Câu hỏi mẫu

> **Dạng 1: Pipeline Construction**
> Cho dataset PDF papers, build RAG pipeline sao cho:
> - Chunk size = 512, overlap = 128
> - Embedding model: `NV-Embed-QA`
> - Top-k retrieval: 5
> - Output: answer + source citations

> **Dạng 2: Guardrailing**
> Implement input guardrail sao cho queries không liên quan đến dataset bị reject với message "I can only answer questions about AI research papers."

> **Dạng 3: State Management**
> Modify agent để support follow-up questions. User hỏi "What is attention?" → agent trả lời. User hỏi tiếp "Who invented it?" → agent phải hiểu "it" = attention mechanism.

### Mẹo thi

1. **Đọc kỹ LangChain docs** trước --- đặc biệt LCEL syntax
2. **Hiểu embedding dimensions** --- mismatch dimension là lỗi phổ biến nhất
3. **Test pipeline từng bước**: retrieval trước, rồi mới ghép generation
4. **Chunk size matters** --- quá nhỏ mất context, quá lớn noise nhiều

* * *

## 4. Building Agentic AI Applications with LLMs --- Khoá nâng cao nhất

<table>
<tr><td><strong>Mã khóa</strong></td><td>DLI+C-FX-25+V1</td></tr>
<tr><td><strong>Thời lượng</strong></td><td>8 giờ</td></tr>
<tr><td><strong>Giá</strong></td><td>Instructor-Led (liên hệ NVIDIA)</td></tr>
<tr><td><strong>Level</strong></td><td>Technical - Intermediate</td></tr>
<tr><td><strong>Framework</strong></td><td>LangGraph, NVIDIA NIM, LangChain</td></tr>
<tr><td><strong>Certificate</strong></td><td>Có</td></tr>
</table>

### Nội dung chi tiết

**Section 1: Fundamentals of Agent Abstraction and LLMs**
- LLM capabilities vs. pitfalls (hallucination, context limits, reasoning failures)
- Agents as **task decomposition abstraction**
- Minimal agent demo: free-text LLM → structured action → execution

**Section 2: Structured Output & Basic Fulfillment**
- Bottleneck LLM output vào **JSON/task-based schema**
- Domain alignment & stable schema enforcement
- Introduction to **cognitive architectures** (ReAct, Plan-and-Execute, LATS)

**Section 3: Retrieval Mechanisms & Environmental Tooling**
- Formalize **environment access strategies** cho agents
- Build tool interfaces cho DB, APIs, external repos
- Vector-based RAG cho semantic document retrieval
- **Knowledge graphs** cho structured domain knowledge

**Section 4: Multi-Agent Systems & Frameworks**
- Task decomposition among **specialized agents**
- Communication buffers và process distribution schemes
- LangGraph: state machines cho complex agent workflows
- Differentiate frameworks: LangGraph vs CrewAI vs AutoGen

**Section 5: Final Assessment**
- Deploy agent system schedules multiple retrieval operations
- Gather research từ multiple sources → synthesize → return to user
- **Optional module**: Real-time agents --- multimodal, robotics, audio systems, world models

### Assessment

**Độ khó: 🔴🔴🔴🔴🔴 (5/5)**

Phải deploy **multi-agent system hoàn chỉnh** có khả năng:
- Nhận query phức tạp từ user
- Phân tách thành sub-tasks
- Route đến specialized agents
- Aggregate results
- Return coherent response

Đây là assessment **system-level** --- không chỉ viết 1 function mà phải **architect toàn bộ pipeline**.

* * *

## 5. Evaluation and Light Customization of LLMs --- Khóa mới nhất

<table>
<tr><td><strong>Mã khóa</strong></td><td>DLI+S-FX-34+V1</td></tr>
<tr><td><strong>Thời lượng</strong></td><td>3 giờ</td></tr>
<tr><td><strong>Giá</strong></td><td>$90</td></tr>
<tr><td><strong>Level</strong></td><td>Intermediate</td></tr>
<tr><td><strong>Framework</strong></td><td>NVIDIA NeMo, NIM, MLflow, Docker</td></tr>
<tr><td><strong>Certificate</strong></td><td>Có</td></tr>
</table>

### Nội dung chi tiết

**Part 1: Fundamentals of LLM Evaluation**
- Query deployed NVIDIA NIM
- Evaluation techniques: eyeballing → systematic benchmark
- **GSM8K benchmark** --- đánh giá math reasoning
- **LLM-as-a-Judge** --- dùng LLM mạnh đánh giá LLM yếu
- **ELO ranking system** --- human evaluation methodology

**Part 2: Systematic Evaluation with NeMo**
- **NeMo Evaluator** microservice cho robust evaluation workflow
- Custom dataset preparation cho **legal domain QA**
- So sánh **zero-shot vs. few-shot (ICL)**
- Metrics: **BLEU, F1-score, similarity scores**
- Multi-faceted LLM-as-a-judge: correctness, conciseness, readability
- **MLflow** experiment tracking

**Part 3: Light Customization with LoRA**
- **Parameter-Efficient Fine-Tuning (PEFT)** principles
- **Low-Rank Adaptation (LoRA)** --- fine-tune chỉ fraction of parameters:

$$W' = W + \Delta W = W + BA$$

Với $B \in \mathbb{R}^{d \times r}$, $A \in \mathbb{R}^{r \times k}$, và rank $r \ll \min(d, k)$

- **NeMo Customizer** microservice để launch LoRA fine-tuning
- Monitor training: loss curves, convergence analysis
- **Final assessment**: So sánh fine-tuned model vs. base model qua evaluation metrics

### Assessment

**Độ khó: 🔴🔴🔴⚪⚪ (3/5)**

- Khóa ngắn nhất (3h) nhưng assessment vẫn hands-on
- Phải chạy evaluation pipeline và fine-tuning job thực tế
- So sánh quantitative: base model vs. ICL vs. LoRA fine-tuned
- Đòi hỏi hiểu metric interpretation --- không chỉ chạy code mà phải **phân tích kết quả**

* * *

## 6. Các khóa bổ trợ trong GenAI Track

### Introduction to Transformer-Based NLP (S-FX-08)
- **6 giờ | $30 | Beginner**
- Nền tảng cho tất cả khóa LLM
- NLP tasks: text classification, NER, author attribution, QA
- **Khuyến nghị**: học trước khi bắt đầu bất kỳ khóa nào khác

### Generative AI Explained (S-FX-07)
- **2 giờ | Free | Beginner**
- Khóa no-code, overview concepts
- Tốt cho managers, non-technical roles
- **Không có assessment** --- chỉ completion

### Prompt Engineering with LLaMA-2 (S-FX-12)
- **3 giờ | $30 | Beginner**
- ⚠️ **Đã expired** (Dec 2025) --- có thể NVIDIA sẽ update version mới
- Prompt iteration, system messages, few-shot learning, chatbot behavior

### Building AI Agents with Multimodal Models (C-FX-17)
- **8 giờ | Instructor-Led**
- Focus multimodal agents --- kết hợp vision + language
- Khóa mới nhất trong catalog 2026

* * *

## 7. Bảng so sánh tổng quan tất cả khoá GenAI

| Khóa | Mã | Giờ | Giá | Độ khó Assessment | Prerequisites |
|------|-----|-----|-----|-------------------|---------------|
| **Generative AI Explained** | S-FX-07 | 2h | Free | Không có | Không |
| **Intro to Transformer NLP** | S-FX-08 | 6h | $30 | ⭐⭐ | Deep learning cơ bản |
| **Generative AI with Diffusion Models** | S-FX-14 | 8h | $90 | ⭐⭐⭐⭐⭐ | PyTorch + Deep Learning |
| **Building RAG Agents** | S-FX-15 | 8h | $90 | ⭐⭐⭐⭐ | Python OOP + DL basics |
| **Eval & Customization of LLMs** | S-FX-34 | 3h | $90 | ⭐⭐⭐ | Python + LLM basics |
| **Agentic AI Applications** | C-FX-25 | 8h | Workshop | ⭐⭐⭐⭐⭐ | DL + Python Intermediate |
| **AI Agents with Multimodal** | C-FX-17 | 8h | Workshop | ⭐⭐⭐⭐ | DL + Vision |

* * *

## 8. So sánh NVIDIA DLI với các certification khác

| Tiêu chí | NVIDIA DLI GenAI | AWS AI Practitioner | Azure AI-102 | Databricks GenAI |
|-----------|------------------|---------------------|-------------|-----------------|
| **Format thi** | Coding hands-on | 85 MCQ | 50 MCQ + case study | 45 MCQ |
| **Code thực tế** | ✅ Viết code trên GPU | ❌ | ❌ | ❌ Nhưng có scenario |
| **Thời gian thi** | 1-2h (assessment) | 120 phút | 100 phút | 120 phút |
| **Giá** | $30-$90 (course) | $150 | $165 | $200 |
| **GPU access** | ✅ Cloud GPU miễn phí | ❌ | ❌ | ❌ |
| **Depth** | 🔴 Rất sâu (code-level) | 🟡 Shallow (concepts) | 🟠 Medium (Azure services) | 🟠 Medium (RAG/eval) |
| **Vendor lock-in** | Thấp (PyTorch, chuẩn mở) | Cao (AWS only) | Cao (Azure only) | Trung bình (Databricks) |
| **Industry recognition** | ⭐⭐⭐⭐ (kỹ thuật) | ⭐⭐⭐⭐⭐ (phổ biến) | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Phù hợp cho** | ML Engineer, AI Researcher | SA, PM, Developer mọi level | Azure Developer | Data Engineer, ML Ops |

**Nhận xét:**
- **NVIDIA DLI** là chứng chỉ **kỹ thuật sâu nhất** --- bạn thực sự code deep learning models
- **AWS AI Practitioner** phổ biến nhất nhưng shallow --- chỉ concepts và AWS services
- **Databricks GenAI** nằm ở giữa --- có depth về RAG/eval nhưng vẫn MCQ
- Nếu bạn là **ML Engineer**: NVIDIA DLI → Databricks → AWS
- Nếu bạn là **Cloud Architect**: AWS → Azure → Databricks

* * *

## 9. Lộ trình chuẩn bị chi tiết

### Phase 1: Foundation (2 tuần)

**Mục tiêu:** Nắm vững deep learning fundamentals và PyTorch

<table>
<tr><th>Tuần</th><th>Hoạt động</th><th>Tài nguyên</th></tr>
<tr><td>1</td><td>Deep Learning basics: neural networks, backprop, CNN, RNN</td><td>DLI: Getting Started with Deep Learning (free)</td></tr>
<tr><td>1</td><td>PyTorch fundamentals: tensors, autograd, nn.Module</td><td>PyTorch Official Tutorials</td></tr>
<tr><td>2</td><td>Transformer architecture: attention mechanism, multi-head attention</td><td>DLI: Intro to Transformer NLP (S-FX-08, $30)</td></tr>
<tr><td>2</td><td>Hands-on: Fine-tune BERT cho text classification</td><td>HuggingFace Tutorials</td></tr>
</table>

### Phase 2: Generative AI Core (3 tuần)

**Mục tiêu:** Master diffusion models và LLM fundamentals

<table>
<tr><th>Tuần</th><th>Hoạt động</th><th>Tài nguyên</th></tr>
<tr><td>3</td><td>Diffusion theory: forward/reverse process, DDPM paper</td><td>Paper: "Denoising Diffusion Probabilistic Models" (Ho et al.)</td></tr>
<tr><td>3-4</td><td><strong>Khoá chính: Generative AI with Diffusion Models (S-FX-14, $90)</strong></td><td>NVIDIA DLI, 8 giờ</td></tr>
<tr><td>4</td><td>Ôn tập: U-Net code, noise scheduling, CLIP integration</td><td>Review lab notebooks</td></tr>
<tr><td>5</td><td>Bonus: Stable Diffusion internals, Latent Diffusion</td><td>Paper: "High-Resolution Image Synthesis with LDM"</td></tr>
</table>

### Phase 3: LLM Applications (3 tuần)

**Mục tiêu:** Build production-ready LLM systems

<table>
<tr><th>Tuần</th><th>Hoạt động</th><th>Tài nguyên</th></tr>
<tr><td>6</td><td>LangChain fundamentals, LCEL, prompt templates</td><td>LangChain docs + tutorials</td></tr>
<tr><td>6-7</td><td><strong>Khoá chính: Building RAG Agents (S-FX-15, $90)</strong></td><td>NVIDIA DLI, 8 giờ</td></tr>
<tr><td>7</td><td>Vector databases deep-dive: FAISS, Milvus, pgvector</td><td>Official docs</td></tr>
<tr><td>8</td><td><strong>Khoá chính: Eval & Customization of LLMs (S-FX-34, $90)</strong></td><td>NVIDIA DLI, 3 giờ</td></tr>
<tr><td>8</td><td>LoRA fine-tuning practice: custom dataset</td><td>HuggingFace PEFT library</td></tr>
</table>

### Phase 4: Advanced & Agent (2 tuần)

**Mục tiêu:** Agent architecture và multi-agent systems

<table>
<tr><th>Tuần</th><th>Hoạt động</th><th>Tài nguyên</th></tr>
<tr><td>9</td><td>LangGraph deep-dive: state machines, conditional edges</td><td>LangGraph tutorials</td></tr>
<tr><td>9</td><td>Multi-agent patterns: specialization, delegation, aggregation</td><td>Research papers + blog posts</td></tr>
<tr><td>10</td><td><strong>Khoá chính: Agentic AI Applications (C-FX-25)</strong></td><td>NVIDIA DLI Instructor-Led, 8 giờ</td></tr>
</table>

### Tổng chi phí ước tính

| Hạng mục | Chi phí |
|------------|---------|
| Generative AI Explained (free) | $0 |
| Intro to Transformer NLP | $30 |
| Generative AI with Diffusion Models | $90 |
| Building RAG Agents | $90 |
| Eval & Customization of LLMs | $90 |
| Agentic AI Applications (workshop) | ~$500-1,000 |
| **Tổng (self-paced only)** | **$300** |
| **Tổng (bao gồm workshop)** | **$800-1,300** |

> **Tip tiết kiệm:** Đăng ký webinar NVIDIA Certification (April 30, 2026) để nhận **discount code 50%**.

* * *

## 10. 20 câu hỏi mẫu assessment (Mock Exam)

Dưới đây là các câu hỏi mô phỏng sát format assessment thực tế của NVIDIA DLI:

### Diffusion Models (S-FX-14)

**Q1.** Cho code skeleton dưới đây, implement `forward_diffusion()`:

```python
def forward_diffusion(x_0, t, noise_schedule):
    """
    Args:
        x_0: clean image tensor (B, C, H, W)
        t: timestep tensor (B,)
        noise_schedule: dict with 'alpha_bar' tensor (T,)
    Returns:
        x_t: noisy image at timestep t
        noise: the noise added
    """
    # YOUR CODE HERE
    pass
```

<details>
<summary><strong>Đáp án</strong></summary>

```python
def forward_diffusion(x_0, t, noise_schedule):
    alpha_bar_t = noise_schedule['alpha_bar'][t]  # (B,)
    alpha_bar_t = alpha_bar_t[:, None, None, None]  # (B, 1, 1, 1)
    noise = torch.randn_like(x_0)
    x_t = torch.sqrt(alpha_bar_t) * x_0 + torch.sqrt(1 - alpha_bar_t) * noise
    return x_t, noise
```

**Giải thích:** Forward diffusion thêm noise theo công thức:
$$q(x_t | x_0) = \mathcal{N}(x_t; \sqrt{\bar{\alpha}_t} x_0, (1 - \bar{\alpha}_t) \mathbf{I})$$

</details>

---

**Q2.** Sinusoidal position embedding cho timestep có dạng gì? Implement class `TimestepEmbedding(nn.Module)` với output dimension = 128.

<details>
<summary><strong>Đáp án</strong></summary>

```python
class TimestepEmbedding(nn.Module):
    def __init__(self, dim=128):
        super().__init__()
        self.dim = dim

    def forward(self, t):
        half_dim = self.dim // 2
        emb = math.log(10000) / (half_dim - 1)
        emb = torch.exp(torch.arange(half_dim, device=t.device) * -emb)
        emb = t[:, None] * emb[None, :]
        emb = torch.cat([torch.sin(emb), torch.cos(emb)], dim=-1)
        return emb  # (B, dim)
```

</details>

---

**Q3.** Classifier-Free Guidance scale $w = 7.5$. Unconditional prediction = $\epsilon_u$, conditional prediction = $\epsilon_c$. Viết code tính guided prediction.

<details>
<summary><strong>Đáp án</strong></summary>

```python
guided_pred = epsilon_u + 7.5 * (epsilon_c - epsilon_u)
```

</details>

---

**Q4.** Group Normalization khác Batch Normalization ở điểm nào? Tại sao diffusion models ưu tiên Group Norm?

<details>
<summary><strong>Đáp án</strong></summary>

- **BatchNorm** normalize theo batch dimension → phụ thuộc batch size, unstable khi batch nhỏ
- **GroupNorm** normalize theo groups of channels trong mỗi sample → **independent of batch size**
- Diffusion models thường train với **small batch size** (vì image lớn, GPU memory hạn chế) → GroupNorm stable hơn

</details>

---

**Q5.** Debug: Model cho ra ảnh toàn đen sau khi reverse diffusion. Code dưới đây có lỗi gì?

```python
for t in range(T, 0, -1):
    pred_noise = model(x_t, t)
    alpha_t = noise_schedule['alpha'][t]
    alpha_bar_t = noise_schedule['alpha_bar'][t]
    x_t = (x_t - pred_noise) / torch.sqrt(alpha_t)  # BUG
```

<details>
<summary><strong>Đáp án</strong></summary>

Lỗi: Formula reverse diffusion sai. Đúng phải là:

```python
x_t = (1 / torch.sqrt(alpha_t)) * (
    x_t - (1 - alpha_t) / torch.sqrt(1 - alpha_bar_t) * pred_noise
)
if t > 1:
    x_t += torch.sqrt(noise_schedule['beta'][t]) * torch.randn_like(x_t)
```

Thiếu (1) coefficient đúng trước noise, (2) posterior variance term cho t > 1.

</details>

---

### RAG Agents (S-FX-15)

**Q6.** Implement semantic similarity search với cosine similarity. Cho `query_embedding` (1, 768) và `doc_embeddings` (N, 768), return top-5 indices.

<details>
<summary><strong>Đáp án</strong></summary>

```python
import torch.nn.functional as F

similarities = F.cosine_similarity(
    query_embedding, doc_embeddings, dim=1
)
top_5_indices = similarities.argsort(descending=True)[:5]
```

</details>

---

**Q7.** Chunking strategy: Document dài 10,000 tokens. Chunk size = 512, overlap = 128. Tính số chunks.

<details>
<summary><strong>Đáp án</strong></summary>

$$\text{chunks} = \lceil \frac{10000 - 512}{512 - 128} \rceil + 1 = \lceil \frac{9488}{384} \rceil + 1 = 25 + 1 = 26$$

</details>

---

**Q8.** Viết LangChain LCEL pipeline: prompt template → LLM → output parser, cho task summarization.

<details>
<summary><strong>Đáp án</strong></summary>

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

prompt = ChatPromptTemplate.from_template(
    "Summarize the following text in 3 bullet points:\n{text}"
)
chain = prompt | llm | StrOutputParser()
result = chain.invoke({"text": document_text})
```

</details>

---

**Q9.** Implement input guardrail: reject queries có cosine similarity < 0.3 so với topic embeddings.

<details>
<summary><strong>Đáp án</strong></summary>

```python
def guardrail_check(query_emb, topic_embs, threshold=0.3):
    max_sim = F.cosine_similarity(
        query_emb.unsqueeze(0), topic_embs, dim=1
    ).max().item()
    if max_sim < threshold:
        return False, "Sorry, this question is outside my scope."
    return True, None
```

</details>

---

**Q10.** RAG evaluation: Precision@5 = 0.6, Recall@5 = 0.3. Giải thích ý nghĩa và đề xuất cải thiện.

<details>
<summary><strong>Đáp án</strong></summary>

- **Precision@5 = 0.6**: 3/5 documents retrieved là relevant → retrieval khá tốt
- **Recall@5 = 0.3**: Chỉ tìm được 30% total relevant docs → **recall thấp**
- **Cải thiện**:
  1. Tăng top-k lên 10-20 (trade precision cho recall)
  2. Cải thiện chunking --- chunk nhỏ hơn để match chính xác hơn
  3. Hybrid search: BM25 + semantic retrieval
  4. Re-ranking layer sau initial retrieval

</details>

---

### LLM Evaluation & Customization (S-FX-34)

**Q11.** LoRA rank r = 16, model dimension d = 4096, k = 4096. Tính % parameters được fine-tune so với full fine-tuning.

<details>
<summary><strong>Đáp án</strong></summary>

$$\text{Full FT params} = d \times k = 4096 \times 4096 = 16,777,216$$
$$\text{LoRA params} = d \times r + r \times k = 4096 \times 16 + 16 \times 4096 = 131,072$$
$$\text{Ratio} = \frac{131,072}{16,777,216} = 0.78\%$$

LoRA chỉ fine-tune **<1% parameters** nhưng đạt performance gần full fine-tuning.

</details>

---

**Q12.** BLEU score = 0.15, F1 = 0.72. Model đang có vấn đề gì?

<details>
<summary><strong>Đáp án</strong></summary>

- **BLEU thấp (0.15)**: Model generate text **khác wording** so với reference --- không nhất thiết là sai
- **F1 cao (0.72)**: Nội dung (key information) phần lớn đúng
- **Chẩn đoán**: Model paraphrase tốt nhưng không match exact phrasing → BLEU là poor metric cho QA tasks
- **Hành động**: Dùng **semantic similarity** hoặc **LLM-as-a-judge** thay BLEU cho evaluation chính xác hơn

</details>

---

**Q13.** So sánh zero-shot, few-shot (ICL), và LoRA fine-tuning cho task legal QA:

<details>
<summary><strong>Đáp án</strong></summary>

| Approach | Accuracy | Latency | Cost | Khi nào dùng |
|----------|----------|---------|------|-------------|
| **Zero-shot** | Thấp nhất | Nhanh nhất | $0 | Quick prototype, generic tasks |
| **Few-shot (ICL)** | Trung bình | Chậm hơn (context dài) | Token cost tăng | Khi có <50 examples, cần deploy nhanh |
| **LoRA fine-tuning** | Cao nhất | Nhanh (adapter nhỏ) | Training cost | Khi có >1000 examples, cần max accuracy |

</details>

---

### Agentic AI (C-FX-25)

**Q14.** Implement structured output: LLM phải return JSON với schema `{"action": str, "params": dict, "confidence": float}`.

<details>
<summary><strong>Đáp án</strong></summary>

```python
from pydantic import BaseModel, Field

class AgentAction(BaseModel):
    action: str = Field(description="Action to execute")
    params: dict = Field(description="Action parameters")
    confidence: float = Field(ge=0, le=1, description="Confidence score")

structured_llm = llm.with_structured_output(AgentAction)
result = structured_llm.invoke("Search for papers about attention mechanism")
```

</details>

---

**Q15.** LangGraph: Implement conditional edge --- route đến `search_agent` nếu query cần research, route đến `answer_agent` nếu đã đủ context.

<details>
<summary><strong>Đáp án</strong></summary>

```python
from langgraph.graph import StateGraph, END

def router(state):
    if state["needs_research"]:
        return "search_agent"
    return "answer_agent"

graph = StateGraph(AgentState)
graph.add_node("classifier", classify_query)
graph.add_node("search_agent", do_research)
graph.add_node("answer_agent", generate_answer)

graph.add_conditional_edges("classifier", router, {
    "search_agent": "search_agent",
    "answer_agent": "answer_agent"
})
graph.add_edge("search_agent", "answer_agent")
graph.add_edge("answer_agent", END)
```

</details>

---

### Câu hỏi tổng hợp (Cross-course)

**Q16.** Bạn cần build hệ thống generate product images từ description text. Liệt kê pipeline components và framework cho từng phần.

<details>
<summary><strong>Đáp án</strong></summary>

1. **Text Processing**: LangChain prompt template → extract key features
2. **Text Encoding**: CLIP Text Encoder → text embeddings (768-dim)
3. **Diffusion Generation**: U-Net conditioned on CLIP embeddings → reverse diffusion → image
4. **Post-processing**: PIL/OpenCV resize, quality enhancement
5. **Serving**: NVIDIA NIM hoặc TorchServe cho inference API

Pipeline: User input → LLM extract features → CLIP encode → Diffusion model → Generated image

</details>

---

**Q17.** Tại sao DDPM (Denoising Diffusion Probabilistic Model) cần 1000 steps cho inference nhưng Latent Diffusion chỉ cần 50?

<details>
<summary><strong>Đáp án</strong></summary>

- **DDPM**: Diffusion trong **pixel space** (256×256×3 = 196,608 dimensions) → cần nhiều steps để denoise
- **LDM**: Diffusion trong **latent space** (32×32×4 = 4,096 dimensions) → compressed 48x → ít steps hơn
- Thêm vào đó, LDM dùng **DDIM scheduler** (deterministic) thay DDPM (stochastic) → skip steps

</details>

---

**Q18.** QLoRA vs LoRA: Giải thích sự khác biệt và khi nào chọn QLoRA.

<details>
<summary><strong>Đáp án</strong></summary>

| | LoRA | QLoRA |
|---|----|----|
| Base model | FP16/BF16 | **4-bit quantized** (NF4) |
| Adapters | FP16 | FP16 (computed in BF16) |
| VRAM cho 7B model | ~14GB | **~6GB** |
| Performance | Baseline | ~99% of LoRA |

**Chọn QLoRA khi:** GPU VRAM hạn chế (ví dụ: single RTX 3090/4090), model lớn (>13B params).

</details>

---

**Q19.** Explain the "lost in the middle" problem trong RAG. Đề xuất 2 solutions.

<details>
<summary><strong>Đáp án</strong></summary>

**Problem:** LLMs tend to focus on **đầu và cuối** context window, bỏ qua thông tin ở **giữa** → retrieved documents đặt ở middle bị ignore.

**Solutions:**
1. **Reorder retrieved docs**: Đặt most relevant docs ở đầu VÀ cuối, less relevant ở giữa
2. **Summarize-then-answer**: Summarize mỗi retrieved doc thành 1-2 câu, ghép summaries thay vì full text → shorter context, ít bị lost

</details>

---

**Q20.** System design: Build RAG agent cho legal firm. 50,000 documents, 100 concurrent users, response < 3 seconds. Sketch architecture.

<details>
<summary><strong>Đáp án</strong></summary>

```
Users → Load Balancer → API Gateway
    → Input Guardrail (topic filter)
    → Query Router
        → Vector DB (Milvus, 50K docs, GPU-accelerated)
        → BM25 Index (Elasticsearch, keyword search)
    → Reciprocal Rank Fusion (merge results)
    → Re-ranker (cross-encoder, top-20 → top-5)
    → LLM (NVIDIA NIM, 8x H100, batched inference)
    → Output Guardrail (PII filter, citation check)
    → Response with sources
```

**Key decisions:**
- Milvus cho vector search (GPU-accelerated, <100ms at 50K scale)
- Hybrid search (semantic + keyword) cho legal domain accuracy
- Re-ranker để improve precision
- NVIDIA NIM cho optimized LLM inference (<2s)
- Output guardrails cho PII detection (legal compliance)

</details>

* * *

## 11. Kết luận

NVIDIA DLI Generative AI track là **lựa chọn tốt nhất cho kỹ sư muốn hands-on thực sự** với generative models. Không MCQ, không lý thuyết suông --- bạn phải viết code, debug models, và build systems.

**Nếu chỉ chọn 1 khóa:** Bắt đầu với **Building RAG Agents (S-FX-15)** --- ứng dụng thực tế nhất, industry demand cao nhất.

**Nếu muốn differentiate:** Thêm **Generative AI with Diffusion Models (S-FX-14)** --- khóa khó nhất, ít người có, chứng minh deep technical competency.

**Nếu muốn full stack GenAI engineer:** Hoàn thành cả 4 khóa self-paced + 1 instructor-led workshop.

### Tài nguyên bổ sung

- [NVIDIA DLI Course Catalog](https://www.nvidia.com/en-us/training/self-paced-courses/)
- [NVIDIA Certification Portal](https://www.nvidia.com/en-us/learn/certification/)
- [DLI Learning Paths PDF](https://nvdam.widen.net/s/brxsxxtskb/dli-learning-journey-2009000-r5-web)
- [NVIDIA Technical Blog: GenAI posts](https://developer.nvidia.com/blog/)
- Paper: [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239) (Ho et al., 2020)
- Paper: [LoRA: Low-Rank Adaptation of LLMs](https://arxiv.org/abs/2106.09685) (Hu et al., 2021)
- Paper: [Attention Is All You Need](https://arxiv.org/abs/1706.03762) (Vaswani et al., 2017)

> **Webinar sắp tới:** NVIDIA Certification 2026 --- April 30, 2026 --- đăng ký để nhận 50% discount code cho certification exams. [Register](https://www.nvidia.com/en-us/events/whats-new-with-nvidia-certification-2026/)
