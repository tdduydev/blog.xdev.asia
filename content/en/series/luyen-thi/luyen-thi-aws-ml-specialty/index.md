---
id: 019c9619-lt02-7002-c002-lt0200000002
title: "AWS Certified Machine Learning - Specialty Exam Prep"
slug: luyen-thi-aws-ml-specialty
description: >-
  An in-depth study guide for the AWS Certified Machine Learning - Specialty
  (MLS-C01) exam. Master SageMaker, data engineering, modeling, and ML deployment
  on AWS at the expert level.

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
    title: "Part 1: Data Engineering (20%)"
    description: Collect, store, and process data for ML on AWS
    sort_order: 1
    lessons:
      - id: 019c9619-lt02-l01
        title: "Lesson 1: Data Repositories & Ingestion — S3, Kinesis, Glue"
        slug: bai-1-data-repositories-ingestion
        description: >-
          S3 for ML data lake. Kinesis Data Streams/Firehose for streaming.
          AWS Glue for ETL. Data Wrangler for data preparation.
          Storage strategies: Parquet, ORC, CSV.
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt02-l02
        title: "Lesson 2: Data Transformation & Feature Engineering"
        slug: bai-2-data-transformation
        description: >-
          SageMaker Processing Jobs. Feature Store. Data Wrangler flows.
          Handling missing values, encoding, normalization, scaling.
          Text preprocessing: tokenization, TF-IDF.
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt02-l03
        title: "Lesson 3: Data Analysis & Visualization"
        slug: bai-3-data-analysis
        description: >-
          Exploratory Data Analysis (EDA) on SageMaker notebooks.
          Athena for SQL analytics. QuickSight for visualization.
          Detecting data quality issues, class imbalance.
        duration_minutes: 45
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-02
    title: "Part 2: Modeling (36%)"
    description: Select algorithms, train, tune, and evaluate models
    sort_order: 2
    lessons:
      - id: 019c9619-lt02-l04
        title: "Lesson 4: SageMaker Built-in Algorithms"
        slug: bai-4-sagemaker-built-in-algorithms
        description: >-
          XGBoost, Linear Learner, Random Cut Forest, K-Means.
          BlazingText, Seq2Seq, DeepAR, Object Detection.
          When to use which algorithm: detailed comparison table.
        duration_minutes: 90
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt02-l05
        title: "Lesson 5: Training & Hyperparameter Tuning"
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
        title: "Lesson 6: Model Evaluation & Validation"
        slug: bai-6-model-evaluation
        description: >-
          Metrics: Accuracy, Precision, Recall, F1, AUC-ROC, RMSE, MAE.
          Confusion Matrix. Cross-validation. Bias-Variance Tradeoff.
          SageMaker Clarify for bias detection & explainability.
        duration_minutes: 60
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-03
    title: "Part 3: ML Implementation & Operations (20%)"
    description: Deploy, monitor, and operate ML models
    sort_order: 3
    lessons:
      - id: 019c9619-lt02-l07
        title: "Lesson 7: Model Deployment — Endpoints & Inference"
        slug: bai-7-model-deployment
        description: >-
          Real-time Endpoints, Batch Transform, Async Inference.
          Multi-Model Endpoints, Inference Pipeline.
          Elastic Inference, SageMaker Neo (edge).
          A/B Testing with Production Variants.
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt02-l08
        title: "Lesson 8: Model Monitoring & MLOps"
        slug: bai-8-model-monitoring-mlops
        description: >-
          SageMaker Model Monitor: Data Quality, Model Quality, Bias Drift.
          SageMaker Pipelines for CI/CD ML.
          SageMaker Model Registry, Experiments.
          Ground Truth for data labeling, Autopilot for AutoML.
        duration_minutes: 60
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt02-l09
        title: "Lesson 9: Security & Cost Optimization"
        slug: bai-9-security-cost
        description: >-
          IAM roles for SageMaker. VPC config, encryption (KMS).
          Spot Training Instances, Savings Plans.
          S3 lifecycle policies. Right-sizing instances.
        duration_minutes: 45
        is_free: true
        sort_order: 2
        video_url: null

  - id: section-04
    title: "Part 4: Review & Exam Strategy"
    description: Consolidate knowledge and exam tips
    sort_order: 4
    lessons:
      - id: 019c9619-lt02-l10
        title: "Lesson 10: Deep Dive — Common ML Problem Patterns"
        slug: bai-10-bai-toan-thuong-gap
        description: >-
          Fraud detection, recommendation system, NLP pipeline,
          time series forecasting, computer vision on AWS.
          Pattern matching: which AWS service for which problem.
        duration_minutes: 60
        is_free: true
        sort_order: 0
        video_url: null
      - id: 019c9619-lt02-l11
        title: "Lesson 11: Cheat Sheet — Key Concepts Summary"
        slug: bai-11-cheat-sheet
        description: >-
          Comprehensive algorithm comparison table. AWS service mapping table.
          Important formulas and metrics. Common exam gotchas.
        duration_minutes: 45
        is_free: true
        sort_order: 1
        video_url: null
      - id: 019c9619-lt02-l12
        title: "Lesson 12: Exam Strategy & Mock Exam"
        slug: bai-12-chien-luoc-thi
        description: >-
          MLS-C01 exam structure. Time management tips.
          Answer elimination techniques. Study by domain weights.
          Mock exam guide and score evaluation.
        duration_minutes: 35
        is_free: true
        sort_order: 2
        video_url: null
