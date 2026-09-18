---
id: 019c9619-lt03-l08
title: '第8課：Vertex AI管線與MLOps'
slug: bai-8-vertex-ai-pipelines-mlops
description: >-
  Vertex AI Pipelines（Kubeflow Pipelines SDK）。
  Model Registry、Experiments、Metadata Store。
  Vertex AI Model Monitoring：偏移、漂移偵測。
  ML的CI/CD：Cloud Build + Vertex AI。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 8
section_title: "領域4：模型部署與MLOps"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer 考試準備'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai8-mlops-cicd.webp" alt="Vertex AI Pipelines & MLOps" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Vertex AI MLOps：管線、CI/CD、Model Registry與生產ML監控</em></p>
</div>

<h2 id="mlops-maturity"><strong>1. MLOps成熟度等級</strong></h2>

<table>
<thead><tr><th>等級</th><th>說明</th><th>自動化程度</th></tr></thead>
<tbody>
<tr><td><strong>等級0</strong></td><td>手動流程，僅有腳本</td><td>無</td></tr>
<tr><td><strong>等級1</strong></td><td>ML管線自動化、持續訓練</td><td>訓練管線</td></tr>
<tr><td><strong>等級2</strong></td><td>完整的ML CI/CD、自動重新訓練觸發</td><td>全部</td></tr>
</tbody>
</table>

<h2 id="vertex-pipelines"><strong>2. Vertex AI Pipelines</strong></h2>

<p>Vertex AI Pipelines是<strong>Kubeflow Pipelines（KFP）</strong>的託管執行環境。管線使用Python SDK定義，編譯為YAML。</p>

<pre><code class="language-text">Vertex AI Pipeline Structure:

@component (preprocess_data)
     ↓
@component (train_model)
     ↓
@component (evaluate_model)
     ↓ (if accuracy > threshold)
@component (deploy_model)

Each component = isolated Docker container
Artifacts (data, models) stored in Cloud Storage
Metadata tracked in Vertex ML Metadata Store
</code></pre>

<table>
<thead><tr><th>管線SDK</th><th>備註</th></tr></thead>
<tbody>
<tr><td><strong>Kubeflow Pipelines SDK v2</strong></td><td>Vertex AI Pipelines的主要SDK</td></tr>
<tr><td><strong>TFX</strong></td><td>TensorFlow專用管線元件</td></tr>
<tr><td><strong>Google Cloud Pipeline Components</strong></td><td>Vertex AI服務的預建元件</td></tr>
</tbody>
</table>

<h2 id="model-monitoring"><strong>3. Vertex AI Model Monitoring</strong></h2>

<table>
<thead><tr><th>監控類型</th><th>偵測內容</th></tr></thead>
<tbody>
<tr><td><strong>特徵偏移監控</strong></td><td>服務端特徵分佈 ≠ 訓練基準線</td></tr>
<tr><td><strong>特徵漂移監控</strong></td><td>服務端特徵分佈隨時間變化</td></tr>
<tr><td><strong>預測漂移</strong></td><td>模型輸出分佈變化（間接標籤漂移）</td></tr>
</tbody>
</table>

<pre><code class="language-text">Model Monitoring Workflow:

Training Data Baseline (BigQuery/GCS)
     ↓ (establish distribution)
Deploy to Endpoint with Monitoring enabled
     ↓ (collect serving requests)
Periodic Analysis (hourly/daily)
     ↓ (compare distributions)
Alert if skew/drift > threshold
     ↓
Retrain trigger → new Pipeline run
</code></pre>

<h2 id="experiments-metadata"><strong>4. Vertex AI Experiments與Metadata</strong></h2>

<table>
<thead><tr><th>元件</th><th>用途</th></tr></thead>
<tbody>
<tr><td><strong>Vertex AI Experiments</strong></td><td>追蹤超參數、指標、跨執行的成品</td></tr>
<tr><td><strong>ML Metadata Store</strong></td><td>追蹤血統：資料 → 模型 → 端點</td></tr>
<tr><td><strong>Vertex AI TensorBoard</strong></td><td>視覺化訓練指標（損失、準確率曲線）</td></tr>
</tbody>
</table>

<h2 id="cicd-ml"><strong>5. GCP上ML的CI/CD</strong></h2>

<pre><code class="language-text">ML CI/CD Pipeline on GCP:

Code Push to Cloud Source Repositories
     ↓
Cloud Build trigger (CI)
     ├── Unit tests for ML components
     ├── Data validation tests
     └── Build Docker image → push to Artifact Registry
          ↓
Vertex AI Pipeline trigger (CD/CT)
     ├── Data preprocessing
     ├── Model training
     ├── Model evaluation
     └── Conditional deployment → Vertex AI Endpoint
</code></pre>

<blockquote>
<p><strong>考試提示：</strong> ML的CI/CD = Cloud Build（程式碼測試 + Docker建構）+ Vertex AI Pipelines（訓練 + 部署協調）。Cloud Source Repositories是GCP的Git託管服務。Artifact Registry取代Container Registry用於儲存Docker映像檔。</p>
</blockquote>

<h2 id="practice"><strong>6. 練習題</strong></h2>

<p><strong>Q1：</strong> 生產ML模型的預測分佈在3週內發生了顯著偏移，但真實標籤尚不可用，無法直接衡量準確率。哪種Vertex AI監控類型能偵測到這一點？</p>
<ul>
<li>A) 特徵偏移監控</li>
<li>B) 預測漂移監控 ✓</li>
<li>C) 訓練資料驗證</li>
<li>D) Vertex AI Experiments基準線比較</li>
</ul>
<p><em>解說：預測漂移監控追蹤模型輸出分佈隨時間的變化，作為模型退化的間接信號，即使在真實標籤不可用時也能使用。特徵偏移比較的是服務端與訓練端的特徵分佈（需要已知的訓練基準線）。</em></p>

<p><strong>Q2：</strong> 團隊正在建構包含資料前處理、模型訓練和部署的Vertex AI管線。需要追蹤所有輸入、輸出和模型成品以進行稽核和可重現性。哪個服務儲存此血統資訊？</p>
<ul>
<li>A) Cloud Logging</li>
<li>B) Vertex AI ML Metadata Store ✓</li>
<li>C) Cloud Storage版本控制</li>
<li>D) Vertex AI Experiments儀表板</li>
</ul>
<p><em>解說：Vertex AI ML Metadata Store自動追蹤血統：哪些資料集產生了哪些模型、哪些模型部署到了哪些端點，包括超參數和評估指標——實現完整的來源追蹤。</em></p>

<p><strong>Q3：</strong> 一家公司想在Cloud Storage中有新的訓練資料時自動重新訓練ML模型。重新訓練應執行Vertex AI管線，並在指標通過閾值時部署。哪個GCP服務應觸發管線？</p>
<ul>
<li>A) Vertex AI Schedules</li>
<li>B) Cloud Storage通知 + Cloud Functions/Eventarc → Vertex AI Pipelines ✓</li>
<li>C) BigQuery排程查詢</li>
<li>D) 單獨使用Cloud Scheduler</li>
</ul>
<p><em>解說：Cloud Storage物件完成通知可以觸發Cloud Functions或Eventarc，然後以程式方式啟動Vertex AI管線執行。這建立了事件驅動的持續訓練（MLOps等級1）。Cloud Scheduler按時間觸發，而非按資料可用性觸發。</em></p>
