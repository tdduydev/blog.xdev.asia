---
id: 019c9619-lt01-d2-l04
title: '第4課：LLM、Transformer與多模態模型'
slug: bai-4-llm-transformers-multimodal
description: >-
  Transformer架構：注意力機制、自注意力。
  GPT（僅解碼器）、BERT（僅編碼器）、T5（編碼器-解碼器）。
  多模態模型。幻覺：原因與緩解。
  嵌入向量與向量表示。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 2
section_title: "領域2：生成式AI基礎（24%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS AI Practitioner（AIF-C01）認證備考'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai4-transformer-architecture.webp" alt="Transformer架構" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>Transformer架構 — 編碼器堆疊、解碼器堆疊，以及BERT/GPT/T5變體</em></p>
</div>

<h2 id="transformer"><strong>1. Transformer架構</strong></h2>

<p>Transformer是一種<strong>革新了NLP</strong>的神經網路架構，在2017年的論文「Attention Is All You Need」中提出。幾乎所有當前的LLM都基於Transformer。</p>

<h3 id="attention"><strong>1.1. 自注意力機制</strong></h3>

<p>自注意力允許模型考慮輸入中<strong>所有詞之間的關係</strong>，無論距離遠近。</p>

<pre><code class="language-text">輸入："The cat sat on the mat because it was tired"

自注意力回答："it"指的是什麼？
→ 注意力集中在"cat"（高注意力分數）
→ 不是"mat"（低注意力分數）

傳統RNN在這種長距離依賴關係上會遇到困難。
</code></pre>

<h3 id="encoder-decoder"><strong>1.2. 編碼器-解碼器架構</strong></h3>

<pre><code class="language-text">原始Transformer：
┌──────────────────────────┐
│        編碼器             │  ← 理解輸入
│  （自注意力 +             │
│   前饋層）                │
├──────────────────────────┤
│        解碼器             │  ← 生成輸出
│  （遮罩自注意力 +         │
│   交叉注意力 +            │
│   前饋層）                │
└──────────────────────────┘
</code></pre>

<h3 id="transformer-types"><strong>1.3. 三種Transformer類型</strong></h3>

<table>
<thead><tr><th>類型</th><th>架構</th><th>最適用於</th><th>模型</th></tr></thead>
<tbody>
<tr><td><strong>僅編碼器</strong></td><td>編碼器</td><td>理解文字（分類、NER、情緒分析）</td><td>BERT、RoBERTa、DistilBERT</td></tr>
<tr><td><strong>僅解碼器</strong></td><td>解碼器</td><td>生成文字（聊天機器人、內容創建）</td><td>GPT-4、Claude、Llama</td></tr>
<tr><td><strong>編碼器-解碼器</strong></td><td>兩者</td><td>序列到序列（翻譯、摘要）</td><td>T5、BART</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong>「哪種架構最適合文字生成？」→ <strong>僅解碼器</strong>（GPT、Claude）。「哪種架構最適合文字分類？」→ <strong>僅編碼器</strong>（BERT）。</p>
</blockquote>

<h2 id="llm"><strong>2. 大型語言模型（LLM）</strong></h2>

<p>LLM是專門用於文字的基礎模型 — 在大規模文字語料庫上訓練，以理解和生成人類語言。</p>

<h3 id="llm-capabilities"><strong>2.1. LLM能力</strong></h3>

<table>
<thead><tr><th>能力</th><th>描述</th><th>範例</th></tr></thead>
<tbody>
<tr><td><strong>文字生成</strong></td><td>創建新的文字內容</td><td>文章、郵件、故事</td></tr>
<tr><td><strong>摘要</strong></td><td>濃縮長篇文字</td><td>文件摘要</td></tr>
<tr><td><strong>翻譯</strong></td><td>在語言之間轉換</td><td>英文 → 中文</td></tr>
<tr><td><strong>問答</strong></td><td>回答問題</td><td>客戶支援、FAQ</td></tr>
<tr><td><strong>程式碼生成</strong></td><td>編寫和解釋程式碼</td><td>Amazon Q Developer</td></tr>
<tr><td><strong>文字分類</strong></td><td>分類文字</td><td>情緒分析</td></tr>
<tr><td><strong>推理</strong></td><td>邏輯分析</td><td>數學問題、逐步推理</td></tr>
</tbody>
</table>

<h3 id="llm-limitations"><strong>2.2. LLM限制</strong></h3>

<ul>
<li><strong>知識截止日期</strong>：不知道訓練資料截止日期後的事件</li>
<li><strong>幻覺</strong>：可以自信地生成虛假資訊</li>
<li><strong>上下文視窗限制</strong>：無法處理無限文字</li>
<li><strong>無即時資料</strong>：無法存取網路或即時資料（除非增強）</li>
<li><strong>成本高</strong>：大型模型推論需要大量運算</li>
<li><strong>偏差</strong>：可能反映訓練資料中的偏差</li>
</ul>

<h2 id="embeddings"><strong>3. 嵌入向量與向量表示</strong></h2>

<p><strong>嵌入向量</strong>將文字（或圖像、音訊）轉換為機器可以理解的<strong>數值向量</strong>。含義相似的文字在多維空間中會有接近的向量。</p>

<pre><code class="language-text">文字："King"     → [0.23, 0.87, -0.12, 0.45, ...]
文字："Queen"    → [0.21, 0.89, -0.15, 0.43, ...]  ← 接近的向量！
文字："Banana"   → [0.91, -0.32, 0.67, -0.88, ...] ← 距離很遠

關係：King - Man + Woman ≈ Queen
</code></pre>

<h3 id="embeddings-use"><strong>考試中嵌入向量的重要性：</strong></h3>

<ul>
<li><strong>語意搜尋</strong>：基於含義（而非僅關鍵字）找到相似的文件</li>
<li><strong>RAG</strong>：將文件轉為嵌入向量，存入向量資料庫，檢索相關上下文</li>
<li><strong>聚類</strong>：將相似的文件/句子分組</li>
<li><strong>Amazon Titan Embeddings</strong>：專門用於創建文字嵌入向量的AWS模型</li>
</ul>

<h3 id="vector-db"><strong>向量資料庫</strong></h3>

<p>高效儲存和搜尋嵌入向量：</p>

<table>
<thead><tr><th>向量資料庫</th><th>備註</th></tr></thead>
<tbody>
<tr><td><strong>Amazon OpenSearch Serverless</strong></td><td>AWS受管向量搜尋</td></tr>
<tr><td><strong>Amazon Aurora（pgvector）</strong></td><td>帶向量擴展的PostgreSQL</td></tr>
<tr><td><strong>Pinecone</strong></td><td>流行的第三方向量資料庫</td></tr>
<tr><td><strong>Amazon Bedrock Knowledge Bases</strong></td><td>受管RAG — 內部處理向量儲存</td></tr>
</tbody>
</table>

<h2 id="multimodal"><strong>4. 多模態模型</strong></h2>

<p><strong>多模態模型</strong>可以處理和生成<strong>多種資料類型</strong>（文字 + 圖像 + 音訊 + 影片）的內容。</p>

<h3 id="multimodal-examples"><strong>AWS上的範例：</strong></h3>

<table>
<thead><tr><th>模型</th><th>模態</th><th>功能</th></tr></thead>
<tbody>
<tr><td><strong>Claude 3</strong>（Anthropic）</td><td>文字 + 圖像輸入 → 文字輸出</td><td>描述圖像、分析圖表、視覺問答</td></tr>
<tr><td><strong>Amazon Titan Image Generator</strong></td><td>文字 → 圖像</td><td>從文字描述創建圖像</td></tr>
<tr><td><strong>Amazon Titan Multimodal Embeddings</strong></td><td>文字 + 圖像 → 向量</td><td>跨文字和圖像搜尋</td></tr>
<tr><td><strong>Stable Diffusion</strong>（Stability AI）</td><td>文字 → 圖像</td><td>生成和編輯圖像</td></tr>
</tbody>
</table>

<h3 id="multimodal-usecases"><strong>考試中的多模態使用案例：</strong></h3>

<ul>
<li>「分析產品圖像並生成描述」→ 多模態模型（Claude 3 Vision）</li>
<li>「從文字描述生成產品圖像」→ 文字轉圖像（Titan Image Generator、Stable Diffusion）</li>
<li>「跨文字文件和圖像搜尋」→ 多模態嵌入向量</li>
</ul>

<h2 id="diffusion"><strong>5. 擴散模型</strong></h2>

<p>擴散模型（如Stable Diffusion）的工作原理：</p>

<ol>
<li><strong>正向過程</strong>：逐步向圖像添加雜訊直到變成純雜訊</li>
<li><strong>反向過程</strong>：學習逐步去除雜訊，生成新圖像</li>
</ol>

<pre><code class="language-text">訓練（正向）：
乾淨圖像 → 添加雜訊 → 添加更多雜訊 → ... → 純雜訊

生成（反向）：
純雜訊 → 去除雜訊 → 去除更多雜訊 → ... → 新圖像
                    （由文字提示引導）
</code></pre>

<blockquote>
<p><strong>考試提示：</strong>您不需要知道詳細的數學 — 只需理解概念：擴散模型通過<strong>在文字提示引導下逐步去除雜訊</strong>來創建圖像。</p>
</blockquote>

<h2 id="training-types"><strong>6. 預訓練 vs 微調 vs 提示</strong></h2>

<table>
<thead><tr><th>方法</th><th>內容</th><th>所需資料</th><th>成本</th><th>使用時機</th></tr></thead>
<tbody>
<tr><td><strong>預訓練</strong></td><td>從頭開始訓練</td><td>數十億範例</td><td>$$$$</td><td>創建新FM（由供應商完成）</td></tr>
<tr><td><strong>微調</strong></td><td>進一步訓練現有FM</td><td>數千範例</td><td>$$</td><td>特定領域知識</td></tr>
<tr><td><strong>提示工程</strong></td><td>精心設計輸入</td><td>無（少量範例）</td><td>$</td><td>快速適應，無需訓練</td></tr>
<tr><td><strong>RAG</strong></td><td>用外部資料增強</td><td>知識庫</td><td>$</td><td>存取當前/專有資料</td></tr>
</tbody>
</table>

<h3 id="decision-tree"><strong>考試決策樹：</strong></h3>

<pre><code class="language-text">需要模型了解特定領域知識？
├── 知識在您可以提供的文件中？
│   └── 是 → RAG（Bedrock Knowledge Bases）
│   └── 否，模型需要學習模式 →
│       ├── 有數千個訓練範例？→ 微調
│       └── 只有少量範例？→ 少樣本提示
├── 通用知識就夠了？→ 提示工程（零樣本/少樣本）
</code></pre>

<h2 id="practice-questions"><strong>7. 練習題</strong></h2>

<p><strong>Q1：</strong>一家公司想要跨產品圖像和文字描述搜尋相關資訊。哪種類型的模型最合適？</p>
<ul>
<li>A) 純文字LLM</li>
<li>B) 多模態嵌入向量模型 ✓</li>
<li>C) 擴散模型</li>
<li>D) RNN模型</li>
</ul>
<p><em>解說：多模態嵌入向量模型可以在同一向量空間中創建文字和圖像的向量表示，實現跨模態搜尋。</em></p>

<p><strong>Q2：</strong>哪種Transformer架構最適合聊天機器人和內容創建等文字生成任務？</p>
<ul>
<li>A) 僅編碼器（BERT）</li>
<li>B) 僅解碼器（GPT、Claude） ✓</li>
<li>C) 編碼器-解碼器（T5）</li>
<li>D) 卷積神經網路（CNN）</li>
</ul>
<p><em>解說：僅解碼器架構一次生成一個token（自回歸），是大多數現代聊天機器人和文字生成器的基礎。</em></p>

<p><strong>Q3：</strong>在生成式AI應用中，文字嵌入向量的用途是什麼？</p>
<ul>
<li>A) 壓縮檔案以進行儲存</li>
<li>B) 將文字轉換為捕捉語意含義的數值向量 ✓</li>
<li>C) 加密文字以確保安全</li>
<li>D) 在語言之間翻譯文字</li>
</ul>
<p><em>解說：嵌入向量是捕捉語意含義的文字數值向量表示。相似的文字具有相似的向量，可用於語意搜尋、RAG和聚類。</em></p>
