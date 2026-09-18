---
id: 019c9619-nv01-7001-c001-nv0100000001
title: "NVIDIA DLI 試験対策 — Generative AI with Diffusion Models & LLMs"
slug: luyen-thi-nvidia-dli-generative-ai
description: >-
  NVIDIA DLI Generative AIコースの包括的な学習ロードマップ — Diffusion Models、
  RAG Agents、Agentic AIからLLM評価・ファインチューニングまで。10の詳細なレッスンに
  ハンズオンコード、コーディング演習、実試験に近い模擬問題を収録。

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
    title: "パート1：ディープラーニングの基礎"
    description: PyTorchの基礎、ニューラルネットワークアーキテクチャ、Transformerの基本
    sort_order: 1
    lessons:
      - id: 019c9619-nv01-p1-l01
        title: "第1課：PyTorchとニューラルネットワークの基礎"
        slug: bai-1-pytorch-neural-network-fundamentals
        description: >-
          PyTorchテンソル、autograd、nn.Module。ニューラルネットワークをゼロから構築。
          トレーニングループ、損失関数、オプティマイザ。GPU高速化の基礎。
          CNNアーキテクチャ、プーリング、バッチ正規化。
        duration_minutes: 90
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-nv01-p1-l02
        title: "第2課：TransformerアーキテクチャとAttentionメカニズム"
        slug: bai-2-transformer-architecture-attention
        description: >-
          Self-attention、Multi-head attention、位置エンコーディング。
          エンコーダ・デコーダアーキテクチャ。BERT、GPT、T5モデルファミリー。
          トークン化：BPE、WordPiece、SentencePiece。
          NLPタスク：分類、NER、QA、要約。
        duration_minutes: 90
        is_free: true
        sort_order: 1
        video_url: null

  - id: section-02
    title: "パート2：Diffusion Modelsによる生成AI"
    description: U-Net、DDPM、ノイズスケジューリング、CLIP、テキストから画像へのパイプライン
    sort_order: 2
    lessons:
      - id: 019c9619-nv01-p2-l03
        title: "第3課：U-Netアーキテクチャとデノイジングの基礎"
        slug: bai-3-unet-architecture-denoising
        description: >-
          スキップ接続付きU-Netエンコーダ・デコーダ。
          PyTorchでU-Netをゼロから構築。デノイザーモデルのトレーニング。
          Group Normalization、GELU活性化、Rearrange Pooling。
          タイムステップエンコーディング用Sinusoidal Position Embeddings。
        duration_minutes: 90
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-nv01-p2-l04
        title: "第4課：DDPM — 順方向と逆方向の拡散プロセス"
        slug: bai-4-ddpm-forward-reverse-diffusion
        description: >-
          順方向拡散：マルコフ連鎖、分散スケジュール、再パラメータ化。
          逆方向拡散：ノイズ予測、段階的なデノイジング。
          ノイズスケジューリング：線形、コサインスケジュール。
          トレーニング目的：簡略化ELBO損失。
          Classifier-Free Diffusion Guidance（CFG）。
        duration_minutes: 90
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-nv01-p2-l05
        title: "第5課：CLIPとテキストから画像へのパイプライン"
        slug: bai-5-clip-text-to-image-pipeline
        description: >-
          CLIP：Contrastive Language-Image Pretraining。
          テキストエンコーディング、画像エンコーディング、対照損失。
          Cross-attention：テキスト埋め込みをU-Netに注入。
          完全なテキストから画像へのパイプライン。Latent Diffusionの概要。
          試験対策：コーディング演習とデバッグチャレンジ。
        duration_minutes: 90
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-03
    title: "パート3：LLMアプリケーションとRAG"
    description: LLM推論、RAGパイプライン、埋め込み、ベクトルストア、ガードレール
    sort_order: 3
    lessons:
      - id: 019c9619-nv01-p3-l06
        title: "第6課：LLM推論パイプライン設計"
        slug: bai-6-llm-inference-pipeline-design
        description: >-
          LLM推論パラメータ：temperature、top_p、top_k、max_tokens。
          NVIDIA NIM（Inference Microservices）。
          LangChain Expression Language（LCEL）、プロンプトテンプレート。
          Gradio UIプロトタイピング、LangServeデプロイメント。
          実行状態によるダイアログ管理。
        duration_minutes: 90
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-nv01-p3-l07
        title: "第7課：RAG — 検索拡張生成"
        slug: bai-7-rag-retrieval-augmented-generation
        description: >-
          ドキュメント読み込み、チャンキング戦略、メタデータ抽出。
          埋め込みモデル：意味的類似度、コサイン距離。
          ベクトルストア：FAISS、Milvus、pgvector。
          完全なRAGパイプライン：クエリ→検索→拡張→生成。
          ガードレール：入出力フィルタ、トピック検出。
        duration_minutes: 90
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-nv01-p3-l08
        title: "第8課：RAGエージェント — 構築と評価"
        slug: bai-8-rag-agent-build-evaluate
        description: >-
          研究論文に関する質問に回答するRAGエージェントを構築。
          状態管理によるマルチターン会話。
          RAG評価メトリクス：精度、再現率、忠実度。
          LLM-as-a-Judge評価パターン。
          試験対策：エンドツーエンドRAGエージェントチャレンジ。
        duration_minutes: 90
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-04
    title: "パート4：Agentic AIとLLMカスタマイズ"
    description: マルチエージェントシステム、LangGraph、LoRAファインチューニング、NeMoフレームワーク
    sort_order: 4
    lessons:
      - id: 019c9619-nv01-p4-l09
        title: "第9課：Agentic AI — マルチエージェントシステム"
        slug: bai-9-agentic-ai-multi-agent-systems
        description: >-
          エージェント抽象化：タスク分解、構造化出力。
          認知アーキテクチャ：ReAct、Plan-and-Execute、LATS。
          LangGraph：状態マシン、条件分岐エッジ、並列実行。
          マルチエージェントオーケストレーション、ツールインターフェース、知識グラフ。
          最終課題：マルチエージェント研究システムのデプロイ。
        duration_minutes: 90
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-nv01-p4-l10
        title: "第10課：LLM評価とLoRAファインチューニング"
        slug: bai-10-llm-evaluation-lora-fine-tuning
        description: >-
          評価手法：ベンチマーク（GSM8K）、LLM-as-a-Judge、ELOランキング。
          NeMo Evaluatorマイクロサービス、MLflow実験追跡。
          メトリクス：BLEU、F1スコア、意味的類似度。
          LoRAとQLoRAファインチューニング：理論と実践。
          NeMo Customizer：ファインチューニングジョブの起動。
          試験戦略、チートシートと最終模擬試験。
        duration_minutes: 90
        is_free: true
        sort_order: 1
        video_url: null

reviews: []
quizzes: []
---

## はじめに

**NVIDIA DLI Generative AI 試験対策**コースは、NVIDIA Deep Learning Instituteの生成AI/LLMトラック全体を体系的に復習するためのコースです — **Diffusion Models**、**RAG Agents**、**Agentic AI**から**LLM評価・ファインチューニング**まで。

### 従来の認定試験との違い

NVIDIA DLIは**選択式問題の試験ではありません** — クラウドGPUを使ったJupyter Notebookで**実際のコードを書く**必要があります。だからこそ、このシリーズでは理論的な問題ではなく、**ハンズオンコーディング**と**デバッグ演習**に重点を置いています。

### 対象者

- 生成AIの**高度な技術認定**を目指すMLエンジニア
- Pythonを知っていて**PyTorch + LLMスタック**を習得したい開発者
- DLIコースの受験準備をしている方：**S-FX-14**（Diffusion）、**S-FX-15**（RAG）、**C-FX-25**（Agentic）、**S-FX-34**（Eval/Fine-tune）
