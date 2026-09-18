---
id: 02760001-ba01-4001-a023-000000000001
title: "給 BA 的 Business Case Template：寫出有說服力的 AI Project Business Case"
slug: business-case-template-for-ba
excerpt: >-
  Business Case 是 BA 用來 justify AI project 投資的關鍵文件。本文提供完整
  template 與逐段說明，從 problem statement 到 financial analysis，再到 risk
  assessment，幫助你系統化完成。
featured_image: /images/blog/business-case-template-ba.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-05T09:00:00.000000Z'
created_at: '2026-05-05T09:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Business Case, slug: business-case}, {name: AI Strategy, slug: ai-strategy}, {name: Planning, slug: planning}]
comments: []
---

Business Case 是 BA 在提案 AI project 時最重要的 document。它的作用是說服 management 與 stakeholders：「投資這個 project 是正確的決定。」一份好的 Business Case，能幫助 project 獲得 approval、funding，以及正確的 priority。

## Business Case 是什麼？

Business Case 是一份用來 justify 為何 organization 應投資某個 initiative 的文件，通常包含：

- **Problem/Opportunity**：需要解決的問題，或需要把握的機會
- **Proposed Solution**：建議 solution（以及其他 options）
- **Expected Benefits**：預期 benefits（包含 tangible 與 intangible）
- **Costs & Timeline**：交付所需的 cost 與 timeline
- **Risks**：相關 risks 與 mitigation 方式
- **Recommendation**：最終 recommendation

## Business Case vs Project Charter vs PRD

| Document | Purpose | Audience | When |
| --- | --- | --- | --- |
| **Business Case** | Justify investment | Executives、Finance | Before approval |
| **Project Charter** | Authorize project | PMO、Sponsor | After approval |
| **PRD** | Define product requirements | Dev、Design、QA | After project start |

BA 經常負責撰寫 Business Case，也常在 Project Charter 中扮演重要角色。PRD 則是後續 BA phase 的主要 output。

## AI Project用的Business Case Template

### Section 1: Executive Summary（1 頁）

很多 executives 只會看這一段，所以要寫得簡潔、有重點、能直接產生 impact：

```text
EXECUTIVE SUMMARY

Problem: [2-3 câu mô tả vấn đề hiện tại và business impact]

Proposed Solution: [1-2 câu mô tả solution]

Expected Benefits:
• [Benefit 1 với con số cụ thể]
• [Benefit 2 với con số cụ thể]
• [Benefit 3 định tính]

Investment Required: [Tổng cost]
Expected ROI: [ROI % hoặc payback period]
Timeline: [Thời gian để achieve key benefits]

Recommendation: APPROVE / DEFER / REJECT
```

### Section 2: Problem Statement

#### 2.1 Current State Analysis

以客觀方式描述 AS-IS：

- Current process 現在是如何執行？
- Pain points 與 bottlenecks 是什麼？
- 有哪些 data / metrics 證明問題存在？

AI Customer Support project 範例：
> *Customer support team hiện nhận 2,400 tickets/ngày. 65% là repetitive questions (order status, return policy, product info). Average response time là 8 giờ. CSAT score là 3.2/5. Team đang spend 70% thời gian cho repetitive queries thay vì complex issues.*

#### 2.2 Current state 的 Business Impact

用金額或 metrics 量化 impact：

- 當前問題帶來的 cost（labor cost、revenue loss、churn）
- Opportunity cost（若解決此問題，可以騰出什麼空間）
- 什麼都不做的 risk（competitors 正在前進、market share 流失等）

#### 2.3 Strategic Alignment

說明這個 solution 為何符合 company strategy：

- 支援哪個 OKR？
- 推進哪個 strategic initiative？
- 哪位 executive sponsor 已 endorse？

### Section 3: Proposed Solution

#### 3.1 Solution Overview

從 high level 說明 solution：

- AI solution 是什麼？（chatbot、recommendation engine、automation...）
- 它如何運作？（簡單 user flow）
- 誰會使用？

#### 3.2 Options Analysis

BA 應該至少提出 3 個 options，以展現 due diligence：

| | Option A: Do Nothing | Option B: Manual Process Improvement | Option C: AI Solution (Recommended) |
| --- | --- | --- | --- |
| **Description** | 維持現況 | 多聘人力並改善 SOP | 部署 AI chatbot + automation |
| **Cost** | $0 capex | $120K/year (2 FTE) | $80K implementation + $20K/year |
| **Benefits** | - | response time 降低 20% | response time 降低 70% |
| **Risks** | CSAT 持續惡化 | Scalability 有限 | Implementation risk |
| **Recommendation** | ❌ | ❌ | ✅ |

#### 3.3 Solution Details（Option C）

- **Components**：[solution 組成項目]
- **Integrations**：[會與哪些 systems 整合]
- **Implementation approach**：[Build vs Buy vs Partner]
- **Key dependencies**：[實作所需前提]

### Section 4: Benefits Analysis

#### 4.1 Quantitative Benefits

| Benefit | Current State | Future State | Annual Value |
| --- | --- | --- | --- |
| Labor cost reduction | 5 FTE support | 3 FTE support | $80K/year |
| Ticket resolution time | 8h average | 2h average | - |
| CSAT improvement | 3.2/5 | 4.5/5 | churn 減少 ~= $50K/year |
| Revenue from upsell | $0 | AI suggests upsell | $30K/year |
| **Total Annual Benefit** | | | **$160K/year** |

#### 4.2 Qualitative Benefits

- 提升 employee satisfaction（support agents 可以把時間花在更有價值的工作上）
- 改善 customer experience 與 brand perception
- 不需按比例增加 headcount 也能擴展規模
- 從 customer interactions 中獲得 data insights

#### 4.3 Benefits Realization Timeline

```text
Month 1-3:  Implementation & Training
Month 4:    Soft launch (20% traffic)
Month 5-6:  Full launch - achieve 50% của projected benefits
Month 7-12: Optimization - achieve 100% của projected benefits
Year 2+:    Full ROI realized
```

### Section 5: Cost Analysis

#### 5.1 Implementation Costs（One-time）

| Item | Cost |
| --- | --- |
| Software license / API costs | $X |
| Implementation & integration | $X |
| Data preparation & training | $X |
| Testing & QA | $X |
| Training & change management | $X |
| **Total Implementation** | **$X** |

#### 5.2 Ongoing Costs（Annual）

| Item | Annual Cost |
| --- | --- |
| Software subscription | $X |
| Maintenance & support | $X |
| Model retraining | $X |
| Infrastructure | $X |
| **Total Annual Ongoing** | **$X** |

#### 5.3 ROI Calculation

```text
Total Investment (Year 1) = Implementation + Annual Ongoing
                          = $80K + $20K = $100K

Annual Benefit = $160K

ROI = (Annual Benefit - Annual Ongoing) / Total Investment × 100
    = ($160K - $20K) / $100K × 100
    = 140%

Payback Period = Total Investment / Net Annual Benefit
               = $100K / $140K = ~8.6 months
```

### Section 6: Risk Assessment

#### 6.1 Risk Register

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| AI model accuracy below threshold | Medium | High | Extensive testing + human review fallback |
| Low user adoption | Low | High | UX research + change management program |
| Data quality issues | High | Medium | Data audit trước implementation |
| Integration failures | Medium | Medium | Phased rollout + rollback plan |
| Regulatory compliance issue | Low | High | Legal review trước launch |

#### 6.2 Critical Success Factors

- Executive sponsorship 與 visible support
- Dedicated project team（不是 part-time）
- 足夠支撐 model training 的 data quality
- 給 support team 的 change management
- AI fail 時的 clear escalation path

#### 6.3 Exit Criteria / Kill Switch

清楚定義什麼情況下要停止 project：

- 若 production 2 個月後 accuracy 仍低於 X%
- 若 CSAT 不升反降
- 若 cost 超出 budget X%

### Section 7: Implementation Plan

#### 7.1 High-level Timeline

```text
Phase 1: Discovery & Design (6 weeks)
  - Detailed requirements gathering
  - Solution architecture
  - Vendor selection (nếu Buy)
  - Data audit

Phase 2: Implementation (8 weeks)
  - Development / configuration
  - Data integration
  - Testing (unit, integration, UAT)
  - Staff training

Phase 3: Rollout (4 weeks)
  - Soft launch (10% traffic)
  - Monitor & adjust
  - Full launch
  - Hypercare support

Phase 4: Optimization (ongoing)
  - Performance monitoring
  - Model retraining schedule
  - Continuous improvement
```

#### 7.2 Resource Requirements

| Role | Commitment | Duration |
| --- | --- | --- |
| BA（你） | 100% | Phase 1-3 |
| Tech Lead | 80% | Phase 2-3 |
| Data Engineer | 60% | Phase 1-2 |
| UX Designer | 40% | Phase 1 |
| QA | 100% | Phase 2-3 |
| Project Manager | 50% | All phases |

### Section 8: Recommendation

Business Case 最後要以清楚的 recommendation 收尾：

```text
RECOMMENDATION: APPROVE

Tôi recommend approve Option C (AI Solution) vì:

1. ROI 140% với payback period < 9 tháng
2. Align với OKR Q3: "Improve Customer Experience"
3. Scalable solution — benefit tăng khi volume tăng
4. Risk được mitigate bởi phased approach

Requested approvals:
□ Budget approval: $100K (FY2026)
□ Resource allocation: 6-person project team  
□ Timeline approval: Q2 2026 kick-off
```

## 寫出有說服力Business Case的技巧

1. **先講數字** - Executives 會先在 Executive Summary 看 ROI。
2. **能量化就量化** - 有根據的 estimate，永遠比沒有數字更好。
3. **承認 risks** - 隱藏 risks 會降低 credibility，不如搭配 mitigation 一起寫出來。
4. **保持精簡** - Business Case 不是 encyclopedia，10-15 頁已經足夠。
5. **依 audience 調整** - CEO、CFO、CTO 需要的 detail level 不同。
6. **使用 visuals** - ROI、timeline、risk matrix 用圖表通常比純文字更有效。
7. **先取得 stakeholder input** - 在撰寫前先 interview key stakeholders，先把 expectations 對齊。

## 可協助BA撰寫Business Case的AI tools

- **ChatGPT/Claude**：起草初版結構、brainstorm risks、優化語句
- **Excel/Google Sheets**：financial modeling 與 ROI calculation
- **PowerPoint/Canva**：為 C-suite presentation 做 visual 化
- **Miro/FigJam**：與 stakeholders workshop 收集 inputs

## 結論

好的 Business Case 不只幫助 project 獲得 approval，它同時也是 BA 與 stakeholders 之間關於「要交付什麼、為什麼要交付」的 **contract**。當 project 遇到困難或 scope creep 發生時，Business Case 就是讓 team 重新對齊的依據。

對 AI projects 來說，通常最重要的部分是 **Risk Assessment** 與 **Benefits Realization Timeline**，因為 AI 的 value 往往是逐步釋放，而不是立刻全部呈現，很多 executives 也還不完全熟悉這個特性。