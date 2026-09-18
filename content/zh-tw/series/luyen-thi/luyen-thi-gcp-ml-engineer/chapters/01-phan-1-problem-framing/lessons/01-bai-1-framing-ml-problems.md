---
id: 019c9619-lt03-l01
title: '第1課：ML問題框架 — 監督式、非監督式、強化學習'
slug: bai-1-framing-ml-problems
description: >-
  如何判斷問題是否需要ML。選擇正確的模型類型。
  商業指標 vs ML指標。資料可用性評估。
  Google的ML最佳實踐。
duration_minutes: 50
is_free: true
video_url: null
sort_order: 1
section_title: "領域1：ML問題框架與架構"
course:
  id: 019c9619-lt03-7003-c003-lt0300000003
  title: 'Google Cloud Professional Machine Learning Engineer 考試準備'
  slug: luyen-thi-gcp-ml-engineer
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/gcp-mle-bai1-problem-framing.webp" alt="ML Problem Framing Framework" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>ML問題框架：確定問題、選擇模型類型、依照Google標準定義指標</em></p>
</div>

<h2 id="when-to-use-ml"><strong>1. 何時需要使用ML？</strong></h2>

<p>Google ML認證考試經常考察<strong>問題框架</strong>——即判斷問題是否適合應用ML，如果適合則應使用哪種類型的ML。這是專業ML工程師的重要技能。</p>

<table>
<thead><tr><th>需要提出的問題</th><th>如果「是」</th><th>如果「否」</th></tr></thead>
<tbody>
<tr><td>資料中是否有複雜模式？</td><td>ML可以幫助</td><td>規則式邏輯就足夠了</td></tr>
<tr><td>是否有足夠的資料（標籤）？</td><td>監督式學習</td><td>非監督式學習，或收集更多資料</td></tr>
<tr><td>輸出是否可以明確定義？</td><td>監督式ML</td><td>需要與利害關係人確認需求</td></tr>
<tr><td>問題是否需要代理與環境互動？</td><td>強化學習</td><td>監督式/非監督式學習</td></tr>
</tbody>
</table>

<h2 id="ml-types"><strong>2. ML的類型與使用時機</strong></h2>

<pre><code class="language-text">Problem Framing Decision Tree:

Has labeled training data?
    YES → Supervised Learning
           ├── Output is category? → Classification
           └── Output is number? → Regression

    NO → Has examples, no labels?
           YES → Unsupervised Learning
                  ├── Find groups? → Clustering
                  └── Find patterns/anomalies? → Density estimation
           NO → Agent in environment?
                  YES → Reinforcement Learning
                  NO → Reconsider problem definition
</code></pre>

<table>
<thead><tr><th>ML類型</th><th>使用場景</th><th>GCP服務</th></tr></thead>
<tbody>
<tr><td><strong>監督式分類</strong></td><td>電子郵件垃圾郵件、影像標籤、客戶流失預測</td><td>Vertex AI AutoML、BigQuery ML</td></tr>
<tr><td><strong>監督式迴歸</strong></td><td>價格預測、需求預測</td><td>Vertex AI、BigQuery ML BQML_REGRESSOR</td></tr>
<tr><td><strong>非監督式聚類</strong></td><td>客戶分群、主題發現</td><td>Vertex AI Custom Training（k-means）</td></tr>
<tr><td><strong>強化學習</strong></td><td>遊戲代理、機器人、廣告競價</td><td>Vertex AI + 自訂環境</td></tr>
<tr><td><strong>自監督式學習</strong></td><td>LLM、基礎模型</td><td>Vertex AI Model Garden</td></tr>
</tbody>
</table>

<h2 id="business-vs-ml-metrics"><strong>3. 商業指標 vs. ML指標</strong></h2>

<p>最常見的錯誤之一是<strong>最佳化了錯誤的指標</strong>。ML目標必須與商業目標一致。</p>

<table>
<thead><tr><th>商業目標</th><th>錯誤的ML指標</th><th>正確的ML指標</th></tr></thead>
<tbody>
<tr><td>減少詐欺造成的營收損失</td><td>Accuracy（99%!）</td><td>Recall（捕捉更多詐欺）</td></tr>
<tr><td>減少垃圾郵件影響使用者體驗</td><td>Recall</td><td>Precision（減少誤判）</td></tr>
<tr><td>庫存需求預測</td><td>MSE</td><td>MAPE（不受規模影響）</td></tr>
<tr><td>搜尋結果中的商品排名</td><td>Accuracy</td><td>NDCG、MRR（排名指標）</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> Professional ML Engineer考試常問「哪個指標最符合商業目標」。看到詐欺檢測/醫療診斷 → Recall。看到垃圾郵件/精確度重要 → Precision。看到類別不平衡 → F1或AUC-ROC。</p>
</blockquote>

<h2 id="data-assessment"><strong>4. 資料可用性評估</strong></h2>

<table>
<thead><tr><th>資料狀況</th><th>ML方法</th></tr></thead>
<tbody>
<tr><td>大量標籤資料</td><td>完全監督式學習，從頭訓練</td></tr>
<tr><td>少量標籤資料（少於1000筆）</td><td><strong>遷移學習</strong>（預訓練模型 + 微調）</td></tr>
<tr><td>沒有標籤</td><td>非監督式學習，或收集標籤（Vertex AI Data Labeling）</td></tr>
<tr><td>標籤成本高</td><td><strong>主動學習</strong> — 優先標註不確定的樣本</td></tr>
<tr><td>資料不平衡</td><td>過取樣、欠取樣、類別權重</td></tr>
</tbody>
</table>

<h2 id="google-ml-practices"><strong>5. Google的ML最佳實踐</strong></h2>

<ul>
<li><strong>從簡單開始</strong>：從最簡單的模型開始，然後逐步增加複雜度</li>
<li><strong>建立基準線</strong>：使用ML之前先與啟發式/規則進行比較</li>
<li><strong>資料品質優先</strong>：ML專案80%的時間花在資料準備上</li>
<li><strong>可重現性</strong>：管線必須能以相同資料重現結果</li>
<li><strong>生產環境監控</strong>：模型隨時間衰退 — 需要持續監控</li>
</ul>

<h2 id="practice"><strong>6. 練習題</strong></h2>

<p><strong>Q1：</strong> 一家公司想要找出未來30天內最可能取消訂閱的客戶。他們有3年的客戶行為歷史資料，其中包含已知的流失事件。應該使用哪種ML方法？</p>
<ul>
<li>A) 非監督式聚類來發現客戶群組</li>
<li>B) 強化學習來最佳化留存活動</li>
<li>C) 使用歷史流失標籤的監督式二元分類 ✓</li>
<li>D) 異常偵測來發現異常行為</li>
</ul>
<p><em>解說：這是典型的監督式分類問題（流失 = 是/否）。具有已知結果（流失/未流失）的歷史資料提供了標籤。聚類無法預測個別的流失機率。強化學習適用於序列決策，而非預測。</em></p>

<p><strong>Q2：</strong> 醫療影像ML模型在測試資料上達到98%的準確率，但業務團隊不滿意。任務是偵測罕見的癌細胞（盛行率1%）。最可能的問題是什麼？</p>
<ul>
<li>A) 模型對訓練資料過擬合</li>
<li>B) Accuracy是錯誤的指標 — 模型可能對所有情況都預測「無癌症」 ✓</li>
<li>C) 模型需要更多訓練迭代</li>
<li>D) 測試資料集太小</li>
</ul>
<p><em>解說：盛行率僅1%時，一個總是預測「無癌症」的模型也能達到99%的Accuracy，但Recall為0% — 它漏掉了所有癌症病例。對於罕見類別問題，Recall（敏感度）才是關鍵指標，而非Accuracy。</em></p>

<p><strong>Q3：</strong> 一個新創公司有500張標籤商品影像用於新的自訂分類任務。最合適的訓練方法是哪個？</p>
<ul>
<li>A) 用500張影像從頭訓練深度學習CNN</li>
<li>B) 對影像中繼資料使用AutoML Tabular</li>
<li>C) 使用預訓練影像模型進行遷移學習 ✓</li>
<li>D) 因為資料集太小所以使用K-Means聚類</li>
</ul>
<p><em>解說：僅有500個標籤範例時，從頭訓練會嚴重過擬合。遷移學習重複使用在數百萬張影像（如ImageNet）上預訓練的模型特徵，大幅減少在新任務上達到良好準確率所需的資料量。</em></p>
