---
id: 019c9619-lt02-7002-c002-lt0200000002
title: "AWS認定機械学習 - 専門知識 試験対策"
slug: luyen-thi-aws-ml-specialty
description: >-
  AWS認定機械学習 - 専門知識（MLS-C01）試験の包括的な学習ガイド。
  SageMaker、データエンジニアリング、モデリング、AWSでのML実装を
  エキスパートレベルで習得します。

featured_image: images/blog/aws-ml-specialty-series-banner.webp
level: advanced
duration_hours: 40
lesson_count: 12
price: '0.00'
is_free: true
view_count: 0
average_rating: '0.00'
review_count: 0
enrollment_count: 0
meta: null
published_at: '2026-04-04T11:00:00.000000Z'
created_at: '2026-04-04T11:00:00.000000Z'

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
  - name: Machine Learning
    slug: machine-learning
  - name: SageMaker
    slug: sagemaker
  - name: Chứng chỉ
    slug: chung-chi
  - name: MLOps
    slug: mlops

quiz_slug: aws-ml-specialty

sections:
  - id: section-01
    title: "パート1：データエンジニアリング（20%）"
    description: AWS上でのML向けデータの収集、保存、処理
    sort_order: 1
    lessons:
      - id: 019c9619-lt02-l01
        title: "第1課：Data Repositories & Ingestion — S3、Kinesis、Glue"
        slug: bai-1-data-repositories-ingestion
        description: >-
          MLデータレイクとしてのS3。ストリーミング取り込み用Kinesis Data Streams/Firehose。
          ETL用AWS Glue。データ準備用Data Wrangler。
          ストレージ戦略：Parquet、ORC、CSV。
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt02-l02
        title: "第2課：データ変換と特徴量エンジニアリング"
        slug: bai-2-data-transformation
        description: >-
          SageMaker Processing Jobs。Feature Store。Data Wrangler flows。
          欠損値処理、エンコーディング、正規化、スケーリング。
          テキスト前処理：トークン化、TF-IDF。
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt02-l03
        title: "第3課：データ分析と可視化"
        slug: bai-3-data-analysis
        description: >-
          SageMakerノートブックでの探索的データ分析（EDA）。
          SQL分析用Athena。可視化用QuickSight。
          データ品質の問題、クラス不均衡の検出。
        duration_minutes: 45
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-02
    title: "パート2：モデリング（36%）"
    description: アルゴリズムの選択、訓練、チューニング、モデル評価
    sort_order: 2
    lessons:
      - id: 019c9619-lt02-l04
        title: "第4課：SageMaker組み込みアルゴリズム"
        slug: bai-4-sagemaker-built-in-algorithms
        description: >-
          XGBoost、Linear Learner、Random Cut Forest、K-Means。
          BlazingText、Seq2Seq、DeepAR、Object Detection。
          どのアルゴリズムをいつ使うか：詳細比較表。
        duration_minutes: 90
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt02-l05
        title: "第5課：訓練とハイパーパラメータチューニング"
        slug: bai-5-training-hyperparameter-tuning
        description: >-
          SageMaker Training Jobs：インスタンスタイプ、Pipe Mode vs File Mode。
          分散訓練：データ並列、モデル並列。
          自動モデルチューニング（HPO）：ベイズ最適化。
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt02-l06
        title: "第6課：モデル評価と検証"
        slug: bai-6-model-evaluation
        description: >-
          指標：Accuracy、Precision、Recall、F1、AUC-ROC、RMSE、MAE。
          混同行列。交差検証。バイアス-バリアンストレードオフ。
          SageMaker Clarifyによるバイアス検出と説明可能性。
        duration_minutes: 60
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-03
    title: "パート3：ML実装とオペレーション（20%）"
    description: MLモデルのデプロイ、監視、運用
    sort_order: 3
    lessons:
      - id: 019c9619-lt02-l07
        title: "第7課：モデルデプロイ — エンドポイントと推論"
        slug: bai-7-model-deployment
        description: >-
          リアルタイムエンドポイント、バッチ変換、非同期推論。
          マルチモデルエンドポイント、推論パイプライン。
          Elastic Inference、SageMaker Neo（エッジ）。
          Production VariantsによるA/Bテスト。
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt02-l08
        title: "第8課：モデル監視とMLOps"
        slug: bai-8-model-monitoring-mlops
        description: >-
          SageMaker Model Monitor：データ品質、モデル品質、バイアスドリフト。
          SageMaker PipelinesによるCI/CD ML。
          SageMaker Model Registry、Experiments。
          Ground Truthによるデータラベリング、AutopilotによるAutoML。
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt02-l09
        title: "第9課：セキュリティとコスト最適化"
        slug: bai-9-security-cost
        description: >-
          SageMaker用IAMロール。VPC設定、暗号化（KMS）。
          スポットトレーニングインスタンス、Savings Plans。
          S3ライフサイクルポリシー。インスタンスの適正サイジング。
        duration_minutes: 45
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-04
    title: "パート4：復習と試験戦略"
    description: 知識の総まとめと試験のコツ
    sort_order: 4
    lessons:
      - id: 019c9619-lt02-l10
        title: "第10課：よくあるML問題パターン"
        slug: bai-10-bai-toan-thuong-gap
        description: >-
          不正検知、レコメンデーションシステム、NLPパイプライン、
          時系列予測、AWSでのコンピュータビジョン。
          パターンマッチング：どの問題にどのAWSサービスを使うか。
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt02-l11
        title: "第11課：総合チートシート"
        slug: bai-11-cheat-sheet
        description: >-
          アルゴリズム比較総合表。AWSサービスマッピング表。
          重要な公式と指標。試験でよくある罠。
        duration_minutes: 45
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt02-l12
        title: "第12課：試験戦略とMock Exam"
        slug: bai-12-chien-luoc-thi
        description: >-
          MLS-C01試験の構成。時間管理のコツ。
          選択肢の消去テクニック。ドメインウェイト別の復習。
          模擬試験と結果の評価方法。
        duration_minutes: 35
        is_free: true
        sort_order: 2
        video_url: null
---
