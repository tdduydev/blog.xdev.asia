---
id: 02760001-ba02-4001-a003-000000000001
title: "BRD và SRS cho Software BA: Template, ví dụ và cách viết dễ hiểu"
slug: brd-srs-template-software-ba
excerpt: >-
  BRD và SRS là hai artifact quan trọng nhưng hay bị viết lẫn. Bài này giải thích
  khác biệt, cấu trúc template, ví dụ đầy đủ cho một feature đặt lịch và checklist
  review trước khi handoff sang Dev/QA.
featured_image: /images/blog/business-requirements-checklist.webp
type: blog
reading_time: 14
view_count: 0
meta: null
published_at: '2026-05-06T09:20:00.000000Z'
created_at: '2026-05-06T09:20:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: BRD, slug: brd}, {name: SRS, slug: srs}, {name: Requirements, slug: requirements}, {name: Software BA, slug: software-ba}]
comments: []
---

BRD và SRS là hai tài liệu rất hay bị nhầm. Nhiều BA viết một file dài, đặt tên là BRD, nhưng bên trong lại trộn business objective, màn hình, database field, API, test case, policy và solution design. Kết quả là stakeholder business đọc không nổi, Dev/QA cũng không đủ thông tin để build.

Cách nghĩ đơn giản:

- **BRD** trả lời: business cần gì và vì sao?
- **SRS** trả lời: hệ thống phần mềm phải làm gì để đáp ứng nhu cầu đó?

## 1. Khi nào cần BRD, khi nào cần SRS?

Không phải dự án nào cũng cần tài liệu nặng. Nhưng bạn nên cân nhắc:

| Bối cảnh | Nên dùng |
|---|---|
| Initiative mới, cần align business | BRD |
| Feature nhỏ trong sprint | User story + AC có thể đủ |
| Feature ảnh hưởng nhiều hệ thống | SRS |
| Vendor/outsourcing/contract | BRD + SRS + RTM |
| Compliance cao | BRD + SRS + sign-off |
| Team Agile nhưng domain phức tạp | Lightweight SRS + backlog |

Nguyên tắc: tài liệu phải đủ để giảm rủi ro hiểu sai, không phải dài để nhìn chuyên nghiệp.

## 2. BRD gồm những phần nào?

Template BRD thực dụng:

```markdown
# Business Requirements Document

## 1. Executive Summary
- Vấn đề cần giải quyết
- Mục tiêu kinh doanh
- Kết quả kỳ vọng

## 2. Background / Current State
- Quy trình hiện tại
- Pain points
- Dữ liệu hoặc bằng chứng

## 3. Business Objectives
- Objective 1
- Objective 2
- Success metrics

## 4. Scope
- In scope
- Out of scope
- Assumptions
- Constraints

## 5. Stakeholders
- Business owner
- End users
- Approvers
- Consulted teams

## 6. Business Requirements
- BR-001: ...
- BR-002: ...

## 7. Business Rules
- Rule ID
- Rule description
- Source / policy

## 8. Risks and Dependencies

## 9. Approval
```

## 3. SRS gồm những phần nào?

Template SRS cho Software BA:

```markdown
# Software Requirements Specification

## 1. Purpose and Scope

## 2. System Context
- Actors
- External systems
- High-level flow

## 3. Functional Requirements
- FR-001
- FR-002

## 4. User Stories and Acceptance Criteria

## 5. Business Rules

## 6. Data Requirements
- Input fields
- Output fields
- Validation rules
- Retention

## 7. Interface / API Requirements
- Endpoint
- Request/response
- Error handling

## 8. Non-Functional Requirements
- Performance
- Security
- Availability
- Accessibility
- Observability

## 9. Error and Edge Cases

## 10. Reporting / Audit

## 11. UAT Scenarios

## 12. Traceability
```

## 4. Ví dụ: Feature đặt lịch tư vấn online

### BRD excerpt

```markdown
BR-001: Khách hàng có thể tự đặt lịch tư vấn online để giảm tải hotline.

Business objective:
- Giảm 30% cuộc gọi hotline liên quan đến đặt lịch trong 3 tháng.
- Tăng tỷ lệ khách hoàn tất đặt lịch từ 45% lên 65%.

In scope:
- Khách chọn dịch vụ, ngày, giờ, thông tin liên hệ.
- Hệ thống gửi email/SMS xác nhận.
- Admin xem danh sách lịch đã đặt.

Out of scope:
- Thanh toán online.
- Tự động phân bổ consultant theo kỹ năng.
```

### SRS excerpt

```markdown
FR-001: Hiển thị slot trống
System shall display available appointment slots by selected service and date.

Acceptance criteria:
Given khách chọn dịch vụ "Tư vấn tài chính"
When khách chọn ngày 2026-06-10
Then hệ thống hiển thị các slot còn trống trong ngày đó
And không hiển thị slot đã được đặt

Validation:
- service_id: required, must exist
- appointment_date: required, must be today or future date

Error:
- Nếu không còn slot, hiển thị empty state "Ngày này đã hết lịch. Vui lòng chọn ngày khác."
```

## 5. Business rule viết sao cho rõ?

Business rule tốt cần:

- Có ID.
- Có mô tả rõ.
- Có nguồn.
- Có ví dụ.
- Có owner nếu cần thay đổi.

Ví dụ:

```markdown
BRULE-003: Khách hàng chỉ được hủy lịch trước giờ hẹn tối thiểu 4 tiếng.

Source: Policy vận hành CSKH v2.1
Owner: Head of Customer Service
Example:
- Lịch lúc 15:00, khách được hủy trước 11:00.
- Sau 11:00, nút hủy bị disable và hiển thị hướng dẫn gọi hotline.
```

## 6. Requirement tốt cần có đặc tính gì?

Theo tinh thần requirements engineering, requirement nên:

- Rõ ràng.
- Đơn nghĩa.
- Khả kiểm thử.
- Có nguồn gốc.
- Không trộn nhiều yêu cầu trong một câu.
- Không mô tả implementation quá sớm nếu không cần.

Ví dụ chưa tốt:

> Hệ thống phải nhanh và dễ dùng.

Viết lại:

> Trang danh sách slot phải render trong dưới 2 giây ở p95 khi có tối đa 500 slot/ngày và 200 concurrent users.

## 7. Checklist review BRD/SRS

Trước khi handoff, BA tự hỏi:

- Business objective có metric không?
- Scope có out-of-scope không?
- Requirement có ID không?
- Requirement có source không?
- Business rule có ví dụ không?
- AC có happy path, alternate path, error path không?
- Data validation có rõ required/optional/range/format không?
- NFR có đo được không?
- Permission và audit log có được nhắc đến không?
- Open questions có owner và deadline không?
- Stakeholder đã sign-off version hiện tại chưa?

## 8. Lỗi thường gặp

**Lỗi 1: BRD biến thành SRS**

Business stakeholder chỉ cần hiểu problem, value, scope, process. Đừng bắt họ đọc chi tiết API nếu không cần.

**Lỗi 2: SRS quá business, thiếu hành vi hệ thống**

Dev/QA cần biết hệ thống làm gì trong từng tình huống, không chỉ "cải thiện trải nghiệm đặt lịch".

**Lỗi 3: Không có version và change log**

Không có version, team sẽ tranh luận "tôi tưởng bản hôm trước khác". Mỗi baseline cần version, ngày, người approve.

## Ví dụ artifact đầy đủ hơn: từ BRD sang SRS

### BRD sample cho feature đặt lịch

| Mục | Nội dung |
|---|---|
| Business problem | 38% khách hàng phải gọi hotline ít nhất 2 lần để chốt lịch tư vấn; CSKH mất nhiều thời gian kiểm tra slot thủ công. |
| Objective | Trong 3 tháng sau release, giảm 40% cuộc gọi đặt lịch và giảm double booking xuống dưới 1%. |
| Scope MVP | Xem consultant, xem slot còn trống, đặt lịch, đổi lịch, hủy lịch, nhận email xác nhận. |
| Out of scope | Thanh toán, recurring appointment, tích hợp CRM nâng cao, đặt lịch nhóm. |
| Stakeholder | Customer, CSKH, consultant, Sales Manager, Compliance, Engineering, QA. |
| Success metric | Booking completion rate, hotline booking call volume, no-show rate, double booking incident. |

### SRS sample cho cùng feature

| ID | Requirement | Priority | Source |
|---|---|---|---|
| FR-001 | Hệ thống hiển thị danh sách consultant có slot còn trống trong 14 ngày tới. | Must | Workshop 2026-05-06 |
| FR-002 | Khách hàng có thể đặt một slot còn trống và nhận confirmation code. | Must | PO |
| FR-003 | Khách hàng có thể đổi lịch nếu còn hơn 4 giờ trước giờ hẹn. | Must | Ops policy |
| FR-004 | Consultant xem được lịch hẹn theo ngày, lọc theo trạng thái. | Should | Consultant interview |
| NFR-001 | API tạo appointment phản hồi dưới 2 giây ở p95 với 300 concurrent users. | Must | Engineering |

### Acceptance criteria sample

```gherkin
Scenario: Slot bị người khác đặt trước khi khách xác nhận
  Given khách đang xem slot 09:00 của consultant A
  And slot đó vừa được khách khác xác nhận
  When khách bấm "Xác nhận đặt lịch"
  Then hệ thống không tạo appointment
  And hiển thị message "Slot này vừa được đặt. Vui lòng chọn giờ khác."
  And gợi ý ít nhất 3 slot thay thế nếu có
```

### Data và error sample

| Field | Type | Rule |
|---|---|---|
| appointment_id | string | Generated, unique |
| customer_id | string | Required, active customer |
| consultant_id | string | Required, active consultant |
| slot_id | string | Required, available at confirmation time |
| status | enum | Pending, Confirmed, Cancelled, Completed, NoShow |

| Error code | Khi nào xảy ra | UI message |
|---|---|---|
| SLOT_UNAVAILABLE | Slot đã bị đặt hoặc bị khóa | Slot này vừa được đặt. Vui lòng chọn giờ khác. |
| RESCHEDULE_WINDOW_EXPIRED | Khách đổi lịch dưới 4 giờ | Lịch hẹn sắp diễn ra. Vui lòng gọi hotline để được hỗ trợ. |
| CONSULTANT_INACTIVE | Consultant không còn nhận lịch | Tư vấn viên hiện không khả dụng. Vui lòng chọn người khác. |

## Nguồn tham khảo

- IEEE/ISO/IEC 29148-2018: https://standards.ieee.org/ieee/29148/6937/
- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/
- PMI Business Analysis for Practitioners: https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601

## Kết luận

BRD giúp business thống nhất **cần gì và vì sao**. SRS giúp team phần mềm thống nhất **hệ thống phải làm gì và test thế nào**. Software BA giỏi không viết tài liệu dài hơn, mà viết đúng người đọc, đúng quyết định cần đưa ra, đúng mức chi tiết để giảm rework.
