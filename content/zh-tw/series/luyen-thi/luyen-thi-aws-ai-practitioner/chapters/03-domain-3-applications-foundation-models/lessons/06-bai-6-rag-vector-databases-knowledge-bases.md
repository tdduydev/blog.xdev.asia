---
id: 019c9619-lt01-d3-l06
title: '第6課：RAG、向量資料庫與 Bedrock Knowledge Bases'
slug: bai-6-rag-vector-databases-knowledge-bases
description: >-
  檢索增強生成（RAG）架構。
  向量資料庫、嵌入、分塊策略。
  Amazon Bedrock Knowledge Bases。RAG 與微調的比較。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 2
section_title: "領域3：基礎模型的應用（28%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS AI Practitioner（AIF-C01）認證備考'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai6-rag-architecture.webp" alt="RAG 架構" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>RAG 架構——使用 Amazon Bedrock Knowledge Bases 的索引階段與查詢階段</em></p>
</div>

<h2 id="rag-overview"><strong>1. 什麼是 RAG？</strong></h2>

<p><strong>檢索增強生成（Retrieval-Augmented Generation，RAG）</strong>是一種將 FM 與<strong>外部知識來源</strong>結合的技術，以提供更準確的答案、減少幻覺，並納入模型不知道的資訊。</p>

<h3 id="why-rag"><strong>1.1. 為什麼需要 RAG？</strong></h3>

<table>
<thead><tr><th>問題</th><th>RAG 解決方案</th></tr></thead>
<tbody>
<tr><td>知識截止日期</td><td>檢索最新文件</td></tr>
<tr><td>幻覺</td><td>基於真實資料生成回應</td></tr>
<tr><td>缺乏領域知識</td><td>添加公司專屬文件</td></tr>
<tr><td>通用回答</td><td>引用特定來源</td></tr>
<tr><td>隱私——無法將資料發送到 FM 訓練</td><td>將資料保存在自己的向量資料庫中</td></tr>
</tbody>
</table>

<h3 id="rag-flow"><strong>1.2. RAG 架構</strong></h3>

<pre><code class="language-text">RAG 管線：

┌─────────────────────────────────────────────────────────────┐
│  索引（執行一次 / 定期更新）                                  │
│                                                             │
│  文件 → 分塊 → 嵌入模型 → 向量資料庫                          │
│  (PDF, web,    (分割     (Amazon Titan     (OpenSearch,     │
│   S3 等)       文字)      Embeddings)       Aurora pgvector) │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  檢索與生成（每次查詢）                                       │
│                                                             │
│  使用者查詢 → 嵌入查詢 → 搜尋向量資料庫 → Top-K 文件          │
│                                                             │
│  增強提示 = 系統提示 + 檢索到的文件 + 查詢                     │
│                                                             │
│  增強提示 → 基礎模型 → 附帶來源的回答                         │
└─────────────────────────────────────────────────────────────┘
</code></pre>

<h2 id="chunking"><strong>2. 分塊策略</strong></h2>

<p>在建立嵌入之前，文件必須被<strong>分割成更小的片段（分塊）</strong>，切成適當大小的區段。</p>

<table>
<thead><tr><th>策略</th><th>描述</th><th>最適用於</th></tr></thead>
<tbody>
<tr><td><strong>固定大小</strong></td><td>每 N 個字元/token 分割</td><td>簡單、統一的文件</td></tr>
<tr><td><strong>基於句子</strong></td><td>在句子邊界分割</td><td>敘述性文字</td></tr>
<tr><td><strong>基於段落</strong></td><td>在段落分隔處分割</td><td>結構良好的文件</td></tr>
<tr><td><strong>語義分塊</strong></td><td>基於主題變化分割</td><td>複雜文件</td></tr>
<tr><td><strong>階層式</strong></td><td>父子分塊關係</td><td>具有章節的長文件</td></tr>
</tbody>
</table>

<h3 id="chunk-size"><strong>分塊大小的權衡：</strong></h3>

<pre><code class="language-text">小分塊（100-200 tokens）：
  ✓ 更精確的檢索
  ✗ 可能丟失上下文
  ✗ 需要搜尋更多分塊

大分塊（500-1000 tokens）：
  ✓ 保留更多上下文
  ✗ 可能包含無關資訊
  ✗ 分塊較少，粒度較低

重疊（例如分塊之間 20%）：
  ✓ 防止邊界處的資訊丟失
  ✗ 增加儲存和運算成本
</code></pre>

<blockquote>
<p><strong>考試提示：</strong>「如何提高 RAG 檢索準確性？」→ 調整<strong>分塊大小</strong>、添加<strong>重疊</strong>、使用<strong>語義分塊</strong>、改善<strong>嵌入模型</strong>。</p>
</blockquote>

<h2 id="embeddings"><strong>3. RAG 的嵌入</strong></h2>

<h3 id="embedding-models"><strong>3.1. AWS 嵌入模型</strong></h3>

<table>
<thead><tr><th>模型</th><th>模態</th><th>維度</th><th>用途</th></tr></thead>
<tbody>
<tr><td><strong>Amazon Titan Text Embeddings V2</strong></td><td>文字</td><td>256/512/1024</td><td>語義搜尋、RAG</td></tr>
<tr><td><strong>Amazon Titan Multimodal Embeddings</strong></td><td>文字 + 圖像</td><td>256/384/1024</td><td>跨模態搜尋</td></tr>
<tr><td><strong>Cohere Embed</strong></td><td>文字</td><td>1024</td><td>多語言搜尋</td></tr>
</tbody>
</table>

<h3 id="vector-db"><strong>3.2. AWS 上的向量資料庫</strong></h3>

<table>
<thead><tr><th>服務</th><th>類型</th><th>主要特點</th></tr></thead>
<tbody>
<tr><td><strong>Amazon OpenSearch Serverless</strong></td><td>託管式</td><td>向量搜尋集合類型，無伺服器</td></tr>
<tr><td><strong>Amazon Aurora PostgreSQL</strong></td><td>關聯式 + 向量</td><td>pgvector 擴充</td></tr>
<tr><td><strong>Amazon Neptune</strong></td><td>圖 + 向量</td><td>知識圖譜搭配向量搜尋</td></tr>
<tr><td><strong>Amazon DocumentDB</strong></td><td>文件 + 向量</td><td>MongoDB 相容，支援向量搜尋</td></tr>
<tr><td><strong>Amazon MemoryDB</strong></td><td>記憶體 + 向量</td><td>Redis 相容，超低延遲</td></tr>
<tr><td><strong>Pinecone（第三方）</strong></td><td>專用向量資料庫</td><td>廣受歡迎，與 Bedrock 整合</td></tr>
</tbody>
</table>

<h2 id="bedrock-kb"><strong>4. Amazon Bedrock Knowledge Bases</strong></h2>

<p><strong>Bedrock Knowledge Bases</strong> 是<strong>完全託管的 RAG 解決方案</strong>。AWS 處理分塊、嵌入、索引和檢索——你只需要指向你的資料來源。</p>

<h3 id="kb-architecture"><strong>4.1. 運作方式</strong></h3>

<pre><code class="language-text">設定：
┌───────────┐     ┌───────────────┐     ┌─────────────────┐
│ S3 Bucket │────→│ Bedrock       │────→│ 向量儲存區       │
│ (文件)     │     │ Knowledge Base│     │ (OpenSearch/     │
│           │     │ (自動分塊,    │     │  Aurora/Pinecone) │
│           │     │  自動嵌入)    │     │                  │
└───────────┘     └───────────────┘     └─────────────────┘

查詢：
┌───────────┐     ┌───────────────┐     ┌─────────────────┐
│ 使用者     │────→│ Knowledge Base│────→│ FM (Claude,      │
│ 「什麼     │     │ 檢索          │     │  Titan 等)       │
│  是...」   │     │ 相關文件      │     │ 生成回答         │
└───────────┘     └───────────────┘     └─────────────────┘
</code></pre>

<h3 id="kb-data-sources"><strong>4.2. 支援的資料來源</strong></h3>

<ul>
<li><strong>Amazon S3</strong>：PDF、TXT、MD、HTML、DOC、CSV</li>
<li><strong>Web Crawler</strong>：自動抓取網站</li>
<li><strong>Confluence</strong>：Atlassian Confluence 頁面</li>
<li><strong>SharePoint</strong>：Microsoft SharePoint 文件</li>
<li><strong>Salesforce</strong>：Salesforce 知識文章</li>
</ul>

<h3 id="kb-features"><strong>4.3. 主要功能</strong></h3>

<table>
<thead><tr><th>功能</th><th>優勢</th></tr></thead>
<tbody>
<tr><td><strong>託管分塊</strong></td><td>自動分割文件（固定、語義、階層式）</td></tr>
<tr><td><strong>自動同步</strong></td><td>資料變更時定期重新索引</td></tr>
<tr><td><strong>來源標註</strong></td><td>回答時附帶來源文件</td></tr>
<tr><td><strong>中繼資料過濾</strong></td><td>按自訂中繼資料欄位過濾分塊</td></tr>
<tr><td><strong>混合搜尋</strong></td><td>結合語義搜尋 + 關鍵字搜尋</td></tr>
<tr><td><strong>Guardrails 整合</strong></td><td>對 RAG 回應套用安全過濾器</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong>「一家公司想建立一個聊天機器人，從存儲在 S3 中的內部文件回答問題，且自訂程式碼最少」→ <strong>Amazon Bedrock Knowledge Bases</strong>。</p>
</blockquote>

<h2 id="rag-vs-finetuning"><strong>5. RAG 與微調的比較</strong></h2>

<table>
<thead><tr><th>因素</th><th>RAG</th><th>微調</th></tr></thead>
<tbody>
<tr><td><strong>目的</strong></td><td>存取外部/最新資料</td><td>教授新技能/領域模式</td></tr>
<tr><td><strong>資料新鮮度</strong></td><td>始終保持最新</td><td>固定在訓練時間</td></tr>
<tr><td><strong>需要訓練嗎？</strong></td><td>不需要模型訓練</td><td>是的，需要標記資料 + 運算</td></tr>
<tr><td><strong>成本</strong></td><td>向量資料庫 + 檢索成本</td><td>訓練運算 + 儲存</td></tr>
<tr><td><strong>幻覺</strong></td><td>減少（基於資料）</td><td>仍可能產生幻覺</td></tr>
<tr><td><strong>延遲</strong></td><td>略高（檢索步驟）</td><td>與基礎模型相同</td></tr>
<tr><td><strong>最適用於</strong></td><td>問答、搜尋、知識庫</td><td>風格、語氣、領域特定模式</td></tr>
<tr><td><strong>資料隱私</strong></td><td>資料保留在你的向量資料庫中</td><td>資料用於訓練過程</td></tr>
</tbody>
</table>

<h3 id="when-to-use"><strong>決策矩陣：</strong></h3>

<pre><code class="language-text">「需要從公司文件回答問題？」         → RAG
「需要即時/最新資訊？」             → RAG
「需要改變模型的寫作風格？」         → 微調
「需要模型遵循特定格式？」           → 先嘗試提示 → 然後微調
「需要領域特定術語？」               → RAG（如果在文件中）或微調（如果是模式）
「最少努力/成本？」                  → RAG > 提示工程 > 微調
</code></pre>

<h2 id="rag-evaluation"><strong>6. 評估 RAG 品質</strong></h2>

<table>
<thead><tr><th>指標</th><th>衡量內容</th></tr></thead>
<tbody>
<tr><td><strong>忠實度</strong></td><td>回答是否基於檢索到的文件？（無幻覺）</td></tr>
<tr><td><strong>相關性</strong></td><td>檢索到的文件是否與查詢相關？</td></tr>
<tr><td><strong>答案正確性</strong></td><td>最終答案是否事實正確？</td></tr>
<tr><td><strong>上下文精確度</strong></td><td>檢索到的分塊中有多少百分比實際相關？</td></tr>
<tr><td><strong>上下文召回率</strong></td><td>是否檢索到所有相關的分塊？</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>7. 練習題</strong></h2>

<p><strong>Q1：</strong>一家醫療公司想要一個 AI 助手，從存儲在 Amazon S3 中的最新醫學研究論文回答問題。資訊每週更新。哪種方法最合適？</p>
<ul>
<li>A) 在論文上微調基礎模型</li>
<li>B) 使用 RAG 搭配 Amazon Bedrock Knowledge Bases ✓</li>
<li>C) 使用 zero-shot 提示搭配大上下文視窗</li>
<li>D) 在醫學資料上預訓練自訂模型</li>
</ul>
<p><em>解說：RAG 搭配 Bedrock Knowledge Bases 是理想選擇——它自動索引 S3 文件，每次查詢檢索相關資訊，並透過自動同步保持回應為最新，無需重新訓練。</em></p>

<p><strong>Q2：</strong>在 RAG 管線中，分塊文件的主要目的是什麼？</p>
<ul>
<li>A) 降低儲存成本</li>
<li>B) 將文件分割成可管理的片段以進行嵌入和檢索 ✓</li>
<li>C) 加密敏感資料</li>
<li>D) 將文件轉換為不同的檔案格式</li>
</ul>
<p><em>解說：分塊將大型文件分割成較小的、語義上有意義的片段，可以單獨進行嵌入和檢索。這使得能夠精確檢索相關資訊，而不是處理整個文件。</em></p>

<p><strong>Q3：</strong>一家公司建立了 RAG 應用程式，但有時會回傳檢索到的文件不支援的答案。他們應該專注於改善哪個指標？</p>
<ul>
<li>A) 上下文召回率</li>
<li>B) 答案長度</li>
<li>C) 忠實度 ✓</li>
<li>D) 回應延遲</li>
</ul>
<p><em>解說：忠實度衡量生成的答案是否基於檢索到的文件。低忠實度表示模型生成了超出檢索到的上下文所支援的資訊（RAG 情境中的幻覺）。</em></p>
