---
id: 8d704042-9cc5-478e-b198-d80ea70c22c5
title: '第4課：SageMaker內建演算法'
slug: bai-4-sagemaker-built-in-algorithms
description: >-
  XGBoost、Linear Learner、Random Cut Forest、K-Means、KNN。
  BlazingText、Seq2Seq、DeepAR、Object Detection、Semantic Segmentation。
  何時使用哪種演算法 — 詳細判斷表。
duration_minutes: 90
is_free: true
video_url: null
sort_order: 4
section_title: "第2部分：建模（36%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認證機器學習 - 專業級 考試準備'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai4-sagemaker-algorithms.webp" alt="SageMaker Built-in Algorithms" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>SageMaker內建演算法：從XGBoost、Linear Learner到DeepAR、Image Classification</em></p>
</div>

<h2 id="overview"><strong>1. SageMaker內建演算法概述</strong></h2>

<p>SageMaker提供18種以上的<strong>內建演算法</strong>，針對AWS基礎設施上的分散式執行進行了最佳化。這是MLS-C01<strong>非常重要的主題</strong>，通常出8〜12題。</p>

<blockquote>
<p><strong>考試提示：</strong> 背誦「問題類型 → 演算法」的對應表。考試中總是給出情境並要求選擇適當的演算法。主要模式：時間序列 → DeepAR、異常 → Random Cut Forest、NLP分類 → BlazingText、表格數據 → XGBoost。</p>
</blockquote>

<h2 id="supervised-table"><strong>2. 監督式學習演算法</strong></h2>

<table>
<thead><tr><th>演算法</th><th>問題類型</th><th>輸入</th><th>主要特點</th></tr></thead>
<tbody>
<tr><td><strong>XGBoost</strong></td><td>分類、迴歸</td><td>表格數據（CSV/LibSVM）</td><td>表格數據最佳效能、梯度提升</td></tr>
<tr><td><strong>Linear Learner</strong></td><td>二元/多類別分類、迴歸</td><td>RecordIO、CSV</td><td>快速、可擴展、內建正規化</td></tr>
<tr><td><strong>Factorization Machines</strong></td><td>二元分類、迴歸</td><td>RecordIO-protobuf（稀疏數據）</td><td>稀疏數據、推薦、CTR預測</td></tr>
<tr><td><strong>KNN（k近鄰）</strong></td><td>分類、迴歸</td><td>RecordIO-protobuf</td><td>基於實例、無需訓練、惰性學習</td></tr>
<tr><td><strong>DeepAR</strong></td><td>時間序列預測</td><td>JSON Lines</td><td>多個相關時間序列、機率預測</td></tr>
<tr><td><strong>Object2Vec</strong></td><td>Embeddings</td><td>配對輸入</td><td>學習詞彙、產品、使用者的嵌入</td></tr>
</tbody>
</table>

<h2 id="nlp-algorithms"><strong>3. NLP演算法</strong></h2>

<table>
<thead><tr><th>演算法</th><th>輸出</th><th>使用情境</th></tr></thead>
<tbody>
<tr><td><strong>BlazingText</strong></td><td>詞向量或文本分類</td><td>情感分析、垃圾郵件檢測、實體分類</td></tr>
<tr><td><strong>Seq2Seq</strong></td><td>序列 → 序列</td><td>機器翻譯、摘要、問答</td></tr>
<tr><td><strong>LDA（Latent Dirichlet Allocation）</strong></td><td>每份文件的主題</td><td>主題建模、文件分類</td></tr>
<tr><td><strong>NTM（Neural Topic Model）</strong></td><td>潛在表示</td><td>神經網路主題建模</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> <strong>BlazingText</strong>有2種模式：(1) <code>Word2Vec</code>模式 — 非監督式，產生詞嵌入；(2) <code>Text Classification</code>模式 — 監督式，類似FastText。閱讀問題時需明確區分。</p>
</blockquote>

<h2 id="unsupervised-algorithms"><strong>4. 非監督式學習演算法</strong></h2>

<table>
<thead><tr><th>演算法</th><th>問題類型</th><th>使用情境</th></tr></thead>
<tbody>
<tr><td><strong>K-Means</strong></td><td>分群</td><td>客戶分群、文件分組</td></tr>
<tr><td><strong>PCA（主成分分析）</strong></td><td>維度縮減</td><td>高維數據、特徵壓縮</td></tr>
<tr><td><strong>Random Cut Forest (RCF)</strong></td><td>異常檢測</td><td>欺詐檢測、IoT異常、時間序列異常</td></tr>
<tr><td><strong>IP Insights</strong></td><td>異常檢測</td><td>異常IP-實體關係檢測、安全</td></tr>
</tbody>
</table>

<h2 id="computer-vision"><strong>5. 電腦視覺演算法</strong></h2>

<table>
<thead><tr><th>演算法</th><th>任務</th><th>輸出</th></tr></thead>
<tbody>
<tr><td><strong>Image Classification</strong></td><td>多類別分類</td><td>類別標籤 + 信心度</td></tr>
<tr><td><strong>Object Detection</strong></td><td>物體定位 + 分類</td><td>邊界框 + 標籤</td></tr>
<tr><td><strong>Semantic Segmentation</strong></td><td>像素級分類</td><td>分割遮罩</td></tr>
</tbody>
</table>

<h2 id="algorithm-decision"><strong>6. 演算法選擇決策樹</strong></h2>

<pre><code class="language-text">What is the problem type?
│
├── Tabular data, classification/regression?
│   └── XGBoost (best general choice)
│
├── Sparse features, recommendation, ad CTR?
│   └── Factorization Machines
│
├── Time series forecasting (multiple related series)?
│   └── DeepAR
│
├── Anomaly detection on time series / IoT?
│   └── Random Cut Forest (RCF)
│
├── Text classification / sentiment?
│   └── BlazingText (supervised mode)
│
├── Sequence-to-sequence (translation / summarization)?
│   └── Seq2Seq
│
├── Topic modeling?
│   └── LDA or NTM
│
├── Clustering?
│   └── K-Means
│
├── Dimensionality reduction?
│   └── PCA
│
└── Image tasks?
    ├── Classification only → Image Classification
    ├── Locate objects → Object Detection
    └── Pixel mask → Semantic Segmentation
</code></pre>

<h2 id="training-modes"><strong>7. 訓練輸入模式</strong></h2>

<table>
<thead><tr><th>模式</th><th>運作方式</th><th>最適用途</th></tr></thead>
<tbody>
<tr><td><strong>File Mode</strong></td><td>開始前將整個數據集下載至訓練執行個體</td><td>中小型數據集</td></tr>
<tr><td><strong>Pipe Mode</strong></td><td>訓練期間直接從S3串流數據</td><td>超大型數據集 — 無磁碟瓶頸</td></tr>
<tr><td><strong>FastFile Mode</strong></td><td>透過FUSE像本地檔案系統般存取S3</td><td>隨機存取模式</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> 當問到「縮短大型數據集的訓練時間」時，答案通常是切換至<strong>Pipe Mode</strong>和<strong>RecordIO格式</strong>。Pipe Mode不需要下載整個數據集，直接從S3串流。</p>
</blockquote>

<h2 id="cheat-sheet"><strong>8. 速查表 — 快速參考</strong></h2>

<table>
<thead><tr><th>問題關鍵字</th><th>演算法</th></tr></thead>
<tbody>
<tr><td>「表格數據」「結構化數據」</td><td>XGBoost</td></tr>
<tr><td>「時間序列」「預測」</td><td>DeepAR</td></tr>
<tr><td>「異常檢測」</td><td>Random Cut Forest</td></tr>
<tr><td>「推薦」「稀疏特徵」</td><td>Factorization Machines</td></tr>
<tr><td>「文本分類」「情感分析」</td><td>BlazingText（監督式模式）</td></tr>
<tr><td>「詞嵌入」</td><td>BlazingText（Word2Vec模式）</td></tr>
<tr><td>「翻譯」「摘要」</td><td>Seq2Seq</td></tr>
<tr><td>「主題建模」</td><td>LDA或NTM</td></tr>
<tr><td>「分群」「區隔」</td><td>K-Means</td></tr>
<tr><td>「維度縮減」</td><td>PCA</td></tr>
<tr><td>「邊界框」「物體檢測」</td><td>Object Detection</td></tr>
<tr><td>「像素級」「分割遮罩」</td><td>Semantic Segmentation</td></tr>
<tr><td>「IP位址異常」「異常登入」</td><td>IP Insights</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>9. 練習題</strong></h2>

<p><strong>Q1:</strong> 一家零售企業想要預測5,000個產品類別未來30天的需求。最佳的SageMaker演算法是哪個？</p>
<ul>
<li>A) K-Means</li>
<li>B) Linear Learner</li>
<li>C) DeepAR ✓</li>
<li>D) Seq2Seq</li>
</ul>
<p><em>解析：DeepAR專門設計用於跨多個相關時間序列的預測。它同時從所有5,000個序列學習全域模式，並提供機率預測。</em></p>

<p><strong>Q2:</strong> IoT系統監控伺服器CPU使用率。團隊想要自動檢測異常峰值。應該使用哪個SageMaker內建演算法？</p>
<ul>
<li>A) XGBoost</li>
<li>B) Random Cut Forest ✓</li>
<li>C) BlazingText</li>
<li>D) PCA</li>
</ul>
<p><em>解析：Random Cut Forest（RCF）是SageMaker的內建異常檢測演算法。它為每個數據點分配異常分數，適合檢測CPU使用率峰值等時間序列異常。</em></p>

<p><strong>Q3:</strong> 數據科學家正在使用500GB的數據集訓練模型。數據下載至訓練執行個體的時間過長，導致訓練非常緩慢。哪項變更最能改善效能？</p>
<ul>
<li>A) 從CSV切換為JSON格式</li>
<li>B) 增加訓練執行個體大小</li>
<li>C) 切換至Pipe Mode和RecordIO-protobuf格式 ✓</li>
<li>D) 增加訓練epoch數</li>
</ul>
<p><em>解析：Pipe Mode在訓練期間直接從S3串流數據，無需預下載，消除了大型數據集的I/O瓶頸。搭配RecordIO-protobuf格式可大幅縮短啟動時間。</em></p>
