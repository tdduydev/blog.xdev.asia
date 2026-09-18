---
id: 02760001-ba01-4001-a021-000000000001
title: "Business Requirements Checklist：給 BA 的業務需求檢查清單"
slug: business-requirements-checklist-for-ba
excerpt: >-
  業務需求檢查清單可幫助 BA 在 handoff 給 dev team 前，避免遺漏關鍵條件。
  本文提供一份適用於 AI 專案的完整 checklist，從 functional requirements
  到 AI-specific constraints 全面涵蓋。
featured_image: /images/blog/business-requirements-checklist.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-05-05T09:00:00.000000Z'
created_at: '2026-05-05T09:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Requirements, slug: requirements}, {name: Checklist, slug: checklist}, {name: Business Analysis, slug: business-analysis}]
comments: []
---

專案失敗最常見的原因之一，就是 **requirements 不完整**。不是因為 BA 沒有提問，而是因為缺少一套一致的 framework，確保每個角度都被 cover。Business Requirements Checklist 就是為了解決這個問題。

## 為什麼需要Checklist？

- **Cognitive load**：BA 必須同時處理很多事情，容易漏掉細節
- **Consistency**：確保每個 project 都用同一套標準分析
- **Handoff quality**：dev team 收到完整 requirements，interruptions 和 rework 更少
- **Audit trail**：保留 requirements 已充分 review 的證據

## Checklist Part 1: Business Context

### ✅ Problem Definition

- [ ] Problem statement 清楚寫明（What、Who、When、Impact）
- [ ] Root cause 已分析完成（不是只處理 symptoms）
- [ ] Business objectives 已連結到 organizational goals
- [ ] Success metrics 已定義且可衡量（SMART）
- [ ] Scope boundaries 清楚，包含 in-scope 與 out-of-scope

### ✅ Stakeholder Analysis

- [ ] 所有 stakeholders 都已 identify（primary、secondary、key decision makers）
- [ ] RACI matrix 已建立
- [ ] Stakeholder concerns 與 pain points 已記錄
- [ ] 針對各 stakeholder group 的 communication plan 已擬定
- [ ] Sign-off authority 已明確定義

### ✅ Assumptions & Constraints

- [ ] 所有 business assumptions 都已記錄
- [ ] Technical constraints 已 document
- [ ] Regulatory/compliance constraints 已確認
- [ ] Budget 與 timeline constraints 已明確
- [ ] Resource constraints（team size、available skills）已釐清

## Checklist Part 2: Functional Requirements

### ✅ User Stories & Use Cases

- [ ] 每個 user story 都包含：Who（As a...）+ What（I want...）+ Why（So that...）
- [ ] Acceptance criteria 符合 INVEST 標準（Independent, Negotiable, Valuable, Estimable, Small, Testable）
- [ ] Happy path 已完整 document
- [ ] Alternative flows（alternative paths）已 cover
- [ ] Exception flows（error scenarios）已定義

### ✅ Business Rules

- [ ] 所有 business rules 都明確寫出（不是 implicit）
- [ ] Conditional logic 表達清楚（if-then-else）
- [ ] Edge cases 已納入考量
- [ ] Business rules 之間的 conflict 已解決
- [ ] Business rules 已 trace 到 regulatory requirements（如適用）

### ✅ Data Requirements

- [ ] Input data 已定義（source、format、frequency）
- [ ] Output data 已定義（destination、format、timing）
- [ ] Data validation rules 已 specify
- [ ] Data volume 與 peak load 已估算
- [ ] Data retention policy 已確定

## Checklist Part 3: Non-Functional Requirements

### ✅ Performance

- [ ] Response time expectations 已定義（p50、p95、p99）
- [ ] Throughput requirements（requests/second、transactions/day）
- [ ] Concurrent users estimate
- [ ] Peak load scenarios 已 document

### ✅ Security & Compliance

- [ ] Authentication requirements（SSO、MFA 等）
- [ ] Authorization model（RBAC、ABAC）
- [ ] Data classification（PII、sensitive、public）
- [ ] Compliance requirements check（GDPR、HIPAA、local regulations）
- [ ] Audit logging requirements
- [ ] Data encryption requirements（at rest、in transit）

### ✅ Usability

- [ ] Target user personas 已定義
- [ ] Accessibility requirements（WCAG level）
- [ ] Supported devices 與 browsers
- [ ] Language 與 localization requirements
- [ ] Onboarding 與 help documentation needs

### ✅ Reliability & Availability

- [ ] SLA requirements（uptime %）
- [ ] Recovery time objective（RTO）
- [ ] Recovery point objective（RPO）
- [ ] Disaster recovery requirements
- [ ] Maintenance window constraints

## Checklist Part 4: AI-Specific Requirements

這一部分對負責 AI 專案的 BA 特別重要，也是最常被忽略的 checklist 區塊。

### ✅ AI Model Behavior

- [ ] Expected outputs 已清楚定義（format、type、range）
- [ ] Confidence threshold 已 specify（什麼時候需要 human review）
- [ ] Model uncertain 時的 fallback behavior 已定義
- [ ] Edge cases 與 out-of-distribution inputs 的處理方式已說明
- [ ] Acceptable error rate 已獲得 stakeholders 核准

### ✅ Human-in-the-Loop Requirements

- [ ] Escalation triggers 已定義（AI 何時 handoff 給 human）
- [ ] Human review workflow 已 specify
- [ ] Override mechanism（human 可覆寫 AI decision）已具備
- [ ] AI decisions 的 audit trail 已要求納入
- [ ] 若需 continuous learning，已定義 labeling / feedback mechanism

### ✅ AI Fairness & Ethics

- [ ] 受 AI decision 影響的 demographic groups 已 identify
- [ ] Fairness metrics 已定義（不同 groups 間 accuracy 是否一致？）
- [ ] Bias testing plan 已建立
- [ ] Explainability requirements（是否接受 black box？）
- [ ] 影響個人的 decisions 已做 impact assessment

### ✅ Data & Model Quality

- [ ] Training data requirements 已 specify（volume、quality、freshness）
- [ ] Minimum model performance metrics 已與 stakeholders agree
- [ ] Model drift monitoring requirements
- [ ] Retraining trigger conditions 已定義
- [ ] Data versioning requirements

### ✅ AI-specific Non-Functional

- [ ] Inference latency requirements（real-time vs batch）
- [ ] Model serving infrastructure constraints
- [ ] Cost per inference estimate 與 budget
- [ ] Models 的 versioning 與 rollback requirements

## Checklist Part 5: Process & Handoff

### ✅ Dependencies

- [ ] External system dependencies 已 map 完成
- [ ] API integrations 已 document（endpoint、contract、SLA）
- [ ] Third-party vendors/services 已 identify
- [ ] Team dependencies（other squads、infra team）已 clarify
- [ ] Data pipeline dependencies 已 document

### ✅ Testing Requirements

- [ ] UAT scenarios 已從 BA 視角撰寫
- [ ] Test data requirements 已 specify
- [ ] Performance test scenarios 已定義
- [ ] AI model testing criteria（accuracy、precision、recall targets）已定義
- [ ] Regression test scope 已 agreed

### ✅ Documentation & Traceability

- [ ] Requirements 已分配 unique IDs
- [ ] Traceability matrix：Business Req -> System Req -> Test Case
- [ ] Domain-specific terms 的 glossary 已維護
- [ ] Requirements change log 已 setup
- [ ] 已取得 key stakeholders 的 sign-off

## Template: Requirements Review Sign-off

在 handoff sprint backlog 前，BA 應使用這份 mini checklist 取得 sign-off：

```
REQUIREMENTS REVIEW SIGN-OFF
Sprint: ___________
Feature: ___________
BA: ___________
Date: ___________

✅ Functional requirements complete & approved
✅ Acceptance criteria testable & agreed
✅ Non-functional requirements defined
✅ AI-specific requirements reviewed (nếu applicable)  
✅ Dependencies identified & communicated
✅ Out-of-scope items documented

Stakeholder Sign-off:
Product Owner: ___________  Date: ___
Tech Lead: ___________      Date: ___
QA Lead: ___________        Date: ___
```

## 如何有效使用Checklist

1. **不需要全部打勾** - 不適用的項目請標記 N/A，並清楚註明原因。
2. **把它當 conversation guide** - Checklist 是幫你記得該問什麼，不是僵硬的表單。
3. **依 project context 調整** - Startup sprint 與 Enterprise compliance project 並不相同。
4. **和 team 一起 review** - 不要自己一個人做，和 PO、Tech Lead 一起檢查。
5. **集中存放** - 放在 Confluence / Notion，讓 team 能 access 並持續改善。

## 結論

Checklist 不是 bureaucracy，而是一個能讓 BA 以更少錯誤、更少 rework 交付 requirements 的 **quality tool**。在 AI 專案中，AI-specific checklist 特別重要，因為這仍是很多 team 不熟悉的新領域。

先從簡單 checklist 開始，再依據 team 的實際經驗逐步補強。最好的 checklist 不是最長的，而是最常被使用的那一份。