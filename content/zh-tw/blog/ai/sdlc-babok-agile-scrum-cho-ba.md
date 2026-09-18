---
id: 02760001-ba02-4001-a002-000000000001
title: SDLC、BABOK 和 BA 的敏捷/Scrum：如何學習而不感到困惑？
slug: sdlc-babok-agile-scrum-cho-ba
excerpt: >-
  新的 BA 通常會零散地學習 BABOK、SDLC、Scrum、BRD、SRS
  和使用者故事，因此很容易感到困惑。本文將整個事情映射到從想法到發布的實際工作流程中。
featured_image: /images/blog/babok-guide-ba.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T09:10:00.000000Z'
created_at: '2026-05-06T09:10:00.000000Z'
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
  - name: SDLC
    slug: sdlc
  - name: BABOK
    slug: babok
  - name: Agile
    slug: agile
  - name: Scrum
    slug: scrum
comments: []
locale: zh-tw
---
學習 BA 時一個很常見的錯誤就是分段學習：

- 學習了BABOK，但不知道如何在衝刺中使用它。
- 學了Scrum，但認為BA只寫使用者故事。
- 學習SDLC但不知道每個階段需要什麼神器。
- 學習SRS，但不知道什麼時候需要SRS，什麼時候只需要故事。

本文整理成一張簡單易懂的地圖。

## 1.SDLC是軟體的“通路”

SDLC（軟體開發生命週期）描述了軟體開發生命週期。每個公司的藝名可能有所不同，但一般邏輯通常是：

1.想法/需求
2. 發現
三、要求
4. 設計
5. 發展
6. 測試
7. 發布
8. 操作/評估

BA 的角色不僅存在於需求階段。 BA幾乎涉及整個生命週期：

| SDLC階段| BA需要做什麼 |
|---|---|
|想法/需求|澄清問題、目標、利害關係人、指標 |
|發現 |訪談、研討會、流程分析、當前/未來狀態 |
|需求| BRD、SRS、使用者故事、AC、NFR、商業規則 |
|設計|查看線框圖、BPMN/UML、API/資料影響 |
|發展|澄清需求，管理變更要求 |
|測試|支援測試場景、缺陷分類、UAT |
|發布 |進行/停止、訓練、發行說明、準備 |
|評價| KPI、效益追蹤、優化待辦事項 |

## 2.BABOK是“BA職業知識集”

BABOK 並不是一個艱難的過程。 BABOK 是知識體系：BA 根據情境使用的概念、任務、技術和能力的集合。

BABOK中的6個知識領域可以對應到SDLC中，如下所示：

| BABOK知識區|用於SDLC |
|---|---|
|規劃與監控|專案從開始到結束 |
|啟發與合作 |發現、需求、UAT |
|需求生命週期管理|需求、開發、變更控制|
|策略分析|創意、發現、商業案例 |
|需求分析與設計定義|需求、設計、積壓|
|解決方案評估|營運、評估、最佳化 |

簡而言之：SDLC 告訴您您所在的**位置**。 BABOK 告訴您**使用哪種 BA 技術**。

## 3. 敏捷/Scrum 是“交付工作的方式”

在 Scrum 環境中，工作分為多個衝刺 (sprint)。產品待辦事項清單是一個待辦事項列表，產品負責人負責價值最大化，Scrum 團隊負責創造有價值的增量。

BA 並不是 Scrum 指南中的正式角色，但 BA 經常深入參與：

- 支援 PO 澄清產品待辦事項清單。
- 促進開發/QA/UX 的細化。
- 編寫或審查驗收標準。
- 澄清依賴性、假設、風險。
- 支持 UAT 和利害關係人的回饋。

需要記住的一點：在 Scrum 中，需求不必從頭開始寫作。但「不從頭寫下所有東西」並不意味著「寫得膚淺」。需求需要在適當的時候夠清楚。

## 4. BA 的神器地圖

這是實際的工件圖：

|當 |神器|詳細程度|
|---|---|---|
|擬議倡議|問題陳述| 1 頁 |
|需要預算|商業案例| 1-5 頁 |
|發現 |利害關係人地圖、流程圖|足夠對齊|
|建造之前 | BRD/SRS 或輕量化規格 |取決於複雜性 |
|敏捷交付|史詩、故事、AC、DoR/DoD |據衝刺|
|要求有很多| RTM |追蹤表|
|是的使用者介面 |線框圖、原型筆記 |低或中保真度 |
|已整合 | API/資料影響說明 |欄位、端點、錯誤 |
|測試/UAT |測試場景、UAT計畫 |商業可讀|
|上線 |發佈準備清單 |去/不去 |
|發佈後 | KPI報告、效益追蹤| 30/60/90 天 |

## 5. 瀑布式、敏捷式、混合式：BA 的做法有何不同？

### 瀑布式/計畫驅動

適合以下情況：
——範圍相對穩定。
- 高合規性。
- 合約需要一個明確的基線。
- 多個供應商或多個遺留系統。

BA 通常會撰寫更詳細的文件：BRD、SRS、RTM、正式簽名。

### 敏捷

適合以下情況：
- 產品需要快速向使用者學習。
- 範圍改變了。
- 跨職能團隊。
- 增量發布。

BA 經常編寫輕量級工件：史詩、故事、AC、流程圖、決策日誌。

### 混合動力

在企業中很受歡迎：
- 發現和治理可以是正式的。
- 交貨以衝刺方式進行。
- 發布具有明確的 UAT 和簽核。

BA 需要靈活：不要強迫一切都變成純 Scrum 或純 Waterfall。

## 6. 準備就緒的定義和完成的定義

這兩個概念讓 BA 更容易與 Dev/QA 交談。

### 準備好故事的定義

在以下情況下，故事已準備好衝刺：

- 具有明確的商業價值。
- 範圍夠小。
- 可測試的驗收標準。
- 已聲明依賴性。
- 已檢查資料/API 影響。
- 如果需要，可以使用 UI/線框。
- 相關NFR明確。
- 開放式問題不再有障礙。

### 增量完成的定義

只有在以下情況下，工作才「完成」：

- 代碼完成。
- 測試通過。
- 交流通行證。
- 未違反 NFR 臨界值。
- 如有必要，更新文件/發行說明。
- 根據團隊慣例審查產品/BA/QA。

BA 並非單獨擁有“完成的定義”，但 BA 應該有助於團隊確保 DoD 反映真正的業務品質。

## 7. 簡短案例研究

特色：客戶在線上預約諮詢。

**想法**
- 問題：許多顧客撥打專線電話只是為了預約，造成超負荷。
- 指標：3 個月內調度呼叫減少 30%。

**發現**
- 利害關係人：客戶、呼叫中心、顧問、管理員。
- 流程：選擇服務->選擇空日曆->輸入訊息->確認->接收行事曆提醒。

**要求**
- BRD：目標、範圍、重新安排/取消政策。
- SRS：預訂狀態、驗證、通知、許可。
- 故事：作為客戶，我想重新安排我的預約...
- AC：給定/何時/然後用於預訂、取消、重疊時間表和逾期日期。

**設計**
- 線框預訂流程。
- API 影響：取得可用時段、POST 預訂、PATCH 重新安排。

**測試/UAT**
- UAT場景：預訂成功、時段耗盡、接近時間取消、顧問重新安排。

**評估**
- 儀表板：線上預約號碼、熱線電話、缺席率。

## 8.練習練習

建立一個包含 8 個 SDLC 行的表。對於每一行，輸入：

- 三項活動
- 神器
- 審稿人
- 如果忽視則有風險

然後選擇一個你知道的特徵並填寫它。如果你不能填寫它，那就是一個需要學習的空白。

## 根據 SDLC 的端到端範例：預約

|相| BA 做什麼 |範例工件 |誰評論 |
|---|---|---|---|
|發現 |訪談客戶服務人員、顧問、銷售經理；取得雙重預訂/缺席資料。 |問題陳述、利害關係人地圖、當前狀態 BPMN。 |營運主管，PO。 |
|分析 |比較 3 個選項：升級表、購買排程工具、內建客戶入口網站。 |商業案例、選擇權分析、風險日誌。 | PO，工程主管，財務。 |
|定義 |關閉 MVP 範圍：搜尋插槽、預約、重新排程、取消、通知。 | BRD 輕量級、SRS、業務規則、NFR。 |業務利害關係人、開發人員、品質檢查人員。 |
|設計|查看線框圖、序列 API、狀態預約圖。 |線框圖註釋、API/資料契約、狀態轉換表。 |使用者體驗、開發、品質檢查。 |
|建構 |在衝刺期間澄清問題單、處理變更和開放問題。 | Jira 故事、AC、決策日誌。 | Scrum 團隊。 |
|測試|將 AC 映射到測試場景，支援缺陷分類。 |測試場景矩陣、缺陷分類註解。 |品質保證、文學學士、採購訂單。 |
|發布 | UAT 準備、客戶服務培訓、執行/不執行。 | UAT 計劃、準備清單、發行說明。 | PO、營運、支援。 |
|評價 |將發布後指標與目標進行比較。 |效益實現報告。 |產品、商業贊助商。 |

在衝刺之前已經「準備好」的故事：

```gherkin
Feature: Customer books a consultation slot

Business value:
- Reduce hotline booking calls
- Prevent double booking

Rules:
- BR-001: A confirmed slot cannot be booked by another customer
- BR-002: Customer can reschedule only if appointment starts in more than 4 hours

Acceptance criteria:
Scenario: Book available slot
  Given the customer selects an available slot
  When the customer confirms the booking
  Then the appointment status is Confirmed
  And the selected slot is locked
  And confirmation email is sent within 1 minute
```

以下是如何連接 BABOK、SDLC 和 Scrum：BABOK 幫助 BA 知道要進行哪些分析活動； SDLC 顯示活動所在位置； Scrum 幫助將輸出打包到可以建置/測試的積壓項目中。

## 參考來源

- IIBA BABOK 指引： https://www.iiba.org/standards-and-resources/babok/
- PMI 商業分析從業人員： https://www.pmi.org/shop/p-/book/business-analysis-for-practitioners-a-practice-guide/00101570601
- Scrum 指南 2020： https://scrumguides.org/scrum-guide.html
- IEEE/ISO/IEC 29148-2018： https://standards.ieee.org/ieee/29148/6937/

## 結論

如果一定要記住一句話：**SDLC是生命週期，BABOK是知識體系，Scrum是營運交付的方式**。優秀的文學士不會將它們作為三個獨立的科目來研究。優秀的 BA 知道如何在正確的時間、以正確的細節程度使用正確的東西。
