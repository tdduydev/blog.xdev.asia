---
id: 02760001-ba02-4001-a004-000000000001
title: 'NFR, Quality Attributes and Edge Cases: How can BA write for Dev/QA to test?'
slug: nfr-quality-attributes-edge-cases-ba
excerpt: >-
  Functional requirements say what the system does, while NFR says how well the
  system does it. This article guides BAs to write measurable NFRs, quality
  attribute scenarios, edge cases and review checklists before the sprint.
featured_image: /images/blog/business-requirements-checklist.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T09:30:00.000000Z'
created_at: '2026-05-06T09:30:00.000000Z'
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
  - name: NFR
    slug: nfr
  - name: Requirements
    slug: requirements
  - name: QA
    slug: qa
  - name: Software BA
    slug: software-ba
comments: []
locale: en
---
Functional requirements answer: **What does the system do?**

Non-functional requirement (NFR) answers: **how well does the system perform, under what conditions?**

Many projects fail not because of a lack of functionality, but because of a lack of NFR:

- Feature has enough buttons, but is too slow.
- Login works, but audit log is missing.
- API returns correct data, but does not handle rate limit.
- The form can be submitted, but screen reader users cannot use it.

BAs do not need to become architects, but BAs must know how to ask and write NFRs clearly enough.

## 1. What groups does NFR include?

Common BA groups:

| Group | BA questions to ask |
|---|---|
| Performance | How fast? With how many users? |
| Availability | How much uptime does the system need? |
| Reliability | How to recover errors? |
| Security | Who has the right to do what? |
| Privacy | Which data is sensitive? Save how long? |
| Usability | Is it easy for users to complete the task? |
| Accessibility | Can disabled people use it? |
| Scalability | What happens when traffic increases? |
| Observability | Is there enough log/metric/alert to investigate? |
| Maintainability | Easy to configure, change rules, support? |

## 2. How to write measured NFR

Don't write:

> The system must be fast.

Please write:

> The order list page must load in under 2 seconds on p95 with 500 concurrent users and 100,000 orders data.

Don't write:

> The system must be secure.

Please write:

> Only the Finance Manager role can export transaction reports. Every export must record an audit log including user_id, timestamp, filter, export line number and IP.

Templates:

```text
[Đối tượng] phải [hành vi/chất lượng] trong [điều kiện] với [ngưỡng đo] và [cách kiểm chứng].
```

## 3. Quality attribute scenario

A very clear way to write:

| Ingredients | Example |
|---|---|
| Stimulus | 1,000 users accessing simultaneously |
| Environment | Rush hour, 6-month data |
| Response | Search return system |
| Response measure | p95 latency < 2.5 seconds, error rate < 1% |

Write as requirement:

```text
Khi có 1.000 user search đơn hàng đồng thời trong giờ cao điểm, hệ thống phải trả kết quả trong p95 < 2.5 giây và error rate < 1%.
```

## 4. Edge cases THREE should not be overlooked

### Data edge cases

- Null or missing field.
- Duplicate records.
- Date in another timezone.
- Negative values ​​in the field cannot be negative.
- The name is very long.
- Special characters.

### Permission edge cases

- User is not logged in.
- User expires session.
- User has role A but accesses role B functions.
- Admin's privileges were revoked in the middle of operations.

### Integration edge cases

- Timeout API.
- API pays 500.
- The API returns a different schema than expected.
- Vendor rate limit.
- Retry causes duplicate requests.

### UX edge cases

- Empty state.
- Loading takes a long time.
- User clicks submit twice.
- Upload files in the wrong format.
- The user returns to the browser back.

## 5. Full example

Feature: Upload invoice.

Functional requirements:

```text
FR-001: User có thể upload hóa đơn dạng PDF hoặc ảnh để hệ thống lưu vào hồ sơ thanh toán.
```

NFR and edge cases:

```text
NFR-001 Performance:
File dưới 10MB phải upload xong trong p95 < 5 giây trên mạng 4G ổn định.

NFR-002 Security:
File upload phải được virus scan trước khi user khác có thể tải xuống.

NFR-003 Privacy:
File hóa đơn có thể chứa PII, chỉ role Finance và Owner của hồ sơ được xem.

EC-001:
Nếu user upload file > 10MB, hệ thống hiển thị lỗi "File vượt quá dung lượng 10MB" và không lưu file.

EC-002:
Nếu user bấm Submit hai lần, hệ thống chỉ tạo một record hóa đơn.

EC-003:
Nếu virus scan fail, file bị quarantine, user thấy trạng thái "Đang chờ kiểm tra bảo mật".
```

## 6. Checklist NFR for BA

Before the story enters the sprint:

- [ ] Does performance have measurements?
- [ ] Does Security have a clear role/permission?
- [ ] Does Privacy have data classification?
- [ ] What does Audit log need?
- [ ] Important error case Does AC exist?
- [ ] Does retry cause duplicates?
- [ ] Is the empty state already there?
- [ ] What criteria does Accessibility require?
- [ ] What metrics do monitoring/alert need?
- [ ] Does QA know how to test NFR?

## 7. AI-assisted prompt to find edge cases

You can use AI to suggest, but you must review:

```text
Bạn là Senior Software BA và QA Lead.
Đây là user story và acceptance criteria:
[paste]

Hãy liệt kê:
1. Data edge cases
2. Permission edge cases
3. Integration failure cases
4. UX empty/loading/error states
5. NFR còn thiếu
6. Test scenarios đề xuất

Trả về bảng: Case, Why it matters, Suggested AC, Test approach.
```

## 8. Common errors

**Error 1: NFR written like a slogan**

"Highly secure", "easy to use", "fast" cannot be tested. Let's add thresholds, conditions, metrics.

**Error 2: Pushing all NFRs to the architect**

The Architect helps design the solution, but the BA must ensure business needs, compliance and user expectations are clearly stated.

**Error 3: Only write happy path**

Happy path is usually easy. The part that causes production incidents lies in the edge case.

## Full NFR example for the scheduling feature

| ID | Quality attributes | Measurable Requirement | How to test/verify |
|---|---|---|---|
| NFR-PERF-001 | Performance | The slot list page must load in under 2 seconds at p95 when there are 300 concurrent users and 10,000 slots/day. | Load test before release, monitor p95 latency on dashboard. |
| NFR-AVAIL-001 | Availability | The scheduling function requires 99.5% availability during business hours 08:00-20:00. | Monitoring uptime, incident reports. |
| NFR-SEC-001 | Security | Only the customer who owns the appointment can view/change/cancel that appointment. | Permission test, negative test with another user's appointment_id. |
| NFR-AUDIT-001 | Auditability | Each time you create, change, or cancel a schedule, you must record actor, timestamp, old_status, new_status, reason. | Check the audit log in the test case. |
| NFR-ACC-001 | Accessibility | The booking form can be operated by keyboard and the screen reader can read labels/errors. | WCAG checklist, keyboard-only test. |
| NFR-OBS-001 | Observability | There are metrics for booking_success, slot_unavailable, notification_failed. | Dashboard has enough metrics after staging test. |

Edge case catalog:

| Edge cases | Expected behavior |
|---|---|
| Two customers confirm the same slot within 1 second | Only one appointment can be Confirmed; The remaining request is received `SLOT_UNAVAILABLE`. |
| Customer reschedules with exactly 4 hours left | If the policy is "at least 4 hours", the system allows >= 4 hours. |
| Email service error | Appointment is still Confirmed, notification retry 3 times and create alert if failed. |
| Consultant became inactive after the customer was viewing slot | Submit blocked, showing consultant is no longer available. |
| User opens the link to cancel an expired calendar | The system displays instructions to call the hotline, but does not cancel automatically. |

## Reference source

- IEEE/ISO/IEC 29148-2018: https://standards.ieee.org/ieee/29148/6937/
- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/

## Conclusion

NFR and edge cases are where Software BA makes a difference. A story may look small, but if it lacks performance, security, privacy, error handling and observability, it can create huge rework after release. Good BAs help the team see that risk before coding begins.
