---
id: 019f1a00-a119-7b01-e001-omopcdm54019
title: "Bài 19: CONDITION_ERA, DRUG_ERA & DOSE_ERA — Bảng tổng hợp tự động"
slug: bai-19-condition-era-drug-era-dose-era
description: >-
  Ba bảng Derived Elements: CONDITION_ERA gộp chẩn đoán liên tiếp,
  DRUG_ERA gộp đợt dùng thuốc, DOSE_ERA theo dõi liều lượng.
  Thuật toán tạo ERA và ứng dụng phân tích.
duration_minutes: 50
is_free: true
video_url: null
sort_order: 19
section_title: "Phần 6: Health System, Economics & Derived Elements"
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: "OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z"
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Kiến trúc — Bài 19</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">CONDITION_ERA, DRUG_ERA</tspan>
    <tspan x="60" dy="42">&amp; DOSE_ERA — Bảng tổng hợp</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 cho Người mới — Hiểu từ A đến Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 6: Health System, Economics &amp; Derived Elements</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Gộp records thành ERA — từ nhiều sự kiện rời rạc thành đợt liên tục](/storage/uploads/2026/04/omop-cdm-bai19-era-concept.webp)

## Giới thiệu

Ba bảng **Derived Elements** không được nhập trực tiếp từ dữ liệu nguồn mà **tính toán tự động** từ bảng lâm sàng. Chúng gộp nhiều records liên tiếp thành 1 "era" (đợt) — rất hữu ích cho phân tích dịch tễ và nghiên cứu lâm sàng.

---

## 1. Khái niệm ERA

### 1.1. ERA là gì?

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

- **Persistence window**: khoảng cách tối đa giữa 2 records để gộp
  - CONDITION_ERA: 30 ngày
  - DRUG_ERA: 30 ngày
  - DOSE_ERA: 0 ngày (chỉ gộp liên tiếp)

### 1.2. Tại sao cần ERA?

| Vấn đề | Giải quyết |
|--------|-----------|
| 1 BN có 20 lần khám Tiểu đường → 20 records | 1-2 CONDITION_ERA |
| BN uống Metformin 12 tháng → 12 đơn thuốc | 1 DRUG_ERA |
| Cần tính "thời gian mắc bệnh" | ERA end - ERA start |
| Cần tính "thời gian điều trị" | drug_era_end - drug_era_start |

---

## 2. CONDITION_ERA

### 2.1. Cấu trúc bảng

| Cột | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|-------|
| `condition_era_id` | INTEGER | ✅ PK | ID duy nhất |
| `person_id` | INTEGER | ✅ | FK → PERSON |
| `condition_concept_id` | INTEGER | ✅ | Standard Concept (Ingredient level cho Drug) |
| `condition_era_start_date` | DATE | ✅ | Ngày bắt đầu đợt |
| `condition_era_end_date` | DATE | ✅ | Ngày kết thúc đợt |
| `condition_occurrence_count` | INTEGER | | Số records gộp |

### 2.2. Đặc điểm quan trọng

- `condition_concept_id` luôn là **Standard Concept** (SNOMED)
- Persistence window = **30 ngày** (mặc định, có thể tùy chỉnh)
- Gộp cả condition_occurrence từ nhiều visit khác nhau

### 2.3. Thuật toán tạo CONDITION_ERA

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

### 2.4. Truy vấn ứng dụng

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

### 3.1. Cấu trúc bảng

| Cột | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|-------|
| `drug_era_id` | INTEGER | ✅ PK | ID duy nhất |
| `person_id` | INTEGER | ✅ | FK → PERSON |
| `drug_concept_id` | INTEGER | ✅ | Standard Concept (**Ingredient**) |
| `drug_era_start_date` | DATE | ✅ | Ngày bắt đầu đợt |
| `drug_era_end_date` | DATE | ✅ | Ngày kết thúc đợt |
| `drug_exposure_count` | INTEGER | | Số đơn thuốc gộp |
| `gap_days` | INTEGER | | Tổng ngày gap giữa prescriptions |

### 3.2. Đặc điểm quan trọng

- `drug_concept_id` luôn ở mức **Ingredient** (không phải Clinical Drug)
- Tất cả dạng bào chế Metformin → gộp vào 1 Metformin ERA
- `gap_days`: tổng số ngày BN không dùng thuốc giữa các đơn

### 3.3. Ví dụ trực quan

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

### 3.4. Truy vấn: Tuân thủ điều trị

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

### 3.5. Top thuốc sử dụng lâu nhất

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

### 4.1. Cấu trúc bảng

| Cột | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|-------|
| `dose_era_id` | INTEGER | ✅ PK | ID duy nhất |
| `person_id` | INTEGER | ✅ | FK → PERSON |
| `drug_concept_id` | INTEGER | ✅ | Standard Concept (Ingredient) |
| `unit_concept_id` | INTEGER | ✅ | Đơn vị liều (mg, g) |
| `dose_value` | FLOAT | ✅ | Liều lượng |
| `dose_era_start_date` | DATE | ✅ | Ngày bắt đầu |
| `dose_era_end_date` | DATE | ✅ | Ngày kết thúc |

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

- DOSE_ERA **persistence window = 0**: chỉ gộp khi liên tiếp cùng liều
- Dùng DRUG_STRENGTH để tính dose_value từ drug_concept_id

### 4.3. Truy vấn: Theo dõi thay đổi liều

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

### 4.4. Phân tích dose escalation

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

## 5. So sánh 3 bảng ERA

| Đặc điểm | CONDITION_ERA | DRUG_ERA | DOSE_ERA |
|-----------|--------------|----------|----------|
| **Nguồn** | condition_occurrence | drug_exposure | drug_exposure + drug_strength |
| **Concept level** | Standard (SNOMED) | Ingredient | Ingredient |
| **Persistence window** | 30 ngày | 30 ngày | 0 ngày |
| **Gộp theo** | person + condition | person + ingredient | person + ingredient + dose |
| **Đếm records** | condition_occurrence_count | drug_exposure_count | (không có) |
| **Gap info** | (không có) | gap_days | (không có) |
| **Dose info** | (không có) | (không có) | dose_value, unit |

---

## 6. Pipeline tạo ERA tables

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

## Tổng kết

1. **ERA** = gộp nhiều records liên tiếp thành 1 đợt duy nhất
2. **CONDITION_ERA**: 30 ngày window, SNOMED standard concept
3. **DRUG_ERA**: 30 ngày window, Ingredient level, có `gap_days` tính adherence
4. **DOSE_ERA**: 0 ngày window, theo dõi thay đổi liều theo thời gian
5. ERA tables được **tạo tự động** sau ETL, không nhập trực tiếp

**Bài tiếp theo:** CDM_SOURCE, METADATA, COHORT & Tổng kết series.

---

## Tài liệu tham khảo

- [OMOP CDM 5.4 — CONDITION_ERA](https://ohdsi.github.io/CommonDataModel/cdm54.html#CONDITION_ERA)
- [OMOP CDM 5.4 — DRUG_ERA](https://ohdsi.github.io/CommonDataModel/cdm54.html#DRUG_ERA)
- [OMOP CDM 5.4 — DOSE_ERA](https://ohdsi.github.io/CommonDataModel/cdm54.html#DOSE_ERA)
- [Book of OHDSI — ch. 6: Standardized Derived Elements](https://ohdsi.github.io/TheBookOfOhdsi/)
