---
id: 5ffdff76-3b56-4c4f-9e66-f0aa1c6642d1
title: '第8課：モデル監視とMLOps'
slug: bai-8-model-monitoring-mlops
description: >-
  SageMaker Model Monitor：データ品質、モデル品質、バイアスドリフト、特徴量アトリビューションドリフト。
  SageMaker PipelinesによるCI/CD ML。Model Registry、Experiments。
  Ground Truthによるデータラベリング。AutopilotによるAutoML。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 8
section_title: "パート3：ML実装とオペレーション（20%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認定機械学習 - 専門知識 試験対策'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai8-mlops-pipeline.webp" alt="SageMaker MLOps Pipeline" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>SageMaker MLOps：Model Monitor、SageMaker Pipelines、MLワークフローのCI/CD</em></p>
</div>

<h2 id="model-monitor"><strong>1. SageMaker Model Monitor</strong></h2>

<p><strong>SageMaker Model Monitor</strong>はデプロイされたモデルを自動監視し、本番環境での品質問題を検出します。MLOpsで最も重要なトピックの1つです。</p>

<table>
<thead><tr><th>監視タイプ</th><th>検出内容</th><th>ベースライン</th></tr></thead>
<tbody>
<tr><td><strong>データ品質監視</strong></td><td>入力特徴量の統計的ドリフト（平均、標準偏差、完全性）</td><td>訓練データ統計</td></tr>
<tr><td><strong>モデル品質監視</strong></td><td>モデルパフォーマンスの低下（accuracy、F1の低下）</td><td>グラウンドトゥルースラベル</td></tr>
<tr><td><strong>バイアスドリフト監視</strong></td><td>予測における公平性指標の変化</td><td>Clarifyベースライン</td></tr>
<tr><td><strong>特徴量アトリビューションドリフト</strong></td><td>SHAP値の変化 — 特徴量の重要度変化</td><td>Clarifyベースライン</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> Model Monitorは比較のための<strong>ベースライン</strong>が必要です。ベースラインはデプロイ時に訓練データから作成されます。スケジュール（時間単位/日次）で実行され、受信データをベースラインと比較し、ドリフトが閾値を超えた場合にアラートを発信します。</p>
</blockquote>

<h3 id="drift-types"><strong>1.1. ドリフトの種類</strong></h3>

<pre><code class="language-text">Data Drift Types:

┌─────────────────────────────────────────────────────┐
│  Covariate Shift (Input Drift):                     │
│  Input distribution P(X) changes                   │
│  Example: model trained on summer data,             │
│  production gets winter data                        │
│                                                     │
│  Concept Drift (Label Drift):                       │
│  Relationship P(Y|X) changes                        │
│  Example: fraud patterns evolve over time          │
│                                                     │
│  Prior Probability Shift:                           │
│  P(Y) class distribution changes                    │
│  Example: seasonal products change target balance   │
└─────────────────────────────────────────────────────┘
</code></pre>

<h2 id="pipelines"><strong>2. SageMaker Pipelines — MLOps CI/CD</strong></h2>

<p><strong>SageMaker Pipelines</strong>はMLOpsワークフローオーケストレーションツールで、再現可能で自動化可能なMLパイプラインを作成します。</p>

<pre><code class="language-text">SageMaker Pipeline Example:

  ProcessingStep ──→ TrainingStep ──→ EvaluationStep ──→ ConditionStep
       ↓                  ↓                ↓                   ↓
   Clean Data         Train Model      Compute Metrics    If accuracy > 0.85
   Feature Eng        Save Artifact    to S3              ↓           ↓
                                                     Register    Fail Pipeline
                                                      Model
</code></pre>

<table>
<thead><tr><th>ステップタイプ</th><th>動作</th></tr></thead>
<tbody>
<tr><td><strong>ProcessingStep</strong></td><td>Processing Jobsによるデータ前処理</td></tr>
<tr><td><strong>TrainingStep</strong></td><td>Training Jobsによるモデル訓練</td></tr>
<tr><td><strong>EvaluationStep</strong></td><td>モデル評価、メトリクス計算</td></tr>
<tr><td><strong>ConditionStep</strong></td><td>メトリクスに基づく分岐ロジック</td></tr>
<tr><td><strong>RegisterModelStep</strong></td><td>承認済みモデルをModel Registryに登録</td></tr>
<tr><td><strong>TransformStep</strong></td><td>バッチ変換推論</td></tr>
</tbody>
</table>

<h2 id="model-registry"><strong>3. SageMaker Model Registry</strong></h2>

<p><strong>Model Registry</strong>はMLモデルのライフサイクルを通じて追跡・管理するための一元的なカタログです。</p>

<table>
<thead><tr><th>機能</th><th>説明</th></tr></thead>
<tbody>
<tr><td><strong>Model Groups</strong></td><td>同一モデルのバージョンの論理的グルーピング</td></tr>
<tr><td><strong>承認ステータス</strong></td><td>PendingManualApproval → Approved → Rejected</td></tr>
<tr><td><strong>モデルリネージ</strong></td><td>各バージョンの訓練ジョブ、データ、アーティファクトを追跡</td></tr>
<tr><td><strong>デプロイ</strong></td><td>Registryから直接エンドポイントにデプロイ</td></tr>
</tbody>
</table>

<h2 id="ground-truth"><strong>4. SageMaker Ground Truth</strong></h2>

<p><strong>Ground Truth</strong>は人間のラベラーと自動ラベリングを組み合わせて<strong>高品質なラベル付き訓練データセット</strong>の作成を支援します。</p>

<pre><code class="language-text">Ground Truth Workflow:

Raw Data (S3) ──→ Labeling Job
                       ↓
             ┌─── Auto Labeling ───┐
             │   (ML model labels  │
             │   easy examples)    │
             │                     │
             └─── Human Labeling ──┘
                   (Mechanical Turk  
                    or private team  
                    for hard examples)
                       ↓
               Labeled Dataset (S3)
</code></pre>

<h2 id="autopilot"><strong>5. SageMaker Autopilot — AutoML</strong></h2>

<p><strong>Autopilot</strong>はMLモデルを自動的に訓練・チューニングする完全なAutoMLと説明可能性を提供します。</p>

<table>
<thead><tr><th>Autopilotの機能</th><th>詳細</th></tr></thead>
<tbody>
<tr><td>自動特徴量エンジニアリング</td><td>データタイプ検出、欠損値処理、エンコーディング</td></tr>
<tr><td>アルゴリズム選択</td><td>複数アルゴリズム試行（XGBoost、Deep Learning、Linear）</td></tr>
<tr><td>ハイパーパラメータチューニング</td><td>アルゴリズムごとのベイズ最適化</td></tr>
<tr><td>説明可能性</td><td>SageMaker Clarify統合 — SHAP値</td></tr>
<tr><td>リーダーボード</td><td>ターゲット指標によるモデルランキング</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>試験のヒント：</strong> Autopilotは<strong>テーブルデータのみ</strong>をサポートします。「非技術者向けにモデル構築を自動化」→ Autopilot。SageMaker JumpStart（事前構築モデル）やCanvas（ビジネスユーザー向けノーコード）とは異なります。</p>
</blockquote>

<h2 id="cheat-sheet"><strong>6. チートシート — MLOpsサービス</strong></h2>

<table>
<thead><tr><th>シナリオ</th><th>サービス</th></tr></thead>
<tbody>
<tr><td>本番環境のデータドリフト検出</td><td>SageMaker Model Monitor（データ品質）</td></tr>
<tr><td>自動化MLパイプラインCI/CD</td><td>SageMaker Pipelines</td></tr>
<tr><td>モデルバージョンの追跡・管理</td><td>SageMaker Model Registry</td></tr>
<tr><td>大規模な訓練データラベリング</td><td>SageMaker Ground Truth</td></tr>
<tr><td>コーディングなしのAutoML</td><td>SageMaker Autopilot</td></tr>
<tr><td>実験の追跡（メトリクス、パラメータ）</td><td>SageMaker Experiments</td></tr>
<tr><td>モデルパフォーマンス低下アラート</td><td>Model Monitor + CloudWatch Alarms</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. 練習問題</strong></h2>

<p><strong>Q1:</strong> デプロイされた不正検知モデルのaccuracyが3ヶ月後に大幅に低下しました。調査の結果、入力特徴量の分布が変化していることがわかりました。今後これを自動検出するためにどのツールを使用すべきですか？</p>
<ul>
<li>A) SageMaker Clarify</li>
<li>B) SageMaker Experiments</li>
<li>C) SageMaker Model Monitor — データ品質監視 ✓</li>
<li>D) SageMaker Ground Truth</li>
</ul>
<p><em>解説：SageMaker Model Monitorのデータ品質監視は、受信する推論データの統計量を訓練データのベースラインと継続的に比較します。特徴量ドリフト（分布の変化）を検出し、閾値を超えた場合にCloudWatchアラートを送信します。</em></p>

<p><strong>Q2:</strong> チームが新しいデータが到着したときに自動的にモデルを再訓練・デプロイする再現可能なMLパイプラインを作成し、本番デプロイ前に人間の承認ステップを設けたいと考えています。これを提供するサービスはどれですか？</p>
<ul>
<li>A) SageMaker Autopilot</li>
<li>B) SageMaker Pipelines + Model Registry ✓</li>
<li>C) AWS Step Functionsのみ</li>
<li>D) SageMaker Ground Truth</li>
</ul>
<p><em>解説：SageMaker PipelinesがMLワークフローを調整し（データ準備→訓練→評価→登録）、Model Registryが承認ワークフロー（PendingManualApproval → Approved）を提供します。この組み合わせがAWSの標準MLOpsソリューションです。</em></p>

<p><strong>Q3:</strong> ある企業が物体検出訓練のために100,000枚の画像にラベルを付ける必要があります。MLを使用して簡単な例を自動的にラベル付けすることでコストを最小化したいと考えています。どのサービスを使用すべきですか？</p>
<ul>
<li>A) SageMaker Autopilot</li>
<li>B) Amazon Rekognition Custom Labels</li>
<li>C) 自動ラベリング付きSageMaker Ground Truth ✓</li>
<li>D) AWS Glue DataBrew</li>
</ul>
<p><em>解説：SageMaker Ground Truthは自動ラベリングを使用し、MLモデルが高信頼度の例を自動的にラベル付けし、不確実な例のみを人間のワーカーに送信します。これによりラベリングコストを最大70%削減できます。</em></p>
