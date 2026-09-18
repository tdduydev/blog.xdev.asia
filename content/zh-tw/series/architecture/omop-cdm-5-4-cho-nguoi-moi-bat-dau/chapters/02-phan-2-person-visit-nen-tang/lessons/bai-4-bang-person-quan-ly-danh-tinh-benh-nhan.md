---
id: 019f1a00-a104-7b01-e001-omopcdm54004
title: 第 4 課：PERSON 表 — 病人身分管理
slug: bai-4-bang-person-quan-ly-danh-tinh-benh-nhan
description: >-
  PERSON 表結構、必填欄位（person_id、gender_concept_id、year_of_birth）、人口統計資料、與 LOCATION 和
  PROVIDER 的連結、越南資料的 ETL 約定。
duration_minutes: 60
is_free: true
video_url: null
sort_order: 4
section_title: 第 2 部分：人員與存取 — 資料平台
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初學者的 OMOP CDM 5.4 — 從頭到尾了解
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop04" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop04)"/>
  <g>
    <circle cx="659" cy="87" r="22" fill="#818cf8" opacity="0.12"/>
    <circle cx="718" cy="106" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="777" cy="125" r="36" fill="#818cf8" opacity="0.06"/>
    <circle cx="836" cy="144" r="13" fill="#818cf8" opacity="0.13"/>
    <circle cx="895" cy="163" r="20" fill="#818cf8" opacity="0.1"/>
    <line x1="600" y1="157" x2="1100" y2="237" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 4 課</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">人員表－管理</tspan>
    <tspan x="60" dy="42">患者身份</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初學者的 OMOP CDM 5.4 — 從頭到尾了解</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 2 部分：人員與存取 — 資料平台</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![人員 — OMOP CDM 的核心，連接所有臨床小組](/storage/uploads/2026/04/omop-cdm-bai4-person-centric.webp)

## 簡介

**PERSON** 是整個 OMOP CDM 的中心表 — 每個臨床表都引用 PERSON `person_id`。這是儲存患者人口統計資訊的地方。

PERSON 中的每一行 = **一個獨特的患者**（獨特的人）。

---

## 1. PERSON表結構

### 1.1。完整欄位列表

|專欄 |類型 |必填 |說明 |
|-----|--------|----------|--------|
| `person_id` |整數| ✅ PK |每位患者的唯一 ID |
| `gender_concept_id` |整數| ✅ |性別（標準概念）|
| `year_of_birth` |整數 | ✅ |出生年份 |
| `month_of_birth` |整數| |出生月份 |
| `day_of_birth` |整數 | |出生日期 |
| `birth_datetime` |日期時間 | |完整的出生日期和時間 |
| `race_concept_id` |整數 | ✅ |競賽（標準概念）|
| `ethnicity_concept_id` |整數| ✅ |種族（標準概念）|
| `location_id` |整數|氟克 |地址（參考LOCATION）|
| `provider_id` |整數|氟克 |主治醫師（參考提供者）|
| `care_site_id` |整數|氟克 |醫療機構（參考 CARE_SITE）|
| `person_source_value` | VARCHAR(50) | | HIS 的原始病患代碼 |
| `gender_source_value` | VARCHAR(50) | |原始性別（例如：「Nu」、「F」）|
| `gender_source_concept_id` |整數| |原始性別ID概念|
| `race_source_value` | VARCHAR(50) | |起源種族|
| `race_source_concept_id` |整數| |起源種族ID概念|
| `ethnicity_source_value` | VARCHAR(50) | |民族起源 |
| `ethnicity_source_concept_id` |整數| |概念種族 ID |

### 1.2。實體關係

```
  ┌──────────────┐       ┌──────────────┐       ┌──────────────┐
  │   LOCATION   │←──────│    PERSON    │──────→│   PROVIDER   │
  │ location_id  │       │  person_id   │       │ provider_id  │
  │ address_1    │       │  gender_*    │       │ provider_name│
  │ city         │       │  birth_*     │       │ specialty_*  │
  │ state        │       │  race_*      │       └──────────────┘
  │ zip          │       │  ethnicity_* │              ↑
  │ country_*    │       │  location_id │              │
  └──────────────┘       │  provider_id │       ┌──────┴───────┐
                         │  care_site_id│──────→│  CARE_SITE   │
                         └──────┬───────┘       │ care_site_id │
                                │               │ care_site_name│
                    ┌───────────┼───────────┐   └──────────────┘
                    ↓           ↓           ↓
             VISIT_OCC.    CONDITION    DRUG_EXPOSURE
             OBSERVATION   MEASUREMENT  ... (tất cả clinical)
```

---

## 2.重要字段詳解

### 2.1。人物ID

- **類型**：整數，主鍵
- **規則**：獨特、無變化、無臨床意義
- **不是**原始患者代碼（原始患者代碼儲存在 `person_source_value`）

```sql
-- ĐÚNG: person_id là số tự tăng hoặc hash
person_id = 100001
person_source_value = 'BN-2024-00123'  -- Mã gốc từ HIS

-- SAI: Không dùng mã gốc làm person_id
-- person_id = 'BN-2024-00123'  ← SAI (phải là INTEGER)
```

### 2.2。性別概念 ID

|概念 ID |概念名稱|說明 |
|------------|--------------|--------|
| 8507 | 8507男 |男 |
| 8532 |女|女|
| 8551 |未知 |未知 |
| 8521 |其他|其他|

```sql
-- Ví dụ ETL cho dữ liệu Việt Nam
CASE
    WHEN gioi_tinh IN ('Nam', 'M', '1') THEN 8507    -- Male
    WHEN gioi_tinh IN ('Nữ', 'Nu', 'F', '2') THEN 8532  -- Female
    ELSE 8551  -- UNKNOWN
END AS gender_concept_id,
gioi_tinh AS gender_source_value
```

### 2.3。出生年份、出生月份、出生日期

- `year_of_birth`：**必填** — 若不存在，請勿載入患者
- `month_of_birth`, `day_of_birth`：可選 — 如果不存在則設定 NULL
- `birth_datetime`：可選 — 對兒科有用（準確的年齡計算）

```sql
-- Ví dụ: BN sinh ngày 15/03/1980
year_of_birth  = 1980
month_of_birth = 3
day_of_birth   = 15
birth_datetime = '1980-03-15 00:00:00'
```

### 2.4。 race_concept_id 和ethnicity_concept_id

根據美國人口普查標準，這是兩所學校。對於越南數據：

|學校 |對越南的建議|
|--------|--------|
| `race_concept_id` | 8515（亞洲）|
| `race_source_value` | 「Kinh」、「Tay」、「Muong」... |
| `ethnicity_concept_id` | 0（沒有匹配的概念）|
| `ethnicity_source_value` |記錄種族血統（如果有）|

> **註：** `race` 和 `ethnicity` 根據美國標準 (OMB) 的 OMOP。 ETL VN資料時，我們仍然要設定該值（如果無法映射則使用0）但保留原始訊息 `*_source_value`。

---

## 3. 現實生活中的例子

### 3.1。越南患者

```sql
INSERT INTO person VALUES (
    100001,                    -- person_id
    8532,                      -- gender_concept_id (Female)
    1980,                      -- year_of_birth
    3,                         -- month_of_birth
    15,                        -- day_of_birth
    '1980-03-15 00:00:00',     -- birth_datetime
    8515,                      -- race_concept_id (Asian)
    0,                         -- ethnicity_concept_id (N/A)
    1001,                      -- location_id (→ LOCATION table)
    5001,                      -- provider_id (→ PROVIDER table)
    2001,                      -- care_site_id (→ CARE_SITE table)
    'BN-2024-00123',           -- person_source_value
    'Nữ',                      -- gender_source_value
    0,                         -- gender_source_concept_id
    'Kinh',                    -- race_source_value
    0,                         -- race_source_concept_id
    NULL,                      -- ethnicity_source_value
    0                          -- ethnicity_source_concept_id
);
```

### 3.2。基本 SQL 查詢

```sql
-- Đếm bệnh nhân theo giới tính
SELECT
    c.concept_name AS gender,
    COUNT(*) AS patient_count
FROM person p
JOIN concept c ON p.gender_concept_id = c.concept_id
GROUP BY c.concept_name;

-- Phân bố tuổi
SELECT
    EXTRACT(YEAR FROM CURRENT_DATE) - year_of_birth AS age,
    COUNT(*) AS count
FROM person
GROUP BY 1
ORDER BY 1;

-- Tìm bệnh nhân có dữ liệu gốc
SELECT
    person_id,
    person_source_value AS ma_bn_goc,
    gender_source_value AS gioi_tinh_goc,
    race_source_value AS dan_toc
FROM person
WHERE person_source_value IS NOT NULL
LIMIT 10;
```

---

## 4. ETL 約定

### 4.1。重要規則

|規則|詳情 |
|--------|----------|
| **1 人 = 1 筆記錄** |沒有重複，需要去重 |
| **需要出生年份** |如果沒有出生年份，則忽略病人 |
| **需要gender_concept_id** |如果未知，則輸入 8551（未知）|
| **person_id 沒有意義** |請勿使用原始病患代碼或 ID 卡/CCCD |
| **不直接儲存 PII** | PERSON | 中沒有姓名、身分證或電話號碼欄位。

### 4.2。去識別化

OMOP CDM **沒有姓名、ID/CCCD 號碼、電話號碼** 欄位。這是有意設計的：

```
  HIS gốc (có PII):                    OMOP CDM (de-identified):
  ┌─────────────────────────┐          ┌──────────────────────────┐
  │ ma_bn: BN-2024-00123    │    →     │ person_id: 100001        │
  │ ho_ten: Nguyễn Thị Lan  │    →     │ (không có cột tên!)      │
  │ cmnd: 079123456789      │    →     │ (không có cột CMND!)     │
  │ sdt: 0901234567         │    →     │ (không có cột SĐT!)     │
  │ ngay_sinh: 15/03/1980   │    →     │ year_of_birth: 1980      │
  │ gioi_tinh: Nữ           │    →     │ gender_concept_id: 8532  │
  └─────────────────────────┘          └──────────────────────────┘
```

> **註：** `person_source_value` 可能包含原始患者代碼（用於追蹤）。根據組織的不同，該值可以被散列或加密。

### 4.3。處理重複項

當患者在多個系統中擁有≥2個代碼時：

```
  HIS BV Chợ Rẫy: BN-CR-001   ┐
  HIS BV Bạch Mai: BN-BM-555   ├──→ person_id = 100001
  BHXH: DN-7900123456789        ┘    (1 person duy nhất)
```

ETL在載入到PERSON之前需要執行**Patient Matching**（患者匹配）。

---

## 5.與其他表格的關係

```sql
-- Tất cả dữ liệu lâm sàng của 1 bệnh nhân
SELECT 'Visits' AS data_type, COUNT(*) AS count
FROM visit_occurrence WHERE person_id = 100001
UNION ALL
SELECT 'Conditions', COUNT(*)
FROM condition_occurrence WHERE person_id = 100001
UNION ALL
SELECT 'Drugs', COUNT(*)
FROM drug_exposure WHERE person_id = 100001
UNION ALL
SELECT 'Measurements', COUNT(*)
FROM measurement WHERE person_id = 100001
UNION ALL
SELECT 'Observations', COUNT(*)
FROM observation WHERE person_id = 100001;
```

---

## 6. 常見 ETL 錯誤

|錯誤|後果|如何修復 |
|-----|---------|----------------|
|重複的 person_id |覆蓋資料 |檢查唯一約束 |
|出生年份= NULL |違反 NOT NULL |忽略或歸咎於|
|性別概念 ID 錯誤 |性別錯誤分析|精準測繪|
|將 PII 放入 source_value |違反去識別化規定 |散列或刪除 |
|請勿重複| 1 位病患變成多人 | ETL 前的病患配對 |

---

## 總結

1. **PERSON** 是中心表 - 引用的所有臨床表 `person_id`
2. **必填欄位**：person_id、gender_concept_id、year_of_birth、race_concept_id、ethnicity_concept_id
3. **不包含PII**（姓名、身分證、電話號碼）－去識別化設計
4. **連結**：LOCATION（地址）、CARE_SITE（設施）、PROVIDER（主要醫生）
5. **ETL VN**：性別映射，種族 = 亞洲人 (8515)，民族 = 0

**下一篇文章：** OBSERVATION_PERIOD — 為什麼了解「監測期」很重要以及它如何影響每個分析。

---

## 參考文獻

- [OMOP CDM 5.4 — PERSON](https://ohdsi.github.io/CommonDataModel/cdm54.html#PERSON)
- [The Book of OHDSI — Chapter 4.1](https://ohdsi.github.io/TheBookOfOhdsi/CommonDataModel.html)
