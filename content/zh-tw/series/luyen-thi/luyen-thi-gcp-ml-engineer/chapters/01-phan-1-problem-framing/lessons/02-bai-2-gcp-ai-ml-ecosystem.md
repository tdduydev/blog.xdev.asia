---
id: 019c9619-lt03-l02
title: '第2課：GCP AI/ML生態系統概覽'
slug: bai-2-gcp-ai-ml-ecosystem
description: >-
  Vertex AI平台概覽。AutoML vs 自訂訓練。
  BigQuery ML。預訓練API（Vision、NLP、Translation）。
  何時使用哪個服務 — 決策樹。
duration_minutes: 50
is_free: true
video_url: null
sort_order: 2
section_title: "領域1：ML問題框架與架構"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer 考試準備'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai2-gcp-ecosystem.webp" alt="GCP AI/ML Ecosystem" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>GCP AI/ML生態系統：Vertex AI、AutoML、BigQuery ML、預訓練API與其使用時機</em></p>
</div>

<h2 id="gcp-ml-landscape"><strong>1. GCP ML全景概覽</strong></h2>

<pre><code class="language-text">GCP ML Capability Spectrum:

LOW CODE ◄────────────────────────────────────► HIGH CONTROL
  │                        │                           │
  ▼                        ▼                           ▼
Pre-trained APIs      Vertex AI AutoML        Custom Training
(Vision, NLP,         (no code needed,        (full control,
Translation)          you bring data)         you bring code)
  │                        │                           │
No ML expertise       Some domain              ML expertise
needed                expertise               required

BigQuery ML ────── SQL interface for ML on warehouse data
</code></pre>

<h2 id="vertex-ai"><strong>2. Vertex AI — 統一ML平台</strong></h2>

<p>Vertex AI是GCP整合整個ML生命週期的統一平台。充分理解各元件是考試的必要條件。</p>

<table>
<thead><tr><th>元件</th><th>用途</th></tr></thead>
<tbody>
<tr><td><strong>Vertex AI Workbench</strong></td><td>資料科學家使用的託管Jupyter筆記本</td></tr>
<tr><td><strong>Vertex AI Training</strong></td><td>自訂訓練工作（CPU、GPU、TPU）</td></tr>
<tr><td><strong>Vertex AI AutoML</strong></td><td>無程式碼模型訓練（Tabular、Image、Text、Video）</td></tr>
<tr><td><strong>Vertex AI Endpoints</strong></td><td>部署模型進行線上預測</td></tr>
<tr><td><strong>Vertex AI Batch Prediction</strong></td><td>非同步批次評分</td></tr>
<tr><td><strong>Vertex AI Feature Store</strong></td><td>在訓練/推論間一致地提供特徵</td></tr>
<tr><td><strong>Vertex AI Pipelines</strong></td><td>基於Kubeflow Pipelines的ML工作流程協調</td></tr>
<tr><td><strong>Vertex AI Experiments</strong></td><td>追蹤執行、比較指標</td></tr>
<tr><td><strong>Vertex AI Model Registry</strong></td><td>模型版本控制</td></tr>
<tr><td><strong>Vertex AI Model Monitoring</strong></td><td>偵測特徵偏移與預測漂移</td></tr>
</tbody>
</table>

<h2 id="automl-vs-custom"><strong>3. AutoML vs. 自訂訓練</strong></h2>

<table>
<thead><tr><th>標準</th><th>AutoML</th><th>自訂訓練</th></tr></thead>
<tbody>
<tr><td>需要的ML專業知識</td><td>最少</td><td>必要</td></tr>
<tr><td>訓練時間</td><td>數小時（自動化）</td><td>可變（您控制）</td></tr>
<tr><td>模型可解釋性</td><td>有限</td><td>完全控制</td></tr>
<tr><td>成本</td><td>每個模型較高</td><td>按使用的運算資源付費</td></tr>
<tr><td>最適用途</td><td>快速原型、標準任務</td><td>自訂架構、研究</td></tr>
<tr><td>支援的資料類型</td><td>Tabular、Image、Text、Video</td><td>任何（您撰寫程式碼）</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> 「團隊沒有ML專業知識」或「最快部署時間」→ AutoML。「自訂神經網路架構」或「完全控制訓練迴圈」→ 自訂訓練。</p>
</blockquote>

<h2 id="bigquery-ml"><strong>4. BigQuery ML</strong></h2>

<p>BigQuery ML允許使用SQL訓練和服務ML模型 — 無需從BigQuery匯出資料。</p>

<table>
<thead><tr><th>模型類型</th><th>SQL關鍵字</th><th>使用場景</th></tr></thead>
<tbody>
<tr><td>線性迴歸</td><td>LINEAR_REG</td><td>價格預測</td></tr>
<tr><td>邏輯迴歸</td><td>LOGISTIC_REG</td><td>分類</td></tr>
<tr><td>K-Means聚類</td><td>KMEANS</td><td>客戶分群</td></tr>
<tr><td>XGBoost</td><td>BOOSTED_TREE_CLASSIFIER/REGRESSOR</td><td>表格資料分類/迴歸</td></tr>
<tr><td>深度神經網路</td><td>DNN_CLASSIFIER/DNN_REGRESSOR</td><td>複雜模式</td></tr>
<tr><td>矩陣分解</td><td>MATRIX_FACTORIZATION</td><td>推薦系統</td></tr>
<tr><td>匯入的TF模型</td><td>TENSORFLOW</td><td>自訂TF模型</td></tr>
</tbody>
</table>

<h2 id="pre-trained-apis"><strong>5. 預訓練AI API</strong></h2>

<table>
<thead><tr><th>API</th><th>功能</th><th>使用場景</th></tr></thead>
<tbody>
<tr><td><strong>Cloud Vision API</strong></td><td>標籤、OCR、臉部偵測、標誌、安全搜尋</td><td>無需訓練的影像分析</td></tr>
<tr><td><strong>Cloud Natural Language API</strong></td><td>實體、情感分析、語法、分類</td><td>文字分析</td></tr>
<tr><td><strong>Cloud Translation API</strong></td><td>100+語言對</td><td>多語言內容</td></tr>
<tr><td><strong>Cloud Speech-to-Text</strong></td><td>語音轉文字、說話者分離</td><td>音訊處理</td></tr>
<tr><td><strong>Cloud Text-to-Speech</strong></td><td>WaveNet語音、SSML</td><td>語音UI、無障礙功能</td></tr>
<tr><td><strong>Document AI</strong></td><td>表單解析、發票提取</td><td>文件自動化</td></tr>
<tr><td><strong>Recommendations AI</strong></td><td>即時商品推薦</td><td>電商個人化</td></tr>
</tbody>
</table>

<h2 id="decision-tree"><strong>6. 服務選擇決策樹</strong></h2>

<pre><code class="language-text">WHICH GCP ML SERVICE?

Do you have LABELED DATA?
│
├── NO → Pre-trained API sufficient for your task (Vision, NLP)?
│         YES → Use Pre-trained API
│         NO  → Vertex AI Custom Training (unsupervised)
│
└── YES → Is your data already IN BigQuery?
          │
          ├── YES → BigQuery ML (SQL-based, fast, no export)
          │
          └── NO → Need rapid prototyping, no ML team?
                    │
                    ├── YES → Vertex AI AutoML
                    │
                    └── NO  → Vertex AI Custom Training
</code></pre>

<h2 id="practice"><strong>7. 練習題</strong></h2>

<p><strong>Q1：</strong> 資料分析團隊在BigQuery中有PB級的客戶交易資料。他們想利用現有的SQL技能，在不匯出資料的情況下建構流失預測模型。最佳方法是什麼？</p>
<ul>
<li>A) 匯出到Cloud Storage，然後使用Vertex AI自訂訓練</li>
<li>B) 使用Cloud Natural Language API</li>
<li>C) 使用BigQuery ML搭配CREATE MODEL LOGISTIC_REGRESSION ✓</li>
<li>D) 使用Vertex AI AutoML Tabular</li>
</ul>
<p><em>解說：BigQuery ML允許利用現有的資料基礎設施和技能，使用SQL直接在BigQuery資料上訓練分類模型，無需匯出資料。當資料已在BigQuery中時，這是最快的路徑。</em></p>

<p><strong>Q2：</strong> 一個小型新創公司需要為客戶評論添加情感分析功能。他們沒有ML團隊，也沒有標籤的情感資料。哪個解決方案需要最少的工作量？</p>
<ul>
<li>A) Vertex AI AutoML Text Sentiment</li>
<li>B) 在Vertex AI上訓練自訂BERT模型</li>
<li>C) Cloud Natural Language API情感分析 ✓</li>
<li>D) BigQuery ML DNN分類器</li>
</ul>
<p><em>解說：Cloud Natural Language API是預訓練的全託管服務，不需要訓練資料、ML專業知識或基礎設施設定。只需呼叫API即可。AutoML需要標籤的情感範例；自訂BERT需要大量的專業知識。</em></p>

<p><strong>Q3：</strong> 為確保模型訓練時使用的特徵值與預測時提供的特徵值相同，團隊應使用哪個Vertex AI元件？</p>
<ul>
<li>A) Vertex AI Experiments</li>
<li>B) Vertex AI Feature Store ✓</li>
<li>C) Vertex AI Model Registry</li>
<li>D) Vertex AI Pipelines</li>
</ul>
<p><em>解說：Vertex AI Feature Store提供ML特徵的集中式儲存庫，用於儲存、提供和共享ML特徵。它在訓練和線上/批次預測中使用相同的特徵定義和值，確保訓練-推論一致性，防止訓練-推論偏移。</em></p>
