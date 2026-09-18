---
id: 02760001-ba01-4001-a020-000000000001
title: "給 BA 的 BABOK Guide：Business Analysis 實務指南"
slug: babok-guide-for-ba
excerpt: >-
  BABOK（Business Analysis Body of Knowledge）是 IIBA 定義專業 BA 所需知識、
  技能與技術的標準參考。本篇文章說明 6 個 Knowledge Areas、50+ techniques，
  以及如何把 BABOK 應用在真實 AI 專案中。
featured_image: /images/blog/babok-guide-ba.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-05T09:00:00.000000Z'
created_at: '2026-05-05T09:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: BABOK, slug: babok}, {name: IIBA, slug: iiba}, {name: Business Analysis, slug: business-analysis}]
comments: []
---

BABOK（Business Analysis Body of Knowledge）是由 IIBA（International Institute of Business Analysis）發布的標準參考，可視為 Project Manager 的 PMBOK 或 Software Engineer 的 SWEBOK 對應版本。如果你想以專業方式從事 BA 工作，BABOK 是你**必須**理解的基礎。

## BABOK 是什麼？

BABOK Guide（目前為 3.0 版）定義了：

- **Business Analysis**：一組用來識別需求並提出能為 stakeholder 創造價值之 solution 的活動
- **6 Knowledge Areas**（KA）：BA 的核心知識領域
- **50+ techniques**：執行各種 BA 任務的具體工具與方法

> BABOK 不是 framework，也不是 process，而是一套 **body of knowledge**，也就是知識體系。你可以在任何 methodology 中應用 BABOK：Agile、Waterfall 或 Hybrid 都可以。

## BABOK 的 6 個 Knowledge Areas

### 1. Business Analysis Planning & Monitoring

規劃整體 BA 活動：

- 識別 stakeholders 與互動方式
- 選擇合適的 methodology（Agile / plan-driven）
- 定義 BA activities 的 governance
- 追蹤進度並調整計畫

**在 AI 專案中**：還需要額外規劃 data discovery、model evaluation cycle，以及 AI-specific risk assessment。

### 2. Elicitation & Collaboration

蒐集資訊並協作以理解需求：

- Interviews、workshops、surveys
- Observation、prototyping、document analysis
- Focus groups、brainstorming

**在 AI 專案中**：AI note-taking tools 與 AI interview summarizer 可幫助 BA 更快處理 output，速度可提升 3-4 倍。

### 3. Requirements Life Cycle Management

管理 requirements 的整個生命週期：

- 將 requirements 從 business need -> solution 全程 trace
- 維護並 prioritize requirements backlog
- 在 requirements 變更時評估 impact
- Approve 並 baseline requirements

**在 AI 專案中**：還需要從 business requirement -> AI capability requirement -> training data requirement -> evaluation metric 做額外 traceability。

### 4. Strategy Analysis

透過策略分析找出正確 solution：

- 分析 current state（AS-IS）
- 定義 future state（TO-BE）
- 評估 risks 與 feasibility
- 定義 change strategy

**在 AI 專案中**：AI readiness assessment、build vs buy vs partner 決策，以及 data infrastructure gap analysis 都很重要。

### 5. Requirements Analysis & Design Definition (RADD)

分析並設計詳細 requirements：

- 將 requirements model 化（UML、BPMN、use cases）
- Verify 與 validate requirements
- 定義 acceptance criteria
- 製作 prototype 與 mockup

**在 AI 專案中**：需要加入 AI behavior specification，例如 expected outputs、edge cases、confidence thresholds 與 fallback scenarios。

### 6. Solution Evaluation

在實作之後評估 solution：

- 測量 solution performance
- 分析 performance gaps
- 評估 solution limitations
- 提出改進建議

**在 AI 專案中**：還包括追蹤 AI feature adoption、監控 model drift，以及衡量實際交付的 business value。

## Underlying Competencies（基礎能力）

除了 6 個 KA，BABOK 也定義了每位 BA 都需要具備的 competency：

| 類別 | 範例 |
|------|-------|
| **Analytical Thinking** | Problem decomposition、decision making、systems thinking |
| **Behavioral Characteristics** | Ethics、personal accountability、trustworthiness |
| **Business Knowledge** | Business principles、industry knowledge |
| **Communication Skills** | Oral、written、facilitation、negotiation |
| **Interaction Skills** | Facilitation、leadership、teamwork |
| **Tools & Technology** | Office tools、modeling tools、requirement management tools |

## BABOK Techniques（50+ techniques）

以下是對從事 AI 專案的 BA 最實用的 techniques：

### Elicitation

| Technique | 何時使用 |
|----------|-------------|
| **Structured Interviews** | 從 key stakeholders 挖掘需求 |
| **Workshops** | 同時讓多位 stakeholders 對齊認知 |
| **Observation (Job Shadowing)** | 理解使用者真實 workflow |
| **Prototyping** | 在 build 前提早驗證 AI UX |
| **Survey/Questionnaire** | 向大量對象蒐集資料 |

### Analysis

| Technique | 何時使用 |
|----------|-------------|
| **Business Rules Analysis** | 定義 AI 的 business logic |
| **Decision Analysis** | 為 AI workflow 建立 decision trees |
| **SWOT Analysis** | 評估 AI strategy |
| **Process Modeling (BPMN)** | 繪出含 AI intervention 的流程 |
| **Use Cases / User Stories** | 明確描述 AI features |

### Evaluation

| Technique | 何時使用 |
|----------|-------------|
| **Acceptance & Evaluation Criteria** | 定義 AI features 的「done」 |
| **Metrics & KPIs** | 衡量 AI 的 business value |
| **Risk Analysis** | 評估 AI deployment risks |
| **Root Cause Analysis** | 調查 AI incidents |

## BABOK vs Agile Extension

IIBA 另外也發布了 **Agile Extension to the BABOK**（AgileBA），用來因應 Agile 環境：

| BABOK | Agile Extension |
|-------|----------------|
| Detailed requirements upfront | Just-in-time requirements |
| Formal documentation | Lightweight artifacts |
| Sequential approach | Iterative discovery |
| Separate BA phase | BA embedded in sprints |

在現代 AI 專案中，通常會把兩者結合使用：用 Agile Extension 處理 sprint-level work，用 BABOK techniques 做 strategic analysis。

## 如何在真實AI專案中應用BABOK

### Week 1-2: Business Analysis Planning

```
1. Identify stakeholders (Product Owner, Data Scientist, End Users, Compliance)
2. Define BA approach (Agile sprints + lightweight documentation)
3. Set up requirements tool (Jira, Confluence, or Azure DevOps)
4. Create RACI matrix cho BA activities
```

### Week 3-4: Elicitation

```
1. Workshop với business stakeholders → define problem + success criteria
2. Job shadowing với end users → understand current workflow pain points
3. Interview Data Scientist → understand technical constraints
4. Synthesize insights với AI tool → cluster themes, identify gaps
```

### Sprint by Sprint: RADD + Solution Evaluation

```
Per sprint:
- Refine user stories với acceptance criteria
- Create AI behavior specification cho new features
- Validate with stakeholders
- Measure feature adoption post-release
```

## 與BABOK相關的IIBA證照

| 證照 | 要求 | 適用對象 |
|-----------|---------|----------|
| **ECBA** | 21 PD、0 年經驗 | Entry-level BA |
| **CCBA** | 21 PD、2 年經驗 | Mid-level BA |
| **CBAP** | 35 PD、5 年經驗 | Senior BA |
| **AAC** | Agile focus | Agile teams 的 BA |

## 高效率學BABOK的建議

1. **不要從頭到尾硬讀** - BABOK 是 reference，不是 novel。先讀你當下最需要的 KA。
2. **對照實際工作** - 每次做 BA task 時，回頭看 BABOK 怎麼定義那個 task。
3. **聚焦在 Techniques** - BABOK 的 Techniques 區塊非常實用，先掌握最常用的 20 個。
4. **結合 AI tools** - BABOK 定義 WHAT，AI tools 幫你更快完成 HOW。
5. **以 ECBA/CCBA 考試為目標學習** - 準備考試會逼你以系統化方式理解 BABOK。

## 結論

BABOK 不是讀一次就放著不管的文件，而是你在 BA 職涯中會一再回來查閱的 **reference guide**。只要掌握 6 個 Knowledge Areas 與 20-30 個核心 techniques，就足以有效工作。其餘內容會隨著實務經驗自然補齊。

在 AI 時代，BABOK 更加重要，因為 AI tools 可以自動化許多 BA tasks，但 **analytical thinking** 與 **辨識正確問題的能力**，仍然不是 AI 能取代的。