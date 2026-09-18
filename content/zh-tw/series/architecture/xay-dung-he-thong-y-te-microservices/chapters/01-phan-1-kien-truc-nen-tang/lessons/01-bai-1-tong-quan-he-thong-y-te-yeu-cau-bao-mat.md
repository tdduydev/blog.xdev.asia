---
id: 019e1a40-a101-7001-d001-f0a1b2c30101
title: 第 1 課：醫療保健系統概述和安全要求 — HIPAA、HL7 FHIR
slug: bai-1-tong-quan-he-thong-y-te-yeu-cau-bao-mat
description: >-
  了解醫療資料安全概述：PHI/ePHI 概念、國際標準 HIPAA（隱私規則、安全規則、違規通知）、HL7 FHIR 安全、健康資料 GDPR、2018
  年越南網路安全法、關於個人資料保護的第 13/2023 號法令以及安全框架 NIST 網路安全框架、醫療保健 ISO 27799。
duration_minutes: 120
is_free: true
video_url: null
sort_order: 1
section_title: 第 1 部分：架構與平台
course:
  id: 019e1a40-a100-7001-d001-f0a1b2c30001
  title: 建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak
  slug: xay-dung-he-thong-y-te-microservices
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-5225" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-5225)"/>

  <!-- Decorations -->
  <g>
    <circle cx="716" cy="118" r="24" fill="#2dd4bf" opacity="0.13"/>
    <circle cx="832" cy="234" r="32" fill="#2dd4bf" opacity="0.11"/>
    <circle cx="948" cy="90" r="10" fill="#2dd4bf" opacity="0.09"/>
    <circle cx="1064" cy="206" r="18" fill="#2dd4bf" opacity="0.07"/>
    <circle cx="680" cy="62" r="26" fill="#2dd4bf" opacity="0.05"/>
    <circle cx="750" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#2dd4bf" opacity="0.15"/>
    <line x1="600" y1="218" x2="1100" y2="298" stroke="#2dd4bf" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="248" x2="1050" y2="318" stroke="#2dd4bf" stroke-width="0.5" opacity="0.08"/>
    <polygon points="996.5788383248864,151.5 996.5788383248864,184.5 968,201 939.4211616751136,184.5 939.4211616751135,151.5 968,135" fill="none" stroke="#2dd4bf" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#2dd4bf"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#2dd4bf" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#2dd4bf">🏗️ 建築 — 第 1 課</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">第 1 課：醫療保健系統和要求概述</tspan>
      <tspan x="60" dy="42">安全性 — HIPAA、HL7 FHIR</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">建構微服務醫療保健系統 — Quarkus、PostgreSQL、符合 HIPAA 標準的 Keycloak</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 1 部分：架構與平台</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

## 1. 為什麼醫療資料安全很重要？

![HIPAA 技術保障概述 — 5 類技術安全控制](/storage/uploads/2026/04/healthcare-hipaa-safeguards-overview.webp)

醫療資料是最敏感的資料類型之一。醫療記錄包含個人資訊、病史、檢查結果、處方和保險資訊——所有這些在黑市上都非常有價值。

### 令人擔憂的統計數據

- **醫療數據的價值**：在暗網上，醫療記錄的費用從 **250 美元到 1,000 美元**，是信用卡資訊（5 美元到 25 美元）的 10 到 40 倍
- **醫療保健領域洩漏的平均成本**：**1,093 萬美元**（2023 年，IBM 資料外洩成本報告）—所有行業中最高
- **攻擊頻率**：89% 的醫療保健組織在過去 2 年內經歷過資料洩露
- **檢測時間**：平均**329天**來偵測和控制醫療違規

### 為什麼醫療數據是一個有吸引力的目標？

|特點|原因 |
|----------|------|
| **無法更改** |與信用卡不同，您無法「取消」並重新簽發您的病史 |
| **長期價值** |醫療數據對病人的一生都很有價值|
| **多重用途** |可用於身分盜竊、保險詐欺、處方詐欺 |
| **舊系統** |許多醫院使用舊的、不安全的系統 |
| **工作壓力** |醫院必須24/7運營，很難「停機」修補錯誤 |

## 2. 什麼是受保護的健康資訊 (PHI)？

### 2.1。 PHI 的定義

**受保護的健康資訊 (PHI)** 是與以下相關的任何資訊：

1. **個人的健康狀況**（過去、現在或未來）
2. **提供個人醫療服務**
3. **付款**醫療服務

並且可以**識別**該人。

### 2.2。 18 個 HIPAA 標識符

HIPAA 確定了 18 種需要保護的身份資訊：

| ＃|標識符|範例|
|---|-----------|--------|
| 1 |名稱 |阮文A |
| 2 |地址（比省/市更詳細） | 123 Nguyen Hue, 第 1 區, 胡志明市 |
| 3 |日期（年份除外）相關 |出生日期、入院日期、出院日期 |
| 4 |電話號碼 | 0901234567 |
| 5 |傳真號碼 | (028) 1234567 |
| 6 |電子郵件 | <patient@email.com> |
| 7 |社會保險/健康保險號碼 | HC4012345678 |
| 8 |病歷號| MRN-2026-001234 |
| 9 |保險受益人號碼 | BH-2026-5678 |
| 10 | 10帳號 | 1234567890 |
| 11 | 11許可證/證書編號 | CCCD：001234567890 |
| 12 | 12車牌| 51A-12345 |
| 13 |設備序號 |心律調節器 SN：ABC123 |
| 14 | 14網址 |病人入口網站.hospital.vn/病人/123 |
| 15 | 15 IP 位址 | 192.168.1.100 |
| 16 | 16生物辨識標識符 |指紋、人臉|
| 17 | 17肖像照片 |病人照片|
| 18 | 18任何唯一識別碼 |內部病患代碼 |

### 2.3。電子 PHI (ePHI)

**ePHI** 是以電子方式建立、儲存、傳輸或接收的 PHI。在微服務系統中，大多數 PHI 以 ePHI 形式存在：

- PostgreSQL資料庫中的數據
- API請求/回應包含病患訊息
- Kafka 主題中的消息
- 在Redis中快取條目
- 日誌檔案包含病患標識符
- 備份文件

## 3. HIPAA - 美國健康資訊隱私法案

### 3.1。健康保險流通與責任法案 (HIPAA) 概述

**健康保險流通與責任法案 (HIPAA)** 於 1996 年頒布，是世界上應用最廣泛的健康保障標準。雖然它是美國法律，但 HIPAA 已成為醫療資料安全的**國際基準**。

### 3.2。 HIPAA 隱私規則

隱私規則規定了誰可以存取 PHI 以及在什麼條件下：

- **最低必要標準**：僅存取工作所需的最低數量的 PHI
- **病人權利**：病人有權檢視、複製和要求修改 PHI
- **授權**：大多數 PHI 共享情況都需要病人書面同意
- **治療、付款、手術（TPO）**：3種情況允許未經授權使用PHI

### 3.3。 HIPAA 安全規則

安全規則設定了 ePHI 的安全要求，分為 3 種保護措施：

#### 行政保障

- 安全管理流程（風險分析、風險管理）
- 指定的安全責任（安全官）
- 勞動力安全（授權/監督、通關程序）
- 資訊存取管理（存取授權、存取建立）
- 安全意識培訓
- 安全事故處理程序
- 緊急應變計畫（資料備份、災難復原、緊急模式）
- 評估（定期安全評估）

#### 物理保障

- 設施門禁控制
- 工作站使用和安全
- 設備和媒體控制

#### 技術保障（本系列的重點）

|類別 |控制|
|----------|----------|
| **存取控制** |唯一使用者識別（必要）、緊急存取程序（必要）、自動登出（可尋址）、加密和解密（可尋址）|
| **稽核控制** |用於記錄和檢查 ePHI 存取的硬體、軟體和程式機制（必要）|
| **誠信** |驗證 ePHI 的機制（可尋址）|
| **身份驗證** |個人或實體身份驗證（必需）|
| **傳輸安全性** |完整性控制（可尋址）、加密（可尋址）|

> **注意**：「必需」= 需要實施。 「可尋址」= 必須在合理的情況下進行評估和實施，或記錄未實施的原因。

### 3.4。 HIPAA 違規通知規則

當發生涉及 PHI 的資料外洩時：

- **個人通知**：在 **60 天內通知每個受影響的個人**
- **媒體通知**：如果違規影響一個州/司法管轄區超過 500 人
- **HHS 通知**：向衛生與公共服務部報告
- **處罰**：每次違規罰款 100 至 50,000 美元，每個類別每年最高 150 萬美元

## 4. HL7 FHIR 安全

### 4.1。什麼是 FHIR？

**快速醫療保健互通性資源 (FHIR)** 是 HL7 International 透過 API 交換醫療保健資料的標準。 FHIR 使用 RESTful API、JSON/XML 和 OAuth2 — 非常適合微服務架構。

### 4.2。 FHIR 安全框架

FHIR 定義安全元件：

![FHIR 架構中的安全層 — 從通訊安全性到同意管理](/storage/uploads/2026/04/healthcare-fhir-security-layers.webp)

- **通訊安全**：HTTPS/TLS
- **身份驗證**：OAuth2、FHIR 上的 SMART
- **授權**：範圍、同意
- **審計**：審計事件資源
- **數位簽章**：出處
- **同意管理**：同意資源

### 4.3。 FHIR 上的智能

**SMART（可替代醫療應用程序，可重複使用技術）**是一個允許第三方應用程式安全存取醫療資料的框架：

```
Patient/Clinician → SMART App → Authorization Server (Keycloak)
                                        ↓
                               FHIR Resource Server (Quarkus)
                                        ↓
                               Database (PostgreSQL)
```

- **EHR 啟動**：應用程式從 EHR 內部啟動，接收情境（病患、遭遇）
- **獨立啟動**：應用程式獨立運行，使用者選擇患者
- **後端服務**：服務到服務授權（無使用者互動）

## 5. 越南網路安全與資料保護法

### 5.1。 2018 年網路安全法（第 24/2018/QH14 號法律）

有關醫療數據的要點：

- **第26條**：為越南用戶資料收集和利用服務在越南儲存資料的要求
- **第十六條**：防範與處理違反網路安全行為
- **第17條**：預防及打擊網路攻擊

### 5.2。關於個人資料保護的第 13/2023/ND-CP 號法令

該法令自 2023 年 7 月 1 日起生效，直接適用於醫療資料：

- **敏感個人資料**（第 2 條）：包含有關健康、性生活、基因、生物辨識的數據
- **同意處理**（第 11 條）：必須得到資料主體的明確同意
- **主體的權利**（第9條）：知情權、同意權、存取權、撤回同意權、刪除權
- **影響評估**（第24條）：強制實施個人資料處理影響評估
- **跨境資料傳輸**（第25條）：必須準備影響評估文件

### 5.3。 46/2018/TT-BYT 號通知

電子病歷規定：

- 電子病歷需要數位簽名
- 安全和存取授權規定
- 需要儲存和備份

## 6. 安全框架與標準

### 6.1。 NIST 網路安全框架

![NIST 網路安全框架生命週期 — 5 個功能：辨識、保護、偵測、回應、復原](/storage/uploads/2026/04/healthcare-nist-csf-framework.webp)

- **識別**：資產管理、風險評估
- **保護**：存取控制、資料安全、培訓
- **偵測**：異常、監控、偵測過程
- **回應**：回應計畫、溝通、緩解
- **恢復**：復原計畫、改進、溝通

### 6.2。 ISO 27799 - 健康資訊安全

ISO 27799 提供了醫療保健產業實施 ISO 27001/27002 的指南：

- **針對醫療保健的額外控制**
- **基於臨床角色的存取控制**
- **病患資料的同意管理**
- 所有 PHI 存取的**審計追蹤**

### 6.3。 HITRUST CSF

**健康資訊信任聯盟通用安全框架**包含以下標準：

- 健康保險流通與責任法案
- ISO 27001/27002
- NIST SP 800-53
- PCI DSS
- 科比特

## 7. 將標準對應到技術堆疊中

|安全需求| HIPAA 參考 |實施|
|--------------------|-----------------|----------------|
|唯一的使用者ID | §164.312(a)(2)(i) | Keycloak 使用者管理 |
|緊急通道 | §164.312(a)(2)(ii) | Keycloak 打破玻璃流程 |
|自動登出 | §164.312(a)(2)(iii) | Keycloak 會話逾時 |
|加密 | §164.312(a)(2)(iv) | §164.312(a)(2)(iv) | PostgreSQL TDE + pgcrypto | PostgreSQL TDE + pgcrypto |
|稽核控制| §164.312(b) | pgAudit + OpenTelemetry | pgAudit + OpenTelemetry
|誠信| §164.312(c)(1) |數位簽章、校驗和|
|認證| §164.312(d) | Keycloak MFA/金鑰 |
|傳輸安全 | §164.312(e)(1) | TLS 1.3 + mTLS |

## 8. 總結

在本課中，我們學習了：

- 什麼是 **PHI/ePHI** 以及為什麼它需要特殊保護？
- **HIPAA** 有 3 條主要規則：隱私、安全、違規通知
- 用於醫療保健 API 的 **HL7 FHIR 安全性** 和 **FHIR 上的 SMART**
- **越南法律**：2018 年網路安全法、第 13/2023 號法令、第 46/2018 號通知
- **安全框架**：NIST CSF、ISO 27799、HITRUST CSF
- **將**安全標準對應到 Quarkus、PostgreSQL、Keycloak

## 練習

1. 列出您的 HIS/EMR 系統中的所有類型數據，並對 PHI 進行分類
2. 確定目前系統滿足多少%的HIPAA技術保障
3.閱讀第13/2023號法令並將需求對應到微服務系統中

---

---

<!-- SERIES-NAV:START -->
**下一篇文章：** [第 2 課：使用 Quarkus Stack 實現醫療保健的安全微服務架構](/series/bao-mat-du-lieu-y-te-cho-microservices/bai-2-kien-truc-microservices-an-toan-cho-y-te) ▶
<!-- SERIES-NAV:END -->
