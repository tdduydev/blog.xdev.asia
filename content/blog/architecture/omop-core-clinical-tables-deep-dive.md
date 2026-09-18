---
id: 02770003-omop-cdm5-b001-000000000004
title: "OMOP Core Clinical Tables: Person, Visit, Condition, Drug, Measurement, Observation"
slug: omop-core-clinical-tables-deep-dive
excerpt: >-
  Deep dive 7 bảng quan trọng nhất của OMOP CDM 5.4 — schema, FK, ETL convention,
  điểm dễ nhầm (Measurement vs Observation, Drug_Exposure vs Drug_Era) và 10 SQL
  pattern phân tích RWE phổ biến.
featured_image: /images/blog/omop-core-tables-featured.webp
type: blog
reading_time: 18
view_count: 0
meta: null
published_at: '2026-05-07T16:30:00.000000Z'
created_at: '2026-05-07T16:30:00.000000Z'
author: {id: 019c9616-d2b4-713f-9b2c-40e2e92a05cf, name: Duy Tran, avatar: avatars/7e8eb5c6-4cac-455b-a701-4060f085d501.jpeg}
category: {id: 019c9616-cat7-7007-a007-000000000007, name: Kiến trúc hệ thống, slug: architecture}
tags: [{name: OMOP, slug: omop}, {name: CDM, slug: cdm}, {name: PostgreSQL, slug: postgresql}, {name: Healthcare, slug: healthcare}]
comments: []
---

OMOP CDM 5.4 có 37 bảng nhưng 90% phân tích RWE chỉ chạm 7 bảng core. Bài viết này đi sâu từng bảng với schema, ETL convention (Themis), và SQL pattern thực chiến.

## 1. Person-centric architecture

![1. Person-centric architecture](/images/blog/diagrams/omop-core-clinical-tables-deep-dive-d01.webp)

Mọi clinical event đều có `person_id` và optional `visit_occurrence_id`. Đây là chìa khoá join.

## 2. PERSON

Lưu thông tin nhân khẩu (1 hàng = 1 bệnh nhân):

```sql
CREATE TABLE person (
  person_id BIGINT PRIMARY KEY,
  gender_concept_id INTEGER NOT NULL,         -- 8507=Male, 8532=Female
  year_of_birth INTEGER NOT NULL,
  month_of_birth INTEGER,
  day_of_birth INTEGER,
  birth_datetime TIMESTAMP,
  race_concept_id INTEGER NOT NULL,
  ethnicity_concept_id INTEGER NOT NULL,
  location_id BIGINT,
  provider_id BIGINT,
  care_site_id BIGINT,
  person_source_value VARCHAR(50),            -- ID bệnh nhân gốc (CCCD pseudonymized)
  gender_source_value VARCHAR(50),
  gender_source_concept_id INTEGER,
  race_source_value VARCHAR(50),
  race_source_concept_id INTEGER,
  ethnicity_source_value VARCHAR(50),
  ethnicity_source_concept_id INTEGER
);
```

### ETL convention quan trọng:
- `person_id` phải là **BIGINT** (đề phòng dataset lớn)
- `year_of_birth` bắt buộc, `month_of_birth/day_of_birth` optional (nếu lo privacy → để NULL hoặc đặt = 1)
- `race_concept_id` nếu không có → dùng `0` (concept Unknown)
- VN: dân tộc map vào `race_source_value`, race_concept_id dùng custom (xem [Vocabulary](/blog/omop-standardized-vocabularies-athena))

## 3. OBSERVATION_PERIOD

Khoảng thời gian bệnh nhân **được theo dõi** trong dataset:

```sql
CREATE TABLE observation_period (
  observation_period_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  observation_period_start_date DATE NOT NULL,
  observation_period_end_date DATE NOT NULL,
  period_type_concept_id INTEGER NOT NULL  -- 32817 = EHR derived, 32811 = claim
);
```

Cực quan trọng: incidence/prevalence chỉ chính xác khi biết bệnh nhân được theo dõi bao lâu.

ETL convention:
- 1 person có thể nhiều `observation_period` (gap > 30 ngày → chia)
- Start = ngày event đầu tiên trong dataset; End = ngày event cuối + 30 ngày (hoặc death)

## 4. VISIT_OCCURRENCE

Mỗi lượt thăm khám:

```sql
CREATE TABLE visit_occurrence (
  visit_occurrence_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  visit_concept_id INTEGER NOT NULL,         -- 9201=Inpatient, 9202=Outpatient, 9203=ER
  visit_start_date DATE NOT NULL,
  visit_start_datetime TIMESTAMP,
  visit_end_date DATE NOT NULL,
  visit_end_datetime TIMESTAMP,
  visit_type_concept_id INTEGER NOT NULL,
  provider_id BIGINT,
  care_site_id BIGINT,
  visit_source_value VARCHAR(50),
  visit_source_concept_id INTEGER,
  admitted_from_concept_id INTEGER,
  admitted_from_source_value VARCHAR(50),
  discharged_to_concept_id INTEGER,
  discharged_to_source_value VARCHAR(50),
  preceding_visit_occurrence_id BIGINT
);
```

Visit_concept_id phổ biến VN:
| Source | concept_id | Tên |
|---|---|---|
| Nội trú | 9201 | Inpatient Visit |
| Ngoại trú | 9202 | Outpatient Visit |
| Cấp cứu | 9203 | Emergency Room Visit |
| Telehealth | 5083 | Telehealth |
| Long-term care | 42898160 | Nursing facility |

## 5. CONDITION_OCCURRENCE

Chẩn đoán/triệu chứng/bệnh lý:

```sql
CREATE TABLE condition_occurrence (
  condition_occurrence_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  condition_concept_id INTEGER NOT NULL,
  condition_start_date DATE NOT NULL,
  condition_start_datetime TIMESTAMP,
  condition_end_date DATE,
  condition_end_datetime TIMESTAMP,
  condition_type_concept_id INTEGER NOT NULL,  -- 32020=EHR diagnosis, 32035=Problem list
  condition_status_concept_id INTEGER,         -- 32902=admit, 32903=discharge, 32893=primary
  stop_reason VARCHAR(20),
  provider_id BIGINT,
  visit_occurrence_id BIGINT,
  visit_detail_id BIGINT,
  condition_source_value VARCHAR(50),          -- ICD-10 code gốc
  condition_source_concept_id INTEGER,         -- concept_id của ICD-10 source
  condition_status_source_value VARCHAR(50)
);
```

ETL convention:
- `condition_concept_id` luôn dùng **Standard SNOMED**
- `condition_source_concept_id` lưu ICD-10 gốc (concept_id của ICD code)
- `condition_source_value` = string raw "E11.9"

## 6. DRUG_EXPOSURE

Mỗi lần kê đơn / dispense / administer:

```sql
CREATE TABLE drug_exposure (
  drug_exposure_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  drug_concept_id INTEGER NOT NULL,           -- RxNorm Standard
  drug_exposure_start_date DATE NOT NULL,
  drug_exposure_start_datetime TIMESTAMP,
  drug_exposure_end_date DATE NOT NULL,
  drug_exposure_end_datetime TIMESTAMP,
  verbatim_end_date DATE,
  drug_type_concept_id INTEGER NOT NULL,      -- 38000177=Prescription, 32428=Dispense
  stop_reason VARCHAR(20),
  refills INTEGER,
  quantity NUMERIC,
  days_supply INTEGER,
  sig TEXT,
  route_concept_id INTEGER,
  lot_number VARCHAR(50),
  provider_id BIGINT,
  visit_occurrence_id BIGINT,
  visit_detail_id BIGINT,
  drug_source_value VARCHAR(50),
  drug_source_concept_id INTEGER,
  route_source_value VARCHAR(50),
  dose_unit_source_value VARCHAR(50)
);
```

ETL convention:
- `drug_concept_id` dùng **Clinical Drug** hoặc **Branded Drug** (RxNorm), không dùng Ingredient (vì mất thông tin liều)
- `drug_exposure_end_date` = start + days_supply (nếu không có end)
- VN danh mục thuốc BYT → dùng USAGI map sang RxNorm

## 7. MEASUREMENT vs OBSERVATION — phân biệt

Đây là điểm hay nhầm nhất. Quy tắc:

| Tiêu chí | MEASUREMENT | OBSERVATION |
|---|---|---|
| Đo định lượng/định tính có **chuẩn lab** | ✅ | ❌ |
| Vital signs (BP, HR, T°) | ✅ | ❌ |
| Lab test (Glucose, HbA1c, CBC) | ✅ | ❌ |
| Tiền sử (hút thuốc, gia đình bị K) | ❌ | ✅ |
| Lifestyle (BMI category, exercise) | ❌ | ✅ |
| Social determinants | ❌ | ✅ |
| Symptom report (đau ngực) | ❌ | ✅ (nếu không có structured measure) |

### MEASUREMENT schema

```sql
CREATE TABLE measurement (
  measurement_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  measurement_concept_id INTEGER NOT NULL,    -- LOINC standard
  measurement_date DATE NOT NULL,
  measurement_datetime TIMESTAMP,
  measurement_time VARCHAR(10),
  measurement_type_concept_id INTEGER NOT NULL,
  operator_concept_id INTEGER,                -- 4172703=>, 4172704=<, 4172756==
  value_as_number NUMERIC,
  value_as_concept_id INTEGER,                -- nếu kết quả categorical
  unit_concept_id INTEGER,                    -- UCUM
  range_low NUMERIC,
  range_high NUMERIC,
  provider_id BIGINT,
  visit_occurrence_id BIGINT,
  visit_detail_id BIGINT,
  measurement_source_value VARCHAR(50),
  measurement_source_concept_id INTEGER,
  unit_source_value VARCHAR(50),
  unit_source_concept_id INTEGER,
  value_source_value VARCHAR(50),
  measurement_event_id BIGINT,                -- CDM 5.4: link với specimen, episode
  meas_event_field_concept_id INTEGER
);
```

### OBSERVATION schema

```sql
CREATE TABLE observation (
  observation_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  observation_concept_id INTEGER NOT NULL,
  observation_date DATE NOT NULL,
  observation_datetime TIMESTAMP,
  observation_type_concept_id INTEGER NOT NULL,
  value_as_number NUMERIC,
  value_as_string VARCHAR(60),
  value_as_concept_id INTEGER,
  qualifier_concept_id INTEGER,
  unit_concept_id INTEGER,
  provider_id BIGINT,
  visit_occurrence_id BIGINT,
  visit_detail_id BIGINT,
  observation_source_value VARCHAR(50),
  observation_source_concept_id INTEGER,
  unit_source_value VARCHAR(50),
  qualifier_source_value VARCHAR(50),
  value_source_value VARCHAR(50),
  observation_event_id BIGINT,
  obs_event_field_concept_id INTEGER
);
```

## 8. PROCEDURE_OCCURRENCE

Hành động y tế thực hiện cho bệnh nhân (phẫu thuật, thủ thuật, vaccine):

```sql
CREATE TABLE procedure_occurrence (
  procedure_occurrence_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  procedure_concept_id INTEGER NOT NULL,    -- SNOMED, CPT4, ICD-10-PCS
  procedure_date DATE NOT NULL,
  procedure_datetime TIMESTAMP,
  procedure_end_date DATE,
  procedure_end_datetime TIMESTAMP,
  procedure_type_concept_id INTEGER NOT NULL,
  modifier_concept_id INTEGER,
  quantity INTEGER,
  provider_id BIGINT,
  visit_occurrence_id BIGINT,
  visit_detail_id BIGINT,
  procedure_source_value VARCHAR(50),
  procedure_source_concept_id INTEGER,
  modifier_source_value VARCHAR(50)
);
```

VN: danh mục DVKT (Dịch vụ kỹ thuật) Bộ Y tế → map sang SNOMED procedure.

## 9. Drug_Era và Condition_Era — derived

![9. Drug_Era và Condition_Era — derived](/images/blog/diagrams/omop-core-clinical-tables-deep-dive-d02.webp)

`DRUG_ERA` gộp các Drug_Exposure liên tục (gap default 30 ngày):

```sql
CREATE TABLE drug_era (
  drug_era_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  drug_concept_id INTEGER NOT NULL,         -- INGREDIENT (không phải product)
  drug_era_start_date DATE NOT NULL,
  drug_era_end_date DATE NOT NULL,
  drug_exposure_count INTEGER,
  gap_days INTEGER
);
```

Quan trọng: `drug_concept_id` của Drug_Era là **Ingredient** (vd Metformin), không phải product (Metformin 500mg). → để dễ phân tích "patient on Metformin" bất kể liều.

## 10. SQL pattern phổ biến

### 10.1 Tổng số bệnh nhân theo gender

```sql
SELECT 
  c.concept_name AS gender,
  COUNT(*) AS n_patient
FROM person p
JOIN concept c ON p.gender_concept_id = c.concept_id
GROUP BY c.concept_name;
```

### 10.2 Bệnh nhân Diabetes type 2 đang dùng Metformin trong 90 ngày qua

```sql
WITH diabetes AS (
  SELECT DISTINCT person_id
  FROM condition_occurrence co
  JOIN concept_ancestor ca ON co.condition_concept_id = ca.descendant_concept_id
  WHERE ca.ancestor_concept_id = 201826  -- T2DM
),
metformin AS (
  SELECT DISTINCT person_id
  FROM drug_era de
  WHERE de.drug_concept_id = 1503297  -- Metformin Ingredient
    AND de.drug_era_end_date >= CURRENT_DATE - 90
)
SELECT COUNT(*) AS n
FROM diabetes d
JOIN metformin m ON d.person_id = m.person_id;
```

### 10.3 Incidence rate của bệnh trong dân số 2026

```sql
WITH new_cases AS (
  SELECT person_id, MIN(condition_start_date) AS first_dx
  FROM condition_occurrence co
  JOIN concept_ancestor ca ON co.condition_concept_id = ca.descendant_concept_id
  WHERE ca.ancestor_concept_id = 201826
  GROUP BY person_id
  HAVING MIN(condition_start_date) BETWEEN '2026-01-01' AND '2026-12-31'
),
person_time AS (
  SELECT person_id, 
    GREATEST(observation_period_start_date, '2026-01-01') AS pt_start,
    LEAST(observation_period_end_date, '2026-12-31') AS pt_end
  FROM observation_period
  WHERE observation_period_start_date <= '2026-12-31'
    AND observation_period_end_date >= '2026-01-01'
)
SELECT 
  COUNT(DISTINCT new_cases.person_id) AS new_dx,
  SUM(EXTRACT(EPOCH FROM (pt_end - pt_start)) / 86400 / 365.25) AS person_years,
  COUNT(DISTINCT new_cases.person_id) * 1000.0 / 
    SUM(EXTRACT(EPOCH FROM (pt_end - pt_start)) / 86400 / 365.25) AS rate_per_1000_PY
FROM person_time pt
LEFT JOIN new_cases ON pt.person_id = new_cases.person_id;
```

### 10.4 Average HbA1c trên bệnh nhân T2DM

```sql
WITH diabetes_pts AS (
  SELECT DISTINCT person_id
  FROM condition_occurrence co
  JOIN concept_ancestor ca ON co.condition_concept_id = ca.descendant_concept_id
  WHERE ca.ancestor_concept_id = 201826
),
hba1c AS (
  SELECT m.person_id, m.value_as_number, m.measurement_date
  FROM measurement m
  WHERE m.measurement_concept_id = 3004410  -- LOINC HbA1c
    AND m.value_as_number BETWEEN 3 AND 20  -- plausibility
)
SELECT 
  AVG(value_as_number) AS mean_hba1c,
  STDDEV(value_as_number) AS sd_hba1c,
  COUNT(*) AS n
FROM diabetes_pts d
JOIN hba1c h ON d.person_id = h.person_id;
```

## 11. Indexing recommendation

```sql
CREATE INDEX idx_co_person ON condition_occurrence(person_id);
CREATE INDEX idx_co_concept ON condition_occurrence(condition_concept_id);
CREATE INDEX idx_co_date ON condition_occurrence(condition_start_date);

CREATE INDEX idx_de_person ON drug_exposure(person_id);
CREATE INDEX idx_de_concept ON drug_exposure(drug_concept_id);

CREATE INDEX idx_m_person_concept ON measurement(person_id, measurement_concept_id);
CREATE INDEX idx_m_date ON measurement(measurement_date);

-- Vocabulary
CREATE INDEX idx_concept_vocab_code ON concept(vocabulary_id, concept_code);
CREATE INDEX idx_ca_anc_desc ON concept_ancestor(ancestor_concept_id, descendant_concept_id);
```

OHDSI cung cấp script index sẵn trong `OMOPCDM_postgresql_5.4_indices.sql`.

## 12. Pitfall

- ❌ `condition_concept_id = 0` (unmapped) → bệnh nhân biến mất khỏi cohort
- ❌ Quên `JOIN concept_ancestor` → cohort thiếu loại biến thể
- ❌ Lookup HbA1c theo `measurement_source_value` text → fragile, nên dùng `measurement_concept_id = 3004410`
- ❌ Tính incidence không dùng `OBSERVATION_PERIOD` → sai số
- ❌ Quên `value_as_number BETWEEN ... AND ...` plausibility → outlier phá analytic
- ❌ Mix `Drug_Exposure` (Clinical/Branded Drug) với `Drug_Era` (Ingredient) → kết quả sai

## Kết luận

7 bảng core đủ cho 90% phân tích RWE. Học chắc Person, Visit, Condition, Drug, Measurement, Observation, Procedure trước khi đụng các bảng nâng cao. Luôn dùng `concept_ancestor` cho hierarchy và validate plausibility.

Bài tiếp: [OMOP ETL Mastery — WhiteRabbit, RabbitInAHat, USAGI, Perseus](/blog/omop-etl-whiterabbit-usagi-perseus).
