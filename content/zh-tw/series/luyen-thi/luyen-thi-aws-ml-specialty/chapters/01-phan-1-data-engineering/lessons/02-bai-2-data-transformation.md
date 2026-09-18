---
id: 621b7555-2901-469d-8b0b-a800506c8212
title: '第2課：數據轉換與特徵工程'
slug: bai-2-data-transformation
description: >-
  SageMaker Processing Jobs進行數據準備。SageMaker Feature Store。
  缺失值處理、編碼、正規化、縮放。
  文本預處理、不平衡數據技術。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 2
section_title: "第1部分：數據工程（20%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認證機器學習 - 專業級 考試準備'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai2-feature-engineering.webp" alt="AWS ML Data Transformation Pipeline" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>特徵工程與數據轉換：Glue、SageMaker Data Wrangler、缺失值處理</em></p>
</div>

<h2 id="overview"><strong>1. ML管線中的數據轉換</strong></h2>

<p>在模型訓練之前，原始數據需要經過許多轉換步驟。這就是著名格言「Garbage in, garbage out」的由來。MLS-C01考試經常考察數據處理技術和適當的工具。</p>

<h2 id="processing-jobs"><strong>2. SageMaker Processing Jobs</strong></h2>

<p><strong>SageMaker Processing Jobs</strong>是在臨時運算叢集上執行數據處理腳本（Python、Spark）的託管服務。</p>

<table>
<thead><tr><th>處理器類型</th><th>框架</th><th>使用情境</th></tr></thead>
<tbody>
<tr><td><strong>ScriptProcessor</strong></td><td>自訂Docker容器</td><td>任何自訂腳本</td></tr>
<tr><td><strong>SKLearnProcessor</strong></td><td>scikit-learn</td><td>傳統ML預處理</td></tr>
<tr><td><strong>PySparkProcessor</strong></td><td>Apache Spark</td><td>大規模分散式處理</td></tr>
<tr><td><strong>FrameworkProcessor</strong></td><td>TensorFlow/PyTorch</td><td>深度學習數據準備</td></tr>
</tbody>
</table>

<pre><code class="language-text">SageMaker Processing Job Flow:

S3 (input data)
      ↓
┌─────────────────────┐
│  Processing Job     │
│  (compute cluster)  │
│                     │
│  - Preprocess data  │
│  - Feature engineer │
│  - Split train/test │
└─────────────────────┘
      ↓
S3 (output: train/, validation/, test/)
</code></pre>

<h2 id="missing-values"><strong>3. 缺失值處理</strong></h2>

<table>
<thead><tr><th>策略</th><th>方法</th><th>使用時機</th></tr></thead>
<tbody>
<tr><td><strong>刪除</strong></td><td>刪除行/列</td><td>MCAR、缺失較少（&lt;5%）</td></tr>
<tr><td><strong>均值/中位數填補</strong></td><td>用均值填補</td><td>數值型、MCAR/MAR</td></tr>
<tr><td><strong>眾數填補</strong></td><td>用最頻繁的值填補</td><td>分類型</td></tr>
<tr><td><strong>KNN填補</strong></td><td>使用最近的K個鄰居</td><td>數據有模式且不太大時</td></tr>
<tr><td><strong>基於模型（MICE）</strong></td><td>多重插補法</td><td>複雜的缺失模式</td></tr>
<tr><td><strong>指標特徵</strong></td><td>新增is_missing列</td><td>缺失本身包含資訊時</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> 缺失數據的3種類型：<strong>MCAR</strong>（完全隨機缺失）— 刪除安全；<strong>MAR</strong>（隨機缺失）— 填補合適；<strong>MNAR</strong>（非隨機缺失）— 需要指標特徵或領域知識。</p>
</blockquote>

<h2 id="encoding"><strong>4. 分類變數編碼</strong></h2>

<table>
<thead><tr><th>編碼</th><th>方法</th><th>使用時機</th><th>問題</th></tr></thead>
<tbody>
<tr><td><strong>One-Hot Encoding</strong></td><td>每個類別一個二元列</td><td>名義尺度（無順序）、類別數少</td><td>高基數 → 維度災難</td></tr>
<tr><td><strong>Label Encoding</strong></td><td>0, 1, 2, 3...</td><td>序數尺度（有順序）</td><td>對名義尺度暗示虛假順序</td></tr>
<tr><td><strong>Target Encoding</strong></td><td>每個類別的目標均值</td><td>高基數名義尺度</td><td>不小心會造成數據洩漏風險</td></tr>
<tr><td><strong>Embeddings</strong></td><td>密集向量表示</td><td>文本、高基數</td><td>需要足夠的數據來學習</td></tr>
</tbody>
</table>

<h2 id="scaling"><strong>5. 正規化與縮放</strong></h2>

<table>
<thead><tr><th>技術</th><th>公式</th><th>輸出範圍</th><th>最適用途</th></tr></thead>
<tbody>
<tr><td><strong>Min-Max正規化</strong></td><td>(x - min) / (max - min)</td><td>[0, 1]</td><td>神經網路、距離為基礎</td></tr>
<tr><td><strong>標準化（Z-score）</strong></td><td>(x - mean) / std</td><td>Mean=0, SD=1</td><td>線性模型、SVM、PCA</td></tr>
<tr><td><strong>Robust Scaler</strong></td><td>(x - median) / IQR</td><td>中心化</td><td>有離群值時</td></tr>
<tr><td><strong>對數轉換</strong></td><td>log(x)</td><td>壓縮</td><td>偏斜分佈</td></tr>
</tbody>
</table>

<h2 id="imbalanced"><strong>6. 不平衡數據處理</strong></h2>

<p>類別不平衡（例如：欺詐檢測中99%正常、1%欺詐）會使模型偏向多數類別。</p>

<table>
<thead><tr><th>技術</th><th>方法</th><th>方向</th></tr></thead>
<tbody>
<tr><td><strong>過採樣</strong></td><td>複製少數類別樣本</td><td>↑ 少數類別</td></tr>
<tr><td><strong>SMOTE</strong></td><td>合成少數過採樣 — 產生合成樣本</td><td>↑ 少數類別</td></tr>
<tr><td><strong>欠採樣</strong></td><td>刪除多數類別樣本</td><td>↓ 多數類別</td></tr>
<tr><td><strong>類別權重</strong></td><td>對少數類別的誤分類施加更重的懲罰</td><td>不改變數據</td></tr>
<tr><td><strong>集成方法</strong></td><td>BalancedBagging、EasyEnsemble</td><td>演算法層級</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> 不平衡數據適用的指標：<strong>F1分數、AUC-ROC、Precision-Recall</strong> — 不要使用Accuracy（會誤導）。AWS SageMaker Clarify可檢測類別不平衡。</p>
</blockquote>

<h2 id="feature-store"><strong>7. SageMaker Feature Store</strong></h2>

<p><strong>SageMaker Feature Store</strong>是儲存、共享和重複使用ML特徵的集中式儲存庫。</p>

<pre><code class="language-text">Feature Store Architecture:

          Feature Groups
         ┌──────────────────────────────┐
         │  user_features               │
         │  ┌──────┬────────┬────────┐  │
         │  │ id   │ age    │ recency│  │
         │  └──────┴────────┴────────┘  │
         └──────────────────────────────┘
               ↓ writes              ↑ reads
    ┌──────────────────┐   ┌──────────────────┐
    │  Offline Store   │   │  Online Store    │
    │  (S3 - training) │   │  (DynamoDB -     │
    │  batch reads     │   │  low-latency     │
    │                  │   │  inference)      │
    └──────────────────┘   └──────────────────┘
</code></pre>

<h2 id="cheat-sheet"><strong>8. 速查表 — 特徵工程</strong></h2>

<table>
<thead><tr><th>問題</th><th>解決方案</th></tr></thead>
<tbody>
<tr><td>高基數的分類變數</td><td>Target Encoding或Embeddings</td></tr>
<tr><td>缺失值（數值）</td><td>中位數填補 + 指標特徵</td></tr>
<tr><td>偏斜分佈</td><td>對數轉換或Box-Cox</td></tr>
<tr><td>離群值</td><td>Robust Scaler或裁剪/Winsorize</td></tr>
<tr><td>不平衡類別</td><td>SMOTE + 類別權重 + AUC指標</td></tr>
<tr><td>團隊間特徵重複使用</td><td>SageMaker Feature Store</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>9. 練習題</strong></h2>

<p><strong>Q1:</strong> 欺詐檢測數據集中98%為陰性（非欺詐）、2%為陽性（欺詐）。最適合用於模型評估的指標是哪個？</p>
<ul>
<li>A) Accuracy</li>
<li>B) R-squared</li>
<li>C) AUC-ROC ✓</li>
<li>D) Mean Absolute Error</li>
</ul>
<p><em>解析：Accuracy對不平衡數據會產生誤導（全部預測為陰性也能達到98% Accuracy）。AUC-ROC在所有閾值下衡量模型區分類別的能力，是不平衡分類的理想指標。</em></p>

<p><strong>Q2:</strong> 哪種技術通過產生合成樣本來解決類別不平衡？</p>
<ul>
<li>A) 隨機欠採樣</li>
<li>B) SMOTE（Synthetic Minority Oversampling Technique） ✓</li>
<li>C) 類別權重</li>
<li>D) 特徵縮放</li>
</ul>
<p><em>解析：SMOTE通過在現有少數類別樣本之間進行插值來建立新的合成樣本，而非簡單複製。</em></p>

<p><strong>Q3:</strong> 一家公司希望在訓練管線和即時推論服務之間共享工程特徵。哪個SageMaker功能可以實現？</p>
<ul>
<li>A) SageMaker Processing Jobs</li>
<li>B) SageMaker Experiments</li>
<li>C) SageMaker Feature Store ✓</li>
<li>D) SageMaker Data Wrangler</li>
</ul>
<p><em>解析：SageMaker Feature Store提供離線儲存（S3、用於批次訓練）和線上儲存（DynamoDB後端、用於低延遲即時推論），確保訓練和服務之間特徵的一致性。</em></p>
