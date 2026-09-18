---
id: 019c9619-lt01-d3-l05
title: '第5課：提示工程技術'
slug: bai-5-prompt-engineering-techniques
description: >-
  Zero-shot、Few-shot、Chain-of-Thought 提示法。
  系統提示、提示範本、否定提示。
  AWS AI Practitioner 考試的提示工程最佳實踐。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 1
section_title: "領域3：基礎模型的應用（28%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS AI Practitioner（AIF-C01）認證備考'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai5-prompt-engineering.webp" alt="提示工程技術" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>提示工程技術：Zero-shot、Few-shot 與 Chain-of-Thought</em></p>
</div>

<h2 id="prompt-engineering"><strong>1. 什麼是提示工程？</strong></h2>

<p><strong>提示工程（Prompt Engineering）</strong>是設計輸入（提示）以獲得基礎模型期望輸出的藝術。它是自訂 FM 行為<strong>最便宜、最快速</strong>的方式——不需要任何訓練或微調。</p>

<h3 id="prompt-components"><strong>1.1. 提示的組成元素</strong></h3>

<pre><code class="language-text">┌────────────────────────────────────────────┐
│  系統提示 SYSTEM PROMPT（可選）              │
│  「你是一位專業的 AWS 解決方案              │
│   架構師。請簡潔回答。」                    │
├────────────────────────────────────────────┤
│  上下文 CONTEXT（可選）                     │
│  背景資訊、文件、資料                       │
├────────────────────────────────────────────┤
│  使用者提示 USER PROMPT（必填）              │
│  實際的問題或指令                           │
├────────────────────────────────────────────┤
│  範例 EXAMPLES（可選，用於 few-shot）        │
│  輸入 → 輸出配對                           │
├────────────────────────────────────────────┤
│  輸出格式 OUTPUT FORMAT（可選）              │
│  「以 JSON 回應」、「使用項目符號」          │
└────────────────────────────────────────────┘
</code></pre>

<h2 id="prompting-techniques"><strong>2. 提示技術</strong></h2>

<h3 id="zero-shot"><strong>2.1. Zero-shot 提示</strong></h3>

<p>發送提示時<strong>不提供任何範例</strong>。模型完全依賴其預訓練的知識。</p>

<pre><code class="language-text">提示："對以下評論進行情感分類：
'產品到貨時已損壞，客服也毫無幫助。'

情感："

輸出："負面"
</code></pre>

<p><strong>適用時機：</strong>模型已經能很好理解的簡單、明確定義的任務。</p>

<h3 id="few-shot"><strong>2.2. Few-shot 提示</strong></h3>

<p>在提出實際任務之前提供<strong>幾個範例</strong>。這有助於模型理解期望的格式和邏輯。</p>

<pre><code class="language-text">提示："對以下評論進行分類：

評論：'品質超棒，出貨超快！' → 正面
評論：'糟糕的體驗，再也不會了。' → 負面
評論：'還行吧，沒什麼特別的。' → 中立

評論：'這個產品超出了我的期望！' →"

輸出："正面"
</code></pre>

<p><strong>適用時機：</strong>當需要模型遵循特定格式或邏輯模式，而 zero-shot 品質不夠好時。</p>

<h3 id="one-shot"><strong>2.3. One-shot 提示</strong></h3>

<p>Few-shot 的變體，只提供<strong>1 個範例</strong>。當你想設定模式但上下文視窗有限時使用。</p>

<h3 id="cot"><strong>2.4. Chain-of-Thought（CoT）提示</strong></h3>

<p>要求模型在回答前<strong>逐步思考</strong>。對數學、邏輯和推理任務特別有效。</p>

<pre><code class="language-text">沒有 CoT：
問："如果一家商店有 3 箱蘋果，每箱 12 個，
    送出 15 個蘋果，還剩多少？"
答："21"（沒有推理過程可能會出錯）

使用 CoT：
問："請逐步思考：如果一家商店有 3 箱蘋果，
    每箱 12 個，送出 15 個蘋果，還剩多少？"
答："步驟 1：總蘋果數 = 3 × 12 = 36
    步驟 2：送出後 = 36 - 15 = 21
    答案：21 個蘋果"
</code></pre>

<blockquote>
<p><strong>考試提示：</strong>「哪種提示技術可以提高推理準確性？」→ <strong>Chain-of-Thought</strong>。關鍵短語：「逐步思考」或「解釋你的推理過程」。</p>
</blockquote>

<h2 id="system-prompts"><strong>3. 系統提示與角色設定</strong></h2>

<p><strong>系統提示</strong>定義模型的角色、行為、約束和輸出格式。它在使用者互動之前「設定舞台」。</p>

<pre><code class="language-text">系統提示：
「你是 XYZ 銀行的金融顧問 AI。
規則：
- 只回答有關銀行和投資的問題
- 絕不提供具體的股票推薦
- 始終包含免責聲明
- 以專業語氣回應
- 如果被問到非金融話題，禮貌地引導回正題」
</code></pre>

<h3 id="system-prompt-use"><strong>系統提示最佳實踐：</strong></h3>

<table>
<thead><tr><th>實踐</th><th>原因</th></tr></thead>
<tbody>
<tr><td>定義<strong>明確的角色</strong></td><td>將模型行為限制在特定領域</td></tr>
<tr><td>設定<strong>邊界</strong></td><td>防止偏離主題或有害的回應</td></tr>
<tr><td>指定<strong>輸出格式</strong></td><td>確保一致、可解析的輸出</td></tr>
<tr><td>包含<strong>範例</strong></td><td>釐清期望的行為</td></tr>
<tr><td>添加<strong>防護措施</strong></td><td>防止濫用（PII、有害內容）</td></tr>
</tbody>
</table>

<h2 id="advanced-techniques"><strong>4. 進階提示技術</strong></h2>

<h3 id="negative-prompting"><strong>4.1. 否定提示</strong></h3>

<p>明確指定模型<strong>不應該做什麼</strong>。在圖像生成中特別有用。</p>

<pre><code class="language-text">文字生成：
「摘要這篇文章。不要包含意見或個人評論。
不要超過 100 字。」

圖像生成（Stable Diffusion）：
提示：「專業頭像照，攝影棚燈光」
否定提示：「模糊、卡通、扭曲、低品質」
</code></pre>

<h3 id="prompt-templates"><strong>4.2. 提示範本</strong></h3>

<p>帶有<strong>佔位符</strong>的可重複使用提示結構，用於動態內容：</p>

<pre><code class="language-text">範本：
「根據以下 {document_type}：
---
{content}
---
擷取以下資訊：
- {field_1}
- {field_2}
- {field_3}
以 JSON 格式回應。」
</code></pre>

<h3 id="prompt-chaining"><strong>4.3. 提示鏈</strong></h3>

<p>將複雜任務分解為<strong>多個連續的提示</strong>，前一個提示的輸出成為下一個提示的輸入。</p>

<pre><code class="language-text">步驟 1：「從這份文件中擷取關鍵實體：{doc}」
         → 輸出：實體列表

步驟 2：「對於每個實體 {entities}，找出文本中
         對它表達的情感：{doc}」
         → 輸出：實體-情感配對

步驟 3：「為這些實體建立情感分析摘要報告：
         {entity_sentiments}」
         → 輸出：最終報告
</code></pre>

<h2 id="comparison"><strong>5. 考試比較表</strong></h2>

<table>
<thead><tr><th>技術</th><th>是否提供範例？</th><th>最適用於</th><th>考試關鍵字</th></tr></thead>
<tbody>
<tr><td><strong>Zero-shot</strong></td><td>無</td><td>簡單、眾所周知的任務</td><td>「未提供範例」</td></tr>
<tr><td><strong>One-shot</strong></td><td>1 個範例</td><td>以最少上下文設定格式</td><td>「單一範例」</td></tr>
<tr><td><strong>Few-shot</strong></td><td>2-5 個範例</td><td>模式跟隨、分類</td><td>「提供範例」、「示範」</td></tr>
<tr><td><strong>Chain-of-Thought</strong></td><td>含推理步驟</td><td>數學、邏輯、複雜推理</td><td>「逐步」、「推理」</td></tr>
<tr><td><strong>否定提示</strong></td><td>不適用</td><td>避免不需要的輸出</td><td>「不要包含」、「避免」</td></tr>
<tr><td><strong>提示鏈</strong></td><td>不適用</td><td>複雜的多步驟任務</td><td>「分解為步驟」、「連續」</td></tr>
</tbody>
</table>

<h2 id="inference-params"><strong>6. 推理參數回顧</strong></h2>

<p>提示工程也包括調整推理參數：</p>

<table>
<thead><tr><th>參數</th><th>低值</th><th>高值</th></tr></thead>
<tbody>
<tr><td><strong>Temperature</strong></td><td>確定性、事實性（0.0-0.3）</td><td>創意、多樣性（0.7-1.0）</td></tr>
<tr><td><strong>Top-p</strong></td><td>聚焦的詞彙（0.1-0.3）</td><td>多樣的詞彙（0.9-1.0）</td></tr>
<tr><td><strong>Top-k</strong></td><td>有限選擇（如 10）</td><td>更多選擇（如 250）</td></tr>
<tr><td><strong>Max tokens</strong></td><td>短回應</td><td>長回應</td></tr>
<tr><td><strong>Stop sequences</strong></td><td colspan="2">定義何時停止生成</td></tr>
</tbody>
</table>

<blockquote>
<p><strong>考試提示：</strong>「客服聊天機器人給出不一致的答案」→ 降低 <strong>temperature</strong>（接近 0）。「創意寫作應用程式產出無趣的文字」→ 提高 <strong>temperature</strong>（接近 1）。</p>
</blockquote>

<h2 id="best-practices"><strong>7. 提示工程最佳實踐</strong></h2>

<ol>
<li><strong>具體明確</strong>：「用 3 個要點摘要」>「摘要這個」</li>
<li><strong>提供上下文</strong>：包含相關背景資訊</li>
<li><strong>定義輸出格式</strong>：JSON、markdown、表格、項目符號</li>
<li><strong>使用分隔符</strong>：用 --- 或 ``` 分隔段落以避免提示注入</li>
<li><strong>反覆迭代</strong>：根據輸出測試和改進提示</li>
<li><strong>避免歧義</strong>：不要假設模型知道你的意圖</li>
<li><strong>使用範例</strong>：當 zero-shot 不行時，添加 few-shot 範例</li>
</ol>

<h2 id="practice-questions"><strong>8. 練習題</strong></h2>

<p><strong>Q1：</strong>一位開發者正在處理分類任務，但模型的 zero-shot 回應不一致。開發者接下來應該嘗試哪種提示技術？</p>
<ul>
<li>A) 將 temperature 降低到 0</li>
<li>B) 使用 few-shot 提示並提供範例輸入和輸出 ✓</li>
<li>C) 在自訂資料上微調模型</li>
<li>D) 切換到不同的模型供應商</li>
</ul>
<p><em>解說：Few-shot 提示是 zero-shot 失敗後的合理下一步——提供範例幫助模型理解期望的模式。微調更昂貴且複雜。僅調整 temperature 可能無法修復分類邏輯。</em></p>

<p><strong>Q2：</strong>一位客戶希望他們的 AI 應用程式更準確地解決複雜的數學應用題。哪種提示技術最能改善結果？</p>
<ul>
<li>A) Zero-shot 提示</li>
<li>B) 否定提示</li>
<li>C) Chain-of-Thought 提示 ✓</li>
<li>D) 提示鏈</li>
</ul>
<p><em>解說：Chain-of-Thought 提示鼓勵模型逐步展示推理過程，這顯著提高了數學和邏輯推理任務的準確性。</em></p>

<p><strong>Q3：</strong>在生成式 AI 應用中使用系統提示的主要好處是什麼？</p>
<ul>
<li>A) 它消除了使用者輸入的需要</li>
<li>B) 它降低了模型的推理成本</li>
<li>C) 它定義了模型的角色、行為和約束 ✓</li>
<li>D) 它取代了微調的需要</li>
</ul>
<p><em>解說：系統提示設定模型的角色、行為約束和輸出格式——在所有使用者互動中建立一致的行為，無需任何模型訓練。</em></p>
