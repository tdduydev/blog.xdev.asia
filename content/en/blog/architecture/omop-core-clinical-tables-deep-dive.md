---
id: 02770003-omop-cdm5-b001-000000000004
title: "OMOP Core Clinical Tables: Person, Visit, Condition, Drug, Measurement, Observation"
slug: omop-core-clinical-tables-deep-dive
excerpt: >-
  A deep dive into the seven most important tables in OMOP CDM 5.4 — schema,
  foreign keys, ETL conventions, common pitfalls (Measurement vs. Observation,
  Drug_Exposure vs. Drug_Era), and 10 popular RWE SQL patterns.
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

OMOP CDM 5.4 has 37 tables, but 90% of RWE analytics only touches seven core tables. This article digs into each one with schema, ETL conventions (Themis), and battle-tested SQL patterns.

## 1. Person-centric architecture

![Person-centric architecture](/images/blog/diagrams/omop-core-clinical-tables-deep-dive-d01.webp)

Every clinical event carries a `person_id` and an optional `visit_occurrence_id`. These are your join keys.

## 2. PERSON

Stores demographics (one row = one patient):

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
  person_source_value VARCHAR(50),            -- Original patient ID (pseudonymized CCCD national ID)
  gender_source_value VARCHAR(50),
  gender_source_concept_id INTEGER,
  race_source_value VARCHAR(50),
  race_source_concept_id INTEGER,
  ethnicity_source_value VARCHAR(50),
  ethnicity_source_concept_id INTEGER
);
```

### Key ETL conventions:
- `person_id` must be **BIGINT** (to support large datasets)
- `year_of_birth` is required; `month_of_birth/day_of_birth` are optional (set to NULL or 1 if privacy is a concern)
- If `race_concept_id` is unknown → use `0` (the Unknown concept)
- For Vietnam: store ethnicity in `race_source_value`, and use a custom concept for `race_concept_id` (see the [Vocabulary article](/blog/omop-standardized-vocabularies-athena))

## 3. OBSERVATION_PERIOD

The time window during which a patient is **followed** in the dataset:

```sql
CREATE TABLE observation_period (
  observation_period_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  observation_period_start_date DATE NOT NULL,
  observation_period_end_date DATE NOT NULL,
  period_type_concept_id INTEGER NOT NULL  -- 32817 = EHR derived, 32811 = claim
);
```

This is critical: incidence/prevalence calculations are only correct when you know how long each patient was followed.

ETL conventions:
- A person can have multiple `observation_period` rows (split when there is a gap of more than 30 days)
- Start = the first event date in the dataset; End = the last event date + 30 days (or death)

## 4. VISIT_OCCURRENCE

One row per encounter:

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

Common `visit_concept_id` values for Vietnam:
| Source | concept_id | Name |
|---|---|---|
| Inpatient | 9201 | Inpatient Visit |
| Outpatient | 9202 | Outpatient Visit |
| Emergency | 9203 | Emergency Room Visit |
| Telehealth | 5083 | Telehealth |
| Long-term care | 42898160 | Nursing facility |

## 5. CONDITION_OCCURRENCE

Diagnoses, symptoms, and conditions:

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
  condition_source_value VARCHAR(50),          -- Original ICD-10 code
  condition_source_concept_id INTEGER,         -- concept_id of the source ICD-10 code
  condition_status_source_value VARCHAR(50)
);
```

ETL conventions:
- `condition_concept_id` is always a **Standard SNOMED** concept
- `condition_source_concept_id` stores the original ICD-10 (the concept_id of the ICD code)
- `condition_source_value` = the raw string "E11.9"

## 6. DRUG_EXPOSURE

One row per prescription / dispense / administration:

```sql
CREATE TABLE drug_exposure (
  drug_exposure_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  drug_concept_id INTEGER NOT NULL,           -- Standard RxNorm
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

ETL conventions:
- `drug_concept_id` should be a **Clinical Drug** or **Branded Drug** (RxNorm), not an Ingredient (which loses dose information)
- `drug_exposure_end_date` = start + days_supply (when an end date is missing)
- For Vietnam, map the Ministry of Health drug catalogue to RxNorm using USAGI

## 7. MEASUREMENT vs. OBSERVATION — distinguishing them

This is the most commonly confused split. The rule:

| Criterion | MEASUREMENT | OBSERVATION |
|---|---|---|
| Quantitative/qualitative measurement with a **lab standard** | ✅ | ❌ |
| Vital signs (BP, HR, T°) | ✅ | ❌ |
| Lab tests (Glucose, HbA1c, CBC) | ✅ | ❌ |
| Personal history (smoking, family cancer history) | ❌ | ✅ |
| Lifestyle (BMI category, exercise) | ❌ | ✅ |
| Social determinants | ❌ | ✅ |
| Reported symptoms (chest pain) | ❌ | ✅ (when no structured measurement exists) |

### MEASUREMENT schema

```sql
CREATE TABLE measurement (
  measurement_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  measurement_concept_id INTEGER NOT NULL,    -- Standard LOINC
  measurement_date DATE NOT NULL,
  measurement_datetime TIMESTAMP,
  measurement_time VARCHAR(10),
  measurement_type_concept_id INTEGER NOT NULL,
  operator_concept_id INTEGER,                -- 4172703=>, 4172704=<, 4172756==
  value_as_number NUMERIC,
  value_as_concept_id INTEGER,                -- when the result is categorical
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
  measurement_event_id BIGINT,                -- CDM 5.4: links to specimen, episode
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

Procedures performed on a patient (surgery, interventions, vaccines):

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

For Vietnam, map the Ministry of Health DVKT (Technical Service catalogue) to SNOMED procedures.

## 9. Drug_Era and Condition_Era — derived

![Drug_Era and Condition_Era — derived](/images/blog/diagrams/omop-core-clinical-tables-deep-dive-d02.webp)

`DRUG_ERA` aggregates contiguous Drug_Exposures (default 30-day gap):

```sql
CREATE TABLE drug_era (
  drug_era_id BIGINT PRIMARY KEY,
  person_id BIGINT NOT NULL,
  drug_concept_id INTEGER NOT NULL,         -- INGREDIENT (not a product)
  drug_era_start_date DATE NOT NULL,
  drug_era_end_date DATE NOT NULL,
  drug_exposure_count INTEGER,
  gap_days INTEGER
);
```

Important: the `drug_concept_id` of a Drug_Era is an **Ingredient** (e.g. Metformin), not a product (Metformin 500mg). This makes "patient on Metformin" easy to analyze regardless of dose.

## 10. Common SQL patterns

### 10.1 Total patients by gender

```sql
SELECT 
  c.concept_name AS gender,
  COUNT(*) AS n_patient
FROM person p
JOIN concept c ON p.gender_concept_id = c.concept_id
GROUP BY c.concept_name;
```

### 10.2 Type 2 diabetes patients on Metformin in the last 90 days

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

### 10.3 Disease incidence rate in the 2026 population

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

### 10.4 Average HbA1c in T2DM patients

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

## 11. Indexing recommendations

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

OHDSI ships ready-made index scripts in `OMOPCDM_postgresql_5.4_indices.sql`.

## 12. Pitfalls

- ❌ `condition_concept_id = 0` (unmapped) → patients disappear from cohorts
- ❌ Forgetting `JOIN concept_ancestor` → cohorts miss disease variants
- ❌ Looking up HbA1c by `measurement_source_value` text → fragile; use `measurement_concept_id = 3004410`
- ❌ Computing incidence without `OBSERVATION_PERIOD` → wrong rates
- ❌ Forgetting `value_as_number BETWEEN ... AND ...` plausibility checks → outliers wreck analytics
- ❌ Mixing `Drug_Exposure` (Clinical/Branded Drug) with `Drug_Era` (Ingredient) → wrong results

## Conclusion

The seven core tables cover 90% of RWE analytics. Master Person, Visit, Condition, Drug, Measurement, Observation, and Procedure before touching the advanced tables. Always use `concept_ancestor` for hierarchies and validate plausibility.

Next article: [OMOP ETL Mastery — WhiteRabbit, RabbitInAHat, USAGI, Perseus](/blog/omop-etl-whiterabbit-usagi-perseus).
