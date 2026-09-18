---
id: 01970000-a1b2-7c03-d004-e5f6a7b8c0e1
title: "AI新聞摘要 2026年4月5日：Microsoft發布3款新模型、Holo3刷新電腦使用SoTA、Anthropic斥資4億美元收購生技新創"
slug: ai-news-digest-05-04-2026
excerpt: >-
  本週AI業界格外熱鬧：Microsoft同步發表MAI基礎模型三款（語音辨識、語音生成、圖像），H Company的Holo3在OSWorld基準測試以78.85%達成SoTA，Anthropic以4億美元收購生技新創，並決定將OpenClaw從Claude Code訂閱方案中排除。
featured_image: /images/blog/ban-tin-ai-05-04-2026.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-04-05T08:00:00.000000Z'
created_at: '2026-04-05T08:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: AI, slug: ai}, {name: News, slug: news}, {name: LLM, slug: llm}, {name: Microsoft, slug: microsoft}, {name: Anthropic, slug: anthropic}, {name: OpenAI, slug: openai}]
locale: zh-tw
comments: []
---

過去72小時，AI業界接連傳出重大消息。Microsoft攜帶3款比Google與OpenAI更平價的新基礎模型，正式加入AI模型競爭；H Company以Holo3刷新電腦使用的SoTA；Anthropic一面以4億美元收購生技新創，一面決定將OpenClaw排除在Claude Code訂閱範疇外，引發軒然大波。

---

## 📰 快速摘要

| 事件 | 組織 | 日期 | 重要性 |
|-----|------|------|--------|
| 發表MAI-Transcribe-1、MAI-Voice-1、MAI-Image-2 | Microsoft | 4/2 | ⭐⭐⭐⭐⭐ |
| Holo3在OSWorld達成78.85% SoTA | H Company | 4/1 | ⭐⭐⭐⭐⭐ |
| 收購Coefficient Bio——4億美元 | Anthropic | 4/3 | ⭐⭐⭐⭐ |
| Claude Code將OpenClaw排除、另行收費 | Anthropic | 4/4 | ⭐⭐⭐⭐ |
| COO、CMO、CEO相繼異動 | OpenAI | 4/3 | ⭐⭐⭐ |

---

## 1. Microsoft發表3款MAI基礎模型——「比Google和OpenAI更平價」

2026年4月2日，由Mustafa Suleyman領導的**Microsoft AI**在**Microsoft Foundry**與**MAI Playground**上宣布推出3款全新基礎模型：

- **MAI-Transcribe-1**：語音轉文字模型，支援**25種語言**，處理速度是Azure Fast的**2.5倍**，定價**0.36美元/小時**。
- **MAI-Voice-1**：語音生成模型，**1秒內可生成60秒音訊**，支援客製化語音。定價從**22美元/100萬字元**起。
- **MAI-Image-2**：圖像與影片生成模型，自3月19日起已在MAI Playground試用，現正式發布。定價為文字輸入**5美元/100萬tokens**、圖像輸出**33美元/100萬tokens**。

這三款模型是2025年11月成立的**MAI Superintelligence Team**推出的首批產品。Suleyman表示：「我們正在打造人文主義AI——以人為核心，針對人類真實溝通方式進行優化的AI。」

值得注意的是，Microsoft將MAI定價低於Google和OpenAI的同類模型，這是明確的價格競爭信號。Suleyman同時強調，Microsoft將持續維護與OpenAI的夥伴關係，並表示：「這只是開始，我們還會發布更多模型。」

這項策略反映出Microsoft正試圖擺脫對單一夥伴的依賴。儘管Microsoft已向OpenAI投資超過**130億美元**，但顯然正在打造自己的「備用堆疊」。

> **重點：** Microsoft已不再只是OpenAI的轉售商——它正蛻變為真正獨立的AI實驗室。

---

## 2. Holo3——OSWorld達成78.85%，刷新電腦使用SoTA

2026年4月1日，**H Company**宣布其最新電腦使用模型**Holo3**在**OSWorld-Verified**達到**78.85%**，成為目前公認最嚴格桌面自動化基準測試的全新SoTA。

Holo3的特點：

- **總參數350億**，但推論時僅有**100億參數處於活躍狀態**（MoE：Mixture of Experts架構）
- 具備在真實桌面環境中「觀察、思考、行動」的能力
- 超越參數量遠超其本身的競爭對手
- **Apache 2.0**授權——在HuggingFace上公開模型權重

Holo3的核心優勢在於**Agentic Learning Flywheel**，這是由三個要素組成的專屬訓練流程：合成導航資料、跨領域擴增，以及精選強化學習。H Company還打造了**Synthetic Environment Factory**——一個自動重現企業系統的「工廠」，讓模型能在電商軟體、商業工具、協作平台等真實場景中進行訓練。

在涵蓋**486項多步驟任務**的**H Corporate Benchmarks**中，Holo3展示了處理複雜多步驟任務的能力——例如從PDF中取得價格、與員工預算交叉比對，再個別寄送核准或拒絕的郵件。

Holo3目前可透過H Company的**Inference API**免費使用。

> **重點：** OSWorld的78.85%是重要里程碑——電腦使用代理人正逼近企業實際部署所需的可靠性門檻。

---

## 3. Anthropic以4億美元收購Coefficient Bio——在新藥研發領域下重注

2026年4月3日，根據*The Information*及*Eric Newcomer*的報導，**Anthropic**確認以**4億美元股票**收購了**Coefficient Bio**（一家處於隱形模式的生技AI新創）。

Coefficient Bio僅在**8個月前**由**Samuel Stanton**與**Nathan C. Frey**——兩人均來自Prescient Design（Genentech的計算藥物研發部門）——共同創立。團隊約**10人**，專注於運用AI加速新藥研發與生物學研究。

此次收購是Anthropic 2025年10月發表的**Claude for Life Sciences**——支援科學研究者的平台——的延伸。Coefficient Bio全體員工預計將加入Anthropic的**健康與生命科學團隊**。

從這筆交易隱含的估值來看（即使是股票形式，每人折合4,000萬美元），這是一筆相當高價的「人才收購」，代表Anthropic正在效仿DeepMind（AlphaFold）和Isomorphic Labs，在AI for bio/pharma領域大力押注。

> **重點：** Anthropic正持續擴張，超越LLM和程式碼助理的範疇——生技AI是新的前沿。

---

## 4. Anthropic vs OpenClaw：開發者搶奪戰

2026年4月4日（今日），**Anthropic**通知Claude Code訂閱用戶：從4月4日中午起，**無法再透過OpenClaw**等第三方工具使用訂閱額度來存取Claude，需另行按**用量付費**。

**OpenClaw**是極受歡迎的開源程式碼工具，由Peter Steinberger創建。他最近[離開OpenClaw加入OpenAI](https://techcrunch.com/2026/02/15/openclaw-creator-peter-steinberger-joins-openai/)。

Anthropic Claude Code負責人Boris Cherny解釋：「訂閱方案最初設計時，並未考量這類第三方工具的使用模式。」公司向訂閱用戶提供全額退款。

然而Steinberger在X上強烈反彈：「時間點很有意思——他們先把一些熱門功能複製到自家封閉工具，接著再把開源排除在外。」他與董事會成員Dave Morin試圖說服Anthropic，最終只換來一週的過渡期。

這件事有更廣泛的背景。OpenAI最近關閉了Sora App，轉而專注於開發者工具——這正是Claude Code的競爭市場。AI開發者爭奪戰日益激烈，Anthropic顯然意圖保護自家平台的營收。

> **重點：** 開源工具與商業AI訂閱正面碰撞——這將是2026年全年的熱門議題。

---

## 5. OpenAI高層異動：COO、CMO離職，CEO請病假

2026年4月3日，OpenAI宣布一系列高階主管異動：

- **Brad Lightcap**（COO）轉任新職，負責領導涉及複雜交易與投資的**「特殊專案」**。商業營運由Denise Dresser（前Slack CEO，2025年底以CRO身份加入）接手。
- **Fidji Simo**（AGI Development CEO）宣布因**神經免疫疾病**治療，將請數週病假。期間由共同創辦人暨總裁**Greg Brockman**負責產品管理。
- **Kate Rouch**（CMO）因癌症療養退職。OpenAI正物色新任CMO。

OpenAI擁有近**10億全球用戶**，官方聲明稱公司「以延續性與動能持續運作」。不過，三位高層主管同時異動——即使各有合理說明——仍是值得關注的訊號。

> **重點：** OpenAI正處於重要的領導層交接期——留意Brockman回歸產品管理後將帶來什麼改變。

---

## 🔮 本週分析

**Microsoft已蛻變為真正的AI實驗室。** 憑藉MAI Superintelligence Team及三款定價低於Google、OpenAI的新模型，Microsoft已不再只是OpenAI的雲端夥伴。在重新談判OpenAI合約取得更大自主空間後，繼續維持夥伴關係的同時自行開發，這是明智的雙軌策略。

**電腦使用代理人正進入正式生產階段。** Holo3的78.85% OSWorld成績、輕量架構（100億活躍參數）及Apache 2.0授權，傳遞出清晰訊號：未來6至12個月，能自動化桌面工作流程的代理人將在企業中廣泛普及。這才是真正的「RPA 2.0」。

**Anthropic正在多條戰線同時奮戰。** 4億美元生技投資、與OpenClaw的糾紛、新政治行動委員會，以及4億美元私募市場交易——對公司而言是非常忙碌的一週。風險在於戰線過度延伸；機會在於，若生技AI爆炸性成長（如諸多預測所示），Anthropic已提早建立灘頭堡。

---

## 📌 延伸閱讀

- [Microsoft blog: 3 MAI models on Foundry](https://microsoft.ai/news/today-were-announcing-3-new-world-class-mai-models-available-in-foundry/) — 來自Mustafa Suleyman的官方公告
- [Holo3 on HuggingFace](https://huggingface.co/blog/Hcompany/holo3) — H Company技術部落格（含訓練流程詳情）
- [TechCrunch: Anthropic buys Coefficient Bio](https://techcrunch.com/2026/04/03/anthropic-buys-biotech-startup-coefficient-bio-in-400m-deal-reports/) — 首發報導
- [TechCrunch: Claude Code vs OpenClaw](https://techcrunch.com/2026/04/04/anthropic-says-claude-code-subscribers-will-need-to-pay-extra-for-openclaw-support/) — 事件全貌
- [TechCrunch: OpenAI executive shuffle](https://techcrunch.com/2026/04/03/openai-executive-shuffle-new-roles-coo-brad-lightcap-fidji-simo-kate-rouch/) — 人事異動詳情

---

*AI新聞摘要每日更新於xdev.asia。歡迎持續關注，掌握最新AI動態。*
