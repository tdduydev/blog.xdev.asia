---
id: 05e72d3d-f5d2-4304-8fe1-c29fe5ac8ec6
title: 'NVIDIA DLI Generative AI: Complete Certificates, Courses, Assessments, and Detailed Learning Path'
slug: nvidia-dli-generative-ai-certificate-learning-path
excerpt: A detailed guide to the complete NVIDIA DLI ecosystem for Generative AI and LLMs — from Diffusion Models, RAG Agents, and Agentic AI to Transformer NLP. Analysis of exam content, assessment difficulty, sample questions, exam tips, and a learning roadmap from beginner to professional.
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
locale: en
comments: []
---

If you're looking for a **hands-on AI certification** rather than pure theory, the NVIDIA Deep Learning Institute (DLI) is the top choice. Unlike AWS or Azure that focus on their own cloud platforms, NVIDIA DLI teaches you **hands-on coding directly on GPUs** — from building a U-Net diffusion model from scratch to deploying a production-grade RAG agent.

This article goes deep into the **complete Generative AI course and certification system** at NVIDIA DLI: each course's content, assessment format, difficulty, sample questions, and a detailed preparation roadmap.

* * *

## 1. NVIDIA DLI System Overview

NVIDIA DLI is **not a traditional certification exam** like AWS or Azure. Instead, NVIDIA has **2 distinct credential types**:

### DLI Course Certificates (Completion-based)

- Complete a self-paced or instructor-led course
- Must **pass the end-of-course assessment** (hands-on coding, not MCQ)
- Receive certificate via email, verifiable on NVIDIA
- Price: **$30–$90/course** (self-paced) or workshop fee (instructor-led)
- **No expiration date**

### NVIDIA Professional Certifications (Exam-based)

- Proctored exam via Pearson VUE
- Multiple-choice + scenario-based format
- Price: **$125 (Associate)** or **$400 (Professional)**
- Duration: **1–2 hours**
- Validity: **2 years**, then must retest
- Current certifications: **NCA-AIIO** (Associate), **NCP-AII**, **NCP-AIO**, **NCP-AIN** (Professional)

> **Important note:** As of April 2026, NVIDIA does **not yet have a Professional Certification specifically for Generative AI/LLM**. Current professional certifications focus on **AI Infrastructure, Operations, and Networking**. However, DLI Course Certificates for GenAI/LLM are widely recognized in the industry and their assessments are **significantly harder** than typical MCQs.

* * *

## 2. Generative AI with Diffusion Models — Hardest Course

<table>
<tr><td><strong>Course Code</strong></td><td>DLI+S-FX-14+V1</td></tr>
<tr><td><strong>Duration</strong></td><td>8 hours</td></tr>
<tr><td><strong>Price</strong></td><td>$90</td></tr>
<tr><td><strong>Level</strong></td><td>Technical - Intermediate</td></tr>
<tr><td><strong>Language</strong></td><td>English</td></tr>
<tr><td><strong>Framework</strong></td><td>PyTorch, CLIP</td></tr>
<tr><td><strong>Certificate</strong></td><td>Yes (after passing assessment)</td></tr>
</table>

### Detailed Module Content

**Module 1: From U-Net to Diffusion**
- Build **U-Net architecture from scratch** using PyTorch
- Train a model to remove noise from images
- Understand encoder-decoder architecture with skip connections
- Hands-on: Write forward pass, loss function, training loop

**Module 2: Diffusion Models**
- Implement **forward diffusion function** — gradually add noise to an image
- Update U-Net architecture to accommodate **timestep embeddings**
- Implement **reverse diffusion function** — denoise an image from pure noise
- Math: Markov chains, variance schedule ($\beta_t$), reparameterization trick

**Module 3: Optimizations**
- Implement **Group Normalization** instead of Batch Norm (more stable for small batches)
- Implement **GELU activation** (Gaussian Error Linear Unit)
- Implement **Rearrange Pooling** for spatial downsampling
- Implement **Sinusoidal Position Embeddings** for timestep encoding:

$$PE(t, 2i) = \sin\left(\frac{t}{10000^{2i/d}}\right)$$
$$PE(t, 2i+1) = \cos\left(\frac{t}{10000^{2i/d}}\right)$$

**Module 4: Classifier-Free Diffusion Guidance**
- Add **categorical embeddings** to U-Net
- Train model with **Bernoulli masking** — randomly drop conditions
- Implement **CFG scale** ($w$) for inference:

$$\hat{\epsilon}_\theta(x_t, c) = \epsilon_\theta(x_t, \varnothing) + w \cdot (\epsilon_\theta(x_t, c) - \epsilon_\theta(x_t, \varnothing))$$

- Understand the trade-off between diversity vs. fidelity

**Module 5: CLIP (Contrastive Language-Image Pretraining)**
- Use **CLIP Encodings** to map text → embedding space
- Combine CLIP with U-Net to create a **text-to-image pipeline**
- Implement cross-attention between text embeddings and image features
- Hands-on: Generate images from English text prompts

### Assessment

**Format:** Coding assessment directly in a Jupyter Notebook on cloud GPU

**Requirements:**
1. **Modify U-Net architecture** to support a new condition (not copy-paste from the lab)
2. **Implement a custom diffusion pipeline** combining multiple learned techniques
3. **Debug a model** when output is incorrect — find bugs in the noise schedule or architecture
4. Code must **run successfully** and output must **meet the quality threshold**

**Passing score:** Assessment is auto-graded; code must compile + output must match expected behavior

**Difficulty: 🔴🔴🔴🔴🔴 (5/5)**

This is the **hardest course** in the entire GenAI track because:
- No multiple-choice — you must **write code from scratch**
- Requires deep understanding of **diffusion math**: variance schedule, ELBO, score matching
- Must know **PyTorch fluently**: custom modules, autograd, tensor operations
- Time-limited — you can't Google every line of code

### Sample Questions and Formats

> **Type 1: Implement Component**
> Given skeleton code, implement the `SinusoidalPositionEmbeddings` class with a timestep tensor as input and an embedding tensor of size `(batch_size, dim)` as output.

> **Type 2: Debug**
> A diffusion model outputs pure noise after training. Find the bug in the `reverse_diffusion()` function below. (Hint: check the variance schedule)

> **Type 3: Extend Architecture**
> Add classifier-free guidance to an already-trained model. Implement function `guided_sampling(model, prompt, cfg_scale)` such that:
> - When `cfg_scale=0`: output matches the unconditional model
> - When `cfg_scale=7.5`: output matches the prompt

> **Type 4: Integration**
> Combine a CLIP encoder with a diffusion model. Write the full pipeline from text input → generated image, including:
> - Text encoding via CLIP
> - Cross-attention injection into U-Net
> - Reverse diffusion loop with DDPM scheduler

### Exam Tips

1. **Do the labs thoroughly, don't just run cells** — understand every line of code, especially tensor shapes
2. **Memorize the math formulas**: $q(x_t | x_{t-1})$, $p_\theta(x_{t-1} | x_t)$, noise scheduling
3. **Practice PyTorch fundamentals**: `nn.Module`, `forward()`, `torch.randn()`, einops
4. **Don't panic if the model outputs noise** — debug systematically: check shapes → check loss → check scheduling
5. **Time management**: Spend 60% of time on labs, 40% on the assessment

* * *

## 3. Building RAG Agents with LLMs — Most Popular Course

<table>
<tr><td><strong>Course Code</strong></td><td>DLI+S-FX-15+V1</td></tr>
<tr><td><strong>Duration</strong></td><td>8 hours</td></tr>
<tr><td><strong>Price</strong></td><td>$90</td></tr>
<tr><td><strong>Level</strong></td><td>Technical - Intermediate</td></tr>
<tr><td><strong>Framework</strong></td><td>LangChain, Gradio, LangServe</td></tr>
<tr><td><strong>Certificate</strong></td><td>Yes</td></tr>
</table>

### Detailed Module Content

**Module 1: LLM Inference Interfaces & Microservices**
- Setup environment to connect with NVIDIA NIM (Inference Microservices)
- Query LLM via API: prompt formatting, token management
- Understand inference parameters: temperature, top_p, max_tokens, stop sequences

**Module 2: Pipeline Design with LangChain, Gradio, LangServe**
- Build LLM pipeline with **LangChain Expression Language (LCEL)**
- Rapidly create UI prototypes with **Gradio**
- Deploy pipeline to production via **LangServe** (FastAPI-based)
- Chain multiple components: prompt template → LLM → output parser

**Module 3: Dialog Management with Running States**
- Implement **conversation memory** — maintain context across multiple turns
- Build **state machines** for dialog flow
- Extract structured information from free-text conversations
- Coerce LLM output into **Pydantic models** (structured output)

**Module 4: Working with Documents**
- Load, split, and parse documents (PDF, markdown, code files)
- Implement **chunking strategies**: recursive character, semantic, sentence
- Metadata extraction and document preprocessing

**Module 5: Embeddings for Semantic Similarity & Guardrailing**
- Use embedding models for **semantic search**
- Implement **cosine similarity** for retrieval ranking
- Build **guardrails** using embedding distance — detect off-topic queries
- Hands-on: Input/output guardrailing system

**Module 6: Vector Stores for RAG Agents**
- Set up a vector database (FAISS/Milvus)
- Implement full **RAG pipeline**: query → retrieve → augment → generate
- Evaluate RAG quality: relevance, faithfulness, answer correctness
- Build an agent capable of answering questions about research papers

### Assessment

**Format:** Coding-based — build and deploy a complete RAG agent

**Requirements:**
1. Implement a RAG pipeline that can answer questions from an **unseen dataset**
2. Agent must handle **multi-turn conversation** — remember context
3. Implement **guardrailing** — reject off-topic queries
4. Code must run end-to-end; agent responses must be **relevant and accurate**

**Difficulty: 🔴🔴🔴🔴⚪ (4/5)**

**Easier than Diffusion Models** because:
- More abstraction layers (LangChain, Gradio) — less low-level coding
- No heavy math required
- But still difficult because you must **integrate multiple components** into a complete system

### Sample Questions

> **Type 1: Pipeline Construction**
> Given a dataset of PDF papers, build a RAG pipeline such that:
> - Chunk size = 512, overlap = 128
> - Embedding model: `NV-Embed-QA`
> - Top-k retrieval: 5
> - Output: answer + source citations

> **Type 2: Guardrailing**
> Implement an input guardrail so that queries unrelated to the dataset are rejected with the message "I can only answer questions about AI research papers."

> **Type 3: State Management**
> Modify the agent to support follow-up questions. User asks "What is attention?" → agent responds. User follows up "Who invented it?" → agent must understand "it" = attention mechanism.

### Exam Tips

1. **Read LangChain docs thoroughly beforehand** — especially LCEL syntax
2. **Understand embedding dimensions** — dimension mismatch is the most common error
3. **Test the pipeline step by step**: retrieval first, then add generation
4. **Chunk size matters** — too small loses context, too large adds noise

* * *

## 4. Building Agentic AI Applications with LLMs — Most Advanced Course

<table>
<tr><td><strong>Course Code</strong></td><td>DLI+C-FX-25+V1</td></tr>
<tr><td><strong>Duration</strong></td><td>8 hours</td></tr>
<tr><td><strong>Price</strong></td><td>Instructor-Led (contact NVIDIA)</td></tr>
<tr><td><strong>Level</strong></td><td>Technical - Intermediate</td></tr>
<tr><td><strong>Framework</strong></td><td>LangGraph, NVIDIA NIM, LangChain</td></tr>
<tr><td><strong>Certificate</strong></td><td>Yes</td></tr>
</table>

### Detailed Content

**Section 1: Fundamentals of Agent Abstraction and LLMs**
- LLM capabilities vs. pitfalls (hallucination, context limits, reasoning failures)
- Agents as **task decomposition abstractions**
- Minimal agent demo: free-text LLM → structured action → execution

**Section 2: Structured Output & Basic Fulfillment**
- Bottleneck LLM output into **JSON/task-based schema**
- Domain alignment & stable schema enforcement
- Introduction to **cognitive architectures** (ReAct, Plan-and-Execute, LATS)

**Section 3: Retrieval Mechanisms & Environmental Tooling**
- Formalize **environment access strategies** for agents
- Build tool interfaces for DBs, APIs, external repos
- Vector-based RAG for semantic document retrieval
- **Knowledge graphs** for structured domain knowledge

**Section 4: Multi-Agent Systems & Frameworks**
- Task decomposition among **specialized agents**
- Communication buffers and process distribution schemes
- LangGraph: state machines for complex agent workflows
- Differentiate frameworks: LangGraph vs CrewAI vs AutoGen

**Section 5: Final Assessment**
- Deploy an agent system that schedules multiple retrieval operations
- Gather research from multiple sources → synthesize → return to user
- **Optional module**: Real-time agents — multimodal, robotics, audio systems, world models

### Assessment

**Difficulty: 🔴🔴🔴🔴🔴 (5/5)**

Must deploy a **complete multi-agent system** capable of:
- Receiving a complex query from a user
- Decomposing it into sub-tasks
- Routing to specialized agents
- Aggregating results
- Returning a coherent response

This is a **system-level** assessment — not just writing a single function but **architecting the entire pipeline**.

* * *

## 5. Evaluation and Light Customization of LLMs — Newest Course

<table>
<tr><td><strong>Course Code</strong></td><td>DLI+S-FX-34+V1</td></tr>
<tr><td><strong>Duration</strong></td><td>3 hours</td></tr>
<tr><td><strong>Price</strong></td><td>$90</td></tr>
<tr><td><strong>Level</strong></td><td>Intermediate</td></tr>
<tr><td><strong>Framework</strong></td><td>NVIDIA NeMo, NIM, MLflow, Docker</td></tr>
<tr><td><strong>Certificate</strong></td><td>Yes</td></tr>
</table>

### Detailed Content

**Part 1: Fundamentals of LLM Evaluation**
- Query a deployed NVIDIA NIM
- Evaluation techniques: eyeballing → systematic benchmark
- **GSM8K benchmark** — evaluate math reasoning
- **LLM-as-a-Judge** — use a stronger LLM to evaluate a weaker LLM
- **ELO ranking system** — human evaluation methodology

**Part 2: Systematic Evaluation with NeMo**
- **NeMo Evaluator** microservice for robust evaluation workflows
- Custom dataset preparation for **legal domain QA**
- Compare **zero-shot vs. few-shot (ICL)**
- Metrics: **BLEU, F1-score, similarity scores**
- Multi-faceted LLM-as-a-judge: correctness, conciseness, readability
- **MLflow** experiment tracking

**Part 3: Light Customization with LoRA**
- **Parameter-Efficient Fine-Tuning (PEFT)** principles
- **Low-Rank Adaptation (LoRA)** — fine-tune only a fraction of parameters:

$$W' = W + \Delta W = W + BA$$

Where $B \in \mathbb{R}^{d \times r}$, $A \in \mathbb{R}^{r \times k}$, and rank $r \ll \min(d, k)$

- **NeMo Customizer** microservice to launch LoRA fine-tuning
- Monitor training: loss curves, convergence analysis
- **Final assessment**: Compare fine-tuned model vs. base model via evaluation metrics

### Assessment

**Difficulty: 🔴🔴🔴⚪⚪ (3/5)**

- Shortest course (3h) but assessment is still hands-on
- Must run an actual evaluation pipeline and fine-tuning job
- Compare quantitatively: base model vs. ICL vs. LoRA fine-tuned
- Requires understanding metric interpretation — not just running code but **analyzing results**

* * *

## 6. Supplementary Courses in the GenAI Track

### Introduction to Transformer-Based NLP (S-FX-08)
- **6 hours | $30 | Beginner**
- Foundation for all LLM courses
- NLP tasks: text classification, NER, author attribution, QA
- **Recommended**: take before starting any other course

### Generative AI Explained (S-FX-07)
- **2 hours | Free | Beginner**
- No-code course, concept overview
- Good for managers and non-technical roles
- **No assessment** — completion only

### Prompt Engineering with LLaMA-2 (S-FX-12)
- **3 hours | $30 | Beginner**
- ⚠️ **Expired** (Dec 2025) — NVIDIA may release an updated version
- Prompt iteration, system messages, few-shot learning, chatbot behavior

### Building AI Agents with Multimodal Models (C-FX-17)
- **8 hours | Instructor-Led**
- Focus on multimodal agents — combining vision + language
- Newest course in the 2026 catalog

* * *

## 7. Complete GenAI Course Comparison Table

| Course | Code | Hours | Price | Assessment Difficulty | Prerequisites |
|--------|------|-------|-------|----------------------|---------------|
| **Generative AI Explained** | S-FX-07 | 2h | Free | None | None |
| **Intro to Transformer NLP** | S-FX-08 | 6h | $30 | ⭐⭐ | Basic deep learning |
| **Generative AI with Diffusion Models** | S-FX-14 | 8h | $90 | ⭐⭐⭐⭐⭐ | PyTorch + Deep Learning |
| **Building RAG Agents** | S-FX-15 | 8h | $90 | ⭐⭐⭐⭐ | Python OOP + DL basics |
| **Eval & Customization of LLMs** | S-FX-34 | 3h | $90 | ⭐⭐⭐ | Python + LLM basics |
| **Agentic AI Applications** | C-FX-25 | 8h | Workshop | ⭐⭐⭐⭐⭐ | DL + Python Intermediate |
| **AI Agents with Multimodal** | C-FX-17 | 8h | Workshop | ⭐⭐⭐⭐ | DL + Vision |

* * *

## 8. Comparing NVIDIA DLI with Other Certifications

| Criterion | NVIDIA DLI GenAI | AWS AI Practitioner | Azure AI-102 | Databricks GenAI |
|-----------|-----------------|---------------------|-------------|-----------------|
| **Exam format** | Hands-on coding | 85 MCQ | 50 MCQ + case study | 45 MCQ |
| **Actual coding** | ✅ Write code on GPU | ❌ | ❌ | ❌ But has scenarios |
| **Exam duration** | 1–2h (assessment) | 120 minutes | 100 minutes | 120 minutes |
| **Price** | $30–$90 (course) | $150 | $165 | $200 |
| **GPU access** | ✅ Free cloud GPU | ❌ | ❌ | ❌ |
| **Depth** | 🔴 Very deep (code-level) | 🟡 Shallow (concepts) | 🟠 Medium (Azure services) | 🟠 Medium (RAG/eval) |
| **Vendor lock-in** | Low (PyTorch, open standard) | High (AWS only) | High (Azure only) | Medium (Databricks) |
| **Industry recognition** | ⭐⭐⭐⭐ (technical) | ⭐⭐⭐⭐⭐ (popular) | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Best suited for** | ML Engineer, AI Researcher | SA, PM, Developer any level | Azure Developer | Data Engineer, MLOps |

**Notes:**
- **NVIDIA DLI** is the **most technically deep** certification — you actually code deep learning models
- **AWS AI Practitioner** is the most popular but shallow — only covers concepts and AWS services
- **Databricks GenAI** falls in between — has depth on RAG/eval but still MCQ
- If you're an **ML Engineer**: NVIDIA DLI → Databricks → AWS
- If you're a **Cloud Architect**: AWS → Azure → Databricks

* * *

## 9. Detailed Preparation Roadmap

### Phase 1: Foundation (2 weeks)

**Goal:** Master deep learning fundamentals and PyTorch

<table>
<tr><th>Week</th><th>Activity</th><th>Resources</th></tr>
<tr><td>1</td><td>Deep Learning basics: neural networks, backprop, CNN, RNN</td><td>DLI: Getting Started with Deep Learning (free)</td></tr>
<tr><td>1</td><td>PyTorch fundamentals: tensors, autograd, nn.Module</td><td>PyTorch Official Tutorials</td></tr>
<tr><td>2</td><td>Transformer architecture: attention mechanism, multi-head attention</td><td>DLI: Intro to Transformer NLP (S-FX-08, $30)</td></tr>
<tr><td>2</td><td>Hands-on: Fine-tune BERT for text classification</td><td>HuggingFace Tutorials</td></tr>
</table>

### Phase 2: Generative AI Core (3 weeks)

**Goal:** Master diffusion models and LLM fundamentals

<table>
<tr><th>Week</th><th>Activity</th><th>Resources</th></tr>
<tr><td>3</td><td>Diffusion theory: forward/reverse process, DDPM paper</td><td>Paper: "Denoising Diffusion Probabilistic Models" (Ho et al.)</td></tr>
<tr><td>3–4</td><td><strong>Main course: Generative AI with Diffusion Models (S-FX-14, $90)</strong></td><td>NVIDIA DLI, 8 hours</td></tr>
<tr><td>4</td><td>Review: U-Net code, noise scheduling, CLIP integration</td><td>Review lab notebooks</td></tr>
<tr><td>5</td><td>Bonus: Stable Diffusion internals, Latent Diffusion</td><td>Paper: "High-Resolution Image Synthesis with LDM"</td></tr>
</table>

### Phase 3: LLM Applications (3 weeks)

**Goal:** Build production-ready LLM systems

<table>
<tr><th>Week</th><th>Activity</th><th>Resources</th></tr>
<tr><td>6</td><td>LangChain fundamentals, LCEL, prompt templates</td><td>LangChain docs + tutorials</td></tr>
<tr><td>6–7</td><td><strong>Main course: Building RAG Agents (S-FX-15, $90)</strong></td><td>NVIDIA DLI, 8 hours</td></tr>
<tr><td>7</td><td>Vector databases deep-dive: FAISS, Milvus, pgvector</td><td>Official docs</td></tr>
<tr><td>8</td><td><strong>Main course: Eval & Customization of LLMs (S-FX-34, $90)</strong></td><td>NVIDIA DLI, 3 hours</td></tr>
<tr><td>8</td><td>LoRA fine-tuning practice: custom dataset</td><td>HuggingFace PEFT library</td></tr>
</table>

### Phase 4: Advanced & Agent (2 weeks)

**Goal:** Agent architecture and multi-agent systems

<table>
<tr><th>Week</th><th>Activity</th><th>Resources</th></tr>
<tr><td>9</td><td>LangGraph deep-dive: state machines, conditional edges</td><td>LangGraph tutorials</td></tr>
<tr><td>9</td><td>Multi-agent patterns: specialization, delegation, aggregation</td><td>Research papers + blog posts</td></tr>
<tr><td>10</td><td><strong>Main course: Agentic AI Applications (C-FX-25)</strong></td><td>NVIDIA DLI Instructor-Led, 8 hours</td></tr>
</table>

### Estimated Total Cost

| Item | Cost |
|------|------|
| Generative AI Explained (free) | $0 |
| Intro to Transformer NLP | $30 |
| Generative AI with Diffusion Models | $90 |
| Building RAG Agents | $90 |
| Eval & Customization of LLMs | $90 |
| Agentic AI Applications (workshop) | ~$500–1,000 |
| **Total (self-paced only)** | **$300** |
| **Total (including workshop)** | **$800–1,300** |

> **Saving tip:** Register for the NVIDIA Certification webinar (April 30, 2026) to receive a **50% discount code**.

* * *

## 10. 20 Sample Assessment Questions (Mock Exam)

Here are questions simulating the actual NVIDIA DLI assessment format:

### Diffusion Models (S-FX-14)

**Q1.** Given the skeleton code below, implement `forward_diffusion()`:

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
<summary><strong>Answer</strong></summary>

```python
def forward_diffusion(x_0, t, noise_schedule):
    alpha_bar_t = noise_schedule['alpha_bar'][t]  # (B,)
    alpha_bar_t = alpha_bar_t[:, None, None, None]  # (B, 1, 1, 1)
    noise = torch.randn_like(x_0)
    x_t = torch.sqrt(alpha_bar_t) * x_0 + torch.sqrt(1 - alpha_bar_t) * noise
    return x_t, noise
```

**Explanation:** Forward diffusion adds noise according to the formula:
$$q(x_t | x_0) = \mathcal{N}(x_t; \sqrt{\bar{\alpha}_t} x_0, (1 - \bar{\alpha}_t) \mathbf{I})$$

</details>

---

**Q2.** What is the form of sinusoidal position embedding for a timestep? Implement the class `TimestepEmbedding(nn.Module)` with output dimension = 128.

<details>
<summary><strong>Answer</strong></summary>

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

**Q3.** Classifier-Free Guidance scale $w = 7.5$. Unconditional prediction = $\epsilon_u$, conditional prediction = $\epsilon_c$. Write code to compute the guided prediction.

<details>
<summary><strong>Answer</strong></summary>

```python
guided_pred = epsilon_u + 7.5 * (epsilon_c - epsilon_u)
```

</details>

---

**Q4.** How does Group Normalization differ from Batch Normalization? Why do diffusion models prefer Group Norm?

<details>
<summary><strong>Answer</strong></summary>

- **BatchNorm** normalizes along the batch dimension → depends on batch size, unstable when batch is small
- **GroupNorm** normalizes along groups of channels within each sample → **independent of batch size**
- Diffusion models typically train with **small batch sizes** (large images consume GPU memory) → GroupNorm is more stable

</details>

---

**Q5.** Debug: Model outputs all-black images after reverse diffusion. What's wrong in the code below?

```python
for t in range(T, 0, -1):
    pred_noise = model(x_t, t)
    alpha_t = noise_schedule['alpha'][t]
    alpha_bar_t = noise_schedule['alpha_bar'][t]
    x_t = (x_t - pred_noise) / torch.sqrt(alpha_t)  # BUG
```

<details>
<summary><strong>Answer</strong></summary>

Bug: The reverse diffusion formula is wrong. The correct version is:

```python
x_t = (1 / torch.sqrt(alpha_t)) * (
    x_t - (1 - alpha_t) / torch.sqrt(1 - alpha_bar_t) * pred_noise
)
if t > 1:
    x_t += torch.sqrt(noise_schedule['beta'][t]) * torch.randn_like(x_t)
```

Missing: (1) the correct coefficient before the noise, (2) the posterior variance term for t > 1.

</details>

---

### RAG Agents (S-FX-15)

**Q6.** Implement semantic similarity search with cosine similarity. Given `query_embedding` (1, 768) and `doc_embeddings` (N, 768), return the top-5 indices.

<details>
<summary><strong>Answer</strong></summary>

```python
import torch.nn.functional as F

similarities = F.cosine_similarity(
    query_embedding, doc_embeddings, dim=1
)
top_5_indices = similarities.argsort(descending=True)[:5]
```

</details>

---

**Q7.** Chunking strategy: A document is 10,000 tokens long. Chunk size = 512, overlap = 128. Calculate the number of chunks.

<details>
<summary><strong>Answer</strong></summary>

$$\text{chunks} = \lceil \frac{10000 - 512}{512 - 128} \rceil + 1 = \lceil \frac{9488}{384} \rceil + 1 = 25 + 1 = 26$$

</details>

---

**Q8.** Write a LangChain LCEL pipeline: prompt template → LLM → output parser, for a summarization task.

<details>
<summary><strong>Answer</strong></summary>

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

**Q9.** Implement an input guardrail: reject queries with cosine similarity < 0.3 compared to topic embeddings.

<details>
<summary><strong>Answer</strong></summary>

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

**Q10.** RAG evaluation: Precision@5 = 0.6, Recall@5 = 0.3. Explain the meaning and suggest improvements.

<details>
<summary><strong>Answer</strong></summary>

- **Precision@5 = 0.6**: 3/5 retrieved documents are relevant → retrieval is fairly good
- **Recall@5 = 0.3**: Only 30% of total relevant docs found → **recall is low**
- **Improvements**:
  1. Increase top-k to 10–20 (trade precision for recall)
  2. Improve chunking — smaller chunks for more precise matching
  3. Hybrid search: BM25 + semantic retrieval
  4. Add a re-ranking layer after initial retrieval

</details>

---

### LLM Evaluation & Customization (S-FX-34)

**Q11.** LoRA rank r = 16, model dimension d = 4096, k = 4096. Calculate the % of parameters fine-tuned vs. full fine-tuning.

<details>
<summary><strong>Answer</strong></summary>

$$\text{Full FT params} = d \times k = 4096 \times 4096 = 16,777,216$$
$$\text{LoRA params} = d \times r + r \times k = 4096 \times 16 + 16 \times 4096 = 131,072$$
$$\text{Ratio} = \frac{131,072}{16,777,216} = 0.78\%$$

LoRA fine-tunes only **<1% of parameters** while achieving near-full fine-tuning performance.

</details>

---

**Q12.** BLEU score = 0.15, F1 = 0.72. What problem does the model have?

<details>
<summary><strong>Answer</strong></summary>

- **Low BLEU (0.15)**: Model generates text **with different wording** from the reference — not necessarily wrong
- **High F1 (0.72)**: The content (key information) is mostly correct
- **Diagnosis**: Model paraphrases well but doesn't match exact phrasing → BLEU is a poor metric for QA tasks
- **Action**: Use **semantic similarity** or **LLM-as-a-judge** instead of BLEU for more accurate evaluation

</details>

---

**Q13.** Compare zero-shot, few-shot (ICL), and LoRA fine-tuning for a legal QA task:

<details>
<summary><strong>Answer</strong></summary>

| Approach | Accuracy | Latency | Cost | When to use |
|----------|----------|---------|------|-------------|
| **Zero-shot** | Lowest | Fastest | $0 | Quick prototype, generic tasks |
| **Few-shot (ICL)** | Medium | Slower (longer context) | Higher token cost | <50 examples, need fast deployment |
| **LoRA fine-tuning** | Highest | Fast (small adapter) | Training cost | >1000 examples, need max accuracy |

</details>

---

### Agentic AI (C-FX-25)

**Q14.** Implement structured output: LLM must return JSON with schema `{"action": str, "params": dict, "confidence": float}`.

<details>
<summary><strong>Answer</strong></summary>

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

**Q15.** LangGraph: Implement a conditional edge — route to `search_agent` if the query needs research, route to `answer_agent` if context is sufficient.

<details>
<summary><strong>Answer</strong></summary>

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

### Cross-Course Questions

**Q16.** You need to build a system that generates product images from text descriptions. List the pipeline components and frameworks for each part.

<details>
<summary><strong>Answer</strong></summary>

1. **Text Processing**: LangChain prompt template → extract key features
2. **Text Encoding**: CLIP Text Encoder → text embeddings (768-dim)
3. **Diffusion Generation**: U-Net conditioned on CLIP embeddings → reverse diffusion → image
4. **Post-processing**: PIL/OpenCV resize, quality enhancement
5. **Serving**: NVIDIA NIM or TorchServe for inference API

Pipeline: User input → LLM extract features → CLIP encode → Diffusion model → Generated image

</details>

---

**Q17.** Why does DDPM (Denoising Diffusion Probabilistic Model) need 1000 steps for inference but Latent Diffusion only needs 50?

<details>
<summary><strong>Answer</strong></summary>

- **DDPM**: Diffusion in **pixel space** (256×256×3 = 196,608 dimensions) → needs many steps to denoise
- **LDM**: Diffusion in **latent space** (32×32×4 = 4,096 dimensions) → compressed 48x → fewer steps needed
- Additionally, LDM uses the **DDIM scheduler** (deterministic) instead of DDPM (stochastic) → can skip steps

</details>

---

**Q18.** QLoRA vs LoRA: Explain the difference and when to choose QLoRA.

<details>
<summary><strong>Answer</strong></summary>

| | LoRA | QLoRA |
|---|----|----|
| Base model | FP16/BF16 | **4-bit quantized** (NF4) |
| Adapters | FP16 | FP16 (computed in BF16) |
| VRAM for 7B model | ~14GB | **~6GB** |
| Performance | Baseline | ~99% of LoRA |

**Choose QLoRA when:** GPU VRAM is limited (e.g., single RTX 3090/4090), or model is large (>13B params).

</details>

---

**Q19.** Explain the "lost in the middle" problem in RAG. Suggest 2 solutions.

<details>
<summary><strong>Answer</strong></summary>

**Problem:** LLMs tend to focus on the **beginning and end** of the context window, ignoring information in the **middle** → retrieved documents placed in the middle get ignored.

**Solutions:**
1. **Reorder retrieved docs**: Place the most relevant docs at the beginning AND end, less relevant in the middle
2. **Summarize-then-answer**: Summarize each retrieved doc into 1–2 sentences, concatenate the summaries instead of full text → shorter context, less lost information

</details>

---

**Q20.** System design: Build a RAG agent for a law firm. 50,000 documents, 100 concurrent users, response < 3 seconds. Sketch the architecture.

<details>
<summary><strong>Answer</strong></summary>

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
- Milvus for vector search (GPU-accelerated, <100ms at 50K scale)
- Hybrid search (semantic + keyword) for legal domain accuracy
- Re-ranker to improve precision
- NVIDIA NIM for optimized LLM inference (<2s)
- Output guardrails for PII detection (legal compliance)

</details>

* * *

## 11. Conclusion

The NVIDIA DLI Generative AI track is the **best choice for engineers who want truly hands-on experience** with generative models. No MCQs, no empty theory — you must write code, debug models, and build systems.

**If you can only choose 1 course:** Start with **Building RAG Agents (S-FX-15)** — the most practical application, with the highest industry demand.

**If you want to differentiate yourself:** Add **Generative AI with Diffusion Models (S-FX-14)** — the hardest course, fewer people have it, proves deep technical competency.

**If you want to be a full-stack GenAI engineer:** Complete all 4 self-paced courses + 1 instructor-led workshop.

### Additional Resources

- [NVIDIA DLI Course Catalog](https://www.nvidia.com/en-us/training/self-paced-courses/)
- [NVIDIA Certification Portal](https://www.nvidia.com/en-us/learn/certification/)
- [DLI Learning Paths PDF](https://nvdam.widen.net/s/brxsxxtskb/dli-learning-journey-2009000-r5-web)
- [NVIDIA Technical Blog: GenAI posts](https://developer.nvidia.com/blog/)
- Paper: [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239) (Ho et al., 2020)
- Paper: [LoRA: Low-Rank Adaptation of LLMs](https://arxiv.org/abs/2106.09685) (Hu et al., 2021)
- Paper: [Attention Is All You Need](https://arxiv.org/abs/1706.03762) (Vaswani et al., 2017)

> **Upcoming webinar:** NVIDIA Certification 2026 — April 30, 2026 — register to receive a 50% discount code for certification exams. [Register](https://www.nvidia.com/en-us/events/whats-new-with-nvidia-certification-2026/)
