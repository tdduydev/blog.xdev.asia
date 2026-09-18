---
id: 53fa302d-d4b6-483f-af7d-5c9b26bbf21e
title: '第6課：模型評估與驗證'
slug: bai-6-model-evaluation
description: >-
  指標：Accuracy、Precision、Recall、F1、AUC-ROC、RMSE、MAE、R²。
  混淆矩陣。交叉驗證策略。
  SageMaker Clarify用於偏差檢測與可解釋性。
  Production Variants的A/B測試。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 6
section_title: "第2部分：建模（36%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認證機器學習 - 專業級 考試準備'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai6-model-evaluation.webp" alt="Model Evaluation Metrics" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>模型評估：分類指標（AUC-ROC、F1）、迴歸指標（RMSE、MAE）與混淆矩陣</em></p>
</div>

<h2 id="classification-metrics"><strong>1. 分類指標</strong></h2>

<p>選擇正確的指標是ML工程師最重要的技能之一。MLS-C01考試經常給出情境並詢問適當的指標。</p>

<h3 id="confusion-matrix"><strong>1.1. 混淆矩陣</strong></h3>

<pre><code class="language-text">                 Predicted
                 Positive  Negative
Actual Positive │   TP   │   FN   │  ← Recall = TP / (TP + FN)
       Negative │   FP   │   TN   │

Precision  = TP / (TP + FP)   ← 在所有預測為正的中，有多少是正確的？
Recall     = TP / (TP + FN)   ← 在所有實際為正的中，我們捕獲了多少？
F1 Score   = 2 × (P × R) / (P + R)   ← 調和平均數
Accuracy   = (TP + TN) / Total
</code></pre>

<table>
<thead><tr><th>指標</th><th>最佳化時機</th><th>實際案例</th></tr></thead>
<tbody>
<tr><td><strong>Precision</strong></td><td>FP成本高 — 不想要假警報</td><td>垃圾郵件過濾器（不要攔截正常郵件）</td></tr>
<tr><td><strong>Recall（靈敏度）</strong></td><td>FN成本高 — 不能遺漏正例</td><td>癌症檢測（找出所有癌症患者）</td></tr>
<tr><td><strong>F1分數</strong></td><td>平衡Precision和Recall，不平衡數據</td><td>欺詐檢測</td></tr>
<tr><td><strong>Accuracy</strong></td><td>僅適用於平衡類別</td><td>多類別、平衡數據集</td></tr>
<tr><td><strong>AUC-ROC</strong></td><td>排序品質、與閾值無關</td><td>信用評分、廣告排序</td></tr>
<tr><td><strong>PR-AUC</strong></td><td>不平衡、關注少數類別</td><td>欺詐、醫療診斷</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> 常見情境 — 「醫療診斷，遺漏癌症比假陽性更嚴重」→ 最佳化<strong>Recall</strong>。「垃圾郵件偵測器，攔截正常郵件不好」→ 最佳化<strong>Precision</strong>。不平衡數據 → 使用<strong>F1或AUC-ROC</strong>，不要使用Accuracy。</p>
</blockquote>

<h2 id="regression-metrics"><strong>2. 迴歸指標</strong></h2>

<table>
<thead><tr><th>指標</th><th>公式</th><th>離群值敏感度</th><th>使用情境</th></tr></thead>
<tbody>
<tr><td><strong>RMSE</strong></td><td>√(mean(errors²))</td><td>高 — 懲罰大誤差</td><td>大誤差不可接受時（價格預測）</td></tr>
<tr><td><strong>MAE</strong></td><td>mean(|errors|)</td><td>低 — 所有誤差權重相等</td><td>對離群值穩健、需求預測</td></tr>
<tr><td><strong>R²（決定係數）</strong></td><td>1 - SS_res/SS_tot</td><td>中等</td><td>解釋的變異數比例（0–1）</td></tr>
<tr><td><strong>MAPE</strong></td><td>mean(|error/actual|×100)</td><td>當實際值接近0時高</td><td>百分比誤差、易於商業解讀</td></tr>
</tbody>
</table>

<h2 id="cross-validation"><strong>3. 交叉驗證</strong></h2>

<table>
<thead><tr><th>策略</th><th>運作方式</th><th>最適用途</th></tr></thead>
<tbody>
<tr><td><strong>留出法分割</strong></td><td>訓練/驗證/測試分割（例如70/15/15）</td><td>大型數據集、快速評估</td></tr>
<tr><td><strong>K折交叉驗證</strong></td><td>K個子集，在K-1上訓練，在1上評估，重複K次</td><td>中型數據集、穩健估計</td></tr>
<tr><td><strong>分層K折</strong></td><td>與K折相同但每折維持類別比例</td><td>不平衡分類</td></tr>
<tr><td><strong>留一法（LOOCV）</strong></td><td>N折（每個樣本作為測試一次）</td><td>非常小的數據集</td></tr>
<tr><td><strong>時間序列分割</strong></td><td>訓練窗口向前推進 — 訓練中沒有未來數據</td><td>時間序列數據</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> 時間序列數據<strong>必須</strong>使用<strong>基於時間的分割</strong>，不能隨機打亂後使用普通K折 — 會將未來數據洩漏到訓練中。</p>
</blockquote>

<h2 id="clarify"><strong>4. SageMaker Clarify — 偏差與可解釋性</strong></h2>

<p><strong>SageMaker Clarify</strong>檢測數據/模型中的偏差，並使用<strong>SHAP值</strong>提供模型可解釋性。</p>

<table>
<thead><tr><th>功能</th><th>用途</th><th>輸出</th></tr></thead>
<tbody>
<tr><td><strong>訓練前偏差檢測</strong></td><td>訓練前分析原始數據</td><td>偏差指標：CI、DPL、KL、JS</td></tr>
<tr><td><strong>訓練後偏差檢測</strong></td><td>評估模型預測是否存在偏差</td><td>指標：DPPL、DI、DCO、RD</td></tr>
<tr><td><strong>模型可解釋性</strong></td><td>特徵重要性的SHAP值</td><td>每個預測的特徵權重貢獻</td></tr>
</tbody>
</table>

<pre><code class="language-text">SHAP Explainability Example (Loan Approval):

Feature            SHAP Value  Contribution
─────────────────────────────────────────────
credit_score       +0.42       ↑ approval
income             +0.28       ↑ approval
debt_ratio         -0.35       ↓ approval
employment_years   +0.15       ↑ approval
age                -0.02       minimal impact
</code></pre>

<h2 id="production-variants"><strong>5. Production Variants的A/B測試</strong></h2>

<p>SageMaker Endpoints支援<strong>Production Variants</strong> — 同時執行多個模型版本並分配流量。</p>

<pre><code class="language-text">Endpoint with A/B Testing:

          ┌──────────────────────────────┐
 Request ─→  SageMaker Endpoint         │
          │                              │
          │  Variant A (v1): 80% traffic │──→ Model v1 (current)
          │  Variant B (v2): 20% traffic │──→ Model v2 (candidate)
          └──────────────────────────────┘
                        ↓
                 Compare metrics, shift traffic gradually
</code></pre>

<h2 id="cheat-sheet"><strong>6. 速查表 — 評估指標</strong></h2>

<table>
<thead><tr><th>情境</th><th>最佳指標</th></tr></thead>
<tbody>
<tr><td>醫療診斷（FN嚴重）</td><td>Recall（靈敏度）</td></tr>
<tr><td>垃圾郵件過濾器（FP嚴重）</td><td>Precision</td></tr>
<tr><td>不平衡欺詐檢測</td><td>F1分數、AUC-ROC</td></tr>
<tr><td>房價預測（離群值重要）</td><td>RMSE</td></tr>
<tr><td>需求預測（穩健）</td><td>MAE</td></tr>
<tr><td>解釋個別預測</td><td>SHAP（透過SageMaker Clarify）</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. 練習題</strong></h2>

<p><strong>Q1:</strong> 一家醫院想要建構早期癌症檢測模型。遺漏實際癌症病例比假陽性更危險。應該最佳化哪個指標？</p>
<ul>
<li>A) Precision</li>
<li>B) Recall ✓</li>
<li>C) Accuracy</li>
<li>D) RMSE</li>
</ul>
<p><em>解析：Recall = TP / (TP + FN)。最佳化Recall可最小化假陰性（遺漏的癌症病例），這是此處的關鍵考量。Precision最佳化假陽性，Accuracy對不平衡醫療數據會產生誤導，RMSE用於迴歸。</em></p>

<p><strong>Q2:</strong> 一家公司想在正式環境中逐步測試新模型版本，同時保留現有模型作為後備。哪個SageMaker功能提供此能力？</p>
<ul>
<li>A) SageMaker Experiments</li>
<li>B) SageMaker Pipelines</li>
<li>C) SageMaker Endpoints上的Production Variants ✓</li>
<li>D) SageMaker Model Monitor</li>
</ul>
<p><em>解析：SageMaker Endpoints支援Production Variants，允許多個模型版本同時執行並配置流量權重。這實現了A/B測試和金絲雀部署，無需停機。</em></p>

<p><strong>Q3:</strong> 一個房價預測模型的RMSE=50,000且MAE=20,000。這表明存在什麼問題？</p>
<ul>
<li>A) 高偏差</li>
<li>B) 數據洩漏</li>
<li>C) 離群值推高了RMSE ✓</li>
<li>D) 欠擬合</li>
</ul>
<p><em>解析：當RMSE明顯高於MAE時，表示存在離群值 — 因為RMSE對誤差取平方，對大誤差的懲罰遠大於MAE。差距（50k vs 20k）表明某些預測存在非常大的誤差（目標變數中的離群值）。</em></p>
