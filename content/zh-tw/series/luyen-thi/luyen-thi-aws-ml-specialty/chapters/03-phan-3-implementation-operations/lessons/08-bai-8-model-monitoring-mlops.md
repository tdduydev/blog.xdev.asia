---
id: 5ffdff76-3b56-4c4f-9e66-f0aa1c6642d1
title: '第8課：模型監控與MLOps'
slug: bai-8-model-monitoring-mlops
description: >-
  SageMaker Model Monitor：數據品質、模型品質、偏差漂移、特徵歸因漂移。
  SageMaker Pipelines用於CI/CD ML。Model Registry、Experiments。
  Ground Truth用於數據標註。Autopilot用於AutoML。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 8
section_title: "第3部分：ML實作與維運（20%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認證機器學習 - 專業級 考試準備'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai8-mlops-pipeline.webp" alt="SageMaker MLOps Pipeline" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>SageMaker MLOps：Model Monitor、SageMaker Pipelines與ML工作流的CI/CD</em></p>
</div>

<h2 id="model-monitor"><strong>1. SageMaker Model Monitor</strong></h2>

<p><strong>SageMaker Model Monitor</strong>自動監控已部署的模型，以檢測正式環境中的品質問題。這是MLOps最重要的主題之一。</p>

<table>
<thead><tr><th>監控類型</th><th>檢測內容</th><th>基準線來源</th></tr></thead>
<tbody>
<tr><td><strong>數據品質監控</strong></td><td>輸入特徵的統計漂移（均值、標準差、完整性）</td><td>訓練數據統計</td></tr>
<tr><td><strong>模型品質監控</strong></td><td>模型效能下降（accuracy、F1下降）</td><td>真實標籤</td></tr>
<tr><td><strong>偏差漂移監控</strong></td><td>預測中公平性指標的偏移</td><td>Clarify基準線</td></tr>
<tr><td><strong>特徵歸因漂移</strong></td><td>SHAP值變化 — 特徵重要性改變</td><td>Clarify基準線</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> Model Monitor需要<strong>基準線</strong>來進行比較。基準線在部署時從訓練數據建立。監控按排程執行（每小時/每天），將傳入數據與基準線比較，如果漂移超過閾值則發出警報。</p>
</blockquote>

<h3 id="drift-types"><strong>1.1. 漂移類型</strong></h3>

<pre><code class="language-text">Data Drift Types:

┌─────────────────────────────────────────────────────┐
│  Covariate Shift（輸入漂移）：                        │
│  輸入分佈P(X)改變                                    │
│  例如：模型在夏季數據上訓練，                          │
│  正式環境收到冬季數據                                  │
│                                                     │
│  Concept Drift（概念漂移）：                          │
│  關係P(Y|X)改變                                      │
│  例如：欺詐模式隨時間演變                              │
│                                                     │
│  Prior Probability Shift（先驗機率偏移）：             │
│  P(Y)類別分佈改變                                     │
│  例如：季節性產品改變目標平衡                           │
└─────────────────────────────────────────────────────┘
</code></pre>

<h2 id="pipelines"><strong>2. SageMaker Pipelines — MLOps CI/CD</strong></h2>

<p><strong>SageMaker Pipelines</strong>是MLOps工作流編排工具 — 建立可重現、可自動化的ML管線。</p>

<pre><code class="language-text">SageMaker Pipeline Example:

  ProcessingStep ──→ TrainingStep ──→ EvaluationStep ──→ ConditionStep
       ↓                  ↓                ↓                   ↓
   Clean Data         Train Model      Compute Metrics    If accuracy > 0.85
   Feature Eng        Save Artifact    to S3              ↓           ↓
                                                     Register    Fail Pipeline
                                                      Model
</code></pre>

<table>
<thead><tr><th>步驟類型</th><th>功能</th></tr></thead>
<tbody>
<tr><td><strong>ProcessingStep</strong></td><td>透過Processing Jobs進行數據預處理</td></tr>
<tr><td><strong>TrainingStep</strong></td><td>透過Training Jobs進行模型訓練</td></tr>
<tr><td><strong>EvaluationStep</strong></td><td>模型評估、計算指標</td></tr>
<tr><td><strong>ConditionStep</strong></td><td>基於指標的分支邏輯</td></tr>
<tr><td><strong>RegisterModelStep</strong></td><td>將核准的模型註冊至Model Registry</td></tr>
<tr><td><strong>TransformStep</strong></td><td>批次轉換推論</td></tr>
</tbody>
</table>

<h2 id="model-registry"><strong>3. SageMaker Model Registry</strong></h2>

<p><strong>Model Registry</strong>是追蹤和治理ML模型整個生命週期的集中目錄。</p>

<table>
<thead><tr><th>功能</th><th>說明</th></tr></thead>
<tbody>
<tr><td><strong>模型群組</strong></td><td>相同模型各版本的邏輯分組</td></tr>
<tr><td><strong>核准狀態</strong></td><td>PendingManualApproval → Approved → Rejected</td></tr>
<tr><td><strong>模型譜系</strong></td><td>追蹤每個版本的訓練工作、數據、產出物</td></tr>
<tr><td><strong>部署</strong></td><td>從Registry直接部署至端點</td></tr>
</tbody>
</table>

<h2 id="ground-truth"><strong>4. SageMaker Ground Truth</strong></h2>

<p><strong>Ground Truth</strong>結合人工標註者和自動標註，協助建立<strong>高品質標註訓練數據集</strong>。</p>

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

<p><strong>Autopilot</strong>自動訓練和調校ML模型 — 具備可解釋性的完整AutoML。</p>

<table>
<thead><tr><th>Autopilot功能</th><th>詳情</th></tr></thead>
<tbody>
<tr><td>自動特徵工程</td><td>檢測數據類型、處理缺失值、編碼</td></tr>
<tr><td>演算法選擇</td><td>嘗試多種演算法（XGBoost、深度學習、線性）</td></tr>
<tr><td>超參數調校</td><td>每種演算法的貝葉斯最佳化</td></tr>
<tr><td>可解釋性</td><td>整合SageMaker Clarify — SHAP值</td></tr>
<tr><td>排行榜</td><td>按目標指標排序的模型</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> Autopilot僅支援<strong>表格數據</strong>。當題目問「為非技術用戶自動化建模」→ Autopilot。與SageMaker JumpStart（預建模型）和Canvas（商業用戶的無程式碼工具）不同。</p>
</blockquote>

<h2 id="cheat-sheet"><strong>6. 速查表 — MLOps服務</strong></h2>

<table>
<thead><tr><th>情境</th><th>服務</th></tr></thead>
<tbody>
<tr><td>檢測正式環境中的數據漂移</td><td>SageMaker Model Monitor（數據品質）</td></tr>
<tr><td>自動化ML管線CI/CD</td><td>SageMaker Pipelines</td></tr>
<tr><td>追蹤和治理模型版本</td><td>SageMaker Model Registry</td></tr>
<tr><td>大規模標註訓練數據</td><td>SageMaker Ground Truth</td></tr>
<tr><td>無需編碼的AutoML</td><td>SageMaker Autopilot</td></tr>
<tr><td>追蹤實驗（指標、參數）</td><td>SageMaker Experiments</td></tr>
<tr><td>模型效能下降警報</td><td>Model Monitor + CloudWatch Alarms</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. 練習題</strong></h2>

<p><strong>Q1:</strong> 已部署的欺詐檢測模型的accuracy在3個月後大幅下降。調查顯示輸入特徵分佈已改變。應該使用什麼工具來自動檢測這種情況？</p>
<ul>
<li>A) SageMaker Clarify</li>
<li>B) SageMaker Experiments</li>
<li>C) SageMaker Model Monitor — 數據品質監控 ✓</li>
<li>D) SageMaker Ground Truth</li>
</ul>
<p><em>解析：SageMaker Model Monitor的數據品質監控持續將傳入推論數據統計與訓練數據基準線進行比較。它檢測特徵漂移（改變的分佈）並在超過閾值時發送CloudWatch警報。</em></p>

<p><strong>Q2:</strong> 團隊想要建立一個可重現的ML管線，當新數據到達時自動重新訓練和部署模型，並在正式環境部署前有人工核准步驟。哪個服務提供此功能？</p>
<ul>
<li>A) SageMaker Autopilot</li>
<li>B) SageMaker Pipelines + Model Registry ✓</li>
<li>C) 僅AWS Step Functions</li>
<li>D) SageMaker Ground Truth</li>
</ul>
<p><em>解析：SageMaker Pipelines編排ML工作流（數據準備 → 訓練 → 評估 → 註冊）。Model Registry提供核准工作流（PendingManualApproval → Approved），在部署前設置人工閘門 — 兩者的組合是AWS上的標準MLOps解決方案。</em></p>

<p><strong>Q3:</strong> 一家公司需要為物體檢測訓練標註100,000張圖片。他們希望通過使用ML自動標註簡單範例來最小化標註成本。應該使用哪個服務？</p>
<ul>
<li>A) SageMaker Autopilot</li>
<li>B) Amazon Rekognition Custom Labels</li>
<li>C) SageMaker Ground Truth搭配自動標註 ✓</li>
<li>D) AWS Glue DataBrew</li>
</ul>
<p><em>解析：SageMaker Ground Truth使用自動標註，其中ML模型自動標註高信心度的範例，僅將不確定的範例發送給人工標註者。這可以將標註成本降低高達70%。</em></p>
