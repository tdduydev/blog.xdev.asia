---
id: 02760001-ba01-4001-a023-000000000001
title: "Business Case Template cho BA: Viết Business Case cho AI Project"
slug: business-case-template-cho-ba
excerpt: >-
  Business Case là tài liệu giúp BA justify investment cho một AI project. Bài viết này
  cung cấp template đầy đủ và giải thích từng phần, từ problem statement, options analysis,
  benefits, costs đến risk assessment.
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

Business Case là một trong những tài liệu quan trọng nhất mà BA phải viết khi đề xuất AI project. Mục tiêu của nó rất rõ: thuyết phục management và stakeholders rằng việc đầu tư vào initiative này là hợp lý, có khả năng tạo ra value và xứng đáng được ưu tiên.

## Business Case là gì?

Business Case là tài liệu biện minh cho quyết định đầu tư vào một initiative. Một business case tốt thường bao gồm:

- **Problem / Opportunity**: vấn đề cần giải quyết hoặc cơ hội cần nắm bắt
- **Proposed Solution**: giải pháp đề xuất và các phương án thay thế
- **Expected Benefits**: lợi ích kỳ vọng, cả định lượng lẫn định tính
- **Costs & Timeline**: chi phí và mốc thời gian triển khai
- **Risks**: các rủi ro chính và cách giảm thiểu
- **Recommendation**: khuyến nghị cuối cùng

## Business Case khác gì với Project Charter hay PRD?

| Document | Purpose | Audience | When |
|----------|---------|----------|------|
| **Business Case** | Justify investment | Executives, Finance | Trước khi approve |
| **Project Charter** | Authorize project | PMO, Sponsor | Sau khi approve |
| **PRD** | Define product requirements | Dev, Design, QA | Khi project vào delivery |

BA thường là người viết hoặc đồng sở hữu Business Case. Đây cũng là tài liệu để giữ alignment khi project bắt đầu trượt scope.

## Template Business Case cho AI Project

### 1. Executive Summary

Đây là phần nhiều executives sẽ đọc đầu tiên, thậm chí là phần duy nhất họ đọc kỹ. Vì vậy cần ngắn gọn, có số liệu và đi thẳng vào impact.

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
Timeline: [Thời gian để đạt các benefits chính]

Recommendation: APPROVE / DEFER / REJECT
```

### 2. Problem Statement

#### 2.1 Current State Analysis

Mô tả AS-IS càng khách quan càng tốt:

- Current process đang chạy thế nào?
- Pain points và bottlenecks nằm ở đâu?
- Số liệu nào chứng minh vấn đề là có thật?

Ví dụ cho AI Customer Support:

> Team support hiện nhận khoảng 2.400 tickets mỗi ngày. 65% là câu hỏi lặp lại như order status, return policy, product info. Average response time là 8 giờ. CSAT ở mức 3.2/5. Support team dành khoảng 70% thời gian cho repetitive queries thay vì complex cases.

#### 2.2 Business Impact

Phần này nên lượng hóa:

- Chi phí hiện tại do vấn đề gây ra: labor cost, churn, revenue loss
- Opportunity cost nếu không giải quyết
- Rủi ro của phương án “do nothing”

#### 2.3 Strategic Alignment

Giải thích vì sao initiative này phù hợp với company strategy:

- Nó hỗ trợ OKR nào?
- Nó góp phần vào strategic initiative nào?
- Executive sponsor nào đang ủng hộ?

### 3. Proposed Solution

#### 3.1 Solution Overview

- AI solution là gì: chatbot, recommendation engine, automation...
- User flow high level sẽ như thế nào?
- Ai là người dùng chính?

#### 3.2 Options Analysis

Business Case tốt không bao giờ chỉ có một phương án. BA nên trình bày ít nhất 3 options.

| | Option A: Do Nothing | Option B: Manual Improvement | Option C: AI Solution |
|---|---|---|---|
| **Description** | Giữ nguyên hiện trạng | Thêm nhân lực, tối ưu SOP | AI chatbot + automation |
| **Cost** | $0 | $120K/năm | $80K implement + $20K/năm |
| **Benefits** | - | Giảm 20% response time | Giảm 70% response time |
| **Risks** | CSAT tiếp tục xấu đi | Không scale tốt | Implementation risk |
| **Recommendation** | ❌ | ❌ | ✅ |

#### 3.3 Solution Details

- Components chính
- Systems cần integrate
- Approach: build, buy hay partner
- Key dependencies

### 4. Benefits Analysis

#### 4.1 Quantitative Benefits

| Benefit | Current State | Future State | Annual Value |
|---------|--------------|--------------|-------------|
| Labor cost reduction | 5 FTE support | 3 FTE support | $80K/năm |
| Ticket resolution time | 8h average | 2h average | - |
| CSAT improvement | 3.2/5 | 4.5/5 | churn giảm ~ $50K/năm |
| Upsell revenue | $0 | Có AI suggestion | $30K/năm |
| **Total Annual Benefit** | | | **$160K/năm** |

#### 4.2 Qualitative Benefits

- Support agents làm được việc có giá trị cao hơn
- Customer experience tốt hơn
- Scale được mà không phải tăng headcount tương ứng
- Tận dụng tốt hơn data insights từ user interactions

#### 4.3 Benefits Realization Timeline

```text
Month 1-3:  Implementation & Training
Month 4:    Soft launch (20% traffic)
Month 5-6:  Full launch - đạt khoảng 50% projected benefits
Month 7-12: Optimization - đạt 100% projected benefits
Year 2+:    Full ROI realized
```

### 5. Cost Analysis

#### 5.1 One-time Costs

| Item | Cost |
|------|------|
| Software license / API | $X |
| Implementation & integration | $X |
| Data preparation | $X |
| Testing & QA | $X |
| Training & change management | $X |
| **Total** | **$X** |

#### 5.2 Ongoing Costs

| Item | Annual Cost |
|------|-------------|
| Subscription / API usage | $X |
| Maintenance & support | $X |
| Model retraining | $X |
| Infrastructure | $X |
| **Total** | **$X** |

#### 5.3 ROI ví dụ

```text
Total Investment Year 1 = $80K + $20K = $100K
Annual Benefit = $160K

ROI = (Annual Benefit - Annual Ongoing) / Total Investment * 100
    = ($160K - $20K) / $100K * 100
    = 140%

Payback Period = $100K / $140K ≈ 8.6 tháng
```

### 6. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| AI accuracy dưới ngưỡng | Medium | High | Test kỹ + human fallback |
| Low user adoption | Low | High | UX research + change management |
| Data quality issues | High | Medium | Data audit trước implementation |
| Integration failures | Medium | Medium | Phased rollout + rollback plan |
| Compliance issues | Low | High | Legal review trước launch |

#### Critical Success Factors

- Executive sponsorship rõ ràng
- Dedicated team, không làm kiểu part-time nửa vời
- Data quality đủ tốt
- Change management cho users và operations team
- Escalation path rõ khi AI fail

#### Exit Criteria / Kill Switch

- Accuracy dưới ngưỡng sau 2 tháng production
- CSAT giảm thay vì tăng
- Cost vượt budget quá mức cho phép

### 7. Implementation Plan

```text
Phase 1: Discovery & Design (6 tuần)
  - Gather detailed requirements
  - Define solution architecture
  - Vendor selection nếu cần
  - Data audit

Phase 2: Implementation (8 tuần)
  - Development / configuration
  - Data integration
  - Unit / integration / UAT testing
  - Staff training

Phase 3: Rollout (4 tuần)
  - Soft launch
  - Monitor & adjust
  - Full launch
  - Hypercare

Phase 4: Optimization (ongoing)
  - Performance monitoring
  - Retraining schedule
  - Continuous improvement
```

## Một số mẹo để viết Business Case có sức thuyết phục

1. **Dẫn bằng số liệu**. Executives rất quan tâm ROI và payback period.
2. **Lượng hóa khi có thể**. Estimate có cơ sở luôn tốt hơn statement chung chung.
3. **Thừa nhận risks**. Không cần tô hồng; hãy nêu risk cùng mitigation.
4. **Giữ tài liệu gọn**. 10-15 trang là đủ cho đa số trường hợp.
5. **Điều chỉnh theo audience**. CFO, CTO, CEO sẽ nhìn vào các khía cạnh khác nhau.

## Kết luận

Business Case không chỉ là công cụ để xin approve budget. Nó còn là tài liệu giúp BA và stakeholders thống nhất với nhau về câu hỏi cốt lõi: **vì sao chúng ta làm việc này, kỳ vọng value là gì, và chấp nhận rủi ro nào**.

Với AI projects, hai phần thường đáng đầu tư nhất là **Risk Assessment** và **Benefits Realization Timeline**, vì AI hiếm khi tạo toàn bộ value ngay lập tức. BA càng mô tả rõ điểm này, decision càng chắc.---
id: 02760001-ba01-4001-a023-000000000001
title: "Business Case Template cho BA: Viết Business Case thuyết phục cho AI Project"
slug: business-case-template-cho-ba
excerpt: >-
  Business Case là tài liệu BA cần viết để justify investment vào một AI project.
  Bài này cung cấp template đầy đủ và hướng dẫn từng phần — từ problem statement
  đến financial analysis đến risk assessment.
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

Business Case là tài liệu quan trọng nhất mà BA cần viết khi đề xuất một AI project. Đây là văn bản thuyết phục management và stakeholders rằng: "Đầu tư vào project này là quyết định đúng đắn." Một Business Case tốt giúp project được approve, được funding, và được prioritize đúng mức.

## Business Case là gì?

Business Case là tài liệu justify lý do tại sao organization nên invest vào một initiative, bao gồm:
- **Problem/Opportunity**: Vấn đề cần giải quyết hoặc cơ hội cần nắm bắt
- **Proposed Solution**: Giải pháp đề xuất (và các options khác)
- **Expected Benefits**: Lợi ích dự kiến (cả tangible và intangible)
- **Costs & Timeline**: Chi phí và timeline để deliver
- **Risks**: Rủi ro và cách mitigate
- **Recommendation**: Khuyến nghị cuối cùng

## Business Case vs Project Charter vs PRD

| Document | Purpose | Audience | When |
|----------|---------|----------|------|
| **Business Case** | Justify investment | Executives, Finance | Before approval |
| **Project Charter** | Authorize project | PMO, Sponsor | After approval |
| **PRD** | Define product requirements | Dev, Design, QA | After project start |

BA thường viết Business Case và đóng vai trò quan trọng trong Project Charter. PRD là output chính của BA phase sau.

## Template Business Case cho AI Project

### Section 1: Executive Summary (1 trang)

Đây là phần duy nhất nhiều executives đọc — viết ngắn gọn, súc tích, có impact:

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

Mô tả AS-IS một cách khách quan:
- Current process được thực hiện như thế nào?
- Pain points và bottlenecks là gì?
- Dữ liệu/metrics nào chứng minh vấn đề đang tồn tại?

**Ví dụ cho AI Customer Support project:**
> *Customer support team hiện nhận 2,400 tickets/ngày. 65% là repetitive questions (order status, return policy, product info). Average response time là 8 giờ. CSAT score là 3.2/5. Team đang spend 70% thời gian cho repetitive queries thay vì complex issues.*

**2.2 Business Impact của current state**

Quantify impact bằng tiền hoặc metrics:
- Cost của current problem (labor cost, revenue loss, churn)
- Opportunity cost (nếu giải quyết được vấn đề, có thể làm gì khác)
- Risk của không làm gì (competitors đang tiến, market share...)

**2.3 Strategic Alignment**

Giải thích tại sao solution này align với company strategy:
- OKR nào được support?
- Strategic initiative nào được advance?
- Executive sponsor nào đã endorse?

### Section 3: Proposed Solution

**3.1 Solution Overview**

Mô tả giải pháp ở high level:
- AI solution là gì? (chatbot, recommendation engine, automation...)
- Nó hoạt động như thế nào? (user flow đơn giản)
- Ai sẽ sử dụng?

**3.2 Options Analysis**

BA nên present ít nhất 3 options để thể hiện due diligence:

| | Option A: Do Nothing | Option B: Manual Process Improvement | Option C: AI Solution (Recommended) |
|-|-----|-----|-----|
| **Description** | Giữ nguyên hiện trạng | Hire thêm người, improve SOPs | Deploy AI chatbot + automation |
| **Cost** | $0 capex | $120K/year (2 FTE) | $80K implementation + $20K/year |
| **Benefits** | - | Giảm 20% response time | Giảm 70% response time |
| **Risks** | CSAT tiếp tục xấu | Limited scalability | Implementation risk |
| **Recommendation** | ❌ | ❌ | ✅ |

**3.3 Solution Details (Option C)**

- **Components**: [Liệt kê các phần của solution]
- **Integrations**: [Tích hợp với systems nào]
- **Implementation approach**: [Build vs Buy vs Partner]
- **Key dependencies**: [Cần gì để implement]

### Section 4: Benefits Analysis

**4.1 Quantitative Benefits**

| Benefit | Current State | Future State | Annual Value |
|---------|--------------|--------------|-------------|
| Labor cost reduction | 5 FTE support | 3 FTE support | $80K/year |
| Ticket resolution time | 8h average | 2h average | - |
| CSAT improvement | 3.2/5 | 4.5/5 | Giảm churn ~$50K/year |
| Revenue from upsell | $0 | AI suggests upsell | $30K/year |
| **Total Annual Benefit** | | | **$160K/year** |

**4.2 Qualitative Benefits**

- Improved employee satisfaction (support agents spend time on meaningful work)
- Better customer experience và brand perception
- Scalability mà không cần proportional headcount increase
- Data insights từ customer interactions

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
| Data quality issues | High | Medium | Data audit trước implementation |
| Integration failures | Medium | Medium | Phased rollout + rollback plan |
| Regulatory compliance issue | Low | High | Legal review trước launch |

**6.2 Critical Success Factors**

- Executive sponsorship và visible support
- Dedicated project team (không part-time)
- Data quality đủ để train model
- Change management cho support team
- Clear escalation path khi AI fails

**6.3 Exit Criteria / Kill Switch**

Define rõ khi nào sẽ stop project:
- Nếu accuracy dưới X% sau 2 tháng production
- Nếu CSAT giảm thay vì tăng
- Nếu cost vượt budget X%

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
| BA (bạn) | 100% | Phase 1-3 |
| Tech Lead | 80% | Phase 2-3 |
| Data Engineer | 60% | Phase 1-2 |
| UX Designer | 40% | Phase 1 |
| QA | 100% | Phase 2-3 |
| Project Manager | 50% | All phases |

### Section 8: Recommendation

Kết thúc Business Case với recommendation rõ ràng:

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

## Tips viết Business Case thuyết phục

1. **Lead with numbers** — Executives muốn thấy ROI ngay Executive Summary
2. **Quantify mọi thứ có thể** — Ước tính có căn cứ tốt hơn không có con số
3. **Acknowledge risks** — Hiding risks làm giảm credibility, đừng sợ nêu risks kèm mitigation
4. **Keep it concise** — Business Case không phải encyclopedia. 10-15 trang là đủ
5. **Tailor cho audience** — CEO cần different detail level so với CFO hay CTO
6. **Use visuals** — Charts cho ROI, timelines, risk matrix thay vì pure text
7. **Get stakeholder input** — Interview key stakeholders trước khi viết để align expectations

## AI tools giúp BA viết Business Case

- **ChatGPT/Claude**: Draft initial structure, brainstorm risks, improve language
- **Excel/Google Sheets**: Financial modeling và ROI calculation
- **PowerPoint/Canva**: Visualize cho C-suite presentation
- **Miro/FigJam**: Workshop với stakeholders để gather inputs

## Kết

Business Case tốt không chỉ giúp project được approve — nó còn là **contract** giữa BA và stakeholders về những gì sẽ deliver và tại sao. Khi project gặp khó khăn hay scope creep, Business Case là tài liệu bạn quay lại để realign team.

Đối với AI projects, phần quan trọng nhất thường là **Risk Assessment** và **Benefits Realization Timeline** — vì AI delivers value dần dần, không phải ngay lập tức, và nhiều executives chưa quen với điều này.
