---
id: 019c9619-lt01-d2-l03
title: '第3課：生成式AI與基礎模型'
slug: bai-3-generative-ai-foundation-models
description: >-
  什麼是生成式AI。基礎模型：預訓練、微調。
  類型：文字轉文字、文字轉圖像、文字轉程式碼。分詞。
  模型參數、推論、temperature、top-p、top-k。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: "領域2：生成式AI基礎（24%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS AI Practitioner（AIF-C01）認證備考'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai3-foundation-model-lifecycle.webp" alt="基礎模型生命週期" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>基礎模型生命週期 — 預訓練、微調、RAG和提示工程</em></p>
</div>

<h2 id="overview"><strong>領域2概覽</strong></h2>

<p>領域2佔<strong>考試的24%</strong> — 這是第二大領域。您需要對生成式AI、基礎模型以及它們與傳統ML的區別有扎實的理解。</p>

<h2 id="what-is-genai"><strong>1. 什麼是生成式AI？</strong></h2>

<p><strong>生成式AI</strong>是AI的一個分支，專注於基於從訓練資料中學習的模式<strong>創建新內容</strong>（文字、圖像、程式碼、音訊、影片）。</p>

<h3 id="discriminative-vs-generative"><strong>判別式AI vs 生成式AI</strong></h3>

<table>
<thead><tr><th>面向</th><th>判別式AI</th><th>生成式AI</th></tr></thead>
<tbody>
<tr><td><strong>功能</strong></td><td>分類/預測</td><td>創建/生成</td></tr>
<tr><td><strong>輸出</strong></td><td>標籤、類別、數值</td><td>新內容（文字、圖像、程式碼）</td></tr>
<tr><td><strong>範例</strong></td><td>「這封郵件是垃圾郵件嗎？」→ 是/否</td><td>「寫一封關於...的郵件」→ 新郵件</td></tr>
<tr><td><strong>模型</strong></td><td>邏輯迴歸、SVM、CNN分類器</td><td>GPT、Claude、Stable Diffusion、DALL-E</td></tr>
</tbody>
</table>

<h3 id="genai-modalities"><strong>生成式AI模態</strong></h3>

<table>
<thead><tr><th>輸入 → 輸出</th><th>範例</th><th>模型</th></tr></thead>
<tbody>
<tr><td><strong>文字 → 文字</strong></td><td>聊天機器人、摘要、翻譯</td><td>GPT-4、Claude、Llama</td></tr>
<tr><td><strong>文字 → 圖像</strong></td><td>從描述生成圖像</td><td>DALL-E、Stable Diffusion、Titan Image Generator</td></tr>
<tr><td><strong>文字 → 程式碼</strong></td><td>程式碼生成、除錯</td><td>CodeWhisperer、Copilot</td></tr>
<tr><td><strong>文字 → 音訊</strong></td><td>語音合成、音樂生成</td><td>Amazon Polly（TTS）</td></tr>
<tr><td><strong>圖像 → 文字</strong></td><td>圖像描述、視覺問答</td><td>Claude（多模態）、GPT-4V</td></tr>
<tr><td><strong>音訊 → 文字</strong></td><td>轉錄</td><td>Amazon Transcribe、Whisper</td></tr>
</tbody>
</table>

<h2 id="foundation-models"><strong>2. 基礎模型</strong></h2>

<p><strong>基礎模型（FM）</strong>是一種非常大的AI模型，已在<strong>大規模資料集上預訓練</strong>，可以適應許多不同的下游任務。</p>

<h3 id="fm-characteristics"><strong>關鍵特性</strong></h3>

<ul>
<li><strong>大規模預訓練</strong>：在數十億資料點上訓練（互聯網文字、書籍、程式碼）</li>
<li><strong>通用型</strong>：無需特定任務訓練即可處理多種任務</li>
<li><strong>可適應</strong>：可通過微調或提示適應特定用例</li>
<li><strong>訓練成本高</strong>：需要大規模運算（GPU/TPU集群）</li>
<li><strong>通過API存取</strong>：用戶不需要訓練 — 通過API使用（Amazon Bedrock）</li>
</ul>

<h3 id="fm-lifecycle"><strong>基礎模型生命週期</strong></h3>

<pre><code class="language-text">┌─────────────────┐     ┌──────────────┐     ┌──────────────┐
│ 1. 預訓練        │────→│ 2. 微調       │────→│ 3. 推論       │
│ （大規模資料、    │     │ （適應特定    │     │ （通過API或   │
│  數十億參數、     │     │  領域）       │     │  端點使用     │
│  非常昂貴）       │     │              │     │  模型）       │
└─────────────────┘     └──────────────┘     └──────────────┘
     模型提供者              您/組織              用戶
   （Anthropic、Meta、                      （應用程式）
    Amazon等）
</code></pre>

<h2 id="tokenization"><strong>3. 分詞</strong></h2>

<p><strong>分詞</strong>是將文字分成模型可以理解的小單位（<strong>token</strong>）的過程。</p>

<pre><code class="language-text">輸入：  "Machine learning is amazing!"
Token：["Machine", " learning", " is", " amazing", "!"]
         token_1    token_2      token_3  token_4    token_5

或（子詞分詞）：
Token：["Mach", "ine", " learn", "ing", " is", " amaz", "ing", "!"]
</code></pre>

<h3 id="token-key-points"><strong>考試關鍵概念：</strong></h3>

<ul>
<li><strong>Token ≠ 詞</strong>：一個token可以是詞的一部分、整個詞或標點符號</li>
<li><strong>上下文視窗</strong>：模型一次可以處理的最大token數（輸入 + 輸出）</li>
<li><strong>Token限制</strong>：決定模型可以「看到」和生成多少文字</li>
<li><strong>定價</strong>：API呼叫通常按token計價（輸入token + 輸出token）</li>
</ul>

<blockquote>
<p><strong>考試提示：</strong>上下文視窗大小很重要。較大的上下文 = 可以處理更長的文件。但成本更高，可能更慢。</p>
</blockquote>

<h2 id="model-parameters"><strong>4. 模型參數與推論設定</strong></h2>

<h3 id="model-params"><strong>4.1. 模型參數（訓練期間學習）</strong></h3>

<ul>
<li><strong>參數</strong> = 神經網路中的權重和偏差</li>
<li>GPT-4：約1.7兆參數，Claude：未公開，Llama 3：8B/70B/405B</li>
<li>更多參數 → 通常更強大，但成本更高</li>
</ul>

<h3 id="inference-params"><strong>4.2. 推論參數（由用戶設定）</strong></h3>

<p>呼叫模型時，您可以調整<strong>推論參數</strong>：</p>

<table>
<thead><tr><th>參數</th><th>範圍</th><th>控制內容</th></tr></thead>
<tbody>
<tr><td><strong>Temperature</strong></td><td>0.0 → 1.0+</td><td>隨機性/創造性。低 = 確定性、集中。高 = 創造性、多樣。</td></tr>
<tr><td><strong>Top-p（核採樣）</strong></td><td>0.0 → 1.0</td><td>累積機率閾值。較低 = 更集中的詞彙。</td></tr>
<tr><td><strong>Top-k</strong></td><td>1 → ∞</td><td>要考慮的前k個token。較低 = 更可預測。</td></tr>
<tr><td><strong>最大token數</strong></td><td>1 → 限制</td><td>生成輸出的最大長度。</td></tr>
<tr><td><strong>停止序列</strong></td><td>字串</td><td>告訴模型停止生成的文字。</td></tr>
</tbody>
</table>

<h3 id="temperature-guide"><strong>考試Temperature指南</strong></h3>

<pre><code class="language-text">Temperature = 0  →  最確定性（事實問答、程式碼、資料擷取）
Temperature = 0.3 → 略有創造性（商業寫作、摘要）
Temperature = 0.7 → 有創造性（故事、腦力激盪、行銷文案）
Temperature = 1.0+ → 非常隨機（詩歌、創意寫作 — 可能更多幻覺）
</code></pre>

<blockquote>
<p><strong>考試提示：</strong>「一家公司需要一致、準確的客戶FAQ回答」→ 使用<strong>低temperature</strong>。「一家公司需要創意行銷口號」→ 使用<strong>高temperature</strong>。</p>
</blockquote>

<h2 id="hallucination"><strong>5. 幻覺</strong></h2>

<p><strong>幻覺</strong>是模型生成<strong>自信但不正確</strong>的輸出 — 捏造事實、引用或不存在的資訊。</p>

<h3 id="hallucination-causes"><strong>原因：</strong></h3>
<ul>
<li>訓練資料的缺口或過時資訊</li>
<li>模型並非真正「知道」事實 — 它預測可能的下一個token</li>
<li>模糊或太開放的提示</li>
<li>高temperature設定</li>
</ul>

<h3 id="hallucination-mitigation"><strong>緩解策略：</strong></h3>
<table>
<thead><tr><th>策略</th><th>如何幫助</th></tr></thead>
<tbody>
<tr><td><strong>RAG</strong>（檢索增強生成）</td><td>基於知識庫中的實際資料來回答</td></tr>
<tr><td><strong>降低temperature</strong></td><td>減少生成的隨機性</td></tr>
<tr><td><strong>護欄</strong></td><td>過濾/驗證輸出（Amazon Bedrock Guardrails）</td></tr>
<tr><td><strong>更好的提示</strong></td><td>「只根據提供的上下文回答」/「不確定就說不知道」</td></tr>
<tr><td><strong>微調</strong></td><td>用特定領域的準確資料訓練模型</td></tr>
<tr><td><strong>人工審查</strong></td><td>人機協作驗證</td></tr>
</tbody>
</table>

<h2 id="fm-on-aws"><strong>6. AWS上的基礎模型（Amazon Bedrock）</strong></h2>

<p>Amazon Bedrock提供來自多個供應商的多種基礎模型：</p>

<table>
<thead><tr><th>供應商</th><th>模型</th><th>優勢</th></tr></thead>
<tbody>
<tr><td><strong>Anthropic</strong></td><td>Claude 3（Haiku、Sonnet、Opus）</td><td>推理、安全性、長上下文</td></tr>
<tr><td><strong>Meta</strong></td><td>Llama 3</td><td>開源、多用途</td></tr>
<tr><td><strong>Amazon</strong></td><td>Titan（Text、Embeddings、Image）</td><td>AWS原生、RAG用嵌入向量</td></tr>
<tr><td><strong>Mistral AI</strong></td><td>Mistral、Mixtral</td><td>高效、快速推論</td></tr>
<tr><td><strong>Stability AI</strong></td><td>Stable Diffusion</td><td>圖像生成</td></tr>
<tr><td><strong>Cohere</strong></td><td>Command、Embed</td><td>企業NLP、嵌入向量</td></tr>
<tr><td><strong>AI21 Labs</strong></td><td>Jurassic</td><td>文字生成</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>7. 練習題</strong></h2>

<p><strong>Q1：</strong>與傳統ML模型相比，基礎模型的主要優勢是什麼？</p>
<ul>
<li>A) 它們更小更快</li>
<li>B) 它們可以無需特定任務訓練即可適應多種下游任務 ✓</li>
<li>C) 它們從不產生錯誤的輸出</li>
<li>D) 它們不需要任何運算資源</li>
</ul>
<p><em>解說：基礎模型在大規模資料集上預訓練，可以通過提示或微調適應多種不同任務。它們很大，可能會產生幻覺，仍然需要運算資源。</em></p>

<p><strong>Q2：</strong>一家公司使用生成式AI模型，注意到它有時會生成看似合理但事實不正確的資訊。這種現象叫什麼？</p>
<ul>
<li>A) 過擬合</li>
<li>B) 資料漂移</li>
<li>C) 幻覺 ✓</li>
<li>D) 偏差</li>
</ul>
<p><em>解說：幻覺是指生成式AI模型產生自信但事實不正確的輸出。</em></p>

<p><strong>Q3：</strong>一位開發人員想確保其生成式AI聊天機器人提供一致、事實性的回答，並盡量減少創造性。他們應該調整哪個推論參數？</p>
<ul>
<li>A) 將最大token數設得很高</li>
<li>B) 將temperature設為接近0 ✓</li>
<li>C) 將temperature設為接近1</li>
<li>D) 增加top-k值</li>
</ul>
<p><em>解說：低temperature使模型更確定性和集中，減少回答的創造性和隨機性。</em></p>
