---
id: 02760001-ba01-4001-a006-000000000001
title: "Solution Evaluation Framework cho AI Feature: Đo gì, bao giờ, và ai chịu trách nhiệm"
slug: solution-evaluation-framework-ai-feature
excerpt: >-
  Nhiều team launch AI feature xong rồi không biết feature đó có thành công không.
  Bài này hướng dẫn BA xây dựng evaluation framework trước khi launch — định nghĩa
  KPI business + KPI kỹ thuật + KPI trải nghiệm, lịch đo 30/60/90 ngày, và cách
  dùng số liệu để ra quyết định tiếp theo.
featured_image: /images/blog/solution-evaluation-ai.webp
type: blog
reading_time: 9
view_count: 0
meta: null
published_at: '2026-05-05T12:00:00.000000Z'
created_at: '2026-05-05T12:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Evaluation, slug: evaluation}, {name: KPI, slug: kpi}, {name: AI, slug: ai}, {name: Analytics, slug: analytics}]
comments: []
---

"Feature đã launch rồi, giờ làm gì?" — Câu này thường được hỏi sau vài tuần và không ai trả lời được. Lý do: **evaluation framework không được xây từ trước**.

BA giỏi định nghĩa thành công *trước khi* build, không phải sau khi launch.

---

## 1. Tại sao AI feature cần evaluation framework riêng?

Feature truyền thống: Số đơn xử lý, thời gian xử lý, error rate — đo được rõ ràng.

AI feature có thêm:
- **Output quality drift**: Model có thể degradate theo thời gian nếu data distribution thay đổi
- **User trust decay**: User stop using AI nếu mất tin tưởng sau vài lần sai
- **Hallucination incidents**: Cần monitor, không chỉ error rate
- **Cost scaling**: Nhiều user → chi phí API tăng không tuyến tính

---

## 2. Ba lớp KPI cho AI feature

### Layer 1: Business KPIs

Đây là lý do feature được build — phải đo được business value:

| KPI | Ví dụ (AI chatbot CSKH) | Mục tiêu |
|-----|------------------------|---------|
| **Deflection rate** | % câu hỏi AI xử lý mà không cần agent | ≥ 60% sau 30 ngày |
| **Resolution rate** | % user satisfied sau AI response | ≥ 70% |
| **Cost per resolution** | Chi phí xử lý 1 request (API + infra) vs agent cost | < $0.5 |
| **Time to resolution** | Thời gian trung bình từ hỏi đến trả lời | < 30 giây |
| **NPS** | Net Promoter Score của feature | ≥ +10 vs baseline |

### Layer 2: Technical / AI Quality KPIs

Đo chất lượng AI output, không chỉ uptime:

| KPI | Đo như thế nào | Threshold |
|-----|---------------|---------|
| **Accuracy** | Sampling + human review (5% traffic) | ≥ 85% |
| **Hallucination rate** | Fact-check sampling | ≤ 2% |
| **Confidence score distribution** | % response có score < threshold | Monitor weekly |
| **Escalation rate** | % request escalate sang human | 10–30% (tùy domain) |
| **Latency p95** | 95th percentile response time | < 3 giây |
| **Error rate** | API errors, timeouts | < 0.5% |

### Layer 3: User Experience KPIs

Đo trải nghiệm thực tế, không chỉ kỹ thuật:

| KPI | Cách thu thập | Mục tiêu |
|-----|--------------|---------|
| **Task completion rate** | Analytics tracking | ≥ 75% |
| **Re-query rate** | User hỏi lại trong 5 phút sau khi nhận response | ≤ 15% |
| **Abandonment rate** | User thoát giữa chừng | ≤ 20% |
| **Thumb up/down rate** | In-app feedback | ≥ 60% positive |
| **Feature adoption** | MAU dùng AI feature / total MAU | ≥ 40% sau 60 ngày |

---

## 3. Evaluation Timeline: 30/60/90/180 ngày

```
LAUNCH
  │
  ├── Day 7 (Health check)
  │   - Error rate bình thường?
  │   - Có incident nào cần xử lý?
  │   - Early user feedback
  │
  ├── Day 30 (Initial assessment)
  │   - So sánh KPIs với baseline pre-launch
  │   - Accuracy sampling (100 cases)
  │   - Identify top failure modes
  │
  ├── Day 60 (Optimization)
  │   - Full KPI review
  │   - A/B test results (nếu có)
  │   - Prompt tuning nếu accuracy chưa đạt
  │   - Quyết định: scale up / giữ nguyên / pivot
  │
  ├── Day 90 (Milestone review)
  │   - Business impact report cho stakeholders
  │   - ROI calculation (cost saved vs cost of AI)
  │   - Roadmap Q2 dựa trên learnings
  │
  └── Day 180 (Benefits realization review)
      - So sánh với business case gốc
      - Quyết định: continue / scale / retire
```

---

## 4. Benefits Realization Tracking

BA phải track xem business case gốc có thực sự được realize không:

```markdown
## Benefits Realization Report: [Feature] — 90 ngày

### Business Case Summary (Pre-launch)
- Expected benefit: Giảm 40% workload agent team
- Expected cost: $X/tháng API cost
- Expected ROI: [N] tháng payback

### Actual Results
| Benefit | Expected | Actual (D90) | Status |
|---------|---------|-------------|--------|
| Deflection rate | 60% | 52% | ⚠️ Below target |
| Agent hours saved | 200h/tháng | 160h/tháng | ⚠️ Below target |
| User satisfaction | 70% | 74% | ✅ Above target |
| Monthly API cost | $500 | $620 | ⚠️ Over budget |

### Root Cause Analysis (for misses)
- Deflection rate thấp hơn do: long-tail queries chiếm 30% traffic, AI chưa handle được
- Cost over budget do: user volume +25% so với estimate

### Recommended Actions
1. Expand knowledge base cho top 20 unanswered query types
2. Implement cost cap và usage tiering
3. Revised target D180: deflection ≥ 58%
```

---

## 5. Dashboard BA nên request từ Data team

Đừng build dashboard sau launch. **Request từ Phase 4 (trước launch):**

```
REAL-TIME MONITORING (Operational)
☐ Error rate, uptime, latency (Engineering)
☐ Escalation rate (hàng ngày)
☐ Cost per day / per request (FinOps)

WEEKLY REVIEW
☐ Accuracy trend (sampling)
☐ Top failed query types
☐ User satisfaction scores

MONTHLY REPORT
☐ Full KPI dashboard vs targets
☐ A/B test results
☐ Feature adoption funnel
☐ Cost vs benefit summary
```

---

## 6. Khi KPI không đạt: Decision framework

| Situation | Action |
|-----------|--------|
| Accuracy < threshold | Prompt tuning → nếu không cải thiện → retrain |
| User adoption thấp | User research → thường là UX vấn đề, không phải AI |
| Cost vượt budget | Model tiering (dùng model rẻ hơn cho simple cases) |
| High escalation rate | Expand AI coverage OR accept và optimize agent workflow |
| Hallucination incidents | Implement RAG hoặc fact-check layer |
| Business KPI miss | Revisit business case assumptions |

---

## Tổng kết

Solution evaluation không phải việc của Data Analyst hay PM — **BA sở hữu việc định nghĩa KPIs và đảm bảo có data để đo**. Nếu không được build từ spec, không ai build.

Key practice: Trước khi sprint 1 bắt đầu, viết vào SRS một section "Success Metrics" với KPIs cụ thể, thresholds, measurement method và owner. Đây là cam kết của team với business — không phải afterthought.
