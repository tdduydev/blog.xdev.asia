---
id: 019c9619-lt01-7001-c001-lt0100000001
title: "AWS AI Practitioner（AIF-C01）認證備考"
slug: luyen-thi-aws-ai-practitioner
description: >-
  AWS Certified AI Practitioner（AIF-C01）考試的全面學習指南。
  涵蓋全部5個領域：AI/ML基礎、生成式AI、基礎模型、
  負責任AI、安全性與治理。12堂深入課程，附繁體中文練習題。

featured_image: images/blog/aws-ai-practitioner-series-banner.webp
level: beginner
duration_hours: 30
lesson_count: 12
price: '0.00'
is_free: true
view_count: 0
average_rating: '0.00'
review_count: 0
enrollment_count: 0
meta: null
published_at: '2026-04-04T10:00:00.000000Z'
created_at: '2026-04-04T10:00:00.000000Z'

author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg

category:
  id: 019c9616-cat9-7009-a009-000000000009
  name: Luyện thi chứng chỉ
  slug: luyen-thi

tags:
  - name: AWS
    slug: aws
  - name: AI
    slug: ai
  - name: Chứng chỉ
    slug: chung-chi
  - name: Amazon Bedrock
    slug: amazon-bedrock
  - name: SageMaker
    slug: sagemaker
  - name: Generative AI
    slug: generative-ai

quiz_slug: aws-ai-practitioner

sections:
  - id: section-01
    title: "領域1：AI與ML基礎（20%）"
    description: AI、ML、深度學習概念、ML生命週期、資料類型、使用案例
    sort_order: 1
    lessons:
      - id: 019c9619-lt01-d1-l01
        title: "第1課：AI、ML與深度學習 — 概念與術語"
        slug: bai-1-ai-ml-deep-learning-concepts
        description: >-
          AI vs ML vs DL。監督式、非監督式、強化學習。
          分類、迴歸、聚類。神經網路基礎。
          訓練集、驗證集、測試集。偏差-方差權衡。
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt01-d1-l02
        title: "第2課：ML開發生命週期與AWS AI服務概覽"
        slug: bai-2-ml-lifecycle-aws-services
        description: >-
          ML管線：資料收集 → 特徵工程 → 訓練 → 評估 → 部署。
          AWS AI/ML服務堆疊。SageMaker、Rekognition、Comprehend、Polly、
          Transcribe、Translate、Textract、Lex、Personalize、Forecast、Kendra。
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null

  - id: section-02
    title: "領域2：生成式AI基礎（24%）"
    description: GenAI概念、基礎模型、LLM、Transformer架構
    sort_order: 2
    lessons:
      - id: 019c9619-lt01-d2-l03
        title: "第3課：生成式AI與基礎模型"
        slug: bai-3-generative-ai-foundation-models
        description: >-
          什麼是生成式AI。基礎模型：預訓練、微調。
          類型：文字轉文字、文字轉圖像、文字轉程式碼。分詞。
          模型參數、推論、temperature、top-p、top-k。
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt01-d2-l04
        title: "第4課：LLM、Transformer與多模態模型"
        slug: bai-4-llm-transformers-multimodal
        description: >-
          Transformer架構：注意力機制、自注意力。
          GPT（僅解碼器）、BERT（僅編碼器）、T5（編碼器-解碼器）。
          多模態模型。幻覺：原因與緩解。
          嵌入向量與向量表示。
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null

  - id: section-03
    title: "領域3：基礎模型的應用（28%）"
    description: 提示工程、RAG、微調、Amazon Bedrock
    sort_order: 3
    lessons:
      - id: 019c9619-lt01-d3-l05
        title: "第5課：提示工程技巧"
        slug: bai-5-prompt-engineering
        description: >-
          零樣本、少樣本、思維鏈提示。
          系統提示、角色提示。提示範本。
          最佳實踐：清晰度、具體性、約束條件。
          常見陷阱與優化技巧。
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt01-d3-l06
        title: "第6課：RAG — 檢索增強生成"
        slug: bai-6-rag-retrieval-augmented-generation
        description: >-
          RAG架構：索引、檢索、生成。
          向量資料庫、嵌入向量、相似度搜尋。
          Amazon Bedrock Knowledge Bases。分塊策略。
          RAG vs 微調：何時使用哪種方法。
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt01-d3-l07
        title: "第7課：微調與模型客製化"
        slug: bai-7-fine-tuning-model-customization
        description: >-
          預訓練 vs 微調 vs 提示工程。
          持續預訓練、指令微調。
          PEFT：LoRA、QLoRA。訓練資料準備。
          Amazon Bedrock自訂模型、SageMaker JumpStart。
        duration_minutes: 60
        is_free: true
        sort_order: 2
        video_url: null
      - id: 019c9619-lt01-d3-l08
        title: "第8課：Amazon Bedrock — 完整深入解析"
        slug: bai-8-amazon-bedrock-deep-dive
        description: >-
          Bedrock架構、支援模型（Claude、Llama、Titan、Mistral）。
          Bedrock Agents、Guardrails、Knowledge Bases、模型評估。
          PlayGrounds。Bedrock API與SDK。定價模式。
          PartyRock原型製作。
        duration_minutes: 75
        is_free: true
        sort_order: 3
        video_url: null

  - id: section-04
    title: "領域4：負責任AI準則（14%）"
    description: 公平性、透明性、可解釋性、負責任AI實踐
    sort_order: 4
    lessons:
      - id: 019c9619-lt01-d4-l09
        title: "第9課：負責任AI — 公平性、偏差與透明性"
        slug: bai-9-responsible-ai-fairness-bias
        description: >-
          AWS負責任AI原則。偏差類型：選擇偏差、測量偏差、
          演算法偏差。公平性指標。模型可解釋性：SHAP、LIME。
          SageMaker Clarify。AWS AI服務卡。
        duration_minutes: 50
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt01-d4-l10
        title: "第10課：人機協作與AI治理"
        slug: bai-10-human-in-the-loop-governance
        description: >-
          人工審查工作流程。Amazon Augmented AI（A2I）。
          模型監控與漂移偵測。Bedrock Guardrails。
          內容過濾、毒性偵測。浮水印。
        duration_minutes: 50
        is_free: true
        sort_order: 1
        video_url: null

  - id: section-05
    title: "領域5：AI安全性、合規與治理（14%）"
    description: AI安全、資料隱私、合規性、考試策略
    sort_order: 5
    lessons:
      - id: 019c9619-lt01-d5-l11
        title: "第11課：AI安全與AWS上的資料隱私"
        slug: bai-11-ai-security-data-privacy
        description: >-
          AI服務的IAM。資料加密（KMS、靜態、傳輸中）。
          SageMaker的VPC配置。資料隱私：PII偵測、
          Amazon Macie。合規框架：GDPR、HIPAA、SOC。
          AI的共同責任模式。
        duration_minutes: 50
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt01-d5-l12
        title: "第12課：考試策略、速查表與模擬考試指南"
        slug: bai-12-exam-strategy-cheat-sheet
        description: >-
          AIF-C01考試格式：65題、90分鐘、700/1000。
          領域權重策略。排除法技巧。
          完整速查表：服務對應、關鍵概念。
          模擬考試指南與成績評估。
        duration_minutes: 45
        is_free: true
        sort_order: 1
        video_url: null

reviews: []
quizzes: []
---

## 簡介

**AWS Certified AI Practitioner（AIF-C01）認證備考**課程幫助您系統化地學習，涵蓋考試的全部5個領域 — 從AI/ML基礎到GenAI、Amazon Bedrock、負責任AI與安全性。

### 適合對象

- 尋求AI認證的開發人員、DevOps工程師、解決方案架構師
- 想要了解AWS AI服務的雲端從業人員
- 對AI/ML概念有興趣的非技術專業人員
- 準備參加AIF-C01考試的任何人

### 您將學到什麼

- 理解AI、ML、深度學習的核心概念
- 掌握生成式AI和基礎模型的原理
- 學會使用Amazon Bedrock和AWS AI服務
- 了解負責任AI實踐和偏差緩解
- 掌握AI安全、隱私和合規要求
- 掌握考試策略和時間管理技巧

### 前置要求

- 不需要程式設計經驗
- 具備基本的AWS雲端知識有幫助但非必要
- 這是基礎級別考試 — 專注於概念而非實作
