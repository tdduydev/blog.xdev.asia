---
id: 02760001-ba01-4001-a005-000000000001
title: "UAT & Business Readiness cho AI Feature: Từ test plan đến go/no-go decision"
slug: uat-business-readiness-ai-feature
excerpt: >-
  UAT cho AI feature không giống UAT truyền thống — bạn không chỉ test logic nghiệp
  vụ mà còn phải test AI output quality, edge cases, bias, và khả năng người dùng
  thực sự tin tưởng AI. Hướng dẫn đầy đủ từ UAT plan, business readiness checklist
  đến go/no-go decision framework cho BA.
featured_image: /images/blog/uat-business-readiness-ai.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-05-05T11:30:00.000000Z'
created_at: '2026-05-05T11:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: UAT, slug: uat}, {name: Testing, slug: testing}, {name: AI, slug: ai}, {name: Agile, slug: agile}]
comments: []
---

UAT là giai đoạn BA và business stakeholder chạy test cuối cùng trước khi release. Với tính năng truyền thống, test pass/fail khá rõ. Với AI feature, mọi thứ phức tạp hơn: AI có thể *kỹ thuật* hoạt động đúng nhưng *nghiệp vụ* vẫn chưa chấp nhận được.

---

## 1. Tại sao UAT cho AI feature khác?

| Khía cạnh | Feature truyền thống | AI feature |
|-----------|---------------------|-----------|
| Test case | Input X → Output Y cố định | Input X → Output Y có thể biến thiên |
| Pass/Fail | Binary | Có thể là "acceptable range" |
| Edge cases | Finite, liệt kê được | Gần như vô hạn |
| Bias testing | Không cần | Cần thiết |
| User trust | Ít liên quan | Quan trọng — user có tin AI không? |
| Rollback | Revert code | Có thể cần rollback model version |

---

## 2. Ba lớp UAT cho AI feature

### Lớp 1: Functional UAT (như truyền thống)

Test business flows cơ bản:
- Happy paths theo acceptance criteria
- Error handling khi input invalid
- Integration với hệ thống khác

### Lớp 2: AI Output Quality UAT

Test chất lượng AI output trong ngữ cảnh nghiệp vụ:
- **Accuracy**: Output đúng bao nhiêu % trên test set business đã chuẩn bị?
- **Relevance**: Câu trả lời có đúng context không?
- **Hallucination check**: AI có bịa thông tin không?
- **Tone & format**: Output có phù hợp với brand/policy không?

**Cách làm:** BA + domain expert chuẩn bị **Golden Test Set** — 50–100 input mẫu kèm expected output. Chạy AI với bộ test này và score.

```
Golden Test Set template:
| Test ID | Input | Expected Output | Actual Output | Pass/Fail | Notes |
|---------|-------|----------------|--------------|-----------|-------|
| TC-001  | "Cho tôi biết lãi suất..." | "Lãi suất hiện tại là..." | ... | ... | ... |
```

### Lớp 3: Business Readiness UAT

Test sẵn sàng của tổ chức, không chỉ hệ thống:
- Người dùng cuối đã được training chưa?
- Helpdesk/Agent biết handle khi AI sai không?
- Runbook rollback đã sẵn sàng chưa?
- Monitoring dashboard đã live chưa?

---

## 3. UAT Plan template cho AI feature

```markdown
# UAT PLAN: [Feature Name]

## 1. Scope & Objectives
- Feature: [mô tả ngắn]
- UAT period: [ngày bắt đầu → ngày kết thúc]
- Environment: [UAT env URL, data set sử dụng]
- Objectives: Verify [list business objectives]

## 2. Participants
| Vai trò | Người | Trách nhiệm |
|---------|-------|-------------|
| UAT Lead (BA) | ... | Plan, coordinate, sign-off |
| Business Tester | ... | Execute test cases |
| Domain Expert | ... | Evaluate AI output quality |
| Product Owner | ... | Go/no-go decision |

## 3. Test Scenarios

### Group A: Functional (must-pass)
- [TC-F-001] Happy path: [mô tả]
- [TC-F-002] Error path: [mô tả]

### Group B: AI Quality (acceptance threshold)
- [TC-AI-001] Accuracy trên golden test set ≥ [N]%
- [TC-AI-002] Hallucination rate ≤ [M]% trên test set
- [TC-AI-003] Escalation trigger đúng khi confidence < threshold

### Group C: Business Readiness (must complete)
- [TC-BR-001] Training materials reviewed by [team]
- [TC-BR-002] Rollback procedure tested
- [TC-BR-003] Monitoring alerts configured

## 4. Entry/Exit Criteria
**Entry (UAT bắt đầu được khi):**
☐ Build deploy xong trên UAT env
☐ QA sign-off SIT completed
☐ Test data prepared

**Exit (UAT kết thúc khi):**
☐ 100% Group A scenarios passed
☐ Group B accuracy ≥ threshold
☐ 0 Critical defects open
☐ Business stakeholder sign-off
```

---

## 4. Go/No-Go Decision Framework

BA tổng hợp kết quả UAT và đề xuất go/no-go decision theo khung:

| Category | Criteria | Status | Weight |
|----------|---------|--------|--------|
| **Blockers** | 0 critical defects open | ✅/❌ | Must pass |
| **Blockers** | Accuracy ≥ acceptance threshold | ✅/❌ | Must pass |
| **Blockers** | Human override working | ✅/❌ | Must pass |
| **Important** | All happy paths pass | ✅/❌ | High |
| **Important** | Business tester sign-off | ✅/❌ | High |
| **Nice-to-have** | All edge cases pass | ✅/❌ | Medium |
| **Nice-to-have** | Performance within SLA | ✅/❌ | Medium |

**Decision rule:**
- ✅ tất cả Blockers → **GO**
- ❌ bất kỳ Blocker nào → **NO-GO** (fix và re-test)
- GO nhưng còn Important defects → **GO with known issues** (communicate rõ)

---

## 5. Business Readiness Checklist

Trước khi launch, BA cần verify:

```
USER TRAINING
☐ User guide / FAQ đã được viết và review
☐ Training session đã được lên lịch
☐ Sandbox/demo env có sẵn cho user thử
☐ Change management email đã được soạn

SUPPORT READINESS
☐ Helpdesk/Agent biết AI có thể sai và cách handle
☐ Escalation path từ AI → agent → supervisor rõ ràng
☐ FAQ về AI limitations đã có sẵn cho support team
☐ Known limitations document đã chia sẻ

TECHNICAL READINESS
☐ Monitoring dashboard live và tested
☐ Alerting rules configured (accuracy drop, error rate spike)
☐ Rollback procedure documented và tested
☐ On-call schedule cho ngày launch

COMMUNICATION
☐ Launch announcement draft approved
☐ Internal stakeholders thông báo trước launch [N] ngày
☐ External communication (nếu có) approved
```

---

## 6. Rollout Strategy cho AI feature

Không phải lúc nào cũng nên launch 100% ngay. Chiến lược phổ biến:

| Strategy | Khi dùng | Rủi ro |
|----------|---------|--------|
| **Full launch** | Low risk feature, confidence cao | Cao nhất |
| **Canary (5% → 20% → 100%)** | Medium risk, cần monitor | Thấp, phát hiện sớm |
| **A/B test** | Muốn measure business impact | Cần sample size đủ lớn |
| **Shadow mode** | AI chạy ngầm, người vẫn xử lý | Không impact user, tốt để collect data |

---

## Tổng kết

UAT tốt cho AI feature = Functional test + AI quality test + Business readiness. BA là người kết nối cả ba, không chỉ là người chạy test case.

Key mindset shift: **Acceptance threshold, không phải pass/fail tuyệt đối**. AI output ≥ 85% accuracy có thể là "good enough" — nhưng "good enough" phải được business stakeholder đồng ý trước, ghi vào acceptance criteria, không phải quyết định sau khi kết quả ra.
