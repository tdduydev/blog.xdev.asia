---
id: 019c9619-nv01-7001-c001-nv0100000001
title: "NVIDIA DLI Exam Prep — Generative AI with Diffusion Models & LLMs"
slug: luyen-thi-nvidia-dli-generative-ai
description: >-
  Comprehensive study roadmap for NVIDIA DLI Generative AI courses — from Diffusion Models,
  RAG Agents, Agentic AI to LLM Evaluation & Fine-tuning. 10 in-depth lessons with hands-on
  code, coding assessment practice, and sample questions closely matching the real exam.

featured_image: images/blog/nvidia-dli-genai-series-banner.webp
level: intermediate
duration_hours: 40
lesson_count: 10
price: '0.00'
is_free: true
view_count: 0
average_rating: '0.00'
review_count: 0
enrollment_count: 0
meta: null
published_at: '2026-04-13T14:00:00.000000Z'
created_at: '2026-04-13T14:00:00.000000Z'

author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg

category:
  id: 019c9616-cat9-7009-a009-000000000009
  name: Luyện thi chứng chỉ
  slug: luyen-thi

tags:
  - name: NVIDIA
    slug: nvidia
  - name: AI
    slug: ai
  - name: Deep Learning
    slug: deep-learning
  - name: LLM
    slug: llm
  - name: Diffusion Models
    slug: diffusion-models
  - name: RAG
    slug: rag
  - name: Chứng chỉ
    slug: chung-chi

quiz_slug: nvidia-dli-generative-ai

sections:
  - id: section-01
    title: "Part 1: Deep Learning Foundations"
    description: PyTorch fundamentals, neural network architectures, Transformer basics
    sort_order: 1
    lessons:
      - id: 019c9619-nv01-p1-l01
        title: "Lesson 1: PyTorch & Neural Network Fundamentals"
        slug: bai-1-pytorch-neural-network-fundamentals
        description: >-
          PyTorch tensors, autograd, nn.Module. Build neural network from scratch.
          Training loop, loss functions, optimizers. GPU acceleration basics.
          CNN architecture, pooling, batch normalization.
        duration_minutes: 90
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-nv01-p1-l02
        title: "Lesson 2: Transformer Architecture & Attention Mechanism"
        slug: bai-2-transformer-architecture-attention
        description: >-
          Self-attention, multi-head attention, positional encoding.
          Encoder-decoder architecture. BERT, GPT, T5 model families.
          Tokenization: BPE, WordPiece, SentencePiece.
          NLP tasks: classification, NER, QA, summarization.
        duration_minutes: 90
        is_free: true
        sort_order: 1
        video_url: null

  - id: section-02
    title: "Part 2: Generative AI with Diffusion Models"
    description: U-Net, DDPM, noise scheduling, CLIP, text-to-image pipeline
    sort_order: 2
    lessons:
      - id: 019c9619-nv01-p2-l03
        title: "Lesson 3: U-Net Architecture & Denoising Basics"
        slug: bai-3-unet-architecture-denoising
        description: >-
          U-Net encoder-decoder with skip connections.
          Build U-Net from scratch in PyTorch. Train denoiser model.
          Group Normalization, GELU activation, Rearrange Pooling.
          Sinusoidal Position Embeddings for timestep encoding.
        duration_minutes: 90
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-nv01-p2-l04
        title: "Lesson 4: DDPM — Forward & Reverse Diffusion"
        slug: bai-4-ddpm-forward-reverse-diffusion
        description: >-
          Forward diffusion: Markov chain, variance schedule, reparameterization.
          Reverse diffusion: predict noise, denoise step-by-step.
          Noise scheduling: linear, cosine schedules.
          Training objective: simplified ELBO loss.
          Classifier-Free Diffusion Guidance (CFG).
        duration_minutes: 90
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-nv01-p2-l05
        title: "Lesson 5: CLIP & Text-to-Image Pipeline"
        slug: bai-5-clip-text-to-image-pipeline
        description: >-
          CLIP: Contrastive Language-Image Pretraining.
          Text encoding, image encoding, contrastive loss.
          Cross-attention: inject text embeddings into U-Net.
          Full text-to-image pipeline. Latent Diffusion overview.
          Assessment prep: coding exercises & debug challenges.
        duration_minutes: 90
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-03
    title: "Part 3: LLM Applications & RAG"
    description: LLM inference, RAG pipeline, embeddings, vector stores, guardrails
    sort_order: 3
    lessons:
      - id: 019c9619-nv01-p3-l06
        title: "Lesson 6: LLM Inference & Pipeline Design"
        slug: bai-6-llm-inference-pipeline-design
        description: >-
          LLM inference parameters: temperature, top_p, top_k, max_tokens.
          NVIDIA NIM (Inference Microservices).
          LangChain Expression Language (LCEL), prompt templates.
          Gradio UI prototyping, LangServe deployment.
          Dialog management with running states.
        duration_minutes: 90
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-nv01-p3-l07
        title: "Lesson 7: RAG — Retrieval-Augmented Generation"
        slug: bai-7-rag-retrieval-augmented-generation
        description: >-
          Document loading, chunking strategies, metadata extraction.
          Embedding models: semantic similarity, cosine distance.
          Vector stores: FAISS, Milvus, pgvector.
          Full RAG pipeline: query → retrieve → augment → generate.
          Guardrailing: input/output filters, topic detection.
        duration_minutes: 90
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-nv01-p3-l08
        title: "Lesson 8: RAG Agent — Build & Evaluate"
        slug: bai-8-rag-agent-build-evaluate
        description: >-
          Build RAG agent that answers questions about research papers.
          Multi-turn conversation with state management.
          RAG evaluation metrics: precision, recall, faithfulness.
          LLM-as-a-judge evaluation pattern.
          Assessment prep: end-to-end RAG agent challenge.
        duration_minutes: 90
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-04
    title: "Part 4: Agentic AI & LLM Customization"
    description: Multi-agent systems, LangGraph, LoRA fine-tuning, NeMo framework
    sort_order: 4
    lessons:
      - id: 019c9619-nv01-p4-l09
        title: "Lesson 9: Agentic AI — Multi-Agent Systems"
        slug: bai-9-agentic-ai-multi-agent-systems
        description: >-
          Agent abstraction: task decomposition, structured output.
          Cognitive architectures: ReAct, Plan-and-Execute, LATS.
          LangGraph: state machines, conditional edges, parallel execution.
          Multi-agent orchestration, tool interfaces, knowledge graphs.
          Final assessment: deploy multi-agent research system.
        duration_minutes: 90
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-nv01-p4-l10
        title: "Lesson 10: LLM Evaluation & LoRA Fine-tuning"
        slug: bai-10-llm-evaluation-lora-fine-tuning
        description: >-
          Evaluation methods: benchmarks (GSM8K), LLM-as-a-judge, ELO ranking.
          NeMo Evaluator microservice, MLflow experiment tracking.
          Metrics: BLEU, F1-score, semantic similarity.
          LoRA & QLoRA fine-tuning: theory and practice.
          NeMo Customizer: launch fine-tuning jobs.
          Exam strategy, cheat sheet & final mock exam.
        duration_minutes: 90
        is_free: true
        sort_order: 1
        video_url: null

reviews: []
quizzes: []
---

## Introduction

The **NVIDIA DLI Generative AI Exam Prep** course helps you systematically review the entire Generative AI/LLM track from NVIDIA Deep Learning Institute — from **Diffusion Models**, **RAG Agents**, **Agentic AI** to **LLM Evaluation & Fine-tuning**.

### How it differs from traditional certifications

NVIDIA DLI is **not a MCQ exam** — you must **write real code** on a Jupyter Notebook with cloud GPU. This is why this series focuses on **hands-on coding** and **debug exercises** instead of theoretical questions.

### Who should take this course?

- ML Engineers seeking **deep technical certification** in Generative AI
- Developers who know Python and want to **master PyTorch + LLM stack**
- Candidates preparing for DLI courses: **S-FX-14** (Diffusion), **S-FX-15** (RAG), **C-FX-25** (Agentic), **S-FX-34** (Eval/Fine-tune)
