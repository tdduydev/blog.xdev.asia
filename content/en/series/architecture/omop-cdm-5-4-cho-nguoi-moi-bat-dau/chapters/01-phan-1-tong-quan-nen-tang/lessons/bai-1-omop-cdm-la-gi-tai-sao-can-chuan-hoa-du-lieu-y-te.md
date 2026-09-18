---
id: 019f1a00-a101-7b01-e001-omopcdm54001
title: 'Lesson 1: What is OMOP CDM? — Why is it necessary to standardize medical data?'
slug: bai-1-omop-cdm-la-gi-tai-sao-can-chuan-hoa-du-lieu-y-te
description: >-
  Introducing the OMOP Common Data Model, its history from the OMOP project to
  the OHDSI community, the problem of fragmented medical data, and the
  importance of data standardization in clinical research.
duration_minutes: 45
is_free: true
video_url: null
sort_order: 1
section_title: 'Part 1: Overview & Background'
course:
  id: 019f1a00-a100-7b01-e001-omopcdm54001
  title: OMOP CDM 5.4 for Beginners — Understand A to Z
  slug: omop-cdm-5-4-cho-nguoi-moi-bat-dau
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-omop01" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="340" rx="12" fill="url(#bg-omop01)"/>
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Architecture — Lesson 1</text>
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
    <tspan x="60" dy="0">What is OMOP CDM? — Why is it necessary?</tspan>
    <tspan x="60" dy="42">Standardize medical data</tspan>
  </text>
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OMOP CDM 5.4 for Beginners — Understand A to Z</text>
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 1: Overview & Background</text>
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![The problem of medical data fragmentation and the solution to standardize OMOP CDM](/storage/uploads/2026/04/omop-cdm-bai1-data-fragmentation.webp)

## Introduction

Have you ever wondered: Why hospital A and hospital B, even though they treat the same disease, cannot compare data with each other? Why is it so difficult to research the effectiveness of drugs on 10 million patients in many countries?

The answer lies in **fragmentation of medical data**. And **OMOP CDM** is the solution.

---

## 1. Problem: Medical data is fragmented

### 1.1. One system per model

Each hospital uses different management software (HIS/EMR), storing data in its own structure:

```
┌─────────────────────────────────────────────────────────────────┐
│  Bệnh viện Chợ Rẫy (HIS)                                       │
│  ├── BENHNHAN (ma_bn, ho_ten, ngay_sinh, gioi_tinh)           │
│  ├── KHAMBENH (ma_kham, ma_bn, ngay_kham, bac_si)             │
│  ├── CHANDOAN (ma_cd, icd10_code, loai_chandoan)              │
│  └── DONTHUOC (ma_don, ten_thuoc, ham_luong, so_luong)        │
├─────────────────────────────────────────────────────────────────┤
│  Bệnh viện Bạch Mai (EMR)                                       │
│  ├── patients (patient_id, full_name, dob, sex)                │
│  ├── encounters (enc_id, patient_id, visit_date, physician)    │
│  ├── diagnoses (dx_id, icd_code, dx_type, priority)            │
│  └── medications (med_id, drug_name, dosage, quantity)          │
├─────────────────────────────────────────────────────────────────┤
│  BHXH Việt Nam                                                    │
│  ├── HO_SO_KCB (ma_hs, ma_the, noi_kcb)                       │
│  ├── CHI_TIET_BENH (ma_benh, ten_benh)                         │
│  └── CHI_TIET_THUOC (ma_thuoc, ten_thuoc, don_gia)            │
└─────────────────────────────────────────────────────────────────┘
```

Although "patient", "diagnosis", "medicine" are stored together — but:
- **Table name** is different (`BENHNHAN` vs `patients` vs `HO_SO_KCB`)
- **Column names** are different (`gioi_tinh` vs `sex` vs none)
- **Disease code** can use ICD-10-VN, ICD-10-CM, or internal code
- **Drug code** by trade name (Augmentin) instead of active ingredient (Amoxicillin/Clavulanate)
- **Format** different (date dd/mm/yyyy vs yyyy-mm-dd)

### 1.2. Consequences

| Problem | Description |
|--------|-------|
| **Cannot synthesize** | Integrating data from 3 hospitals took months |
| **Cannot be compared** | Diabetes complication rate: different because of different definitions |
| **Slow research** | The multicenter study took 1-2 years just for the data part |
| **AI/ML is difficult to implement** | The train model on data BV A cannot run on BV B |
| **Disease surveillance** | Cannot monitor real-time nationwide |

---

## 2. Solution: OMOP Common Data Model

### 2.1. What is OMOP CDM?

**OMOP CDM** (Observational Medical Outcomes Partnership Common Data Model) is an open standard that defines how observational health data is organized and stored.

Simply put: OMOP CDM is a **unified database blueprint** that any medical data source can convert to.

```
                    ETL (Extract-Transform-Load)
                    
  HIS Bệnh viện A ──────┐
                         │
  EMR Bệnh viện B ──────┤     ┌───────────────────────┐
                         ├────→│   OMOP CDM Database    │────→ Phân tích thống nhất
  BHXH Data ─────────────┤     │   (PostgreSQL/SQL)     │────→ Nghiên cứu đa trung tâm
                         │     └───────────────────────┘────→ AI/ML
  Phòng khám tư ─────────┘
```

### 2.2. Main features

| Features | Description |
|-----------|-------|
| **Person-centric** | All data surrounding the patient (`PERSON` table) |
| **Event-based** | Each medical event is a separate record (examination, test, prescription) |
| **Standardized Vocabularies** | Use standard dictionary instead of internal code |
| **Open source** | Free, open source, community developed |
| **Relational model** | Use standard RDBMS (PostgreSQL, SQL Server, Oracle) |

### 2.3. Visual example

A 45-year-old female patient examined at Cho Ray Hospital was diagnosed with type 2 diabetes and prescribed Metformin:

**Before (original HIS):**
```sql
BENHNHAN: ma_bn=12345, ho_ten='Nguyễn Thị Lan', ngay_sinh='1980-03-15', gioi_tinh='Nu'
KHAMBENH: ma_kham=K001, ngay_kham='2024-06-10', bac_si='BS. Trần Văn A'
CHANDOAN: icd10='E11', loai='chinh', ten='Đái tháo đường type 2'
DONTHUOC: ten_thuoc='Glucophage 500mg', so_luong=60, lieu='2 viên/ngày'
```

**After (OMOP CDM 5.4):**
```sql
PERSON:       person_id=12345, gender_concept_id=8532 (Female),
              year_of_birth=1980, month_of_birth=3, day_of_birth=15

VISIT_OCCURRENCE: visit_id=V001, person_id=12345,
              visit_concept_id=9202 (Outpatient Visit),
              visit_start_date='2024-06-10'

CONDITION_OCCURRENCE: person_id=12345, visit_id=V001,
              condition_concept_id=201826 (Type 2 diabetes mellitus),
              -- [SNOMED CT concept]
              condition_source_value='E11'

DRUG_EXPOSURE: person_id=12345, visit_id=V001,
              drug_concept_id=1503297 (Metformin 500 MG Oral Tablet),
              -- [RxNorm concept]
              quantity=60, days_supply=30,
              drug_source_value='Glucophage 500mg'
```

**Important difference:**
- `gioi_tinh='Nu'` → `gender_concept_id=8532` (international standard concept)
- `icd10='E11'` → `condition_concept_id=201826` (SNOMED CT, retain source_value='E11')
- `Glucophage 500mg` → `drug_concept_id=1503297` (RxNorm ingredient+dose, keep source_value)

---

## 3. History is born

### 3.1. OMOP Project (2008-2013)

```
2008 ─── FDA khởi xướng dự án OMOP (Observational Medical Outcomes Partnership)
  │      Mục tiêu: nghiên cứu an toàn thuốc sau khi đưa ra thị trường
  │
2009 ─── Phát triển CDM phiên bản đầu tiên
  │      Áp dụng cho 10 nguồn dữ liệu tại Mỹ
  │
2012 ─── CDM v4 được phát hành
  │      Bắt đầu mở rộng ra nhiều loại dữ liệu y tế
  │
2013 ─── Dự án OMOP kết thúc → Chuyển giao cho cộng đồng OHDSI
```

### 3.2. OHDSI Community (2014-present)

```
2014 ─── OHDSI (Observational Health Data Sciences and Informatics)
  │      thành lập tại Columbia University
  │      Phát triển CDM v5.0
  │
2017 ─── CDM v5.2 — Thêm COST table thống nhất
  │
2018 ─── CDM v5.3 — Survey module, improved Visit model
  │
2021 ─── CDM v5.4 ← PHIÊN BẢN HIỆN TẠI
  │      Thêm EPISODE, EPISODE_EVENT tables
  │      Thêm measurement_event_id, observation_event_id
  │
2024 ─── Hơn 400 tổ chức trên 80+ quốc gia tham gia
         Hơn 800 triệu bản ghi bệnh nhân đã chuyển đổi
```

### 3.3. Why CDM 5.4?

Version 5.4 is the latest stable version recommended by the OHDSI community:
- **37 pounds** scientifically organized
- **Oncology support** (EPISODE/EPISODE_EVENT for cancer treatment lines)
- **Event linkage** improvements (measurement_event_id, observation_event_id)
- **Production-proven** — deployed at 400+ organizations

---

## 4. OMOP CDM vs other standards

| Criteria | OMOP CDM | FHIR | HL7 v2/v3 | openEHR |
|-----------|----------|-------|-----------|---------|
| **Main purpose** | Analysis & Research | Data Exchange | Passing the message | EHR Archives |
| **Data model** | Relational (SQL) | JSON/XML Resources | Messages | Archetypes |
| **Vocabulary** | Built-in standard set | Flexible | Code Systems | Terminologies |
| **Use case** | Retrospective analysis, RWE | API interoperability | System integration | Clinical records |
| **Easy to analyze** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Community tools** | ATLAS, ACHILLES, HADES | SMART on FHIR | Varies | Clinical archetypes |

> **Note:** OMOP CDM and FHIR **complement** each other — FHIR for real-time data exchange, OMOP CDM for retrospective analysis. Many organizations use FHIR for acquisition → ETL → OMOP CDM for analytics.

---

## 5. Practical application

### 5.1. Large-scale research

- **COVID-19 Studyathon (2020):** OHDSI analyzes 2.1 billion patient records from 20+ countries within 2 weeks
- **Drug Safety:** Detect side effects of drugs on real data of 100+ million patients
- **Comparative Effectiveness:** Compares the effectiveness of two treatments on multicenter data

### 5.2. In Vietnam

- **Large hospital** is piloting the conversion of HIS → OMOP CDM
- **Public health research** uses OMOP CDM to analyze social insurance data
- **Startup HealthTech** builds a medical data analysis platform based on OMOP

### 5.3. AI/ML on OMOP CDM

```
  OMOP CDM Database
  ┌─────────────────────────────────────────┐
  │ Chuẩn hóa → Đồng nhất → Phân tích      │
  │                                          │
  │  ┌─────────────┐   ┌─────────────────┐  │
  │  │ Cohort      │   │ Feature         │  │
  │  │ Definition  │──→│ Extraction      │────→ ML Model
  │  │ (ATLAS)     │   │ (FeatureExtract)│  │
  │  └─────────────┘   └─────────────────┘  │
  │                                          │
  │  Cùng 1 model chạy trên N databases     │
  └─────────────────────────────────────────┘
```

Thanks to standardized data, **an ML model trained on hospital A data can be validated on hospital B data without needing to modify the code**.

---

## 6. OHDSI ecosystem

OMOP CDM does not stand alone — it is at the heart of the OHDSI ecosystem:

```
                     ┌──────────────┐
                     │   Athena     │  ← Tra cứu Vocabulary
                     └──────┬───────┘
                            │
 ┌──────────┐    ┌──────────┴──────────┐    ┌──────────────┐
 │  Usagi   │    │                      │    │  ACHILLES    │
 │ (Mapping)│───→│    OMOP CDM 5.4     │←───│ (Data Quality│
 └──────────┘    │    Database          │    │  Profiling)  │
                 │                      │    └──────────────┘
 ┌──────────┐    │  ┌──────────────┐   │    ┌──────────────┐
 │WhiteRabbit│───→│  │  WebAPI      │   │    │   HADES      │
 │(ETL Scan) │   │  │  (REST API)  │   │←───│ (R Packages) │
 └──────────┘    │  └──────────────┘   │    └──────────────┘
                 │         ↑           │
                 └─────────┼───────────┘
                           │
                    ┌──────┴───────┐
                    │    ATLAS     │  ← Phân tích & Cohort
                    └──────────────┘
```

> This series will **focus 100% on the OMOP CDM 5.4 structure**. To learn about OHDSI tools, see the series [OHDSI & OMOP CDM — Comprehensive Healthcare Data Analysis](/series/ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien).

---

## 7. Important terms

Before diving into the series, you need to master the following terms:

| Terminology | Vietnamese | Explanation |
|-----------|-----------|-------------|
| **CDM** | Common Data Model | Generic Data Model |
| **ETL** | Extract-Transform-Load | Process of extracting, transforming, loading data |
| **Concept** | Concept | Standardized units — each medical "thing" (disease, drug, test) is assigned a unique concept_id |
| **Standard Concept** | Standard concept | Concept chosen by OMOP as standard (usually from SNOMED CT, RxNorm, LOINC) |
| **Source Value** | Original value | Original code/name from source system (e.g. ICD-10 code, BV drug name) |
| **Domain** | Domain | Group concepts by topic (Condition, Drug, Procedure, Measurement...) |
| **Vocabulary** | Vocabulary set | Code system (SNOMED CT, ICD-10, RxNorm, LOINC...) |
| **Observation Period** | Observation range | Time the patient "has data" in the system |
| **Visit** | Visits/hospitalizations | One contact with the health system |
| **RWE** | Real-World Evidence | Evidence from real-world data (not clinical trials) |

---

## Summary

In this article, you have learned:

1. **The problem of fragmented medical data** — each system is unique, cannot be aggregated
2. **What is OMOP CDM** — generic, person-centric, event-based data model
3. **History** — from OMOP project (FDA, 2008) to OHDSI (2014-present), CDM 5.4 (2021)
4. **Comparison with FHIR, HL7** — OMOP CDM for analytics, complementary to FHIR
5. **OHDSI Ecosystem** — Athena, ATLAS, ACHILLES, HADES, WebAPI

**Next article:** We will explore **the overall architecture of OMOP CDM 5.4** — how the 37 tables are organized into 6 groups, and the Person-centric design principles.

---

## References

- [OMOP CDM 5.4 Specification](https://ohdsi.github.io/CommonDataModel/cdm54.html)
- [The Book of OHDSI](https://ohdsi.github.io/TheBookOfOhdsi/)
- [OHDSI Official Website](https://www.ohdsi.org/)
- [Athena — OHDSI Vocabularies](https://athena.ohdsi.org/)
