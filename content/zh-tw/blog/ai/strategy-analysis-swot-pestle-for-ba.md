---
id: 02760001-ba01-4001-a003-000000000002
title: "給 BA 的 Strategy Analysis：AI 時代的 SWOT、PESTLE、Impact Mapping 與 Value Stream"
slug: strategy-analysis-swot-pestle-for-ba
excerpt: >-
  Strategy Analysis 幫助 BA 在撰寫需求前先理解組織情境。本文說明如何把 SWOT、
  PESTLE、Impact Mapping、Value Stream Mapping 用在策略分析上，特別適用於
  正在導入 AI 功能的組織。
featured_image: /images/blog/strategy-analysis-swot.webp
type: blog
reading_time: 13
view_count: 0
meta: null
published_at: '2026-05-05T10:30:00.000000Z'
created_at: '2026-05-05T10:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Strategy, slug: strategy}, {name: SWOT, slug: swot}, {name: Analysis, slug: analysis}, {name: AI, slug: ai}]
comments: []
---

在寫需求之前，優秀的 BA 必須先理解：組織現在在哪裡、要往哪裡走、AI 在這段旅程中扮演什麼角色。**Strategy Analysis** 就是完成這件事的工具組。

---

## 1. 為什麼在 AI 時代 Strategy Analysis 更重要？

很多組織導入 AI 只是因為「別家公司也在做」，而不是因為有明確問題。BA 要問對問題：**這個 AI 功能解決什麼問題？為誰解決？怎麼衡量？**

如果這 3 個問題沒有清楚答案，AI 專案通常 3 個月內就會失敗。

---

## 2. 用 SWOT 分析 AI Initiative

SWOT 不只用在公司層級策略。BA 也可用 SWOT 分析單一 AI 功能的可行性。

### 範例：客服 AI Chatbot

| | 正向 | 負向 |
|---|---|---|
| **內部（Internal）** | **Strengths:** ticket 歷史資料豐富、團隊有 ML engineer、管理層支持 | **Weaknesses:** knowledge base 未標準化、缺乏 ground truth label、客服團隊不熟悉 AI |
| **外部（External）** | **Opportunities:** 客戶期待 24/7 support、競品尚未上 AI | **Threats:** AI disclosure 法規、hallucination 風險損害品牌 |

**BA 如何使用 SWOT：**
- Strengths -> 依現有 data/capability 排優先級
- Weaknesses -> 放入 Assumption Log，go-live 前先處理
- Opportunities -> 作為說服 stakeholder 投資的論據
- Threats -> 納入 Risk Register，制定 mitigation

---

## 3. 用 PESTLE 分析 AI 情境

PESTLE 用來分析影響 AI initiative 的外部環境。

| 因素 | BA 應該問的問題 | 影響範例 |
|---|---|---|
| **Political** | 國家/產業 AI 政策是什麼？ | 金融、醫療領域的 AI 規範 |
| **Economic** | 期待 ROI？AI 預算與效益是否匹配？ | 節省 X FTE = 每年 Y 億 |
| **Social** | 使用者是否信任 AI？ | 擔心失業 -> 導入阻力 |
| **Technology** | 現有基礎設施足夠嗎？ | 需要 GPU、cloud、data pipeline |
| **Legal** | GDPR、PCI、HIPAA 如何影響？ | 不可用 PII 做 training |
| **Environmental** | AI training 的碳足跡？ | ESG reporting 要求 |

---

## 4. Impact Mapping：從 Goal 到 Feature

Impact Mapping 要回答：**我們為什麼要做這個功能？**

```
Goal (Business Outcome)
└── Who (Actors)
    └── Impact (Behavior Change)
        └── Deliverable (Feature / Requirement)
```

### 實務範例

```
Goal: 將理賠處理時間縮短 50%

├── Claims Adjuster
│   ├── Impact: 減少 routine case 的人工審核
│   └── Deliverable: AI auto-approve claim < 5M, score > 0.92

├── Customer
│   ├── Impact: 更快收到結果
│   └── Deliverable: 透過 email/app 即時更新狀態

└── Compliance Officer
    ├── Impact: AI 決策有完整 audit trail
    └── Deliverable: 可匯出的 decision log 與 reasoning
```

Impact Mapping 能防止 **scope creep**，因為每個功能都必須追溯到 Impact 與 Goal。

---

## 5. Value Stream Mapping：找出 AI 最適注入點

Value Stream Mapping（VSM）會畫出從輸入到輸出的完整價值流與各步驟時間。

### 從 VSM 找 AI 機會

| 訊號 | 意義 | AI 解法 |
|---|---|---|
| 步驟 **Wait Time 高** | 人工瓶頸 | 用 AI 自動化該步驟 |
| 步驟 **Error Rate 高** | 人工判斷不一致 | 用 AI 標準化輸出 |
| 步驟需 **多人協作** | 溝通成本高 | AI 自動路由/指派 |
| 步驟有 **重複資料** | 模式可預測 | 用 AI 預測替代手動查找 |

---

## 6. AI 專案中的 Strategy Analysis 實作流程

```
1. PESTLE Scan (1-2 天)
   -> 找出 legal/regulation constraints
   -> 這些是 AI 功能的 hard boundary

2. SWOT with AI lens (半天 workshop)
   -> 聚焦 data maturity 與 technical readiness
   -> Output: Go/No-go signal、pre-conditions 清單

3. Value Stream Mapping (1 天)
   -> 找準 AI 注入點（不是全部注入）
   -> 優先順序: impact x feasibility

4. Impact Mapping (半天)
   -> feature list 對齊 business goal
   -> Output: 優先排序 feature backlog
```

---

## 結論

Strategy Analysis 不是「做個分析交差」，而是讓每條需求有意義的基礎。BA 若把這一步做好，就能避免組織做出「解錯問題、找錯對象、時機錯誤」的 AI 功能。

**下一步：**有了策略情境後，請看 [BA Planning & Monitoring](/blog/ba-planning-monitoring-for-ai-projects) 規劃落地執行。
