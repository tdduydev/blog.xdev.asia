---
id: 019c9619-lt03-7003-c003-lt0300000003
title: "Google Cloud Professional Machine Learning Engineer 考試準備"
slug: luyen-thi-gcp-ml-engineer
description: >-
  Google Cloud Professional Machine Learning Engineer考試的全面學習路線圖。
  Vertex AI、BigQuery ML、TFX管線、GCP上的MLOps。

featured_image: images/blog/gcp-ml-engineer-series-banner.webp
level: advanced
duration_hours: 35
lesson_count: 10
price: '0.00'
is_free: true
view_count: 0
average_rating: '0.00'
review_count: 0
enrollment_count: 0
meta: null
published_at: '2026-04-04T12:00:00.000000Z'
created_at: '2026-04-04T12:00:00.000000Z'

author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg

category:
  id: 019c9616-cat9-7009-a009-000000000009
  name: Luyện thi chứng chỉ
  slug: luyen-thi

tags:
  - name: Google Cloud
    slug: google-cloud
  - name: Machine Learning
    slug: machine-learning
  - name: Vertex AI
    slug: vertex-ai
  - name: Chứng chỉ
    slug: chung-chi
  - name: MLOps
    slug: mlops

quiz_slug: gcp-ml-engineer

sections:
  - id: section-01
    title: "領域1：ML問題框架與架構"
    description: 分析ML問題，在GCP上選擇合適的方法與架構
    sort_order: 1
    lessons:
      - id: 019c9619-lt03-l01
        title: "第1課：ML問題框架 — 監督式、非監督式、強化學習"
        slug: bai-1-framing-ml-problems
        description: >-
          如何判斷問題是否需要ML。選擇正確的模型類型。
          商業指標 vs ML指標。資料可用性評估。
          Google的ML最佳實踐。
        duration_minutes: 50
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt03-l02
        title: "第2課：GCP AI/ML生態系統概覽"
        slug: bai-2-gcp-ai-ml-ecosystem
        description: >-
          Vertex AI平台概覽。AutoML vs 自訂訓練。
          BigQuery ML。預訓練API（Vision、NLP、Translation）。
          何時使用哪個服務 — 決策樹。
        duration_minutes: 50
        is_free: true
        sort_order: 1
        video_url: null

  - id: section-02
    title: "領域2：資料工程與特徵工程"
    description: 在GCP上建構資料管線與Feature Store
    sort_order: 2
    lessons:
      - id: 019c9619-lt03-l03
        title: "第3課：資料管線 — Dataflow、Pub/Sub、Dataproc"
        slug: bai-3-data-pipeline
        description: >-
          Dataflow上的Apache Beam進行批次/串流ETL。
          Pub/Sub進行事件驅動管線。Dataproc進行Spark。
          Cloud Composer（Airflow）進行協調排程。
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt03-l04
        title: "第4課：特徵工程與Vertex AI Feature Store"
        slug: bai-4-feature-engineering
        description: >-
          特徵工程技術。BigQuery進行特徵計算。
          Vertex AI Feature Store：線上/離線服務。
          特徵監控、訓練/推論間的一致性。
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null

  - id: section-03
    title: "領域3：Vertex AI上的模型開發"
    description: 使用Vertex AI進行訓練、調參與評估
    sort_order: 3
    lessons:
      - id: 019c9619-lt03-l05
        title: "第5課：Vertex AI訓練 — 自訂與AutoML"
        slug: bai-5-vertex-ai-training
        description: >-
          自訂訓練工作：預建容器、自訂容器。
          GPU/TPU上的分散式訓練。AutoML：Tabular、Image、Text、Video。
          訓練管線設定。超參數調優服務。
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt03-l06
        title: "第6課：BigQuery ML與GCP上的TensorFlow"
        slug: bai-6-bigquery-ml-tensorflow
        description: >-
          BigQuery ML：CREATE MODEL語法、支援的模型。
          TensorFlow Extended（TFX）管線元件。
          TFServing、TFLite。模型最佳化技術。
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null

  - id: section-04
    title: "領域4：模型部署與MLOps"
    description: 在生產環境中部署、服務、監控模型
    sort_order: 4
    lessons:
      - id: 019c9619-lt03-l07
        title: "第7課：模型部署與預測"
        slug: bai-7-model-deployment
        description: >-
          Vertex AI Endpoints：線上預測、批次預測。
          模型版本管理、流量分割。邊緣部署（Edge Manager）。
          擴展設定、GPU分配。
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt03-l08
        title: "第8課：Vertex AI管線與MLOps"
        slug: bai-8-vertex-ai-pipelines-mlops
        description: >-
          Vertex AI Pipelines（Kubeflow Pipelines SDK）。
          Model Registry、Experiments、Metadata Store。
          Vertex AI Model Monitoring：偏移、漂移偵測。
          ML的CI/CD：Cloud Build + Vertex AI。
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null

  - id: section-05
    title: "領域5：Responsible AI與複習"
    description: Responsible AI實踐與考試策略
    sort_order: 5
    lessons:
      - id: 019c9619-lt03-l09
        title: "第9課：Responsible AI與安全性"
        slug: bai-9-responsible-ai
        description: >-
          Google的Responsible AI原則。Vertex AI Explainability（SHAP、IG）。
          公平性指標。隱私：差分隱私、聯邦學習。
          IAM、VPC-SC、CMEK保護ML工作負載。
        duration_minutes: 50
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt03-l10
        title: "第10課：速查表與考試策略"
        slug: bai-10-cheat-sheet-chien-luoc-thi
        description: >-
          GCP服務對照總整理。Vertex AI vs AWS SageMaker比較。
          考試結構、時間管理技巧。
          答案排除法。模擬測驗與評估。
        duration_minutes: 45
        is_free: true
        sort_order: 1
        video_url: null

reviews: []
quizzes: []
---

## 簡介

**Google Cloud Professional ML Engineer考試準備**課程幫助您全面準備Google Cloud最高級別的ML認證考試。

### 適合對象

- 希望獲得GCP認證的ML工程師、資料科學家
- 已具備ML基礎知識和實務經驗的人員
