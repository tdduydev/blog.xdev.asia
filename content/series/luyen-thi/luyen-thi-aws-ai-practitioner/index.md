---
id: 019c9619-lt01-7001-c001-lt0100000001
title: "Luyện thi AWS Certified AI Practitioner (AIF-C01)"
slug: luyen-thi-aws-ai-practitioner
description: >-
  Lộ trình ôn tập toàn diện cho kỳ thi AWS Certified AI Practitioner (AIF-C01).
  Bao phủ đầy đủ 5 domain: AI/ML Fundamentals, Generative AI, Foundation Models,
  Responsible AI, Security & Governance. 12 bài học chuyên sâu kèm thi thử tiếng Anh.

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
    title: "Domain 1: Fundamentals of AI and ML (20%)"
    description: Khái niệm AI, ML, Deep Learning, ML lifecycle, data types, use cases
    sort_order: 1
    lessons:
      - id: 019c9619-lt01-d1-l01
        title: "Bài 1: AI, ML & Deep Learning — Concepts and Terminology"
        slug: bai-1-ai-ml-deep-learning-concepts
        description: >-
          AI vs ML vs DL. Supervised, Unsupervised, Reinforcement Learning.
          Classification, Regression, Clustering. Neural Networks basics.
          Training, Validation, Test sets. Bias-Variance tradeoff.
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt01-d1-l02
        title: "Bài 2: ML Development Lifecycle & AWS AI Services Overview"
        slug: bai-2-ml-lifecycle-aws-services
        description: >-
          ML pipeline: data collection → feature engineering → training → evaluation → deployment.
          AWS AI/ML service stack. SageMaker, Rekognition, Comprehend, Polly,
          Transcribe, Translate, Textract, Lex, Personalize, Forecast, Kendra.
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null

  - id: section-02
    title: "Domain 2: Fundamentals of Generative AI (24%)"
    description: GenAI concepts, Foundation Models, LLMs, Transformer architecture
    sort_order: 2
    lessons:
      - id: 019c9619-lt01-d2-l03
        title: "Bài 3: Generative AI & Foundation Models"
        slug: bai-3-generative-ai-foundation-models
        description: >-
          Generative AI là gì. Foundation Models: pre-training, fine-tuning.
          Types: text-to-text, text-to-image, text-to-code. Tokenization.
          Model parameters, inference, temperature, top-p, top-k.
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt01-d2-l04
        title: "Bài 4: LLMs, Transformers & Multi-modal Models"
        slug: bai-4-llm-transformers-multimodal
        description: >-
          Transformer architecture: attention mechanism, self-attention.
          GPT (decoder-only), BERT (encoder-only), T5 (encoder-decoder).
          Multi-modal models. Hallucination: causes and mitigation.
          Embeddings và vector representations.
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null

  - id: section-03
    title: "Domain 3: Applications of Foundation Models (28%)"
    description: Prompt engineering, RAG, fine-tuning, Amazon Bedrock
    sort_order: 3
    lessons:
      - id: 019c9619-lt01-d3-l05
        title: "Bài 5: Prompt Engineering Techniques"
        slug: bai-5-prompt-engineering
        description: >-
          Zero-shot, Few-shot, Chain-of-Thought prompting.
          System prompts, role-based prompting. Prompt templates.
          Best practices: clarity, specificity, constraints.
          Common pitfalls và cách tối ưu.
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt01-d3-l06
        title: "Bài 6: RAG — Retrieval-Augmented Generation"
        slug: bai-6-rag-retrieval-augmented-generation
        description: >-
          RAG architecture: indexing, retrieval, generation.
          Vector databases, embeddings, similarity search.
          Amazon Bedrock Knowledge Bases. Chunking strategies.
          RAG vs Fine-tuning: khi nào dùng gì.
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt01-d3-l07
        title: "Bài 7: Fine-tuning & Model Customization"
        slug: bai-7-fine-tuning-model-customization
        description: >-
          Pre-training vs Fine-tuning vs Prompt Engineering.
          Continued pre-training, instruction tuning.
          PEFT: LoRA, QLoRA. Training data preparation.
          Amazon Bedrock Custom Models, SageMaker JumpStart.
        duration_minutes: 60
        is_free: true
        sort_order: 2
        video_url: null
      - id: 019c9619-lt01-d3-l08
        title: "Bài 8: Amazon Bedrock — Complete Deep Dive"
        slug: bai-8-amazon-bedrock-deep-dive
        description: >-
          Bedrock architecture, supported models (Claude, Llama, Titan, Mistral).
          Bedrock Agents, Guardrails, Knowledge Bases, Model Evaluation.
          PlayGrounds. Bedrock API & SDKs. Pricing models.
          PartyRock for prototyping.
        duration_minutes: 75
        is_free: true
        sort_order: 3
        video_url: null

  - id: section-04
    title: "Domain 4: Guidelines for Responsible AI (14%)"
    description: Fairness, transparency, explainability, responsible AI practices
    sort_order: 4
    lessons:
      - id: 019c9619-lt01-d4-l09
        title: "Bài 9: Responsible AI — Fairness, Bias & Transparency"
        slug: bai-9-responsible-ai-fairness-bias
        description: >-
          AWS Responsible AI principles. Types of bias: selection, measurement,
          algorithmic bias. Fairness metrics. Model explainability: SHAP, LIME.
          SageMaker Clarify. AWS AI Service Cards.
        duration_minutes: 50
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt01-d4-l10
        title: "Bài 10: Human-in-the-Loop & AI Governance"
        slug: bai-10-human-in-the-loop-governance
        description: >-
          Human review workflows. Amazon Augmented AI (A2I).
          Model monitoring và drift detection. Guardrails for Bedrock.
          Content filtering, toxicity detection. Watermarking.
        duration_minutes: 50
        is_free: true
        sort_order: 1
        video_url: null

  - id: section-05
    title: "Domain 5: Security, Compliance & Governance (14%)"
    description: AI security, data privacy, compliance, exam strategy
    sort_order: 5
    lessons:
      - id: 019c9619-lt01-d5-l11
        title: "Bài 11: AI Security & Data Privacy on AWS"
        slug: bai-11-ai-security-data-privacy
        description: >-
          IAM for AI services. Data encryption (KMS, at-rest, in-transit).
          VPC configuration cho SageMaker. Data privacy: PII detection,
          Amazon Macie. Compliance frameworks: GDPR, HIPAA, SOC.
          Shared responsibility model for AI.
        duration_minutes: 50
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt01-d5-l12
        title: "Bài 12: Exam Strategy, Cheat Sheet & Mock Exam Guide"
        slug: bai-12-exam-strategy-cheat-sheet
        description: >-
          AIF-C01 exam format: 65 questions, 90 minutes, 700/1000.
          Domain weight strategy. Elimination techniques.
          Complete cheat sheet: services mapping, key concepts.
          Hướng dẫn thi thử và đánh giá kết quả.
        duration_minutes: 45
        is_free: true
        sort_order: 1
        video_url: null

reviews: []
quizzes: []
---

## Giới thiệu

Khoá học **Luyện thi AWS Certified AI Practitioner (AIF-C01)** giúp bạn ôn tập có hệ thống, bao phủ đầy đủ 5 domain của kỳ thi — từ nền tảng AI/ML đến GenAI, Amazon Bedrock, Responsible AI và Security.

### Ai nên học?

- Developer, DevOps, Solution Architect muốn chứng chỉ AI
- Business Analyst, Product Manager muốn hiểu AI trên AWS
- Người mới bắt đầu với AI, muốn có foundation vững chắc
- Ai đã có kiến thức AI cơ bản, muốn validate bằng chứng chỉ AWS

### Cấu trúc đề thi AIF-C01

| Domain | Tỷ trọng | Số bài học |
|--------|----------|------------|
| Domain 1: Fundamentals of AI and ML | 20% | Bài 1–2 |
| Domain 2: Fundamentals of Generative AI | 24% | Bài 3–4 |
| Domain 3: Applications of Foundation Models | 28% | Bài 5–8 |
| Domain 4: Guidelines for Responsible AI | 14% | Bài 9–10 |
| Domain 5: Security, Compliance & Governance | 14% | Bài 11–12 |

- **Số câu**: 65 câu (scored) + 15 câu (unscored) = 80 câu tổng cộng
- **Thời gian**: 90 phút
- **Điểm đạt**: 700/1000
- **Phí thi**: $100 USD
- **Ngôn ngữ thi**: Tiếng Anh (và nhiều ngôn ngữ khác)
- **Hình thức**: Pearson VUE testing center hoặc online proctored

### Lộ trình học

1. **Học lý thuyết** qua 12 bài trong series này
2. **Thi thử** với đề trắc nghiệm tiếng Anh mô phỏng
3. **Ôn lại** domain yếu, thi lại cho đến khi đạt ≥80%
4. **Đăng ký thi** khi tự tin — [aws.amazon.com/certification](https://aws.amazon.com/certification/certified-ai-practitioner/)
