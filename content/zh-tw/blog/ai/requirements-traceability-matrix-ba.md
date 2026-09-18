---
id: 02760001-ba02-4001-a005-000000000001
title: BA 的需求可追溯性矩陣：什麼是 RTM 以及如何對其進行建模？
slug: requirements-traceability-matrix-ba
excerpt: RTM 幫助 BA 追蹤從業務目標到需求、使用者故事、測試案例和發布。本文向您展示如何建立可在敏捷、瀑布和合規性專案中使用的簡約 RTM。
featured_image: /images/blog/business-requirements-checklist.webp
type: blog
reading_time: 10
view_count: 0
meta: null
published_at: '2026-05-06T09:40:00.000000Z'
created_at: '2026-05-06T09:40:00.000000Z'
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
  - name: Traceability
    slug: traceability
  - name: Requirements
    slug: requirements
  - name: QA
    slug: qa
comments: []
locale: zh-tw
---
RTM（需求追蹤矩陣）是一個幫助 BA 回答 4 個問題的表格：

1. 該需求的業務目標是什麼？
2. 該需求已轉換為哪個故事/規格？
3. 該要求是否經過測試案例驗證？
4. 這個要求已經發布了嗎？

如果專案較小，RTM可以是一個簡單的板材。如果專案很大，RTM 可能駐留在 Jira、Azure DevOps、TestRail 或需求管理工具中。重要的不是工具，而是**追蹤能力**。

## 1. 什麼時候需要RTM？

在以下情況下您應該使用 RTM：

- 有很多利害關係人。
- 需求變化很大。
- 項目符合規定。
- 供應商或多個團隊一起建立。
- BA 需要證明 QA/UAT 的覆蓋範圍。
- 有很多發行版本。

沒有必要讓 RTM 對於每一個小功能都變得太重。但憑藉重要的功能，RTM 有助於避免缺失需求並避免建立不再有價值的東西。

## 2.極簡RTM包含什麼？

簡單的模板：

|領域 |意義|
|---|---|
|業務目標 ID |企業目標|
|需求 ID |需求代碼 |
|需求描述|需求描述|
|來源 |利害關係人、政策、會議、文件 |
|優先事項 |必須/應該/可以或莫斯科 |
|使用者故事/規格|連結票證或 SRS 部分 |
|測試用例|連結測試用例 |
|狀態 |草案/批准/開發中/測試/發布 |
|變更請求 | CR 連結如有變更 |
|業主|負責人|

## 3.RTM 範例

特點：安排線上諮詢。

|目標|請求 ID |要求|來源 |故事|測試|狀態 |
|---|---|---|---|---|---|---|
| OBJ-01 熱線折扣 30% | BR-001 |客戶自行線上預約 |客戶服務研討會| US-101 | TC-101 |發布 |
| OBJ-01 | SR-001 |依服務/天顯示可用時段 | SRS v1.0 | US-102 | TC-102 |已測試 |
| OBJ-02 減少缺席| SR-002 |提前 24 小時發送日曆提醒 |經營方針 | US-110 | TC-110 |在開發中|
| OBJ-03 合規性 | NFR-003 |管理員更改日程時的審核日誌 |合規審查| US-120 | TC-120 |已批准 |

只需查看此表，您就知道哪些需求已經過測試，哪些需求仍在開發中，以及哪些需求正在追蹤合規性。

## 4. 向前追蹤與向後追蹤

### 正向跟踪

從業務目標向下：

```text
Objective -> Business Requirement -> System Requirement -> User Story -> Test Case -> Release
```

用於詢問：“這個目標涵蓋了哪些要求？”

### 向後追蹤

從票據或測試案例：

```text
Bug/Test/Story -> Requirement -> Objective
```

過去常常問：“我們為什麼要建造這個？”

如果一個故事無法追溯到任何目標，則該故事可能是範圍蔓延。

## 5. 敏捷中 RTM 是否必要？

可以，但一定要輕。

在敏捷中，您不一定需要建立很長的正式 RTM 檔案。您可以使用以下方式進行追蹤：

- 史詩般的連結。
- Jira 問題連結。
- 標籤。
- 描述中的需求 ID。
- 測試用例連結。
- Confluence 規範頁面。

Jira 故事中的範例：

```markdown
Business Objective: OBJ-01
Requirement: SR-001
SRS: Booking SRS v1.2, section 3.1
Test Cases: TC-101, TC-102
UAT Scenario: UAT-05
```

## 6. 使用 RTM 變更控制

當需求改變時：

1. 建立變更請求 ID。
2. 記錄變更原因。
3. 評估影響：故事、測試案例、API、資料、訓練、發布。
4.更新RTM。
5. 如果需求是基線，則申請批准。

例如：

```text
CR-014: Cho phép khách hủy lịch trước 2h thay vì 4h.

Impact:
- BRULE-003 thay đổi.
- US-115 cần update.
- TC-115 cần update expected result.
- Email template hủy lịch cần update.
- Training CSKH cần cập nhật.
```

## 7. RTM 檢查表

- [ ] 每個需求都有一個獨特的 ID。
- [ ] 每個需求都有一個來源。
- [ ] 每個要求都有一個優先順序。
- [ ] 重要要求包括測試案例。
- [ ] 要求具有包含變更歷史記錄的基線。
- [ ] 故事/票證追溯到需求。
- [ ] 測試案例追溯到驗收標準。
- [ ] 發行說明追蹤已交付的要求。
- [ ] 超出範圍的項目單獨記錄。

## 8. 常見錯誤

**錯誤1：RTM太詳細了，沒人更新**

好的RTM是使用的RTM。如果團隊無法更新 30 列，請減少到 8-10 個最重要的列。

**錯誤2：無來源**

沒有來源的需求是非常危險的。當發生爭執時，BA不知道該向誰詢問。

**錯誤3：只追蹤需求到故事，而不追蹤到測試**

如果你不追蹤測試，你就沒有證明需求已經被驗證。

## 更完整的 RTM 預訂範例

|請求 ID |要求|規則|設計/API |測試案例| UAT場景|狀態 |
|---|---|---|---|---|---|---|
| REQ-001 |客人可以查看未來 14 天內的可用時段。 | BR-001 | `GET /consultants/{id}/slots` | TC-001 | UAT-001 |已核准 |
| REQ-002 |顧客預約可用的時段。 | BR-002 | `POST /appointments` | TC-002、TC-003 | UAT-002 |已核准 |
| REQ-003 |已確認的時段對其他顧客不可見。 | BR-003 |插槽鎖定設計| TC-004 | UAT-003 |已核准 |
| REQ-004 |顧客在預約時間前至少 4 小時重新預約。 | BR-004 | `PATCH /appointments/{id}/reschedule` | TC-005、TC-006 | UAT-004 |列印評論 |
| REQ-005 |顧客在預約前至少 4 小時取消預約。 | BR-005 | `PATCH /appointments/{id}/cancel` | TC-007 | UAT-005 |列印評論 |
| REQ-006 |預訂後系統會發送確認郵件。 | BR-006 |通知服務 | TC-008 | UAT-006 |已批准 |
| REQ-007 |顧問按天查看預約時間表。 | BR-007 |諮詢日曆頁| TC-009 | UAT-007 |草稿|

變更請求範例：

> CR-014：企業希望將重新安排規則從 4 小時改為 2 小時。

RTM 的影響：

- `REQ-004` 需要更新。
- `BR-004` 改變閾值。
- 驗證 API 已更改 `PATCH /appointments/{id}/reschedule`。
- `TC-005`, `TC-006`, `UAT-004` 需要更新預期結果。
- 錯誤訊息中的 UI 副本需要從「4 小時」變更為「2 小時」。
- 客戶服務 SOP 需要更新，因為客戶在收到人工支援前不到 2 小時致電。

這就是為什麼 RTM 應該接受積壓的工作，而不是您剛剛建立然後忘記的檔案。

## 練習練習

選擇具有 5 個使用者故事的功能。使用列建立 RTM：

- 目標
- 需求ID
- 要求
- 來源
- 故事
- 驗收標準
- 測試用例
- 狀態

然後檢查一下自己：是否有任何故事不符合目標？是否有任何需求還沒有測試案例？

## 參考來源

- IIBA BABOK 指引： https://www.iiba.org/standards-and-resources/babok/
- PMI 商業分析從業人員： https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601
- IEEE/ISO/IEC 29148-2018： https://standards.ieee.org/ieee/29148/6937/

## 結論

RTM 不是行政文件。它是一個需求定位系統。當範圍發生變化、發布臨近、出現缺陷或利益相關者問「為什麼構建這個」時，RTM 可以幫助 BA 用證據而不是記憶來回答。
