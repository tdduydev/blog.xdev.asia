---
id: 02770003-omop-cdm5-b001-000000000004
title: "OMOP Core Clinical Tables:Person、Visit、Condition、Drug、Measurement、Observation"
slug: omop-core-clinical-tables-deep-dive
excerpt: >-
  深入剖析 OMOP CDM 5.4 中最重要的 7 張資料表 — schema、FK、ETL convention、
  容易混淆的部分(Measurement vs Observation、Drug_Exposure vs Drug_Era)以及 10 個
  常見 RWE 分析 SQL 模式。
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

OMOP CDM 5.4 共有 37 張資料表,但 90% 的 RWE 分析只會碰到 7 張核心資料表。本文逐張深入,涵蓋 schema、ETL convention(Themis)以及實戰 SQL 模式。

## 1. Person 為中心的架構

![1. Person 為中心的架構](/images/blog/diagrams/omop-core-clinical-tables-deep-dive-d01.webp)

每筆臨床事件都有 `person_id` 與選用的 `visit_occurrence_id`。這是 join 的關鍵。

## 2. PERSON

儲存人口統計資訊(每列 = 一名病人):

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
  person_source_value VARCHAR(50),            -- 原始病人 ID(假名化的身分證字號)
  gender_source_value VARCHAR(50),
  gender_source_concept_id INTEGER,
  race_source_value VARCHAR(50),
  race_source_concept_id INTEGER,
  ethnicity_source_value VARCHAR(50),
  ethnicity_source_concept_id INTEGER
);
```

### 重要 ETL convention:
- `person_id` 必須是 **BIGINT**(預防大型資料集)
- `year_of_birth` 必填,`month_of_birth/day_of_birth` 可選(若擔心隱私 → 設為 NULL 或 1)
- `race_concept_id` 若無資料 → 使用 `0`(Unknown concept)
- 越南:民族對應到 `race_source_value`,race_concept_id 使用 custom(參見 [Vocabulary](/blog/omop-standardized-vocabularies-athena))

## 3. OBSERVATION_PERIOD

病人在資料集中**被追蹤**的時間區間:

```sql
CREATE TABLE observation_period (
  observation_period_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  observation_period_start_date DATE NOT NULL,
  observation_period_end_date DATE NOT NULL,
  period_type_concept_id INTEGER NOT NULL  -- 32817 = EHR derived, 32811 = claim
);
```

至為關鍵:incidence/prevalence 只有在已知病人被追蹤多久時才會準確。

ETL convention:
- 一名 person 可有多個 `observation_period`(間隔 > 30 天 → 切分)
- Start = 資料集中該人首筆事件日期;End = 最後事件日期 + 30 天(或死亡)

## 4. VISIT_OCCURRENCE

每次就診紀錄:

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

越南常見的 Visit_concept_id:
| 來源 | concept_id | 名稱 |
|---|---|---|
| 住院 | 9201 | Inpatient Visit |
| 門診 | 9202 | Outpatient Visit |
| 急診 | 9203 | Emergency Room Visit |
| 遠距醫療 | 5083 | Telehealth |
| 長期照護 | 42898160 | Nursing facility |

## 5. CONDITION_OCCURRENCE

診斷/症狀/病理:

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
  condition_source_value VARCHAR(50),          -- 原始 ICD-10 代碼
  condition_source_concept_id INTEGER,         -- ICD-10 來源的 concept_id
  condition_status_source_value VARCHAR(50)
);
```

ETL convention:
- `condition_concept_id` 一律使用 **Standard SNOMED**
- `condition_source_concept_id` 儲存原始 ICD-10(ICD code 的 concept_id)
- `condition_source_value` = 原始字串「E11.9」

## 6. DRUG_EXPOSURE

每次處方/調劑/給藥:

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
- `drug_concept_id` 使用 **Clinical Drug** 或 **Branded Drug**(RxNorm),不要使用 Ingredient(會失去劑量資訊)
- `drug_exposure_end_date` = start + days_supply(若無 end)
- 越南衛生部藥品目錄 → 透過 USAGI 對應到 RxNorm

## 7. MEASUREMENT 與 OBSERVATION 的區分

這是最容易混淆的地方。規則:

| 標準 | MEASUREMENT | OBSERVATION |
|---|---|---|
| 具有**檢驗標準**的定量/定性測量 | ✅ | ❌ |
| 生命徵象(BP、HR、T°) | ✅ | ❌ |
| 實驗室檢驗(Glucose、HbA1c、CBC) | ✅ | ❌ |
| 病史(吸菸、家族癌症史) | ❌ | ✅ |
| 生活型態(BMI 分級、運動) | ❌ | ✅ |
| 社會決定因素 | ❌ | ✅ |
| 症狀陳述(胸痛) | ❌ | ✅(若無結構化測量) |

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
  value_as_concept_id INTEGER,                -- 若結果為類別型
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
  measurement_event_id BIGINT,                -- CDM 5.4: 連結 specimen、episode
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

對病人執行的醫療行為(手術、處置、疫苗):

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

越南:衛生部 DVKT(技術服務)目錄 → 對應到 SNOMED procedure。

## 9. Drug_Era 與 Condition_Era — 衍生資料表

![9. Drug_Era 與 Condition_Era — 衍生資料表](/images/blog/diagrams/omop-core-clinical-tables-deep-dive-d02.webp)

`DRUG_ERA` 將連續的 Drug_Exposure 合併(預設間隔 30 天):

```sql
CREATE TABLE drug_era (
  drug_era_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  drug_concept_id INTEGER NOT NULL,         -- INGREDIENT(非產品)
  drug_era_start_date DATE NOT NULL,
  drug_era_end_date DATE NOT NULL,
  drug_exposure_count INTEGER,
  gap_days INTEGER
);
```

重要:Drug_Era 的 `drug_concept_id` 是 **Ingredient**(例如 Metformin),非產品(Metformin 500mg)。→ 便於分析「使用 Metformin 的病人」而不論劑量。

## 10. 常見 SQL 模式

### 10.1 依性別統計病人總數

```sql
SELECT 
  c.concept_name AS gender,
  COUNT(*) AS n_patient
FROM person p
JOIN concept c ON p.gender_concept_id = c.concept_id
GROUP BY c.concept_name;
```

### 10.2 過去 90 天內服用 Metformin 的第二型糖尿病病人

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

### 10.3 2026 年人口中疾病的 incidence rate

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

### 10.4 第二型糖尿病病人的 HbA1c 平均

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
    AND m.value_as_number BETWEEN 3 AND 20  -- 合理性檢查
)
SELECT 
  AVG(value_as_number) AS mean_hba1c,
  STDDEV(value_as_number) AS sd_hba1c,
  COUNT(*) AS n
FROM diabetes_pts d
JOIN hba1c h ON d.person_id = h.person_id;
```

## 11. 索引建議

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

OHDSI 在 `OMOPCDM_postgresql_5.4_indices.sql` 中已提供索引腳本。

## 12. 常見陷阱

- ❌ `condition_concept_id = 0`(unmapped) → 病人從世代中消失
- ❌ 忘記 `JOIN concept_ancestor` → 世代漏掉變異型
- ❌ 以 `measurement_source_value` 文字查詢 HbA1c → 脆弱,應使用 `measurement_concept_id = 3004410`
- ❌ 計算 incidence 未使用 `OBSERVATION_PERIOD` → 數字錯誤
- ❌ 忘記 `value_as_number BETWEEN ... AND ...` 合理性檢查 → outlier 破壞分析
- ❌ Drug_Exposure(Clinical/Branded Drug)與 Drug_Era(Ingredient)混用 → 結果錯誤

## 結論

7 張核心資料表足以涵蓋 90% 的 RWE 分析。在動高階資料表前,先紮實掌握 Person、Visit、Condition、Drug、Measurement、Observation、Procedure。階層永遠用 `concept_ancestor`,並做合理性驗證。

下一篇:[OMOP ETL Mastery — WhiteRabbit、RabbitInAHat、USAGI、Perseus](/blog/omop-etl-whiterabbit-usagi-perseus)。
