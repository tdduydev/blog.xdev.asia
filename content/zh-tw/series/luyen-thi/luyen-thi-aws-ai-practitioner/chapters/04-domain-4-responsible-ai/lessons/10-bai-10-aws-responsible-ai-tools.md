---
id: 019c9619-lt01-d4-l10
title: '第10課：AWS負責任AI工具——Clarify、A2I與Guardrails'
slug: bai-10-aws-responsible-ai-tools
description: >-
  Amazon SageMaker Clarify（偏差偵測、可解釋性）。
  Amazon Augmented AI（A2I）——人在迴路。
  Amazon Bedrock Guardrails深度剖析。內容審核。
duration_minutes: 50
is_free: true
video_url: null
sort_order: 2
section_title: "領域4：負責任AI準則（14%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS AI Practitioner（AIF-C01）認證備考'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai10-clarify-a2i-guardrails.webp" alt="AWS負責任AI工具" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>AWS負責任AI工具：SageMaker Clarify、Amazon A2I和Bedrock Guardrails</em></p>
</div>

<h2 id="sagemaker-clarify"><strong>1. Amazon SageMaker Clarify</strong></h2>

<p><strong>SageMaker Clarify</strong>幫助偵測資料和模型中的偏差，並提供模型可解釋性——是負責任AI的首選AWS服務。</p>

<h3 id="clarify-capabilities"><strong>1.1. 三大核心功能</strong></h3>

<table>
<thead><tr><th>功能</th><th>時機</th><th>作用</th></tr></thead>
<tbody>
<tr><td><strong>訓練前偏差偵測</strong></td><td>訓練前</td><td>偵測訓練資料中各人口群體的不平衡</td></tr>
<tr><td><strong>訓練後偏差偵測</strong></td><td>訓練後</td><td>偵測模型預測中的偏差（例如各群體之間準確率不同）</td></tr>
<tr><td><strong>可解釋性（SHAP）</strong></td><td>訓練後</td><td>顯示每個特徵對各預測的貢獻</td></tr>
</tbody>
</table>

<h3 id="clarify-bias-metrics"><strong>1.2. Clarify中的關鍵偏差指標</strong></h3>

<table>
<thead><tr><th>指標</th><th>訓練前/後</th><th>衡量內容</th></tr></thead>
<tbody>
<tr><td><strong>類別不平衡（CI）</strong></td><td>訓練前</td><td>各群體中類別的分佈</td></tr>
<tr><td><strong>比例差異（DPL）</strong></td><td>訓練前</td><td>各群體中正面標記的比例</td></tr>
<tr><td><strong>KL散度</strong></td><td>訓練前</td><td>群體間的分佈偏離</td></tr>
<tr><td><strong>差異性影響（DI）</strong></td><td>訓練後</td><td>各群體中正面預測的比率</td></tr>
<tr><td><strong>準確率差異（AD）</strong></td><td>訓練後</td><td>群體間的準確率差距</td></tr>
<tr><td><strong>處理均等（TE）</strong></td><td>訓練後</td><td>各群體中FP與FN的比率</td></tr>
</tbody>
</table>

<h3 id="clarify-workflow"><strong>1.3. Clarify工作流程</strong></h3>

<pre><code class="language-text">1. 設定Clarify作業
   ├── 指定敏感屬性（性別、年齡、種族）
   ├── 定義分面（要比較的群體）
   └── 選擇要計算的偏差指標

2. 執行訓練前分析
   ├── 上傳訓練資料集
   └── 取得資料分佈的偏差報告

3. 訓練模型

4. 執行訓練後分析
   ├── 比較各群體的預測
   └── 取得可解釋性的SHAP值

5. 使用SageMaker Model Monitor監控
   └── 偵測生產環境中偏差隨時間的漂移
</code></pre>

<blockquote>
<p><strong>考試提示：</strong>「哪個AWS服務可以偵測模型是否對某個種族群體產生更多錯誤？」→ <strong>SageMaker Clarify</strong>（訓練後偏差偵測）。</p>
</blockquote>

<h2 id="a2i"><strong>2. Amazon Augmented AI（Amazon A2I）</strong></h2>

<p><strong>Amazon A2I</strong>為AI預測提供<strong>人在迴路（HITL）</strong>工作流程——特別重要於模型信心低或高風險決策的場景。</p>

<h3 id="a2i-how"><strong>2.1. A2I運作方式</strong></h3>

<pre><code class="language-text">帶有A2I的AI預測流程：
                                          ┌─────────────┐
使用者請求 → AI模型 → 有信心？  是 → 回傳結果
                              │
                              否（低於閾值）
                              ↓
                     ┌──────────────────┐
                     │  建立人工         │
                     │  審查任務         │
                     │  （A2I工作流程）   │
                     └────────┬─────────┘
                              ↓
                     ┌──────────────────┐
                     │  人工審查員       │  ← AWS Mechanical Turk
                     │  審查與           │  ← 私人工作團隊
                     │  修正             │  ← 第三方供應商
                     └────────┬─────────┘
                              ↓
                     回傳人工驗證的結果
</code></pre>

<h3 id="a2i-components"><strong>2.2. A2I組件</strong></h3>

<table>
<thead><tr><th>組件</th><th>用途</th></tr></thead>
<tbody>
<tr><td><strong>人工審查工作流程</strong></td><td>定義何時及如何觸發人工審查</td></tr>
<tr><td><strong>工作者任務範本</strong></td><td>人工審查員做決策的UI</td></tr>
<tr><td><strong>工作團隊</strong></td><td>由誰進行審查（私人、Mechanical Turk、供應商）</td></tr>
<tr><td><strong>啟動條件</strong></td><td>信心閾值觸發（例如 < 95%）</td></tr>
</tbody>
</table>

<h3 id="a2i-built-in"><strong>2.3. A2I內建整合</strong></h3>

<table>
<thead><tr><th>服務</th><th>A2I用途</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Textract</strong></td><td>審查低信心的文件擷取</td></tr>
<tr><td><strong>Amazon Rekognition</strong></td><td>審查低信心的內容審核</td></tr>
<tr><td><strong>自訂ML模型</strong></td><td>任何SageMaker模型都可觸發A2I</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong>「一家醫療公司需要在模型信心低於90%時由人工審查AI診斷」→ <strong>Amazon A2I</strong>，啟動條件設為信心 < 90%。</p>
</blockquote>

<h2 id="guardrails-deep"><strong>3. Amazon Bedrock Guardrails——深度剖析</strong></h2>

<h3 id="guardrails-policies"><strong>3.1. Guardrail策略</strong></h3>

<table>
<thead><tr><th>策略</th><th>運作方式</th><th>設定</th></tr></thead>
<tbody>
<tr><td><strong>內容過濾器</strong></td><td>按類別+嚴重程度封鎖</td><td>每個類別設定無/低/中/高（仇恨、侮辱、色情、暴力、不當行為）</td></tr>
<tr><td><strong>禁止主題</strong></td><td>封鎖特定主題</td><td>自然語言描述+範例短語</td></tr>
<tr><td><strong>詞彙過濾器</strong></td><td>封鎖特定詞語</td><td>自訂詞語/短語列表+不雅詞過濾器開關</td></tr>
<tr><td><strong>敏感資訊（PII）</strong></td><td>偵測PII並採取行動</td><td>每種PII類型設定封鎖或匿名化（SSN、電子郵件、電話、姓名、地址等）</td></tr>
<tr><td><strong>上下文基礎</strong></td><td>檢查回答是否基於上下文</td><td>基礎閾值（0-1）+相關性閾值</td></tr>
</tbody>
</table>

<h3 id="guardrails-flow"><strong>3.2. Guardrails處理請求的方式</strong></h3>

<pre><code class="language-text">使用者輸入
    ↓
[輸入Guardrails]
    ├── 內容過濾器檢查
    ├── 禁止主題檢查
    ├── 詞彙過濾器檢查
    ├── PII偵測 → 封鎖或匿名化
    ↓（如果通過所有檢查）
基礎模型生成回應
    ↓
[輸出Guardrails]
    ├── 內容過濾器檢查
    ├── 禁止主題檢查
    ├── 詞彙過濾器檢查
    ├── PII偵測 → 封鎖或匿名化
    ├── 上下文基礎檢查
    ↓（如果通過所有檢查）
回應回傳給使用者

如果被封鎖 → 回傳設定的「封鎖」訊息
</code></pre>

<h3 id="guardrails-vs-system"><strong>3.3. Guardrails vs 系統提示</strong></h3>

<table>
<thead><tr><th>面向</th><th>系統提示</th><th>Guardrails</th></tr></thead>
<tbody>
<tr><td><strong>執行方式</strong></td><td>軟性——模型可能忽略</td><td>硬性——由平台強制執行</td></tr>
<tr><td><strong>繞過風險</strong></td><td>可透過提示注入繞過</td><td>無法被提示繞過</td></tr>
<tr><td><strong>PII處理</strong></td><td>要求模型不輸出PII</td><td>程式化偵測與遮蔽</td></tr>
<tr><td><strong>可稽核性</strong></td><td>有限</td><td>完整的日誌和指標</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong>「一家公司需要保證PII永遠不會出現在模型回應中」→ <strong>Bedrock Guardrails</strong>（非系統提示，因為系統提示可以被繞過）。</p>
</blockquote>

<h2 id="content-moderation"><strong>4. AWS上的內容審核</strong></h2>

<table>
<thead><tr><th>服務</th><th>內容類型</th><th>用途</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Rekognition</strong></td><td>圖像與影片</td><td>偵測不當內容、人臉、文字</td></tr>
<tr><td><strong>Amazon Comprehend</strong></td><td>文字</td><td>毒性偵測、情感分析</td></tr>
<tr><td><strong>Bedrock Guardrails</strong></td><td>FM輸入/輸出</td><td>在生成式AI應用中過濾有害內容</td></tr>
<tr><td><strong>Amazon A2I</strong></td><td>任何</td><td>邊緣案例的人工審查</td></tr>
</tbody>
</table>

<h2 id="governance"><strong>5. AI治理</strong></h2>

<h3 id="governance-framework"><strong>5.1. 治理框架</strong></h3>

<table>
<thead><tr><th>領域</th><th>應實施的內容</th></tr></thead>
<tbody>
<tr><td><strong>政策</strong></td><td>組織範圍的AI倫理準則</td></tr>
<tr><td><strong>風險評估</strong></td><td>部署AI系統前評估風險</td></tr>
<tr><td><strong>監控</strong></td><td>持續監控偏差、效能漂移</td></tr>
<tr><td><strong>稽核軌跡</strong></td><td>記錄所有模型決策以確保問責</td></tr>
<tr><td><strong>人工監督</strong></td><td>高風險決策採用人在迴路</td></tr>
<tr><td><strong>文件記錄</strong></td><td>模型卡片、AI Service Cards</td></tr>
</tbody>
</table>

<h3 id="sagemaker-governance"><strong>5.2. SageMaker ML治理</strong></h3>

<ul>
<li><strong>SageMaker模型卡片</strong>：記錄模型詳情和預期用途</li>
<li><strong>SageMaker模型儀表板</strong>：所有模型狀態的集中視圖</li>
<li><strong>SageMaker Model Monitor</strong>：偵測資料漂移、模型品質下降</li>
<li><strong>SageMaker Role Manager</strong>：ML的細粒度存取控制</li>
</ul>

<h2 id="practice-questions"><strong>6. 練習題</strong></h2>

<p><strong>Q1：</strong>一家保險公司想確保其理賠審核模型公平對待所有年齡的客戶。他們應該使用哪個AWS服務來偵測模型預測中的年齡偏差？</p>
<ul>
<li>A) Amazon Rekognition</li>
<li>B) Amazon SageMaker Clarify ✓</li>
<li>C) Amazon Bedrock Guardrails</li>
<li>D) Amazon Comprehend</li>
</ul>
<p><em>解說：SageMaker Clarify可以執行訓練後偏差分析，使用差異性影響和準確率差異等指標來比較各年齡群體的模型預測。</em></p>

<p><strong>Q2：</strong>一個使用Amazon Textract的文件處理應用程式，需要在擷取資料信心低時進行人工審查。哪個AWS服務提供此功能？</p>
<ul>
<li>A) Amazon SageMaker Ground Truth</li>
<li>B) Amazon Augmented AI（A2I） ✓</li>
<li>C) 直接使用Amazon Mechanical Turk</li>
<li>D) Amazon Bedrock Agents</li>
</ul>
<p><em>解說：Amazon A2I與Amazon Textract有內建整合，當擷取信心低於定義的閾值時可自動觸發人工審查工作流程。</em></p>

<p><strong>Q3：</strong>一個聊天機器人必須永遠不在回應中揭露客戶的信用卡號碼，即使資料存在於知識庫中。哪種方法提供最強的保證？</p>
<ul>
<li>A) 在系統提示中加入「絕不輸出信用卡號碼」</li>
<li>B) 微調模型使其不輸出PII</li>
<li>C) 使用Amazon Bedrock Guardrails並將PII過濾器設為封鎖 ✓</li>
<li>D) 從知識庫中移除信用卡號碼</li>
</ul>
<p><em>解說：Bedrock Guardrails的PII過濾器在輸入和輸出中都提供程式化的信用卡號碼偵測和封鎖——這無法被提示注入繞過，不像系統提示。</em></p>
