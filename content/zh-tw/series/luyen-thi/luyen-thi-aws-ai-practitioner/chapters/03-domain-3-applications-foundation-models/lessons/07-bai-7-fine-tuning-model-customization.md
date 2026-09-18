---
id: 019c9619-lt01-d3-l07
title: '第7課：微調與模型自訂'
slug: bai-7-fine-tuning-model-customization
description: >-
  預訓練 vs 微調 vs RLHF。PEFT 與 LoRA。
  持續預訓練。Amazon Bedrock Custom Models。
  訓練資料準備、評估、部署。
duration_minutes: 50
is_free: true
video_url: null
sort_order: 3
section_title: "領域3：基礎模型的應用（28%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS AI Practitioner（AIF-C01）認證備考'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai7-finetuning-spectrum.webp" alt="模型自訂範圍" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>模型自訂範圍：從提示工程到從零開始預訓練</em></p>
</div>

<h2 id="customization-spectrum"><strong>1. 模型自訂範圍</strong></h2>

<p>自訂 FM 行為有多種方式，從簡單到複雜：</p>

<pre><code class="language-text">最少工作量                                    最多工作量
──────────────────────────────────────────────────────────
提示       Few-shot      RAG       微調       持續         預訓練
工程       提示                               預訓練
──────────────────────────────────────────────────────────
無需訓練                   ←                 →    完整訓練
$ 最便宜                   ←                 →    $$$$ 最昂貴
幾分鐘                     ←                 →    數週/數月
</code></pre>

<h2 id="fine-tuning"><strong>2. 微調</strong></h2>

<p><strong>微調（Fine-tuning）</strong>= 在<strong>你的特定資料集</strong>上進一步訓練現有的 FM，以提高在你的領域/任務上的表現。</p>

<h3 id="when-fine-tune"><strong>2.1. 何時需要微調？</strong></h3>

<table>
<thead><tr><th>需要微調的情況...</th><th>不需要微調的情況...</th></tr></thead>
<tbody>
<tr><td>需要特定的風格、語氣或格式</td><td>只需要事實問答（使用 RAG）</td></tr>
<tr><td>領域特定的語言模式</td><td>任務用提示就能運作良好</td></tr>
<tr><td>提高特定任務的準確性</td><td>沒有標記的訓練資料</td></tr>
<tr><td>縮小提示大小（內化指令）</td><td>資料頻繁變更（使用 RAG）</td></tr>
<tr><td>需要一致的輸出格式</td><td>預算有限</td></tr>
</tbody>
</table>

<h3 id="fine-tune-types"><strong>2.2. 微調的類型</strong></h3>

<table>
<thead><tr><th>類型</th><th>內容</th><th>資料格式</th><th>用途</th></tr></thead>
<tbody>
<tr><td><strong>指令微調</strong></td><td>在提示-回應配對上訓練</td><td>{"prompt": "...", "completion": "..."}</td><td>更好地遵循指令</td></tr>
<tr><td><strong>領域適應</strong></td><td>在領域文字上訓練</td><td>領域文件（醫學、法律）</td><td>學習領域術語</td></tr>
<tr><td><strong>任務特定</strong></td><td>在特定任務範例上訓練</td><td>任務輸入-輸出配對</td><td>分類、擷取</td></tr>
</tbody>
</table>

<h2 id="peft"><strong>3. PEFT 與 LoRA</strong></h2>

<h3 id="peft-overview"><strong>3.1. 參數高效微調（PEFT）</strong></h3>

<p>完整微調會更新<strong>所有模型參數</strong>——昂貴且需要大量 GPU 記憶體。PEFT 方法只更新<strong>一小部分參數</strong>。</p>

<pre><code class="language-text">完整微調：
  模型：70 億個參數
  更新：70 億個參數（100%）
  GPU 記憶體：非常高
  成本：$$$$

PEFT (LoRA)：
  模型：70 億個參數
  更新：約 1000 萬個參數（0.1%）
  GPU 記憶體：低得多
  成本：$$
</code></pre>

<h3 id="lora"><strong>3.2. LoRA（低秩適應）</strong></h3>

<p>LoRA 在模型層中添加<strong>小型可訓練矩陣</strong>，而不是更新所有權重：</p>

<ul>
<li>凍結原始模型權重</li>
<li>添加小型「適配器」矩陣（秩分解）</li>
<li>只訓練這些小型適配器</li>
<li>推理時：將適配器與原始權重合併</li>
</ul>

<blockquote>
<p><strong>考試提示：</strong>「哪種技術可以在保持品質的同時降低微調成本？」→ <strong>LoRA / PEFT</strong>。關鍵概念：只訓練一小部分參數而非全部。</p>
</blockquote>

<h2 id="continued-pretraining"><strong>4. 持續預訓練</strong></h2>

<p><strong>持續預訓練（Continued Pre-training）</strong>在<strong>大量無標記的領域資料</strong>上訓練 FM——在針對任務特定資料進行微調<em>之前</em>，教導模型新的詞彙和概念。</p>

<pre><code class="language-text">工作流程：
基礎 FM → 持續預訓練 → 微調 → 評估
           (領域語料庫，     (標記的        (在保留
            無標記)           任務資料)      資料上測試)

範例：
基礎 Claude → 在 10 萬篇醫學論文上訓練 → 在醫學問答
              (持續預訓練)                配對上微調
              學習：醫學術語、              學習：如何回答
              藥物名稱、手術程序            臨床問題
</code></pre>

<h3 id="cpt-vs-ft"><strong>持續預訓練 vs 微調：</strong></h3>

<table>
<thead><tr><th>面向</th><th>持續預訓練</th><th>微調</th></tr></thead>
<tbody>
<tr><td><strong>資料</strong></td><td>大量、無標記的領域文字</td><td>較小、有標記的任務資料</td></tr>
<tr><td><strong>目標</strong></td><td>學習領域知識</td><td>學習任務特定行為</td></tr>
<tr><td><strong>成本</strong></td><td>更昂貴（更大的資料量）</td><td>較不昂貴</td></tr>
<tr><td><strong>時機</strong></td><td>模型缺乏領域詞彙</td><td>模型需要執行特定任務</td></tr>
</tbody>
</table>

<h2 id="rlhf"><strong>5. RLHF（人類反饋強化學習）</strong></h2>

<p>RLHF 用於<strong>對齊</strong>模型輸出與人類偏好——使輸出更有幫助、更真實、更無害。</p>

<pre><code class="language-text">RLHF 管線：
1. 收集人類反饋        2. 訓練獎勵模型       3. 使用 RL 最佳化
   「哪個回應比較         學習：人類              FM 生成 →
    好？A 還是 B？」      偏好什麼                獎勵模型評分 →
                                                 更新 FM 權重
</code></pre>

<p>RLHF 主要由 <strong>FM 供應商</strong>（Anthropic、Meta、Amazon）執行——通常不由終端使用者操作。但你應該為考試了解這個概念。</p>

<h2 id="bedrock-custom"><strong>6. Amazon Bedrock Custom Models</strong></h2>

<p>Bedrock 提供兩種自訂方法：</p>

<h3 id="bedrock-ft"><strong>6.1. Bedrock 中的微調</strong></h3>

<table>
<thead><tr><th>功能</th><th>詳情</th></tr></thead>
<tbody>
<tr><td><strong>支援的模型</strong></td><td>Amazon Titan、Meta Llama、Cohere</td></tr>
<tr><td><strong>資料格式</strong></td><td>JSONL，包含 prompt-completion 配對</td></tr>
<tr><td><strong>資料位置</strong></td><td>Amazon S3</td></tr>
<tr><td><strong>輸出</strong></td><td>Bedrock 中的自訂模型版本</td></tr>
<tr><td><strong>佈建輸送量</strong></td><td>使用微調模型時必須</td></tr>
</tbody>
</table>

<h3 id="bedrock-cpt"><strong>6.2. Bedrock 中的持續預訓練</strong></h3>

<table>
<thead><tr><th>功能</th><th>詳情</th></tr></thead>
<tbody>
<tr><td><strong>支援的模型</strong></td><td>Amazon Titan、Meta Llama、Cohere</td></tr>
<tr><td><strong>資料格式</strong></td><td>純文字檔案（無標記）</td></tr>
<tr><td><strong>用途</strong></td><td>微調前的領域適應</td></tr>
</tbody>
</table>

<h3 id="bedrock-training-data"><strong>6.3. 訓練資料準備</strong></h3>

<pre><code class="language-json">// 微調資料格式（JSONL）：
{"prompt": "Drug X 的建議劑量是多少？", "completion": "Drug X 的建議劑量為成人每日兩次 500mg。"}
{"prompt": "列出 Drug X 的副作用。", "completion": "常見副作用包括頭痛、噁心和暈眩。"}
</code></pre>

<h3 id="bedrock-model-eval"><strong>6.4. Bedrock 中的模型評估</strong></h3>

<p>Amazon Bedrock Model Evaluation 允許你比較模型：</p>

<ul>
<li><strong>自動評估</strong>：內建指標（準確性、穩健性、毒性）</li>
<li><strong>人工評估</strong>：人類審查員評分模型輸出</li>
<li><strong>比較模型</strong>：不同 FM 的並排比較</li>
</ul>

<blockquote>
<p><strong>考試提示：</strong>「如何比較兩個基礎模型在特定用途上的品質？」→ <strong>Amazon Bedrock Model Evaluation</strong>。支援自動指標和人工評估。</p>
</blockquote>

<h2 id="data-prep"><strong>7. 訓練資料最佳實踐</strong></h2>

<table>
<thead><tr><th>實踐</th><th>原因</th></tr></thead>
<tbody>
<tr><td><strong>高品質資料</strong></td><td>垃圾進 = 垃圾出</td></tr>
<tr><td><strong>多樣化範例</strong></td><td>防止過擬合到狹窄的模式</td></tr>
<tr><td><strong>平衡的類別</strong></td><td>避免偏向多數類別</td></tr>
<tr><td><strong>乾淨的資料</strong></td><td>移除重複、錯誤、PII</td></tr>
<tr><td><strong>足夠的數量</strong></td><td>微調通常需要 1000+ 筆</td></tr>
<tr><td><strong>訓練/驗證分割</strong></td><td>在未見過的資料上評估</td></tr>
<tr><td><strong>格式一致性</strong></td><td>所有範例使用相同結構</td></tr>
</tbody>
</table>

<h2 id="summary-table"><strong>8. 總結：何時使用什麼</strong></h2>

<table>
<thead><tr><th>場景</th><th>最佳方法</th></tr></thead>
<tbody>
<tr><td>簡單任務，模型已經很擅長</td><td>提示工程</td></tr>
<tr><td>需要模型遵循特定模式</td><td>Few-shot 提示</td></tr>
<tr><td>需要從公司文件回答問題</td><td>RAG</td></tr>
<tr><td>需要特定風格/語氣/格式</td><td>微調</td></tr>
<tr><td>模型不認識領域詞彙</td><td>持續預訓練 + 微調</td></tr>
<tr><td>與人類偏好對齊</td><td>RLHF（由 FM 供應商執行）</td></tr>
</tbody>
</table>

<h2 id="practice-questions"><strong>9. 練習題</strong></h2>

<p><strong>Q1：</strong>一家律師事務所希望他們的 AI 助手以事務所批准的特定寫作風格生成法律文件。他們有 5,000 份已批准文件的範例。哪種自訂方法最合適？</p>
<ul>
<li>A) RAG 搭配知識庫</li>
<li>B) Zero-shot 提示</li>
<li>C) 在已批准的文件範例上微調 ✓</li>
<li>D) 在法律教科書上持續預訓練</li>
</ul>
<p><em>解說：微調是用有標記的範例教導模型特定寫作風格的理想方法。RAG 是用於檢索資訊，而非學習風格。持續預訓練會教導法律概念，但不會教導事務所的特定風格。</em></p>

<p><strong>Q2：</strong>哪種技術允許在只更新模型一小部分參數的情況下微調大型語言模型？</p>
<ul>
<li>A) 完整微調</li>
<li>B) LoRA（低秩適應） ✓</li>
<li>C) 持續預訓練</li>
<li>D) RLHF</li>
</ul>
<p><em>解說：LoRA 是一種 PEFT（參數高效微調）方法，它添加小型可訓練適配器矩陣，同時凍結原始模型權重——通常更新不到總參數的 1%。</em></p>

<p><strong>Q3：</strong>一家公司微調了一個基礎模型，但模型在訓練資料上表現良好，在新資料上表現不佳。這個問題叫什麼？</p>
<ul>
<li>A) 欠擬合</li>
<li>B) 過擬合 ✓</li>
<li>C) 高偏差</li>
<li>D) 資料漂移</li>
</ul>
<p><em>解說：過擬合發生在模型記住訓練資料而非學習通用模式時。解決方案包括：更多訓練資料、正則化、降低學習率、早停或資料增強。</em></p>
