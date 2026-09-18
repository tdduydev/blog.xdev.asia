---
id: 019c9619-lt01-d4-l09
title: '第9課：負責任AI——公平性、偏差與透明度'
slug: bai-9-responsible-ai-fairness-bias-transparency
description: >-
  負責任AI原則。偏差的類型（資料、演算法、社會）。
  公平性指標、模型可解釋性（SHAP、LIME）。
  AWS AI Service Cards，AI中的透明度。
duration_minutes: 55
is_free: true
video_url: null
sort_order: 1
section_title: "領域4：負責任AI準則（14%）"
course:
  id: 019c9619-lt01-7001-c001-lt0100000001
  title: 'AWS AI Practitioner（AIF-C01）認證備考'
  slug: luyen-thi-aws-ai-practitioner
---

<div style="text-align: center; margin: 2rem 0;">
<img src="/storage/uploads/2026/04/aws-aif-bai9-responsible-ai-pillars.webp" alt="負責任AI支柱" style="max-width: 800px; width: 100%; border-radius: 12px;" />
<p><em>負責任AI支柱與ML管線中的偏差進入點</em></p>
</div>

<h2 id="responsible-ai"><strong>1. 什麼是負責任AI？</strong></h2>

<p><strong>負責任AI</strong>是一個確保AI系統以<strong>道德、公平、透明和負責</strong>的方式開發和使用的框架。</p>

<h3 id="pillars"><strong>1.1. 負責任AI的支柱</strong></h3>

<table>
<thead><tr><th>支柱</th><th>定義</th><th>範例</th></tr></thead>
<tbody>
<tr><td><strong>公平性</strong></td><td>公平對待所有群體</td><td>貸款審核模型不因種族而歧視</td></tr>
<tr><td><strong>可解釋性</strong></td><td>理解模型為何做出該決策</td><td>「您的貸款被拒是因為負債收入比 > 0.5」</td></tr>
<tr><td><strong>透明度</strong></td><td>清楚說明AI的能力與限制</td><td>當內容是AI生成時予以揭露</td></tr>
<tr><td><strong>隱私</strong></td><td>保護個人資料</td><td>未經同意不在PII上訓練</td></tr>
<tr><td><strong>安全性</strong></td><td>防止有害輸出</td><td>內容過濾器、防護機制</td></tr>
<tr><td><strong>穩健性</strong></td><td>在對抗條件下仍可靠</td><td>抵禦提示注入攻擊</td></tr>
<tr><td><strong>治理</strong></td><td>監督和問責</td><td>對高風險決策進行人工審查</td></tr>
</tbody>
</table>

<h2 id="bias"><strong>2. 理解AI中的偏差</strong></h2>

<h3 id="bias-types"><strong>2.1. 偏差的類型</strong></h3>

<table>
<thead><tr><th>偏差類型</th><th>內容</th><th>範例</th></tr></thead>
<tbody>
<tr><td><strong>選擇偏差</strong></td><td>訓練資料無法代表總體</td><td>招聘模型僅用科技公司資料訓練</td></tr>
<tr><td><strong>衡量偏差</strong></td><td>資料收集不一致</td><td>不同人口群體的影像品質不同</td></tr>
<tr><td><strong>確認偏差</strong></td><td>模型強化現有模式</td><td>推薦系統只展示使用者已喜歡的內容</td></tr>
<tr><td><strong>標記偏差</strong></td><td>人工標記員引入偏差</td><td>不同標註者之間情感標記不一致</td></tr>
<tr><td><strong>演算法偏差</strong></td><td>模型架構放大偏差</td><td>最佳化準確率偏向多數群體</td></tr>
<tr><td><strong>回憶偏差</strong></td><td>過度代表的歷史模式</td><td>某些地區有更多逮捕資料→預測該地區犯罪更多</td></tr>
<tr><td><strong>抽樣偏差</strong></td><td>非隨機資料收集</td><td>線上調查遺漏年長族群</td></tr>
</tbody>
</table>

<h3 id="bias-lifecycle"><strong>2.2. 偏差在ML生命週期中的進入點</strong></h3>

<pre><code class="language-text">資料收集        資料處理        模型訓練        評估          部署
  ↓                ↓               ↓             ↓            ↓
選擇偏差        特徵工程       演算法偏差       評估          回饋
抽樣偏差        缺失值         最佳化           指標偏差      迴路偏差
衡量偏差        編碼選擇       目標函數                       使用者偏差
</code></pre>

<blockquote>
<p><strong>考試提示：</strong>「偏差可以在ML管線的哪個階段被引入？」→ <strong>每個階段</strong>——資料收集、預處理、模型訓練、評估和部署。這就是為什麼在整個生命週期中進行監控至關重要。</p>
</blockquote>

<h2 id="fairness"><strong>3. 公平性指標</strong></h2>

<h3 id="fairness-concepts"><strong>3.1. 關鍵公平性概念</strong></h3>

<table>
<thead><tr><th>概念</th><th>定義</th></tr></thead>
<tbody>
<tr><td><strong>人口統計均等</strong></td><td>各群體以相同比率獲得正面結果</td></tr>
<tr><td><strong>機會均等</strong></td><td>各群體之間真陽性率相等</td></tr>
<tr><td><strong>均等化勝算</strong></td><td>各群體之間TPR和FPR相等</td></tr>
<tr><td><strong>個體公平性</strong></td><td>相似的個體獲得相似的結果</td></tr>
<tr><td><strong>差異性影響</strong></td><td>群體間正面結果的比率（80%規則）</td></tr>
</tbody>
</table>

<h3 id="detect-bias"><strong>3.2. 偵測偏差</strong></h3>

<ul>
<li><strong>訓練前</strong>：分析訓練資料在各人口群體中的分佈</li>
<li><strong>訓練後</strong>：比較模型在各群體中的預測</li>
<li><strong>執行時</strong>：監控即時預測中公平性指標的漂移</li>
</ul>

<h2 id="explainability"><strong>4. 模型可解釋性</strong></h2>

<p><strong>可解釋性</strong> = 理解模型<strong>為什麼</strong>做出特定預測的能力。</p>

<h3 id="explainability-methods"><strong>4.1. 可解釋性技術</strong></h3>

<table>
<thead><tr><th>技術</th><th>類型</th><th>功能</th></tr></thead>
<tbody>
<tr><td><strong>SHAP</strong>（SHapley Additive exPlanations）</td><td>模型無關</td><td>顯示每個特徵對預測的貢獻</td></tr>
<tr><td><strong>LIME</strong>（Local Interpretable Model-agnostic Explanations）</td><td>模型無關</td><td>透過局部近似來解釋個別預測</td></tr>
<tr><td><strong>特徵重要性</strong></td><td>模型特定</td><td>按影響力排名特徵</td></tr>
<tr><td><strong>注意力視覺化</strong></td><td>Transformer特定</td><td>顯示模型關注了哪些token</td></tr>
<tr><td><strong>部分依賴圖</strong></td><td>模型無關</td><td>顯示特徵如何影響預測</td></tr>
</tbody>
</table>

<pre><code class="language-text">SHAP 範例：
貸款申請：拒絕

特徵貢獻：
  負債收入比：           +0.42（推向拒絕）
  信用評分：             +0.28（推向拒絕）
  工作年資：             -0.15（推向核准）
  貸款金額：             +0.08（推向拒絕）
  年齡：                 -0.03（中性）
                        ─────────────
  基準（平均預測）：      0.45
  最終預測：             0.45 + 0.42 + 0.28 - 0.15 + 0.08 - 0.03 = 1.05 → 拒絕
</code></pre>

<blockquote>
<p><strong>考試提示：</strong>「如何解釋ML模型為何拒絕貸款申請？」→ <strong>SHAP值</strong>——顯示每個特徵對個別預測的貢獻。AWS上的<strong>SageMaker Clarify</strong>提供此功能。</p>
</blockquote>

<h2 id="transparency"><strong>5. AI中的透明度</strong></h2>

<h3 id="ai-service-cards"><strong>5.1. AWS AI Service Cards</strong></h3>

<p><strong>AI Service Cards</strong>是AWS提供的公開文件，為AWS AI服務提供透明度：</p>

<ul>
<li><strong>預期用途</strong>：服務設計的用途</li>
<li><strong>限制</strong>：已知的限制和故障模式</li>
<li><strong>設計選擇</strong>：模型如何建構</li>
<li><strong>最佳實踐</strong>：建議的使用模式</li>
<li><strong>公平性考量</strong>：已知的人口群體效能差異</li>
</ul>

<p>適用於：Amazon Rekognition、Textract、Comprehend、Transcribe等。</p>

<h3 id="model-cards"><strong>5.2. 模型卡片</strong></h3>

<p><strong>模型卡片</strong>（來自SageMaker）是你為<strong>自己的模型</strong>建立的內部文件：</p>

<ul>
<li>模型描述和預期用途</li>
<li>訓練資料詳情</li>
<li>各子群體的效能指標</li>
<li>倫理考量</li>
<li>限制和風險</li>
</ul>

<h3 id="transparency-practices"><strong>5.3. 透明度最佳實踐</strong></h3>

<table>
<thead><tr><th>實踐</th><th>方式</th></tr></thead>
<tbody>
<tr><td>揭露AI使用</td><td>告知使用者他們正在與AI互動</td></tr>
<tr><td>來源標註</td><td>在RAG應用程式中引用來源</td></tr>
<tr><td>信心分數</td><td>向使用者展示模型的信心程度</td></tr>
<tr><td>限制揭露</td><td>記錄模型不能做的事情</td></tr>
<tr><td>浮水印</td><td>標記AI生成的內容（圖像、文字）</td></tr>
</tbody>
</table>

<h2 id="toxicity"><strong>6. 毒性與有害內容</strong></h2>

<h3 id="toxicity-types"><strong>有害內容的類型：</strong></h3>

<ul>
<li><strong>仇恨言論</strong>：針對受保護群體的內容</li>
<li><strong>暴力</strong>：血腥或宣揚暴力</li>
<li><strong>色情內容</strong>：露骨或不當</li>
<li><strong>自我傷害</strong>：宣揚自殘或自殺</li>
<li><strong>錯誤資訊</strong>：以事實方式呈現的不正確內容</li>
<li><strong>提示注入</strong>：覆蓋系統指令的惡意提示</li>
</ul>

<h3 id="toxicity-mitigation"><strong>緩解策略：</strong></h3>

<ol>
<li><strong>內容過濾器</strong>：自動偵測和封鎖（Bedrock Guardrails）</li>
<li><strong>人工審查</strong>：高風險內容採用人在迴路</li>
<li><strong>輸入清理</strong>：驗證和清理使用者輸入</li>
<li><strong>輸出過濾</strong>：在向使用者展示之前檢查模型輸出</li>
<li><strong>紅隊測試</strong>：部署前的對抗性測試</li>
</ol>

<h2 id="practice-questions"><strong>7. 練習題</strong></h2>

<p><strong>Q1：</strong>一個招聘AI系統持續將男性候選人排名高於同等資格的女性候選人。最可能存在哪種類型的偏差？</p>
<ul>
<li>A) 衡量偏差</li>
<li>B) 訓練資料中的選擇偏差 ✓</li>
<li>C) 確認偏差</li>
<li>D) 回憶偏差</li>
</ul>
<p><em>解說：如果訓練資料包含偏向男性候選人的歷史招聘決策，模型就會學習並複製該選擇偏差。訓練資料未能公平地代表合格人口。</em></p>

<p><strong>Q2：</strong>一家銀行被監管機構要求解釋每筆貸款申請被核准或拒絕的原因。哪個AWS服務功能可以提供每次預測的解釋？</p>
<ul>
<li>A) Amazon Bedrock Guardrails</li>
<li>B) 帶有SHAP值的Amazon SageMaker Clarify ✓</li>
<li>C) Amazon Comprehend情感分析</li>
<li>D) AWS AI Service Cards</li>
</ul>
<p><em>解說：SageMaker Clarify計算SHAP值，顯示每個特徵對個別預測的貢獻，提供監管機構所需的可解釋性。</em></p>

<p><strong>Q3：</strong>哪個AWS資源提供關於AWS AI服務預期用途、限制和公平性考量的公開文件？</p>
<ul>
<li>A) SageMaker模型卡片</li>
<li>B) AWS AI Service Cards ✓</li>
<li>C) Amazon Bedrock Model Evaluation</li>
<li>D) AWS Trusted Advisor</li>
</ul>
<p><em>解說：AWS AI Service Cards是公開文件，提供AWS AI服務（如Rekognition、Textract和Comprehend）的設計、限制和最佳實踐的透明度。模型卡片是用於你自己的自訂模型。</em></p>
