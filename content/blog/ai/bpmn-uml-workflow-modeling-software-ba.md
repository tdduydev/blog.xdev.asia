---
id: 02760001-ba02-4001-a012-000000000001
title: "BPMN và UML cho Software BA: Vẽ workflow sao cho business hiểu, Dev triển khai được"
slug: bpmn-uml-workflow-modeling-software-ba
excerpt: >-
  BA không cần vẽ mọi loại diagram, nhưng cần biết khi nào dùng BPMN, activity
  diagram, sequence diagram, state diagram và domain model. Bài này hướng dẫn
  cách chọn sơ đồ, ví dụ đặt lịch và checklist review diagram trước handoff.
featured_image: /images/blog/uml-bpmn-ai-assisted-flows.webp
type: blog
reading_time: 16
view_count: 0
meta: null
published_at: '2026-05-06T10:20:00.000000Z'
created_at: '2026-05-06T10:20:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: BPMN, slug: bpmn}, {name: UML, slug: uml}, {name: Modeling, slug: modeling}, {name: Software BA, slug: software-ba}]
comments: []
---

Diagram không phải để trang trí tài liệu. Diagram tốt giúp team trả lời nhanh:

- Quy trình đi từ đâu đến đâu?
- Ai làm bước nào?
- Hệ thống nào tham gia?
- Trạng thái thay đổi ra sao?
- API/service nào gọi service nào?
- Trường hợp lỗi đi đường nào?

BA không cần trở thành solution architect, nhưng Software BA nên biết chọn đúng loại sơ đồ để giảm hiểu sai.

## 1. BPMN dùng khi nào?

BPMN phù hợp khi bạn cần mô tả **business process** có nhiều actor, nhiều bước, nhiều nhánh quyết định.

Ví dụ:

- Quy trình duyệt claim bảo hiểm.
- Quy trình onboarding khách hàng.
- Quy trình đặt lịch khám.
- Quy trình xử lý refund.
- Quy trình xác minh KYC.

Theo OMG, BPMN là notation chuẩn để mô tả business process bằng Business Process Diagram, đủ dễ hiểu cho business nhưng vẫn đủ chính xác cho technical users.

BA nên dùng BPMN khi câu hỏi chính là: **nghiệp vụ vận hành như thế nào?**

## 2. UML dùng khi nào?

UML có nhiều loại diagram. BA thường chỉ cần vài loại:

| Diagram | Dùng khi |
|---|---|
| Use case diagram | Cần xác định actor và capability chính |
| Activity diagram | Cần mô tả luồng xử lý đơn giản, ít notation hơn BPMN |
| Sequence diagram | Cần mô tả tương tác giữa user, UI, API, service, external system |
| State diagram | Cần mô tả vòng đời trạng thái của order, ticket, claim, booking |
| Class/domain model | Cần thống nhất entity, attribute và relationship nghiệp vụ |

BA không nên vẽ UML chỉ vì thấy "chuyên nghiệp". Hãy chọn diagram theo câu hỏi cần trả lời.

## 3. Ví dụ: feature đặt lịch khám

### BPMN level business

Mục tiêu: business hiểu quy trình end-to-end.

```text
Patient -> Search doctor -> Select slot -> Submit booking
System -> Check slot availability
Gateway:
  - Slot available -> Create appointment -> Send confirmation
  - Slot unavailable -> Show alternative slots
Clinic staff -> Review appointment list
```

Ở level này, BA nên thể hiện:

- Pool/lane: Patient, System, Clinic staff.
- Gateway: slot available/unavailable.
- Event: booking submitted, confirmation sent.
- Exception: payment failed, slot expired, doctor unavailable.

### Sequence diagram level software

Mục tiêu: Dev hiểu hệ thống tương tác thế nào.

```text
User -> Web App: Submit booking
Web App -> Booking API: POST /appointments
Booking API -> Schedule Service: reserveSlot(slotId)
Schedule Service -> Database: lock slot
Booking API -> Notification Service: send confirmation
Booking API -> Web App: appointmentId + status
```

Ở level này, BA không cần quyết định architecture, nhưng cần chỉ ra:

- External system nào tham gia.
- Data nào được gửi.
- Error nào business cần xử lý.
- Response nào UI cần hiển thị.

### State diagram level lifecycle

Mục tiêu: thống nhất trạng thái appointment.

```text
Draft -> Pending Confirmation -> Confirmed -> Checked In -> Completed
Confirmed -> Cancelled
Pending Confirmation -> Expired
Confirmed -> No Show
```

Với mỗi transition, BA cần hỏi:

- Ai được chuyển trạng thái?
- Điều kiện chuyển là gì?
- Có audit log không?
- Có notification không?
- Có hoàn tiền hoặc fee không?

## 4. Diagram phải đi kèm text

Diagram một mình thường chưa đủ. Mỗi diagram nên có:

- Purpose: sơ đồ này trả lời câu hỏi gì?
- Scope: in-scope/out-of-scope.
- Legend: ký hiệu đặc biệt nếu có.
- Assumptions.
- Business rules liên quan.
- Open questions.
- Version và owner.

Ví dụ:

```markdown
Diagram: Appointment Booking BPMN v1.2
Purpose: Align future-state booking workflow before sprint planning.
Scope: Online booking for outpatient consultation.
Out of scope: Insurance claim, offline booking, recurring appointment.
Owner: BA + Clinic Ops Lead
Approved by: Product Owner
```

## 5. Checklist review diagram

Trước khi gửi diagram, tự kiểm tra:

- Diagram có mục đích rõ không?
- Actor/lane có đủ không?
- Có start/end event không?
- Gateway có điều kiện rõ không?
- Exception flow có được thể hiện không?
- State transition có guard condition không?
- Diagram có quá chi tiết so với người đọc không?
- Có mapping sang user story/SRS không?
- Có version và ngày update không?
- Business stakeholder có thể hiểu mà không cần BA ngồi giải thích không?

## 6. Lỗi thường gặp

**Lỗi 1: Một diagram cố trả lời mọi câu hỏi**

BPMN để business hiểu process. Sequence diagram để team kỹ thuật hiểu interaction. State diagram để hiểu lifecycle. Đừng ép một sơ đồ làm tất cả.

**Lỗi 2: Vẽ happy path, quên exception**

Software bug thường nằm ở exception: slot vừa bị người khác đặt, payment timeout, user đóng browser, external API down.

**Lỗi 3: Diagram không sync với requirement**

Nếu user story nói một kiểu, BPMN nói một kiểu, test case nói kiểu khác, team sẽ mất niềm tin vào tài liệu BA. Diagram cần được trace hoặc ít nhất được review cùng SRS/backlog.

## Ví dụ model package đầy đủ

Feature: đổi lịch tư vấn.

### BPMN summary

```text
Customer lane:
  Open appointment detail -> Click Reschedule -> Select new slot -> Confirm

System lane:
  Validate owner -> Validate appointment status -> Validate cutoff -> Validate slot
  Gateway:
    All valid -> Update appointment -> Release old slot -> Lock new slot -> Send notification
    Invalid owner -> Return 403
    Cutoff expired -> Show hotline message
    Slot unavailable -> Show alternative slots

CSKH lane:
  Handle exception for cutoff-expired case if customer calls hotline
```

### State transition

| From | Event | Condition | To |
|---|---|---|---|
| Confirmed | Customer reschedules | Owner, >= 4 giờ, new slot available | Confirmed |
| Confirmed | Customer cancels | Owner, >= 4 giờ | Cancelled |
| Confirmed | Time passes | Appointment time reached, customer absent | NoShow |
| Confirmed | Consultant completes session | Session done | Completed |

### Sequence summary

```text
Customer -> Web App: confirm reschedule(new_slot_id)
Web App -> Appointment API: PATCH /appointments/{id}/reschedule
Appointment API -> Auth Service: check owner
Appointment API -> Schedule Service: reserve new slot + release old slot
Appointment API -> Audit Log: write old_slot/new_slot
Appointment API -> Notification Service: send reschedule email
Appointment API -> Web App: updated appointment
```

Diagram package này giúp mỗi nhóm đọc đúng phần của mình: business xem BPMN, Dev xem sequence/API touchpoint, QA xem state transition và exception path.

## Bài tập thực hành

Chọn một quy trình như refund, đặt lịch hoặc duyệt hồ sơ. Tạo:

1. Một BPMN future-state với ít nhất 2 lane và 2 gateway.
2. Một state diagram cho object chính.
3. Một sequence diagram cho happy path.
4. Danh sách 5 exception flow chưa rõ cần hỏi stakeholder.

## Nguồn tham khảo

- OMG BPMN Specification: https://www.omg.org/spec/BPMN
- OMG BPMN overview: https://www.omg.org/bpmn/
- OMG UML Specification: https://www.omg.org/spec/UML/
- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/

## Kết luận

Diagram tốt không phải là diagram đẹp nhất, mà là diagram giúp đúng người ra đúng quyết định. BA nên dùng BPMN để align nghiệp vụ, UML vừa đủ để mô tả system behavior, và luôn nối diagram với requirement, rule, test case.
