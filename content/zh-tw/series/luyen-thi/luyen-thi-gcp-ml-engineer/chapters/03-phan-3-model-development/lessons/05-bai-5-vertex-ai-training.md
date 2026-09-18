---
id: 019c9619-lt03-l05
title: '第5課：Vertex AI訓練 — 自訂與AutoML'
slug: bai-5-vertex-ai-training
description: >-
  自訂訓練工作：預建容器、自訂容器。
  GPU/TPU上的分散式訓練。AutoML：Tabular、Image、Text、Video。
  訓練管線設定。超參數調優服務。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 5
section_title: "領域3：Vertex AI上的模型開發"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer 考試準備'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai5-vertex-training.webp" alt="Vertex AI Custom Training" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Vertex AI自訂訓練：Training Jobs、AutoML、分散式訓練與最佳化</em></p>
</div>

<h2 id="custom-training"><strong>1. Vertex AI自訂訓練</strong></h2>

<p>自訂訓練允許您在Google Cloud基礎設施上執行自己的訓練程式碼。有兩種打包程式碼的方式：</p>

<table>
<thead><tr><th>方法</th><th>說明</th><th>使用時機</th></tr></thead>
<tbody>
<tr><td><strong>預建容器</strong></td><td>GCP提供的容器：TF、PyTorch、Scikit-learn、XGBoost</td><td>標準ML框架，快速設定</td></tr>
<tr><td><strong>自訂容器</strong></td><td>建構自己的Docker映像檔</td><td>自訂依賴、特殊環境</td></tr>
</tbody>
</table>

<pre><code class="language-text">Custom Training Job Structure:

training_package/ (Python package or Docker image)
│
├── trainer/
│   ├── __init__.py
│   ├── task.py        ← entry point (main training script)
│   └── model.py       ← model definition
│
└── setup.py

Arguments passed via:
  TRAINING_DATA_URI: gs://bucket/data/
  TRAINING_OUTPUT_URI: gs://bucket/model/
  Hyperparameters: --learning-rate=0.001
</code></pre>

<h2 id="compute-options"><strong>2. 運算選項</strong></h2>

<table>
<thead><tr><th>硬體</th><th>最適用途</th><th>備註</th></tr></thead>
<tbody>
<tr><td><strong>CPU</strong></td><td>Scikit-learn、小型表格資料</td><td>最便宜，無GPU平行處理</td></tr>
<tr><td><strong>GPU（T4、A100、V100）</strong></td><td>深度學習、NLP、電腦視覺</td><td>深度學習比CPU快10-100倍</td></tr>
<tr><td><strong>TPU v3、v4</strong></td><td>TensorFlow大規模訓練</td><td>Google專用硬體；對TF/JAX非常快</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> TPU是Google專用硬體，針對TensorFlow和JAX最佳化。GPU適用於所有框架。TPU對於非常大的TF模型最具成本效益；GPU更通用。考試可能問「TensorFlow大規模訓練最具成本效益」→ TPU。</p>
</blockquote>

<h2 id="distributed-training"><strong>3. Vertex AI上的分散式訓練</strong></h2>

<table>
<thead><tr><th>策略</th><th>說明</th><th>使用場景</th></tr></thead>
<tbody>
<tr><td><strong>資料平行處理</strong></td><td>將資料分散到各工作節點，相同模型</td><td>大多數深度學習訓練場景</td></tr>
<tr><td><strong>模型平行處理</strong></td><td>將模型層分散到各工作節點</td><td>模型太大無法放入單一GPU</td></tr>
<tr><td><strong>MirroredStrategy（TF）</strong></td><td>多GPU、單一機器</td><td>單節點、多GPU</td></tr>
<tr><td><strong>MultiWorkerMirroredStrategy</strong></td><td>多GPU、多機器</td><td>叢集訓練</td></tr>
<tr><td><strong>ParameterServerStrategy</strong></td><td>透過參數伺服器進行非同步更新</td><td>非常大的模型（舊版）</td></tr>
</tbody>
</table>

<h2 id="automl"><strong>4. Vertex AI AutoML</strong></h2>

<table>
<thead><tr><th>AutoML類型</th><th>輸入資料</th><th>支援的任務</th></tr></thead>
<tbody>
<tr><td><strong>AutoML Tabular</strong></td><td>CSV、BigQuery表格</td><td>分類、迴歸、預測</td></tr>
<tr><td><strong>AutoML Image</strong></td><td>JPEG、PNG、BMP</td><td>分類（單/多標籤）、物件偵測、分割</td></tr>
<tr><td><strong>AutoML Text</strong></td><td>文字文件</td><td>分類、實體擷取、情感分析</td></tr>
<tr><td><strong>AutoML Video</strong></td><td>MP4、AVI、MOV</td><td>分類、物件偵測、動作辨識</td></tr>
</tbody>
</table>

<h2 id="hyperparameter-tuning"><strong>5. Vertex AI超參數調優</strong></h2>

<p>Vertex AI超參數調優自動尋找最佳的超參數組合。</p>

<table>
<thead><tr><th>搜尋演算法</th><th>說明</th></tr></thead>
<tbody>
<tr><td><strong>網格搜尋</strong></td><td>窮舉式、昂貴；適用小搜尋空間</td></tr>
<tr><td><strong>隨機搜尋</strong></td><td>隨機取樣；通常比網格搜尋好</td></tr>
<tr><td><strong>貝葉斯最佳化</strong></td><td>使用高斯過程的智慧搜尋；最有效率</td></tr>
</tbody>
</table>

<pre><code class="language-text">HPT Job Setup:

hyperparameters:
  - parameter_id: learning_rate
    type: DOUBLE
    min_value: 0.0001
    max_value: 0.1
    scale: LOG  ← log scale for LR

  - parameter_id: batch_size
    type: INTEGER
    values: [32, 64, 128, 256]

metric:
  metric_id: val_accuracy
  goal: MAXIMIZE
  
max_trial_count: 50
parallel_trial_count: 5
</code></pre>

<h2 id="practice"><strong>6. 練習題</strong></h2>

<p><strong>Q1：</strong> 團隊想在多台機器上（每台8個GPU）訓練自訂TensorFlow模型。他們希望在所有工作節點間同步梯度，不使用參數伺服器。應使用哪種TensorFlow分散策略？</p>
<ul>
<li>A) MirroredStrategy</li>
<li>B) MultiWorkerMirroredStrategy ✓</li>
<li>C) ParameterServerStrategy</li>
<li>D) TPUStrategy</li>
</ul>
<p><em>解說：MultiWorkerMirroredStrategy支援跨多台機器（每台多個GPU）的同步資料平行訓練。MirroredStrategy僅適用於單機多GPU。ParameterServerStrategy使用非同步更新。TPUStrategy專用於TPU pod。</em></p>

<p><strong>Q2：</strong> 一家公司需要訓練影像分類模型，但團隊沒有深度學習專業知識。他們有5,000張標籤的商品圖片。哪個Vertex AI選項需要最少的ML專業知識？</p>
<ul>
<li>A) 使用TensorFlow CNN的Vertex AI自訂訓練</li>
<li>B) Vertex AI AutoML Image Classification ✓</li>
<li>C) Dataproc Spark ML</li>
<li>D) BigQuery ML</li>
</ul>
<p><em>解說：AutoML Image Classification自動處理架構選擇、超參數調優和訓練。團隊只需上傳標籤圖片並指定任務。不需要任何程式碼或深度學習專業知識。</em></p>

<p><strong>Q3：</strong> 在評估訓練成本高的深度學習模型且搜尋空間很大時，哪種超參數搜尋策略最有效率？</p>
<ul>
<li>A) 網格搜尋 — 測試所有組合</li>
<li>B) 隨機搜尋 — 均勻取樣</li>
<li>C) 貝葉斯最佳化 — 使用過去的試驗結果引導搜尋 ✓</li>
<li>D) 手動調優 — 專家選擇參數</li>
</ul>
<p><em>解說：貝葉斯最佳化使用高斯過程建構目標函數的概率模型，根據過去的試驗結果智慧選擇下一個要評估的超參數配置。比網格搜尋或隨機搜尋用更少的試驗就能找到好的配置。</em></p>
