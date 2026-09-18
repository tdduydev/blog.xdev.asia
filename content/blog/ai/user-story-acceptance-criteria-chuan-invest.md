---
id: 02760001-ba01-4001-a002-000000000002
title: "User Story & Acceptance Criteria: Hướng dẫn viết chuẩn INVEST cho BA thời AI"
slug: user-story-acceptance-criteria-chuan-invest
excerpt: >-
  User Story viết sai là nguồn gốc của 80% bug "sai spec" và rework cuối sprint.
  Bài này hướng dẫn BA viết story theo chuẩn INVEST, acceptance criteria theo BDD
  Given/When/Then, và dùng AI để tự động phát hiện edge case còn thiếu.
featured_image: /images/blog/user-story-acceptance-criteria.webp
type: blog
reading_time: 11
view_count: 0
meta: null
published_at: '2026-05-05T09:30:00.000000Z'
created_at: '2026-05-05T09:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: Requirements, slug: requirements}, {name: Agile, slug: agile}, {name: User Story, slug: user-story}]
comments: []
---

"User story bị reject vì thiếu edge case." "Dev hiểu khác BA." "QA test pass nhưng business nói sai." — Nếu bạn đã nghe những câu này, gốc rễ thường là **user story và acceptance criteria viết chưa đủ rõ**.

Bài này là hướng dẫn thực hành, không lý thuyết.

---

## 1. User Story là gì (và không phải là gì)

**User story** là một cách diễn đạt yêu cầu theo góc nhìn người dùng:

> **As a** [loại người dùng], **I want** [hành động/mục tiêu], **so that** [lý do/giá trị].

Ví dụ tốt:
> As a **khách hàng cá nhân**, I want **xem lịch sử giao dịch 12 tháng cuối**, so that **tôi có thể kiểm tra chi tiêu tháng cụ thể khi cần**.

User story **không phải** là:
- Task kỹ thuật ("Tạo API endpoint lấy transaction history")
- Specification chi tiết ("Hệ thống phải trả về 100 records...")
- Feature list ("Tính năng xem lịch sử giao dịch")

---

## 2. Kiểm tra story bằng INVEST

| Tiêu chí | Ý nghĩa | Câu hỏi kiểm tra |
|---------|---------|-----------------|
| **I**ndependent | Story có thể deliver độc lập | "Story này có phụ thuộc vào story khác không?" |
| **N**egotiable | Chi tiết có thể thương lượng | "BA và Dev có thể thảo luận thay đổi scope không?" |
| **V**aluable | Đem lại giá trị rõ ràng | "Business có thể giải thích tại sao cần cái này không?" |
| **E**stimable | Dev có thể estimate được | "Dev có đủ thông tin để cho điểm Fibonacci không?" |
| **S**mall | Vừa trong 1 sprint | "Story có thể hoàn thành trong 1-3 ngày không?" |
| **T**estable | Có thể verify kết quả | "QA biết làm sao để test pass/fail không?" |

**Story fail INVEST** thường là:
- Quá lớn → Split thành nhiều story nhỏ hơn
- Không testable → Thiếu acceptance criteria
- Không valuable → Hỏi lại "so that" có thực sự có giá trị không

---

## 3. Acceptance Criteria: Given/When/Then

Acceptance Criteria (AC) là điều kiện để story được chấp nhận là "Done". Format BDD:

```
Given [ngữ cảnh/precondition]
When  [hành động người dùng thực hiện]
Then  [kết quả mong đợi]
```

**Ví dụ thực tế** — Story: Xem lịch sử giao dịch

```gherkin
Scenario 1: Hiển thị đúng
Given tôi đã đăng nhập với tài khoản có ít nhất 1 giao dịch trong 12 tháng
When  tôi chọn "Lịch sử giao dịch" từ menu
Then  danh sách hiển thị tối đa 50 giao dịch gần nhất, sắp xếp mới nhất lên trên

Scenario 2: Tài khoản không có giao dịch
Given tôi đã đăng nhập với tài khoản mới, chưa có giao dịch
When  tôi chọn "Lịch sử giao dịch"
Then  hiển thị message "Chưa có giao dịch nào" thay vì danh sách trống

Scenario 3: Lỗi mạng
Given tôi đã đăng nhập
When  tôi mở "Lịch sử giao dịch" nhưng mất kết nối internet
Then  hiển thị thông báo lỗi "Không thể tải dữ liệu. Vui lòng thử lại."
     Và có nút "Thử lại"
```

---

## 4. Dùng AI để phát hiện edge case còn thiếu

Đây là điểm AI thực sự hữu ích. Paste story + AC hiện tại vào prompt:

```
Đây là user story và acceptance criteria:
[PASTE STORY + AC]

Hãy phân tích và liệt kê:
1. Edge cases chưa được cover (các trường hợp đặc biệt, input bất thường)
2. Non-functional requirements ngầm định (performance, security, accessibility)
3. Kịch bản lỗi chưa có AC
4. Mâu thuẫn hoặc mơ hồ trong AC hiện tại
5. Missing actor (có người dùng khác bị ảnh hưởng không?)
```

AI thường phát hiện được:
- Pagination khi data lớn
- Timezone edge cases
- Concurrent user scenarios
- Permission edge cases (admin vs user vs guest)
- Empty state / null state
- Very long input strings
- Special characters

---

## 5. AC cho AI features: Cần thêm gì?

Khi story liên quan đến AI, AC cần bổ sung thêm:

```gherkin
# AC đặc thù cho AI feature

Scenario: AI không chắc chắn
Given người dùng hỏi câu hỏi mơ hồ
When  AI confidence score < 0.7
Then  AI phải:
  - Không tự bịa đặt thông tin
  - Hỏi clarifying question HOẶC
  - Chuyển sang agent người thật với context đầy đủ

Scenario: Đầu ra AI không đạt ngưỡng
Given AI tạo ra response
When  toxicity score > 0.3 (theo safety filter)
Then  response bị block tự động
     Và incident được log vào audit system
```

---

## 6. Definition of Ready (DoR)

Story được phép vào sprint khi đáp ứng:

```
DEFINITION OF READY
☐ Story có format "As a... I want... So that..."
☐ "So that" là business value thực sự, không phải feature
☐ Có ít nhất 3 AC theo Given/When/Then
☐ AC cover ít nhất 1 happy path + 1 error path
☐ Story đã pass INVEST
☐ Dependencies đã được xác định
☐ Story size ≤ 5 story points (nếu dùng Fibonacci)
☐ UI wireframe hoặc mockup đính kèm (nếu có UI)
☐ Tất cả stakeholder liên quan đã review
```

---

## 7. Lỗi phổ biến BA hay mắc

**Lỗi 1: "So that" yếu**
- ❌ "...so that the system shows the transaction list"
- ✅ "...so that I can verify my spending before monthly reconciliation"

**Lỗi 2: AC viết theo UI, không theo behavior**
- ❌ "Button 'Xem thêm' hiển thị màu xanh dưới cùng danh sách"
- ✅ "When user scrolls to bottom, system loads next 20 records automatically"

**Lỗi 3: Không có error scenario**
- Mỗi story cần ít nhất 1 AC cho trường hợp lỗi/không có dữ liệu

**Lỗi 4: Acceptance criteria = implementation detail**
- ❌ "API phải trả về trong 200ms"
- ✅ "Page load trong vòng 2 giây trên 4G network" → Dev tự quyết API timeout

---

## Tổng kết

User story tốt = **đúng góc nhìn người dùng** + **giá trị rõ ràng** + **AC testable**.

Quy trình đề xuất:
1. Viết story theo template As/I want/So that
2. Kiểm tra INVEST, split nếu quá lớn
3. Viết ≥3 AC theo Given/When/Then (happy + error)
4. Paste vào AI để phát hiện edge case còn thiếu
5. Gửi stakeholder review trước khi đưa vào sprint backlog
