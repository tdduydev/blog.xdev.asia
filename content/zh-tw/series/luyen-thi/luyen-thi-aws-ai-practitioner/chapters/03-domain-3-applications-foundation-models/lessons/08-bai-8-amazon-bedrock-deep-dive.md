---
id: 019c9619-lt01-d3-l08
title: '第8課：Amazon Bedrock 深度剖析'
slug: bai-8-amazon-bedrock-deep-dive
description: >-
  Amazon Bedrock：所有功能。Agents、Guardrails、Model Evaluation。
  PartyRock 遊樂場。Amazon Q Developer 與 Amazon Q Business。
  選擇合適的 FM。定價模式。
duration_minutes: 65
is_free: true
video_url: null
sort_order: 4
section_title: "領域3：基礎模型的應用（28%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS AI Practitioner（AIF-C01）認證備考'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai8-bedrock-architecture.webp" alt="Amazon Bedrock 架構" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Amazon Bedrock 架構——基礎模型、Agents、Guardrails 和 Knowledge Bases</em></p>
</div>

<h2 id="bedrock-overview"><strong>1. Amazon Bedrock 概覽</strong></h2>

<p><strong>Amazon Bedrock</strong> 是一項完全託管的服務，透過單一 API 提供<strong>來自多個供應商的 FM</strong> 存取權限，以及自訂、部署和保護 AI 應用程式的工具。</p>

<h3 id="bedrock-key-features"><strong>1.1. 核心價值主張</strong></h3>

<ul>
<li><strong>選擇</strong>：存取來自 Amazon、Anthropic、Meta、Mistral、Cohere、Stability AI、AI21 Labs 的 FM</li>
<li><strong>自訂</strong>：微調、持續預訓練、RAG（Knowledge Bases）</li>
<li><strong>安全</strong>：資料保留在你的 AWS 帳戶中、加密、不用於訓練模型</li>
<li><strong>無伺服器</strong>：無需管理基礎設施</li>
<li><strong>整合</strong>：原生 AWS 服務整合（IAM、CloudWatch、CloudTrail）</li>
</ul>

<h3 id="fm-providers"><strong>1.2. Bedrock 上的基礎模型供應商</strong></h3>

<table>
<thead><tr><th>供應商</th><th>模型</th><th>優勢</th></tr></thead>
<tbody>
<tr><td><strong>Amazon</strong></td><td>Titan Text、Titan Embeddings、Titan Image Generator</td><td>通用、嵌入、圖像生成</td></tr>
<tr><td><strong>Anthropic</strong></td><td>Claude 3 Haiku、Sonnet、Opus</td><td>複雜推理、分析、視覺</td></tr>
<tr><td><strong>Meta</strong></td><td>Llama 2、Llama 3</td><td>開源、可自訂</td></tr>
<tr><td><strong>Mistral AI</strong></td><td>Mistral、Mixtral</td><td>快速、高效、多語言</td></tr>
<tr><td><strong>Cohere</strong></td><td>Command、Embed</td><td>企業文字、多語言嵌入</td></tr>
<tr><td><strong>Stability AI</strong></td><td>Stable Diffusion XL</td><td>圖像生成</td></tr>
<tr><td><strong>AI21 Labs</strong></td><td>Jurassic</td><td>文字生成、摘要</td></tr>
</tbody>
</table>

<h2 id="bedrock-features"><strong>2. Bedrock 功能深度剖析</strong></h2>

<h3 id="bedrock-agents"><strong>2.1. Amazon Bedrock Agents</strong></h3>

<p>Agents 允許 FM <strong>執行多步驟任務</strong>，自動規劃、執行操作和使用工具。</p>

<pre><code class="language-text">使用者：「預訂下週五從河內到東京的機票」

Agent 工作流程：
1. 規劃：需要搜尋航班、檢查可用性、預訂
2. 操作：呼叫航班搜尋 API → 找到可用航班
3. 觀察：找到 3 個航班，最便宜的是 $450
4. 操作：呼叫預訂 API → 預訂航班
5. 回應：「已預訂 VN 航班 HAN→NRT，12 月 20 日，$450」
</code></pre>

<h3 id="agent-components"><strong>Agent 組件：</strong></h3>

<table>
<thead><tr><th>組件</th><th>用途</th></tr></thead>
<tbody>
<tr><td><strong>基礎模型</strong></td><td>負責推理和規劃的大腦</td></tr>
<tr><td><strong>指令</strong></td><td>定義 agent 角色的系統提示</td></tr>
<tr><td><strong>動作群組</strong></td><td>Agent 可呼叫的 API（Lambda 函數或 OpenAPI schema）</td></tr>
<tr><td><strong>Knowledge Bases</strong></td><td>用於資訊檢索的 RAG 資料來源</td></tr>
<tr><td><strong>Guardrails</strong></td><td>安全和合規過濾器</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong>「一個 AI 助手需要查詢訂單狀態、檢查庫存和處理退貨」→ <strong>Bedrock Agent</strong> 搭配連接到業務 API 的動作群組。</p>
</blockquote>

<h3 id="bedrock-guardrails"><strong>2.2. Amazon Bedrock Guardrails</strong></h3>

<p>Guardrails 為 AI 應用程式實施<strong>安全控制</strong>：</p>

<table>
<thead><tr><th>Guardrail 類型</th><th>功能</th><th>範例</th></tr></thead>
<tbody>
<tr><td><strong>內容過濾器</strong></td><td>封鎖有害內容類別</td><td>仇恨、暴力、色情、侮辱</td></tr>
<tr><td><strong>禁止主題</strong></td><td>封鎖特定主題</td><td>「不要討論競爭對手的產品」</td></tr>
<tr><td><strong>詞彙過濾器</strong></td><td>封鎖特定字詞/片語</td><td>不雅用語、禁用術語</td></tr>
<tr><td><strong>PII 過濾器</strong></td><td>偵測和遮蔽 PII</td><td>社會安全號碼、信用卡號碼、電子郵件</td></tr>
<tr><td><strong>上下文基礎</strong></td><td>檢查回應是否基於上下文</td><td>防止 RAG 中的幻覺</td></tr>
</tbody>
</table>

<pre><code class="language-text">Guardrails 流程：
使用者輸入 → [輸入 Guardrails] → FM 處理 → [輸出 Guardrails] → 使用者
              檢查：                        檢查：
              - 禁止主題                     - 有害內容
              - 有害輸入                     - 回應中的 PII
              - 輸入中的 PII                 - 偏離主題的回應
                                             - 基礎檢查
</code></pre>

<h3 id="bedrock-eval"><strong>2.3. 模型評估</strong></h3>

<p>為你的特定用途比較和評估 FM：</p>

<ul>
<li><strong>自動評估</strong>：BERTScore、準確性、毒性指標</li>
<li><strong>人工評估</strong>：人類審查員根據自訂標準評分</li>
<li><strong>A/B 比較</strong>：模型並排比較</li>
<li><strong>自訂任務</strong>：上傳你自己的測試資料集</li>
</ul>

<h3 id="bedrock-playground"><strong>2.4. Bedrock 遊樂場</strong></h3>

<table>
<thead><tr><th>遊樂場</th><th>用途</th></tr></thead>
<tbody>
<tr><td><strong>文字遊樂場</strong></td><td>互動式測試文字模型</td></tr>
<tr><td><strong>聊天遊樂場</strong></td><td>測試對話式模型</td></tr>
<tr><td><strong>圖像遊樂場</strong></td><td>測試圖像生成模型</td></tr>
</tbody>
</table>

<h2 id="partyrock"><strong>3. Amazon PartyRock</strong></h2>

<p><strong>PartyRock</strong> 是 Bedrock 的<strong>免費、無程式碼遊樂場</strong>——讓任何人都能在不需要 AWS 帳戶或程式設計技能的情況下建立生成式 AI 應用程式。</p>

<table>
<thead><tr><th>功能</th><th>詳情</th></tr></thead>
<tbody>
<tr><td><strong>不需要 AWS 帳戶</strong></td><td>使用社群登入免費使用</td></tr>
<tr><td><strong>無需程式設計</strong></td><td>拖放式應用程式建構器</td></tr>
<tr><td><strong>可分享</strong></td><td>透過 URL 分享應用程式</td></tr>
<tr><td><strong>用途</strong></td><td>學習、原型設計、實驗</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong>「一個非技術的行銷團隊想要在沒有 AWS 帳戶的情況下實驗生成式 AI」→ <strong>PartyRock</strong>。</p>
</blockquote>

<h2 id="amazon-q"><strong>4. Amazon Q</strong></h2>

<h3 id="q-developer"><strong>4.1. Amazon Q Developer</strong></h3>

<p>為開發者設計的 AI 程式設計助手：</p>

<ul>
<li><strong>程式碼生成</strong>：從自然語言撰寫程式碼</li>
<li><strong>程式碼解說</strong>：解釋現有程式碼</li>
<li><strong>程式碼轉換</strong>：升級 Java 版本、.NET 遷移</li>
<li><strong>除錯</strong>：識別和修復錯誤</li>
<li><strong>安全掃描</strong>：找出程式碼中的漏洞</li>
<li><strong>IDE 整合</strong>：VS Code、JetBrains、AWS Console</li>
</ul>

<h3 id="q-business"><strong>4.2. Amazon Q Business</strong></h3>

<p>為企業使用者設計的 AI 助手：</p>

<ul>
<li><strong>連接企業資料</strong>：S3、SharePoint、Confluence、Salesforce 等</li>
<li><strong>基於公司資料的問答</strong>：根據連接的資料來源回答</li>
<li><strong>尊重存取控制</strong>：來自連接系統的 ACL</li>
<li><strong>外掛</strong>：建立工單（Jira）、發送電子郵件等</li>
</ul>

<h3 id="q-vs-bedrock"><strong>4.3. Amazon Q vs Bedrock</strong></h3>

<table>
<thead><tr><th>功能</th><th>Amazon Q</th><th>Amazon Bedrock</th></tr></thead>
<tbody>
<tr><td><strong>目標使用者</strong></td><td>終端使用者（開發者、企業）</td><td>建構 AI 應用程式的開發者</td></tr>
<tr><td><strong>自訂</strong></td><td>有限（連接資料來源）</td><td>完整（微調、RAG、agents）</td></tr>
<tr><td><strong>託管</strong></td><td>完全託管的助手</td><td>FM 的 API/SDK 存取</td></tr>
<tr><td><strong>用途</strong></td><td>生產力工具</td><td>建構自訂 AI 應用程式</td></tr>
</tbody>
</table>

<h2 id="pricing"><strong>5. Bedrock 定價模式</strong></h2>

<table>
<thead><tr><th>定價模式</th><th>運作方式</th><th>最適用於</th></tr></thead>
<tbody>
<tr><td><strong>隨需</strong></td><td>按輸入/輸出 token 計費</td><td>流量不穩定、不可預測的工作負載</td></tr>
<tr><td><strong>佈建輸送量</strong></td><td>預留模型單位（按小時）</td><td>穩定的生產工作負載</td></tr>
<tr><td><strong>批次推理</strong></td><td>提交批次作業（最多便宜 50%）</td><td>大規模、非即時處理</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong>「具有可預測流量的生成式 AI 工作負載成本最佳化？」→ <strong>佈建輸送量</strong>。「一夜之間處理數千份文件？」→ <strong>批次推理</strong>。</p>
</blockquote>

<h2 id="choosing-fm"><strong>6. 如何選擇合適的 FM</strong></h2>

<pre><code class="language-text">決策框架：
┌─────────────────────────────────────────────────┐
│ 1. 任務類型                                      │
│    文字？圖像？程式碼？多模態？                    │
├─────────────────────────────────────────────────┤
│ 2. 複雜度                                        │
│    簡單分類 → 較小的模型                          │
│    複雜推理 → 較大的模型                          │
├─────────────────────────────────────────────────┤
│ 3. 延遲需求                                      │
│    即時 → 較小/較快的模型 (Haiku)                 │
│    批次處理 → 較大的模型 (Opus)                   │
├─────────────────────────────────────────────────┤
│ 4. 成本限制                                      │
│    預算有限 → 較小的模型                          │
│    品質優先 → 較大的模型                          │
├─────────────────────────────────────────────────┤
│ 5. 自訂需求                                      │
│    需要微調？檢查支援的模型                       │
│    LoRA？檢查相容性                               │
├─────────────────────────────────────────────────┤
│ 6. 使用 Model Evaluation 評估                     │
│    並排測試候選模型                               │
└─────────────────────────────────────────────────┘
</code></pre>

<h2 id="other-services"><strong>7. 其他 AWS 生成式 AI 服務</strong></h2>

<table>
<thead><tr><th>服務</th><th>功能</th></tr></thead>
<tbody>
<tr><td><strong>Amazon CodeWhisperer</strong></td><td>現為 Amazon Q Developer 的一部分（程式碼建議）</td></tr>
<tr><td><strong>AWS App Studio</strong></td><td>用自然語言建構企業應用程式</td></tr>
<tr><td><strong>Amazon SageMaker JumpStart</strong></td><td>使用 SageMaker 部署開源 FM</td></tr>
<tr><td><strong>Amazon Comprehend</strong></td><td>NLP 服務（情感、實體、主題——預建）</td></tr>
<tr><td><strong>Amazon Transcribe</strong></td><td>語音轉文字</td></tr>
<tr><td><strong>Amazon Polly</strong></td><td>文字轉語音</td></tr>
<tr><td><strong>Amazon Translate</strong></td><td>機器翻譯</td></tr>
<tr><td><strong>Amazon Rekognition</strong></td><td>圖像/影片分析</td></tr>
<tr><td><strong>Amazon Textract</strong></td><td>從文件擷取文字（OCR+）</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>8. 練習題</strong></h2>

<p><strong>Q1：</strong>一家零售公司想建立一個 AI 助手，可以檢查庫存、處理退貨，以及從產品目錄回答產品問題。他們應該使用哪個 Amazon Bedrock 功能？</p>
<ul>
<li>A) Bedrock Guardrails</li>
<li>B) 僅 Bedrock Knowledge Bases</li>
<li>C) Bedrock Agents 搭配動作群組和 Knowledge Bases ✓</li>
<li>D) Bedrock Model Evaluation</li>
</ul>
<p><em>解說：Bedrock Agents 可以透過呼叫 API（用於庫存/退貨的動作群組）和檢索資訊（用於產品目錄的 Knowledge Bases）來協調多步驟任務。</em></p>

<p><strong>Q2：</strong>哪個 Amazon Bedrock 功能應該用來防止生成式 AI 應用程式討論競爭對手的產品，並過濾個人身份資訊（PII）？</p>
<ul>
<li>A) Bedrock Knowledge Bases</li>
<li>B) Bedrock Custom Models</li>
<li>C) Bedrock Guardrails ✓</li>
<li>D) Bedrock Agents</li>
</ul>
<p><em>解說：Guardrails 提供禁止主題過濾（封鎖競爭對手討論）和 PII 偵測/遮蔽。它們可以同時應用於 FM 呼叫的輸入和輸出。</em></p>

<p><strong>Q3：</strong>一家公司想在一夜之間使用基礎模型處理 50,000 則客戶評論進行情感分析。哪種 Bedrock 定價模式最具成本效益？</p>
<ul>
<li>A) 隨需定價</li>
<li>B) 佈建輸送量</li>
<li>C) 批次推理 ✓</li>
<li>D) 免費方案</li>
</ul>
<p><em>解說：批次推理專為大規模、非即時工作負載設計，與隨需定價相比可節省高達 50% 的成本。非常適合夜間處理。</em></p>
