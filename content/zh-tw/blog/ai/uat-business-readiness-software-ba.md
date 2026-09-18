---
id: 02760001-ba02-4001-a009-000000000001
title: 軟體 BA 的 UAT 和業務準備：從測試計劃到通過/不通過
slug: uat-business-readiness-software-ba
excerpt: UAT 不僅僅是讓用戶測試幾個螢幕。本文指導 BA 創建 UAT 計劃、選擇場景、準備測試資料、管理缺陷、培訓、部署並決定繼續/不繼續。
featured_image: /images/blog/uat-business-readiness-ai.webp
type: blog
reading_time: 12
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
  - name: UAT
    slug: uat
  - name: Business Readiness
    slug: business-readiness
  - name: Release
    slug: release
comments: []
locale: zh-tw
---
UAT（使用者驗收測試）不是「再次進行QA測試」。 UAT是檢查解決方案在真實使用環境中是否滿足業務需求。

如果UAT做得不好，上線後往往會出現風險：

- 用戶不知道如何使用它。
- 新流程無法正常運作。
- 資料遷移遺失。
- 報告不作為決定。
- 業務規則錯誤，但 QA 不知道，因為缺少規格。

軟體BA通常是協調UAT與PO、QA和業務用戶的人。

## 1. UAT 與 QA 測試有何不同？

|品質保證測試|烏特 |
|---|---|
|檢查系統是否符合規格 |檢查該解決方案是否可以用於商業 |
|由 QA/技術團隊進行 |由業務用戶/關鍵用戶完成 |
|關注技術與功能缺陷|關注過程、政策、結果 |
|使用詳細的測試案例 |使用業務場景|
|可以連續衝刺跑|通常在發布/上線之前 |

QA 回答：“系統滿足要求嗎？”

UAT回答：“企業接受這個解決方案嗎？”

## 2. UAT 計畫包含哪些內容？

模板：

```markdown
# UAT Plan

## 1. Objective
- UAT để xác nhận điều gì?

## 2. Scope
- In scope
- Out of scope

## 3. Participants
- Business users
- BA
- QA
- Product Owner
- Support/Operations

## 4. Entry Criteria
- Build deployed to UAT environment
- Critical QA defects closed
- Test data ready
- UAT scenarios approved

## 5. Test Scenarios

## 6. Defect Management
- Tool
- Severity/Priority rules
- SLA fix

## 7. Exit Criteria
- Must-have scenarios pass
- No open P0/P1 defects
- Business owner sign-off

## 8. Go/No-Go Criteria
```

## 3.選擇UAT場景

不要複製整個 QA 測試用例。 UAT應該專注於業務旅程。

調度功能範例：

|場景 |為什麼它很重要 |
|---|---|
|客戶預訂成功 |核心業務流程|
|客人重新安排|熱門流量|
|客人在接近時間時取消 |敏感政策 |
|管理員處理重複的日程表 |操作異常|
|顧問查看當天行程 |客戶以外的角色 |
|報告預訂號碼 |業務追蹤 |

每個場景應該有：

- 角色/角色。
- 前提條件。
- 步驟。
- 預期的業務成果。
- 需要數據。
- 通過/失敗標準。

## 4.測試數據

UAT失敗很多都是因為測試資料不標準。

清單：

- [ ] 每個角色都有使用者。
- [ ] 有正常、邊緣、無效資料。
- [ ] 有不同的狀態資料。
- [ ] 如果需要測試報告，數據足夠大。
- [ ] 未經許可，資料不包含實際的 PII。
- [ ] 資料可以在測試輪次之間重設。

例如：

|數據|目的|
|---|---|
|客戶 A 已確認 |日曆 測試取消/更改 |
|客戶B還沒有行程 |新設定測驗|
|插槽已滿 |測試空白/錯誤 |
|管理員使用者|管理測驗|
|顧問使用者|測試檢視行事曆 |

## 5. 進入和退出標準

### 參賽標準

僅在以下情況啟動 UAT：

- 建置穩定。
- QA 已通過關鍵路徑。
- 已知問題已公佈。
- UAT 場景已獲批准。
- 測試資料和帳戶準備就緒。
- 商業用戶已經知道測試時間表。

### 退出標準

UAT 在以下情況下完成：

- 100% 必須具備的場景通過。
- 不再有 P0/P1 缺陷。
- P2 有一個解決方法並且企業接受它。
- 培訓/發行說明已準備就緒。
- 企業主簽名。

## 6. UAT缺陷如何處理？

當用戶報錯誤時：

1. 三確認複製步驟。
2. QA 檢查是否有技術錯誤。
3. BA決定業務影響。
4. PO/企業主決定優先順序。
5. 團隊修復或延後。
6. BA更新UAT狀態並釋放風險。

分類：

|類型 |範例|如何處理|
|---|---|---|
|蟲 |取消預約但時段未重新開放 |修復 |
|需求差距|商家想新增取消原因 |變更要求 |
|可用性問題 |使用者看不到重新安排按鈕 |使用者體驗調整 |
|訓練問題|使用者不知道過濾器報告|更新指南 |

## 7. 業務準備狀況

UAT通證不保證上線。業務準備包括：

- 使用者培訓。
- 新的標準作業程序。
- 支援腳本。
- 常問問題。
- 回滾計劃。
- 溝通計劃。
- 監控儀表板。
- 上線後的所有者。

上線清單：

```text
☐ UAT sign-off
☐ Release note
☐ Training done
☐ Support team ready
☐ Monitoring/alert ready
☐ Rollback/fallback plan
☐ Business owner approves go-live
```

## 8. 繼續/不繼續的決定

進行/不進行不應該是情緒化的。使用記分卡：

|標準|狀態 |筆記|
|---|---|---|
|關鍵UAT場景|通行證 | 12 月 12 日 |
| P0/P1 缺陷 |通行證 | 0 開 |
| P2 缺陷 |面臨風險 | 2 打開，有解決方法 |
|培訓|通行證 | 30 名使用者接受了培訓 |
|支援準備|通行證 |標準作業程序更新 |
|監控|通行證 |儀表板直播 |
|業務審核|待定 |等待營運主管 |

如果存在“風險”，則必須記錄所有者和緩解措施。

## 9. 完整的 UAT 腳本範例

UAT 場景：客戶預訂並重新安排諮詢。

|領域 |價值|
|---|---|
|場景 ID | UAT-BOOK-002 |
|角色|現有客戶 |
|目標|確認客人可以在截止時間前 4 小時預訂並重新安排。 |
|前提條件 |客戶活躍，顧問 A 的時段為明天 09:00 和 10:00，已啟用電子郵件服務。 |
|測試資料| customer_id = CUS-1001，顧問_id = CON-2001，slot_09 = SLOT-0900，slot_10 = SLOT-1000。 |

步驟：

|步驟|行動|預期結果 |證據|
|---|---|---|---|
| 1 |客戶開啟預訂頁面。 |顧問和空位清單會在 2 秒內顯示出來。 |螢幕截圖插槽清單。 |
| 2 |選擇顧問 A，時段 09:00。 |確認按鈕已啟用，日曆資訊正確。 |截圖確認頁面。 |
| 3 |點選確認。 |建立的約會狀態為已確認，並附有確認碼。 |預約 ID。 |
| 4 |檢查電子郵件。 |確認電子郵件將在 1 分鐘內到達，不包含敏感資料。 |電子郵件截圖。 |
| 5 |重新安排到 10:00 時段。 |舊插槽重新打開，新插槽已確認，審核日誌記錄舊/新插槽。 |審核日誌 ID。 |
| 6 |嘗試重新安排其他用戶的約會。 |支付系統403。錯誤截圖。 |

此場景的退出標準：

- 不存在高/嚴重嚴重性缺陷。
- 商業用戶確認該措辭易於理解。
- 客戶服務在 4 小時內確認異常處理 SOP。
- QA 確認重複預訂通行證的回歸。

## 10.我應該在AI功能中加入什麼？

如果該功能有AI，UAT需要新增：

- 黃金測試集。
- 輸出質量閾值。
- 幻覺/後退場景。
- 人力超控流程。
- 如果影響較大，則進行偏見/安全審查。
- 上線後監控。

但不要讓整個UAT都圍繞著AI。企業仍然需要檢查端到端的旅程。

## 參考來源

- IIBA BABOK 指引： https://www.iiba.org/standards-and-resources/babok/
- Scrum 指南 2020： https://scrumguides.org/scrum-guide.html

## 結論

好的UAT並不是進行大量的測試，而是測試正確的業務場景、正確的使用者、正確的數據並做出明確的決策。軟體BA起到橋樑作用：將需求轉化為UAT計劃，將回饋轉化為缺陷/變更，幫助企業自信上線。
