---
id: 019f1a00-a102-7b01-e001-omopcdm54002
title: >-
  Lesson 2: Overall architecture of OMOP CDM 5.4 — Table groups & Design
  principles
slug: bai-2-kien-truc-tong-the-omop-cdm-5-4-nhom-bang-nguyen-ly-thiet-ke
description: >-
  Overview of 37 tables in OMOP CDM 5.4, 6 main table groups (Clinical Data,
  Health System, Health Economics, Standardized Vocabularies, Derived Elements,
  Metadata), Person-centric model and core design principles.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 2
section_title: 'Part 1: Overview & Background'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: OMOP CDM 5.4 for Beginners — Understand A to Z
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop02" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop02)"/>
  <g>
    <circle cx="659" cy="87" r="22" fill="#818cf8" opacity="0.12"/>
    <circle cx="718" cy="106" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="777" cy="125" r="36" fill="#818cf8" opacity="0.06"/>
    <circle cx="836" cy="144" r="13" fill="#818cf8" opacity="0.13"/>
    <circle cx="895" cy="163" r="20" fill="#818cf8" opacity="0.1"/>
    <line x1="600" y1="157" x2="1100" y2="237" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="187" x2="1050" y2="257" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
  </g>
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Architecture — Lesson 2</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">Overall architecture of OMOP CDM 5.4</tspan>
    <tspan x="60" dy="42">Table group & Design principles</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 for Beginners — Understand A to Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 1: Overview & Background</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![The architecture of 6 OMOP CDM 5.4 table groups revolves around PERSON](/storage/uploads/2026/04/omop-cdm-bai2-architecture-6-groups.webp)

## Introduction

In the previous article, you understood **why** you need OMOP CDM. This article will answer the question: **What does CDM 5.4 look like?** — How are the 37 tables organized, in what groups, and according to what design principles.

You will have a "bird's-eye view" of the entire CDM before diving into each table in the next articles.

---

## 1. Overview of 6 table groups

OMOP CDM 5.4 includes **37 tables** divided into **6 groups** (groups):

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        OMOP CDM 5.4 — 37 Tables                        │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  1. CLINICAL DATA (16 bảng)                                     │    │
│  │  person, observation_period, visit_occurrence, visit_detail,     │    │
│  │  condition_occurrence, drug_exposure, procedure_occurrence,      │    │
│  │  device_exposure, measurement, observation, death, note,         │    │
│  │  note_nlp, specimen, fact_relationship, episode, episode_event   │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                         │
│  ┌──────────────────────────┐  ┌──────────────────────────────────┐    │
│  │  2. HEALTH SYSTEM (3)    │  │  3. HEALTH ECONOMICS (2)         │    │
│  │  location, care_site,    │  │  payer_plan_period, cost          │    │
│  │  provider                │  │                                   │    │
│  └──────────────────────────┘  └──────────────────────────────────┘    │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  4. STANDARDIZED VOCABULARIES (12 bảng)                          │   │
│  │  concept, vocabulary, domain, concept_class, concept_relationship,│   │
│  │  relationship, concept_synonym, concept_ancestor,                 │   │
│  │  source_to_concept_map, drug_strength, cohort, cohort_definition │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────┐   ┌───────────────────────────────────┐   │
│  │  5. DERIVED ELEMENTS (3) │   │  6. METADATA (2)                  │   │
│  │  drug_era, dose_era,     │   │  cdm_source, metadata              │   │
│  │  condition_era           │   │                                    │   │
│  └─────────────────────────┘   └───────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.1. Clinical Data Tables (16 tables)

This is the **largest and most important** group — containing all the clinical data.

| Table | Short description | Lesson |
|-------|-------------|--------|
| `person` | Patient demographic information | Lesson 4 |
| `observation_period` | Follow-up interval | Lesson 5 |
| `visit_occurrence` | Visits/hospitalizations | Lesson 6 |
| `visit_detail` | Details in a visit | Lesson 6 |
| `condition_occurrence` | Diagnosis, pathology | Lesson 7 |
| `drug_exposure` | Medicines, prescriptions, vaccines | Lesson 8 |
| `procedure_occurrence` | Procedures, surgery | Lesson 9 |
| `measurement` | Tests, vital signs | Lesson 10 |
| `observation` | Clinical observations, history | Lesson 11 |
| `device_exposure` | Medical equipment | Lesson 12 |
| `specimen` | Patient samples | Lesson 12 |
| `note` | Text notes | Lesson 12 |
| `note_nlp` | NLP results from note | Lesson 12 |
| `death` | Death information | Lesson 13 |
| `episode` | Disease stage (new CDM 5.4) | Lesson 13 |
| `episode_event` | Link events-episodes (new CDM 5.4) | Lesson 13 |

### 1.2. Health System Data Tables (3 tables)

| Table | Description |
|-------|-------|
| `location` | Location (address, coordinates) |
| `care_site` | Medical organizations (hospitals, clinics) |
| `provider` | Medical staff (doctors, nurses) |

### 1.3. Health Economics Data Tables (2 tables)

| Table | Description |
|-------|-------|
| `payer_plan_period` | Health insurance information over time |
| `cost` | Costs associated with every clinical event |

### 1.4. Standardized Vocabularies (12 boards)

| Table | Description |
|-------|-------|
| `concept` | Central table — contains >10 million concepts |
| `vocabulary` | List of vocabulary sources (SNOMED, ​​ICD-10...) |
| `domain` | Domains (Condition, Drug, Procedure...) |
| `concept_class` | Concept classification (Clinical Finding, Ingredient...) |
| `concept_relationship` | The relationship between concepts |
| `relationship` | Definition of relationship types |
| `concept_synonym` | Another name for concept |
| `concept_ancestor` | Hierarchical genealogy of concept |
| `source_to_concept_map` | Mapping source code → standard concept |
| `drug_strength` | Drug content and concentration |
| `cohort` | List of patients according to criteria |
| `cohort_definition` | Definition of cohort criteria |

### 1.5. Derived Elements (3 tables)

| Table | Description |
|-------|-------|
| `drug_era` | Group drug exposures sequentially by ingredient |
| `dose_era` | Phase of using the drug at a stable dose |
| `condition_era` | Combine continuous conditions into era |

### 1.6. Metadata (2 tables)

| Table | Description |
|-------|-------|
| `cdm_source` | Data source information, CDM version |
| `metadata` | Optional additional metadata |

---

## 2. Core design principles

### 2.1. Person-Centric (Patient-centered)

All clinical tables are **linked back to PERSON** via key `person_id`:

```
                           ┌─────────────────────┐
                           │      PERSON          │
                           │  person_id (PK)      │
                           │  gender_concept_id   │
                           │  year_of_birth       │
                           └──────────┬──────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
   ┌──────────┴──────────┐  ┌────────┴────────┐  ┌──────────┴──────────┐
   │ OBSERVATION_PERIOD   │  │ VISIT_OCCURRENCE │  │ CONDITION_OCCURRENCE│
   │ person_id (FK)       │  │ person_id (FK)   │  │ person_id (FK)     │
   └─────────────────────┘  └──────┬──────────┘  └────────────────────┘
                                    │
              ┌────────────────────┼────────────────────┐
              │                    │                     │
   ┌──────────┴──────┐  ┌────────┴────────┐  ┌────────┴────────┐
   │ DRUG_EXPOSURE    │  │ PROCEDURE_OCC.  │  │ MEASUREMENT     │
   │ person_id (FK)   │  │ person_id (FK)  │  │ person_id (FK)  │
   │ visit_occ_id(FK) │  │ visit_occ_id(FK)│  │ visit_occ_id(FK)│
   └─────────────────┘  └────────────────┘  └────────────────┘
```

**Rule:** If a data line cannot be attached to `person_id`, it is **not included in the clinical tables**.

### 2.2. Event-Based

Each medical event creates **a separate record** in the corresponding table:

```
Ngày 10/06: Khám ngoại trú → 1 record trong VISIT_OCCURRENCE
  ├── Chẩn đoán tiểu đường  → 1 record trong CONDITION_OCCURRENCE
  ├── Chẩn đoán tăng HA      → 1 record trong CONDITION_OCCURRENCE
  ├── Kê Metformin 500mg      → 1 record trong DRUG_EXPOSURE
  ├── Kê Amlodipine 5mg       → 1 record trong DRUG_EXPOSURE
  ├── XN HbA1c = 7.8%         → 1 record trong MEASUREMENT
  └── XN Creatinine = 1.1     → 1 record trong MEASUREMENT
```

### 2.3. Concept-Driven (Based on standard concepts)

Each clinical value is **encoded with concept_id** from Standardized Vocabularies:

```
  Cột trong bảng CDM              Concept                    Vocabulary
  ─────────────────────────────────────────────────────────────────────
  gender_concept_id = 8532     →  "Female"                   [Gender]
  condition_concept_id = 201826 → "Type 2 diabetes mellitus" [SNOMED CT]
  drug_concept_id = 1503297    → "Metformin 500 MG Oral Tab" [RxNorm]
  measurement_concept_id = 3004410 → "Hemoglobin A1c"        [LOINC]
  unit_concept_id = 8554       → "percent (%)"               [UCUM]
```

### 2.4. Source Value Preservation (Preserve original value)

OMOP CDM **always retains the original values** in addition to the standard concept:

```sql
-- Ví dụ: Bảng CONDITION_OCCURRENCE
condition_concept_id    = 201826        -- Standard Concept (SNOMED)
condition_source_value  = 'E11'         -- Mã gốc ICD-10 từ HIS
condition_source_concept_id = 443238    -- Concept ID của ICD-10 'E11'
```

3-column model for each concept field:

| Column | Description | Required |
|-----|-------|----------|
| `*_concept_id` | Standard Concept ID (SNOMED, ​​RxNorm...) | ✅ |
| `*_source_value` | Original value as text | No |
| `*_source_concept_id` | Original Concept ID (if present in vocabulary) | No |

### 2.5. Domain-Based Routing

Each concept belongs to a **Domain** — and the Domain decides which **table the record is in**:

```
  Concept "Type 2 diabetes"
    → Domain = "Condition"
    → Lưu vào CONDITION_OCCURRENCE

  Concept "Metformin 500mg"
    → Domain = "Drug"
    → Lưu vào DRUG_EXPOSURE

  Concept "Hemoglobin A1c"
    → Domain = "Measurement"
    → Lưu vào MEASUREMENT

  Concept "Smoking status"
    → Domain = "Observation"
    → Lưu vào OBSERVATION
```

> **Important note:** Sometimes the source code is in one domain but the Standard Concept is in another domain. For example: ICD-10 codes `Z87.891` (History of nicotine dependence) belongs to Condition but Standard Concept map to Observation domain → save to table `OBSERVATION`, it's not `CONDITION_OCCURRENCE`.

---

## 3. General Entity-Relationship Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           HEALTH SYSTEM                                  │
│                                                                          │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────┐                   │
│  │ LOCATION │←───│  CARE_SITE   │───→│   PROVIDER   │                   │
│  │          │    │              │    │              │                   │
│  └────┬─────┘    └──────────────┘    └──────┬───────┘                   │
│       │                                      │                          │
└───────┼──────────────────────────────────────┼──────────────────────────┘
        │                                      │
        ↓                                      ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLINICAL DATA                                  │
│                                                                          │
│  ┌───────────┐       ┌───────────────────┐                              │
│  │  PERSON   │←──────│ OBSERVATION_PERIOD│                              │
│  │           │       └───────────────────┘                              │
│  └─────┬─────┘                                                          │
│        │                                                                 │
│        ├──→ VISIT_OCCURRENCE ──→ VISIT_DETAIL                           │
│        │       │                                                         │
│        │       ├──→ CONDITION_OCCURRENCE                                 │
│        │       ├──→ DRUG_EXPOSURE                                        │
│        │       ├──→ PROCEDURE_OCCURRENCE                                 │
│        │       ├──→ MEASUREMENT                                          │
│        │       ├──→ OBSERVATION                                          │
│        │       ├──→ DEVICE_EXPOSURE                                      │
│        │       ├──→ NOTE ──→ NOTE_NLP                                   │
│        │       └──→ SPECIMEN                                             │
│        │                                                                 │
│        ├──→ DEATH                                                        │
│        ├──→ EPISODE ──→ EPISODE_EVENT                                   │
│        └──→ FACT_RELATIONSHIP                                           │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
        │
        ↓
┌─────────────────────────────────────────────────────────────────────────┐
│  HEALTH ECONOMICS                                                        │
│  PAYER_PLAN_PERIOD ←── PERSON                                           │
│  COST ←── (bất kỳ clinical event nào)                                   │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  DERIVED ELEMENTS                                                        │
│  DRUG_ERA, DOSE_ERA, CONDITION_ERA ←── tính toán từ clinical data       │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  STANDARDIZED VOCABULARIES                                               │
│  CONCEPT ←→ CONCEPT_RELATIONSHIP ←→ CONCEPT_ANCESTOR                   │
│  VOCABULARY, DOMAIN, CONCEPT_CLASS, RELATIONSHIP                        │
│  SOURCE_TO_CONCEPT_MAP, DRUG_STRENGTH, CONCEPT_SYNONYM                 │
│  COHORT, COHORT_DEFINITION                                              │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  METADATA: CDM_SOURCE, METADATA                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Important Conventions in CDM 5.4

### 4.1. Common Fields

Most clinical tables have the following fields:

| School | Type | Description |
|--------|--------|-------|
| `*_id` (PK) | INTEGER | Primary key, unique |
| `person_id` (FK) | INTEGER | Link to PERSON |
| `*_concept_id` | INTEGER | Standard Concept ID |
| `*_date` | DATE | Event date |
| `*_datetime` | DATETIME | Event date and time (if any) |
| `*_type_concept_id` | INTEGER | Data origin (EHR, claim, self-reported...) |
| `*_source_value` | VARCHAR(50) | Original value from source system |
| `*_source_concept_id` | INTEGER | Original ID Concept |
| `visit_occurrence_id` (FK) | INTEGER | Link to VISIT_OCCURRENCE |
| `provider_id` (FK) | INTEGER | Doctor/staff |

### 4.2. Concept ID convention

| Value | Meaning |
|--------|--------|
| `0` | Unable to map (No matching concept) |
| `> 0` | Concepts are valid in the CONCEPT | table
| `NULL` | Not applicable or no information available |

### 4.3. Date/Datetime convention

- `*_date` (DATE): **Required** — date of event
- `*_datetime` (DATETIME): **Optional** — if no hour, set `*_datetime = *_date + 00:00:00`
- End date: if the event is 1 day, `end_date = start_date`

### 4.4. Type Concept Convention

`*_type_concept_id` indicates the **origin** of the record:

| type_concept_id | Meaning |
|-----------------|---------|
| 32817 | EHR (Electronic Health Record) |
| 32810 | Claim (Insurance) |
| 32856 | Lab test (Test) |
| 32883 | Survey (Survey) |
| 32865 | Patient self-report |

---

## 5. CDM 5.4 — New points compared to 5.3

| Change | Details |
|----------|----------|
| **EPISODE Table** | Record disease episodes (eg: cancer treatment line 1, 2, 3) |
| **EPISODE_EVENT table** | Associate clinical events with episodes |
| **measurement_event_id** | Allow Measurement to link to the original event (eg: Measurement from which Specimen) |
| **observation_event_id** | Same for Observation |
| **production_id** (DEVICE_EXPOSURE) | Unique Device Identifier (UDI) |
| **quantity** (DEVICE_EXPOSURE) | Number of devices |

---

## 6. Where to start?

Roadmap to read this series:

```
Bài 1-3: Nền tảng (bạn đang ở đây)
    ↓
Bài 4-6: PERSON → OBSERVATION_PERIOD → VISIT
    ↓        (xây nền móng)
Bài 7-10: CONDITION → DRUG → PROCEDURE → MEASUREMENT
    ↓        (sự kiện lâm sàng chính)
Bài 11-13: OBSERVATION → DEVICE/NOTE/SPECIMEN → DEATH/EPISODE
    ↓        (bảng mở rộng)
Bài 14-16: Vocabulary system
    ↓        (hiểu concept sâu hơn)
Bài 17-19: Health System, Economics, Era tables
    ↓        (hạ tầng & tổng hợp)
Bài 20: Tổng kết & bước tiếp theo
```

---

## Summary

In this article, you have learned:

1. **37 tables** in OMOP CDM 5.4, divided into **6 groups**
2. **5 design principles**: Person-centric, Event-based, Concept-driven, Source preservation, Domain routing
3. **General ER Diagram** — how the panels are interconnected
4. **Common Conventions** — common fields, concept ID rules, date/datetime, type concepts
5. **New CDM 5.4** — EPISODE, event linkage, device tracking

**Next article:** We will delve into **Concept** — the heart of OMOP CDM — understanding Standard vs Source Concept, Domain, Vocabulary, and how to look up on Athena.

---

## References

- [OMOP CDM 5.4 Specification](https://ohdsi.github.io/CommonDataModel/cdm54.html)
- [CDM 5.4 Changes](https://ohdsi.github.io/CommonDataModel/cdm54Changes.html)
- [The Book of OHDSI — Chapter 4: The Common Data Model](https://ohdsi.github.io/TheBookOfOhdsi/CommonDataModel.html)
