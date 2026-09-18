---
id: 02760001-ba02-4001-a008-000000000001
title: "QA Collaboration & Defect Triage cho BA: Làm sao giảm bug sai nghiệp vụ?"
slug: qa-collaboration-defect-triage-ba
excerpt: >-
  BA và QA là cặp đôi quan trọng để biến requirement thành test scenarios. Bài này
  hướng dẫn cách phối hợp với QA, phân loại severity/priority, triage defect và quản lý
  regression scope trước release.
featured_image: /images/blog/user-story-acceptance-criteria.webp
type: blog
reading_time: 11
view_count: 0
meta: null
published_at: '2026-05-06T10:10:00.000000Z'
created_at: '2026-05-06T10:10:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: QA, slug: qa}, {name: Defect, slug: defect}, {name: UAT, slug: uat}, {name: Agile, slug: agile}]
comments: []
---

BA viết requirement. QA kiểm chứng requirement. Nếu hai vai trò này không làm việc sát nhau, bug "sai nghiệp vụ" sẽ xuất hiện rất nhiều.

Bug sai nghiệp vụ thường không phải vì Dev yếu hay QA test thiếu. Gốc rễ thường là:

- Acceptance criteria không đủ rõ.
- Business rule nằm trong đầu stakeholder.
- Edge case không được nêu.
- QA không được tham gia refinement.
- Defect triage chỉ nhìn kỹ thuật, không nhìn business impact.

## 1. BA và QA nên phối hợp từ lúc nào?

Từ refinement, không phải cuối sprint.

QA nên được mời khi:

- Story có business rule phức tạp.
- Có nhiều role/permission.
- Có integration/API.
- Có data migration.
- Có UAT hoặc compliance.
- Có NFR quan trọng.

Nếu QA chỉ thấy requirement khi build xong, họ chỉ có thể phát hiện lỗi muộn.

## 2. Từ AC sang test scenarios

Acceptance criteria tốt là đầu vào cho test scenario.

Story:

> As a customer, I want to cancel my appointment so that I can free the slot when I cannot attend.

AC:

```gherkin
Given khách có lịch hẹn Confirmed
When khách hủy trước giờ hẹn ít nhất 4 tiếng
Then hệ thống cập nhật trạng thái thành Cancelled
And slot được mở lại cho khách khác đặt
And khách nhận email xác nhận hủy
```

Test scenarios:

| ID | Scenario | Expected |
|---|---|---|
| TC-001 | Hủy trước 4 tiếng | Cancelled, slot mở lại, email gửi |
| TC-002 | Hủy dưới 4 tiếng | Không cho hủy, hiển thị policy |
| TC-003 | Hủy lịch đã Cancelled | Không cho hủy lại |
| TC-004 | Email service lỗi | Booking vẫn cancelled, email retry/log |
| TC-005 | User khác hủy lịch | 403 hoặc không có quyền |

QA giúp BA nhìn ra case mà BA hay bỏ sót.

## 3. Severity vs Priority

Hai khái niệm này hay bị nhầm.

- **Severity**: mức độ nghiêm trọng của lỗi về mặt hệ thống/chức năng.
- **Priority**: mức độ cần sửa gấp dựa trên business/release context.

Ví dụ:

| Bug | Severity | Priority | Vì sao |
|---|---|---|---|
| Payment bị charge 2 lần | Critical | P0 | Ảnh hưởng tiền và trust |
| Logo lệch 2px ở admin nội bộ | Low | P3 | Ít impact |
| Sai format ngày trên invoice | Medium | P1 | Có thể ảnh hưởng pháp lý/kế toán |
| Export CSV thiếu 1 cột optional | Medium | P2 | Có workaround |

BA cần tham gia priority vì BA hiểu business impact.

## 4. Defect triage meeting

Agenda 30 phút:

```text
1. Review bug mới theo severity
2. Xác định business impact
3. Xác định workaround
4. Quyết định fix now / fix later / won't fix
5. Update release risk
6. Assign owner và deadline
```

Mỗi defect nên có:

- Steps to reproduce.
- Actual result.
- Expected result.
- Environment.
- Evidence screenshot/log.
- Requirement/AC liên quan.
- Impact.
- Severity.
- Priority.
- Owner.

## 5. Defect triage matrix

| Impact | Workaround | Decision |
|---|---|---|
| High | No workaround | Fix before release |
| High | Has workaround | Product/BA decide risk |
| Medium | No workaround | Fix if capacity |
| Medium | Has workaround | Can defer |
| Low | Has workaround | Backlog |

Decision không nên dựa vào cảm giác. Cần ghi rõ lý do.

## 6. Regression scope

Khi requirement thay đổi, QA cần biết test lại gì.

BA nên ghi:

- Requirement nào đổi.
- Business rule nào đổi.
- API/data nào ảnh hưởng.
- Role nào ảnh hưởng.
- Report/dashboard nào ảnh hưởng.
- UAT scenario nào cần update.

Ví dụ:

```text
Change: Cho phép hủy lịch trước 2 tiếng thay vì 4 tiếng.

Regression scope:
- Cancel appointment flow
- Slot availability recalculation
- Email template
- Admin booking history
- UAT scenario UAT-03
```

## 7. BA nên đọc bug như thế nào?

Khi QA log bug, BA không chỉ hỏi "đúng spec chưa?" Hãy hỏi:

- Spec có mơ hồ không?
- AC có cover case này không?
- Business rule có nguồn không?
- Đây là bug hay change request?
- Nếu không sửa, business impact là gì?
- Có workaround không?
- Có cần update SRS/RTM/test case không?

Nếu bug xuất hiện vì requirement thiếu, BA nên nhận trách nhiệm cải thiện requirement, không chỉ đẩy cho Dev.

## 8. UAT defects

Defect trong UAT thường rơi vào 3 loại:

| Loại | Cách xử lý |
|---|---|
| Bug thật | Fix theo severity/priority |
| Requirement gap | Change request hoặc scope update |
| Training/process issue | Update guide, training, communication |

BA cần phân biệt rõ. Không phải mọi phản hồi UAT đều là bug.

## 9. Ví dụ defect triage đầy đủ

Feature: đổi lịch tư vấn online.

| Bug | Mô tả | Severity | Priority | BA phân tích | Quyết định |
|---|---|---|---|---|---|
| BUG-101 | Khách đổi lịch dưới 4 giờ vẫn thành công. | High | P0 | Vi phạm BR-003, ảnh hưởng trực tiếp vận hành consultant. | Fix trước release, thêm regression test cutoff. |
| BUG-102 | Email xác nhận gửi 2 lần khi double click. | Medium | P1 | Có thể do thiếu idempotency hoặc UI không disable button. | Fix trong sprint, thêm test duplicate submit. |
| BUG-103 | Message lỗi ghi "2 giờ" thay vì "4 giờ". | Low | P0 | Severity thấp nhưng priority cao vì gây sai policy với khách. | Fix copy trước UAT sign-off. |
| BUG-104 | Consultant dashboard load 5 giây. | Medium | P2 | Không chặn release nếu dưới threshold NFR? Cần so với NFR-PERF. | Engineering đo p95, nếu > NFR thì fix. |
| BUG-105 | CSKH không biết cách đổi lịch thay khách. | Not bug | P2 | Đây là training/SOP issue, không phải defect phần mềm. | Update SOP và training note. |

BA nên hỏi trong triage:

- Bug này vi phạm requirement/rule nào?
- Có workaround không?
- Có ảnh hưởng legal/compliance/customer trust không?
- Có cần update AC/test case không?
- Đây là bug, requirement gap hay change request?

Kết quả triage tốt phải để lại quyết định rõ: fix now, fix later, reject, convert to change request, hoặc training issue.

## 10. Lỗi thường gặp

**Lỗi 1: QA không được tham gia refinement**

Khi QA vào muộn, edge cases bị phát hiện muộn.

**Lỗi 2: BA không cập nhật requirement sau bug**

Nếu bug làm rõ một rule mới, SRS/AC/test case phải update. Nếu không, bug tương tự sẽ quay lại.

**Lỗi 3: Ưu tiên bug theo người la to nhất**

Priority phải dựa trên impact, urgency, workaround và release risk.

## Bài tập thực hành

Chọn một story bạn từng viết. Tạo bảng:

- AC
- Test scenario
- Expected result
- Data needed
- Role needed
- Edge case

Sau đó tự hỏi: QA có thể test mà không cần hỏi lại bạn không?

## Nguồn tham khảo

- Scrum Guide 2020: https://scrumguides.org/scrum-guide.html
- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/

## Kết luận

BA và QA cùng bảo vệ chất lượng từ hai góc nhìn: BA bảo vệ ý nghĩa nghiệp vụ, QA bảo vệ khả năng kiểm chứng. Khi hai vai trò làm việc sớm và có cấu trúc, team giảm bug sai spec, giảm rework và UAT nhẹ hơn rất nhiều.
