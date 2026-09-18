---
id: 02760001-ba01-4001-a001-000000000002
title: "Problem Framing cho BA: Cách viết Problem Statement đúng để không lãng phí sprint"
slug: problem-framing-ba-viet-problem-statement
excerpt: >-
  Sai lầm phổ biến nhất của BA là nhảy thẳng vào giải pháp trước khi hiểu vấn đề.
  Học cách viết problem statement theo business outcome, phân biệt problem vs symptom vs solution,
  và áp dụng SCQ framework để framing đúng ngay từ đầu.
featured_image: /images/blog/problem-framing-ba.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-05-05T08:30:00.000000Z'
created_at: '2026-05-05T08:30:00.000000Z'
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
  - name: Requirements
    slug: requirements
  - name: Product
    slug: product
comments: []
---

"Chúng ta cần build chatbot AI cho CSKH."

Nghe quen không? Đây là cách **sai** để bắt đầu một dự án. Và nó là nguyên nhân số một khiến team build xong mà business vẫn không hài lòng.

BA giỏi không bắt đầu bằng **giải pháp** — họ bắt đầu bằng **vấn đề**.

---

## 1. Problem, Symptom, Solution — ba thứ khác nhau

Hiểu sự khác biệt này là nền tảng của mọi phân tích nghiệp vụ:

| | Ví dụ |
|---|---|
| **Symptom** (triệu chứng) | "Khách hàng phàn nàn nhiều trên social media" |
| **Problem** (vấn đề gốc) | "Thời gian xử lý ticket trung bình là 4 ngày, gấp đôi đối thủ" |
| **Solution** (giải pháp) | "Build chatbot AI để tự động xử lý 60% ticket đơn giản" |

Nhiều BA nhận một **symptom** từ stakeholder rồi nhảy thẳng vào **solution** mà bỏ qua bước phân tích **problem** thực sự.

Kết quả: build đúng giải pháp cho **sai vấn đề**.

---

## 2. SCQ Framework — cấu trúc problem statement hiệu quả

McKinsey dùng framework **Situation → Complication → Question** để framing vấn đề. Áp dụng cho BA:

### Situation (bối cảnh hiện tại)
Mô tả trạng thái hiện tại, ai đang bị ảnh hưởng, quy mô như thế nào.

> *"Đội CSKH hiện xử lý 2,000 ticket/ngày với 15 agent."*

### Complication (điều đang không ổn)
Chỉ ra chính xác điều gì đang xảy ra, với số liệu nếu có.

> *"Tỉ lệ giải quyết lần đầu (FCR) chỉ đạt 45% trong khi benchmark ngành là 70%. Mỗi ticket phải xử lý lại trung bình 1.8 lần."*

### Question (câu hỏi cần trả lời)
Đặt câu hỏi dẫn đến direction — **không phải** câu trả lời.

> *"Làm thế nào để tăng FCR lên ≥ 65% trong Q3 mà không tăng headcount?"*

---

## 3. Checklist: Problem Statement tốt phải có gì?

Sau khi viết xong, tự kiểm tra:

- [ ] Có số liệu đo lường được (%, $, ngày, lần...)
- [ ] Mô tả **tác động kinh doanh** (không chỉ mô tả triệu chứng)
- [ ] **Không** chứa tên giải pháp cụ thể
- [ ] Có thể đọc cho stakeholder nghe và họ đồng ý đây là vấn đề của họ
- [ ] Xác định được **ai đang bị ảnh hưởng** và **ở quy mô nào**

---

## 4. Ví dụ thực tế: trước và sau khi framing đúng

### ❌ Trước (solution-first)
> "Chúng ta cần tích hợp AI vào quy trình onboarding khách hàng để tự động hóa."

### ✅ Sau (problem-first)
> "Tỉ lệ hoàn thành onboarding trong 7 ngày đầu chỉ đạt 38%, thấp hơn mục tiêu 60%. Phân tích cho thấy 62% khách hàng bỏ dở ở bước xác minh giấy tờ do quy trình thủ công mất 2-3 ngày. Mục tiêu là giảm thời gian xác minh xuống dưới 4 tiếng để cải thiện tỉ lệ hoàn thành lên 55% trong Q2."

---

## 5. Kỹ thuật "5 Whys" để đào đến gốc rễ

Khi nhận được yêu cầu, hỏi "tại sao?" 5 lần:

1. "Cần build chatbot" → **Tại sao?** → "Vì team support quá tải"
2. "Team support quá tải" → **Tại sao?** → "Vì lượng ticket tăng 40% trong 6 tháng"
3. "Ticket tăng 40%" → **Tại sao?** → "Vì sản phẩm mới ra có nhiều lỗi UX"
4. "Nhiều lỗi UX" → **Tại sao?** → "Vì không có nghiên cứu usability trước khi launch"

**Vấn đề thực sự:** thiếu user research, không phải thiếu chatbot.

> Khi dùng 5 Whys, bạn có thể phát hiện giải pháp thực sự đơn giản hơn và rẻ hơn nhiều so với yêu cầu ban đầu.

---

## 6. Problem Framing trong bối cảnh AI

Với AI feature, thêm một lớp framing nữa: **có thực sự cần AI không?**

Trước khi đồng ý build AI solution, BA phải hỏi:

- Vấn đề này có thể giải quyết bằng rule-based logic đơn giản hơn không?
- Dữ liệu để train/fine-tune AI có sẵn và đủ chất lượng không?
- Nếu AI sai, tác động với người dùng/business như thế nào?
- ROI của AI so với giải pháp truyền thống là bao nhiêu?

AI không phải lúc nào cũng là đáp án đúng. Và BA là người được kỳ vọng sẽ hỏi những câu hỏi này.
