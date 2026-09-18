---
id: 02760001-ba02-4001-a006-000000000001
title: "Software Handoff cho BA: Từ SRS sang Design, Dev và Test Cases"
slug: software-handoff-srs-design-test-cases-ba
excerpt: >-
  Handoff tốt giúp Dev/QA hiểu đúng requirement trước khi sprint bắt đầu. Bài này đưa
  ra checklist handoff, agenda Three Amigos, ví dụ chuyển acceptance criteria thành
  test scenarios và cách quản lý open questions.
featured_image: /images/blog/user-story-acceptance-criteria.webp
type: blog
reading_time: 11
view_count: 0
meta: null
published_at: '2026-05-06T09:50:00.000000Z'
created_at: '2026-05-06T09:50:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Handoff, slug: handoff}, {name: QA, slug: qa}, {name: Agile, slug: agile}, {name: Software BA, slug: software-ba}]
comments: []
---

Handoff là thời điểm requirement rời khỏi đầu BA và đi vào tay UX, Dev, QA. Nếu handoff mơ hồ, sprint sẽ trả giá:

- Dev build theo cách hiểu riêng.
- QA viết test case thiếu business rule.
- UX thiết kế flow đẹp nhưng sai policy.
- Stakeholder reject ở UAT vì "không đúng ý".

Handoff tốt không phải buổi đọc tài liệu. Handoff tốt là một cuộc alignment có cấu trúc.

## 1. Handoff xảy ra khi nào?

Trong Agile, handoff thường xảy ra ở refinement hoặc trước sprint planning. Trong dự án plan-driven, handoff xảy ra sau khi SRS được baseline.

Bạn cần handoff khi:

- Story sắp vào sprint.
- SRS section đã đủ chín.
- UX bắt đầu thiết kế.
- QA bắt đầu viết test cases.
- Có thay đổi requirement lớn.
- Có integration hoặc NFR quan trọng.

## 2. Ai nên tham gia?

Tối thiểu:

- BA
- Product Owner hoặc business owner
- Developer/Tech Lead
- QA

Khi cần:

- UX Designer
- Architect
- Data Engineer
- Security/Compliance
- Operations/Support

Đừng kéo quá đông nếu không cần. Nhưng đừng thiếu người quyết định.

## 3. Handoff checklist

Trước buổi handoff, BA chuẩn bị:

- [ ] Problem và business value.
- [ ] Scope và out-of-scope.
- [ ] User stories hoặc SRS section.
- [ ] Acceptance criteria.
- [ ] Business rules.
- [ ] Wireframe hoặc flow nếu có UI.
- [ ] API/data impact.
- [ ] NFR liên quan.
- [ ] Edge cases.
- [ ] Dependencies.
- [ ] Open questions.
- [ ] Sign-off hoặc decision cần chốt.

Nếu thiếu quá nhiều mục, chưa nên handoff. Hãy quay lại discovery/refinement.

## 4. Agenda Three Amigos 45 phút

Three Amigos thường là BA, Dev, QA cùng review story. Có thể thêm PO/UX nếu cần.

```text
0-5 phút: BA nhắc lại business value và scope
5-15 phút: Review flow chính và acceptance criteria
15-25 phút: Dev hỏi về API/data/NFR/dependency
25-35 phút: QA chuyển AC thành test scenarios, hỏi edge cases
35-40 phút: Chốt open questions, owner, deadline
40-45 phút: Quyết định story Ready hay chưa
```

Output cuối buổi:

- Story Ready / Not Ready.
- Danh sách câu hỏi còn mở.
- Test scenarios nháp.
- Update cần làm trong SRS/story.

## 5. Ví dụ chuyển AC thành test scenarios

Story:

> As a customer, I want to reschedule my appointment so that I can choose another available time when my plan changes.

AC:

```gherkin
Given khách có lịch hẹn ở trạng thái Confirmed
When khách chọn đổi lịch sang slot còn trống trước giờ hẹn ít nhất 4 tiếng
Then hệ thống cập nhật lịch hẹn sang slot mới
And gửi email xác nhận lịch mới
```

Test scenarios:

| ID | Scenario | Expected |
|---|---|---|
| TC-001 | Đổi sang slot còn trống trước 4 tiếng | Thành công, email gửi |
| TC-002 | Đổi sang slot đã có người đặt | Báo lỗi slot không còn trống |
| TC-003 | Đổi lịch khi còn dưới 4 tiếng | Không cho đổi, hiển thị policy |
| TC-004 | Email service lỗi | Lịch vẫn update, email retry/log |
| TC-005 | User không phải owner của lịch | 403 hoặc thông báo không có quyền |

Đây là cách BA giúp QA không chỉ test happy path.

## 6. Open question log

Không phải câu hỏi nào cũng chốt ngay. Nhưng câu hỏi chưa chốt phải có owner.

Template:

| ID | Question | Impact | Owner | Due | Status |
|---|---|---|---|---|---|
| OQ-01 | Có cho đổi lịch trong ngày không? | Business rule, UI, AC | CSKH Lead | 2026-05-12 | Open |
| OQ-02 | Email fail có block booking không? | Error handling | Tech Lead | 2026-05-12 | Open |

Rule: story không được vào sprint nếu open question là blocker.

## 7. Handoff cho UX

UX cần:

- Persona chính.
- Goal của user.
- Flow chính.
- Error/empty/loading states.
- Business rules ảnh hưởng UI.
- Content cần hiển thị.
- Accessibility/localization requirement.

BA không thiết kế UI thay UX, nhưng BA phải đảm bảo UX hiểu business constraint.

## 8. Handoff cho Dev

Dev cần:

- Functional behavior.
- Data model hoặc field impact.
- API interaction.
- Permission model.
- Error handling.
- NFR.
- Dependency.
- Feature flag hoặc rollout constraints.

BA không chỉ nói "làm màn hình đặt lịch". BA cần nói rõ "slot nào được hiển thị, rule trùng lịch, timezone, trạng thái, audit log".

## 9. Handoff cho QA

QA cần:

- Acceptance criteria.
- Business rules.
- Test data.
- Role/permission matrix.
- UAT scenarios.
- Regression scope.
- Known risks.

Nếu QA không hiểu business rule, test pass vẫn có thể sai nghiệp vụ.

## 10. Ví dụ handoff pack đầy đủ

Feature: Customer reschedules consultation appointment.

| Phần | Nội dung handoff |
|---|---|
| Business value | Giảm cuộc gọi CSKH khi khách cần đổi lịch, nhưng vẫn bảo vệ lịch làm việc của consultant. |
| Scope | Khách đổi lịch online trước giờ hẹn ít nhất 4 giờ. |
| Out of scope | Đổi lịch dưới 4 giờ, đổi consultant khác domain, đổi lịch nhóm. |
| Business rules | BR-001: chỉ owner appointment được đổi. BR-002: chỉ đổi nếu appointment status = Confirmed. BR-003: chỉ đổi trước giờ hẹn >= 4 giờ. |
| UX notes | Nếu đổi thành công, hiển thị confirmation code mới; nếu fail do cutoff, hiển thị hotline. |
| API/data | `PATCH /appointments/{id}/reschedule`, request gồm `new_slot_id`, `reason`, `idempotency_key`. |
| NFR | Response p95 dưới 2 giây; ghi audit log old_slot/new_slot. |

Test scenario matrix:

| Scenario | Test data | Expected result |
|---|---|---|
| Đổi sang slot còn trống trước 4 giờ | appointment Confirmed, starts in 24h | Status vẫn Confirmed, slot cũ mở lại, slot mới bị khóa. |
| Đổi dưới 4 giờ | appointment starts in 3h30m | Không đổi lịch, hiển thị hotline. |
| Đổi sang slot vừa bị đặt | new_slot_id unavailable | Không đổi lịch, gợi ý slot khác. |
| User đổi appointment của người khác | appointment_id không thuộc user | Trả 403, ghi security event. |
| Submit 2 lần do double click | cùng idempotency_key | Chỉ có một lần đổi lịch. |

Open questions:

| ID | Question | Owner | Deadline |
|---|---|---|---|
| OQ-001 | Đổi lịch có gửi SMS hay chỉ email? | Marketing | 2026-05-10 |
| OQ-002 | Consultant có được reject lịch đã đổi không? | Ops Lead | 2026-05-10 |
| OQ-003 | Có tính no-show nếu khách đổi nhiều lần không? | Sales Manager | 2026-05-11 |

## 11. Lỗi thường gặp

**Lỗi 1: Handoff bằng cách gửi link Confluence**

Link không thay thế alignment. Với requirement quan trọng, cần review live hoặc async có checklist.

**Lỗi 2: Không mời QA sớm**

QA vào muộn thì edge cases được phát hiện muộn. Mời QA từ refinement giúp giảm defect.

**Lỗi 3: Không ghi quyết định**

Buổi họp tốt nhưng không có decision log thì vài ngày sau mọi người lại nhớ khác nhau.

## Nguồn tham khảo

- Scrum Guide 2020: https://scrumguides.org/scrum-guide.html
- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/

## Kết luận

Handoff không phải bàn giao một chiều. Handoff là buổi làm rõ chung giữa BA, PO, Dev, QA và các vai trò liên quan. Khi handoff tốt, sprint ít hỏi lại hơn, QA test sát hơn, UAT ít bất ngờ hơn và stakeholder tin BA hơn.
