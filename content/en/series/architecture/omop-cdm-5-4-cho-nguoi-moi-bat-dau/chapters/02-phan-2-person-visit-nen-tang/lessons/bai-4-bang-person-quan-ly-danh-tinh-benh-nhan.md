---
id: 019f1a00-a104-7b01-e001-omopcdm54004
title: 'Lesson 4: PERSON table — Patient identity management'
slug: bai-4-bang-person-quan-ly-danh-tinh-benh-nhan
description: >-
  PERSON table structure, required fields (person_id, gender_concept_id,
  year_of_birth), demographic data, link with LOCATION and PROVIDER, ETL
  conventions for Vietnamese data.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 4
section_title: 'Part 2: Person & Visit — Data platform'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: OMOP CDM 5.4 for Beginners — Understand A to Z
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: en
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Architecture — Lesson 4</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">PERSON table — Management</tspan>
    <tspan x="60" dy="42">Patient identity</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 for Beginners — Understand A to Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 2: Person & Visit — Data platform</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![PERSON — the heart of OMOP CDM, connecting all clinical panels](/storage/uploads/2026/04/omop-cdm-bai4-person-centric.webp)

## Introduction

**PERSON** is the central table of the entire OMOP CDM — every clinical table references PERSON `person_id`. This is where the patient's demographic information is stored.

Each line in PERSON = **a unique patient** (unique person).

---

## 1. PERSON table structure

### 1.1. Full column list

| Column | Type | Required | Description |
|-----|-------|----------|-------|
| `person_id` | INTEGER | ✅ PK | Unique ID for each patient |
| `gender_concept_id` | INTEGER | ✅ | Gender (Standard Concept) |
| `year_of_birth` | INTEGER | ✅ | Year of birth |
| `month_of_birth` | INTEGER | | Month of birth |
| `day_of_birth` | INTEGER | | Date of birth |
| `birth_datetime` | DATETIME | | Full date and time of birth |
| `race_concept_id` | INTEGER | ✅ | Race (Standard Concept) |
| `ethnicity_concept_id` | INTEGER | ✅ | Ethnicity (Standard Concept) |
| `location_id` | INTEGER | FK | Address (reference LOCATION) |
| `provider_id` | INTEGER | FK | Primary Physician (reference PROVIDER) |
| `care_site_id` | INTEGER | FK | Medical facility (reference CARE_SITE) |
| `person_source_value` | VARCHAR(50) | | Original patient code from HIS |
| `gender_source_value` | VARCHAR(50) | | Original gender (eg: "Nu", "F") |
| `gender_source_concept_id` | INTEGER | | Original Gender ID Concept |
| `race_source_value` | VARCHAR(50) | | Origin Race |
| `race_source_concept_id` | INTEGER | | Origin Race ID Concept |
| `ethnicity_source_value` | VARCHAR(50) | | Ethnic origin |
| `ethnicity_source_concept_id` | INTEGER | | Concept ethnic ID |

### 1.2. Entity-Relationship

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

## 2. Detailed important fields

### 2.1. person_id

- **Type**: INTEGER, Primary Key
- **Rule**: Unique, no change, no clinical significance
- **Not** the original patient code (original patient code stored in `person_source_value`)

```sql
-- ĐÚNG: person_id là số tự tăng hoặc hash
person_id = 100001
person_source_value = 'BN-2024-00123'  -- Mã gốc từ HIS

-- SAI: Không dùng mã gốc làm person_id
-- person_id = 'BN-2024-00123'  ← SAI (phải là INTEGER)
```

### 2.2. gender_concept_id

| Concept ID | Concept Name | Description |
|-----------|--------------|-------|
| 8507 | Male | Male |
| 8532 | Female | Female |
| 8551 | UNKNOWN | Unknown |
| 8521 | OTHER | Other |

```sql
-- Ví dụ ETL cho dữ liệu Việt Nam
CASE
    WHEN gioi_tinh IN ('Nam', 'M', '1') THEN 8507    -- Male
    WHEN gioi_tinh IN ('Nữ', 'Nu', 'F', '2') THEN 8532  -- Female
    ELSE 8551  -- UNKNOWN
END AS gender_concept_id,
gioi_tinh AS gender_source_value
```

### 2.3. year_of_birth, month_of_birth, day_of_birth

- `year_of_birth`: **Required** — if not present, do not load patient
- `month_of_birth`, `day_of_birth`: Optional — set NULL if not present
- `birth_datetime`: Optional — useful for pediatrics (accurate age calculation)

```sql
-- Ví dụ: BN sinh ngày 15/03/1980
year_of_birth  = 1980
month_of_birth = 3
day_of_birth   = 15
birth_datetime = '1980-03-15 00:00:00'
```

### 2.4. race_concept_id and ethnicity_concept_id

These are two schools according to US Census standards. For Vietnam data:

| School | Recommendations for Vietnam |
|--------|-------|
| `race_concept_id` | 8515 (Asian) |
| `race_source_value` | "Kinh", "Tay", "Muong"... |
| `ethnicity_concept_id` | 0 (No matching concepts) |
| `ethnicity_source_value` | Record ethnic origin if any |

> **Note:** `race` and `ethnicity` in OMOP according to American standards (OMB). When ETL VN data, we still have to set the value (use 0 if it cannot be mapped) but keep the original information in `*_source_value`.

---

## 3. Real-life example

### 3.1. Vietnamese patient

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

### 3.2. Basic SQL queries

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

## 4. ETL Conventions

### 4.1. Important rule

| Rules | Details |
|--------|----------|
| **1 person = 1 record** | No duplication, need deduplicate |
| **year_of_birth required** | Ignore patient if there is no year of birth |
| **gender_concept_id required** | Put 8551 (UNKNOWN) if unknown |
| **person_id has no meaning** | Do not use original patient code or ID card/CCCD |
| **Does not store PII directly** | There are no columns for name, ID card, or phone number in PERSON |

### 4.2. De-identification

OMOP CDM **does not have columns for name, ID/CCCD number, phone number**. This is intentional design:

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

> **Note:** `person_source_value` may contain the original patient code (for tracing). Depending on the organization, this value can be hashed or encrypted.

### 4.3. Handling duplicates

When a patient has ≥2 codes in multiple systems:

```
  HIS BV Chợ Rẫy: BN-CR-001   ┐
  HIS BV Bạch Mai: BN-BM-555   ├──→ person_id = 100001
  BHXH: DN-7900123456789        ┘    (1 person duy nhất)
```

ETL needs to perform **Patient Matching** (patient matching) before loading into PERSON.

---

## 5. Relationships with other tables

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

## 6. Common ETL errors

| Error | Consequences | How to fix |
|-----|---------|---------------|
| Duplicate person_id | Overwrite data | Check for unique constraints |
| year_of_birth = NULL | Violation of NOT NULL | Ignore or impute |
| gender_concept_id is wrong | Misgender analysis | Accurate Mapping |
| Put PII in source_value | Violation of de-identification | Hash or remove |
| Do not duplicate | 1 patient becomes many people | Patient matching before ETL |

---

## Summary

1. **PERSON** is the central table — all clinical tables referenced `person_id`
2. **Required fields**: person_id, gender_concept_id, year_of_birth, race_concept_id, ethnicity_concept_id
3. **Does not contain PII** (name, ID card, phone number) — de-identified design
4. **Link**: LOCATION (address), CARE_SITE (facility), PROVIDER (main doctor)
5. **ETL VN**: gender mapping, race = Asian (8515), ethnicity = 0

**Next article:** OBSERVATION_PERIOD — why it's important to know the "monitoring period" and how it affects every analysis.

---

## References

- [OMOP CDM 5.4 — PERSON](https://ohdsi.github.io/CommonDataModel/cdm54.html#PERSON)
- [The Book of OHDSI — Chapter 4.1](https://ohdsi.github.io/TheBookOfOhdsi/CommonDataModel.html)
