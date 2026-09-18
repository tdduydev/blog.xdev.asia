---
id: 02760001-ba01-4001-a004-000000000002
title: "BA 的 REST API 與資料驗證：理解 API 合約與資料品質規則"
slug: rest-api-data-validation-ba
excerpt: >-
  BA 不需要編寫 API，但必須理解請求/回應、錯誤處理、資料合約和驗證規則。
  本指南幫助 BA 閱讀 OpenAPI 規範、審查 API 設計、為 AI 功能撰寫資料品質驗收標準。
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

許多 BA 在開發人員談論 API、資料庫架構和資料驗證時會略過。其後規格就缺乏細節。本指南幫助 BA 獲得信心審查 API 合約和撰寫資料品質要求。

---

## 1. BA 何時需要理解 API？

並非總是，但確實需要在以下情況理解：
- AI 功能從外部服務消費 API（LLM API、支付閘道、知識庫）
- BA 需要驗證前端 ↔ 後端之間的資料合約
- 為錯誤處理撰寫驗收標準（逾時、無效回應）
- 審查來自來源資料庫的資料品質規則

---

## 2. 基本請求/回應

每個 API 呼叫包括：

```
Request:
  - Method (GET, POST, PUT, DELETE)
  - URL/Endpoint
  - Headers (authorization, content-type)
  - Body (JSON, form data)

Response:
  - Status code (200, 400, 500, etc.)
  - Headers
  - Body (通常為 JSON)
```

**實世界示例 — 呼叫 AI 模型 API：**

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

**BA 需要檢查的事項：**
- 哪些欄位是必需的？（model、max_tokens）
- 回應中有哪些欄位？（id、content、usage）
- 資料型別：string vs number vs object？

---

## 3. BA 應知道的 HTTP 狀態碼

| 碼 | 意義 | 處理 |
|----|------|------|
| **200** | OK — 成功 | 處理回應 |
| **400** | Bad request — 無效輸入 | 在發送前驗證輸入 |
| **401** | Unauthorized — 認證失敗 | 檢查 API 金鑰 |
| **403** | Forbidden — 無權限 | 檢查使用者權限 |
| **404** | Not found | 驗證端點 URL |
| **429** | Rate limit exceeded | 延遲後重試 |
| **500** | Server error — API 服務停止 | 重試、上報 |
| **503** | Service unavailable | 重試、備用 |

**AC 範例：**

```gherkin
Scenario: API 返回 429（速率限制）
Given AI 服務已在 1 分鐘內處理 100 個請求
When 使用者發送第 101 個請求
Then API 返回狀態 429 並帶有標頭 Retry-After: 60
And 系統顯示「請求太多。請於 60 秒後重試。」
And 如果使用者緊急，則上報給人工代理
```

---

## 4. 錯誤處理與冪等性

### 錯誤處理

當 AI API 失敗時，需要明確的政策：

```
Scenario: AI API 逾時
Given 逾時閾值 = 30 秒
When AI 服務在 30 秒內不回應
Then:
  - 觸發逾時例外
  - 使用請求 ID 記錄錯誤
  - 如果 retry_count < 3：再重試一次
  - 否則：上報給人工代理
  - 通知使用者：「處理需要更長時間。專家將幫助您。」
```

### 冪等性

相同請求在重試時不應被處理兩次（對於支付、AI 費用很重要）：

```json
{
  "idempotency_key": "request_12345_user_789",
  "messages": [...]
}
```

**BA 必須檢查：** 如果網路失敗且系統自動重試，會被重複收費嗎？

---

## 5. 資料驗證驗收標準

進入 AI 系統的資料必須通過驗證。BA 為每個規則撰寫 AC：

```gherkin
Scenario: 電子郵件驗證
Given 使用者在表單中輸入電子郵件
When 電子郵件格式無效（例如："user@"）
Then 系統顯示錯誤「無效的電子郵件格式」
And 表單不提交

Scenario: 電話驗證
Given 電話號碼欄位只接受數字
When 使用者輸入字母
Then 系統拒絕並要求重試

Scenario: AI 輸入淨化
Given AI 功能接收使用者文字輸入
When 文字包含 SQL 注入酬載（例如："'; DROP TABLE users;"）
Then 文字必須在添加到提示前進行轉義/淨化
And 不應執行任何資料庫命令
```

---

## 6. 資料品質規則

BA 應在開發前定義的規則：

```
資料品質檢查清單：
☐ Null 處理：允許哪些 null 值？哪些必需？
☐ 範圍：數值欄位的最小/最大值
☐ 格式：電子郵件正規表達式、電話模式、日期格式
☐ 唯一性：哪些欄位在整個資料庫中必須唯一？
☐ 參考完整性：外鍵限制
☐ 新鮮度：最大資料年齡？
```

**實世界範例 — AI 功能使用知識庫：**

```
知識庫資料品質：
- Document ID：必需、唯一
- Content：必需、長度 50～50000 字元
- Language：必需，[en、vi、ja、zh-tw] 之一
- Last updated：必需、日期時間，不超過 30 天
- Embedding version：必需、必須符合目前模型版本
- Accuracy tag：選擇性、列舉 [verified、draft、deprecated]

警示條件：當超過 5% 文件超過 30 天時，觸發審查工作流程
```

---

## 7. OpenAPI 規範 — 基本理解

OpenAPI（Swagger）是記錄 API 的標準：

```yaml
openapi: 3.0.0
info:
  title: AI Message API
  version: 1.0
paths:
  /v1/messages:
    post:
      summary: 向 AI 發送訊息
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
          description: 成功
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

**BA 應在規範中檢查：**
- 哪些端點是必需的，哪些是選擇性的？
- 請求體中的必需欄位是什麼？
- 回應結構是什麼？
- 可能的錯誤碼？

工具：Swagger UI、Postman — 用於直接測試。

---

## 總結

現代 BA 需要讀取 API 合約以便：
1. **驗證資料整合**：前端/後端正確通信
2. **撰寫錯誤處理 AC**：系統如何處理 API 失敗？
3. **定義資料品質**：哪些驗收標準、哪些拒絕標準？
4. **更快地故障排除**：QA 報告錯誤時，BA 知道如何調查

無需編寫 API，但足以審查 OpenAPI 規範、為錯誤案例撰寫測試，以及定義資料品質驗收標準。
