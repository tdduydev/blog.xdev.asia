---
id: 019f1a00-a117-7b01-e001-omopcdm54017
title: 第 17 課：LOCATION、CARE_SITE 和 PROVIDER — 醫療設施系統
slug: bai-17-location-care-site-provider
description: 三個衛生系統資料表：LOCATION（地理位置）、CARE_SITE（醫療機構）、PROVIDER（醫生、醫務人員）以及它們如何連結到臨床資料。
duration_minutes: 45
is_free: true
video_url: null
sort_order: 17
section_title: 第 6 部分：衛生系統、經濟及衍生要素
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: 初學者的 OMOP CDM 5.4 — 從頭到尾了解
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: zh-tw
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop17" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop17)"/>
  <g>
    <circle cx="750" cy="80" r="24" fill="#818cf8" opacity="0.12"/>
    <circle cx="850" cy="120" r="20" fill="#818cf8" opacity="0.08"/>
    <circle cx="680" cy="150" r="18" fill="#818cf8" opacity="0.07"/>
    <line x1="600" y1="100" x2="1100" y2="260" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="130" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ 建築 — 第 17 課</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">位置、CARE_SITE &</tspan>
    <tspan x="60" dy="42">PROVIDER — 衛生設施系統</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">初學者的 OMOP CDM 5.4 — 從頭到尾了解</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">第 6 部分：衛生系統、經濟及衍生要素</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">亞洲開發網</text>
</svg>

![健康系統層級結構：位置 → 照護地點 → 提供者](/storage/uploads/2026/04/omop-cdm-bai17-health-system.webp)

## 簡介

**健康系統資料**組包括 3 個表格，描述*何處*和*誰*提供健康服務。在越南的醫院中，這裡儲存有關醫療機構（中央、省、區）、科室和負責醫生的資訊。

---

## 1.LOCATION－地理位置

### 1.1。表結構

|專欄 |類型 |必填 |說明 |
|-----|--------|----------|--------|
| `location_id` |整數| ✅ PK |唯一ID |
| `address_1` | VARCHAR(50) | |位址行 1 |
| `address_2` | VARCHAR(50) | |第 2 行位址 |
| `city` | VARCHAR(50) | |市/區/區|
| `state` | VARCHAR(2) | VARCHAR(2) | |州/省（美國：2 個字元）|
| `zip` | VARCHAR(9) | VARCHAR(9) | |郵遞區號 |
| `county` | VARCHAR(20) | |縣|
| `location_source_value` | VARCHAR(50) | |原始碼 |
| `country_concept_id` |整數| | FK → 概念（國家）|
| `country_source_value` | VARCHAR(80) | |來源國家代碼 |
| `latitude` |浮動| |緯度 |
| `longitude` |浮動| |經度 |

### 1.2。越南 ETL

```sql
INSERT INTO location (
    location_id,
    address_1,
    city,
    state,
    zip,
    country_concept_id,
    country_source_value,
    latitude,
    longitude
) VALUES (
    1001,
    '78 Giải Phóng',
    'Hai Bà Trưng',
    'HN',            -- Mã tỉnh 2 ký tự
    '100000',        -- Mã bưu điện VN
    4330442,         -- concept_id cho 'Viet Nam'
    'VN',
    21.0024,         -- Latitude
    105.8432         -- Longitude
);
```

> **注意越南：** 學校 `state` 僅 2 個字元 — 使用縮短的省份代碼（HN、HCM、DN...）。
> 如果需要完整，請使用 `location_source_value` 拯救「河內」。

---

## 2. CARE_SITE — 醫療檢查與治療設施

### 2.1。表結構

|專欄 |類型 |必填 |說明 |
|-----|--------|----------|--------|
| `care_site_id` |整數| ✅ PK |唯一ID |
| `care_site_name` | VARCHAR(255) | |設施名稱 |
| `place_of_service_concept_id` |整數| |設施類型（FK → 概念）|
| `location_id` |整數| | FK → 地點 |
| `care_site_source_value` | VARCHAR(50) | |原始碼 |
| `place_of_service_source_value` | VARCHAR(50) | |原始碼 |

### 2.2。醫療機構類型 (place_of_service_concept_id)

|概念 ID |概念名稱|越南範例 |
|------------|-------------|------------|
| 8717 |住院醫院|內科 |
| 8756 |門診醫院|門診|
| 8940 |辦公室 |私人診所 |
| 8883 |熟練的護理設施|護理設施|
| 8716 |家庭健康機構 |家庭護理 |
| 8761 |急診室|急診室|
| 581382 |遠距醫療|遠距檢查 |

### 2.3。來自越南醫院數據的 ETL 範例

```sql
-- Bệnh viện Bạch Mai
INSERT INTO care_site VALUES (
    2001,                        -- care_site_id
    'Bệnh viện Bạch Mai',       -- care_site_name
    8717,                        -- Inpatient Hospital
    1001,                        -- location_id (78 GP, HBT)
    'BV-BACHMAI-001',            -- care_site_source_value
    'TUYEN_TW'                   -- place_of_service_source_value
);

-- Khoa Nội tiêu hóa - Bạch Mai
INSERT INTO care_site VALUES (
    2002,
    'Khoa Nội Tiêu hóa - BV Bạch Mai',
    8756,                        -- Outpatient Hospital
    1001,                        -- cùng location
    'BV-BM-NOI-TIEUHOA',
    'KHOA_NOITRU'
);
```

### 2.4。越南分散模式

```
  CARE_SITE (Tuyến TW)
  ├── BV Bạch Mai (care_site_id = 2001)
  │   ├── Khoa Nội Tiêu hóa (2002)
  │   ├── Khoa Tim mạch (2003)
  │   └── Khoa Cấp cứu (2004)
  │
  CARE_SITE (Tuyến Tỉnh)
  ├── BV Đa khoa Hà Nội (2010)
  │   ├── Khoa Ngoại (2011)
  │   └── Khoa Sản (2012)
  │
  CARE_SITE (Tuyến Huyện)
  └── TTYT Hoàng Mai (2020)
      └── Phòng khám đa khoa (2021)
```

> **注意：** OMOP CDM 沒有 CARE_SITE 的父子結構。如果需要層次結構，請使用命名約定或新增單獨的對應表。

---

## 3. 提供者 — 醫護人員

### 3.1。表結構

|專欄 |類型 |必填 |說明 |
|-----|--------|----------|--------|
| `provider_id` |整數| ✅ PK |唯一ID |
| `provider_name` | VARCHAR(255) | |姓名（建議去識別化）|
| `npi` | VARCHAR(20) | |國家提供者識別碼（美國）|
| `dea` | VARCHAR(20) | | DEA 號碼（美國）|
| `specialty_concept_id` |整數| |專業（FK → 概念）|
| `care_site_id` |整數| | FK → CARE_SITE |
| `year_of_birth` |整數| |出生年份 |
| `gender_concept_id` |整數| |性別 |
| `provider_source_value` | VARCHAR(50) | |原始碼 |
| `specialty_source_value` | VARCHAR(50) | |源碼專業代碼|
| `specialty_source_concept_id` |整數| | FK → 概念 |
| `gender_source_value` | VARCHAR(50) | |來源性別 |
| `gender_source_concept_id` |整數| | FK → 概念 |

### 3.2。 OMOP專業

```sql
-- Tìm specialty concepts phổ biến
SELECT
    c.concept_id,
    c.concept_name,
    c.vocabulary_id
FROM concept c
WHERE c.domain_id = 'Provider'
  AND c.standard_concept = 'S'
  AND c.concept_name LIKE '%Cardiol%'
ORDER BY c.concept_name;
-- 38004451 | Cardiology | Medicare Specialty
```

### 3.3。越南醫生的 ETL

```sql
INSERT INTO provider (
    provider_id,
    provider_name,
    specialty_concept_id,
    care_site_id,
    provider_source_value,
    specialty_source_value
) VALUES (
    3001,
    NULL,                    -- De-identify: không lưu tên
    38004451,                -- Cardiology
    2003,                    -- Khoa Tim mạch - BV Bạch Mai
    'BS-BM-TM-001',         -- Mã bác sĩ nội bộ
    'TIM_MACH'               -- Chuyên khoa nguồn
);
```

> **去識別化：**在越南，研究資料通常需要對醫生進行匿名化處理。套裝 `provider_name = NULL` 並保持 `provider_source_value` 加密。

---

## 4. Health System 3表關係

```
  ┌──────────┐
  │ LOCATION │  ← Địa lý (tỉnh, thành phố, tọa độ)
  │ 1001     │
  └────┬─────┘
       │ location_id
       ↓
  ┌──────────┐
  │CARE_SITE │  ← Cơ sở y tế (BV, Khoa)
  │ 2001     │
  └────┬─────┘
       │ care_site_id
       ↓
  ┌──────────┐
  │ PROVIDER │  ← Bác sĩ, nhân viên y tế
  │ 3001     │
  └──────────┘

  Ba bảng này được tham chiếu từ:
  ┌───────────────────────┐
  │ PERSON               │ ← location_id, care_site_id, provider_id
  │ VISIT_OCCURRENCE     │ ← care_site_id, provider_id
  │ CONDITION_OCCURRENCE │ ← provider_id
  │ DRUG_EXPOSURE        │ ← provider_id
  │ ... (tất cả bảng     │
  │      clinical)       │
  └───────────────────────┘
```

---

## 5. 分析查詢

### 5.1。按醫療機構劃分的病患分佈

```sql
SELECT
    cs.care_site_name,
    c.concept_name AS facility_type,
    COUNT(DISTINCT vo.person_id) AS patient_count,
    COUNT(vo.visit_occurrence_id) AS visit_count
FROM visit_occurrence vo
JOIN care_site cs ON vo.care_site_id = cs.care_site_id
JOIN concept c ON cs.place_of_service_concept_id = c.concept_id
GROUP BY cs.care_site_name, c.concept_name
ORDER BY visit_count DESC;
```

### 5.2。按醫師專業分析

```sql
SELECT
    c_spec.concept_name AS specialty,
    COUNT(DISTINCT p.provider_id) AS provider_count,
    COUNT(DISTINCT co.person_id) AS patient_count,
    COUNT(*) AS diagnosis_count
FROM condition_occurrence co
JOIN provider p ON co.provider_id = p.provider_id
JOIN concept c_spec ON p.specialty_concept_id = c_spec.concept_id
GROUP BY c_spec.concept_name
ORDER BY diagnosis_count DESC
LIMIT 10;
```

### 5.3。患者地理分佈（越南）

```sql
SELECT
    l.state AS province_code,
    l.city,
    COUNT(DISTINCT per.person_id) AS patient_count
FROM person per
JOIN location l ON per.location_id = l.location_id
WHERE l.country_concept_id = 4330442  -- Vietnam
GROUP BY l.state, l.city
ORDER BY patient_count DESC;
```

---

## 總結

1. **LOCATION**：地理位置（VN：2 位省份代碼 + 郵遞區號）
2. **CARE_SITE**：醫療機構 `place_of_service_concept_id` 分類
3. **PROVIDER**：醫護人員，研究中需要去識別化
4. 關係：LOCATION→CARE_SITE→PROVIDER（層級結構）
5.所有臨床表格均被引用 `provider_id` 和 `care_site_id`

**下一篇：** PAYER_PLAN_PERIOD & COST — 醫療和保險費用。

---

## 參考文獻

- [OMOP CDM 5.4 — LOCATION](https://ohdsi.github.io/CommonDataModel/cdm54.html#LOCATION)
- [OMOP CDM 5.4 — CARE_SITE](https://ohdsi.github.io/CommonDataModel/cdm54.html#CARE_SITE)
- [OMOP CDM 5.4 — PROVIDER](https://ohdsi.github.io/CommonDataModel/cdm54.html#PROVIDER)
