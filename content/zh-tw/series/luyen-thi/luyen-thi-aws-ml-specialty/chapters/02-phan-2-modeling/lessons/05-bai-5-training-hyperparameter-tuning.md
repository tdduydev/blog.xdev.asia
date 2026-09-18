---
id: 8a7a5367-e4a4-4796-8aab-68326c1dc574
title: '第5課：訓練與超參數調校'
slug: bai-5-training-hyperparameter-tuning
description: >-
  SageMaker Training Jobs：執行個體類型、Pipe Mode vs File Mode。
  分散式訓練：數據並行 vs 模型並行。
  自動模型調校（HPO）：貝葉斯 vs 隨機 vs 網格搜尋。
  Spot Instance Training降低成本。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 5
section_title: "第2部分：建模（36%）"
course:
  id: 019c9619-lt02-7002-c002-lt0200000002
  title: 'AWS認證機器學習 - 專業級 考試準備'
  slug: luyen-thi-aws-ml-specialty
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-mls-bai5-training-hpo.webp" alt="SageMaker Training & Hyperparameter Tuning" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>SageMaker Training Jobs與超參數調校：分散式訓練、Spot Instances、HPO策略</em></p>
</div>

<h2 id="training-jobs"><strong>1. SageMaker Training Jobs</strong></h2>

<p><strong>SageMaker Training Jobs</strong>在託管運算基礎設施上執行ML訓練程式碼。訓練在臨時執行個體上進行 — 僅在執行時計費。</p>

<pre><code class="language-text">Training Job Lifecycle:

  Submit Job ──→ Provision Instances ──→ Download Data
                                              ↓
                                       Run Training Code
                                              ↓
                                       Save Model to S3
                                              ↓
                                       Terminate Instances  
</code></pre>

<h2 id="instance-types"><strong>2. 訓練用執行個體類型</strong></h2>

<table>
<thead><tr><th>執行個體系列</th><th>硬體</th><th>最適用途</th></tr></thead>
<tbody>
<tr><td><strong>ml.c5</strong></td><td>CPU最佳化</td><td>表格ML、XGBoost、sklearn</td></tr>
<tr><td><strong>ml.m5</strong></td><td>通用CPU</td><td>輕量訓練、數據處理</td></tr>
<tr><td><strong>ml.p3</strong></td><td>V100 GPU</td><td>深度學習訓練</td></tr>
<tr><td><strong>ml.p4d</strong></td><td>A100 GPU（8x）</td><td>大規模DL、分散式訓練</td></tr>
<tr><td><strong>ml.g4dn</strong></td><td>T4 GPU（高性價比）</td><td>中小型DL模型</td></tr>
<tr><td><strong>ml.trn1</strong></td><td>AWS Trainium</td><td>LLM訓練、成本最佳化</td></tr>
</tbody>
</table>

<h2 id="distributed-training"><strong>3. 分散式訓練</strong></h2>

<p>當模型或數據集太大無法在單一執行個體上處理時，需要跨多個執行個體進行<strong>分散式訓練</strong>。</p>

<table>
<thead><tr><th>策略</th><th>運作方式</th><th>使用時機</th></tr></thead>
<tbody>
<tr><td><strong>數據並行</strong></td><td>每個執行個體有完整模型副本，在數據子集上訓練，同步梯度</td><td>數據集太大，模型可裝入1個GPU</td></tr>
<tr><td><strong>模型並行</strong></td><td>模型拆分到多個執行個體，每個執行個體包含一部分</td><td>模型太大無法裝入1個GPU（LLMs）</td></tr>
</tbody>
</table>

<pre><code class="language-text">Data Parallelism:

Instance 1 [Full Model] ──→ Train on data shard A ──→ ↓
Instance 2 [Full Model] ──→ Train on data shard B ──→ ↓  AllReduce
Instance 3 [Full Model] ──→ Train on data shard C ──→ ↓  (sync gradients)
                                                          ↓
                                              Updated Model Weights

Model Parallelism:

Instance 1 [Layers 1-4]  ──→ forward pass ──→
Instance 2 [Layers 5-8]  ──→ forward pass ──→
Instance 3 [Layers 9-12] ──→ forward pass ──→ output
</code></pre>

<blockquote>
<p><strong>考試提示：</strong> SageMaker提供<strong>SageMaker Distributed</strong>函式庫，包含2個模組：(1) <code>smdistributed.dataparallel</code> — 最佳化的AllReduce；(2) <code>smdistributed.modelparallel</code> — 自動管線並行。當題目問「大型模型訓練」→ 模型並行。</p>
</blockquote>

<h2 id="hpo"><strong>4. 自動模型調校（HPO）</strong></h2>

<p><strong>超參數最佳化（HPO）</strong>通過執行多個不同配置的訓練工作，自動找出最佳超參數。</p>

<table>
<thead><tr><th>策略</th><th>運作方式</th><th>取捨</th></tr></thead>
<tbody>
<tr><td><strong>隨機搜尋</strong></td><td>從範圍中隨機取樣超參數</td><td>快速、良好的基準線</td></tr>
<tr><td><strong>網格搜尋</strong></td><td>嘗試所有組合</td><td>窮舉、昂貴、不適合大搜尋空間</td></tr>
<tr><td><strong>貝葉斯最佳化</strong></td><td>結果的機率模型，建議最佳下一個配置</td><td>高效、從先前試驗中學習 — SageMaker預設</td></tr>
<tr><td><strong>Hyperband</strong></td><td>提前停止表現不佳的試驗</td><td>資源高效、快速</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> SageMaker AMT（自動模型調校）預設使用<strong>貝葉斯最佳化</strong>。它會參考先前工作的結果來建議下一組超參數 — 智慧搜尋，而非暴力法。</p>
</blockquote>

<h2 id="spot-training"><strong>5. Spot Instance訓練</strong></h2>

<p>SageMaker支援使用<strong>EC2 Spot Instances</strong>進行訓練工作，與隨需相比可節省高達<strong>90%的成本</strong>。</p>

<table>
<thead><tr><th>功能</th><th>詳情</th></tr></thead>
<tbody>
<tr><td><strong>MaxWaitTimeInSeconds</strong></td><td>等待Spot容量的最長時間</td></tr>
<tr><td><strong>檢查點</strong></td><td>定期將模型儲存至S3 — 中斷後可恢復</td></tr>
<tr><td><strong>use_spot_instances=True</strong></td><td>SageMaker Estimator中的參數</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong> 當題目問「降低訓練成本」時，答案通常是<strong>Spot Instances搭配檢查點</strong>。檢查點非常重要，可避免Spot Instance被終止時遺失進度。</p>
</blockquote>

<h2 id="bias-variance"><strong>6. 偏差-變異數取捨</strong></h2>

<table>
<thead><tr><th>問題</th><th>症狀</th><th>原因</th><th>解決方案</th></tr></thead>
<tbody>
<tr><td><strong>高偏差（欠擬合）</strong></td><td>訓練誤差高、測試誤差高</td><td>模型太簡單</td><td>增加模型複雜度、增加特徵、減少正規化</td></tr>
<tr><td><strong>高變異數（過擬合）</strong></td><td>訓練誤差低、測試誤差高</td><td>模型太複雜</td><td>增加數據、dropout、正規化、特徵選擇</td></tr>
<tr><td><strong>平衡</strong></td><td>訓練誤差低、測試誤差低（接近）</td><td>良好擬合</td><td>部署模型</td></tr>
</tbody>
</table>

<h2 id="practice"><strong>7. 練習題</strong></h2>

<p><strong>Q1:</strong> 一家公司正在訓練一個無法裝入單一GPU執行個體的大型深度學習模型。應該使用哪種SageMaker分散式訓練策略？</p>
<ul>
<li>A) 數據並行</li>
<li>B) 模型並行 ✓</li>
<li>C) 僅管線並行</li>
<li>D) 增加批次大小</li>
</ul>
<p><em>解析：模型並行將模型本身拆分到多個GPU執行個體上，允許訓練無法裝入單一GPU記憶體的模型。數據並行在每個執行個體上保留完整的模型副本，當模型本身太大時無法解決問題。</em></p>

<p><strong>Q2:</strong> 團隊想要將執行500個超參數調校工作的成本降至最低。訓練可以容忍中斷。最具成本效益的方法是什麼？</p>
<ul>
<li>A) 使用更大的執行個體來加快工作速度</li>
<li>B) 使用Spot Instances並啟用檢查點 ✓</li>
<li>C) 使用網格搜尋代替貝葉斯最佳化</li>
<li>D) 減少訓練epoch數</li>
</ul>
<p><em>解析：Spot Instances與隨需定價相比可節省高達90%。啟用檢查點後，被中斷的工作會將狀態儲存至S3並可恢復，使Spot Instances適用於長時間的HPO工作。</em></p>

<p><strong>Q3:</strong> 一個模型在訓練數據上達到95%的accuracy，但在測試集上只有62%。這表明什麼問題？</p>
<ul>
<li>A) 欠擬合 / 高偏差</li>
<li>B) 過擬合 / 高變異數 ✓</li>
<li>C) 數據洩漏</li>
<li>D) 類別不平衡</li>
</ul>
<p><em>解析：訓練accuracy（95%）和測試accuracy（62%）之間的巨大差距是過擬合（高變異數）的典型徵兆。模型記住了訓練數據但無法泛化。解決方案：更多數據、正規化（L1/L2、dropout）、降低模型複雜度。</em></p>
