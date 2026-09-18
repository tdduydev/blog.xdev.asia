---
id: 02760001-ba01-4001-a003-000000000001
title: "BA Planning & Monitoring: Cách lập kế hoạch và theo dõi tiến độ BA trong dự án AI"
slug: ba-planning-monitoring-ba
excerpt: >-
  BA Planning không chỉ là ghi scope vào template. Trong dự án AI, kế hoạch BA cần
  tích hợp checkpoint iterative, tracking assumption về data/model, và escalation path
  khi AI feature drift so với yêu cầu. Hướng dẫn thực tế với BA Monitoring Framework.
featured_image: /images/blog/ba-planning-monitoring.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-05T10:00:00.000000Z'
created_at: '2026-05-05T10:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Planning, slug: planning}, {name: Project Management, slug: project-management}, {name: AI, slug: ai}]
comments: []
---

BA Planning trong dự án AI khác hoàn toàn dự án truyền thống ở một điểm cốt lõi: **yêu cầu là tĩnh, nhưng AI output là xác suất**. Điều đó có nghĩa kế hoạch của bạn cần có vòng lặp kiểm tra, không chỉ milestone tuyến tính.

---

## 1. BA Planning Framework cho dự án AI

### 1.1 Scope Definition với AI Boundary

Trước khi lập kế hoạch, BA phải xác định rõ:

| Thành phần | Câu hỏi cần trả lời | Ví dụ |
|---|---|---|
| **AI Scope** | AI xử lý phần nào của luồng? | "AI tự động phân loại 70% ticket" |
| **Human Scope** | Người review những trường hợp nào? | "Ticket confidence < 0.8 → escalate" |
| **Data Dependency** | Cần data gì để AI hoạt động đúng? | "6 tháng lịch sử ticket đã label" |
| **Acceptance Threshold** | Khi nào coi AI feature là "done"? | "Accuracy ≥ 85% trên test set" |

### 1.2 WBS cho AI Feature

Work Breakdown Structure cho AI feature có 5 nhóm công việc:

```
AI Feature: [Tên Feature]
├── 1. Data & Requirements
│   ├── 1.1 Data audit (schema, volume, quality)
│   ├── 1.2 Elicitation với stakeholder
│   └── 1.3 Acceptance criteria drafting
├── 2. Design & Modeling
│   ├── 2.1 Flow diagram (happy + fallback path)
│   ├── 2.2 Prompt/model design review
│   └── 2.3 HITL escalation design
├── 3. Development Checkpoint
│   ├── 3.1 Prototype review (BA + Dev)
│   └── 3.2 Edge case identification
├── 4. Testing & Validation
│   ├── 4.1 UAT script writing
│   ├── 4.2 Bias & fairness check
│   └── 4.3 Performance baseline
└── 5. Go-live & Monitoring
    ├── 5.1 Go-live criteria sign-off
    └── 5.2 Post-launch tracking setup
```

---

## 2. Iterative Checkpoint — Không phải Waterfall

Dự án AI thường dùng Agile/Sprint. BA cần lồng các checkpoint vào sprint:

### Sprint Planning Checklist (BA góc nhìn)
- [ ] Data sẵn sàng cho sprint này chưa? (không phải "sẽ sẵn sàng")
- [ ] Acceptance criteria đã viết theo format Given/When/Then chưa?
- [ ] Đã review fallback path với Dev chưa?
- [ ] Threshold có thay đổi so với sprint trước không?

### Mid-Sprint Check (ngày 5-7)
- [ ] AI output đang đạt ngưỡng expected không?
- [ ] Có edge case mới xuất hiện không?
- [ ] Assumption nào cần update vào ADR (Architecture Decision Record)?

---

## 3. BA Monitoring — Tracking khi AI đã lên production

Nhiều BA nghĩ công việc kết thúc sau go-live. Sai. Với AI feature, BA cần thiết lập monitoring framework:

### 3.1 Metrics cần theo dõi

| Loại metric | Metric cụ thể | Ngưỡng cảnh báo |
|---|---|---|
| **Quality** | Accuracy / F1 / Precision | Giảm > 5% so với baseline |
| **Business** | Tỷ lệ human override | Tăng > 20% so với tuần đầu |
| **Volume** | Số request/ngày | Tăng đột biến > 3x |
| **Feedback** | User complaint rate | > 2% của tổng request |

### 3.2 Drift Detection

AI model có thể bị **concept drift** — thế giới thay đổi nhưng model vẫn đang học từ data cũ. BA cần:

1. **Định nghĩa baseline** trong sprint cuối trước go-live
2. **Đặt trigger** để re-evaluate (mỗi tháng, hoặc khi metric drop)
3. **Owner rõ ràng** — ai chịu trách nhiệm khi AI drift? (RACI)

---

## 4. BA Planning Template thực tế

```markdown
## BA Plan: [Tên Feature]
**Version:** 1.0 | **Date:** YYYY-MM-DD | **Owner:** [BA Name]

### Scope Summary
- AI handles: [mô tả ngắn]
- Human handles: [mô tả ngắn]
- Out of scope: [liệt kê rõ]

### Data Dependencies
| Data | Source | Owner | Status |
|------|--------|-------|--------|
| [data1] | [system] | [team] | ✅/❌ |

### Acceptance Criteria (top-level)
- [ ] AI accuracy ≥ [X]% trên [Y] test cases
- [ ] Edge case coverage: [danh sách] handled
- [ ] Human override rate ≤ [Z]%

### Monitoring Setup
- Dashboard: [link]
- Alert owner: [tên]
- Review cadence: [weekly/monthly]
```

---

## 5. Lỗi phổ biến trong BA Planning cho AI

**Lỗi 1: "Accuracy" mà không định nghĩa accuracy của tập nào**
→ Fix: Ghi rõ "accuracy trên test set từ [nguồn], trong khoảng [thời gian]"

**Lỗi 2: Không tracking assumption**
→ Fix: Mỗi assumption có ID, owner, ngày review

**Lỗi 3: Coi AI feature như feature thường — done là done**
→ Fix: Thêm "Post-launch monitoring period: 4 tuần" vào Definition of Done

---

## Kết luận

BA Planning hiệu quả cho AI feature không phức tạp hơn, nhưng cần **tư duy xác suất thay vì tư duy binary**. Kế hoạch tốt là kế hoạch có vòng lặp kiểm tra assumption, có ngưỡng số rõ ràng, và có monitoring sau go-live.

**Bước tiếp theo:** Xem thêm [Strategy Analysis](/blog/strategy-analysis-swot-pestle-ba) để học cách phân tích context trước khi lập kế hoạch.
