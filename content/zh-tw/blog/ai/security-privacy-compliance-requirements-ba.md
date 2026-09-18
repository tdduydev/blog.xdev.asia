---
id: 02760001-ba02-4001-a007-000000000001
title: BA 的安全、隱私和合規性要求
slug: security-privacy-compliance-requirements-ba
excerpt: BA 不需要是安全工程師，但必須知道如何撰寫有關身份驗證、授權、審核日誌、資料脫敏、同意、保留、PII/PHI/PCI 和合規性的要求，以避免錯過規範。
featured_image: /images/blog/responsible-ai-requirements.webp
type: blog
reading_time: 12
view_count: 0
meta: null
published_at: '2026-05-06T10:00:00.000000Z'
created_at: '2026-05-06T10:00:00.000000Z'
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
  - name: Security
    slug: security
  - name: Privacy
    slug: privacy
  - name: Compliance
    slug: compliance
  - name: Requirements
    slug: requirements
comments: []
locale: zh-tw
---
許多 BA 認為安全/隱私是技術主管或安全團隊的工作。是的，他們進行了廣泛的設計和測試。但如果最初的需求沒有明確說明哪些資料是敏感資料、誰可以查看、誰可以匯出、保存多久、進行哪些審計，那麼技術團隊很容易建構出有缺陷的結構。

BA 不需要了解滲透測試，但需要知道如何提出正確的問題並足夠清楚地寫出需求。

## 1. BA需要注意什麼？

主要需求組：

|集團| BA需要澄清|
|---|---|
|認證|使用者如何登入？單一登入/多重身份驗證？ |
|授權|哪個角色可以做什麼？ |
|資料分類 |什麼資料是 PII/PHI/付款/機密？ |
|隱私權 |同意、保留、刪除、封鎖 |
|審計|記錄哪些操作，保留多久？ |
|合規| GDPR、PDPA、HIPAA、PCI-DSS 或內部政策 |
|事件|出現權限外洩/錯誤時如何升級？ |

## 2. 身分驗證與授權

身份驗證回覆：**你是誰？ **

授權答案：**你能做什麼？ **

要求範例：

```text
AUTHN-001:
User nội bộ phải đăng nhập bằng SSO công ty. Nếu user truy cập từ thiết bị mới, hệ thống yêu cầu MFA.

AUTHZ-001:
Chỉ role Finance Manager được approve refund trên 50 triệu VND.
```

不要籠統地寫：

> 系統必須是去中心化的。

我們把它寫成 RBAC 矩陣。

## 3. RBAC 矩陣範例

|角色 |查看客戶 |編輯客戶|出口客戶|刪除客戶|
|---|---:|---:|---:|---:|
|支援代理|是的，蒙面|沒有 |沒有 |沒有 |
|支援經理|是的 |是的 |沒有 |沒有 |
|合規官|是的 |沒有 |是的 |沒有 |
|管理員 |是的 |是的 |是的 |是的，經批准|

表中要求：

```text
AUTHZ-004:
Support Agent chỉ được xem email và số điện thoại ở dạng masked, ví dụ du***@mail.com và 090***123.
```

## 4.資料分類

BA 應該在 SRS 中將資料分類：

|類型 |範例|如何處理|
|---|---|---|
|公|產品名稱、常見問題 |可顯示寬幅|
|內部|營運報告|僅限內部|
|保密|合約價、保證金|權限限制 |
|個人識別資訊 |電子郵件、電話號碼、CCCD |掩飾、同意、保留 |
| PHI |健康檔案 |嚴格規定|
|付款|卡片資料、交易 | PCI-DSS，標記化 |

如果沒有分類，Dev/QA 就不知道哪些資料需要屏蔽、哪些日誌不應記錄原始值以及哪些匯出需要批准。

## 5. 隱私要求 BA 很健忘

### 同意

```text
PRIV-001:
Trước khi dùng email khách hàng cho marketing, hệ thống phải ghi nhận explicit consent gồm user_id, timestamp, consent_version và channel.
```

### 保留

```text
PRIV-002:
Chat transcript chứa PII chỉ được lưu tối đa 180 ngày, sau đó phải anonymize hoặc xóa theo policy.
```

### 刪除請求

```text
PRIV-003:
Khi khách gửi yêu cầu xóa dữ liệu, hệ thống tạo ticket DSAR và hoàn tất trong SLA 30 ngày nếu không có ràng buộc pháp lý giữ lại.
```

### 資料最小化

```text
PRIV-004:
Form đặt lịch không được yêu cầu CCCD nếu quy trình chỉ cần tên, số điện thoại và email.
```

## 6.審核日誌要求

一個好的審計日誌應該回答：

- 誰幹的？
- 做什麼？
- 什麼時候？
- 從哪裡？
- 什麼是之前/之後的資料？
- 操作敏感是什麼原因？

例如：

```text
AUD-001:
Khi user export danh sách khách hàng, hệ thống phải ghi audit log gồm user_id, role, timestamp, IP, filter sử dụng, số dòng export và file_id.
```

注意：審核日誌不應記錄原始密碼、令牌、完整卡號或不必要的敏感資料。

## 7. 符合要求

BA不是律師，但BA需要在適當的時候引入合規負責人。

清單：

- [ ] 資料屬於哪個國家？
- [ ] 是否有兒童、健康、財務、付款數據？
- [ ] 供應商/第三方是否處理資料？
- [ ] 有跨國轉帳嗎？
- [ ] 是否有刪除資料的請求？
- [ ] 是否有強制審計/報告？
- [ ] 是否有需要遵守的內部政策？

## 8. 安全驗收標準

故事範例：

> 身為支援經理，我想查看客戶資料，以便解決升級的問題單。

交流電應具有：

```gherkin
Scenario: Support Manager xem hồ sơ
Given user có role Support Manager
When user mở hồ sơ khách hàng
Then hệ thống hiển thị thông tin đầy đủ theo quyền
And ghi audit log hành động view_profile

Scenario: Support Agent xem hồ sơ
Given user có role Support Agent
When user mở hồ sơ khách hàng
Then email và số điện thoại được masked
And nút Export không hiển thị

Scenario: User không có quyền
Given user không thuộc team Support
When user truy cập URL hồ sơ khách hàng
Then hệ thống trả 403 và ghi security event
```

## 9. 常見錯誤

**錯誤1：只寫「根據授權」**

去中心化必須有一個矩陣。不然每個人的理解都不一樣。

**錯誤2：忘記匯出**

許多螢幕保護系統看起來很棒，但匯出 CSV 的範圍太廣。

**錯誤 3：記錄過多敏感資料**

審計是必要的，但記錄原始 PII/令牌/密碼是一個很大的風險。

**錯誤4：隱私稍後**

放棄隱私通常會導致資料模型、使用者介面、同意流程和工作保留發生代價高昂的改變。

## 調度的安全/隱私範例

存取矩陣：

|角色 |檢視行事曆 |建立行事曆 |變更/取消行程 |檢視電話號碼 |出口|
|---|---|---|---|---|---|
|客戶 |只是我的日曆|是的 |只是根據截止規則的我的日曆 |我的|沒有 |
|諮詢 |已分配時間表 |沒有 |沒有 |蒙面|沒有 |
|客戶服務 |客戶日曆 |客人有變化 |是的，按照 SOP |有理由就全力支持|沒有 |
|銷售經理|團隊儀表板|沒有 |沒有 |蒙面|是的，需要審核 |
|管理員 |完整|是的 |是的 |完整|是的，需要批准 |

安全驗收標準：

```gherkin
Scenario: Customer tries to view another customer's appointment
  Given customer A is logged in
  When customer A opens /appointments/APT-of-customer-B
  Then the system returns 403
  And no appointment details are displayed
  And a security event is logged
```

隱私要求：

|身分證 |要求|
|---|---|
| PRIV-001 |預約表格僅收集全名、電子郵件、電話號碼和可選的諮詢原因。 |
| PRIV-002 |如果服務不需要敏感訊息，顧問不應索取敏感資訊的原因。 |
| PRIV-003 |根據內部政策，預約資料將保存 7 年，如果沒有法律義務，則將匿名。 |
| PRIV-004 |郵件/簡訊提醒不包含敏感訊息，僅包含時間、顧問和日曆管理連結。 |
| AUD-001 |每次匯出預約資料都必須記錄user_id、角色、時間戳記、篩選器、行號、原因。 |

BA 應該將此部分包含在 SRS 或安全要求部分中，而不會讓開發人員想知道「哪個角色可以看到什麼」。

## 參考來源

- IIBA BABOK 指引： https://www.iiba.org/standards-and-resources/babok/
- IEEE/ISO/IEC 29148-2018： https://standards.ieee.org/ieee/29148/6937/

## 結論

安全性、隱私性和合規性不屬於要求的一部分。對於數位產品來說，這是品質的一部分。優秀的 BA 並不認為自己是安全專家，但知道如何儘早提出問題，編寫明確的需求，並在衝刺開始之前讓合適的人員參與審查。
