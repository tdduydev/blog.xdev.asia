---
id: 02760001-ba01-4001-a004-000000000002
title: "REST API & Data Validation for BA: Understanding API Contracts and Data Quality Rules"
slug: rest-api-data-validation-ba
excerpt: >-
  BA doesn't need to code APIs, but must understand request/response, error handling,
  data contracts, and validation rules. This guide helps BA read OpenAPI specs,
  review API design, and write data quality acceptance criteria for AI features.
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

Many BAs zone out when developers talk about APIs, database schemas, and data validation — then specs end up incomplete. This guide helps BA gain confidence to review API contracts and write data quality requirements.

---

## 1. When Does BA Need to Understand APIs?

Not always, but definitely when:
- AI features consume APIs from external services (LLM API, payment gateway, knowledge base)
- BA needs to verify data contracts between frontend ↔ backend
- Writing acceptance criteria for error handling (timeout, invalid response)
- Reviewing data quality rules from source databases

---

## 2. Basic Request/Response

Every API call consists of:

```
Request:
  - Method (GET, POST, PUT, DELETE)
  - URL/Endpoint
  - Headers (authorization, content-type)
  - Body (JSON, form data)

Response:
  - Status code (200, 400, 500, etc.)
  - Headers
  - Body (usually JSON)
```

**Real-world example — calling an AI model API:**

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

**What BA needs to check:**
- Which fields are required? (model, max_tokens)
- What fields are in the response? (id, content, usage)
- Data types: string vs number vs object?

---

## 3. HTTP Status Codes BA Should Know

| Code | Meaning | Handling |
|------|---------|----------|
| **200** | OK — success | Process response |
| **400** | Bad request — invalid input | Validate input before sending |
| **401** | Unauthorized — auth failed | Check API key |
| **403** | Forbidden — no permission | Check user permissions |
| **404** | Not found | Verify endpoint URL |
| **429** | Rate limit exceeded | Retry after delay |
| **500** | Server error — API service down | Retry, escalate |
| **503** | Service unavailable | Retry, fallback |

**AC example:**

```gherkin
Scenario: API returns 429 (rate limit)
Given AI service has processed 100 requests in 1 minute
When user sends request #101
Then API returns status 429 with header Retry-After: 60
And system shows message "Too many requests. Please try again in 60 seconds."
And escalates to human agent if user is urgent
```

---

## 4. Error Handling & Idempotency

### Error Handling

When AI API fails, need clear policy:

```
Scenario: AI API timeout
Given timeout threshold = 30 seconds
When AI service doesn't respond within 30s
Then:
  - Trigger timeout exception
  - Log error with request ID
  - If retry_count < 3: retry again
  - Else: escalate to human agent
  - Notify user: "Processing takes longer. A specialist will help."
```

### Idempotency

The same request should not be processed twice if retried (important for payments, AI charges):

```json
{
  "idempotency_key": "request_12345_user_789",
  "messages": [...]
}
```

**BA must check:** If network fails and system auto-retries, will we be charged twice?

---

## 5. Data Validation Acceptance Criteria

Data entering AI systems must pass validation. BA writes AC for each rule:

```gherkin
Scenario: Email validation
Given user enters email into form
When email format is invalid (e.g., "user@")
Then system shows error "Invalid email format"
And form does not submit

Scenario: Phone validation
Given phone number field only accepts digits
When user enters letters
Then system rejects and asks to retry

Scenario: AI input sanitization
Given AI feature receives user text input
When text contains SQL injection payload (e.g., "'; DROP TABLE users;")
Then text must be escaped/sanitized before being added to prompt
And no DB commands should be executed
```

---

## 6. Data Quality Rules

Rules BA should define before development starts:

```
Data Quality Checklist:
☐ Null handling: Which null values are allowed? Which are required?
☐ Range: Min/max values for numeric fields
☐ Format: Email regex, phone pattern, date format
☐ Uniqueness: Which fields must be unique across database?
☐ Referential integrity: Foreign key constraints
☐ Freshness: Maximum data age?
```

**Real-world example — AI feature using knowledge base:**

```
Knowledge Base Data Quality:
- Document ID: required, unique
- Content: required, length 50-50000 characters
- Language: required, one of [en, vi, ja, zh-tw]
- Last updated: required, datetime, not older than 30 days
- Embedding version: required, must match current model version
- Accuracy tag: optional, enum [verified, draft, deprecated]

Alert condition: When > 5% of documents are older than 30 days, trigger review workflow
```

---

## 7. OpenAPI Spec — Essential Understanding

OpenAPI (Swagger) is the standard for documenting APIs:

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

**BA should check in the spec:**
- Which endpoints are required, which are optional?
- What are the required fields in the request body?
- What is the response structure?
- What are possible error codes?

Tools: Swagger UI, Postman — use to test directly.

---

## Summary

Modern BA needs to read API contracts to:
1. **Verify data integration**: Frontend/backend communicate correctly
2. **Write error handling AC**: How does system handle API failures?
3. **Define data quality**: What acceptance criteria, what rejection criteria?
4. **Troubleshoot faster**: When QA reports bugs, BA knows how to investigate

No need to code APIs, but enough to review OpenAPI specs, write test cases for error scenarios, and define acceptance criteria for data quality.
