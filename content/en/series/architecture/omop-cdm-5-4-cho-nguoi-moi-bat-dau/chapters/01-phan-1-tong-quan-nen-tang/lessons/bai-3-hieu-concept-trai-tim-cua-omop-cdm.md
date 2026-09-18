---
id: 019f1a00-a103-7b01-e001-omopcdm54003
title: 'Lesson 3: Understanding the Concept — The heart of OMOP CDM'
slug: bai-3-hieu-concept-trai-tim-cua-omop-cdm
description: >-
  What is Concept, Standard Concept vs Source Concept vs Classification Concept,
  concept_id vs source_value vs source_concept_id, Domain, Vocabulary, Concept
  Class, and how to look up on Athena.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 3
section_title: 'Part 1: Overview & Background'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: OMOP CDM 5.4 for Beginners — Understand A to Z
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop03" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop03)"/>
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Architecture — Lesson 3</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">Understanding Concept — Heart</tspan>
    <tspan x="60" dy="42">of OMOP CDM</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 for Beginners — Understand A to Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 1: Overview & Background</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Concept System — Source, Standard and Classification](/storage/uploads/2026/04/omop-cdm-bai3-concept-system.webp)

## Introduction

If OMOP CDM is a house, then **Concept** is the brick — everything is built from Concept. Understanding the Concept is the key to understanding CDM as a whole.

This article will explain: What is Concept? Is Standard vs Source Concept different? How to look up Concept on Athena? And the "holy trinity" `concept_id` / `source_value` / `source_concept_id` How does it work?

---

## 1. What is concept?

### 1.1. Definition

**Concept** = a unique medical "concept", represented by a number called **concept_id**.

Everything you encounter in medicine has a corresponding Concept:

| Medical Entity | concept_id | concept_name | Vocabulary |
|----------|-----------|--------------|-----------|
| Women | 8532 | Female | Gender |
| Type 2 diabetes | 201826 | Type 2 diabetes mellitus | SNOMED |
| Metformin 500mg tablets | 1503297 | metformin 500 MG Oral Tablet | RxNorm |
| HbA1c test | 3004410 | Hemoglobin A1c/Hemoglobin.total in Blood | LOINC |
| Percent unit | 8554 | percent | UCUM |
| Outpatient examination | 9202 | Outpatient Visit | Visit |
| Data from EHR | 32817 | EHR | Type Concept |

### 1.2. CONCEPT table

Each Concept is saved as a row in the table `CONCEPT`:

```sql
SELECT *
FROM concept
WHERE concept_id = 201826;
```

| Column | Value | Description |
|-----|---------|-------|
| `concept_id` | 201826 | Unique ID |
| `concept_name` | Type 2 diabetes mellitus | Display name |
| `domain_id` | Conditions | Which domain does it belong to |
| `vocabulary_id` | SNOMED | Which vocabulary word |
| `concept_class_id` | Clinical Findings | Concept type |
| `standard_concept` | S | **S** = Standard |
| `concept_code` | 44054006 | Original code in vocabulary |
| `valid_start_date` | 1970-01-01 | Effective start date |
| `valid_end_date` | 2099-12-31 | Expiry date |
| `invalid_reason` | NULL | Invalid reason |

---

## 2. Standard Concept vs Source Concept vs Classification

### 2.1. Three types of Concepts

```
  standard_concept column:
  ┌─────────────────────────────────────────────────────────────┐
  │                                                             │
  │  'S' = STANDARD CONCEPT                                    │
  │  → Dùng trong *_concept_id columns                          │
  │  → Là "đại diện chính thức" cho một khái niệm              │
  │  → VD: SNOMED 201826 "Type 2 diabetes mellitus"             │
  │                                                             │
  │  'C' = CLASSIFICATION CONCEPT                               │
  │  → Dùng để phân nhóm/phân cấp                              │
  │  → KHÔNG dùng trực tiếp trong clinical tables               │
  │  → VD: SNOMED parent concepts                               │
  │                                                             │
  │  NULL = NON-STANDARD (SOURCE) CONCEPT                       │
  │  → Mã từ vocabulary gốc                                     │
  │  → Lưu trong *_source_concept_id columns                    │
  │  → VD: ICD-10 E11 "Type 2 diabetes mellitus"               │
  │                                                             │
  └─────────────────────────────────────────────────────────────┘
```

### 2.2. Specific example: "Type 2 diabetes"

```
  ICD-10-CM 'E11'                         SNOMED 44054006
  ┌──────────────────────┐    Maps to     ┌──────────────────────────┐
  │ concept_id = 443238  │ ──────────→    │ concept_id = 201826      │
  │ standard_concept=NULL│                │ standard_concept = 'S'    │
  │ vocabulary=ICD10CM   │                │ vocabulary = SNOMED       │
  │ (Source Concept)     │                │ (Standard Concept)        │
  └──────────────────────┘                └──────────────────────────┘

  Trong bảng CONDITION_OCCURRENCE:
  ┌────────────────────────────────────────────────────────────────────┐
  │ condition_concept_id        = 201826    ← Standard (SNOMED)       │
  │ condition_source_value      = 'E11'     ← Text gốc từ HIS        │
  │ condition_source_concept_id = 443238    ← Source Concept (ICD-10) │
  └────────────────────────────────────────────────────────────────────┘
```

### 2.3. The holy trinity

Most clinical tables have 3 columns for each concept field:

| Column | Purpose | Value |
|-----|---------|---------|
| `*_concept_id` | **Analysis** — standard concept | Standard Concept ID (S) |
| `*_source_value` | **Trace** — original text value | Original text (eg: "E11", "Glucophage") |
| `*_source_concept_id` | **Reverse Mapping** — original concept | Non-standard Concept ID |

```
  ┌── Dùng để phân tích (SELECT, GROUP BY, JOIN)
  │
  condition_concept_id = 201826  ← Standard SNOMED
                                                    ├── Truy nguyên nguồn gốc
  condition_source_value = 'E11'  ← Text gốc HIS   │
  condition_source_concept_id = 443238  ← ICD-10 ───┘
```

---

## 3. Domain — Which table does Concept belong to?

### 3.1. Main Domains

| Domain | Destination table | Example |
|--------|-----------|-------|
| Conditions | CONDITION_OCCURRENCE | Diabetes, pneumonia |
| Drugs | DRUG_EXPOSURE | Metformin, Amoxicillin |
| Procedure | PROCEDURE_OCCURRENCE | Endoscopy, surgery |
| Measurement | MEASUREMENT | HbA1c, blood pressure, BMI |
| Observation | OBSERVATION | Smoking, family history |
| Device | DEVICE_EXPOSURE | Stents, pacemakers |
| Specimen | SPECIMEN | Blood samples, tissue samples |
| Visit | VISIT_OCCURRENCE | Outpatient examination, hospitalization |
| Gender | PERSON | Male, Female |
| Race | PERSON | Asian, White |
| Type Concept | All tables | EHR, Claim, Lab |
| Unit | MEASUREMENT | mg/dL, %, mmHg |
| Route | DRUG_EXPOSURE | Oral, IV, Topical |

### 3.2. Why is Domain important?

The domain decides **which table the record is in**. Here are the core ETL rules:

```
  Dữ liệu nguồn: "ICD-10: Z87.891 — History of nicotine dependence"
  
  Bước 1: Tra cứu ICD-10 Z87.891 trên Athena
  Bước 2: Tìm Standard Concept → maps to SNOMED concept
  Bước 3: Standard Concept thuộc domain "Observation"
  Bước 4: Lưu vào bảng OBSERVATION (không phải CONDITION!)
  
  ⚠️ Dù ICD-10 thường gắn với Condition domain,
  nhưng "History of" map sang Observation domain
```

---

## 4. Vocabulary — Concept Origin

### 4.1. Important Vocabularies

```
  ┌──────────────────────────────────────────────────────────────────┐
  │  VOCABULARY CHÍNH TRONG OMOP CDM                                 │
  │                                                                   │
  │  ┌─────────────┐   Conditions (diagnoses, symptoms)              │
  │  │  SNOMED CT  │   → Standard vocabulary cho Condition domain     │
  │  └─────────────┘                                                  │
  │                                                                   │
  │  ┌─────────────┐   Drugs (medications, vaccines)                  │
  │  │  RxNorm     │   → Standard vocabulary cho Drug domain          │
  │  └─────────────┘                                                  │
  │                                                                   │
  │  ┌─────────────┐   Measurements (lab tests, vitals)              │
  │  │   LOINC     │   → Standard vocabulary cho Measurement domain  │
  │  └─────────────┘                                                  │
  │                                                                   │
  │  ┌─────────────┐   Procedures                                     │
  │  │  SNOMED CT  │   → Standard vocabulary cho Procedure domain     │
  │  │  CPT4       │   → US-specific procedures                       │
  │  └─────────────┘                                                  │
  │                                                                   │
  │  SOURCE VOCABULARIES (Non-standard, cần mapping):                 │
  │  ICD-10-CM/VN, ICD-9-CM, NDC, HCPCS, ATC, Read, MedDRA         │
  └──────────────────────────────────────────────────────────────────┘
```

### 4.2. Standard vs Non-standard Vocabulary

| Type | Example | standard_concept | Used in column |
|-------|-------|-------|-------------|
| **Standard** | SNOMED CT, RxNorm, LOINC | 'S' | `*_concept_id` |
| **Non-standard** | ICD-10, NDC, ATC, MedDRA | NULL | `*_source_concept_id` |
| **Classification** | SNOMED hierarchy nodes | 'C' | Used in hierarchical queries |

### 4.3. Mapping process

```
  HIS: "E11" (ICD-10)
       │
       │  Tra bảng CONCEPT_RELATIONSHIP
       │  relationship_id = 'Maps to'
       ↓
  Source Concept: 443238 (ICD-10 E11)
       │
       │  Maps to
       ↓
  Standard Concept: 201826 (SNOMED Type 2 diabetes mellitus)
```

SQL lookup mapping:

```sql
-- Tìm Standard Concept từ ICD-10 code 'E11'
SELECT
    c1.concept_id   AS source_concept_id,
    c1.concept_name AS source_name,
    c1.vocabulary_id AS source_vocab,
    c2.concept_id   AS standard_concept_id,
    c2.concept_name AS standard_name,
    c2.vocabulary_id AS standard_vocab
FROM concept c1
JOIN concept_relationship cr
    ON c1.concept_id = cr.concept_id_1
    AND cr.relationship_id = 'Maps to'
JOIN concept c2
    ON cr.concept_id_2 = c2.concept_id
    AND c2.standard_concept = 'S'
WHERE c1.concept_code = 'E11'
  AND c1.vocabulary_id = 'ICD10CM';
```

---

## 5. Concept Class — Detailed classification

Each Concept belongs to a **Concept Class** that indicates which level of vocabulary it belongs to:

| Domain | Concept Class | Example |
|--------|---------------|-------|
| Conditions | Clinical Findings | Type 2 diabetes mellitus |
| Drugs | **Ingredient** | Metformin |
| Drugs | **Clinical Drug** | Metformin 500 MG Oral Tablet |
| Drugs | **Branded Drug** | Glucophage 500 MG Oral Tablet |
| Measurement | Lab Test | Hemoglobin A1c |
| Measurement | Clinical Observation | Bodyweight |
| Procedure | Procedure | Coronary artery bypass grafting |
| Observation | Context-dependent | History of clinical findings |

### Drug Concept Class — Particularly important

RxNorm organizes drugs by level:

```
  INGREDIENT (hoạt chất)
  └── Metformin (concept_id = 1503297)
       │
       ├── CLINICAL DRUG FORM
       │   └── Metformin Oral Tablet
       │        │
       │        ├── CLINICAL DRUG (hoạt chất + liều + dạng)
       │        │   └── Metformin 500 MG Oral Tablet
       │        │        │
       │        │        └── BRANDED DRUG (tên thương mại)
       │        │            └── Glucophage 500 MG Oral Tablet
       │        │
       │        └── CLINICAL DRUG
       │            └── Metformin 1000 MG Oral Tablet
       │
       └── CLINICAL DRUG FORM
           └── Metformin Extended Release Oral Tablet
```

---

## 6. Look up Concept on Athena

### 6.1. What is Athena?

**Athena** (https://athena.ohdsi.org/) is a free web tool to look up Standardized Vocabularies.

### 6.2. Search instructions

**Step 1:** Access https://athena.ohdsi.org/ (need to create free account)

**Step 2:** Enter a keyword, for example "diabetes type 2"

**Step 3:** Filter results:
- **Standard Concept:** select "Standard" to see only standard concepts
- **Domain:** select "Condition" if searching for a disease
- **Vocabulary:** select "SNOMED" or "ICD10CM"

**Step 4:** See concept details:
- Concept ID, name, class, domain, vocabulary
- **Relationships** tab: see "Maps to", "Is a", "Has component"
- **Hierarchy** tab: see father/child concept

### 6.3. Popular lookup example

```
  Tìm bệnh tiểu đường type 2:
  → Search: "type 2 diabetes"
  → Filter: Domain=Condition, Standard=Standard
  → Kết quả: concept_id=201826, SNOMED "Type 2 diabetes mellitus"

  Tìm thuốc Metformin:
  → Search: "metformin"
  → Filter: Domain=Drug, Concept Class=Ingredient
  → Kết quả: concept_id=1503297, RxNorm "metformin"

  Tìm xét nghiệm HbA1c:
  → Search: "hemoglobin a1c"
  → Filter: Domain=Measurement, Standard=Standard
  → Kết quả: concept_id=3004410, LOINC "Hemoglobin A1c/Hemoglobin.total"
```

---

## 7. concept_id = 0 — When unable to map

When source data cannot be mapped to Standard Concept:

```sql
-- Một mã thuốc nội bộ bệnh viện không có trong RxNorm
drug_concept_id        = 0              -- Không map được!
drug_source_value      = 'THUOC_BV_001' -- Vẫn giữ mã gốc
drug_source_concept_id = 0              -- Cũng không có source concept
```

**This is completely valid.** OMOP CDM allows it `concept_id = 0`, but the goal is to **minimize** the number of records with concept_id = 0 by:

1. Use **SOURCE_TO_CONCEPT_MAP** for custom mappings
2. Use **Usagi** tool for semi-automatic mapping
3. Ask the community to add new concepts to the vocabulary

---

## 8. Practice: Read a CDM record

For the following record in `CONDITION_OCCURRENCE`:

```sql
condition_occurrence_id    = 50001
person_id                  = 12345
condition_concept_id       = 201826
condition_start_date       = '2024-06-10'
condition_start_datetime   = '2024-06-10 09:30:00'
condition_end_date         = NULL
condition_end_datetime     = NULL
condition_type_concept_id  = 32817
condition_status_concept_id = 32902
provider_id                = 5001
visit_occurrence_id        = V001
condition_source_value     = 'E11'
condition_source_concept_id = 443238
condition_status_source_value = 'admitting'
```

**Decoding:**

| School | Value | Meaning |
|--------|--------|--------|
| condition_concept_id = 201826 | SNOMED "Type 2 diabetes mellitus" | Standard diagnosis |
| condition_type_concept_id = 32817 | "EHR" | Data from EMR system |
| condition_status_concept_id = 32902 | "Primary diagnosis" | Primary Diagnosis |
| condition_source_value = 'E11' | ICD-10-CM original code | Original code from HIS |
| condition_source_concept_id = 443238 | ICD-10-CM concept for "E11" | Original concept |
| provider_id = 5001 | Diagnosis Doctor | Look up table PROVIDER |
| visit_occurrence_id = V001 | Outpatient visits | Look up the table VISIT_OCCURRENCE |

---

## Summary

In this article, you have learned:

1. **Concept** = medical concept, represented by unique concept_id
2. **3 types of Concept**: Standard (S), Classification (C), Source (NULL)
3. **Triple columns**: `*_concept_id` / `*_source_value` / `*_source_concept_id`
4. **Domain** decides which table the record is in
5. **Vocabulary**: SNOMED (Condition), RxNorm (Drug), LOINC (Measurement)
6. **Concept Class**: detailed classification (Ingredient vs Clinical Drug...)
7. **Athena**: free concept lookup tool
8. **concept_id = 0**: valid when map is not possible

**Next post:** We'll start by exploring the first table — **PERSON** — where patient demographic information is stored.

---

## References

- [Athena — OHDSI Vocabulary Search](https://athena.ohdsi.org/)
- [The Book of OHDSI — Chapter 5: Standardized Vocabularies](https://ohdsi.github.io/TheBookOfOhdsi/StandardizedVocabularies.html)
- [OMOP CDM Wiki — Concept](https://ohdsi.github.io/CommonDataModel/cdm54.html#CONCEPT)
