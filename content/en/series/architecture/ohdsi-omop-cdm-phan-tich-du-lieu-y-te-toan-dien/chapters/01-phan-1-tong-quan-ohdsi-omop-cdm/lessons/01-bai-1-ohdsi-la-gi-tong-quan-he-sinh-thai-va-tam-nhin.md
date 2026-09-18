---
id: 019e0b20-b201-7a01-e001-f1a7f8000001
title: 'Lesson 1: What is OHDSI? — Overview of ecosystem and vision'
slug: bai-1-ohdsi-la-gi-tong-quan-he-sinh-thai-va-tam-nhin
description: >-
  Introducing OHDSI (Observational Health Data Sciences and Informatics), its
  goals and vision, the overall architecture of the tool ecosystem (Atlas,
  WebAPI, Athena, Usagi, ACHILLES, HADES), and the role of OMOP CDM in global
  health data standardization.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: 'Part 1: Overview of OHDSI & OMOP CDM'
course:
  id: 019e0b20-b200-7a01-e001-f1a7f8000001
  title: OHDSI & OMOP CDM — Comprehensive Healthcare Data Analysis
  slug: ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien
locale: en
---

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 340" style="max-width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem;">
  <defs>
    <linearGradient id="bg-7504" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0c1222"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="340" rx="12" fill="url(#bg-7504)"/>

  <!-- Decorations -->
  <g>
    <circle cx="659" cy="87" r="22" fill="#818cf8" opacity="0.12000000000000001"/>
    <circle cx="718" cy="106" r="29" fill="#818cf8" opacity="0.09"/>
    <circle cx="777" cy="125" r="36" fill="#818cf8" opacity="0.060000000000000005"/>
    <circle cx="836" cy="144" r="13" fill="#818cf8" opacity="0.13"/>
    <circle cx="895" cy="163" r="20" fill="#818cf8" opacity="0.1"/>
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
    <line x1="600" y1="157" x2="1100" y2="237" stroke="#818cf8" stroke-width="0.5" opacity="0.1"/>
    <line x1="650" y1="187" x2="1050" y2="257" stroke="#818cf8" stroke-width="0.5" opacity="0.08"/>
    <polygon points="934.712812921102,91 934.712812921102,123 907,139 879.287187078898,123 879.287187078898,91.00000000000001 907,75" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.12"/>
  </g>

  <!-- Accent bar -->
  <rect x="60" y="50" width="4" height="60" rx="2" fill="#818cf8"/>

  <!-- Category badge -->
  <rect x="80" y="50" width="121" height="28" rx="14" fill="#818cf8" opacity="0.15"/>
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Architecture — Lesson 1</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Lesson 1: What is OHDSI? — General generative relationship</tspan>
      <tspan x="60" dy="42">attitude and vision</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OHDSI & OMOP CDM — Comprehensive Healthcare Data Analysis</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Part 1: Overview of OHDSI & OMOP CDM</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Lesson 1: OHDSI — Overview of the ecosystem](/storage/uploads/2026/03/ohdsi-bai-1-ecosystem-overview.webp)

## Introduction

Global health data is a huge treasure trove — billions of records from hospitals, clinics, health insurance. But each system is stored in a separate form: Hospital A's HIS (Hospital Information System) is completely different from hospital B, ICD-10 disease codes are not consistent with SNOMED CT, prescriptions are stored by trade name instead of international active ingredients.

**OHDSI** (Observational Health Data Sciences and Informatics — pronounced "Odyssey") was created to solve this problem.

---

## 1. What is OHDSI?

### 1.1 Definition

OHDSI is an international, open-source research program that aims to:

- **Standardize** observational health data into a common data model
- **Develop** reliable, reproducible analytical methods
- **Allow** multicenter studies WITHOUT sharing patient data

### 1.2 History

```
2008: OMOP (Observational Medical Outcomes Partnership)
      → Dự án FDA nghiên cứu tác dụng phụ thuốc trên dữ liệu thực tế
      → Phát triển Common Data Model (CDM)

2013: OMOP kết thúc → OHDSI ra đời
      → Kế thừa OMOP CDM, mở rộng thành cộng đồng mã nguồn mở
      → Mục tiêu: evidence-based medicine trên quy mô toàn cầu

2024: 800+ tổ chức, 100+ quốc gia
      → 1+ tỷ bản ghi bệnh nhân được chuẩn hóa
      → Hàng nghìn nghiên cứu được publish

2026: OHDSI tiếp tục mở rộng
      → OMOP CDM v5.4, v6.0 đang phát triển
      → Tích hợp AI/ML, genomics, wearable data
```

### 1.3 Three pillars of OHDSI

```
┌─────────────────────────────────────────────────────────┐
│                    OHDSI Mission                        │
│                                                         │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────────┐ │
│  │  Open       │ │  Open        │ │  Open            │ │
│  │  Science    │ │  Source      │ │  Community       │ │
│  │             │ │              │ │                  │ │
│  │ Transparent │ │ Free tools   │ │ Collaborative    │ │
│  │ Reproducible│ │ Peer-reviewed│ │ 800+ orgs        │ │
│  │ Published   │ │ GitHub       │ │ Global network   │ │
│  └─────────────┘ └──────────────┘ └──────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 2. OHDSI problem solved

### 2.1 Fragmentation — Data fragmentation

```
Bệnh viện A (HIS: eHospital)     Bệnh viện B (HIS: Telehealth)
┌─────────────────────────┐       ┌─────────────────────────┐
│ Patient: MA_BN_001      │       │ Patient: BN-2024-00123  │
│ Diagnosis: I10 (ICD-10) │       │ Diagnosis: 401.1 (ICD-9)│
│ Drug: Amlor 5mg         │       │ Drug: Amlodipine 5mg    │
│ Lab: Glucose: 126 mg/dL │       │ Lab: Đường huyết: 7.0   │
│ Date: 01/03/2024        │       │ Date: 2024-03-01        │
└─────────────────────────┘       └─────────────────────────┘

→ Cùng 1 bệnh nhân, cùng 1 bệnh (tăng huyết áp), cùng 1 thuốc
→ Nhưng KHÔNG THỂ truy vấn chung vì format khác nhau hoàn toàn
```

### 2.2 Solution: OMOP CDM

```
                    ETL (Extract - Transform - Load)
Bệnh viện A ─────┐                    ┌──────────────────────┐
                  ├─── Transform ───→  │   OMOP CDM Database  │
Bệnh viện B ─────┘                    │                      │
                                       │ person_id: 12345     │
                                       │ condition: 320128    │
                                       │   (Essential HTN)    │
                                       │ drug: 1332419        │
                                       │   (Amlodipine 5mg)   │
                                       │ measurement: 3004410 │
                                       │   (Glucose 126 mg/dL)│
                                       └──────────────────────┘

→ Cùng concept IDs cho cùng ý nghĩa y khoa
→ Cùng cấu trúc bảng → cùng SQL query
→ Có thể phân tích đa trung tâm
```

---

## 3. OHDSI Ecosystem Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     OHDSI Ecosystem                             │
│                                                                 │
│  ┌──── Data Standardization ─────────────────────────────────┐ │
│  │                                                           │ │
│  │  [Athena]          → Standardized Vocabularies            │ │
│  │  [WhiteRabbit]     → Scan source data                     │ │
│  │  [Rabbit-in-a-Hat] → Design ETL mapping                   │ │
│  │  [Usagi]           → Map source codes → standard concepts │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                           │ ETL                                │
│                           ▼                                    │
│  ┌──── OMOP CDM Database ────────────────────────────────────┐ │
│  │  PostgreSQL / SQL Server / Oracle / Spark                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│                           │                                    │
│                           ▼                                    │
│  ┌──── Data Quality ────────────────────────────────────────┐  │
│  │  [ACHILLES]              → Data characterization          │  │
│  │  [Data Quality Dashboard]→ 1,500+ quality checks          │  │
│  └───────────────────────────────────────────────────────────┘ │
│                           │                                    │
│                           ▼                                    │
│  ┌──── Analytics Platform ──────────────────────────────────┐  │
│  │  [WebAPI]  → REST API backend (Spring Boot / Java)        │  │
│  │  [ATLAS]   → Web UI (JavaScript) cho phân tích            │  │
│  │  [HADES]   → R packages cho advanced analytics            │  │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 3.1 Main tools

| Tools | Purpose | Language |
|--------|---------|----------|
| **Athena** | Look up & download Standardized Vocabularies | Web app |
| **WhiteRabbit** | Scan source data, create profile report | Java |
| **Rabbit-in-a-Hat** | ETL mapping design (GUI) | Java |
| **Usagi** | Map source codes → OMOP concepts | Java |
| **WebAPI** | Backend REST API for ATLAS | Java/Spring Boot |
| **ATLAS** | Web-based analytics platform | JavaScript |
| **ACHILLES** | Data characterization & profiling | R |
| **DQD** | Data Quality Dashboard — 1,500+ checks | R |
| **HADES** | R packages for observational research | R |

---

## 4. End-to-End OHDSI Workflow

```
Step 1: Vocabulary Preparation
  Athena → Download vocabularies (ICD-10, SNOMED, RxNorm, LOINC...)
                    │
Step 2: Source Data Profiling
  WhiteRabbit → Scan source database → Generate scan report
                    │
Step 3: ETL Design
  Rabbit-in-a-Hat → Design table & field mappings
  Usagi → Map source codes → Standard Concepts
                    │
Step 4: ETL Execution
  Custom ETL scripts (Python/SQL) → Load data into OMOP CDM
                    │
Step 5: Data Quality
  ACHILLES → Characterize CDM data
  DQD → Run 1,500+ quality checks
                    │
Step 6: Analytics
  WebAPI + ATLAS → Cohort Definitions, Characterization,
                   Incidence Rates, Estimation, Prediction
  HADES → Advanced R-based analytics
                    │
Step 7: Network Study
  Package study → Distribute to sites → Collect aggregate results
```

---

## 5. OHDSI Network — Distributed Research

What's special about OHDSI: **patient data NEVER leaves the site**.

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Site A     │    │   Site B     │    │   Site C     │
│ (500K pts)   │    │ (1M pts)     │    │ (200K pts)   │
│              │    │              │    │              │
│ OMOP CDM     │    │ OMOP CDM     │    │ OMOP CDM     │
│ WebAPI+ATLAS │    │ WebAPI+ATLAS │    │ WebAPI+ATLAS │
│              │    │              │    │              │
│ Run Study    │    │ Run Study    │    │ Run Study    │
│ Package ───┐ │    │ Package ───┐ │    │ Package ───┐ │
└────────────│─┘    └────────────│─┘    └────────────│─┘
             │                   │                    │
             └───── Aggregate ───┴──── Results ───────┘
                        │
                        ▼
              ┌─────────────────┐
              │ Central Analysis│
              │ (chỉ aggregate  │
              │  không có PII)  │
              └─────────────────┘
```

**Why is it important?**
- Comply with privacy regulations (HIPAA, GDPR, Vietnam Information Security Law)
- Each site retains full control over data
- Research on millions of multinational patients is still possible

---

## 6. Practical application

### 6.1 COVID-19 (OHDSI COVID-19 Study-a-thon)

```
Timeline:
- Tháng 3/2020: Đại dịch bùng phát
- Tháng 3/2020: OHDSI tổ chức Study-a-thon online
- 96 giờ: 300+ nhà nghiên cứu từ 30+ quốc gia
- Kết quả: Phân tích đặc điểm bệnh nhân COVID-19
  trên 5+ triệu bệnh nhân từ nhiều quốc gia
  → Published trong PNAS (top-tier journal)
```

### 6.2 Drug Safety Surveillance

- Detect drug side effects on real data (RWD)
- Compare the drug group with the control group
- Example: Analyzing risk of myocarditis after vaccination

### 6.3 Application in Vietnam

- Standardize hospital HIS data into OMOP CDM
- Mapping ICD-10 Vietnam → SNOMED CT
- Epidemiological research on social insurance data
- Evaluate the effectiveness of multicenter treatment regimens

---

## Summary

| Concept | Explanation |
|-----------|-----------|
| OHDSI | Global open source medical research community |
| OMOP CDM | Generic data model for observational medical data |
| Standardized Vocabularies | Standard vocabulary set (SNOMED, ​​RxNorm, LOINC...) |
| Distributed Research | Multi-center analysis without data leaving the site |
| ETL | Source data conversion process → OMOP CDM |

**Next article**: OMOP Common Data Model — Structure, principles & Domain
