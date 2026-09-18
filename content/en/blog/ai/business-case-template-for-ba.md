---
id: 02760001-ba01-4001-a023-000000000001
title: "Business Case Template for BA: Writing a Persuasive Business Case for an AI Project"
slug: business-case-template-for-ba
excerpt: >-
  A Business Case is the document a BA needs to write to justify investment in an
  AI project. This article provides a full template and section-by-section
  guidance - from problem statement to financial analysis to risk assessment.
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

Business Case is the most important document a BA needs to write when proposing an AI project. It is the document that convinces management and stakeholders that: "Investing in this project is the right decision." A strong Business Case helps the project get approved, funded, and prioritized correctly.

## What is a Business Case?

Business Case is a document that justifies why an organization should invest in an initiative, including:
- **Problem/Opportunity**: The issue to solve or opportunity to capture
- **Proposed Solution**: The proposed solution (and alternative options)
- **Expected Benefits**: Expected benefits (both tangible and intangible)
- **Costs & Timeline**: Cost and timeline to deliver
- **Risks**: Risks and how to mitigate them
- **Recommendation**: Final recommendation

## Business Case vs Project Charter vs PRD

| Document | Purpose | Audience | When |
|----------|---------|----------|------|
| **Business Case** | Justify investment | Executives, Finance | Before approval |
| **Project Charter** | Authorize the project | PMO, Sponsor | After approval |
| **PRD** | Define product requirements | Dev, Design, QA | After project start |

BA often writes the Business Case and plays an important role in the Project Charter. PRD is the main output of the later BA phase.

## Business Case Template for an AI Project

### Section 1: Executive Summary (1 page)

This is the only section many executives will read - keep it short, concise, and high impact:

```
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

**2.1 Current State Analysis**

Describe the AS-IS objectively:
- How is the current process performed?
- What are the pain points and bottlenecks?
- What data/metrics prove the problem exists?

**Example for an AI Customer Support project:**
> *The customer support team currently receives 2,400 tickets/day. 65% are repetitive questions (order status, return policy, product info). Average response time is 8 hours. CSAT score is 3.2/5. The team currently spends 70% of its time on repetitive queries instead of complex issues.*

**2.2 Business Impact of the current state**

Quantify impact in money or metrics:
- Cost of the current problem (labor cost, revenue loss, churn)
- Opportunity cost (what else becomes possible if this is solved)
- Risk of doing nothing (competitors moving ahead, loss of market share...)

**2.3 Strategic Alignment**

Explain why this solution aligns with company strategy:
- Which OKR does it support?
- Which strategic initiative does it advance?
- Which executive sponsor has endorsed it?

### Section 3: Proposed Solution

**3.1 Solution Overview**

Describe the solution at a high level:
- What is the AI solution? (chatbot, recommendation engine, automation...)
- How does it work? (simple user flow)
- Who will use it?

**3.2 Options Analysis**

BA should present at least 3 options to show due diligence:

| | Option A: Do Nothing | Option B: Manual Process Improvement | Option C: AI Solution (Recommended) |
|-|-----|-----|-----|
| **Description** | Keep the current state | Hire more people, improve SOPs | Deploy AI chatbot + automation |
| **Cost** | $0 capex | $120K/year (2 FTE) | $80K implementation + $20K/year |
| **Benefits** | - | 20% faster response time | 70% faster response time |
| **Risks** | CSAT keeps getting worse | Limited scalability | Implementation risk |
| **Recommendation** | ❌ | ❌ | ✅ |

**3.3 Solution Details (Option C)**

- **Components**: [List the components of the solution]
- **Integrations**: [Which systems it integrates with]
- **Implementation approach**: [Build vs Buy vs Partner]
- **Key dependencies**: [What is required to implement it]

### Section 4: Benefits Analysis

**4.1 Quantitative Benefits**

| Benefit | Current State | Future State | Annual Value |
|---------|--------------|--------------|-------------|
| Labor cost reduction | 5 FTE support | 3 FTE support | $80K/year |
| Ticket resolution time | 8h average | 2h average | - |
| CSAT improvement | 3.2/5 | 4.5/5 | Reduced churn ~= $50K/year |
| Revenue from upsell | $0 | AI suggests upsell | $30K/year |
| **Total Annual Benefit** | | | **$160K/year** |

**4.2 Qualitative Benefits**

- Improved employee satisfaction (support agents spend time on meaningful work)
- Better customer experience and brand perception
- Scalability without proportional headcount growth
- Data insights from customer interactions

**4.3 Benefits Realization Timeline**

```
Month 1-3:  Implementation & Training
Month 4:    Soft launch (20% traffic)
Month 5-6:  Full launch - achieve 50% của projected benefits
Month 7-12: Optimization - achieve 100% của projected benefits
Year 2+:    Full ROI realized
```

### Section 5: Cost Analysis

**5.1 Implementation Costs (One-time)**

| Item | Cost |
|------|------|
| Software license / API costs | $X |
| Implementation & integration | $X |
| Data preparation & training | $X |
| Testing & QA | $X |
| Training & change management | $X |
| **Total Implementation** | **$X** |

**5.2 Ongoing Costs (Annual)**

| Item | Annual Cost |
|------|------------|
| Software subscription | $X |
| Maintenance & support | $X |
| Model retraining | $X |
| Infrastructure | $X |
| **Total Annual Ongoing** | **$X** |

**5.3 ROI Calculation**

```
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

**6.1 Risk Register**

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| AI model accuracy below threshold | Medium | High | Extensive testing + human review fallback |
| Low user adoption | Low | High | UX research + change management program |
| Data quality issues | High | Medium | Data audit before implementation |
| Integration failures | Medium | Medium | Phased rollout + rollback plan |
| Regulatory compliance issue | Low | High | Legal review before launch |

**6.2 Critical Success Factors**

- Executive sponsorship and visible support
- Dedicated project team (not part-time)
- Sufficient data quality to train the model
- Change management for the support team
- Clear escalation path when AI fails

**6.3 Exit Criteria / Kill Switch**

Clearly define when the project will stop:
- If accuracy stays below X% after 2 months in production
- If CSAT decreases instead of increasing
- If cost exceeds budget X%

### Section 7: Implementation Plan

**7.1 High-level Timeline**

```
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

**7.2 Resource Requirements**

| Role | Commitment | Duration |
|------|-----------|----------|
| BA (you) | 100% | Phase 1-3 |
| Tech Lead | 80% | Phase 2-3 |
| Data Engineer | 60% | Phase 1-2 |
| UX Designer | 40% | Phase 1 |
| QA | 100% | Phase 2-3 |
| Project Manager | 50% | All phases |

### Section 8: Recommendation

Conclude the Business Case with a clear recommendation:

```
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

## Tips for writing a persuasive Business Case

1. **Lead with numbers** - Executives want to see ROI immediately in the Executive Summary.
2. **Quantify everything you can** - A grounded estimate is better than having no numbers.
3. **Acknowledge risks** - Hiding risks reduces credibility; state them with mitigation.
4. **Keep it concise** - Business Case is not an encyclopedia. 10-15 pages is enough.
5. **Tailor it to the audience** - A CEO needs a different level of detail than a CFO or CTO.
6. **Use visuals** - Charts for ROI, timelines, and risk matrix instead of pure text.
7. **Get stakeholder input** - Interview key stakeholders before writing to align expectations.

## AI tools that help BA write a Business Case

- **ChatGPT/Claude**: Draft the initial structure, brainstorm risks, improve language
- **Excel/Google Sheets**: Financial modeling and ROI calculation
- **PowerPoint/Canva**: Visuals for C-suite presentations
- **Miro/FigJam**: Workshops with stakeholders to gather inputs

## Conclusion

A good Business Case does not just help a project get approved - it also becomes a **contract** between BA and stakeholders about what will be delivered and why. When the project hits difficulties or scope creep, this is the document you return to for realignment.

For AI projects, the most important sections are usually **Risk Assessment** and **Benefits Realization Timeline** - because AI delivers value gradually, not instantly, and many executives are still not used to that reality.