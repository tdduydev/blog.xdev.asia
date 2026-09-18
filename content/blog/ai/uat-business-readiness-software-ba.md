---
id: 02760001-ba02-4001-a009-000000000001
title: "UAT & Business Readiness cho Software BA: Từ test plan đến go/no-go"
slug: uat-business-readiness-software-ba
excerpt: >-
  UAT không chỉ là cho user test vài màn hình. Bài này hướng dẫn BA lập UAT plan, chọn
  scenario, chuẩn bị test data, quản lý defect, training, rollout và quyết định go/no-go.
featured_image: /images/blog/uat-business-readiness-ai.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T10:20:00.000000Z'
created_at: '2026-05-06T10:20:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: UAT, slug: uat}, {name: Business Readiness, slug: business-readiness}, {name: Release, slug: release}]
comments: []
---

UAT (User Acceptance Testing) không phải "QA test thêm lần nữa". UAT là kiểm tra xem solution có đáp ứng nhu cầu business trong ngữ cảnh sử dụng thật hay không.

Nếu UAT làm qua loa, rủi ro thường xuất hiện sau go-live:

- User không biết dùng.
- Process mới không khớp vận hành.
- Data migration thiếu.
- Report không phục vụ decision.
- Business rule sai nhưng QA không biết vì spec thiếu.

Software BA thường là người điều phối UAT cùng PO, QA và business users.

## 1. UAT khác QA testing thế nào?

| QA Testing | UAT |
|---|---|
| Kiểm tra hệ thống có đúng spec không | Kiểm tra solution có dùng được cho business không |
| Do QA/team kỹ thuật thực hiện | Do business user/key user thực hiện |
| Tập trung defect kỹ thuật và functional | Tập trung process, policy, outcome |
| Dùng test cases chi tiết | Dùng business scenarios |
| Có thể chạy liên tục trong sprint | Thường trước release/go-live |

QA trả lời: "Hệ thống có làm đúng requirement không?"

UAT trả lời: "Business có chấp nhận dùng solution này không?"

## 2. UAT plan gồm gì?

Template:

```markdown
# UAT Plan

## 1. Objective
- UAT để xác nhận điều gì?

## 2. Scope
- In scope
- Out of scope

## 3. Participants
- Business users
- BA
- QA
- Product Owner
- Support/Operations

## 4. Entry Criteria
- Build deployed to UAT environment
- Critical QA defects closed
- Test data ready
- UAT scenarios approved

## 5. Test Scenarios

## 6. Defect Management
- Tool
- Severity/Priority rules
- SLA fix

## 7. Exit Criteria
- Must-have scenarios pass
- No open P0/P1 defects
- Business owner sign-off

## 8. Go/No-Go Criteria
```

## 3. Chọn UAT scenarios

Đừng copy toàn bộ QA test cases. UAT nên tập trung vào business journey.

Ví dụ feature đặt lịch:

| Scenario | Vì sao quan trọng |
|---|---|
| Khách đặt lịch thành công | Core business flow |
| Khách đổi lịch | Flow phổ biến |
| Khách hủy sát giờ | Policy nhạy cảm |
| Admin xử lý lịch trùng | Operational exception |
| Consultant xem lịch trong ngày | Role khác customer |
| Report số booking | Business tracking |

Mỗi scenario nên có:

- Persona/role.
- Precondition.
- Steps.
- Expected business outcome.
- Data needed.
- Pass/fail criteria.

## 4. Test data

UAT thất bại rất nhiều vì test data không chuẩn.

Checklist:

- [ ] Có user cho từng role.
- [ ] Có dữ liệu normal, edge, invalid.
- [ ] Có dữ liệu trạng thái khác nhau.
- [ ] Có dữ liệu đủ lớn nếu cần test report.
- [ ] Data không chứa PII thật nếu không được phép.
- [ ] Data reset được giữa các vòng test.

Ví dụ:

| Data | Mục đích |
|---|---|
| Customer A có lịch Confirmed | Test hủy/đổi |
| Customer B chưa có lịch | Test đặt mới |
| Slot đã full | Test empty/error |
| Admin user | Test quản trị |
| Consultant user | Test view lịch |

## 5. Entry và exit criteria

### Entry criteria

Chỉ bắt đầu UAT khi:

- Build ổn định.
- QA đã pass critical path.
- Known issues đã được thông báo.
- UAT scenarios đã approved.
- Test data và account sẵn sàng.
- Business users đã biết lịch test.

### Exit criteria

UAT hoàn tất khi:

- 100% must-have scenarios pass.
- Không còn P0/P1 defect.
- P2 có workaround và business chấp nhận.
- Training/release note sẵn sàng.
- Business owner sign-off.

## 6. Defect trong UAT xử lý thế nào?

Khi user báo lỗi:

1. BA xác nhận bước reproduce.
2. QA kiểm tra có phải bug kỹ thuật không.
3. BA xác định business impact.
4. PO/Business owner quyết định priority.
5. Team fix hoặc defer.
6. BA update UAT status và release risk.

Phân loại:

| Type | Ví dụ | Cách xử lý |
|---|---|---|
| Bug | Hủy lịch nhưng slot không mở lại | Fix |
| Requirement gap | Business muốn thêm lý do hủy | Change request |
| Usability issue | User không thấy nút đổi lịch | UX adjustment |
| Training issue | User không biết filter report | Update guide |

## 7. Business readiness

UAT pass chưa chắc go-live được. Business readiness gồm:

- User training.
- SOP mới.
- Support script.
- FAQ.
- Rollback plan.
- Communication plan.
- Monitoring dashboard.
- Owner sau go-live.

Go-live checklist:

```text
☐ UAT sign-off
☐ Release note
☐ Training done
☐ Support team ready
☐ Monitoring/alert ready
☐ Rollback/fallback plan
☐ Business owner approves go-live
```

## 8. Go/No-Go decision

Go/No-Go không nên cảm tính. Dùng scorecard:

| Criteria | Status | Note |
|---|---|---|
| Critical UAT scenarios | Pass | 12/12 |
| P0/P1 defects | Pass | 0 open |
| P2 defects | At risk | 2 open, workaround exists |
| Training | Pass | 30 users trained |
| Support readiness | Pass | SOP updated |
| Monitoring | Pass | Dashboard live |
| Business approval | Pending | Waiting Head of Ops |

Nếu có "At risk", phải ghi owner và mitigation.

## 9. Ví dụ UAT script đầy đủ

UAT scenario: Customer books and reschedules a consultation.

| Field | Value |
|---|---|
| Scenario ID | UAT-BOOK-002 |
| Persona | Existing customer |
| Objective | Xác nhận khách có thể đặt lịch và đổi lịch trước cutoff 4 giờ. |
| Preconditions | Customer active, consultant A có slot 09:00 và 10:00 ngày mai, email service enabled. |
| Test data | customer_id = CUS-1001, consultant_id = CON-2001, slot_09 = SLOT-0900, slot_10 = SLOT-1000. |

Steps:

| Step | Action | Expected result | Evidence |
|---|---|---|---|
| 1 | Customer mở trang đặt lịch. | Danh sách consultant và slot trống hiển thị dưới 2 giây. | Screenshot slot list. |
| 2 | Chọn consultant A, slot 09:00. | Nút xác nhận enabled, thông tin lịch đúng. | Screenshot confirmation page. |
| 3 | Bấm xác nhận. | Appointment tạo với status Confirmed, có confirmation code. | Appointment ID. |
| 4 | Kiểm tra email. | Email xác nhận đến trong 1 phút, không chứa dữ liệu nhạy cảm. | Email screenshot. |
| 5 | Đổi lịch sang slot 10:00. | Slot cũ mở lại, slot mới Confirmed, audit log ghi old/new slot. | Audit log ID. |
| 6 | Thử đổi lịch sang appointment của user khác. | Hệ thống trả 403. | Error screenshot. |

Exit criteria cho scenario này:

- Không có defect severity High/Critical.
- Business user xác nhận wording dễ hiểu.
- CSKH xác nhận SOP xử lý exception dưới 4 giờ.
- QA xác nhận regression cho duplicate booking pass.

## 10. Với AI feature thì thêm gì?

Nếu feature có AI, UAT cần thêm:

- Golden test set.
- Output quality threshold.
- Hallucination/fallback scenarios.
- Human override flow.
- Bias/safety review nếu high impact.
- Monitoring sau go-live.

Nhưng đừng để toàn bộ UAT chỉ xoay quanh AI. Business vẫn cần kiểm tra end-to-end journey.

## Nguồn tham khảo

- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/
- Scrum Guide 2020: https://scrumguides.org/scrum-guide.html

## Kết luận

UAT tốt không phải test thật nhiều, mà là test đúng business scenarios, đúng người dùng, đúng dữ liệu và có quyết định rõ. Software BA đóng vai trò cầu nối: biến requirement thành UAT plan, biến feedback thành defect/change, và giúp business tự tin go-live.
