---
id: 019c9619-nv01-7001-c001-nv0100000001
title: "NVIDIA DLI 考試準備 — Generative AI with Diffusion Models & LLMs"
slug: luyen-thi-nvidia-dli-generative-ai
description: >-
  NVIDIA DLI Generative AI課程的全面學習藍圖 — 從Diffusion Models、
  RAG Agents、Agentic AI到LLM評估與微調。10堂深入課程包含
  實作程式碼、編碼練習及貼近真實考試的模擬題目。

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
    title: "第1部分：深度學習基礎"
    description: PyTorch基礎、神經網路架構、Transformer基本概念
    sort_order: 1
    lessons:
      - id: 019c9619-nv01-p1-l01
        title: "第1課：PyTorch與神經網路基礎"
        slug: bai-1-pytorch-neural-network-fundamentals
        description: >-
          PyTorch張量、autograd、nn.Module。從零開始建構神經網路。
          訓練迴圈、損失函數、優化器。GPU加速基礎。
          CNN架構、池化、批次正規化。
        duration_minutes: 90
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-nv01-p1-l02
        title: "第2課：Transformer架構與Attention機制"
        slug: bai-2-transformer-architecture-attention
        description: >-
          Self-attention、Multi-head attention、位置編碼。
          編碼器-解碼器架構。BERT、GPT、T5模型家族。
          分詞：BPE、WordPiece、SentencePiece。
          NLP任務：分類、NER、QA、摘要。
        duration_minutes: 90
        is_free: true
        sort_order: 1
        video_url: null

  - id: section-02
    title: "第2部分：Diffusion Models生成式AI"
    description: U-Net、DDPM、噪聲排程、CLIP、文字到圖像管線
    sort_order: 2
    lessons:
      - id: 019c9619-nv01-p2-l03
        title: "第3課：U-Net架構與去噪基礎"
        slug: bai-3-unet-architecture-denoising
        description: >-
          帶跳躍連接的U-Net編碼器-解碼器。
          用PyTorch從零建構U-Net。訓練去噪器模型。
          Group Normalization、GELU啟動函數、Rearrange Pooling。
          時間步編碼用Sinusoidal Position Embeddings。
        duration_minutes: 90
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-nv01-p2-l04
        title: "第4課：DDPM — 正向與逆向擴散過程"
        slug: bai-4-ddpm-forward-reverse-diffusion
        description: >-
          正向擴散：馬可夫鏈、變異數排程、重參數化。
          逆向擴散：預測噪聲、逐步去噪。
          噪聲排程：線性、餘弦排程。
          訓練目標：簡化ELBO損失。
          Classifier-Free Diffusion Guidance（CFG）。
        duration_minutes: 90
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-nv01-p2-l05
        title: "第5課：CLIP與文字到圖像管線"
        slug: bai-5-clip-text-to-image-pipeline
        description: >-
          CLIP：Contrastive Language-Image Pretraining。
          文字編碼、圖像編碼、對比損失。
          Cross-attention：將文字嵌入注入U-Net。
          完整的文字到圖像管線。Latent Diffusion概述。
          考試準備：編碼練習與除錯挑戰。
        duration_minutes: 90
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-03
    title: "第3部分：LLM應用與RAG"
    description: LLM推論、RAG管線、嵌入、向量資料庫、護欄
    sort_order: 3
    lessons:
      - id: 019c9619-nv01-p3-l06
        title: "第6課：LLM推論管線設計"
        slug: bai-6-llm-inference-pipeline-design
        description: >-
          LLM推論參數：temperature、top_p、top_k、max_tokens。
          NVIDIA NIM（Inference Microservices）。
          LangChain Expression Language（LCEL）、提示模板。
          Gradio UI原型設計、LangServe部署。
          執行狀態的對話管理。
        duration_minutes: 90
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-nv01-p3-l07
        title: "第7課：RAG — 檢索增強生成"
        slug: bai-7-rag-retrieval-augmented-generation
        description: >-
          文件載入、分塊策略、元資料擷取。
          嵌入模型：語意相似度、餘弦距離。
          向量資料庫：FAISS、Milvus、pgvector。
          完整RAG管線：查詢→檢索→增強→生成。
          護欄：輸入/輸出過濾、主題偵測。
        duration_minutes: 90
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-nv01-p3-l08
        title: "第8課：RAG代理 — 建構與評估"
        slug: bai-8-rag-agent-build-evaluate
        description: >-
          建構回答研究論文問題的RAG代理。
          帶狀態管理的多輪對話。
          RAG評估指標：精確率、召回率、忠實度。
          LLM-as-a-Judge評估模式。
          考試準備：端到端RAG代理挑戰。
        duration_minutes: 90
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-04
    title: "第4部分：Agentic AI與LLM客製化"
    description: 多代理系統、LangGraph、LoRA微調、NeMo框架
    sort_order: 4
    lessons:
      - id: 019c9619-nv01-p4-l09
        title: "第9課：Agentic AI — 多代理系統"
        slug: bai-9-agentic-ai-multi-agent-systems
        description: >-
          代理抽象化：任務分解、結構化輸出。
          認知架構：ReAct、Plan-and-Execute、LATS。
          LangGraph：狀態機、條件邊、並行執行。
          多代理編排、工具介面、知識圖譜。
          最終評估：部署多代理研究系統。
        duration_minutes: 90
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-nv01-p4-l10
        title: "第10課：LLM評估與LoRA微調"
        slug: bai-10-llm-evaluation-lora-fine-tuning
        description: >-
          評估方法：基準測試（GSM8K）、LLM-as-a-Judge、ELO排名。
          NeMo Evaluator微服務、MLflow實驗追蹤。
          指標：BLEU、F1分數、語意相似度。
          LoRA與QLoRA微調：理論與實作。
          NeMo Customizer：啟動微調任務。
          考試策略、速查表與最終模擬考。
        duration_minutes: 90
        is_free: true
        sort_order: 1
        video_url: null

reviews: []
quizzes: []
---

## 簡介

**NVIDIA DLI Generative AI 考試準備**課程幫助您系統性地複習NVIDIA Deep Learning Institute的生成式AI/LLM完整課程 — 從**Diffusion Models**、**RAG Agents**、**Agentic AI**到**LLM評估與微調**。

### 與傳統認證考試的不同之處

NVIDIA DLI**不是選擇題考試** — 您需要在雲端GPU的Jupyter Notebook上**撰寫真實程式碼**。因此，本系列著重於**實作編碼**和**除錯練習**，而非理論性問題。

### 適合對象

- 希望取得生成式AI**深度技術認證**的ML工程師
- 懂Python且想要**精通PyTorch + LLM技術棧**的開發者
- 準備參加DLI課程考試的考生：**S-FX-14**（Diffusion）、**S-FX-15**（RAG）、**C-FX-25**（Agentic）、**S-FX-34**（Eval/Fine-tune）
