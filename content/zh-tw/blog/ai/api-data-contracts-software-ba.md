---
id: 02760001-ba02-4001-a013-000000000001
title: 軟體BA的API和資料契約：如何閱讀、詢問和撰寫整合需求？
slug: api-data-contracts-software-ba
excerpt: >-
  軟體 BA 不需要 API 程式碼，但需要了解端點、有效負載、驗證、錯誤代碼、事件、資料沿襲和契約。本文提供整合請求範本、調度範例和清單，以幫助 BA
  更好地與開發/資料/QA 合作。
featured_image: /images/blog/rest-api-data-validation-ba.webp
type: blog
reading_time: 17
view_count: 0
meta: null
published_at: '2026-05-06T10:30:00.000000Z'
created_at: '2026-05-06T10:30:00.000000Z'
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
  - name: API
    slug: api
  - name: Data Contract
    slug: data-contract
  - name: Integration
    slug: integration
  - name: Software BA
    slug: software-ba
comments: []
locale: zh-tw
---
軟體BA不需要寫後端程式碼，但如果你做數位產品，你會不斷遇到API和資料的問題：

- 哪個系統發送資料？
- 哪些欄位是必填的？
- 出現錯誤時我應該回傳什麼訊息？
- 數據的來源是什麼？
- 是否需要審核日誌？
- 如果超時，API是否會再次呼叫？
- 活動可以重複嗎？

如果BA完全避免這部分，那麼需求將在業務和工程之間的交接區域出現缺口。

## 1. 什麼是API合約？

API合約是呼叫者和API提供者之間的協定。

合約通常有：

- 端點或事件名稱。
- 方法：取得、發布、放置、修補、刪除。
- 請求有效負載。
- 響應負載。
- 驗證規則。
- 錯誤代碼/訊息。
- 身份驗證/授權。
- 速率限製或配額。
- 版本控制。
- SLA/可用性。

BA不需要做出所有技術決策，但BA需要確保合約準確地反映業務。

## 2.什麼是資料合約？

資料契約是關於資料交換或儲存的協定。

現場範例 `appointmentStatus`：

|屬性|價值|
|---|---|
|型別 |枚舉 |
|允許值|待定、已確認、已取消、已完成、未顯示 |
|必填 |是的 |
|來源 |預訂服務 |
|業主|產品營運 |
|敏感|沒有 |
|保留| 7 年 |
|使用者 | UI、報告、通知、審核 |

如果該欄位沒有所有者、未知來源、未知允許值，系統將很容易在 UI、API、資料庫和報告之間產生差異。

## 3. BA 整合請求模板

```markdown
# Integration Requirement

## 1. Business context
- Business process:
- Trigger:
- Actor/system:
- Success outcome:

## 2. Systems involved
- Source system:
- Target system:
- External dependency:

## 3. API / event
- Endpoint/event:
- Method:
- Authentication:
- Frequency:
- Idempotency requirement:

## 4. Request data
| Field | Type | Required | Validation | Source | Notes |

## 5. Response data
| Field | Type | Required | Meaning | UI/report usage |

## 6. Error handling
| Error | Cause | User message | Retry? | Escalation |

## 7. Non-functional requirements
- Performance:
- Availability:
- Security/privacy:
- Audit/logging:
- Monitoring:

## 8. Open questions
```

此模板足夠輕量，可以在敏捷中使用，但也足夠清晰，開發和 QA 不必自己弄清楚。

## 4.例如：預約

要求：

> 當患者選擇時段並按確認時，如果時段可用，系統必須建立預約並返回預約代碼。

建議的API：

```http
POST /appointments
```

要求：

```json
{
  "patientId": "PAT-123",
  "doctorId": "DOC-456",
  "slotId": "SLOT-789",
  "reason": "Follow-up consultation",
  "channel": "WEB"
}
```

驗證：

|領域 |規則|
|---|---|
|患者 ID |必需、必須存在、活躍的患者 |
|醫生ID |必填，必須存在，接受預訂 |
|插槽 ID |必填，提交時必須可用 |
|原因 |可選，最多 500 個字元 |
|頻道 |必需，枚舉 WEB/MOBILE/CALL_CENTER |

回應成功：

```json
{
  "appointmentId": "APT-20260506-001",
  "status": "Confirmed",
  "confirmationCode": "XDA-8821"
}
```

錯誤：

|代碼|原因 |使用者留言|三個注意事項|
|---|---|---|---|
| SLOT_UNAVAILABLE | 插槽_不可用插槽已被佔用 |該插槽剛剛放置。請選擇其他時間。 |必須顯示替代插槽 |
| PATIENT_BLOCKED | 患者被阻止患者無法預約|預訂前需要支援您的帳戶。 |支援路線|
|驗證錯誤 |欄位缺失/無效 |請再次核對資訊。 |突出顯示字段 |
|系統逾時|服務逾時 |系統正忙。請再試一次。 |需要冪等性 |

## 5. BA 應詢問 Dev/Data/QA 的問題

使用API：

- API 同步還是非同步？
- 是否需要冪等金鑰來避免重複？
- 超時時間多長？
- 有重試嗎？重試幾次？
- 使用者可以看到哪些錯誤，只能記錄哪些錯誤？
- API 有版本嗎？
- 是否有重要請求/回應的審核日誌？

有數據：

- Field 真相來源是什麼系統？
- 欄位可以為空嗎？
- 是否有 PII/PHI/財務資料？
- 保留和刪除規則是什麼？
- 報告使用即時數據還是大量數據？
- 是否存在從來源到儀表板的資料沿襲？

與品質檢查：

- 是否有合約測試？
- 是否有重複請求的測試案例？
- 是否有陳舊資料的測試案例？
- 是否有權限測試？
- 是否有向後相容性測試？

## 6. API/資料要求清單

- 端點/事件有明確的命名。
- 清晰的業務觸發點。
- 請求/回應具有欄位、類型、必要、驗證。
- 錯誤處理包含程式碼、原因、使用者訊息、重試/升級。
- 明確的許可。
- 敏感資料已標記。
- 清除稽核/日誌記錄。
- 可衡量的效能和可用性。
- 如果存在交易，則清除冪等性/重複處理。
- 合約有版本或變更政策。

## 7. 常見錯誤

**錯誤1：只寫螢幕，不寫資料**

UI只是其中的一部分。如果不清楚資料的來源和去向，報告、通知、審計和整合都會出錯。

**錯誤2：無錯誤描述**

幸福之路通常很容易。新的錯誤是用戶體驗和支援成本突然爆發的地方。

**錯誤3：不要求冪等性**

在訂單建立、付款、排程、重試交易等過程中，可能會出現重複的情況。 BA 應儘早詢問，以免失去業務規則和使用者體驗。

## 更完整的API合約範例

端點：

```http
PATCH /appointments/{appointment_id}/reschedule
```

業務規則：

- 使用者必須是擁有支援權限的擁有者或客戶服務人員。
- 預約必須處於已確認狀態。
- 銷售開始時間至少 4 小時。
- 必須有新的插槽可用。
- 請求重試不能創建多次。

要求：

```json
{
  "new_slot_id": "SLOT-20260507-1000",
  "reason": "Customer requested a later time",
  "idempotency_key": "a9c6d2f0-7e2b-4b15-a4b9-118e6f21c001"
}
```

回應成功：

```json
{
  "appointment_id": "APT-20260506-001",
  "old_slot_id": "SLOT-20260507-0900",
  "new_slot_id": "SLOT-20260507-1000",
  "status": "Confirmed",
  "updated_at": "2026-05-06T10:30:00Z"
}
```

驗證和錯誤：

|程式碼| HTTP |原因 |用戶留言|重試 |
|---|---:|---|---|---|
| NOT_OWNER | 403 | 403用戶不擁有銷售|您無權更改此時間表。 |沒有 |
|無效狀態 | 409 | 409預約未確認 |此預約無法變更。 |沒有 |
| CUTOFF_EXPIRED | 截止日期409 | 409還剩不到4小時 |時間表即將推出。請撥打熱線電話。 |沒有 |
| SLOT_UNAVAILABLE | 插槽_不可用409 | 409剛剛放置了新插槽 |該插槽剛剛放置。請選擇其他時間。 |是的，選擇另一個插槽 |
|重複請求 | 200 | 200相同的 idempotency_key |傳回第一個請求的結果。 |安全|

審核日誌：

|領域 |意義|
|---|---|
|演員 ID |誰改變了日程 |
|演員角色 |客戶/客戶服務/管理員 |
|約會_id |時間表已更改 |
|舊插槽 ID/新插槽 ID |之前和之後|
|原因 |變更原因 |
|時間戳|時間 |

對於開發人員實施、品質保證人員編寫合約/負面測試以及業務人員了解系統拒絕每個案例的原因來說，這些細節已經足夠了。

## 參考來源

- IEEE/ISO/IEC 29148-2018： https://standards.ieee.org/ieee/29148/6937/
- OWASP ASVS： https://owasp.org/www-project-application-security-verification-standard/
- IIBA BABOK 指引： https://www.iiba.org/standards-and-resources/babok/

## 結論

API/資料素養幫助軟體BA在整合階段不致於盲目。您不需要編碼，但您需要知道如何提出有關合約、驗證、錯誤、安全、審計和資料所有權的正確問題。這是區分為幻燈片編寫需求的 BA 和為真實軟體編寫需求的 BA 的能力。
