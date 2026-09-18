---
id: 02760001-ba02-4001-a014-000000000001
title: BA 的變更控制、基線和簽核：在不拖慢團隊速度的情況下管理請求
slug: change-control-baseline-signoff-ba
excerpt: 需求變更是正常的，但不受控制的變更會破壞衝刺、範圍、測試和發布。本文指導 BA 在敏捷環境和傳統專案中管理基準、變更要求、影響分析、簽核和可追溯性。
featured_image: /images/blog/ba-planning-monitoring-ai-projects.webp
type: blog
reading_time: 16
view_count: 0
meta: null
published_at: '2026-05-06T10:40:00.000000Z'
created_at: '2026-05-06T10:40:00.000000Z'
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
  - name: Change Control
    slug: change-control
  - name: Traceability
    slug: traceability
  - name: Governance
    slug: governance
  - name: Software BA
    slug: software-ba
comments: []
locale: zh-tw
---
需求變更並不是失敗。市場發生變化，利害關係人在演示後了解更多，法律發生變化，技術限制出現。問題不是變化，而是**不受控制的變化**。

當沒有變更控制時：

- Dev根據舊版本建置。
- 根據舊的驗收標準進行品質保證測試。
- 企業認為範圍包括一個新部分。
- PO 沒有看到對時間表的影響。
- 發布被推遲了，但沒有人知道什麼時候晚了。

BA 負責維護需求生命週期，以便變更透明地發生。

## 1.什麼是基準？

基線是團隊一次商定的需求版本，用作建置/測試的基礎。

基線並不意味著「不可贖回」。意思是：如果你要改變，你必須知道從哪裡改變、為什麼改變、誰批准、有什麼影響。

例如：

```text
SRS Appointment Booking v1.0
Baseline date: 2026-05-06
Approved by: Product Owner, Clinic Ops Lead, Engineering Lead, QA Lead
Scope: Search doctor, select slot, create appointment, cancel appointment
Out of scope: Payment, insurance claim, recurring appointment
```

## 2. 什麼時候需要簽核？

並非每個使用者故事都需要沉重的簽名。但以下情況應該有明確的簽名：

- 範圍影響許多團隊/系統。
- 有供應商或合約。
- 具有合規性、審計性或法律性。
- 有資料遷移。
- 業務流程發生重大變化。
- 上線風險較高。

在敏捷中，簽核可以更輕鬆：PO 批准積壓項目，利害關係人確認演示，團隊最終確定就緒定義。擁有決定性的證據很重要。

## 3. 變更要求包含哪些內容？

範本變更請求：

```markdown
# Change Request

ID:
Requested by:
Date:
Current baseline:

## 1. Change summary
- What changes?
- Why now?
- Business value:

## 2. Requirement impact
- BRD/SRS:
- User stories:
- Business rules:
- Acceptance criteria:
- Wireframe:
- API/data:
- Reports:

## 3. Delivery impact
- Effort:
- Timeline:
- Dependencies:
- Test impact:
- Release impact:
- Risk:

## 4. Decision
- Approved / Rejected / Deferred:
- Decision owner:
- Decision date:
- Notes:
```

## 4. BA 影響分析

影響分析不僅僅是詢問 Dev「需要多長時間？」。 BA 需要查看所有 6 層：

|班級 |問題 |
|---|---|
|業務流程|流程有改變嗎？誰受到影響？ |
|要求|哪個 BRD/SRS/使用者故事/AC 發生了變化？ |
|使用者體驗/使用者介面 |哪個畫面、訊息、空狀態、錯誤狀態改變？ |
| API/資料 |哪個欄位、驗證、事件、報告發生變化？ |
|品質保證/應用測試 |哪些測試案例、回歸、UAT 腳本發生變化？ |
|發布/操作 |哪些訓練、SOP、支援、回滾會改變？ |

更改範例：

> 企業希望允許患者提前 30 分鐘而不是 2 小時取消。

影響：

- 業務規則 `BR-CANCEL-001` 改變。
- 取消 API 驗證已變更。
- 使用者介面副本已更改。
- 通知範本已更改。
- 退款/缺席政策需要審查。
- 與截止時間相關的測試案例必須更新。
- 支援常見問題和SOP更改。

## 5. 追溯性有助於控制變更

如果需求具有可追溯性，變更影響就容易得多。

|要求|規則|故事|應用程式介面 |測試案例|
|---|---|---|---|---|
|需求書-010 | BR-取消-001 | US-BOOK-12 |補丁 /約會/{id}/取消 | TC-BOOK-044 | TC-BOOK-044

什麼時候 `BR-CANCEL-001` 當發生變化時，BA 知道哪些故事、API 需求和測試案例需要更新。

如果沒有可追溯性，每個變更請求都會變成手動追蹤。

## 6. 敏捷中的變更控制

敏捷並不意味著任何想要改變任何事情的人都可以在衝刺中立即改變它。

關於如何做的建議：

- 衝刺前：完善並最終確定「準備就緒」的定義。
- 在衝刺期間：小的改變由 PO/團隊決定；積壓帶來了巨大的變化。
- 演示後：回饋被記錄為待辦事項/變更要求。
- 發布前：範圍基線和 UAT 範圍已最終確定。
- 僅在發布後：更改才會進入發現或下一次迭代。

BA 應該幫助團隊清楚說明：這是一個錯誤、澄清、變更要求還是新範圍。

## 7. 清單治理很輕

- 需求有版本嗎？
- 基線範圍是否在範圍之內/之外？
- Decision 有所有者嗎？
- 變更請求是否有理由/商業價值？
- 影響分析對於開發/QA/UX/數據/營運來說足夠了嗎？
- AC/測試案例是否會根據變更進行更新？
- 是否已通知相關利害關係人？
- 發行說明/培訓/SOP 是否需要更新？
- 是否有審計決策日誌？

## 8. 常見錯誤

**錯誤 1：將每個變更稱為錯誤**

Bug是指系統不符合規定的要求。如果企業改變主意，那就是變更要求或新範圍。

**錯誤2：沒有基線**

如果沒有基線，沒有人知道「變化」與什麼相比。

**錯誤3：只要求開發工作**

程式碼中的微小變化可能在 UAT、培訓、法律或支援方面產生巨大影響。

## 完整的變更請求範例

變更請求：

|領域 |價值|
|---|---|
| CR ID | CR-014 |
|請求 |將重新安排/取消截止時間從 4 小時改為 2 小時。 |
|請求者 |銷售經理|
|原因 |當諮詢時間在白天發生變化時，客戶抱怨缺乏彈性。 |
|當前基準| SRS預約v1.0 |
|目標發布| v1.1 |

影響分析：

|面積 |影響 |
|---|---|
|業務規則| BR-004、BR-005 將閾值從 4 小時更改為 2 小時。 |
|使用者體驗副本 |錯誤訊息從「4 小時前」改為「2 小時前」。 |
| API驗證| `PATCH /reschedule` 和 `PATCH /cancel` 改變截止規則。 |
|品質保證 |更新TC-RS-004、TC-CAN-003，增加邊界測試正好2小時。 |
|烏特 |業務用戶重新運行 UAT-004 和 UAT-005。 |
|操作/SOP |當客戶致電時間少於2小時時，客服僅處理人工呼叫。 |
|風險|顧問幾乎沒有時間填補空缺，並且可能會增加空閒時間。 |

決定：

|決定|經試點批准|
|---|---|
|範圍 |適用於胡志明市諮商團體，為期2週。 |
|成功指標|缺席增加不超過3%；熱線投訴減少至少 15%。 |
|業主| PO 追蹤指標，BA 更新需求，QA 更新回歸。 |
|回溯 |如果缺席增加 > 3%，則使用 config 返回 4 小時截止時間。 |

## 練習練習

拿一個你曾經寫過的需求來說。創建：

1. 基線總結。
2. 假設的變更請求。
3.影響分析6層。
4. 追溯矩陣至少 5 行。
5. 決策日誌。

## 參考來源

- IIBA BABOK 指引： https://www.iiba.org/standards-and-resources/babok/
- IEEE/ISO/IEC 29148-2018： https://standards.ieee.org/ieee/29148/6937/
- Scrum 指南： https://scrumguides.org/scrum-guide.html
- PMI 商業分析從業人員： https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601

## 結論

優秀的 BA 不會透過變更控制來鎖定團隊。 BA 進行變更控制，以便每次變更都有背景、影響、決策和可追溯性。因此，團隊保持靈活但不混亂。
