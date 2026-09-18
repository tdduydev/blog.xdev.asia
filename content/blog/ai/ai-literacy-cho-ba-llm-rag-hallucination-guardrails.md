---
id: 02760001-ba01-4001-a001-000000000003
title: "AI Literacy cho BA: LLM, RAG, Hallucination và Guardrails giải thích không cần code"
slug: ai-literacy-cho-ba-llm-rag-hallucination-guardrails
excerpt: >-
  BA không cần biết code AI, nhưng cần hiểu đủ để viết yêu cầu đúng và làm việc
  hiệu quả với team kỹ thuật. Giải thích LLM, RAG, hallucination, confidence score
  và guardrails theo ngôn ngữ nghiệp vụ — kèm ví dụ thực tế.
featured_image: /images/blog/ai-literacy-ba.webp
type: blog
reading_time: 15
view_count: 0
meta: null
published_at: '2026-05-05T09:00:00.000000Z'
created_at: '2026-05-05T09:00:00.000000Z'
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
  - name: AI
    slug: ai
  - name: LLM
    slug: llm
  - name: Requirements
    slug: requirements
comments: []
---

Bạn không cần biết train model để là BA giỏi trong thời AI. Nhưng nếu không hiểu **LLM hoạt động như thế nào**, bạn sẽ viết acceptance criteria sai, bỏ qua rủi ro nghiêm trọng, và không thể push back khi team kỹ thuật đề xuất giải pháp không phù hợp.

Bài này giải thích các khái niệm AI cốt lõi **theo ngôn ngữ nghiệp vụ**, không code, không toán.

---

## 1. LLM là gì — giải thích bằng ngôn ngữ BA

LLM (Large Language Model) là một dạng AI được train trên lượng văn bản khổng lồ để **dự đoán text tiếp theo** một cách hợp lý.

Hãy tưởng tượng thế này: bạn đưa cho model một câu hỏi → model tìm pattern từ hàng tỉ đoạn văn nó đã đọc → tạo ra câu trả lời **nghe có lý**.

**Điều BA cần nhớ:**
- LLM **không có memory** giữa các cuộc hội thoại (trừ khi hệ thống lưu lại)
- LLM **không biết thông tin mới nhất** sau ngày cutoff training
- LLM **không "biết" sự thật** — nó tạo ra text hợp lý, không nhất thiết là đúng

→ **Yêu cầu cần viết:** "Hệ thống phải hiển thị disclaimer khi trả lời câu hỏi về chính sách/giá/quy định mới nhất vì LLM có thể không cập nhật."

---

## 2. RAG — khi AI cần đọc tài liệu của bạn

**RAG (Retrieval-Augmented Generation)** giải quyết vấn đề LLM không biết thông tin nội bộ của công ty.

Luồng hoạt động:
1. Người dùng hỏi: "Chính sách hoàn tiền của chúng tôi là gì?"
2. Hệ thống **tìm kiếm** trong knowledge base nội bộ (FAQ, policy docs...)
3. Lấy đoạn văn liên quan → ghép vào prompt → LLM trả lời dựa trên đó

**Điều BA cần nhớ:**
- RAG chỉ tốt nếu **tài liệu nguồn tốt** — garbage in, garbage out
- Phải quyết định: tài liệu nào được phép dùng để train/index?
- Cần policy về cập nhật knowledge base khi chính sách thay đổi

→ **Yêu cầu cần viết:** "Knowledge base phải được cập nhật trong vòng 24h khi có thay đổi chính sách. Hệ thống phải ghi log nguồn tài liệu được dùng cho mỗi câu trả lời."

---

## 3. Hallucination — rủi ro BA không thể bỏ qua

**Hallucination** là khi AI tạo ra thông tin sai hoặc không tồn tại, nhưng trình bày với giọng điệu tự tin như sự thật.

**Ví dụ thực tế:**
- AI nói "Sản phẩm X có bảo hành 3 năm" nhưng thực tế chỉ 1 năm
- AI tạo ra số điện thoại hỗ trợ không tồn tại
- AI trích dẫn điều khoản hợp đồng không có trong tài liệu gốc

**Tại sao điều này quan trọng với BA?**

Nếu sản phẩm AI cung cấp thông tin sai cho khách hàng → **rủi ro pháp lý, mất tin tưởng, hoặc thiệt hại tài chính thực tế**.

→ **Acceptance criteria mẫu:**
```
GIVEN người dùng hỏi về thông tin chính sách
WHEN AI không tìm thấy thông tin trong knowledge base
THEN AI phải trả lời "Tôi không chắc về thông tin này, vui lòng liên hệ..." thay vì tự suy diễn
```

---

## 4. Confidence Score — khi nào nên tin AI

Nhiều AI system có **confidence score** — con số cho biết model "tự tin" bao nhiêu với câu trả lời của nó.

**Điều BA cần quyết định:**
- Ngưỡng confidence bao nhiêu thì AI được phép tự trả lời?
- Dưới ngưỡng đó thì làm gì: hiện disclaimer, escalate sang agent người, hay từ chối trả lời?

→ **Yêu cầu mẫu:** "Khi confidence score < 0.7, hệ thống phải thêm cụm từ 'Thông tin này cần được xác nhận lại' và cung cấp link liên hệ agent."

---

## 5. Guardrails — hàng rào bảo vệ người dùng và công ty

**Guardrails** là các quy tắc giới hạn những gì AI được phép làm hoặc nói.

Các loại guardrails phổ biến:

| Loại | Ví dụ |
|------|-------|
| **Content filter** | Không được tạo nội dung bạo lực, phân biệt đối xử |
| **Topic restriction** | Chatbot CSKH chỉ trả lời về sản phẩm, không bàn chính trị |
| **Output format** | Luôn trả lời bằng tiếng Việt, không quá 200 từ |
| **PII protection** | Không nhắc lại số thẻ tín dụng, CMND trong response |
| **Human override** | Khi người dùng yêu cầu nói chuyện với người thật, không được từ chối |

**BA là người định nghĩa guardrails** — không phải AI Engineer. Vì BA hiểu business context, legal risk, và kỳ vọng của người dùng.

---

## 6. Checklist AI Literacy cho BA — tóm tắt

Khi làm việc với AI feature, hãy đặt những câu hỏi này:

**Về dữ liệu:**
- [ ] Dữ liệu training có chứa PII/thông tin nhạy cảm không?
- [ ] Knowledge base được cập nhật bao lâu một lần?

**Về hành vi AI:**
- [ ] Khi AI không biết → làm gì?
- [ ] Khi AI sai → ai chịu trách nhiệm?
- [ ] Ngưỡng confidence để tự trả lời vs escalate là bao nhiêu?

**Về giới hạn:**
- [ ] Chủ đề nào AI không được bàn đến?
- [ ] Định dạng output cần tuân theo quy chuẩn gì?
- [ ] Khi nào người dùng phải được chuyển sang human agent?

> BA không cần code guardrails, nhưng **phải viết spec** để AI Engineer implement đúng.
