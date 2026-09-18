---
id: 1a81b42d-c09e-43ef-b9f6-3158ca64b6c1
title: '第3課：數據分析與視覺化'
slug: bai-3-data-analysis
description: >-
  SageMaker筆記本上的EDA。SQL分析用Amazon Athena。
  BI儀表板用Amazon QuickSight。數據品質問題檢測。
  類別不平衡、離群值、相關性、數據漂移的檢測。
duration_minutes: 45
is_free: true
video_url: null
sort_order: 3
section_title: "第1部分：數據工程（20%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認證機器學習 - 專業級 考試準備'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai3-eda-data-analysis.webp" alt="Exploratory Data Analysis on AWS" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>EDA與數據分析：描述性統計、離群值檢測、AWS上的特徵相關性</em></p>
</div>

<h2 id="eda"><strong>1. 探索性數據分析（EDA）</strong></h2>

<p><strong>EDA</strong>是建模前了解數據結構、模式和異常的初始分析步驟。SageMaker提供了許多工具來執行大規模EDA。</p>

<h2 id="eda-tools"><strong>2. 數據分析用AWS工具</strong></h2>

<table>
<thead><tr><th>工具</th><th>使用情境</th><th>介面</th></tr></thead>
<tbody>
<tr><td><strong>SageMaker Studio Notebooks</strong></td><td>互動式EDA、Python/R分析</td><td>JupyterLab為基礎的IDE</td></tr>
<tr><td><strong>SageMaker Data Wrangler</strong></td><td>視覺化數據準備、300+轉換、自動洞察</td><td>拖放式GUI</td></tr>
<tr><td><strong>Amazon Athena</strong></td><td>S3數據上的SQL查詢</td><td>SQL主控台</td></tr>
<tr><td><strong>Amazon QuickSight</strong></td><td>BI儀表板、經營報告</td><td>視覺化BI工具</td></tr>
<tr><td><strong>Amazon Redshift</strong></td><td>大規模數據倉儲、SQL分析</td><td>SQL</td></tr>
<tr><td><strong>AWS Glue DataBrew</strong></td><td>無程式碼數據分析與清理配方</td><td>視覺化工具</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> <strong>Data Wrangler</strong> = ML的視覺化數據準備（產生SageMaker Processing程式碼）。<strong>DataBrew</strong> = 數據分析師/BI用途（無ML脈絡）。<strong>QuickSight</strong> = 商業用戶的BI儀表板，非ML。</p>
</blockquote>

<h2 id="data-quality"><strong>3. 數據品質問題</strong></h2>

<table>
<thead><tr><th>問題</th><th>檢測方法</th><th>對模型的影響</th></tr></thead>
<tbody>
<tr><td><strong>缺失值</strong></td><td>Null計數、每列缺失率</td><td>錯誤、偏差結果</td></tr>
<tr><td><strong>離群值</strong></td><td>箱形圖、Z-score > 3、IQR法</td><td>權重偏斜、泛化能力下降</td></tr>
<tr><td><strong>類別不平衡</strong></td><td>類別分佈直方圖</td><td>偏向多數類別</td></tr>
<tr><td><strong>特徵相關性</strong></td><td>相關矩陣、VIF分數</td><td>多重共線性 → 不穩定係數</td></tr>
<tr><td><strong>數據洩漏</strong></td><td>與目標變數異常高相關的特徵</td><td>過高評估、正式環境失敗</td></tr>
<tr><td><strong>分佈偏斜</strong></td><td>直方圖、偏度指標</td><td>違反模型假設</td></tr>
</tbody>
</table>

<h3 id="data-leakage"><strong>3.1. 數據洩漏 — 重要概念</strong></h3>

<p><strong>數據洩漏</strong>是訓練集外的資訊洩漏到特徵中，導致訓練時accuracy很高但正式環境失敗的現象。</p>

<pre><code class="language-text">Common Data Leakage Patterns:

❌ Target leakage:
   Feature "loan_default_flag" → predicting "credit_risk"
   (feature derived from target)

❌ Future data leakage:
   Using tomorrow's stock price to predict today's trade

❌ Train/test contamination:
   Scaling data BEFORE splitting (test mean leaks into train)

✅ Correct approach:
   Split data FIRST → fit scaler on train only → transform both
</code></pre>

<blockquote>
<p><strong>考試提示：</strong> 務必在<strong>轉換前先分割數據</strong>。StandardScaler.fit()僅在訓練集上呼叫，然後transform()應用於訓練集和測試集。在整個數據集上fit+transform就會造成數據洩漏。</p>
</blockquote>

<h2 id="athena"><strong>4. Amazon Athena</strong></h2>

<p>Athena可以直接在S3上執行SQL查詢而無需載入資料庫。<strong>按掃描量計費</strong>，因此使用Parquet + 分區進行最佳化。</p>

<h2 id="quicksight"><strong>5. Amazon QuickSight</strong></h2>

<p>QuickSight是<strong>BI服務</strong>，不是ML工具。主要功能：<strong>SPICE</strong>（記憶體引擎）提供快速儀表板。</p>

<table>
<thead><tr><th>功能</th><th>說明</th></tr></thead>
<tbody>
<tr><td><strong>SPICE</strong></td><td>Super-fast Parallel In-memory Calculation Engine — 快取數據集</td></tr>
<tr><td><strong>ML Insights</strong></td><td>儀表板上的內建異常檢測、預測</td></tr>
<tr><td><strong>Q (NLQ)</strong></td><td>自然語言查詢 — 「顯示上個月各地區的銷售額」</td></tr>
</tbody>
</table>

<h2 id="cheat-sheet"><strong>6. 速查表 — 分析工具</strong></h2>

<table>
<thead><tr><th>情境</th><th>工具</th></tr></thead>
<tbody>
<tr><td>大規模數據的互動式Python EDA</td><td>SageMaker Studio Notebooks</td></tr>
<tr><td>視覺化無程式碼ML數據準備</td><td>SageMaker Data Wrangler</td></tr>
<tr><td>S3數據上的SQL（無伺服器）</td><td>Amazon Athena</td></tr>
<tr><td>商業儀表板和報告</td><td>Amazon QuickSight</td></tr>
<tr><td>大規模數據倉儲SQL</td><td>Amazon Redshift</td></tr>
<tr><td>無程式碼數據分析配方</td><td>AWS Glue DataBrew</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. 練習題</strong></h2>

<p><strong>Q1:</strong> 數據科學家使用整個數據集的均值和標準差來標準化特徵，然後才分割為訓練/測試集。這會導致什麼問題？</p>
<ul>
<li>A) 模型欠擬合</li>
<li>B) 訓練收斂緩慢</li>
<li>C) 測試集統計量洩漏到訓練的數據洩漏 ✓</li>
<li>D) 類別不平衡</li>
</ul>
<p><em>解析：在整個數據集上擬合縮放器會導致數據洩漏，因為測試集的統計量（均值、標準差）會影響訓練數據的轉換。務必僅在訓練數據上擬合轉換器，然後將擬合後的轉換器應用於訓練和測試兩者。</em></p>

<p><strong>Q2:</strong> 商業分析師需要從S3數據建立具有快速互動視覺化的經營儀表板。最佳的AWS服務是哪個？</p>
<ul>
<li>A) Amazon SageMaker Studio</li>
<li>B) Amazon Athena</li>
<li>C) Amazon QuickSight ✓</li>
<li>D) AWS Glue DataBrew</li>
</ul>
<p><em>解析：Amazon QuickSight是專為商業儀表板和視覺化設計的AWS BI服務，搭配SPICE記憶體引擎提供快速互動查詢。</em></p>

<p><strong>Q3:</strong> 在客戶流失數據上訓練的模型達到了99%的訓練accuracy，但在正式環境數據上表現不佳。調查發現「days_since_last_call」的預測力異常高。最可能的原因是什麼？</p>
<ul>
<li>A) 特徵太多導致過擬合</li>
<li>B) 模型複雜度不足導致欠擬合</li>
<li>C) 數據洩漏 — 特徵來自流失後的活動 ✓</li>
<li>D) 類別不平衡</li>
</ul>
<p><em>解析：這是典型的目標洩漏 — 「days_since_last_call」可能反映了流失後的行為（客戶打電話取消）。這種未來資訊在正式環境中不可用，導致模型失敗。</em></p>
