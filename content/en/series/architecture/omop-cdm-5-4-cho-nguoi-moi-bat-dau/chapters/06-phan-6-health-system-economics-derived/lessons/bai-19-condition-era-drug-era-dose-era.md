---
id: 019f1a00-a119-7b01-e001-omopcdm54019
title: 'Lesson 19: CONDITION_ERA, DRUG_ERA & DOSE_ERA — Automatic summary table'
slug: bai-19-condition-era-drug-era-dose-era
description: >-
  Three Derived Elements tables: CONDITION_ERA aggregates consecutive diagnoses,
  DRUG_ERA aggregates medication courses, DOSE_ERA tracks dosages. ERA
  generation algorithm and analytical application.
duration_minutes: 50
is_free: true
video_url: null
sort_order: 19
section_title: 'Part 6: Health System, Economics & Derived Elements'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: OMOP CDM 5.4 for Beginners — Understand A to Z
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop19" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop19)"/>
  <g>
    <circle cx="730" cy="85" r="20" fill="#818cf8" opacity="0.12"/>
    <circle cx="830" cy="115" r="24" fill="#818cf8" opacity="0.08"/>
    <circle cx="910" cy="80" r="16" fill="#818cf8" opacity="0.07"/>
    <line x1="660" y1="130" x2="1100" y2="250" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="130" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Architecture — Lesson 19</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">CONDITION_ERA, DRUG_ERA</tspan>
    <tspan x="60" dy="42">& DOSE_ERA — Summary table</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 for Beginners — Understand A to Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 6: Health System, Economics & Derived Elements</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Merge records into ERA — from multiple discrete events into continuous batches](/storage/uploads/2026/04/omop-cdm-bai19-era-concept.webp)

## Introduction

The three **Derived Elements** tables are not imported directly from the source data but are **automatically calculated** from the clinical table. They combine multiple consecutive records into one "era" (batch) — very useful for epidemiological analysis and clinical research.

---

## 1. ERA concept

### 1.1. What is ERA?

```
  Dữ liệu nguồn (nhiều records):
  ───────────────────────────────────────────────
  Record 1: Tiểu đường  01/01 ─── 15/01
  Record 2: Tiểu đường  20/01 ─── 28/01     (gap = 5 ngày < 30)
  Record 3: Tiểu đường  10/03 ─── 20/03     (gap = 41 ngày > 30)
  ───────────────────────────────────────────────

  Sau khi tính ERA (persistence window = 30 ngày):
  ───────────────────────────────────────────────
  ERA 1: Tiểu đường  01/01 ─── 28/01   (gộp record 1+2)
  ERA 2: Tiểu đường  10/03 ─── 20/03   (record 3 riêng)
  ───────────────────────────────────────────────
```

- **Persistence window**: maximum distance between 2 records to merge
  - CONDITION_ERA: 30 days
  - DRUG_ERA: 30 days
  - DOSE_ERA: 0 days (consecutive only)

### 1.2. Why is ERA needed?

| Problem | Resolve |
|--------|-----------|
| 1 patient has 20 diabetes examinations → 20 records | 1-2 CONDITION_ERA |
| Patient took Metformin for 12 months → 12 prescriptions | 1 DRUG_ERA |
| Need to calculate "duration of illness" | ERA end - ERA start |
| Need to calculate "treatment time" | drug_era_end - drug_era_start |

---

## 2. CONDITION_ERA

### 2.1. Table structure

| Column | Type | Required | Description |
|-----|-------|----------|-------|
| `condition_era_id` | INTEGER | ✅ PK | Unique ID |
| `person_id` | INTEGER | ✅ | FK → PERSON |
| `condition_concept_id` | INTEGER | ✅ | Standard Concept (Ingredient level for Drug) |
| `condition_era_start_date` | DATE | ✅ | Batch start date |
| `condition_era_end_date` | DATE | ✅ | Batch ending date |
| `condition_occurrence_count` | INTEGER | | Number of combined records |

### 2.2. Important characteristics

- `condition_concept_id` always **Standard Concept** (SNOMED)
- Persistence window = **30 days** (default, customizable)
- Include condition_occurrence from many different visits

### 2.3. CONDITION_ERA generation algorithm

```sql
-- Simplified logic (actual implementation dùng CTE phức tạp hơn)
-- Bước 1: Map tất cả condition → Standard + thêm end_date
-- Bước 2: Xác định gap giữa records liên tiếp
-- Bước 3: Nếu gap <= 30 ngày → gộp vào cùng ERA

WITH condition_dates AS (
    SELECT
        person_id,
        condition_concept_id,
        condition_start_date,
        COALESCE(
            condition_end_date,
            condition_start_date + INTERVAL '1 day'  -- Default 1 ngày
        ) AS condition_end_date
    FROM condition_occurrence
    WHERE condition_concept_id != 0
),
-- Xác định ERA groups bằng cách tìm gaps > 30 ngày
era_groups AS (
    SELECT *,
        SUM(new_era_flag) OVER (
            PARTITION BY person_id, condition_concept_id
            ORDER BY condition_start_date
        ) AS era_group
    FROM (
        SELECT *,
            CASE
                WHEN condition_start_date - LAG(condition_end_date)
                    OVER (PARTITION BY person_id, condition_concept_id
                          ORDER BY condition_start_date)
                    > 30
                THEN 1
                ELSE 0
            END AS new_era_flag
        FROM condition_dates
    ) t
)
SELECT
    ROW_NUMBER() OVER () AS condition_era_id,
    person_id,
    condition_concept_id,
    MIN(condition_start_date) AS condition_era_start_date,
    MAX(condition_end_date) AS condition_era_end_date,
    COUNT(*) AS condition_occurrence_count
FROM era_groups
GROUP BY person_id, condition_concept_id, era_group;
```

### 2.4. Application query

```sql
-- Top 10 bệnh mạn tính (ERA > 365 ngày)
SELECT
    c.concept_name AS condition_name,
    COUNT(DISTINCT ce.person_id) AS patient_count,
    ROUND(AVG(
        ce.condition_era_end_date - ce.condition_era_start_date
    ), 0) AS avg_duration_days,
    AVG(ce.condition_occurrence_count) AS avg_visits
FROM condition_era ce
JOIN concept c ON ce.condition_concept_id = c.concept_id
WHERE ce.condition_era_end_date - ce.condition_era_start_date > 365
GROUP BY c.concept_name
ORDER BY patient_count DESC
LIMIT 10;
```

---

## 3. DRUG_ERA

### 3.1. Table structure

| Column | Type | Required | Description |
|-----|-------|----------|-------|
| `drug_era_id` | INTEGER | ✅ PK | Unique ID |
| `person_id` | INTEGER | ✅ | FK → PERSON |
| `drug_concept_id` | INTEGER | ✅ | Standard Concept (**Ingredient**) |
| `drug_era_start_date` | DATE | ✅ | Batch start date |
| `drug_era_end_date` | DATE | ✅ | Batch ending date |
| `drug_exposure_count` | INTEGER | | Number of combined prescriptions |
| `gap_days` | INTEGER | | Total day gap between prescriptions |

### 3.2. Important characteristics

- `drug_concept_id` always at **Ingredient** level (not Clinical Drug)
- All Metformin dosage forms → combined into 1 Metformin ERA
- `gap_days`: total number of days the patient does not take medication between prescriptions

### 3.3. Visual example

```
  drug_exposure records (BN 100001, Metformin):
  ──────────────────────────────────────────────
  Đơn 1: Metformin 500mg Tab  01/01 → 30/01 (30 ngày)
  Đơn 2: Metformin 850mg Tab  05/02 → 06/03 (30 ngày)  gap=6
  Đơn 3: Metformin 500mg Tab  10/03 → 08/04 (30 ngày)  gap=4
  [GAP 45 ngày — > 30 → NEW ERA]
  Đơn 4: Metformin 1000mg Tab 23/05 → 21/06 (30 ngày)
  ──────────────────────────────────────────────

  drug_era kết quả:
  ──────────────────────────────────────────────
  ERA 1: Metformin (Ingredient)
         01/01 → 08/04 (98 ngày)
         drug_exposure_count = 3
         gap_days = 10  (6 + 4)

  ERA 2: Metformin (Ingredient)
         23/05 → 21/06 (30 ngày)
         drug_exposure_count = 1
         gap_days = 0
  ──────────────────────────────────────────────
```

### 3.4. Query: Treatment compliance

```sql
-- Tính adherence = (ERA days - gap_days) / ERA days
SELECT
    c.concept_name AS drug,
    de.person_id,
    de.drug_era_start_date,
    de.drug_era_end_date,
    de.drug_era_end_date - de.drug_era_start_date AS era_days,
    de.gap_days,
    de.drug_exposure_count,
    ROUND(
        (de.drug_era_end_date - de.drug_era_start_date - de.gap_days)
        * 100.0
        / NULLIF(de.drug_era_end_date - de.drug_era_start_date, 0),
        1
    ) AS adherence_pct
FROM drug_era de
JOIN concept c ON de.drug_concept_id = c.concept_id
WHERE de.person_id = 100001
ORDER BY de.drug_era_start_date;
```

### 3.5. Top drugs used the longest

```sql
SELECT
    c.concept_name AS ingredient,
    COUNT(DISTINCT de.person_id) AS patient_count,
    ROUND(AVG(
        de.drug_era_end_date - de.drug_era_start_date
    ), 0) AS avg_era_days,
    ROUND(AVG(de.drug_exposure_count), 1) AS avg_prescriptions,
    ROUND(AVG(de.gap_days), 0) AS avg_gap_days
FROM drug_era de
JOIN concept c ON de.drug_concept_id = c.concept_id
GROUP BY c.concept_name
HAVING COUNT(DISTINCT de.person_id) >= 100
ORDER BY avg_era_days DESC
LIMIT 15;
```

---

## 4. DOSE_ERA

### 4.1. Table structure

| Column | Type | Required | Description |
|-----|-------|----------|-------|
| `dose_era_id` | INTEGER | ✅ PK | Unique ID |
| `person_id` | INTEGER | ✅ | FK → PERSON |
| `drug_concept_id` | INTEGER | ✅ | Standard Concept (Ingredient) |
| `unit_concept_id` | INTEGER | ✅ | Dose unit (mg, g) |
| `dose_value` | FLOAT | ✅ | Dosage |
| `dose_era_start_date` | DATE | ✅ | Start date |
| `dose_era_end_date` | DATE | ✅ | End date |

### 4.2. DOSE_ERA vs DRUG_ERA

```
  DRUG_ERA:  Gộp theo Ingredient, bỏ qua liều
  ──────────────────────────────────────────────
  Metformin ERA: 01/01 → 08/04

  DOSE_ERA:  Gộp theo Ingredient + Liều cụ thể
  ──────────────────────────────────────────────
  Metformin 500mg: 01/01 → 30/01
  Metformin 850mg: 05/02 → 06/03   ← tăng liều
  Metformin 500mg: 10/03 → 08/04   ← giảm liều
```

- DOSE_ERA **persistence window = 0**: only combined when the same dose is consecutive
- Use DRUG_STRENGTH to calculate dose_value from drug_concept_id

### 4.3. Query: Track dose changes

```sql
-- Lịch sử thay đổi liều Metformin
SELECT
    de.person_id,
    c.concept_name AS ingredient,
    de.dose_value,
    cu.concept_name AS unit,
    de.dose_era_start_date,
    de.dose_era_end_date,
    de.dose_era_end_date - de.dose_era_start_date AS days_on_dose
FROM dose_era de
JOIN concept c ON de.drug_concept_id = c.concept_id
JOIN concept cu ON de.unit_concept_id = cu.concept_id
WHERE de.person_id = 100001
  AND de.drug_concept_id = 1503297  -- Metformin
ORDER BY de.dose_era_start_date;
```

### 4.4. Dose escalation analysis

```sql
-- Tìm BN có dose escalation (tăng liều theo thời gian)
WITH dose_changes AS (
    SELECT
        de.person_id,
        de.drug_concept_id,
        de.dose_value,
        de.dose_era_start_date,
        LAG(de.dose_value) OVER (
            PARTITION BY de.person_id, de.drug_concept_id
            ORDER BY de.dose_era_start_date
        ) AS prev_dose
    FROM dose_era de
)
SELECT
    c.concept_name AS drug,
    dc.person_id,
    dc.prev_dose AS from_dose,
    dc.dose_value AS to_dose,
    dc.dose_era_start_date AS escalation_date
FROM dose_changes dc
JOIN concept c ON dc.drug_concept_id = c.concept_id
WHERE dc.dose_value > dc.prev_dose  -- Liều tăng
ORDER BY dc.person_id, c.concept_name, dc.dose_era_start_date;
```

---

## 5. Compare 3 ERA tables

| Features | CONDITION_ERA | DRUG_ERA | DOSE_ERA |
|-----------|--------------|----------|----------|
| **Source** | condition_occurrence | drug_exposure | drug_exposure + drug_strength |
| **Concept level** | Standard (SNOMED) | Ingredient | Ingredient |
| **Persistence window** | 30 days | 30 days | 0 days |
| **Add by** | person + condition | person + ingredient | person + ingredient + dose |
| **Count records** | condition_occurrence_count | drug_exposure_count | (none) |
| **Gap info** | (none) | gap_days | (none) |
| **Dose info** | (none) | (none) | dose_value, unit |

---

## 6. Pipeline creates ERA tables

```
  Bước 1: ETL source → CDM tables
  ┌────────────────────┐    ┌─────────────────────┐
  │ HIS / EMR          │───→│ condition_occurrence │
  │ (dữ liệu nguồn)   │───→│ drug_exposure        │
  └────────────────────┘    └──────────┬────────────┘
                                       │
  Bước 2: Tạo ERA tables              │
                                       ↓
  ┌────────────────────────────────────────────────┐
  │ ERA Builder Script                              │
  │                                                 │
  │ 1. condition_occurrence → CONDITION_ERA          │
  │    (SNOMED rollup + 30-day window)              │
  │                                                 │
  │ 2. drug_exposure + drug_strength → DRUG_ERA     │
  │    (Ingredient rollup + 30-day window)          │
  │                                                 │
  │ 3. drug_exposure + drug_strength → DOSE_ERA     │
  │    (Ingredient + dose + 0-day window)           │
  └────────────────────────────────────────────────┘

  Bước 3: Validate
  ┌────────────────────────────────────┐
  │ - Mỗi ERA có start <= end          │
  │ - occurrence_count >= 1             │
  │ - gap_days >= 0                     │
  │ - Không khoảng trống logic          │
  └────────────────────────────────────┘
```

---

## Summary

1. **ERA** = combine multiple consecutive records into a single batch
2. **CONDITION_ERA**: 30 day window, SNOMED standard concept
3. **DRUG_ERA**: 30 day window, Ingredient level, yes `gap_days` calculate adherences
4. **DOSE_ERA**: 0 day window, monitor dose changes over time
5. ERA tables are **automatically created** after ETL, not imported directly

**Next article:** CDM_SOURCE, METADATA, COHORT & Series summary.

---

## References

- [OMOP CDM 5.4 — CONDITION_ERA](https://ohdsi.github.io/CommonDataModel/cdm54.html#CONDITION_ERA)
- [OMOP CDM 5.4 — DRUG_ERA](https://ohdsi.github.io/CommonDataModel/cdm54.html#DRUG_ERA)
- [OMOP CDM 5.4 — DOSE_ERA](https://ohdsi.github.io/CommonDataModel/cdm54.html#DOSE_ERA)
- [Book of OHDSI — ch. 6: Standardized Derived Elements](https://ohdsi.github.io/TheBookOfOhdsi/)
