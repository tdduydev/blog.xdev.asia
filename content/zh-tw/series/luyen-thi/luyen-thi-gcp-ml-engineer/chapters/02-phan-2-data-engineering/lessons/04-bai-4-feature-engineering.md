---
id: 019c9619-lt03-l04
title: '第4課：特徵工程與Vertex AI Feature Store'
slug: bai-4-feature-engineering
description: >-
  特徵工程技術。BigQuery進行特徵計算。
  Vertex AI Feature Store：線上/離線服務。
  特徵監控、訓練/推論間的一致性。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 4
section_title: "領域2：資料工程與特徵工程"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer 考試準備'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai4-feature-store.webp" alt="Vertex AI Feature Store" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>特徵工程與Vertex AI Feature Store：為ML建立、儲存與重複使用特徵</em></p>
</div>

<h2 id="feature-engineering"><strong>1. 特徵工程技術</strong></h2>

<table>
<thead><tr><th>技術</th><th>使用時機</th><th>範例</th></tr></thead>
<tbody>
<tr><td><strong>正規化（Min-Max）</strong></td><td>需要有界範圍（0-1）</td><td>影像像素、機率</td></tr>
<tr><td><strong>標準化（Z分數）</strong></td><td>接近常態分佈、無界限</td><td>客戶年齡、交易金額</td></tr>
<tr><td><strong>對數轉換</strong></td><td>偏態分佈（價格、薪資）</td><td>住宅的Log(price)</td></tr>
<tr><td><strong>One-Hot編碼</strong></td><td>名目類別（無順序）</td><td>國家、品牌、顏色</td></tr>
<tr><td><strong>標籤編碼</strong></td><td>有序類別（有順序）</td><td>Low/Medium/High → 0/1/2</td></tr>
<tr><td><strong>特徵交叉</strong></td><td>捕捉特徵間的交互作用</td><td>city × day_of_week</td></tr>
<tr><td><strong>桶化</strong></td><td>將連續值轉換為類別</td><td>Age → age_group</td></tr>
<tr><td><strong>嵌入</strong></td><td>高基數類別</td><td>UserID、ProductID</td></tr>
</tbody>
</table>

<h2 id="missing-values"><strong>2. 缺失值處理</strong></h2>

<table>
<thead><tr><th>策略</th><th>使用時機</th></tr></thead>
<tbody>
<tr><td><strong>平均值/中位數填補</strong></td><td>數值型、缺失率低</td></tr>
<tr><td><strong>眾數填補</strong></td><td>類別型特徵</td></tr>
<tr><td><strong>基於模型的填補</strong></td><td>缺失率高、複雜模式</td></tr>
<tr><td><strong>指標變數</strong></td><td>缺失本身具有資訊價值（新增is_missing旗標）</td></tr>
<tr><td><strong>刪除列</strong></td><td>目標缺失/受影響的列非常少</td></tr>
<tr><td><strong>刪除欄</strong></td><td>超過80%缺失</td></tr>
</tbody>
</table>

<h2 id="training-serving-skew"><strong>3. 訓練-推論偏移</strong></h2>

<p><strong>訓練-推論偏移</strong>是一個嚴重的問題：特徵在訓練和推論時以不同方式計算，導致模型在生產環境中表現不佳，即使測試指標很好。</p>

<pre><code class="language-text">Training-Serving Skew Example:

TRAINING TIME:
  avg_purchase_last_30d = mean(all purchases in batch)  ← computed over full period

SERVING TIME:
  avg_purchase_last_30d = mean(last 5 purchases)        ← computed differently!

Result: Feature distribution mismatch → poor predictions

SOLUTION: Vertex AI Feature Store
  Same feature serve logic used at training AND serving time
</code></pre>

<h2 id="feature-store"><strong>4. Vertex AI Feature Store</strong></h2>

<table>
<thead><tr><th>元件</th><th>說明</th></tr></thead>
<tbody>
<tr><td><strong>Feature Store</strong></td><td>ML特徵的集中式儲存庫</td></tr>
<tr><td><strong>Entity Type</strong></td><td>追蹤對象的類別（User、Product）</td></tr>
<tr><td><strong>Feature</strong></td><td>實體的命名屬性（user.avg_spend）</td></tr>
<tr><td><strong>Online Store</strong></td><td>低延遲服務（毫秒），用於即時預測</td></tr>
<tr><td><strong>Offline Store</strong></td><td>BigQuery支援，用於批次訓練資料擷取</td></tr>
</tbody>
</table>

<pre><code class="language-text">Vertex AI Feature Store Architecture:

Feature Ingestion (Batch or Streaming)
        ↓
┌──── Feature Store ────────────────┐
│  Offline Store (BigQuery)          │  ← Training data export
│  Online Store (Bigtable-backed)    │  ← Serving (ms latency)
└───────────────────────────────────┘
        ↑ Same features ↑
  Training      Inference
  Pipeline      Endpoint
</code></pre>

<h2 id="bigquery-features"><strong>5. BigQuery進行特徵工程</strong></h2>

<p>BigQuery是GCP上從大型資料集計算聚合特徵的最佳工具。</p>

<table>
<thead><tr><th>特徵模式</th><th>BigQuery方法</th></tr></thead>
<tbody>
<tr><td>滾動視窗聚合</td><td>視窗函數：AVG() OVER (PARTITION BY ... ORDER BY ... ROWS BETWEEN ...)</td></tr>
<tr><td>使用者活動計數</td><td>COUNT() GROUP BY user_id</td></tr>
<tr><td>類別編碼</td><td>CASE WHEN ... 或 ML.ONE_HOT_ENCODE()</td></tr>
<tr><td>雜湊嵌入（高基數）</td><td>FARM_FINGERPRINT() mod N</td></tr>
<tr><td>特徵正規化</td><td>BigQuery ML的ML.STANDARD_SCALER()</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> 「訓練-推論一致性」或「跨多個模型重複使用特徵」→ <strong>Vertex AI Feature Store</strong>。「從BigQuery資料大規模計算特徵」→ BigQuery視窗函數 + 排程查詢。</p>
</blockquote>

<h2 id="feature-monitoring"><strong>6. 特徵漂移監控</strong></h2>

<table>
<thead><tr><th>類型</th><th>什麼改變了</th><th>偵測方法</th></tr></thead>
<tbody>
<tr><td><strong>特徵偏移</strong></td><td>訓練與推論的特徵分佈不同</td><td>比較訓練基準線與推論統計</td></tr>
<tr><td><strong>特徵漂移</strong></td><td>推論特徵隨時間變化</td><td>每日監控推論特徵分佈</td></tr>
<tr><td><strong>標籤漂移</strong></td><td>目標變數分佈改變</td><td>追蹤預測分佈的變化</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. 練習題</strong></h2>

<p><strong>Q1：</strong> 團隊的ML模型在測試期間表現出色，但在生產環境中表現不佳。調查發現，平均購買金額特徵在訓練時（使用歷史批次資料）和推論時（使用即時查詢）的計算方式不同。這個問題叫什麼？應如何解決？</p>
<ul>
<li>A) 模型漂移 — 更頻繁地重新訓練模型</li>
<li>B) 訓練-推論偏移 — 使用Vertex AI Feature Store ✓</li>
<li>C) 資料洩漏 — 移除購買金額特徵</li>
<li>D) 過擬合 — 新增dropout層</li>
</ul>
<p><em>解說：訓練-推論偏移發生在特徵在訓練時和推論時以不同方式計算。Vertex AI Feature Store透過提供特徵計算的單一事實來源來解決此問題，確保訓練資料匯出和線上服務都使用相同的邏輯。</em></p>

<p><strong>Q2：</strong> 某個特徵的值範圍從$10到$10,000,000，分佈嚴重右偏。在線性模型中使用此特徵之前，最合適的轉換是什麼？</p>
<ul>
<li>A) One-Hot編碼</li>
<li>B) Min-Max正規化</li>
<li>C) 對數轉換 ✓</li>
<li>D) 標籤編碼</li>
</ul>
<p><em>解說：對數轉換壓縮高度偏態分佈的尺度，使其更接近常態分佈，適合線性模型。Min-Max正規化仍然保留偏態。One-Hot編碼用於類別資料。</em></p>

<p><strong>Q3：</strong> Vertex AI Feature Store中哪種儲存類型針對以毫秒級延遲向即時預測端點提供特徵進行了最佳化？</p>
<ul>
<li>A) Offline Store（BigQuery）</li>
<li>B) Online Store（Bigtable支援） ✓</li>
<li>C) Feature Catalog</li>
<li>D) Cloud Memorystore</li>
</ul>
<p><em>解說：Vertex AI Feature Store的Online Store由Bigtable支援，專為100毫秒以下的延遲查詢而設計，向即時預測端點提供最新的特徵值。Offline Store使用BigQuery，用於批次訓練資料擷取。</em></p>
