---
id: 019f1a00-a107-7b01-e001-omopcdm54007
title: 'Lesson 7: CONDITION_OCCURRENCE — Diagnosis & Pathology'
slug: bai-7-condition-occurrence-chan-doan-benh-ly
description: >-
  Record diagnosis, symptoms, pathological signs, condition_concept_id vs
  source_value, condition_status (admitting/primary/secondary), link to Visit
  and Provider, distinguish from OBSERVATION table.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 7
section_title: 'Part 3: Key clinical events'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: OMOP CDM 5.4 for Beginners — Understand A to Z
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop07" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop07)"/>
  <g>
    <circle cx="659" cy="87" r="22" fill="#818cf8" opacity="0.12"/>
    <circle cx="718" cy="106" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="777" cy="125" r="36" fill="#818cf8" opacity="0.06"/>
    <circle cx="895" cy="163" r="20" fill="#818cf8" opacity="0.1"/>
    <line x1="600" y1="157" x2="1100" y2="237" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Architecture — Lesson 7</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">CONDITION_OCCURRENCE</tspan>
    <tspan x="60" dy="42">Diagnosis & Pathology</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 for Beginners — Understand A to Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 3: Key clinical events</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![ICD-10 → SNOMED mapping process in CONDITION_OCCURRENCE](/storage/uploads/2026/04/omop-cdm-bai7-condition-mapping.webp)

## Introduction

**CONDITION_OCCURRENCE** records all medical diagnoses, symptoms, and signs that the doctor notes for the patient. This is often the most analyzed table in OMOP CDM — because medical research often starts with the question: "Who gets what?"

---

## 1. Table structure

| Column | Type | Required | Description |
|-----|-------|----------|-------|
| `condition_occurrence_id` | INTEGER | ✅ PK | Unique ID |
| `person_id` | INTEGER | ✅ FK | Patients |
| `condition_concept_id` | INTEGER | ✅ | Standard Concept (SNOMED) |
| `condition_start_date` | DATE | ✅ | Diagnosis start date |
| `condition_start_datetime` | DATETIME | | Date and time |
| `condition_end_date` | DATE | | Date of end of diagnosis |
| `condition_end_datetime` | DATETIME | | End date and time |
| `condition_type_concept_id` | INTEGER | ✅ | Data source |
| `condition_status_concept_id` | INTEGER | | Status (Primary, Admitting...) |
| `stop_reason` | VARCHAR(20) | | Reasons for stopping diagnosis |
| `provider_id` | INTEGER | FK | Diagnosis Doctor |
| `visit_occurrence_id` | INTEGER | FK | Related Visit |
| `visit_detail_id` | INTEGER | FK | Visit details (which department) |
| `condition_source_value` | VARCHAR(50) | | Original code (eg "E11") |
| `condition_source_concept_id` | INTEGER | | Original concept |
| `condition_status_source_value` | VARCHAR(50) | | Original status |

---

## 2. What is stored in CONDITION_OCCURRENCE?

### 2.1. SHOULD save

| Type | Example | Vocabulary |
|-------|-------|-------------|
| Disease diagnosis | Type 2 diabetes, Pneumonia | SNOMED CT |
| Symptoms | Fever, Abdominal pain, Cough | SNOMED CT |
| Clinical signs | Swollen feet, Jaundice | SNOMED CT |
| Differential diagnosis | Suspected pulmonary tuberculosis | SNOMED CT |

### 2.2. DO NOT save (save in another table)

| Type | Destination table | Reason |
|-------|-----------|-------|
| "History of diabetes" | OBSERVATION | Domain = Observation |
| "No allergies" | OBSERVATION | Absence → Observation |
| "BMI = 28" | MEASUREMENT | Domain = Measurement |
| Drug side effects | CONDITION + DRUG_EXPOSURE | Condition for ADR, Drug for drug causing |

---

## 3. condition_status_concept_id — Diagnostic status

| Concept ID | Status | Meaning |
|-----------|--------|--------|
| 32902 | Primary diagnosis | Primary Diagnosis |
| 32908 | Secondary diagnosis | Secondary Diagnosis |
| 32903 | Admitting diagnosis | Diagnosis at admission |
| 32904 | Discharge diagnosis | Diagnosis at discharge |
| 32906 | Provisional diagnosis | Provisional diagnosis |
| 32907 | Confirmed diagnosis | Confirmed diagnosis |

```sql
-- Ví dụ: BN nhập viện
-- Chẩn đoán nhập viện: Nghi lao phổi (provisional)
INSERT INTO condition_occurrence VALUES (
    70001, 100001, 255848,       -- SNOMED: Pneumonia
    '2024-06-10', NULL,
    '2024-06-20', NULL,
    32817,                        -- EHR
    32903,                        -- Admitting diagnosis
    NULL, 5001, 50001, NULL,
    'J18.9', 0,                   -- ICD-10: Pneumonia, unspecified
    'admitting'
);

-- Chẩn đoán xuất viện: Viêm phổi do phế cầu (confirmed)
INSERT INTO condition_occurrence VALUES (
    70002, 100001, 257315,       -- SNOMED: Pneumococcal pneumonia
    '2024-06-10', NULL,
    '2024-06-20', NULL,
    32817,                        -- EHR
    32904,                        -- Discharge diagnosis
    NULL, 5001, 50001, NULL,
    'J13', 0,                     -- ICD-10
    'discharge'
);
```

---

## 4. ETL for Vietnam ICD-10 data

### 4.1. Mapping process

```
  HIS: ma_benh = 'E11.65'  (ICD-10-CM)
       ten_benh = 'ĐTĐ type 2 có biến chứng mạch máu ngoại vi'
       │
       │ Bước 1: Tìm source concept
       ↓
  SOURCE CONCEPT: concept_id = 45591837
       vocabulary_id = ICD10CM
       concept_code = 'E11.65'
       │
       │ Bước 2: Tìm Standard Concept (Maps to)
       ↓
  STANDARD CONCEPT: concept_id = 201826
       vocabulary_id = SNOMED
       concept_name = 'Type 2 diabetes mellitus'
       domain_id = 'Condition'
```

```sql
-- SQL ETL
SELECT
    ROW_NUMBER() OVER() AS condition_occurrence_id,
    pm.person_id,
    COALESCE(cr.concept_id_2, 0) AS condition_concept_id,
    cd.ngay_chandoan AS condition_start_date,
    NULL AS condition_end_date,
    32817 AS condition_type_concept_id,
    CASE cd.loai_chandoan
        WHEN 'CHINH' THEN 32902   -- Primary
        WHEN 'PHU'   THEN 32908   -- Secondary
        ELSE 0
    END AS condition_status_concept_id,
    cd.ma_icd10 AS condition_source_value,
    COALESCE(c_source.concept_id, 0) AS condition_source_concept_id
FROM chandoan_his cd
JOIN person_mapping pm ON cd.ma_bn = pm.source_id
LEFT JOIN concept c_source
    ON cd.ma_icd10 = c_source.concept_code
    AND c_source.vocabulary_id = 'ICD10CM'
LEFT JOIN concept_relationship cr
    ON c_source.concept_id = cr.concept_id_1
    AND cr.relationship_id = 'Maps to'
LEFT JOIN concept c_std
    ON cr.concept_id_2 = c_std.concept_id
    AND c_std.standard_concept = 'S';
```

### 4.2. Vietnam-specific data processing

| Problem | Solution |
|--------|-----------|
| ICD-10-VN is different from ICD-10-CM | Mapping via SOURCE_TO_CONCEPT_MAP |
| BV internal code | Usagi mapping tool |
| Missing end date | condition_end_date = NULL (valid) |
| 1 ICD map many SNOMED | Choose the most suitable concept |

---

## 5. Distinguish between CONDITION and OBSERVATION

| Criteria | CONDITION_OCCURRENCE | OBSERVATION |
|-----------|---------------------|-------------|
| **Content** | Current illness/under treatment | Prehistory, lifestyle, records |
| **Example** | "Type 2 diabetes" | "Family history of diabetes" |
| **Domain** | Conditions | Observation |
| **Standard Vocab** | SNOMED CT | SNOMED CT |
| **When?** | Active disease | Record information |

> **Rule:** Always check Standard Concept's **domain_id** on Athena. If domain = "Observation", save to OBSERVATION even though the source is ICD-10.

---

## 6. Popular SQL analysis

```sql
-- Top 10 chẩn đoán phổ biến nhất
SELECT
    c.concept_name AS condition_name,
    COUNT(DISTINCT co.person_id) AS patient_count,
    COUNT(*) AS record_count
FROM condition_occurrence co
JOIN concept c ON co.condition_concept_id = c.concept_id
WHERE co.condition_concept_id != 0
GROUP BY c.concept_name
ORDER BY patient_count DESC
LIMIT 10;

-- Tỉ lệ mắc bệnh theo giới tính
SELECT
    g.concept_name AS gender,
    c.concept_name AS condition_name,
    COUNT(DISTINCT co.person_id) AS patients
FROM condition_occurrence co
JOIN person p ON co.person_id = p.person_id
JOIN concept g ON p.gender_concept_id = g.concept_id
JOIN concept c ON co.condition_concept_id = c.concept_id
WHERE co.condition_concept_id = 201826  -- Type 2 DM
GROUP BY g.concept_name, c.concept_name;

-- Comorbidity: BN tiểu đường có tăng huyết áp?
SELECT
    COUNT(DISTINCT co_dm.person_id) AS dm_patients,
    COUNT(DISTINCT co_ht.person_id) AS dm_with_hypertension,
    ROUND(
        COUNT(DISTINCT co_ht.person_id) * 100.0 /
        NULLIF(COUNT(DISTINCT co_dm.person_id), 0), 1
    ) AS comorbidity_pct
FROM condition_occurrence co_dm
LEFT JOIN condition_occurrence co_ht
    ON co_dm.person_id = co_ht.person_id
    AND co_ht.condition_concept_id IN (
        SELECT descendant_concept_id
        FROM concept_ancestor
        WHERE ancestor_concept_id = 320128  -- Essential hypertension
    )
WHERE co_dm.condition_concept_id IN (
    SELECT descendant_concept_id
    FROM concept_ancestor
    WHERE ancestor_concept_id = 201826  -- Type 2 DM
);
```

---

## Summary

1. **CONDITION_OCCURRENCE** = diagnosis, symptoms, signs of pathology
2. **condition_concept_id** uses Standard Concept (SNOMED CT)
3. **condition_status**: Primary, Secondary, Admitting, Discharge
4. **Tree of three columns**: concept_id / source_value / source_concept_id
5. **Distinguish** CONDITION (current illness) vs OBSERVATION (history, record)
6. **ETL VN**: ICD-10-VN → Source Concept → Maps to → Standard SNOMED

**Next article:** DRUG_EXPOSURE — how OMOP CDM records drugs, prescriptions, and vaccines.

---

## References

- [OMOP CDM 5.4 — CONDITION_OCCURRENCE](https://ohdsi.github.io/CommonDataModel/cdm54.html#CONDITION_OCCURRENCE)
- [Athena — Condition Domain](https://athena.ohdsi.org/)
