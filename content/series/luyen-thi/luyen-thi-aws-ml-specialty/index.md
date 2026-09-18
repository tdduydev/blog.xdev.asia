---
id: 019c9619-lt02-7002-c002-lt0200000002
title: "Luyện thi AWS Certified Machine Learning - Specialty"
slug: luyen-thi-aws-ml-specialty
description: >-
  Lộ trình ôn tập chuyên sâu cho kỳ thi AWS Certified Machine Learning - Specialty
  (MLS-C01). Nắm vững SageMaker, data engineering, modeling, triển khai ML trên AWS
  ở mức chuyên gia.

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
    title: "Phần 1: Data Engineering (20%)"
    description: Thu thập, lưu trữ, và xử lý dữ liệu cho ML trên AWS
    sort_order: 1
    lessons:
      - id: 019c9619-lt02-l01
        title: "Bài 1: Data Repositories & Ingestion — S3, Kinesis, Glue"
        slug: bai-1-data-repositories-ingestion
        description: >-
          S3 cho ML data lake. Kinesis Data Streams/Firehose cho streaming.
          AWS Glue cho ETL. Data Wrangler cho data preparation.
          Chiến lược lưu trữ: Parquet, ORC, CSV.
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt02-l02
        title: "Bài 2: Data Transformation & Feature Engineering"
        slug: bai-2-data-transformation
        description: >-
          SageMaker Processing Jobs. Feature Store. Data Wrangler flows.
          Xử lý missing values, encoding, normalization, scaling.
          Text preprocessing: tokenization, TF-IDF.
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt02-l03
        title: "Bài 3: Data Analysis & Visualization"
        slug: bai-3-data-analysis
        description: >-
          Exploratory Data Analysis (EDA) trên SageMaker notebooks.
          Athena cho SQL analytics. QuickSight cho visualization.
          Phát hiện data quality issues, class imbalance.
        duration_minutes: 45
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-02
    title: "Phần 2: Modeling (36%)"
    description: Chọn algorithm, train, tune, evaluate model
    sort_order: 2
    lessons:
      - id: 019c9619-lt02-l04
        title: "Bài 4: SageMaker Built-in Algorithms"
        slug: bai-4-sagemaker-built-in-algorithms
        description: >-
          XGBoost, Linear Learner, Random Cut Forest, K-Means.
          BlazingText, Seq2Seq, DeepAR, Object Detection.
          Khi nào dùng algorithm nào: bảng so sánh chi tiết.
        duration_minutes: 90
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt02-l05
        title: "Bài 5: Training & Hyperparameter Tuning"
        slug: bai-5-training-hyperparameter-tuning
        description: >-
          SageMaker Training Jobs: instance types, Pipe Mode vs File Mode.
          Distributed training: data parallelism, model parallelism.
          Automatic Model Tuning (HPO): Bayesian optimization.
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt02-l06
        title: "Bài 6: Model Evaluation & Validation"
        slug: bai-6-model-evaluation
        description: >-
          Metrics: Accuracy, Precision, Recall, F1, AUC-ROC, RMSE, MAE.
          Confusion Matrix. Cross-validation. Bias-Variance Tradeoff.
          SageMaker Clarify cho bias detection & explainability.
        duration_minutes: 60
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-03
    title: "Phần 3: ML Implementation & Operations (20%)"
    description: Deploy, monitor, và operate ML models
    sort_order: 3
    lessons:
      - id: 019c9619-lt02-l07
        title: "Bài 7: Model Deployment — Endpoints & Inference"
        slug: bai-7-model-deployment
        description: >-
          Real-time Endpoints, Batch Transform, Async Inference.
          Multi-Model Endpoints, Inference Pipeline.
          Elastic Inference, SageMaker Neo (edge).
          A/B Testing với Production Variants.
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt02-l08
        title: "Bài 8: Model Monitoring & MLOps"
        slug: bai-8-model-monitoring-mlops
        description: >-
          SageMaker Model Monitor: Data Quality, Model Quality, Bias Drift.
          SageMaker Pipelines cho CI/CD ML.
          SageMaker Model Registry, Experiments.
          Ground Truth cho data labeling, Autopilot cho AutoML.
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt02-l09
        title: "Bài 9: Security & Cost Optimization"
        slug: bai-9-security-cost
        description: >-
          IAM roles cho SageMaker. VPC config, encryption (KMS).
          Spot Training Instances, Savings Plans.
          S3 lifecycle policies. Right-sizing instances.
        duration_minutes: 45
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-04
    title: "Phần 4: Ôn tập & Chiến lược thi"
    description: Tổng hợp kiến thức và mẹo thi
    sort_order: 4
    lessons:
      - id: 019c9619-lt02-l10
        title: "Bài 10: Deep Dive — Các bài toán thường gặp"
        slug: bai-10-bai-toan-thuong-gap
        description: >-
          Fraud detection, recommendation system, NLP pipeline,
          time series forecasting, computer vision trên AWS.
          Pattern matching: dịch vụ AWS nào cho bài toán nào.
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt02-l11
        title: "Bài 11: Cheat Sheet — Tổng hợp kiến thức trọng tâm"
        slug: bai-11-cheat-sheet
        description: >-
          Bảng so sánh algorithms tổng hợp. Bảng mapping dịch vụ AWS.
          Formulas và metrics quan trọng. Common gotchas trong đề thi.
        duration_minutes: 45
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt02-l12
        title: "Bài 12: Chiến lược thi & Mock Exam"
        slug: bai-12-chien-luoc-thi
        description: >-
          Cấu trúc đề thi MLS-C01. Tips quản lý thời gian.
          Kỹ thuật loại trừ đáp án. Ôn tập theo domain weights.
          Hướng dẫn thi thử và đánh giá kết quả.
        duration_minutes: 45
        is_free: true
        sort_order: 2
        video_url: null

reviews: []
quizzes: []
---

## Giới thiệu

Khoá học **Luyện thi AWS Certified Machine Learning - Specialty** giúp bạn ôn tập chuyên sâu cho kỳ thi **MLS-C01** — chứng chỉ cấp cao nhất về ML trên AWS.

### Ai nên học?

- Data Scientist, ML Engineer muốn chứng chỉ AWS
- Đã có kiến thức ML cơ bản (regression, classification, neural networks)
- Đã làm quen với AWS (có AWS Cloud Practitioner là lợi thế)

### Cấu trúc đề thi MLS-C01

| Domain | Tỷ trọng |
|--------|----------|
| Data Engineering | 20% |
| Exploratory Data Analysis | 24% |
| Modeling | 36% |
| ML Implementation & Operations | 20% |

- **Số câu**: 65 câu
- **Thời gian**: 180 phút
- **Điểm đạt**: 750/1000
- **Phí thi**: $300 USD

### Lộ trình học

1. **Học lý thuyết** qua 12 bài trong series này
2. **Hands-on** thực hành trên AWS Free Tier
3. **Thi thử** với đề trắc nghiệm mô phỏng
4. **Ôn lại** các domain yếu
5. **Đăng ký thi** khi đạt ≥80% đề thử
