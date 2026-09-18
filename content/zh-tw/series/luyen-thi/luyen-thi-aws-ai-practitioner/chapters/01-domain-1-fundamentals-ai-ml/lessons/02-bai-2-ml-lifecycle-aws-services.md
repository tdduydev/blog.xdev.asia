---
id: 019c9619-lt01-d1-l02
title: '第2課：ML開發生命週期與AWS AI服務概覽'
slug: bai-2-ml-lifecycle-aws-services
description: >-
  ML管線：資料收集 → 特徵工程 → 訓練 → 評估 → 部署。
  AWS AI/ML服務堆疊。SageMaker、Rekognition、Comprehend、Polly、
  Transcribe、Translate、Textract、Lex、Personalize、Forecast、Kendra。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 2
section_title: "領域1：AI與ML基礎（20%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS AI Practitioner（AIF-C01）認證備考'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai2-ml-lifecycle-pipeline.webp" alt="AWS上的ML開發生命週期管線" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>ML開發生命週期管線與AWS AI/ML服務堆疊</em></p>
</div>

<h2 id="ml-lifecycle"><strong>1. ML開發生命週期</strong></h2>

<p>AIF-C01考試要求您理解完整的ML開發生命週期 — 從問題定義到部署和監控。</p>

<pre><code class="language-text">┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│ 1. 商業      │───→│ 2. 資料       │───→│ 3. 特徵       │
│ 問題定義     │    │ 收集與準備    │    │ 工程          │
└─────────────┘    └──────────────┘    └──────────────┘
                                              │
┌─────────────┐    ┌──────────────┐    ┌──────┴───────┐
│ 6. 監控      │←───│ 5. 部署       │←───│ 4. 模型       │
│ 與重新訓練   │    │ 與推論        │    │ 訓練與評估    │
└─────────────┘    └──────────────┘    └──────────────┘
</code></pre>

<h3 id="step-1"><strong>步驟1：商業問題定義</strong></h3>

<ul>
<li>判斷問題是否真的需要ML（有時基於規則的方法就足夠了）</li>
<li>定義成功指標（KPI）</li>
<li>確定資料可用性</li>
</ul>

<blockquote>
<p><strong>考試提示：</strong>「並非每個問題都需要ML。」如果題目描述的是簡單問題，基於規則的方法或查詢表可能就足夠了。</p>
</blockquote>

<h3 id="step-2"><strong>步驟2：資料收集與準備</strong></h3>

<ul>
<li><strong>資料收集</strong>：從資料庫、API、IoT、日誌中收集</li>
<li><strong>資料清理</strong>：處理缺失值、移除重複、修正錯誤</li>
<li><strong>資料標記</strong>：為監督式學習標記資料 → <strong>Amazon SageMaker Ground Truth</strong></li>
<li><strong>探索性資料分析（EDA）</strong>：視覺化、理解分布、相關性</li>
</ul>

<h3 id="step-3"><strong>步驟3：特徵工程</strong></h3>

<ul>
<li><strong>特徵選擇</strong>：選擇重要特徵，移除雜訊</li>
<li><strong>特徵轉換</strong>：正規化、縮放、編碼</li>
<li><strong>特徵創建</strong>：從原始資料創建新特徵</li>
<li>AWS：<strong>SageMaker Data Wrangler</strong>、<strong>SageMaker Feature Store</strong></li>
</ul>

<h3 id="step-4"><strong>步驟4：模型訓練與評估</strong></h3>

<ul>
<li>選擇適合問題的演算法</li>
<li>將資料分為訓練集/驗證集/測試集</li>
<li>訓練模型，調整超參數</li>
<li>使用適當的指標進行評估（準確率、F1、RMSE...）</li>
<li>AWS：<strong>Amazon SageMaker</strong>用於完整ML工作流程</li>
</ul>

<h3 id="step-5"><strong>步驟5：部署與推論</strong></h3>

<ul>
<li><strong>即時推論</strong>：用於即時預測的端點</li>
<li><strong>批次推論</strong>：離線處理大型資料集</li>
<li><strong>邊緣部署</strong>：在邊緣設備上執行模型</li>
<li>AWS：<strong>SageMaker Endpoints</strong>、<strong>Lambda</strong>、<strong>IoT Greengrass</strong></li>
</ul>

<h3 id="step-6"><strong>步驟6：監控與重新訓練</strong></h3>

<ul>
<li><strong>模型漂移</strong>：隨著資料變化，效能隨時間下降</li>
<li><strong>資料漂移</strong>：輸入資料分布發生變化</li>
<li><strong>概念漂移</strong>：輸入和輸出之間的關係發生變化</li>
<li>解決方案：監控 → 偵測漂移 → 使用新資料重新訓練</li>
<li>AWS：<strong>SageMaker Model Monitor</strong></li>
</ul>

<h2 id="aws-ai-stack"><strong>2. AWS AI/ML服務堆疊</strong></h2>

<p>AWS提供3層AI/ML服務 — 從高階（不需ML知識）到低階（完全控制）：</p>

<pre><code class="language-text">┌─────────────────────────────────────────────────────┐
│  第3層：AI服務（預訓練、基於API）                      │
│  → Rekognition、Comprehend、Polly、Transcribe、       │
│    Translate、Textract、Lex、Personalize、Forecast     │
│  → 不需要ML專業知識                                   │
├─────────────────────────────────────────────────────┤
│  第2層：ML服務（託管平台）                              │
│  → Amazon SageMaker、SageMaker JumpStart              │
│  → Amazon Bedrock（GenAI）                            │
│  → 需要一些ML專業知識                                  │
├─────────────────────────────────────────────────────┤
│  第1層：ML框架與基礎設施                                │
│  → 帶GPU/Inferentia的EC2、Deep Learning AMI、          │
│    Deep Learning Containers                           │
│  → 需要完整ML專業知識                                  │
└─────────────────────────────────────────────────────┘
</code></pre>

<h2 id="ai-services"><strong>3. AWS AI服務 — 總覽表</strong></h2>

<p>本節對<strong>考試非常重要</strong> — 您需要知道每個服務的功能和使用時機。</p>

<h3 id="vision"><strong>3.1. 電腦視覺</strong></h3>

<table>
<thead><tr><th>服務</th><th>功能</th><th>使用案例</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Rekognition</strong></td><td>影像和影片分析</td><td>人臉偵測、物體偵測、內容審核、名人辨識、影像中的文字（OCR）</td></tr>
<tr><td><strong>Amazon Textract</strong></td><td>從文件中擷取文字和資料</td><td>發票處理、身份證件擷取、表單資料、表格擷取</td></tr>
<tr><td><strong>Amazon Lookout for Vision</strong></td><td>製造業視覺檢查</td><td>生產線上的產品缺陷偵測</td></tr>
</tbody>
</table>

<h3 id="nlp"><strong>3.2. 自然語言處理（NLP）</strong></h3>

<table>
<thead><tr><th>服務</th><th>功能</th><th>使用案例</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Comprehend</strong></td><td>NLP分析</td><td>情緒分析、實體擷取、關鍵詞組、語言偵測、PII偵測</td></tr>
<tr><td><strong>Amazon Translate</strong></td><td>神經機器翻譯</td><td>即時翻譯、批次文件翻譯</td></tr>
<tr><td><strong>Amazon Kendra</strong></td><td>智慧企業搜尋</td><td>內部知識搜尋、FAQ、NLP驅動的文件搜尋</td></tr>
</tbody>
</table>

<h3 id="speech"><strong>3.3. 語音</strong></h3>

<table>
<thead><tr><th>服務</th><th>功能</th><th>方向</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Polly</strong></td><td>文字轉語音（TTS）</td><td>文字 → 音訊</td></tr>
<tr><td><strong>Amazon Transcribe</strong></td><td>語音轉文字（STT）</td><td>音訊 → 文字</td></tr>
<tr><td><strong>Amazon Lex</strong></td><td>對話式AI（聊天機器人）</td><td>建立語音和文字聊天機器人（驅動Alexa）</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong>Polly = 文字轉語音（Polly「說話」）。Transcribe = 語音轉文字（Transcribe「記錄」）。</p>
</blockquote>

<h3 id="predictions"><strong>3.4. 預測與推薦</strong></h3>

<table>
<thead><tr><th>服務</th><th>功能</th><th>使用案例</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Personalize</strong></td><td>即時個人化與推薦</td><td>產品推薦、個人化內容</td></tr>
<tr><td><strong>Amazon Forecast</strong></td><td>時間序列預測</td><td>需求規劃、財務預測、資源規劃</td></tr>
<tr><td><strong>Amazon Fraud Detector</strong></td><td>偵測線上欺詐</td><td>支付欺詐、假帳號、帳號盜用</td></tr>
</tbody>
</table>

<h2 id="sagemaker"><strong>4. Amazon SageMaker概覽</strong></h2>

<p>SageMaker是一個<strong>全受管ML平台</strong> — 提供整個ML生命週期所需的一切。</p>

<h3 id="sagemaker-components"><strong>關鍵組件：</strong></h3>

<table>
<thead><tr><th>組件</th><th>用途</th></tr></thead>
<tbody>
<tr><td><strong>SageMaker Studio</strong></td><td>ML開發IDE（基於Jupyter）</td></tr>
<tr><td><strong>SageMaker Ground Truth</strong></td><td>資料標記服務（人工 + ML輔助）</td></tr>
<tr><td><strong>SageMaker Data Wrangler</strong></td><td>資料準備與轉換（無程式碼）</td></tr>
<tr><td><strong>SageMaker Feature Store</strong></td><td>儲存與共享ML特徵</td></tr>
<tr><td><strong>SageMaker Training</strong></td><td>帶內建演算法的受管訓練作業</td></tr>
<tr><td><strong>SageMaker Autopilot</strong></td><td>AutoML — 自動模型構建</td></tr>
<tr><td><strong>SageMaker JumpStart</strong></td><td>預訓練模型與解決方案（模型中心）</td></tr>
<tr><td><strong>SageMaker Endpoints</strong></td><td>部署模型進行即時推論</td></tr>
<tr><td><strong>SageMaker Model Monitor</strong></td><td>監控已部署模型的漂移</td></tr>
<tr><td><strong>SageMaker Clarify</strong></td><td>偏差偵測與模型可解釋性</td></tr>
<tr><td><strong>SageMaker Canvas</strong></td><td>商業用戶的無程式碼ML</td></tr>
</tbody>
</table>

<h3 id="sagemaker-decision"><strong>何時使用SageMaker vs AI服務？</strong></h3>

<pre><code class="language-text">需要自訂ML模型？→ SageMaker
需要預訓練功能？→ AI服務（Rekognition、Comprehend等）
需要GenAI/基礎模型？→ Amazon Bedrock
商業用戶、無程式碼？→ SageMaker Canvas
</code></pre>

<h2 id="service-mapping"><strong>5. 使用案例 → AWS服務對應</strong></h2>

<p>這是考試中非常常見的題型：</p>

<table>
<thead><tr><th>使用案例</th><th>AWS服務</th></tr></thead>
<tbody>
<tr><td>偵測照片中的人臉</td><td>Amazon Rekognition</td></tr>
<tr><td>從發票中擷取資料</td><td>Amazon Textract</td></tr>
<tr><td>分析客戶評論情緒</td><td>Amazon Comprehend</td></tr>
<tr><td>將內容翻譯成多種語言</td><td>Amazon Translate</td></tr>
<tr><td>建立客服聊天機器人</td><td>Amazon Lex</td></tr>
<tr><td>將部落格文章轉為音訊</td><td>Amazon Polly</td></tr>
<tr><td>轉錄會議錄音</td><td>Amazon Transcribe</td></tr>
<tr><td>產品推薦</td><td>Amazon Personalize</td></tr>
<tr><td>需求預測</td><td>Amazon Forecast</td></tr>
<tr><td>搜尋內部文件</td><td>Amazon Kendra</td></tr>
<tr><td>偵測欺詐交易</td><td>Amazon Fraud Detector</td></tr>
<tr><td>標記訓練資料</td><td>SageMaker Ground Truth</td></tr>
<tr><td>建立自訂ML模型</td><td>Amazon SageMaker</td></tr>
<tr><td>商業分析師的無程式碼ML</td><td>SageMaker Canvas</td></tr>
<tr><td>用LLM生成文字</td><td>Amazon Bedrock</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>6. 練習題</strong></h2>

<p><strong>Q1：</strong>一家公司想要從掃描的發票中自動擷取文字和結構化資料。應該使用哪個AWS服務？</p>
<ul>
<li>A) Amazon Comprehend</li>
<li>B) Amazon Rekognition</li>
<li>C) Amazon Textract ✓</li>
<li>D) Amazon Translate</li>
</ul>
<p><em>解說：Textract專門設計用於從掃描文件中擷取文字、表單和表格。Comprehend分析文字含義，而非文件擷取。Rekognition用於影像/影片分析。</em></p>

<p><strong>Q2：</strong>一位資料科學家注意到其已部署的模型在過去一個月預測準確率下降了。輸入資料模式已改變。這稱為什麼？</p>
<ul>
<li>A) 過擬合</li>
<li>B) 欠擬合</li>
<li>C) 資料漂移 ✓</li>
<li>D) 特徵工程</li>
</ul>
<p><em>解說：當模型輸入資料的統計特性隨時間改變導致效能下降時，這稱為資料漂移。</em></p>

<p><strong>Q3：</strong>哪個AWS服務允許沒有ML經驗的商業分析師使用視覺介面建立ML模型？</p>
<ul>
<li>A) SageMaker Studio</li>
<li>B) SageMaker Autopilot</li>
<li>C) SageMaker Canvas ✓</li>
<li>D) SageMaker JumpStart</li>
</ul>
<p><em>解說：SageMaker Canvas為商業分析師提供無程式碼、視覺化的點擊介面。Autopilot自動化模型構建但需要一些ML知識。JumpStart提供預訓練模型。Studio是完整的ML IDE。</em></p>
