---
id: 019f1a00-a110-7b01-e001-omopcdm54010
title: 'Lesson 10: MEASUREMENT — Testing & Measurement'
slug: bai-10-measurement-xet-nghiem-do-luong
description: >-
  Record test results, vital signs, and clinical measurements. value_as_number /
  value_as_concept_id, operator_concept_id, unit_concept_id, range_low /
  range_high, LOINC vocabulary, measurement_event_id new CDM 5.4.
duration_minutes: 65
is_free: true
video_url: null
sort_order: 10
section_title: 'Part 3: Key clinical events'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: OMOP CDM 5.4 for Beginners — Understand A to Z
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop10" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop10)"/>
  <g>
    <circle cx="670" cy="85" r="20" fill="#818cf8" opacity="0.12"/>
    <circle cx="750" cy="115" r="28" fill="#818cf8" opacity="0.09"/>
    <circle cx="830" cy="95" r="35" fill="#818cf8" opacity="0.06"/>
    <circle cx="920" cy="155" r="22" fill="#818cf8" opacity="0.10"/>
    <line x1="610" y1="165" x2="1100" y2="245" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="130" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Architecture — Lesson 10</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">MEASUREMENT</tspan>
    <tspan x="60" dy="42">Testing & Measurement</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 for Beginners — Understand A to Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 3: Key clinical events</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Dashboard of medical tests and measurements](/storage/uploads/2026/04/omop-cdm-bai10-measurement-lab.webp)

## Introduction

**MEASUREMENT** is a record of all laboratory results, vital signs, and clinical measurements — any data that has a **measurable value** (number or category). This is the largest table in most OMOP databases, usually accounting for >50% of the total records because each test creates many lines (eg: blood test table with 20 indicators = 20 records).

---

## 1. Table structure

| Column | Type | Required | Description |
|-----|-------|----------|-------|
| `measurement_id` | INTEGER | ✅ PK | Unique ID |
| `person_id` | INTEGER | ✅ FK | Patients |
| `measurement_concept_id` | INTEGER | ✅ | Standard Concept (LOINC) |
| `measurement_date` | DATE | ✅ | Test date |
| `measurement_datetime` | DATETIME | | Date and time |
| `measurement_time` | VARCHAR(10) | | Now (legacy) |
| `measurement_type_concept_id` | INTEGER | ✅ | Data source |
| `operator_concept_id` | INTEGER | | Operator (<, >, =, <=, >=) |
| `value_as_number` | FLOAT | | Numeric value |
| `value_as_concept_id` | INTEGER | | Category Value |
| `unit_concept_id` | INTEGER | | Unit (UCUM) |
| `range_low` | FLOAT | | Lower limit of normal |
| `range_high` | FLOAT | | Normal upper limit |
| `provider_id` | INTEGER | FK | Doctor ordered |
| `visit_occurrence_id` | INTEGER | FK | Related Visit |
| `visit_detail_id` | INTEGER | FK | Visit details |
| `measurement_source_value` | VARCHAR(50) | | Original test code |
| `measurement_source_concept_id` | INTEGER | | Original concept |
| `unit_source_value` | VARCHAR(50) | | Original unit |
| `unit_source_concept_id` | INTEGER | | Original unit concept |
| `value_source_value` | VARCHAR(50) | | Original value |
| `measurement_event_id` | BIGINT | | ⭐ New CDM 5.4 |
| `meas_event_field_concept_id` | INTEGER | | ⭐ New CDM 5.4 |

---

## 2. value_as_number vs value_as_concept_id

### 2.1. NUMBER Result → value_as_number

```sql
-- Glucose máu: 6.5 mmol/L
INSERT INTO measurement VALUES (
    110001, 100001, 3004501,         -- LOINC: Glucose [Mass/volume] in Blood
    '2024-06-15', NULL, NULL,
    32817,                            -- EHR
    4172703,                          -- = (equals)
    6.5,                              -- value_as_number
    NULL,                             -- no concept value
    8753,                             -- UCUM: mmol/L
    3.9, 6.1,                         -- range: 3.9-6.1
    5001, 50001, NULL,
    'GLU', 0, 'mmol/L', 0,
    '6.5', NULL, NULL
);
```

### 2.2. Result CATEGORY → value_as_concept_id

```sql
-- Xét nghiệm nhóm máu: O
INSERT INTO measurement VALUES (
    110002, 100001, 3003694,         -- LOINC: ABO group [Type] in Blood
    '2024-06-15', NULL, NULL,
    32817,                            -- EHR
    NULL,                             -- no operator
    NULL,                             -- no numeric value
    36308332,                         -- Concept: Blood group O
    NULL,                             -- no unit
    NULL, NULL,                       -- no range
    5001, 50001, NULL,
    'BLOOD_TYPE', 0, NULL, 0,
    'O', NULL, NULL
);
```

### 2.3. Selection rules

| Results | value_as_number | value_as_concept_id |
|--------|----------------|-------------------|
| "6.5 mmol/L" | 6.5 | NULL |
| "Positive" | NULL | 4181412 (Positive) |
| "Negative" | NULL | 4132135 (Negative) |
| "Blood type O" | NULL | 36308332 |
| "> 100" | 100 | NULL + operator = > |
| "Normal" | NULL | 4069590 (Normal) |

---

## 3. operator_concept_id — Comparison operator

Used when the result is incorrect (eg: "< 0.5", "> 100").

| Concept ID | Operator | Meaning |
|-----------|---------|---------|
| 4171756 | < | Lower |
| 4171754 | <= | Less than or equal to |
| 4172703 | = | Equals (default) |
| 4172704 | >= | Higher or equal to |
| 4172702 | > | Higher |

```sql
-- Kết quả HBsAg: < 0.05 (dưới ngưỡng phát hiện)
INSERT INTO measurement (
    measurement_id, person_id, measurement_concept_id,
    measurement_date, measurement_type_concept_id,
    operator_concept_id, value_as_number,
    unit_concept_id, measurement_source_value
) VALUES (
    110003, 100001, 3013721,         -- LOINC: HBsAg
    '2024-06-15', 32817,
    4171756,                          -- operator: <
    0.05,                             -- value
    8647,                             -- IU/mL
    'HBSAG'
);
```

---

## 4. LOINC — Vocabulary test

### 4.1. LOINC structure

```
LOINC Code = Component : Property : Time : System : Scale : Method
VD: 2345-7 = Glucose : MCnc : Pt : Ser/Plas : Qn

  Component  = Glucose         (đo gì)
  Property   = MCnc            (mass concentration)
  Time       = Pt              (point in time)
  System     = Ser/Plas        (huyết thanh/huyết tương)
  Scale      = Qn              (quantitative - số)
```

### 4.2. LOINC is popular

| LOINC Code | Concept ID | Name | VN |
|-----------|-----------|-----|-----|
| 2345-7 | 3004501 | Glucose [Mass/volume] in Serum | Blood sugar |
| 4548-4 | 3034639 | HbA1c | HbA1c |
| 2160-0 | 3016723 | Creatinine in Serum | Blood creatinine |
| 6768-6 | 3006923 | ALT in Serum | SGPT |
| 33914-3 | 3027018 | GFR estimated | eGFR |
| 718-7 | 3000963 | Hemoglobin | Hemoglobin |
| 26515-7 | 3010813 | Platelets | Platelets |
| 2093-3 | 3027114 | Total Cholesterol | Total cholesterol |

---

## 5. unit_concept_id — UCUM unit

| Concept ID | UCUM Code | Unit |
|-----------|----------|-------|
| 8840 | mg/dL | Milligrams per deciliter |
| 8753 | mmol/L | Millimoles per liter |
| 8647 | IU/mL | International units per milliliter |
| 8554 | % | Percent |
| 9529 | kg/m2 | BMI |
| 8876 | mm[Hg] | Millimeters mercury |
| 8582 | /uL | Per microliter (blood cells) |
| 8845 | mg/L | Milligrams per liter |

> **Important:** Same test but different units → different value. For example: Glucose 100 mg/dL = 5.6 mmol/L. ETL must standardize units!

---

## 6. measurement_event_id — New to CDM 5.4

Allows linking measurement to any other event.

```
  ┌──────────────────────────────┐
  │     MEASUREMENT              │
  │  "Lab: BUN = 35 mg/dL"      │
  │  measurement_event_id = 70001│
  │  meas_event_field_concept_id │
  │  = 1147127                   │──→ condition_occurrence
  │     (condition_occurrence_id)│     .condition_occurrence_id
  └──────────────────────────────┘     = 70001
```

Application: Associate a test with the specific diagnosis or procedure that requested that test.

```sql
-- Xét nghiệm BUN liên quan đến chẩn đoán suy thận
INSERT INTO measurement (
    measurement_id, person_id, measurement_concept_id,
    measurement_date, measurement_type_concept_id,
    value_as_number, unit_concept_id,
    measurement_event_id,
    meas_event_field_concept_id
) VALUES (
    110010, 100001, 3013682,         -- LOINC: BUN
    '2024-06-15', 32817,
    35, 8840,                         -- 35 mg/dL
    70001,                            -- Liên kết condition_occurrence_id = 70001
    1147127                           -- Field = condition_occurrence.condition_occurrence_id
);
```

---

## 7. ETL tests VN

### 7.1. Common problem

| Problem | Solution |
|--------|-----------|
| BV internal examination code | Map via SOURCE_TO_CONCEPT_MAP → LOINC |
| Text result "Positive" | Map to value_as_concept_id |
| Results"< 0.5" | Split operator + value_as_number |
| Non-standard units | Map of UCUM |
| Range varies by lab | Get range from machine/lab, enter range_low/range_high |
| Test table of 20 indicators = 1 line | Separated into 20 measurement records |

### 7.2. SQL ETL

```sql
-- Mỗi chỉ số xét nghiệm = 1 record MEASUREMENT
SELECT
    ROW_NUMBER() OVER() AS measurement_id,
    pm.person_id,
    COALESCE(stcm.target_concept_id, 0) AS measurement_concept_id,
    xn.ngay_xetnghiem AS measurement_date,
    32817 AS measurement_type_concept_id,
    -- Parse operator từ giá trị gốc
    CASE
        WHEN xn.gia_tri LIKE '<%' THEN 4171756    -- <
        WHEN xn.gia_tri LIKE '>%' THEN 4172702 -- >
        ELSE 4172703 -- =
    END AS operator_concept_id,
    -- Parse number from value
    CASE
        WHEN xn.price ~ '^[<>]?[0-9.]+'
        THEN REGEXP_REPLACE(xn.value, '[^0-9.]', '', 'g')::FLOAT
        ELSE NULL
    END AS value_as_number,
    -- Category results
    CASE xn.value
        WHEN 'Positive' THEN 4181412 -- Positive
        WHEN 'Negative' THEN 4132135 -- Negative
        WHEN 'Normal' THEN 4069590 -- Normal
        ELSE NULL
    END AS value_as_concept_id,
    COALESCE(u.target_concept_id, 0) AS unit_concept_id,
    xn.gioi_han_duoi AS range_low,
    xn.gioi_han_tren AS range_high,
    xn.ma_xetnghiem AS measurement_source_value,
    xn.don_vi_goc AS unit_source_value,
    xn.value AS value_source_value
FROM xetnghiem_his xn
JOIN person_mapping pm ON xn.ma_bn = pm.source_id
LEFT JOIN source_to_concept_map stcm
    ON xn.ma_xetnghiem = stcm.source_code
    AND stcm.source_vocabulary_id = 'VN_LAB'
LEFT JOIN source_to_concept_map u
    ON xn.don_vi_goc = u.source_code
    AND u.source_vocabulary_id = 'VN_UNIT';
```

---

## 8. Vital Signs in MEASUREMENT

| Vital signs | LOINC | Concept ID | Unit |
|-----------|-------|-----------|--------|
| Systolic blood pressure | 8480-6 | 3004249 | mmHg |
| Diastolic blood pressure | 8462-4 | 3012888 | mmHg |
| Heart rate | 8867-4 | 3027018 | /min |
| Temperature | 8310-5 | 3020891 | °C |
| SpO2 | 59408-5 | 40762499 | % |
| Weight | 29463-7 | 3025315 | kg |
| Height | 8302-2 | 3036277 | cm |
| BMI | 39156-5 | 3038553 | kg/m² |

```sql
-- Record vital signs: BP 130/85, NT 80, Temperature 37.2, SpO2 97%
INSERT INTO measurement (measurement_id, person_id, measurement_concept_id,
    measurement_date, measurement_type_concept_id,
    value_as_number, unit_concept_id, measurement_source_value)
VALUES
    (120001, 100001, 3004249, '2024-06-15', 32817, 130, 8876, 'SBP'),
    (120002, 100001, 3012888, '2024-06-15', 32817, 85, 8876, 'DBP'),
    (120003, 100001, 3027018, '2024-06-15', 32817, 80, 8541, 'HR'),
    (120004, 100001, 3020891, '2024-06-15', 32817, 37.2, 586323, 'TEMP'),
    (120005, 100001, 40762499, '2024-06-15', 32817, 97, 8554, 'SPO2');
```

---

## 9. SQL analysis

```sql
-- Distribution of HbA1c in the population
SELECT
    CASE
        WHEN m.value_as_number < 5.7 THEN 'Bình thường (<5.7%)'
        WHEN m.value_as_number BETWEEN 5.7 AND 6.4 THEN 'Tiền ĐTĐ (5.7-6.4%)'
        WHEN m.value_as_number >= 6.5 THEN 'Diabetes (>=6.5%)'
    END AS hba1c_group,
    COUNT(DISTINCT m.person_id) AS patients,
    ROUND(AVG(m.value_as_number), 2) AS avg_hba1c
FROM measurement m
WHERE m.measurement_concept_id = 3034639 -- HbA1c
  AND m.value_as_number IS NOT NULL
  AND m.value_as_number BETWEEN 2 AND 20 -- type outliers
GROUP BY hba1c_group
ORDER BY hba1c_group;

-- HbA1c trend over time (1 patient)
SELECT
    m.measurement_date,
    m.value_as_number AS hba1c,
    CASE
        WHEN m.value_as_number < 7.0 THEN '✅ Kiểm soát tốt'
        ELSE '⚠️ Cần cải thiện'
    END AS status
FROM measurement m
WHERE m.person_id = 100001
  AND m.measurement_concept_id = 3034639
ORDER BY m.measurement_date;

-- Xét nghiệm bất thường (ngoài range)
SELECT
    c.concept_name AS test_name,
    COUNT(*) AS abnormal_count,
    COUNT(DISTINCT m.person_id) AS patients
FROM measurement m
JOIN concept c ON m.measurement_concept_id = c.concept_id
WHERE m.value_as_number IS NOT NULL
  AND (m.value_as_number < m.range_low
       OR m.value_as_number > m.range_high)
  AND m.range_low IS NOT NULL
  AND m.range_high IS NOT NULL
GROUP BY c.concept_name
ORDER BY abnormal_count DESC
LIMIT 10;
```

---

## Summary

1. **MEASUREMENT** = test + vital signs + all measured values
2. Two result types: **value_as_number** (number) or **value_as_concept_id** (category)
3. **operator_concept_id** gives the result "<" or ">"
4. **unit_concept_id** uses UCUM, **measurement_concept_id** uses LOINC
5. **range_low / range_high** for normal reference value
6. CDM 5.4: **measurement_event_id** associates a test with another event

**Next article:** OBSERVATION — clinical events not covered by specialized tables.

---

## References

- [OMOP CDM 5.4 — MEASUREMENT](https://ohdsi.github.io/CommonDataModel/cdm54.html#MEASUREMENT)
- [LOINC.org](https://loinc.org/)
- [UCUM — Unified Code for Units of Measure](https://ucum.org/)
