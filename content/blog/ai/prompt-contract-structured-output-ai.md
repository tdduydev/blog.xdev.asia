---
id: 02760001-aie1-4001-a004-000000000001
title: "Prompt contract và structured output: cách biến prompt thành API contract"
slug: prompt-contract-structured-output-ai
excerpt: >-
  Prompt production cần role, context, policy, examples, schema, validation và
  regression test. Đừng để backend phải parse một đoạn văn tự do rồi cầu may.
featured_image: /images/blog/prompt-contract-structured-output-ai.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T10:15:00.000000Z'
created_at: '2026-05-06T10:15:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: Prompt Engineering, slug: prompt-engineering}, {name: Structured Output, slug: structured-output}, {name: JSON Schema, slug: json-schema}, {name: AI Engineer, slug: ai-engineer}]
comments: []
---

Trong prototype, prompt thường là một đoạn text dài. Trong production, prompt nên được đối xử như một contract.

Contract nghĩa là:

- Input nào được phép.
- Context nào được dùng.
- Output phải có shape gì.
- Khi thiếu dữ liệu thì xử lý ra sao.
- Ai review khi thay đổi.
- Test nào phải pass trước release.

## Sau bài này bạn làm được gì?

- Viết được prompt contract có role, task, context, rules, examples và output schema.
- Validate output model trước khi đưa vào workflow downstream.
- Tạo được regression cases cho prompt change.

## Mini-lab bắt buộc

Viết ticket classifier prompt contract, JSON schema, 20 test cases và retry policy khi model trả invalid output.

## Checklist tự đánh giá

- Backend còn parse free-form text không?
- Schema có enum/required fields không?
- Có changelog prompt không?

## Ví dụ đầy đủ: ticket classifier prompt contract

Dưới đây là một prompt contract đủ để backend dùng như một phần của API, không phải một đoạn prompt trôi nổi.

### Contract

~~~text
Prompt name: ticket-classifier
Version: ticket-classifier@2026-05-06
Owner: ai-platform-team

Role:
Bạn là classifier cho support ticket của SaaS B2B.

Task:
Phân loại ticket vào đúng category, urgency và routing reason.

Allowed categories:
- billing
- technical
- account
- security
- other

Rules:
- Chỉ chọn category trong danh sách.
- Không trả lời khách hàng.
- Nếu ticket thiếu dữ liệu để phân loại, dùng category = "other" và confidence <= 0.4.
- Nếu ticket có dấu hiệu security incident, urgency phải là "high".
- Output chỉ là JSON hợp lệ theo schema.
~~~

### JSON Schema

~~~json
{
  "type": "object",
  "required": ["category", "urgency", "confidence", "routing_reason"],
  "properties": {
    "category": {
      "type": "string",
      "enum": ["billing", "technical", "account", "security", "other"]
    },
    "urgency": {
      "type": "string",
      "enum": ["low", "medium", "high"]
    },
    "confidence": {
      "type": "number",
      "minimum": 0,
      "maximum": 1
    },
    "routing_reason": {
      "type": "string",
      "minLength": 12,
      "maxLength": 240
    }
  },
  "additionalProperties": false
}
~~~

### Test case mẫu

~~~json
{
  "input": {
    "subject": "Cannot access admin console",
    "body": "Our SSO users get 403 after yesterday's SAML certificate rotation.",
    "customer_tier": "enterprise"
  },
  "expected": {
    "category": "account",
    "urgency": "high",
    "must_include_reason_terms": ["SSO", "403", "enterprise"]
  }
}
~~~

### Output đạt yêu cầu

~~~json
{
  "category": "account",
  "urgency": "high",
  "confidence": 0.83,
  "routing_reason": "Enterprise users cannot access admin console after SSO/SAML certificate rotation and receive 403."
}
~~~

### Output phải reject

~~~json
{
  "category": "login_problem",
  "urgency": "critical",
  "confidence": 1.2,
  "routing_reason": "This is probably SSO"
}
~~~

Lý do reject: category không nằm trong enum, urgency không hợp lệ, confidence vượt 1. Đây là nơi schema bảo vệ workflow khỏi output nghe có vẻ đúng nhưng không thể tin để tự động hóa.

## 1. Prompt contract gồm những gì?

Một prompt contract tốt thường có:

### Role

Model đang đóng vai gì? Ví dụ:

> Bạn là AI assistant chuyên phân loại ticket hỗ trợ kỹ thuật cho SaaS B2B.

### Task

Nhiệm vụ cụ thể là gì?

> Phân loại ticket vào đúng category, đánh giá urgency và viết routing reason ngắn.

### Context

Model cần biết gì?

- Product area.
- Danh sách category.
- SLA rules.
- User tier.
- Ticket history.

### Constraints

Model không được làm gì?

- Không tự tạo category ngoài danh sách.
- Không đoán thông tin không có trong ticket.
- Không trả lời user, chỉ phân loại.

### Output format

Output nên máy đọc được. Ví dụ:

```json
{
  "category": "billing",
  "urgency": "high",
  "confidence": 0.82,
  "routing_reason": "User reports failed payment on enterprise account"
}
```

## 2. Structured output giúp giảm lỗi tích hợp

Nếu output là văn bản tự do, backend phải parse bằng regex hoặc string split. Đây là mùi nguy hiểm.

Structured output giúp:

- Validate bằng Zod/Pydantic/JSON Schema.
- Giảm lỗi thiếu field.
- Dễ test.
- Dễ lưu DB.
- Dễ gọi workflow tiếp theo.

Nhưng structured output không thay thế business validation. Nếu model trả `"confidence": 2.7`, schema phải bắt. Nếu model chọn category không tồn tại, enum phải bắt.

## 3. Function calling và tool calling

Khi model cần tương tác với hệ thống ngoài, bạn có thể mô tả tools bằng schema.

Ví dụ:

- `search_customer_orders(customer_id)`
- `create_support_ticket(summary, priority)`
- `get_refund_policy(country, plan)`

Tool schema phải rõ:

- Tên tool thể hiện action.
- Description ngắn, không mơ hồ.
- Arguments có type, enum, required.
- Tool nào read-only, tool nào write.
- Tool nào cần confirmation.

Một tool mô tả tệ sẽ làm agent gọi sai. Tool cũng là một phần của prompt contract.

## 4. Output repair không phải phép màu

Khi output invalid, bạn có vài lựa chọn:

1. Retry với prompt nhắc sửa schema.
2. Repair JSON nếu lỗi cú pháp nhẹ.
3. Fallback về rule-based.
4. Escalate human nếu task rủi ro.

Đừng retry vô hạn. Nếu model trả invalid 3 lần, có thể prompt/schema đang sai hoặc input ngoài scope.

## 5. Prompt regression test

Mỗi prompt production nên có bộ test:

- Case thường.
- Edge case.
- Case thiếu dữ liệu.
- Case user cố phá format.
- Case conflict với policy.
- Case dài hoặc nhiều ngôn ngữ.

Khi đổi prompt, đổi model hoặc đổi schema, chạy lại test. Nếu quality giảm, đừng release chỉ vì demo mới trông hay hơn.

## 6. Template prompt contract

Bạn có thể bắt đầu bằng cấu trúc này:

```text
Role:
Bạn là [vai trò].

Task:
Hãy [nhiệm vụ cụ thể].

Context:
[Dữ liệu được phép dùng]

Rules:
- Chỉ dùng context được cung cấp.
- Không đoán nếu thiếu dữ liệu.
- Nếu không đủ thông tin, trả status = "needs_review".

Output schema:
[JSON schema hoặc mô tả field]

Examples:
[2-5 ví dụ tốt và xấu]
```

## 7. Bài tập thực hành

Chọn một task:

- Phân loại ticket.
- Extract thông tin hóa đơn.
- Tóm tắt cuộc họp.
- Review requirement.

Viết prompt contract, schema output và 20 test cases. Sau đó cố tình đưa input xấu: thiếu dữ liệu, sai ngôn ngữ, prompt injection, nội dung quá dài. Nếu hệ thống vẫn trả output hợp lệ và an toàn, bạn đang đi đúng hướng.
