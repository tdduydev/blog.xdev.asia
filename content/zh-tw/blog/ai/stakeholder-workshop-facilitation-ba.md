---
id: 02760001-ba02-4001-a010-000000000001
title: BA 利害關係人研討會：如何準備、促進並最終確定決策
slug: stakeholder-workshop-facilitation-ba
excerpt: 一個好的研討會不是一個擁擠的會議。本文指導 BA 準備目標、議程、問題、促進技巧、解決衝突以及在研討會結束後確定行動項目。
featured_image: /images/blog/elicitation-ai-notes-ba.webp
type: blog
reading_time: 10
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
  - name: Stakeholder
    slug: stakeholder
  - name: Workshop
    slug: workshop
  - name: Elicitation
    slug: elicitation
comments: []
locale: zh-tw
---
研討會是 BA 最強大的啟發技術之一。但研討會也很容易變成一場長時間的會議，意見很多，決定很少。

好的工作坊需要三點：

1、目標明確。
2. 房間裡有合適的人。
3. 會後的具體輸出。

BA 是設計溝通的人，而不僅僅是記錄會議記錄的人。

## 1. 什麼時候該使用研討會？

研討會適合以下情況：

- 需要同時協調多個利害關係人。
- 團隊之間有流程衝突。
- 需要統一範圍。
- 需要映射目前/未來的流程。
- 需要優先考慮需求。
- 需要最終確定業務規則。

在以下情況下不應使用研討會：

- 需要敏感的個人資訊。
- 問問別人就知道了。
- 決定者不能參加。
- 目標不明確。

## 2. 研討會前準備

清單：

- [ ] 研討會的目標是什麼？
- [ ] 會話後的輸出為何？
- [ ] 誰是決策者？
- [ ] 誰是主題專家？
- [ ] 誰只需要被告知？
- [ ] 預讀已經傳送了嗎？
- [ ] Agenda 有時間限制嗎？
- [ ] 是否有用於捕捉決策的範本？

未知目標範例：

> 討論調度功能。

重寫：

> 最終確定預訂流程的未來狀態流程，包括取消/重新安排規則、步驟所有者和 MVP 範圍之外的內容。

## 3. 議程範例 90 分鐘

```text
0-10 phút: Mục tiêu, scope, rule of engagement
10-25 phút: Review current pain points
25-45 phút: Map current-state process
45-65 phút: Co-create future-state process
65-80 phút: Chốt business rules và open questions
80-90 phút: Decision recap, action items, owner/deadline
```

參與規則：

- 在解決問題之前先專注於問題。
- 每個觀點都需要附上證據或例子。
- 如果您無法關閉它，請向所有者寫一個未解決的問題。
- 範圍外主題的停車場。

## 4. 引導技術

### 1-2-4-全部

當團體人數眾多且安靜的人不知所措時使用。

1.每個人寫下自己的想法。
2.交換配對。
3. 4 人一組收集想法。
4、全集團共享。

### 點投票

用於確定痛點或需求的優先順序。

每人有3票。對最重要的項目進行投票。 BA不會將投票視為最終決定，而是用來查看趨勢。

### 停車場

用於使車間保持在正軌上。

例如：在討論 MVP 調度時，有人想討論忠誠度計畫。 BA 將其記錄在停車場並進行另一次預約。

### 決策日誌

每個決定都需要：

- 決策 ID。
- 內容。
- 原因。
- 決定者。
- 天。
- 影響。

## 5. 處理衝突

衝突並不壞。衝突通常表示有一個重要的需求。

例如：

- 銷售人員希望客戶隨時重新安排。
- 營運部門希望提前 24 小時阻止重新安排。
- 客戶支援希望在凌晨 4 點之前保持靈活性。

BA 的處理方式是：

1.頭寸與利益分離。
2. 詢問每個選項的影響。
3. 如果有數據，就使用數據。
4. 推薦選項和權衡。
5.最終決策者。

模板：

```text
Option A: Cho đổi bất cứ lúc nào
Pros: UX tốt
Cons: Consultant bị động, no-show risk

Option B: Khóa trước 24h
Pros: Vận hành ổn định
Cons: Khách không linh hoạt

Option C: Cho đổi trước 4h
Pros: Cân bằng UX và vận hành
Cons: Cần rule rõ trong hệ thống
```

## 6. 研討會後的輸出

BA 應在 24 小時內發送一份概要：

```markdown
Subject: Recap Workshop - Booking MVP Future Process

1. Decisions
- DEC-001: MVP cho phép đổi lịch trước 4h.
- DEC-002: Payment online out of scope.

2. Business Rules
- BRULE-001: Slot đã confirmed không hiển thị cho khách khác.
- BRULE-002: Khách hủy dưới 4h phải gọi hotline.

3. Open Questions
- OQ-001: Có gửi SMS hay chỉ email? Owner: Marketing, Due: 2026-05-10.

4. Action Items
- BA: cập nhật BPMN và SRS.
- PO: xác nhận MVP scope.
- Tech Lead: review API impact.
```

## 7. 完整的研討會輸出範例

研討會：未來狀態的預約。

決策日誌：

|身分證 |決定|理由|業主|
|---|---|---|---|
|十月-001 | MVP僅支援1:1調度，不支援團體預約。 |目前92%的預訂是1:1，縮小了最初的發布範圍。 |採購訂單 |
|十月-002 |重新安排/取消的截止時間為 4 小時。 |顧問需要足夠的時間來填補空缺。 |營運主管 |
|十月-003 |首先發送電子郵件，簡訊包含在第 2 階段。簡訊費用需要進一步批准。 |行銷|

業務規則：

|規則ID |規則|來源 |
|---|---|---|
| BR-001 |已確認的時段對其他客人不可見。 |營運主管 |
| BR-002 |客戶只能在預約開始至少 4 小時後才能重新安排。 |銷售經理|
| BR-003 |如果有支援原因，客戶服務可以更改客戶的更換計劃。 |客戶服務主管 |
| BR-004 |顧問不得自行刪除已確認的客戶行事曆。 |合規|

開放式問題：

|身分證 |問題 |業主|到期|
|---|---|---|---|
| OQ-001 |您需要發送日曆邀請嗎？ `.ics` 不？ |行銷| 2026-05-10 |
| OQ-002 |從預約時間算起，缺席需要多久時間？ |營運主管 | 2026-05-11 |
| OQ-003 |資料預約保留多久？ |合規| 2026-05-12 |

行動項目：

|任務 |業主|輸出|
|---|---|---|
|更新 BPMN 未來狀態 |學士 |圖表 v1.1 |
|編寫輕量級SRS |學士 | SRS v0.1 |
|檢查持有 API 的插槽 |開發主管 |可行性說明|
|草擬測試場景|品質保證主管 |測試矩陣|

## 8. 研討會結束後使用人工智慧

人工智慧有助於：

- 成績單摘要。
- 見解小組。
- 尋找矛盾。
- 草稿回顧。
- 創建行動項目。

但 BA 必須檢查：

- AI 是否會加入會議中未包含的想法？
- 該決定是否得到了合適的人的批准？
- 人工智慧是否會自動將開放式問題解釋為決策？

## 9. 常見錯誤

**錯誤1：沒有決策者**

研討會指出了問題，但沒有最終確定任何事情。

**錯誤2：議程太貪婪**

一場會議不可能同時是發現、詳細設計和估算。

**錯誤3：BA過於中立**

BA需要對人保持中立，但對決策品質不能保持中立。如果要求含糊，BA 必須詢問。

## 練習練習

為「重新安排預約」功能準備研討會：

- 研討會目標。
- 要邀請的人員清單。
- 議程 60 分鐘。
- 10 個啟發式問題。
- 決策日誌範本。
- 電子郵件回顧範本。

## 參考來源

- IIBA BABOK 指引： https://www.iiba.org/standards-and-resources/babok/
- PMI 商業分析從業人員： https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601

## 結論

一個好的車間可以幫助BA大幅縮短對準時間。但是，只有當研討會具有明確的目標、適當的促進技術，並且產出被分解為決策、業務規則、開放性問題和行動項目時，研討會才是好的。沒有產出，研討會就只是一場擁擠的會議。
