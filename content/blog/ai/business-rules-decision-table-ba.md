---
id: 02760001-ba02-4001-a011-000000000001
title: "Business Rules và Decision Table cho BA: Viết rule sao cho Dev/QA không hiểu sai"
slug: business-rules-decision-table-ba
excerpt: >-
  Business rule là phần dễ gây rework nhất nếu BA viết mơ hồ. Bài này hướng dẫn
  cách phân loại rule, viết rule atomic, dùng decision table, ví dụ duyệt đơn
  vay và checklist review trước khi đưa vào SRS, user story hoặc test case.
featured_image: /images/blog/business-requirements-checklist.webp
type: blog
reading_time: 15
view_count: 0
meta: null
published_at: '2026-05-06T10:10:00.000000Z'
created_at: '2026-05-06T10:10:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Business Rules, slug: business-rules}, {name: Decision Table, slug: decision-table}, {name: Requirements, slug: requirements}, {name: Software BA, slug: software-ba}]
comments: []
---

Nếu user story nói hệ thống **cần làm gì**, thì business rule nói hệ thống **phải quyết định như thế nào**.

Một feature có thể trông đơn giản trên màn hình, nhưng ẩn sau đó là rất nhiều rule: ai được duyệt, hạn mức bao nhiêu, trường hợp nào bị chặn, khi nào cần escalation, dữ liệu nào bắt buộc, policy nào được ưu tiên khi hai rule xung đột.

BA viết rule không rõ thì Dev thường phải đoán. QA test theo cách khác. Business lại nói "ý tôi không phải vậy". Đây là một nguồn rework rất đắt.

## 1. Business rule là gì?

Business rule là một ràng buộc, chính sách hoặc điều kiện quyết định cách nghiệp vụ vận hành.

Ví dụ:

- Khách hàng dưới 18 tuổi không được mở tài khoản đầu tư.
- Đơn vay trên 500 triệu cần phê duyệt cấp trưởng phòng.
- Mã giảm giá chỉ áp dụng một lần cho mỗi khách hàng.
- Người dùng chỉ được hủy lịch trước giờ hẹn tối thiểu 2 giờ.
- Hồ sơ thiếu giấy tờ bắt buộc phải chuyển sang trạng thái "Cần bổ sung".

Rule tốt phải đủ rõ để Dev implement và QA viết test case. Nếu rule chỉ nghe hợp lý với business nhưng không test được, nó chưa đủ tốt cho Software BA.

## 2. Phân loại rule để hỏi đúng câu

BA nên phân nhóm rule trước khi viết chi tiết:

| Nhóm rule | Câu hỏi cần hỏi |
|---|---|
| Eligibility | Ai đủ điều kiện? Ai không đủ điều kiện? |
| Calculation | Công thức tính là gì? Làm tròn thế nào? |
| Validation | Field nào bắt buộc? Format/range/unique ra sao? |
| Authorization | Ai được xem, tạo, sửa, duyệt, xóa? |
| State transition | Trạng thái nào được chuyển sang trạng thái nào? |
| SLA / timing | Deadline, thời gian chờ, cutoff time là gì? |
| Exception | Khi dữ liệu thiếu, sai, trùng, quá hạn thì xử lý sao? |
| Compliance | Rule nào đến từ luật, policy, audit hoặc hợp đồng? |

Phân loại giúp BA không hỏi lung tung. Với mỗi nhóm rule, bạn biết cần stakeholder nào xác nhận và artifact nào phải cập nhật.

## 3. Cách viết rule atomic

Rule atomic là rule chỉ nói một điều kiện hoặc một quyết định. Đừng gộp nhiều ý trong một câu dài.

Ví dụ chưa tốt:

> Khách hàng đủ điều kiện vay nếu có thu nhập ổn định, điểm tín dụng tốt, không có nợ xấu và hồ sơ đầy đủ.

Viết lại:

| ID | Rule |
|---|---|
| BR-001 | Khách hàng phải có thu nhập trung bình 3 tháng gần nhất >= 15.000.000 VND. |
| BR-002 | Điểm tín dụng nội bộ phải >= 650. |
| BR-003 | Khách hàng không được có khoản nợ nhóm 3, 4 hoặc 5 trong 24 tháng gần nhất. |
| BR-004 | Hồ sơ phải có đủ CCCD, sao kê thu nhập và giấy đề nghị vay. |

Mỗi rule nên có:

- ID ổn định
- Source stakeholder hoặc source document
- Version hoặc effective date
- Owner phê duyệt
- Ví dụ pass/fail
- Test impact

## 4. Khi nào dùng decision table?

Dùng decision table khi quyết định phụ thuộc vào nhiều điều kiện.

Ví dụ feature duyệt đơn vay:

| Điều kiện / Kết quả | Rule 1 | Rule 2 | Rule 3 | Rule 4 |
|---|---:|---:|---:|---:|
| Income >= 15 triệu | Y | Y | Y | N |
| Credit score >= 650 | Y | Y | N | - |
| No bad debt | Y | N | - | - |
| Required documents complete | Y | Y | Y | Y |
| **Decision** | Auto approve | Manual review | Reject | Reject |
| **Reason code** | AP-001 | RV-002 | RJ-003 | RJ-004 |

Decision table giúp team nhìn thấy tổ hợp điều kiện. Nó cũng giúp QA sinh test case nhanh hơn: mỗi cột gần như là một nhóm test scenario.

## 5. Cách viết decision table dễ bảo trì

Một decision table tốt cần:

- Điều kiện rõ yes/no, range hoặc enum.
- Dấu `-` chỉ dùng khi điều kiện không ảnh hưởng đến quyết định.
- Mỗi cột cho ra một decision duy nhất.
- Có reason code hoặc message code nếu hệ thống cần hiển thị lý do.
- Có ưu tiên rule nếu nhiều rule cùng match.
- Có default case cho tổ hợp chưa được liệt kê.

Nếu bảng quá lớn, đừng cố nhồi vào một bảng. Hãy tách theo lớp:

1. Eligibility check.
2. Risk check.
3. Approval routing.
4. Notification/message.

## 6. Từ rule sang user story và test case

Ví dụ user story:

```gherkin
As a loan officer
I want the system to evaluate loan eligibility
So that I can reduce manual screening time.
```

Acceptance criteria:

```gherkin
Scenario: Auto approve eligible application
  Given the applicant has income >= 15,000,000 VND
  And credit score >= 650
  And no bad debt in the last 24 months
  And all required documents are complete
  When the officer submits the application
  Then the application status is "Auto Approved"
  And the reason code is "AP-001"
```

Traceability:

| AC | Rule | Test case |
|---|---|---|
| AC-001 | BR-001, BR-002, BR-003, BR-004 | TC-LOAN-001 |
| AC-002 | BR-003 | TC-LOAN-006 |
| AC-003 | BR-004 | TC-LOAN-008 |

BA không cần viết toàn bộ test case thay QA, nhưng BA phải giúp rule đủ rõ để QA chuyển thành test case không phải đoán.

## 7. Checklist review business rules

Trước khi handoff, kiểm tra:

- Rule có ID không?
- Rule có source không?
- Rule có owner approve không?
- Rule có ví dụ pass/fail không?
- Rule có conflict với rule khác không?
- Rule có thứ tự ưu tiên không?
- Rule có exception/default case không?
- Rule có message hoặc reason code không?
- Rule có impact đến data, API, UI, report, audit log không?
- Rule có trace sang AC/test case không?

## 8. Lỗi thường gặp

**Lỗi 1: Viết rule bằng từ mơ hồ**

"Khách hàng VIP được ưu tiên" là chưa đủ. VIP là ai? Ưu tiên bằng SLA, queue, discount hay approval route?

**Lỗi 2: Không hỏi default case**

Nhiều bug xảy ra khi dữ liệu rơi vào tổ hợp điều kiện không ai nhắc tới.

**Lỗi 3: Không version rule**

Rule nghiệp vụ thay đổi theo policy. Nếu không có version/effective date, team rất khó audit tại sao hệ thống quyết định như vậy ở thời điểm đó.

## Ví dụ decision table đầy đủ hơn

Use case: khách đổi lịch tư vấn.

Business rules:

| Rule ID | Rule |
|---|---|
| BR-001 | Chỉ customer sở hữu appointment mới được đổi lịch online. |
| BR-002 | Appointment phải ở trạng thái Confirmed. |
| BR-003 | Thời điểm bắt đầu appointment phải còn ít nhất 4 giờ. |
| BR-004 | Slot mới phải còn trống tại thời điểm xác nhận. |
| BR-005 | Nếu đổi lịch thành công, slot cũ phải được mở lại. |

Decision table:

| Điều kiện / Kết quả | R1 | R2 | R3 | R4 | R5 |
|---|---:|---:|---:|---:|---:|
| User là owner appointment | Y | N | Y | Y | Y |
| Status = Confirmed | Y | - | N | Y | Y |
| Còn >= 4 giờ | Y | - | - | N | Y |
| Slot mới available | Y | - | - | - | N |
| **Decision** | Allow reschedule | Reject | Reject | Reject | Reject |
| **Reason code** | OK | NOT_OWNER | INVALID_STATUS | CUTOFF_EXPIRED | SLOT_UNAVAILABLE |
| **User message** | Đổi lịch thành công | Bạn không có quyền đổi lịch này | Lịch hẹn không thể đổi | Lịch sắp diễn ra, vui lòng gọi hotline | Slot này vừa được đặt |

Mapping sang test case:

| Rule column | Test case |
|---|---|
| R1 | TC-RS-001 đổi lịch thành công |
| R2 | TC-RS-002 user đổi lịch của người khác |
| R3 | TC-RS-003 appointment Cancelled không đổi được |
| R4 | TC-RS-004 đổi lịch dưới 4 giờ |
| R5 | TC-RS-005 slot mới vừa bị đặt |

## Bài tập thực hành

Chọn một feature bạn quen thuộc như đặt lịch, áp mã giảm giá hoặc duyệt refund. Viết:

1. 10 business rules atomic.
2. Một decision table có ít nhất 4 cột decision.
3. 3 acceptance criteria dạng Gherkin.
4. Một bảng traceability từ rule sang AC.

## Nguồn tham khảo

- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/
- IEEE/ISO/IEC 29148-2018: https://standards.ieee.org/ieee/29148/6937/
- PMI Business Analysis for Practitioners: https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601

## Kết luận

Business rule là nơi BA biến policy thành hành vi hệ thống. Decision table là công cụ rất mạnh để giảm hiểu sai giữa business, Dev và QA. Nếu rule rõ, có ID, có source, có ví dụ và có traceability, team sẽ giảm rất nhiều tranh luận vô ích trong sprint.
