---
id: 019f1a00-a114-7b01-e001-omopcdm54014
title: 'Lesson 14: CONCEPT & VOCABULARY — Standard dictionary foundation'
slug: bai-14-concept-vocabulary-nen-tang-tu-dien-chuan
description: >-
  The two tables are central to the Vocabulary system: CONCEPT contains all
  medical concepts, VOCABULARY manages the origins. Learn standard_concept,
  domain_id, concept_class_id, vocabulary_id and how to look up on Athena.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 14
section_title: 'Part 5: Standardized Vocabularies'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: OMOP CDM 5.4 for Beginners — Understand A to Z
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop14" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop14)"/>
  <g>
    <circle cx="690" cy="88" r="22" fill="#818cf8" opacity="0.11"/>
    <circle cx="770" cy="108" r="30" fill="#818cf8" opacity="0.08"/>
    <circle cx="850" cy="130" r="26" fill="#818cf8" opacity="0.07"/>
    <line x1="630" y1="160" x2="1100" y2="240" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="130" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Architecture — Lesson 14</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">CONCEPT & VOCABULARY</tspan>
    <tspan x="60" dy="42">Standard dictionary platform</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 for Beginners — Understand A to Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 5: Standardized Vocabularies</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Vocabulary ecosystem — CONCEPT, VOCABULARY, RELATIONSHIP, ANCESTOR](/storage/uploads/2026/04/omop-cdm-bai14-vocabulary-ecosystem.webp)

## Introduction

The **Standardized Vocabularies** system is the "brain" of OMOP CDM — all clinical data is linked here. This article focuses on two central tables: **CONCEPT** (containing ~10 million medical concepts) and **VOCABULARY** (managing 70+ dictionary sources). Understanding these two tables is the key to mastering OMOP.

---

## 1. CONCEPT table

### 1.1. Structure

| Column | Type | Description | Example |
|-----|--------|-------|-------|
| `concept_id` | INTEGER | PK — Globally unique ID | 201826 |
| `concept_name` | VARCHAR(255) | Concept name | "Type 2 diabetes mellitus" |
| `domain_id` | VARCHAR(20) | Domain (which table) | "Condition" |
| `vocabulary_id` | VARCHAR(20) | FK → VOCABULARY | "SNOMED" |
| `concept_class_id` | VARCHAR(20) | Classification in vocab | "Clinical Finding" |
| `standard_concept` | VARCHAR(1) | S=Standard, C=Classification, NULL | "S" |
| `concept_code` | VARCHAR(50) | Original code in vocabulary | "44054006" |
| `valid_start_date` | DATE | Effective start date | 2002-01-31 |
| `valid_end_date` | DATE | Expiry date | 2099-12-31 |
| `invalid_reason` | VARCHAR(1) | NULL=valid, U=updated, D=deleted | NULL |

### 1.2. standard_concept — Three types of Concepts

```
  ┌─────────────────────────────────────────────────────┐
  │ standard_concept = 'S' (Standard)                    │
  │ → Concept "chính thống" dùng trong *_concept_id     │
  │ → VD: SNOMED 201826 "Type 2 diabetes mellitus"      │
  │ → Dùng cho condition_concept_id                      │
  └──────────────────────┬──────────────────────────────┘
                         │ Maps to (nguồn → đích)
  ┌──────────────────────┴──────────────────────────────┐
  │ standard_concept = NULL (Non-standard / Source)      │
  │ → Concept nguồn từ ICD, CPT4, ATC...               │
  │ → VD: ICD10CM 45591837 "E11 - Type 2 DM"           │
  │ → Dùng cho *_source_concept_id                       │
  └─────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────┐
  │ standard_concept = 'C' (Classification)              │
  │ → Concept dùng cho phân cấp / ancestor              │
  │ → VD: MedDRA PT "Diabetes mellitus"                 │
  └─────────────────────────────────────────────────────┘
```

### 1.3. domain_id — Identifies the target table

| domain_id | CDM Table | Example |
|-----------|---------|-------|
| Conditions | CONDITION_OCCURRENCE | Diseases, symptoms |
| Drugs | DRUG_EXPOSURE | Medicine |
| Procedure | PROCEDURE_OCCURRENCE | Tips |
| Measurement | MEASUREMENT | Testing |
| Observation | OBSERVATION | Acknowledgment |
| Device | DEVICE_EXPOSURE | Equipment |
| Spec Anatomic Site | SPECIMEN | Sampling location |
| Visit | VISIT_OCCURRENCE | Type visit |
| Type Concept | *_type_concept_id | Data source |
| Gender | PERSON | Gender |
| Race | PERSON | Race |
| Unit | MEASUREMENT.unit | Unit |
| Route | DRUG_EXPOSURE.route | Route of administration |

---

## 2. VOCABULARY table

### 2.1. Structure

| Column | Type | Description |
|-----|--------|-------|
| `vocabulary_id` | VARCHAR(20) | PK — ID vocabulary |
| `vocabulary_name` | VARCHAR(255) | Full name |
| `vocabulary_reference` | VARCHAR(255) | Reference URL |
| `vocabulary_version` | VARCHAR(255) | Version |
| `vocabulary_concept_id` | INTEGER | FK → Representative Concept |

### 2.2. Popular Vocabulary

| vocabulary_id | Name | Main domain | Role |
|--------------|-----|-------------|---------|
| **SNOMED** | SNOMED-CT | Condition, Procedure, Observation | Standard for clinical use |
| **RxNorm** | RxNorm | Drugs | Standard for medicine |
| **LOINC** | LOINC | Measurement | Standard for testing |
| **ICD10CM** | ICD-10-CM | Conditions | Source concept diagnosis |
| **ICD10PCS** | ICD-10-PCS | Procedure | Source concept tips |
| **CPT4** | CPT-4 | Procedure, Measurement | Source billing code |
| **ATC** | ATC | Drugs | Classification of drugs |
| **UCUM** | UCUM | Unit | Unit of measurement |
| **Gender** | OMOP Gender | Gender | Gender |
| **Race** | Race | Race | Race |
| **CVX** | Vaccines | Drugs | Vaccine codes |

---

## 3. Look up Concept on Athena

### 3.1. Lookup step

```
  1. Vào athena.ohdsi.org
  2. Gõ từ khóa: "Type 2 diabetes"
  3. Filter:
     - Standard Concept: Standard ✓
     - Domain: Condition ✓
     - Vocabulary: SNOMED ✓
  4. Kết quả:
     concept_id:     201826
     concept_name:   Type 2 diabetes mellitus
     vocabulary_id:  SNOMED
     concept_code:   44054006
     standard_concept: S
     domain_id: Condition
```

### 3.2. SQL lookup

```sql
-- Tìm Standard Concept cho "tiểu đường type 2"
SELECT concept_id, concept_name, vocabulary_id,
       domain_id, standard_concept, concept_code
FROM concept
WHERE LOWER(concept_name) LIKE '%type 2 diabetes%'
  AND standard_concept = 'S'
  AND domain_id = 'Condition'
ORDER BY concept_name;

-- Tìm Source Concept (ICD-10) mapping đến Standard
SELECT
    c_src.concept_id AS source_concept_id,
    c_src.concept_code AS icd10_code,
    c_src.concept_name AS icd10_name,
    c_std.concept_id AS standard_concept_id,
    c_std.concept_name AS standard_name,
    c_std.vocabulary_id AS standard_vocab
FROM concept c_src
JOIN concept_relationship cr
    ON c_src.concept_id = cr.concept_id_1
    AND cr.relationship_id = 'Maps to'
JOIN concept c_std
    ON cr.concept_id_2 = c_std.concept_id
    AND c_std.standard_concept = 'S'
WHERE c_src.concept_code = 'E11'
  AND c_src.vocabulary_id = 'ICD10CM';
```

---

## 4. concept_class_id — Classification in Vocabulary

### 4.1. SNOMED

| concept_class_id | Meaning | Example |
|-----------------|---------|-------|
| Clinical Findings | Diseases, symptoms | Type 2 DM |
| Procedure | Tips | Appendectomy |
| Body Structure | Body structure | Liver |
| Substance | Quality | Glucose |
| Observable Entities | Measured Quantity | Blood pressure |
| Qualifier Value | Additional Value | Severe |

### 4.2. RxNorm

| concept_class_id | Level | Example |
|-----------------|-------|-------|
| Ingredient (IN) | Active ingredients | Metformin |
| Clinical Drug Form (CDF) | HC + dosage form | Metformin Oral Tablet |
| Clinical Drug (CD) | HC + dose + form | Metformin 500mg Tab |
| Branded Drug (BD) | Trade name | Glucophage 500mg Tab |
| Clinical Drug Comp (CDC) | HC + dose | Metformin 500mg |
| Brand Name (BN) | Trade name | Glucophage |
| Dose Form (DF) | Dosage form | Oral Tablet |

---

## 5. DOMAIN table

| Column | Type | Description |
|-----|--------|-------|
| `domain_id` | VARCHAR(20) | PK |
| `domain_name` | VARCHAR(255) | Domain name |
| `domain_concept_id` | INTEGER | FK → concept |

---

## 6. CONCEPT_CLASS table

| Column | Type | Description |
|-----|--------|-------|
| `concept_class_id` | VARCHAR(20) | PK |
| `concept_class_name` | VARCHAR(255) | Class name |
| `concept_class_concept_id` | INTEGER | FK → concept |

---

## 7. concept_id = 0 — Special meaning

| Concepts | Meaning | When to use |
|--------|---------|-------------|
| concept_id = 0 | "No matching concept" | Unable to map |
| concept_name | "No matching concept" | |
| domain_id | NULL | |
| vocabulary_id | "None" | |

```sql
-- Kiểm tra % records không map được
SELECT
    'condition_occurrence' AS table_name,
    COUNT(*) AS total_records,
    SUM(CASE WHEN condition_concept_id = 0 THEN 1 ELSE 0 END) AS unmapped,
    ROUND(SUM(CASE WHEN condition_concept_id = 0 THEN 1 ELSE 0 END) * 100.0
          / COUNT(*), 1) AS unmapped_pct
FROM condition_occurrence
UNION ALL
SELECT 'drug_exposure', COUNT(*),
    SUM(CASE WHEN drug_concept_id = 0 THEN 1 ELSE 0 END),
    ROUND(SUM(CASE WHEN drug_concept_id = 0 THEN 1 ELSE 0 END) * 100.0
          / COUNT(*), 1)
FROM drug_exposure
UNION ALL
SELECT 'measurement', COUNT(*),
    SUM(CASE WHEN measurement_concept_id = 0 THEN 1 ELSE 0 END),
    ROUND(SUM(CASE WHEN measurement_concept_id = 0 THEN 1 ELSE 0 END) * 100.0
          / COUNT(*), 1)
FROM measurement;
```

---

## Summary

1. **CONCEPT**: ~10 million records, each medical concept has a unique concept_id
2. **standard_concept**: S = Standard (mainly used), C = Classification, NULL = Source
3. **domain_id** determines which CDM table the data is stored in
4. **VOCABULARY**: 70+ dictionary sources (SNOMED, RxNorm, LOINC, ICD-10...)
5. **concept_id = 0**: "cannot map" — used when ETL cannot find the Standard Concept
6. Look up: **athena.ohdsi.org** or query the CONCEPT table directly

**Next article:** CONCEPT_RELATIONSHIP & CONCEPT_ANCESTOR — relationship and hierarchy between Concepts.

---

## References

- [OMOP CDM 5.4 — CONCEPT](https://ohdsi.github.io/CommonDataModel/cdm54.html#CONCEPT)
- [OMOP CDM 5.4 — VOCABULARY](https://ohdsi.github.io/CommonDataModel/cdm54.html#VOCABULARY)
- [Athena](https://athena.ohdsi.org/)
- [Book of OHDSI — Chapter 5: Standardized Vocabularies](https://ohdsi.github.io/TheBookOfOhdsi/StandardizedVocabularies.html)
