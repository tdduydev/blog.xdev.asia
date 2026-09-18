---
id: 019c9619-lt01-d1-l01
title: '第1課：AI、ML與深度學習 — 概念與術語'
slug: bai-1-ai-ml-deep-learning-concepts
description: >-
  AI vs ML vs DL。監督式、非監督式、強化學習。
  分類、迴歸、聚類。神經網路基礎。
  訓練集、驗證集、測試集。偏差-方差權衡。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: "領域1：AI與ML基礎（20%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS AI Practitioner（AIF-C01）認證備考'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai1-ai-ml-dl-hierarchy.webp" alt="AI、ML與深度學習層次結構" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>AI、ML與深度學習 — 巢狀關係與三大機器學習範式</em></p>
</div>

<h2 id="overview"><strong>領域1概覽</strong></h2>

<p>領域1佔<strong>AIF-C01考試的20%</strong>。您需要理解AI、ML和深度學習的基礎概念 — 不需要編程，但必須能區分何時使用哪種方法。</p>

<blockquote>
<p><strong>考試提示：</strong>此領域經常出現「哪種機器學習類型最適合...」這類問題 — 要求您為給定的使用案例選擇正確的範式。</p>
</blockquote>

<h2 id="ai-vs-ml-vs-dl"><strong>1. AI vs 機器學習 vs 深度學習</strong></h2>

<p>這三個概念具有巢狀關係：</p>

<pre><code class="language-text">┌─────────────────────────────────────────────┐
│  人工智慧（AI）                               │
│  「模擬人類智慧的機器」                         │
│  ┌───────────────────────────────────────┐   │
│  │  機器學習（ML）                        │   │
│  │  「無需明確程式設計即可從資料中學習」      │   │
│  │  ┌─────────────────────────────────┐  │   │
│  │  │  深度學習（DL）                  │  │   │
│  │  │  「具有多層的神經網路」            │  │   │
│  │  └─────────────────────────────────┘  │   │
│  └───────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
</code></pre>

<table>
<thead><tr><th>概念</th><th>定義</th><th>範例</th></tr></thead>
<tbody>
<tr><td><strong>AI</strong></td><td>廣義領域 — 機器執行通常需要人類智慧的任務</td><td>聊天機器人、自動駕駛車、棋盤引擎</td></tr>
<tr><td><strong>ML</strong></td><td>AI的子集 — 演算法從資料中學習模式</td><td>垃圾郵件過濾器、推薦引擎</td></tr>
<tr><td><strong>DL</strong></td><td>ML的子集 — 具有多層的神經網路</td><td>影像辨識、語言翻譯</td></tr>
</tbody>
</table>

<h3 id="key-differences"><strong>考試關鍵區別</strong></h3>

<ul>
<li><strong>傳統程式設計</strong>：規則 + 資料 → 輸出</li>
<li><strong>機器學習</strong>：資料 + 輸出 → 規則（模型學習規則）</li>
<li><strong>深度學習</strong>：自動從原始資料中提取特徵（無需手動特徵工程）</li>
</ul>

<h2 id="ml-paradigms"><strong>2. 三大ML範式</strong></h2>

<h3 id="supervised-learning"><strong>2.1. 監督式學習</strong></h3>

<p>模型從<strong>標記資料</strong>中學習 — 每個輸入都帶有正確的輸出（標籤/目標）。</p>

<table>
<thead><tr><th>任務類型</th><th>輸出</th><th>使用案例</th><th>演算法</th></tr></thead>
<tbody>
<tr><td><strong>分類</strong></td><td>離散類別</td><td>垃圾郵件 vs 非垃圾郵件、欺詐偵測</td><td>邏輯迴歸、隨機森林、SVM</td></tr>
<tr><td><strong>迴歸</strong></td><td>連續數值</td><td>房價預測、股票預測</td><td>線性迴歸、XGBoost</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong>如果題目說「預測類別」或「分類」→ <strong>分類</strong>。如果說「預測數值」→ <strong>迴歸</strong>。</p>
</blockquote>

<h3 id="unsupervised-learning"><strong>2.2. 非監督式學習</strong></h3>

<p>模型從<strong>未標記資料</strong>中學習 — 自行發現資料中的模式和結構。</p>

<table>
<thead><tr><th>任務類型</th><th>功能</th><th>使用案例</th></tr></thead>
<tbody>
<tr><td><strong>聚類</strong></td><td>將相似的資料點分組</td><td>客戶分群、文件分組</td></tr>
<tr><td><strong>降維</strong></td><td>在保留資訊的同時減少特徵</td><td>資料視覺化、雜訊減少</td></tr>
<tr><td><strong>異常偵測</strong></td><td>發現不尋常的資料點</td><td>欺詐偵測、設備故障</td></tr>
<tr><td><strong>關聯</strong></td><td>發現項目之間的規則</td><td>「買了X的客戶也買了Y」</td></tr>
</tbody>
</table>

<h3 id="reinforcement-learning"><strong>2.3. 強化學習（RL）</strong></h3>

<p>代理在環境中通過<strong>試錯</strong>學習。每個行動獲得<strong>獎勵</strong>（正面）或<strong>懲罰</strong>（負面）。</p>

<pre><code class="language-text">代理 → 行動 → 環境 → 狀態 + 獎勵 → 代理（循環）
</code></pre>

<p><strong>使用案例：</strong></p>
<ul>
<li>遊戲AI（AlphaGo）</li>
<li>機器人導航</li>
<li>自動駕駛</li>
<li>AWS DeepRacer（自動駕駛車模擬）</li>
</ul>

<h3 id="choosing-paradigm"><strong>2.4. 選擇正確的範式 — 考試決策樹</strong></h3>

<pre><code class="language-text">您有標記資料嗎？
├── 是 → 監督式學習
│   ├── 預測類別？→ 分類
│   └── 預測數值？→ 迴歸
├── 否 →
│   ├── 想尋找分組/模式？→ 非監督式學習（聚類）
│   └── 通過試錯學習？→ 強化學習
</code></pre>

<h2 id="data-concepts"><strong>3. ML的資料概念</strong></h2>

<h3 id="data-types"><strong>3.1. 資料類型</strong></h3>

<table>
<thead><tr><th>類型</th><th>描述</th><th>範例</th></tr></thead>
<tbody>
<tr><td><strong>結構化</strong></td><td>組織成行列（表格式）</td><td>CSV、資料庫表格、試算表</td></tr>
<tr><td><strong>半結構化</strong></td><td>有一定組織但靈活</td><td>JSON、XML、日誌檔案</td></tr>
<tr><td><strong>非結構化</strong></td><td>無預定義格式</td><td>影像、影片、音訊、自由文字</td></tr>
<tr><td><strong>時間序列</strong></td><td>按時間索引的資料點</td><td>股價、IoT感測器讀數</td></tr>
</tbody>
</table>

<h3 id="labeled-unlabeled"><strong>3.2. 標記 vs 未標記資料</strong></h3>

<ul>
<li><strong>標記資料</strong>：每個資料點都有對應的答案（標籤）。範例：郵件 + 標記「垃圾郵件」/「非垃圾郵件」。用於<strong>監督式學習</strong>。</li>
<li><strong>未標記資料</strong>：只有資料，沒有標籤。用於<strong>非監督式學習</strong>。</li>
<li><strong>Amazon SageMaker Ground Truth</strong>：幫助標記資料的AWS服務（人工 + ML輔助標記）。</li>
</ul>

<h3 id="datasets"><strong>3.3. 訓練集、驗證集、測試集</strong></h3>

<pre><code class="language-text">┌────────────────────────────────────────────────┐
│              完整資料集 (100%)                    │
├──────────────────┬──────────┬──────────────────┤
│  訓練集 (70%)     │ 驗證(15%)│   測試集 (15%)    │
│  模型從此資料      │ 調整     │ 最終評估          │
│  中學習           │ 超參數   │ （訓練中從未見過）  │
└──────────────────┴──────────┴──────────────────┘
</code></pre>

<ul>
<li><strong>訓練集</strong>：模型從此資料中學習模式</li>
<li><strong>驗證集</strong>：用於調整超參數和防止過擬合</li>
<li><strong>測試集</strong>：最終評估 — 模型從未見過此資料</li>
</ul>

<h2 id="neural-networks"><strong>4. 神經網路基礎</strong></h2>

<h3 id="nn-architecture"><strong>4.1. 架構</strong></h3>

<pre><code class="language-text">輸入層 → 隱藏層 → 輸出層
    x₁ ──┐     ┌── h₁ ──┐
    x₂ ──┼─────┼── h₂ ──┼──── ŷ（預測）
    x₃ ──┘     └── h₃ ──┘

每個連接都有一個權重 (w)
每個神經元應用一個啟動函數
</code></pre>

<p><strong>關鍵組件：</strong></p>
<ul>
<li><strong>權重</strong>：模型在訓練期間學習的參數</li>
<li><strong>偏差</strong>：用於移動啟動函數的額外參數</li>
<li><strong>啟動函數</strong>：ReLU、Sigmoid、Softmax — 引入非線性</li>
<li><strong>損失函數</strong>：衡量模型預測的錯誤程度</li>
<li><strong>優化器</strong>：更新權重以最小化損失（如SGD、Adam）</li>
</ul>

<h3 id="nn-types"><strong>4.2. 神經網路類型</strong></h3>

<table>
<thead><tr><th>類型</th><th>最適用於</th><th>AWS服務</th></tr></thead>
<tbody>
<tr><td><strong>CNN</strong>（卷積神經網路）</td><td>影像、影片</td><td>Amazon Rekognition</td></tr>
<tr><td><strong>RNN/LSTM</strong>（循環神經網路）</td><td>序列資料、時間序列</td><td>Amazon Forecast</td></tr>
<tr><td><strong>Transformer</strong></td><td>NLP、文字生成</td><td>Amazon Bedrock（LLM）</td></tr>
<tr><td><strong>GAN</strong>（生成對抗網路）</td><td>生成新資料（影像）</td><td>—</td></tr>
</tbody>
</table>

<h2 id="model-evaluation"><strong>5. 模型評估概念</strong></h2>

<h3 id="overfitting-underfitting"><strong>5.1. 過擬合 vs 欠擬合</strong></h3>

<table>
<thead><tr><th>問題</th><th>訓練準確率</th><th>測試準確率</th><th>原因</th><th>解決方案</th></tr></thead>
<tbody>
<tr><td><strong>過擬合</strong></td><td>非常高</td><td>低</td><td>模型記住了訓練資料</td><td>更多資料、正則化、dropout、早停</td></tr>
<tr><td><strong>欠擬合</strong></td><td>低</td><td>低</td><td>模型太簡單</td><td>更多特徵、更複雜的模型、更長的訓練</td></tr>
<tr><td><strong>良好擬合</strong></td><td>高</td><td>高</td><td>複雜度平衡</td><td>—</td></tr>
</tbody>
</table>

<h3 id="bias-variance"><strong>5.2. 偏差-方差權衡</strong></h3>

<ul>
<li><strong>高偏差</strong> = 欠擬合（模型太簡單，遺漏模式）</li>
<li><strong>高方差</strong> = 過擬合（模型太複雜，對雜訊敏感）</li>
<li>目標：找到偏差與方差之間的<strong>最佳平衡點</strong></li>
</ul>

<h3 id="metrics"><strong>5.3. 常用指標</strong></h3>

<p><strong>分類指標：</strong></p>
<table>
<thead><tr><th>指標</th><th>公式</th><th>何時使用</th></tr></thead>
<tbody>
<tr><td><strong>準確率</strong></td><td>(TP + TN) / 總數</td><td>類別平衡</td></tr>
<tr><td><strong>精確率</strong></td><td>TP / (TP + FP)</td><td>「不要將正常郵件標記為垃圾郵件」</td></tr>
<tr><td><strong>召回率</strong></td><td>TP / (TP + FN)</td><td>「不要遺漏任何欺詐」</td></tr>
<tr><td><strong>F1分數</strong></td><td>2 × (P × R) / (P + R)</td><td>類別不平衡</td></tr>
<tr><td><strong>AUC-ROC</strong></td><td>ROC曲線下面積</td><td>整體二元分類</td></tr>
</tbody>
</table>

<p><strong>迴歸指標：</strong></p>
<ul>
<li><strong>RMSE</strong>（均方根誤差）：懲罰大的誤差</li>
<li><strong>MAE</strong>（平均絕對誤差）：平均誤差幅度</li>
<li><strong>R²</strong>：模型解釋方差的能力（1.0 = 完美）</li>
</ul>

<h2 id="key-terms"><strong>6. 關鍵術語速查表</strong></h2>

<table>
<thead><tr><th>術語</th><th>定義（考試用）</th></tr></thead>
<tbody>
<tr><td><strong>特徵</strong></td><td>用於預測的輸入變數（資料中的欄位）</td></tr>
<tr><td><strong>標籤/目標</strong></td><td>我們希望模型預測的答案</td></tr>
<tr><td><strong>超參數</strong></td><td>訓練前配置的設定（學習率、epoch數）</td></tr>
<tr><td><strong>參數</strong></td><td>模型在訓練期間學習的值（權重、偏差）</td></tr>
<tr><td><strong>Epoch</strong></td><td>對整個訓練資料集的一次完整遍歷</td></tr>
<tr><td><strong>批次大小</strong></td><td>更新權重前處理的樣本數</td></tr>
<tr><td><strong>推論</strong></td><td>使用訓練好的模型對新資料進行預測</td></tr>
<tr><td><strong>遷移學習</strong></td><td>使用預訓練模型並將其適應到新任務</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>7. 練習題</strong></h2>

<p><strong>Q1：</strong>一家公司想要預測客戶是否會取消訂閱（是/否）。哪種ML方法最合適？</p>
<ul>
<li>A) 非監督式學習 — 聚類</li>
<li>B) 監督式學習 — 迴歸</li>
<li>C) 監督式學習 — 分類 ✓</li>
<li>D) 強化學習</li>
</ul>
<p><em>解說：使用標記的歷史資料預測二元結果（是/否）= 監督式分類。</em></p>

<p><strong>Q2：</strong>一家零售公司有客戶購買資料，但沒有預定義的分組。他們想將客戶分為幾個群組以進行精準行銷。應該使用哪種方法？</p>
<ul>
<li>A) 監督式學習 — 分類</li>
<li>B) 非監督式學習 — 聚類 ✓</li>
<li>C) 強化學習</li>
<li>D) 監督式學習 — 迴歸</li>
</ul>
<p><em>解說：沒有標籤 + 尋找資料中的自然分組 = 非監督式聚類。</em></p>

<p><strong>Q3：</strong>一個模型在訓練資料上表現極好（99%準確率），但在新資料上表現不佳（65%準確率）。這叫什麼？</p>
<ul>
<li>A) 欠擬合</li>
<li>B) 過擬合 ✓</li>
<li>C) 高偏差</li>
<li>D) 正則化</li>
</ul>
<p><em>解說：高訓練準確率 + 低測試準確率 = 過擬合（模型記住了訓練資料）。</em></p>
