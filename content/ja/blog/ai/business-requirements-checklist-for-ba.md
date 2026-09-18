---
id: 02760001-ba01-4001-a021-000000000001
title: "Business Requirements Checklist：BAのための業務要件チェックリスト"
slug: business-requirements-checklist-for-ba
excerpt: >-
  業務要件チェックリストは、BA が dev team に handoff する前に重要な条件の
  抜け漏れを防ぐためのものです。本記事では、functional requirements から
  AI-specific constraints まで、AI プロジェクト向けの完全な checklist を提供します。
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

プロジェクトが失敗するもっとも一般的な理由のひとつが **requirements の不完全さ** です。BA が質問しなかったからではなく、あらゆる観点を漏れなく cover するための一貫した framework がないからです。Business Requirements Checklist はこの問題を解決します。

## なぜChecklistが必要なのか？

- **Cognitive load**: BA は同時に多くのことを扱うため、抜け漏れが起きやすい
- **Consistency**: どの project も同じ基準で分析できる
- **Handoff quality**: dev team が完全な requirements を受け取れるため、interruptions や rework が減る
- **Audit trail**: requirements が十分に review された証跡を残せる

## Checklist Part 1: Business Context

### ✅ Problem Definition

- [ ] Problem statement が明確に書かれている（What, Who, When, Impact）
- [ ] Root cause が分析されている（symptoms だけを扱っていない）
- [ ] Business objectives が organizational goals に結び付いている
- [ ] Success metrics が定義され、測定可能である（SMART）
- [ ] Scope boundaries が明確である - in-scope と out-of-scope

### ✅ Stakeholder Analysis

- [ ] すべての stakeholders が特定されている（primary、secondary、key decision makers）
- [ ] RACI matrix が作成されている
- [ ] Stakeholder concerns と pain points が記録されている
- [ ] 各 stakeholder group 向けの communication plan がある
- [ ] Sign-off authority が明確に定義されている

### ✅ Assumptions & Constraints

- [ ] すべての business assumptions が記録されている
- [ ] Technical constraints が文書化されている
- [ ] Regulatory/compliance constraints が確認されている
- [ ] Budget と timeline の制約が明確である
- [ ] Resource constraints（team size、available skills）が整理されている

## Checklist Part 2: Functional Requirements

### ✅ User Stories & Use Cases

- [ ] 各 user story に Who（As a...）+ What（I want...）+ Why（So that...）がある
- [ ] Acceptance criteria が INVEST 標準に沿っている（Independent, Negotiable, Valuable, Estimable, Small, Testable）
- [ ] Happy path が完全に記述されている
- [ ] Alternative flows（alternative paths）が cover されている
- [ ] Exception flows（error scenarios）が定義されている

### ✅ Business Rules

- [ ] すべての business rules が明示的に書かれている（implicit ではない）
- [ ] Conditional logic が明確に表現されている（if-then-else）
- [ ] Edge cases が考慮されている
- [ ] Business rules 間の conflict が解消されている
- [ ] Business rules が regulatory requirements に trace されている（該当する場合）

### ✅ Data Requirements

- [ ] Input data が定義されている（source、format、frequency）
- [ ] Output data が定義されている（destination、format、timing）
- [ ] Data validation rules が指定されている
- [ ] Data volume と peak load が見積もられている
- [ ] Data retention policy が定義されている

## Checklist Part 3: Non-Functional Requirements

### ✅ Performance

- [ ] Response time expectations が定義されている（p50、p95、p99）
- [ ] Throughput requirements（requests/second、transactions/day）が定義されている
- [ ] Concurrent users の見積もりがある
- [ ] Peak load scenarios が文書化されている

### ✅ Security & Compliance

- [ ] Authentication requirements（SSO、MFA など）
- [ ] Authorization model（RBAC、ABAC）
- [ ] Data classification（PII、sensitive、public）
- [ ] Compliance requirements check（GDPR、HIPAA、local regulations）
- [ ] Audit logging requirements
- [ ] Data encryption requirements（at rest、in transit）

### ✅ Usability

- [ ] Target user personas が定義されている
- [ ] Accessibility requirements（WCAG level）
- [ ] Supported devices と browsers
- [ ] Language と localization requirements
- [ ] Onboarding と help documentation の必要性

### ✅ Reliability & Availability

- [ ] SLA requirements（uptime %）
- [ ] Recovery time objective（RTO）
- [ ] Recovery point objective（RPO）
- [ ] Disaster recovery requirements
- [ ] Maintenance window constraints

## Checklist Part 4: AI-Specific Requirements

ここは AI プロジェクトを担当する BA にとって特に重要で、しかももっとも見落とされやすい checklist 部分です。

### ✅ AI Model Behavior

- [ ] Expected outputs が明確に定義されている（format、type、range）
- [ ] Confidence threshold が指定されている（どの時点で human review が必要か）
- [ ] Model が uncertain なときの fallback behavior が定義されている
- [ ] Edge cases と out-of-distribution inputs をどう扱うかが決まっている
- [ ] Acceptable error rate が stakeholders に承認されている

### ✅ Human-in-the-Loop Requirements

- [ ] Escalation triggers が定義されている（AI が human に handoff する条件）
- [ ] Human review workflow が指定されている
- [ ] Override mechanism（human が AI decision を override できる）がある
- [ ] AI decisions の audit trail が要求されている
- [ ] Continuous learning が必要な場合、labeling/feedback mechanism がある

### ✅ AI Fairness & Ethics

- [ ] AI decision の影響を受ける demographic groups が特定されている
- [ ] Fairness metrics が定義されている（groups 間で同等 accuracy か？）
- [ ] Bias testing plan が作られている
- [ ] Explainability requirements（black box は許容されるか？）
- [ ] 個人に影響する decisions の impact assessment がある

### ✅ Data & Model Quality

- [ ] Training data requirements が指定されている（volume、quality、freshness）
- [ ] Minimum model performance metrics が stakeholders と合意されている
- [ ] Model drift monitoring requirements
- [ ] Retraining trigger conditions が定義されている
- [ ] Data versioning requirements

### ✅ AI-specific Non-Functional

- [ ] Inference latency requirements（real-time vs batch）
- [ ] Model serving infrastructure constraints
- [ ] Cost per inference の見積もりと budget
- [ ] Models 向けの versioning と rollback requirements

## Checklist Part 5: Process & Handoff

### ✅ Dependencies

- [ ] External system dependencies が map されている
- [ ] API integrations が文書化されている（endpoint、contract、SLA）
- [ ] Third-party vendors/services が特定されている
- [ ] Team dependencies（other squads、infra team）が明確になっている
- [ ] Data pipeline dependencies が文書化されている

### ✅ Testing Requirements

- [ ] UAT scenarios が BA 視点で書かれている
- [ ] Test data requirements が指定されている
- [ ] Performance test scenarios が定義されている
- [ ] AI model testing criteria（accuracy、precision、recall targets）が定義されている
- [ ] Regression test scope が合意されている

### ✅ Documentation & Traceability

- [ ] Requirements に unique IDs が付与されている
- [ ] Traceability matrix: Business Req -> System Req -> Test Case
- [ ] Domain-specific terms の glossary が維持されている
- [ ] Requirements change log がセットアップされている
- [ ] Key stakeholders から sign-off を受けている

## Template: Requirements Review Sign-off

sprint backlog を handoff する前に、BA は以下の mini checklist で sign-off を取るべきです。

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

## Checklistを効果的に使う方法

1. **すべてにチェックを入れる必要はない** - 該当しない項目は N/A にし、理由を明記します。
2. **Conversation guide として使う** - Checklist は質問を思い出す助けであり、硬直的な form ではありません。
3. **Project context に合わせて調整する** - Startup sprint と Enterprise compliance project は同じではありません。
4. **Team と一緒に review する** - 一人で完結させず、PO や Tech Lead と一緒に確認します。
5. **中央で管理する** - Confluence/Notion に置き、team が access して改善できるようにします。

## まとめ

Checklist は bureaucracy ではなく、より少ないミスと rework で requirements を届けるための **quality tool** です。AI プロジェクトでは AI-specific checklist が特に重要です。多くの team にとってまだ経験の浅い領域だからです。

まずはシンプルな checklist から始め、team の実務経験に合わせて徐々に育ててください。最良の checklist は、もっとも長い checklist ではなく、継続的に使われる checklist です。