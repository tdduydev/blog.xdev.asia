---
id: 02760001-ba02-4001-a010-000000000001
title: "Stakeholder Workshop cho BA: Cách chuẩn bị, facilitation và chốt decision"
slug: stakeholder-workshop-facilitation-ba
excerpt: >-
  Workshop tốt không phải cuộc họp đông người. Bài này hướng dẫn BA chuẩn bị mục tiêu,
  agenda, câu hỏi, kỹ thuật facilitation, xử lý conflict và chốt action items sau workshop.
featured_image: /images/blog/elicitation-ai-notes-ba.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-05-06T10:30:00.000000Z'
created_at: '2026-05-06T10:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Stakeholder, slug: stakeholder}, {name: Workshop, slug: workshop}, {name: Elicitation, slug: elicitation}]
comments: []
---

Workshop là một trong những kỹ thuật elicitation mạnh nhất của BA. Nhưng workshop cũng là nơi dễ biến thành cuộc họp dài, nhiều ý kiến, ít quyết định.

Workshop tốt cần 3 thứ:

1. Mục tiêu rõ.
2. Đúng người trong phòng.
3. Output cụ thể sau buổi.

BA là người thiết kế cuộc trao đổi, không chỉ là người ghi biên bản.

## 1. Khi nào nên dùng workshop?

Workshop phù hợp khi:

- Cần align nhiều stakeholder cùng lúc.
- Có xung đột quy trình giữa các team.
- Cần thống nhất scope.
- Cần map current/future process.
- Cần prioritize requirements.
- Cần chốt business rules.

Không nên dùng workshop khi:

- Cần thông tin cá nhân nhạy cảm.
- Chỉ cần hỏi một người.
- Người quyết định không thể tham gia.
- Mục tiêu chưa rõ.

## 2. Chuẩn bị trước workshop

Checklist:

- [ ] Mục tiêu workshop là gì?
- [ ] Output sau buổi là gì?
- [ ] Ai là decision maker?
- [ ] Ai là subject matter expert?
- [ ] Ai chỉ cần được informed?
- [ ] Pre-read đã gửi chưa?
- [ ] Agenda có timebox chưa?
- [ ] Có template để capture decision chưa?

Ví dụ mục tiêu chưa rõ:

> Bàn về tính năng đặt lịch.

Viết lại:

> Chốt future-state process cho luồng đặt lịch, bao gồm rule hủy/đổi lịch, owner từng bước và out-of-scope cho MVP.

## 3. Agenda mẫu 90 phút

```text
0-10 phút: Mục tiêu, scope, rule of engagement
10-25 phút: Review current pain points
25-45 phút: Map current-state process
45-65 phút: Co-create future-state process
65-80 phút: Chốt business rules và open questions
80-90 phút: Decision recap, action items, owner/deadline
```

Rule of engagement:

- Tập trung vào problem trước solution.
- Mỗi ý kiến cần gắn với evidence hoặc ví dụ.
- Nếu không chốt được, ghi open question với owner.
- Parking lot cho chủ đề ngoài scope.

## 4. Kỹ thuật facilitation

### 1-2-4-All

Dùng khi nhóm đông và người ít nói bị lấn át.

1. Mỗi người tự viết ý.
2. Ghép đôi trao đổi.
3. Nhóm 4 người gom ý.
4. Cả nhóm chia sẻ.

### Dot voting

Dùng để prioritize pain points hoặc requirements.

Mỗi người có 3 phiếu. Vote vào item quan trọng nhất. BA không coi vote là quyết định cuối cùng, nhưng dùng để thấy xu hướng.

### Parking lot

Dùng để giữ workshop không lạc đề.

Ví dụ: đang bàn MVP đặt lịch, có người muốn bàn loyalty program. BA ghi vào Parking Lot và hẹn buổi khác.

### Decision log

Mỗi decision cần:

- Decision ID.
- Nội dung.
- Lý do.
- Người quyết.
- Ngày.
- Impact.

## 5. Xử lý conflict

Conflict không xấu. Conflict thường cho thấy requirement quan trọng.

Ví dụ:

- Sales muốn khách đổi lịch bất cứ lúc nào.
- Operations muốn khóa đổi lịch trước 24h.
- Customer Support muốn linh hoạt trước 4h.

BA xử lý bằng cách:

1. Tách position khỏi interest.
2. Hỏi impact của từng option.
3. Dùng data nếu có.
4. Đề xuất option và trade-off.
5. Chốt decision maker.

Template:

```text
Option A: Cho đổi bất cứ lúc nào
Pros: UX tốt
Cons: Consultant bị động, no-show risk

Option B: Khóa trước 24h
Pros: Vận hành ổn định
Cons: Khách không linh hoạt

Option C: Cho đổi trước 4h
Pros: Cân bằng UX và vận hành
Cons: Cần rule rõ trong hệ thống
```

## 6. Output sau workshop

Trong vòng 24h, BA nên gửi recap:

```markdown
Subject: Recap Workshop - Booking MVP Future Process

1. Decisions
- DEC-001: MVP cho phép đổi lịch trước 4h.
- DEC-002: Payment online out of scope.

2. Business Rules
- BRULE-001: Slot đã confirmed không hiển thị cho khách khác.
- BRULE-002: Khách hủy dưới 4h phải gọi hotline.

3. Open Questions
- OQ-001: Có gửi SMS hay chỉ email? Owner: Marketing, Due: 2026-05-10.

4. Action Items
- BA: cập nhật BPMN và SRS.
- PO: xác nhận MVP scope.
- Tech Lead: review API impact.
```

## 7. Ví dụ workshop output hoàn chỉnh

Workshop: Future-state appointment booking.

Decision log:

| ID | Decision | Rationale | Owner |
|---|---|---|---|
| DEC-001 | MVP chỉ hỗ trợ đặt lịch 1:1, chưa hỗ trợ đặt nhóm. | 92% booking hiện tại là 1:1, giảm scope release đầu. | PO |
| DEC-002 | Cutoff đổi/hủy lịch là 4 giờ. | Consultant cần đủ thời gian lấp slot trống. | Ops Lead |
| DEC-003 | Gửi email trước, SMS đưa vào phase 2. | Chi phí SMS cần duyệt thêm. | Marketing |

Business rules:

| Rule ID | Rule | Source |
|---|---|---|
| BR-001 | Slot Confirmed không hiển thị cho khách khác. | Ops Lead |
| BR-002 | Khách chỉ được đổi lịch khi appointment bắt đầu sau ít nhất 4 giờ. | Sales Manager |
| BR-003 | CSKH có thể đổi lịch thay khách nếu có lý do support. | CSKH Lead |
| BR-004 | Consultant không được tự xóa lịch khách đã Confirmed. | Compliance |

Open questions:

| ID | Question | Owner | Due |
|---|---|---|---|
| OQ-001 | Có cần gửi calendar invite `.ics` không? | Marketing | 2026-05-10 |
| OQ-002 | No-show tính sau bao lâu kể từ giờ hẹn? | Ops Lead | 2026-05-11 |
| OQ-003 | Data appointment giữ bao lâu? | Compliance | 2026-05-12 |

Action items:

| Task | Owner | Output |
|---|---|---|
| Cập nhật BPMN future state | BA | Diagram v1.1 |
| Viết SRS lightweight | BA | SRS v0.1 |
| Check API giữ slot | Dev Lead | Feasibility note |
| Draft test scenarios | QA Lead | Test matrix |

## 8. Dùng AI sau workshop

AI rất hữu ích để:

- Tóm tắt transcript.
- Nhóm insight.
- Tìm mâu thuẫn.
- Draft recap.
- Tạo action items.

Nhưng BA phải kiểm tra:

- AI có thêm ý không có trong buổi không?
- Decision có đúng người approve không?
- Open question có bị AI tự giải thích thành decision không?

## 9. Lỗi thường gặp

**Lỗi 1: Không có decision maker**

Workshop chỉ ra vấn đề nhưng không chốt được gì.

**Lỗi 2: Agenda quá tham**

Một buổi không thể vừa discovery, vừa design chi tiết, vừa estimate.

**Lỗi 3: BA trung lập quá mức**

BA cần neutral về người, nhưng không neutral về chất lượng quyết định. Nếu requirement mơ hồ, BA phải hỏi tới.

## Bài tập thực hành

Chuẩn bị workshop cho feature "đổi lịch hẹn":

- Mục tiêu workshop.
- Danh sách người cần mời.
- Agenda 60 phút.
- 10 câu hỏi elicitation.
- Template decision log.
- Template recap email.

## Nguồn tham khảo

- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/
- PMI Business Analysis for Practitioners: https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601

## Kết luận

Workshop tốt giúp BA rút ngắn thời gian alignment rất nhiều. Nhưng workshop chỉ tốt khi có mục tiêu rõ, kỹ thuật facilitation phù hợp và output được chốt thành decision, business rule, open question và action item. Không có output, workshop chỉ là một cuộc họp đông người.
