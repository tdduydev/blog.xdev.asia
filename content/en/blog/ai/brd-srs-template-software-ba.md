---
id: 02760001-ba02-4001-a003-000000000001
title: >-
  BRD and SRS for Software BA: Templates, examples and easy-to-understand
  writing
slug: brd-srs-template-software-ba
excerpt: >-
  BRD and SRS are two important artifacts but are often confused. This article
  explains the difference, template structure, full example for a scheduling
  feature and review checklist before handoff to Dev/QA.
featured_image: /images/blog/business-requirements-checklist.webp
type: blog
reading_time: 14
view_count: 0
meta: null
published_at: '2026-05-06T09:20:00.000000Z'
created_at: '2026-05-06T09:20:00.000000Z'
author:
  id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf
  name: Duy Tran
  avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg
category:
  id: 019c9616-cat1-7001-a001-000000000001
  name: AI
  slug: ai
tags:
  - name: BA
    slug: ba
  - name: BRD
    slug: brd
  - name: SRS
    slug: srs
  - name: Requirements
    slug: requirements
  - name: Software BA
    slug: software-ba
comments: []
locale: en
---
BRD and SRS are two documents that are often confused. Many BAs write a long file, named BRD, but inside it mixes business objectives, screens, database fields, APIs, test cases, policies and solution design. As a result, business stakeholders can't read it, and Dev/QA doesn't have enough information to build.

Simple way of thinking:

- **BRD** answers: What does business need and why?
- **SRS** answers: what must the software system do to meet that need?

## 1. When do you need BRD, when do you need SRS?

Not every project requires heavy documentation. But you should consider:

| Background | Should use |
|---|---|
| New initiative, need to align business | BRD |
| Small feature in sprint | User story + AC may be enough |
| Feature affects many systems | SRS |
| Vendor/outsourcing/contract | BRD + SRS + RTM |
| High Compliance | BRD + SRS + sign-off |
| Agile team but complex domain | Lightweight SRS + backlog |

Principle: documents should be sufficient to reduce the risk of misinterpretation, not too long to look professional.

## 2. What parts does BRD consist of?

Pragmatic BRD Template:

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

## 3. What parts does SRS include?

SRS Template for Software BA:

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

## 4. Example: Feature to schedule an online consultation

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

## 5. How to write business rules clearly?

Good business rules need:

- Have ID.
- There is a clear description.
- There is a source.
- There are examples.
- There is an owner if changes are needed.

For example:

```markdown
BRULE-003: Khách hàng chỉ được hủy lịch trước giờ hẹn tối thiểu 4 tiếng.

Source: Policy vận hành CSKH v2.1
Owner: Head of Customer Service
Example:
- Lịch lúc 15:00, khách được hủy trước 11:00.
- Sau 11:00, nút hủy bị disable và hiển thị hướng dẫn gọi hotline.
```

## 6. What characteristics should a good Requirement have?

In the spirit of requirements engineering, requirements should:

- Obviously.
- Simple meaning.
- Testable.
- Origin.
- Do not mix multiple requests in one sentence.
- Don't describe the implementation too early if you don't need it.

Bad example:

> The system must be fast and easy to use.

Rewrite:

> The slot list page must render in under 2 seconds on p95 when there is a maximum of 500 slots/day and 200 concurrent users.

## 7. Checklist review of BRD/SRS

Before handoff, BA asks himself:

- Does the business objective have metrics?
- Is the scope out-of-scope?
- Does Requirement have an ID?
- Does Requirement have a source?
- Does the business rule have examples?
- Does AC have a happy path, alternate path, error path?
- Is the data validation clearly required/optional/range/format?
- Can NFR be measured?
- Are permissions and audit logs mentioned?
- Does open questions have an owner and deadline?
- Has the stakeholder signed off the current version?

## 8. Common errors

**Error 1: BRD turns into SRS**

Business stakeholders only need to understand the problem, value, scope, process. Don't force them to read API details if they don't need to.

**Error 2: SRS is too businesslike, lacks system behavior**

Dev/QA needs to know what the system does in each situation, not just "improve the booking experience".

**Error 3: No version and change log**

Without a version, the team will argue "I thought the previous version was different". Each baseline needs version, date, and approver.

## More complete artifact example: from BRD to SRS

### BRD sample for scheduling feature

| Section | Content |
|---|---|
| Business problem | 38% of customers have to call the hotline at least twice to schedule a consultation; Customer service takes a lot of time to check slots manually. |
| Objective | In the 3 months after release, reduce scheduling calls by 40% and reduce double bookings to less than 1%. |
| Scope MVP | View consultants, see available slots, book appointments, reschedule, cancel appointments, receive confirmation email. |
| Out of scope | Billing, recurring appointments, advanced CRM integration, group scheduling. |
| Stakeholders | Customer, Customer Service, consultant, Sales Manager, Compliance, Engineering, QA. |
| Success metrics | Booking completion rate, hotline booking call volume, no-show rate, double booking incident. |

### SRS sample for the same feature

| ID | Requirements | Priorities | Source |
|---|---|---|---|
| FR-001 | The system displays a list of consultants with available slots in the next 14 days. | Must | Workshop 2026-05-06 |
| FR-002 | Customers can reserve an available slot and receive a confirmation code. | Must | PO |
| FR-003 | Customers can reschedule if there are more than 4 hours before the appointment time. | Must | Ops policy |
| FR-004 | Consultants can view appointment schedules by date and filter by status. | Should | Consultant interviews |
| NFR-001 | The API creates an appointment response in under 2 seconds at p95 with 300 concurrent users. | Must | Engineering |

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

### Data and error sample

| Field | Type | Rule |
|---|---|---|
| appointment_id | string | Generated, unique |
| customer_id | string | Required, active customer |
| consultant_id | string | Required, active consultant |
| slot_id | string | Required, available at confirmation time |
| status | enum | Pending, Confirmed, Cancelled, Completed, NoShow |

| Error code | When does it happen | UI messages |
|---|---|---|
| SLOT_UNAVAILABLE | Slot has been booked or locked | This slot has just been placed. Please choose another time. |
| RESCHEDULE_WINDOW_EXPIRED | Guests reschedule for less than 4 hours | Appointment scheduled soon. Please call the hotline for support. |
| CONSULTANT_INACTIVE | Consultant no longer accepts appointments | Consultant is currently unavailable. Please choose someone else. |

## Reference source

- IEEE/ISO/IEC 29148-2018: https://standards.ieee.org/ieee/29148/6937/
- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/
- PMI Business Analysis for Practitioners: https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601

## Conclusion

BRD helps businesses agree on **what they need and why**. SRS helps the software team agree on **what the system must do and how to test**. Good software BAs do not write longer documents, but write for the right readers, for the right decisions that need to be made, and at the right level of detail to reduce rework.
