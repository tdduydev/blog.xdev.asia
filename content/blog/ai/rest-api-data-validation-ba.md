---
id: 02760001-ba01-4001-a004-000000000002
title: "REST API & Data Validation cho BA: Hiểu API contracts và data quality rules"
slug: rest-api-data-validation-ba
excerpt: >-
  BA không cần code API, nhưng cần hiểu request/response, error handling, data
  contracts và validation rules. Bài này giúp BA đọc OpenAPI spec, review API
  design, viết data quality acceptance criteria cho tính năng có AI.
featured_image: /images/blog/rest-api-data-validation-ba.webp
type: blog
reading_time: 9
view_count: 0
meta: null
published_at: '2026-05-05T13:00:00.000000Z'
created_at: '2026-05-05T13:00:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat1-7001-a001-000000000001, name: AI, slug: ai}
tags: [{name: BA, slug: ba}, {name: API, slug: api}, {name: Technical, slug: technical}, {name: Data Quality, slug: data-quality}]
comments: []
---

Nhiều BA lướt qua khi dev talk về API, database schema, data validation — rồi sau đó spec lại thiếu chi tiết. Bài này giúp BA đủ tự tin để review API contracts và viết yêu cầu data quality.

---

## 1. Khi nào BA cần hiểu API?

Không phải lúc nào, nhưng nhất định phải hiểu khi:
- AI feature consume API từ external service (LLM API, payment gateway, knowledge base)
- BA cần verify data contract giữa frontend ↔ backend
- Viết acceptance criteria cho error handling (timeout, invalid response)
- Review data quality rules từ source database

---

## 2. Request/Response cơ bản

Mọi API call gồm:

```
Request:
  - Method (GET, POST, PUT, DELETE)
  - URL/Endpoint
  - Headers (authorization, content-type)
  - Body (JSON, form data)

Response:
  - Status code (200, 400, 500, etc.)
  - Headers
  - Body (thường JSON)
```

**Ví dụ thực tế — gọi AI model API:**

```bash
POST /v1/messages
Content-Type: application/json
Authorization: Bearer YOUR-API-KEY

{
  "model": "claude-opus-4-7",
  "max_tokens": 1024,
  "messages": [{"role": "user", "content": "What is BA?"}]
}

Response (200 OK):
{
  "id": "msg_123",
  "content": [{"type": "text", "text": "Business Analyst is..."}],
  "usage": {"input_tokens": 50, "output_tokens": 200},
  "stop_reason": "end_turn"
}
```

**Điều BA cần check:**
- Có bắt buộc fields nào? (model, max_tokens)
- Response có fields nào? (id, content, usage)
- Loại dữ liệu: string vs number vs object?

---

## 3. HTTP Status codes BA cần biết

| Code | Ý nghĩa | Handling |
|------|---------|----------|
| **200** | OK — success | Process response |
| **400** | Bad request — input sai | Validate input trước gửi |
| **401** | Unauthorized — auth fail | Check API key |
| **403** | Forbidden — không có quyền | Check user permissions |
| **404** | Not found | Kiểm tra endpoint URL |
| **429** | Rate limit exceeded | Retry sau delay |
| **500** | Server error — API service down | Retry, escalate |
| **503** | Service unavailable | Retry, fallback |

**AC example:**

```gherkin
Scenario: API returns 429 (rate limit)
Given AI service đã xử lý 100 request trong 1 phút
When user gửi request thứ 101
Then API trả về status 429 với header Retry-After: 60
And system show message "Too many requests. Please try again in 60 seconds."
And escalate to human agent nếu user urgent
```

---

## 4. Error handling & idempotency

### Error handling

Khi AI API lỗi, cần policy rõ ràng:

```
Scenario: AI API timeout
Given timeout threshold = 30 giây
When AI service không trả lời trong 30s
Then:
  - Trigger timeout exception
  - Log error với request ID
  - If retry_count < 3: retry lần nữa
  - Else: escalate sang human agent
  - Notify user: "Processing takes longer. A specialist will help."
```

### Idempotency

Request đó không được xử lý 2 lần nếu retry (quan trọng với payment, AI charge):

```json
{
  "idempotency_key": "request_12345_user_789",
  "messages": [...]
}
```

**BA cần check:** Khi network fail và system auto-retry, có bị charge 2 lần không?

---

## 5. Data Validation Acceptance Criteria

Dữ liệu vào hệ thống AI phải pass validation. BA viết AC cho từng rule:

```gherkin
Scenario: Email validation
Given user nhập email vào form
When email format không hợp lệ (e.g., "user@")
Then system show error "Invalid email format"
And form không submit

Scenario: Phone validation
Given phone number field chỉ accept số
When user nhập chữ
Then system reject và ask retry

Scenario: AI input sanitization
Given AI feature nhận user text input
When text chứa SQL injection payload (e.g., "'; DROP TABLE users;")
Then text phải được escape/sanitize trước khi đưa vào prompt
And không execute DB command nào
```

---

## 6. Data Quality Rules

Các rule BA nên define trước khi build:

```
Data Quality Checklist:
☐ Null handling: Null value nào được phép? Cái nào required?
☐ Range: Min/max value cho numeric fields
☐ Format: Email regex, phone pattern, date format
☐ Uniqueness: Nào phải unique across database?
☐ Referential integrity: Foreign key constraints
☐ Freshness: Data max age bao lâu?
```

**Ví dụ thực tế — AI feature dùng knowledge base:**

```
Knowledge Base Data Quality:
- Document ID: required, unique
- Content: required, length 50-50000 characters
- Language: required, one of [en, vi, ja, zh-tw]
- Last updated: required, datetime, not older than 30 days
- Embedding version: required, must match current model version
- Accuracy tag: optional, enum [verified, draft, deprecated]

Alert condition: Khi > 5% documents older than 30 days, trigger review workflow
```

---

## 7. OpenAPI Spec — mua hiểu

OpenAPI (Swagger) là standard để document API:

```yaml
openapi: 3.0.0
info:
  title: AI Message API
  version: 1.0
paths:
  /v1/messages:
    post:
      summary: Send a message to AI
      parameters:
        - name: Authorization
          in: header
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                model: { type: string }
                messages: { type: array }
              required: [model, messages]
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: object
                properties:
                  id: { type: string }
                  content: { type: array }
        '400':
          description: Bad request
```

**BA cần check trong spec:**
- Endpoint nào required, nào optional?
- Request body required fields là gì?
- Response structure?
- Possible error codes?

Tools: Swagger UI, Postman — dùng để test trực tiếp.

---

## Tổng kết

BA thời AI cần biết đọc API contract để:
1. **Verify data integration**: Frontend/backend giao tiếp đúng
2. **Viết error handling AC**: Khi API fail, system xử lý thế nào
3. **Define data quality**: Accept tiêu chí nào, reject tiêu chí nào
4. **Troubleshoot quicker**: Khi QA report bug, BA biết cách investigate

Không cần code API, nhưng đủ để review OpenAPI spec, viết test case cho error scenarios, và define acceptance criteria cho data quality.
