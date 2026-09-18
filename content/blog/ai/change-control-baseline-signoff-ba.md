---
id: 02760001-ba02-4001-a014-000000000001
title: "Change Control, Baseline và Sign-off cho BA: Quản trị yêu cầu mà không làm team chậm"
slug: change-control-baseline-signoff-ba
excerpt: >-
  Requirement thay đổi là bình thường, nhưng thay đổi không kiểm soát sẽ phá sprint,
  scope, test và release. Bài này hướng dẫn BA quản trị baseline, change request,
  impact analysis, sign-off và traceability trong môi trường Agile lẫn dự án truyền thống.
featured_image: /images/blog/ba-planning-monitoring-ai-projects.webp
type: blog
reading_time: 16
view_count: 0
meta: null
published_at: '2026-05-06T10:40:00.000000Z'
created_at: '2026-05-06T10:40:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Change Control, slug: change-control}, {name: Traceability, slug: traceability}, {name: Governance, slug: governance}, {name: Software BA, slug: software-ba}]
comments: []
---

Requirement thay đổi không phải là thất bại. Thị trường thay đổi, stakeholder học thêm sau demo, luật thay đổi, constraint kỹ thuật xuất hiện. Vấn đề không nằm ở thay đổi, mà ở **thay đổi không kiểm soát**.

Khi không có change control:

- Dev build theo version cũ.
- QA test theo acceptance criteria cũ.
- Business tưởng scope đã bao gồm phần mới.
- PO không thấy impact đến timeline.
- Release bị trễ nhưng không ai biết trễ từ lúc nào.

BA là người giữ mạch requirements lifecycle để thay đổi diễn ra minh bạch.

## 1. Baseline là gì?

Baseline là phiên bản requirement đã được thống nhất tại một thời điểm để team dùng làm căn cứ build/test.

Baseline không có nghĩa là "không được đổi". Nó có nghĩa là: nếu đổi, phải biết đổi từ đâu sang đâu, vì sao đổi, ai approve và impact gì.

Ví dụ:

```text
SRS Appointment Booking v1.0
Baseline date: 2026-05-06
Approved by: Product Owner, Clinic Ops Lead, Engineering Lead, QA Lead
Scope: Search doctor, select slot, create appointment, cancel appointment
Out of scope: Payment, insurance claim, recurring appointment
```

## 2. Khi nào cần sign-off?

Không phải mọi user story đều cần chữ ký nặng. Nhưng nên có sign-off rõ khi:

- Scope ảnh hưởng nhiều team/hệ thống.
- Có vendor hoặc contract.
- Có compliance, audit hoặc pháp lý.
- Có migration dữ liệu.
- Có thay đổi business process lớn.
- Có go-live risk cao.

Trong Agile, sign-off có thể nhẹ hơn: PO approve backlog item, stakeholder confirm demo, team chốt Definition of Ready. Quan trọng là có bằng chứng quyết định.

## 3. Change request gồm những gì?

Template change request:

```markdown
# Change Request

ID:
Requested by:
Date:
Current baseline:

## 1. Change summary
- What changes?
- Why now?
- Business value:

## 2. Requirement impact
- BRD/SRS:
- User stories:
- Business rules:
- Acceptance criteria:
- Wireframe:
- API/data:
- Reports:

## 3. Delivery impact
- Effort:
- Timeline:
- Dependencies:
- Test impact:
- Release impact:
- Risk:

## 4. Decision
- Approved / Rejected / Deferred:
- Decision owner:
- Decision date:
- Notes:
```

## 4. Impact analysis cho BA

Impact analysis không chỉ là hỏi Dev "mất bao lâu?". BA cần nhìn đủ 6 lớp:

| Lớp | Câu hỏi |
|---|---|
| Business process | Quy trình có đổi không? Ai bị ảnh hưởng? |
| Requirement | BRD/SRS/user story/AC nào đổi? |
| UX/UI | Màn hình, message, empty state, error state nào đổi? |
| API/data | Field, validation, event, report nào đổi? |
| QA/UAT | Test case, regression, UAT script nào đổi? |
| Release/ops | Training, SOP, support, rollback nào đổi? |

Ví dụ thay đổi:

> Business muốn cho phép bệnh nhân hủy lịch trước 30 phút thay vì 2 giờ.

Impact:

- Business rule `BR-CANCEL-001` đổi.
- Cancellation API validation đổi.
- UI copy đổi.
- Notification template đổi.
- Refund/no-show policy cần review.
- Test case liên quan cutoff time phải cập nhật.
- Support FAQ và SOP đổi.

## 5. Traceability giúp control change

Nếu requirement có traceability, change impact dễ hơn rất nhiều.

| Requirement | Rule | Story | API | Test case |
|---|---|---|---|---|
| REQ-BOOK-010 | BR-CANCEL-001 | US-BOOK-12 | PATCH /appointments/{id}/cancel | TC-BOOK-044 |

Khi `BR-CANCEL-001` đổi, BA biết cần cập nhật story, API requirement và test case nào.

Nếu không có traceability, mỗi change request biến thành một cuộc truy tìm thủ công.

## 6. Change control trong Agile

Agile không có nghĩa là ai muốn đổi gì cũng đổi ngay trong sprint.

Gợi ý cách làm:

- Trước sprint: refine và chốt Definition of Ready.
- Trong sprint: change nhỏ thì PO/team quyết định; change lớn đưa về backlog.
- Sau demo: feedback được ghi thành backlog item/change request.
- Trước release: scope baseline và UAT scope được chốt.
- Sau release: change mới đi vào discovery hoặc next iteration.

BA nên giúp team nói rõ: đây là bug, clarification, change request hay new scope.

## 7. Checklist governance nhẹ

- Requirement có version không?
- Baseline scope có in/out-of-scope không?
- Decision có owner không?
- Change request có reason/business value không?
- Impact analysis có đủ Dev/QA/UX/Data/Ops không?
- AC/test case có cập nhật theo change không?
- Stakeholder liên quan đã được thông báo chưa?
- Release note/training/SOP có cần cập nhật không?
- Có log quyết định để audit không?

## 8. Lỗi thường gặp

**Lỗi 1: Gọi mọi thay đổi là bug**

Bug là hệ thống không làm đúng requirement đã chốt. Nếu business đổi ý, đó là change request hoặc new scope.

**Lỗi 2: Không baseline**

Không có baseline thì không ai biết "đổi" là đổi so với cái gì.

**Lỗi 3: Chỉ hỏi effort Dev**

Một thay đổi nhỏ trong code có thể rất lớn về UAT, training, legal hoặc support.

## Ví dụ change request hoàn chỉnh

Change request:

| Field | Value |
|---|---|
| CR ID | CR-014 |
| Request | Đổi cutoff reschedule/cancel từ 4 giờ xuống 2 giờ. |
| Requested by | Sales Manager |
| Reason | Khách hàng phàn nàn không linh hoạt khi lịch tư vấn thay đổi trong ngày. |
| Current baseline | SRS Appointment Booking v1.0 |
| Target release | v1.1 |

Impact analysis:

| Area | Impact |
|---|---|
| Business rule | BR-004, BR-005 đổi threshold từ 4h sang 2h. |
| UX copy | Message lỗi đổi từ "trước 4 giờ" sang "trước 2 giờ". |
| API validation | `PATCH /reschedule` và `PATCH /cancel` đổi cutoff rule. |
| QA | Update TC-RS-004, TC-CAN-003, thêm boundary test đúng 2h. |
| UAT | Business user rerun UAT-004 và UAT-005. |
| Ops/SOP | CSKH chỉ xử lý thủ công khi khách gọi dưới 2h. |
| Risk | Consultant có ít thời gian lấp slot trống, có thể tăng idle time. |

Decision:

| Decision | Approved with pilot |
|---|---|
| Scope | Áp dụng cho nhóm consultant tại TP.HCM trong 2 tuần. |
| Success metric | No-show không tăng quá 3%; hotline complaint giảm ít nhất 15%. |
| Owner | PO theo dõi metric, BA update requirement, QA update regression. |
| Rollback | Nếu no-show tăng > 3%, quay lại cutoff 4h bằng config. |

## Bài tập thực hành

Lấy một requirement bạn từng viết. Tạo:

1. Baseline summary.
2. Một change request giả định.
3. Impact analysis 6 lớp.
4. Traceability matrix tối thiểu 5 dòng.
5. Decision log.

## Nguồn tham khảo

- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/
- IEEE/ISO/IEC 29148-2018: https://standards.ieee.org/ieee/29148/6937/
- Scrum Guide: https://scrumguides.org/scrum-guide.html
- PMI Business Analysis for Practitioners: https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601

## Kết luận

BA giỏi không làm change control để khóa team lại. BA làm change control để mọi thay đổi có ngữ cảnh, impact, quyết định và traceability. Nhờ vậy team vẫn linh hoạt nhưng không hỗn loạn.
