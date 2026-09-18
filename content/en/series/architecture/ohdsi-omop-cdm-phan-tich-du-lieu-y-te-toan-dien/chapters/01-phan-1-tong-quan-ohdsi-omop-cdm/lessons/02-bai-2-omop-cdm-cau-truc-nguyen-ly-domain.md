---
id: 019e0b20-b202-7a01-e001-f1a7f8000002
title: 'Lesson 2: OMOP Common Data Model — Structure, principles & Domain'
slug: bai-2-omop-cdm-cau-truc-nguyen-ly-domain
description: >-
  OMOP CDM v5.4 architecture, table groups (Clinical Data, Health System, Health
  Economics, Standardized Vocabularies, Metadata), relationships between domains
  (Condition, Drug, Procedure, Measurement, Observation), Person-Visit-Event
  model and design principles.
duration_minutes: 90
is_free: true
video_url: null
sort_order: 2
section_title: 'Part 1: Overview of OHDSI & OMOP CDM'
course:
  id: 019e0b20-b200-7a01-e001-f1a7f8000001
  title: OHDSI & OMOP CDM — Comprehensive Healthcare Data Analysis
  slug: ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-1930" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-1930)"/>

  <!-- Decorations -->
  <g>
    <circle cx="919" cy="147" r="22" fill="#818cf8" opacity="0.12000000000000001"/>
    <circle cx="738" cy="186" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="1057" cy="225" r="36" fill="#818cf8" opacity="0.060000000000000005"/>
    <circle cx="876" cy="264" r="13" fill="#818cf8" opacity="0.13"/>
    <circle cx="695" cy="43" r="20" fill="#818cf8" opacity="0.1"/>
    <circle cx="750" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="750" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="778" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="806" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="834" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="862" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="80" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="108" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="136" r="1.5" fill="#818cf8" opacity="0.15"/>
    <circle cx="890" cy="164" r="1.5" fill="#818cf8" opacity="0.15"/>
    <line x1="600" y1="137" x2="1100" y2="217" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="167" x2="1050" y2="237" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="964.712812921102,121 964.712812921102,153 937,169 909.287187078898,153 909.287187078898,121.00000000000001 937,105" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Architecture — Lesson 2</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 2: OMOP Common Data Model — Structure,</tspan>
      <tspan x="60" dy="42">principle & Domain</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OHDSI & OMOP CDM — Comprehensive Healthcare Data Analysis</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 1: Overview of OHDSI & OMOP CDM</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Lesson 2: OMOP CDM — Structure & Domain](/storage/uploads/2026/03/ohdsi-bai-2-omop-cdm-structure.webp)

## Introduction

OMOP CDM (Common Data Model) is the core foundation of the entire OHDSI ecosystem. Every tool — ATLAS, WebAPI, ACHILLES, HADES — operates on data normalized according to this model.

This article will delve into the structure, design principles, and main domains of OMOP CDM v5.4.

---

## 1. OMOP CDM design principles

### 1.1 Core philosophy

```
1. Patient-Centric (Lấy bệnh nhân làm trung tâm)
   → Mọi dữ liệu gắn với PERSON

2. Event-Based (Dựa trên sự kiện)
   → Mỗi record = 1 sự kiện y tế (chẩn đoán, kê thuốc, xét nghiệm...)

3. Concept-Oriented (Dựa trên khái niệm)
   → Mỗi sự kiện gắn với Standard Concept từ Vocabulary

4. Source-Preserving (Giữ nguyên dữ liệu gốc)
   → Luôn có cột source_value, source_concept_id bên cạnh standard

5. Platform-Agnostic (Không phụ thuộc nền tảng)
   → Chạy trên PostgreSQL, SQL Server, Oracle, Spark, Databricks...
```

### 1.2 Person-Visit-Event Model

```
                  PERSON (bệnh nhân)
                    │
                    │ 1:N
                    ▼
              VISIT_OCCURRENCE (lượt khám)
                    │
                    │ 1:N
          ┌─────────┼─────────────────────────────┐
          ▼         ▼         ▼         ▼         ▼
    CONDITION   DRUG      PROCEDURE  MEASURE   OBSERVATION
    (chẩn đoán) (thuốc)  (thủ thuật) (XN)     (quan sát)
```

Practical example:
```sql
-- Bệnh nhân đến khám ngày 2024-03-01
-- Được chẩn đoán Tăng huyết áp (I10), kê Amlodipine 5mg,
-- Xét nghiệm Glucose máu: 126 mg/dL

PERSON:          person_id = 12345
VISIT:           visit_id = 67890, visit_date = 2024-03-01
CONDITION:       condition_concept_id = 320128 (Essential HTN)
DRUG_EXPOSURE:   drug_concept_id = 1332419 (Amlodipine 5mg)
MEASUREMENT:     measurement_concept_id = 3004410 (Glucose)
                 value_as_number = 126, unit_concept_id = 8840 (mg/dL)
```

---

## 2. Table groups in OMOP CDM v5.4

### 2.1 Overview

```
OMOP CDM v5.4
├── Standardized Vocabularies (15 tables)
│   ├── CONCEPT
│   ├── VOCABULARY
│   ├── DOMAIN
│   ├── CONCEPT_CLASS
│   ├── CONCEPT_RELATIONSHIP
│   ├── RELATIONSHIP
│   ├── CONCEPT_SYNONYM
│   ├── CONCEPT_ANCESTOR
│   ├── SOURCE_TO_CONCEPT_MAP
│   ├── DRUG_STRENGTH
│   └── ...
│
├── Standardized Clinical Data (12 tables)
│   ├── PERSON
│   ├── OBSERVATION_PERIOD
│   ├── VISIT_OCCURRENCE
│   ├── VISIT_DETAIL
│   ├── CONDITION_OCCURRENCE
│   ├── DRUG_EXPOSURE
│   ├── PROCEDURE_OCCURRENCE
│   ├── DEVICE_EXPOSURE
│   ├── MEASUREMENT
│   ├── OBSERVATION
│   ├── NOTE
│   └── NOTE_NLP
│
├── Standardized Health System (2 tables)
│   ├── LOCATION
│   └── CARE_SITE
│
├── Standardized Health Economics (2 tables)
│   ├── PAYER_PLAN_PERIOD
│   └── COST
│
├── Standardized Derived Elements (4 tables)
│   ├── DRUG_ERA
│   ├── DOSE_ERA
│   ├── CONDITION_ERA
│   └── EPISODE + EPISODE_EVENT
│
├── Results Schema
│   ├── COHORT
│   └── COHORT_DEFINITION
│
└── Metadata
    ├── CDM_SOURCE
    └── METADATA
```

---

## 3. Important Clinical Data tables

### 3.1 PERSON

```sql
CREATE TABLE person (
  person_id               BIGINT       NOT NULL,  -- PK, auto-generated
  gender_concept_id       INT          NOT NULL,  -- 8507=Male, 8532=Female
  year_of_birth           INT          NOT NULL,
  month_of_birth          INT          NULL,
  day_of_birth            INT          NULL,
  birth_datetime          TIMESTAMP    NULL,
  race_concept_id         INT          NOT NULL,
  ethnicity_concept_id    INT          NOT NULL,
  location_id             BIGINT       NULL,
  care_site_id            BIGINT       NULL,
  person_source_value     VARCHAR(50)  NULL,      -- Mã BN gốc
  gender_source_value     VARCHAR(50)  NULL,
  gender_source_concept_id INT        NULL
);
```

**Important note**:
- `person_id` NOT the original patient code (privacy)
- Original patient code stored in `person_source_value`
- Gender, race, and ethnicity all use Standard Concept IDs

### 3.2 VISIT_OCCURRENCE

```sql
CREATE TABLE visit_occurrence (
  visit_occurrence_id     BIGINT       NOT NULL,  -- PK
  person_id               BIGINT       NOT NULL,  -- FK → person
  visit_concept_id        INT          NOT NULL,  -- Loại visit
  visit_start_date        DATE         NOT NULL,
  visit_start_datetime    TIMESTAMP    NULL,
  visit_end_date          DATE         NOT NULL,
  visit_end_datetime      TIMESTAMP    NULL,
  visit_type_concept_id   INT          NOT NULL,  -- Nguồn dữ liệu
  care_site_id            BIGINT       NULL,
  visit_source_value      VARCHAR(50)  NULL,
  visit_source_concept_id INT          NULL
);

-- visit_concept_id phổ biến:
-- 9201 = Inpatient Visit (nội trú)
-- 9202 = Outpatient Visit (ngoại trú)
-- 9203 = Emergency Room Visit (cấp cứu)
-- 262  = Emergency Room and Inpatient Visit
```

### 3.3 CONDITION_OCCURRENCE

```sql
CREATE TABLE condition_occurrence (
  condition_occurrence_id     BIGINT       NOT NULL,
  person_id                   BIGINT       NOT NULL,
  condition_concept_id        INT          NOT NULL,  -- Standard Concept
  condition_start_date        DATE         NOT NULL,
  condition_start_datetime    TIMESTAMP    NULL,
  condition_end_date          DATE         NULL,
  condition_end_datetime      TIMESTAMP    NULL,
  condition_type_concept_id   INT          NOT NULL,
  condition_status_concept_id INT          NULL,
  stop_reason                 VARCHAR(20)  NULL,
  visit_occurrence_id         BIGINT       NULL,     -- FK → visit
  condition_source_value      VARCHAR(50)  NULL,     -- Mã ICD gốc: "I10"
  condition_source_concept_id INT          NULL      -- ICD concept: 45566052
);
```

**Dual concept pattern** (very important):
```
condition_concept_id        = 320128     ← SNOMED "Essential HTN" (Standard)
condition_source_concept_id = 45566052   ← ICD-10CM "I10" (Source)
condition_source_value      = "I10"      ← Giá trị text gốc
```

### 3.4 DRUG_EXPOSURE

```sql
CREATE TABLE drug_exposure (
  drug_exposure_id          BIGINT       NOT NULL,
  person_id                 BIGINT       NOT NULL,
  drug_concept_id           INT          NOT NULL,  -- RxNorm concept
  drug_exposure_start_date  DATE         NOT NULL,
  drug_exposure_start_datetime TIMESTAMP NULL,
  drug_exposure_end_date    DATE         NOT NULL,
  drug_type_concept_id      INT          NOT NULL,
  stop_reason               VARCHAR(20)  NULL,
  refills                   INT          NULL,
  quantity                  NUMERIC      NULL,
  days_supply               INT          NULL,
  sig                       TEXT         NULL,       -- Hướng dẫn sử dụng
  route_concept_id          INT          NULL,       -- Đường dùng: oral, IV
  lot_number                VARCHAR(50)  NULL,
  visit_occurrence_id       BIGINT       NULL,
  drug_source_value         VARCHAR(50)  NULL,       -- Tên thuốc gốc
  drug_source_concept_id    INT          NULL,
  route_source_value        VARCHAR(50)  NULL,
  dose_unit_source_value    VARCHAR(50)  NULL
);
```

### 3.5 MEASUREMENT

```sql
CREATE TABLE measurement (
  measurement_id              BIGINT       NOT NULL,
  person_id                   BIGINT       NOT NULL,
  measurement_concept_id      INT          NOT NULL,  -- LOINC concept
  measurement_date            DATE         NOT NULL,
  measurement_datetime        TIMESTAMP    NULL,
  measurement_type_concept_id INT          NOT NULL,
  operator_concept_id         INT          NULL,      -- =, <, >, <=, >=
  value_as_number             NUMERIC      NULL,      -- Giá trị số
  value_as_concept_id         INT          NULL,      -- Giá trị mã (Pos/Neg)
  unit_concept_id             INT          NULL,      -- Đơn vị đo (UCUM)
  range_low                   NUMERIC      NULL,      -- Khoảng tham chiếu
  range_high                  NUMERIC      NULL,
  visit_occurrence_id         BIGINT       NULL,
  measurement_source_value    VARCHAR(50)  NULL,
  measurement_source_concept_id INT        NULL,
  unit_source_value           VARCHAR(50)  NULL,
  value_source_value          VARCHAR(50)  NULL
);
```

---

## 4. Standardized Vocabularies

### 4.1 CONCEPT Table — The Center of Everything

```sql
CREATE TABLE concept (
  concept_id       INT          NOT NULL,  -- Unique ID
  concept_name     VARCHAR(255) NOT NULL,  -- Tên concept
  domain_id        VARCHAR(20)  NOT NULL,  -- Condition, Drug, Measurement...
  vocabulary_id    VARCHAR(20)  NOT NULL,  -- SNOMED, RxNorm, LOINC...
  concept_class_id VARCHAR(20)  NOT NULL,  -- Clinical Finding, Ingredient...
  standard_concept VARCHAR(1)   NULL,      -- 'S'=Standard, 'C'=Class, NULL=Non-standard
  concept_code     VARCHAR(50)  NOT NULL,  -- Mã gốc: "38341003"
  valid_start_date DATE         NOT NULL,
  valid_end_date   DATE         NOT NULL,  -- 2099-12-31 = vẫn active
  invalid_reason   VARCHAR(1)   NULL       -- NULL=Valid, 'D'=Deleted, 'U'=Upgraded
);
```

### 4.2 Main Vocabulary Domains

```
Domain            Vocabulary       Ví dụ
─────────────────────────────────────────────────────────
Condition         SNOMED CT        Tăng huyết áp, Đái tháo đường
Drug              RxNorm           Amlodipine 5mg, Metformin 500mg
Measurement       LOINC            Glucose máu, HbA1c, Creatinine
Procedure         SNOMED CT/CPT4   Phẫu thuật, nội soi, siêu âm
Observation       SNOMED CT        Tiền sử gia đình, thói quen
Device            SNOMED CT        Stent, pacemaker
Spec Anatomic Site SNOMED CT       Tim, gan, thận
Unit              UCUM             mg/dL, mmol/L, kg
Gender            Gender           Male, Female
Race              Race             Asian, White, Black
```

### 4.3 Standard vs Source Concepts

```
Source Data:       "I10" (ICD-10-CM)
                      │
                      │ "Maps to" relationship
                      ▼
Standard Concept:  "Essential hypertension" (SNOMED CT, concept_id=320128)

Quy tắc:
- Phân tích DÙng standard_concept = 'S' (Standard)
- Source concept giữ lại để truy xuất ngược
- Một source concept có thể map sang nhiều standard concepts
```

---

## 5. Derived Elements — Precalculated table

### 5.1 ERA Tables

```
CONDITION_ERA: Gộp các condition liên tiếp thành 1 "era"

Timeline:
  ├── Condition A (01/01 - 15/01)
  ├── Gap 10 ngày
  ├── Condition A (25/01 - 10/02)
  └── CONDITION_ERA: 01/01 - 10/02 (gap_days ≤ 30 → merge)

DRUG_ERA: Tương tự, gộp drug exposures liên tiếp
  ├── Drug X 30 ngày supply (01/01)
  ├── Drug X 30 ngày supply (01/02)
  └── DRUG_ERA: 01/01 - 02/03 (liên tục dùng thuốc)
```

### 5.2 Meaning

- **CONDITION_ERA**: How long has the patient had disease X? (duration)
- **DRUG_ERA**: How long has the patient used medicine Y continuously? (adherence)
- Automatically calculated by ETL or ACHILLES

---

## 6. ERD — Relationships between tables

```
                                    ┌──────────────┐
                                    │   LOCATION   │
                                    └──────┬───────┘
                                           │
┌──────────────┐    ┌──────────────┐    ┌──┴───────────┐
│ CDM_SOURCE   │    │  CARE_SITE   │◄───│   PERSON     │
└──────────────┘    └──────────────┘    └──────┬───────┘
                                               │
                                    ┌──────────┴──────────┐
                                    │ OBSERVATION_PERIOD   │
                                    └──────────┬──────────┘
                                               │
                                    ┌──────────┴──────────┐
                                    │ VISIT_OCCURRENCE     │
                                    └──────────┬──────────┘
                                               │
        ┌──────────┬──────────┬────────────────┼────────────┐
        ▼          ▼          ▼                ▼            ▼
  ┌──────────┐ ┌────────┐ ┌───────────┐ ┌───────────┐ ┌─────────┐
  │CONDITION │ │ DRUG   │ │PROCEDURE  │ │MEASUREMENT│ │OBSERV   │
  │OCCURRENCE│ │EXPOSURE│ │OCCURRENCE │ │           │ │ATION    │
  └──────────┘ └────────┘ └───────────┘ └───────────┘ └─────────┘
        │          │
        ▼          ▼
  ┌──────────┐ ┌────────┐
  │CONDITION │ │DRUG_ERA│
  │ERA       │ │DOSE_ERA│
  └──────────┘ └────────┘
```

---

## 7. Query Examples

### 7.1 Count patients by gender

```sql
SELECT
  c.concept_name AS gender,
  COUNT(*) AS patient_count
FROM person p
JOIN concept c ON p.gender_concept_id = c.concept_id
GROUP BY c.concept_name;
```

### 7.2 Top 10 common diagnoses

```sql
SELECT
  c.concept_name AS condition_name,
  COUNT(DISTINCT co.person_id) AS patient_count
FROM condition_occurrence co
JOIN concept c ON co.condition_concept_id = c.concept_id
WHERE c.standard_concept = 'S'
GROUP BY c.concept_name
ORDER BY patient_count DESC
LIMIT 10;
```

### 7.3 Hypertensive patients taking Amlodipine

```sql
SELECT COUNT(DISTINCT p.person_id)
FROM person p
JOIN condition_occurrence co ON p.person_id = co.person_id
JOIN drug_exposure de ON p.person_id = de.person_id
WHERE co.condition_concept_id = 320128        -- Essential HTN
  AND de.drug_concept_id = 1332419            -- Amlodipine 5mg
  AND de.drug_exposure_start_date >= co.condition_start_date;
```

---

## Summary

| Concept | Explanation |
|-----------|-----------|
| OMOP CDM v5.4 | Generic data model with ~37 tables |
| Person-Visit-Event | All events associated with Person via Visit |
| Dual Concept | Standard concept + Source concept in parallel |
| Standard Concept | Standard concepts used in analysis (SNOMED, ​​RxNorm, LOINC) |
| Source Concept | Original concept from source data (ICD-10, internal code) |
| ERA Tables | The derived table groups consecutive events into time periods |

**Next article**: Athena — Look up & Manage Standardized Vocabularies
