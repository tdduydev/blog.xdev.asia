---
id: 019e0b20-b201-7a01-e001-f1a7f8000001
title: "Bài 1: OHDSI là gì? — Tổng quan hệ sinh thái và tầm nhìn"
slug: bai-1-ohdsi-la-gi-tong-quan-he-sinh-thai-va-tam-nhin
description: >-
  Giới thiệu OHDSI (Observational Health Data Sciences and Informatics),
  mục tiêu và tầm nhìn, kiến trúc tổng thể hệ sinh thái công cụ
  (Atlas, WebAPI, Athena, Usagi, ACHILLES, HADES),
  và vai trò của OMOP CDM trong chuẩn hóa dữ liệu y tế toàn cầu.
duration_minutes: 60
is_free: true
video_url: null
sort_order: 1
section_title: "Phần 1: Tổng quan OHDSI & OMOP CDM"
course:
  id: 019e0b20-b200-7a01-e001-f1a7f8000001
  title: "OHDSI & OMOP CDM — Phân tích Dữ liệu Y tế Toàn diện"
  slug: ohdsi-omop-cdm-phan-tich-du-lieu-y-te-toan-dien
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
  <text x="92" y="69" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="600" fill="#818cf8">🏗️ Kiến trúc — Bài 1</text>

  <!-- Title -->
  <text x="60" y="140" font-family="system-ui,-apple-system,sans-serif" font-size="34" font-weight="700" fill="#f1f5f9">
      <tspan x="60" dy="0">Bài 1: OHDSI là gì? — Tổng quan hệ sinh</tspan>
      <tspan x="60" dy="42">thái và tầm nhìn</tspan>
  </text>

  <!-- Series subtitle -->
  <text x="60" y="244" font-family="system-ui,-apple-system,sans-serif" font-size="15" fill="#94a3b8" opacity="0.8">OHDSI &amp; OMOP CDM — Phân tích Dữ liệu Y tế Toàn diện</text>

  <!-- Section -->
  <text x="60" y="268" font-family="system-ui,-apple-system,sans-serif" font-size="13" fill="#64748b" opacity="0.6">Phần 1: Tổng quan OHDSI &amp; OMOP CDM</text>

  <!-- xDev watermark -->
  <text x="1140" y="320" font-family="system-ui,-apple-system,sans-serif" font-size="12" fill="#475569" text-anchor="end" opacity="0.4">xdev.asia</text>
</svg>

![Bài 1: OHDSI — Tổng quan hệ sinh thái](/storage/uploads/2026/03/ohdsi-bai-1-ecosystem-overview.webp)

## Giới thiệu

Dữ liệu y tế toàn cầu là một kho báu khổng lồ — hàng tỷ bản ghi từ bệnh viện, phòng khám, bảo hiểm y tế. Nhưng mỗi hệ thống lưu trữ dưới dạng riêng biệt: HIS (Hospital Information System) của bệnh viện A khác hoàn toàn bệnh viện B, mã bệnh ICD-10 không đồng nhất với SNOMED CT, đơn thuốc lưu theo tên thương mại thay vì hoạt chất quốc tế.

**OHDSI** (Observational Health Data Sciences and Informatics — phát âm "Odyssey") ra đời để giải quyết vấn đề này.

---

## 1. OHDSI là gì?

### 1.1 Định nghĩa

OHDSI là một chương trình nghiên cứu quốc tế, mã nguồn mở (open-source), nhằm:

- **Chuẩn hóa** dữ liệu y tế quan sát (observational health data) vào một mô hình dữ liệu chung
- **Phát triển** các phương pháp phân tích đáng tin cậy, có thể tái lập
- **Cho phép** nghiên cứu đa trung tâm mà KHÔNG cần chia sẻ dữ liệu bệnh nhân

### 1.2 Lịch sử

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

### 1.3 Ba trụ cột của OHDSI

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

## 2. Vấn đề OHDSI giải quyết

### 2.1 Fragmentation — Dữ liệu phân mảnh

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

### 2.2 Giải pháp: OMOP CDM

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

## 3. Kiến trúc Hệ sinh thái OHDSI

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

### 3.1 Các công cụ chính

| Công cụ | Mục đích | Ngôn ngữ |
|---------|---------|----------|
| **Athena** | Tra cứu & tải Standardized Vocabularies | Web app |
| **WhiteRabbit** | Scan dữ liệu nguồn, tạo profile report | Java |
| **Rabbit-in-a-Hat** | Thiết kế ETL mapping (GUI) | Java |
| **Usagi** | Map source codes → OMOP concepts | Java |
| **WebAPI** | Backend REST API cho ATLAS | Java/Spring Boot |
| **ATLAS** | Web-based analytics platform | JavaScript |
| **ACHILLES** | Data characterization & profiling | R |
| **DQD** | Data Quality Dashboard — 1,500+ checks | R |
| **HADES** | R packages cho observational research | R |

---

## 4. Workflow OHDSI End-to-End

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

Điểm đặc biệt của OHDSI: **dữ liệu bệnh nhân KHÔNG BAO GIỜ rời khỏi site**.

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

**Tại sao quan trọng?**
- Tuân thủ privacy regulations (HIPAA, GDPR, Luật ATTT Việt Nam)
- Mỗi site giữ toàn quyền kiểm soát dữ liệu
- Vẫn có thể nghiên cứu trên hàng triệu bệnh nhân đa quốc gia

---

## 6. Ứng dụng thực tế

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

- Phát hiện tác dụng phụ thuốc trên dữ liệu thực tế (RWD)
- So sánh nhóm dùng thuốc vs nhóm control
- Ví dụ: Phân tích risk of myocarditis sau vaccination

### 6.3 Ứng dụng tại Việt Nam

- Chuẩn hóa dữ liệu HIS bệnh viện vào OMOP CDM
- Mapping ICD-10 Việt Nam → SNOMED CT
- Nghiên cứu dịch tễ học trên dữ liệu BHXH
- Đánh giá hiệu quả phác đồ điều trị đa trung tâm

---

## Tóm tắt

| Khái niệm | Giải thích |
|-----------|-----------|
| OHDSI | Cộng đồng nghiên cứu y tế mã nguồn mở toàn cầu |
| OMOP CDM | Mô hình dữ liệu chung cho dữ liệu y tế quan sát |
| Standardized Vocabularies | Bộ từ vựng chuẩn (SNOMED, RxNorm, LOINC...) |
| Distributed Research | Phân tích đa trung tâm mà dữ liệu không rời site |
| ETL | Quy trình chuyển đổi dữ liệu nguồn → OMOP CDM |

**Bài tiếp theo**: OMOP Common Data Model — Cấu trúc, nguyên lý & Domain
