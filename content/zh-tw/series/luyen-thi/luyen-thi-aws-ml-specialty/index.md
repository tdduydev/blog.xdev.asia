---
id: 019c9619-lt02-7002-c002-lt0200000002
title: "AWS認證機器學習 - 專業級 考試準備"
slug: luyen-thi-aws-ml-specialty
description: >-
  AWS Certified Machine Learning - Specialty (MLS-C01) 考試深度複習路線。
  精通SageMaker、數據工程、建模、在AWS上部署ML，達到專家級別。

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
    title: "第1部分：數據工程（20%）"
    description: 在AWS上收集、儲存和處理ML數據
    sort_order: 1
    lessons:
      - id: 019c9619-lt02-l01
        title: "第1課：Data Repositories & Ingestion — S3、Kinesis、Glue"
        slug: bai-1-data-repositories-ingestion
        description: >-
          S3作為ML數據湖。Kinesis Data Streams/Firehose用於串流。
          AWS Glue用於ETL。Data Wrangler用於數據準備。
          儲存策略：Parquet、ORC、CSV。
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt02-l02
        title: "第2課：數據轉換與特徵工程"
        slug: bai-2-data-transformation
        description: >-
          SageMaker Processing Jobs。Feature Store。Data Wrangler流程。
          處理缺失值、編碼、正規化、縮放。
          文本預處理：分詞、TF-IDF。
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt02-l03
        title: "第3課：數據分析與視覺化"
        slug: bai-3-data-analysis
        description: >-
          SageMaker筆記本上的探索性數據分析（EDA）。
          Athena用於SQL分析。QuickSight用於視覺化。
          檢測數據品質問題、類別不平衡。
        duration_minutes: 45
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-02
    title: "第2部分：建模（36%）"
    description: 選擇演算法、訓練、調參、評估模型
    sort_order: 2
    lessons:
      - id: 019c9619-lt02-l04
        title: "第4課：SageMaker內建演算法"
        slug: bai-4-sagemaker-built-in-algorithms
        description: >-
          XGBoost、Linear Learner、Random Cut Forest、K-Means。
          BlazingText、Seq2Seq、DeepAR、Object Detection。
          何時使用哪種演算法：詳細比較表。
        duration_minutes: 90
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt02-l05
        title: "第5課：訓練與超參數調校"
        slug: bai-5-training-hyperparameter-tuning
        description: >-
          SageMaker Training Jobs：執行個體類型、Pipe Mode vs File Mode。
          分散式訓練：數據並行 vs 模型並行。
          自動模型調校（HPO）：貝葉斯最佳化。
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt02-l06
        title: "第6課：模型評估與驗證"
        slug: bai-6-model-evaluation
        description: >-
          指標：Accuracy、Precision、Recall、F1、AUC-ROC、RMSE、MAE。
          混淆矩陣。交叉驗證。偏差-變異數取捨。
          SageMaker Clarify用於偏差檢測和可解釋性。
        duration_minutes: 60
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-03
    title: "第3部分：ML實作與維運（20%）"
    description: 部署、監控和營運ML模型
    sort_order: 3
    lessons:
      - id: 019c9619-lt02-l07
        title: "第7課：模型部署 — 端點與推論"
        slug: bai-7-model-deployment
        description: >-
          即時端點、批次轉換、非同步推論。
          多模型端點、推論管線。
          Elastic Inference、SageMaker Neo（邊緣）。
          Production Variants的A/B測試。
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt02-l08
        title: "第8課：模型監控與MLOps"
        slug: bai-8-model-monitoring-mlops
        description: >-
          SageMaker Model Monitor：數據品質、模型品質、偏差漂移。
          SageMaker Pipelines用於CI/CD ML。
          SageMaker Model Registry、Experiments。
          Ground Truth用於數據標註，Autopilot用於AutoML。
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt02-l09
        title: "第9課：安全性與成本最佳化"
        slug: bai-9-security-cost
        description: >-
          SageMaker的IAM角色。VPC設定、加密（KMS）。
          Spot Training Instances、Savings Plans。
          S3生命週期政策。執行個體適當調整。
        duration_minutes: 45
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-04
    title: "第4部分：總複習與考試策略"
    description: 彙整知識與考試技巧
    sort_order: 4
    lessons:
      - id: 019c9619-lt02-l10
        title: "第10課：常見ML問題模式深入分析"
        slug: bai-10-bai-toan-thuong-gap
        description: >-
          欺詐檢測、推薦系統、NLP管線、
          時間序列預測、AWS上的電腦視覺。
          模式對應：哪個AWS服務對應哪個問題。
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt02-l11
        title: "第11課：速查表 — 核心知識彙整"
        slug: bai-11-cheat-sheet
        description: >-
          演算法彙整比較表。AWS服務對應表。
          重要公式和指標。考試常見陷阱。
        duration_minutes: 45
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt02-l12
        title: "第12課：考試策略與模擬測驗"
        slug: bai-12-chien-luoc-thi
        description: >-
          MLS-C01考試結構。時間管理技巧。
          答案排除法技巧。按領域權重複習。
          模擬考試指南與結果評估。
        duration_minutes: 35
        is_free: true
        sort_order: 2
        video_url: null
