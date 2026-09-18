---
id: 02760001-ba02-4001-a003-000000000001
title: 軟體 BA 的 BRD 和 SRS：模板、範例和易於理解的寫作
slug: brd-srs-template-software-ba
excerpt: BRD 和 SRS 是兩個重要的工件，但經常被混淆。本文解釋了差異、模板結構、調度功能的完整範例以及移交給開發/品質檢查之前的檢查清單。
featured_image: /images/blog/business-requirements-checklist.webp
type: blog
reading_time: 14
view_count: 0
meta: null
published_at: '2026-05-06T09:20:00.000000Z'
created_at: '2026-05-06T09:20:00.000000Z'
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
  - name: BRD
    slug: brd
  - name: SRS
    slug: srs
  - name: Requirements
    slug: requirements
  - name: Software BA
    slug: software-ba
comments: []
locale: zh-tw
---
BRD 和 SRS 是兩個經常被混淆的檔案。許多 BA 會編寫一個名為 BRD 的長文件，但其中混合了業務目標、螢幕、資料庫欄位、API、測試案例、策略和解決方案設計。因此，業務利益相關者無法閱讀它，並且開發/QA 沒有足夠的資訊來建立。

簡單的思路：

- **BRD** 回答：企業需要什麼以及為什麼？
- **SRS** 答案：軟體系統必須做什麼才能滿足該需求？

## 1.什麼時候需要BRD，什麼時候需要SRS？

並非每個項目都需要大量文件。但你應該考慮：

|背景|應使用 |
|---|---|
|新舉措，需要調整業務| BRD |
|衝刺中的小功能 |使用者故事+AC也許就夠了 |
|功能影響許多系統 | SRS |
|供應商/外包/合約 | BRD + SRS + RTM |
|高合規性 | BRD + SRS + 簽核 |
|敏捷團隊但領域複雜 |輕量級SRS+積壓|

原則：文件要足夠，以減少誤解的風險，不要太長，以免顯得專業。

## 2. BRD 由哪些部分組成？

務實的 BRD 模板：

```markdown
# Business Requirements Document

## 1. Executive Summary
- Vấn đề cần giải quyết
- Mục tiêu kinh doanh
- Kết quả kỳ vọng

## 2. Background / Current State
- Quy trình hiện tại
- Pain points
- Dữ liệu hoặc bằng chứng

## 3. Business Objectives
- Objective 1
- Objective 2
- Success metrics

## 4. Scope
- In scope
- Out of scope
- Assumptions
- Constraints

## 5. Stakeholders
- Business owner
- End users
- Approvers
- Consulted teams

## 6. Business Requirements
- BR-001: ...
- BR-002: ...

## 7. Business Rules
- Rule ID
- Rule description
- Source / policy

## 8. Risks and Dependencies

## 9. Approval
```

## 3. SRS 包含哪些部分？

軟體 BA 的 SRS 範本：

```markdown
# Software Requirements Specification

## 1. Purpose and Scope

## 2. System Context
- Actors
- External systems
- High-level flow

## 3. Functional Requirements
- FR-001
- FR-002

## 4. User Stories and Acceptance Criteria

## 5. Business Rules

## 6. Data Requirements
- Input fields
- Output fields
- Validation rules
- Retention

## 7. Interface / API Requirements
- Endpoint
- Request/response
- Error handling

## 8. Non-Functional Requirements
- Performance
- Security
- Availability
- Accessibility
- Observability

## 9. Error and Edge Cases

## 10. Reporting / Audit

## 11. UAT Scenarios

## 12. Traceability
```

## 4. 範例：安排線上諮詢的功能

### BRD 摘錄

```markdown
BR-001: Khách hàng có thể tự đặt lịch tư vấn online để giảm tải hotline.

Business objective:
- Giảm 30% cuộc gọi hotline liên quan đến đặt lịch trong 3 tháng.
- Tăng tỷ lệ khách hoàn tất đặt lịch từ 45% lên 65%.

In scope:
- Khách chọn dịch vụ, ngày, giờ, thông tin liên hệ.
- Hệ thống gửi email/SMS xác nhận.
- Admin xem danh sách lịch đã đặt.

Out of scope:
- Thanh toán online.
- Tự động phân bổ consultant theo kỹ năng.
```

### SRS 摘錄

```markdown
FR-001: Hiển thị slot trống
System shall display available appointment slots by selected service and date.

Acceptance criteria:
Given khách chọn dịch vụ "Tư vấn tài chính"
When khách chọn ngày 2026-06-10
Then hệ thống hiển thị các slot còn trống trong ngày đó
And không hiển thị slot đã được đặt

Validation:
- service_id: required, must exist
- appointment_date: required, must be today or future date

Error:
- Nếu không còn slot, hiển thị empty state "Ngày này đã hết lịch. Vui lòng chọn ngày khác."
```

## 5.業務規則如何寫清楚？

良好的業務規則需要：

- 有身分證。
- 有明確的描述。
- 有一個來源。
- 有例子。
- 如果需要更改，有一個所有者。

例如：

```markdown
BRULE-003: Khách hàng chỉ được hủy lịch trước giờ hẹn tối thiểu 4 tiếng.

Source: Policy vận hành CSKH v2.1
Owner: Head of Customer Service
Example:
- Lịch lúc 15:00, khách được hủy trước 11:00.
- Sau 11:00, nút hủy bị disable và hiển thị hướng dẫn gọi hotline.
```

## 6. 一個好的需求應該具備哪些特質？

本著需求工程的精神，需求應：

- 顯然。
- 簡單的意思。
- 可測試。
- 起源。
- 不要在一個句子中混合多個請求。
- 如果不需要，不要太早描述實現。

不好的例子：

> 系統必須快速且易於使用。

重寫：

> 當每天最多 500 個插槽和 200 個同時使用者時，插槽清單頁面必須在 p95 上在 2 秒內呈現。

## 7. BRD/SRS 清單審查

在交接之前，BA 問自己：

- 業務目標是否有衡量標準？
- 範圍是否超出範圍？
- 要求有ID嗎？
- 需求有來源嗎？
- 業務規則有範例嗎？
- AC 有快樂路徑、替代路徑、錯誤路徑嗎？
- 資料驗證是否明確要求/可選/範圍/格式？
- NFR 可以測量嗎？
- 是否提到了權限和審核日誌？
- 開放性問題有明確的負責人和截止日期嗎？
- 利害關係人是否已簽署目前版本？

## 8. 常見錯誤

**錯誤1：BRD變成SRS**

業務利害關係人只需要了解問題、價值、範圍、流程。如果不需要，不要強迫他們閱讀 API 詳細資訊。

**錯誤2：SRS過於商業化，缺乏系統行為**

開發/品質檢查需要了解系統在每種情況下的作用，而不僅僅是「改善預訂體驗」。

**錯誤3：無版本和更改日誌**

如果沒有版本，團隊會爭論「我認為以前的版本不同」。每個基線都需要版本、日期和審批者。

## 更完整的工件範例：從 BRD 到 SRS

### 用於調度功能的 BRD 範例

|部分|內容 |
|---|---|
|業務問題 | 38%的客戶至少需要撥打熱線兩次才能安排諮詢；客戶服務需要花費大量時間手動檢查插槽。 |
|目標|發布後 3 個月內，排班電話減少 40%，重複預訂減少至 1% 以下。 |
|範圍 MVP |查看顧問、查看可用空檔、預約、重新排程、取消預約、接收確認電子郵件。 |
|超出範圍 |計費、定期預約、高級 CRM 整合、群組調度。 |
|利害關係人|客戶、客戶服務、顧問、銷售經理、合規、工程、品質保證。 |
|成功指標|預約完成率、熱線預約通話量、缺席率、重複預約事件。 |

### 相同功能的 SRS 範例

|身分證 |要求|優先事項 |來源 |
|---|---|---|---|
| FR-001 |系統會顯示未來 14 天內有空位的顧問清單。 |必須 |研討會 2026-05-06 |
| FR-002 |客戶可以預訂可用的插槽並收到確認碼。 |必須 |採購訂單 |
| FR-003 |如果距離預約時間還有4小時以上，客戶可以重新預約。 |必須 |營運政策|
| FR-004 |顧問可以按日期查看預約安排並按狀態過濾。 |應該|顧問訪談|
| NFR-001 |此 API 在 2 秒內建立一個預約回應，p95 有 300 個同時使用者。 |必須 |工程|

### 驗收標準範例

```gherkin
Scenario: Slot bị người khác đặt trước khi khách xác nhận
  Given khách đang xem slot 09:00 của consultant A
  And slot đó vừa được khách khác xác nhận
  When khách bấm "Xác nhận đặt lịch"
  Then hệ thống không tạo appointment
  And hiển thị message "Slot này vừa được đặt. Vui lòng chọn giờ khác."
  And gợi ý ít nhất 3 slot thay thế nếu có
```

### 資料和錯誤範例

|領域 |類型 |規則|
|---|---|---|
|約會_id |字串|產生的、獨一無二的 |
|客戶 ID |字串|必需的、活躍的客戶 |
|顧問 ID |字串|需要，積極的顧問|
|插槽 ID |字串|必填，確認時可用 |
|狀態 |枚舉 |待定、已確認、已取消、已完成、未顯示 |

|錯誤代碼 |何時發生|使用者介面訊息 |
|---|---|---|
| SLOT_UNAVAILABLE | 插槽_不可用時段已預訂或鎖定 |該插槽剛剛放置。請選擇其他時間。 |
| RESCHEDULE_WINDOW_EXPIRED | RESCHEDULE_WINDOW_EXPIRED |客人重新安排時間少於 4 小時 |預約很快就安排好了。請撥打熱線電話尋求支援。 |
| CONSULTANT_INACTIVE | 顧問顧問不再接受預約 |目前無法提供顧問服務。請選擇其他人。 |

## 參考來源

- IEEE/ISO/IEC 29148-2018： https://standards.ieee.org/ieee/29148/6937/
- IIBA BABOK 指引： https://www.iiba.org/standards-and-resources/babok/
- PMI 商業分析從業人員： https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601

## 結論

BRD 幫助企業就**他們需要什麼以及為什麼**達成協議。 SRS 可協助軟體團隊就**系統必須做什麼以及如何測試**達成一致。優秀的軟體 BA 不會編寫較長的文檔，而是為正確的讀者、需要做出的正確決策以及正確的詳細程度編寫，以減少返工。
