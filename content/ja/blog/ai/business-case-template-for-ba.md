---
id: 02760001-ba01-4001-a023-000000000001
title: "BAのためのBusiness Case Template：AI Projectを説得力ある形で提案する"
slug: business-case-template-for-ba
excerpt: >-
  Business Case は、AI project への投資を正当化するために BA が作成すべき
  文書です。本記事では、problem statement から financial analysis、risk assessment
  までを含む完全な template と書き方の指針を提供します。
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

Business Case は、AI project を提案するときに BA が書くべき最重要 document です。Management と stakeholders に対して「この project への投資は正しい判断である」と説得するための文書です。優れた Business Case は、project の approval、funding、priority の適正化につながります。

## Business Caseとは何か？

Business Case は、organization が特定の initiative に投資すべき理由を正当化する document で、次を含みます。

- **Problem/Opportunity**: 解決すべき問題、あるいは捉えるべき機会
- **Proposed Solution**: 提案 solution（および他の options）
- **Expected Benefits**: 期待される benefits（tangible / intangible の両方）
- **Costs & Timeline**: Deliver に必要な cost と timeline
- **Risks**: 想定される risks と mitigation 方法
- **Recommendation**: 最終 recommendation

## Business Case vs Project Charter vs PRD

| Document | Purpose | Audience | When |
| --- | --- | --- | --- |
| **Business Case** | Justify investment | Executives、Finance | Before approval |
| **Project Charter** | Authorize project | PMO、Sponsor | After approval |
| **PRD** | Define product requirements | Dev、Design、QA | After project start |

BA は Business Case を書くことが多く、Project Charter においても重要な役割を担います。PRD は、その後の BA phase における主要 output です。

## AI Project向けBusiness Case Template

### Section 1: Executive Summary（1ページ）

多くの executives が読むのはこの section だけです。短く、簡潔に、impact を持って書きます。

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

AS-IS を客観的に説明します。

- Current process はどのように行われているか？
- Pain points と bottlenecks は何か？
- どの data / metrics が問題の存在を示しているか？

AI Customer Support project の例:
> *Customer support team hiện nhận 2,400 tickets/ngày. 65% là repetitive questions (order status, return policy, product info). Average response time là 8 giờ. CSAT score là 3.2/5. Team đang spend 70% thời gian cho repetitive queries thay vì complex issues.*

#### 2.2 Current stateのBusiness Impact

Money または metrics で impact を定量化します。

- 現在の problem による cost（labor cost、revenue loss、churn）
- Opportunity cost（解決できれば他に何ができるか）
- 何もしない risk（competitors の前進、market share の低下など）

#### 2.3 Strategic Alignment

この solution が company strategy にどう align するかを説明します。

- どの OKR を support するか？
- どの strategic initiative を前に進めるか？
- どの executive sponsor が endorse しているか？

### Section 3: Proposed Solution

#### 3.1 Solution Overview

Solution を high level で説明します。

- AI solution は何か？（chatbot、recommendation engine、automation など）
- どう機能するか？（シンプルな user flow）
- 誰が使うのか？

#### 3.2 Options Analysis

BA は due diligence を示すため、少なくとも 3 つの options を提示すべきです。

| | Option A: Do Nothing | Option B: Manual Process Improvement | Option C: AI Solution (Recommended) |
| --- | --- | --- | --- |
| **Description** | 現状維持 | 人を増やし、SOP を改善 | AI chatbot + automation を導入 |
| **Cost** | $0 capex | $120K/year (2 FTE) | $80K implementation + $20K/year |
| **Benefits** | - | response time を 20% 短縮 | response time を 70% 短縮 |
| **Risks** | CSAT が悪化し続ける | 拡張性に限界 | Implementation risk |
| **Recommendation** | ❌ | ❌ | ✅ |

#### 3.3 Solution Details（Option C）

- **Components**: [solution を構成する要素]
- **Integrations**: [どの systems と統合するか]
- **Implementation approach**: [Build vs Buy vs Partner]
- **Key dependencies**: [実装に必要なもの]

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

- Employee satisfaction の向上（support agents が意味のある仕事に時間を使える）
- Customer experience と brand perception の改善
- Headcount を比例的に増やさずに scalability を得られる
- Customer interactions からの data insights

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

- Executive sponsorship と visible support
- Dedicated project team（part-time ではないこと）
- Model を train できる十分な data quality
- Support team 向けの change management
- AI が fail したときの clear escalation path

#### 6.3 Exit Criteria / Kill Switch

Project を止める条件を明確に定義します。

- Production 2か月後も accuracy が X% を下回る場合
- CSAT が上がるどころか下がった場合
- Cost が budget X% を超えた場合

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
| BA (あなた) | 100% | Phase 1-3 |
| Tech Lead | 80% | Phase 2-3 |
| Data Engineer | 60% | Phase 1-2 |
| UX Designer | 40% | Phase 1 |
| QA | 100% | Phase 2-3 |
| Project Manager | 50% | All phases |

### Section 8: Recommendation

Business Case は、明確な recommendation で締めくくります。

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

## 説得力のあるBusiness Caseを書くコツ

1. **数字から入る** - Executives は Executive Summary でまず ROI を見ます。
2. **可能な限り定量化する** - 根拠ある estimate は、数字がないよりはるかに良いです。
3. **Risks を隠さない** - Risks を隠すと credibility が下がります。mitigation と一緒に書きましょう。
4. **簡潔に保つ** - Business Case は encyclopedia ではありません。10〜15 ページで十分です。
5. **Audience に合わせる** - CEO、CFO、CTO では必要な detail level が違います。
6. **Visuals を使う** - ROI、timeline、risk matrix は純テキストより chart の方が伝わります。
7. **Stakeholder input を取る** - 書く前に key stakeholders に interview し、expectations を align します。

## BAがBusiness Case作成に使えるAI tools

- **ChatGPT/Claude**: 初期構成の draft、risk brainstorming、文章改善
- **Excel/Google Sheets**: Financial modeling と ROI calculation
- **PowerPoint/Canva**: C-suite presentation 向けの visual 化
- **Miro/FigJam**: Stakeholders workshop で inputs を集める

## まとめ

優れた Business Case は、project approval を得るだけではありません。何をなぜ deliver するのかについて、BA と stakeholders のあいだの **contract** にもなります。Project が困難に直面したときや scope creep が起きたとき、team を realign するために戻る document です。

AI projects では、とくに **Risk Assessment** と **Benefits Realization Timeline** が重要になることが多いです。AI の value は一度にではなく徐々に現れ、多くの executives はまだこの特性に慣れていないからです。
