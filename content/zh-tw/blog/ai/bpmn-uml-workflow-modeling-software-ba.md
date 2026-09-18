---
id: 02760001-ba02-4001-a012-000000000001
title: 軟體 BA 的 BPMN 和 UML：繪製工作流程，以便業務人員理解並且開發人員可以實施
slug: bpmn-uml-workflow-modeling-software-ba
excerpt: >-
  BA 不需要繪製每種類型的圖，但需要知道何時使用
  BPMN、活動圖、序列圖、狀態圖和領域模型。本文介紹如何選擇圖表，例如，設定時間表和清單以在移交之前檢查圖表。
featured_image: /images/blog/uml-bpmn-ai-assisted-flows.webp
type: blog
reading_time: 16
view_count: 0
meta: null
published_at: '2026-05-06T10:20:00.000000Z'
created_at: '2026-05-06T10:20:00.000000Z'
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
  - name: BPMN
    slug: bpmn
  - name: UML
    slug: uml
  - name: Modeling
    slug: modeling
  - name: Software BA
    slug: software-ba
comments: []
locale: zh-tw
---
圖表不用於文檔裝飾。好的圖表可以幫助團隊快速回應：

- 流程從這裡到哪裡？
- 誰執行哪一步？
- 涉及哪些系統？
- 狀態如何改變？
- 哪個 API/服務呼叫哪個服務？
- 如果出現錯誤，你應該走哪條路？

BA 不需要成為解決方案架構師，但軟體 BA 應該知道如何選擇正確的圖表類型以減少誤解。

## 1.什麼時候使用BPMN？

當您需要描述具有許多參與者、許多步驟和許多決策分支的**業務流程**時，BPMN 非常適合。

例如：

- 保險理賠審批流程。
- 客戶入職流程。
- 考試預約流程。
- 退款處理流程。
- KYC 驗證流程。

根據 OMG 的說法，BPMN 是使用業務流程圖描述業務流程的標準符號，對於業務來說足夠容易理解，但對於技術使用者來說仍然足夠準確。

當主要問題是：**業務如何運作？ **時，BA 應該使用 BPMN

## 2.什麼時候使用UML？

UML 有多種類型的圖。 BA通常只需要幾種類型：

|圖表|使用時 |
|---|---|
|用例圖 |需要確定主要參與者和能力|
|活動圖|需要用比 BPMN 更少的符號來描述更簡單的處理流程 |
|時序圖 |需要描述使用者、UI、API、服務、外部系統之間的互動 |
|狀態圖|需要描述訂單、票證、索賠、預訂的狀態生命週期 |
|類別/域模型|需要統一實體、屬性和業務關係

BA 不應該因為感覺「專業」就畫 UML。根據您需要回答的問題選擇圖表。

## 3. 例如：預約排程功能

### BPMN級別業務

目標：業務了解端到端流程。

```text
Patient -> Search doctor -> Select slot -> Submit booking
System -> Check slot availability
Gateway:
  - Slot available -> Create appointment -> Send confirmation
  - Slot unavailable -> Show alternative slots
Clinic staff -> Review appointment list
```

在此級別，BA 應證明：

- 泳池/泳道：病患、系統、診所工作人員。
- 網關：插槽可用/不可用。
- 活動：預訂已提交，確認已發送。
- 例外：付款失敗、時段已過期、醫生不在。

### 序列圖級軟體

目標：開發人員了解系統如何互動。

```text
User -> Web App: Submit booking
Web App -> Booking API: POST /appointments
Booking API -> Schedule Service: reserveSlot(slotId)
Schedule Service -> Database: lock slot
Booking API -> Notification Service: send confirmation
Booking API -> Web App: appointmentId + status
```

在此級別，BA 不需要決定架構，但需要表明：

- 涉及哪個外部系統？
- 發送什麼資料。
- 企業需要處理哪些錯誤？
- UI 需要顯示哪個回應。

### 狀態圖級生命週期

目標：統一銷售狀態。

```text
Draft -> Pending Confirmation -> Confirmed -> Checked In -> Completed
Confirmed -> Cancelled
Pending Confirmation -> Expired
Confirmed -> No Show
```

每次轉換時，BA 都需要詢問：

- 誰可以改變狀態？
- 轉讓條件是什麼？
- 有審計日誌嗎？
- 有什麼通知嗎？
- 是否有任何退款或費用？

## 4.圖表必須附上文字

僅有圖表通常是不夠的。每個圖表應包含：

- 目的：該圖回答什麼問題？
- 範圍：範圍內/範圍外。
- 圖例：特殊符號（如果有）。
- 假設。
- 相關業務規則。
- 開放式問題。
- 版本和擁有者。

例如：

```markdown
Diagram: Appointment Booking BPMN v1.2
Purpose: Align future-state booking workflow before sprint planning.
Scope: Online booking for outpatient consultation.
Out of scope: Insurance claim, offline booking, recurring appointment.
Owner: BA + Clinic Ops Lead
Approved by: Product Owner
```

## 5. 檢查清單審查圖

在發送圖表之前，請檢查一下自己：

- 該圖是否有明確的目的？
- 演員/泳道夠嗎？
- 有開始/結束事件嗎？
- 網關有明確的條件嗎？
- 是否表示異常流程？
- 狀態轉換有守衛條件嗎？
- 該圖對讀者來說是否過於詳細？
- 是否有到使用者故事/SRS 的映射？
- 有版本和更新日期嗎？
- 業務利害關係人不需要BA解釋就能理解嗎？

## 6. 常見錯誤

**錯誤1：一張圖試圖回答每一個問題**

BPMN 幫助企業了解流程。技術團隊了解互動的序列圖。用於理解生命週期的狀態圖。不要強迫一張圖完成所有工作。

**錯誤2：繪製快樂路徑，忘記異常**

軟體錯誤通常存在於異常：插槽剛剛被其他人保留、支付逾時、使用者關閉瀏覽器、外部 API 關閉。

**錯誤3：圖表與需求不同步**

如果使用者故事說一種方式，BPMN 說一種方式，測試案例說另一種方式，那麼團隊將失去對 BA 文件的信任。圖表需要透過 SRS/backlog 進行追蹤或至少進行審查。

## 全包模型範例

特點：重新安排諮詢。

### BPMN 總結

```text
Customer lane:
  Open appointment detail -> Click Reschedule -> Select new slot -> Confirm

System lane:
  Validate owner -> Validate appointment status -> Validate cutoff -> Validate slot
  Gateway:
    All valid -> Update appointment -> Release old slot -> Lock new slot -> Send notification
    Invalid owner -> Return 403
    Cutoff expired -> Show hotline message
    Slot unavailable -> Show alternative slots

CSKH lane:
  Handle exception for cutoff-expired case if customer calls hotline
```

### 狀態轉換

|來自 |活動 |條件|大|
|---|---|---|---|
|已確認 |客戶重新安排 |所有者，>= 4 小時，有新的時段可用 |已確認 |
|已確認 |客戶取消 |業主，>= 4 小時 |取消 |
|已確認 |時間流逝|預約時間已到，顧客缺席 |沒有出現 |
|已確認 |諮詢結束 |會議結束 |已完成 |

### 序列摘要

```text
Customer -> Web App: confirm reschedule(new_slot_id)
Web App -> Appointment API: PATCH /appointments/{id}/reschedule
Appointment API -> Auth Service: check owner
Appointment API -> Schedule Service: reserve new slot + release old slot
Appointment API -> Audit Log: write old_slot/new_slot
Appointment API -> Notification Service: send reschedule email
Appointment API -> Web App: updated appointment
```

這個圖表套件幫助每個團隊正確閱讀他們的部分：業務部門看到 BPMN，開發人員看到序列/API 接觸點，QA 看到狀態轉換和異常路徑。

## 練習練習

選擇退款、安排或審核等流程。創建：

1. 具有至少 2 個通道和 2 個網關的未來狀態 BPMN。
2. 主要物件的狀態圖。
3. 快樂路徑的序列圖。
4. 需要利害關係人詢問的 5 個不明確的例外流程清單。

## 參考來源

- OMG BPMN 規範： https://www.omg.org/spec/BPMN
- OMG BPMN 概述： https://www.omg.org/bpmn/
- OMG UML 規範： https://www.omg.org/spec/UML/
- IIBA BABOK 指引： https://www.iiba.org/standards-and-resources/babok/

## 結論

好的圖表不是最漂亮的圖表，而是幫助正確的人做出正確決策的圖表。 BA 應該使用 BPMN 來協調業務，使用 UML 來描述系統行為，並始終將圖表與需求、規則和測試案例連接起來。
