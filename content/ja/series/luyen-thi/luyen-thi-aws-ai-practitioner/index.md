---
id: 019c9619-lt01-7001-c001-lt0100000001
title: "AWS認定AIプラクティショナー（AIF-C01）試験対策"
slug: luyen-thi-aws-ai-practitioner
description: >-
  AWS認定AIプラクティショナー（AIF-C01）試験の包括的な学習ガイド。
  全5ドメインをカバー：AI/ML基礎、生成AI、基盤モデル、
  責任あるAI、セキュリティとガバナンス。12の詳細レッスンと日本語模擬試験付き。

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
    title: "ドメイン1：AIとMLの基礎（20%）"
    description: AI、ML、ディープラーニングの概念、MLライフサイクル、データ型、ユースケース
    sort_order: 1
    lessons:
      - id: 019c9619-lt01-d1-l01
        title: "レッスン1：AI、ML、ディープラーニング — 概念と用語"
        slug: bai-1-ai-ml-deep-learning-concepts
        description: >-
          AI vs ML vs DL。教師あり・教師なし・強化学習。
          分類、回帰、クラスタリング。ニューラルネットワークの基礎。
          訓練・検証・テストセット。バイアス-バリアンスのトレードオフ。
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt01-d1-l02
        title: "レッスン2：ML開発ライフサイクルとAWS AIサービス概要"
        slug: bai-2-ml-lifecycle-aws-services
        description: >-
          MLパイプライン：データ収集→特徴量エンジニアリング→訓練→評価→デプロイ。
          AWS AI/MLサービススタック。SageMaker、Rekognition、Comprehend、Polly、
          Transcribe、Translate、Textract、Lex、Personalize、Forecast、Kendra。
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null

  - id: section-02
    title: "ドメイン2：生成AIの基礎（24%）"
    description: 生成AIの概念、基盤モデル、LLM、Transformerアーキテクチャ
    sort_order: 2
    lessons:
      - id: 019c9619-lt01-d2-l03
        title: "レッスン3：生成AIと基盤モデル"
        slug: bai-3-generative-ai-foundation-models
        description: >-
          生成AIとは何か。基盤モデル：事前学習、ファインチューニング。
          種類：テキスト→テキスト、テキスト→画像、テキスト→コード。トークン化。
          モデルパラメータ、推論、Temperature、Top-p、Top-k。
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt01-d2-l04
        title: "レッスン4：LLM、Transformer、マルチモーダルモデル"
        slug: bai-4-llm-transformers-multimodal
        description: >-
          Transformerアーキテクチャ：Attention機構、Self-Attention。
          GPT（デコーダのみ）、BERT（エンコーダのみ）、T5（エンコーダ-デコーダ）。
          マルチモーダルモデル。ハルシネーション：原因と対策。
          エンベディングとベクトル表現。
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null

  - id: section-03
    title: "ドメイン3：基盤モデルの応用（28%）"
    description: プロンプトエンジニアリング、RAG、ファインチューニング、Amazon Bedrock
    sort_order: 3
    lessons:
      - id: 019c9619-lt01-d3-l05
        title: "レッスン5：プロンプトエンジニアリングテクニック"
        slug: bai-5-prompt-engineering-techniques
        description: >-
          Zero-shot、Few-shot、Chain-of-Thought。
          プロンプトテンプレート。システムプロンプト vs ユーザープロンプト。
          Amazon Bedrock Playground。PartyRock。
        duration_minutes: 55
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt01-d3-l06
        title: "レッスン6：RAG、ベクトルDB、ナレッジベース"
        slug: bai-6-rag-vector-databases-knowledge-bases
        description: >-
          検索拡張生成（RAG）アーキテクチャ。ベクトルデータベース。
          Amazon Bedrock Knowledge Bases。エンベディング。
          チャンキング戦略。セマンティック検索。
        duration_minutes: 55
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt01-d3-l07
        title: "レッスン7：ファインチューニングとモデルカスタマイズ"
        slug: bai-7-fine-tuning-model-customization
        description: >-
          ファインチューニング vs RAG vs プロンプトエンジニアリング。
          Bedrockカスタムモデル。SageMaker JumpStart。
          LoRA/QLoRA。継続的事前学習。
        duration_minutes: 50
        is_free: true
        sort_order: 2
        video_url: null
      - id: 019c9619-lt01-d3-l08
        title: "レッスン8：Amazon Bedrock完全ガイド"
        slug: bai-8-amazon-bedrock-deep-dive
        description: >-
          Amazon Bedrockの全体像。モデルプロバイダー。
          Bedrock Agents。Amazon Q Developer & Q Business。
          GenAIアプリケーション設計パターン。
        duration_minutes: 60
        is_free: true
        sort_order: 3
        video_url: null

  - id: section-04
    title: "ドメイン4：責任あるAIのガイドライン（14%）"
    description: 公平性、バイアス検出、説明可能性、透明性、AWS Responsible AIツール
    sort_order: 4
    lessons:
      - id: 019c9619-lt01-d4-l09
        title: "レッスン9：責任あるAI — 公平性、バイアス、透明性"
        slug: bai-9-responsible-ai-fairness-bias-transparency
        description: >-
          責任あるAIの原則。バイアスの種類（データ、アルゴリズム、社会的）。
          公平性指標、モデルの説明可能性（SHAP、LIME）。
          AWS AIサービスカード、AIにおける透明性。
        duration_minutes: 55
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt01-d4-l10
        title: "レッスン10：AWS責任あるAIツール — Clarify、A2I、Guardrails"
        slug: bai-10-aws-responsible-ai-tools
        description: >-
          Amazon SageMaker Clarify（バイアス検出、説明可能性）。
          Amazon Augmented AI（A2I）— Human-in-the-loop。
          Amazon Bedrock Guardrailsの詳細。コンテンツモデレーション。
        duration_minutes: 50
        is_free: true
        sort_order: 1
        video_url: null

  - id: section-05
    title: "ドメイン5：AIのセキュリティ、コンプライアンス、ガバナンス（14%）"
    description: IAM、暗号化、VPCエンドポイント、PII検出、コンプライアンスプログラム
    sort_order: 5
    lessons:
      - id: 019c9619-lt01-d5-l11
        title: "レッスン11：AIセキュリティ、データプライバシー、コンプライアンス"
        slug: bai-11-ai-security-data-privacy-compliance
        description: >-
          AI/MLワークロード向けIAM。保存時・転送時の暗号化。
          Bedrock/SageMaker向けVPCエンドポイント。PII検出。
          AWSコンプライアンスプログラム。AIのデータガバナンス。
        duration_minutes: 55
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt01-d5-l12
        title: "レッスン12：試験戦略と完全チートシート"
        slug: bai-12-exam-strategy-cheat-sheet
        description: >-
          AWS AIプラクティショナー試験戦略。時間管理。
          全5ドメインの完全チートシート。
          主要サービスマッピング。よくある試験の罠。
        duration_minutes: 45
        is_free: true
        sort_order: 1
        video_url: null
---
