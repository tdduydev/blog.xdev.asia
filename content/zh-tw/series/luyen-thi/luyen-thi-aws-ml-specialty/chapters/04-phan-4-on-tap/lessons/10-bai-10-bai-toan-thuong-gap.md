---
id: f7a8daa0-e49a-4fac-b232-d6a8b998e120
title: '第10課：常見ML問題模式深入分析'
slug: bai-10-bai-toan-thuong-gap
description: >-
  欺詐檢測、推薦系統、NLP管線、時間序列預測、
  電腦視覺 — 識別問題並選擇正確的AWS服務/演算法。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 10
section_title: "第4部分：總複習與考試策略"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認證機器學習 - 專業級 考試準備'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai10-ml-patterns.webp" alt="AWS ML Problem Patterns" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>ML問題模式：AWS上的欺詐檢測、推薦、NLP、時間序列與電腦視覺</em></p>
</div>

<h2 id="pattern-matching"><strong>1. 快速識別問題類型</strong></h2>

<p>MLS-C01大部分問題是<strong>情境式的</strong>：閱讀商業問題描述，選擇最適合的AWS服務或演算法。本課提供快速識別的框架。</p>

<pre><code class="language-text">ML Problem Recognition Framework:

READ SCENARIO
    ↓
Is output a CATEGORY?          → Classification
Is output a NUMBER?            → Regression
Is output a CLUSTER/GROUP?     → Clustering (no labels)
Is output a RANK/SCORE?        → Recommendation / Ranking
Is output a DETECTION (anomaly)? → Anomaly Detection
Is output a SEQUENCE?          → Time Series / Seq2Seq
</code></pre>

<h2 id="fraud-detection"><strong>2. 欺詐檢測</strong></h2>

<p>欺詐檢測是考試中的經典問題。關鍵挑戰：<strong>極端類別不平衡</strong>（99.9%的交易是合法的）。</p>

<table>
<thead><tr><th>挑戰</th><th>解決方案</th></tr></thead>
<tbody>
<tr><td>類別不平衡</td><td>SMOTE、class_weight、<strong>precision-recall</strong>（非accuracy）</td></tr>
<tr><td>即時評分</td><td>SageMaker即時端點</td></tr>
<tr><td>非監督式欺詐（無標籤）</td><td><strong>Random Cut Forest</strong>（異常檢測）</td></tr>
<tr><td>基於圖的欺詐網絡</td><td><strong>Amazon Neptune</strong> + GNN（GraphSAGE）</td></tr>
<tr><td>監督式（有標註歷史）</td><td><strong>XGBoost</strong>或Linear Learner</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> 當問題提到「沒有欺詐標籤」或「檢測異常行為」→ <strong>Random Cut Forest</strong>。當有已標註的欺詐交易歷史 → 分類（XGBoost）。</p>
</blockquote>

<h2 id="recommendation"><strong>3. 推薦系統</strong></h2>

<table>
<thead><tr><th>類型</th><th>演算法</th><th>AWS服務</th></tr></thead>
<tbody>
<tr><td>協同過濾</td><td>Factorization Machines、Neural CF</td><td>SageMaker FM、<strong>Amazon Personalize</strong></td></tr>
<tr><td>基於內容</td><td>TF-IDF、Embeddings</td><td>SageMaker KNN</td></tr>
<tr><td>混合</td><td>FM + 內容特徵</td><td>Amazon Personalize（HRNN）</td></tr>
<tr><td>冷啟動問題</td><td>內容特徵、元數據</td><td>Personalize上下文元數據</td></tr>
</tbody>
</table>

<p>考試經常問：<em>「電商的即時個人化推薦」</em> → 答案幾乎總是<strong>Amazon Personalize</strong>（託管服務）。</p>

<h2 id="nlp"><strong>4. NLP管線</strong></h2>

<pre><code class="language-text">NLP Task Decision Tree:

Classify documents?
    → Text Classification → BlazingText (word2vec mode), Comprehend Custom

Extract entities from text?
    → Named Entity Recognition → Amazon Comprehend (NER)

Translate text?
    → Amazon Translate

Summarize documents?
    → Hugging Face on SageMaker (T5, BART)

Q&A / Generation?
    → SageMaker JumpStart foundation models (Llama, Falcon)

Toxic content detection?
    → Amazon Comprehend (Sentiment + custom classifier)
</code></pre>

<table>
<thead><tr><th>NLP任務</th><th>演算法/服務</th></tr></thead>
<tbody>
<tr><td>文件分類</td><td>BlazingText、Comprehend Custom</td></tr>
<tr><td>主題建模</td><td><strong>Latent Dirichlet Allocation（LDA）</strong>、NTM</td></tr>
<tr><td>情感分析</td><td>Amazon Comprehend</td></tr>
<tr><td>語言檢測</td><td>Amazon Comprehend</td></tr>
<tr><td>機器翻譯</td><td>Amazon Translate</td></tr>
<tr><td>對話式AI</td><td>Amazon Lex（聊天機器人）+ Lambda</td></tr>
</tbody>
</table>

<h2 id="time-series"><strong>5. 時間序列預測</strong></h2>

<table>
<thead><tr><th>服務/演算法</th><th>使用情境</th></tr></thead>
<tbody>
<tr><td><strong>DeepAR+</strong>（SageMaker內建）</td><td>多個相關時間序列、冷啟動</td></tr>
<tr><td><strong>Amazon Forecast</strong></td><td>全託管、商業預測（需求、庫存）</td></tr>
<tr><td><strong>ARIMA</strong></td><td>單一平穩序列、傳統方法</td></tr>
<tr><td><strong>Prophet</strong></td><td>季節性 + 節假日、Facebook函式庫</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> 「預測數千個產品的零售需求」→ <strong>DeepAR+</strong>（多個相關序列）或<strong>Amazon Forecast</strong>（託管）。關鍵差異：DeepAR+為所有項目訓練一個模型，而傳統方法需要每個序列一個模型。</p>
</blockquote>

<h2 id="computer-vision"><strong>6. 電腦視覺</strong></h2>

<table>
<thead><tr><th>CV任務</th><th>演算法</th><th>服務</th></tr></thead>
<tbody>
<tr><td>影像分類</td><td><strong>Image Classification（ResNet）</strong></td><td>SageMaker內建</td></tr>
<tr><td>物體檢測</td><td><strong>Object Detection（SSD/YOLO）</strong></td><td>SageMaker內建</td></tr>
<tr><td>語義分割</td><td><strong>Semantic Segmentation</strong></td><td>SageMaker內建</td></tr>
<tr><td>Rekognition（無需ML）</td><td>人臉、物體、文字、內容審核</td><td><strong>Amazon Rekognition</strong></td></tr>
<tr><td>影像中的自訂標籤</td><td>微調</td><td>Rekognition Custom Labels</td></tr>
</tbody>
</table>

<h2 id="mapping-table"><strong>7. 商業領域 → AWS服務對應表</strong></h2>

<table>
<thead><tr><th>產業 / 情境</th><th>AWS服務</th></tr></thead>
<tbody>
<tr><td>電商個人化</td><td>Amazon Personalize</td></tr>
<tr><td>客服中心分析</td><td>Amazon Transcribe + Comprehend</td></tr>
<tr><td>醫療影像分析</td><td>Amazon HealthLake + SageMaker（自訂模型）</td></tr>
<tr><td>文件理解（發票、表單）</td><td><strong>Amazon Textract</strong></td></tr>
<tr><td>產品搜尋（語義）</td><td>Amazon OpenSearch + KNN</td></tr>
<tr><td>IoT異常檢測</td><td><strong>Amazon Lookout for Equipment</strong></td></tr>
<tr><td>製造瑕疵檢測</td><td><strong>Amazon Lookout for Vision</strong></td></tr>
<tr><td>財務預測（託管）</td><td>Amazon Forecast</td></tr>
<tr><td>客戶流失預測</td><td>XGBoost（SageMaker）</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>8. 練習題</strong></h2>

<p><strong>Q1:</strong> 一家零售公司想要預測10,000個產品下一季度的銷售額，並納入節假日季節性和促銷活動。最適當的解決方案是哪個？</p>
<ul>
<li>A) 為10,000個產品各訓練單獨的ARIMA模型</li>
<li>B) 使用Amazon Forecast搭配相關時間序列數據 ✓</li>
<li>C) 使用Amazon Comprehend進行趨勢分析</li>
<li>D) 使用Amazon Rekognition分析產品圖片</li>
</ul>
<p><em>解析：Amazon Forecast專為大規模商業需求預測設計，可同時處理數千個相關時間序列，並支援節假日和促銷等外部因素。為10,000個產品訓練單獨的ARIMA模型不切實際且會錯過跨序列模式。</em></p>

<p><strong>Q2:</strong> 一家銀行需要即時檢測欺詐交易，但沒有已標註的歷史欺詐數據。應該使用哪個演算法？</p>
<ul>
<li>A) XGBoost分類器</li>
<li>B) Linear Learner二元分類</li>
<li>C) Random Cut Forest ✓</li>
<li>D) BlazingText</li>
</ul>
<p><em>解析：沒有已標註的欺詐數據，這是一個非監督式異常檢測問題。Random Cut Forest無需標註範例即可檢測異常（偏離正常模式的交易）。XGBoost和Linear Learner是監督式的，需要已標註的訓練數據。</em></p>

<p><strong>Q3:</strong> 一家公司想要從掃描的保險理賠表單（PDF）中擷取鍵值對。沒有進行過自訂ML訓練。應該使用哪個AWS服務？</p>
<ul>
<li>A) Amazon Comprehend</li>
<li>B) Amazon Textract ✓</li>
<li>C) SageMaker Object Detection</li>
<li>D) Amazon Rekognition</li>
</ul>
<p><em>解析：Amazon Textract專門設計用於從掃描文件（包括PDF）中擷取文字、表單（鍵值對）和表格。無需ML訓練。Comprehend分析文字含義；Rekognition分析影像；兩者都不像Textract那樣處理結構化表單擷取。</em></p>
