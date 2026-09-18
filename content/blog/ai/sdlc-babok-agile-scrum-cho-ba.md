---
id: 02760001-ba02-4001-a002-000000000001
title: "SDLC, BABOK và Agile/Scrum cho BA: Học sao để không bị rối?"
slug: sdlc-babok-agile-scrum-cho-ba
excerpt: >-
  BA mới thường học rời rạc BABOK, SDLC, Scrum, BRD, SRS, user story nên rất dễ rối.
  Bài này map toàn bộ vào một luồng làm việc thực tế từ ý tưởng đến release.
featured_image: /images/blog/babok-guide-ba.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T09:10:00.000000Z'
created_at: '2026-05-06T09:10:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: SDLC, slug: sdlc}, {name: BABOK, slug: babok}, {name: Agile, slug: agile}, {name: Scrum, slug: scrum}]
comments: []
---

Một lỗi học BA rất phổ biến là học từng mảnh rời:

- Học BABOK nhưng không biết dùng vào sprint thế nào.
- Học Scrum nhưng tưởng BA chỉ viết user story.
- Học SDLC nhưng không biết mỗi giai đoạn cần artifact gì.
- Học SRS nhưng không biết khi nào cần SRS, khi nào chỉ cần story.

Bài này gom lại thành một bản đồ dễ hiểu.

## 1. SDLC là "đường đi" của phần mềm

SDLC (Software Development Life Cycle) mô tả vòng đời phát triển phần mềm. Tên giai đoạn có thể khác nhau giữa công ty, nhưng logic chung thường là:

1. Idea / Need
2. Discovery
3. Requirements
4. Design
5. Development
6. Testing
7. Release
8. Operation / Evaluation

Vai trò BA không chỉ nằm ở giai đoạn Requirements. BA chạm vào gần như toàn bộ vòng đời:

| SDLC stage | BA cần làm gì |
|---|---|
| Idea / Need | Làm rõ problem, goal, stakeholder, metric |
| Discovery | Interview, workshop, process analysis, current/future state |
| Requirements | BRD, SRS, user story, AC, NFR, business rules |
| Design | Review wireframe, BPMN/UML, API/data impact |
| Development | Clarify requirement, quản lý change request |
| Testing | Hỗ trợ test scenarios, defect triage, UAT |
| Release | Go/no-go, training, release note, readiness |
| Evaluation | KPI, benefit tracking, optimization backlog |

## 2. BABOK là "bộ kiến thức nghề BA"

BABOK không phải quy trình cứng. BABOK là body of knowledge: tập hợp khái niệm, task, kỹ thuật và năng lực mà BA dùng tùy ngữ cảnh.

6 knowledge areas trong BABOK có thể map vào SDLC như sau:

| BABOK Knowledge Area | Dùng trong SDLC |
|---|---|
| Planning & Monitoring | Từ đầu đến cuối dự án |
| Elicitation & Collaboration | Discovery, requirements, UAT |
| Requirements Life Cycle Management | Requirements, development, change control |
| Strategy Analysis | Idea, discovery, business case |
| Requirements Analysis & Design Definition | Requirements, design, backlog |
| Solution Evaluation | Operation, evaluation, optimization |

Nói đơn giản: SDLC cho bạn biết **đang ở đâu**. BABOK cho bạn biết **nên dùng kỹ thuật BA nào**.

## 3. Agile/Scrum là "cách vận hành delivery"

Trong môi trường Scrum, công việc được chia thành sprint. Product Backlog là danh sách việc cần làm, Product Owner chịu trách nhiệm tối đa hóa value, còn cả Scrum Team chịu trách nhiệm tạo Increment có giá trị.

BA không phải role chính thức trong Scrum Guide, nhưng BA thường tham gia rất sâu:

- Hỗ trợ PO làm rõ Product Backlog Items.
- Facilitate refinement cùng Dev/QA/UX.
- Viết hoặc review acceptance criteria.
- Làm rõ dependency, assumption, risk.
- Hỗ trợ UAT và stakeholder feedback.

Điểm cần nhớ: trong Scrum, requirement không phải viết hết từ đầu. Nhưng "không viết hết từ đầu" không có nghĩa là "viết hời hợt". Requirement cần đủ rõ đúng thời điểm.

## 4. Artifact map cho BA

Đây là bản đồ artifact thực tế:

| Khi nào | Artifact | Mức chi tiết |
|---|---|---|
| Đề xuất initiative | Problem statement | 1 trang |
| Cần xin budget | Business case | 1-5 trang |
| Discovery | Stakeholder map, process map | Đủ để align |
| Trước build | BRD/SRS hoặc lightweight spec | Tùy độ phức tạp |
| Agile delivery | Epic, story, AC, DoR/DoD | Theo sprint |
| Có nhiều requirement | RTM | Bảng trace |
| Có UI | Wireframe, prototype notes | Low hoặc mid fidelity |
| Có integration | API/data impact notes | Field, endpoint, error |
| Test/UAT | Test scenarios, UAT plan | Business readable |
| Go-live | Release readiness checklist | Go/no-go |
| Sau launch | KPI report, benefit tracking | 30/60/90 ngày |

## 5. Waterfall, Agile, Hybrid: BA làm khác gì?

### Waterfall / plan-driven

Phù hợp khi:
- Scope tương đối ổn định.
- Compliance cao.
- Contract cần baseline rõ.
- Nhiều vendor hoặc nhiều hệ thống legacy.

BA thường viết tài liệu chi tiết hơn: BRD, SRS, RTM, sign-off formal.

### Agile

Phù hợp khi:
- Sản phẩm cần học nhanh từ user.
- Scope thay đổi.
- Team cross-functional.
- Release incremental.

BA thường viết lightweight artifact hơn: epic, story, AC, flow diagram, decision log.

### Hybrid

Rất phổ biến trong doanh nghiệp:
- Discovery và governance có thể formal.
- Delivery chạy sprint.
- Release có UAT và sign-off rõ.

BA cần linh hoạt: đừng ép mọi thứ thành Scrum thuần hoặc Waterfall thuần.

## 6. Definition of Ready và Definition of Done

Hai khái niệm này giúp BA nói chuyện với Dev/QA dễ hơn.

### Definition of Ready cho story

Story sẵn sàng vào sprint khi:

- Có business value rõ.
- Scope đủ nhỏ.
- Acceptance criteria testable.
- Dependency đã được nêu.
- Data/API impact đã được check.
- UI/wireframe có nếu cần.
- NFR liên quan đã rõ.
- Open questions không còn blocker.

### Definition of Done cho increment

Một phần việc chỉ "done" khi:

- Code đã hoàn thành.
- Test pass.
- AC pass.
- NFR critical không vi phạm.
- Documentation/release note được cập nhật nếu cần.
- Product/BA/QA đã review theo quy ước team.

BA không sở hữu Definition of Done một mình, nhưng BA nên giúp team đảm bảo DoD phản ánh đúng business quality.

## 7. Case study ngắn

Feature: Khách hàng đặt lịch tư vấn online.

**Idea**
- Problem: nhiều khách gọi hotline chỉ để đặt lịch, gây quá tải.
- Metric: giảm 30% cuộc gọi đặt lịch trong 3 tháng.

**Discovery**
- Stakeholder: customer, call center, consultant, admin.
- Process: chọn dịch vụ -> chọn lịch trống -> nhập thông tin -> xác nhận -> nhận nhắc lịch.

**Requirements**
- BRD: mục tiêu, scope, policy đổi/hủy lịch.
- SRS: trạng thái booking, validation, notification, permission.
- Story: As a customer, I want to reschedule my appointment...
- AC: Given/When/Then cho đặt lịch, hủy, trùng lịch, quá hạn.

**Design**
- Wireframe booking flow.
- API impact: GET available slots, POST booking, PATCH reschedule.

**Testing/UAT**
- UAT scenarios: đặt thành công, hết slot, hủy sát giờ, consultant đổi lịch.

**Evaluation**
- Dashboard: số booking online, hotline calls, no-show rate.

## 8. Bài tập thực hành

Tạo một bảng với 8 dòng SDLC. Với mỗi dòng, điền:

- BA activity
- Artifact
- Người review
- Rủi ro nếu bỏ qua

Sau đó chọn một feature bạn biết và điền thật. Nếu không điền được, đó là khoảng trống cần học.

## Ví dụ end-to-end theo SDLC: appointment booking

| Giai đoạn | BA làm gì | Artifact mẫu | Ai review |
|---|---|---|---|
| Discover | Phỏng vấn CSKH, consultant, sales manager; lấy số liệu double booking/no-show. | Problem statement, stakeholder map, current-state BPMN. | Ops Lead, PO. |
| Analyze | So sánh 3 option: nâng cấp sheet, mua tool đặt lịch, build trong customer portal. | Business case, option analysis, risk log. | PO, Engineering Lead, Finance. |
| Define | Chốt scope MVP: search slot, book, reschedule, cancel, notification. | BRD lightweight, SRS, business rules, NFR. | Business stakeholder, Dev, QA. |
| Design | Review wireframe, sequence API, state diagram appointment. | Wireframe notes, API/data contract, state transition table. | UX, Dev, QA. |
| Build | Làm rõ ticket trong sprint, xử lý change và open question. | Jira stories, AC, decision log. | Scrum team. |
| Test | Mapping AC sang test scenario, hỗ trợ defect triage. | Test scenario matrix, defect triage notes. | QA, BA, PO. |
| Release | Chuẩn bị UAT, training CSKH, go/no-go. | UAT plan, readiness checklist, release note. | PO, Ops, Support. |
| Evaluate | So sánh metric sau release với objective. | Benefits realization report. | Product, Business sponsor. |

Một story đủ "Ready" trước sprint:

```gherkin
Feature: Customer books a consultation slot

Business value:
- Reduce hotline booking calls
- Prevent double booking

Rules:
- BR-001: A confirmed slot cannot be booked by another customer
- BR-002: Customer can reschedule only if appointment starts in more than 4 hours

Acceptance criteria:
Scenario: Book available slot
  Given the customer selects an available slot
  When the customer confirms the booking
  Then the appointment status is Confirmed
  And the selected slot is locked
  And confirmation email is sent within 1 minute
```

Đây là cách nối BABOK, SDLC và Scrum: BABOK giúp BA biết hoạt động phân tích nào cần làm; SDLC cho biết hoạt động nằm ở đâu; Scrum giúp đóng gói output thành backlog item có thể build/test.

## Nguồn tham khảo

- IIBA BABOK Guide: https://www.iiba.org/standards-and-resources/babok/
- PMI Business Analysis for Practitioners: https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601
- Scrum Guide 2020: https://scrumguides.org/scrum-guide.html
- IEEE/ISO/IEC 29148-2018: https://standards.ieee.org/ieee/29148/6937/

## Kết luận

Nếu phải nhớ một câu: **SDLC là vòng đời, BABOK là bộ kiến thức, Scrum là cách vận hành delivery**. BA giỏi không học chúng như ba môn riêng biệt. BA giỏi biết dùng đúng thứ, đúng lúc, đúng mức chi tiết.
